// Global in-memory edge cache for API key usage tracking
export const GLOBAL_KEY_USAGE = globalThis.__CALVRAS_KEY_USAGE__ || (globalThis.__CALVRAS_KEY_USAGE__ = new Map());

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
      const trimmed = (k || '').trim();
      if (!trimmed) continue;

      let usageData = GLOBAL_KEY_USAGE.get(trimmed);

      // Check KV if configured
      if (!usageData && env?.CALVRAS_KV) {
        try {
          const kvVal = await env.CALVRAS_KV.get(`key_usage_${trimmed}`);
          if (kvVal) usageData = JSON.parse(kvVal);
        } catch (e) {}
      }

      results[trimmed] = usageData || {
        promptsUsed: 0,
        lastUsed: null,
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        usage: results,
      }),
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
      const trimmed = (k || '').trim();
      if (!trimmed) continue;

      let usageData = GLOBAL_KEY_USAGE.get(trimmed);
      if (!usageData && env?.CALVRAS_KV) {
        try {
          const kvVal = await env.CALVRAS_KV.get(`key_usage_${trimmed}`);
          if (kvVal) usageData = JSON.parse(kvVal);
        } catch (e) {}
      }

      results[trimmed] = usageData || {
        promptsUsed: 0,
        lastUsed: null,
      };
    }

    return new Response(
      JSON.stringify({
        success: true,
        usage: results,
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error?.message }),
      { status: 500, headers: corsHeaders }
    );
  }
}
