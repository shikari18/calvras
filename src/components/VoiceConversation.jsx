/**
 * VoiceConversation — robust speech-to-speech engine.
 * Supports Kokoro ONNX TTS (localhost:3001) + Web Speech Synthesis fallback.
 */
import React, { useEffect, useRef } from 'react';

const IS_LOCAL = typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

const VOICE_CHAT_URL = IS_LOCAL
  ? 'http://localhost:3001/api/voice-chat'
  : '/api/voice-chat';

const KOKORO_TTS_URL = 'http://localhost:3001/api/tts';

// Global audio element to prevent garbage collection interrupts
let _audioInstance = null;

// Prime and unlock audio context on initial user click
function unlockAudioEngine() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
      ctx.resume();
    }
  } catch {}
}

function stopCurrentSpeech() {
  if (_audioInstance) {
    try {
      _audioInstance.pause();
      _audioInstance.src = '';
    } catch {}
    _audioInstance = null;
  }
  if (window.speechSynthesis) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}

// Browser Web Speech Synthesis fallback
function speakWithWebSpeech(text) {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      resolve();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text.trim());
      utterance.rate = 1.05;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const bestVoice =
        voices.find(v => /en[-_]US/i.test(v.lang) && /female|samantha|zira|aria|google/i.test(v.name)) ||
        voices.find(v => /en/i.test(v.lang) && v.localService) ||
        voices.find(v => /en/i.test(v.lang));
      if (bestVoice) utterance.voice = bestVoice;

      let resolved = false;
      const done = () => {
        if (!resolved) {
          resolved = true;
          resolve();
        }
      };

      utterance.onend = done;
      utterance.onerror = done;

      // Keepalive timer for browser background tab throttle
      const keepAliveTimer = setInterval(() => {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      }, 3000);

      utterance.onend = () => {
        clearInterval(keepAliveTimer);
        done();
      };
      utterance.onerror = () => {
        clearInterval(keepAliveTimer);
        done();
      };

      window.speechSynthesis.speak(utterance);
      // Safety timeout in case browser never fires onend
      setTimeout(() => {
        clearInterval(keepAliveTimer);
        done();
      }, Math.max(text.length * 100 + 2000, 4000));
    } catch {
      resolve();
    }
  });
}

// Kokoro Neural ONNX TTS with automatic fallback
async function playSpokenText(text) {
  if (!text || !text.trim()) return;

  stopCurrentSpeech();

  // Try Kokoro ONNX TTS first
  try {
    const res = await fetch(KOKORO_TTS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.trim(), voice: 'af_bella' }),
      signal: AbortSignal.timeout(4000),
    });

    if (res.ok && res.headers.get('content-type')?.includes('audio')) {
      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);
      return new Promise((resolve) => {
        _audioInstance = new Audio(audioUrl);
        _audioInstance.onended = () => {
          URL.revokeObjectURL(audioUrl);
          _audioInstance = null;
          resolve();
        };
        _audioInstance.onerror = () => {
          URL.revokeObjectURL(audioUrl);
          _audioInstance = null;
          speakWithWebSpeech(text).then(resolve);
        };
        _audioInstance.play().catch(() => {
          speakWithWebSpeech(text).then(resolve);
        });
      });
    }
  } catch {}

  // Fallback to browser speech synthesis
  return speakWithWebSpeech(text);
}

// Single utterance listener with fast silence detector
function listenForUserUtterance() {
  return new Promise((resolve) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.warn('[Voice] SpeechRecognition API not supported');
      resolve('');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    let transcript = '';
    let silenceTimer = null;
    let completed = false;

    const finish = (finalResult) => {
      if (completed) return;
      completed = true;
      clearTimeout(silenceTimer);
      try {
        recognition.stop();
      } catch {}
      resolve(finalResult ? finalResult.trim() : '');
    };

    recognition.onresult = (event) => {
      let currentInterim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const item = event.results[i];
        if (item.isFinal) {
          transcript += ' ' + item[0].transcript;
        } else {
          currentInterim += ' ' + item[0].transcript;
        }
      }

      const activeText = (transcript + ' ' + currentInterim).trim();
      if (activeText) {
        clearTimeout(silenceTimer);
        // After 700ms of silence after speaking, finalize immediately
        silenceTimer = setTimeout(() => {
          finish(activeText);
        }, 700);
      }
    };

    recognition.onend = () => {
      finish(transcript);
    };

    recognition.onerror = (e) => {
      if (e.error === 'no-speech') {
        finish('');
      } else {
        console.warn('[Voice STT Error]', e.error);
        finish('');
      }
    };

    try {
      recognition.start();
    } catch {
      finish('');
    }
  });
}

export default function VoiceConversation({ isActive, onStop, setVoicePhase }) {
  const isRunningRef = useRef(false);
  const conversationHistory = useRef([]);

  useEffect(() => {
    if (!isActive) {
      isRunningRef.current = false;
      stopCurrentSpeech();
      if (setVoicePhase) setVoicePhase('idle');
      return;
    }

    isRunningRef.current = true;
    conversationHistory.current = [];
    unlockAudioEngine();

    // Request mic access cleanly
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).catch(() => {});
    }

    const conversationLoop = async () => {
      while (isRunningRef.current) {
        // ── 1. Listen ──────────────────────────────────────────────
        if (setVoicePhase) setVoicePhase('listening');

        const userSpeech = await listenForUserUtterance();

        if (!isRunningRef.current) break;
        if (!userSpeech || !userSpeech.trim()) {
          // Brief pause before polling for speech again
          await new Promise(r => setTimeout(r, 200));
          continue;
        }

        // ── 2. Think / Fast AI Response ────────────────────────────
        if (setVoicePhase) setVoicePhase('speaking');

        conversationHistory.current.push({ role: 'user', content: userSpeech });

        let spokenReply = '';
        try {
          const res = await fetch(VOICE_CHAT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: conversationHistory.current.slice(-6) }),
            signal: AbortSignal.timeout(6000),
          });

          if (res.ok) {
            const data = await res.json();
            spokenReply = data.text || '';
          }
        } catch (err) {
          console.warn('[Voice Chat API]', err.message);
        }

        if (!isRunningRef.current) break;
        if (!spokenReply) continue;

        conversationHistory.current.push({ role: 'assistant', content: spokenReply });

        // ── 3. Speak Audio ─────────────────────────────────────────
        await playSpokenText(spokenReply);

        if (!isRunningRef.current) break;
        // Brief pause to avoid capturing echo
        await new Promise(r => setTimeout(r, 250));
      }

      if (setVoicePhase) setVoicePhase('idle');
    };

    conversationLoop();

    return () => {
      isRunningRef.current = false;
      stopCurrentSpeech();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return null;
}
