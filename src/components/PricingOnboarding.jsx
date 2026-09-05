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
    creditBonus: '+$40 free Computer credits',
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
    creditBonus: '+$450 free Computer credits',
    features: [
      'everything in pro',
      'unlimited usage of api key',
      '*2 more usage than pro',
      'priority access to new models'
    ]
  }
];

export default function PricingOnboarding({ onBack, onComplete, onNavigateLegal, onNavigateHelp, initialPlan = 'pro' }) {
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [legalModalTab, setLegalModalTab] = useState(null);

  const handleSelect = (plan) => {
    setPaymentPlan(plan);
  };

  const handlePaymentSuccess = (reference) => {
    setPaymentPlan(null);
    if (onComplete) onComplete(reference);
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
          <button onClick={() => handleOpenLegal('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
          <button onClick={() => handleOpenLegal('refund')} className="hover:text-white transition-colors cursor-pointer">Refund Guarantee</button>
          <button onClick={() => handleOpenLegal('terms')} className="hover:text-white transition-colors cursor-pointer">Terms</button>
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

        {/* ─── 2 Cards Grid (Exact matching Perplexity Image 4) ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full max-w-4xl mb-8 text-left">
          
          {/* Card 1: $14 Pro */}
          <div className="flex flex-col bg-[#14120B] rounded-3xl border border-teal-500/40 p-8 shadow-[0_0_50px_rgba(20,184,166,0.08)] relative">
            
            {/* Top Badge Banner */}
            <div className="flex items-center justify-between text-[11px] font-mono text-teal-400 font-semibold mb-6">
              <span>+$40 free Computer credits</span>
              <span className="text-neutral-500 uppercase">LIMITED TIME</span>
            </div>

            {/* Title & Badge */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[26px] font-bold text-white tracking-tight">calvras <span className="font-normal text-teal-400">pro</span></h2>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
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

            {/* Features (Exact user specifications) */}
            <div className="text-[12px] font-medium text-neutral-300 mb-4">
              Everything in Free and:
            </div>
            <ul className="space-y-3.5 flex-1 mb-8">
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Search size={15} className="text-teal-400 flex-shrink-0" />
                <span>built in web search</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Zap size={15} className="text-teal-400 flex-shrink-0" />
                <span>high usage limit</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Sparkles size={15} className="text-teal-400 flex-shrink-0" />
                <span>early access to Calvras feaatures</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Cpu size={15} className="text-teal-400 flex-shrink-0" />
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
            
            {/* Top Badge Banner */}
            <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 font-semibold mb-6">
              <span>+$450 free Computer credits</span>
              <span className="text-neutral-500 uppercase">LIMITED TIME</span>
            </div>

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

            {/* Features (Exact user specifications) */}
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

        {/* Privacy Policy Link Underneath (Per user instruction) */}
        <div className="text-[12.5px] text-neutral-400 max-w-xl mx-auto leading-relaxed">
          All subscriptions are protected by Paystack with immediate digital delivery. View our{' '}
          <button
            type="button"
            onClick={() => handleOpenLegal('privacy')}
            className="underline text-neutral-200 hover:text-white cursor-pointer transition-colors"
          >
            Privacy Policy
          </button>{' '}
          and{' '}
          <button
            type="button"
            onClick={() => handleOpenLegal('refund')}
            className="underline text-neutral-200 hover:text-white cursor-pointer transition-colors"
          >
            14-Day Refund Guarantee
          </button>.
        </div>

      </main>

      {/* ─── Compliance & Legal Footer on #14120B ─── */}
      <footer className="w-full border-t border-white/10 bg-[#14120B] py-12 px-6 text-xs text-neutral-500 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-6 h-6 rounded object-contain" />
            <span className="text-white font-bold text-sm">Calvras Technologies</span>
            <span className="text-neutral-600">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-neutral-400">
            <button onClick={() => handleOpenLegal('about')} className="hover:text-white transition-colors cursor-pointer">About Page</button>
            <button onClick={() => handleOpenLegal('refund')} className="hover:text-white transition-colors cursor-pointer">Shipping & Refund Policy</button>
            <button onClick={() => handleOpenLegal('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
            <button onClick={() => handleOpenLegal('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-white/5 text-[11px] text-neutral-600 text-center leading-relaxed">
          Calvras provides digital software-as-a-service (SaaS) products. All subscription payments and refunds are securely processed via Paystack in accordance with international digital commerce regulations. Immediate electronic fulfillment with 14-day money-back guarantee.
        </div>
      </footer>

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
