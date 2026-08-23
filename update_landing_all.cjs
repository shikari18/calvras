const fs = require('fs');

// Section 3: Idea To Everywhere
fs.writeFileSync('src/components/IdeaToEverywhere.jsx', `import React, { useState } from 'react';
import { Lightbulb, Target, Edit3, Send, BarChart3 } from 'lucide-react';

const STAGES = [
  { id: 'idea', label: 'IDEA', icon: Lightbulb, desc: 'Input one raw thought or business goal.' },
  { id: 'campaign', label: 'CAMPAIGN', icon: Target, desc: 'AI formulates strategy, channels & budget.' },
  { id: 'content', label: 'CONTENT', icon: Edit3, desc: 'Generates on-brand copy, creatives & ads.' },
  { id: 'publish', label: 'PUBLISH', icon: Send, desc: 'Automated scheduling across all channels.' },
  { id: 'results', label: 'RESULTS', icon: BarChart3, desc: 'Real-time performance tracking & optimization.' }
];

export const IdeaToEverywhere = () => {
  const [activeStage, setActiveStage] = useState(null);

  return (
    <section className="py-24 md:py-32 border-t border-white/10 bg-[#090a0f] text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        
        <h2 className="text-[38px] sm:text-[48px] lg:text-[56px] font-extrabold text-white tracking-[-0.035em] leading-[1.08] mb-16">
          From idea<br />
          to everywhere.
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isHovered = activeStage === stage.id;
            return (
              <React.Fragment key={stage.id}>
                <div 
                  onMouseEnter={() => setActiveStage(stage.id)}
                  onMouseLeave={() => setActiveStage(null)}
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className={\`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 \${
                    isHovered 
                      ? 'bg-purple-600 text-white shadow-[0_0_30px_rgba(168,85,247,0.5)] scale-110' 
                      : 'bg-[#13141f] text-neutral-300 border border-white/10 group-hover:border-purple-500/50 group-hover:text-purple-400'
                  }\`}>
                    <Icon size={22} className="transition-transform group-hover:scale-110" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.14em] text-neutral-400 group-hover:text-white">
                    {stage.label}
                  </span>
                </div>

                {idx < STAGES.length - 1 && (
                  <div className="text-neutral-600 text-sm sm:text-base font-light mb-6">
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="h-10 mt-10 flex items-center justify-center">
          <p className="text-sm text-neutral-400 font-normal transition-opacity duration-300">
            {activeStage 
              ? STAGES.find(s => s.id === activeStage)?.desc 
              : 'One continuous, automated engine that scales your marketing footprint.'
            }
          </p>
        </div>

      </div>
    </section>
  );
};
`, 'utf8');

// Section 4: Built Around Business
fs.writeFileSync('src/components/BuiltAroundBusiness.jsx', `import React from 'react';
import { SparkleIcon } from './SparkleIcon';

export const BuiltAroundBusiness = () => {
  return (
    <section className="py-24 md:py-32 border-t border-white/10 bg-[#090a0f] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        
        <h2 className="text-[38px] sm:text-[48px] lg:text-[56px] font-extrabold text-white tracking-[-0.035em] leading-[1.08] mb-16">
          Built around<br />
          your business.
        </h2>

        <div className="relative w-full max-w-xl mx-auto h-[260px] sm:h-[300px] flex items-center justify-center my-6">
          <div className="absolute w-full h-[180px] sm:h-[220px] rounded-[100%] border border-white/10 -rotate-6 pointer-events-none" />
          <div className="absolute w-[80%] h-[140px] sm:h-[160px] rounded-[100%] border border-purple-500/25 rotate-12 pointer-events-none" />

          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-purple-950/80 border border-purple-500/40 flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.35)] animate-pulse-ring">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#13141f] border border-purple-400/40 shadow-sm flex items-center justify-center">
              <SparkleIcon size={24} className="text-purple-400 animate-spin-slow" />
            </div>
          </div>

          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#13141f] px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-[13px] font-bold text-white shadow-lg cursor-default">
            Your products
          </div>
          <div className="absolute right-0 sm:right-6 top-1/2 -translate-y-1/2 bg-[#13141f] px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-[13px] font-bold text-white shadow-lg cursor-default">
            Your customers
          </div>
          <div className="absolute bottom-4 right-12 sm:right-24 bg-[#13141f] px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-[13px] font-bold text-white shadow-lg cursor-default">
            Your brand
          </div>
          <div className="absolute bottom-4 left-12 sm:left-24 bg-[#13141f] px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-[13px] font-bold text-white shadow-lg cursor-default">
            Your voice
          </div>
          <div className="absolute left-0 sm:left-6 top-1/2 -translate-y-1/2 bg-[#13141f] px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-[13px] font-bold text-white shadow-lg cursor-default">
            Your goals
          </div>
        </div>

        <p className="text-xl sm:text-2xl font-extrabold text-purple-400 tracking-tight mt-12">
          AI Marketing Assistant remembers.
        </p>

      </div>
    </section>
  );
};
`, 'utf8');

// Section 5: Business Changes
fs.writeFileSync('src/components/BusinessChanges.jsx', `import React, { useState } from 'react';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';

export const BusinessChanges = () => {
  const [selectedRec, setSelectedRec] = useState(0);

  const recommendations = [
    {
      id: 0,
      title: 'Increase weekend ad budget',
      desc: 'Engagement is highest on Saturdays.',
      stat: '9.7%',
      growth: '+28% vs last week',
      chartPoints: [
        { day: 'Mon', val: 20 },
        { day: 'Tue', val: 35 },
        { day: 'Wed', val: 25 },
        { day: 'Thu', val: 45 },
        { day: 'Fri', val: 60 },
        { day: 'Sat', val: 95 },
        { day: 'Sun', val: 75 },
      ]
    },
    {
      id: 1,
      title: 'Create new content',
      desc: 'Repurpose top-performing posts.',
      stat: '14.2%',
      growth: '+42% vs last week',
      chartPoints: [
        { day: 'Mon', val: 30 },
        { day: 'Tue', val: 50 },
        { day: 'Wed', val: 65 },
        { day: 'Thu', val: 55 },
        { day: 'Fri', val: 80 },
        { day: 'Sat', val: 88 },
        { day: 'Sun', val: 92 },
      ]
    },
    {
      id: 2,
      title: 'Test a new audience',
      desc: 'Lookalike audience from top customers.',
      stat: '11.8%',
      growth: '+31% vs last week',
      chartPoints: [
        { day: 'Mon', val: 25 },
        { day: 'Tue', val: 40 },
        { day: 'Wed', val: 45 },
        { day: 'Thu', val: 70 },
        { day: 'Fri', val: 65 },
        { day: 'Sat', val: 82 },
        { day: 'Sun', val: 85 },
      ]
    }
  ];

  const active = recommendations[selectedRec];

  return (
    <section className="py-24 md:py-32 border-t border-white/10 bg-[#090a0f] text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left">
            <h2 className="text-[38px] sm:text-[46px] lg:text-[54px] font-extrabold text-white tracking-[-0.035em] leading-[1.08] mb-6">
              Your business changes.<br />
              Your marketing should too.
            </h2>
            <p className="text-[17px] sm:text-[18px] text-neutral-400 font-normal leading-relaxed max-w-[420px]">
              AI analyzes performance and suggests the next best move.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#13141f] rounded-2xl md:rounded-3xl border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.7)] p-6 sm:p-7 text-left">
            <div className="grid sm:grid-cols-2 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              
              <div className="sm:pr-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-neutral-400 block mb-2">Performance overview</span>
                  <div className="mt-2">
                    <span className="text-4xl font-extrabold text-white tracking-tight">{active.stat}</span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-neutral-400">Engagement rate</span>
                      <span className="text-xs font-bold text-emerald-400 flex items-center">
                        <ArrowUpRight size={13} />
                        {active.growth}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <div className="h-28 w-full relative flex items-end">
                    <svg className="w-full h-24 overflow-visible" viewBox="0 0 280 80">
                      <defs>
                        <linearGradient id="chartGradDark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d={\`M 0 80 \${active.chartPoints.map((p, i) => \`L \${i * 45} \${80 - (p.val * 0.7)}\`).join(' ')} L 270 80 Z\`}
                        fill="url(#chartGradDark)"
                      />
                      <path
                        d={\`M 0 \${80 - (active.chartPoints[0].val * 0.7)} \${active.chartPoints.map((p, i) => \`L \${i * 45} \${80 - (p.val * 0.7)}\`).join(' ')}\`}
                        fill="none"
                        stroke="#a855f7"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {active.chartPoints.map((p, i) => (
                        <circle
                          key={i}
                          cx={i * 45}
                          cy={80 - (p.val * 0.7)}
                          r="3"
                          fill="#ffffff"
                          stroke="#a855f7"
                          strokeWidth="2"
                        />
                      ))}
                    </svg>
                  </div>

                  <div className="flex justify-between text-[10px] text-neutral-500 font-medium mt-2 pt-2 border-t border-white/10">
                    {active.chartPoints.map((p, i) => (
                      <span key={i}>{p.day}</span>
                    ))}
                  </div>
                </div>

              </div>

              <div className="pt-6 sm:pt-0 sm:pl-6">
                <span className="text-xs font-bold text-white block mb-3">AI recommends</span>
                <div className="space-y-2.5">
                  {recommendations.map((rec, idx) => {
                    const isSelected = selectedRec === idx;
                    return (
                      <div
                        key={rec.id}
                        onClick={() => setSelectedRec(idx)}
                        className={\`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between \${
                          isSelected
                            ? 'bg-purple-950/80 border-purple-500/60 shadow-lg'
                            : 'bg-[#181926] border-white/10 hover:border-white/20'
                        }\`}
                      >
                        <div>
                          <p className={\`text-xs font-bold \${isSelected ? 'text-purple-200' : 'text-white'}\`}>
                            {rec.title}
                          </p>
                          <p className="text-[11px] text-neutral-400 font-normal mt-0.5">
                            {rec.desc}
                          </p>
                        </div>
                        <div className={\`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ml-2 \${
                          isSelected ? 'bg-purple-600 text-white' : 'text-neutral-500'
                        }\`}>
                          {isSelected ? <Check size={13} /> : <ArrowRight size={13} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
`, 'utf8');

// Section 6: Pricing
fs.writeFileSync('src/components/PricingSection.jsx', `import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export const PricingSection = ({ onNavigate }) => {
  const [currency, setCurrency] = useState('GHS');

  const rates = {
    GHS: { free: '0', starter: '99', growth: '249', pro: '499', symbol: 'GHS ' },
    USD: { free: '0', starter: '29', growth: '69', pro: '149', symbol: '$' },
    EUR: { free: '0', starter: '27', growth: '65', pro: '139', symbol: '€' }
  };

  const currentRate = rates[currency] || rates.GHS;

  const tiers = [
    {
      name: 'Free',
      price: currentRate.free,
      description: 'For getting started with AI marketing.',
      isRecommended: false,
      cta: 'Get started'
    },
    {
      name: 'Starter',
      price: currentRate.starter,
      period: '/ month',
      description: 'Everything you need to get moving.',
      isRecommended: false,
      cta: 'Get started'
    },
    {
      name: 'Growth',
      price: currentRate.growth,
      period: '/ month',
      description: 'Advanced tools for growing businesses.',
      isRecommended: true,
      cta: 'Get started'
    },
    {
      name: 'Pro',
      price: currentRate.pro,
      period: '/ month',
      description: 'For teams that want maximum impact.',
      isRecommended: false,
      cta: 'Get started'
    }
  ];

  return (
    <section id="pricing" className="py-24 md:py-32 border-t border-white/10 bg-[#090a0f] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-3 text-left">
            <h2 className="text-[38px] sm:text-[46px] lg:text-[54px] font-extrabold text-white tracking-[-0.035em] leading-[1.08] mb-6">
              Simple<br />
              pricing.<br />
              Serious<br />
              impact.
            </h2>
            
            <div className="inline-flex items-center gap-1 bg-[#13141f] border border-white/10 p-1 rounded-xl mt-2">
              {['GHS', 'USD', 'EUR'].map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={\`text-xs font-bold px-3 py-1 rounded-lg transition cursor-pointer \${
                    currency === cur 
                      ? 'bg-white text-black shadow-sm' 
                      : 'text-neutral-400 hover:text-white'
                  }\`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            {tiers.map((tier, idx) => (
              <div 
                key={idx}
                className={\`relative rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 \${
                  tier.isRecommended
                    ? 'bg-[#181926] border-2 border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.3)] ring-1 ring-purple-500/50'
                    : 'bg-[#13141f] border border-white/10 hover:border-white/20'
                }\`}
              >
                {tier.isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-600 text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-md tracking-wide">
                      Recommended
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="text-base font-extrabold text-white tracking-tight mb-4">{tier.name}</h3>
                  <div className="mb-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-white">
                        {currentRate.symbol}{tier.price}
                      </span>
                      {tier.period && (
                        <span className="text-xs text-neutral-400 font-normal">{tier.period}</span>
                      )}
                    </div>
                  </div>
                  <p className="text-[13px] text-neutral-400 font-normal leading-relaxed mb-6 min-h-[40px]">
                    {tier.description}
                  </p>
                </div>

                <div>
                  {tier.isRecommended ? (
                    <button 
                      onClick={() => onNavigate('get-started', tier.name)}
                      className="w-full bg-white hover:bg-neutral-200 text-black text-xs font-extrabold py-3 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>{tier.cta}</span>
                      <ArrowRight size={13} />
                    </button>
                  ) : (
                    <button 
                      onClick={() => onNavigate('get-started', tier.name)}
                      className="w-full text-left text-xs font-bold text-neutral-300 hover:text-white flex items-center gap-1 py-1 transition group cursor-pointer"
                    >
                      <span>{tier.cta}</span>
                      <span className="transition-transform group-hover:translate-x-1">→</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
`, 'utf8');

// Section 7: Final CTA
fs.writeFileSync('src/components/FinalCTA.jsx', `import React from 'react';

export const FinalCTA = ({ onNavigate }) => {
  return (
    <section className="py-32 md:py-48 border-t border-white/10 bg-[#090a0f] text-white text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-radial from-purple-900/15 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-[48px] sm:text-[64px] lg:text-[78px] font-extrabold text-white tracking-[-0.04em] leading-[1.02] mb-6">
          Ready to<br />
          market smarter?
        </h2>

        <p className="text-lg sm:text-xl text-neutral-400 font-normal leading-relaxed max-w-lg mx-auto mb-10">
          Your business has enough to do.<br />
          Let AI handle the marketing.
        </p>

        <div>
          <button 
            onClick={() => onNavigate('get-started')}
            className="bg-white hover:bg-neutral-200 text-black font-extrabold text-base px-10 py-4 rounded-full transition-all duration-200 cursor-pointer shadow-[0_0_40px_rgba(255,255,255,0.25)] active:scale-95"
          >
            Get started
          </button>
        </div>
      </div>
    </section>
  );
};
`, 'utf8');

// Footer
fs.writeFileSync('src/components/Footer.jsx', `import React from 'react';
import { SparkleIcon } from './SparkleIcon';

export const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#090a0f] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <SparkleIcon size={16} className="text-purple-400" />
          <span className="text-sm font-bold text-white tracking-tight">AI Marketing Assistant</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-neutral-400">
          <a href="#hero" className="hover:text-white transition">Product</a>
          <a href="#how-it-works" className="hover:text-white transition">How it works</a>
          <a href="#pricing" className="hover:text-white transition">Pricing</a>
          <a href="#" className="hover:text-white transition">Resources</a>
          <a href="#" className="hover:text-white transition">Company</a>
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="#" className="hover:text-white transition">Terms</a>
        </div>
      </div>
    </footer>
  );
};
`, 'utf8');

console.log('Landing components updated to dark graphite titanium');
