/**
 * Calvras Voice Service
 * - Speech-to-Text: Web Speech API (instant, no latency)
 * - Text-to-Speech: Kokoro via /api/tts (realistic female af_heart voice)
 */

const TTS_URL = 'http://localhost:3001/api/tts';
const KOKORO_VOICE = 'af_heart'; // realistic American female

// ── Speech Recognition (STT) ─────────────────────────────────────────────────

let recognition = null;

export function startSpeechRecognition({ onResult, onEnd, onError }) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    onError?.('Speech recognition not supported in this browser.');
    return null;
  }

  recognition = new SR();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  recognition.onresult = (e) => {
    const transcript = e.results[0]?.[0]?.transcript || '';
    onResult?.(transcript);
  };

  recognition.onend = () => onEnd?.();
  recognition.onerror = (e) => onError?.(e.error);

  recognition.start();
  return recognition;
}

export function stopSpeechRecognition() {
  if (recognition) {
    try { recognition.stop(); } catch {}
    recognition = null;
  }
}

// ── Text-to-Speech via Kokoro ────────────────────────────────────────────────

let currentAudio = null;

export async function speakWithKokoro(text, { onStart, onEnd, onError } = {}) {
  if (!text?.trim()) return;

  // Stop any currently playing audio
  stopSpeaking();

  try {
    onStart?.();

    const res = await fetch(TTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.trim(), voice: KOKORO_VOICE }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }));
      throw new Error(err.error || `TTS failed: ${res.status}`);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    currentAudio = new Audio(url);
    currentAudio.onended = () => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      onEnd?.();
    };
    currentAudio.onerror = (e) => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      onError?.(e);
    };

    await currentAudio.play();
  } catch (err) {
    console.error('[VoiceService] TTS error:', err.message);
    onError?.(err.message);
    onEnd?.();
  }
}

export function stopSpeaking() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.src = '';
    currentAudio = null;
  }
}

export function isSpeaking() {
  return currentAudio !== null && !currentAudio.paused;
}
