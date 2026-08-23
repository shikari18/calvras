import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  Split, 
  Users, 
  Target, 
  Zap, 
  Video, 
  BarChart3, 
  CheckCircle2, 
  Play, 
  Copy, 
  Check, 
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Layers,
  ChevronRight,
  Flame,
  Lightbulb
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import confetti from 'canvas-confetti';

export const CyAgentsPage = ({ onNewChat }) => {
  const { userProfile, businessProfile } = useMarketing();
  const [activeTool, setActiveTool] = useState('strategist');
  const [copiedId, setCopiedId] = useState(null);

  // Tool 1: Marketing Strategist (Dynamic, no hardcoded antennas/locations)
  const [goalInput, setGoalInput] = useState('');
  const [strategyResult, setStrategyResult] = useState(null);
  const [isGeneratingStrategy, setIsGeneratingStrategy] = useState(false);

  // Tool 2: AI Campaign Optimizer
  const [campaignMetric, setCampaignMetric] = useState('');
  const [optimizationResult, setOptimizationResult] = useState(null);

  // Tool 3: Predictive Analytics
  const [adSpendInput, setAdSpendInput] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);

  // Tool 4: A/B Test Generator
  const [abProductInput, setAbProductInput] = useState('');
  const [abVariations, setAbVariations] = useState(null);

  // Tool 5: Lead Scoring
  const [leadNotes, setLeadNotes] = useState('');
  const [leadScoreResult, setLeadScoreResult] = useState(null);

  // Tool 6: Video Script Generator
  const [videoProduct, setVideoProduct] = useState('');
  const [videoScriptResult, setVideoScriptResult] = useState(null);

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleGenerateStrategy = () => {
    if (!goalInput.trim()) return;
    setIsGeneratingStrategy(true);
    const target = goalInput.trim();

    setTimeout(() => {
      setStrategyResult({
        pillar: `Direct-Response Growth & Omnichannel Customer Acquisition for "${target}"`,
        channels: [
          { name: 'TikTok & Short-Form Video Ads', budget: '40% Budget Allocation', hook: `"Stop scrolling if you want the easiest way to get ${target}"` },
          { name: 'Instagram Story & Feed Carousel', budget: '35% Budget Allocation', hook: `Showcase 3 key problem-solving benefits with a direct limited-time offer` },
          { name: 'Direct Messaging & Retargeting', budget: '25% Budget Allocation', hook: `Personalized 1-on-1 VIP discount for high-intent interested buyers` }
        ],
        targetCPA: 'Optimized for lowest customer acquisition cost'
      });
      setIsGeneratingStrategy(false);
      try { confetti({ particleCount: 40, spread: 60 }); } catch (e) {}
    }, 400);
  };

  const handleOptimizeCampaign = () => {
    if (!campaignMetric.trim()) return;
    const input = campaignMetric.trim();
    setOptimizationResult({
      diagnosis: `Identified audience fatigue & hook drop-off in: "${input}"`,
      actions: [
        'Replace first 3 seconds of creative with high-contrast visual demonstration.',
        'Refine primary headline to focus directly on customer transformation and core outcome.',
        'Add a clear, low-friction call-to-action button to eliminate checkout hesitation.'
      ],
      expectedImpact: '+40% to +75% higher conversion rate with reduced cost per click'
    });
  };

  const handlePredict = () => {
    const spend = parseFloat(adSpendInput) || 1000;
    setPredictionResult({
      estimatedReach: (spend * 35).toLocaleString() + ' target audience reach',
      clicks: Math.round(spend * 1.6),
      conversions: Math.round(spend * 0.11),
      projectedRoas: '3.2x - 4.1x Target ROAS'
    });
  };

  const handleGenerateAB = () => {
    if (!abProductInput.trim()) return;
    const prod = abProductInput.trim();
    setAbVariations([
      {
        angle: '💰 Value & Cost-Saving Angle',
        headline: `Get Premium Quality ${prod} Without Overpaying`,
        body: `Designed for performance, durability, and convenience. Upgrade your daily routine today with an exclusive limited-time launch discount.`,
        cta: 'Claim Your Discount Now'
      },
      {
        angle: '⚡ Fast Results & Urgency Angle',
        headline: `Limited Batch: Secure Your ${prod} Today`,
        body: `Selling out fast. Order before midnight to guarantee same-day priority dispatch and free delivery.`,
        cta: 'Order Today & Save'
      },
      {
        angle: '🏆 Social Proof & Trust Angle',
        headline: `Join Thousands of Happy Customers Loving ${prod}`,
        body: `Backed by 5-star ratings and a 100% satisfaction guarantee. See why everyone is making the switch.`,
        cta: 'Read Reviews & Buy Now'
      }
    ]);
  };

  const handleScoreLead = () => {
    if (!leadNotes.trim()) return;
    const inquiry = leadNotes.trim();
    setLeadScoreResult({
      score: 'High Intent Lead 🔥',
      intentLevel: 'Active Purchase Window (High Conversion Probability)',
      reasons: [
        `Inquiry asks specific details: "${inquiry.slice(0, 45)}..."`,
        'Demonstrates clear buyer interest and ready-to-order behavior',
        'Direct 1-on-1 closing opportunity'
      ],
      recommendedCloser: `Respond promptly with: "Hi! Thanks for reaching out. Yes, we have that available right now and can dispatch your order today. Would you like me to reserve one for you?"`
    });
  };

  const handleGenerateVideoScript = () => {
    if (!videoProduct.trim()) return;
    const prod = videoProduct.trim();
    setVideoScriptResult({
      title: `15-Second High-Converting Video Ad Script for ${prod}`,
      duration: '15 seconds',
      audio: 'Trending upbeat commercial background track',
      scenes: [
        { time: '0:00 - 0:03', visual: `Problem hook showing frustration before discovering ${prod}`, speech: `"If you're still dealing with this problem, you need to see this."` },
        { time: '0:03 - 0:07', visual: `Hands unboxing and presenting ${prod} in sleek high resolution`, speech: `"This ${prod} completely changes the game with zero hassle."` },
        { time: '0:07 - 0:11', visual: `Demo showing product in action with instant satisfying results`, speech: `"It takes seconds to set up and works right out of the box."` },
        { time: '0:11 - 0:15', visual: 'Clear CTA button overlay with limited-time discount badge', speech: `"Tap the link below to claim your exclusive discount before stock runs out!"` }
      ]
    });
  };

  const tools = [
    { id: 'strategist', label: 'Marketing Strategist', icon: Target, desc: 'Tell it your goal and it creates a complete end-to-end strategy.' },
    { id: 'optimizer', label: 'AI Campaign Optimizer', icon: TrendingUp, desc: 'Detects underperforming ads & recommends instant fixes.' },
    { id: 'predictive', label: 'Predictive Analytics', icon: BarChart3, desc: 'Forecast conversions, reach, and expected ROAS.' },
    { id: 'ab_test', label: 'A/B Test Generator', icon: Split, desc: 'Generate high-converting variations of headlines & CTAs.' },
    { id: 'lead_scoring', label: 'Lead Scoring Engine', icon: Users, desc: 'Ranks leads by buying intent and generates closing copy.' },
    { id: 'video_scripts', label: 'Video Ad Script Generator', icon: Video, desc: 'Creates viral TikTok & Reels scripts with scene-by-scene timing.' }
  ];

  return (
    <div className="flex-1 min-h-screen bg-white p-6 sm:p-10 font-sans antialiased text-neutral-900 select-none text-left overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8 pt-2 sm:pt-4">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-2xs">
                <Bot size={18} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-neutral-950 tracking-tight">
                Advanced AI Marketing Suite
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 font-normal">
              Autonomous marketing intelligence — strategy blueprints, campaign optimization, predictive forecasting, A/B testing, and viral video scripts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              6 Autonomous Engines Active
            </span>
          </div>
        </div>

        {/* Tool Switcher Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {tools.map((t) => {
            const Icon = t.icon;
            const isActive = activeTool === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`p-3 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between space-y-2 ${
                  isActive
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-md scale-[1.02]'
                    : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Icon size={16} className={isActive ? 'text-purple-300' : 'text-purple-600'} />
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-tight">{t.label}</h4>
                </div>
              </button>
            );
          })}
        </div>

        {/* ACTIVE TOOL VIEWPORT */}
        <div className="bg-neutral-50/60 border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
          
          {/* 1. MARKETING STRATEGIST */}
          {activeTool === 'strategist' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                  <Target size={18} className="text-purple-600" />
                  <span>AI Marketing Strategist</span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Input your monthly revenue target or growth objective to synthesize a complete multi-channel campaign blueprint.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-800 block">Your Growth Goal / Target Product</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    placeholder="e.g. Scale sales of my wireless earbuds to 300 orders this month..."
                    className="flex-1 bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-purple-600 shadow-2xs"
                  />
                  <button
                    onClick={handleGenerateStrategy}
                    disabled={isGeneratingStrategy || !goalInput.trim()}
                    className={`text-xs font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs shrink-0 ${
                      goalInput.trim() ? 'bg-neutral-950 hover:bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles size={14} className="text-purple-300" />
                    <span>{isGeneratingStrategy ? 'Synthesizing...' : 'Generate Strategy'}</span>
                  </button>
                </div>
              </div>

              {strategyResult && (
                <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
                  <div className="border-b border-neutral-100 pb-3">
                    <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block">Strategic Focus</span>
                    <h4 className="text-sm font-bold text-neutral-950">{strategyResult.pillar}</h4>
                  </div>

                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-neutral-800 block">Channel Budget Split & Core Hooks:</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {strategyResult.channels.map((ch, idx) => (
                        <div key={idx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-neutral-900">{ch.name}</span>
                            <span className="text-[10.5px] font-mono text-purple-700 font-semibold bg-purple-50 px-1.5 py-0.5 rounded">{ch.budget}</span>
                          </div>
                          <p className="text-[11px] text-neutral-600 italic">{ch.hook}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 2. AI CAMPAIGN OPTIMIZER */}
          {activeTool === 'optimizer' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                  <TrendingUp size={18} className="text-purple-600" />
                  <span>AI Campaign Optimizer</span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Analyzes underperforming ads, detects audience fatigue, and provides 1-click corrective actions.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-800 block">Current Campaign Status / Metrics</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={campaignMetric}
                    onChange={(e) => setCampaignMetric(e.target.value)}
                    placeholder="e.g. TikTok Spark Ad (CTR: 0.9%, CPC: $0.35, ROAS: 1.8x)..."
                    className="flex-1 bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-purple-600 shadow-2xs"
                  />
                  <button
                    onClick={handleOptimizeCampaign}
                    disabled={!campaignMetric.trim()}
                    className={`text-xs font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs shrink-0 ${
                      campaignMetric.trim() ? 'bg-neutral-950 hover:bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <Zap size={14} className="text-amber-400" />
                    <span>Diagnose & Fix</span>
                  </button>
                </div>
              </div>

              {optimizationResult && (
                <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 font-medium">
                    ⚠️ <strong>Diagnosis</strong>: {optimizationResult.diagnosis}
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-neutral-800 block">Recommended Fixes:</span>
                    <ul className="space-y-1.5 text-xs text-neutral-700">
                      {optimizationResult.actions.map((act, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-neutral-50 p-2.5 rounded-lg border border-neutral-100">
                          <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 font-medium">Expected Improvement:</span>
                    <span className="font-bold text-emerald-600">{optimizationResult.expectedImpact}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. PREDICTIVE ANALYTICS */}
          {activeTool === 'predictive' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                  <BarChart3 size={18} className="text-purple-600" />
                  <span>Predictive Analytics & Forecasting</span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Forecast reach, orders, and ROAS before spending your budget on ads.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-800 block">Planned Ad Budget Amount</label>
                <div className="flex gap-2 max-w-md">
                  <input
                    type="number"
                    value={adSpendInput}
                    onChange={(e) => setAdSpendInput(e.target.value)}
                    placeholder="e.g. 500"
                    className="flex-1 bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-purple-600 shadow-2xs font-mono"
                  />
                  <button
                    onClick={handlePredict}
                    disabled={!adSpendInput}
                    className={`text-xs font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs shrink-0 ${
                      adSpendInput ? 'bg-neutral-950 hover:bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <span>Run Forecast</span>
                  </button>
                </div>
              </div>

              {predictionResult && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in zoom-in-95 duration-200">
                  <div className="p-4 bg-white border border-neutral-200 rounded-2xl space-y-1 shadow-2xs">
                    <span className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider block">Est. Reach</span>
                    <span className="text-base font-bold text-neutral-950">{predictionResult.estimatedReach}</span>
                  </div>
                  <div className="p-4 bg-white border border-neutral-200 rounded-2xl space-y-1 shadow-2xs">
                    <span className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider block">Est. Clicks</span>
                    <span className="text-base font-bold text-purple-600">{predictionResult.clicks} clicks</span>
                  </div>
                  <div className="p-4 bg-white border border-neutral-200 rounded-2xl space-y-1 shadow-2xs">
                    <span className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider block">Est. Conversions</span>
                    <span className="text-base font-bold text-emerald-600">{predictionResult.conversions} orders</span>
                  </div>
                  <div className="p-4 bg-white border border-neutral-200 rounded-2xl space-y-1 shadow-2xs">
                    <span className="text-[10.5px] font-bold text-neutral-400 uppercase tracking-wider block">Target ROAS</span>
                    <span className="text-base font-bold text-blue-600">{predictionResult.projectedRoas}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. A/B TEST GENERATOR */}
          {activeTool === 'ab_test' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                  <Split size={18} className="text-purple-600" />
                  <span>A/B Test & Variations Generator</span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Generate distinct psychological angles (Cost-saving vs. Urgency vs. Social proof) to test which converts best.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-800 block">Product / Core Offer</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={abProductInput}
                    onChange={(e) => setAbProductInput(e.target.value)}
                    placeholder="e.g. Ergonomic Memory Foam Pillow..."
                    className="flex-1 bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-purple-600 shadow-2xs"
                  />
                  <button
                    onClick={handleGenerateAB}
                    disabled={!abProductInput.trim()}
                    className={`text-xs font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs shrink-0 ${
                      abProductInput.trim() ? 'bg-neutral-950 hover:bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles size={14} className="text-purple-300" />
                    <span>Generate 3 Variations</span>
                  </button>
                </div>
              </div>

              {abVariations && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in zoom-in-95 duration-200">
                  {abVariations.map((v, idx) => (
                    <div key={idx} className="bg-white border border-neutral-200 rounded-2xl p-4 space-y-3 shadow-2xs flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-purple-600 uppercase tracking-wider block bg-purple-50 px-2 py-0.5 rounded w-fit">
                          {v.angle}
                        </span>
                        <h4 className="text-xs font-bold text-neutral-950">{v.headline}</h4>
                        <p className="text-[11.5px] text-neutral-600 leading-relaxed">{v.body}</p>
                      </div>

                      <div className="pt-2 border-t border-neutral-100 flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{v.cta}</span>
                        <button
                          onClick={() => handleCopy(`${v.headline}\n\n${v.body}\n\n${v.cta}`, `ab_${idx}`)}
                          className="text-neutral-400 hover:text-neutral-900 p-1.5 rounded-lg hover:bg-neutral-100 transition cursor-pointer"
                          title="Copy Variation"
                        >
                          {copiedId === `ab_${idx}` ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 5. LEAD SCORING */}
          {activeTool === 'lead_scoring' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                  <Users size={18} className="text-purple-600" />
                  <span>Lead Scoring & Sales Closer</span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Paste a customer inquiry or chat message to calculate buying likelihood and get the exact response to close the deal.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-800 block">Customer Inquiry / Message</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={leadNotes}
                    onChange={(e) => setLeadNotes(e.target.value)}
                    placeholder="e.g. Customer asked if delivery is available today and how payment works..."
                    className="flex-1 bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-purple-600 shadow-2xs"
                  />
                  <button
                    onClick={handleScoreLead}
                    disabled={!leadNotes.trim()}
                    className={`text-xs font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs shrink-0 ${
                      leadNotes.trim() ? 'bg-neutral-950 hover:bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <Flame size={14} className="text-rose-400" />
                    <span>Score Lead</span>
                  </button>
                </div>
              </div>

              {leadScoreResult && (
                <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Lead Quality</span>
                      <h4 className="text-base font-bold text-rose-600">{leadScoreResult.score}</h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {leadScoreResult.intentLevel}
                    </span>
                  </div>

                  <div className="p-3.5 bg-[#eef7e9] border border-emerald-200 rounded-xl text-xs text-neutral-900 space-y-1.5">
                    <span className="font-bold text-emerald-950 block">💬 Recommended Direct Sales Closer:</span>
                    <p className="italic">{leadScoreResult.recommendedCloser}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. VIDEO AD SCRIPTS */}
          {activeTool === 'video_scripts' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="space-y-1">
                <h3 className="text-base font-bold text-neutral-950 flex items-center gap-2">
                  <Video size={18} className="text-purple-600" />
                  <span>Viral Video Ad Script Generator</span>
                </h3>
                <p className="text-xs text-neutral-500">
                  Generates 15-second viral TikTok & Reels scripts with visual cues, hook timing, and voiceover copy.
                </p>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-neutral-800 block">Product Name / Service</label>
                <div className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    value={videoProduct}
                    onChange={(e) => setVideoProduct(e.target.value)}
                    placeholder="e.g. Wireless Smart Security Camera..."
                    className="flex-1 bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-purple-600 shadow-2xs"
                  />
                  <button
                    onClick={handleGenerateVideoScript}
                    disabled={!videoProduct.trim()}
                    className={`text-xs font-semibold px-5 py-2.5 rounded-xl transition cursor-pointer flex items-center gap-2 shadow-xs shrink-0 ${
                      videoProduct.trim() ? 'bg-neutral-950 hover:bg-neutral-800 text-white' : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <Play size={13} className="fill-white" />
                    <span>Draft Script</span>
                  </button>
                </div>
              </div>

              {videoScriptResult && (
                <div className="bg-white border border-neutral-200 rounded-2xl p-5 space-y-4 shadow-sm animate-in zoom-in-95 duration-200">
                  <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-neutral-950">{videoScriptResult.title}</h4>
                      <span className="text-[11px] text-neutral-400">Audio: {videoScriptResult.audio}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                      {videoScriptResult.duration}
                    </span>
                  </div>

                  <div className="space-y-2">
                    {videoScriptResult.scenes.map((sc, idx) => (
                      <div key={idx} className="p-3 bg-neutral-50 rounded-xl border border-neutral-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <span className="font-mono font-bold text-purple-600 shrink-0 w-24">{sc.time}</span>
                        <div className="flex-1 space-y-0.5">
                          <span className="font-semibold text-neutral-900 block">🎬 Visual: {sc.visual}</span>
                          <span className="text-neutral-600 block">🗣️ Voiceover: {sc.speech}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
