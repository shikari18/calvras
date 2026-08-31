import React, { useState } from 'react';
import { Check, ArrowLeft, Sparkles } from 'lucide-react';
import { useSignIn, useSignUp } from '@clerk/clerk-react';

// ─── "What should we call you?" onboarding ───────────────────────────────────
function NameOnboarding({ onComplete, defaultName = '' }) {
  const [name, setName] = useState(defaultName);

  return (
    <div className="min-h-screen w-screen bg-[#0f0f0e] text-white flex items-center justify-center p-6 font-sans">
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

// ─── Auth Page ────────────────────────────────────────────────────────────────
export default function AuthPage({ onAuthSuccess }) {
  const [step, setStep] = useState('auth'); // 'auth' | 'verify' | 'name'
  const [authMode, setAuthMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingUser, setPendingUser] = useState(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const { signIn, setActive: setSignInActive, isLoaded: signInLoaded } = useSignIn();
  const { signUp, setActive: setSignUpActive, isLoaded: signUpLoaded } = useSignUp();

  const slides = [
    { badge: 'CALVRAS INTELLIGENCE', title: 'FULL-STACK AI', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&q=95&auto=format&fit=crop' },
    { badge: 'NEURAL WORKSPACE', title: 'STUDIO GEN', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=95&auto=format&fit=crop' },
    { badge: 'PRO SYNTHESIS', title: 'CREATIVE SUITE', image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1600&q=95&auto=format&fit=crop' },
  ];

  React.useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  // ── Google OAuth ────────────────────────────────────────────────────────────
  const handleGoogle = async () => {
    if (!signInLoaded) return;
    setError('');
    try {
      await signIn.authenticateWithRedirect({
        strategy: 'oauth_google',
        redirectUrl: window.location.origin + '/sso-callback',
        redirectUrlComplete: window.location.origin,
      });
    } catch (err) {
      setError(err.errors?.[0]?.message || 'Google sign-in failed.');
    }
  };

  // ── Email auth submit ───────────────────────────────────────────────────────
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (!signInLoaded || !signUpLoaded) return;
    setError('');
    setLoading(true);

    try {
      if (authMode === 'signin') {
        const result = await signIn.create({ identifier: email, password });
        if (result.status === 'complete') {
          await setSignInActive({ session: result.createdSessionId });
          const u = result.userData || {};
          const name = u.firstName ? `${u.firstName} ${u.lastName || ''}`.trim() : email.split('@')[0];
          setPendingUser({ name, email, avatar: u.imageUrl || null });
          setStep('name');
        } else {
          setError('Sign in incomplete. Please try again.');
        }
      } else {
        const result = await signUp.create({ emailAddress: email, password });
        if (result.status === 'missing_requirements') {
          await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
          setStep('verify');
        } else if (result.status === 'complete') {
          await setSignUpActive({ session: result.createdSessionId });
          setPendingUser({ name: email.split('@')[0], email, avatar: null });
          setStep('name');
        }
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  // ── Verify OTP code ─────────────────────────────────────────────────────────
  const handleVerify = async (e) => {
    e.preventDefault();
    if (!signUpLoaded) return;
    setError('');
    setLoading(true);
    try {
      const result = await signUp.attemptEmailAddressVerification({ code });
      if (result.status === 'complete') {
        await setSignUpActive({ session: result.createdSessionId });
        const u = result.createdUserId ? {} : {};
        setPendingUser({ name: email.split('@')[0], email, avatar: null });
        setStep('name');
      } else {
        setError('Verification failed. Please try again.');
      }
    } catch (err) {
      setError(err.errors?.[0]?.longMessage || err.errors?.[0]?.message || 'Invalid code.');
    } finally {
      setLoading(false);
    }
  };

  // ── After name onboarding ───────────────────────────────────────────────────
  const handleNameComplete = (chosenName) => {
    const user = { ...pendingUser, name: chosenName };
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

  // ── Render: OTP verification ────────────────────────────────────────────────
  if (step === 'verify') {
    return (
      <div className="min-h-screen w-screen bg-[#0f0f0e] text-white flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-[360px]">
          <button onClick={() => setStep('auth')} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-8 transition-colors cursor-pointer">
            <ArrowLeft size={14} /> Back
          </button>

          <h1 className="text-[24px] font-bold mb-1">Check your email</h1>
          <p className="text-xs text-neutral-400 mb-6">
            We sent a 6-digit code to <span className="text-white font-medium">{email}</span>
          </p>

          {error && (
            <div className="mb-4 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">{error}</div>
          )}

          {/* 6-digit code input */}
          <form onSubmit={handleVerify} className="space-y-4">
            <input
              autoFocus
              type="text"
              inputMode="numeric"
              maxLength={6}
              required
              placeholder="000000"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full h-14 px-4 rounded-xl bg-[rgb(30,30,30)] border border-[rgb(55,55,55)] text-2xl text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-400 transition-colors text-center tracking-[0.4em] font-mono"
            />
            <button
              type="submit"
              disabled={loading || code.length < 6}
              className="w-full h-11 rounded-xl bg-white text-black text-sm font-semibold transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-200 cursor-pointer"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </form>

          <button
            type="button"
            onClick={async () => {
              try { await signUp.prepareEmailAddressVerification({ strategy: 'email_code' }); } catch {}
            }}
            className="w-full mt-3 text-xs text-neutral-500 hover:text-white transition-colors"
          >
            Resend code
          </button>
        </div>
      </div>
    );
  }

  // ── Render: main auth ───────────────────────────────────────────────────────
  return (
    <div className="min-h-screen w-screen bg-[#0f0f0e] text-[#ececed] select-none flex items-center justify-between p-4 md:p-5 font-sans overflow-hidden">

      {/* Left auth form */}
      <div className="flex-1 flex flex-col justify-between max-w-[480px] h-[calc(100vh-40px)] px-6 md:px-12 py-6 overflow-y-auto">
        <div className="flex items-center">
          <span className="text-sm font-bold tracking-tight text-white">Calvras</span>
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
              <button key={id} type="button" onClick={() => { setAuthMode(id); setError(''); }}
                className={`flex-1 flex items-center justify-center h-8 rounded-lg text-xs font-medium transition-all cursor-pointer ${authMode === id ? 'bg-[rgb(50,50,55)] text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}>
                {label}
              </button>
            ))}
          </div>

          {/* Google */}
          <button type="button" onClick={handleGoogle}
            className="w-full h-11 mb-4 rounded-xl bg-[rgb(30,30,30)] hover:bg-[rgb(38,38,38)] border border-[rgb(55,55,55)] text-xs text-white flex items-center justify-center gap-2.5 transition-colors cursor-pointer font-medium">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[rgb(45,45,45)]" />
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">or</span>
            <div className="flex-1 h-px bg-[rgb(45,45,45)]" />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-3 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">{error}</div>
          )}

          {/* Email + password form */}
          <form onSubmit={handleEmailSubmit} className="space-y-3">
            <input type="email" required placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[rgb(30,30,30)] border border-[rgb(55,55,55)] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors" />
            <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
              className="w-full h-11 px-4 rounded-xl bg-[rgb(30,30,30)] border border-[rgb(55,55,55)] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors" />
            <button type="submit" disabled={loading}
              className="w-full h-11 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-md disabled:opacity-50">
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
        <img src={slides[activeSlide].image} alt="Calvras"
          className="w-full h-full object-cover object-center brightness-[0.88] contrast-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />
        <div className="absolute bottom-8 left-8 right-8">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-[10px] font-semibold text-white/80 uppercase tracking-wider mb-2">
            <Sparkles size={10} />{slides[activeSlide].badge}
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">{slides[activeSlide].title}</h2>
        </div>
        <div className="absolute bottom-8 right-8 flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setActiveSlide(i)}
              className={`transition-all rounded-full cursor-pointer ${i === activeSlide ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
