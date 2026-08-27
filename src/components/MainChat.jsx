import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, ChevronDown, Mic, MicOff, ArrowUp, FileCode, X,
  Loader2, Search, Code2, Database, Globe, FileText
} from 'lucide-react';
import ChatMessage from './ChatMessage';
import { BUILD_MODES } from '../data/mockData';
import { generateAIResponse } from '../services/aiService';

// ─── Smart activity label ─────────────────────────────────────────────────────
function getActivitySteps(query) {
  const q = (query || '').toLowerCase().trim();
  if (q.length < 20 || /^(hey|hi|hello|what|who|how are|thanks|ok|cool|sure|yes|no|lol)/.test(q)) {
    return [{ icon: null, label: 'Thinking...' }];
  }
  if (/debug|error|fix|broken|crash|undefined|null|failed/.test(q)) {
    return [
      { icon: Search,   label: 'Scanning for root cause...' },
      { icon: Code2,    label: 'Applying targeted fix...' },
      { icon: FileText, label: 'Writing corrected output...' },
    ];
  }
  if (/migrat|upgrade|convert|refactor|rename/.test(q)) {
    return [
      { icon: Code2,    label: 'Analyzing legacy code...' },
      { icon: FileText, label: 'Generating migration diff...' },
      { icon: Code2,    label: 'Verifying type safety...' },
    ];
  }
  if (/build|scaffold|create|generate|make|fullstack|saas|app|website/.test(q)) {
    return [
      { icon: Search,   label: 'Analyzing requirements...' },
      { icon: Code2,    label: 'Designing architecture...' },
      { icon: FileCode, label: 'Writing files...' },
      { icon: Database, label: 'Structuring data models...' },
    ];
  }
  if (/database|schema|postgres|sql|prisma|migration/.test(q)) {
    return [
      { icon: Database, label: 'Designing schema...' },
      { icon: Code2,    label: 'Writing migration scripts...' },
    ];
  }
  if (/search|find|explain|what is|how does/.test(q)) {
    return [
      { icon: Globe,    label: 'Searching documentation...' },
      { icon: FileText, label: 'Compiling results...' },
    ];
  }
  return [
    { icon: Code2,    label: 'Analyzing your request...' },
    { icon: FileText, label: 'Generating response...' },
  ];
}

// ─── Live Activity Indicator ──────────────────────────────────────────────────
function LiveActivityIndicator({ query }) {
  const steps = getActivitySteps(query);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    if (steps.length <= 1) return;
    const t = setInterval(() => setStep(p => (p + 1) % steps.length), 1800);
    return () => clearInterval(t);
  }, [query]);

  const { icon: Icon, label } = steps[Math.min(step, steps.length - 1)];

  return (
    <div className="flex items-center gap-2.5 py-2 select-none">
      <Loader2 size={14} className="text-pink-400 animate-spin flex-shrink-0" />
      {Icon && <Icon size={13} className="text-neutral-500 flex-shrink-0" />}
      <span className="text-[13px] text-neutral-400">{label}</span>
    </div>
  );
}

// ─── Toolbar shared between hero and reply inputs ─────────────────────────────
function InputToolbar({ activeBuildMode, setActiveBuildMode, showDropdown, setShowDropdown, isHero, isRecording, setIsRecording, input, onSend, onAttach }) {
  return (
    <div className="flex items-center justify-between pt-1">
      <button onClick={onAttach} className="p-1 text-neutral-400 hover:text-white transition-colors" title="Attach file">
        <Plus size={isHero ? 18 : 15} strokeWidth={2} />
      </button>

      <div className="flex items-center gap-2">
        {isHero && (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(p => !p)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-neutral-200 hover:text-white bg-[#222222] hover:bg-[#2a2a2a] border border-[#2e2e2e] transition-colors"
            >
              <span>{activeBuildMode}</span>
              <ChevronDown size={12} className="text-neutral-400" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 bottom-full mb-2 w-52 bg-[#161616] border border-[#2e2e2e] rounded-2xl p-1.5 shadow-2xl z-50">
                {BUILD_MODES.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => { setActiveBuildMode(mode.name); setShowDropdown(false); }}
                    className={`flex flex-col w-full px-2.5 py-1.5 rounded-xl text-left text-xs transition-colors ${
                      activeBuildMode === mode.name ? 'bg-[#242424] text-white font-semibold' : 'text-neutral-300 hover:bg-[#1e1e1e]'
                    }`}
                  >
                    <span>{mode.name}</span>
                    <span className="text-[10px] text-neutral-400">{mode.desc}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <button
          onClick={() => setIsRecording(r => !r)}
          className={`p-1.5 rounded-lg transition-colors ${isRecording ? 'text-red-400 animate-pulse' : 'text-neutral-400 hover:text-white'}`}
          title="Voice input"
        >
          {isRecording ? <MicOff size={15} /> : <Mic size={15} />}
        </button>

        <button
          onClick={onSend}
          disabled={!input.trim()}
          className={`flex items-center justify-center w-6 h-6 rounded-full transition-all ${
            input.trim() ? 'bg-white text-black hover:scale-105 shadow' : 'bg-[#242424] text-neutral-500'
          }`}
        >
          <ArrowUp size={13} strokeWidth={2.2} />
        </button>
      </div>
    </div>
  );
}

// ─── Main Chat ────────────────────────────────────────────────────────────────
export default function MainChat({
  messages,
  setMessages,
  sidebarCollapsed,
  setSidebarCollapsed,
  onUserMessage
}) {
  const [input, setInput] = useState('');
  const [activeBuildMode, setActiveBuildMode] = useState('Build');
  const [showBuildDropdown, setShowBuildDropdown] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);

  const heroTextareaRef = useRef(null);
  const replyTextareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);
  const latestTurnRef = useRef(null);

  const isHeroMode = messages.length === 0;

  useEffect(() => {
    if (messages.length > 0 && latestTurnRef.current) {
      latestTurnRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [messages.length, isThinking]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const ref = isHeroMode ? heroTextareaRef : replyTextareaRef;
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, 150)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileAttach = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setAttachedFiles(prev => [...prev, ...files.map(f => ({ name: f.name, size: (f.size / 1024).toFixed(1) + ' KB' }))]);
    }
  };

  const removeFile = (i) => setAttachedFiles(prev => prev.filter((_, j) => j !== i));

  const handleSend = async (textToSend = null) => {
    const query = typeof textToSend === 'string' ? textToSend : input.trim();
    if (!query && attachedFiles.length === 0) return;

    if (setSidebarCollapsed) setSidebarCollapsed(true);

    const userMsg = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      files: attachedFiles,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLastQuery(query);
    setAttachedFiles([]);
    if (heroTextareaRef.current) heroTextareaRef.current.style.height = 'auto';
    if (replyTextareaRef.current) replyTextareaRef.current.style.height = 'auto';
    if (onUserMessage) onUserMessage(query);

    setIsThinking(true);

    try {
      const response = await generateAIResponse({ messages: history, mode: activeBuildMode.toLowerCase() });

      setIsThinking(false);
      setIsStreaming(true);

      let idx = 0;
      setStreamingText('');
      const chunkSize = Math.max(3, Math.floor(response.length / 80));
      const streamInterval = setInterval(() => {
        idx += chunkSize;
        if (idx >= response.length) {
          clearInterval(streamInterval);
          setIsStreaming(false);
          setMessages(prev => [...prev, {
            id: `msg-resp-${Date.now()}`,
            role: 'assistant',
            content: response,
            mode: activeBuildMode,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          setStreamingText('');
        } else {
          setStreamingText(response.slice(0, idx));
        }
      }, 14);

    } catch (err) {
      setIsThinking(false);
      setIsStreaming(false);
      setMessages(prev => [...prev, {
        id: `msg-resp-${Date.now()}`,
        role: 'assistant',
        content: `### Error\n\n${err.message || 'Failed to connect to AI engine.'}\n\nPlease try again.`,
        mode: activeBuildMode,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  const lastUserIndex = messages.map(m => m.role).lastIndexOf('user');

  // Shared file attachment badge row
  const FileAttachments = () =>
    attachedFiles.length > 0 ? (
      <div className="flex flex-wrap gap-2 mb-2">
        {attachedFiles.map((file, i) => (
          <div key={i} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#202020] border border-[#2e2e2e] text-xs text-neutral-200">
            <FileCode size={13} className="text-blue-400" />
            <span className="truncate max-w-[120px]">{file.name}</span>
            <button onClick={() => removeFile(i)} className="text-neutral-400 hover:text-white ml-1"><X size={12} /></button>
          </div>
        ))}
      </div>
    ) : null;

  return (
    <div className="relative flex flex-col flex-1 h-full overflow-hidden bg-[#161616] text-[#ededed] select-none">

      {/* ── Scrollable chat area ── */}
      <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 w-full scrollbar-thin scroll-smooth bg-[#161616]">

        {/* ── Hero / empty state: prompt box centered ── */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center min-h-[90vh] max-w-4xl mx-auto w-full text-center px-4">
            <h1 className="text-[34px] sm:text-[42px] font-bold text-white tracking-tight mb-7">
              What can I build for you?
            </h1>

            <div className="relative w-full max-w-[560px] rounded-[22px] bg-[#161616] border border-[#2c2c2c] p-3.5 shadow-2xl text-left focus-within:border-[#444444] transition-all">
              <FileAttachments />
              <textarea
                ref={heroTextareaRef}
                rows={2}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask CODED to build a fullstack app, design an API, or debug code..."
                className="w-full bg-transparent resize-none outline-none text-[14px] text-white placeholder-neutral-500 leading-relaxed font-normal max-h-[150px]"
              />
              <input type="file" ref={fileInputRef} onChange={handleFileAttach} multiple className="hidden" />
              <InputToolbar
                activeBuildMode={activeBuildMode}
                setActiveBuildMode={setActiveBuildMode}
                showDropdown={showBuildDropdown}
                setShowDropdown={setShowBuildDropdown}
                isHero={true}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                input={input}
                onSend={handleSend}
                onAttach={() => fileInputRef.current?.click()}
              />
            </div>
          </div>
        )}

        {/* ── Active chat stream ── */}
        {messages.length > 0 && (
          <div className="w-full max-w-[560px] mx-auto space-y-4 pt-4 pb-6">
            {messages.map((msg, index) => (
              <div key={msg.id} ref={index === lastUserIndex ? latestTurnRef : null} className="transition-all duration-300">
                <ChatMessage
                  message={msg}
                  onRegenerate={() => handleSend(messages[lastUserIndex]?.content)}
                />
              </div>
            ))}

            {isThinking && (
              <div className="w-full max-w-[560px] mx-auto pl-1">
                <LiveActivityIndicator query={lastQuery} />
              </div>
            )}

            {isStreaming && (
              <div className="w-full max-w-[560px] mx-auto py-2 text-left">
                <div className="text-[14px] leading-relaxed text-[#ededed] font-normal whitespace-pre-wrap">
                  {streamingText}
                  <span className="streaming-cursor" />
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Sticky reply dock (only visible after first message) ── */}
      {messages.length > 0 && (
        <div className="sticky bottom-0 left-0 right-0 p-3.5 bg-gradient-to-t from-[#161616] via-[#161616]/95 to-transparent z-30">
          <div className="max-w-[560px] mx-auto">
            <div className="relative rounded-[22px] bg-[#161616] border border-[#2c2c2c] p-3.5 shadow-2xl text-left focus-within:border-[#444444] transition-all">
              <FileAttachments />
              <textarea
                ref={replyTextareaRef}
                rows={1}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Reply..."
                className="w-full bg-transparent resize-none outline-none text-[14px] text-white placeholder-neutral-500 leading-relaxed font-normal max-h-[150px]"
              />
              <input type="file" ref={fileInputRef} onChange={handleFileAttach} multiple className="hidden" />
              <InputToolbar
                activeBuildMode={activeBuildMode}
                setActiveBuildMode={setActiveBuildMode}
                showDropdown={showBuildDropdown}
                setShowDropdown={setShowBuildDropdown}
                isHero={false}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                input={input}
                onSend={handleSend}
                onAttach={() => fileInputRef.current?.click()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
