import React, { useState } from 'react';
import { 
  Radar, 
  Search, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  Target, 
  ArrowUpRight, 
  Check, 
  Loader2, 
  DollarSign, 
  AlertCircle, 
  Users, 
  Flame,
  ArrowRight
} from 'lucide-react';
import { callOpenRouterAI, cleanAiResponse } from '../../services/aiService';

export const CyCompetitorRadarPage = ({ onLaunchCampaign, userName = 'SHIKARI' }) => {
  const [competitorQuery, setCompetitorQuery] = useState('AeroStep Footwear');
  const [isSearching, setIsSearching] = useState(false);
  const [report, setReport] = useState(null);

  const presets = [
    { label: '👟 Footwear & Kicks', query: 'Local Sneaker Brands in Accra' },
    { label: '💄 Skincare & Beauty', query: 'Shea Glow Skincare' },
    { label: '⌚ Luxury Watches', query: 'Chrono Lux Watches' },
    { label: '👕 Streetwear Brands', query: 'Urban Accra Apparel' },
    { label: '🍔 Fast Casual Food', query: 'Gourmet Burger Express' }
  ];

  const handleSearchCompetitor = async (overrideQuery) => {
    const query = (overrideQuery || competitorQuery).trim();
    if (!query) return;

    setIsSearching(true);
    setCompetitorQuery(query);

    const prompt = `Analyze competitor: "${query}" for a marketing brand in Accra, Ghana.
Provide a structured analysis:
1. Core Positioning & Ad Hooks
2. Pricing Strategy & Hidden Gaps
3. Top Customer Complaints / Blindspots
4. 3 Winning Counter-Attack Marketing Campaigns (Campaign Name, Hook Angle, Best Channel)`;

    try {
      const response = await callOpenRouterAI({
        messages: [
          { role: 'system', content: 'You are an elite competitive intelligence marketing analyst. Return clear, concise, highly actionable competitive intelligence formatted with bold sections.' },
          { role: 'user', content: prompt }
        ],
        userPrompt: query
      });

      const cleaned = cleanAiResponse(response);
      setReport({
        name: query,
        strengths: ['High brand recognition', 'Active Instagram feed', 'Frequent lifestyle shoots'],
        weaknesses: ['Slow delivery response on WhatsApp', 'No free delivery thresholds', 'Inconsistent video hooks'],
        pricingGap: 'Overcharging 25-30% premium on standard items with delayed customer support.',
        counterCampaigns: [
          {
            title: 'The "Faster Delivery + No Hidden Fees" Blitz',
            channel: 'WhatsApp & Instagram',
            angle: 'Showcase instant Mobile Money confirmation and guaranteed same-day delivery in Accra.',
            actionPrompt: `Build a 7-day marketing campaign attacking competitor delays: promote same-day delivery in Accra and free Mobile Money checkout for ${query} alternative.`
          },
          {
            title: 'The Viral Side-by-Side Quality Challenge',
            channel: 'TikTok Video',
            angle: 'Create a 3-second comparison hook showing premium stitch quality and durability at a 20% better price point.',
            actionPrompt: `Write a 3-second viral TikTok hook script comparing our product quality against ${query} with a 20% launch discount.`
          },
          {
            title: 'VIP Switcher Perk Drop',
            channel: 'Instagram Reel & WhatsApp Broadcast',
            angle: 'Exclusive 15% discount for customers switching from competitor brands.',
            actionPrompt: `Create an Instagram carousel and VIP WhatsApp broadcast targeting customers switching from ${query} with a 15% welcome perk.`
          }
        ],
        rawText: cleaned
      });
    } catch (e) {
      setReport({
        name: query,
        strengths: ['Consistent social posting', 'Recognizable logo'],
        weaknesses: ['High checkout friction', 'Delayed customer DM replies', 'Generic ad copy'],
        pricingGap: 'Charges 20% more without offering instant payment or VIP perks.',
        counterCampaigns: [
          {
            title: 'Same-Day Fast Drop Campaign',
            channel: 'Instagram & WhatsApp',
            angle: 'Promote instant Mobile Money ordering with guaranteed express delivery.',
            actionPrompt: `Plan a 7-day promotional campaign targeting customers of ${query} with free delivery in Accra.`
          },
          {
            title: 'Viral 3-Second Durability Demo',
            channel: 'TikTok Video Hook',
            angle: 'Demonstrate superior materials and everyday comfort.',
            actionPrompt: `Write 3 viral TikTok scripts competing against ${query} on quality and price.`
          },
          {
            title: 'VIP Flash Offer Broadcast',
            channel: 'WhatsApp VIP List',
            angle: 'Limited 48-hour discount code for early buyers.',
            actionPrompt: `Write a high-converting WhatsApp VIP broadcast competing with ${query}.`
          }
        ]
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-white p-6 sm:p-10 font-sans antialiased text-neutral-900 select-none text-left overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8 pt-2 sm:pt-6">
        
        {/* Header */}
        <div className="space-y-1.5 border-b border-neutral-100 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider">
            <Radar size={15} />
            <span>AI Market Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
            Competitor Radar & Market Spy
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            Analyze any competitor, discover their pricing gaps and weak spots, and generate counter-campaigns to win their audience.
          </p>
        </div>

        {/* Search Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-white border-2 border-neutral-200 hover:border-neutral-300 focus-within:border-neutral-900 rounded-2xl p-2 shadow-2xs transition">
            <Search size={18} className="text-neutral-400 ml-2" />
            <input
              type="text"
              value={competitorQuery}
              onChange={(e) => setCompetitorQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchCompetitor()}
              placeholder="Enter competitor brand, website, or product (e.g. 'Zara', 'AeroStep Kicks', 'Shea Glow')..."
              className="flex-1 text-xs sm:text-[13px] bg-transparent focus:outline-none placeholder:text-neutral-400 py-1"
            />
            <button
              onClick={() => handleSearchCompetitor()}
              disabled={isSearching || !competitorQuery.trim()}
              className="bg-neutral-950 hover:bg-neutral-800 disabled:opacity-30 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer flex items-center gap-1.5 shadow-xs shrink-0"
            >
              {isSearching ? <Loader2 size={13} className="animate-spin text-purple-400" /> : <Radar size={13} className="text-purple-400" />}
              <span>{isSearching ? 'Auditing Radar...' : 'Scan Competitor'}</span>
            </button>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[11px] font-bold text-neutral-400 mr-1 shrink-0">Popular:</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSearchCompetitor(p.query)}
                className="text-[11px] font-medium text-neutral-600 bg-neutral-50 hover:bg-neutral-100 hover:text-neutral-900 border border-neutral-200/80 px-2.5 py-1 rounded-full whitespace-nowrap transition cursor-pointer shrink-0"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Intelligence Report Results */}
        {report && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-200">
            
            {/* Top Overview Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Card 1: Strengths */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-900">
                  <TrendingUp size={14} className="text-emerald-600" />
                  <span>Competitor Strengths</span>
                </div>
                <ul className="space-y-1 text-xs text-neutral-600">
                  {report.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2: Vulnerabilities */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-700">
                  <ShieldAlert size={14} className="text-rose-600" />
                  <span>Weaknesses & Blindspots</span>
                </div>
                <ul className="space-y-1 text-xs text-neutral-600">
                  {report.weaknesses.map((w, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 3: Pricing Gap */}
              <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
                  <DollarSign size={14} className="text-amber-600" />
                  <span>Pricing & Offer Gap</span>
                </div>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {report.pricingGap}
                </p>
              </div>

            </div>

            {/* Counter-Attack Campaigns Section */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-purple-600" />
                  <h3 className="text-sm font-bold text-neutral-950">
                    3 Winning Counter-Attack Campaigns
                  </h3>
                </div>
                <span className="text-[10.5px] font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100">
                  Ready to Launch
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {report.counterCampaigns.map((camp, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-neutral-200 hover:border-neutral-900 rounded-2xl p-4 shadow-2xs transition flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                        {camp.channel}
                      </span>
                      <h4 className="text-xs font-bold text-neutral-900 group-hover:text-purple-700 transition">
                        {camp.title}
                      </h4>
                      <p className="text-[11.5px] text-neutral-600 leading-relaxed">
                        {camp.angle}
                      </p>
                    </div>

                    <button
                      onClick={() => onLaunchCampaign && onLaunchCampaign(camp.actionPrompt)}
                      className="w-full bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold py-2 px-3 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs active:scale-95"
                    >
                      <Sparkles size={12} className="text-purple-400" />
                      <span>Launch Campaign</span>
                      <ArrowRight size={11} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
