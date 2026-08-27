export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    },
  });
}

async function getUsageForKey(token, env) {
  const trimmed = (token || '').trim();
  if (!trimmed) return { promptsUsed: 0, lastUsed: null };

  // 1. Check Cloudflare KV if configured
  if (env?.CALVRAS_KV) {
    try {
      const kvVal = await env.CALVRAS_KV.get(`key_usage_${trimmed}`);
      if (kvVal) return JSON.parse(kvVal);
    } catch (e) {}
  }

  // 2. Check Cloudflare caches.default
  try {
    if (typeof caches !== 'undefined' && caches.default) {
      const cacheUrl = new Request(`https://calvras.com/internal-key-cache/${encodeURIComponent(trimmed)}`);
      const cachedRes = await caches.default.match(cacheUrl);
      if (cachedRes) {
        return await cachedRes.json();
      }
    }
  } catch (e) {}

  return { promptsUsed: 0, lastUsed: null };
}

export async function onRequestGet({ request, env }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    'Content-Type': 'application/json',
  };

  try {
    const url = new URL(request.url);
    const key = url.searchParams.get('key') || '';
    const keysParam = url.searchParams.get('keys') || '';

    let keyList = [];
    if (key) keyList.push(key);
    if (keysParam) {
      try {
        const parsed = JSON.parse(keysParam);
        if (Array.isArray(parsed)) keyList.push(...parsed);
      } catch (e) {
        keyList.push(...keysParam.split(','));
      }
    }

    const results = {};
    for (const k of keyList) {
      results[k] = await getUsageForKey(k, env);
    }

    return new Response(
      JSON.stringify({ success: true, usage: results }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error?.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestPost({ request, env }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    'Content-Type': 'application/json',
  };

  try {
    const body = await request.json().catch(() => ({}));
    const keys = Array.isArray(body.keys) ? body.keys : (body.key ? [body.key] : []);

    const results = {};
    for (const k of keys) {
      results[k] = await getUsageForKey(k, env);
    }

    return new Response(
      JSON.stringify({ success: true, usage: results }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error?.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}
