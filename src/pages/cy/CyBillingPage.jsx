import React, { useState } from 'react';
import { X, Check, Sparkles, CreditCard } from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import confetti from 'canvas-confetti';

export const CyBillingPage = ({ userName = 'SHIKARI', onSelectTab }) => {
  const { credits, addCredits } = useMarketing();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const handleSelectTier = (tierName, creditAmount) => {
    addCredits(creditAmount, tierName);
    setShowUpgradeModal(false);
    try { confetti({ particleCount: 70, spread: 70 }); } catch (err) {}
  };

  const currentPlan = credits?.plan || 'Starter';
  const creditsRemaining = credits?.remaining ?? 100;
  const creditsUsed = credits?.used ?? 0;
  const totalCredits = creditsRemaining + creditsUsed;

  const tiers = [
    {
      id: 'starter',
      name: 'Starter',
      priceGhs: '100',
      credits: 100,
      badge: 'STARTER',
      desc: 'Ideal for early-stage brands with Apple-grade AI image creatives & copy.',
      features: [
        '100 AI Strategy & Campaign Credits',
        '🎨 Apple-Grade AI Image Generation (Flux.1)',
        'High-converting ad copy & caption generator',
        'WhatsApp broadcast builder with MoMo triggers',
        'Standard LLM speed & strategy memory'
      ]
    },
    {
      id: 'growth',
      name: 'Growth',
      priceGhs: '250',
      credits: 250,
      badge: 'RECOMMENDED',
      desc: 'Unlocks full access to your social media accounts & live video feeds.',
      features: [
        '250 AI Strategy & Campaign Credits',
        '🔓 Access to Social Media (TikTok, Instagram, X, Facebook)',
        '🎨 Apple-Grade AI Image Generation included',
        'Live video view counts & hook retention diagnostics',
        'Full multi-channel campaign planner & competitor intelligence',
        'Priority model inference queue'
      ]
    },
    {
      id: 'scale',
      name: 'Scale Pro',
      priceGhs: '400',
      credits: 400,
      badge: 'ENTERPRISE',
      desc: 'Maximum throughput with real AI Video Generation & autonomous agents.',
      features: [
        '400 AI Strategy & Campaign Credits',
        '🎥 Real AI Video Generation (TikTok/Reels B-Roll)',
        '🔓 Unlimited Social Media Profile Integrations',
        '🎨 Unlimited Apple-Grade AI Image Generation',
        'Autonomous marketing workflows & agents',
        '24/7 dedicated creative copilot'
      ]
    }
  ];

  return (
    <div className="flex-1 min-h-screen bg-white p-6 sm:p-10 font-sans antialiased text-neutral-900 select-none text-left overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6 pt-2 sm:pt-4">
        
        {/* Title Header */}
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
            Billing & Plans
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            Credits, plans, and balance for <strong>{userName}'s Workspace</strong>.
          </p>
        </div>

        {/* Current Plan Card */}
        <div className="bg-white border border-[#e5e5e7] rounded-2xl p-6 shadow-2xs space-y-4">
          <span className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider block">
            Current Plan
          </span>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">{currentPlan} Plan</h3>
              <p className="text-xs text-neutral-500 font-medium mt-0.5">
                5 credits are used per AI marketing prompt or generated campaign.
              </p>
            </div>

            <button
              onClick={() => setShowUpgradeModal(true)}
              className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs border border-purple-500/30 ring-2 ring-purple-500/20 active:scale-95"
            >
              Upgrade / Top-Up Credits
            </button>
          </div>
        </div>

        {/* Credits Status Card */}
        <div className="bg-white border border-[#e5e5e7] rounded-2xl p-6 shadow-2xs space-y-4">
          <span className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider block">
            Credit Balance
          </span>

          <div className="flex items-center gap-16">
            <div>
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">REMAINING</span>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-950">{creditsRemaining.toLocaleString()}</span>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">USED</span>
              <span className="text-2xl sm:text-3xl font-bold text-neutral-950">{creditsUsed.toLocaleString()}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-neutral-950 rounded-full" 
              style={{ width: `${Math.min(100, (creditsUsed / Math.max(1, totalCredits)) * 100)}%` }} 
            />
          </div>
        </div>

        {/* 3 Tier Plans Section */}
        <div className="space-y-3 pt-2">
          <h2 className="text-base font-bold text-neutral-900">Available Plans</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tiers.map((tier) => (
              <div 
                key={tier.id}
                className="border border-neutral-200 hover:border-neutral-900 rounded-2xl p-5 flex flex-col justify-between space-y-4 bg-white transition shadow-2xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">{tier.name}</span>
                    <span className="text-[9.5px] font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {tier.badge}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-neutral-950">GHS {tier.priceGhs}</span>
                      <span className="text-xs text-neutral-400">/month</span>
                    </div>
                    <span className="text-xs text-emerald-700 font-bold block mt-0.5">
                      +{tier.credits} Credits included
                    </span>
                  </div>

                  <p className="text-[11.5px] text-neutral-500 leading-relaxed">
                    {tier.desc}
                  </p>

                  <div className="space-y-1.5 text-xs text-neutral-700 pt-2 border-t border-neutral-100">
                    {tier.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleSelectTier(tier.name, tier.credits)}
                  className="w-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer shadow-xs active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <CreditCard size={13} />
                  <span>Choose {tier.name} (GHS {tier.priceGhs})</span>
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-neutral-200 space-y-6 relative animate-in zoom-in-95 duration-150 text-left">
            
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-neutral-700 p-1.5 rounded-full hover:bg-neutral-100 transition cursor-pointer"
            >
              <X size={16} />
            </button>

            <div>
              <h2 className="text-lg font-bold text-neutral-950">Select Your Calvras Plan</h2>
              <p className="text-xs text-neutral-500 mt-1 max-w-xl leading-relaxed">
                Choose the credit package that fits your marketing volume. 5 credits are consumed per strategy prompt.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tiers.map((tier) => (
                <div 
                  key={tier.id}
                  className="border border-neutral-200 rounded-2xl p-5 flex flex-col justify-between space-y-4 bg-white hover:border-neutral-900 transition"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-900">{tier.name}</span>
                      <span className="text-[9px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded-full uppercase">
                        {tier.badge}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-extrabold text-neutral-950">GHS {tier.priceGhs}</span>
                        <span className="text-xs text-neutral-400">/month</span>
                      </div>
                      <span className="text-xs text-emerald-700 font-bold block mt-0.5">
                        +{tier.credits} Credits
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                      {tier.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-1.5">
                          <Check size={12} className="text-neutral-900 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectTier(tier.name, tier.credits)}
                    className="w-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold py-2.5 rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                  >
                    Select Plan
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
