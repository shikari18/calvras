import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Mic, MicOff, Volume2, VolumeX, Sparkles, PhoneOff, Radio } from 'lucide-react';
import { chatWithMarketingCopilot } from '../../services/aiService';

export const AudioWaveformIcon = ({ size = 16, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M4 10V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 6V18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M12 3V21" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 7V17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M20 10V14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const CyLiveVoiceOverlay = ({ isOpen, onClose, onNewMessage, initialTranscript = "" }) => {
  // Voice states: 'listening' | 'thinking' | 'speaking' | 'paused'
  const [voiceState, setVoiceState] = useState('listening');
  const [liveTranscript, setLiveTranscript] = useState(initialTranscript || '');
  const [aiSpokenText, setAiSpokenText] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [isVoiceOutputMuted, setIsVoiceOutputMuted] = useState(false);
  
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const isMountedRef = useRef(true);
  const currentUtteranceRef = useRef(null);

  // Clean utterance text for TTS (strip markdown asterisks, hashes, urls)
  const cleanForSpeech = (text) => {
    return text
      .replace(/```[\s\S]*?```/g, 'Code snippet provided in chat.')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/#+\s/g, '')
      .replace(/[*_~]/g, '')
      .replace(/https?:\/\/\S+/g, 'link')
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
      .replace(/<[^>]*>/g, '')
      .trim();
  };

  // Speak text using browser speech synthesis
  const speakText = useCallback((text) => {
    if (!synthRef.current || isVoiceOutputMuted) {
      setVoiceState('listening');
      return;
    }

    try {
      synthRef.current.cancel(); // Stop any prior speech
      const cleaned = cleanForSpeech(text);
      if (!cleaned) {
        setVoiceState('listening');
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 1.05; // natural snappy rate
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      // Pick best natural voice if available
      const voices = synthRef.current.getVoices?.() || [];
      const naturalVoice = voices.find(v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Karen')) && v.lang.startsWith('en')) || voices.find(v => v.lang.startsWith('en'));
      if (naturalVoice) utterance.voice = naturalVoice;

      utterance.onstart = () => {
        if (isMountedRef.current) setVoiceState('speaking');
      };

      utterance.onend = () => {
        if (isMountedRef.current) {
          setVoiceState('listening');
          startSpeechRecognition();
        }
      };

      utterance.onerror = () => {
        if (isMountedRef.current) {
          setVoiceState('listening');
          startSpeechRecognition();
        }
      };

      currentUtteranceRef.current = utterance;
      synthRef.current.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      setVoiceState('listening');
      startSpeechRecognition();
    }
  }, [isVoiceOutputMuted]);

  // Handle sending user speech to AI
  const processUserSpeech = useCallback(async (spoken) => {
    const trimmed = (spoken || '').trim();
    if (!trimmed) {
      setVoiceState('listening');
      startSpeechRecognition();
      return;
    }

    // Stop recognition while thinking/speaking
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }

    setVoiceState('thinking');
    setAiSpokenText('Thinking...');

    try {
      // Send to AI service
      const rawRes = await chatWithMarketingCopilot({ userMessage: trimmed });
      const textOutput = typeof rawRes === 'string' ? rawRes : (rawRes?.text || rawRes?.choices?.[0]?.message?.content || '');
      if (isMountedRef.current && textOutput) {
        setAiSpokenText(textOutput);
        if (onNewMessage) {
          onNewMessage(trimmed, textOutput);
        }
        speakText(textOutput);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setAiSpokenText("Sorry, I had trouble processing that. Let's try again.");
        speakText("Sorry, I had trouble processing that. Let's try again.");
      }
    }
  }, [onNewMessage, speakText]);

  // Start Speech Recognition
  const startSpeechRecognition = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition || isMuted) return;

    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch (e) {}
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      let accumulated = '';

      recognition.onstart = () => {
        if (isMountedRef.current) setVoiceState('listening');
      };

      recognition.onresult = (event) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const chunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            accumulated += ' ' + chunk;
          } else {
            interim += chunk;
          }
        }

        const currentSpoken = (accumulated + ' ' + interim).trim();
        if (isMountedRef.current) setLiveTranscript(currentSpoken);

        // Auto-detect end of sentence with a 1.4s silence timer
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        if (currentSpoken.length > 2) {
          silenceTimerRef.current = setTimeout(() => {
            if (isMountedRef.current && currentSpoken.trim().length > 2) {
              setLiveTranscript('');
              processUserSpeech(currentSpoken);
            }
          }, 1400);
        }
      };

      recognition.onerror = (e) => {
        if (e.error !== 'no-speech' && e.error !== 'aborted') {
          console.warn('Speech error:', e.error);
        }
      };

      recognition.onend = () => {
        // Auto-restart if still listening and open
        if (isMountedRef.current && voiceState === 'listening' && isOpen && !isMuted) {
          try { recognition.start(); } catch (e) {}
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.warn('Could not start speech recognition:', err);
    }
  }, [isMuted, voiceState, isOpen, processUserSpeech]);

  useEffect(() => {
    isMountedRef.current = true;
    if (isOpen) {
      setLiveTranscript('');
      setAiSpokenText('');
      setVoiceState('listening');
      startSpeechRecognition();
    } else {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if (synthRef.current) {
        try { synthRef.current.cancel(); } catch (e) {}
      }
    }

    return () => {
      isMountedRef.current = false;
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if (synthRef.current) {
        try { synthRef.current.cancel(); } catch (e) {}
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex flex-col items-center pointer-events-none">
      
      {/* 🌟 1. Top Middle Dropdown Ambient Glowing Light Beam */}
      <div className="relative flex flex-col items-center pointer-events-auto">
        {/* Soft Radial Ambient Dropdown Light Rays */}
        <div 
          className="absolute -top-12 left-1/2 -translate-x-1/2 w-[480px] h-48 bg-gradient-to-b from-blue-500/40 via-blue-600/15 to-transparent blur-3xl pointer-events-none animate-pulse"
          style={{ animationDuration: voiceState === 'speaking' ? '1.5s' : '3s' }}
        />
        <div 
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-24 bg-blue-400/30 blur-2xl pointer-events-none"
        />

        {/* 🚀 2. Floating Top Pill Island (ChatGPT Voice / Siri / Dynamic Style) */}
        <div className="mt-4 sm:mt-5 mx-4 max-w-xl w-full bg-[#1c1c1c]/95 backdrop-blur-xl border border-blue-500/30 shadow-[0_20px_60px_rgba(37,99,235,0.25)] rounded-full p-2 pl-4 pr-3 flex items-center justify-between gap-4 animate-in slide-in-from-top-6 fade-in duration-300">
          
          {/* Left: Dynamic Animated Soundwave & Live State */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Pulsing Blue Waveform Circle */}
            <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
              voiceState === 'speaking'
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/50 scale-105'
                : voiceState === 'thinking'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/50 animate-pulse'
                : 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
            }`}>
              {/* Dynamic Animated Bars */}
              <div className="flex items-center gap-0.5 h-4">
                <span className={`w-0.5 bg-white rounded-full transition-all duration-150 ${
                  voiceState === 'speaking' ? 'h-4 animate-bounce' : voiceState === 'listening' ? 'h-2 animate-pulse' : 'h-1'
                }`} style={{ animationDelay: '0ms' }} />
                <span className={`w-0.5 bg-white rounded-full transition-all duration-150 ${
                  voiceState === 'speaking' ? 'h-5 animate-bounce' : voiceState === 'listening' ? 'h-3 animate-pulse' : 'h-2'
                }`} style={{ animationDelay: '150ms' }} />
                <span className={`w-0.5 bg-white rounded-full transition-all duration-150 ${
                  voiceState === 'speaking' ? 'h-3.5 animate-bounce' : voiceState === 'listening' ? 'h-4 animate-pulse' : 'h-1.5'
                }`} style={{ animationDelay: '75ms' }} />
                <span className={`w-0.5 bg-white rounded-full transition-all duration-150 ${
                  voiceState === 'speaking' ? 'h-5 animate-bounce' : voiceState === 'listening' ? 'h-2.5 animate-pulse' : 'h-1'
                }`} style={{ animationDelay: '200ms' }} />
              </div>
            </div>

            {/* Status & Live Transcript */}
            <div className="min-w-0 flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 font-mono">
                  {voiceState === 'listening' && 'Listening...'}
                  {voiceState === 'thinking' && 'Thinking...'}
                  {voiceState === 'speaking' && 'Calvras Speaking'}
                  {voiceState === 'paused' && 'Voice Paused'}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping" />
              </div>
              <p className="text-xs text-neutral-200 truncate max-w-[240px] sm:max-w-[320px] font-medium leading-snug">
                {liveTranscript || aiSpokenText || 'Speak freely with your AI marketing partner...'}
              </p>
            </div>
          </div>

          {/* Right: Quick Action Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Mute Mic */}
            <button
              type="button"
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                if (nextMuted && recognitionRef.current) {
                  try { recognitionRef.current.stop(); } catch (e) {}
                  setVoiceState('paused');
                } else {
                  startSpeechRecognition();
                }
              }}
              className={`p-2 rounded-full transition cursor-pointer ${
                isMuted ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-neutral-400 hover:text-white hover:bg-white/10'
              }`}
              title={isMuted ? "Unmute mic" : "Mute mic"}
            >
              {isMuted ? <MicOff size={15} /> : <Mic size={15} />}
            </button>

            {/* End Call / Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center transition cursor-pointer shadow-md active:scale-95 ml-1"
              title="End Voice Mode"
            >
              <PhoneOff size={13} />
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};
