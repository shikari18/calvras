/**
 * VoiceConversation — full speech-to-speech conversation loop.
 * Flow: listen → /api/voice-chat (edge fn or local) → speak (browser TTS or Kokoro) → repeat
 *
 * Works both on calvras.com (Cloudflare Pages) and localhost.
 */
import React, { useEffect, useRef, useState } from 'react';

// ── Smart URL detection ───────────────────────────────────────────────────────
// On localhost:5173 or localhost:3001 → use local Express backend
// On any deployed domain → use relative Cloudflare Pages Function path
const IS_LOCAL = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const VOICE_CHAT_URL = IS_LOCAL
  ? 'http://localhost:3001/api/voice-chat'
  : '/api/voice-chat';  // Cloudflare Pages Function (edge)

const TTS_URL = IS_LOCAL
  ? 'http://localhost:3001/api/tts'
  : null; // No server TTS in cloud — use browser speech synthesis

// ── TTS ───────────────────────────────────────────────────────────────────────
let _currentAudio = null;
let _utterance = null;

// Pick the best English female voice available
function pickVoice() {
  if (!window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find(v => /en[-_]US/i.test(v.lang) && /female|samantha|zira|aria|google us english/i.test(v.name)) ||
    voices.find(v => /en[-_]GB/i.test(v.lang) && /female|hazel|kate|google/i.test(v.name)) ||
    voices.find(v => /en[-_](US|GB|AU)/i.test(v.lang)) ||
    null
  );
}

function speakWithBrowser(text) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) { resolve(); return; }
    window.speechSynthesis.cancel();

    const u = new SpeechSynthesisUtterance(text.trim().slice(0, 2000));
    u.lang = 'en-US';
    u.rate = 1.1;
    u.pitch = 1.05;
    u.volume = 1.0;

    // voices may load async
    const doSpeak = () => {
      const v = pickVoice();
      if (v) u.voice = v;
      _utterance = u;
      u.onend = () => { _utterance = null; resolve(); };
      u.onerror = () => { _utterance = null; resolve(); };
      window.speechSynthesis.speak(u);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      doSpeak();
    } else {
      window.speechSynthesis.onvoiceschanged = doSpeak;
    }
  });
}

async function speakWithKokoro(text) {
  return new Promise(async (resolve) => {
    if (_currentAudio) {
      try { _currentAudio.pause(); _currentAudio.src = ''; } catch {}
      _currentAudio = null;
    }
    try {
      const res = await fetch(TTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, voice: 'af_bella' }),
      });
      if (!res.ok) throw new Error(`TTS ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      _currentAudio = new Audio(url);
      _currentAudio.onended = () => { URL.revokeObjectURL(url); _currentAudio = null; resolve(); };
      _currentAudio.onerror = () => { URL.revokeObjectURL(url); _currentAudio = null; resolve(); };
      await _currentAudio.play();
    } catch (err) {
      console.warn('[VoiceTTS] Kokoro failed, falling back to browser:', err.message);
      await speakWithBrowser(text);
      resolve();
    }
  });
}

function playTTS(text) {
  // Cloud: always browser TTS (instant, no server needed)
  // Local: try Kokoro ONNX first, browser as fallback
  if (!TTS_URL) return speakWithBrowser(text);
  return speakWithKokoro(text);
}

function stopTTS() {
  if (_currentAudio) {
    try { _currentAudio.pause(); _currentAudio.src = ''; } catch {}
    _currentAudio = null;
  }
  if (_utterance) {
    try { window.speechSynthesis?.cancel(); } catch {}
    _utterance = null;
  }
}

// ── STT ───────────────────────────────────────────────────────────────────────
function listenOnce() {
  return new Promise((resolve) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) { resolve(''); return; }

    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';
    rec.maxAlternatives = 1;

    let done = false;
    const finish = (val) => {
      if (done) return;
      done = true;
      resolve(val || '');
    };

    rec.onresult = (e) => finish(e.results[0]?.[0]?.transcript?.trim() || '');
    rec.onend = () => finish('');
    rec.onerror = (e) => { console.warn('[VoiceSTT]', e.error); finish(''); };

    try { rec.start(); } catch (err) { finish(''); }
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function VoiceConversation({ isActive, setVoicePhase }) {
  const activeRef = useRef(false);
  const historyRef = useRef([]);

  const updatePhase = (p) => {
    setVoicePhase(p);
  };

  useEffect(() => {
    if (!isActive) {
      activeRef.current = false;
      stopTTS();
      updatePhase('idle');
      return;
    }

    activeRef.current = true;
    historyRef.current = [];

    // Pre-load browser voices on activation
    if (window.speechSynthesis) window.speechSynthesis.getVoices();

    const loop = async () => {
      while (activeRef.current) {
        // ── Listen ──────────────────────────────────────────────────────────
        updatePhase('listening');

        const transcript = await listenOnce();

        if (!activeRef.current) break;
        if (!transcript.trim()) continue;

        // ── Think ────────────────────────────────────────────────────────────
        updatePhase('speaking');

        historyRef.current.push({ role: 'user', content: transcript });

        let replyText = '';
        try {
          const res = await fetch(VOICE_CHAT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: historyRef.current.slice(-8) }),
          });
          if (!res.ok) throw new Error(`AI ${res.status}`);
          const data = await res.json();
          replyText = data.text || '';
        } catch (err) {
          console.error('[VoiceChat]', err.message);
          await new Promise(r => setTimeout(r, 800));
          continue;
        }

        if (!activeRef.current) break;
        if (!replyText) continue;

        historyRef.current.push({ role: 'assistant', content: replyText });

        // ── Speak ────────────────────────────────────────────────────────────
        await playTTS(replyText);

        if (!activeRef.current) break;
        await new Promise(r => setTimeout(r, 200));
      }

      updatePhase('idle');
    };

    loop();

    return () => {
      activeRef.current = false;
      stopTTS();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  // Headless — no UI rendered
  return null;
}
