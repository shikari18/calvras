import express from 'express';
import cors from 'cors';
import { spawn, execSync } from 'child_process';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';
import { createRequire } from 'module';
import { assignPort, getPort, releasePort } from './portManager.js';
import { WORKSPACE, repoPath, repoExists, listFilesRecursive } from './repoManager.js';
import { MALVOS_SYSTEM_PROMPT } from '../src/services/aiService.js';

const require = createRequire(import.meta.url);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Track running dev processes & recent errors: repoName -> { proc, errorLogs }
const runningDevServers = new Map();
const repoErrors = new Map();

// ─── Helper: run command and stream output via SSE ──────────────────────────
function streamCommand(cmd, args, cwd, res, onDone) {
  const proc = spawn(cmd, args, { cwd, shell: true });

  proc.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(Boolean);
    for (const line of lines) {
      res.write(`data: ${JSON.stringify({ type: 'info', text: line })}\n\n`);
    }
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().split('\n').filter(Boolean);
    for (const line of lines) {
      res.write(`data: ${JSON.stringify({ type: 'info', text: line })}\n\n`);
    }
  });

  proc.on('close', (code) => {
    if (onDone) onDone(code);
  });

  return proc;
}

// ─── POST /api/clone ─────────────────────────────────────────────────────────
// body: { url: string, token?: string }
// Streams SSE logs, ends with { type: 'done', port, files } or { type: 'error' }
app.post('/api/clone', (req, res) => {
  const { url, token } = req.body;
  if (!url) return res.status(400).json({ error: 'url required' });

  // Setup SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (obj) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

  // Extract repo name from URL
  const cleanUrl = url.replace(/\.git$/, '');
  const repoName = cleanUrl.split('/').pop();
  const destPath = repoPath(repoName);

  // Build clone URL (inject token if provided)
  let cloneUrl = cleanUrl + '.git';
  if (token) {
    const urlObj = new URL(cloneUrl);
    cloneUrl = `${urlObj.protocol}//${token}@${urlObj.host}${urlObj.pathname}`;
  }

  send({ type: 'cmd', text: `git clone ${cleanUrl}.git` });

  // Remove or clean existing clone if present
  if (repoExists(repoName)) {
    send({ type: 'info', text: `Found existing workspace for '${repoName}', refreshing...` });
    try {
      const oldProc = runningDevServers.get(repoName);
      if (oldProc) {
        try { oldProc.kill('SIGTERM'); } catch {}
        runningDevServers.delete(repoName);
      }
      releasePort(repoName);
      try {
        fs.rmSync(destPath, { recursive: true, force: true, maxRetries: 3 });
      } catch (rmErr) {
        console.warn(`[WARN] rmSync skipped for ${repoName}:`, rmErr.message);
      }
    } catch (e) {
      console.warn(`[WARN] Cleanup error for ${repoName}:`, e.message);
    }
  }

  // Step 1: git clone (or git pull if directory still exists)
  const isExistingDir = fs.existsSync(destPath) && fs.existsSync(path.join(destPath, '.git'));
  const cloneArgs = isExistingDir ? ['pull'] : ['clone', cloneUrl, destPath];
  const cloneCwd = isExistingDir ? destPath : undefined;
  const cloneProc = spawn('git', cloneArgs, { cwd: cloneCwd, shell: true });

  cloneProc.stdout.on('data', d => d.toString().split('\n').filter(Boolean).forEach(l => send({ type: 'info', text: l })));
  cloneProc.stderr.on('data', d => d.toString().split('\n').filter(Boolean).forEach(l => send({ type: 'info', text: l })));

  cloneProc.on('close', (code) => {
    if (code !== 0 && !isExistingDir) {
      send({ type: 'error', text: `Git clone failed with code ${code}` });
      res.end();
      return;
    }

    send({ type: 'success', text: `✓ Workspace '${repoName}' ready.` });

    const allRepoFiles = listFilesRecursive(destPath);
    // Send files_ready so frontend populates workspace files and in-browser preview
    send({ type: 'files_ready', repoName, files: allRepoFiles });

    // Step 2: Detect package manager and frontend subfolder
    let appDir = destPath;
    let hasPackageJson = fs.existsSync(path.join(destPath, 'package.json'));
    if (!hasPackageJson) {
      for (const sub of ['frontend', 'client', 'web', 'app', 'ui']) {
        if (fs.existsSync(path.join(destPath, sub, 'package.json'))) {
          appDir = path.join(destPath, sub);
          hasPackageJson = true;
          send({ type: 'info', text: `Detected application in subdirectory: /${sub}` });
          break;
        }
      }
    }

    if (!hasPackageJson) {
      send({ type: 'done', repoName, port: null, files: allRepoFiles });
      res.end();
      return;
    }

    const startDevServer = () => {
      const port = assignPort(repoName);
      send({ type: 'cmd', text: `npm run dev -- --port ${port} --host` });

      const pkg = JSON.parse(fs.readFileSync(path.join(appDir, 'package.json'), 'utf-8'));
      const hasDevScript = pkg.scripts && pkg.scripts.dev;
      const devArgs = hasDevScript
        ? ['run', 'dev', '--', '--port', String(port), '--host']
        : ['run', 'start'];

      const devProc = spawn('npm', devArgs, { cwd: appDir, shell: true });

      runningDevServers.set(repoName, devProc);
      repoErrors.delete(repoName);

      let devVerified = false;

      const handleDevOutput = (data, isErr = false) => {
        const text = data.toString();
        const lines = text.split('\n').filter(Boolean);
        for (const line of lines) {
          send({ type: isErr ? 'err' : 'info', text: line });
          if (line.includes('error') || line.includes('Error') || line.includes('Failed') || line.includes('plugin:')) {
            repoErrors.set(repoName, line);
          }
        }
      };

      devProc.stdout.on('data', d => handleDevOutput(d, false));
      devProc.stderr.on('data', d => handleDevOutput(d, true));

      let attempts = 0;
      const verifyServer = async () => {
        if (devVerified) return;
        try {
          const check = await fetch(`http://localhost:${port}`);
          if (check.ok || check.status === 200 || check.status === 304) {
            devVerified = true;
            send({ type: 'success', text: `✓ Dev server live & verified on http://localhost:${port}` });
            send({ type: 'done', repoName, port, files: allRepoFiles });
            res.end();
            return;
          }
        } catch {}
        attempts++;
        if (attempts < 15) {
          setTimeout(verifyServer, 1000);
        } else {
          devVerified = true;
          send({ type: 'done', repoName, port, files: allRepoFiles });
          res.end();
        }
      };
      setTimeout(verifyServer, 1500);
    };

    if (fs.existsSync(path.join(appDir, 'node_modules'))) {
      send({ type: 'success', text: '✓ Dependencies already installed.' });
      startDevServer();
      return;
    }

    // npm install
    send({ type: 'cmd', text: 'npm install' });
    const installProc = spawn('npm', ['install', '--legacy-peer-deps'], { cwd: appDir, shell: true });

    installProc.stdout.on('data', d => d.toString().split('\n').filter(Boolean).forEach(l => send({ type: 'info', text: l })));
    installProc.stderr.on('data', d => d.toString().split('\n').filter(Boolean).forEach(l => send({ type: 'info', text: l })));

    installProc.on('close', (installCode) => {
      if (installCode !== 0) {
        send({ type: 'info', text: `npm install finished (code ${installCode}). Live in-browser sandbox active.` });
        send({ type: 'done', repoName, port: null, files: allRepoFiles });
        res.end();
        return;
      }

      send({ type: 'success', text: '✓ Dependencies installed.' });
      startDevServer();
    });
  });
});

// ─── GET /api/verify/:repo ───────────────────────────────────────────────────
// Verifies dev server compile status and tests for syntax errors
app.get('/api/verify/:repo', async (req, res) => {
  const { repo } = req.params;
  const port = getPort(repo);
  const recentErr = repoErrors.get(repo) || null;

  if (!port) return res.json({ ok: false, error: 'Dev server not running' });

  try {
    const fetchRes = await fetch(`http://localhost:${port}`, { signal: AbortSignal.timeout(2500) });
    const html = await fetchRes.text();

    if (html.includes('[plugin:') || html.includes('Unterminated') || html.includes('SyntaxError') || html.includes('Internal server error')) {
      const match = html.match(/\[plugin:[^\]]+\][^\n<]+/i) || html.match(/Unterminated[^\n<]+/i);
      return res.json({ ok: false, error: match ? match[0] : (recentErr || 'Compile error on preview server') });
    }

    res.json({ ok: true, port });
  } catch (err) {
    res.json({ ok: false, error: recentErr || err.message });
  }
});

// ─── GET /api/files/:repo ─────────────────────────────────────────────────────
app.get('/api/files/:repo', (req, res) => {
  const { repo } = req.params;
  if (!repoExists(repo)) return res.status(404).json({ error: 'Repo not found' });
  const files = listFilesRecursive(repoPath(repo));
  res.json({ files });
});

// ─── GET /api/all-files/:repo ─────────────────────────────────────────────────
// Returns dictionary of all files in repo for live VFS compilation
app.get('/api/all-files/:repo', (req, res) => {
  const { repo } = req.params;
  if (!repoExists(repo)) return res.status(404).json({ error: 'Repo not found' });
  const repoDir = repoPath(repo);
  const fileList = listFilesRecursive(repoDir);
  const filesDict = {};

  for (const relPath of fileList) {
    try {
      const fullPath = path.join(repoDir, relPath);
      const stat = fs.statSync(fullPath);
      if (stat.size > 10000000) continue; // allow up to 10MB per asset

      const ext = path.extname(relPath).toLowerCase().replace('.', '');
      if (/\.(tsx|jsx|ts|js|json|css|html|md|svg|yaml|yml|toml|env|txt|sh)$/i.test(relPath)) {
        const text = fs.readFileSync(fullPath, 'utf-8');
        filesDict[`${repo}/${relPath}`] = text;
        filesDict[relPath] = text;
      } else if (/\.(png|jpg|jpeg|webp|gif|ico|bmp|avif)$/i.test(relPath)) {
        const mime = ext === 'jpg' ? 'jpeg' : ext;
        const b64 = fs.readFileSync(fullPath).toString('base64');
        const dataUri = `data:image/${mime};base64,${b64}`;
        filesDict[`${repo}/${relPath}`] = dataUri;
        filesDict[relPath] = dataUri;
      }
    } catch {}
  }

  res.json({ files: filesDict });
});

// ─── POST /api/push ──────────────────────────────────────────────────────────
// Commits and pushes changes back to GitHub repo
app.post('/api/push', (req, res) => {
  const { repo, remoteUrl, commitMessage = 'Update from Calvras' } = req.body;
  if (!repo || !repoExists(repo)) return res.status(404).json({ error: 'Repo not found' });
  const repoDir = repoPath(repo);

  try {
    if (remoteUrl) {
      try {
        execSync(`git remote set-url origin "${remoteUrl}"`, { cwd: repoDir });
      } catch {
        execSync(`git remote add origin "${remoteUrl}"`, { cwd: repoDir });
      }
    }
    execSync('git add -A', { cwd: repoDir });
    try {
      execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { cwd: repoDir });
    } catch {
      // No changes to commit, continue to push
    }
    const pushOut = execSync('git push origin HEAD', { cwd: repoDir }).toString();
    res.json({ ok: true, output: pushOut });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ─── GET /api/raw/:repo ──────────────────────────────────────────────────────
// Serves exact raw static assets from the cloned repository on disk
app.use('/api/raw/:repo', (req, res) => {
  const { repo } = req.params;
  if (!repoExists(repo)) return res.status(404).send('Repo not found');
  const fullPath = path.join(repoPath(repo), req.path);
  if (!fs.existsSync(fullPath)) return res.status(404).send('File not found');
  res.sendFile(fullPath);
});

// ─── GET /api/search ──────────────────────────────────────────────────────────
// Searches full repository file tree and text contents for query terms
app.get('/api/search', (req, res, next) => {
  const { repo, q } = req.query;
  // No repo param → this is a live web-search query; fall through to the web search route
  if (!repo || !q) return next();
  if (!repoExists(repo)) return res.status(404).json({ error: 'Repo not found' });

  const repoDir = repoPath(repo);
  const allFiles = listFilesRecursive(repoDir);
  const searchTerms = q.toLowerCase().split(/\W+/).filter(w => w.length > 2);

  const matchedFiles = [];

  for (const relPath of allFiles) {
    try {
      const fullPath = path.join(repoDir, relPath);
      const stat = fs.statSync(fullPath);
      if (stat.size > 120000) continue; // skip huge bundles

      const content = fs.readFileSync(fullPath, 'utf-8');
      const lowerContent = content.toLowerCase();
      const lowerPath = relPath.toLowerCase();

      let score = 0;
      for (const term of searchTerms) {
        if (lowerPath.includes(term)) score += 35;
        if (lowerContent.includes(term)) {
          score += 25;
          const count = (lowerContent.match(new RegExp(term, 'g')) || []).length;
          score += Math.min(count * 5, 25);
        }
      }

      if (lowerPath.includes('route') || lowerPath.includes('page') || lowerPath.includes('index') || lowerPath.includes('app') || lowerPath.includes('signup') || lowerPath.includes('login') || lowerPath.includes('auth')) {
        score += 15;
      }

      if (score > 0) {
        matchedFiles.push({ path: relPath, score, content });
      }
    } catch { /* skip read error */ }
  }

  matchedFiles.sort((a, b) => b.score - a.score);
  res.json({ results: matchedFiles.slice(0, 10) });
});

// ─── GET /api/file ────────────────────────────────────────────────────────────
app.get('/api/file', (req, res) => {
  const { repo, path: filePath } = req.query;
  if (!repo || !filePath) return res.status(400).json({ error: 'repo and path are required' });
  const fullPath = path.join(repoPath(repo), filePath);
  if (!fs.existsSync(fullPath)) return res.status(404).json({ error: 'File not found' });
  const content = fs.readFileSync(fullPath, 'utf-8');
  res.json({ content });
});

// ─── POST /api/file ───────────────────────────────────────────────────────────
app.post('/api/file', (req, res) => {
  const { repo, path: filePath, content } = req.body;
  if (!repo || !filePath) return res.status(400).json({ error: 'repo and path are required' });
  const fullPath = path.join(repoPath(repo), filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content || '', 'utf-8');
  res.json({ ok: true });
});

// ─── POST /api/push/:repo ─────────────────────────────────────────────────────
// body: { token: string, message?: string }
app.post('/api/push/:repo', (req, res) => {
  const { repo } = req.params;
  const { token, message = 'Update from Calvras' } = req.body;
  if (!repoExists(repo)) return res.status(404).json({ error: 'Repo not found' });
  if (!token) return res.status(400).json({ error: 'GitHub token required' });

  const cwd = repoPath(repo);

  try {
    // Get remote URL and inject token
    const remoteUrl = execSync('git remote get-url origin', { cwd }).toString().trim();
    const urlObj = new URL(remoteUrl.replace('git@github.com:', 'https://github.com/').replace(/\.git$/, '') + '.git');
    const authedUrl = `${urlObj.protocol}//${token}@${urlObj.host}${urlObj.pathname}`;

    execSync('git config user.email "calvras@ai.local"', { cwd });
    execSync('git config user.name "Calvras"', { cwd });
    execSync('git add -A', { cwd });
    execSync(`git commit -m "${message.replace(/"/g, '\\"')}"`, { cwd });
    execSync(`git push "${authedUrl}" HEAD`, { cwd });

    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── POST /api/stop/:repo ─────────────────────────────────────────────────────
app.post('/api/stop/:repo', (req, res) => {
  const { repo } = req.params;
  const proc = runningDevServers.get(repo);
  if (proc) {
    proc.kill();
    runningDevServers.delete(repo);
    releasePort(repo);
  }
  res.json({ ok: true });
});

// ─── POST /api/v1/chat/completions ──────────────────────────────────────────
// OpenAI-compatible ChatML completions endpoint:
const HF_7B_ROUTER_URL = 'https://router.huggingface.co/hf-inference/models/SHIKARI2/Malvos-7B-Instruct/v1/chat/completions';
const HUGGINGFACE_ENDPOINT_URL = process.env.HUGGINGFACE_ENDPOINT_URL || 'https://router.huggingface.co/hf-inference/models/SHIKARI2/Malvos-32B-Merged/v1/chat/completions';
const HF_INFERENCE_URL = 'https://router.huggingface.co/v1/chat/completions';
const OPENROUTER_KEY = Buffer.from('c2stb3ItdjEtMWM1YmJlYjk0ODNiNzlmODVhODdlN2IzNzNlZmE2NDViMjcyMGJkMDg4NTMzZTVhOTY5Y2I0MGQzZTc0MDZhNQ==', 'base64').toString('utf-8');

const HF_CUSTOM_ROUTER_URLS = [
  HF_7B_ROUTER_URL,
  HUGGINGFACE_ENDPOINT_URL
];

const FAILOVER_MODELS = [
  'anthropic/claude-3.7-sonnet',
  'anthropic/claude-3.5-sonnet',
  'google/gemini-2.5-pro',
  'google/gemini-2.0-flash-001',
  'openai/gpt-4o',
  'deepseek/deepseek-chat',
  'google/gemini-2.0-flash-exp:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'openrouter/free'
];

const VISION_MODELS = [
  'anthropic/claude-3.7-sonnet',
  'anthropic/claude-3.5-sonnet',
  'google/gemini-2.5-pro',
  'google/gemini-2.0-flash-001',
  'openai/gpt-4o',
  'google/gemini-2.0-flash-exp:free',
  'openrouter/free'
];

// Fast conversational engines for voice mode — speed first, no flagship latency.
// Free OpenRouter models work with the current key (paid models return 402).
const FAST_VOICE_MODELS = [
  'minimax/minimax-m3:free',
  'openrouter/free',
  'minimax/minimax-m2.7:free',
  'nvidia/nemotron-3.5-lightning:free',
  'inclusionai/ling-3.0-flash-fin:free',
  'google/gemma-4-26b-a4b-it:free',
  'liquid/lfm-2.5-2.6b:free'
];

// Compact system prompt for spoken conversations — short, plain, no markdown
const VOICE_SYSTEM_PROMPT = `You are Calvras, a fast, friendly voice assistant. This is a spoken conversation, so answer in 1-3 short sentences using plain conversational text. No markdown, no lists, no code blocks, no headers, no emojis. Be warm, direct, and helpful.`;

// MALVOS_SYSTEM_PROMPT imported from aiService.js

app.post('/api/v1/chat/completions', async (req, res) => {
  const { 
    messages: rawMessages, 
    model = 'SHIKARI2/Malvos-32B-Merged', 
    temperature = 0.3, 
    max_tokens = 8192, 
    top_p = 0.95,
    stream = false,
    fast = false,
    voiceMode = false
  } = req.body;

  const hfToken = req.headers.authorization?.replace(/^Bearer\s+/i, '') || process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || '';

  if (!rawMessages || !Array.isArray(rawMessages)) {
    return res.status(400).json({ error: { message: 'Invalid messages array required' } });
  }

  const hasSystem = rawMessages.some(m => m.role === 'system');
  const messages = hasSystem 
    ? rawMessages 
    : [{ role: 'system', content: MALVOS_SYSTEM_PROMPT }, ...rawMessages];

  // Detect if any message contains an image_url (multimodal vision request)
  const hasImages = messages.some(m => 
    Array.isArray(m.content) && m.content.some(part => part.type === 'image_url')
  );

  // ─── FAST VOICE PATH ─────────────────────────────────────────────────
  // Voice conversations need speed over flagship quality. Pollinations first
  // (instant, no auth), then OpenRouter fast models. Skips HF custom routers
  // and the flagship failover chain entirely.
  if (fast) {
    let voiceMessages = messages;
    if (voiceMode) {
      // Compact voice prompt — the giant system prompt costs tokens and first-token latency
      voiceMessages = [{ role: 'system', content: VOICE_SYSTEM_PROMPT }, ...messages.filter(m => m.role !== 'system')];
    }
    const voiceTokens = Math.min(max_tokens, 600);

    const sendStream = (body) => {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      return Readable.fromWeb(body).pipe(res);
    };

    // 1. OpenRouter fast models (free tier — verified working with this key)
    for (const fModel of FAST_VOICE_MODELS) {
      try {
        const orResp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://calvras.ai',
            'X-Title': 'Calvras Voice'
          },
          body: JSON.stringify({ model: fModel, messages: voiceMessages, temperature, max_tokens: voiceTokens, stream }),
          signal: AbortSignal.timeout(20000)
        });
        if (orResp.ok) {
          if (stream) return sendStream(orResp.body);
          const data = await orResp.json();
          if (data?.choices?.[0]?.message?.content) {
            return res.json({ ...data, model: 'Calvras' });
          }
        } else {
          console.warn(`[Fast Voice] ${fModel} status ${orResp.status}`);
        }
      } catch (e) {
        console.warn(`[Fast Voice] ${fModel} failed:`, e.message);
      }
    }

    // 2. Pollinations — free fallback. Its legacy endpoint rejects system messages
    // (402), so strip them and fold the brevity instruction into the user turn.
    const polMessages = voiceMessages.filter(m => m.role !== 'system');
    if (polMessages.length > 0 && polMessages[polMessages.length - 1].role === 'user') {
      const last = polMessages[polMessages.length - 1];
      polMessages[polMessages.length - 1] = {
        ...last,
        content: (Array.isArray(last.content) ? JSON.stringify(last.content) : String(last.content || '')) +
          '\n\n(Reply in 1-3 short sentences, plain conversational text, no markdown.)'
      };
    }
    try {
      const polResp = await fetch('https://text.pollinations.ai/openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: polMessages, temperature, max_tokens: voiceTokens, stream }),
        signal: AbortSignal.timeout(10000)
      });
      if (polResp.ok) {
        if (stream) return sendStream(polResp.body);
        const data = await polResp.json();
        if (data?.choices?.[0]?.message?.content) {
          return res.json({ ...data, model: 'Calvras' });
        }
      } else {
        console.warn(`[Fast Voice] pollinations status ${polResp.status}`);
      }
    } catch (e) {
      console.warn('[Fast Voice] pollinations failed:', e.message);
    }

    return res.status(503).json({
      error: { message: 'Fast voice engine temporarily busy. Please retry.', type: 'inference_error' }
    });
  }

  // ─── MULTIMODAL VISION & CODING PIPELINE ────────────────────────────
  if (hasImages) {
    const userQuery = messages
      .filter(m => m.role === 'user')
      .map(m => Array.isArray(m.content) ? m.content.filter(p => p.type === 'text').map(p => p.text).join(' ') : (m.content || ''))
      .join(' ');

    const isQuestionOnly = /\b(?:what|who|where|why|how many|is this|explain|describe|read\s+text)\b/i.test(userQuery) && !/\b(?:duplicate|clone|build|create|make|code|implement|recreate|ui|app|page|site|modify|edit|update|add|change)\b/i.test(userQuery);
    if (!isQuestionOnly) {
      const VISION_CODER_PROMPT = `You are Calvras Vision Coder, an autonomous elite React 18 TypeScript engineer.
When given an image or screenshot of a website or application to clone, duplicate, build, or modify:
1. State in 1 concise sentence what application you are building or updating for the user.
2. IMMEDIATELY output the complete, production-grade, 10/10 pixel-perfect React 18 TypeScript application in:
\`\`\`tsx file=src/App.tsx
// Complete, working React 18 TypeScript code with all imports, Lucide icons, Tailwind CSS classes, state, and interactive components
\`\`\`
3. STRICT MANDATE FOR IMAGES & CARDS:
   - NEVER EVER use numbered placeholders (e.g. 1, 2, 3, 4, 5, 6, 7, 8), blank gray boxes, or empty rectangles for cards or preview items!
   - Every single card, item, or visual showcase MUST have a real, high-resolution Unsplash image (e.g. https://images.unsplash.com/photo-... with ?w=800&auto=format&fit=crop&q=80) or dynamic Pollinations image matching the theme.
   - Every card author/creator MUST have a real avatar image from Unsplash (e.g. https://images.unsplash.com/photo-... with ?w=100).
   - Ensure rich visual density: titles, authors, PRO/Team badges, like counts with heart icons, view counts, and hover zoom effects.
4. STRICT MANDATE FOR MOBILE RESPONSIVENESS:
   - Every single website, page, and component MUST be 100% mobile-responsive across phone, tablet, and desktop viewports.
   - Use Tailwind responsive classes: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 for all card grids.
   - Header navigation must include a mobile toggle (hamburger menu with Lucide Menu/X icons) so it collapses cleanly on mobile screens.
   - Use responsive padding (px-4 sm:px-6 lg:px-8) so content never clips screen borders.
5. NO ESSAYS OR BULLET LISTS: Do not output long introductory essays or bullet lists before the code. Start writing the code immediately.`;

      let hasSys = false;
      for (let i = 0; i < messages.length; i++) {
        if (messages[i].role === 'system') {
          messages[i].content = VISION_CODER_PROMPT;
          hasSys = true;
        }
      }
      if (!hasSys) {
        messages.unshift({ role: 'system', content: VISION_CODER_PROMPT });
      }
    }

    const MULTIMODAL_MODELS = [
      'google/gemini-2.0-flash-001',
      'google/gemini-2.5-pro',
      'anthropic/claude-3.5-sonnet',
      'anthropic/claude-3.7-sonnet',
      'openai/gpt-4o',
      'minimax/minimax-m3:free',
      'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
      'openrouter/free'
    ];

    for (const vModel of MULTIMODAL_MODELS) {
      try {
        console.log(`[Multimodal Engine] Trying ${vModel}...`);
        const vRes = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://calvras.ai',
            'X-Title': 'Calvras Multimodal Engine'
          },
          body: JSON.stringify({
            model: vModel,
            messages,
            temperature: 0.2,
            max_tokens: 16384,
            stream
          }),
          signal: AbortSignal.timeout(180000)
        });

        console.log(`[Multimodal Engine] ${vModel} response status:`, vRes.status);
        if (vRes.ok) {
          if (stream) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            const nodeStream = Readable.fromWeb(vRes.body);
            nodeStream.on('error', err => console.warn('[VisionStream] error:', err.message));
            return nodeStream.pipe(res);
          } else {
            const data = await vRes.json();
            if (data?.choices?.[0]?.message?.content) {
              return res.json({ ...data, model: 'Calvras' });            }
          }
        }
      } catch (err) {
        console.warn(`[Multimodal Engine] ${vModel} failed:`, err.message);
      }
    }
  } else {
    // Only override system prompt when the request is an explicit build/clone — not for questions or lists
    const userQuery = messages
      .filter(m => m.role === 'user')
      .map(m => Array.isArray(m.content) ? m.content.filter(p => p.type === 'text').map(p => p.text).join(' ') : m.content)
      .join(' ');

    const isExplicitBuild = /\b(?:duplicate|clone|recreate|rebuild|build\s+(?:me\s+)?(?:a|an|the)\s+(?:app|site|website|page|dashboard|tool|game)|create\s+(?:a|an|the)\s+(?:app|site|website|page|dashboard|tool)|implement\s+(?:a|an)\s+(?:app|site|website|page|dashboard))\b/i.test(userQuery);
    if (isExplicitBuild) {
      const CODER_SYSTEM_PROMPT = `You are Calvras Coder, an autonomous elite React 18 TypeScript engineer. You ship complete, production-ready full-stack applications.

OUTPUT FORMAT: Output ALL project files in standard markdown code blocks with file path headers:
\`\`\`tsx file=src/App.tsx
[Full React 18 TypeScript code]
\`\`\`

CRITICAL DESIGN & QUALITY RULES:
1. MANDATORY REAL IMAGES: Never use numbered placeholders (1, 2, 3) or empty rectangles. When building cards, galleries, feeds, or portfolios, ALWAYS include real high-resolution Unsplash image URLs (https://images.unsplash.com/photo-... with descriptive topics) and creator avatar URLs.
2. MANDATORY 100% MOBILE RESPONSIVENESS: Every UI must be fully responsive on mobile, tablet, and desktop (e.g., grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4, mobile hamburger menu, touch-friendly buttons).
3. Start directly with code blocks. No preamble, no reasoning, no explanation before the code.
4. Concluding prose: After all code blocks, write 1-2 friendly sentences talking directly to the user in past tense summarizing what was built and inviting them to test the live preview.`;

      for (let i = 0; i < messages.length; i++) {
        if (messages[i].role === 'system') {
          messages[i].content = CODER_SYSTEM_PROMPT;
        }
      }
    }
  }

  // 1. Primary Engine: Custom Fine-Tuned Models (Malvos-7B-Instruct Serverless -> Malvos-32B)
  if (hfToken && !hasImages) {
    for (const customUrl of HF_CUSTOM_ROUTER_URLS) {
      try {
        const hfResp = await fetch(customUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${hfToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            messages,
            temperature,
            max_tokens,
            top_p,
            stream
          }),
          signal: AbortSignal.timeout(15000)
        });

        if (hfResp.ok) {
          if (stream) {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            return Readable.fromWeb(hfResp.body).pipe(res);
          } else {
            const data = await hfResp.json();
            return res.json({
              ...data,
              model: 'Calvras'
            });
          }
        }
      } catch { /* proceed to next endpoint */ }
    }
  }

  // 2. Zero-Downtime Priority Failover Pool (Qwen 2.5 Coder 32B -> DeepSeek -> Codestral)
  let lastFailoverError = null;
  for (const failoverModel of FAILOVER_MODELS) {
    try {
      const orResp = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://calvras.ai',
          'X-Title': 'Calvras'
        },
        body: JSON.stringify({
          model: failoverModel,
          messages,
          temperature,
          max_tokens,
          top_p,
          stream
        }),
        signal: AbortSignal.timeout(120000)
      });

      if (orResp.ok) {
        if (stream) {
          res.setHeader('Content-Type', 'text/event-stream');
          res.setHeader('Cache-Control', 'no-cache');
          res.setHeader('Connection', 'keep-alive');
          const nodeStream = Readable.fromWeb(orResp.body);
          nodeStream.on('error', (err) => {
            console.warn('[Server Stream] Stream error:', err.message);
          });
          return nodeStream.pipe(res);
        } else {
          const data = await orResp.json();
          if (data?.choices?.[0]?.message?.content) {
            return res.json({
              ...data,
              model: 'Calvras'
            });
          }
        }
      } else {
        const errData = await orResp.json().catch(() => null);
        lastFailoverError = errData?.error?.message || `Status ${orResp.status}`;
      }
    } catch (failErr) {
      lastFailoverError = failErr.message;
    }
  }

  // 3. Resilient Secondary Failover Engine (Pollinations OpenAI engine — 100% uptime, zero rate limits)
  try {
    const polResp = await fetch('https://text.pollinations.ai/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        temperature,
        max_tokens,
        stream
      }),
      signal: AbortSignal.timeout(60000)
    });

    if (polResp.ok) {
      if (stream) {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        const nodeStream = Readable.fromWeb(polResp.body);
        nodeStream.on('error', (err) => {
          console.warn('[Server Stream] Fallback stream warning:', err.message);
        });
        return nodeStream.pipe(res);
      } else {
        const data = await polResp.json();
        if (data?.choices?.[0]?.message?.content) {
          return res.json({
            ...data,
            model: 'Calvras'
          });
        }
      }
    }
  } catch (polErr) {
    console.warn('[Server] Resilient fallback warning:', polErr.message);
  }

  return res.status(503).json({
    error: {
      message: 'All model inference engines temporarily busy. Please retry.',
      type: 'inference_error',
      details: lastFailoverError
    }
  });
});

// ─── POST /api/screenshot — Puppeteer Full-Page Site Screenshot ──────────────
// body: { url: string }  → returns { success, url, dataUrl, width, height }
app.post('/api/screenshot', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'url required' });

  // Normalize URL
  const targetUrl = url.match(/^https?:\/\//i) ? url : `https://${url}`;

  let browser;
  try {
    const puppeteer = require('puppeteer');
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor'
      ]
    });

    const page = await browser.newPage();

    // Set realistic 1440p desktop viewport
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    // Set real browser user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    // Navigate with generous timeout
    await page.goto(targetUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // Let animations/lazy loads settle
    await new Promise(r => setTimeout(r, 2000));

    // Scroll to bottom to trigger lazy-load images
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 400;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= Math.min(document.body.scrollHeight, 8000)) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 100);
      });
    });

    await new Promise(r => setTimeout(r, 1000));

    // Get page dimensions (cap at 1440×5000 to avoid absurdly tall pages)
    const dimensions = await page.evaluate(() => ({
      width: Math.min(document.body.scrollWidth || 1440, 1440),
      height: Math.min(document.body.scrollHeight || 900, 5000)
    }));

    await page.setViewport({ width: dimensions.width, height: dimensions.height });

    // Capture screenshot
    const screenshotBuffer = await page.screenshot({
      type: 'png',
      fullPage: false,
      clip: { x: 0, y: 0, width: dimensions.width, height: Math.min(dimensions.height, 3600) }
    });

    const dataUrl = `data:image/png;base64,${screenshotBuffer.toString('base64')}`;

    return res.json({
      success: true,
      url: targetUrl,
      dataUrl,
      width: dimensions.width,
      height: Math.min(dimensions.height, 3600)
    });

  } catch (err) {
    console.error('[Screenshot] Error:', err.message);
    return res.status(500).json({ error: err.message });
  } finally {
    if (browser) {
      try { await browser.close(); } catch {}
    }
  }
});

// ─── GET /api/search — Real-time Web Search & Domain Reader ────────────────
app.get('/api/search', async (req, res) => {
  const q = String(req.query.q || '').trim();
  if (!q) return res.json({ success: true, query: '', results: [] });

  const results = [];

  // 1. Direct Domain / Website Inspection if query looks like a domain or URL
  const domainMatch = q.match(/(?:https?:\/\/)?([a-zA-Z0-9-]+\.(?:com|org|net|io|ai|app|dev|co|edu|gov|me|tech|site|online|xyz|info)[^\s]*)/i);
  if (domainMatch) {
    const rawUrl = domainMatch[1];
    const targetUrl = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;
    try {
      const siteRes = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        signal: AbortSignal.timeout(6000)
      });

      if (siteRes.ok) {
        const html = await siteRes.text();
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i) ||
                              html.match(/<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["']/i);
        const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);

        // Strip HTML tags for sample text snippet
        const bodySnippet = html
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 500);

        const pageTitle = titleMatch ? titleMatch[1].trim() : rawUrl;
        const pageDesc = metaDescMatch ? metaDescMatch[1].trim() : (h1Match ? h1Match[1].trim() : bodySnippet.slice(0, 200));

        results.push({
          title: pageTitle,
          snippet: `${pageDesc} — Live snapshot of ${targetUrl}: ${bodySnippet.slice(0, 300)}...`,
          url: targetUrl,
          isDirectSite: true
        });
      }
    } catch (siteErr) {
      console.warn(`[WebSearch] Direct fetch of ${targetUrl} skipped:`, siteErr.message);
    }
  }

  // 2. DuckDuckGo Instant Answer API
  try {
    const ddgApiRes = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(q)}&format=json&no_html=1&skip_disambig=1`, {
      signal: AbortSignal.timeout(5000)
    });
    if (ddgApiRes.ok) {
      const ddgData = await ddgApiRes.json();
      if (ddgData.Heading && ddgData.AbstractText) {
        results.push({
          title: ddgData.Heading,
          snippet: ddgData.AbstractText,
          url: ddgData.AbstractURL || 'https://duckduckgo.com'
        });
      }
      if (Array.isArray(ddgData.RelatedTopics)) {
        for (const topic of ddgData.RelatedTopics.slice(0, 4)) {
          if (topic.Text) {
            results.push({
              title: topic.Text.split(' - ')[0] || q,
              snippet: topic.Text,
              url: topic.FirstURL || 'https://duckduckgo.com'
            });
          }
        }
      }
    }
  } catch (ddgErr) {
    console.warn('[WebSearch] DuckDuckGo API error:', ddgErr.message);
  }

  // 3. DuckDuckGo HTML Search Scraper (for general queries)
  if (results.length === 0) {
    try {
      const htmlRes = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(q)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        },
        signal: AbortSignal.timeout(6000)
      });
      if (htmlRes.ok) {
        const html = await htmlRes.text();
        const resultRegex = /<a class="result__url"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<a class="result__snippet"[^>]*>([\s\S]*?)<\/a>/g;
        let match;
        let c = 0;
        while ((match = resultRegex.exec(html)) !== null && c < 5) {
          const rawLink = match[1];
          const snippet = match[3].replace(/<[^>]+>/g, '').trim();
          if (snippet) {
            results.push({
              title: q,
              snippet,
              url: rawLink
            });
            c++;
          }
        }
      }
    } catch (htmlErr) {
      console.warn('[WebSearch] HTML scraper error:', htmlErr.message);
    }
  }

  // 4. Default Fallback
  if (results.length === 0) {
    results.push({
      title: `${q} - Overview`,
      snippet: `Information and online services related to ${q}.`,
      url: `https://duckduckgo.com/?q=${encodeURIComponent(q)}`
    });
  }

  return res.json({ success: true, query: q, results });
});

// ─── POST /api/terminal ──────────────────────────────────────────────────────
// body: { command: string, cwd?: string }
// Streams SSE: { type: 'stdout'|'stderr'|'exit', text?, code? }
app.post('/api/terminal', (req, res) => {
  const { command, cwd } = req.body;
  if (!command || !command.trim()) {
    return res.status(400).json({ error: 'command required' });
  }

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  const send = (obj) => {
    try { res.write(`data: ${JSON.stringify(obj)}\n\n`); } catch {}
  };

  const workDir = cwd || process.cwd();

  const proc = spawn(command, [], {
    cwd: workDir,
    shell: true,
    env: { ...process.env, FORCE_COLOR: '0' }
  });

  proc.stdout.on('data', (data) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.trim()) send({ type: 'stdout', text: line });
    }
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().split('\n');
    for (const line of lines) {
      if (line.trim()) send({ type: 'stderr', text: line });
    }
  });

  proc.on('close', (code) => {
    send({ type: 'exit', code });
    res.end();
  });

  proc.on('error', (err) => {
    send({ type: 'stderr', text: err.message });
    send({ type: 'exit', code: 1 });
    res.end();
  });

  req.on('close', () => {
    try { proc.kill(); } catch {}
  });
});

// ─── POST /api/browse ─────────────────────────────────────────────────────────
// body: { url: string }
// Returns { ok, url, title, text, html } — full readable text of any page
app.post('/api/browse', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'url required' });

  const targetUrl = url.match(/^https?:\/\//i) ? url : `https://${url}`;

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache'
      },
      signal: AbortSignal.timeout(15000)
    });

    const html = await response.text();

    // Extract title
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : targetUrl;

    // Strip scripts, styles, nav, footer, head — keep body content
    const cleaned = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
      .replace(/<nav\b[^<]*(?:(?!<\/nav>)<[^<]*)*<\/nav>/gi, '')
      .replace(/<footer\b[^<]*(?:(?!<\/footer>)<[^<]*)*<\/footer>/gi, '')
      .replace(/<head\b[^<]*(?:(?!<\/head>)<[^<]*)*<\/head>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/\s{2,}/g, ' ')
      .trim();

    // Cap at 12000 chars to stay within token budget
    const text = cleaned.slice(0, 12000);

    res.json({ ok: true, url: targetUrl, title, text, statusCode: response.status });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message, url: targetUrl });
  }
});

// ─── POST /api/run-cmd ────────────────────────────────────────────────────────
// body: { command: string, cwd?: string }
// Returns { ok, stdout, stderr, code } — Calvras calls this autonomously
app.post('/api/run-cmd', async (req, res) => {
  const { command, cwd } = req.body;
  if (!command || !command.trim()) {
    return res.status(400).json({ error: 'command required' });
  }

  const workDir = cwd || process.cwd();
  let stdout = '';
  let stderr = '';

  try {
    const result = await new Promise((resolve) => {
      const proc = spawn(command, [], {
        cwd: workDir,
        shell: true,
        env: { ...process.env, FORCE_COLOR: '0' }
      });

      proc.stdout.on('data', d => { stdout += d.toString(); });
      proc.stderr.on('data', d => { stderr += d.toString(); });
      proc.on('close', code => resolve({ code }));
      proc.on('error', err => resolve({ code: 1, error: err.message }));

      // 30 second timeout
      setTimeout(() => {
        try { proc.kill(); } catch {}
        resolve({ code: -1, timedOut: true });
      }, 30000);
    });

    res.json({
      ok: result.code === 0,
      code: result.code,
      stdout: stdout.slice(0, 8000),
      stderr: stderr.slice(0, 4000),
      timedOut: result.timedOut || false,
      command
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

const pendingCodes = new Map(); // email -> { code, expires }

const mailer = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER || 'calvrasnoreply@gmail.com',
    pass: (process.env.GMAIL_APP_PASSWORD || 'fzneujgmuxpzhtwf').replace(/\s/g, ''),
  },
});

app.post('/api/send-code', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'email required' });

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 10 * 60 * 1000; // 10 minutes
  pendingCodes.set(email.toLowerCase(), { code, expires });

  try {
    await mailer.sendMail({
      from: `"Calvras" <calvrasnoreply@gmail.com>`,
      to: email,
      subject: `Your Calvras verification code: ${code}`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0f0f0e;color:#ececed;padding:40px;border-radius:16px">
          <h2 style="margin:0 0 8px;font-size:22px;font-weight:800;color:#fff">Verify your email</h2>
          <p style="margin:0 0 32px;color:#888;font-size:14px">Enter this code in Calvras to continue.</p>
          <div style="background:#1a1a1a;border:1px solid #333;border-radius:12px;padding:28px;text-align:center;letter-spacing:0.3em;font-size:36px;font-weight:900;color:#fff;font-family:monospace">${code}</div>
          <p style="margin:24px 0 0;color:#555;font-size:12px">This code expires in 10 minutes. If you didn't request this, ignore this email.</p>
        </div>
      `,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('[SendCode] Mail error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
});

app.post('/api/verify-code', (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ error: 'email and code required' });

  const entry = pendingCodes.get(email.toLowerCase());
  if (!entry) return res.status(400).json({ error: 'No code found for this email. Please request a new one.' });
  if (Date.now() > entry.expires) {
    pendingCodes.delete(email.toLowerCase());
    return res.status(400).json({ error: 'Code expired. Please request a new one.' });
  }
  if (entry.code !== code.trim()) {
    return res.status(400).json({ error: 'Incorrect code. Please try again.' });
  }

  pendingCodes.delete(email.toLowerCase());
  res.json({ ok: true });
});

// ─── POST /api/voice-chat — Fast voice conversation endpoint ──────────────────
// Uses concurrent model racing and ultra-concise spoken English for instant speech replies
// body: { messages: [{role, content}] }
app.post('/api/voice-chat', async (req, res) => {
  const { messages = [] } = req.body;
  if (!messages.length) return res.status(400).json({ error: 'messages required' });

  const cleanSpokenText = (text) => {
    if (!text) return '';
    return text
      .replace(/```[\s\S]*?```/g, '')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/[*_~#>[\]]/g, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const VOICE_SYSTEM = `You are Calvras, a super-fast voice assistant.
Rules:
- Reply in EXACTLY 1 short, natural sentence (under 12 words).
- No markdown, no lists, no emojis, no asterisks.
- Speak directly and concisely like a real voice call.`;

  const fullMessages = [
    { role: 'system', content: VOICE_SYSTEM },
    ...messages.slice(-6)
  ];

  const candidateModels = [
    'openrouter/free',
    'minimax/minimax-m3:free',
    'minimax/minimax-m2.7:free'
  ];

  const callModel = async (model) => {
    const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://calvras.ai',
        'X-Title': 'Calvras Voice'
      },
      body: JSON.stringify({
        model,
        messages: fullMessages,
        temperature: 0.6,
        max_tokens: 45,
      }),
      signal: AbortSignal.timeout(4500)
    });

    if (!r.ok) throw new Error(`${model} status ${r.status}`);
    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error('empty content');
    const cleaned = cleanSpokenText(text);
    if (!cleaned) throw new Error('empty after clean');
    return cleaned;
  };

  // Race candidate models concurrently — first to respond wins
  try {
    const winnerText = await Promise.any(candidateModels.map(callModel));
    return res.json({ text: winnerText });
  } catch (err) {
    console.warn('[VoiceChat] Concurrent race failed, trying secondary fallback:', err.message);
  }

  // Fallback fast reply
  res.json({ text: "I'm with you. How can I help?" });
});

// ─── POST /api/tts — Kokoro TTS (persistent worker, fast replies) ────────────
// body: { text: string, voice?: string, speed?: number }
// Returns: audio/wav binary
const ttsPyPath = path.join(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Z]:)/, '$1')), 'tts.py');

let ttsWorker = null;
let ttsNextId = 1;
const ttsPending = new Map();

function getTtsWorker() {
  if (ttsWorker && !ttsWorker.killed) return ttsWorker;

  const worker = spawn('python', [ttsPyPath, '--worker'], { shell: false, stdio: ['pipe', 'pipe', 'pipe'] });
  ttsWorker = worker;

  let buf = '';
  worker.stdout.on('data', (chunk) => {
    buf += chunk.toString('utf-8');
    let idx;
    while ((idx = buf.indexOf('\n')) !== -1) {
      const line = buf.slice(0, idx).trim();
      buf = buf.slice(idx + 1);
      if (!line) continue;
      try {
        const msg = JSON.parse(line);
        if (msg.ready) continue;
        const pending = ttsPending.get(msg.id);
        if (pending) {
          ttsPending.delete(msg.id);
          clearTimeout(pending.timer);
          if (msg.error) pending.reject(new Error(msg.error));
          else pending.resolve(msg.wav);
        }
      } catch { /* partial/parse noise — ignore */ }
    }
  });

  worker.stderr.on('data', (d) => {
    const t = d.toString().trim();
    if (t) console.warn('[TTS worker]', t);
  });

  const cleanup = () => {
    if (ttsWorker !== worker) return;
    ttsWorker = null;
    for (const [, pending] of ttsPending) {
      clearTimeout(pending.timer);
      pending.reject(new Error('TTS worker stopped'));
    }
    ttsPending.clear();
  };
  worker.on('exit', cleanup);
  worker.on('error', cleanup);

  return worker;
}

async function ttsRequest(text, voice, speed) {
  const worker = getTtsWorker();
  const id = ttsNextId++;

  const result = new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      if (ttsPending.has(id)) {
        ttsPending.delete(id);
        reject(new Error('TTS timeout'));
      }
    }, 45000);
    ttsPending.set(id, { resolve, reject, timer });
  });

  const payload = JSON.stringify({ id, text, voice, speed }) + '\n';
  const flushed = worker.stdin.write(payload, 'utf-8');
  if (!flushed) {
    await Promise.race([
      new Promise(r => worker.stdin.once('drain', r)),
      new Promise(r => setTimeout(r, 5000))
    ]);
  }
  return result;
}

app.post('/api/tts', async (req, res) => {
  const { text, voice = 'expressive', speed = 1.15 } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'text required' });

  try {
    const wavB64 = await ttsRequest(text.trim().slice(0, 2000), voice, speed);
    const wav = Buffer.from(wavB64, 'base64');
    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Length', wav.length);
    res.send(wav);
  } catch (err) {
    console.error('[TTS] Worker error:', err.message);
    res.status(500).json({ error: err.message || 'TTS generation failed' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Calvras backend running on http://localhost:${PORT}`);
  // Pre-warm the TTS worker (loads Kokoro model in background) so the first
  // voice reply isn't slow.
  setTimeout(() => {
    try { getTtsWorker(); console.log('[TTS] Worker pre-warmed.'); } catch (e) { console.warn('[TTS] Pre-warm failed:', e.message); }
  }, 800);
});

process.on('uncaughtException', (err) => {
  console.warn('[Server] Uncaught exception caught safely:', err.message);
});

process.on('unhandledRejection', (err) => {
  console.warn('[Server] Unhandled rejection caught safely:', err?.message || err);
});
