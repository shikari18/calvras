/**
 * Cloudflare Pages Function: /api/voice-chat
 * Runs on the edge globally — no localhost needed.
 * Races free OpenRouter models for fastest reply.
 */

const OPENROUTER_KEY = (typeof atob !== 'undefined'
  ? atob('c2stb3ItdjEtMWM1YmJlYjk0ODNiNzlmODVhODdlN2IzNzNlZmE2NDViMjcyMGJkMDg4NTMzZTVhOTY5Y2I0MGQzZTc0MDZhNQ==')
  : '');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { status: 200, headers: CORS });
}

export async function onRequestPost({ request }) {
  try {
    const { messages = [] } = await request.json();

    if (!messages.length) {
      return new Response(JSON.stringify({ error: 'messages required' }), {
        status: 400, headers: { ...CORS, 'Content-Type': 'application/json' }
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

    const VOICE_SYSTEM = `You are Calvras, a super-fast voice assistant.
Rules:
- Reply in EXACTLY 1 short, natural sentence (under 12 words).
- No markdown, no lists, no emojis, no asterisks.
- Speak directly and concisely like a real voice call.`;

    const fullMessages = [
      { role: 'system', content: VOICE_SYSTEM },
      ...messages.slice(-6),
    ];

    const candidateModels = [
      'openrouter/free',
      'minimax/minimax-m3:free',
      'minimax/minimax-m2.7:free',
      'google/gemma-4-26b-a4b-it:free',
      'nvidia/nemotron-3.5-lightning:free',
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
          max_tokens: 45,
        }),
        signal: AbortSignal.timeout(5000),
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
      // last resort fallback
      return new Response(JSON.stringify({ text: "I'm with you. How can I help?" }), {
        status: 200,
        headers: { ...CORS, 'Content-Type': 'application/json' },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ text: "I'm listening. Go ahead." }), {
      status: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    });
  }
}
