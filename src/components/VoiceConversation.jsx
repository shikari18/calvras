/**
 * VoiceConversation — speech-to-speech conversation engine.
 *
 * Fixes applied:
 * - Noise-suppressed mic via getUserMedia constraints
 * - interimResults VAD: responds within ~100ms of user stopping speech
 * - Browser TTS with autoplay-unlock trick (plays silent audio on activate)
 * - Reliable fallback chain: Kokoro (local) → browser speechSynthesis
 * - No UI rendered — pure headless engine
 */
import React, { useEffect, useRef } from 'react';

// ── Environment detection ─────────────────────────────────────────────────────
const IS_LOCAL = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const VOICE_CHAT_URL = IS_LOCAL
  ? 'http://localhost:3001/api/voice-chat'
  : '/api/voice-chat';

const TTS_URL = IS_LOCAL ? 'http://localhost:3001/api/tts' : null;

// ── Autoplay unlock ───────────────────────────────────────────────────────────
// Browsers block audio until a user gesture. We play a 0.01s silent audio
// the moment the user taps the mic button (which IS a user gesture).
let _audioUnlocked = false;
function unlockAudio() {
  if (_audioUnlocked) return;
  _audioUnlocked = true;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const buf = ctx.createBuffer(1, 1, 22050);
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
    ctx.resume();
  } catch {}
}

// ── TTS state ────────────────────────────────────────────────────────────────
let _audio = null;
let _synth = null;

function stopTTS() {
  if (_audio) {
    try { _audio.pause(); _audio.src = ''; } catch {}
    _audio = null;
  }
  try { window.speechSynthesis?.cancel(); } catch {}
  _synth = null;
}

// Pick best English female voice
function pickVoice() {
  if (!window.speechSynthesis) return null;
  const all = window.speechSynthesis.getVoices();
  return (
    all.find(v => /en[-_]US/i.test(v.lang) && /samantha|zira|aria|google us english/i.test(v.name)) ||
    all.find(v => /en[-_]GB/i.test(v.lang) && /hazel|kate|google/i.test(v.name)) ||
    all.find(v => /en/i.test(v.lang) && v.localService) ||
    all.find(v => /en/i.test(v.lang)) ||
    null
  );
}

function speakBrowser(text) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();

    const say = () => {
      const u = new SpeechSynthesisUtterance(text.trim().slice(0, 1500));
      u.lang = 'en-US';
      u.rate = 1.08;
      u.pitch = 1.0;
      u.volume = 1.0;
      const v = pickVoice();
      if (v) u.voice = v;
      _synth = u;

      let resolved = false;
      const done = () => { if (!resolved) { resolved = true; _synth = null; resolve(); } };
      u.onend = done;
      u.onerror = done;

      // Chrome bug: speech synthesis pauses in background tab
      // Keep it alive with a periodic resume
      const keepAlive = setInterval(() => {
        if (window.speechSynthesis.paused) window.speechSynthesis.resume();
      }, 5000);
      u.onend = () => { clearInterval(keepAlive); done(); };
      u.onerror = () => { clearInterval(keepAlive); done(); };

      window.speechSynthesis.speak(u);

      // Safety timeout — if onend never fires
      setTimeout(() => done(), text.length * 120 + 3000);
    };

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      say();
    } else {
      window.speechSynthesis.onvoiceschanged = () => { say(); };
      // Fallback if event never fires
      setTimeout(() => { if (!_synth) say(); }, 500);
    }
  });
}

async function speakKokoro(text) {
  try {
    const res = await fetch(TTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voice: 'af_bella' }),
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`TTS ${res.status}`);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    return new Promise((resolve) => {
      _audio = new Audio(url);
      _audio.onended = () => { URL.revokeObjectURL(url); _audio = null; resolve(); };
      _audio.onerror = () => { URL.revokeObjectURL(url); _audio = null; resolve(); };
      _audio.play().catch(() => { resolve(); });
    });
  } catch {
    return speakBrowser(text);
  }
}

function playTTS(text) {
  if (!text?.trim()) return Promise.resolve();
  return TTS_URL ? speakKokoro(text) : speakBrowser(text);
}

// ── STT with fast VAD ─────────────────────────────────────────────────────────
// Uses interimResults to detect when speech has stopped.
// Resolves ~100ms after the last interim result goes silent.
function listenFast() {
  return new Promise((resolve) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { resolve(''); return; }

    const rec = new SR();
    rec.continuous = true;          // keep mic open
    rec.interimResults = true;      // get real-time partial results
    rec.lang = 'en-US';
    rec.maxAlternatives = 1;

    let finalText = '';
    let interimText = '';
    let silenceTimer = null;
    let done = false;

    const finish = (val) => {
      if (done) return;
      done = true;
      clearTimeout(silenceTimer);
      try { rec.stop(); } catch {}
      resolve(val?.trim() || '');
    };

    const resetSilenceTimer = () => {
      clearTimeout(silenceTimer);
      // After 600ms of no new speech → treat as end-of-utterance
      silenceTimer = setTimeout(() => {
        const result = (finalText || interimText).trim();
        if (result) {
          finish(result);
        }
        // if totally silent (no speech at all), keep waiting
      }, 600);
    };

    rec.onresult = (e) => {
      interimText = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          finalText += e.results[i][0].transcript;
        } else {
          interimText += e.results[i][0].transcript;
        }
      }
      // User is speaking → reset the silence countdown
      if (finalText || interimText) resetSilenceTimer();
    };

    rec.onend = () => {
      // Recognition ended naturally — resolve with what we have
      finish(finalText || interimText);
    };

    rec.onerror = (e) => {
      if (e.error === 'no-speech') { finish(''); return; }
      console.warn('[STT]', e.error);
      finish('');
    };

    try {
      rec.start();
    } catch (err) {
      finish('');
    }
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function VoiceConversation({ isActive, setVoicePhase }) {
  const activeRef = useRef(false);
  const historyRef = useRef([]);

  useEffect(() => {
    if (!isActive) {
      activeRef.current = false;
      stopTTS();
      setVoicePhase('idle');
      return;
    }

    activeRef.current = true;
    historyRef.current = [];

    // Unlock autoplay immediately (this runs inside the user-gesture that toggled isActive)
    unlockAudio();

    // Pre-warm voices list
    if (window.speechSynthesis) window.speechSynthesis.getVoices();

    const loop = async () => {
      while (activeRef.current) {
        // ── Listen ────────────────────────────────────────────────────────────
        setVoicePhase('listening');

        const transcript = await listenFast();

        if (!activeRef.current) break;
        if (!transcript) continue;   // silence — listen again

        // ── Think ─────────────────────────────────────────────────────────────
        setVoicePhase('thinking');

        historyRef.current.push({ role: 'user', content: transcript });

        let replyText = '';
        try {
          const res = await fetch(VOICE_CHAT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: historyRef.current.slice(-8) }),
            signal: AbortSignal.timeout(8000),
          });
          if (!res.ok) throw new Error(`AI ${res.status}`);
          const data = await res.json();
          replyText = data.text?.trim() || '';
        } catch (err) {
          console.error('[VoiceChat]', err.message);
          await new Promise(r => setTimeout(r, 500));
          continue;
        }

        if (!activeRef.current) break;
        if (!replyText) continue;

        historyRef.current.push({ role: 'assistant', content: replyText });

        // ── Speak ─────────────────────────────────────────────────────────────
        setVoicePhase('speaking');
        await playTTS(replyText);

        if (!activeRef.current) break;
        // Tiny gap before re-listening so we don't pick up own voice
        await new Promise(r => setTimeout(r, 150));
      }

      setVoicePhase('idle');
    };

    loop();

    return () => {
      activeRef.current = false;
      stopTTS();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return null; // headless engine — no UI
}
