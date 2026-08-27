import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowUpRight, 
  Calendar, 
  Download, 
  Filter, 
  Layers, 
  Zap, 
  Send,
  HelpCircle,
  PieChart,
  RefreshCw,
  Search
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import { BrandBurstLogo } from '../../components/cy/CySidebar';

export const CyAnalyticsPage = ({ userName = 'SHIKARI', onNewChat }) => {
  const { connectedSocials } = useMarketing();
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [dataQuery, setDataQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [budgetSlider, setBudgetSlider] = useState(5000);

  // Pre-set data queries for 1-click answers
  const sampleQueries = [
    "Why did sales drop 18% this week?",
    "Detect wasted ad spend across Meta & TikTok",
    "Identify winning campaigns to scale 2x",
    "Forecast performance with $10k budget"
  ];

  const handleAskData = (queryText) => {
    const q = queryText || dataQuery;
    if (!q.trim()) return;

    setIsAnalyzing(true);
    setDataQuery(q);

    setTimeout(() => {
      setIsAnalyzing(false);
      if (q.toLowerCase().includes('drop') || q.toLowerCase().includes('18%') || q.toLowerCase().includes('why')) {
        setAnalysisResult({
          title: "Root-Cause Diagnosis: 18% Sales Variance",
          badge: "Diagnostic Insight",
          summary: "Analysis of 4,820 sessions across Meta Ads, TikTok, and Direct Store traffic indicates the drop was driven by three specific factors:",
          points: [
            "Checkout Drop-off Spike (+11%): Checkout page load latency increased by 1.8s after the latest Shopify theme update.",
            "Meta Ad Creative Fatigue: The top video ad 'Angle #1 UGC' saw CTR drop from 2.8% to 1.1% (frequency reached 4.2).",
            "Weekend Shipping Notice: Lack of explicit express delivery badges reduced cart conversions on Sunday."
          ],
          actions: [
            "Rotate 3 fresh video hooks into Meta Campaign #2 immediately.",
            "Enable 1-click Express Apple Pay / Mobile Money checkout modal.",
            "Activate Automated VIP Abandoned-Cart WhatsApp recovery flow."
          ]
        });
      } else if (q.toLowerCase().includes('wasted') || q.toLowerCase().includes('detect')) {
        setAnalysisResult({
          title: "Wasted Spend & Underperformance Audit",
          badge: "Budget Efficiency",
          summary: "Identified $640/week in non-performing ad spend with negative ROAS across 2 ad sets:",
          points: [
            "Meta Ad Set 'Broad Interest - Luxury 18-24': $380 spent with 0 purchases (CAC > $120 threshold).",
            "TikTok Broad Traffic Ad #3: High click volume (680 clicks) with 84% bounce rate under 3 seconds.",
            "Desktop Google Search generic term: Bidding on high-CPC unbranded keywords with low buyer intent."
          ],
          actions: [
            "Pause Meta Ad Set #4 immediately and shift $380 to 'High-Intent Lookalike 2%'.",
            "Exclude broad TikTok placements and restrict to mobile iOS/Android feed only.",
            "Add 14 negative keywords to Google Ads Campaign."
          ]
        });
      } else {
        setAnalysisResult({
          title: `AI Attribution & Performance Forecast for "${q}"`,
          badge: "Predictive Analytics",
          summary: `Synthesized omni-channel attribution across ${connectedSocials.length > 0 ? connectedSocials.map(s => s.name).join(', ') : 'Meta Ads, Google Ads, TikTok, and Storefront'}:`,
          points: [
            "Attributed Blended ROAS: 4.12x (Generates $4.12 in top-line revenue for every $1 spent).",
            "Top Performing Channel: WhatsApp VIP Retargeting (14.2x ROAS) followed by Meta UGC Ads (4.8x ROAS).",
            "High-Opportunity Segment: Customers who viewed 2+ product pages within 48h have a 41% purchase propensity if offered free shipping."
          ],
          actions: [
            "Scale Meta UGC winning creative budget by +25% increments every 3 days.",
            "Deploy personalized dynamic product retargeting carousel.",
            "Send targeted SMS/WhatsApp trigger 2 hours after browse abandonment."
          ]
        });
      }
    }, 900);
  };

  const channelPerformance = [
    { name: 'Meta Ads (IG & FB)', spend: '$2,450', revenue: '$11,760', roas: '4.80x', status: '🟢 Scaling', statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { name: 'TikTok Ads', spend: '$1,200', revenue: '$4,320', roas: '3.60x', status: '🟢 Healthy', statusColor: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { name: 'Google Ads (Search)', spend: '$850', revenue: '$2,890', roas: '3.40x', status: '🟡 Optimize', statusColor: 'text-amber-700 bg-amber-50 border-amber-200' },
    { name: 'WhatsApp VIP Flows', spend: '$90', revenue: '$1,280', roas: '14.22x', status: '🔥 Top ROI', statusColor: 'text-purple-700 bg-purple-50 border-purple-200' },
    { name: 'Email Marketing', spend: '$40', revenue: '$950', roas: '23.75x', status: '🔥 Top ROI', statusColor: 'text-purple-700 bg-purple-50 border-purple-200' }
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#fafafc] flex flex-col justify-start p-4 sm:p-8 lg:p-10 font-sans antialiased text-white select-none overflow-y-auto w-full min-w-0 text-left">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto w-full space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                <BarChart3 size={18} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
                Marketing Analytics & Insights
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Connect analytics data, detect anomalies, explain why metrics changed, and forecast revenue.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white shadow-2xs text-xs font-medium text-neutral-700">
              <Calendar size={13} className="text-neutral-400" />
              <span>{dateRange}</span>
            </div>

            <button 
              onClick={() => handleAskData("Generate full executive marketing report")}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold shadow-xs transition cursor-pointer"
            >
              <Download size={13} />
              <span>AI Executive Report</span>
            </button>
          </div>
        </div>

        {/* 1. "Ask Your Marketing Data" Conversational Query Engine */}
        <div className="bg-[#131412] border border-white/10 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-neutral-100 flex items-center justify-center">
                <Sparkles size={14} className="text-purple-600" />
              </div>
              <h2 className="text-sm font-bold text-white">
                Ask Your Marketing Data
              </h2>
            </div>
            <span className="text-[11px] text-neutral-400 font-mono">Autonomous Diagnostic AI</span>
          </div>

          {/* Search / Query Input */}
          <div className="relative flex items-center">
            <input
              type="text"
              value={dataQuery}
              onChange={(e) => setDataQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskData()}
              placeholder="e.g. 'Why did sales drop 18% this week?' or 'Detect wasted spend on Meta'..."
              className="w-full bg-[#181916] border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-xs sm:text-[13px] text-white placeholder:text-neutral-400 focus:outline-none focus:border-neutral-900 focus:bg-white transition"
            />
            <Search size={15} className="absolute left-3.5 text-neutral-400" />
            <button
              onClick={() => handleAskData()}
              disabled={isAnalyzing}
              className="absolute right-2 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              {isAnalyzing ? <RefreshCw size={12} className="animate-spin" /> : <Send size={12} />}
              <span>Ask AI</span>
            </button>
          </div>

          {/* Quick Sample Prompts Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            {sampleQueries.map((query, i) => (
              <button
                key={i}
                onClick={() => handleAskData(query)}
                className="text-[11px] font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200 border border-white/10 px-2.5 py-1 rounded-lg transition cursor-pointer"
              >
                {query}
              </button>
            ))}
          </div>

          {/* AI Diagnostic Output Result Card */}
          {analysisResult && (
            <div className="mt-4 p-4 rounded-xl bg-purple-50/60 border border-purple-200/80 space-y-3 animate-in fade-in duration-200 text-white">
              <div className="flex items-center justify-between border-b border-purple-200 pb-2">
                <div className="flex items-center gap-2">
                  <BrandBurstLogo size={16} />
                  <span className="text-xs font-bold text-white">{analysisResult.title}</span>
                </div>
                <span className="text-[10.5px] font-semibold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-md font-mono">
                  {analysisResult.badge}
                </span>
              </div>

              <p className="text-xs text-neutral-700 font-medium leading-relaxed">
                {analysisResult.summary}
              </p>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-white uppercase tracking-wider block">Key Findings:</span>
                {analysisResult.points.map((pt, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-neutral-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-1.5 pt-2 border-t border-purple-200">
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block">Prioritized AI Action Steps:</span>
                {analysisResult.actions.map((act, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-emerald-900 font-medium">
                    <CheckCircle2 size={13} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 2. KPI Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-[#131412] border border-white/10 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Total Revenue</span>
              <DollarSign size={15} className="text-neutral-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">$21,200.00</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <TrendingUp size={12} />
              <span>+19.4% vs last 30d</span>
            </div>
          </div>

          <div className="bg-[#131412] border border-white/10 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Blended ROAS</span>
              <Target size={15} className="text-neutral-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">4.12x</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <TrendingUp size={12} />
              <span>Target: 3.50x (+0.62x above)</span>
            </div>
          </div>

          <div className="bg-[#131412] border border-white/10 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Blended CAC</span>
              <Layers size={15} className="text-neutral-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">$21.40</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <TrendingDown size={12} />
              <span>-14.2% cost reduction</span>
            </div>
          </div>

          <div className="bg-[#131412] border border-white/10 rounded-2xl p-4 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-400 text-xs">
              <span>Store Conversion Rate</span>
              <Zap size={15} className="text-neutral-400" />
            </div>
            <div className="text-2xl font-bold text-white font-mono">3.82%</div>
            <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
              <TrendingUp size={12} />
              <span>+0.6% from WhatsApp VIP</span>
            </div>
          </div>

        </div>

        {/* 3. Multi-Channel Revenue Attribution & Spend Efficiency */}
        <div className="bg-[#131412] border border-white/10 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">
                Channel Revenue Attribution & Spend Analysis
              </h2>
              <p className="text-xs text-neutral-400">
                Live attribution breakdown identifying winning campaigns vs wasted ad spend.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-lg border border-white/10">
              $4,630 Total Ad Spend
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 font-medium uppercase text-[10.5px]">
                  <th className="py-2.5 px-3">Channel / Source</th>
                  <th className="py-2.5 px-3">Ad Spend</th>
                  <th className="py-2.5 px-3">Attributed Revenue</th>
                  <th className="py-2.5 px-3">ROAS</th>
                  <th className="py-2.5 px-3">AI Action Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {channelPerformance.map((ch, idx) => (
                  <tr key={idx} className="hover:bg-white/5 transition">
                    <td className="py-3 px-3 font-semibold text-white">{ch.name}</td>
                    <td className="py-3 px-3 font-mono text-neutral-600">{ch.spend}</td>
                    <td className="py-3 px-3 font-mono font-bold text-white">{ch.revenue}</td>
                    <td className="py-3 px-3 font-mono font-bold text-purple-700">{ch.roas}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${ch.statusColor}`}>
                        {ch.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Predictive Growth Simulator */}
        <div className="bg-[#131412] border border-white/10 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Target size={15} className="text-purple-600" />
                <span>Predictive Growth Simulator</span>
              </h2>
              <p className="text-xs text-neutral-400">
                Forecast monthly revenue, orders, and ROAS by scaling your target marketing budget.
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-400">Target Monthly Budget: </span>
              <span className="text-sm font-bold text-white font-mono">${budgetSlider.toLocaleString()}</span>
            </div>
          </div>

          <input
            type="range"
            min="1000"
            max="30000"
            step="500"
            value={budgetSlider}
            onChange={(e) => setBudgetSlider(Number(e.target.value))}
            className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-neutral-900"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 bg-neutral-50 rounded-xl border border-white/10 text-center">
              <span className="text-[11px] text-neutral-400 uppercase block">Projected Revenue</span>
              <span className="text-lg font-bold text-white font-mono">
                ${Math.round(budgetSlider * 4.15).toLocaleString()}
              </span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-white/10 text-center">
              <span className="text-[11px] text-neutral-400 uppercase block">Estimated Orders</span>
              <span className="text-lg font-bold text-white font-mono">
                {Math.round((budgetSlider * 4.15) / 85).toLocaleString()} units
              </span>
            </div>
            <div className="p-3 bg-neutral-50 rounded-xl border border-white/10 text-center">
              <span className="text-[11px] text-neutral-400 uppercase block">Projected Blended ROAS</span>
              <span className="text-lg font-bold text-purple-700 font-mono">
                4.15x
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
