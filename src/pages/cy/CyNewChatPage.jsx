import React, { useState, useRef, useEffect } from 'react';
import { CyLiveVoiceOverlay, AudioWaveformIcon } from '../../components/cy/CyLiveVoiceOverlay';
import { useVoiceInput } from '../../hooks/useVoiceInput';
import { 
  Paperclip, FileText, Mic, MicOff, 
  Send, 
  CheckCircle2, 
  X, 
  Menu, 
  SquarePen, 
  Lock, 
  Sparkles, 
  ArrowRight,
  MessageSquare,
  Compass,
  ChevronDown,
  Check
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import { 
  CySocialAuthModal, 
  InstagramLogo, 
  TikTokLogo, 
  XTwitterLogo, 
  FacebookLogo 
} from '../../components/cy/CySocialAuthModal';

export const CyNewChatPage = ({ 
  onSendMessage, 
  userName = 'User', 
  onToggleSidebar, 
  onNewChat 
}) => {
  const { connectedSocials, connectSocialAccount, userProfile } = useMarketing();
  const [promptText, setPromptText] = useState('');
  const [chatMode, setChatMode] = useState('chat'); // 'chat' | 'plan'
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [authModalChannel, setAuthModalChannel] = useState(null);
  const [attachedImage, setAttachedImage] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showVoiceOverlay, setShowVoiceOverlay] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const { isListening, toggleListening, errorMessage: voiceError } = useVoiceInput();
  const modeDropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modeDropdownRef.current && !modeDropdownRef.current.contains(e.target)) {
        setShowModeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check plan for Connectors gating
  const userEmail = userProfile?.email || 'default';
  const userPlanRaw = typeof window !== 'undefined' ? localStorage.getItem(`calvras_user_plan_${userEmail}`) : null;
  const userPlan = userPlanRaw ? JSON.parse(userPlanRaw)?.planKey : 'basic';
  const hasConnectorsAccess = userPlan === 'pro' || userPlan === 'agency';

  // Dynamic user first name
  const rawName = userProfile?.name || userName || 'User';
  const displayFirstName = rawName.split(' ')[0].toUpperCase();

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      if (promptText) {
        const nextHeight = Math.min(Math.max(textareaRef.current.scrollHeight, 36), 220);
        textareaRef.current.style.height = `${nextHeight}px`;
      }
    }
  }, [promptText]);

  const socialPlatforms = [
    { id: 'Instagram', name: 'Instagram', renderIcon: () => <InstagramLogo size={16} /> },
    { id: 'TikTok', name: 'TikTok', renderIcon: () => <TikTokLogo size={15} className="text-white" /> },
    { id: 'Twitter', name: 'X / Twitter', renderIcon: () => <XTwitterLogo size={14} className="text-white" /> },
    { id: 'Facebook', name: 'Facebook', renderIcon: () => <FacebookLogo size={16} /> }
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (promptText.trim() || attachedImage) {
        onSendMessage(promptText, attachedImage, chatMode);
      }
    }
  };

  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file) => {
    if (!file) return;
    const fileName = file.name || 'attachment';
    const fileSizeStr = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
      : `${Math.round(file.size / 1024)} KB`;

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        setAttachedImage({
          type: 'image',
          name: fileName,
          size: fileSizeStr,
          data: reader.result,
          text: null
        });
      };
      reader.readAsDataURL(file);
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        const rawContent = reader.result || '';
        let cleanText = '';
        if (typeof rawContent === 'string') {
          cleanText = rawContent.replace(/[^\x20-\x7E\n\r\t]/g, ' ').replace(/\s+/g, ' ').trim();
          if (cleanText.length > 8000) cleanText = cleanText.slice(0, 8000) + '... [truncated]';
        }
        const ext = fileName.split('.').pop()?.toUpperCase() || 'DOC';
        setAttachedImage({
          type: 'document',
          docType: ext,
          name: fileName,
          size: fileSizeStr,
          data: null,
          text: cleanText || `[Attached Document: ${fileName} (${fileSizeStr})]`
        });
      };
      reader.readAsText(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  // Global paste handler for Ctrl+V
  useEffect(() => {
    const handleGlobalPaste = (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          const file = items[i].getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    };
    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, []);

  const handleConnectorClick = (platId) => {
    if (!hasConnectorsAccess) {
      setShowUpgradeModal(true);
      return;
    }
    setAuthModalChannel(platId);
  };

  return (
    <>
      <CyLiveVoiceOverlay 
        isOpen={showVoiceOverlay} 
        onClose={() => setShowVoiceOverlay(false)} 
        onNewMessage={(userText, aiText) => onSendMessage(userText, null, chatMode)}
      />
    <div className="flex-1 min-h-screen bg-[#1c1c1c] flex flex-col justify-between items-center p-4 sm:p-8 lg:p-10 font-sans antialiased text-[#f4f4ee] select-none overflow-y-auto w-full min-w-0 relative">
      
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-80 bg-gradient-to-b from-purple-900/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*,application/pdf,.doc,.docx,.txt,.csv,.json,.md" 
        className="hidden" 
      />

      {/* Social Auth Modal */}
      {authModalChannel && (
        <CySocialAuthModal
          channel={authModalChannel}
          isOpen={Boolean(authModalChannel)}
          onClose={() => setAuthModalChannel(null)}
          onConnectSuccess={(accData) => connectSocialAccount(accData)}
        />
      )}

      {/* Feature Gating Upgrade Modal for $10 Basic Users */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#242424] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#8057ff]/20 border border-[#8057ff]/40 text-[#8057ff] flex items-center justify-center mx-auto shadow-lg">
              <Lock size={22} />
            </div>

            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8057ff]/20 text-[#a88aff] text-[10px] font-bold uppercase tracking-wider">
                <Sparkles size={11} />
                <span>Pro & Agency Feature</span>
              </div>
              <h3 className="text-xl font-serif font-bold text-white tracking-tight">
                Unlock Social Connectors
              </h3>
              <p className="text-xs text-neutral-300 leading-relaxed max-w-xs mx-auto">
                Social account syncing is available on the <strong>Pro Growth ($25)</strong> and <strong>Agency & Scale ($48)</strong> plans.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#1c1c1c] border border-white/10 text-left text-xs text-neutral-300 space-y-1.5">
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Automatic post syncing & ad attribution</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Live TikTok & Meta engagement audits</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>3,500+ credits/mo for scaling campaigns</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowUpgradeModal(false);
                if (typeof window !== 'undefined') window.location.hash = '#pricing';
              }}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs transition cursor-pointer shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Upgrade to Pro ($25)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Top Mobile Bar */}
      <div className="w-full max-w-xl mx-auto flex items-center justify-between md:hidden pb-4">
        <div className="flex items-center gap-2.5">
          <img 
            src="/calvras.png" 
            alt="Calvras Logo" 
            className="w-[30px] h-[30px] rounded-lg object-contain"
          />
          <span className="font-serif font-bold text-white text-lg tracking-tight">
            Calvras
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
              title="Open Menu"
            >
              <Menu size={18} />
            </button>
          )}
          <button
            onClick={onNewChat}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title="New Chat"
          >
            <SquarePen size={18} />
          </button>
        </div>
      </div>

      {/* Center Main Content (Heading + Seamless Borderless Input) */}
      <div className="max-w-[580px] mx-auto w-full text-center space-y-6 my-auto pt-6">
        
        {/* Simple Elegant Heading */}
        <div className="space-y-2 px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-white tracking-tight leading-snug">
            Hey {displayFirstName},<br className="sm:hidden" /> how can I help?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal max-w-sm sm:max-w-md mx-auto leading-relaxed">
            Plan campaigns, generate viral creatives, and scale your brand across Instagram, TikTok, WhatsApp & Ads.
          </p>
        </div>

        {/* Seamless Borderless Input Box */}
        <div 
          className="space-y-2 w-full text-left"
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            if (e.dataTransfer?.files?.[0]) processFile(e.dataTransfer.files[0]);
          }}
        >
          {/* Attachment Preview (Aligned to the Top Left) */}
          {attachedImage && (
            <div className="flex justify-start items-center pb-1 animate-in fade-in zoom-in-95 duration-150">
              {attachedImage.type === 'image' || typeof attachedImage === 'string' ? (
                <div className="relative inline-block border border-white/15 rounded-xl overflow-hidden shadow-md bg-[#242424] p-1 group">
                  <img 
                    src={typeof attachedImage === 'string' ? attachedImage : attachedImage.data} 
                    alt="Attachment" 
                    className="w-14 h-14 object-cover rounded-lg bg-black/40" 
                  />
                  <button
                    type="button"
                    onClick={() => setAttachedImage(null)}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/80 text-white flex items-center justify-center text-[9px] hover:bg-red-600 transition cursor-pointer shadow-xs"
                    title="Remove attachment"
                  >
                    <X size={10} />
                  </button>
                </div>
              ) : (
                <div className="relative flex items-center gap-2.5 border border-white/15 rounded-xl bg-[#242424] px-3 py-1.5 shadow-md max-w-xs text-left">
                  <div className="w-8 h-8 rounded-lg bg-[#8057ff]/15 text-[#8057ff] flex items-center justify-center font-bold text-[10px] shrink-0 uppercase">
                    {attachedImage.docType || 'DOC'}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium text-white truncate block max-w-[170px]">{attachedImage.name}</span>
                    <span className="text-[10.5px] text-neutral-400 font-mono block">{attachedImage.size}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setAttachedImage(null)}
                    className="w-4 h-4 rounded-full bg-white/10 text-neutral-300 hover:text-white hover:bg-red-600 flex items-center justify-center text-[9px] transition cursor-pointer shrink-0 ml-1"
                    title="Remove document"
                  >
                    <X size={10} />
                  </button>
                </div>
              )}
            </div>
          )}

          <div className={`bg-[#282828] border ${isDragging ? 'border-[#8057ff] ring-2 ring-[#8057ff]/30' : 'border-white/10 hover:border-white/20 focus-within:border-white/40'} rounded-3xl p-3.5 sm:p-4 shadow-2xl transition-all duration-200 text-left space-y-2.5 relative`}>
            <textarea
              ref={textareaRef}
              rows="1"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                chatMode === 'plan' 
                  ? "Describe your product or goal for a full strategic plan & deep audit..." 
                  : "Ask anything or describe what you want to market..."
              }
              className="w-full bg-transparent resize-none focus:outline-none text-xs sm:text-[14px] text-white placeholder:text-neutral-500 leading-relaxed font-normal min-h-[36px] max-h-60 overflow-y-auto py-0.5 transition-all"
            />

            {/* Seamless Bottom Action Row */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2 text-neutral-400">
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer active:scale-95" 
                  title="Attach file"
                >
                  <Paperclip size={15} />
                </button>

                {/* Mode Selector Pill Button (Chat vs Plan) */}
                <div className="relative" ref={modeDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setShowModeDropdown(!showModeDropdown)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-[#1c1c1c] border border-white/10 hover:border-white/20 text-neutral-200 hover:text-white transition cursor-pointer active:scale-95 shadow-xs"
                    title="Switch execution mode"
                  >
                    {chatMode === 'plan' ? (
                      <>
                        <Compass size={14} className="text-white" />
                        <span className="font-semibold text-white">Plan</span>
                      </>
                    ) : (
                      <>
                        <MessageSquare size={14} className="text-white" />
                        <span className="font-semibold text-white">Chat</span>
                      </>
                    )}
                    <ChevronDown size={12} className="text-neutral-400" />
                  </button>

                  {/* Dropdown Popup Menu (Styled exactly like Image 2) */}
                  {showModeDropdown && (
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-[#1c1c1c] border border-white/10 rounded-2xl shadow-2xl p-2 z-50 text-left space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      
                      {/* Chat Option */}
                      <button
                        type="button"
                        onClick={() => {
                          setChatMode('chat');
                          setShowModeDropdown(false);
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition cursor-pointer ${
                          chatMode === 'chat' ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <MessageSquare size={17} className="text-neutral-300 shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-semibold text-white block">
                            Chat
                          </span>
                          <span className="text-xs text-neutral-400 block mt-0.5 leading-snug">
                            Fast direct answers, ad copy & hooks
                          </span>
                        </div>
                      </button>

                      {/* Plan Option */}
                      <button
                        type="button"
                        onClick={() => {
                          setChatMode('plan');
                          setShowModeDropdown(false);
                        }}
                        className={`w-full flex items-start gap-3 p-2.5 rounded-xl text-left transition cursor-pointer ${
                          chatMode === 'plan' ? 'bg-white/10' : 'hover:bg-white/5'
                        }`}
                      >
                        <Compass size={17} className="text-neutral-300 shrink-0 mt-0.5" />
                        <div className="min-w-0 flex-1">
                          <span className="text-sm font-semibold text-white block">
                            Plan
                          </span>
                          <span className="text-xs text-neutral-400 block mt-0.5 leading-snug">
                            Full blueprint, diagnostics & roadmap
                          </span>
                        </div>
                      </button>

                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* 🎙️ Speech-to-Speech Blue Waveform Button (Image Match) */}
                <button
                  type="button"
                  onClick={() => setShowVoiceOverlay(prev => !prev)}
                  className={`w-8 h-8 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white flex items-center justify-center transition-all cursor-pointer shadow-lg shadow-blue-500/30 active:scale-90 hover:scale-105 relative ${
                    showVoiceOverlay ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-[#282828] animate-pulse' : ''
                  }`}
                  title="Start Live Speech-to-Speech Voice Mode"
                >
                  <AudioWaveformIcon size={15} className="text-white" />
                  {showVoiceOverlay && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-300 rounded-full animate-ping" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => (promptText.trim() || attachedImage) && onSendMessage(promptText, attachedImage, chatMode)}
                  disabled={!promptText.trim() && !attachedImage}
                  className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 disabled:opacity-30 text-neutral-950 flex items-center justify-center transition cursor-pointer shadow-md active:scale-90"
                  title="Send message"
                >
                  <Send size={13} className="translate-x-[-0.5px] translate-y-[-0.5px]" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Connect Accounts Card (Pushed Down to Bottom with Generous Spacing) */}
      <div className="w-full max-w-[580px] mx-auto pt-10 pb-4">
        <div className="bg-[#282828] border border-white/10 rounded-3xl p-4 sm:p-5 text-left space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-neutral-300">
              Connect accounts to add posts & track reach.
            </span>
            {!hasConnectorsAccess && (
              <span className="text-[10px] font-mono text-[#8057ff] font-bold flex items-center gap-1 bg-[#8057ff]/10 px-2 py-0.5 rounded-full border border-[#8057ff]/30">
                <Lock size={10} />
                <span>Pro & Agency Feature</span>
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {socialPlatforms.map((plat) => {
              const connected = connectedSocials.find(a => a.channel === plat.id);
              return (
                <button
                  key={plat.id}
                  onClick={() => handleConnectorClick(plat.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer shadow-2xs hover:border-white/30 active:scale-[0.98] ${
                    connected 
                      ? 'bg-[#282828] border-white/30 text-white font-semibold' 
                      : 'bg-[#161715] border-white/10 text-neutral-300 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {plat.renderIcon()}
                    <span className="text-xs">{plat.name}</span>
                  </div>
                  {connected ? (
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  ) : !hasConnectorsAccess ? (
                    <Lock size={12} className="text-neutral-500 shrink-0" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>

    </div>
    </>
  );
};