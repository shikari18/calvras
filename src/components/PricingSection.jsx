import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export const PricingSection = ({ onNavigate }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 md:py-36 border-t border-white/10 bg-[#1c1c1c] text-white">
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

          {/* Monthly / Annual Toggle */}
          <div className="pt-3 flex items-center justify-center gap-3">
            <span className={`text-xs ${!isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>
              Pay monthly
            </span>
            <button
              type="button"
              onClick={() => setIsAnnual(!isAnnual)}
              className={`w-11 h-6 rounded-full transition-colors cursor-pointer p-0.5 flex items-center ${
                isAnnual ? 'bg-[#ff5e28]' : 'bg-neutral-800'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full transition-transform ${
                  isAnnual ? 'translate-x-5 bg-white' : 'translate-x-0 bg-neutral-400'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs ${isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>
                Pay annually
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#ff5e28] bg-[#ff5e28]/10 px-2 py-0.5 rounded-full border border-[#ff5e28]/20">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* 3 Paid Luxury Cards (Starting from $10) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          
          {/* 1. BASIC PLAN ($10/mo) */}
          <div className="bg-[#181916] hover:bg-[#1e1f1b] rounded-3xl border border-white/10 p-7 flex flex-col justify-between space-y-6 transition-all duration-200 hover:border-white/20 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Basic</h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    For creators & founders launching paid marketing.
                  </p>
                </div>
                <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  Starter
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white">
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

            <div className="pt-4">
              <button
                onClick={() => onNavigate('get-started', 'Basic')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md bg-[#282924] hover:bg-[#343630] text-white border border-white/10"
              >
                <span>Choose Basic</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* 2. PRO GROWTH PLAN ($25/mo - RECOMMENDED) */}
          <div className="bg-[#1b1a24] rounded-3xl border-2 border-[#8057ff] p-7 flex flex-col justify-between space-y-6 relative shadow-[0_0_50px_rgba(128,87,255,0.2)]">
            
            {/* Recommended Badge */}
            <div className="absolute -top-3 right-6 bg-[#8057ff] text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
              Recommended
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5 tracking-tight">
                    <span>Pro Growth</span>
                    <Sparkles size={16} className="text-[#8057ff]" />
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    For scaling brands & media buyers maximizing ROAS.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white">
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
                <div className="flex items-center gap-2 text-[#a88aff] font-semibold">
                  <span>✦</span>
                  <span>3,500 marketing credits / month</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#a88aff] shrink-0 mt-0.5" />
                  <span>Autonomous media buying & ASC+ scaling</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#a88aff] shrink-0 mt-0.5" />
                  <span>Meta 3:2:2 dynamic testing blueprints</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#a88aff] shrink-0 mt-0.5" />
                  <span>Campaign Doctor diagnostics & live ROAS audits</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#a88aff] shrink-0 mt-0.5" />
                  <span>Priority neural compute & instant generation</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('get-started', 'Pro')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md bg-white hover:bg-neutral-100 text-neutral-950"
              >
                <span>Upgrade to Pro</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* 3. AGENCY & SCALE PLAN ($48/mo - REDESIGNED 3RD CARD) */}
          <div className="bg-[#191922] hover:bg-[#1f1e2b] rounded-3xl border border-white/15 p-7 flex flex-col justify-between space-y-6 transition-all duration-200 hover:border-white/30 shadow-xl relative">
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Agency & Scale</h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    For high-volume agencies & multi-brand growth.
                  </p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#38bdf8] bg-[#38bdf8]/10 px-2.5 py-1 rounded-full border border-[#38bdf8]/30">
                  Unlimited
                </span>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white">
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
                <div className="flex items-center gap-2 text-[#38bdf8] font-semibold">
                  <span>✦</span>
                  <span>10,000 marketing credits / month</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Multi-brand & unlimited client workspace</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>White-label client PDF & Notion reporting</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Autonomous 24/7 ROAS pacing & CPA guards</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#38bdf8] shrink-0 mt-0.5" />
                  <span>Dedicated growth strategist & 24/7 SLA</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('get-started', 'Agency')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-[0_4px_25px_rgba(99,102,241,0.4)] bg-gradient-to-r from-[#6366f1] to-[#4f46e5] hover:from-[#4f46e5] hover:to-[#4338ca] text-white"
              >
                <span>Choose Agency</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
