import { useState, useRef, useEffect, useCallback } from 'react';

export const useVoiceInput = ({ onTranscript, onStateChange } = {}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef(null);
  const baseTextRef = useRef('');

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      recognitionRef.current = null;
    }
    setIsListening(false);
    if (onStateChange) onStateChange(false);
  }, [onStateChange]);

  const startListening = useCallback((currentValue = '', updateCallback) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      setErrorMessage('Speech recognition is not supported in this browser.');
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      baseTextRef.current = currentValue ? currentValue.trim() + ' ' : '';
      setErrorMessage('');

      recognition.onstart = () => {
        setIsListening(true);
        if (onStateChange) onStateChange(true);
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptChunk;
          } else {
            interimTranscript += transcriptChunk;
          }
        }

        const spoken = finalTranscript || interimTranscript;
        if (spoken) {
          const combined = (baseTextRef.current + spoken).trimStart();
          if (updateCallback) {
            updateCallback(combined);
          } else if (onTranscript) {
            onTranscript(combined);
          }
        }
      };

      recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access denied. Please enable microphone permissions in your browser.');
        } else if (event.error !== 'no-speech') {
          setErrorMessage(`Voice error: ${event.error}`);
        }
        setIsListening(false);
        if (onStateChange) onStateChange(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        if (onStateChange) onStateChange(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setErrorMessage('Could not access microphone.');
      setIsListening(false);
      if (onStateChange) onStateChange(false);
    }
  }, [onTranscript, onStateChange]);

  const toggleListening = useCallback((currentValue = '', updateCallback) => {
    if (isListening) {
      stopListening();
    } else {
      startListening(currentValue, updateCallback);
    }
  }, [isListening, startListening, stopListening]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  return {
    isListening,
    isSupported,
    errorMessage,
    startListening,
    stopListening,
    toggleListening,
  };
};
