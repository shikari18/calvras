import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const PricingSection = ({ onNavigate }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: '',
      description: 'For exploring AI marketing features at a basic level.',
      isRecommended: false,
      cta: 'Get started',
      features: ['3 generations daily', 'Standard response speed', 'Core copywriting frameworks']
    },
    {
      name: 'Basic',
      price: isAnnual ? '$8' : '$10',
      period: '/ month',
      subtext: isAnnual ? 'billed annually $96' : '',
      description: 'For individual creators with core marketing needs.',
      isRecommended: false,
      cta: 'Get started',
      features: ['1,000 credits per month', 'Unlimited ad copy & hooks', 'Email & SMS funnels', 'Commercial rights']
    },
    {
      name: 'Pro',
      price: isAnnual ? '$13' : '$16',
      period: '/ month',
      subtext: isAnnual ? 'billed annually $156' : '',
      description: 'For professional marketers who need scale and video generation.',
      isRecommended: true,
      cta: 'Upgrade to Pro',
      features: ['2,000 credits per month', 'Video generation prompt directing', 'Sora, Kling & Runway workflows', 'Priority neural compute']
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-36 border-t border-white/10 bg-[#0d0e0c] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-neutral-400">
            TRANSPARENT PRICING
          </p>
          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
            Flexible plans for creators & teams
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Choose the plan that fits your growth pace. Cancel anytime.
          </p>

          {/* Toggle */}
          <div className="pt-3 flex items-center justify-center gap-3">
            <span className={`text-xs ${!isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>
              Monthly
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer p-0.5 flex items-center ${
                isAnnual ? 'bg-white' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  isAnnual ? 'translate-x-5 bg-black' : 'translate-x-0 bg-white'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs ${isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>
                Annual
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* 3 Dark Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 ${
                tier.isRecommended
                  ? 'bg-[#181915] border-2 border-white/30 shadow-[0_0_50px_rgba(255,255,255,0.08)]'
                  : 'bg-[#131411] border border-white/10 hover:border-white/20'
              }`}
            >
              {tier.isRecommended && (
                <div className="absolute -top-3 right-6 bg-white text-neutral-950 text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                  Recommended
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">{tier.name}</h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">{tier.description}</p>
                </div>

                <div className="pt-2">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-white">{tier.price}</span>
                    {tier.period && <span className="text-xs text-neutral-400 font-normal">{tier.period}</span>}
                  </div>
                  {tier.subtext && <p className="text-[11px] text-neutral-500 mt-0.5">{tier.subtext}</p>}
                </div>

                <div className="pt-2 text-xs text-neutral-300 space-y-2.5 border-t border-white/10">
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check size={13} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => onNavigate('get-started', tier.name)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md ${
                    tier.isRecommended
                      ? 'bg-white hover:bg-neutral-200 text-neutral-950'
                      : 'bg-[#22241e] hover:bg-[#2c2f27] text-white border border-white/10'
                  }`}
                >
                  <span>{tier.cta}</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
