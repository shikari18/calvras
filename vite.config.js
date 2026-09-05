import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function webSearchMiddlewarePlugin() {
  return {
    name: 'web-search-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/search' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { query } = JSON.parse(body || '{}');
              if (!query) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'query required' }));
              }
              const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
              const ddgRes = await fetch(ddgUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                  'Accept-Language': 'en-US,en;q=0.9'
                }
              });
              const html = await ddgRes.text();
              const results = [];
              const regex = /<h2 class="result__title">[\s\S]*?<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/h2>[\s\S]*?<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/gi;
              let match;
              while ((match = regex.exec(html)) !== null && results.length < 6) {
                const rawUrl = match[1];
                let cleanUrl = rawUrl;
                if (rawUrl.includes('uddg=')) {
                  try {
                    cleanUrl = decodeURIComponent(rawUrl.split('uddg=')[1].split('&')[0]);
                  } catch {}
                }
                const title = match[2].replace(/<[^>]+>/g, '').trim();
                const snippet = match[3].replace(/<[^>]+>/g, '').trim();
                if (title && cleanUrl) {
                  results.push({ title, url: cleanUrl, snippet });
                }
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, query, results }));
            } catch (e) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, error: e.message, results: [] }));
            }
          });
          return;
        }

        if (req.url === '/api/browse' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const { url } = JSON.parse(body || '{}');
              if (!url) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'url required' }));
              }
              let cleanUrl = url.trim();
              if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
                cleanUrl = `https://${cleanUrl}`;
              }

              // 1. Try Jina Reader
              try {
                const jinaRes = await fetch(`https://r.jina.ai/${cleanUrl}`, {
                  headers: { 'Accept': 'text/plain' },
                  signal: AbortSignal.timeout(15000)
                });
                if (jinaRes.ok) {
                  const text = await jinaRes.text();
                  const titleMatch = text.match(/^Title:\s*(.+)$/m);
                  const title = titleMatch ? titleMatch[1].trim() : cleanUrl;
                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  return res.end(JSON.stringify({ ok: true, url: cleanUrl, title, text: text.slice(0, 10000) }));
                }
              } catch {}

              // 2. Direct fetch fallback
              const directRes = await fetch(cleanUrl, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
                signal: AbortSignal.timeout(15000)
              });
              const html = await directRes.text();
              const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
              const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : cleanUrl;
              const cleanText = html
                .replace(/<script[\s\S]*?<\/script>/gi, '')
                .replace(/<style[\s\S]*?<\/style>/gi, '')
                .replace(/<[^>]+>/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true, url: cleanUrl, title, text: cleanText.slice(0, 10000) }));
            } catch (e) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, error: e.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), webSearchMiddlewarePlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
