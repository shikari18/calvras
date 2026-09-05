import React, { useState } from 'react';
import { 
  Check, ArrowRight, ShieldCheck, Zap, HelpCircle, 
  MessageSquare, Star, ArrowLeft, Key, Search, Sparkles, Cpu
} from 'lucide-react';
import PaymentModal from './PaymentModal';
import LegalAndComplianceModal from './LegalAndComplianceModal';

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'calvras free',
    tagline: 'Basic search & coding',
    monthlyPrice: 0.00,
    annualPrice: 0.00,
    priceIsText: false,
    cta: 'Continue Free',
    ctaType: 'free',
    tier: 'Includes:',
    features: [
      'Standard daily chat limit',
      '3 image uploads per project',
      'Standard response speed',
      'Community support'
    ]
  },
  {
    id: 'pro',
    name: 'calvras pro',
    tagline: 'Advanced answers and top AI models',
    monthlyPrice: 14.00,
    annualPrice: 14.00,
    priceIsText: false,
    cta: 'Get Pro',
    ctaType: 'pro',
    tier: 'Everything in Free and:',
    isPopular: true,
    features: [
      'built in web search',
      'high usage limit',
      'early access to Calvras features',
      'priority access to new models'
    ]
  },
  {
    id: 'max',
    name: 'calvras max',
    tagline: 'Unlimited usage and top performance',
    monthlyPrice: 40.00,
    annualPrice: 40.00,
    priceIsText: false,
    cta: 'Get Max',
    ctaType: 'team',
    tier: 'Everything in Pro and:',
    features: [
      'everything in pro',
      'unlimited usage of api key',
      '2x more usage than pro',
      'priority access to new models'
    ]
  }
];

export default function PricingOnboarding({ 
  onBack, 
  onComplete, 
  onCompletePlan,
  onSkip,
  user,
  onNavigateLegal, 
  onNavigateHelp, 
  initialPlan = 'pro' 
}) {
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [legalModalTab, setLegalModalTab] = useState(null);

  const handleSelect = (plan) => {
    setPaymentPlan(plan);
  };

  const handlePaymentSuccess = (reference) => {
    setPaymentPlan(null);
    if (onComplete) onComplete(reference);
    if (onCompletePlan) {
      onCompletePlan({ ...(user || {}), plan: paymentPlan?.name || 'Pro Plan' });
    }
  };

  const handleCloseToFree = () => {
    // If closed, user automatically proceeds on Free tier
    if (onSkip) {
      onSkip();
    } else if (onComplete) {
      onComplete({ freePlan: true });
    } else if (onCompletePlan) {
      onCompletePlan({ ...(user || {}), plan: 'Free Plan' });
    } else if (onBack) {
      onBack();
    }
  };

  const handleOpenLegal = (tab) => {
    if (onNavigateLegal) {
      onNavigateLegal(tab);
    } else {
      setLegalModalTab(tab);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#121232] text-white font-sans selection:bg-white selection:text-black flex flex-col items-center">
      
      {/* ─── Clean Header: Only Close on top right ─── */}
      <header className="w-full bg-[#121232] px-6 py-4 flex items-center justify-end">
        <button
          onClick={handleCloseToFree}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer font-medium"
          title="Close to Chat (Free Plan)"
        >
          <span>✕ Close</span>
        </button>
      </header>

      {/* ─── Main Content ─── */}
      <main className="flex-1 w-full max-w-6xl px-6 py-8 flex flex-col items-center justify-center">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-[32px] sm:text-[40px] font-bold tracking-tight text-white mb-3">
            Choose your plan
          </h1>
          <p className="text-[15px] text-neutral-400 max-w-md mx-auto">
            Build, code, and deploy with autonomous intelligence. Upgrade anytime.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
          
          {/* Card 0: $0 Free */}
          <div className="flex flex-col p-8 rounded-3xl bg-[#16163A] border border-white/10 hover:border-white/20 transition-all">
            <h3 className="text-[18px] font-semibold text-white mb-1">calvras free</h3>
            <p className="text-[12px] text-neutral-400 mb-6">Explore the power of Calvras</p>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-[38px] font-bold text-white tracking-tight">$0</span>
              <span className="text-[13px] text-neutral-400">/month</span>
            </div>

            <div className="text-[12px] font-medium text-neutral-300 mb-4">
              Includes:
            </div>
            <ul className="space-y-3.5 flex-1 mb-8">
              <li className="flex items-center gap-3 text-[13px] text-neutral-300">
                <Check size={15} className="text-neutral-500 flex-shrink-0" />
                <span>Standard daily chat limit</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-300">
                <Check size={15} className="text-neutral-500 flex-shrink-0" />
                <span>3 image uploads per project</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-300">
                <Check size={15} className="text-neutral-500 flex-shrink-0" />
                <span>Standard response speed</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-300">
                <Check size={15} className="text-neutral-500 flex-shrink-0" />
                <span>Community support</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={handleCloseToFree}
              className="w-full py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-medium text-[13.5px] transition-all cursor-pointer border border-white/10 text-center"
            >
              Continue Free
            </button>
          </div>

          {/* Card 1: $14 Pro */}
          <div className="flex flex-col bg-[#16163A] rounded-3xl border border-white/25 p-7 hover:border-white/35 transition-all relative shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[22px] font-bold text-white tracking-tight">calvras <span className="font-normal text-white">pro</span></h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                Popular
              </span>
            </div>
            <p className="text-[13px] text-neutral-400 leading-relaxed mb-6 min-h-[38px]">
              Advanced answers and top AI models
            </p>

            <div className="mb-6 flex items-baseline gap-1.5 pb-6 border-b border-white/10">
              <span className="text-[38px] font-bold text-white tracking-tight">$14</span>
              <span className="text-[13px] text-neutral-400">/month</span>
            </div>

            <div className="text-[12px] font-medium text-neutral-300 mb-4">
              Everything in Free and:
            </div>
            <ul className="space-y-3.5 flex-1 mb-8">
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Search size={15} className="text-neutral-400 flex-shrink-0" />
                <span>built in web search</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Zap size={15} className="text-neutral-400 flex-shrink-0" />
                <span>high usage limit</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Sparkles size={15} className="text-neutral-400 flex-shrink-0" />
                <span>early access to Calvras features</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Cpu size={15} className="text-neutral-400 flex-shrink-0" />
                <span>priority access to new models</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => handleSelect(PRICING_PLANS[1])}
              className="w-full py-3 rounded-2xl bg-white hover:bg-neutral-200 text-black font-bold text-[13.5px] transition-all cursor-pointer shadow-md text-center active:scale-95"
            >
              Get Pro
            </button>
          </div>

          {/* Card 2: $40 Max */}
          <div className="flex flex-col bg-[#16163A] rounded-3xl border border-white/15 p-7 hover:border-white/25 transition-all text-left">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[22px] font-bold text-white tracking-tight">calvras <span className="font-normal text-white">max</span></h2>
            </div>
            <p className="text-[13px] text-neutral-400 leading-relaxed mb-6 min-h-[38px]">
              Unlimited usage and top performance
            </p>

            <div className="mb-6 flex items-baseline gap-1.5 pb-6 border-b border-white/10">
              <span className="text-[38px] font-bold text-white tracking-tight">$40</span>
              <span className="text-[13px] text-neutral-400">/month</span>
            </div>

            <div className="text-[12px] font-medium text-neutral-300 mb-4">
              Everything in Pro and:
            </div>
            <ul className="space-y-3.5 flex-1 mb-8">
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Check size={15} className="text-white flex-shrink-0" />
                <span>everything in pro</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Key size={15} className="text-emerald-400 flex-shrink-0" />
                <span className="font-bold text-white">unlimited usage of api key</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Zap size={15} className="text-emerald-400 flex-shrink-0" />
                <span>2x more usage than pro</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Cpu size={15} className="text-white flex-shrink-0" />
                <span>priority access to new models</span>
              </li>
            </ul>

            <button
              type="button"
              onClick={() => handleSelect(PRICING_PLANS[2])}
              className="w-full py-3 rounded-2xl bg-white hover:bg-neutral-200 text-black font-bold text-[13.5px] transition-all cursor-pointer shadow-md text-center active:scale-95"
            >
              Get Max
            </button>
          </div>

        </div>

        {/* ─── Clean Agreement Line ─── */}
        <p className="text-xs text-neutral-500">
          By subscribing, you agree to our{' '}
          <button 
            type="button" 
            onClick={() => handleOpenLegal('privacy')} 
            className="underline hover:text-white transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
          {' '}and{' '}
          <button 
            type="button" 
            onClick={() => handleOpenLegal('terms')} 
            className="underline hover:text-white transition-colors cursor-pointer"
          >
            Terms of Service
          </button>.
        </p>

      </main>

      {/* Payment Checkout Modal */}
      {paymentPlan && (
        <PaymentModal
          plan={paymentPlan}
          isAnnual={false}
          onClose={() => setPaymentPlan(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}

      {/* Compliance / Policy Modal */}
      {legalModalTab && (
        <LegalAndComplianceModal
          initialTab={legalModalTab}
          onClose={() => setLegalModalTab(null)}
        />
      )}

    </div>
  );
}
