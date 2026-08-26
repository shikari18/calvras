import React, { useState, useEffect } from 'react';
import { CyLayout } from './pages/cy/CyLayout';
import { LandingPage } from './pages/LandingPage';
import { GetStartedPage } from './pages/GetStartedPage';
import { OnboardingFlow } from './pages/OnboardingFlow';
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

  const [isAuthOpen, setIsAuthOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#signin' || hash === '#signup' || hash === '#auth' || hash === '#get-started') {
        return true;
      }
    }
    return false;
  });

  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(true);

  // Initial page refresh transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRefreshing(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

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

  const [isOnboarding, setIsOnboarding] = useState(() => {
    try {
      const savedAuth = localStorage.getItem('calvras_is_authenticated');
      const savedProfile = localStorage.getItem('aim_user_profile');
      const userEmail = savedProfile ? JSON.parse(savedProfile)?.email : 'default';
      const savedOnboarding = localStorage.getItem(`calvras_onboarding_completed_${userEmail}`);

      if (typeof window !== 'undefined') {
        const hash = window.location.hash.toLowerCase();
        if (hash.startsWith('#onboarding') || (savedAuth === 'true' && hash === '#pricing')) {
          return true;
        }
      }

      return savedAuth === 'true' && savedOnboarding !== 'true';
    } catch (e) {
      return false;
    }
  });

  // Handle URL hash changes across the entire app
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#terms') {
        setLegalView('terms');
      } else if (hash === '#privacy') {
        setLegalView('privacy');
      } else if (hash === '#signin' || hash === '#signup' || hash === '#auth' || hash === '#get-started') {
        setLegalView(null);
        setIsAuthOpen(true);
      } else if (hash.startsWith('#onboarding') || (isAuthenticated && (hash === '#pricing' || hash === '#plans'))) {
        setLegalView(null);
        setIsOnboarding(true);
      } else {
        setLegalView(null);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isAuthenticated]);

  // Check if current window is an OAuth Popup
  const isPopup = typeof window !== 'undefined' && window.location.search.includes('popup=tiktok_auth');
  if (isPopup) {
    return <TikTokAuthPopupWindow />;
  }

  // Legal views (Terms of Service / Privacy Policy)
  if (legalView === 'terms') {
    return <TermsOfServicePage onBack={() => { window.location.hash = ''; setLegalView(null); }} />;
  }
  if (legalView === 'privacy') {
    return <PrivacyPolicyPage onBack={() => { window.location.hash = ''; setLegalView(null); }} />;
  }

  const handleSignOut = () => {
    setIsSigningOut(true);
    setIsAuthOpen(false);
    setIsOnboarding(false);
    try {
      localStorage.removeItem('calvras_is_authenticated');
    } catch (e) {}
    setTimeout(() => {
      setIsSigningOut(false);
      setIsAuthenticated(false);
      if (typeof window !== 'undefined') {
        window.location.hash = '';
      }
    }, 800);
  };

  const handleLoginSuccess = (userData) => {
    const userEmail = userData?.email || userProfile.email || 'default';
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

    setIsSigningIn(true);
    setTimeout(() => {
      setIsSigningIn(false);
      setIsAuthOpen(false);
      setIsAuthenticated(true);
      
      // Check if onboarding needs to be shown for THIS specific user account
      const onboarded = localStorage.getItem(`calvras_onboarding_completed_${userEmail}`) === 'true';
      setIsOnboarding(!onboarded);
    }, 1000);
  };

  const handleOnboardingComplete = (planData, answers) => {
    const currentEmail = userProfile?.email || 'default';
    try {
      localStorage.setItem(`calvras_onboarding_completed_${currentEmail}`, 'true');
      localStorage.setItem(`calvras_user_plan_${currentEmail}`, JSON.stringify(planData));
      localStorage.setItem(`calvras_onboarding_answers_${currentEmail}`, JSON.stringify(answers));
      localStorage.setItem('calvras_active_tab', 'new-chat');
    } catch (e) {}
    setIsOnboarding(false);
    if (typeof window !== 'undefined') {
      window.location.hash = '';
    }
  };

  return (
    <MarketingProvider currentUserEmail={userProfile.email}>
      {/* Initial Page Refresh / Load Spinner */}
      {isRefreshing && (
        <div 
          style={{ zIndex: 99999999 }}
          className="fixed inset-0 bg-white text-neutral-900 flex flex-col items-center justify-center gap-4 select-none animate-in fade-in duration-200"
        >
          <div className="relative flex items-center justify-center">
            <div className="w-9 h-9 rounded-full border-[2.5px] border-neutral-200 border-t-[#ff5e28] animate-spin" />
            <div className="absolute w-2 h-2 rounded-full bg-[#ff5e28] animate-ping" />
          </div>
          <span className="text-xs font-semibold text-neutral-700 tracking-tight animate-pulse">
            Loading Calvras...
          </span>
        </div>
      )}

      {/* Full Screen Loading Spinner + Signing in text */}
      {isSigningIn && (
        <div className="fixed inset-0 bg-white text-neutral-900 flex flex-col items-center justify-center gap-3.5 z-50 select-none animate-in fade-in duration-150">
          <div className="w-8 h-8 rounded-full border-2 border-neutral-200 border-t-[#ff5e28] animate-spin" />
          <span className="text-xs font-semibold text-neutral-800 tracking-tight animate-pulse">
            Signing in...
          </span>
        </div>
      )}

      {/* Full Screen Loading Spinner + Signing out text */}
      {isSigningOut && (
        <div className="fixed inset-0 bg-white text-neutral-900 flex flex-col items-center justify-center gap-3 z-50 select-none animate-in fade-in duration-150">
          <div className="w-7 h-7 rounded-full border-2 border-neutral-200 border-t-neutral-600 animate-spin" />
          <span className="text-xs font-semibold text-neutral-600 tracking-tight animate-pulse">
            Signing out...
          </span>
        </div>
      )}

      {!isRefreshing && !isSigningIn && !isSigningOut && (
        isOnboarding ? (
          <OnboardingFlow 
            userProfile={userProfile}
            onComplete={handleOnboardingComplete}
          />
        ) : isAuthenticated ? (
          <CyLayout 
            onSignOut={handleSignOut} 
            initialTab="new-chat"
            userProfile={userProfile}
            onOpenLegal={(view) => setLegalView(view)}
          />
        ) : isAuthOpen ? (
          <GetStartedPage 
            onLoginSuccess={handleLoginSuccess}
            onNavigate={(view) => {
              if (view === 'home' || view === 'landing') {
                setIsAuthOpen(false);
                window.location.hash = '';
              }
            }}
            onBack={() => {
              setIsAuthOpen(false);
              window.location.hash = '';
            }}
            initialIsSignIn={false}
          />
        ) : (
          <LandingPage 
            onGetStarted={() => {
              setIsAuthOpen(true);
              window.location.hash = '#get-started';
            }}
            onOpenLegal={(view) => {
              setLegalView(view);
              window.location.hash = `#${view}`;
            }}
          />
        )
      )}
    </MarketingProvider>
  );
}

export default App;
