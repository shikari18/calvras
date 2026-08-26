import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ArrowLeft, Loader2, Zap, Shield, Star, Rocket, CheckCircle2 } from 'lucide-react';
import { BrandBurstLogo } from '../components/cy/CySidebar';

export const OnboardingFlow = ({ onComplete, userProfile }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1 to 5
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedProCredits, setSelectedProCredits] = useState('2k');
  const [activatingPlan, setActivatingPlan] = useState(null);
  const [isCompletedSuccess, setIsCompletedSuccess] = useState(false);

  // User answers state
  const [answers, setAnswers] = useState({
    useCase: 'Personal',
    workRole: 'Marketer',
    creationGoals: ['Marketing / Advertising assets', 'Video scripts & TikTok reels'],
    source: 'TikTok'
  });

  const handleSingleSelect = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleMultiSelect = (key, value) => {
    setAnswers(prev => {
      const currentList = prev[key] || [];
      if (currentList.includes(value)) {
        return { ...prev, [key]: currentList.filter(item => item !== value) };
      } else {
        return { ...prev, [key]: [...currentList, value] };
      }
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
      }, 1200);
    }, 1400);
  };

  // Visual Assets for Right Column
  const stepVisuals = {
    1: {
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
      badge: "Creative Workspace",
      alt: "Sculptural Modern Design"
    },
    2: {
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      badge: "Creator Studio",
      alt: "Creator at work"
    },
    3: {
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      badge: "Visual Concept Art",
      alt: "Creative Portrait"
    },
    4: {
      isGrid: true,
      badge: "Omni-Channel Reach"
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] text-white flex items-center justify-center p-3 sm:p-6 md:p-10 font-sans select-none antialiased">
      
      {/* Full-Screen Plan Activation Success Overlay */}
      {isCompletedSuccess && (
        <div className="fixed inset-0 bg-[#141414]/95 z-50 flex flex-col items-center justify-center gap-4 animate-in fade-in zoom-in-95 duration-300">
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

      {/* Main Responsive Onboarding Card */}
      <div className={`w-full ${currentStep === 5 ? 'max-w-6xl' : 'max-w-5xl'} min-h-[620px] bg-[#1c1c1c] rounded-3xl border border-neutral-800 shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300`}>
        
        {/* ================================================================= */}
        {/* STEPS 1 TO 4: SPLIT 2-COLUMN ONBOARDING QUESTIONNAIRE */}
        {/* ================================================================= */}
        {currentStep < 5 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
            
            {/* Left Interactive Column (Questions & Options) */}
            <div className="lg:col-span-6 p-6 sm:p-10 md:p-12 flex flex-col justify-between">
              
              {/* Top Logo */}
              <div>
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-md">
                    <span className="font-serif font-black text-neutral-950 text-xl tracking-tighter">
                      C
                    </span>
                  </div>
                  <span className="font-serif font-bold text-lg tracking-tight text-white">
                    Calvras
                  </span>
                </div>

                {/* STEP 1: USE CASE */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <h1 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-snug">
                        What do you plan to use Calvras for?
                      </h1>
                      <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                        If you'll use Calvras for a few reasons, pick the main one
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-2">
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
                  <div className="space-y-6 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <h1 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-snug">
                        What kind of work do you do?
                      </h1>
                      <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                        Pick the role that best describes your daily focus
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-2">
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
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <h1 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-snug">
                        What do you plan to create with Calvras?
                      </h1>
                      <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                        Select all that apply
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-1">
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
                            className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-medium transition cursor-pointer active:scale-95 ${
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
                  <div className="space-y-5 animate-in fade-in duration-200">
                    <div className="space-y-1.5">
                      <h1 className="text-2xl sm:text-[28px] font-bold text-white tracking-tight leading-snug">
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

              {/* Bottom Navigation & Progress Dots */}
              <div className="pt-8 flex items-center justify-between border-t border-neutral-800/80">
                {/* 5 Dots Indicator */}
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((stepNum) => (
                    <div
                      key={stepNum}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        stepNum === currentStep
                          ? 'w-4 bg-white'
                          : stepNum < currentStep
                          ? 'w-1.5 bg-[#ff5e28]'
                          : 'w-1.5 bg-neutral-700'
                      }`}
                    />
                  ))}
                </div>

                {/* Back / Continue Buttons */}
                <div className="flex items-center gap-3">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-neutral-400 hover:text-white bg-[#282828] hover:bg-[#333333] border border-neutral-700/60 transition cursor-pointer"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-neutral-950 bg-white hover:bg-neutral-100 transition cursor-pointer shadow-sm active:scale-95"
                  >
                    {currentStep === 4 ? 'Continue to Plans' : 'Continue'}
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Hero Visual Artwork */}
            <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-[#151515]">
              <div className="w-full h-full min-h-[380px] sm:min-h-[480px] rounded-2xl sm:rounded-3xl overflow-hidden relative shadow-2xl border border-neutral-800/80 bg-neutral-900 flex items-center justify-center">
                
                {currentStep === 4 ? (
                  // Step 4: Social Icons Grid Visual (Inspired by Screenshot 4)
                  <div className="w-full h-full bg-[#f1efe9] p-8 grid grid-cols-3 gap-6 items-center justify-items-center">
                    {/* Instagram */}
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 border border-neutral-200">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                        IG
                      </div>
                    </div>
                    {/* Web / News */}
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-2.5 border border-neutral-200">
                      <div className="w-full h-full rounded-lg bg-neutral-100 p-1 space-y-1">
                        <div className="h-2 w-3/4 bg-neutral-300 rounded" />
                        <div className="h-1.5 w-full bg-neutral-200 rounded" />
                        <div className="h-1.5 w-1/2 bg-neutral-200 rounded" />
                      </div>
                    </div>
                    {/* Pinterest */}
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 border border-neutral-200">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm">
                        P
                      </div>
                    </div>
                    {/* TikTok */}
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 border border-neutral-200">
                      <span className="text-neutral-950 font-black text-xl tracking-tighter">
                        d
                      </span>
                    </div>
                    {/* AI Chatbots Eyes */}
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 border border-neutral-200">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-neutral-900" />
                        <div className="w-3 h-3 rounded-full bg-neutral-900" />
                      </div>
                    </div>
                    {/* LinkedIn */}
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 border border-neutral-200">
                      <div className="w-10 h-10 rounded-lg bg-[#0077b5] flex items-center justify-center text-white font-bold text-xs">
                        in
                      </div>
                    </div>
                    {/* Community Chat */}
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 border border-neutral-200">
                      <div className="flex -space-x-1">
                        <div className="w-4 h-4 rounded-full bg-orange-400" />
                        <div className="w-4 h-4 rounded-full bg-teal-400" />
                      </div>
                    </div>
                    {/* YouTube */}
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 border border-neutral-200">
                      <div className="w-10 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white text-xs">
                        ▶
                      </div>
                    </div>
                    {/* X (Twitter) */}
                    <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center p-3 border border-neutral-200">
                      <span className="font-bold text-neutral-900 text-lg">𝕏</span>
                    </div>
                  </div>
                ) : (
                  // Step 1 to 3: High-Res Editorial Photography matching Screenshot Vibes
                  <>
                    <img 
                      src={stepVisuals[currentStep]?.image} 
                      alt={stepVisuals[currentStep]?.alt}
                      className="w-full h-full object-cover object-center transform hover:scale-105 transition duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white/90">
                      ✨ {stepVisuals[currentStep]?.badge}
                    </div>
                  </>
                )}

              </div>
            </div>

          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 5: THE PRICING & PAYMENT PLANS SELECTION SCREEN */}
        {/* ================================================================= */}
        {currentStep === 5 && (
          <div className="p-6 sm:p-10 lg:p-12 space-y-8 animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header with Title & Annual Toggle */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Which plan would you like?
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400">
                Flexible plans for creators, marketers, and fast-growing teams
              </p>

              {/* Monthly / Annual Toggle Switch */}
              <div className="pt-2 flex items-center justify-center gap-3">
                <span className={`text-xs sm:text-sm ${!isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>
                  Pay monthly
                </span>
                
                <button
                  type="button"
                  onClick={() => setIsAnnual(!isAnnual)}
                  className={`w-11 h-6 rounded-full transition-colors cursor-pointer p-0.5 flex items-center ${
                    isAnnual ? 'bg-[#ff5e28]' : 'bg-neutral-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      isAnnual ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>

                <div className="flex items-center gap-1.5">
                  <span className={`text-xs sm:text-sm ${isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>
                    Pay annually
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5e28] bg-[#ff5e28]/15 px-2 py-0.5 rounded-full border border-[#ff5e28]/30">
                    Save 20%
                  </span>
                </div>
              </div>
            </div>

            {/* 3 Plan Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
              
              {/* 1. FREE PLAN */}
              <div className="bg-[#242424] hover:bg-[#282828] rounded-3xl border border-neutral-800 p-6 flex flex-col justify-between space-y-6 transition hover:border-neutral-700">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Free</h3>
                    <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                      For exploring AI features at a basic level. Personal use only.
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-3xl font-extrabold text-white">$0</span>
                  </div>

                  <div className="pt-2 text-xs text-neutral-300 space-y-2.5">
                    <div className="flex items-center gap-2 text-neutral-400 font-medium">
                      <span>✧</span>
                      <span>Limited free marketing credits</span>
                    </div>
                    <div className="border-t border-neutral-700/60 pt-2 text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                      What's included:
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>3 ad & copy generations daily</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Standard response speed</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>Core marketing playbooks</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={activatingPlan !== null}
                  onClick={() => handlePlanSelect('free', 'Free Plan', 0)}
                  className="w-full py-3 px-4 rounded-xl bg-[#323232] hover:bg-[#3d3d3d] text-white text-xs font-bold transition cursor-pointer active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {activatingPlan === 'free' ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-white" />
                      <span>Activating Free...</span>
                    </>
                  ) : (
                    <span>Get started</span>
                  )}
                </button>
              </div>

              {/* 2. BASIC PLAN */}
              <div className="bg-[#242424] hover:bg-[#282828] rounded-3xl border border-neutral-800 p-6 flex flex-col justify-between space-y-6 transition hover:border-neutral-700">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">Basic</h3>
                    <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                      For individual creators with core image & marketing needs.
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-white">
                        ${isAnnual ? '8' : '10'}
                      </span>
                      <span className="text-xs text-neutral-400 font-normal">
                        per month
                      </span>
                    </div>
                    {isAnnual && (
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        billed annually $96
                      </p>
                    )}
                  </div>

                  <div className="pt-2 text-xs text-neutral-300 space-y-2.5">
                    <div className="flex items-center gap-2 text-[#ff5e28] font-semibold">
                      <span>✦</span>
                      <span>1,000 credits per month</span>
                    </div>
                    <div className="border-t border-neutral-700/60 pt-2 text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                      Everything in Free, plus:
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#ff5e28] shrink-0 mt-0.5" />
                      <span>Commercial rights & private generations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#ff5e28] shrink-0 mt-0.5" />
                      <span>Full email & SMS funnel automations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#ff5e28] shrink-0 mt-0.5" />
                      <span>Unlimited video scripts & hooks</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={activatingPlan !== null}
                  onClick={() => handlePlanSelect('basic', 'Basic Plan', isAnnual ? 8 : 10)}
                  className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold transition cursor-pointer active:scale-95 shadow-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {activatingPlan === 'basic' ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-neutral-950" />
                      <span>Setting up Basic...</span>
                    </>
                  ) : (
                    <span>Upgrade to Basic</span>
                  )}
                </button>
              </div>

              {/* 3. PRO PLAN (RECOMMENDED) */}
              <div className="bg-[#242424] rounded-3xl border-2 border-[#8057ff] p-6 flex flex-col justify-between space-y-6 relative shadow-[0_0_30px_rgba(128,87,255,0.15)]">
                
                {/* Recommended Badge */}
                <div className="absolute -top-3 right-6 bg-[#8057ff] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Recommended
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <span>Pro</span>
                      <Sparkles size={16} className="text-[#8057ff]" />
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                      For professional creators who need scale and video generation.
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-extrabold text-white">
                        ${isAnnual ? '13' : '16'}
                      </span>
                      <span className="text-xs text-neutral-400 font-normal">
                        per month
                      </span>
                    </div>
                    {isAnnual && (
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        billed annually $156
                      </p>
                    )}
                  </div>

                  {/* Credit Tier Selector */}
                  <div className="grid grid-cols-4 gap-1.5 bg-[#1b1b1b] p-1 rounded-xl border border-neutral-700/60">
                    {['2k', '4k', '8k', '16k'].map((tier) => (
                      <button
                        key={tier}
                        type="button"
                        onClick={() => setSelectedProCredits(tier)}
                        className={`py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                          selectedProCredits === tier
                            ? 'bg-[#8057ff] text-white shadow-sm'
                            : 'text-neutral-400 hover:text-white'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>

                  <div className="pt-1 text-xs text-neutral-300 space-y-2.5">
                    <div className="flex items-center gap-2 text-[#a88aff] font-semibold">
                      <span>✦</span>
                      <span>{selectedProCredits === '2k' ? '2,000' : selectedProCredits === '4k' ? '4,000' : selectedProCredits === '8k' ? '8,000' : '16,000'} credits per month</span>
                    </div>
                    <div className="border-t border-neutral-700/60 pt-2 text-[11px] text-neutral-400 font-semibold uppercase tracking-wider">
                      Everything in Basic, plus:
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#a88aff] shrink-0 mt-0.5" />
                      <span>Video generation & AI prompt directing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#a88aff] shrink-0 mt-0.5" />
                      <span>Sora, Kling, Runway Gen-3 & Midjourney workflows</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check size={14} className="text-[#a88aff] shrink-0 mt-0.5" />
                      <span>Priority neural compute & 24/7 dedicated support</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={activatingPlan !== null}
                  onClick={() => handlePlanSelect('pro', 'Pro Plan', isAnnual ? 13 : 16)}
                  className="w-full py-3 px-4 rounded-xl bg-[#8057ff] hover:bg-[#7245ff] text-white text-xs font-bold transition cursor-pointer active:scale-95 shadow-[0_4px_20px_rgba(128,87,255,0.4)] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {activatingPlan === 'pro' ? (
                    <>
                      <Loader2 size={15} className="animate-spin text-white" />
                      <span>Activating Pro Plan...</span>
                    </>
                  ) : (
                    <span>Upgrade to Pro</span>
                  )}
                </button>
              </div>

            </div>

            {/* Back Button to Review Onboarding Answers */}
            <div className="pt-2 flex items-center justify-between border-t border-neutral-800">
              <button
                type="button"
                onClick={() => setCurrentStep(4)}
                className="text-xs font-semibold text-neutral-400 hover:text-white px-4 py-2 rounded-xl bg-[#282828] hover:bg-[#333333] transition cursor-pointer"
              >
                ← Back to questionnaire
              </button>
              <span className="text-xs text-neutral-500">
                You can change or cancel your plan anytime in Settings
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
