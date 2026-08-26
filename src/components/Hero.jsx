import React, { useState } from 'react';
import { ChevronDown, Sparkles, Check, ArrowRight, TrendingUp, DollarSign, Target, BarChart2, RefreshCw, Zap } from 'lucide-react';

export const Hero = ({ onNavigate }) => {
  // Pure Marketing & Growth Scenarios
  const scenarios = [
    {
      action: "Launch an",
      deliverable: "Ad Campaign",
      connector: "for a",
      client: "DTC Skincare Brand",
      prompt: "Generate a complete Meta & TikTok scaling sprint: 3 viral UGC video hooks, Advantage+ ad copy variations, and a 1-click post-purchase upsell funnel.",
      canvasImages: [
        { 
          url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop", 
          label: "Meta 4:5 Feed Ad Creative", 
          dims: "1080 × 1350",
          metric: "ROAS 4.8x • CTR 3.4%"
        },
        { 
          url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop", 
          label: "TikTok Spark Ad 9:16", 
          dims: "1080 × 1920",
          metric: "84k Clicks • $1.20 CPC"
        },
        { 
          url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop", 
          label: "Post-Purchase 1-Click Upsell", 
          dims: "600 × 400",
          metric: "+$18 AOV Lift"
        }
      ],
      aiSteps: [
        { label: "Audited competitor ad creatives & hooks" },
        { label: "Formulated 3:2:2 Dynamic Testing framework" },
        { label: "Calculated target CAC & $3,000/day pacing" }
      ],
      aiOutput: "Campaign blueprint ready: 3 video scripts, 5 direct-response copy angles, and Klaviyo email flows compiled."
    },
    {
      action: "Scale",
      deliverable: "Viral Video Hooks",
      connector: "for a",
      client: "TikTok Shop Brand",
      prompt: "Write 5 pattern-interrupt TikTok video scripts for our apparel drop to stop the scroll, generate 500k+ views, and drive direct TikTok Shop checkouts.",
      canvasImages: [
        { 
          url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop", 
          label: "TikTok Shop 9:16 Hook", 
          dims: "1080 × 1920",
          metric: "1.4M Views • $52k GMV"
        },
        { 
          url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop", 
          label: "Creator Spark Video", 
          dims: "1080 × 1920",
          metric: "32% Watch-Through"
        },
        { 
          url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop", 
          label: "Flash Sale Countdown Overlay", 
          dims: "600 × 400",
          metric: "14% Checkout CVR"
        }
      ],
      aiSteps: [
        { label: "Extracted top 1% viral retention patterns" },
        { label: "Structured 3-second visual interrupt script" },
        { label: "Configured TikTok Shop flash discount triggers" }
      ],
      aiOutput: "5 Viral video scripts generated with exact camera physics, B-roll cues, and TikTok Shop product tags."
    },
    {
      action: "Build a",
      deliverable: "Growth Funnel",
      connector: "for a",
      client: "B2B SaaS Platform",
      prompt: "Build an enterprise growth engine: LinkedIn Document Ads targeting VPs, an executive briefing landing page, and an automated churn deflection flow.",
      canvasImages: [
        { 
          url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop", 
          label: "LinkedIn Sponsored Document Ad", 
          dims: "1200 × 628",
          metric: "CPL $42 • 18% Form CVR"
        },
        { 
          url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", 
          label: "Executive Briefing Squeeze Page", 
          dims: "1440 × 900",
          metric: "32.4% Opt-in Rate"
        },
        { 
          url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop", 
          label: "In-App Churn Deflection Modal", 
          dims: "600 × 400",
          metric: "Churn Dropped to 3.8%"
        }
      ],
      aiSteps: [
        { label: "Segmented 500 ICP Director & VP accounts" },
        { label: "Drafted 7-slide swipeable PDF Document Ad" },
        { label: "Optimized native LinkedIn Lead Gen Form" }
      ],
      aiOutput: "B2B Pipeline architecture ready: LinkedIn campaigns, high-converting copy teardowns, and churn deflection active."
    }
  ];

  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const activeScenario = scenarios[activeScenarioIndex];

  const cycleScenario = () => {
    setActiveScenarioIndex((prev) => (prev + 1) % scenarios.length);
  };

  return (
    <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-[#0d0e0c] text-white overflow-hidden text-center select-none">
      
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-8">
        
        {/* Eyebrow Label */}
        <div className="space-y-4">
          <p className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.24em] uppercase text-neutral-400">
            YOUR AUTONOMOUS AI MARKETING TEAM
          </p>

          {/* Luxury Serif Interactive Marketing Headline */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[#f4f4ee] tracking-tight leading-[1.12]">
              {activeScenario.action}{' '}
              <button 
                onClick={cycleScenario}
                title="Click to change marketing scenario"
                className="underline decoration-neutral-500 underline-offset-8 hover:decoration-white transition cursor-pointer"
              >
                {activeScenario.deliverable}
              </button>
              <sup className="text-xs sm:text-sm font-sans text-neutral-500 font-normal ml-1">
                ({activeScenarioIndex + 1})
              </sup>
              <br className="hidden sm:inline" />
              {' '}{activeScenario.connector}{' '}
              <button 
                onClick={cycleScenario}
                title="Click to change marketing scenario"
                className="underline decoration-neutral-500 underline-offset-8 hover:decoration-white transition cursor-pointer"
              >
                {activeScenario.client}
              </button>
            </h1>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-2 flex items-center justify-center gap-4">
          <button 
            onClick={() => onNavigate('get-started')}
            className="bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-sm sm:text-[15px] px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer shadow-lg hover:shadow-2xl active:scale-95 flex items-center gap-2"
          >
            <span>Launch campaign</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Hero Marketing Canvas Mockup (Lovart Architecture with Pure Marketing Data) */}
        <div className="pt-8 sm:pt-12 max-w-6xl mx-auto text-left">
          
          {/* Outer Canvas Backdrop with Earthy Texture */}
          <div className="p-3 sm:p-5 md:p-7 rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#8a9179] via-[#7d856d] to-[#6d755e] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/15 relative overflow-hidden">
            
            {/* Inner Marketing Workstation Window */}
            <div className="w-full bg-[#121310] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              
              {/* Workspace Top Toolbar */}
              <div className="px-5 py-3.5 bg-[#171815] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
                    <TrendingUp size={13} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-white flex items-center gap-1.5 cursor-pointer hover:text-neutral-200">
                    <span>{activeScenario.client} • {activeScenario.deliverable}</span>
                    <ChevronDown size={14} className="text-neutral-400" />
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={cycleScenario}
                    className="text-[11px] font-semibold text-neutral-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={11} />
                    <span>Swap Campaign</span>
                  </button>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              {/* Workspace Split Layout: Marketing Artboard (Left) + AI Marketing Copilot (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                
                {/* Left: Interactive Multi-Channel Ad Creative Artboard */}
                <div className="lg:col-span-8 p-6 sm:p-8 bg-[#10110e] relative overflow-hidden flex flex-col justify-between">
                  
                  {/* Grid Dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                  {/* Marketing Assets Showcase */}
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                    
                    {/* Primary Selected High-Performing Ad Creative with Blue Bounding Box */}
                    <div className="sm:col-span-6 relative group">
                      <div className="relative rounded-xl overflow-hidden border-2 border-[#3b82f6] shadow-xl bg-black">
                        
                        {/* Ad Type Tag & Live Telemetry Metric Badge */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#3b82f6] text-[10px] font-bold text-white z-20 flex items-center gap-1">
                          <Target size={10} />
                          <span>Ad Creative</span>
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-emerald-500/90 text-[10px] font-bold text-white z-20 shadow-md">
                          {activeScenario.canvasImages[0].metric}
                        </div>

                        <img 
                          src={activeScenario.canvasImages[0].url} 
                          alt={activeScenario.canvasImages[0].label}
                          className="w-full h-64 object-cover object-center transform group-hover:scale-105 transition duration-500"
                        />

                        {/* CTA Overlay Bar on Ad Creative */}
                        <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black via-black/70 to-transparent flex items-center justify-between text-white">
                          <span className="text-[11px] font-bold">\"Claim 20% Off Your First Order\"</span>
                          <span className="text-[10px] bg-white text-black font-extrabold px-2 py-0.5 rounded">SHOP NOW</span>
                        </div>

                        {/* 4 Corner Blue Anchors */}
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#3b82f6] rounded-xs" />
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#3b82f6] rounded-xs" />
                        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#3b82f6] rounded-xs" />
                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#3b82f6] rounded-xs" />
                      </div>
                      
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2 font-mono">
                        <span>{activeScenario.canvasImages[0].label}</span>
                        <span>{activeScenario.canvasImages[0].dims}</span>
                      </div>
                    </div>

                    {/* Secondary Marketing Assets */}
                    <div className="sm:col-span-6 space-y-4">
                      
                      {/* Secondary Ad Asset */}
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-neutral-900/80 p-2 relative shadow-md space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-white font-semibold flex items-center gap-1.5">
                            <Zap size={12} className="text-[#ff5e28]" />
                            <span>{activeScenario.canvasImages[1].label}</span>
                          </span>
                          <span className="text-emerald-400 font-mono text-[10px] font-bold">
                            {activeScenario.canvasImages[1].metric}
                          </span>
                        </div>
                        <img 
                          src={activeScenario.canvasImages[1].url} 
                          alt={activeScenario.canvasImages[1].label}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      </div>

                      {/* Backend Retention & Upsell Box */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-1.5">
                        <div className="flex items-center justify-between text-white font-semibold">
                          <span className="flex items-center gap-1.5">
                            <DollarSign size={13} className="text-emerald-400" />
                            <span>{activeScenario.canvasImages[2].label}</span>
                          </span>
                          <span className="text-emerald-400 text-[10px] font-mono font-bold">
                            {activeScenario.canvasImages[2].metric}
                          </span>
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                          Automated 1-click upsell triggering immediately before thank-you page to expand allowable acquisition CAC.
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Bottom Canvas Telemetry Status Bar */}
                  <div className="pt-6 flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-white/5">
                    <span>STATUS: LIVE MEDIA BUYING SPRINT ACTIVE</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      AUTONOMOUS ROAS OPTIMIZATION ON
                    </span>
                  </div>

                </div>

                {/* Right: AI Marketing Copilot Chat & Execution Pipeline */}
                <div className="lg:col-span-4 p-5 sm:p-6 bg-[#161714] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-4">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                        <BarChart2 size={13} className="text-emerald-400" />
                        <span>Marketing Copilot</span>
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">300+ PLAYBOOKS</span>
                    </div>

                    {/* User Campaign Directive */}
                    <div className="p-3.5 rounded-2xl bg-[#20221c] border border-white/10 text-xs text-neutral-200 leading-relaxed">
                      "{activeScenario.prompt}"
                    </div>

                    {/* AI Chain-of-Thought Marketing Trajectory */}
                    <div className="space-y-2 text-xs text-neutral-300 pl-1">
                      {activeScenario.aiSteps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-neutral-300">
                          <Check size={12} className="text-emerald-400 shrink-0" />
                          <span>{step.label}</span>
                        </div>
                      ))}
                    </div>

                    {/* Direct Assistant Output Box */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                        <Check size={12} strokeWidth={3} />
                        <span>High-Converting Assets Ready</span>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-relaxed">
                        {activeScenario.aiOutput}
                      </p>
                    </div>

                  </div>

                  {/* Action Launch Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('get-started')}
                      className="w-full py-3 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs transition cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Deploy Marketing Sprint</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
