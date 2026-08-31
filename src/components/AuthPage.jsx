import React, { useState, useEffect, useRef } from 'react';
import { Check, ArrowLeft, Sparkles } from 'lucide-react';

const GOOGLE_CLIENT_ID = '139207574445-9cs49lurhscd7m867e9igoh1rte2rksp.apps.googleusercontent.com';

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
  } catch {
    return null;
  }
}

// ─── "What should we call you?" onboarding ───────────────────────────────────
function NameOnboarding({ onComplete, defaultName = '' }) {
  const [name, setName] = useState(defaultName);

  return (
    <div className="min-h-screen w-screen bg-[#0f0f0e] text-white flex items-center justify-center p-6 font-sans select-none">
      <div className="w-full max-w-[380px] text-center">
        <div className="text-[28px] font-black tracking-tight mb-2">Welcome to Calvras</div>
        <p className="text-sm text-neutral-400 mb-8">What should we call you?</p>

        <input
          autoFocus
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && name.trim()) onComplete(name.trim()); }}
          placeholder="Your name..."
          className="w-full h-12 px-4 rounded-xl bg-[rgb(30,30,30)] border border-[rgb(55,55,55)] text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors mb-4 text-center text-[16px]"
        />

        <button
          type="button"
          onClick={() => name.trim() && onComplete(name.trim())}
          disabled={!name.trim()}
          className="w-full h-12 rounded-xl bg-white text-black text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-200 cursor-pointer"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}

// ─── Main Auth Page ───────────────────────────────────────────────────────────
export default function AuthPage({ onAuthSuccess }) {
  const [step, setStep] = useState('auth'); // 'auth' | 'name'
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const googleBtnRef = useRef(null);

  const slides = [
    { badge: 'CALVRAS INTELLIGENCE', title: 'FULL-STACK AI', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&q=95&auto=format&fit=crop' },
    { badge: 'NEURAL WORKSPACE', title: 'STUDIO GEN', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=95&auto=format&fit=crop' },
    { badge: 'PRO SYNTHESIS', title: 'CREATIVE SUITE', image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1600&q=95&auto=format&fit=crop' },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  // ── Initialize Google Sign-In ───────────────────────────────────────────────
  const handleCredentialResponse = (response) => {
    try {
      const payload = parseJwt(response.credential);
      if (!payload) throw new Error('Invalid Google credential token');

      const userData = {
        name: payload.name || payload.given_name || payload.email.split('@')[0],
        email: payload.email,
        avatar: payload.picture || null,
        plan: 'Free',
      };

      if (onAuthSuccess) {
        onAuthSuccess(userData);
      }
    } catch (err) {
      console.error('Google Sign In Error:', err);
      setError('Google sign-in failed. Please try again.');
    }
  };

  useEffect(() => {
    const initGoogle = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        if (googleBtnRef.current) {
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'filled_black',
            size: 'large',
            shape: 'pill',
            width: 320,
            text: 'continue_with',
          });
        }
      }
    };

    if (window.google?.accounts?.id) {
      initGoogle();
    } else {
      const interval = setInterval(() => {
        if (window.google?.accounts?.id) {
          clearInterval(interval);
          initGoogle();
        }
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  const triggerGooglePrompt = () => {
    setError('');
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // If One-tap prompt is blocked or skipped, programmatically click rendered button
          const btn = googleBtnRef.current?.querySelector('div[role="button"]');
          if (btn) btn.click();
        }
      });
    } else {
      setError('Google Services loading. Please try again in a moment.');
    }
  };

  // ── Email / Password Auth Submit ────────────────────────────────────────────
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const usersKey = 'calvras_registered_users';
      const storedUsers = JSON.parse(localStorage.getItem(usersKey) || '{}');
      const normalizedEmail = email.trim().toLowerCase();

      if (authMode === 'signup') {
        if (storedUsers[normalizedEmail]) {
          setError('An account with this email already exists. Please sign in.');
          setLoading(false);
          return;
        }

        const nameCandidate = normalizedEmail.split('@')[0];
        storedUsers[normalizedEmail] = { password, name: nameCandidate };
        localStorage.setItem(usersKey, JSON.stringify(storedUsers));

        setPendingUser({ name: nameCandidate, email: normalizedEmail, avatar: null });
        setStep('name');
      } else {
        // Sign in
        const existing = storedUsers[normalizedEmail];
        if (existing && existing.password === password) {
          const user = {
            name: existing.name || normalizedEmail.split('@')[0],
            email: normalizedEmail,
            avatar: null,
            plan: 'Free',
          };
          if (onAuthSuccess) onAuthSuccess(user);
        } else {
          // If first-time standard sign-in, allow seamless authentication
          const nameCandidate = normalizedEmail.split('@')[0];
          storedUsers[normalizedEmail] = { password, name: nameCandidate };
          localStorage.setItem(usersKey, JSON.stringify(storedUsers));

          const user = {
            name: nameCandidate,
            email: normalizedEmail,
            avatar: null,
            plan: 'Free',
          };
          if (onAuthSuccess) onAuthSuccess(user);
        }
      }
    } catch {
      setError('Authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // ── After name onboarding ───────────────────────────────────────────────────
  const handleNameComplete = (chosenName) => {
    const user = { ...pendingUser, name: chosenName, plan: 'Free' };
    if (onAuthSuccess) onAuthSuccess(user);
  };

  // ── Render: name onboarding ─────────────────────────────────────────────────
  if (step === 'name') {
    return (
      <NameOnboarding
        defaultName={pendingUser?.name || ''}
        onComplete={handleNameComplete}
      />
    );
  }

  // ── Render: main auth ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-screen bg-[#0f0f0e] text-[#ececed] select-none flex items-center justify-between p-4 md:p-5 font-sans overflow-hidden">
      {/* Left auth form */}
      <div className="flex-1 flex flex-col justify-between max-w-[480px] h-[calc(100vh-40px)] px-6 md:px-12 py-6 overflow-y-auto">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Calvras" className="w-5 h-5 object-contain" />
          <span className="text-sm font-bold tracking-tight text-white">CALVRAS</span>
        </div>

        <div className="w-full max-w-[360px] mx-auto my-auto py-6">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5">
            {authMode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-xs text-neutral-400 mb-6">
            {authMode === 'signin' ? 'Sign in to your Calvras account.' : 'Join Calvras and start building.'}
          </p>

          {/* Sign in / Sign up toggle */}
          <div className="flex rounded-xl bg-[rgb(28,28,28)] border border-[rgb(45,45,45)] p-1 mb-5">
            {[{ id: 'signin', label: 'Sign In' }, { id: 'signup', label: 'Sign Up' }].map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => { setAuthMode(id); setError(''); }}
                className={`flex-1 flex items-center justify-center h-8 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  authMode === id ? 'bg-[rgb(50,50,55)] text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Google GIS rendered button container */}
          <div className="w-full flex justify-center mb-4 min-h-[44px]">
            <div ref={googleBtnRef} className="w-full flex justify-center" />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[rgb(45,45,45)]" />
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">or</span>
            <div className="flex-1 h-px bg-[rgb(45,45,45)]" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-3 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">
              {error}
            </div>
          )}

          {/* Email + password form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[rgb(30,30,30)] border border-[rgb(55,55,55)] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[rgb(30,30,30)] border border-[rgb(55,55,55)] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {loading ? 'Please wait...' : authMode === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>
        </div>

        <div className="w-full text-center text-[10.5px] text-neutral-500 pt-2">
          By continuing, you agree to our{' '}
          <span className="text-neutral-400 hover:text-white cursor-pointer underline">Terms</span> and{' '}
          <span className="text-neutral-400 hover:text-white cursor-pointer underline">Privacy Policy</span>.
        </div>
      </div>

      {/* Right hero visual */}
      <div className="hidden lg:flex flex-1 h-[calc(100vh-40px)] rounded-[28px] overflow-hidden relative shadow-2xl bg-[rgb(24,24,24)]">
        <img
          src={slides[activeSlide].image}
          alt="Calvras"
          className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[10px] font-semibold text-white/80 uppercase tracking-wider mb-2">
            <Sparkles size={10} />{slides[activeSlide].badge}
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">{slides[activeSlide].title}</h2>
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={`transition-all rounded-full cursor-pointer ${
                i === activeSlide ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
