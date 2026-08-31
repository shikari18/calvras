import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Video,
  Key,
  Lock,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck
} from 'lucide-react';
import { BrandBurstLogo } from './CySidebar';
import { 
  getTikTokDeveloperKeys, 
  saveTikTokDeveloperKeys, 
  buildOfficialTikTokAuthUrl, 
  exchangeTikTokCodeForToken, 
  fetchRealTikTokUserInfo, 
  fetchRealTikTokVideos 
} from '../../services/tiktokOAuthService';

export const InstagramLogo = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`}>
    <defs>
      <radialGradient id="igGradModalReal" r="150%" cx="30%" cy="107%">
        <stop stopColor="#fdf497" offset="0%" />
        <stop stopColor="#fdf497" offset="5%" />
        <stop stopColor="#fd5949" offset="45%" />
        <stop stopColor="#d6249f" offset="60%" />
        <stop stopColor="#285AEB" offset="90%" />
      </radialGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5.5" fill="url(#igGradModalReal)" />
    <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#ffffff" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.8" />
    <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
  </svg>
);

export const TikTokLogo = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

export const XTwitterLogo = ({ size = 18, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={`shrink-0 ${className}`}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const FacebookLogo = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2" className={`shrink-0 ${className}`}>
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

export const CySocialAuthModal = ({ channel = 'TikTok', isOpen, onClose, onConnectSuccess }) => {
  if (!isOpen) return null;

  const [devKeys, setDevKeys] = useState(getTikTokDeveloperKeys);
  const [copiedRedirect, setCopiedRedirect] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const currentRedirectUri = typeof window !== 'undefined' ? `${window.location.origin}/` : 'http://localhost:5173/';

  // Copy redirect URI helper
  const handleCopyRedirect = () => {
    navigator.clipboard.writeText(currentRedirectUri);
    setCopiedRedirect(true);
    setTimeout(() => setCopiedRedirect(false), 2000);
  };

  // Launch Real TikTok OAuth Authorization Window
  const handleLaunchOfficialOAuth = async (e) => {
    e.preventDefault();
    if (!devKeys.clientKey.trim()) {
      setErrorMsg('Please enter your TikTok Client Key (App ID) from developers.tiktok.com');
      return;
    }

    saveTikTokDeveloperKeys(devKeys);
    setIsLaunching(true);
    setErrorMsg('');

    try {
      // Build real OAuth URL with SHA-256 S256 PKCE
      const authUrl = await buildOfficialTikTokAuthUrl(devKeys.clientKey.trim(), currentRedirectUri);
      
      const width = 520;
      const height = 740;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2.5;

      const popup = window.open(
        authUrl,
        'TikTokRealOAuth',
        `width=${width},height=${height},left=${left},top=${top},status=no,toolbar=no,menubar=no,location=yes,resizable=yes`
      );

      if (!popup) {
        setErrorMsg('Popup was blocked by browser. Please allow popups for localhost.');
        setIsLaunching(false);
        return;
      }

      // Check popup for callback redirect
      const pollTimer = setInterval(async () => {
        try {
          if (popup.closed) {
            clearInterval(pollTimer);
            setIsLaunching(false);
            return;
          }

          const popupUrl = popup.location.href;
          if (popupUrl && popupUrl.includes(window.location.origin)) {
            clearInterval(pollTimer);
            const params = new URLSearchParams(new URL(popupUrl).search);
            const code = params.get('code');
            const error = params.get('error');

            popup.close();

            if (error) {
              setErrorMsg(`TikTok returned error: ${error}`);
              setIsLaunching(false);
              return;
            }

            if (code) {
              // Exchange real code for Access Token
              if (devKeys.clientSecret.trim()) {
                const tokenData = await exchangeTikTokCodeForToken({
                  code,
                  clientKey: devKeys.clientKey.trim(),
                  clientSecret: devKeys.clientSecret.trim(),
                  redirectUri: currentRedirectUri
                });

                const userInfo = await fetchRealTikTokUserInfo(tokenData.access_token);
                const videos = await fetchRealTikTokVideos(tokenData.access_token);

                const finalPayload = {
                  channel: 'TikTok',
                  name: `TikTok (@${userInfo.username || userInfo.display_name})`,
                  handle: `@${userInfo.username || userInfo.display_name}`,
                  displayName: userInfo.display_name,
                  avatarUrl: userInfo.avatar_url,
                  followers: `${userInfo.follower_count || 0}`,
                  likesCount: `${userInfo.likes_count || 0}`,
                  verified: userInfo.is_verified || false,
                  connectedAt: new Date().toLocaleDateString(),
                  authMethod: 'Official TikTok Developer API (OAuth 2.0 Live)',
                  posts: videos.map((v, i) => ({
                    id: v.id || `tt-real-${i}`,
                    type: 'Live TikTok Video',
                    duration: `${v.duration || 15}s`,
                    date: new Date(v.create_time * 1000).toLocaleDateString(),
                    caption: v.title || v.video_description || 'No caption',
                    views: `${v.view_count || 0}`,
                    likes: `${v.like_count || 0}`,
                    shares: `${v.share_count || 0}`,
                    comments: `${v.comment_count || 0}`
                  }))
                };

                onConnectSuccess(finalPayload);
                onClose();
              } else {
                setErrorMsg('Authorization code received! Please enter Client Secret to complete token exchange.');
                setIsLaunching(false);
              }
            }
          }
        } catch (e) {
          // Cross-origin restriction while on tiktok.com - expected until redirect back
        }
      }, 600);

    } catch (err) {
      setErrorMsg(err.message || 'Failed to start TikTok OAuth');
      setIsLaunching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-150">
      
      {/* Outer Card */}
      <div className="bg-white rounded-[28px] border border-neutral-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] max-w-[460px] w-full overflow-hidden text-left font-sans relative animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 flex items-center justify-center transition cursor-pointer z-10"
        >
          <X size={15} />
        </button>

        <form onSubmit={handleLaunchOfficialOAuth} className="p-7 space-y-5">
          
          {/* Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-neutral-100">
            <div className="w-11 h-11 rounded-2xl bg-black text-white flex items-center justify-center shadow-xs">
              <TikTokLogo size={22} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-neutral-950">TikTok Developer API Setup</h3>
                <span className="text-[9.5px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Live API
                </span>
              </div>
              <p className="text-xs text-neutral-500">
                Connect your app on <a href="https://developers.tiktok.com/apps" target="_blank" rel="noreferrer" className="text-neutral-900 underline font-semibold inline-flex items-center gap-0.5">developers.tiktok.com <ExternalLink size={10} /></a>
              </p>
            </div>
          </div>

          {/* Step 1: Redirect URI */}
          <div className="space-y-1.5 bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-neutral-900 flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">1</span>
                <span>Paste this Redirect URI in your TikTok App:</span>
              </span>
              <button
                type="button"
                onClick={handleCopyRedirect}
                className="text-[11px] font-semibold text-neutral-700 hover:text-neutral-950 flex items-center gap-1 bg-white border border-neutral-200 px-2 py-0.5 rounded-lg cursor-pointer transition shadow-2xs"
              >
                {copiedRedirect ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                <span>{copiedRedirect ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <div className="p-2 bg-white rounded-xl border border-neutral-200 text-xs font-mono text-neutral-800 break-all select-all">
              {currentRedirectUri}
            </div>
          </div>

          {/* Step 2: Client Key & Secret */}
          <div className="space-y-3">
            <span className="font-bold text-neutral-900 text-xs flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">2</span>
              <span>Paste your App Credentials from TikTok Console:</span>
            </span>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-neutral-700 block">TikTok Client Key (App ID) *</label>
              <input
                type="text"
                value={devKeys.clientKey}
                onChange={(e) => setDevKeys({ ...devKeys, clientKey: e.target.value })}
                placeholder="e.g. aw7j56x8zq9y12kl"
                className="w-full p-2.5 rounded-xl border-2 border-neutral-200 focus:border-neutral-950 text-xs font-mono bg-neutral-50 focus:bg-white focus:outline-none transition shadow-2xs"
                required
              />
            </div>

            <div className="space-y-1 text-xs">
              <label className="font-semibold text-neutral-700 block">TikTok Client Secret</label>
              <input
                type="password"
                value={devKeys.clientSecret}
                onChange={(e) => setDevKeys({ ...devKeys, clientSecret: e.target.value })}
                placeholder="Enter client secret from TikTok portal"
                className="w-full p-2.5 rounded-xl border-2 border-neutral-200 focus:border-neutral-950 text-xs font-mono bg-neutral-50 focus:bg-white focus:outline-none transition shadow-2xs"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-start gap-2 animate-in fade-in duration-150">
              <AlertCircle size={14} className="shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-3 text-xs font-semibold text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-xl transition cursor-pointer text-center"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLaunching}
              className="w-2/3 bg-black hover:bg-neutral-850 disabled:opacity-50 text-white text-xs font-semibold py-3 px-4 rounded-xl transition cursor-pointer shadow-xs active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {isLaunching ? (
                <>
                  <Loader2 size={14} className="animate-spin text-white" />
                  <span>Connecting to TikTok...</span>
                </>
              ) : (
                <>
                  <TikTokLogo size={14} className="text-white" />
                  <span>Launch Official TikTok Login</span>
                  <ArrowRight size={12} />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
