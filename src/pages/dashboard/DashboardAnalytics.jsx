import React from 'react';
import { Sparkles, TrendingUp, ShoppingBag, Users, ArrowUpRight } from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';

export const DashboardAnalytics = () => {
  const { businessProfile, campaigns, metrics } = useMarketing();

  return (
    <div className="space-y-6 text-left">
      <div>
        <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-950 tracking-tight">Marketing Analytics</h1>
        <p className="text-sm text-neutral-500 font-normal mt-0.5">
          Real-time performance analytics for <strong>{businessProfile.name}</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">ROAS (Return on Ad Spend)</span>
          <h3 className="text-2xl font-bold text-neutral-950 mt-1">4.4x</h3>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">↑ 0.6x vs last month</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Total Attributed Sales</span>
          <h3 className="text-2xl font-bold text-neutral-950 mt-1">{metrics.salesAttributed}</h3>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">↑ 38% MoM</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Cost Per Lead (CPL)</span>
          <h3 className="text-2xl font-bold text-neutral-950 mt-1">GHS 3.80</h3>
          <span className="text-xs text-emerald-600 font-semibold mt-1 inline-block">↓ 22% cheaper</span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-neutral-200/80 shadow-2xs">
          <span className="text-xs text-neutral-500 font-medium">Active Campaigns</span>
          <h3 className="text-2xl font-bold text-neutral-950 mt-1">{campaigns.length}</h3>
          <span className="text-xs text-purple-700 font-semibold mt-1 inline-block">Across {businessProfile.channels.split(',').length} channels</span>
        </div>
      </div>

      <div className="bg-purple-50/70 border border-purple-100 rounded-3xl p-6 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="text-purple-600" size={18} />
          <h3 className="text-sm font-bold text-neutral-950">AI Strategic Attribution Insights</h3>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-white p-4 rounded-2xl border border-purple-100/80 space-y-1">
            <span className="font-bold text-neutral-900 block">Increase Saturday WhatsApp Drops</span>
            <p className="text-neutral-600 leading-relaxed">Engagement peaks at 1:00 PM on Saturdays with 68% open rates.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-purple-100/80 space-y-1">
            <span className="font-bold text-neutral-900 block">Double Down on Video Shorts</span>
            <p className="text-neutral-600 leading-relaxed">Sneaker unboxing TikTok videos generated 3.8x more reach than static images.</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-purple-100/80 space-y-1">
            <span className="font-bold text-neutral-900 block">Retarget Cart Abandoners</span>
            <p className="text-neutral-600 leading-relaxed">Send automatic WhatsApp reminder with 5% discount code after 2 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
