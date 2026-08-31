/**
 * VoiceConversation — full speech-to-speech conversation loop.
 * Flow: listen → /api/voice-chat (fast model) → /api/tts (Kokoro af_heart) → repeat
 */
import React, { useEffect, useRef, useState } from 'react';

const VOICE_CHAT_URL = 'http://localhost:3001/api/voice-chat';
const TTS_URL = 'http://localhost:3001/api/tts';

// ── Inline TTS (no import needed, avoids stale closure) ──────────────────────
let _currentAudio = null;

function playTTS(text) {
  return new Promise(async (resolve) => {
    // Stop any current audio
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
      console.warn('[VoiceTTS]', err.message);
      resolve();
    }
  });
}

function stopTTS() {
  if (_currentAudio) {
    try { _currentAudio.pause(); _currentAudio.src = ''; } catch {}
    _currentAudio = null;
  }
}

// ── Inline STT ────────────────────────────────────────────────────────────────
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
  const [status, setStatus] = useState('');
  const [phase, setPhase] = useState('idle'); // local phase for display

  const updatePhase = (p) => {
    setPhase(p);
    setVoicePhase(p);
  };

  useEffect(() => {
    if (!isActive) {
      activeRef.current = false;
      stopTTS();
      updatePhase('idle');
      setStatus('');
      return;
    }

    activeRef.current = true;
    historyRef.current = [];

    const loop = async () => {
      while (activeRef.current) {
        // ── Listen ────────────────────────────────────────────────────────
        updatePhase('listening');
        setStatus('Listening...');

        const transcript = await listenOnce();

        if (!activeRef.current) break;
        if (!transcript.trim()) continue; // silence — listen again

        // ── Think ─────────────────────────────────────────────────────────
        updatePhase('speaking');
        setStatus('Thinking...');

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
          setStatus('Error — retrying...');
          await new Promise(r => setTimeout(r, 800));
          continue;
        }

        if (!activeRef.current) break;
        if (!replyText) continue;

        historyRef.current.push({ role: 'assistant', content: replyText });

        // ── Speak ─────────────────────────────────────────────────────────
        setStatus('Speaking...');
        await playTTS(replyText);

        if (!activeRef.current) break;
        // small pause before listening again
        await new Promise(r => setTimeout(r, 200));
      }

      updatePhase('idle');
      setStatus('');
    };

    loop();

    return () => {
      activeRef.current = false;
      stopTTS();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  // Pure headless speech-to-speech engine — no floating button/pill above the input
  return null;
}
