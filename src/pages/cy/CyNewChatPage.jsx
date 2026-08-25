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
  Sparkles
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import { BrandBurstLogo } from '../../components/cy/CySidebar';
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
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

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
    { id: 'TikTok', name: 'TikTok', renderIcon: () => <TikTokLogo size={15} className="text-neutral-900" /> },
    { id: 'Twitter', name: 'X / Twitter', renderIcon: () => <XTwitterLogo size={14} className="text-neutral-950" /> },
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

  return (
    <div className="flex-1 min-h-screen bg-white flex flex-col justify-between items-center p-4 sm:p-8 lg:p-10 font-sans antialiased text-neutral-900 select-none overflow-y-auto w-full min-w-0 relative">
      
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-purple-50/40 via-indigo-50/20 to-transparent blur-3xl pointer-events-none -z-10" />

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

      {/* Top Mobile Header & Quick Action Row */}
      <div className="w-full max-w-xl mx-auto space-y-3 pb-2 animate-in fade-in slide-in-from-top-2 duration-500">
        
        {/* Mobile Top Brand Bar (Visible on mobile screens) */}
        <div className="flex md:hidden items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center shadow-2xs">
              <BrandBurstLogo size={18} className="text-purple-600" />
            </div>
            <span className="font-serif font-bold text-neutral-950 text-xl tracking-tight">
              Calvras
            </span>
          </div>
          <button className="p-2 hover:bg-neutral-100 rounded-full transition text-neutral-800 cursor-pointer active:scale-95">
            <Bell size={18} />
          </button>
        </div>

        {/* Mobile Sub Action Bar: Hamburger Menu on Left, New Chat on Right */}
        <div className="flex md:hidden items-center justify-between px-1 pt-1">
          <button 
            onClick={onToggleSidebar}
            className="w-10 h-10 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-800 transition cursor-pointer shadow-2xs active:scale-95"
            title="Open Sidebar"
          >
            <Menu size={18} />
          </button>

          <button 
            onClick={onNewChat}
            className="w-10 h-10 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-800 transition cursor-pointer shadow-2xs active:scale-95"
            title="New Chat"
          >
            <SquarePen size={18} />
          </button>
        </div>

      </div>

      {/* Center Main Content */}
      <div className="max-w-xl mx-auto w-full text-center space-y-5 my-auto py-2">
        
        {/* Big Serif Heading with Dynamic Google Name & Smooth Entrance Animation */}
        <div className="space-y-2 px-2 animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out">
          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-normal text-neutral-900 tracking-tight leading-snug">
            Hey {displayFirstName},<br className="sm:hidden" /> how can I help?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal max-w-sm sm:max-w-md mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150 fill-mode-backwards">
            Plan campaigns, generate viral creatives, and scale your brand across Instagram, TikTok, WhatsApp & Ads.
          </p>
        </div>

        {/* Prompt Input Box with Smooth Elevation & Focus Glow */}
        <div className="space-y-3 w-full animate-in fade-in slide-in-from-bottom-3 duration-700 delay-250 fill-mode-backwards">
          
          {/* Image Attachment Preview */}
          {attachedImage && (
            <div className="relative inline-block border border-neutral-200 rounded-xl overflow-hidden shadow-2xs bg-neutral-50 p-1 mb-1 animate-in zoom-in-95 duration-200">
              <img src={attachedImage} alt="Attachment" className="max-h-20 max-w-xs object-cover rounded-lg" />
              <button
                onClick={() => setAttachedImage(null)}
                className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] shadow-sm hover:bg-red-600 transition cursor-pointer"
              >
                <X size={10} />
              </button>
            </div>
          )}

          <div className="bg-white border-2 border-neutral-200/90 hover:border-neutral-300 focus-within:border-neutral-950 focus-within:ring-4 focus-within:ring-purple-500/5 rounded-3xl p-3.5 shadow-xs hover:shadow-sm transition-all duration-200 text-left space-y-2.5 relative">
            <textarea
              ref={textareaRef}
              rows="1"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or describe what you want to market..."
              className="w-full bg-transparent resize-none focus:outline-none text-xs sm:text-[13.5px] text-neutral-900 placeholder:text-neutral-400 leading-relaxed font-normal min-h-[44px] max-h-60 overflow-y-auto py-1 transition-all"
            />

            <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
              <div className="flex items-center gap-1.5 text-neutral-400">
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:text-neutral-700 p-1.5 rounded-lg hover:bg-neutral-50 transition cursor-pointer active:scale-95" 
                  title="Attach file"
                >
                  <Paperclip size={15} />
                </button>

                <button 
                  type="button" 
                  className="hover:text-neutral-700 p-1.5 rounded-lg hover:bg-neutral-50 transition cursor-pointer active:scale-95" 
                  title="Web search / Global"
                >
                  <Globe size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => (promptText.trim() || attachedImage) && onSendMessage(promptText, attachedImage)}
                disabled={!promptText.trim() && !attachedImage}
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 text-white flex items-center justify-center transition cursor-pointer shadow-xs active:scale-90"
              >
                <Send size={13} className="translate-x-[-0.5px] translate-y-[-0.5px]" />
              </button>
            </div>
          </div>

          {/* Quick Action Suggestion Pills */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-1">
            {[
              { icon: '🎯', label: 'Launch $500 weekend sale', prompt: 'Create an autonomous weekend flash sale campaign with a $500 budget across TikTok, Meta, and WhatsApp.' },
              { icon: '🎬', label: 'Write 3 viral TikTok hooks', prompt: 'Write 3 high-converting viral TikTok and Reel hooks for an e-commerce brand drop.' },
              { icon: '🩺', label: 'Audit conversion drop', prompt: 'Diagnose why my website conversion rate dropped and give me an immediate 3-step fix.' }
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => onSendMessage(chip.prompt, null)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-50 hover:bg-purple-50/60 border border-neutral-200/70 hover:border-purple-200 text-[11px] sm:text-xs text-neutral-600 hover:text-purple-700 font-medium transition-all duration-200 hover:-translate-y-0.5 shadow-2xs active:scale-95 cursor-pointer"
              >
                <span>{chip.icon}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Connect Accounts Card (2x2 Grid with Hover Animations) */}
        <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-3xl p-4 sm:p-5 text-left space-y-3.5 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-350 fill-mode-backwards shadow-2xs">
          <div className="text-xs font-semibold text-neutral-800">
            <span>Connect accounts to add posts & track reach.</span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {socialPlatforms.map((plat) => {
              const connected = connectedSocials.find(a => a.channel === plat.id);
              return (
                <button
                  key={plat.id}
                  onClick={() => setAuthModalChannel(plat.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all duration-200 cursor-pointer shadow-2xs hover:-translate-y-0.5 active:scale-[0.98] ${
                    connected 
                      ? 'bg-white border-neutral-950 text-neutral-950 font-semibold shadow-xs' 
                      : 'bg-white hover:bg-neutral-50 border-neutral-200/90 text-neutral-800 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {plat.renderIcon()}
                    <span className="text-xs">{plat.name}</span>
                  </div>
                  {connected && (
                    <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                  )}
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
