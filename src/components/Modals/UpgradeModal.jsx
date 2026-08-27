import React, { useState } from 'react';
import { X, Check, Zap, Sparkles, Shield, Cpu, ArrowRight } from 'lucide-react';

export default function UpgradeModal({ isOpen, onClose }) {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [upgraded, setUpgraded] = useState(false);

  if (!isOpen) return null;

  const handleSelectPlan = () => {
    setUpgraded(true);
    setTimeout(() => {
      setUpgraded(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#121217] border border-[#2c2c3b] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Glowing background highlights */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#1c1c24] hover:bg-[#252533] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-lg mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-3">
            <Sparkles size={13} />
            <span>SUPERCHARGE YOUR WORKFLOW</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Upgrade your CODED plan
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2">
            Unlock infinite multi-agent swarm computing, ultra-low latency reasoning models, and autonomous code refactoring.
          </p>

          {/* Billing Switcher */}
          <div className="inline-flex items-center p-1 bg-[#1a1a24] rounded-full border border-[#2a2a38] mt-5">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all ${
                billingCycle === 'monthly' ? 'bg-blue-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 ${
                billingCycle === 'annual' ? 'bg-blue-600 text-white shadow' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.2 rounded-full border border-emerald-500/30">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Free Tier */}
          <div className="p-5 rounded-2xl bg-[#171720] border border-[#262633] flex flex-col justify-between">
            <div>
              <div className="text-sm font-bold text-neutral-300">Free Starter</div>
              <div className="text-2xl font-black text-white mt-2">$0<span className="text-xs font-normal text-neutral-500">/mo</span></div>
              <p className="text-[11px] text-neutral-400 mt-2">Essential AI tools for personal learning and small scripts.</p>

              <div className="mt-5 space-y-2.5 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>Instant: High model access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>Standard execution sandbox</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-emerald-400" />
                  <span>3 active projects</span>
                </div>
              </div>
            </div>

            <button
              disabled
              className="w-full mt-6 py-2 rounded-xl bg-[#20202c] text-neutral-500 text-xs font-semibold cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Pro Developer (Highlighted) */}
          <div className="relative p-5 rounded-2xl bg-gradient-to-b from-[#1b2238] to-[#141829] border-2 border-blue-500/60 flex flex-col justify-between shadow-[0_0_30px_rgba(59,130,246,0.18)]">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
              Most Popular
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-blue-400">
                <Zap size={15} />
                <span>Pro Developer</span>
              </div>
              <div className="text-2xl font-black text-white mt-2">
                {billingCycle === 'monthly' ? '$20' : '$16'}
                <span className="text-xs font-normal text-neutral-400">/mo</span>
              </div>
              <p className="text-[11px] text-neutral-300 mt-2">For engineers and founders building production software.</p>

              <div className="mt-5 space-y-2.5 text-xs text-neutral-200">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-blue-400" />
                  <span>Unlimited Reasoning Pro & Deep Think</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-blue-400" />
                  <span>Multi-Agent Swarm Orchestration</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-blue-400" />
                  <span>Deep Research & 100+ Live Plugins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-blue-400" />
                  <span>Fast GPU execution sandbox</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSelectPlan}
              className="w-full mt-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5"
            >
              {upgraded ? (
                <span>Activated! 🎉</span>
              ) : (
                <>
                  <span>Upgrade to Pro</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>

          {/* Enterprise Swarm */}
          <div className="p-5 rounded-2xl bg-[#171720] border border-[#262633] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-sm font-bold text-purple-400">
                <Cpu size={15} />
                <span>Enterprise Swarm</span>
              </div>
              <div className="text-2xl font-black text-white mt-2">
                {billingCycle === 'monthly' ? '$80' : '$64'}
                <span className="text-xs font-normal text-neutral-500">/mo</span>
              </div>
              <p className="text-[11px] text-neutral-400 mt-2">Dedicated cluster inference, custom skills, SLA guarantee.</p>

              <div className="mt-5 space-y-2.5 text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-purple-400" />
                  <span>Unlimited Swarm parallel nodes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-purple-400" />
                  <span>Zero-retention private security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={14} className="text-purple-400" />
                  <span>Custom fine-tuned agent weights</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleSelectPlan}
              className="w-full mt-6 py-2 rounded-xl bg-[#222230] hover:bg-[#2c2c3d] text-white text-xs font-semibold transition-colors"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
