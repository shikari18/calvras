import React, { useState, useEffect, useRef } from 'react';
import { BrandBurstLogo } from '../components/cy/CySidebar';
import { Loader2, AlertCircle } from 'lucide-react';

// Google Client ID from Google Cloud Console for calvras.com
export const GOOGLE_CLIENT_ID = '139207574445-ol2q2cbgf5kqd6dnlnn6b95vdp349h9c.apps.googleusercontent.com';

// Helper to decode Google JWT token
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

export const GetStartedPage = ({ onNavigate, onLoginSuccess, initialIsSignIn = false }) => {
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [appleNotice, setAppleNotice] = useState(false);
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
      onLoginSuccess();
    };

    const initGoogle = () => {
      if (window.google?.accounts?.id && GOOGLE_CLIENT_ID) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true
        });

        // Render official Google button
        if (googleBtnContainerRef.current) {
          try {
            googleBtnContainerRef.current.innerHTML = '';
            window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
              type: 'standard',
              theme: 'outline',
              size: 'large',
              width: 316,
              text: 'continue_with',
              shape: 'pill',
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

  const handleGoogleAuth = () => {
    setIsLoadingGoogle(true);

    if (GOOGLE_CLIENT_ID && window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          setTimeout(() => {
            setIsLoadingGoogle(false);
            onLoginSuccess();
          }, 500);
        }
      });
    } else {
      setTimeout(() => {
        setIsLoadingGoogle(false);
        onLoginSuccess();
      }, 400);
    }
  };

  const handleAppleClick = () => {
    setAppleNotice(true);
    setTimeout(() => {
      setAppleNotice(false);
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#fafafc] flex flex-col justify-between font-sans antialiased text-neutral-900 select-none">
      
      {/* Top Header */}
      <header className="w-full py-6 px-6 sm:px-12 flex items-center justify-between border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <BrandBurstLogo size={22} className="text-neutral-950" />
          <span className="font-serif font-bold text-neutral-950 text-lg tracking-tight">
            Calvras
          </span>
        </div>
      </header>

      {/* Main Centered Minimalist Auth Card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[380px] bg-white rounded-3xl border border-neutral-200/90 shadow-[0_4px_32px_rgba(0,0,0,0.04)] p-8 sm:p-10 text-center space-y-7">
          
          {/* Logo & Headline */}
          <div className="space-y-2">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-center shadow-2xs">
              <BrandBurstLogo size={22} className="text-neutral-950" />
            </div>
            
            <h1 className="text-2xl sm:text-[26px] font-serif font-normal text-neutral-950 tracking-tight leading-snug pt-1">
              Welcome to Calvras
            </h1>
            
            <p className="text-xs text-neutral-500 font-normal leading-relaxed max-w-xs mx-auto">
              Sign in or create your account with one click to launch your marketing workspace.
            </p>
          </div>

          {/* Apple Notice Banner */}
          {appleNotice && (
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs text-neutral-700 space-y-1 animate-in fade-in zoom-in-95 duration-150 text-left">
              <div className="flex items-center gap-1.5 font-bold text-neutral-900">
                <AlertCircle size={13} className="text-neutral-950 shrink-0" />
                <span>Apple Sign-In Coming Soon</span>
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Apple ID integration is currently in developer preview. Please continue with Google.
              </p>
            </div>
          )}

          {/* Clean 1-Click Social Auth Buttons */}
          <div className="space-y-3 flex flex-col items-center">
            
            {/* Google Render Container / Fallback Button */}
            <div ref={googleBtnContainerRef} className="w-full flex justify-center min-h-[44px]">
              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoadingGoogle}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white hover:bg-neutral-50 text-neutral-900 border-2 border-neutral-200 hover:border-neutral-900 rounded-2xl text-xs sm:text-[13px] font-bold transition cursor-pointer shadow-2xs active:scale-[0.99] disabled:opacity-50"
              >
                {isLoadingGoogle ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-neutral-900" />
                    <span>Connecting with Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </div>

            {/* Apple ID Auth Button */}
            <button
              type="button"
              onClick={handleAppleClick}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-neutral-950 hover:bg-neutral-850 text-white rounded-2xl text-xs sm:text-[13px] font-bold transition cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <svg className="w-4 h-4 fill-current shrink-0 mb-0.5" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.65-.79 1.1-1.9 0.98-3.01-0.96.04-2.12.64-2.8 1.44-.59.68-1.12 1.8-0.98 2.89 1.07.08 2.15-.53 2.8-1.32z"/>
              </svg>
              <span>Continue with Apple</span>
            </button>

          </div>

          {/* Micro Disclaimer */}
          <p className="text-[11px] text-neutral-400 leading-relaxed">
            By continuing, you agree to Calvras's{' '}
            <span className="text-neutral-700 font-medium underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="text-neutral-700 font-medium underline cursor-pointer">Privacy Policy</span>.
          </p>

        </div>
      </main>

      {/* Minimalist Footer */}
      <footer className="w-full py-8 px-6 text-center text-xs text-neutral-400 border-t border-neutral-100">
        <span>© {new Date().getFullYear()} Calvras (calvras.com). All rights reserved.</span>
      </footer>

    </div>
  );
};
