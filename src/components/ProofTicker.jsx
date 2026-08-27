import React from 'react';
import { TrendingUp, ShieldCheck, Zap, Award, CheckCircle2 } from 'lucide-react';

export const ProofTicker = () => {
  const metrics = [
    {
      icon: TrendingUp,
      value: "$45M+",
      label: "Verified Paid Ad Spend Analyzed",
      accent: "text-emerald-400"
    },
    {
      icon: Zap,
      value: "4.15x",
      label: "Average Blended Meta/TikTok ROAS",
      accent: "text-cyan-400"
    },
    {
      icon: Award,
      value: "90s",
      label: "Time to First 15 Live Campaigns",
      accent: "text-amber-400"
    },
    {
      icon: ShieldCheck,
      value: "10,480+",
      label: "Active E-Commerce Workspaces",
      accent: "text-purple-400"
    }
  ];

  const partners = [
    "Meta Marketing API",
    "TikTok Shop Official",
    "Shopify Plus Sync",
    "Klaviyo Integration",
    "SOC-2 Type II Certified",
    "Stripe 256-Bit Encrypted"
  ];

  return (
    <div className="border-y border-white/10 bg-[#121310] py-8 relative overflow-hidden text-left">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-emerald-500/5 to-purple-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        
        {/* 4 Core Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div key={idx} className={`pt-4 md:pt-0 ${idx > 0 ? 'md:pl-6' : ''} space-y-1.5 text-center`}>
                <div className="flex items-center justify-center gap-2">
                  <Icon size={18} className={m.accent} />
                  <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight font-mono">
                    {m.value}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-400 font-medium leading-snug max-w-[200px] mx-auto">
                  {m.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Partner & Security Trust Badges Bar */}
        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs font-mono text-neutral-400">
          <span className="text-neutral-500 uppercase tracking-widest text-[10px]">
            TRUSTED ECOSYSTEM:
          </span>
          {partners.map((partner, idx) => (
            <div key={idx} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-neutral-300">
              <CheckCircle2 size={12} className="text-emerald-400" />
              <span>{partner}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
