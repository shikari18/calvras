import React, { useState } from 'react';
import { X, Check, Sparkles, CreditCard, Lock, CheckCircle2 } from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import confetti from 'canvas-confetti';

export const CyBillingPage = ({ userName = 'SHIKARI', onSelectTab }) => {
  const { credits, addCredits } = useMarketing();
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);

  const handleSelectTier = (tierName, creditAmount) => {
    addCredits(creditAmount, tierName);
    setShowUpgradeModal(false);
    try { confetti({ particleCount: 70, spread: 70 }); } catch (err) {}
  };

  const currentPlan = credits?.plan || 'Basic';
  const creditsRemaining = credits?.remaining ?? 1000;
  const creditsUsed = credits?.used ?? 0;
  const totalCredits = creditsRemaining + creditsUsed;

  const tiers = [
    {
      id: 'basic',
      name: 'Basic',
      priceMonthly: 10,
      priceAnnual: 8,
      credits: 1000,
      badge: 'STARTER',
      desc: 'Ideal for creators & early-stage businesses generating copy & visuals.',
      features: [
        '1,000 Marketing Credits / month',
        '🎨 High-converting ad copy & scripts',
        'Single brand workspace',
        'Standard prompt inference speed',
        'Commercial IP ownership included'
      ]
    },
    {
      id: 'pro',
      name: 'Pro Growth',
      priceMonthly: 25,
      priceAnnual: 20,
      credits: 3500,
      badge: 'MOST POPULAR',
      isPopular: true,
      desc: 'Unlock direct Social Media accounts (Instagram, TikTok, Meta Ads) & media buying.',
      features: [
        '3,500 Marketing Credits / month',
        '🔓 Social Media Sync (Instagram, TikTok, Meta, X)',
        'Autonomous media buying & ad diagnostics',
        'WhatsApp VIP broadcast & abandoned cart flows',
        'Priority model inference speed',
        'Dedicated strategy copilot'
      ]
    },
    {
      id: 'agency',
      name: 'Agency & Scale',
      priceMonthly: 48,
      priceAnnual: 39,
      credits: 10000,
      badge: 'ENTERPRISE SCALE',
      desc: 'Unlimited throughput with multi-brand workspaces & bespoke flows.',
      features: [
        '10,000 Marketing Credits / month',
        '🔓 Unlimited Social Media integrations',
        'Multi-brand & agency workspaces',
        'Custom webhooks, triggers & automations',
        'Dedicated account manager & 24/7 SLA',
        'Fastest model inference priority'
      ]
    }
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#1c1c1c] p-6 sm:p-10 font-sans antialiased text-white select-none text-left overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-6 pt-2 sm:pt-4">
        
        {/* Title Header */}
        <div className="space-y-1 border-b border-white/10 pb-5">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
            Billing & Plans
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal">
            Credits, plans, and active balance for <strong>{userName}'s Workspace</strong>.
          </p>
        </div>

        {/* Current Plan Card */}
        <div className="bg-[#242424] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <span className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider block font-mono">
            Active Workspace Plan
          </span>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">{currentPlan} Plan</h3>
              <p className="text-xs text-neutral-400 font-medium mt-0.5">
                5 credits consumed per autonomous marketing prompt or creative generation.
              </p>
            </div>

            <button
              onClick={() => setShowUpgradeModal(true)}
              className="bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold px-5 py-2.5 rounded-xl transition cursor-pointer shadow-md active:scale-95 flex items-center gap-2"
            >
              <Sparkles size={14} className="text-neutral-950" />
              <span>Upgrade Plan</span>
            </button>
          </div>
        </div>

        {/* Credits Status Card */}
        <div className="bg-[#242424] border border-white/10 rounded-3xl p-6 shadow-xl space-y-4">
          <span className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider block font-mono">
            Credit Telemetry
          </span>

          <div className="flex items-center gap-16">
            <div>
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">REMAINING</span>
              <span className="text-2xl sm:text-3xl font-bold text-white font-mono">{creditsRemaining.toLocaleString()}</span>
            </div>

            <div>
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">CONSUMED</span>
              <span className="text-2xl sm:text-3xl font-bold text-white font-mono">{creditsUsed.toLocaleString()}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-400 rounded-full transition-all duration-300" 
              style={{ width: `${Math.max(4, Math.min(100, (creditsRemaining / Math.max(1, totalCredits)) * 100))}%` }} 
            />
          </div>
        </div>

        {/* 3 Tier Plans Section */}
        <div className="space-y-4 pt-4 border-t border-white/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Available Paid Plans</h2>
              <p className="text-xs text-neutral-400">Scale your brand with dedicated computing power and social syncing.</p>
            </div>

            {/* Monthly / Annual Toggle */}
            <div className="flex items-center gap-3">
              <span className={`text-xs ${!isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>Monthly</span>
              <button
                type="button"
                onClick={() => setIsAnnual(!isAnnual)}
                className={`w-9 h-5 rounded-full transition-colors cursor-pointer p-0.5 flex items-center ${isAnnual ? 'bg-[#ff5e28]' : 'bg-neutral-700'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
              <div className="flex items-center gap-1.5">
                <span className={`text-xs ${isAnnual ? 'text-white font-semibold' : 'text-neutral-400'}`}>Annually</span>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#ff5e28] bg-[#ff5e28]/15 px-2 py-0.5 rounded-full border border-[#ff5e28]/30">Save 20%</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((tier) => {
              const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
              return (
                <div 
                  key={tier.id}
                  className={`border rounded-3xl p-6 flex flex-col justify-between space-y-5 transition-all duration-200 shadow-xl ${
                    tier.isPopular 
                      ? 'bg-[#282828] border-[#8057ff]/40 shadow-2xl relative' 
                      : 'bg-[#242424] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold text-white">{tier.name}</span>
                      <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        tier.isPopular ? 'bg-[#8057ff]/20 text-[#a88aff] border border-[#8057ff]/30' : 'bg-white/5 text-neutral-400'
                      }`}>
                        {tier.badge}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold text-white font-mono">${price}</span>
                        <span className="text-xs text-neutral-400">/ month</span>
                      </div>
                      <span className="text-xs text-emerald-400 font-semibold block mt-1 font-mono">
                        +{tier.credits.toLocaleString()} Credits / mo
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {tier.desc}
                    </p>

                    <div className="space-y-2 text-xs text-neutral-300 pt-3 border-t border-white/10">
                      {tier.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectTier(tier.name, tier.credits)}
                    className={`w-full py-3 rounded-xl transition cursor-pointer text-xs font-bold shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                      tier.isPopular 
                        ? 'bg-white text-neutral-950 hover:bg-neutral-100' 
                        : 'bg-[#1c1c1c] text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    <CreditCard size={14} />
                    <span>Select {tier.name} (${price})</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#242424] rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-white/15 space-y-6 relative animate-in zoom-in-95 duration-150 text-left text-white">
            
            <button 
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition cursor-pointer"
            >
              <X size={16} />
            </button>

            <div>
              <h2 className="text-xl font-serif font-bold text-white">Select Your Calvras Plan</h2>
              <p className="text-xs text-neutral-400 mt-1 max-w-xl leading-relaxed">
                Choose the credit package that fits your marketing volume. 5 credits are consumed per strategy prompt.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tiers.map((tier) => {
                const price = isAnnual ? tier.priceAnnual : tier.priceMonthly;
                return (
                  <div 
                    key={tier.id}
                    className="border border-white/10 rounded-2xl p-5 flex flex-col justify-between space-y-4 bg-[#1c1c1c] hover:border-white/30 transition shadow-lg"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">{tier.name}</span>
                        <span className="text-[9px] font-bold bg-white/10 text-neutral-300 px-2 py-0.5 rounded-full uppercase">
                          {tier.badge}
                        </span>
                      </div>

                      <div>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-extrabold text-white font-mono">${price}</span>
                          <span className="text-xs text-neutral-400">/mo</span>
                        </div>
                        <span className="text-xs text-emerald-400 font-bold block mt-0.5 font-mono">
                          +{tier.credits.toLocaleString()} Credits
                        </span>
                      </div>

                      <div className="space-y-1.5 text-xs text-neutral-300 pt-2 border-t border-white/10">
                        {tier.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <Check size={12} className="text-emerald-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectTier(tier.name, tier.credits)}
                      className="w-full bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold py-2.5 rounded-xl transition cursor-pointer shadow-xs active:scale-95"
                    >
                      Select Plan
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
