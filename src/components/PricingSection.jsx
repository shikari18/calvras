import React, { useState } from 'react';
import { ArrowRight, Check, Sparkles } from 'lucide-react';

export const PricingSection = ({ onNavigate }) => {
  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedProCredits, setSelectedProCredits] = useState('2k');

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

        {/* 3 Dark Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          
          {/* 1. FREE PLAN */}
          <div className="bg-[#181916] hover:bg-[#1e1f1b] rounded-3xl border border-white/10 p-7 flex flex-col justify-between space-y-6 transition-all duration-200 hover:border-white/20 shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Free</h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    For exploring AI marketing features & frameworks.
                  </p>
                </div>
                <span className="text-[9px] font-mono font-semibold uppercase tracking-wider text-neutral-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                  Starter
                </span>
              </div>

              <div>
                <span className="text-3xl font-extrabold text-white">$0</span>
                <span className="text-xs text-neutral-500 ml-1.5 font-mono">/ forever</span>
              </div>

              <div className="pt-2 text-xs text-neutral-300 space-y-2.5 border-t border-white/10">
                <div className="flex items-center gap-2 text-neutral-300 font-semibold">
                  <span className="text-neutral-400">✧</span>
                  <span>Free starter marketing credits</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>3 ad copy & campaign generations daily</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>30-day multi-channel roadmap builder</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>Core copywriting & direct-response templates</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('get-started', 'Free')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md bg-[#282924] hover:bg-[#343630] text-white border border-white/10"
              >
                <span>Get started free</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* 2. BASIC PLAN */}
          <div className="bg-[#1a1b17] hover:bg-[#20221c] rounded-3xl border border-white/15 p-7 flex flex-col justify-between space-y-6 transition-all duration-200 hover:border-white/30 shadow-xl relative">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Basic</h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    For growing brands & creators scaling traffic.
                  </p>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#ff5e28] bg-[#ff5e28]/10 px-2.5 py-1 rounded-full border border-[#ff5e28]/30">
                  Popular
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
                <div className="flex items-center gap-2 text-[#ff5e28] font-semibold">
                  <span>✦</span>
                  <span>1,000 marketing credits per month</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#ff5e28] shrink-0 mt-0.5" />
                  <span>Unlimited ad copy variations & angles</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#ff5e28] shrink-0 mt-0.5" />
                  <span>Advantage+ (ASC+) & Meta 3:2:2 ad testing</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#ff5e28] shrink-0 mt-0.5" />
                  <span>Full email & SMS funnel automations</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#ff5e28] shrink-0 mt-0.5" />
                  <span>Landing page teardowns & CRO playbooks</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('get-started', 'Basic')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-md bg-white hover:bg-neutral-100 text-neutral-950"
              >
                <span>Upgrade to Basic</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* 3. PRO PLAN */}
          <div className="bg-[#1b1a24] rounded-3xl border-2 border-[#8057ff] p-7 flex flex-col justify-between space-y-6 relative shadow-[0_0_50px_rgba(128,87,255,0.2)]">
            
            {/* Recommended Badge */}
            <div className="absolute -top-3 right-6 bg-[#8057ff] text-white text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-lg">
              Recommended
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-1.5 tracking-tight">
                    <span>Pro</span>
                    <Sparkles size={16} className="text-[#8057ff]" />
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 min-h-[32px]">
                    For scaling brands & agencies maximizing ROAS.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-extrabold text-white">
                    ${
                      selectedProCredits === '2k' ? (isAnnual ? '13' : '16') :
                      selectedProCredits === '4k' ? (isAnnual ? '22' : '28') :
                      selectedProCredits === '8k' ? (isAnnual ? '42' : '52') :
                      (isAnnual ? '76' : '96')
                    }
                  </span>
                  <span className="text-xs text-neutral-400 font-normal">
                    / month
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                    billed annually 20% off
                  </p>
                )}
              </div>

              {/* Credit Tier Selector */}
              <div className="grid grid-cols-4 gap-1 bg-[#13121a] p-1.5 rounded-xl border border-[#8057ff]/30">
                {['2k', '4k', '8k', '16k'].map((tier) => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedProCredits(tier)}
                    className={`py-1 rounded-lg text-[10px] font-bold transition cursor-pointer ${
                      selectedProCredits === tier
                        ? 'bg-[#8057ff] text-white shadow-sm'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>

              <div className="pt-2 text-xs text-neutral-300 space-y-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-[#a88aff] font-semibold">
                  <span>✦</span>
                  <span>{selectedProCredits === '2k' ? '2,000' : selectedProCredits === '4k' ? '4,000' : selectedProCredits === '8k' ? '8,000' : '16,000'} marketing credits/mo</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#a88aff] shrink-0 mt-0.5" />
                  <span>Autonomous media buying & ad scaling</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#a88aff] shrink-0 mt-0.5" />
                  <span>Campaign Doctor diagnostics & live ROAS audits</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#a88aff] shrink-0 mt-0.5" />
                  <span>Multi-channel roadmaps (Meta, TikTok, Google)</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check size={13} className="text-[#a88aff] shrink-0 mt-0.5" />
                  <span>Priority neural compute & 24/7 strategic support</span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onNavigate('get-started', 'Pro')}
                className="w-full py-3 px-4 rounded-xl text-xs font-bold transition cursor-pointer flex items-center justify-center gap-2 active:scale-95 shadow-[0_4px_25px_rgba(128,87,255,0.45)] bg-gradient-to-r from-[#8057ff] to-[#6d28d9] hover:from-[#7245ff] hover:to-[#5b21b6] text-white"
              >
                <span>Upgrade to Pro</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
