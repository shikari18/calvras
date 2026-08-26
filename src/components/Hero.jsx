import React, { useState } from 'react';
import { ChevronDown, Sparkles, Check, ArrowRight, Layers, Layout, Globe, Search, RefreshCw } from 'lucide-react';

export const Hero = ({ onNavigate }) => {
  // Preset scenarios to let user cycle through the Lovart interactive headline
  const scenarios = [
    {
      action: "Design a",
      deliverable: "Brand System",
      connector: "for a",
      client: "Local Coffee Shop",
      prompt: "Develop a complete visual & marketing identity for a neighborhood artisan coffee shop, covering in-store menu boards, packaging cups, and Instagram reels.",
      canvasImages: [
        { url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop", label: "Hero Atmosphere", dims: "540 × 720" },
        { url: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop", label: "Packaging Concept", dims: "400 × 400" },
        { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop", label: "Menu Typography", dims: "600 × 400" }
      ]
    },
    {
      action: "Launch a",
      deliverable: "Growth Engine",
      connector: "for a",
      client: "DTC Skincare Brand",
      prompt: "Generate a complete multi-channel marketing sprint: 3 Meta video ad scripts, 1 high-converting PDP landing page, and a 4-part Klaviyo welcome sequence.",
      canvasImages: [
        { url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop", label: "Botanical Serum", dims: "540 × 720" },
        { url: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop", label: "UGC Video Hook", dims: "400 × 400" },
        { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop", label: "Offer Matrix", dims: "600 × 400" }
      ]
    },
    {
      action: "Scale an",
      deliverable: "Ad Campaign",
      connector: "for a",
      client: "B2B SaaS Platform",
      prompt: "Build an account-based LinkedIn sponsored document ad sequence, high-ticket executive briefing memo, and automated churn deflection architecture.",
      canvasImages: [
        { url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop", label: "Executive Dashboard", dims: "540 × 720" },
        { url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop", label: "Telemetry Telemetry", dims: "400 × 400" },
        { url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop", label: "Enterprise Flow", dims: "600 × 400" }
      ]
    }
  ];

  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);
  const activeScenario = scenarios[activeScenarioIndex];

  const cycleScenario = () => {
    setActiveScenarioIndex((prev) => (prev + 1) % scenarios.length);
  };

  return (
    <section id="hero" className="relative pt-32 pb-24 md:pt-40 md:pb-36 bg-[#0d0e0c] text-white overflow-hidden text-center select-none">
      
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 space-y-8">
        
        {/* Eyebrow Label matching Lovart Screenshot */}
        <div className="space-y-4">
          <p className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.24em] uppercase text-neutral-400">
            YOUR AI MARKETING PARTNER
          </p>

          {/* Luxury Serif Interactive Headline */}
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-normal text-[#f4f4ee] tracking-tight leading-[1.12]">
              {activeScenario.action}{' '}
              <button 
                onClick={cycleScenario}
                title="Click to change scenario"
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
                title="Click to change scenario"
                className="underline decoration-neutral-500 underline-offset-8 hover:decoration-white transition cursor-pointer"
              >
                {activeScenario.client}
              </button>
            </h1>
          </div>
        </div>

        {/* Action Button matching Lovart Pill */}
        <div className="pt-2 flex items-center justify-center gap-4">
          <button 
            onClick={() => onNavigate('get-started')}
            className="bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-sm sm:text-[15px] px-8 py-3.5 rounded-full transition-all duration-200 cursor-pointer shadow-lg hover:shadow-2xl active:scale-95 flex items-center gap-2"
          >
            <span>Create now</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Hero Showcase Canvas Mockup (Matching Lovart Screenshot Board) */}
        <div className="pt-8 sm:pt-12 max-w-6xl mx-auto text-left">
          
          {/* Outer Canvas Backdrop with Earthy Texture */}
          <div className="p-3 sm:p-5 md:p-7 rounded-[32px] sm:rounded-[40px] bg-gradient-to-b from-[#8a9179] via-[#7d856d] to-[#6d755e] shadow-[0_30px_100px_rgba(0,0,0,0.8)] border border-white/15 relative overflow-hidden">
            
            {/* Inner Studio Workstation Window */}
            <div className="w-full bg-[#121310] rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
              
              {/* Workspace Top Toolbar */}
              <div className="px-5 py-3.5 bg-[#171815] border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-xs text-white">
                    ☕
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-white flex items-center gap-1.5 cursor-pointer hover:text-neutral-200">
                    <span>{activeScenario.client} {activeScenario.deliverable}</span>
                    <ChevronDown size={14} className="text-neutral-400" />
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={cycleScenario}
                    className="text-[11px] font-semibold text-neutral-400 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw size={11} />
                    <span>Swap Scenario</span>
                  </button>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>

              {/* Workspace Split Layout: Artboard Canvas (Left) + AI Studio Chat (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
                
                {/* Left: Interactive Multi-Asset Canvas Artboard */}
                <div className="lg:col-span-8 p-6 sm:p-8 bg-[#10110e] relative overflow-hidden flex flex-col justify-between">
                  
                  {/* Subtle Grid Dots */}
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />

                  {/* Asset Selection Mockup Card */}
                  <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                    
                    {/* Main Selected Asset with Blue Transform Bounding Box (Like Lovart) */}
                    <div className="sm:col-span-6 relative group">
                      <div className="relative rounded-xl overflow-hidden border-2 border-[#3b82f6] shadow-xl bg-black">
                        
                        {/* Transform Tag */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#3b82f6] text-[10px] font-bold text-white z-20 flex items-center gap-1">
                          <Layout size={10} />
                          <span>Image</span>
                        </div>
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-neutral-300 z-20">
                          {activeScenario.canvasImages[0].dims}
                        </div>

                        <img 
                          src={activeScenario.canvasImages[0].url} 
                          alt={activeScenario.canvasImages[0].label}
                          className="w-full h-64 object-cover object-center transform group-hover:scale-105 transition duration-500"
                        />

                        {/* 4 Corner Blue Anchors */}
                        <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#3b82f6] rounded-xs" />
                        <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#3b82f6] rounded-xs" />
                        <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#3b82f6] rounded-xs" />
                        <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#3b82f6] rounded-xs" />
                      </div>
                      <p className="text-[11px] text-neutral-400 mt-2 font-mono">
                        Primary Key Visual • 8k Photorealistic
                      </p>
                    </div>

                    {/* Secondary Asset Cards */}
                    <div className="sm:col-span-6 space-y-4">
                      <div className="rounded-xl overflow-hidden border border-white/10 bg-neutral-900/60 p-1 relative shadow-md">
                        <img 
                          src={activeScenario.canvasImages[1].url} 
                          alt={activeScenario.canvasImages[1].label}
                          className="w-full h-28 object-cover rounded-lg"
                        />
                        <div className="p-2 flex items-center justify-between text-[11px] text-neutral-300">
                          <span>{activeScenario.canvasImages[1].label}</span>
                          <span className="text-neutral-500 font-mono">{activeScenario.canvasImages[1].dims}</span>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-1.5">
                        <div className="flex items-center gap-2 text-white font-semibold">
                          <Layers size={13} className="text-emerald-400" />
                          <span>Full Identity Asset Deck</span>
                        </div>
                        <p className="text-[11px] text-neutral-400 leading-relaxed">
                          12 Vector icons, high-converting social copy, and direct ad variations generated in parallel.
                        </p>
                      </div>
                    </div>

                  </div>

                  {/* Bottom Canvas Coordinates Bar */}
                  <div className="pt-6 flex items-center justify-between text-[10px] font-mono text-neutral-500 border-t border-white/5">
                    <span>X: 1040 Y: 420 • SCALE 100%</span>
                    <span className="text-emerald-400">● LIVE AGENT SYNCED</span>
                  </div>

                </div>

                {/* Right: Lovart Style AI Chat & Thinking Panel */}
                <div className="lg:col-span-4 p-5 sm:p-6 bg-[#161714] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-4">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-xs font-semibold text-neutral-300">New Chat</span>
                      <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider">GPT-4o + FLUX</span>
                    </div>

                    {/* User Prompt Message Bubble */}
                    <div className="p-3.5 rounded-2xl bg-[#20221c] border border-white/10 text-xs text-neutral-200 leading-relaxed">
                      "{activeScenario.prompt}"
                    </div>

                    {/* AI Chain-of-Thought Trajectory (Matching Lovart Screenshot) */}
                    <div className="space-y-2 text-xs text-neutral-300 pl-1">
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Search size={13} className="text-neutral-400" />
                        <span>Analyzed user intent</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Globe size={13} className="text-neutral-400" />
                        <span>Explored visual trends</span>
                      </div>
                      <div className="flex items-center gap-2 text-neutral-300">
                        <Sparkles size={13} className="text-neutral-400" />
                        <span>Collected references</span>
                      </div>
                    </div>

                    {/* Assistant Direct Output */}
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-neutral-300 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px] uppercase tracking-wider">
                        <Check size={12} strokeWidth={3} />
                        <span>Complete Asset Suite Ready</span>
                      </div>
                      <p className="text-[11px] text-neutral-300 leading-relaxed">
                        I've generated the brand system for {activeScenario.client}, including packaging renders, ad angles, and social hooks.
                      </p>
                    </div>

                  </div>

                  {/* Input Prompt Box */}
                  <div className="pt-2">
                    <button
                      onClick={() => onNavigate('get-started')}
                      className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 font-bold text-xs transition cursor-pointer active:scale-95 shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Open Workspace</span>
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
