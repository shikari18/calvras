import express from 'express';
import cors from 'cors';
import { spawn, execSync } from 'child_process';
import { Readable } from 'stream';
import fs from 'fs';
import path from 'path';
import { assignPort, getPort, releasePort } from './portManager.js';
import { WORKSPACE, repoPath, repoExists, listFilesRecursive } from './repoManager.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

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

    // Step 2: Detect package manager
    const hasPackageJson = fs.existsSync(path.join(destPath, 'package.json'));

    if (!hasPackageJson) {
      // No Node project — just list files and return
      const files = listFilesRecursive(destPath);
      const port = null;
      send({ type: 'done', repoName, port, files });
      res.end();
      return;
    }

    // npm install
    send({ type: 'cmd', text: 'npm install' });
    const installProc = spawn('npm', ['install', '--legacy-peer-deps'], { cwd: destPath, shell: true });

    installProc.stdout.on('data', d => d.toString().split('\n').filter(Boolean).forEach(l => send({ type: 'info', text: l })));
    installProc.stderr.on('data', d => d.toString().split('\n').filter(Boolean).forEach(l => send({ type: 'info', text: l })));

    installProc.on('close', (installCode) => {
      if (installCode !== 0) {
        send({ type: 'error', text: `npm install failed with code ${installCode}` });
        res.end();
        return;
      }

      send({ type: 'success', text: '✓ Dependencies installed.' });

      // Assign port for dev server
      const port = assignPort(repoName);

      // Start dev server
      send({ type: 'cmd', text: `npm run dev -- --port ${port} --host` });

      const pkg = JSON.parse(fs.readFileSync(path.join(destPath, 'package.json'), 'utf-8'));
      const hasDevScript = pkg.scripts && pkg.scripts.dev;
      const devArgs = hasDevScript
        ? ['run', 'dev', '--', '--port', String(port), '--host']
        : ['run', 'start'];

      const devProc = spawn('npm', devArgs, { cwd: destPath, shell: true });

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

      // Active verification: Poll until HTTP 200 is confirmed
      let attempts = 0;
      const verifyServer = async () => {
        if (devVerified) return;
        try {
          const checkRes = await fetch(`http://localhost:${port}`, { signal: AbortSignal.timeout(1200) });
          if (checkRes.ok || checkRes.status === 200 || checkRes.status === 304) {
            devVerified = true;
            send({ type: 'success', text: `✓ Verified live preview at http://localhost:${port}` });
            const files = listFilesRecursive(destPath);
            send({ type: 'done', repoName, port, files });
            res.end();
            return;
          }
        } catch { /* waiting for server to bind */ }

        attempts++;
        if (attempts < 30) {
          setTimeout(verifyServer, 500);
        } else {
          // Timeout fallback
          devVerified = true;
          const files = listFilesRecursive(destPath);
          send({ type: 'done', repoName, port, files });
          res.end();
        }
      };

      setTimeout(verifyServer, 1000);
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

// ─── GET /api/search ──────────────────────────────────────────────────────────
// Searches full repository file tree and text contents for query terms
app.get('/api/search', (req, res) => {
  const { repo, q } = req.query;
  if (!repo || !q) return res.status(400).json({ error: 'repo and q are required' });
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
  const { token, message = 'Update from Malvos' } = req.body;
  if (!repoExists(repo)) return res.status(404).json({ error: 'Repo not found' });
  if (!token) return res.status(400).json({ error: 'GitHub token required' });

  const cwd = repoPath(repo);

  try {
    // Get remote URL and inject token
    const remoteUrl = execSync('git remote get-url origin', { cwd }).toString().trim();
    const urlObj = new URL(remoteUrl.replace('git@github.com:', 'https://github.com/').replace(/\.git$/, '') + '.git');
    const authedUrl = `${urlObj.protocol}//${token}@${urlObj.host}${urlObj.pathname}`;

    execSync('git config user.email "malvos@ai.local"', { cwd });
    execSync('git config user.name "Malvos"', { cwd });
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
  'minimax/minimax-m2.7:free',
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  'openrouter/free'
];

const MALVOS_SYSTEM_PROMPT = `You are Malvos, an elite Autonomous Software Architect and Full-Stack Coding Engine.

IMPORTANT INSTRUCTION FOR REASONING:
Before providing your code or answer, ALWAYS begin your response with a deep, thorough step-by-step thinking process enclosed inside <think>...</think> tags.
In your <think> block:
1. Analyze user requirements, UI design, color palette, and architecture.
2. Outline components, state structure, and dependencies needed.
3. Plan out the complete file implementation with zero placeholders.

After the </think> tag, output your production-ready, zero-fluff code immediately with markdown file headers (e.g. \`\`\`tsx file=src/App.tsx) and direct actionable explanations.`;

app.post('/api/v1/chat/completions', async (req, res) => {
  const { 
    messages: rawMessages, 
    model = 'SHIKARI2/Malvos-32B-Merged', 
    temperature = 0.3, 
    max_tokens = 4096, 
    top_p = 0.95,
    stream = false 
  } = req.body;

  const hfToken = req.headers.authorization?.replace(/^Bearer\s+/i, '') || process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN || '';

  if (!rawMessages || !Array.isArray(rawMessages)) {
    return res.status(400).json({ error: { message: 'Invalid messages array required' } });
  }

  const hasSystem = rawMessages.some(m => m.role === 'system');
  const messages = hasSystem 
    ? rawMessages 
    : [{ role: 'system', content: MALVOS_SYSTEM_PROMPT }, ...rawMessages];

  // 1. Primary Engine: Custom Fine-Tuned Models (Malvos-7B-Instruct Serverless -> Malvos-32B)
  if (hfToken) {
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
              model: 'Malvos'
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
          'HTTP-Referer': 'https://malvos.ai',
          'X-Title': 'Malvos'
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
              model: 'Malvos'
            });
          }
        }
      }
      const errData = await orResp.json().catch(() => null);
      lastFailoverError = errData?.error?.message || `Status ${orResp.status}`;
    } catch (failErr) {
      lastFailoverError = failErr.message;
    }
  }

  return res.status(503).json({
    error: {
      message: 'All model inference engines temporarily busy. Please retry.',
      type: 'inference_error',
      details: lastFailoverError
    }
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Malvos backend running on http://localhost:${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.warn('[Server] Uncaught exception caught safely:', err.message);
});

process.on('unhandledRejection', (err) => {
  console.warn('[Server] Unhandled rejection caught safely:', err?.message || err);
});
