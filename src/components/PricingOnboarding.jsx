import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import PaymentModal from './PaymentModal';

export const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'Try the AI and build your first project at no cost.',
    monthlyPrice: null,
    annualPrice: null,
    priceIsText: true,
    priceText: '$0',
    priceSuffix: '/month',
    cta: 'Get Started',
    ctaType: 'secondary',
    tier: 'INCLUDES',
    features: [
      'Limited AI credits per day',
      'Credits reset daily',
      '1 project (public only)',
      'Basic AI builds',
      'Live preview',
      'Mobile responsive',
      'Community support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Build, fix, clone, deploy, and market your website or app.',
    monthlyPrice: 14.00,
    annualPrice: 11.00,
    priceIsText: false,
    cta: 'Go Pro',
    ctaType: 'primary',
    tier: 'EVERYTHING IN FREE, PLUS',
    features: [
      'All Free features',
      '100 Pro credits',
      'Credit rollovers',
      'On-demand credit top-ups',
      'Unlimited app domains',
      'Custom domains',
      'User roles & permissions',
      'AI-generated landing pages',
      'SEO meta tags & descriptions',
      'Social media caption generator',
    ],
  },
  {
    id: 'max',
    name: 'Max',
    tagline: 'Manage multiple client projects with team access and advanced tools.',
    monthlyPrice: 40.00,
    annualPrice: 32.00,
    priceIsText: false,
    cta: 'Go Max',
    ctaType: 'team',
    tier: 'EVERYTHING IN PRO, PLUS',
    features: [
      'All Pro features',
      '100 Max credits',
      'Team workspace',
      'Role-based access',
      'Internal publish',
      'Personal projects',
      'Security center',
      'Priority support',
      'Ad copy & email campaign generator',
      'Brand voice across all content',
      'Multi-channel marketing toolkit',
    ],
  },
];

export default function PricingOnboarding({ user, onCompletePlan }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState(null); // plan object or null

  const handleSelect = (plan) => {
    if (plan.priceIsText) {
      // Free plan — go straight through
      const updatedUser = {
        ...(user || { name: 'Developer', email: 'user@calvras.ai' }),
        plan: plan.name,
        planDetails: { id: plan.id, price: plan.priceText, billing: 'free', selectedAt: new Date().toISOString() },
      };
      try { localStorage.setItem('coded_user', JSON.stringify(updatedUser)); } catch {}
      if (onCompletePlan) onCompletePlan(updatedUser);
    } else {
      // Paid plan — open payment modal
      setPaymentPlan(plan);
    }
  };

  const handlePaymentSuccess = () => {
    const plan = paymentPlan;
    const price = `$${(isAnnual ? plan.annualPrice : plan.monthlyPrice).toFixed(2)}`;
    const updatedUser = {
      ...(user || { name: 'Developer', email: 'user@calvras.ai' }),
      plan: plan.name,
      planDetails: { id: plan.id, price, billing: isAnnual ? 'annual' : 'monthly', selectedAt: new Date().toISOString() },
    };
    try { localStorage.setItem('coded_user', JSON.stringify(updatedUser)); } catch {}
    setPaymentPlan(null);
    if (onCompletePlan) onCompletePlan(updatedUser);
  };

  return (
    <div className="h-screen w-screen bg-[#0f0f0e] text-[#e5e5e5] flex flex-col justify-center items-center px-6 py-4 font-sans select-none overflow-hidden">
      <div className="relative z-10 w-full max-w-[1100px] flex flex-col">

        {/* Headline */}
        <h1 className="text-center font-bold text-[#e5e5e5] tracking-[-0.03em] mb-3 text-[28px] sm:text-[34px] md:text-[38px] leading-tight">
          Get started for free
        </h1>

        {/* Billing Toggle */}
        <div className="flex justify-center items-center gap-3 mb-4">
          <span className={`text-[12px] font-semibold transition-colors ${!isAnnual ? 'text-[#e5e5e5]' : 'text-[#555]'}`}>
            Monthly
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual((v) => !v)}
            className={`relative w-[42px] h-[24px] rounded-full transition-colors duration-300 cursor-pointer focus:outline-none ${
              isAnnual ? 'bg-white' : 'bg-[#2a2a2a]'
            }`}
            aria-pressed={isAnnual}
            aria-label="Toggle annual billing"
          >
            <span
              className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full shadow transition-all duration-300 ${
                isAnnual ? 'translate-x-[18px] bg-[#0f0f0e]' : 'translate-x-0 bg-[#e5e5e5]'
              }`}
            />
          </button>
          <span className={`text-[12px] font-semibold transition-colors ${isAnnual ? 'text-[#e5e5e5]' : 'text-[#555]'}`}>
            Annual
          </span>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition-all duration-200 ${
            isAnnual
              ? 'bg-emerald-500/20 text-emerald-400 opacity-100'
              : 'bg-emerald-500/10 text-emerald-600 opacity-40'
          }`}>
            Save 20%
          </span>
        </div>

        {/* 3 Pricing Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch w-full">
          {PRICING_PLANS.map((plan) => {
            const displayPrice = plan.priceIsText
              ? plan.priceText
              : `$${(isAnnual ? plan.annualPrice : plan.monthlyPrice).toFixed(2)}`;
            const priceSuffix = plan.priceIsText
              ? plan.priceSuffix
              : (isAnnual ? '/mo, billed annually' : '/month');

            return (
              <div
                key={plan.id}
                className="flex flex-col bg-[#1a1a1a] rounded-[24px] overflow-hidden transition-all duration-200"
              >
                {/* Top Box */}
                <div
                  className={`bg-[#141414] rounded-[20px] p-6 sm:p-7 flex flex-col justify-between ${
                    plan.id === 'pro'
                      ? 'shadow-[0_14px_32px_rgba(0,0,0,0.4)] border border-white/[0.06]'
                      : 'shadow-[0_2px_12px_rgba(0,0,0,0.2)] border border-white/[0.04]'
                  }`}
                >
                  <div>
                    <h2 className="text-[20px] font-bold text-[#e5e5e5] tracking-tight mb-1.5">
                      {plan.name}
                    </h2>
                    <p className="text-[12px] text-[#8a9ab5] leading-[1.45] mb-4 min-h-[48px]">
                      {plan.tagline}
                    </p>
                    <div className="mb-4 flex items-baseline gap-1">
                      <span className="text-[28px] font-bold text-[#e5e5e5] tracking-tight transition-all duration-200">
                        {displayPrice}
                      </span>
                      {priceSuffix && (
                        <span className="text-[12px] font-medium text-[#8a9ab5]">
                          {priceSuffix}
                        </span>
                      )}
                    </div>
                    {!plan.priceIsText && (
                      <div className={`text-[11px] font-medium mb-3 transition-all duration-200 ${
                        isAnnual ? 'text-emerald-400 opacity-100' : 'opacity-0 select-none h-0 overflow-hidden'
                      }`}>
                        Save ${((plan.monthlyPrice - plan.annualPrice) * 12).toFixed(0)}/year vs monthly
                      </div>
                    )}
                  </div>

                  {plan.ctaType === 'secondary' && (
                    <button
                      type="button"
                      onClick={() => handleSelect(plan)}
                      className="w-full py-3 px-4 rounded-full bg-[#2a2a2a] hover:bg-[#333333] text-[#e5e5e5] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {plan.cta}
                    </button>
                  )}
                  {plan.ctaType === 'primary' && (
                    <button
                      type="button"
                      onClick={() => handleSelect(plan)}
                      className="w-full py-3 px-4 rounded-full bg-white hover:bg-[#e5e5e5] text-[#0f0f0e] text-[13px] font-semibold shadow-[0_8px_22px_rgba(255,255,255,0.12)] flex items-center justify-center transition-all cursor-pointer"
                    >
                      {plan.cta}
                    </button>
                  )}
                  {plan.ctaType === 'team' && (
                    <button
                      type="button"
                      onClick={() => handleSelect(plan)}
                      className="w-full py-3 px-4 rounded-full bg-[#2a2a2a] hover:bg-[#333333] text-[#e5e5e5] text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      {plan.cta}
                      <ArrowRight size={14} strokeWidth={2.4} />
                    </button>
                  )}
                </div>

                {/* Features List */}
                <div className="p-6 sm:p-7 pt-5 pb-7 flex-1 flex flex-col overflow-y-auto">
                  <div className="text-[10.5px] font-bold tracking-[0.06em] text-[#4a5568] uppercase mb-4">
                    {plan.tier}
                  </div>
                  <ul className="space-y-2.5">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="w-[15px] h-[15px] mt-[1px] rounded-full bg-[#e5e5e5] flex items-center justify-center flex-shrink-0">
                          <Check size={9} className="text-[#0f0f0e]" strokeWidth={3.5} />
                        </div>
                        <span className="text-[12px] text-[#c4c4c4] font-medium leading-snug">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Modal */}
      {paymentPlan && (
        <PaymentModal
          plan={paymentPlan}
          isAnnual={isAnnual}
          onClose={() => setPaymentPlan(null)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
}
