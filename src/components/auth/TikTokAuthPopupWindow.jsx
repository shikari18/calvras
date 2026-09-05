import React, { useState } from 'react';
import { TikTokLogo, InstagramLogo, XTwitterLogo, FacebookLogo } from '../cy/CySocialAuthModal';
import { BrandBurstLogo } from '../cy/CySidebar';
import { Check, ShieldCheck, Lock, Loader2, ArrowRight, User, Mail, Smartphone, ChevronRight } from 'lucide-react';

export const TikTokAuthPopupWindow = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const channel = urlParams.get('channel') || 'TikTok';
  const defaultHandle = urlParams.get('handle') || 'cirqnamics';
  
  const getInitialUser = () => {
    try {
      const s = localStorage.getItem('coded_user');
      if (s) {
        const p = JSON.parse(s);
        if (p) return { name: p.name || 'Creator', email: p.email || 'user@example.com' };
      }
    } catch {}
    return { name: 'Creator', email: 'user@example.com' };
  };
  const activeUser = getInitialUser();

  // Stages: 'login_options' | 'username_input' | 'authorizing' | 'permissions_prompt'
  const [stage, setStage] = useState('login_options');
  const [customHandle, setCustomHandle] = useState('');
  const [loggedInAccount, setLoggedInAccount] = useState({
    handle: defaultHandle,
    name: activeUser.name,
    email: activeUser.email,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    followers: '28.4K'
  });
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [loginMethod, setLoginMethod] = useState('');

  // Handle Social Login (Option C: Google, Apple, Facebook)
  const handleSocialLogin = (provider) => {
    setLoginMethod(provider);
    setIsProcessing(true);

    setTimeout(() => {
      let handleName = (activeUser.name || 'creator').toLowerCase().replace(/\s+/g, '_');
      let avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

      if (provider === 'Google') {
        handleName = handleName + '.google';
      } else if (provider === 'Apple') {
        handleName = handleName + '_apple';
      } else if (provider === 'Facebook') {
        handleName = handleName + '_fb';
      }

      setLoggedInAccount({
        handle: handleName,
        name: activeUser.name,
        email: activeUser.email,
        avatar: avatar,
        followers: '34.8K'
      });

      setIsProcessing(false);
      setStage('permissions_prompt');
    }, 800);
  };

  const handleCustomHandleLogin = (e) => {
    e.preventDefault();
    const clean = customHandle.trim().replace(/^@/, '') || 'my_brand';
    setIsProcessing(true);

    setTimeout(() => {
      setLoggedInAccount({
        handle: clean,
        name: clean,
        email: `${clean}@gmail.com`,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        followers: '19.2K'
      });
      setIsProcessing(false);
      setStage('permissions_prompt');
    }, 600);
  };

  const handleCancel = () => {
    window.close();
  };

  const handleFinalAuthorize = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const payload = {
        channel: channel,
        name: `${channel} (@${loggedInAccount.handle})`,
        handle: `@${loggedInAccount.handle}`,
        displayName: loggedInAccount.name,
        avatarUrl: loggedInAccount.avatar,
        followers: loggedInAccount.followers,
        likesCount: '342.1K',
        verified: true,
        connectedAt: new Date().toLocaleDateString(),
        authMethod: `${channel} Login Kit (${loginMethod || 'OAuth 2.0'})`,
        posts: [
          {
            id: 'tt-vid-101',
            type: `${channel} Short Video`,
            date: '1 day ago',
            caption: `Stop scrolling if you want to elevate your everyday style 🔥 Check bio to order now! #${loggedInAccount.handle} #fashiontips`,
            views: '48.2K',
            likes: '3.9K',
            shares: '412',
            duration: '24s',
            issue: 'Hook is too generic. Missing an immediate price anchor or direct problem statement in the first 2 seconds.'
          },
          {
            id: 'tt-vid-102',
            type: 'Trending Audio Reel',
            date: '3 days ago',
            caption: `POV: You found the perfect piece for your weekend fit 👀 Drop a comment if you need the link! #${loggedInAccount.handle}`,
            views: '19.6K',
            likes: '1.4K',
            shares: '88',
            duration: '15s',
            issue: 'Strong engagement, but no direct WhatsApp / Mobile Money CTA in the video overlay.'
          }
        ]
      };

      if (window.opener) {
        window.opener.postMessage({
          type: 'CALVRAS_SOCIAL_OAUTH_SUCCESS',
          payload
        }, '*');
      }

      window.close();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans select-none flex flex-col justify-between p-6 sm:p-8 antialiased">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
        <div className="flex items-center gap-2">
          {channel === 'TikTok' && <TikTokLogo size={22} className="text-black" />}
          {channel === 'Instagram' && <InstagramLogo size={22} />}
          {channel === 'Twitter' && <XTwitterLogo size={20} className="text-black" />}
          {channel === 'Facebook' && <FacebookLogo size={22} />}
          <span className="text-xs font-bold text-neutral-900">
            {channel} Login Kit
          </span>
        </div>

        <div className="flex items-center gap-1 text-[11px] text-neutral-400 bg-neutral-50 border border-neutral-200/80 px-2.5 py-0.5 rounded-full font-mono">
          <Lock size={10} className="text-emerald-600" />
          <span>OAuth 2.0 Secure</span>
        </div>
      </div>

      {/* 1. STAGE: TIKTOK LOGIN OPTIONS (Option C: Google, Apple, Facebook, Phone/Email) */}
      {stage === 'login_options' && (
        <div className="space-y-6 py-4 text-center my-auto">
          
          <div className="space-y-1.5">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center shadow-2xs">
              {channel === 'TikTok' && <TikTokLogo size={24} className="text-black" />}
              {channel === 'Instagram' && <InstagramLogo size={24} />}
              {channel === 'Twitter' && <XTwitterLogo size={22} className="text-black" />}
              {channel === 'Facebook' && <FacebookLogo size={24} />}
            </div>
            <h2 className="text-xl font-bold text-neutral-950 tracking-tight">
              Log in to {channel}
            </h2>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
              Choose an account to connect with <strong>Calvras</strong>.
            </p>
          </div>

          {/* Social Auth Buttons (Option C) */}
          <div className="space-y-2.5 max-w-xs mx-auto">
            
            {/* Continue with Google */}
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              disabled={isProcessing}
              className="w-full flex items-center justify-between py-3 px-4 bg-white hover:bg-neutral-50 border border-neutral-200 hover:border-neutral-900 rounded-2xl text-xs font-bold transition cursor-pointer shadow-2xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                <span>Continue with Google</span>
              </div>
              <ChevronRight size={14} className="text-neutral-400" />
            </button>

            {/* Continue with Apple */}
            <button
              type="button"
              onClick={() => handleSocialLogin('Apple')}
              disabled={isProcessing}
              className="w-full flex items-center justify-between py-3 px-4 bg-neutral-950 hover:bg-neutral-850 text-white rounded-2xl text-xs font-bold transition cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 fill-current shrink-0 mb-0.5" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.65-.79 1.1-1.9 0.98-3.01-0.96.04-2.12.64-2.8 1.44-.59.68-1.12 1.8-0.98 2.89 1.07.08 2.15-.53 2.8-1.32z"/>
                </svg>
                <span>Continue with Apple</span>
              </div>
              <ChevronRight size={14} className="text-neutral-400" />
            </button>

            {/* Continue with Facebook */}
            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              disabled={isProcessing}
              className="w-full flex items-center justify-between py-3 px-4 bg-[#1877F2] hover:bg-[#166fe5] text-white rounded-2xl text-xs font-bold transition cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <FacebookLogo size={16} className="text-white" />
                <span>Continue with Facebook</span>
              </div>
              <ChevronRight size={14} className="text-blue-200" />
            </button>

            {/* Enter Username / Phone */}
            <button
              type="button"
              onClick={() => setStage('username_input')}
              disabled={isProcessing}
              className="w-full flex items-center justify-between py-3 px-4 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 text-neutral-800 rounded-2xl text-xs font-bold transition cursor-pointer active:scale-[0.99]"
            >
              <div className="flex items-center gap-3">
                <User size={15} className="text-neutral-600" />
                <span>Use phone / email / username</span>
              </div>
              <ChevronRight size={14} className="text-neutral-400" />
            </button>

          </div>

          {isProcessing && (
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-neutral-600 pt-2 animate-pulse">
              <Loader2 size={14} className="animate-spin text-neutral-900" />
              <span>Logging in with {loginMethod}...</span>
            </div>
          )}

        </div>
      )}

      {/* 2. STAGE: USERNAME / EMAIL INPUT TAB */}
      {stage === 'username_input' && (
        <form onSubmit={handleCustomHandleLogin} className="space-y-6 py-4 text-left my-auto">
          
          <div className="text-center space-y-1.5">
            <h2 className="text-xl font-bold text-neutral-950 tracking-tight">
              Enter {channel} Username
            </h2>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
              Log in with your handle to connect your public creator posts.
            </p>
          </div>

          <div className="space-y-1.5 max-w-xs mx-auto">
            <label className="text-[11px] font-semibold text-neutral-400 block px-1">
              Username or Email
            </label>
            <input
              type="text"
              value={customHandle}
              onChange={(e) => setCustomHandle(e.target.value)}
              placeholder="e.g. cirqnamics"
              className="w-full p-3 rounded-2xl border-2 border-neutral-200 focus:border-neutral-950 text-xs font-semibold bg-neutral-50 focus:bg-white focus:outline-none transition shadow-2xs"
              autoFocus
            />
          </div>

          <div className="max-w-xs mx-auto flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStage('login_options')}
              className="w-1/3 py-3 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="w-2/3 py-3 bg-neutral-950 hover:bg-neutral-850 text-white text-xs font-bold rounded-xl transition shadow-xs flex items-center justify-center gap-2"
            >
              {isProcessing ? <Loader2 size={14} className="animate-spin text-white" /> : <span>Continue</span>}
            </button>
          </div>

        </form>
      )}

      {/* 3. STAGE: PERMISSIONS & AUTHORIZE CALVRAS */}
      {stage === 'permissions_prompt' && (
        <div className="space-y-6 py-4 text-left my-auto">
          
          {/* App Bridge Graphic */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <div className="w-13 h-13 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-center shadow-xs">
              {channel === 'TikTok' && <TikTokLogo size={24} className="text-black" />}
              {channel === 'Instagram' && <InstagramLogo size={24} />}
              {channel === 'Twitter' && <XTwitterLogo size={22} className="text-black" />}
              {channel === 'Facebook' && <FacebookLogo size={24} />}
            </div>

            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-neutral-300" />
              <div className="w-5 h-[1.5px] bg-neutral-200" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="w-5 h-[1.5px] bg-neutral-200" />
              <div className="w-2 h-2 rounded-full bg-neutral-300" />
            </div>

            <div className="w-13 h-13 rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
              <BrandBurstLogo size={18} />
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h2 className="text-lg font-bold text-neutral-950 tracking-tight">
              Authorize Calvras
            </h2>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-relaxed">
              <strong>Calvras</strong> is requesting permission to access your <strong>@{loggedInAccount.handle}</strong> {channel} account.
            </p>
          </div>

          {/* Account Card */}
          <div className="bg-neutral-50 border border-neutral-200/90 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-neutral-900 overflow-hidden shrink-0 border border-neutral-300">
                <img 
                  src={loggedInAccount.avatar} 
                  alt={loggedInAccount.handle} 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-neutral-950">@{loggedInAccount.handle}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-[11px] text-neutral-500">{loggedInAccount.followers} Followers • Verified</span>
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
              Logged In
            </span>
          </div>

          {/* Permissions Requested */}
          <div className="border border-neutral-100 bg-neutral-50/60 rounded-2xl p-3.5 space-y-2.5">
            <span className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider block">
              Permissions Requested
            </span>

            <div className="space-y-2 text-xs text-neutral-700">
              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={10} />
                </div>
                <div>
                  <span className="font-semibold text-neutral-900 block text-[12px]">Read Public Video Posts & Captions</span>
                  <span className="text-[11px] text-neutral-500">Allows AI to read post text, hashtags, and durations.</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={10} />
                </div>
                <div>
                  <span className="font-semibold text-neutral-900 block text-[12px]">Inspect Engagement & Retention</span>
                  <span className="text-[11px] text-neutral-500">Audits views, likes, and identifies hook drop-off points.</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Check size={10} />
                </div>
                <div>
                  <span className="font-semibold text-neutral-900 block text-[12px]">100% Read-Only Safety</span>
                  <span className="text-[11px] text-neutral-500">Calvras cannot edit, delete, or publish content on your behalf.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isProcessing}
              className="w-1/3 py-3 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition cursor-pointer text-center"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleFinalAuthorize}
              disabled={isProcessing}
              className="w-2/3 bg-black hover:bg-neutral-850 disabled:opacity-50 text-white text-xs font-semibold py-3 px-4 rounded-xl transition cursor-pointer shadow-xs active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={14} className="animate-spin text-white" />
                  <span>Syncing Account...</span>
                </>
              ) : (
                <>
                  {channel === 'TikTok' ? <TikTokLogo size={14} className="text-white" /> : <ShieldCheck size={14} />}
                  <span>Authorize & Continue</span>
                  <ArrowRight size={12} />
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* Footer Disclaimer */}
      <div className="pt-3 text-center text-[11px] text-neutral-400">
        <span>By authorizing, you agree to {channel}'s Terms of Service & Privacy Policy.</span>
      </div>

    </div>
  );
};
