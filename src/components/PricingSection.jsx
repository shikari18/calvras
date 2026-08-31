import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles, ShieldCheck, Zap } from 'lucide-react';

export const PricingSection = ({ onNavigate }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-36 border-t border-white/10 bg-[#0e0f0c] text-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <p className="text-xs font-mono font-semibold tracking-[0.24em] uppercase text-cyan-400">
            TRANSPARENT PRICING • ZERO CONTRACTS
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight">
            Plans built for maximum scale
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Choose the plan that fits your growth pace. Every plan is backed by our unconditional 30-day money-back guarantee.
          </p>

          {/* Monthly / Annual Toggle */}
          <div className="pt-3 flex items-center justify-center gap-3">
            <span className={`text-xs ${!isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>
              Pay monthly
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-12 h-6 rounded-full transition-colors cursor-pointer p-0.5 flex items-center ${
                isAnnual ? 'bg-cyan-500' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  isAnnual ? 'translate-x-6 bg-white' : 'translate-x-0 bg-neutral-400'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs ${isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>
                Pay annually
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                Save 20% + 1,000 Bonus Credits
              </span>
            </div>
          </div>
        </div>

        {/* 3 Paid Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* 1. BASIC PLAN ($10/mo) */}
          <div className="bg-[#141512] hover:bg-[#181915] rounded-3xl border border-white/10 p-7 flex flex-col justify-between space-y-6 transition-all duration-200 hover:border-white/20 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Basic</h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    For solo founders launching paid ad campaigns.
                  </p>
                </div>
                <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  Starter
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    ${isAnnual ? '8' : '10'}
                  </span>
                  <span className="text-xs text-neutral-400 font-normal">
                    / month
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    billed annually $96
                  </p>
                )}
              </div>

              <div className="pt-2 text-xs text-neutral-300 space-y-2.5 border-t border-white/10">
                <div className="flex items-center gap-2 text-neutral-200 font-semibold">
                  <span className="text-emerald-400">✦</span>
                  <span>1,000 marketing credits / month</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Full-funnel 30-day campaign roadmaps</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Unlimited ad copy variations & hooks</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Klaviyo & WhatsApp retention sequences</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Landing page teardowns & CRO frameworks</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <button
                onClick={() => onNavigate('get-started', 'Basic')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md bg-[#242520] hover:bg-[#2e3029] text-white border border-white/10"
              >
                <span>Choose Basic</span>
                <ArrowRight size={13} />
              </button>
              <p className="text-[10px] text-neutral-500 text-center font-mono">
                🔒 30-Day Money-Back Guarantee
              </p>
            </div>
          </div>

          {/* 2. PRO GROWTH PLAN ($25/mo - RECOMMENDED WITH CYAN/PURPLE GLOW) */}
          <div className="bg-[#171822] rounded-3xl border-2 border-cyan-400 p-7 flex flex-col justify-between space-y-6 relative shadow-[0_0_50px_rgba(6,182,212,0.25)]">
            
            {/* Recommended Badge */}
            <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1">
              <Zap size={11} />
              <span>Recommended</span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5 tracking-tight">
                    <span>Pro Growth</span>
                    <Sparkles size={16} className="text-cyan-400" />
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    For scaling brands & media buyers maximizing ROAS.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    ${isAnnual ? '20' : '25'}
                  </span>
                  <span className="text-xs text-neutral-400 font-normal">
                    / month
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    billed annually $240 (Save 20%)
                  </p>
                )}
              </div>

              <div className="pt-2 text-xs text-neutral-300 space-y-2.5 border-t border-white/10">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                  <span>✦</span>
                  <span>10,000 marketing credits / month</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>Direct 1-Click Meta & TikTok API Sync</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>The Complete 500 Viral Hook Swipe Vault</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>Campaign Doctor live ROAS & CAC diagnostics</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span>Dedicated GPU edge compute & sub-second speed</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <button
                onClick={() => onNavigate('get-started', 'Pro')}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-xl bg-white hover:bg-neutral-100 text-neutral-950"
              >
                <span>Upgrade to Pro Growth</span>
                <ArrowRight size={13} />
              </button>
              <p className="text-[10px] text-cyan-400 text-center font-mono font-medium">
                ⚡ Includes 1,000 bonus credits today
              </p>
            </div>
          </div>

          {/* 3. AGENCY & SCALE PLAN ($48/mo) */}
          <div className="bg-[#15161c] hover:bg-[#1a1c24] rounded-3xl border border-white/15 p-7 flex flex-col justify-between space-y-6 transition-all duration-200 hover:border-white/30 shadow-xl relative">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Agency & Scale</h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    For high-volume agencies & multi-brand growth.
                  </p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/30">
                  Unlimited
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white font-mono">
                    ${isAnnual ? '39' : '48'}
                  </span>
                  <span className="text-xs text-neutral-400 font-normal">
                    / month
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    billed annually $468 (Save 20%)
                  </p>
                )}
              </div>

              <div className="pt-2 text-xs text-neutral-300 space-y-2.5 border-t border-white/10">
                <div className="flex items-center gap-2 text-purple-300 font-semibold">
                  <span>✦</span>
                  <span>50,000 marketing credits / month</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-purple-400 shrink-0 mt-0.5" />
                  <span>Unlimited client workspaces & team seats</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-purple-400 shrink-0 mt-0.5" />
                  <span>White-label client PDF & Notion reporting</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-purple-400 shrink-0 mt-0.5" />
                  <span>24/7 Autonomous ROAS pacing & CPA guardrails</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-purple-400 shrink-0 mt-0.5" />
                  <span>Dedicated growth strategist & 4-min SLA</span>
                </div>
              </div>
            </div>

            <div className="pt-4 space-y-2">
              <button
                onClick={() => onNavigate('get-started', 'Agency')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white"
              >
                <span>Choose Agency</span>
                <ArrowRight size={13} />
              </button>
              <p className="text-[10px] text-neutral-500 text-center font-mono">
                🔒 30-Day Money-Back Guarantee
              </p>
            </div>
          </div>

        </div>

        {/* Guarantee Spotlight Box */}
        <div className="max-w-4xl mx-auto p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-purple-500/10 border border-emerald-500/30 flex flex-col sm:flex-row items-center gap-6 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/30">
            <ShieldCheck size={32} />
          </div>
          <div className="space-y-1.5 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <span>The 30-Day Unconditional 100% Money-Back Covenant</span>
            </h4>
            <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed">
              If Calvras doesn't help you launch campaigns faster, lower your Meta/TikTok CPA, or replace your agency retainers within 30 days, 
              simply click cancel in your settings for an instant 100% refund. Zero questions asked. You keep all generated assets and swipe files.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
