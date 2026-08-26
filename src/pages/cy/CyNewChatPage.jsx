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
  ArrowRight
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
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Check if current user has Pro or Agency plan for Connectors
  const userEmail = userProfile?.email || 'default';
  const userPlanRaw = typeof window !== 'undefined' ? localStorage.getItem(`calvras_user_plan_${userEmail}`) : null;
  const userPlan = userPlanRaw ? JSON.parse(userPlanRaw)?.planKey : 'basic';
  const hasConnectorsAccess = userPlan === 'pro' || userPlan === 'agency';

  // Auto-expand textarea as user types longer text
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      if (promptText) {
        const nextHeight = Math.min(Math.max(textareaRef.current.scrollHeight, 44), 240);
        textareaRef.current.style.height = `${nextHeight}px`;
      }
    }
  }, [promptText]);

  // Dynamic user first name from Google / profile
  const rawName = userProfile?.name || userName || 'SHIKARI';
  const displayFirstName = rawName.split(' ')[0].toUpperCase();

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

  return (
    <div className="flex-1 min-h-screen bg-[#0d0e0c] flex flex-col justify-between items-center p-4 sm:p-8 lg:p-10 font-sans antialiased text-white select-none overflow-y-auto w-full min-w-0 relative">
      
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-white/[0.03] to-transparent blur-3xl pointer-events-none -z-10" />

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
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#181915] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center space-y-5 shadow-2xl relative">
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

            <div className="p-3.5 rounded-2xl bg-[#121310] border border-white/10 text-left text-xs text-neutral-300 space-y-1.5">
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

      {/* Top Mobile Header */}
      <div className="w-full max-w-xl mx-auto space-y-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-500">
        
        {/* Mobile Top Brand Bar */}
        <div className="flex md:hidden items-center justify-between px-1">
          <div className="flex items-center gap-2.5">
            <img 
              src="/calvras.png" 
              alt="Calvras Logo" 
              className="w-[33px] h-[33px] rounded-lg object-contain"
            />
            <span className="font-serif font-bold text-white text-xl tracking-tight">
              Calvras
            </span>
          </div>
          <button className="p-2 hover:bg-white/10 rounded-full transition text-neutral-300 cursor-pointer active:scale-95">
            <Bell size={18} />
          </button>
        </div>

        {/* Mobile Sub Action Bar */}
        <div className="flex md:hidden items-center justify-between px-1 pt-1">
          <button 
            onClick={onToggleSidebar}
            className="w-10 h-10 rounded-2xl bg-[#161714] hover:bg-[#20221c] border border-white/10 flex items-center justify-center text-white transition cursor-pointer shadow-2xs active:scale-95"
            title="Open Sidebar"
          >
            <Menu size={18} />
          </button>

          <button 
            onClick={onNewChat}
            className="w-10 h-10 rounded-2xl bg-[#161714] hover:bg-[#20221c] border border-white/10 flex items-center justify-center text-white transition cursor-pointer shadow-2xs active:scale-95"
            title="New Chat"
          >
            <SquarePen size={18} />
          </button>
        </div>

      </div>

      {/* Center Main Content */}
      <div className="max-w-xl mx-auto w-full text-center space-y-6 my-auto py-2">
        
        {/* Big Serif Heading */}
        <div className="space-y-2 px-2 animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out">
          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-serif font-normal text-white tracking-tight leading-snug">
            Hey {displayFirstName},<br className="sm:hidden" /> how can I help?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal max-w-sm sm:max-w-md mx-auto leading-relaxed">
            Plan campaigns, generate viral creatives, and scale your brand across Instagram, TikTok, WhatsApp & Ads.
          </p>
        </div>

        {/* Prompt Input Box (Dark Luxury Glassmorphic Styling) */}
        <div className="space-y-3 w-full animate-in fade-in slide-in-from-bottom-3 duration-700 delay-250 fill-mode-backwards">
          
          {/* Image Attachment Preview */}
          {attachedImage && (
            <div className="relative inline-block border border-white/15 rounded-xl overflow-hidden shadow-2xs bg-[#161714] p-1 mb-1 animate-in zoom-in-95 duration-200">
              <img src={attachedImage} alt="Attachment" className="max-h-20 max-w-xs object-cover rounded-lg" />
              <button
                onClick={() => setAttachedImage(null)}
                className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-black text-white flex items-center justify-center text-[10px] shadow-sm hover:bg-red-600 transition cursor-pointer"
              >
                <X size={10} />
              </button>
            </div>
          )}

          <div className="bg-[#141512] border border-white/15 hover:border-white/25 focus-within:border-white/40 focus-within:ring-4 focus-within:ring-white/5 rounded-3xl p-4 shadow-xl transition-all duration-200 text-left space-y-2.5 relative">
            <textarea
              ref={textareaRef}
              rows="1"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or describe what you want to market..."
              className="w-full bg-transparent resize-none focus:outline-none text-xs sm:text-[14px] text-white placeholder:text-neutral-500 leading-relaxed font-normal min-h-[44px] max-h-60 overflow-y-auto py-1 transition-all"
            />

            <div className="flex items-center justify-between pt-1 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-neutral-400">
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer active:scale-95" 
                  title="Attach file"
                >
                  <Paperclip size={15} />
                </button>

                <button 
                  type="button" 
                  className="hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer active:scale-95" 
                  title="Web search / Global"
                >
                  <Globe size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => (promptText.trim() || attachedImage) && onSendMessage(promptText, attachedImage)}
                disabled={!promptText.trim() && !attachedImage}
                className="w-8 h-8 rounded-full bg-white hover:bg-neutral-200 disabled:opacity-30 text-neutral-950 flex items-center justify-center transition cursor-pointer shadow-md active:scale-90"
              >
                <Send size={13} className="translate-x-[-0.5px] translate-y-[-0.5px]" />
              </button>
            </div>
          </div>

          {/* NOTE: The 3 suggestion pills have been removed as requested! */}
        </div>

        {/* Connect Accounts Card (Dark Luxury Grid with Gating) */}
        <div className="bg-[#141512] border border-white/10 rounded-3xl p-4 sm:p-5 text-left space-y-3 mt-4 shadow-xl">
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
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer shadow-sm hover:border-white/20 active:scale-[0.98] ${
                    connected 
                      ? 'bg-white/10 border-white/30 text-white font-semibold' 
                      : 'bg-[#181915] border-white/5 text-neutral-300 font-medium'
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

      <div className="w-full" />

    </div>
  );
};
