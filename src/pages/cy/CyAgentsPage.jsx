import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  Sparkles, 
  TrendingUp, 
  Target, 
  Zap, 
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
  Search,
  Eye,
  Cpu,
  BarChart3,
  Sliders,
  DollarSign,
  AlertCircle,
  Clock,
  Send,
  Download,
  Share2,
  CheckCircle
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import { BrandBurstLogo } from '../../components/cy/CySidebar';
import confetti from 'canvas-confetti';

export const CyAgentsPage = ({ onNewChat }) => {
  const { userProfile, businessProfile, connectedSocials } = useMarketing();
  const [goalPrompt, setGoalPrompt] = useState('Get 500 new customers in 30 days with a $2,000 budget');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState(0);
  const [growthPlan, setGrowthPlan] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [isLaunchModalOpen, setIsLaunchModalOpen] = useState(false);
  const [launchedActions, setLaunchedActions] = useState([]);

  const pipelineSteps = [
    { title: "Analyzing business & historical performance data", icon: Eye },
    { title: "Researching competitors, pricing & market gaps", icon: Search },
    { title: "Auditing active ad campaigns, funnels & landing pages", icon: Sliders },
    { title: "Detecting high-leverage growth opportunities", icon: Flame },
    { title: "Building prioritized multi-channel growth plan", icon: Target },
    { title: "Generating creative assets, copy & video scripts", icon: Sparkles },
    { title: "Preparing autonomous experiments & budget allocations", icon: Zap }
  ];

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Autonomous Execution Loop
  const handleRunAutonomousGrowthAgent = () => {
    if (!goalPrompt.trim() || isExecuting) return;

    setIsExecuting(true);
    setExecutionStep(0);
    setGrowthPlan(null);

    // Sequence through autonomous observation and synthesis steps
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setExecutionStep(step);
      if (step >= pipelineSteps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExecuting(false);
          setGrowthPlan({
            goal: goalPrompt,
            estimatedOpportunity: "+22% to +35% Conversions",
            projectedRevenue: "$18,400 – $26,500",
            projectedCAC: "$16.20 (-28% reduction)",
            autonomousStatement: "I found 3 critical bottlenecks in your funnel. I drafted the fixes, reallocated projected budget toward top-ROI channels, and prepared 5 prioritized actions. Here is what I am executing next.",
            priorities: [
              {
                id: 'p1',
                number: '01',
                title: 'Fix Landing-Page Conversion Friction',
                tag: 'CRO & Funnel',
                tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
                impact: 'High (+12% Conversion Rate)',
                problem: 'Current headline and CTA have a 68% bounce rate in under 4 seconds on mobile.',
                fix: 'Deploy high-urgency hero headline with 3 trust badges and sticky 1-click checkout button.',
                actionCopy: 'Hero Headline: "The Smarter Way to Get Results — Guaranteed in 14 Days."\nCTA: "Claim Your VIP Offer (Limited Spots)"'
              },
              {
                id: 'p2',
                number: '02',
                title: 'Launch Meta & TikTok High-Intent Retargeting',
                tag: 'Paid Ads',
                tagColor: 'text-purple-700 bg-purple-50 border-purple-200',
                impact: 'High (4.8x Target ROAS)',
                problem: '3,400 recent store visitors browsed products without seeing a follow-up ad.',
                fix: 'Allocate $600 to 2-stage retargeting with customer review videos and time-sensitive voucher.',
                actionCopy: 'Target: Website Visitors (Last 14 Days) Exclude Buyers\nAd Hook: "Still thinking about it? Here is why 1,200+ customers switched this month."'
              },
              {
                id: 'p3',
                number: '03',
                title: 'Test 4 High-Converting Creative Angles',
                tag: 'Creative Lab',
                tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
                impact: 'Medium (+40% Click-Through Rate)',
                problem: 'Existing ad creatives have frequency fatigue (> 3.4).',
                fix: 'Rotate 4 distinct direct-response angles: 1) Problem-Agitation, 2) Social Proof, 3) Loss Aversion, 4) Founder Story.',
                actionCopy: 'Angle #1: "The 3 biggest mistakes people make when buying..."\nAngle #2: "Before vs After using this for 7 days."'
              },
              {
                id: 'p4',
                number: '04',
                title: 'Deploy Automated Abandoned-Cart WhatsApp & Email Flow',
                tag: 'Lifecycle',
                tagColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
                impact: 'Very High (14.2x ROI)',
                problem: '24% of checkout carts are abandoned without automated reminder notifications.',
                fix: 'Set up 3-stage automated sequence triggered at 15m, 6h, and 24h with dynamic 5% incentive.',
                actionCopy: 'WhatsApp Trigger (15m): "Hey {customer_name}! Your cart is waiting. Use code FLASH5 to complete your order in 1 click: {cart_link}"'
              },
              {
                id: 'p5',
                number: '05',
                title: 'Launch High-Intent SEO Buyer Content Cluster',
                tag: 'SEO & Organic',
                tagColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
                impact: 'Long-term (Zero Ad Spend Traffic)',
                problem: 'Competitors are ranking for 18 high-volume transactional search terms.',
                fix: 'Publish 4 comparison & review articles targeting top-of-funnel decision makers.',
                actionCopy: 'Keyword 1: "Best {product_category} in 2026 (Full Review)"\nKeyword 2: "{product_category} vs competitor pricing breakdown"'
              }
            ]
          });
          try { confetti({ particleCount: 50, spread: 70 }); } catch (e) {}
        }, 300);
      }
    }, 450);
  };

  // Run on initial page mount if empty
  useEffect(() => {
    if (!growthPlan && !isExecuting) {
      handleRunAutonomousGrowthAgent();
    }
  }, []);

  const handleLaunchAll = () => {
    setIsLaunchModalOpen(true);
    setLaunchedActions(['p1', 'p2', 'p3', 'p4', 'p5']);
    try { confetti({ particleCount: 80, spread: 90 }); } catch (e) {}
  };

  const autonomousLoopFeed = [
    { time: '04:12 AM', stage: 'Observe', text: 'Detected 14% checkout drop-off spike between 8 PM - 11 PM on mobile.', color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { time: '04:14 AM', stage: 'Decide', text: 'Ad creative Angle A fatigued (frequency 3.8). Formulated Angle B (UGC Problem-Solve).', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { time: '04:15 AM', stage: 'Execute', text: 'Rotated creative in Meta Campaign #1 and reallocated $250 to WhatsApp VIP flow.', color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { time: '04:22 AM', stage: 'Measure', text: 'Cart recovery rate rebounded +22% (19 recovered orders, $1,850 revenue).', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { time: '04:28 AM', stage: 'Improve', text: 'Calvras auto-scheduled A/B test on checkout CTA button for tomorrow morning.', color: 'text-indigo-600 bg-indigo-50 border-indigo-200' }
  ];

  const subAgents = [
    { name: 'Campaign Agent', role: 'Monitors & auto-optimizes Meta, TikTok & Google Ads', status: '🟢 Active (4 Ad Sets Optimizing)', icon: Sliders },
    { name: 'Research Agent', role: 'Scans competitors, market trends & audience gaps', status: '🟢 Active (8 Competitors Tracked)', icon: Search },
    { name: 'Content Agent', role: 'Maintains content engine & produces creative variations', status: '🟢 Active (4 Hooks Queued)', icon: Sparkles },
    { name: 'Analytics Agent', role: 'Watches metrics & detects revenue anomalies 24/7', status: '🟢 Active (Real-time Anomaly Guard)', icon: BarChart3 },
    { name: 'Experiment Agent', role: 'Manages continuous A/B tests & statistical significance', status: '🟢 Active (A/B Test #2 Running)', icon: Zap },
    { name: 'Lifecycle Agent', role: 'Automates email & WhatsApp customer retention flows', status: '🟢 Active (Cart Recovery 28.4%)', icon: Target }
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#fafafc] flex flex-col justify-start p-4 sm:p-8 lg:p-10 font-sans antialiased text-white select-none overflow-y-auto w-full min-w-0 text-left">
      
      <div className="max-w-6xl mx-auto w-full space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                <Bot size={18} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-serif">
                Autonomous Growth Agent
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 mt-1">
              Observe $\rightarrow$ Decide $\rightarrow$ Execute $\rightarrow$ Measure $\rightarrow$ Improve. Calvras autonomously powers your entire marketing pipeline.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-emerald-200 bg-emerald-50/80 text-emerald-800 text-xs font-semibold shadow-2xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Agent System Online</span>
            </span>
          </div>
        </div>

        {/* 1. Hero Goal Command Launcher: "What are we trying to achieve?" */}
        <div className="bg-[#282828] border border-white/10 focus-within:border-neutral-900 rounded-3xl p-5 sm:p-6 shadow-xs space-y-4 transition">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BrandBurstLogo size={18} />
              <span className="text-sm font-bold text-white">CALVRAS CHIEF AGENT</span>
            </div>
            <span className="text-xs font-medium text-neutral-400">Give a goal & budget — Calvras plans & executes</span>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-neutral-700 uppercase tracking-wider block">
              What are we trying to achieve?
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
              <input
                type="text"
                value={goalPrompt}
                onChange={(e) => setGoalPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleRunAutonomousGrowthAgent()}
                placeholder="e.g. 'Get 500 new customers in 30 days with a $2,000 budget'..."
                className="w-full bg-[#282828] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white font-medium placeholder:text-neutral-400 focus:outline-none focus:bg-white focus:border-purple-600 transition"
              />
              <button
                onClick={handleRunAutonomousGrowthAgent}
                disabled={isExecuting}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition cursor-pointer shrink-0 active:scale-95"
              >
                {isExecuting ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    <span>Executing Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Zap size={14} className="text-amber-400 fill-amber-400" />
                    <span>Run Growth Agent</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preset One-Click Mission Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] text-neutral-400 font-medium">Quick Missions:</span>
            {[
              "Generate landing-page improvements (CRO Audit)",
              "Get 500 new customers in 30 days ($2k budget)",
              "Increase store conversion rate by +30%",
              "Scale high-ROI retargeting & stop ad fatigue",
              "Outrank top 3 competitors on Google & TikTok"
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setGoalPrompt(preset);
                  setTimeout(() => handleRunAutonomousGrowthAgent(), 50);
                }}
                className="text-[11px] font-medium text-neutral-600 bg-neutral-100 hover:bg-neutral-200/80 border border-white/10/80 px-2.5 py-1 rounded-xl transition cursor-pointer"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Real-time Agent Pipeline Execution Visualizer */}
          {isExecuting && (
            <div className="mt-4 p-4 rounded-2xl bg-purple-50/60 border border-purple-100 space-y-2.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                <span className="text-xs font-bold text-purple-950 flex items-center gap-2">
                  <RefreshCw size={13} className="animate-spin text-purple-600" />
                  <span>Calvras is autonomously analyzing & synthesizing...</span>
                </span>
                <span className="text-[11px] font-mono font-semibold text-purple-700">
                  Step {Math.min(executionStep + 1, pipelineSteps.length)} of {pipelineSteps.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {pipelineSteps.map((step, idx) => {
                  const isDone = executionStep > idx;
                  const isCurrent = executionStep === idx;
                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center gap-2 text-xs px-2.5 py-1.5 rounded-xl transition ${
                        isDone 
                          ? 'text-emerald-900 bg-emerald-50 border border-emerald-200/60' 
                          : isCurrent 
                          ? 'text-purple-950 bg-white border border-purple-300 font-semibold shadow-2xs' 
                          : 'text-neutral-400 bg-neutral-50/50 opacity-60'
                      }`}
                    >
                      {isDone ? (
                        <CheckCircle2 size={13} className="text-emerald-600 shrink-0" />
                      ) : isCurrent ? (
                        <RefreshCw size={13} className="text-purple-600 animate-spin shrink-0" />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-neutral-300 shrink-0" />
                      )}
                      <span className="truncate">{step.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* 2. Autonomous Growth Plan Action Center */}
        {growthPlan && (
          <div className="space-y-5 animate-in fade-in duration-200">
            
            {/* Top Strategy KPI Banner */}
            <div className="bg-gradient-to-br from-neutral-900 to-neutral-950 text-white rounded-3xl p-6 sm:p-7 shadow-lg space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-800 pb-4 relative z-10">
                <div>
                  <span className="text-[11px] font-mono text-purple-400 font-bold uppercase tracking-widest block">
                    Autonomous Growth Plan
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                    Goal: {growthPlan.goal}
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLaunchAll}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition cursor-pointer active:scale-95"
                  >
                    <Play size={13} className="fill-white" />
                    <span>Review & Launch All (5)</span>
                  </button>
                </div>
              </div>

              {/* Impact Metrics Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 relative z-10">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                  <span className="text-[11px] text-neutral-400 uppercase block">Estimated Opportunity</span>
                  <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">
                    {growthPlan.estimatedOpportunity}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                  <span className="text-[11px] text-neutral-400 uppercase block">Projected Revenue Impact</span>
                  <span className="text-lg sm:text-xl font-bold text-white font-mono">
                    {growthPlan.projectedRevenue}
                  </span>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                  <span className="text-[11px] text-neutral-400 uppercase block">Target CAC</span>
                  <span className="text-lg sm:text-xl font-bold text-purple-300 font-mono">
                    {growthPlan.projectedCAC}
                  </span>
                </div>
              </div>

              {/* Agent Autonomous Statement */}
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 leading-relaxed font-normal relative z-10 flex items-start gap-2.5">
                <BrandBurstLogo size={16} className="mt-0.5 shrink-0 text-purple-400" />
                <span>
                  <strong className="text-white">Calvras Autonomous Update: </strong>
                  {growthPlan.autonomousStatement}
                </span>
              </div>
            </div>

            {/* Prioritized Action Cards (Priority 01 to 05) */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Prioritized Autonomous Actions (Ordered by Impact & Speed)
                </h3>
                <span className="text-xs text-neutral-400 font-mono">5 High-Impact Moves</span>
              </div>

              <div className="space-y-3.5">
                {growthPlan.priorities.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-[#282828] border border-white/10 hover:border-neutral-300 rounded-2xl p-5 shadow-2xs transition space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-xs font-bold font-mono">
                          {item.number}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${item.tagColor}`}>
                              {item.tag}
                            </span>
                            <span className="text-[11px] text-emerald-700 font-semibold">{item.impact}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <button
                          onClick={() => handleCopy(item.actionCopy, item.id)}
                          className="px-3 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 text-neutral-700 text-xs font-semibold flex items-center gap-1 transition cursor-pointer"
                        >
                          {copiedId === item.id ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                          <span>{copiedId === item.id ? 'Copied' : 'Copy Payload'}</span>
                        </button>

                        <button
                          onClick={() => {
                            setLaunchedActions(prev => prev.includes(item.id) ? prev : [...prev, item.id]);
                            try { confetti({ particleCount: 30, spread: 50 }); } catch (e) {}
                          }}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                            launchedActions.includes(item.id)
                              ? 'bg-emerald-600 text-white shadow-xs'
                              : 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-xs'
                          }`}
                        >
                          {launchedActions.includes(item.id) ? (
                            <>
                              <CheckCircle size={12} />
                              <span>Launched</span>
                            </>
                          ) : (
                            <>
                              <Play size={11} className="fill-white" />
                              <span>Execute Action</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-red-50/50 border border-red-100 rounded-xl space-y-1">
                        <span className="text-[10.5px] font-bold text-red-800 uppercase block">Detected Problem / Leak:</span>
                        <p className="text-neutral-700 leading-relaxed">{item.problem}</p>
                      </div>
                      <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-1">
                        <span className="text-[10.5px] font-bold text-emerald-800 uppercase block">Calvras Autonomous Fix:</span>
                        <p className="text-neutral-700 leading-relaxed">{item.fix}</p>
                      </div>
                    </div>

                    {/* Pre-generated Action Copy/Script */}
                    <div className="p-3 bg-neutral-50 rounded-xl border border-white/10/80 font-mono text-[11.5px] text-neutral-200 whitespace-pre-wrap leading-relaxed">
                      {item.actionCopy}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* 3. Live Autonomous Loop Feed (Observe -> Decide -> Execute -> Measure -> Improve) */}
        <div className="bg-[#282828] border border-white/10 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-purple-50 border border-purple-100 flex items-center justify-center">
                <Cpu size={14} className="text-purple-600" />
              </div>
              <h3 className="text-sm font-bold text-white">
                Live Autonomous Loop (Observe $\rightarrow$ Decide $\rightarrow$ Execute $\rightarrow$ Measure $\rightarrow$ Improve)
              </h3>
            </div>
            <span className="text-xs font-mono text-neutral-400">Autonomous Event Log</span>
          </div>

          <div className="space-y-2.5">
            {autonomousLoopFeed.map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-neutral-50/80 border border-white/10/60 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-neutral-400 text-[11px] shrink-0">{item.time}</span>
                  <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-md border shrink-0 ${item.color}`}>
                    {item.stage}
                  </span>
                  <span className="text-neutral-200 font-medium">{item.text}</span>
                </div>
                <span className="text-[10.5px] text-emerald-600 font-semibold self-start sm:self-auto shrink-0 flex items-center gap-1">
                  <CheckCircle2 size={11} />
                  <span>Success</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Specialized Under-the-Hood Sub-Agent Engines */}
        <div className="bg-[#282828] border border-white/10 rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div>
              <h3 className="text-sm font-bold text-white">
                Calvras Autonomous Sub-Agent Engines
              </h3>
              <p className="text-xs text-neutral-400">
                Specialized autonomous sub-agents operating synchronously under Calvras.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-purple-700 bg-purple-50 border border-purple-100 px-2.5 py-1 rounded-lg">
              6 / 6 Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {subAgents.map((agent, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-white/10 bg-neutral-50/50 space-y-2 hover:bg-white hover:border-neutral-300 transition">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{agent.name}</span>
                  <agent.icon size={14} className="text-purple-600" />
                </div>
                <p className="text-[11.5px] text-neutral-400 leading-relaxed">{agent.role}</p>
                <div className="pt-1 text-[11px] font-mono text-emerald-700 font-semibold">
                  {agent.status}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Review & Launch Confirmation Modal */}
      {isLaunchModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-150">
          <div className="bg-[#282828] border border-white/10 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-5 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center gap-2">
                <BrandBurstLogo size={18} />
                <h3 className="text-base font-bold text-white">Autonomous Actions Deployed</h3>
              </div>
              <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-bold border border-emerald-200">
                100% Synced
              </span>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed">
              All 5 prioritized growth actions have been queued and staged across your connected marketing channels:
            </p>

            <div className="space-y-2 text-xs font-medium text-neutral-200">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Priority 01: Landing page headline & sticky CTA staged</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Priority 02: Meta & TikTok 14-day visitor retargeting ad set armed</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Priority 03: 4 creative variations rotated into active ad schedule</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Priority 04: WhatsApp 3-stage cart recovery workflow activated</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-xl bg-neutral-50">
                <CheckCircle2 size={13} className="text-emerald-600" />
                <span>Priority 05: SEO content briefs dispatched to content queue</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsLaunchModalOpen(false)}
                className="w-full py-3 rounded-2xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition cursor-pointer shadow-xs"
              >
                Done & Continue Monitoring
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
