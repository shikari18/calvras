import React, { useState } from 'react';
import { Sparkles, Copy, Check, Target, Zap, TrendingUp, DollarSign, Layers } from 'lucide-react';

export const PlaybookVault = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState('tiktok');
  const [copiedIdx, setCopiedIdx] = useState(null);

  const categories = [
    { id: 'tiktok', label: '3-Sec TikTok Hooks', icon: Zap },
    { id: 'meta', label: 'Meta 3:2:2 Dynamic Ads', icon: Target },
    { id: 'product', label: 'Sensory Descriptions', icon: Layers },
    { id: 'upsell', label: '1-Click Cart Upsells', icon: DollarSign }
  ];

  const playbooks = {
    tiktok: [
      {
        hook: "⚠️ Stop paying a marketing agency in 2026. Look at what happened in 90s.",
        angle: "Price Disruption / Contrarian Warning",
        ctr: "3.92% CTR",
        cpa: "$14.20 CPA"
      },
      {
        hook: "Before you buy another oversized hoodie, look at the collar ribbing...",
        angle: "Visual Inspection / Quality Standard",
        ctr: "4.15% CTR",
        cpa: "$16.40 CPA"
      },
      {
        hook: "My Shopify store was stuck at $8k/mo until I fixed this 1 ad budget leak.",
        angle: "Vulnerable Founder Transformation",
        ctr: "3.78% CTR",
        cpa: "$15.10 CPA"
      }
    ],
    meta: [
      {
        hook: "Generate 15 High-Converting Ad Campaigns in 90 Seconds—Without an Agency.",
        angle: "Direct Outcome & Speed Supremacy",
        ctr: "3.45% CTR",
        cpa: "$18.20 CPA"
      },
      {
        hook: "Why 10,480+ Shopify Founders Switched to Autonomous Marketing.",
        angle: "Herd Social Consensus & Data Scale",
        ctr: "3.10% CTR",
        cpa: "$19.50 CPA"
      },
      {
        hook: "Replace Your $5,000/Month Retainer Agency with Autonomous Software for $10.",
        angle: "Extreme Asymmetric Cost Disruption",
        ctr: "4.20% CTR",
        cpa: "$14.80 CPA"
      }
    ],
    product: [
      {
        hook: "The 480 GSM Sculpted French Terry Hoodie — Heavy Structure for a Lifetime.",
        angle: "Sensory Tactile Luxury",
        ctr: "2.85% CTR",
        cpa: "$22.40 CPA"
      },
      {
        hook: "6 Hours of Laser-Sharp Mental Flow Without the 3 PM Caffeine Crash.",
        angle: "Health & Cognitive Transformation",
        ctr: "3.30% CTR",
        cpa: "$17.90 CPA"
      },
      {
        hook: "Custom-Milled Portuguese Cotton Pre-Shrunk for Zero Washing Surprises.",
        angle: "Objection Elimination & Durability",
        ctr: "2.95% CTR",
        cpa: "$21.10 CPA"
      }
    ],
    upsell: [
      {
        hook: "Add matching heavyweight joggers for 30% off (Order ships together in 1 box).",
        angle: "Frictionless Post-Purchase Rebuy",
        ctr: "28.4% Take-Rate",
        cpa: "+$18.50 AOV"
      },
      {
        hook: "Unlock the 500 Direct-Response Hook Swipe Vault for just $17 (One-Time Offer).",
        angle: "Pre-Purchase Order Bump",
        ctr: "44.2% Take-Rate",
        cpa: "+$7.51 AOV"
      },
      {
        hook: "Add Organic Sneaker Cleaner Kit to protect your fresh pairs for $12.",
        angle: "Accessory Impulse Companion",
        ctr: "36.0% Take-Rate",
        cpa: "+$4.32 AOV"
      }
    ]
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <section className="py-24 md:py-36 border-t border-white/10 bg-[#121310] text-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <p className="text-xs font-mono font-semibold tracking-[0.24em] uppercase text-cyan-400">
            PROVEN DIRECT-RESPONSE FRAMEWORKS
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-tight">
            Explore the 500+ Swipe Vault
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto">
            Fine-tuned on $45,000,000 in top-performing Meta & TikTok ad spend. Copy battle-tested direct-response angles instantly.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                  isActive 
                    ? 'bg-white text-neutral-950 shadow-lg' 
                    : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-neutral-950' : 'text-cyan-400'} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Playbook Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {playbooks[activeTab].map((item, idx) => (
            <div 
              key={idx}
              className="bg-[#171815] rounded-2xl border border-white/10 p-6 flex flex-col justify-between space-y-5 hover:border-white/20 transition shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-cyan-400 font-semibold">{item.angle}</span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    {item.ctr}
                  </span>
                </div>
                <p className="text-xs sm:text-sm font-medium text-neutral-200 leading-relaxed">
                  "{item.hook}"
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-500">
                  Target: {item.cpa}
                </span>
                <button
                  onClick={() => handleCopy(item.hook, idx)}
                  className="text-xs font-semibold text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
                >
                  {copiedIdx === idx ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Hook</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigate('get-started')}
            className="text-xs font-bold text-neutral-300 hover:text-white inline-flex items-center gap-1.5 transition underline underline-offset-4 cursor-pointer"
          >
            <span>Unlock all 500+ direct-response swipe files in Calvras Pro ➔</span>
          </button>
        </div>

      </div>
    </section>
  );
};
