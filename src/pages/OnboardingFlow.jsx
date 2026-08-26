import React, { useState, useEffect } from 'react';
import { Check, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

export const OnboardingFlow = ({ onComplete, userProfile }) => {
  const userEmail = userProfile?.email || 'default';

  // Determine initial step from URL hash or localStorage so refreshing stays on the exact page
  const getInitialStep = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#pricing' || hash === '#plans' || hash === '#onboarding-pricing' || hash === '#onboarding-step-5') {
        return 5;
      }
      if (hash === '#onboarding-step-4' || hash === '#discovery') return 4;
      if (hash === '#onboarding-step-3' || hash === '#goals') return 3;
      if (hash === '#onboarding-step-2' || hash === '#role') return 2;
      if (hash === '#onboarding-step-1' || hash === '#onboarding') return 1;
    }
    try {
      const savedStep = localStorage.getItem(`calvras_onboarding_step_${userEmail}`);
      if (savedStep) {
        const parsed = parseInt(savedStep, 10);
        if (parsed >= 1 && parsed <= 5) return parsed;
      }
    } catch (e) {}
    return 1;
  };

  // Determine initial answers from localStorage
  const getInitialAnswers = () => {
    try {
      const saved = localStorage.getItem(`calvras_onboarding_answers_${userEmail}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return {
      useCase: '',
      workRole: '',
      creationGoals: [],
      source: ''
    };
  };

  const [currentStep, setCurrentStep] = useState(getInitialStep);
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedProCredits, setSelectedProCredits] = useState('2k');
  const [activatingPlan, setActivatingPlan] = useState(null);
  const [isCompletedSuccess, setIsCompletedSuccess] = useState(false);
  const [answers, setAnswers] = useState(getInitialAnswers);

  // Sync step changes to URL hash & localStorage so refresh never loses position
  const syncStepToUrlAndStorage = (step) => {
    try {
      localStorage.setItem(`calvras_onboarding_step_${userEmail}`, step.toString());
    } catch (e) {}
    if (typeof window !== 'undefined') {
      const stepHashes = {
        1: '#onboarding-step-1',
        2: '#onboarding-step-2',
        3: '#onboarding-step-3',
        4: '#onboarding-step-4',
        5: '#pricing'
      };
      const targetHash = stepHashes[step] || '#onboarding';
      if (window.location.hash !== targetHash) {
        window.history.replaceState(null, '', targetHash);
      }
    }
  };

  useEffect(() => {
    syncStepToUrlAndStorage(currentStep);
  }, [currentStep, userEmail]);

  // Listen to browser back/forward buttons or hash change
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#pricing' || hash === '#plans' || hash === '#onboarding-pricing' || hash === '#onboarding-step-5') {
        setCurrentStep(5);
      } else if (hash === '#onboarding-step-4' || hash === '#discovery') {
        setCurrentStep(4);
      } else if (hash === '#onboarding-step-3' || hash === '#goals') {
        setCurrentStep(3);
      } else if (hash === '#onboarding-step-2' || hash === '#role') {
        setCurrentStep(2);
      } else if (hash === '#onboarding-step-1' || hash === '#onboarding') {
        setCurrentStep(1);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSingleSelect = (key, value) => {
    setAnswers(prev => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(`calvras_onboarding_answers_${userEmail}`, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleMultiSelect = (key, value) => {
    setAnswers(prev => {
      const currentList = prev[key] || [];
      const updatedList = currentList.includes(value)
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      const updated = { ...prev, [key]: updatedList };
      try {
        localStorage.setItem(`calvras_onboarding_answers_${userEmail}`, JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePlanSelect = (planKey, planName, price) => {
    setActivatingPlan(planKey);
    setTimeout(() => {
      setIsCompletedSuccess(true);
      setTimeout(() => {
        if (onComplete) {
          onComplete(
            { planKey, planName, price, isAnnual, selectedProCredits },
            answers
          );
        }
      }, 1000);
    }, 1200);
  };

  // Curated High-Res Pristine Images (Zero Watermarks, 100% Aesthetic Match)
  const stepVisuals = {
    1: {
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1400&auto=format&fit=crop",
      badge: "Creative Workspace",
      alt: "Sculptural Modern Studio"
    },
    2: {
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1400&auto=format&fit=crop",
      badge: "Creator Studio",
      alt: "Creator in modern environment"
    },
    3: {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1400&auto=format&fit=crop",
      badge: "Visual Concept Art",
      alt: "Creative Portrait"
    },
    4: {
      isGrid: true,
      badge: "Omni-Channel Discovery"
    }
  };

  return (
    <div className="h-screen max-h-screen w-full bg-[#1c1c1c] text-white flex flex-col font-sans select-none antialiased overflow-hidden">
      
      {/* Full-Screen Plan Activation Success Overlay */}
      {isCompletedSuccess && (
        <div className="fixed inset-0 bg-[#141414]/95 z-50 flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-[#ff5e28] flex items-center justify-center shadow-[0_0_40px_rgba(255,94,40,0.5)] animate-bounce">
            <CheckCircle2 size={36} className="text-white" />
          </div>
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Workspace Ready!
            </h2>
            <p className="text-sm text-neutral-400">
              Launching your new marketing session...
            </p>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEPS 1 TO 4: FULL-SCREEN 2-COLUMN QUESTIONNAIRE (NON-SCROLLABLE) */}
      {/* ================================================================= */}
      {currentStep < 5 && (
        <div className="flex-1 w-full h-full max-h-screen flex flex-col lg:flex-row overflow-hidden">
          
          {/* Left Column: Full-Height Questionnaire Section (50% Width) */}
          <div className="w-full lg:w-1/2 h-full max-h-screen flex flex-col justify-between p-5 sm:p-8 lg:p-10 bg-[#1c1c1c] overflow-y-auto lg:overflow-hidden">
            
            {/* Top Bar with Updated Calvras Logo (No White Background, +5px size) */}
            <div className="flex items-center gap-3 w-full max-w-lg mx-auto">
              <img 
                src="/calvras.png" 
                alt="Calvras Logo" 
                className="w-[37px] h-[37px] rounded-xl object-contain shadow-md"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/calvras-icon.png';
                }}
              />
              <span className="font-serif font-bold text-white text-base tracking-tight">
                Calvras
              </span>
            </div>

            {/* Center Questions Form */}
            <div className="w-full max-w-lg mx-auto my-auto py-2 space-y-5">

              {/* STEP 1: USE CASE */}
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h1 className="text-2xl sm:text-[30px] font-bold text-white tracking-tight leading-snug">
                      What do you plan to use Calvras for?
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                      If you'll use Calvras for a few reasons, pick the main one
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {['School', 'Work', 'Personal', 'Other'].map((option) => {
                      const isSelected = answers.useCase === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleSingleSelect('useCase', option)}
                          className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer active:scale-95 ${
                            isSelected
                              ? 'bg-[#ff5e28] text-white font-semibold shadow-[0_2px_14px_rgba(255,94,40,0.35)] border border-[#ff5e28]'
                              : 'bg-[#282828] hover:bg-[#323232] text-neutral-200 border border-neutral-700/60'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: WORK ROLE */}
              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h1 className="text-2xl sm:text-[30px] font-bold text-white tracking-tight leading-snug">
                      What kind of work do you do?
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                      Pick the role that best describes your daily focus
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 pt-1">
                    {[
                      'Influencer / Content creator',
                      'Designer / Graphic artist',
                      'Marketer',
                      'Entrepreneur / Business owner',
                      'Freelancer / Agency',
                      'Other'
                    ].map((option) => {
                      const isSelected = answers.workRole === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleSingleSelect('workRole', option)}
                          className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer active:scale-95 ${
                            isSelected
                              ? 'bg-[#ff5e28] text-white font-semibold shadow-[0_2px_14px_rgba(255,94,40,0.35)] border border-[#ff5e28]'
                              : 'bg-[#282828] hover:bg-[#323232] text-neutral-200 border border-neutral-700/60'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: CREATION GOALS (MULTI-SELECT) */}
              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h1 className="text-2xl sm:text-[30px] font-bold text-white tracking-tight leading-snug">
                      What do you plan to create with Calvras?
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                      Select all that apply
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      'Marketing / Advertising assets',
                      'Video scripts & TikTok reels',
                      'Email sequences & funnels',
                      'Landing page copy & CRO',
                      'Social media hooks & carousels',
                      'SEO & blog articles',
                      'Product visuals & mock-ups',
                      'Brand positioning',
                      'Other'
                    ].map((option) => {
                      const isSelected = answers.creationGoals.includes(option);
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleMultiSelect('creationGoals', option)}
                          className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition cursor-pointer active:scale-95 ${
                            isSelected
                              ? 'bg-[#ff5e28] text-white font-semibold shadow-[0_2px_14px_rgba(255,94,40,0.35)] border border-[#ff5e28]'
                              : 'bg-[#282828] hover:bg-[#323232] text-neutral-200 border border-neutral-700/60'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: DISCOVERY SOURCE */}
              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="space-y-1">
                    <h1 className="text-2xl sm:text-[30px] font-bold text-white tracking-tight leading-snug">
                      How did you hear about us?
                    </h1>
                    <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                      Help us know where you discovered Calvras
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      'Reddit',
                      'Facebook / Instagram',
                      'Pinterest',
                      'Newsletters',
                      'YouTube',
                      'AI chatbots (e.g., ChatGPT or Gemini)',
                      'X (Twitter)',
                      'LinkedIn',
                      'Web search',
                      'Friends & family',
                      'TikTok',
                      'Other'
                    ].map((option) => {
                      const isSelected = answers.source === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handleSingleSelect('source', option)}
                          className={`px-3.5 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition cursor-pointer active:scale-95 ${
                            isSelected
                              ? 'bg-[#ff5e28] text-white font-semibold shadow-[0_2px_14px_rgba(255,94,40,0.35)] border border-[#ff5e28]'
                              : 'bg-[#282828] hover:bg-[#323232] text-neutral-200 border border-neutral-700/60'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Bar: Dots Progress & Actions */}
            <div className="pt-4 flex items-center justify-between border-t border-neutral-800 w-full max-w-lg mx-auto">
              {/* 5 Dots Indicator */}
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      stepNum === currentStep
                        ? 'w-5 bg-white'
                        : stepNum < currentStep
                        ? 'w-1.5 bg-[#ff5e28]'
                        : 'w-1.5 bg-neutral-700'
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-neutral-400 hover:text-white bg-[#282828] hover:bg-[#333333] border border-neutral-700/60 transition cursor-pointer"
                  >
                    Back
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold text-neutral-950 bg-white hover:bg-neutral-100 transition cursor-pointer shadow-sm active:scale-95"
                >
                  {currentStep === 4 ? 'Continue to Plans' : 'Continue'}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Full-Height Edge-to-Edge Hero Visual (50% Width, Non-Scrollable) */}
          <div className="w-full lg:w-1/2 h-full max-h-screen p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-[#1c1c1c]">
            <div className="w-full h-full max-h-[calc(100vh-64px)] rounded-3xl overflow-hidden relative shadow-2xl border border-neutral-800 bg-[#101010] flex items-center justify-center">
              
              {currentStep === 4 ? (
                // Step 4: Social Discovery Grid Visual
                <div className="w-full h-full bg-[#f4f2ec] p-6 sm:p-10 grid grid-cols-3 gap-5 items-center justify-items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-md flex items-center justify-center p-3 border border-neutral-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                      IG
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-md flex items-center justify-center p-2.5 border border-neutral-200">
                    <div className="w-full h-full rounded-xl bg-neutral-100 p-2 space-y-1 flex flex-col justify-center">
                      <div className="h-1.5 w-3/4 bg-neutral-400 rounded" />
                      <div className="h-1 w-full bg-neutral-300 rounded" />
                      <div className="h-1 w-1/2 bg-neutral-300 rounded" />
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-md flex items-center justify-center p-3 border border-neutral-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                      P
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-md flex items-center justify-center p-3 border border-neutral-200">
                    <span className="text-neutral-950 font-black text-2xl sm:text-3xl tracking-tighter">
                      d
                    </span>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-md flex items-center justify-center p-3 border border-neutral-200">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-full bg-neutral-900" />
                      <div className="w-3 h-3 rounded-full bg-neutral-900" />
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-md flex items-center justify-center p-3 border border-neutral-200">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#0077b5] flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                      in
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-md flex items-center justify-center p-3 border border-neutral-200">
                    <div className="flex -space-x-1">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-orange-400" />
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-teal-400" />
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-md flex items-center justify-center p-3 border border-neutral-200">
                    <div className="w-10 h-7 sm:w-12 sm:h-9 rounded-xl bg-red-600 flex items-center justify-center text-white text-xs sm:text-sm">
                      ▶
                    </div>
                  </div>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white shadow-md flex items-center justify-center p-3 border border-neutral-200">
                    <span className="font-bold text-neutral-900 text-xl sm:text-2xl">𝕏</span>
                  </div>
                </div>
              ) : (
                // Step 1 to 3: Pristine Editorial Photography
                <>
                  <img 
                    src={stepVisuals[currentStep]?.image} 
                    alt={stepVisuals[currentStep]?.alt}
                    className="w-full h-full object-cover object-center filter contrast-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white/90">
                    ✨ {stepVisuals[currentStep]?.badge}
                  </div>
                </>
              )}

            </div>
          </div>

        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 5: FULL-SCREEN PRICING & PAYMENT PLANS SELECTION SCREEN */}
      {/* ================================================================= */}
      {currentStep === 5 && (
        <div className="h-screen max-h-screen w-full bg-[#1c1c1c] p-5 sm:p-8 lg:p-10 flex flex-col justify-between overflow-y-auto lg:overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header with Title & Annual Toggle */}
          <div className="text-center space-y-2 max-w-2xl mx-auto pt-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Which plan would you like?
            </h1>
            <p className="text-xs text-neutral-400">
              Flexible plans for creators, marketers, and fast-growing teams
            </p>

            {/* Monthly / Annual Toggle Switch */}
            <div className="pt-1.5 flex items-center justify-center gap-3">
              <span className={`text-xs ${!isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>
                Pay monthly
              </span>
              
              <button
                type="button"
                onClick={() => setIsAnnual(!isAnnual)}
                className={`w-10 h-5.5 rounded-full transition-colors cursor-pointer p-0.5 flex items-center ${
                  isAnnual ? 'bg-[#ff5e28]' : 'bg-neutral-700'
                }`}
              >
                <div
                  className={`w-4.5 h-4.5 rounded-full bg-white transition-transform ${
                    isAnnual ? 'translate-x-4.5' : 'translate-x-0'
                  }`}
                />
              </button>

              <div className="flex items-center gap-1.5">
                <span className={`text-xs ${isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>
                  Pay annually
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#ff5e28] bg-[#ff5e28]/15 px-2 py-0.5 rounded-full border border-[#ff5e28]/30">
                  Save 20%
                </span>
              </div>
            </div>
          </div>

          {/* 3 Plan Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto w-full my-auto py-2">
            
            {/* 1. FREE PLAN */}
            <div className="bg-[#242424] hover:bg-[#282828] rounded-3xl border border-neutral-800 p-5 sm:p-6 flex flex-col justify-between space-y-4 transition hover:border-neutral-700">
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white">Free</h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5 min-h-[28px]">
                    For exploring AI marketing features at a basic level.
                  </p>
                </div>

                <div>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">$0</span>
                </div>

                <div className="pt-1 text-[11px] text-neutral-300 space-y-2 border-t border-neutral-700/60">
                  <div className="flex items-center gap-1.5 text-neutral-400 font-medium">
                    <span>✧</span>
                    <span>Limited free marketing credits</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check size={12} className="text-neutral-400 shrink-0 mt-0.5" />
                    <span>3 ad copy & campaign generations daily</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check size={12} className="text-neutral-400 shrink-0 mt-0.5" />
                    <span>Standard response speed</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check size={12} className="text-neutral-400 shrink-0 mt-0.5" />
                    <span>Core direct-response frameworks</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={activatingPlan !== null}
                onClick={() => handlePlanSelect('free', 'Free Plan', 0)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#323232] hover:bg-[#3d3d3d] text-white text-xs font-bold transition cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {activatingPlan === 'free' ? (
                  <>
                    <Loader2 size={13} className="animate-spin text-white" />
                    <span>Activating...</span>
                  </>
                ) : (
                  <span>Get started</span>
                )}
              </button>
            </div>

            {/* 2. BASIC PLAN */}
            <div className="bg-[#242424] hover:bg-[#282828] rounded-3xl border border-neutral-800 p-5 sm:p-6 flex flex-col justify-between space-y-4 transition hover:border-neutral-700">
              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white">Basic</h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5 min-h-[28px]">
                    For growing brands & creators with core marketing needs.
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      ${isAnnual ? '8' : '10'}
                    </span>
                    <span className="text-xs text-neutral-400 font-normal">
                      / mo
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-[10px] text-neutral-500">
                      billed annually $96
                    </p>
                  )}
                </div>

                <div className="pt-1 text-[11px] text-neutral-300 space-y-2 border-t border-neutral-700/60">
                  <div className="flex items-center gap-1.5 text-[#ff5e28] font-semibold">
                    <span>✦</span>
                    <span>1,000 marketing credits per month</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#ff5e28] shrink-0 mt-0.5" />
                    <span>Unlimited ad copy variations & angles</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#ff5e28] shrink-0 mt-0.5" />
                    <span>Full email & SMS funnel automations</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#ff5e28] shrink-0 mt-0.5" />
                    <span>Landing page teardowns & CRO playbooks</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={activatingPlan !== null}
                onClick={() => handlePlanSelect('basic', 'Basic Plan', isAnnual ? 8 : 10)}
                className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold transition cursor-pointer active:scale-95 shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {activatingPlan === 'basic' ? (
                  <>
                    <Loader2 size={13} className="animate-spin text-neutral-950" />
                    <span>Setting up...</span>
                  </>
                ) : (
                  <span>Upgrade to Basic</span>
                )}
              </button>
            </div>

            {/* 3. PRO PLAN (RECOMMENDED) */}
            <div className="bg-[#242424] rounded-3xl border-2 border-[#8057ff] p-5 sm:p-6 flex flex-col justify-between space-y-4 relative shadow-[0_0_30px_rgba(128,87,255,0.15)]">
              
              {/* Recommended Badge */}
              <div className="absolute -top-3 right-6 bg-[#8057ff] text-white text-[9px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                Recommended
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                    <span>Pro</span>
                    <Sparkles size={14} className="text-[#8057ff]" />
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5 min-h-[28px]">
                    For high-growth brands & agencies scaling revenue and ROAS.
                  </p>
                </div>

                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white">
                      ${isAnnual ? '13' : '16'}
                    </span>
                    <span className="text-xs text-neutral-400 font-normal">
                      / mo
                    </span>
                  </div>
                  {isAnnual && (
                    <p className="text-[10px] text-neutral-500">
                      billed annually $156
                    </p>
                  )}
                </div>

                {/* Credit Tier Selector */}
                <div className="grid grid-cols-4 gap-1 bg-[#1b1b1b] p-1 rounded-xl border border-neutral-700/60">
                  {['2k', '4k', '8k', '16k'].map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => setSelectedProCredits(tier)}
                      className={`py-0.5 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                        selectedProCredits === tier
                          ? 'bg-[#8057ff] text-white shadow-sm'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>

                <div className="pt-1 text-[11px] text-neutral-300 space-y-1.5 border-t border-neutral-700/60">
                  <div className="flex items-center gap-1.5 text-[#a88aff] font-semibold">
                    <span>✦</span>
                    <span>{selectedProCredits === '2k' ? '2,000' : selectedProCredits === '4k' ? '4,000' : selectedProCredits === '8k' ? '8,000' : '16,000'} credits/mo</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#a88aff] shrink-0 mt-0.5" />
                    <span>Autonomous media buying & ad scaling</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#a88aff] shrink-0 mt-0.5" />
                    <span>Campaign Doctor diagnostics & ROAS audits</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <Check size={12} className="text-[#a88aff] shrink-0 mt-0.5" />
                    <span>Priority neural compute & 24/7 support</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                disabled={activatingPlan !== null}
                onClick={() => handlePlanSelect('pro', 'Pro Plan', isAnnual ? 13 : 16)}
                className="w-full py-2.5 px-3 rounded-xl bg-[#8057ff] hover:bg-[#7245ff] text-white text-xs font-bold transition cursor-pointer active:scale-95 shadow-[0_4px_20px_rgba(128,87,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {activatingPlan === 'pro' ? (
                  <>
                    <Loader2 size={13} className="animate-spin text-white" />
                    <span>Activating Pro...</span>
                  </>
                ) : (
                  <span>Upgrade to Pro</span>
                )}
              </button>
            </div>

          </div>

          {/* Back Button to Review Onboarding Answers */}
          <div className="pt-2 flex items-center justify-between border-t border-neutral-800 max-w-5xl mx-auto w-full">
            <button
              type="button"
              onClick={() => setCurrentStep(4)}
              className="text-xs font-semibold text-neutral-400 hover:text-white px-3.5 py-1.5 rounded-xl bg-[#282828] hover:bg-[#333333] border border-neutral-700/60 transition cursor-pointer"
            >
              ← Back to questionnaire
            </button>
            <span className="text-[11px] text-neutral-500">
              You can change or cancel your plan anytime in Settings
            </span>
          </div>

        </div>
      )}

    </div>
  );
};
