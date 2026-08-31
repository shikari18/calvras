import React, { useState } from 'react';
import { Check, Phone, Mail, ArrowLeft, Sparkles } from 'lucide-react';

// ─── Onboarding Steps Data ────────────────────────────────────────────────────
const STEPS = [
  {
    id: 'usecase',
    question: 'What do you plan to use Calvras for?',
    sub: "If you'll use Calvras for a few reasons, pick the main one.",
    multi: false,
    options: ['Coding & Development', 'AI Marketing & Copy', 'Full-Stack Apps', 'Autonomous Agents', 'Other'],
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=90&auto=format&fit=crop',
    badge: 'Creative Workspace',
  },
  {
    id: 'role',
    question: 'What kind of work do you do?',
    sub: 'Pick the role that best describes your daily focus.',
    multi: false,
    options: ['Developer / Engineer', 'Growth Marketer', 'Founder / Entrepreneur', 'Agency / Freelancer', 'Designer / Creative', 'Other'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=90&auto=format&fit=crop',
    badge: 'Creator Studio',
  },
  {
    id: 'create',
    question: 'What do you plan to create with Calvras?',
    sub: 'Select all that apply.',
    multi: true,
    options: [
      'Full-stack apps & websites', 'AI marketing campaigns & funnels',
      'SEO & high-converting landing pages', 'Ad hooks & viral copy',
      'Autonomous backend APIs', 'Email automation sequences',
      'SaaS MVPs & databases', 'Other',
    ],
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=90&auto=format&fit=crop',
    badge: 'Visual Concept Art',
  },
  {
    id: 'source',
    question: 'How did you hear about us?',
    sub: 'Help us know where you discovered Calvras.',
    multi: false,
    options: ['X (Twitter)', 'YouTube', 'Reddit', 'LinkedIn', 'Web search', 'Newsletters', 'Friends & family', 'TikTok / Instagram', 'Other'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=90&auto=format&fit=crop',
    badge: 'Social Discovery',
  },
];

// ─── Chip Button ──────────────────────────────────────────────────────────────
function Chip({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3.5 py-2 rounded-full text-[12.5px] font-medium transition-all cursor-pointer border select-none"
      style={{
        background: active ? 'white' : 'rgba(255,255,255,0.06)',
        color: active ? '#111' : '#c4c4c4',
        borderColor: active ? 'white' : 'rgba(255,255,255,0.12)',
      }}
    >
      {label}
    </button>
  );
}

// ─── Onboarding Flow ──────────────────────────────────────────────────────────
function OnboardingFlow({ onComplete }) {
  const [stepIdx, setStepIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [otherText, setOtherText] = useState({});

  const step = STEPS[stepIdx];
  const current = answers[step.id] || (step.multi ? [] : null);

  const toggle = (opt) => {
    if (step.multi) {
      const arr = current || [];
      setAnswers(prev => ({
        ...prev,
        [step.id]: arr.includes(opt) ? arr.filter(x => x !== opt) : [...arr, opt],
      }));
    } else {
      setAnswers(prev => ({ ...prev, [step.id]: opt }));
    }
  };

  const isActive = (opt) => step.multi ? (current || []).includes(opt) : current === opt;
  const otherSelected = isActive('Other');
  const otherVal = otherText[step.id] || '';

  const canContinue = step.multi
    ? (current || []).length > 0 && (!otherSelected || otherVal.trim().length > 0)
    : !!current && (current !== 'Other' || otherVal.trim().length > 0);

  const handleContinue = () => {
    if (!canContinue) return;
    // Substitute "Other" with the typed value
    let finalAnswers = { ...answers };
    if (otherVal.trim()) {
      if (step.multi) {
        finalAnswers[step.id] = (finalAnswers[step.id] || []).map(v => v === 'Other' ? otherVal.trim() : v);
      } else if (finalAnswers[step.id] === 'Other') {
        finalAnswers[step.id] = otherVal.trim();
      }
    }
    if (stepIdx < STEPS.length - 1) {
      setStepIdx(i => i + 1);
    } else {
      onComplete(finalAnswers);
    }
  };

  const handleBack = () => {
    if (stepIdx > 0) setStepIdx(i => i - 1);
  };

  const isLast = stepIdx === STEPS.length - 1;

  return (
    <div className="h-screen w-screen bg-[#0f0f0e] text-white flex font-sans overflow-hidden">

      {/* ── Left pane ── */}
      <div className="flex-1 flex flex-col px-12 py-8 min-w-0" style={{ height: '100vh' }}>

        {/* Top brand */}
        <button
          onClick={stepIdx > 0 ? handleBack : undefined}
          className="flex items-center gap-2 text-[13px] text-neutral-400 hover:text-white transition-colors cursor-pointer w-fit flex-shrink-0 mb-0"
        >
          <ArrowLeft size={14} />
          <span className="font-semibold">Calvras</span>
        </button>

        {/* Question — takes remaining space, scrollable if needed */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-center py-8 max-w-[460px]">
          <h1 className="text-[26px] font-bold text-white tracking-tight leading-snug mb-2">
            {step.question}
          </h1>
          <p className="text-[13px] text-neutral-500 mb-7">{step.sub}</p>

          <div className="flex flex-wrap gap-2">
            {step.options.map(opt => (
              <Chip key={opt} label={opt} active={isActive(opt)} onClick={() => toggle(opt)} />
            ))}
          </div>

          {/* Other text field — shows when Other is selected */}
          {otherSelected && (
            <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-150">
              <input
                autoFocus
                type="text"
                value={otherVal}
                onChange={e => setOtherText(prev => ({ ...prev, [step.id]: e.target.value }))}
                placeholder="Please describe..."
                className="w-full max-w-[360px] h-10 px-4 rounded-xl bg-[rgba(255,255,255,0.07)] border border-white/15 text-[13px] text-white placeholder-neutral-500 focus:outline-none focus:border-white/40 transition-colors"
              />
            </div>
          )}
        </div>

        {/* Bottom nav — always pinned at bottom, never cut off */}
        <div className="flex items-center justify-between flex-shrink-0 pb-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-1.5">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-all"
                style={{
                  width: i === stepIdx ? '24px' : '8px',
                  background: i <= stepIdx ? 'white' : 'rgba(255,255,255,0.2)',
                }}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            {stepIdx > 0 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 rounded-full text-[13px] font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue}
              className="px-6 py-2.5 rounded-full text-[13px] font-semibold transition-all"
              style={{
                background: canContinue ? 'white' : 'rgba(255,255,255,0.1)',
                color: canContinue ? '#111' : '#555',
                cursor: canContinue ? 'pointer' : 'not-allowed',
              }}
            >
              {isLast ? 'Continue to Plans' : 'Continue'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Right image pane ── */}
      <div className="w-[46%] flex-shrink-0 p-4 hidden lg:block">
        <div className="relative w-full h-full rounded-[24px] overflow-hidden" style={{ minHeight: 'calc(100vh - 32px)' }}>
          <img
            key={step.image}
            src={step.image}
            alt={step.badge}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-5 left-5 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 text-[11px] font-semibold text-white">
            <Sparkles size={11} className="text-amber-400" />
            {step.badge}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Auth Page ────────────────────────────────────────────────────────────────
export default function AuthPage({ onAuthSuccess }) {
  const [step, setStep] = useState('auth');
  const [pendingUser, setPendingUser] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [authMethod, setAuthMethod] = useState('email');
  const [rememberMe, setRememberMe] = useState(true);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { badge: 'CALVRAS INTELLIGENCE', title: 'FULL-STACK AI', image: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1600&q=95&auto=format&fit=crop' },
    { badge: 'NEURAL WORKSPACE', title: 'STUDIO GEN', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&q=95&auto=format&fit=crop' },
    { badge: 'PRO SYNTHESIS', title: 'CREATIVE SUITE', image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=1600&q=95&auto=format&fit=crop' },
  ];

  React.useEffect(() => {
    const t = setInterval(() => setActiveSlide(s => (s + 1) % slides.length), 4000);
    return () => clearInterval(t);
  }, []);

  const signIn = (provider = 'email') => {
    let name = 'Developer';
    let userEmail = email || 'user@calvras.ai';
    if (provider === 'google') { name = 'Google User'; userEmail = 'user@gmail.com'; }
    else if (provider === 'phone') { name = 'User'; userEmail = `${phone.replace(/\D/g, '')}@phone.calvras.ai`; }
    else if (email) { name = email.split('@')[0]; }
    setPendingUser({ name, email: userEmail, avatar: null });
    setStep('onboarding');
  };

  if (step === 'onboarding') {
    return (
      <OnboardingFlow
        user={pendingUser}
        onComplete={(data) => {
          if (onAuthSuccess) onAuthSuccess({ ...pendingUser, ...data });
        }}
      />
    );
  }

  return (
    <div className="min-h-screen w-screen bg-[#0f0f0e] text-[#ececed] select-none flex items-center justify-between p-4 md:p-5 font-sans overflow-hidden">

      {/* Left auth form */}
      <div className="flex-1 flex flex-col justify-between max-w-[480px] h-[calc(100vh-40px)] px-6 md:px-12 py-6 overflow-y-auto">
        <div className="flex items-center">
          <span className="text-sm font-bold tracking-tight text-white">Calvras</span>
        </div>

        <div className="w-full max-w-[360px] mx-auto my-auto py-6">
          <h1 className="text-2xl md:text-[26px] font-bold tracking-tight text-white mb-1.5">
            Welcome to Calvras
          </h1>
          <p className="text-xs text-neutral-400 mb-7">Sign in or create your account to get started.</p>

          {/* Google */}
          <button type="button" onClick={() => signIn('google')}
            className="w-full h-11 mb-3 rounded-xl bg-[rgb(30,30,30)] hover:bg-[rgb(38,38,38)] border border-[rgb(55,55,55)] text-xs text-white flex items-center justify-center gap-2.5 transition-colors cursor-pointer font-medium">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex-1 h-px bg-[rgb(45,45,45)]" />
            <span className="text-[10px] text-neutral-500 uppercase tracking-wider font-mono">or</span>
            <div className="flex-1 h-px bg-[rgb(45,45,45)]" />
          </div>

          {/* Toggle email / phone */}
          <div className="flex rounded-xl bg-[rgb(28,28,28)] border border-[rgb(45,45,45)] p-1 mb-3">
            {[{ id: 'email', Icon: Mail, label: 'Email' }, { id: 'phone', Icon: Phone, label: 'Phone' }].map(({ id, Icon, label }) => (
              <button key={id} type="button" onClick={() => setAuthMethod(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg text-xs font-medium transition-all cursor-pointer ${authMethod === id ? 'bg-[rgb(50,50,55)] text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}>
                <Icon size={13} /><span>{label}</span>
              </button>
            ))}
          </div>

          {authMethod === 'email' ? (
            <form onSubmit={(e) => { e.preventDefault(); signIn('email'); }} className="space-y-3">
              <input type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl bg-[rgb(30,30,30)] border border-[rgb(55,55,55)] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors" />
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 transition-colors cursor-pointer ${rememberMe ? 'bg-white text-black' : 'bg-[rgb(30,30,30)] border border-[rgb(55,55,55)]'}`}>
                  {rememberMe && <Check size={10} strokeWidth={3} />}
                </button>
                <span className="text-xs text-neutral-400">Remember me</span>
              </div>
              <button type="submit" className="w-full h-11 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-md">
                Continue with Email
              </button>
            </form>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); signIn('phone'); }} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-11 px-3 rounded-xl bg-[rgb(30,30,30)] border border-[rgb(55,55,55)] flex items-center text-xs text-neutral-400 flex-shrink-0">+1</div>
                <input type="tel" required placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 h-11 px-4 rounded-xl bg-[rgb(30,30,30)] border border-[rgb(55,55,55)] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition-colors" />
              </div>
              <button type="submit" className="w-full h-11 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-semibold tracking-wide transition-all cursor-pointer shadow-md">
                Continue with Phone
              </button>
            </form>
          )}
        </div>

        <div className="w-full text-center text-[10.5px] text-neutral-500 pt-2">
          By continuing, you agree to our{' '}
          <span className="text-neutral-400 hover:text-white cursor-pointer underline">Terms of service</span> and{' '}
          <span className="text-neutral-400 hover:text-white cursor-pointer underline">Privacy policy</span>.
        </div>
      </div>

      {/* Right hero visual */}
      <div className="hidden lg:flex flex-1 h-[calc(100vh-40px)] rounded-[28px] overflow-hidden relative shadow-2xl bg-[rgb(24,24,24)]">
        <img src={slides[activeSlide].image} alt="Calvras Studio"
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
