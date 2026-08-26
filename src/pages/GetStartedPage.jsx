import React, { useState, useEffect, useRef } from 'react';
import { Loader2, Key, Check } from 'lucide-react';
import { BrandBurstLogo } from '../components/cy/CySidebar';

// Google Client ID for calvras.com
export const GOOGLE_CLIENT_ID = '139207574445-ol2q2cbgf5kqd6dnlnn6b95vdp349h9c.apps.googleusercontent.com';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export const GetStartedPage = ({ onNavigate, onLoginSuccess, initialIsSignIn = false, onBack }) => {
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [turnstileSuccess, setTurnstileSuccess] = useState(true);
  const googleBtnContainerRef = useRef(null);

  // Initialize Google Identity Services
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleCredentialResponse = (response) => {
      setIsLoadingGoogle(false);
      if (response.credential) {
        const profile = parseJwt(response.credential);
        if (profile) {
          const userObj = {
            name: profile.name || 'User',
            email: profile.email || 'user@calvras.com',
            picture: profile.picture || null,
            sub: profile.sub
          };
          onLoginSuccess(userObj);
          return;
        }
      }
      onLoginSuccess({ name: 'Calvras User', email: 'user@calvras.com' });
    };

    const initGoogle = () => {
      if (window.google?.accounts?.id && GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        if (googleBtnContainerRef.current) {
          try {
            googleBtnContainerRef.current.innerHTML = '';
            window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
              type: 'standard',
              theme: 'filled_black',
              size: 'large',
              width: 320,
              text: 'continue_with',
              shape: 'rectangular',
              logo_alignment: 'left'
            });
          } catch (e) {}
        }
      }
    };

    if (!window.google?.accounts?.id) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = initGoogle;
      document.body.appendChild(script);
    } else {
      initGoogle();
    }
  }, [onLoginSuccess]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const namePart = email.split('@')[0];
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      onLoginSuccess({
        name: capitalized || 'User',
        email: email
      });
    }, 800);
  };

  const handleGoogleAuth = () => {
    setIsLoadingGoogle(true);
    if (GOOGLE_CLIENT_ID && window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setTimeout(() => {
            setIsLoadingGoogle(false);
            onLoginSuccess({ name: 'Google User', email: 'user@gmail.com' });
          }, 400);
        }
      });
    } else {
      setTimeout(() => {
        setIsLoadingGoogle(false);
        onLoginSuccess({ name: 'Google User', email: 'user@gmail.com' });
      }, 400);
    }
  };

  const handleDiscordAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ name: 'Discord User', email: 'discord_user@calvras.com' });
    }, 600);
  };

  const handleSSOAuth = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({ name: 'Enterprise User', email: 'sso@company.com' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center p-3 sm:p-6 md:p-8 font-sans select-none antialiased">
      
      {/* 2-Column Split Auth Card matching Recraft Studio layout */}
      <div className="w-full max-w-5xl min-h-[640px] bg-[#141414] rounded-3xl border border-neutral-800 shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Column: Sign-in / Sign-up Form */}
        <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 flex flex-col justify-between space-y-6">
          
          <div className="space-y-6 max-w-sm mx-auto w-full">
            
            {/* Top Logo */}
            <div className="flex items-center justify-between">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md">
                <span className="font-serif font-black text-neutral-950 text-xl tracking-tighter">
                  C
                </span>
              </div>

              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-neutral-800/80 hover:bg-neutral-700 transition cursor-pointer"
                >
                  ← Home
                </button>
              )}
            </div>

            {/* Headline */}
            <div className="space-y-1">
              <h1 className="text-2xl sm:text-[26px] font-bold text-white tracking-tight leading-snug">
                Welcome to Calvras Studio
              </h1>
              <p className="text-xs text-neutral-400 font-normal">
                Sign in or create your account
              </p>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailSubmit} className="space-y-3.5">
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#202020] border border-neutral-700/80 text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none focus:border-neutral-400 transition"
                />
              </div>

              {/* Remember Me Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded bg-[#202020] border-neutral-700 text-[#ff5e28] focus:ring-0 cursor-pointer accent-[#ff5e28]"
                />
                <label htmlFor="rememberMe" className="text-xs text-neutral-400 cursor-pointer">
                  Remember me
                </label>
              </div>

              {/* Cloudflare Turnstile Simulated Verification Widget */}
              <div className="bg-[#1c1c1c] border border-neutral-800 rounded-xl px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#22c55e] flex items-center justify-center shadow-sm">
                    <Check size={12} className="text-white stroke-[3]" />
                  </div>
                  <span className="text-xs font-semibold text-neutral-200">
                    Success!
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-right">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#f6821f] shrink-0" />
                  <span className="text-[10px] font-bold text-neutral-400 tracking-wider uppercase">
                    Cloudflare
                  </span>
                </div>
              </div>

              {/* Continue Email Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition cursor-pointer shadow-sm active:scale-98 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-neutral-950" />
                    <span>Continuing...</span>
                  </>
                ) : (
                  <span>Continue</span>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-neutral-800 w-full" />
              <span className="bg-[#141414] px-3 text-[11px] text-neutral-500 font-medium uppercase tracking-wider">
                or
              </span>
            </div>

            {/* Social Auth Stack (Google, Discord, SSO - NO APPLE as requested) */}
            <div className="space-y-2.5">
              
              {/* Continue with Google */}
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoadingGoogle}
                className="w-full py-2.5 px-4 bg-[#202020] hover:bg-[#282828] text-white border border-neutral-700/80 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-3 shadow-2xs active:scale-98 disabled:opacity-50"
              >
                {isLoadingGoogle ? (
                  <Loader2 size={16} className="animate-spin text-white" />
                ) : (
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                )}
                <span>Continue with Google</span>
              </button>

              {/* Continue with Discord */}
              <button
                type="button"
                onClick={handleDiscordAuth}
                className="w-full py-2.5 px-4 bg-[#202020] hover:bg-[#282828] text-white border border-neutral-700/80 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-3 shadow-2xs active:scale-98"
              >
                <svg className="w-4 h-4 fill-[#5865F2] shrink-0" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span>Continue with Discord</span>
              </button>

              {/* Single Sign-On (SSO) */}
              <button
                type="button"
                onClick={handleSSOAuth}
                className="w-full py-2.5 px-4 bg-[#202020] hover:bg-[#282828] text-white border border-neutral-700/80 rounded-xl text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center justify-center gap-3 shadow-2xs active:scale-98"
              >
                <Key size={15} className="text-neutral-400 shrink-0" />
                <span>Single Sign-On</span>
              </button>

            </div>

          </div>

          {/* User Requested Terms & Privacy Footer */}
          <div className="pt-4 text-center max-w-sm mx-auto w-full">
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              By continuing, you agree to our{' '}
              <a 
                href="https://www.recraft.ai/terms" 
                target="_blank" 
                rel="noreferrer"
                className="text-white underline hover:text-neutral-200 transition font-medium"
              >
                Terms of service
              </a>
              , and{' '}
              <a 
                href="https://www.recraft.ai/privacy" 
                target="_blank" 
                rel="noreferrer"
                className="text-white underline hover:text-neutral-200 transition font-medium"
              >
                Privacy policy
              </a>
              .
            </p>
          </div>

        </div>

        {/* Right Column: Hero Visual Artwork matching Recraft V4 Styles Promo */}
        <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-[#101010]">
          <div className="w-full h-full min-h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl border border-neutral-800 bg-[#0a1118]">
            
            {/* Background Editorial Image */}
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop" 
              alt="Model with Wildflowers"
              className="w-full h-full object-cover object-top filter contrast-[1.05]"
            />

            {/* Gradient Overlay for Typography Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1118] via-[#0a1118]/40 to-transparent" />

            {/* Floating Badge & Typography Overlay matching Screenshot */}
            <div className="absolute bottom-10 left-0 right-0 p-8 text-center space-y-2">
              <div className="inline-block">
                <span className="bg-[#a3e635] text-black font-extrabold text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                  NEW MODEL
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-wide font-sans drop-shadow-md">
                V4 STYLES
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 font-medium drop-shadow">
                Style it once, and every image matches.
              </p>

              {/* Carousel Indicator Dots */}
              <div className="flex items-center justify-center gap-1.5 pt-3">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
