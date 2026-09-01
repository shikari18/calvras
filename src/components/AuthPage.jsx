import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';

const GOOGLE_CLIENT_ID = '139207574445-9cs49lurhscd7m867e9igoh1rte2rksp.apps.googleusercontent.com';
const SEND_CODE_URL = 'http://localhost:3001/api/send-code';
const VERIFY_CODE_URL = 'http://localhost:3001/api/verify-code';

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')));
  } catch { return null; }
}

// ─── Name Onboarding ──────────────────────────────────────────────────────────
function NameOnboarding({ onComplete, defaultName = '' }) {
  const [name, setName] = useState(defaultName);
  return (
    <div className="min-h-screen w-screen bg-[#0f0f0e] text-white flex items-center justify-center p-6 font-sans select-none">
      <div className="w-full max-w-[380px] text-center">
        <div className="mb-6">
          <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-10 h-10 rounded-xl object-contain mx-auto mb-3" />
          <div className="text-[28px] font-black tracking-tight mb-1">Welcome to Calvras</div>
          <p className="text-sm text-neutral-400">What should we call you?</p>
        </div>
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
          className="w-full h-12 rounded-xl bg-white text-black text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-200 cursor-pointer transition-all"
        >
          Let's go →
        </button>
      </div>
    </div>
  );
}

// ─── 6-Digit OTP Screen ───────────────────────────────────────────────────────
function VerifyScreen({ email, onVerified, onBack }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(VERIFY_CODE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Invalid code.'); return; }
      onVerified();
    } catch {
      setError('Connection error. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    setError('');
    try {
      await fetch(SEND_CODE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setResent(true);
      setTimeout(() => setResent(false), 3000);
    } catch {}
    setResending(false);
  };

  return (
    <div className="min-h-screen w-screen bg-[#0f0f0e] text-white flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-[360px]">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-8 transition-colors cursor-pointer">
          <ArrowLeft size={14} /> Back
        </button>
        <h1 className="text-[24px] font-bold mb-1">Check your email</h1>
        <p className="text-xs text-neutral-400 mb-6">
          We sent a 6-digit code from <span className="text-white">calvrasnoreply@gmail.com</span> to <span className="text-white font-medium">{email}</span>
        </p>
        {error && <div className="mb-4 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">{error}</div>}
        {resent && <div className="mb-4 px-3 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">Code resent!</div>}
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
          <button type="submit" disabled={loading || code.length < 6}
            className="w-full h-11 rounded-xl bg-white text-black text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-neutral-200 cursor-pointer transition-all">
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
        <button type="button" onClick={handleResend} disabled={resending}
          className="w-full mt-3 text-xs text-neutral-500 hover:text-white transition-colors cursor-pointer">
          {resending ? 'Sending...' : "Didn't get it? Resend code"}
        </button>
      </div>
    </div>
  );
}

// ─── Main Auth Page ───────────────────────────────────────────────────────────
export default function AuthPage({ onAuthSuccess }) {
  const [step, setStep] = useState('auth'); // 'auth' | 'verify' | 'name'
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

  // ── Google Sign-In ─────────────────────────────────────────────────────────
  const handleCredentialResponse = (response) => {
    try {
      const payload = parseJwt(response.credential);
      if (!payload) throw new Error('Invalid token');
      const userData = {
        name: payload.name || payload.given_name || payload.email.split('@')[0],
        email: payload.email,
        avatar: payload.picture || null,
        plan: 'Free',
      };
      if (onAuthSuccess) onAuthSuccess(userData);
    } catch {
      setError('Google sign-in failed. Please try again.');
    }
  };

  useEffect(() => {
    const init = () => {
      if (!window.google?.accounts?.id) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      if (googleBtnRef.current) {
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'filled_black', size: 'large', shape: 'pill', width: 320, text: 'continue_with',
        });
      }
    };
    if (window.google?.accounts?.id) { init(); return; }
    const interval = setInterval(() => { if (window.google?.accounts?.id) { clearInterval(interval); init(); } }, 200);
    return () => clearInterval(interval);
  }, [step]);

  // ── Email submit ───────────────────────────────────────────────────────────
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    try {
      if (authMode === 'signup') {
        // Send OTP via our server → calvrasnoreply@gmail.com
        const res = await fetch(SEND_CODE_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: normalizedEmail }),
        });
        const data = await res.json();
        if (!res.ok) { setError(data.error || 'Failed to send code.'); return; }
        setPendingUser({ name: normalizedEmail.split('@')[0], email: normalizedEmail, password, avatar: null });
        setStep('verify');
      } else {
        // Sign in — check local store
        const storedUsers = JSON.parse(localStorage.getItem('calvras_users') || '{}');
        const existing = storedUsers[normalizedEmail];
        if (existing && existing.password === password) {
          if (onAuthSuccess) onAuthSuccess({ name: existing.name || normalizedEmail.split('@')[0], email: normalizedEmail, avatar: null, plan: 'Free' });
        } else {
          setError('Incorrect email or password.');
        }
      }
    } catch {
      setError('Connection error. Make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  // ── After OTP verified ────────────────────────────────────────────────────
  const handleOTPVerified = () => {
    // Save user to local store
    const storedUsers = JSON.parse(localStorage.getItem('calvras_users') || '{}');
    storedUsers[pendingUser.email] = { password: pendingUser.password, name: pendingUser.name };
    localStorage.setItem('calvras_users', JSON.stringify(storedUsers));
    setStep('name');
  };

  // ── After name ────────────────────────────────────────────────────────────
  const handleNameComplete = (chosenName) => {
    const storedUsers = JSON.parse(localStorage.getItem('calvras_users') || '{}');
    if (pendingUser?.email) {
      storedUsers[pendingUser.email].name = chosenName;
      localStorage.setItem('calvras_users', JSON.stringify(storedUsers));
    }
    if (onAuthSuccess) onAuthSuccess({ ...pendingUser, name: chosenName, plan: 'Free' });
  };

  if (step === 'verify') return <VerifyScreen email={pendingUser?.email} onVerified={handleOTPVerified} onBack={() => setStep('auth')} />;
  if (step === 'name') return <NameOnboarding defaultName={pendingUser?.name || ''} onComplete={handleNameComplete} />;

  return (
    <div className="min-h-screen w-screen bg-[#0f0f0e] text-[#ececed] select-none flex items-center justify-between p-4 md:p-5 font-sans overflow-hidden">
      {/* Left auth form */}
      <div className="flex-1 flex flex-col justify-between max-w-[480px] h-[calc(100vh-40px)] px-6 md:px-12 py-6 overflow-y-auto">
        <div className="flex items-center gap-2">
          <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-5 h-5 rounded object-contain" />
          <span className="text-sm font-bold tracking-tight text-white">CALVRAS</span>
        </div>

        <div className="w-full max-w-[360px] mx-auto my-auto py-6">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5">
            {authMode === 'signin' ? 'Welcome back' : 'Create your account'}
          </h1>
          <p className="text-xs text-neutral-400 mb-6">
            {authMode === 'signin' ? 'Sign in to your Calvras account.' : 'Join Calvras and start building.'}
          </p>

          {/* Toggle */}
          <div className="flex rounded-xl bg-[rgb(28,28,28)] border border-[rgb(45,45,45)] p-1 mb-5">
            {[{ id: 'signin', label: 'Sign In' }, { id: 'signup', label: 'Sign Up' }].map(({ id, label }) => (
              <button key={id} type="button" onClick={() => { setAuthMode(id); setError(''); }}
                className={`flex-1 flex items-center justify-center h-8 rounded-lg text-xs font-medium transition-all cursor-pointer ${authMode === id ? 'bg-[rgb(50,50,55)] text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}>
                {label}
              </button>
            ))}
          </div>

          {/* Google button */}
          <div className="w-full flex justify-center mb-4 min-h-[44px]">
            <div ref={googleBtnRef} className="w-full flex justify-center" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-[rgb(45,45,45)]" />
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">or</span>
            <div className="flex-1 h-px bg-[rgb(45,45,45)]" />
          </div>

          {error && <div className="mb-3 px-3 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-400">{error}</div>}

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

      {/* Right hero */}
      <div className="hidden lg:flex flex-1 h-[calc(100vh-40px)] rounded-[28px] overflow-hidden relative shadow-2xl bg-[rgb(24,24,24)]">
        <img src={slides[activeSlide].image} alt="Calvras" className="w-full h-full object-cover brightness-[0.88] contrast-[1.05]" />
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
