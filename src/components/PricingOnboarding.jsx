import React, { useState } from 'react';
import { 
  Check, ArrowRight, ShieldCheck, Zap, HelpCircle, 
  MessageSquare, Star, ArrowLeft, Key, Search, Sparkles, Cpu
} from 'lucide-react';
import PaymentModal from './PaymentModal';
import LegalAndComplianceModal from './LegalAndComplianceModal';

export const PRICING_PLANS = [
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
      'early access to Calvras feaatures',
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
      '*2 more usage than pro',
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
    <div className="min-h-screen w-full bg-[#14120B] text-white font-sans selection:bg-white selection:text-black flex flex-col items-center">
      
      {/* ─── Clean Header ─── */}
      <header className="w-full bg-[#14120B] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2 ml-2">
            <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-6 h-6 rounded object-contain" />
            <span className="font-bold text-base text-white tracking-tight uppercase">Calvras</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-neutral-400">
          <button onClick={() => handleOpenLegal('privacy')} className="hover:text-white transition-colors cursor-pointer hidden sm:inline">Privacy Policy</button>
          <button onClick={() => handleOpenLegal('refund')} className="hover:text-white transition-colors cursor-pointer hidden sm:inline">Refund Guarantee</button>
          <button onClick={() => handleOpenLegal('terms')} className="hover:text-white transition-colors cursor-pointer hidden sm:inline">Terms</button>
          <button
            onClick={handleCloseToFree}
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/15 hover:border-white/30 transition-all cursor-pointer font-medium"
            title="Close to Chat (Free Plan)"
          >
            <span>✕ Close</span>
          </button>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main className="w-full max-w-5xl mx-auto px-6 py-16 flex flex-col items-center text-center">
        
        {/* Header (Matching Image 4 Perplexity style) */}
        <div className="max-w-xl mx-auto mb-14">
          <h1 className="text-[40px] sm:text-[50px] font-serif font-normal text-white tracking-tight mb-3">
            Select your plan
          </h1>
          <p className="text-[15px] text-neutral-400">
            Upgrade for a broader search experience and premium AI models.
          </p>
        </div>

        {/* ─── 2 Cards Grid (Exact matching Perplexity Image 4, Subtle clean border) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full max-w-4xl mb-8 text-left">
          
          {/* Card 1: $14 Pro */}
          <div className="flex flex-col bg-[#14120B] rounded-3xl border border-white/20 p-8 hover:border-white/30 transition-all relative">
            
            {/* Title & Badge */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[26px] font-bold text-white tracking-tight">calvras <span className="font-normal text-white">pro</span></h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                Popular
              </span>
            </div>
            <p className="text-[13px] text-neutral-400 leading-relaxed mb-6 min-h-[38px]">
              Advanced answers and top AI models
            </p>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-1.5 pb-6 border-b border-white/10">
              <span className="text-[44px] font-bold text-white tracking-tight">$14</span>
              <span className="text-[13px] text-neutral-400">/month</span>
            </div>

            {/* Features */}
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
                <span>early access to Calvras feaatures</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Cpu size={15} className="text-neutral-400 flex-shrink-0" />
                <span>priority access to new models</span>
              </li>
            </ul>

            {/* Button */}
            <button
              type="button"
              onClick={() => handleSelect(PRICING_PLANS[0])}
              className="w-full py-3.5 rounded-2xl bg-neutral-200 hover:bg-white text-black font-bold text-[14px] transition-all cursor-pointer shadow-md text-center active:scale-95"
            >
              Get Pro
            </button>
          </div>

          {/* Card 2: $40 Max */}
          <div className="flex flex-col bg-[#14120B] rounded-3xl border border-white/15 p-8 hover:border-white/25 transition-all text-left">
            
            {/* Title */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[26px] font-bold text-white tracking-tight">calvras <span className="font-normal text-white">max</span></h2>
            </div>
            <p className="text-[13px] text-neutral-400 leading-relaxed mb-6 min-h-[38px]">
              Unlimited usage and top performance
            </p>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-1.5 pb-6 border-b border-white/10">
              <span className="text-[44px] font-bold text-white tracking-tight">$40</span>
              <span className="text-[13px] text-neutral-400">/month</span>
            </div>

            {/* Features */}
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
                <span>*2 more usage than pro</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Cpu size={15} className="text-white flex-shrink-0" />
                <span>priority access to new models</span>
              </li>
            </ul>

            {/* Button */}
            <button
              type="button"
              onClick={() => handleSelect(PRICING_PLANS[1])}
              className="w-full py-3.5 rounded-2xl bg-neutral-200 hover:bg-white text-black font-bold text-[14px] transition-all cursor-pointer shadow-md text-center active:scale-95"
            >
              Get Max
            </button>
          </div>

        </div>

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
