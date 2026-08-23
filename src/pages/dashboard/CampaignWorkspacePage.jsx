import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Sparkles, 
  Copy, 
  Check, 
  Calendar, 
  DollarSign, 
  Users, 
  ShoppingBag, 
  Globe, 
  Share2, 
  Layers, 
  Send, 
  CheckCircle2, 
  Plus, 
  ArrowRight,
  Zap,
  TrendingUp,
  Target,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MarkdownRenderer } from '../../components/MarkdownRenderer';
import { useMarketing } from '../../context/MarketingContext';

// Custom Crisp Platform SVGs
const InstagramSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TikTokSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-950">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppSvg = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const CampaignWorkspacePage = ({ campaign, onBackToDashboard, onOpenNewCampaign }) => {
  const { addContent, addTask } = useMarketing();
  const [activeChannelTab, setActiveChannelTab] = useState('All');
  const [copiedAll, setCopiedAll] = useState(false);
  const [exported, setExported] = useState(false);

  if (!campaign) {
    return (
      <div className="min-h-screen bg-[#fafafc] flex items-center justify-center p-6 text-center">
        <div className="bg-white rounded-3xl p-8 border border-neutral-200 shadow-sm max-w-md space-y-4">
          <Sparkles size={32} className="text-purple-600 mx-auto" />
          <h2 className="text-lg font-bold text-neutral-900">No Campaign Selected</h2>
          <p className="text-xs text-neutral-500">Create a new campaign to view its AI strategy workspace.</p>
          <button 
            onClick={onOpenNewCampaign}
            className="bg-purple-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl cursor-pointer"
          >
            Create Campaign
          </button>
        </div>
      </div>
    );
  }

  const handleCopyAll = () => {
    if (campaign.rawAiPlan) {
      navigator.clipboard.writeText(campaign.rawAiPlan);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    }
  };

  const handleExportToContentStudio = () => {
    // Add individual channel assets to Content Studio
    (campaign.channels || ['Instagram', 'TikTok', 'WhatsApp']).forEach((ch, idx) => {
      addContent({
        id: Date.now() + idx,
        title: `${campaign.title} — ${ch} Deliverable`,
        snippet: `AI generated marketing asset for ${campaign.title}`,
        date: 'Scheduled',
        status: 'Ready',
        statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        reach: '15.0K',
        eng: '2.5K',
        platform: ch,
        imgUrl: campaign.imgUrl || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80',
        imgTitle: campaign.title
      });
    });

    addTask(`Launch Day 1 ${campaign.title} across ${campaign.channels.join(' & ')}`, 'High Priority');
    setExported(true);
    try { confetti({ particleCount: 70, spread: 60 }); } catch (e) {}
    setTimeout(() => setExported(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#fafafc] text-neutral-900 font-sans antialiased text-left select-none pb-16">
      
      {/* Top Sticky Action Bar */}
      <div className="bg-white border-b border-neutral-200/80 px-6 sm:px-10 py-4 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToDashboard}
              className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
                  AI Campaign Workspace
                </span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  Strategy Formulated ✨
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight mt-0.5">
                {campaign.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button 
              onClick={handleCopyAll}
              className="text-xs font-semibold text-neutral-700 bg-white border border-neutral-200 hover:bg-neutral-50 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copiedAll ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
              <span>{copiedAll ? 'Plan Copied!' : 'Copy Full Plan'}</span>
            </button>

            <button 
              onClick={handleExportToContentStudio}
              className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-4 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Layers size={13} />
              <span>{exported ? 'Exported to Studio!' : 'Export Assets to Studio'}</span>
            </button>

            <button 
              onClick={onBackToDashboard}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs active:scale-95 cursor-pointer"
            >
              <span>View in Dashboard</span>
              <ArrowRight size={13} />
            </button>
          </div>

        </div>
      </div>

      {/* Main Campaign Canvas */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLS: FULL AI GENERATED PLAN & DELIVERABLES */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Strategy Highlights Header Card */}
            <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 text-purple-300 text-xs font-semibold">
                  <Sparkles size={16} />
                  <span>AI Marketing Assistant Blueprint</span>
                </div>

                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">{campaign.title}</h2>
                  <p className="text-purple-200 text-xs sm:text-sm mt-1 max-w-xl leading-relaxed">
                    A multi-channel marketing campaign engineered to drive awareness and conversions across {campaign.channels?.join(', ')}.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-purple-800/60 text-xs">
                  <div>
                    <span className="text-purple-300 text-[10.5px] block font-medium">Objective</span>
                    <span className="font-bold text-white text-xs">{campaign.goal || 'Increase Sales'}</span>
                  </div>
                  <div>
                    <span className="text-purple-300 text-[10.5px] block font-medium">Duration</span>
                    <span className="font-bold text-white text-xs">{campaign.date || '7 Days'}</span>
                  </div>
                  <div>
                    <span className="text-purple-300 text-[10.5px] block font-medium">Budget</span>
                    <span className="font-bold text-white text-xs">GHS {campaign.budget || '1,000'}</span>
                  </div>
                  <div>
                    <span className="text-purple-300 text-[10.5px] block font-medium">Target ROAS</span>
                    <span className="font-bold text-emerald-400 text-xs">4.0x – 4.5x</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Render Full Markdown AI Campaign Deliverables */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-purple-600" />
                  <h3 className="text-sm font-bold text-neutral-950">Complete Campaign Deliverables</h3>
                </div>
                <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                  OpenRouter AI Formulated
                </span>
              </div>

              {/* Rich Markdown with Tables, Phases, Hooks & Copies */}
              <div className="prose-xs max-w-none text-neutral-800">
                <MarkdownRenderer content={campaign.rawAiPlan} />
              </div>
            </div>

          </div>

          {/* RIGHT 4 COLS: CAMPAIGN SPECS & PERFORMANCE FORECAST */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Performance Forecast Box */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-neutral-950 tracking-tight">Predicted Campaign Impact</h3>
                <TrendingUp size={15} className="text-emerald-600" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-purple-50/60 p-3.5 rounded-2xl border border-purple-100">
                  <span className="text-[10.5px] text-purple-800 font-semibold block">Forecast Reach</span>
                  <h4 className="text-xl font-bold text-neutral-950 mt-0.5">{campaign.reach || '15.0K'}</h4>
                  <span className="text-[10px] text-emerald-600 font-bold">+100% net new</span>
                </div>

                <div className="bg-emerald-50/60 p-3.5 rounded-2xl border border-emerald-100">
                  <span className="text-[10.5px] text-emerald-800 font-semibold block">Estimated Orders</span>
                  <h4 className="text-xl font-bold text-neutral-950 mt-0.5">{campaign.conv || '220'}</h4>
                  <span className="text-[10px] text-emerald-600 font-bold">via WhatsApp & Web</span>
                </div>

                <div className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100">
                  <span className="text-[10.5px] text-blue-800 font-semibold block">Attributed Sales</span>
                  <h4 className="text-xl font-bold text-neutral-950 mt-0.5">GHS {campaign.salesGhs?.toLocaleString() || '4,000'}</h4>
                  <span className="text-[10px] text-blue-700 font-bold">Forecast revenue</span>
                </div>

                <div className="bg-amber-50/60 p-3.5 rounded-2xl border border-amber-100">
                  <span className="text-[10.5px] text-amber-800 font-semibold block">Engagement</span>
                  <h4 className="text-xl font-bold text-neutral-950 mt-0.5">{campaign.eng || '2.5K'}</h4>
                  <span className="text-[10px] text-amber-700 font-bold">Likes, shares, DMs</span>
                </div>
              </div>
            </div>

            {/* Campaign Metadata Card */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-4 text-xs text-neutral-700">
              <h3 className="text-sm font-bold text-neutral-950 tracking-tight">Campaign Metadata</h3>

              <div className="space-y-3">
                <div>
                  <span className="text-[10.5px] text-neutral-400 font-semibold block">Target Audience</span>
                  <p className="font-bold text-neutral-900 mt-0.5">
                    {campaign.ageRange || '18 – 30'} • {campaign.gender || 'All'} • {campaign.location || 'Accra, Ghana'}
                  </p>
                </div>

                {campaign.offer && (
                  <div>
                    <span className="text-[10.5px] text-neutral-400 font-semibold block">Commercial Offer</span>
                    <p className="font-bold text-purple-900 bg-purple-50 p-2 rounded-xl border border-purple-100 mt-0.5">
                      {campaign.offer}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-[10.5px] text-neutral-400 font-semibold block mb-1">Active Channels</span>
                  <div className="flex flex-wrap gap-1.5">
                    {(campaign.channels || []).map(ch => (
                      <span key={ch} className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2.5 py-1 rounded-lg">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-neutral-950 tracking-tight">Next Actions</h3>
              
              <button 
                onClick={handleExportToContentStudio}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-3 rounded-2xl transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Layers size={14} />
                <span>Export to Content Studio</span>
              </button>

              <button 
                onClick={onBackToDashboard}
                className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs py-2.5 rounded-2xl transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Go to Dashboard</span>
              </button>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
};
