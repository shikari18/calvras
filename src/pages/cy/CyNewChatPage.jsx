import React, { useState, useRef, useEffect } from 'react';
import { 
  Paperclip, 
  Globe, 
  Send, 
  CheckCircle2, 
  X, 
  Menu, 
  SquarePen, 
  Bell,
  Lock,
  Sparkles,
  ArrowRight,
  Target,
  PenTool,
  Video,
  Activity,
  ChevronDown
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
  userName = 'SHIKARI', 
  onToggleSidebar, 
  onNewChat 
}) => {
  const { connectedSocials, connectSocialAccount, disconnectSocialAccount, userProfile } = useMarketing();
  const [promptText, setPromptText] = useState('');
  const [authModalChannel, setAuthModalChannel] = useState(null);
  const [attachedImage, setAttachedImage] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [activeMode, setActiveMode] = useState('campaign'); // 'campaign' | 'copy' | 'hooks' | 'cro'
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Check plan for Connectors gating
  const userEmail = userProfile?.email || 'default';
  const userPlanRaw = typeof window !== 'undefined' ? localStorage.getItem(`calvras_user_plan_${userEmail}`) : null;
  const userPlan = userPlanRaw ? JSON.parse(userPlanRaw)?.planKey : 'basic';
  const hasConnectorsAccess = userPlan === 'pro' || userPlan === 'agency';

  // Auto-expand textarea as user types longer text
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      if (promptText) {
        const nextHeight = Math.min(Math.max(textareaRef.current.scrollHeight, 44), 220);
        textareaRef.current.style.height = `${nextHeight}px`;
      }
    }
  }, [promptText]);

  // Dynamic user first name from Google / profile
  const rawName = userProfile?.name || userName || 'SHIKARI';
  const displayFirstName = rawName.split(' ')[0];

  const socialPlatforms = [
    { id: 'Instagram', name: 'Instagram', renderIcon: () => <InstagramLogo size={15} /> },
    { id: 'TikTok', name: 'TikTok', renderIcon: () => <TikTokLogo size={14} className="text-white" /> },
    { id: 'Twitter', name: 'X / Twitter', renderIcon: () => <XTwitterLogo size={13} className="text-white" /> },
    { id: 'Facebook', name: 'Facebook', renderIcon: () => <FacebookLogo size={15} /> }
  ];

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (promptText.trim() || attachedImage) {
        onSendMessage(promptText, attachedImage);
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAttachedImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleConnectorClick = (platId) => {
    if (!hasConnectorsAccess) {
      setShowUpgradeModal(true);
      return;
    }
    setAuthModalChannel(platId);
  };

  const modes = [
    { id: 'campaign', label: 'Full Campaign', icon: Target, placeholder: 'Describe your product or goal to generate a 30-day multi-channel roadmap...' },
    { id: 'copy', label: 'Ad Copy', icon: PenTool, placeholder: 'What are you selling? I will write 5 direct-response Meta, Google & TikTok copy angles...' },
    { id: 'hooks', label: 'Video Hooks', icon: Video, placeholder: 'Enter your offer for 3-part viral hook scripts with visual cues...' },
    { id: 'cro', label: 'CRO Doctor', icon: Activity, placeholder: 'Describe your drop in conversions or paste landing page URL for a diagnostic teardown...' }
  ];

  const currentPlaceholder = modes.find(m => m.id === activeMode)?.placeholder || 'Ask anything or describe what you want to market...';

  return (
    <div className="flex-1 min-h-screen bg-[#0d0e0c] flex flex-col justify-between items-center p-4 sm:p-8 lg:p-12 font-sans antialiased text-[#f4f4ee] select-none overflow-y-auto w-full min-w-0 relative">
      
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-gradient-to-b from-white/[0.02] via-emerald-500/[0.01] to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept="image/*" 
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

      {/* Feature Gating Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#161714] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#8057ff]/15 border border-[#8057ff]/30 text-[#a88aff] flex items-center justify-center mx-auto shadow-lg">
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
                Live social account syncing & automated publishing are available on the <strong>Pro Growth ($25)</strong> and <strong>Agency & Scale ($48)</strong> plans.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#10110e] border border-white/10 text-left text-xs text-neutral-300 space-y-2">
              <div className="flex items-center gap-2 text-neutral-200">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Sync live TikTok & Instagram analytics</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>Autonomous 24/7 ROAS pacing & CPA protection</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-200">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>3,500+ marketing credits per month</span>
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

      {/* Top Bar Status Pill & Mobile Actions */}
      <div className="w-full max-w-2xl mx-auto flex items-center justify-between pb-4">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="flex md:hidden items-center justify-between w-full">
          <div className="flex items-center gap-2.5">
            <img 
              src="/calvras.png" 
              alt="Calvras Logo" 
              className="w-7 h-7 rounded-lg object-contain"
            />
            <span className="font-serif font-bold text-white text-lg tracking-tight">
              Calvras
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={onToggleSidebar}
              className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white"
            >
              <Menu size={15} />
            </button>
            <button 
              onClick={onNewChat}
              className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white"
            >
              <SquarePen size={15} />
            </button>
          </div>
        </div>

        {/* Desktop Engine Status Tag */}
        <div className="hidden md:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Calvras Marketing Copilot v4.2 • Ready</span>
        </div>

      </div>

      {/* Main Studio Core Content */}
      <div className="max-w-2xl mx-auto w-full text-center space-y-8 my-auto py-4">
        
        {/* Headline */}
        <div className="space-y-3 px-2">
          <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-serif font-normal text-[#f4f4ee] tracking-tight leading-[1.08]">
            What are we scaling today,<br />
            <span className="italic text-neutral-300">{displayFirstName}</span>?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal max-w-md mx-auto leading-relaxed">
            Formulate campaigns, generate high-converting ad copy, and scale revenue.
          </p>
        </div>

        {/* Luxury Studio Prompt Box */}
        <div className="space-y-3 w-full text-left">
          
          {/* Attached Image Thumbnail */}
          {attachedImage && (
            <div className="relative inline-block border border-white/15 rounded-2xl overflow-hidden bg-[#161714] p-1.5 mb-1 shadow-lg">
              <img src={attachedImage} alt="Attachment" className="max-h-24 max-w-xs object-cover rounded-xl" />
              <button
                onClick={() => setAttachedImage(null)}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center text-[10px] transition cursor-pointer"
              >
                <X size={11} />
              </button>
            </div>
          )}

          {/* Prompt Container */}
          <div className="bg-[#141512] border border-white/15 hover:border-white/25 focus-within:border-white/40 rounded-3xl p-4 sm:p-5 shadow-2xl transition-all duration-300 relative space-y-3">
            
            {/* Mode Switcher Buttons */}
            <div className="flex items-center gap-1.5 flex-wrap pb-2 border-b border-white/10">
              {modes.map((m) => {
                const Icon = m.icon;
                const isSelected = activeMode === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setActiveMode(m.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer ${
                      isSelected
                        ? 'bg-white text-neutral-950 font-bold shadow-sm'
                        : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/5'
                    }`}
                  >
                    <Icon size={12} className={isSelected ? 'text-neutral-950' : 'text-neutral-400'} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Input Textarea */}
            <textarea
              ref={textareaRef}
              rows="1"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={currentPlaceholder}
              className="w-full bg-transparent resize-none focus:outline-none text-xs sm:text-[14px] text-white placeholder:text-neutral-500 leading-relaxed min-h-[50px] max-h-60 overflow-y-auto py-1 font-normal"
            />

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:text-white text-neutral-400 p-2 rounded-xl hover:bg-white/10 transition cursor-pointer" 
                  title="Attach file or creative screenshot"
                >
                  <Paperclip size={16} />
                </button>

                <button 
                  type="button" 
                  className="hover:text-white text-neutral-400 p-2 rounded-xl hover:bg-white/10 transition cursor-pointer" 
                  title="Global Web Research"
                >
                  <Globe size={16} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => (promptText.trim() || attachedImage) && onSendMessage(promptText, attachedImage)}
                disabled={!promptText.trim() && !attachedImage}
                className="w-9 h-9 rounded-full bg-white hover:bg-neutral-200 disabled:opacity-30 text-neutral-950 font-bold flex items-center justify-center transition cursor-pointer shadow-md active:scale-95"
                title="Send Prompt"
              >
                <Send size={14} className="translate-x-[-0.5px] translate-y-[-0.5px]" />
              </button>
            </div>

          </div>

        </div>

        {/* Minimalist Integration Dock */}
        <div className="bg-[#121310] border border-white/10 rounded-2xl p-4 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400 font-medium">Connected Channels:</span>
            {!hasConnectorsAccess && (
              <span className="text-[10px] font-mono text-[#8057ff] font-bold bg-[#8057ff]/10 px-2 py-0.5 rounded-md border border-[#8057ff]/20">
                Pro Feature
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {socialPlatforms.map((plat) => {
              const connected = connectedSocials.find(a => a.channel === plat.id);
              return (
                <button
                  key={plat.id}
                  onClick={() => handleConnectorClick(plat.id)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs transition cursor-pointer ${
                    connected
                      ? 'bg-white/10 border-white/30 text-white font-semibold'
                      : 'bg-[#181915] hover:bg-[#1e1f1a] border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  {plat.renderIcon()}
                  <span>{plat.name}</span>
                  {connected ? (
                    <CheckCircle2 size={12} className="text-emerald-400" />
                  ) : !hasConnectorsAccess ? (
                    <Lock size={11} className="text-neutral-500" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>

      </div>

      <div className="w-full" />

    </div>
  );
};
