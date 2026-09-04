/**
 * VoiceConversation — Chrome-tested & hardened Speech-to-Speech Engine
 */
import React, { useEffect, useRef } from 'react';
import { generateAIResponse } from '../services/aiService';

const IS_LOCAL = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const VOICE_CHAT_URL = IS_LOCAL
  ? 'http://localhost:3001/api/voice-chat'
  : '/api/voice-chat';

const KOKORO_TTS_URL = 'http://localhost:3001/api/tts';

let _activeAudio = null;

// Global AudioContext unlocker
function unlockAudio() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    }
  } catch {}
}

function stopAllSpeech() {
  if (_activeAudio) {
    try {
      _activeAudio.pause();
      _activeAudio.src = '';
    } catch {}
    _activeAudio = null;
  }
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

// Chrome-hardened SpeechSynthesis
function speakWithChromeSynthesis(text) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(text.trim());
        utterance.rate = 1.05;
        utterance.pitch = 1.0;
        utterance.lang = 'en-US';

        const voices = window.speechSynthesis.getVoices();
        const bestVoice =
          voices.find(v => /en[-_]US/i.test(v.lang) && /female|samantha|zira|aria|google us english|victoria/i.test(v.name)) ||
          voices.find(v => /en/i.test(v.lang) && v.localService) ||
          voices.find(v => /en/i.test(v.lang)) ||
          voices[0];

        if (bestVoice) utterance.voice = bestVoice;

        let isDone = false;
        let keepAlive = null;

        const complete = () => {
          if (!isDone) {
            isDone = true;
            if (keepAlive) clearInterval(keepAlive);
            resolve();
          }
        };

        utterance.onend = complete;
        utterance.onerror = complete;

        // Keepalive ticker to prevent Chrome from freezing long utterances
        keepAlive = setInterval(() => {
          if (window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
            window.speechSynthesis.resume();
          }
        }, 3000);

        window.speechSynthesis.speak(utterance);

        // Fallback timeout in case onend never fires
        setTimeout(complete, Math.max(text.length * 120 + 2500, 4000));
      }, 50);
    } catch {
      resolve();
    }
  });
}

// Play TTS (Kokoro ONNX if local server running, else Chrome SpeechSynthesis)
async function speakResponse(text) {
  if (!text || !text.trim()) return;

  stopAllSpeech();

  // 1. Try local Kokoro TTS endpoint first
  if (IS_LOCAL) {
    try {
      const res = await fetch(KOKORO_TTS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), voice: 'af_bella' }),
        signal: AbortSignal.timeout(3500),
      });

      if (res.ok && res.headers.get('content-type')?.includes('audio')) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        return new Promise((resolve) => {
          _activeAudio = new Audio(url);
          _activeAudio.onended = () => {
            URL.revokeObjectURL(url);
            _activeAudio = null;
            resolve();
          };
          _activeAudio.onerror = () => {
            URL.revokeObjectURL(url);
            _activeAudio = null;
            speakWithChromeSynthesis(text).then(resolve);
          };
          _activeAudio.play().catch(() => {
            speakWithChromeSynthesis(text).then(resolve);
          });
        });
      }
    } catch {}
  }

  // 2. Fallback to Chrome Speech Synthesis
  return speakWithChromeSynthesis(text);
}

// Single utterance listener with fast silence detector for Chrome
function captureSpeech() {
  return new Promise((resolve) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      resolve('');
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'en-US';
    rec.maxAlternatives = 1;

    let transcript = '';
    let silenceTimer = null;
    let finished = false;

    const finalize = (text) => {
      if (finished) return;
      finished = true;
      clearTimeout(silenceTimer);
      try { rec.stop(); } catch {}
      resolve(text ? text.trim() : '');
    };

    rec.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        if (e.results[i].isFinal) {
          transcript += ' ' + e.results[i][0].transcript;
        } else {
          interim += ' ' + e.results[i][0].transcript;
        }
      }

      const spokenSoFar = (transcript + ' ' + interim).trim();
      if (spokenSoFar) {
        clearTimeout(silenceTimer);
        // After 600ms of silence after speaking, finalize immediately
        silenceTimer = setTimeout(() => {
          finalize(spokenSoFar);
        }, 600);
      }
    };

    rec.onend = () => {
      finalize(transcript);
    };

    rec.onerror = (e) => {
      if (e.error === 'no-speech') {
        finalize('');
      } else {
        console.warn('[Chrome Voice Error]', e.error);
        finalize('');
      }
    };

    try {
      rec.start();
    } catch {
      finalize('');
    }
  });
}

export default function VoiceConversation({ isActive, setVoicePhase }) {
  const activeLoopRef = useRef(false);
  const conversationHistory = useRef([]);

  useEffect(() => {
    if (!isActive) {
      activeLoopRef.current = false;
      stopAllSpeech();
      if (setVoicePhase) setVoicePhase('idle');
      return;
    }

    activeLoopRef.current = true;
    conversationHistory.current = [];

    // Unlock Chrome audio immediately on click
    unlockAudio();
    if (window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }

    // Acquire mic permission
    if (navigator.mediaDevices?.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {});
    }

    const runLoop = async () => {
      while (activeLoopRef.current) {
        // ── 1. Listening ────────────────────────────────
        if (setVoicePhase) setVoicePhase('listening');

        const userText = await captureSpeech();

        if (!activeLoopRef.current) break;
        if (!userText || !userText.trim()) {
          await new Promise(r => setTimeout(r, 150));
          continue;
        }

        // ── 2. Processing & Speaking ────────────────────
        if (setVoicePhase) setVoicePhase('speaking');

        conversationHistory.current.push({ role: 'user', content: userText });

        let reply = '';
        try {
          if (IS_LOCAL) {
            const res = await fetch(VOICE_CHAT_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ messages: conversationHistory.current.slice(-6) }),
              signal: AbortSignal.timeout(4000),
            });
            if (res.ok) {
              const data = await res.json();
              reply = data.text || '';
            }
          }
        } catch {}

        // Fallback to client AI engine with sub-second response
        if (!reply) {
          try {
            reply = await generateAIResponse({
              messages: [
                {
                  role: 'system',
                  content: 'You are Calvras Voice. Reply in EXACTLY 1 short, natural sentence (under 12 words). Never use markdown, bullet points, or code. Speak directly.'
                },
                ...conversationHistory.current.slice(-4)
              ],
              mode: 'voice'
            });
            reply = reply.replace(/```[\s\S]*?```/g, '').replace(/[*_~#>[\]]/g, '').trim();
          } catch (aiErr) {
            reply = "I'm with you. What would you like to build?";
          }
        }

        if (!activeLoopRef.current) break;
        if (!reply) continue;

        conversationHistory.current.push({ role: 'assistant', content: reply });

        // ── 3. Play Spoken Audio ────────────────────────
        await speakResponse(reply);

        if (!activeLoopRef.current) break;
        await new Promise(r => setTimeout(r, 200));
      }

      if (setVoicePhase) setVoicePhase('idle');
    };

    runLoop();

    return () => {
      activeLoopRef.current = false;
      stopAllSpeech();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return null;
}
