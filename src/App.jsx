import React, { useState, useEffect } from 'react';
import { CyLayout } from './pages/cy/CyLayout';
import { GetStartedPage } from './pages/GetStartedPage';
import { MarketingProvider } from './context/MarketingContext';
import { TikTokAuthPopupWindow } from './components/auth/TikTokAuthPopupWindow';
import { TermsOfServicePage } from './pages/legal/TermsOfServicePage';
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      const saved = localStorage.getItem('calvras_is_authenticated');
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [legalView, setLegalView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      if (hash === '#terms' || search.includes('view=terms') || path === '/terms') return 'terms';
      if (hash === '#privacy' || search.includes('view=privacy') || path === '/privacy') return 'privacy';
    }
    return null;
  });

  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('aim_user_profile');
      return saved ? JSON.parse(saved) : { name: 'SHIKARI Ogar', email: 'zenithzone18@gmail.com' };
    } catch (e) {
      return { name: 'SHIKARI Ogar', email: 'zenithzone18@gmail.com' };
    }
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#terms') setLegalView('terms');
      else if (hash === '#privacy') setLegalView('privacy');
      else setLegalView(null);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Check if current window is an OAuth Popup
  const isPopup = typeof window !== 'undefined' && window.location.search.includes('popup=tiktok_auth');
  if (isPopup) {
    return <TikTokAuthPopupWindow />;
  }

  // Legal views (for TikTok developer verification & user navigation)
  if (legalView === 'terms') {
    return <TermsOfServicePage onBack={() => { window.location.hash = ''; setLegalView(null); }} />;
  }
  if (legalView === 'privacy') {
    return <PrivacyPolicyPage onBack={() => { window.location.hash = ''; setLegalView(null); }} />;
  }

  const handleSignOut = () => {
    setIsSigningOut(true);
    try {
      localStorage.removeItem('calvras_is_authenticated');
    } catch (e) {}
    setTimeout(() => {
      setIsSigningOut(false);
      setIsAuthenticated(false);
    }, 800);
  };

  const handleLoginSuccess = (userData) => {
    if (userData && userData.name) {
      setUserProfile(userData);
      try {
        localStorage.setItem('aim_user_profile', JSON.stringify(userData));
      } catch (e) {}
    }
    try {
      localStorage.setItem('calvras_is_authenticated', 'true');
      localStorage.setItem('calvras_active_tab', 'new-chat');
    } catch (e) {}
    setIsAuthenticated(true);
  };

  return (
    <MarketingProvider currentUserEmail={userProfile.email}>
      {/* 1-Second Full White Screen Loading Spinner + Signing out text */}
      {isSigningOut && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-3 z-50 select-none animate-in fade-in duration-150">
          <div className="w-7 h-7 rounded-full border-2 border-neutral-200 border-t-neutral-950 animate-spin" />
          <span className="text-xs font-semibold text-neutral-600 tracking-tight animate-pulse">
            Signing out...
          </span>
        </div>
      )}

      {!isSigningOut && (
        isAuthenticated ? (
          <CyLayout 
            onSignOut={handleSignOut} 
            initialTab="new-chat"
            userProfile={userProfile}
            onOpenLegal={(view) => setLegalView(view)}
          />
        ) : (
          <GetStartedPage 
            onLoginSuccess={handleLoginSuccess}
            onNavigate={(view) => {
              if (view === 'login') setIsAuthenticated(false);
            }}
            initialIsSignIn={false}
          />
        )
      )}
    </MarketingProvider>
  );
}

export default App;
