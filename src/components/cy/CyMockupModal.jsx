import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Heart, 
  MessageCircle, 
  Send, 
  Bookmark, 
  MoreHorizontal, 
  Share2, 
  Music, 
  Phone, 
  Video, 
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const CyMockupModal = ({ item, isOpen, onClose, userName = 'User' }) => {
  if (!isOpen || !item) return null;

  const [activeChannel, setActiveChannel] = useState(item.channel || 'Instagram');
  const [captionText, setCaptionText] = useState(item.caption || '');
  const [postTitle, setPostTitle] = useState(item.title || 'Brand Launch Campaign');
  const [imgUrl, setImgUrl] = useState(
    item.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
  );
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(captionText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col md:flex-row text-left font-sans select-none">
        
        {/* Left Side: Live Phone Preview Canvas */}
        <div className="flex-1 bg-neutral-100 p-6 sm:p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-neutral-200 overflow-y-auto">
          
          {/* Channel Format Switcher */}
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-xs p-1 rounded-2xl border border-neutral-200/80 shadow-2xs mb-5">
            {['Instagram', 'TikTok', 'WhatsApp'].map((ch) => (
              <button
                key={ch}
                onClick={() => setActiveChannel(ch)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                  activeChannel === ch
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {ch}
              </button>
            ))}
          </div>

          {/* 1. INSTAGRAM MOCKUP */}
          {activeChannel === 'Instagram' && (
            <div className="w-[320px] bg-white rounded-3xl border border-neutral-300 shadow-xl overflow-hidden text-neutral-900 animate-in zoom-in-95 duration-150">
              {/* Instagram Header */}
              <div className="px-3.5 py-2.5 flex items-center justify-between border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px]">
                    <div className="w-full h-full bg-white rounded-full p-[1px]">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-neutral-900">{userName.toLowerCase().replace(/\s+/g, '_')}</span>
                      <ShieldCheck size={12} className="text-blue-500 fill-blue-500" />
                    </div>
                    <span className="text-[10px] text-neutral-400 font-normal">Sponsored • Verified Business</span>
                  </div>
                </div>
                <MoreHorizontal size={16} className="text-neutral-500" />
              </div>

              {/* Instagram Post Media */}
              <div className="w-full h-72 bg-neutral-900 relative overflow-hidden">
                <img 
                  src={imgUrl} 
                  alt="Post Creative" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80';
                  }}
                />
                <div className="absolute bottom-2.5 right-2.5 bg-neutral-950/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                  1/4
                </div>
              </div>

              {/* Shop CTA Banner */}
              <div className="px-3.5 py-2 bg-neutral-900 text-white flex items-center justify-between text-xs font-bold">
                <span>Shop Now & Order via MoMo</span>
                <ChevronRight size={14} />
              </div>

              {/* Instagram Actions */}
              <div className="p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-neutral-800">
                    <Heart size={18} className="hover:text-rose-600 transition cursor-pointer" />
                    <MessageCircle size={18} className="hover:text-neutral-950 transition cursor-pointer" />
                    <Send size={18} className="hover:text-neutral-950 transition cursor-pointer" />
                  </div>
                  <Bookmark size={18} className="text-neutral-800 hover:text-neutral-950 transition cursor-pointer" />
                </div>

                <div className="text-xs font-bold text-neutral-900">
                  1,842 likes
                </div>

                {/* Caption Body */}
                <div className="text-xs text-neutral-800 leading-snug">
                  <span className="font-bold text-neutral-900 mr-1.5">{userName.toLowerCase().replace(/\s+/g, '_')}</span>
                  <span className="whitespace-pre-line text-[11.5px] text-neutral-700">
                    {captionText.slice(0, 140)}...
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. TIKTOK 9:16 MOCKUP */}
          {activeChannel === 'TikTok' && (
            <div className="w-[290px] h-[520px] bg-neutral-950 rounded-3xl border border-neutral-700 shadow-2xl overflow-hidden text-white relative flex flex-col justify-between p-4 animate-in zoom-in-95 duration-150">
              {/* Background Media */}
              <img 
                src={imgUrl} 
                alt="TikTok Creative" 
                className="absolute inset-0 w-full h-full object-cover opacity-85"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600&auto=format&fit=crop&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

              {/* Top Bar */}
              <div className="relative z-10 flex items-center justify-between text-xs font-bold text-neutral-200">
                <span className="text-neutral-400">Live</span>
                <div className="flex items-center gap-3">
                  <span className="text-neutral-400">Following</span>
                  <span className="text-white border-b-2 border-white pb-0.5">For You</span>
                </div>
                <div className="w-5" />
              </div>

              {/* 3s Viral Hook Badge */}
              <div className="relative z-10 bg-amber-500/90 backdrop-blur-xs text-neutral-950 text-[10px] font-extrabold px-2.5 py-1 rounded-xl w-fit shadow-md flex items-center gap-1">
                <Sparkles size={11} />
                <span>3s Viral Hook Audio Active</span>
              </div>

              {/* Bottom Content & Right Sidebar */}
              <div className="relative z-10 flex items-end justify-between gap-3">
                {/* Left: Creator Info & Caption */}
                <div className="space-y-1.5 max-w-[190px]">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold">@{userName.toLowerCase().replace(/\s+/g, '')}</span>
                    <span className="text-[10px] bg-neutral-800/80 px-1 rounded text-neutral-300">Creator</span>
                  </div>
                  <p className="text-[11px] text-neutral-200 leading-snug line-clamp-3">
                    {captionText}
                  </p>
                  <div className="flex items-center gap-1.5 text-[10px] text-neutral-300 pt-1">
                    <Music size={11} className="animate-spin" />
                    <span className="truncate">Original Sound — Trending Ghana Audio</span>
                  </div>
                </div>

                {/* Right: Floating Social Interaction Rail */}
                <div className="flex flex-col items-center gap-3 text-white pb-1">
                  <div className="w-9 h-9 rounded-full bg-neutral-800/80 border border-white/20 overflow-hidden flex items-center justify-center">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                      alt="Creator" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center">
                      <Heart size={18} className="fill-rose-500 text-rose-500" />
                    </div>
                    <span className="text-[10px] font-bold mt-0.5">24.8K</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center">
                      <MessageCircle size={18} />
                    </div>
                    <span className="text-[10px] font-bold mt-0.5">482</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-9 h-9 rounded-full bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center">
                      <Share2 size={18} />
                    </div>
                    <span className="text-[10px] font-bold mt-0.5">1.2K</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. WHATSAPP VIP CHAT MOCKUP */}
          {activeChannel === 'WhatsApp' && (
            <div className="w-[320px] bg-[#ece5dd] rounded-3xl border border-neutral-300 shadow-xl overflow-hidden text-neutral-900 animate-in zoom-in-95 duration-150">
              {/* WhatsApp Green Top Bar */}
              <div className="bg-[#075e54] text-white p-3 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
                      alt="WhatsApp Contact" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">{userName} VIP Broadcast</h4>
                    <span className="text-[9.5px] text-emerald-200 block">Official Business Account • Online</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Video size={15} />
                  <Phone size={15} />
                </div>
              </div>

              {/* WhatsApp Chat Area */}
              <div className="p-3.5 space-y-3 min-h-[300px] flex flex-col justify-end">
                
                {/* Date Pill */}
                <div className="text-center">
                  <span className="bg-white/80 text-[9.5px] font-bold text-neutral-600 px-2 py-0.5 rounded-md shadow-2xs">
                    TODAY
                  </span>
                </div>

                {/* Incoming Message Bubble */}
                <div className="bg-[#dcf8c6] text-neutral-900 rounded-2xl rounded-tr-none p-3 shadow-xs max-w-[90%] self-end space-y-2 border border-emerald-100">
                  {imgUrl && (
                    <div className="w-full h-32 rounded-xl overflow-hidden bg-neutral-200">
                      <img src={imgUrl} alt="Offer Media" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <p className="text-xs leading-relaxed whitespace-pre-wrap font-normal">
                    {captionText}
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60">
                    <span className="text-[9px] font-bold text-emerald-800">Tap to Order via MoMo</span>
                    <span className="text-[9px] text-neutral-500">12:15 PM ✓✓</span>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Right Side: Live Editor & Controls */}
        <div className="w-full md:w-96 p-6 sm:p-8 flex flex-col justify-between space-y-5 bg-white overflow-y-auto">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-neutral-950">Ad & Post Mockup Studio</h3>
                <p className="text-xs text-neutral-500">Preview live on {activeChannel}</p>
              </div>
              <button 
                onClick={onClose}
                className="p-1 rounded-lg text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">Campaign Title</label>
              <input
                type="text"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-neutral-900"
              />
            </div>

            {/* Image URL Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">Creative Image URL</label>
              <input
                type="text"
                value={imgUrl}
                onChange={(e) => setImgUrl(e.target.value)}
                placeholder="https://..."
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 focus:outline-none focus:border-neutral-900"
              />
            </div>

            {/* Caption Text Area */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-neutral-600 uppercase tracking-wider">Caption & Copy</label>
              <textarea
                rows="6"
                value={captionText}
                onChange={(e) => setCaptionText(e.target.value)}
                className="w-full text-xs bg-neutral-50 border border-neutral-200 rounded-xl p-3 focus:outline-none focus:border-neutral-900 leading-relaxed"
              />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-neutral-100 flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-xs active:scale-95"
            >
              {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Caption'}</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
