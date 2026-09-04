/**
 * Cloudflare Pages Function: /api/voice-chat
 * Runs on the edge globally — handles all request methods without 405.
 * Races free OpenRouter models for sub-second reply.
 */

const OPENROUTER_KEY = (typeof atob !== 'undefined'
  ? atob('c2stb3ItdjEtMWM1YmJlYjk0ODNiNzlmODVhODdlN2IzNzNlZmE2NDViMjcyMGJkMDg4NTMzZTVhOTY5Y2I0MGQzZTc0MDZhNQ==')
  : '');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

async function handleVoiceRequest(request) {
  try {
    let messages = [];
    try {
      const body = await request.json();
      messages = body.messages || [];
    } catch {
      return new Response(JSON.stringify({ text: "Hello! How can I help you build today?" }), {
        status: 200,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

    if (!messages.length) {
      return new Response(JSON.stringify({ text: "I'm listening. What would you like to build?" }), {
        status: 200,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }

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

    const VOICE_SYSTEM = `You are Calvras, a super-fast conversational AI coding assistant.
Rules:
- Reply in EXACTLY 1 short, natural, friendly sentence (under 14 words).
- No markdown, no bullet points, no code blocks, no emojis.
- Speak conversationally and directly like a real human software engineer.`;

    const fullMessages = [
      { role: 'system', content: VOICE_SYSTEM },
      ...messages.slice(-6),
    ];

    const candidateModels = [
      'google/gemma-4-26b-a4b-it:free',
      'minimax/minimax-m3:free',
      'nvidia/nemotron-3.5-lightning:free',
      'openrouter/free',
    ];

    const callModel = async (model) => {
      const r = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://calvras.com',
          'X-Title': 'Calvras Voice',
        },
        body: JSON.stringify({
          model,
          messages: fullMessages,
          temperature: 0.6,
          max_tokens: 50,
        }),
        signal: AbortSignal.timeout(4500),
      });

      if (!r.ok) throw new Error(`${model} status ${r.status}`);
      const data = await r.json();
      const text = data?.choices?.[0]?.message?.content?.trim();
      if (!text) throw new Error('empty content');
      const cleaned = cleanSpokenText(text);
      if (!cleaned) throw new Error('empty after clean');
      return cleaned;
    };

    try {
      const winnerText = await Promise.any(candidateModels.map(callModel));
      return new Response(JSON.stringify({ text: winnerText }), {
        status: 200,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    } catch {
      return new Response(JSON.stringify({ text: "I'm right here with you. What should we work on?" }), {
        status: 200,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ text: "I'm listening. Tell me what to code." }), {
      status: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
}

export async function onRequest(context) {
  if (context.request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: CORS });
  }
  return handleVoiceRequest(context.request);
}

export async function onRequestPost(context) {
  return onRequest(context);
}

export async function onRequestOptions() {
  return new Response(null, { status: 200, headers: CORS });
}
