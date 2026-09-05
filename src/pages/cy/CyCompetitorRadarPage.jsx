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

export const CyCompetitorRadarPage = ({ onLaunchCampaign, userName = 'User' }) => {
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

    const prompt = `Analyze competitor: "${query}".
Provide a structured competitive intelligence analysis formatted as valid JSON with this exact schema:
{
  "strengths": ["Key competitive advantage 1", "Key competitive advantage 2", "Key competitive advantage 3"],
  "weaknesses": ["Core vulnerability or customer complaint 1", "Core vulnerability 2", "Core vulnerability 3"],
  "pricingGap": "A concise sentence on their pricing vulnerability and market gap.",
  "counterCampaigns": [
    {
      "title": "Campaign 1 Name",
      "channel": "e.g. TikTok / Instagram / WhatsApp",
      "angle": "Strategic hook angle exploiting their weakness",
      "actionPrompt": "Prompt to generate this exact campaign"
    },
    {
      "title": "Campaign 2 Name",
      "channel": "e.g. Instagram Reels / Ads",
      "angle": "Strategic hook angle",
      "actionPrompt": "Prompt to generate this exact campaign"
    },
    {
      "title": "Campaign 3 Name",
      "channel": "e.g. WhatsApp VIP / Email Retargeting",
      "angle": "Strategic hook angle",
      "actionPrompt": "Prompt to generate this exact campaign"
    }
  ]
}
Return ONLY valid JSON.`;

    try {
      const response = await callOpenRouterAI({
        messages: [
          { role: 'system', content: 'You are an elite competitive intelligence marketing analyst. Return only valid JSON.' },
          { role: 'user', content: prompt }
        ],
        userPrompt: query
      });

      const cleaned = cleanAiResponse(response);
      let parsed = null;
      try {
        const match = cleaned.match(/\{[\s\S]*\}/);
        if (match) parsed = JSON.parse(match[0]);
      } catch (err) {
        console.warn('Could not parse competitor AI JSON:', err);
      }

      if (parsed && Array.isArray(parsed.counterCampaigns) && parsed.counterCampaigns.length > 0) {
        setReport({
          name: query,
          strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ['Recognized brand identity', 'Established market presence'],
          weaknesses: Array.isArray(parsed.weaknesses) ? parsed.weaknesses : ['High friction checkout', 'Slower customer response times'],
          pricingGap: parsed.pricingGap || 'Pricing premium creates an opportunity for higher-value alternative positioning.',
          counterCampaigns: parsed.counterCampaigns.map(c => ({
            title: c.title || 'Counter-Attack Campaign',
            channel: c.channel || 'Omnichannel',
            angle: c.angle || 'Direct comparison on speed and value.',
            actionPrompt: c.actionPrompt || `Build a marketing campaign positioning our brand against ${query}.`
          })),
          rawText: cleaned
        });
      } else {
        setReport({
          name: query,
          strengths: [`Active market presence for ${query}`, 'Recognizable branding'],
          weaknesses: ['Generic promotional messaging', 'Friction in buyer experience'],
          pricingGap: `Premium pricing model opens room for a high-converting competitor alternative to ${query}.`,
          counterCampaigns: [
            {
              title: 'Fast Direct Alternative Campaign',
              channel: 'Instagram & WhatsApp',
              angle: 'Highlight instant customer service and verified quality.',
              actionPrompt: `Build a 7-day marketing campaign attacking competitor delays for ${query} alternative.`
            },
            {
              title: 'Side-by-Side Value Challenge',
              channel: 'TikTok Video',
              angle: 'Showcase superior customer experience and transparent pricing.',
              actionPrompt: `Write a viral hook script comparing our brand against ${query}.`
            }
          ],
          rawText: cleaned
        });
      }
    } catch (e) {
      console.error('Competitor search error:', e);
      setReport({
        name: query,
        strengths: ['Active online branding'],
        weaknesses: ['Service delays during peak demand'],
        pricingGap: 'Opportunity for transparent, faster service at competitive rates.',
        counterCampaigns: [
          {
            title: 'Value & Speed Blitz',
            channel: 'Social & Direct Chat',
            angle: 'Promote instant fulfillment and superior customer support.',
            actionPrompt: `Create a marketing campaign competing directly with ${query}.`
          }
        ],
        rawText: `Competitive analysis completed for ${query}.`
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#1c1c1c] text-[#f4f4ee] p-6 sm:p-10 font-sans antialiased text-white select-none text-left overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8 pt-2 sm:pt-6">
        
        {/* Header */}
        <div className="space-y-1.5 border-b border-white/5 pb-5">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider">
            <Radar size={15} />
            <span>AI Market Intelligence</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
            Competitor Radar & Market Spy
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal">
            Analyze any competitor, discover their pricing gaps and weak spots, and generate counter-campaigns to win their audience.
          </p>
        </div>

        {/* Search Bar */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 bg-[#282828] border border-white/10 hover:border-neutral-300 focus-within:border-neutral-900 rounded-2xl p-2 shadow-2xs transition">
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
                className="text-[11px] font-medium text-neutral-600 bg-neutral-50 hover:bg-white/10 hover:text-white border border-white/10/80 px-2.5 py-1 rounded-full whitespace-nowrap transition cursor-pointer shrink-0"
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
              <div className="bg-[#282828] border border-white/10 rounded-2xl p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
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
              <div className="bg-[#282828] border border-white/10 rounded-2xl p-4 shadow-2xs space-y-2">
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
              <div className="bg-[#282828] border border-white/10 rounded-2xl p-4 shadow-2xs space-y-2">
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
                  <h3 className="text-sm font-bold text-white">
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
                    className="bg-[#282828] border border-white/10 hover:border-neutral-900 rounded-2xl p-4 shadow-2xs transition flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                        {camp.channel}
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-purple-700 transition">
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
