import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const PricingSection = ({ onNavigate }) => {
  const [currency, setCurrency] = useState('GHS');
  const rates = { GHS: { free: '0', starter: '99', growth: '249', pro: '499', symbol: 'GHS ' }, USD: { free: '0', starter: '29', growth: '69', pro: '149', symbol: '$' }, EUR: { free: '0', starter: '27', growth: '65', pro: '139', symbol: '€' } };
  const currentRate = rates[currency] || rates.GHS;
  const tiers = [
    { name: 'Free', price: currentRate.free, description: 'For getting started with AI marketing.', isRecommended: false, cta: 'Get started' },
    { name: 'Starter', price: currentRate.starter, period: '/ month', description: 'Everything you need to get moving.', isRecommended: false, cta: 'Get started' },
    { name: 'Growth', price: currentRate.growth, period: '/ month', description: 'Advanced tools for growing businesses.', isRecommended: true, cta: 'Get started' },
    { name: 'Pro', price: currentRate.pro, period: '/ month', description: 'For teams that want maximum impact.', isRecommended: false, cta: 'Get started' }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 border-t border-neutral-100 bg-[#fafafc] text-neutral-950">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-3 text-left">
            <h2 className="text-[38px] sm:text-[46px] lg:text-[54px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.08] mb-6">Simple<br />pricing.<br />Serious<br />impact.</h2>
            <div className="inline-flex items-center gap-1 bg-neutral-100 p-1 rounded-xl mt-2 border border-neutral-200/80">
              {['GHS', 'USD', 'EUR'].map((cur) => (
                <button key={cur} onClick={() => setCurrency(cur)} className={`text-xs font-bold px-3 py-1 rounded-lg transition cursor-pointer ${currency === cur ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-500 hover:text-neutral-900'}`}>{cur}</button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {tiers.map((tier, idx) => (
              <div key={idx} className={`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 ${tier.isRecommended ? 'bg-white border-2 border-purple-600 shadow-xl ring-2 ring-purple-100' : 'bg-white border border-neutral-200/80 shadow-2xs hover:border-neutral-300'}`}>
                {tier.isRecommended && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2"><span className="bg-purple-600 text-white text-[11px] font-bold px-3 py-0.5 rounded-full shadow-sm">Recommended</span></div>}
                <div>
                  <h3 className="text-base font-bold text-neutral-950 tracking-tight mb-4">{tier.name}</h3>
                  <div className="mb-4"><div className="flex items-baseline gap-1"><span className="text-2xl font-bold text-neutral-950">{currentRate.symbol}{tier.price}</span>{tier.period && <span className="text-xs text-neutral-500 font-normal">{tier.period}</span>}</div></div>
                  <p className="text-[13px] text-neutral-500 font-normal leading-relaxed mb-6 min-h-[40px]">{tier.description}</p>
                </div>
                <div>{tier.isRecommended ? <button onClick={() => onNavigate('get-started', tier.name)} className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold py-3 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"><span>{tier.cta}</span><ArrowRight size={13} /></button> : <button onClick={() => onNavigate('get-started', tier.name)} className="w-full text-left text-xs font-semibold text-neutral-600 hover:text-neutral-950 flex items-center gap-1 py-1 transition group cursor-pointer"><span>{tier.cta}</span><span className="transition-transform group-hover:translate-x-1">→</span></button>}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
