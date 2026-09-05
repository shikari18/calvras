import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, Code2, Megaphone, Zap, Shield, 
  Terminal, BarChart3, Globe, Cpu, Check, Layers, Play, ChevronDown,
  X, CheckSquare, Square, Folder, FileText, Settings, SlidersHorizontal,
  ChevronRight, RefreshCw, Layers as LayersIcon
} from 'lucide-react';
import { PRICING_PLANS } from './PricingOnboarding';
import LegalAndComplianceModal from './LegalAndComplianceModal';

function CalvrasLogoIcon({ className = "w-4 h-4 text-white" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

export default function LandingPage({ onSignUp, onSignIn, onNavigatePricing, onNavigateLegal }) {
  const [legalTab, setLegalTab] = useState(null);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Desktop Mockup interactive states
  const [activeTask, setActiveTask] = useState('plan-mission-control');
  const [showDemoOptions, setShowDemoOptions] = useState(true);
  const [showAgents, setShowAgents] = useState(true);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showEditor, setShowEditor] = useState(true);
  const [showChat, setShowChat] = useState(true);
  const [reverseLayout, setReverseLayout] = useState(false);
  const [agentLayout, setAgentLayout] = useState('Default');
  const [agentDemo, setAgentDemo] = useState('Mission Control');
  const [themeMode, setThemeMode] = useState('Dark');

  const handleLegalClick = (tab) => {
    if (onNavigateLegal) {
      onNavigateLegal(tab);
    } else {
      setLegalTab(tab);
    }
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const tasks = [
    {
      id: 'build-landing-page',
      title: 'Build Landing Page',
      time: '1h',
      diff: '+70',
      summary: 'Done. Fonts preload in th...'
    },
    {
      id: 'pytorch-mnist',
      title: 'PyTorch MNIST Experiments',
      time: '2h',
      diff: '+142',
      summary: 'Done, configurable MNIST exper...'
    },
    {
      id: 'bioinformatics-tools',
      title: 'Bioinformatics Tools',
      time: '3h',
      diff: '+109 -21',
      summary: "Great! I've added: 1..."
    },
    {
      id: 'setup-rules',
      title: 'Setup Calvras Rules for Da...',
      time: '4h',
      diff: '+45',
      summary: "Perfect! I've created a comprehe..."
    },
    {
      id: 'plan-mission-control',
      title: 'Plan Mission Control',
      time: '5h',
      diff: '+68',
      summary: 'Drafted implementation s...'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#14120B] text-white font-sans selection:bg-white selection:text-black">
      
      {/* ─── Top Header (Cursor.com Style with Resources Dropdown) ─── */}
      <header className="sticky top-0 z-50 w-full bg-[#14120B]/90 backdrop-blur-xl border-b border-white/[0.08] px-6 py-3 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand Logo & Title */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#221f18] border border-white/10 flex items-center justify-center shadow-inner group-hover:border-white/30 transition-colors">
              <CalvrasLogoIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight uppercase">
              Calvras
            </span>
          </div>

          {/* Middle: Cursor Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-normal text-neutral-300">
            <button 
              onClick={() => scrollToSection('models')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Models
            </button>
            <button 
              onClick={() => scrollToSection('products')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Product
            </button>
            <button 
              onClick={() => scrollToSection('enterprise')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Enterprise
            </button>
            <button 
              onClick={onNavigatePricing || (() => scrollToSection('pricing'))}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </button>

            {/* Resources with Hover Dropdown (Matching Screenshot media_1788572146733.png) */}
            <div 
              className="relative py-2"
              onMouseEnter={() => setResourcesOpen(true)}
              onMouseLeave={() => setResourcesOpen(false)}
            >
              <button 
                type="button"
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                <span>Resources</span>
              </button>

              {/* Floating Dropdown Card */}
              {resourcesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] pt-1 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-[#1c1a14] border border-white/10 rounded-2xl p-2.5 shadow-2xl backdrop-blur-2xl text-left">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      Resources & Docs
                    </div>
                    
                    <button 
                      onClick={() => handleLegalClick('help')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/[0.06] transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mt-0.5 group-hover:bg-blue-500/20">
                        <Terminal size={14} />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-white group-hover:text-blue-300">Documentation & Guides</div>
                        <div className="text-[11px] text-neutral-400">APIs, prompt engineering & agent tools</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleLegalClick('about')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/[0.06] transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mt-0.5 group-hover:bg-purple-500/20">
                        <Sparkles size={14} />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-white group-hover:text-purple-300">About Calvras AI</div>
                        <div className="text-[11px] text-neutral-400">Mission, company info & engineering updates</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleLegalClick('refund')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/[0.06] transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mt-0.5 group-hover:bg-emerald-500/20">
                        <Shield size={14} />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-white group-hover:text-emerald-300">Delivery & 14-Day Refund</div>
                        <div className="text-[11px] text-neutral-400">Instant access, electronic delivery & policies</div>
                      </div>
                    </button>

                    <div className="my-1 border-t border-white/5" />

                    <div className="px-3 py-2 flex items-center justify-between text-[11.5px] text-neutral-400">
                      <span>Legal & Compliance</span>
                      <div className="flex gap-2">
                        <button onClick={() => handleLegalClick('privacy')} className="hover:text-white cursor-pointer">Privacy</button>
                        <span>•</span>
                        <button onClick={() => handleLegalClick('terms')} className="hover:text-white cursor-pointer">Terms</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Action Buttons (Cursor style) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onSignIn}
              className="text-[13.5px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer px-2"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('enterprise')}
              className="text-[13px] font-medium text-neutral-200 px-3.5 py-1.5 rounded-full border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] transition-all cursor-pointer shadow-sm hidden sm:inline-block"
            >
              Contact sales
            </button>
            <button
              type="button"
              onClick={onSignUp}
              className="text-[13px] font-medium text-black px-4 py-1.5 rounded-full bg-white hover:bg-neutral-200 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Start Free →
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero Section (Cursor.com Left-Aligned Layout) ─── */}
      <section className="relative pt-16 sm:pt-24 pb-12 px-6 sm:px-12 max-w-7xl mx-auto">
        
        {/* Ambient Warm Obsidian Glow */}
        <div className="absolute top-12 left-10 w-[500px] h-[300px] bg-amber-500/5 blur-[140px] rounded-full pointer-events-none" />

        {/* Hero Title (Left Aligned matching Cursor) */}
        <h1 className="text-left text-[38px] sm:text-[52px] md:text-[62px] font-normal tracking-[-0.035em] leading-[1.08] text-white max-w-3xl mb-7">
          Calvras is your coding agent for building ambitious software.
        </h1>

        {/* Left-Aligned CTA Buttons (Matching Screenshot media_1788572659274.png) */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <button
            onClick={onSignUp}
            className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-[14px] flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-md cursor-pointer active:scale-95"
          >
            <span>Start Building for Free</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => scrollToSection('products')}
            className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 font-medium text-[14px] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <span>Request a demo</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* ─── Desktop IDE Showcase Frame (Cursor Desktop UI) ─── */}
        <div className="relative w-full rounded-2xl border border-white/10 bg-[#191712] shadow-2xl shadow-black/80 overflow-hidden backdrop-blur-xl">
          
          {/* Wallpaper / Ambient Glow Container */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#24211a]/40 via-transparent to-[#14120B] pointer-events-none" />

          {/* Desktop Top Title Bar */}
          <div className="relative flex items-center justify-between px-4 py-3 bg-[#171510] border-b border-white/[0.08] select-none">
            {/* macOS Window Controls */}
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444] border border-[#dc2626]/60 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#eab308] border border-[#ca8a04]/60 shadow-sm" />
              <div className="w-3 h-3 rounded-full bg-[#22c55e] border border-[#16a34a]/60 shadow-sm" />
            </div>

            {/* Window Center Title */}
            <div className="text-[12px] font-medium text-neutral-400 flex items-center gap-1.5">
              <span>Calvras Desktop</span>
            </div>

            {/* Toggle Demo Options Button */}
            <button
              onClick={() => setShowDemoOptions(!showDemoOptions)}
              className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] transition-colors cursor-pointer"
            >
              <SlidersHorizontal size={12} />
              <span>Demo Options</span>
            </button>
          </div>

          {/* 3-Column IDE Workspace */}
          <div className={`relative flex flex-col md:flex-row min-h-[520px] ${reverseLayout ? 'md:flex-row-reverse' : ''}`}>
            
            {/* 1. Left Column: READY FOR REVIEW Tasks */}
            {showAgents && (
              <div className="w-full md:w-[280px] lg:w-[310px] bg-[#16140e] border-r border-white/[0.07] flex flex-col flex-shrink-0">
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
                  <span>READY FOR REVIEW 5</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="flex-1 divide-y divide-white/[0.04] overflow-y-auto">
                  {tasks.map((task) => {
                    const isSelected = activeTask === task.id;
                    return (
                      <div
                        key={task.id}
                        onClick={() => setActiveTask(task.id)}
                        className={`p-3.5 text-left cursor-pointer transition-colors ${
                          isSelected ? 'bg-white/[0.06] border-l-2 border-white' : 'hover:bg-white/[0.02]'
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                          <div className="flex items-center gap-1.5">
                            <Check size={12} className="text-neutral-400" />
                            <span className={`font-medium text-[12.5px] ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                              {task.title}
                            </span>
                          </div>
                          <span className="text-[10px] text-neutral-500">{task.time}</span>
                        </div>

                        <div className="flex items-center gap-2 pl-4 text-[11px]">
                          <span className="text-emerald-400 font-mono text-[10.5px]">{task.diff}</span>
                          <span className="text-neutral-500 truncate">{task.summary}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Optional Sidebar Column (Toggled in Demo Options) */}
            {showSidebar && (
              <div className="w-full md:w-[200px] bg-[#15130d] border-r border-white/[0.07] p-3 text-left text-[12px] text-neutral-400">
                <div className="text-[10.5px] font-bold text-neutral-500 uppercase tracking-wider mb-2">Explorer</div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-neutral-300"><Folder size={13} className="text-amber-400" /> src</div>
                  <div className="pl-4 space-y-1 text-[11.5px]">
                    <div className="flex items-center gap-1.5 text-white bg-white/[0.05] px-1.5 py-0.5 rounded"><FileText size={12} className="text-blue-400" /> feature-prd.md</div>
                    <div className="flex items-center gap-1.5 text-neutral-400 hover:text-white"><FileText size={12} className="text-blue-400" /> presence.ts</div>
                    <div className="flex items-center gap-1.5 text-neutral-400 hover:text-white"><FileText size={12} className="text-amber-400" /> AppManager.tsx</div>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Middle Column: Agent Chat & Thoughts */}
            {showChat && (
              <div className="flex-1 bg-[#181610] border-r border-white/[0.07] p-4 sm:p-6 flex flex-col justify-between text-left">
                <div className="space-y-4">
                  {/* Task Header */}
                  <div className="text-[15px] font-semibold text-white">
                    {tasks.find(t => t.id === activeTask)?.title || 'Plan Mission Control'}
                  </div>

                  {/* User Prompt Box */}
                  <div className="bg-[#201d16] border border-white/[0.08] rounded-xl p-3.5 text-[13px] text-neutral-200 leading-relaxed">
                    let's build a mission control interface, similar to the expose-style window manager on macOS
                  </div>

                  {/* Thought Stream */}
                  <div className="bg-[#15130d] border border-white/[0.05] rounded-xl p-3 space-y-2 text-[12px]">
                    <div className="flex items-center gap-2 text-neutral-400 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                      <span>Thought 4s</span>
                    </div>
                    <div className="text-neutral-400 pl-3.5 space-y-0.5 font-mono text-[11px]">
                      <div>Read AppManager.tsx</div>
                      <div>Searched expose patterns</div>
                    </div>
                  </div>

                  {/* File Capsule */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#221f17] border border-white/10 text-[12px] font-mono text-neutral-300">
                    <FileText size={13} className="text-blue-400" />
                    <span>feature-prd.md</span>
                    <span className="text-emerald-400 text-[11px] font-bold">+68</span>
                  </div>

                  {/* Agent Response */}
                  <div className="text-[13px] text-neutral-300 leading-relaxed">
                    Drafted implementation steps in <span className="font-mono text-white bg-white/[0.08] px-1 py-0.5 rounded text-[12px]">feature-prd.md</span>. A few quick questions before I start building:
                  </div>
                </div>

                {/* Chat Input Mockup */}
                <div className="mt-6 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[12px] text-neutral-500">
                  <span>Press Enter to reply to Calvras Agent...</span>
                  <div className="px-2 py-0.5 rounded bg-white/[0.06] text-[10.5px] text-neutral-400 font-mono">⌘K</div>
                </div>
              </div>
            )}

            {/* 3. Right Column: Editor with feature-prd.md */}
            {showEditor && (
              <div className="flex-1 bg-[#15130d] flex flex-col text-left">
                {/* Editor Tabs */}
                <div className="flex items-center justify-between bg-[#191710] border-b border-white/[0.06] px-2 pt-1 text-[12px] select-none">
                  <div className="flex items-center">
                    <div className="flex items-center gap-2 px-3.5 py-1.5 bg-[#15130d] border-t-2 border-white text-white font-mono text-[12px]">
                      <span>feature-prd.md</span>
                      <X size={12} className="text-neutral-500 hover:text-white cursor-pointer" />
                    </div>
                    <div className="flex items-center gap-2 px-3.5 py-1.5 text-neutral-400 hover:text-white font-mono text-[12px] cursor-pointer">
                      <span>presence.ts</span>
                    </div>
                  </div>
                </div>

                {/* Breadcrumbs */}
                <div className="px-5 py-2 text-[11px] text-neutral-500 font-mono border-b border-white/[0.04]">
                  Plans &gt; feature-prd.md
                </div>

                {/* Editor Markdown Content */}
                <div className="p-5 sm:p-6 text-[13px] text-neutral-300 space-y-4 font-sans overflow-y-auto max-h-[440px]">
                  <h2 className="text-[20px] font-bold text-white tracking-tight">
                    Mission Control Interface
                  </h2>
                  <p className="text-neutral-400 leading-relaxed text-[12.5px]">
                    A grid view of all open windows as scaled live thumbnails, with click selection to bring any window to front.
                  </p>

                  <div className="pt-2">
                    <h3 className="text-[14px] font-semibold text-white mb-1.5">Trigger</h3>
                    <p className="text-neutral-400 text-[12.5px] leading-relaxed">
                      Menu item in MenuBar.tsx (View &gt; Mission Control), keyboard shortcut <span className="font-mono bg-white/[0.08] px-1 rounded text-white text-[11px]">⌃↑</span>, or double-tap desktop.
                    </p>
                  </div>

                  <div className="pt-2">
                    <h3 className="text-[14px] font-semibold text-white mb-1.5">View Behavior</h3>
                    <p className="text-neutral-400 text-[12.5px] leading-relaxed">
                      Overlay existing windows into a grid of live previews. Fluid spring-based layout animations and shared elements.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* ─── Floating Demo Options Card (Top-Right Popover from Screenshot) ─── */}
          {showDemoOptions && (
            <div className="absolute top-14 right-4 sm:right-6 w-[230px] bg-[#1a1812]/95 border border-white/15 rounded-xl p-3.5 shadow-2xl backdrop-blur-xl z-20 text-left animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2.5 border-b border-white/10 mb-3">
                <span className="text-[12px] font-semibold text-white">Demo Options</span>
                <button 
                  onClick={() => setShowDemoOptions(false)}
                  className="text-neutral-400 hover:text-white p-0.5 rounded cursor-pointer"
                >
                  <X size={13} />
                </button>
              </div>

              {/* Dropdown 1: Agent Layout */}
              <div className="mb-2.5">
                <div className="relative">
                  <select
                    value={agentLayout}
                    onChange={(e) => setAgentLayout(e.target.value)}
                    className="w-full bg-[#24211a] border border-white/10 text-neutral-200 text-[11.5px] rounded-lg px-2.5 py-1.5 appearance-none cursor-pointer focus:outline-none focus:border-white/30"
                  >
                    <option value="Agent Layout: Default">Agent Layout: Default</option>
                    <option value="Agent Layout: Split">Agent Layout: Split</option>
                    <option value="Agent Layout: Stacked">Agent Layout: Stacked</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              {/* Dropdown 2: Agent Demo */}
              <div className="mb-2.5">
                <div className="relative">
                  <select
                    value={agentDemo}
                    onChange={(e) => setAgentDemo(e.target.value)}
                    className="w-full bg-[#24211a] border border-white/10 text-neutral-200 text-[11.5px] rounded-lg px-2.5 py-1.5 appearance-none cursor-pointer focus:outline-none focus:border-white/30"
                  >
                    <option value="Agent Demo">Agent Demo</option>
                    <option value="Mission Control">Mission Control</option>
                    <option value="Bioinformatics">Bioinformatics</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              {/* Dropdown 3: Theme */}
              <div className="mb-3">
                <div className="relative">
                  <select
                    value={themeMode}
                    onChange={(e) => setThemeMode(e.target.value)}
                    className="w-full bg-[#24211a] border border-white/10 text-neutral-200 text-[11.5px] rounded-lg px-2.5 py-1.5 appearance-none cursor-pointer focus:outline-none focus:border-white/30"
                  >
                    <option value="Theme: Obsidian #14120B">Theme</option>
                    <option value="Theme: Dark">Theme: Dark</option>
                    <option value="Theme: Midnight">Theme: Midnight</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                </div>
              </div>

              {/* Checkboxes List */}
              <div className="space-y-2 text-[12px]">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-300 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={showAgents}
                    onChange={(e) => setShowAgents(e.target.checked)}
                    className="rounded border-white/20 bg-[#24211a] text-blue-500 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Agents</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-neutral-300 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={showSidebar}
                    onChange={(e) => setShowSidebar(e.target.checked)}
                    className="rounded border-white/20 bg-[#24211a] text-blue-500 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Sidebar</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-neutral-300 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={showEditor}
                    onChange={(e) => setShowEditor(e.target.checked)}
                    className="rounded border-white/20 bg-[#24211a] text-blue-500 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Editor</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-neutral-300 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={showChat}
                    onChange={(e) => setShowChat(e.target.checked)}
                    className="rounded border-white/20 bg-[#24211a] text-blue-500 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Chat</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-neutral-300 hover:text-white select-none">
                  <input
                    type="checkbox"
                    checked={reverseLayout}
                    onChange={(e) => setReverseLayout(e.target.checked)}
                    className="rounded border-white/20 bg-[#24211a] text-blue-500 focus:ring-0 w-3.5 h-3.5"
                  />
                  <span>Reverse layout</span>
                </label>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ─── Products & Features Section ─── */}
      <section id="products" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[12px] font-bold tracking-widest text-amber-400 uppercase mb-3">
            Platform Capabilities
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-white tracking-tight leading-tight">
            Everything you need to market, code, and monetize.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#1c1a14] rounded-2xl p-7 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5 text-blue-400">
                <Megaphone size={20} />
              </div>
              <h3 className="text-[18px] font-bold text-white mb-2">
                Growth Marketing AI
              </h3>
              <p className="text-[13px] text-neutral-400 leading-relaxed mb-6">
                Generate high-converting ad hooks, viral social campaigns, email sales funnels, and landing page copy that drives real purchases.
              </p>
            </div>
            <ul className="space-y-2 text-[12.5px] text-neutral-300">
              <li className="flex items-center gap-2"><Check size={13} className="text-blue-400" /> Multi-platform ad copy generator</li>
              <li className="flex items-center gap-2"><Check size={13} className="text-blue-400" /> AI email sequence builder</li>
              <li className="flex items-center gap-2"><Check size={13} className="text-blue-400" /> Real-time SEO and keyword analyzer</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1c1a14] rounded-2xl p-7 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5 text-purple-400">
                <Code2 size={20} />
              </div>
              <h3 className="text-[18px] font-bold text-white mb-2">
                Autonomous Coding Copilot
              </h3>
              <p className="text-[13px] text-neutral-400 leading-relaxed mb-6">
                Build full-stack applications with integrated auth, APIs, databases, and responsive UI components in minutes with live previews.
              </p>
            </div>
            <ul className="space-y-2 text-[12.5px] text-neutral-300">
              <li className="flex items-center gap-2"><Check size={13} className="text-purple-400" /> Full-stack React & Node generation</li>
              <li className="flex items-center gap-2"><Check size={13} className="text-purple-400" /> 1-Click interactive live previews</li>
              <li className="flex items-center gap-2"><Check size={13} className="text-purple-400" /> Git sync & instant cloud deployment</li>
            </ul>
          </div>

          {/* Card 3: Enterprise */}
          <div id="enterprise" className="bg-[#1c1a14] rounded-2xl p-7 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5 text-emerald-400">
                <Zap size={20} />
              </div>
              <h3 className="text-[18px] font-bold text-white mb-2">
                Team Intelligence & Workspaces
              </h3>
              <p className="text-[13px] text-neutral-400 leading-relaxed mb-6">
                Centralized brand voices, shared code repositories, team-wide permission management, and enterprise-grade privacy protection.
              </p>
            </div>
            <ul className="space-y-2 text-[12.5px] text-neutral-300">
              <li className="flex items-center gap-2"><Check size={13} className="text-emerald-400" /> Custom brand voice calibration</li>
              <li className="flex items-center gap-2"><Check size={13} className="text-emerald-400" /> Centralized team billing</li>
              <li className="flex items-center gap-2"><Check size={13} className="text-emerald-400" /> Enterprise SOC2 privacy standard</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ─── Models & Intelligence Section ─── */}
      <section id="models" className="py-20 px-6 sm:px-10 max-w-6xl mx-auto border-t border-white/5">
        <div className="bg-[#191711] rounded-3xl p-8 sm:p-12 border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl text-left">
            <div className="text-[12px] font-bold tracking-widest text-blue-400 uppercase mb-2">
              Deep Intelligence
            </div>
            <h2 className="text-[28px] sm:text-[34px] font-bold text-white mb-4">
              Frontier models tuned for code and marketing.
            </h2>
            <p className="text-[14px] text-neutral-400 leading-relaxed">
              Connect top LLMs including Claude 3.5 Sonnet, GPT-4o, and Gemini 1.5 Pro directly to your workspace. Bring your own API keys for unlimited usage or use our managed high-speed pool.
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full lg:w-auto">
            <button
              onClick={onSignUp}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-[13px] hover:bg-neutral-200 transition-colors cursor-pointer text-center"
            >
              Start Free Coding Agent
            </button>
            <button
              onClick={onNavigatePricing}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/10 font-semibold text-[13px] transition-colors cursor-pointer text-center"
            >
              View Model Pricing
            </button>
          </div>
        </div>
      </section>

      {/* ─── Pricing Section Preview ─── */}
      <section id="pricing" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="text-[12px] font-bold tracking-widest text-amber-400 uppercase mb-3">
            Transparent Pricing
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-white tracking-tight mb-3">
            Predictable plans for every stage.
          </h2>
          <p className="text-[15px] text-neutral-400">
            Start for free, upgrade when you need unlimited scale and priority models.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col bg-[#1c1a14] rounded-[24px] p-7 border transition-all ${
                plan.id === 'pro' 
                  ? 'border-amber-500/40 shadow-2xl shadow-amber-500/10 relative' 
                  : 'border-white/10'
              }`}
            >
              {plan.id === 'pro' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-[11px] font-bold text-black uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div className="text-left">
                <h3 className="text-[20px] font-bold text-white mb-1.5">{plan.name}</h3>
                <p className="text-[12px] text-neutral-400 leading-relaxed mb-5 min-h-[34px]">
                  {plan.tagline}
                </p>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-[30px] font-extrabold text-white tracking-tight">
                    {plan.priceText || (plan.monthlyPrice ? `$${plan.monthlyPrice.toFixed(0)}` : '$0')}
                  </span>
                  {!plan.priceIsText && (
                    <span className="text-[13px] text-neutral-400 font-medium">{plan.priceSuffix || '/month'}</span>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={onSignUp}
                className={`w-full py-3 rounded-full text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all mb-7 cursor-pointer ${
                  plan.id === 'pro'
                    ? 'bg-white text-black hover:bg-neutral-200 shadow-md shadow-white/10'
                    : 'bg-white/10 hover:bg-white/15 text-white border border-white/10'
                }`}
              >
                <span>{plan.cta}</span>
                {plan.id === 'team' && <ArrowRight size={14} />}
              </button>

              <div className="text-[10.5px] font-bold tracking-[0.06em] text-neutral-500 uppercase mb-4 text-left">
                {plan.tier}
              </div>

              <ul className="space-y-3 flex-1 text-left">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[12.5px] text-neutral-300">
                    <div className="w-[16px] h-[16px] rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-white" strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="py-12 px-6 sm:px-10 border-t border-white/5 bg-[#14120B] text-neutral-500 text-[13px]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#221f18] border border-white/10 flex items-center justify-center">
              <CalvrasLogoIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-white text-[14px]">Calvras</span>
            <span className="text-neutral-600 ml-2">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[12.5px]">
            <button onClick={() => handleLegalClick('about')} className="hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={() => handleLegalClick('refund')} className="hover:text-white transition-colors cursor-pointer">Shipping & Refunds</button>
            <button onClick={() => handleLegalClick('terms')} className="hover:text-white transition-colors cursor-pointer">Terms</button>
            <button onClick={() => handleLegalClick('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => handleLegalClick('help')} className="hover:text-white transition-colors cursor-pointer">Support</button>
            <button onClick={onNavigatePricing} className="text-amber-400 hover:underline transition-colors cursor-pointer font-medium">Pricing & Plans</button>
            <button onClick={onSignIn} className="hover:text-white transition-colors cursor-pointer">Sign in</button>
            <button onClick={onSignUp} className="text-white hover:underline cursor-pointer font-medium">Sign Up</button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-6 pt-6 border-t border-white/5 text-[11px] text-neutral-600 text-center leading-relaxed">
          Calvras provides autonomous digital Software-as-a-Service products. Payments and subscriptions are processed securely via Paystack with instant electronic provisioning and a 14-day money-back guarantee.
        </div>
      </footer>

      {/* Compliance / Legal Modal */}
      {legalTab && (
        <LegalAndComplianceModal
          initialTab={legalTab}
          onClose={() => setLegalTab(null)}
        />
      )}

    </div>
  );
}
