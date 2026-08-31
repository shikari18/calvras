/**
 * Kokoro Voice Service
 * TTS via local Express server /api/tts — Kokoro ONNX int8, af_heart voice (persistent worker).
 * Falls back to the browser's built-in speechSynthesis if the server TTS is unavailable,
 * so the voice ALWAYS works.
 * STT via browser Web Speech API.
 */

const TTS_URL = 'http://localhost:3001/api/tts';

// ── TTS ───────────────────────────────────────────────────────────────────────

let currentAudio = null;
let browserUtterance = null;

export async function speakText(text, {
  voice = 'af_heart',
  speed = 1.15,
  onStart,
  onEnd,
  onError,
} = {}) {
  if (!text?.trim()) return;
  stopSpeaking();

  // PRIMARY: Kokoro ONNX worker via local server (realistic, natural speech)
  try {
    await speakWithKokoro(text, {
      voice,
      speed,
      onStart,
      onEnd,
      onError: (err) => {
        // FALLBACK: browser speech synthesis if server TTS fails
        if ('speechSynthesis' in window) {
          speakWithBrowser(text, { onStart, onEnd, onError });
        } else {
          onError?.(err);
        }
      }
    });
  } catch {
    if ('speechSynthesis' in window) {
      speakWithBrowser(text, { onStart, onEnd, onError });
    }
  }
}

// Instant voice — browser's native speech synthesis (no network, no generation)
function speakWithBrowser(text, { onStart, onEnd, onError } = {}) {
  const finish = (cb) => { try { cb?.(); } catch {} };

  try {
    const u = new SpeechSynthesisUtterance(text.trim().slice(0, 2000));
    u.lang = 'en-US';
    u.rate = 1.12;
    u.pitch = 1.0;

    const pickVoice = () => {
      const voices = speechSynthesis.getVoices();
      return (
        voices.find(v => /en[-_]US/i.test(v.lang) && /female|samantha|zira|aria|google us english|natural/i.test(v.name)) ||
        voices.find(v => /en[-_]US/i.test(v.lang)) ||
        null
      );
    };
    const preferred = pickVoice();
    if (preferred) u.voice = preferred;

    u.onstart = () => {
      browserUtterance = u;
      finish(onStart);
    };
    u.onend = () => {
      browserUtterance = null;
      finish(onEnd);
    };
    u.onerror = () => {
      browserUtterance = null;
      finish(onError, 'Browser speech error');
      finish(onEnd);
    };

    // voices may load async — re-pick once they're available
    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = () => {
        const v = pickVoice();
        if (v) u.voice = v;
      };
    }

    speechSynthesis.speak(u);
  } catch (err) {
    finish(onError, err.message);
    finish(onEnd);
  }
}

// Quality voice — Kokoro ONNX via the local Express server (persistent worker)
async function speakWithKokoro(text, { voice, speed, onStart, onEnd, onError } = {}) {
  const finish = (cb) => { try { cb?.(); } catch {} };

  try {
    onStart?.();

    const res = await fetch(TTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.trim().slice(0, 2000), voice, speed }),
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
      finish(onEnd);
    };
    currentAudio.onerror = (e) => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      console.warn('[KokoroVoice] playback error:', e.message);
      finish(onError, e.message);
      finish(onEnd);
    };

    await currentAudio.play();
  } catch (err) {
    console.warn('[KokoroVoice] TTS server unavailable:', err.message);
    finish(onError, err.message);
    finish(onEnd);
  }
}

export function stopSpeaking() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.src = '';
    } catch {}
    currentAudio = null;
  }
  if ('speechSynthesis' in window) {
    try { speechSynthesis.cancel(); } catch {}
  }
  browserUtterance = null;
}

export function isSpeaking() {
  if (currentAudio) return !currentAudio.paused;
  if (browserUtterance && 'speechSynthesis' in window) return speechSynthesis.speaking;
  return false;
}

// ── STT ───────────────────────────────────────────────────────────────────────

let recognition = null;

export function startListening({ onResult, onEnd, onError } = {}) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    onError?.('Speech recognition not supported in this browser.');
    return null;
  }

  stopListening();

  recognition = new SR();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  recognition.maxAlternatives = 1;

  recognition.onresult = (e) => {
    const transcript = e.results[0]?.[0]?.transcript?.trim() || '';
    if (transcript) onResult?.(transcript);
  };

  recognition.onend = () => {
    recognition = null;
    onEnd?.();
  };

  recognition.onerror = (e) => {
    recognition = null;
    onError?.(e.error);
  };

  try {
    recognition.start();
  } catch (err) {
    onError?.(err.message);
  }

  return recognition;
}

export function stopListening() {
  if (recognition) {
    try { recognition.stop(); } catch {}
    recognition = null;
  }
}

export const KOKORO_VOICES = [
  { id: 'af_heart',   label: 'Heart (US Female)'  },
  { id: 'af_bella',   label: 'Bella (US Female)'  },
  { id: 'af_nicole',  label: 'Nicole (US Female)' },
  { id: 'af_sarah',   label: 'Sarah (US Female)'  },
  { id: 'am_adam',    label: 'Adam (US Male)'      },
  { id: 'am_michael', label: 'Michael (US Male)'   },
  { id: 'bf_emma',    label: 'Emma (UK Female)'    },
];
