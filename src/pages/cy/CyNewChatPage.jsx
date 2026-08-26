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
  Layers,
  TrendingUp,
  Zap,
  Bot
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
  const { connectedSocials, connectSocialAccount, userProfile } = useMarketing();
  const [promptText, setPromptText] = useState('');
  const [authModalChannel, setAuthModalChannel] = useState(null);
  const [attachedImage, setAttachedImage] = useState(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedIntent, setSelectedIntent] = useState('campaign');
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Check plan for Connectors gating
  const userEmail = userProfile?.email || 'default';
  const userPlanRaw = typeof window !== 'undefined' ? localStorage.getItem(`calvras_user_plan_${userEmail}`) : null;
  const userPlan = userPlanRaw ? JSON.parse(userPlanRaw)?.planKey : 'basic';
  const hasConnectorsAccess = userPlan === 'pro' || userPlan === 'agency';

  // Dynamic user first name
  const rawName = userProfile?.name || userName || 'SHIKARI';
  const displayFirstName = rawName.split(' ')[0];

  // Auto-expand textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      if (promptText) {
        const nextHeight = Math.min(Math.max(textareaRef.current.scrollHeight, 44), 220);
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

  const intents = [
    { 
      id: 'campaign', 
      label: '30-Day Campaign', 
      icon: Target,
      placeholder: 'E.g. Launch a $1,500 weekend sale for a luxury apparel brand targeting US buyers...'
    },
    { 
      id: 'copy', 
      label: 'Direct-Response Copy', 
      icon: PenTool,
      placeholder: 'E.g. Write 5 high-converting Meta ASC+ ad angles and headlines for a skincare product...'
    },
    { 
      id: 'hooks', 
      label: 'Viral TikTok Hooks', 
      icon: Video,
      placeholder: 'E.g. Generate 3 viral TikTok & Reel hook scripts with visual staging cues...'
    },
    { 
      id: 'cro', 
      label: 'Funnel CRO Audit', 
      icon: Activity,
      placeholder: 'E.g. Our checkout drop-off jumped by 28%. Diagnose friction points and give me a recovery plan...'
    }
  ];

  const currentPlaceholder = intents.find(i => i.id === selectedIntent)?.placeholder;

  return (
    <div className="flex-1 min-h-screen bg-[#0a0b09] flex flex-col justify-between items-center p-4 sm:p-8 lg:p-10 font-sans antialiased text-[#f4f4ee] select-none overflow-y-auto w-full min-w-0 relative">
      
      {/* Ambient Gradient Glow Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] bg-gradient-to-b from-[#ff5e28]/[0.04] via-[#8057ff]/[0.03] to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-white/[0.015] rounded-full blur-2xl pointer-events-none -z-10" />

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

      {/* Feature Gating Upgrade Modal for $10 Basic Users */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#141512] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl relative">
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

            <div className="p-3.5 rounded-2xl bg-[#0d0e0c] border border-white/10 text-left text-xs text-neutral-300 space-y-2">
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Sync live TikTok & Instagram analytics</span>
              </div>
              <div className="flex items-center gap-2 text-white font-semibold">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Autonomous 24/7 ROAS pacing & CPA guards</span>
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

      {/* Top Mobile Brand Bar */}
      <div className="w-full max-w-2xl mx-auto flex md:hidden items-center justify-between pb-3">
        <div className="flex items-center gap-2.5">
          <img 
            src="/calvras.png" 
            alt="Calvras" 
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

      {/* Main Studio Core Content */}
      <div className="max-w-2xl mx-auto w-full text-center space-y-7 my-auto py-2">
        
        {/* Luxury Hero Header */}
        <div className="space-y-3.5 px-2 animate-in fade-in duration-500">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[11px] font-mono text-neutral-300 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide">Calvras Autonomous Marketing OS</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-[50px] font-serif font-normal text-[#f4f4ee] tracking-tight leading-[1.12]">
            What are we scaling today,<br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#f4f4ee] via-neutral-200 to-neutral-400">
              {displayFirstName}
            </span>?
          </h1>

          <p className="text-xs sm:text-sm text-neutral-400 font-normal max-w-md mx-auto leading-relaxed">
            Formulate campaigns, generate direct-response ad copy, and scale ROAS.
          </p>
        </div>

        {/* Studio Prompt Cockpit Card */}
        <div className="bg-[#121310]/95 backdrop-blur-xl border border-white/12 hover:border-white/20 focus-within:border-white/35 rounded-3xl p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 text-left space-y-3 relative">
          
          {/* Image Attachment Preview */}
          {attachedImage && (
            <div className="relative inline-block border border-white/20 rounded-2xl overflow-hidden bg-black/40 p-1 mb-1">
              <img src={attachedImage} alt="Attachment" className="max-h-24 max-w-xs object-cover rounded-xl" />
              <button
                onClick={() => setAttachedImage(null)}
                className="absolute top-2 right-2 w-5 h-5 rounded-full bg-black/80 hover:bg-red-600 text-white flex items-center justify-center text-[10px] transition cursor-pointer"
              >
                <X size={11} />
              </button>
            </div>
          )}

          {/* Intent Mode Selector Pills */}
          <div className="flex items-center gap-1.5 flex-wrap pb-2.5 border-b border-white/10">
            {intents.map((intent) => {
              const Icon = intent.icon;
              const isSelected = selectedIntent === intent.id;
              return (
                <button
                  key={intent.id}
                  type="button"
                  onClick={() => setSelectedIntent(intent.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition cursor-pointer active:scale-95 ${
                    isSelected
                      ? 'bg-white text-neutral-950 font-bold shadow-sm'
                      : 'bg-white/[0.04] hover:bg-white/[0.08] text-neutral-400 hover:text-white border border-white/5'
                  }`}
                >
                  <Icon size={12} className={isSelected ? 'text-neutral-950' : 'text-neutral-400'} />
                  <span>{intent.label}</span>
                </button>
              );
            })}
          </div>

          {/* Prompt Textarea */}
          <textarea
            ref={textareaRef}
            rows="1"
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={currentPlaceholder}
            className="w-full bg-transparent resize-none focus:outline-none text-xs sm:text-[14px] text-white placeholder:text-neutral-500 leading-relaxed font-normal min-h-[52px] max-h-60 overflow-y-auto py-1 transition-all"
          />

          {/* Bottom Actions Row */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="hover:text-white text-neutral-400 p-2 rounded-xl hover:bg-white/10 transition cursor-pointer" 
                title="Attach creative asset or screenshot"
              >
                <Paperclip size={16} />
              </button>

              <button 
                type="button" 
                className="hover:text-white text-neutral-400 p-2 rounded-xl hover:bg-white/10 transition cursor-pointer" 
                title="Search Live Web Intelligence"
              >
                <Globe size={16} />
              </button>
            </div>

            <button
              type="button"
              onClick={() => (promptText.trim() || attachedImage) && onSendMessage(promptText, attachedImage)}
              disabled={!promptText.trim() && !attachedImage}
              className="w-9 h-9 rounded-full bg-white hover:bg-neutral-200 disabled:opacity-25 text-neutral-950 font-bold flex items-center justify-center transition cursor-pointer shadow-md active:scale-95"
              title="Launch Execution"
            >
              <Send size={14} className="translate-x-[-0.5px] translate-y-[-0.5px]" />
            </button>
          </div>

        </div>

        {/* Streamlined Deployment Channels Dock */}
        <div className="bg-[#11120f]/80 border border-white/10 rounded-2xl p-3.5 px-4 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-neutral-400 font-medium">Deployment Channels:</span>
            {!hasConnectorsAccess && (
              <span className="text-[10px] font-mono text-[#8057ff] font-bold bg-[#8057ff]/15 px-2 py-0.5 rounded-md border border-[#8057ff]/25">
                Pro
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
                      : 'bg-[#161714] hover:bg-[#1c1d19] border-white/10 text-neutral-400 hover:text-white'
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
