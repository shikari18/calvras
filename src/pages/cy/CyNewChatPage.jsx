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
    <div className="flex-1 min-h-screen bg-white flex flex-col justify-between items-center p-4 sm:p-8 lg:p-10 font-sans antialiased text-neutral-900 select-none overflow-y-auto w-full min-w-0">
      
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

      {/* Top Mobile Header & Quick Action Row (Exact from Screenshot) */}
      <div className="w-full max-w-xl mx-auto space-y-3 pb-2">
        
        {/* Mobile Top Brand Bar (Visible on mobile screens) */}
        <div className="flex md:hidden items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <BrandBurstLogo size={22} className="text-purple-600" />
            <span className="font-serif font-bold text-neutral-950 text-xl tracking-tight">
              Calvras
            </span>
          </div>
          <button className="p-2 hover:bg-neutral-100 rounded-full transition text-neutral-800 cursor-pointer">
            <Bell size={18} />
          </button>
        </div>

        {/* Mobile Sub Action Bar: Hamburger Menu on Left, New Chat on Right */}
        <div className="flex md:hidden items-center justify-between px-1 pt-1">
          <button 
            onClick={onToggleSidebar}
            className="w-10 h-10 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-800 transition cursor-pointer shadow-2xs"
            title="Open Sidebar"
          >
            <Menu size={18} />
          </button>

          <button 
            onClick={onNewChat}
            className="w-10 h-10 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/80 flex items-center justify-center text-neutral-800 transition cursor-pointer shadow-2xs"
            title="New Chat"
          >
            <SquarePen size={18} />
          </button>
        </div>

      </div>

      {/* Center Main Content */}
      <div className="max-w-xl mx-auto w-full text-center space-y-5 my-auto py-2">
        
        {/* Big Serif Heading with Dynamic Google Name */}
        <div className="space-y-2 px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-normal text-neutral-900 tracking-tight leading-snug">
            Hey {displayFirstName},<br className="sm:hidden" /> how can I help?
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal max-w-sm sm:max-w-md mx-auto leading-relaxed">
            Plan campaigns, generate viral creatives, and scale your brand across Instagram, TikTok, WhatsApp & Ads.
          </p>
        </div>

        {/* Prompt Input Box */}
        <div className="space-y-3 w-full">
          
          {/* Image Attachment Preview */}
          {attachedImage && (
            <div className="relative inline-block border border-neutral-200 rounded-xl overflow-hidden shadow-2xs bg-neutral-50 p-1 mb-1">
              <img src={attachedImage} alt="Attachment" className="max-h-20 max-w-xs object-cover rounded-lg" />
              <button
                onClick={() => setAttachedImage(null)}
                className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px] shadow-sm hover:bg-red-600 transition cursor-pointer"
              >
                <X size={10} />
              </button>
            </div>
          )}

          <div className="bg-white border-2 border-neutral-200 hover:border-neutral-300 focus-within:border-neutral-900 rounded-3xl p-3.5 shadow-2xs transition text-left space-y-2.5 relative">
            <textarea
              ref={textareaRef}
              rows="1"
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything or describe what you want to market..."
              className="w-full bg-transparent resize-none focus:outline-none text-xs sm:text-[13px] text-neutral-900 placeholder:text-neutral-400 leading-relaxed font-normal min-h-[44px] max-h-60 overflow-y-auto py-1 transition-all"
            />

            <div className="flex items-center justify-between pt-1 border-t border-neutral-100">
              <div className="flex items-center gap-1.5 text-neutral-400">
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="hover:text-neutral-700 p-1.5 rounded-lg hover:bg-neutral-50 transition cursor-pointer" 
                  title="Attach file"
                >
                  <Paperclip size={15} />
                </button>

                <button 
                  type="button" 
                  className="hover:text-neutral-700 p-1.5 rounded-lg hover:bg-neutral-50 transition cursor-pointer" 
                  title="Web search / Global"
                >
                  <Globe size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => (promptText.trim() || attachedImage) && onSendMessage(promptText, attachedImage)}
                disabled={!promptText.trim() && !attachedImage}
                className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 disabled:opacity-30 text-white flex items-center justify-center transition cursor-pointer shadow-xs active:scale-95"
              >
                <Send size={13} className="translate-x-[-0.5px] translate-y-[-0.5px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Connect Accounts Card (2x2 Grid exactly from screenshot) */}
        <div className="bg-neutral-50/70 border border-neutral-200/80 rounded-3xl p-4 sm:p-5 text-left space-y-3.5 mt-4">
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
                  className={`flex items-center justify-between p-3 rounded-2xl border transition cursor-pointer shadow-2xs ${
                    connected 
                      ? 'bg-white border-neutral-950 text-neutral-950 font-semibold' 
                      : 'bg-white hover:bg-neutral-50 border-neutral-200 text-neutral-800 font-medium'
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
