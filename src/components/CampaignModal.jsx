import React from 'react';
import { X, Calendar, Megaphone, TrendingUp, CheckCircle2, ArrowRight } from 'lucide-react';

export const CampaignModal = ({ campaign, onClose }) => {
  if (!campaign) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full p-7 border border-neutral-100 shadow-2xl relative text-left">
        
        <button 
          onClick={onClose}
          className="absolute right-5 top-5 text-neutral-400 hover:text-neutral-900 p-1 rounded-full transition cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-3">
          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
            campaign.isLive ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-neutral-100 text-neutral-700'
          }`}>
            {campaign.status}
          </span>
          <span className="text-xs text-neutral-400">{campaign.date}</span>
        </div>

        <h3 className="text-2xl font-bold text-neutral-950 tracking-tight mb-2">
          {campaign.title}
        </h3>

        <p className="text-xs text-neutral-500 mb-6">
          AI generated multi-channel campaign targeting high-intent segment with personalized creative assets.
        </p>

        <div className="space-y-3 mb-6">
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
            <span className="text-xs font-semibold text-neutral-900 block mb-1">Channels & Formats</span>
            <p className="text-xs text-neutral-600">Instagram Reels, TikTok UGC, Email Blast to VIP segment, Google Search ads.</p>
          </div>

          <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100">
            <span className="text-xs font-semibold text-purple-900 block mb-1">AI Predicted ROI</span>
            <p className="text-xs text-purple-700">Estimated 3.8x – 4.5x ROAS based on past seasonal benchmarks.</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={onClose}
            className="flex-1 bg-neutral-950 text-white text-xs font-semibold py-3 rounded-full hover:bg-neutral-800 transition cursor-pointer"
          >
            Launch Automation Sequence
          </button>
        </div>

      </div>
    </div>
  );
};
