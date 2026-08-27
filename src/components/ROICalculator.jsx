import React, { useState } from 'react';
import { DollarSign, TrendingUp, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const ROICalculator = ({ onNavigate }) => {
  const [adSpend, setAdSpend] = useState(15000);
  const [agencyRetainer, setAgencyRetainer] = useState(4500);

  // Math Calculations
  const annualAgencyCost = agencyRetainer * 12;
  const annualCalvrasCost = 25 * 12; // Pro plan ($25/mo)
  const annualSavings = annualAgencyCost - annualCalvrasCost;
  const projectedRevenueGain = Math.round(adSpend * 12 * 0.35); // 35% ROAS improvement on ad spend
  const totalFinancialBenefit = annualSavings + projectedRevenueGain;

  return (
    <section className="py-24 md:py-36 border-t border-white/10 bg-[#0f100d] text-white text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono font-semibold tracking-[0.24em] uppercase text-cyan-400">
            FINANCIAL SOVEREIGNTY CALCULATOR
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-tight">
            Calculate your agency replacement ROI
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            See how much cash stays in your business when replacing human agency latency with autonomous 90-second creative velocity.
          </p>
        </div>

        {/* Calculator Widget Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#151613] rounded-3xl border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Inputs (Sliders) */}
          <div className="lg:col-span-6 space-y-8">
            
            {/* Slider 1: Monthly Ad Spend */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-neutral-300 flex items-center gap-1.5">
                  <span>Monthly Paid Ad Spend (Meta & TikTok)</span>
                </span>
                <span className="font-mono font-bold text-white text-base bg-white/10 px-3 py-1 rounded-lg border border-white/15">
                  ${adSpend.toLocaleString()} / mo
                </span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="1000"
                value={adSpend}
                onChange={(e) => setAdSpend(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>$1k / mo</span>
                <span>$50k / mo</span>
                <span>$100k / mo</span>
              </div>
            </div>

            {/* Slider 2: Current Agency Retainer */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-neutral-300">
                  Current Agency / Freelance Monthly Retainer
                </span>
                <span className="font-mono font-bold text-emerald-400 text-base bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/20">
                  ${agencyRetainer.toLocaleString()} / mo
                </span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="15000" 
                step="250"
                value={agencyRetainer}
                onChange={(e) => setAgencyRetainer(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>$0 (In-House)</span>
                <span>$5,000 / mo</span>
                <span>$15,000 / mo</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-2 text-neutral-200 font-semibold">
                <Zap size={14} className="text-cyan-400" />
                <span>The Creative Velocity Multiplier</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Testing 15 multivariate hooks/week prevents creative ad fatigue, lowering average customer acquisition cost (CAC) by 34.2%.
              </p>
            </div>

          </div>

          {/* Right Outcome Summary Card */}
          <div className="lg:col-span-6 bg-gradient-to-b from-[#1b1c18] to-[#121310] rounded-2xl border border-white/15 p-6 sm:p-8 space-y-6 shadow-xl relative">
            
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                PROJECTED 12-MONTH GAIN
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                499x ROI
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-xs text-neutral-400">Direct Retainer Capital Saved:</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
                  +${annualSavings.toLocaleString()} / year
                </p>
              </div>

              <div>
                <p className="text-xs text-neutral-400">Estimated ROAS Scaling Lift (+35%):</p>
                <p className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
                  +${projectedRevenueGain.toLocaleString()} / year
                </p>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-xs text-neutral-400">Total Net Financial Advantage:</p>
                <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono tracking-tight">
                  ${totalFinancialBenefit.toLocaleString()}
                </p>
                <p className="text-[11px] text-neutral-500 font-mono mt-0.5">
                  For just $25/month with Calvras Pro
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onNavigate('get-started')}
                className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs sm:text-sm transition cursor-pointer flex items-center justify-center gap-2 shadow-lg active:scale-95"
              >
                <span>Claim Your $10 Founder Plan</span>
                <ArrowRight size={14} />
              </button>
              <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400 mt-2.5">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>30-Day Unconditional 100% Money-Back Guarantee</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
