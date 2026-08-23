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

  // Auto-resize textarea when value changes or resets
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

  useEffect(() => {
    let interval;
    if (isWorking) {
      interval = setInterval(() => {
        setWorkingSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setWorkingSeconds(0);
    }
    return () => clearInterval(interval);
  }, [isWorking]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAttachedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSendMessage = async (textToSend) => {
    const text = (typeof textToSend === 'string' ? textToSend : inputVal).trim();
    if ((!text && !attachedImage) || isSubmittingRef.current) return;

    // Check Credit Balance (5 credits per prompt)
    const currentCredits = credits?.remaining ?? 100;
    if (currentCredits < 5) {
      setCreditAlert(true);
      return;
    }

    isSubmittingRef.current = true;
    setIsWorking(true);
    setCreditAlert(false);

    // Deduct 5 credits immediately
    deductCredits(5);

    const currentImage = attachedImage;
    setAttachedImage(null);

    const activeUserName = userProfile?.name || userName || 'You';
    const activeUserAvatar = userProfile?.picture || null;

    const userMsgId = `user-${Date.now()}`;
    const userMsg = {
      id: userMsgId,
      sender: 'user',
      name: activeUserName,
      avatar: activeUserAvatar,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: text || 'What do you think of this image / logo?',
      image: currentImage
    };

    // Grab complete chat history from beginning to end for 100% continuous memory
    const historyForAi = (chatMessages || [])
      .filter(m => m.text && m.id !== 'radius-init-1' && m.id !== 'calvras-init-1')
      .map(m => ({
        role: m.sender === 'ai' ? 'assistant' : 'user',
        content: m.text
      }));

    // Single source of truth update
    addChatMessage(userMsg);
    setInputVal('');

    if (text) {
      const cleanTitle = text.length > 30 ? text.slice(0, 30) + '...' : text;
      if (onUpdateThreadTitle) onUpdateThreadTitle(cleanTitle);
      updateThreadTitleInContext(cleanTitle);
    }

    try {
      const response = await chatWithMarketingCopilot({
        conversationHistory: historyForAi,
        userMessage: text,
        imageUrl: currentImage,
        userName: userProfile?.name || 'SHIKARI',
        businessProfile: businessProfile,
        campaigns: campaigns,
        metrics: metrics,
        tasks: tasks,
        contentList: contentList,
        connectedSocials: connectedSocials
      });

      let cleanedResponse = cleanAiResponse(response, text);
      if (!cleanedResponse || !cleanedResponse.trim()) {
        cleanedResponse = `I analyzed your marketing request. Tell me more about your specific target audience or product and I will generate the complete strategic blueprint!`;
      }
      
      const aiMsgId = `calvras-${Date.now() + 1}`;
      const aiMsg = {
        id: aiMsgId,
        sender: 'ai',
        name: 'Calvras',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: cleanedResponse
      };

      // Add to store immediately so message is ALWAYS saved & never vanishes
      addChatMessage(aiMsg);
      setIsWorking(false);
      isSubmittingRef.current = false;

      // Word stream reveal for smooth reading experience
      setStreamingMsgId(aiMsgId);
      setStreamingText('');

      const words = cleanedResponse.split(' ');
      let currentIdx = 0;
      let accumulated = '';
      const intervalSpeed = Math.max(8, Math.min(20, Math.floor(1400 / (words.length || 1))));

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
      const fallbackResponse = `To give you the best strategy or copy, what product or business are you marketing? (e.g. sneakers, skincare, fashion, watches, electronics) — tell me what you're selling and I'll generate a high-converting plan for you!`;

      const fallbackMsg = {
        id: `calvras-fallback-${Date.now() + 1}`,
        sender: 'ai',
        name: 'Calvras',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: fallbackResponse
      };

      addChatMessage(fallbackMsg);
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

  // Safe deduplicated render list
  const seenIds = new Set();
  const displayMessages = (chatMessages || []).filter(msg => {
    if (!msg || !msg.id || seenIds.has(msg.id)) return false;
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
      <header className="px-4 sm:px-6 py-3.5 border-b border-[#e5e5e7] flex items-center justify-between bg-white sticky top-0 z-20">
        <div className="flex items-center gap-2">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="md:hidden p-1.5 -ml-1 hover:bg-neutral-100 rounded-xl text-neutral-700 transition cursor-pointer"
              title="Open Menu"
            >
              <Menu size={16} />
            </button>
          )}
          <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
            <Hash size={14} className="text-neutral-500" />
            <span>{channelName}</span>
          </div>
          <span className="text-neutral-300">|</span>
          <span className="text-xs text-neutral-500 font-normal truncate max-w-[120px] sm:max-w-xs">{threadTitle}</span>
        </div>

        {/* Credit Indicator in Header */}
        <div className="flex items-center gap-2">
          <div className="text-[11px] font-semibold text-neutral-700 bg-neutral-100/90 px-3 py-1 rounded-full border border-neutral-200 shadow-2xs font-mono">
            <span>{credits?.remaining ?? 100} credits</span>
          </div>
        </div>
      </header>

      {/* Credit Alert Toast */}
      {creditAlert && (
        <div className="p-3 bg-rose-50 border-b border-rose-200 text-rose-800 text-xs flex items-center justify-between px-6">
          <div className="flex items-center gap-2 font-medium">
            <AlertCircle size={14} className="text-rose-600" />
            <span>You have 0 credits remaining. Please upgrade your plan in Billing to continue.</span>
          </div>
          <button 
            onClick={() => setCreditAlert(false)}
            className="text-rose-600 hover:text-rose-900 font-bold text-xs cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Chat Messages List */}
      <main className="flex-1 p-6 max-w-4xl w-full mx-auto space-y-6 overflow-y-auto">
        {displayMessages.map((msg) => (
          <div key={msg.id} className="space-y-1.5 text-left animate-in fade-in duration-150">
            
            {/* Header: Sender + Time + Copy Icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {msg.sender === 'ai' ? (
                  <div className="w-6 h-6 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 shadow-2xs">
                    <BrandBurstLogo size={14} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0 overflow-hidden shadow-2xs">
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
                )}
                <span className="text-xs font-bold text-neutral-900">{msg.name}</span>
                <span className="text-[10.5px] text-neutral-400 font-normal">{msg.time}</span>
              </div>

              {/* Clean Small Copy Icon (No text, No borders) */}
              {msg.sender === 'ai' && (
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
              )}
            </div>

            {/* User Uploaded Image Card */}
            {msg.image && (
              <div className="pl-8 pt-1">
                <div className="max-w-xs sm:max-w-sm rounded-2xl border border-neutral-200 overflow-hidden bg-white shadow-xs p-2">
                  <img 
                    src={msg.image} 
                    alt="Uploaded Creative" 
                    className="w-full h-auto max-h-64 object-contain rounded-xl bg-white"
                  />
                </div>
              </div>
            )}

            {/* Clean Message Body */}
            <div className="pl-8 text-[13.5px] text-neutral-800 leading-[1.65] font-normal">
              {msg.sender === 'user' ? (
                <p className="whitespace-pre-wrap">{msg.text}</p>
              ) : msg.id === streamingMsgId ? (
                <div className="chatgpt-stream-chunk">
                  <MarkdownRenderer content={streamingText} />
                  <span className="chatgpt-cursor" />
                </div>
              ) : (
                <MarkdownRenderer content={msg.text} />
              )}
            </div>

          </div>
        ))}

        {/* Sleek Thinking Indicator: Pure Black Text with White Glance Sweep (No borders / No background) */}
        {isWorking && (
          <div className="space-y-1.5 text-left animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 shadow-2xs">
                <BrandBurstLogo size={14} />
              </div>
              <span className="text-xs font-bold text-neutral-900">Calvras</span>
              <span className="text-[10.5px] text-neutral-400 font-normal">Just now</span>
            </div>

            <div className="pl-8 text-[13.5px] select-none">
              <span className="thinking-glance-text">
                Thinking...
              </span>
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
            <div className="w-16 h-16 rounded-xl border border-neutral-300 overflow-hidden bg-neutral-50 shadow-xs relative">
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

        <div className="bg-white border-2 border-neutral-200 hover:border-neutral-300 focus-within:border-neutral-900 rounded-2xl p-3 shadow-2xs transition text-left space-y-2 relative">
          
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
                className="hover:text-neutral-700 p-1 rounded-lg hover:bg-neutral-50 transition cursor-pointer" 
                title="Attach file"
              >
                <Paperclip size={14} />
              </button>

              <button 
                type="button" 
                className="hover:text-neutral-700 p-1 rounded-lg hover:bg-neutral-50 transition cursor-pointer" 
                title="Schedule"
              >
                <Clock size={14} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={(!inputVal.trim() && !attachedImage) || isWorking}
              className="w-7 h-7 rounded-xl bg-neutral-950 hover:bg-neutral-800 disabled:opacity-30 text-white flex items-center justify-center transition cursor-pointer shadow-xs active:scale-95"
            >
              <Send size={12} />
            </button>
          </div>
        </div>

      </footer>

    </div>
  );
};
