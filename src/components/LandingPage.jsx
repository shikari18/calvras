import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, Code2, Megaphone, Zap, Shield, 
  Terminal, BarChart3, Globe, Cpu, Check, Layers, Play, ChevronDown,
  X, CheckSquare, Square, Folder, FileText, Settings, SlidersHorizontal,
  ChevronRight, RefreshCw, ExternalLink, Command, ShieldCheck, Lock,
  Search, Plus, HelpCircle, Key
} from 'lucide-react';
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
  const [previewTab, setPreviewTab] = useState('code'); // 'code' | 'preview'
  const [openFaq, setOpenFaq] = useState(null);

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

  const faqs = [
    {
      q: 'How does Calvras guarantee pixel-accurate UI duplication?',
      a: 'Calvras uses multimodal frontier vision models connected directly to our workspace compiler. The agent extracts layout geometry, exact margins, typography hierarchy, colors, and inline SVGs from your uploaded design or screenshot, automatically generating clean React 18 TypeScript and Tailwind CSS with 0 phantom spacing.'
    },
    {
      q: 'What is included in the $40 Max plan with Unlimited API usage?',
      a: 'The Max plan unlocks unrestricted API key usage (BYOK & platform inference) with zero artificial rate limits, double the compute allocation of Pro, high-speed priority model execution, and full webhook access for integrating autonomous agents into production CI/CD pipelines.'
    },
    {
      q: 'What is your refund policy and how is software delivered?',
      a: 'All Calvras subscriptions are delivered electronically and instantly within 5 seconds via Paystack. We provide an unconditional 14-day money-back guarantee for all first-time purchases. Simply email support@calvras.ai and your refund is processed in 24 hours.'
    },
    {
      q: 'Does Calvras train on my proprietary code or uploaded designs?',
      a: 'No. Calvras adheres to enterprise zero-data-retention security protocols. Your prompts, uploaded screenshots, and generated workspace files remain your exclusive property and are never used to train public models.'
    },
    {
      q: 'Can I export full source code to GitHub or as a ZIP archive?',
      a: 'Yes. With one click you can export the full repository as a production-ready ZIP archive or push directly to GitHub with automated Vite configuration, dependencies, and environment templates.'
    }
  ];

  return (
    <div className="min-h-screen w-full bg-[#1B1B1D] text-white font-sans selection:bg-white selection:text-black">
      
      {/* ─── Top Header (No margin line under nav, right side is just Sign in and Get Started) ─── */}
      <header className="sticky top-0 z-50 w-full bg-[#1B1B1D] px-6 py-4 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand Logo & Title */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#1B1B1D] border border-white/15 flex items-center justify-center group-hover:border-white/30 transition-colors">
              <CalvrasLogoIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight uppercase">
              Calvras
            </span>
          </div>

          {/* Middle: Navigation Links (About us, Pricing, Resources) */}
          <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-normal text-neutral-300">
            <button 
              onClick={() => scrollToSection('about-us')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About us
            </button>
            <button 
              onClick={onSignIn}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </button>

            {/* Resources Dropdown */}
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

              {resourcesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] pt-1 z-50">
                  <div className="bg-[#1B1B1D] border border-white/10 rounded-2xl p-2.5 shadow-2xl text-left">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">
                      Resources & Docs
                    </div>
                    
                    <button 
                      onClick={() => handleLegalClick('help')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/[0.04] transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-blue-400 mt-0.5 group-hover:border-white/20">
                        <Terminal size={14} />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-white group-hover:text-blue-300">Documentation & Guides</div>
                        <div className="text-[11px] text-neutral-400">APIs, prompt engineering & agent tools</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => scrollToSection('about-us')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/[0.04] transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-purple-400 mt-0.5 group-hover:border-white/20">
                        <Sparkles size={14} />
                      </div>
                      <div>
                        <div className="text-[13px] font-medium text-white group-hover:text-purple-300">About Calvras AI</div>
                        <div className="text-[11px] text-neutral-400">Mission, company info & engineering updates</div>
                      </div>
                    </button>

                    <button 
                      onClick={() => handleLegalClick('refund')}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/[0.04] transition-colors flex items-start gap-3 group cursor-pointer"
                    >
                      <div className="w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-emerald-400 mt-0.5 group-hover:border-white/20">
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

          {/* Right: Just Sign in and Get Started */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onSignIn}
              className="text-[13.5px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer px-2"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={onSignUp}
              className="text-[13px] font-semibold text-black px-5 py-2 rounded-full bg-white hover:bg-neutral-200 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero Section (Exact matching user screenshot media_1788573250619.png) ─── */}
      <section className="relative pt-20 sm:pt-28 pb-14 px-6 sm:px-12 max-w-7xl mx-auto bg-[#1B1B1D]">
        
        {/* Left-Aligned Headline (Exact) */}
        <h1 className="text-left text-[44px] sm:text-[58px] md:text-[68px] font-normal tracking-[-0.035em] leading-[1.08] text-white max-w-3xl mb-8">
          Calvras is your coding agent for building ambitious software.
        </h1>

        {/* Left-Aligned CTA Button Group (Exact) */}
        <div className="flex flex-wrap items-center gap-3 mb-16">
          <button
            onClick={onSignUp}
            className="px-6 py-3 rounded-full bg-white text-black font-medium text-[14px] flex items-center gap-2 hover:bg-neutral-200 transition-all shadow-md cursor-pointer active:scale-95"
          >
            <span>Start Building for Free</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => scrollToSection('about-us')}
            className="px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 font-medium text-[14px] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <span>Request a demo</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* ─── Apple-Style Clean Studio Window (Simple, Elegant, #1B1B1D) ─── */}
        <div className="w-full rounded-3xl border border-white/10 bg-[#1B1B1D] shadow-2xl overflow-hidden text-left">
          
          {/* Minimal Window Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] select-none bg-[#1B1B1D]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <span className="text-[12px] font-mono text-neutral-400 ml-2">Calvras Studio — AI Coding & Growth Engine</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#1B1B1D] border border-white/10 rounded-lg p-1">
              <button
                onClick={() => setPreviewTab('code')}
                className={`px-3 py-1 rounded-md text-[11.5px] font-medium transition-colors cursor-pointer ${
                  previewTab === 'code' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Code
              </button>
              <button
                onClick={() => setPreviewTab('preview')}
                className={`px-3 py-1 rounded-md text-[11.5px] font-medium transition-colors cursor-pointer ${
                  previewTab === 'preview' ? 'bg-white text-black font-semibold' : 'text-neutral-400 hover:text-white'
                }`}
              >
                Live Preview
              </button>
            </div>
          </div>

          {/* Window Body */}
          <div className="p-6 sm:p-8 bg-[#1B1B1D] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Prompt & Real-time AI Agent Reasoning */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-white/10 rounded-2xl p-4 bg-[#1B1B1D]">
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Command size={12} className="text-neutral-400" />
                  <span>User Prompt</span>
                </div>
                <p className="text-[13.5px] text-neutral-100 font-medium leading-relaxed">
                  "Build a full-stack SaaS revenue analytics dashboard with Stripe subscription webhooks, live MRR tracking, and dark mode."
                </p>
              </div>

              {/* Autonomous Agent Thinking Progress */}
              <div className="border border-white/10 rounded-2xl p-4 bg-[#1B1B1D] space-y-3">
                <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Autonomous Synthesis</span>
                  </div>
                  <span>1.4s</span>
                </div>

                <div className="space-y-2 text-[12px] font-mono text-neutral-300">
                  <div className="flex items-center gap-2">
                    <Check size={12} className="text-emerald-400" />
                    <span>Generated schema: SQLite subscriptions & MRR aggregates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={12} className="text-emerald-400" />
                    <span>Created backend API: /api/stripe/webhook & /api/analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={12} className="text-emerald-400" />
                    <span>Composed React 18 frontend: RevenueDashboard.jsx</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Files: 3 created, 0 conflicts</span>
                  <span className="text-emerald-400">Ready to run</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={onSignUp}
                className="w-full py-3 rounded-xl bg-white text-black font-semibold text-[13px] hover:bg-neutral-200 transition-colors cursor-pointer text-center"
              >
                Run this prompt in Calvras Studio →
              </button>
            </div>

            {/* Right: Code or Live Interactive Canvas */}
            <div className="lg:col-span-7 border border-white/10 rounded-2xl p-5 bg-[#1B1B1D] min-h-[340px] flex flex-col justify-between">
              {previewTab === 'code' ? (
                <div className="font-mono text-[12.5px] leading-relaxed text-neutral-300 space-y-2 overflow-x-auto">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pb-2 border-b border-white/5">
                    <span>RevenueDashboard.jsx • React 18 + Tailwind</span>
                    <span className="text-emerald-400">● Verified Clean Build</span>
                  </div>
                  <p><span className="text-purple-400">import</span> React, &#123; useState, useEffect &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'react'</span>;</p>
                  <p><span className="text-purple-400">import</span> &#123; LineChart, MetricCard &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@calvras/ui'</span>;</p>
                  <p className="text-neutral-500">// Real-time WebSocket feed syncing Stripe MRR & churn</p>
                  <p><span className="text-blue-400">export default function</span> <span className="text-yellow-300">RevenueDashboard</span>() &#123;</p>
                  <p className="pl-4"><span className="text-blue-400">const</span> [metrics, setMetrics] = <span className="text-yellow-300">useState</span>(&#123; mrr: <span className="text-emerald-400">28400</span>, netGrowth: <span className="text-emerald-400">'+34.2%'</span> &#125;);</p>
                  <p className="pl-4"><span className="text-purple-400">return</span> (</p>
                  <p className="pl-8 text-neutral-400">&lt;<span className="text-blue-400">div</span> <span className="text-amber-300">className</span>=<span className="text-emerald-300">"grid grid-cols-2 gap-4 p-4 border border-white/10 rounded-2xl"</span>&gt;</p>
                  <p className="pl-12 text-neutral-300">&lt;<span className="text-blue-400">MetricCard</span> <span className="text-amber-300">title</span>=<span className="text-emerald-300">"Monthly Recurring Revenue"</span> <span className="text-amber-300">value</span>=&#123;`$$&#123;metrics.mrr&#125;`&#125; /&gt;</p>
                  <p className="pl-12 text-neutral-300">&lt;<span className="text-blue-400">MetricCard</span> <span className="text-amber-300">title</span>=<span className="text-emerald-300">"YoY Velocity"</span> <span className="text-amber-300">value</span>=&#123;metrics.netGrowth&#125; /&gt;</p>
                  <p className="pl-8 text-neutral-400">&lt;/<span className="text-blue-400">div</span>&gt;</p>
                  <p className="pl-4">);</p>
                  <p>&#125;</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pb-2 border-b border-white/5">
                    <span>Live Interactive Canvas</span>
                    <span className="text-emerald-400">● Ready in 1.4s</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-white/10 rounded-xl p-4 bg-[#1B1B1D]">
                      <div className="text-[11px] text-neutral-400 mb-1">Monthly Recurring Revenue</div>
                      <div className="text-[26px] font-bold text-white tracking-tight">$28,400</div>
                      <div className="text-[11px] text-emerald-400 mt-1 font-medium">+34.2% this month</div>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 bg-[#1B1B1D]">
                      <div className="text-[11px] text-neutral-400 mb-1">Active Subscribers</div>
                      <div className="text-[26px] font-bold text-white tracking-tight">1,420</div>
                      <div className="text-[11px] text-emerald-400 mt-1 font-medium">99.2% Retention rate</div>
                    </div>
                  </div>

                  <div className="border border-white/10 rounded-xl p-4 bg-[#1B1B1D] text-[12px] text-neutral-300">
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Live Webhook Feed</div>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>customer.subscription.created</span>
                        <span className="text-emerald-400">+$40.00 Max</span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>invoice.payment_succeeded</span>
                        <span className="text-emerald-400">+$14.00 Pro</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
                <span>Direct Node sandbox execution</span>
                <span>Port 5173 • HTTPS</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ─── Apple / Anthropic Billion-Dollar About Us Section (media_1788574144933.png & media_1788574168224.png) ─── */}
      <section id="about-us" className="py-28 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] bg-[#1B1B1D] text-left">
        
        {/* Anthropic-style Headline & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-6">
            <h2 className="text-[38px] sm:text-[54px] lg:text-[62px] font-normal text-white tracking-[-0.03em] leading-[1.08]">
              Shape how AI meets the world of code.
            </h2>
          </div>
          <div className="lg:col-span-6 space-y-6 pt-2">
            <p className="text-[16px] sm:text-[18px] text-neutral-300 leading-relaxed font-normal">
              Calvras builds autonomous engineering agents designed to be helpful, precise, and production-ready. We are researchers, systems engineers, and builders from leading labs working to make autonomous software development reliable for everyone.
            </p>
            <p className="text-[14px] text-neutral-400 leading-relaxed">
              From pixel-perfect UI vision duplication and full-stack backend synthesis to real-time browser sandboxes, our mission is to eliminate repetitive scaffolding and empower ambitious builders to create billion-dollar software in hours instead of months.
            </p>
            <div>
              <button
                onClick={onSignUp}
                className="px-6 py-3 rounded-full bg-white text-black font-semibold text-[13px] hover:bg-neutral-200 transition-all cursor-pointer shadow-md inline-flex items-center gap-2 active:scale-95"
              >
                <span>Explore Calvras Engineering</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Video / Engineering Team Discussion Frame (Matching Anthropic Image 2) */}
        <div className="w-full rounded-3xl border border-white/10 bg-[#1B1B1D] overflow-hidden p-3 sm:p-4 mb-20 shadow-2xl">
          <div className="relative w-full rounded-2xl overflow-hidden bg-[#17150f] border border-white/5 aspect-[16/8] flex items-center justify-center group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80" 
              alt="Calvras Engineering Team" 
              className="w-full h-full object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500 scale-100 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1D] via-transparent to-transparent pointer-events-none" />
            
            {/* Center Play Button */}
            <div className="absolute w-16 h-16 rounded-full bg-white/10 border border-white/25 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/20 transition-all shadow-2xl">
              <Play size={24} className="fill-white translate-x-0.5" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 mb-1">Architecture & Origins</div>
                <h3 className="text-[20px] sm:text-[24px] font-semibold text-white">Building Calvras Autonomous Agent v4</h3>
                <p className="text-[13px] text-neutral-400 max-w-xl">Our core engineering team discusses the breakthrough in multimodal vision duplication and zero-rate-throttled BYOK scaling.</p>
              </div>
              <span className="text-[12px] font-mono text-neutral-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm self-start sm:self-auto">
                12:40 Min
              </span>
            </div>
          </div>
        </div>

        {/* 3 Apple-Style Core Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          <div className="border border-white/10 rounded-3xl p-8 bg-[#1B1B1D] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-white">
              <Code2 size={20} />
            </div>
            <h3 className="text-[20px] font-semibold text-white">Pixel-Perfect UI Vision</h3>
            <p className="text-[13.5px] text-neutral-400 leading-relaxed">
              We eliminated phantom whitespace and approximate styling. Calvras extracts verbatim geometry, margin scales, and inline SVGs directly from uploaded images.
            </p>
          </div>

          <div className="border border-white/10 rounded-3xl p-8 bg-[#1B1B1D] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-white">
              <Cpu size={20} />
            </div>
            <h3 className="text-[20px] font-semibold text-white">Frontier BYOK Compute</h3>
            <p className="text-[13.5px] text-neutral-400 leading-relaxed">
              The $40 Max tier unlocks unlimited API throughput. Plug in your own keys or leverage our high-speed managed clusters with zero artificial caps.
            </p>
          </div>

          <div className="border border-white/10 rounded-3xl p-8 bg-[#1B1B1D] space-y-4 hover:border-white/25 transition-all">
            <div className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center text-white">
              <Lock size={20} />
            </div>
            <h3 className="text-[20px] font-semibold text-white">Zero Data Retention</h3>
            <p className="text-[13.5px] text-neutral-400 leading-relaxed">
              Your software and proprietary architectures are never stored for training. Strict SOC2 encryption, enterprise audit logs, and immediate electronic provisioning.
            </p>
          </div>
        </div>

        {/* Anthropic-Style Frequently Asked Questions (Matching Anthropic Image 3) */}
        <div className="border-t border-white/[0.08] pt-20 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <h3 className="text-[30px] sm:text-[36px] font-normal text-white tracking-tight">
                Frequently asked questions
              </h3>
              <p className="text-[13.5px] text-neutral-400 mt-3 leading-relaxed">
                Everything you need to know about Calvras technology, billing, Paystack compliance, and refund policies.
              </p>
            </div>

            <div className="lg:col-span-8 space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div 
                    key={idx}
                    className="border-b border-white/10 pb-4 transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full py-3 flex items-center justify-between text-left text-[16px] font-medium text-white hover:text-neutral-300 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <span className="text-xl text-neutral-400 font-mono ml-4">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <p className="text-[14px] text-neutral-400 leading-relaxed pt-2 pb-2 pr-6 animate-in fade-in duration-200">
                        {faq.a}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Big Bold Banner Matching Anthropic Image 3 */}
        <div className="border border-white/10 rounded-3xl p-10 sm:p-16 bg-[#1B1B1D] text-center space-y-6 shadow-2xl">
          <h2 className="text-[32px] sm:text-[46px] font-normal text-white tracking-tight">
            Want to build the future of software with Calvras?
          </h2>
          <p className="text-[15px] text-neutral-400 max-w-xl mx-auto leading-relaxed">
            Join thousands of developers, agencies, and founders shipping full-stack applications with autonomous agents.
          </p>
          <div className="pt-2">
            <button
              onClick={onSignUp}
              className="px-8 py-3.5 rounded-full bg-white text-black font-semibold text-[14px] hover:bg-neutral-200 transition-all cursor-pointer shadow-lg active:scale-95 inline-flex items-center gap-2"
            >
              <span>Start Building for Free</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </section>

      {/* ─── Perplexity-Style Pricing Section (2 Cards Only: $14 & $40, Image 4) ─── */}
      <section id="pricing" className="py-24 px-6 sm:px-12 max-w-5xl mx-auto border-t border-white/[0.08] bg-[#1B1B1D] text-center">
        
        {/* Header (No free plan text, no annual toggle) */}
        <div className="max-w-xl mx-auto mb-14">
          <h2 className="text-[38px] sm:text-[48px] font-serif font-normal text-white tracking-tight mb-3">
            Select your plan
          </h2>
          <p className="text-[15px] text-neutral-400">
            Upgrade for a broader development experience and premium AI models.
          </p>
        </div>

        {/* Exactly 2 Cards: $14 Pro and $40 Max (Matching Perplexity Image 4) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto mb-10 text-left">
          
          {/* Card 1: $14 Pro */}
          <div className="flex flex-col bg-[#1B1B1D] rounded-3xl border border-white/20 p-8 hover:border-white/30 transition-all relative">
            
            {/* Title & Badge */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[26px] font-bold text-white tracking-tight">calvras <span className="font-normal text-white">pro</span></h3>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                Popular
              </span>
            </div>
            <p className="text-[13px] text-neutral-400 leading-relaxed mb-6 min-h-[38px]">
              Advanced answers and top AI models
            </p>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-1.5 pb-6 border-b border-white/10">
              <span className="text-[44px] font-bold text-white tracking-tight">$14</span>
              <span className="text-[13px] text-neutral-400">/month</span>
            </div>

            {/* Features (Exact user specifications) */}
            <div className="text-[12px] font-medium text-neutral-300 mb-4">
              Everything in Free and:
            </div>
            <ul className="space-y-3.5 flex-1 mb-8">
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Search size={15} className="text-neutral-400 flex-shrink-0" />
                <span>built in web search</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Zap size={15} className="text-neutral-400 flex-shrink-0" />
                <span>high usage limit</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Sparkles size={15} className="text-neutral-400 flex-shrink-0" />
                <span>early access to Calvras feaatures</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Cpu size={15} className="text-neutral-400 flex-shrink-0" />
                <span>priority access to new models</span>
              </li>
            </ul>

            {/* Button */}
            <button
              onClick={onSignUp}
              className="w-full py-3.5 rounded-2xl bg-neutral-200 hover:bg-white text-black font-bold text-[14px] transition-all cursor-pointer shadow-md text-center active:scale-95"
            >
              Get Pro
            </button>
          </div>

          {/* Card 2: $40 Max */}
          <div className="flex flex-col bg-[#1B1B1D] rounded-3xl border border-white/15 p-8 hover:border-white/25 transition-all text-left">
            
            {/* Title */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-[26px] font-bold text-white tracking-tight">calvras <span className="font-normal text-white">max</span></h3>
            </div>
            <p className="text-[13px] text-neutral-400 leading-relaxed mb-6 min-h-[38px]">
              Unlimited usage and top performance
            </p>

            {/* Price */}
            <div className="mb-6 flex items-baseline gap-1.5 pb-6 border-b border-white/10">
              <span className="text-[44px] font-bold text-white tracking-tight">$40</span>
              <span className="text-[13px] text-neutral-400">/month</span>
            </div>

            {/* Features (Exact user specifications) */}
            <div className="text-[12px] font-medium text-neutral-300 mb-4">
              Everything in Pro and:
            </div>
            <ul className="space-y-3.5 flex-1 mb-8">
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Check size={15} className="text-white flex-shrink-0" />
                <span>everything in pro</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Key size={15} className="text-emerald-400 flex-shrink-0" />
                <span className="font-bold text-white">unlimited usage of api key</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Zap size={15} className="text-emerald-400 flex-shrink-0" />
                <span>*2 more usage than pro</span>
              </li>
              <li className="flex items-center gap-3 text-[13px] text-neutral-200">
                <Cpu size={15} className="text-white flex-shrink-0" />
                <span>priority access to new models</span>
              </li>
            </ul>

            {/* Button */}
            <button
              onClick={onSignUp}
              className="w-full py-3.5 rounded-2xl bg-neutral-200 hover:bg-white text-black font-bold text-[14px] transition-all cursor-pointer shadow-md text-center active:scale-95"
            >
              Get Max
            </button>
          </div>

        </div>

        {/* Privacy Policy Link Underneath (Per user instruction) */}
        <div className="text-[12.5px] text-neutral-400">
          All subscriptions are protected by Paystack with immediate digital delivery. View our{' '}
          <button
            onClick={() => handleLegalClick('privacy')}
            className="underline text-neutral-200 hover:text-white cursor-pointer transition-colors"
          >
            Privacy Policy
          </button>{' '}
          and{' '}
          <button
            onClick={() => handleLegalClick('refund')}
            className="underline text-neutral-200 hover:text-white cursor-pointer transition-colors"
          >
            14-Day Refund Guarantee
          </button>.
        </div>

      </section>

      {/* ─── Massive Cursor-Style 5-Column Footer (media_1788573780443.png) ─── */}
      <footer className="py-24 px-6 sm:px-12 border-t border-white/[0.08] bg-[#1B1B1D] text-neutral-400 text-[13px]">
        
        {/* Top CTA Banner */}
        <div className="max-w-7xl mx-auto text-center mb-24 space-y-6">
          <h2 className="text-[44px] sm:text-[60px] font-normal text-white tracking-tight">
            Try Calvras now.
          </h2>
          <div>
            <button
              onClick={onSignUp}
              className="px-7 py-3 rounded-full bg-white text-black font-semibold text-[14px] hover:bg-neutral-200 transition-all cursor-pointer shadow-md inline-flex items-center gap-2 active:scale-95"
            >
              <span>Start Building for Free</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 5 Column Grid Matching Cursor Screenshot media_1788573780443.png */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 pb-16 border-b border-white/[0.08] text-left">
          
          {/* Column 1: Product */}
          <div className="space-y-3.5">
            <h4 className="text-[13px] font-semibold text-white tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-400">
              <li><button onClick={onSignUp} className="hover:text-white transition-colors cursor-pointer">Agents</button></li>
              <li><button onClick={onSignUp} className="hover:text-white transition-colors cursor-pointer">Teams</button></li>
              <li><button onClick={() => scrollToSection('about-us')} className="hover:text-white transition-colors cursor-pointer">Enterprise</button></li>
              <li><button onClick={onSignIn} className="hover:text-white transition-colors cursor-pointer">Pricing</button></li>
              <li><button onClick={onSignUp} className="hover:text-white transition-colors cursor-pointer">Code Review</button></li>
              <li><button onClick={onSignUp} className="hover:text-white transition-colors cursor-pointer">CLI</button></li>
              <li><button onClick={onSignUp} className="hover:text-white transition-colors cursor-pointer">Cloud Agents</button></li>
              <li><button onClick={onSignUp} className="hover:text-white transition-colors cursor-pointer">Composer</button></li>
              <li><button onClick={onSignUp} className="hover:text-white transition-colors cursor-pointer">Marketplace</button></li>
            </ul>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-3.5">
            <h4 className="text-[13px] font-semibold text-white tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-400">
              <li><button onClick={onSignUp} className="hover:text-white transition-colors cursor-pointer">Download</button></li>
              <li><button onClick={() => handleLegalClick('help')} className="hover:text-white transition-colors cursor-pointer">Changelog</button></li>
              <li><button onClick={() => handleLegalClick('help')} className="hover:text-white transition-colors cursor-pointer">Docs</button></li>
              <li><button onClick={() => handleLegalClick('help')} className="hover:text-white transition-colors cursor-pointer">Learn</button></li>
              <li><button onClick={onSignIn} className="hover:text-white transition-colors cursor-pointer">Value Calculator</button></li>
              <li><button onClick={() => handleLegalClick('help')} className="hover:text-white transition-colors cursor-pointer">Forum</button></li>
              <li><button onClick={() => handleLegalClick('help')} className="hover:text-white transition-colors cursor-pointer">Help Center</button></li>
              <li><button onClick={() => handleLegalClick('help')} className="hover:text-white transition-colors cursor-pointer">Workshops</button></li>
              <li><button onClick={() => handleLegalClick('help')} className="hover:text-white transition-colors cursor-pointer">Status</button></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3.5">
            <h4 className="text-[13px] font-semibold text-white tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-400">
              <li><button onClick={() => scrollToSection('about-us')} className="hover:text-white transition-colors cursor-pointer">About Us</button></li>
              <li><button onClick={() => scrollToSection('about-us')} className="hover:text-white transition-colors cursor-pointer">Careers</button></li>
              <li><button onClick={() => scrollToSection('about-us')} className="hover:text-white transition-colors cursor-pointer">Blog</button></li>
              <li><button onClick={() => scrollToSection('about-us')} className="hover:text-white transition-colors cursor-pointer">Community</button></li>
              <li><button onClick={() => scrollToSection('about-us')} className="hover:text-white transition-colors cursor-pointer">Students</button></li>
              <li><button onClick={() => scrollToSection('about-us')} className="hover:text-white transition-colors cursor-pointer">Brand</button></li>
              <li><button onClick={() => scrollToSection('about-us')} className="hover:text-white transition-colors cursor-pointer">Future</button></li>
              <li><button onClick={() => scrollToSection('about-us')} className="hover:text-white transition-colors cursor-pointer">Calvras Lab</button></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-3.5">
            <h4 className="text-[13px] font-semibold text-white tracking-wider">Legal</h4>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-400">
              <li><button onClick={() => handleLegalClick('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button></li>
              <li><button onClick={() => handleLegalClick('terms')} className="hover:text-white transition-colors cursor-pointer">Acceptable Use Policy</button></li>
              <li><button onClick={() => handleLegalClick('refund')} className="hover:text-white transition-colors cursor-pointer">Shipping & Refunds</button></li>
              <li><button onClick={() => handleLegalClick('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button></li>
              <li><button onClick={() => handleLegalClick('privacy')} className="hover:text-white transition-colors cursor-pointer">Data Use</button></li>
              <li><button onClick={() => handleLegalClick('help')} className="hover:text-white transition-colors cursor-pointer">Security</button></li>
            </ul>
          </div>

          {/* Column 5: Connect */}
          <div className="space-y-3.5">
            <h4 className="text-[13px] font-semibold text-white tracking-wider">Connect</h4>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-400">
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">X (Twitter)</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube</a></li>
              <li><a href="https://github.com/shikari18/calvras" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="mailto:support@calvras.ai" className="hover:text-white transition-colors">support@calvras.ai</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Compliance Disclaimer */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11.5px] text-neutral-500">
          <div className="flex items-center gap-2">
            <CalvrasLogoIcon className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-white font-medium">Calvras Technologies</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div>
            All transactions and subscriptions are processed securely via Paystack with instant electronic provisioning and a 14-day refund guarantee.
          </div>
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
