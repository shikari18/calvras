/**
 * Web Search and Browsing Service for Calvras
 * Provides live web searching and full website content extraction with multi-tier failovers.
 */

/**
 * Searches the web for a query and returns top results with title, url, and snippet.
 */
export async function searchWeb(query) {
  if (!query || !query.trim()) return { ok: false, results: [] };
  const cleanQuery = query.trim();

  // Tier 1: Local API Endpoint (/api/search from Vite dev server or backend)
  try {
    const res = await fetch('/api/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: cleanQuery }),
      signal: AbortSignal.timeout(10000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && Array.isArray(data.results) && data.results.length > 0) {
        return data;
      }
    }
  } catch (e) {
    console.warn('[WebSearch] Local /api/search unavailable, trying cloud fallback:', e.message);
  }

  // Tier 2: Direct DuckDuckGo HTML scraping or mirror
  try {
    const ddgUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(cleanQuery)}`;
    const res = await fetch(ddgUrl, {
      headers: {
        'Accept': 'text/html'
      },
      signal: AbortSignal.timeout(10000)
    });

    if (res.ok) {
      const html = await res.text();
      const results = parseDuckDuckGoHtml(html);
      if (results.length > 0) {
        return { ok: true, query: cleanQuery, results };
      }
    }
  } catch (e) {
    console.warn('[WebSearch] Direct DDG fallback failed:', e.message);
  }

  return { ok: false, query: cleanQuery, results: [], error: 'No search results available' };
}

/**
 * Browses a URL and extracts readable text and metadata.
 */
export async function browseUrl(url) {
  if (!url || !url.trim()) return { ok: false, error: 'Missing URL' };
  let cleanUrl = url.trim();
  if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
    cleanUrl = `https://${cleanUrl}`;
  }

  // Tier 1: Local /api/browse
  try {
    const res = await fetch('/api/browse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: cleanUrl }),
      signal: AbortSignal.timeout(15000)
    });
    if (res.ok) {
      const data = await res.json();
      if (data.ok && data.text) return data;
    }
  } catch (e) {
    console.warn('[Browse] Local /api/browse unavailable, trying direct Jina reader fallback:', e.message);
  }

  // Tier 2: Direct Jina Reader API (free, returns clean markdown of any URL)
  try {
    const jinaUrl = `https://r.jina.ai/${cleanUrl}`;
    const res = await fetch(jinaUrl, {
      headers: {
        'Accept': 'text/plain, text/markdown'
      },
      signal: AbortSignal.timeout(15000)
    });
    if (res.ok) {
      const markdown = await res.text();
      const titleMatch = markdown.match(/^Title:\s*(.+)$/m);
      const title = titleMatch ? titleMatch[1].trim() : cleanUrl;
      return {
        ok: true,
        url: cleanUrl,
        title,
        text: markdown.slice(0, 10000)
      };
    }
  } catch (e) {
    console.warn('[Browse] Jina reader failed:', e.message);
  }

  return { ok: false, url: cleanUrl, error: 'Could not fetch website contents' };
}

/**
 * Helper to parse DuckDuckGo HTML results
 */
export function parseDuckDuckGoHtml(html) {
  const results = [];
  const regex = /<h2 class="result__title">[\s\S]*?<a[^>]*class="result__a"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<\/h2>[\s\S]*?<a[^>]*class="result__snippet"[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = regex.exec(html)) !== null && results.length < 6) {
    const rawUrl = match[1];
    let finalUrl = rawUrl;
    if (rawUrl.includes('uddg=')) {
      try {
        finalUrl = decodeURIComponent(rawUrl.split('uddg=')[1].split('&')[0]);
      } catch {}
    }
    const title = match[2].replace(/<[^>]+>/g, '').trim();
    const snippet = match[3].replace(/<[^>]+>/g, '').trim();
    if (title && finalUrl) {
      results.push({ title, url: finalUrl, snippet });
    }
  }
  return results;
}
