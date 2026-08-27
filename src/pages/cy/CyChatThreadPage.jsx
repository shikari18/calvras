import React, { useState, useRef, useEffect } from 'react';
import { 
  Paperclip, 
  Sparkles, 
  Clock, 
  Send, 
  Check, 
  Copy, 
  Share2, 
  Hash,
  X,
  AlertCircle,
  Menu
} from 'lucide-react';
import { chatWithMarketingCopilot, cleanAiResponse } from '../../services/aiService';
import { MarkdownRenderer } from '../../components/MarkdownRenderer';
import { useMarketing } from '../../context/MarketingContext';
import { BrandBurstLogo } from '../../components/cy/CySidebar';

export const CyChatThreadPage = ({ 
  initialPrompt, 
  channelName = 'general', 
  threadTitle = 'Strategy Workspace', 
  userName = 'SHIKARI Ogar', 
  onUpdateThreadTitle,
  onToggleSidebar,
  onNavigateToContents
}) => {
  const { 
    userProfile,
    businessProfile, 
    campaigns, 
    metrics, 
    tasks, 
    contentList, 
    connectedSocials,
    credits,
    deductCredits,
    chatMessages,
    addChatMessage,
    updateThreadTitleInContext
  } = useMarketing();

  const [inputVal, setInputVal] = useState('');
  const [attachedImage, setAttachedImage] = useState(null);
  const [isWorking, setIsWorking] = useState(false);
  const [workingSeconds, setWorkingSeconds] = useState(0);
  const [copiedId, setCopiedId] = useState(null);
  const [creditAlert, setCreditAlert] = useState(false);
  const [streamingMsgId, setStreamingMsgId] = useState(null);
  const [streamingText, setStreamingText] = useState('');
  
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const isSubmittingRef = useRef(false);
  const hasProcessedInitialPrompt = useRef(false);

  // Auto-resize textarea when value changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      if (inputVal) {
        const nextHeight = Math.min(Math.max(textareaRef.current.scrollHeight, 40), 220);
        textareaRef.current.style.height = `${nextHeight}px`;
      }
    }
  }, [inputVal]);

  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() && !hasProcessedInitialPrompt.current) {
      hasProcessedInitialPrompt.current = true;
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isWorking, streamingText]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAttachedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (customPrompt) => {
    const query = customPrompt || inputVal;
    if ((!query || !query.trim()) && !attachedImage) return;
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    if (!deductCredits(5)) {
      setCreditAlert(true);
      isSubmittingRef.current = false;
      return;
    }

    const userText = query.trim();
    const currentImg = attachedImage;
    setInputVal('');
    setAttachedImage(null);

    // Add User Message
    const userMsgId = `user-${Date.now()}`;
    const userMsg = {
      id: userMsgId,
      sender: 'user',
      name: userProfile?.name || userName || 'SHIKARI',
      avatar: userProfile?.picture || null,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: userText,
      image: currentImg
    };

    addChatMessage(userMsg);
    setIsWorking(true);
    setWorkingSeconds(0);

    const timer = setInterval(() => {
      setWorkingSeconds((prev) => prev + 1);
    }, 1000);

    try {
      const response = await chatWithMarketingCopilot({
        userMessage: userText,
        prompt: userText,
        message: userText,
        history: chatMessages || [],
        userProfile,
        businessProfile,
        campaigns,
        metrics,
        tasks,
        contentList,
        connectedSocials,
        attachedImage: currentImg
      });

      clearInterval(timer);
      setIsWorking(false);
      isSubmittingRef.current = false;

      const aiMsgId = `ai-${Date.now()}`;
      const cleaned = cleanAiResponse(response);

      const aiMsg = {
        id: aiMsgId,
        sender: 'ai',
        name: 'Calvras',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: cleaned
      };

      addChatMessage(aiMsg);

      // Smooth streaming text effect
      setStreamingMsgId(aiMsgId);
      setStreamingText('');

      const words = cleaned.split(' ');
      let currentIdx = 0;
      let accumulated = '';
      const totalWords = words.length;
      const intervalSpeed = totalWords > 200 ? 12 : 20;

      const streamTimer = setInterval(() => {
        if (currentIdx < words.length) {
          accumulated += (currentIdx === 0 ? '' : ' ') + words[currentIdx];
          setStreamingText(accumulated);
          currentIdx++;
        } else {
          clearInterval(streamTimer);
          setStreamingMsgId(null);
          setStreamingText('');
        }
      }, intervalSpeed);

    } catch (err) {
      setIsWorking(false);
      const errorMsg = {
        id: `calvras-err-${Date.now() + 1}`,
        sender: 'ai',
        name: 'Calvras',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: `⚠️ **Request Timeout or Connection Interrupted**: ${err?.message || 'The AI engine took longer than expected to formulate the full campaign strategy.'}\n\nPlease click your prompt below to retry.`
      };

      addChatMessage(errorMsg);
      isSubmittingRef.current = false;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const seenIds = new Set();
  const displayMessages = (chatMessages || []).filter((msg, idx, arr) => {
    if (!msg || !msg.id || seenIds.has(msg.id)) return false;
    // Filter out consecutive duplicate user messages
    if (idx > 0) {
      const prev = arr[idx - 1];
      if (prev && prev.sender === msg.sender && (prev.text || '').trim() === (msg.text || '').trim()) {
        return false;
      }
    }
    seenIds.add(msg.id);
    return true;
  });

  return (
    <div className="flex-1 min-h-screen bg-white flex flex-col justify-between font-sans antialiased text-neutral-900 select-none">
      
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Top Header */}
      <header className="px-4 sm:px-6 py-3.5 border-b border-neutral-200 flex items-center justify-between bg-white/90 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-2">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-1.5 -ml-1 hover:bg-neutral-100 rounded-xl text-neutral-600 transition cursor-pointer"
              title="Open Menu"
            >
              <Menu size={16} />
            </button>
          )}
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
            <Hash size={14} className="text-neutral-400" />
            <span>{channelName}</span>
          </div>
          <span className="text-neutral-300">|</span>
          <span className="text-xs text-neutral-500 font-normal truncate max-w-[120px] sm:max-w-xs">{threadTitle}</span>
        </div>

        {/* Credit Indicator in Header */}
        <div className="flex items-center gap-2">
          <div className="text-[11px] font-semibold text-neutral-700 bg-neutral-100 px-3 py-1 rounded-full border border-neutral-200 shadow-2xs font-mono">
            <span>{credits?.remaining ?? 1000} credits</span>
          </div>
        </div>
      </header>

      {/* Credit Alert Toast */}
      {creditAlert && (
        <div className="p-3 bg-rose-950/60 border-b border-rose-800 text-rose-200 text-xs flex items-center justify-between px-6">
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle size={14} className="text-rose-400" />
            <span>You have 0 credits remaining. Please upgrade your plan in Billing to continue.</span>
          </div>
          <button 
            onClick={() => setCreditAlert(false)}
            className="text-rose-400 hover:text-white font-bold text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Chat Messages List */}
      <main className="flex-1 p-6 max-w-4xl w-full mx-auto space-y-6 overflow-y-auto">
        {displayMessages.map((msg) => (
          <div key={msg.id} className={`w-full flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in duration-150`}>
            {msg.sender === 'user' ? (
              /* User Message (Right Aligned) */
              <div className="max-w-[85%] sm:max-w-[75%] space-y-1 text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className="text-[10.5px] text-neutral-400 font-normal">{msg.time}</span>
                  <span className="text-xs font-bold text-neutral-900">{msg.name}</span>
                  <div className="w-6 h-6 rounded-md bg-neutral-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 overflow-hidden shadow-2xs">
                    {(msg.avatar || userProfile?.picture) ? (
                      <img 
                        src={msg.avatar || userProfile?.picture} 
                        referrerPolicy="no-referrer"
                        alt={msg.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <span>{(msg.name || userProfile?.name || 'U').charAt(0).toUpperCase()}</span>
                    )}
                  </div>
                </div>

                {/* User Uploaded Image Card */}
                {msg.image && (
                  <div className="flex justify-end pt-1">
                    <div className="max-w-xs rounded-2xl border border-neutral-200 overflow-hidden bg-neutral-50 shadow-xs p-2">
                      <img 
                        src={msg.image} 
                        alt="Uploaded Creative" 
                        className="w-full h-auto max-h-64 object-contain rounded-xl"
                      />
                    </div>
                  </div>
                )}

                {/* User Message Bubble */}
                <div className="inline-block text-left bg-neutral-900 text-white px-4 py-2.5 rounded-2xl rounded-tr-xs shadow-xs text-[13.5px] leading-[1.6]">
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ) : (
              /* AI Message (Left Aligned) */
              <div className="w-full max-w-3xl space-y-1.5 text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 shadow-2xs">
                      <BrandBurstLogo size={16} />
                    </div>
                    <span className="text-xs font-bold text-neutral-900">{msg.name}</span>
                    <span className="text-[10.5px] text-neutral-400 font-normal">{msg.time}</span>
                  </div>

                  {/* Copy / Share Action */}
                  <div className="flex items-center gap-1 text-neutral-400">
                    <button 
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="p-1 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition cursor-pointer" 
                      title={copiedId === msg.id ? "Copied!" : "Copy response"}
                    >
                      {copiedId === msg.id ? (
                        <Check size={13} className="text-emerald-600" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                    <button className="p-1 hover:text-neutral-900 hover:bg-neutral-100 rounded-md transition cursor-pointer" title="Share">
                      <Share2 size={13} />
                    </button>
                  </div>
                </div>

                {/* AI Message Body */}
                <div className="pl-8 text-[13.5px] text-neutral-800 leading-[1.65] font-normal">
                  {msg.id === streamingMsgId ? (
                    <div className="chatgpt-stream-chunk">
                      <MarkdownRenderer content={streamingText} />
                      <span className="chatgpt-cursor" />
                    </div>
                  ) : (
                    <MarkdownRenderer content={msg.text} />
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Thinking Indicator */}
        {isWorking && (
          <div className="space-y-1.5 text-left animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0 shadow-2xs">
                <BrandBurstLogo size={16} />
              </div>
              <span className="text-xs font-bold text-neutral-900">Calvras</span>
              <span className="text-[10.5px] text-neutral-400 font-normal">Just now</span>
            </div>

            <div className="pl-8 select-none py-1">
              <span className="thinking-glance-text">Thinking...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Bottom Sticky Reply Input Box */}
      <footer className="p-6 max-w-4xl w-full mx-auto bg-white">
        
        {/* Attached Image Preview Card */}
        {attachedImage && (
          <div className="mb-2 relative inline-block">
            <div className="w-16 h-16 rounded-xl border border-neutral-200 overflow-hidden bg-neutral-50 shadow-xs relative">
              <img src={attachedImage} alt="Attachment" className="w-full h-full object-cover" />
            </div>
            <button
              onClick={() => setAttachedImage(null)}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] shadow-sm hover:bg-red-600 transition cursor-pointer"
            >
              <X size={10} />
            </button>
          </div>
        )}

        <div className="bg-white border-2 border-neutral-200 hover:border-neutral-300 focus-within:border-neutral-950 rounded-2xl p-3 shadow-xs transition text-left space-y-2 relative">
          
          <textarea
            ref={textareaRef}
            rows="1"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Reply in thread (5 credits per prompt)..."
            className="w-full bg-transparent resize-none focus:outline-none text-[13px] text-neutral-900 placeholder:text-neutral-400 leading-relaxed font-normal overflow-y-auto max-h-56 min-h-[38px] transition-all"
          />

          <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
            <div className="flex items-center gap-2 text-neutral-400">
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="hover:text-neutral-700 p-1 rounded-lg hover:bg-neutral-100 transition cursor-pointer" 
                title="Attach file"
              >
                <Paperclip size={14} />
              </button>

              <button 
                type="button" 
                className="hover:text-neutral-700 p-1 rounded-lg hover:bg-neutral-100 transition cursor-pointer" 
                title="Schedule"
              >
                <Clock size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={(!inputVal.trim() && !attachedImage) || isWorking}
              className="w-7 h-7 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 text-white flex items-center justify-center transition cursor-pointer shadow-xs active:scale-95"
            >
              <Send size={12} />
            </button>
          </div>
        </div>

      </footer>

    </div>
  );
};
