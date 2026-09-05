import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, Code2, Megaphone, Zap, Shield, 
  Terminal, BarChart3, Globe, Cpu, Check, Layers, Play, ChevronDown,
  X, CheckSquare, Square, Folder, FileText, Settings, SlidersHorizontal,
  ChevronRight, RefreshCw, Layers as LayersIcon, ExternalLink, Command
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
  const [previewTab, setPreviewTab] = useState('code'); // 'code' | 'preview'

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

  return (
    <div className="min-h-screen w-full bg-[#14120B] text-white font-sans selection:bg-white selection:text-black">
      
      {/* ─── Top Header (Cursor / Apple Clean Style) ─── */}
      <header className="sticky top-0 z-50 w-full bg-[#14120B] border-b border-white/[0.08] px-6 py-3.5 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand Logo & Title */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#14120B] border border-white/15 flex items-center justify-center group-hover:border-white/30 transition-colors">
              <CalvrasLogoIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight uppercase">
              Calvras
            </span>
          </div>

          {/* Middle: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-[13.5px] font-normal text-neutral-300">
            <button 
              onClick={() => scrollToSection('models')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Models
            </button>
            <button 
              onClick={() => scrollToSection('product')}
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
                  <div className="bg-[#14120B] border border-white/10 rounded-2xl p-2.5 shadow-2xl text-left">
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
                      onClick={() => handleLegalClick('about')}
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

          {/* Right: Action Buttons */}
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
              className="text-[13px] font-medium text-neutral-200 px-3.5 py-1.5 rounded-full border border-white/15 hover:border-white/30 transition-all cursor-pointer shadow-sm hidden sm:inline-block"
            >
              Contact sales
            </button>
            <button
              type="button"
              onClick={onSignUp}
              className="text-[13px] font-medium text-black px-4 py-1.5 rounded-full bg-white hover:bg-neutral-200 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Download
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero Section (Exact matching user screenshot media_1788573250619.png) ─── */}
      <section className="relative pt-20 sm:pt-28 pb-14 px-6 sm:px-12 max-w-7xl mx-auto bg-[#14120B]">
        
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
            onClick={() => scrollToSection('product')}
            className="px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 font-medium text-[14px] flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <span>Request a demo</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* ─── Apple-Style Clean Studio Window (Simple, Elegant, #14120B) ─── */}
        <div className="w-full rounded-3xl border border-white/10 bg-[#14120B] shadow-2xl overflow-hidden text-left">
          
          {/* Minimal Window Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] select-none bg-[#14120B]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <span className="text-[12px] font-mono text-neutral-400 ml-2">Calvras Studio — AI Coding & Growth Engine</span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#14120B] border border-white/10 rounded-lg p-1">
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

          {/* Window Body: Prompt & Execution Stream */}
          <div className="p-6 sm:p-8 bg-[#14120B] grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Prompt & Real-time AI Agent Reasoning */}
            <div className="lg:col-span-5 space-y-4">
              <div className="border border-white/10 rounded-2xl p-4 bg-[#14120B]">
                <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Command size={12} className="text-neutral-400" />
                  <span>User Prompt</span>
                </div>
                <p className="text-[13.5px] text-neutral-100 font-medium leading-relaxed">
                  "Build a full-stack SaaS revenue analytics dashboard with Stripe subscription webhooks, live MRR tracking, and dark mode."
                </p>
              </div>

              {/* Autonomous Agent Thinking Progress */}
              <div className="border border-white/10 rounded-2xl p-4 bg-[#14120B] space-y-3">
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
            <div className="lg:col-span-7 border border-white/10 rounded-2xl p-5 bg-[#14120B] min-h-[340px] flex flex-col justify-between">
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
                    <div className="border border-white/10 rounded-xl p-4 bg-[#14120B]">
                      <div className="text-[11px] text-neutral-400 mb-1">Monthly Recurring Revenue</div>
                      <div className="text-[26px] font-bold text-white tracking-tight">$28,400</div>
                      <div className="text-[11px] text-emerald-400 mt-1 font-medium">+34.2% this month</div>
                    </div>

                    <div className="border border-white/10 rounded-xl p-4 bg-[#14120B]">
                      <div className="text-[11px] text-neutral-400 mb-1">Active Subscribers</div>
                      <div className="text-[26px] font-bold text-white tracking-tight">1,420</div>
                      <div className="text-[11px] text-emerald-400 mt-1 font-medium">99.2% Retention rate</div>
                    </div>
                  </div>

                  <div className="border border-white/10 rounded-xl p-4 bg-[#14120B] text-[12px] text-neutral-300">
                    <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider mb-2">Live Webhook Feed</div>
                    <div className="space-y-1.5 font-mono text-[11px]">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>customer.subscription.created</span>
                        <span className="text-emerald-400">+$40.00 Max</span>
                      </div>
                      <div className="flex items-center justify-between text-neutral-400">
                        <span>invoice.payment_succeeded</span>
                        <span className="text-emerald-400">+$20.00 Pro</span>
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

      {/* ─── Apple-Style Bento Grid (Clean, Simple, #14120B) ─── */}
      <section id="product" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] bg-[#14120B]">
        
        {/* Section Header */}
        <div className="text-left max-w-2xl mb-16">
          <div className="text-[12px] font-mono text-neutral-400 uppercase tracking-widest mb-3">
            Platform Architecture
          </div>
          <h2 className="text-[36px] sm:text-[46px] font-normal text-white tracking-tight leading-tight">
            Code, market, and monetize from a single autonomous agent.
          </h2>
        </div>

        {/* Apple-Style Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Bento Tile 1 */}
          <div className="border border-white/10 rounded-3xl p-8 bg-[#14120B] flex flex-col justify-between hover:border-white/25 transition-all text-left">
            <div>
              <div className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center mb-6 text-white">
                <Code2 size={20} />
              </div>
              <h3 className="text-[20px] font-semibold text-white mb-2.5">
                Autonomous Coding Copilot
              </h3>
              <p className="text-[13.5px] text-neutral-400 leading-relaxed mb-6">
                Build full-stack React and Node applications with live database models, robust API routes, and clean component architecture in seconds.
              </p>
            </div>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-300">
              <li className="flex items-center gap-2.5"><Check size={13} className="text-white" /> Full-stack React 18 & Node code generation</li>
              <li className="flex items-center gap-2.5"><Check size={13} className="text-white" /> Instant interactive browser sandbox</li>
              <li className="flex items-center gap-2.5"><Check size={13} className="text-white" /> Git sync & direct code ZIP export</li>
            </ul>
          </div>

          {/* Bento Tile 2 */}
          <div className="border border-white/10 rounded-3xl p-8 bg-[#14120B] flex flex-col justify-between hover:border-white/25 transition-all text-left">
            <div>
              <div className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center mb-6 text-white">
                <Megaphone size={20} />
              </div>
              <h3 className="text-[20px] font-semibold text-white mb-2.5">
                AI Growth & Marketing Engine
              </h3>
              <p className="text-[13.5px] text-neutral-400 leading-relaxed mb-6">
                From high-converting ad copy and viral social campaigns to full landing page optimization and automated sales email sequences.
              </p>
            </div>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-300">
              <li className="flex items-center gap-2.5"><Check size={13} className="text-white" /> Multi-channel ad hooks for Meta, TikTok & Google</li>
              <li className="flex items-center gap-2.5"><Check size={13} className="text-white" /> 7-day automated email drip campaigns</li>
              <li className="flex items-center gap-2.5"><Check size={13} className="text-white" /> Real-time landing page conversion analysis</li>
            </ul>
          </div>

          {/* Bento Tile 3 */}
          <div id="enterprise" className="border border-white/10 rounded-3xl p-8 bg-[#14120B] flex flex-col justify-between hover:border-white/25 transition-all text-left md:col-span-2 lg:col-span-1">
            <div>
              <div className="w-10 h-10 rounded-xl border border-white/15 flex items-center justify-center mb-6 text-white">
                <Shield size={20} />
              </div>
              <h3 className="text-[20px] font-semibold text-white mb-2.5">
                Enterprise Workspaces & Privacy
              </h3>
              <p className="text-[13.5px] text-neutral-400 leading-relaxed mb-6">
                Team collaboration with role permissions, centralized billing, custom brand voice calibrations, and zero-data-retention security.
              </p>
            </div>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-300">
              <li className="flex items-center gap-2.5"><Check size={13} className="text-white" /> Zero customer code training policy</li>
              <li className="flex items-center gap-2.5"><Check size={13} className="text-white" /> Centralized team workspace management</li>
              <li className="flex items-center gap-2.5"><Check size={13} className="text-white" /> 14-day money-back guarantee with Paystack</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ─── Models Section (Clean, Apple-Style) ─── */}
      <section id="models" className="py-20 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] bg-[#14120B]">
        <div className="border border-white/10 rounded-3xl p-8 sm:p-12 bg-[#14120B] flex flex-col lg:flex-row items-center justify-between gap-8 text-left">
          <div className="max-w-xl">
            <div className="text-[12px] font-mono text-neutral-400 uppercase tracking-widest mb-3">
              Frontier Intelligence
            </div>
            <h2 className="text-[32px] sm:text-[40px] font-normal text-white mb-4 leading-tight">
              Frontier models tuned for production code.
            </h2>
            <p className="text-[14px] text-neutral-400 leading-relaxed">
              Connect leading LLMs including Claude 3.5 Sonnet, GPT-4o, and Gemini 1.5 Pro directly to your workspace. Bring your own API keys for unlimited usage or use our managed high-speed pool.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <button
              onClick={onSignUp}
              className="px-6 py-3 rounded-full bg-white text-black font-semibold text-[13px] hover:bg-neutral-200 transition-colors cursor-pointer text-center"
            >
              Start Free Coding Agent
            </button>
            <button
              onClick={onNavigatePricing}
              className="px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15 font-semibold text-[13px] transition-colors cursor-pointer text-center"
            >
              View Model Pricing
            </button>
          </div>
        </div>
      </section>

      {/* ─── Apple-Style Pricing Section (Clean, Simple, #14120B) ─── */}
      <section id="pricing" className="py-24 px-6 sm:px-12 max-w-7xl mx-auto border-t border-white/[0.08] bg-[#14120B]">
        <div className="text-left max-w-2xl mb-16">
          <div className="text-[12px] font-mono text-neutral-400 uppercase tracking-widest mb-3">
            Transparent Pricing
          </div>
          <h2 className="text-[36px] sm:text-[46px] font-normal text-white tracking-tight leading-tight">
            Predictable plans. Built for ambitious builders.
          </h2>
          <p className="text-[14px] text-neutral-400 mt-3">
            Start for free, upgrade when you need unlimited scale and priority models.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`flex flex-col bg-[#14120B] rounded-3xl p-8 border transition-all text-left ${
                plan.id === 'pro' 
                  ? 'border-white/30 shadow-2xl relative' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {plan.id === 'pro' && (
                <div className="absolute -top-3 left-8 px-3 py-0.5 rounded-full bg-white text-[11px] font-bold text-black uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-[20px] font-semibold text-white mb-1.5">{plan.name}</h3>
                <p className="text-[12px] text-neutral-400 leading-relaxed mb-6 min-h-[36px]">
                  {plan.tagline}
                </p>

                <div className="mb-6 flex items-baseline gap-1">
                  <span className="text-[34px] font-bold text-white tracking-tight">
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
                className={`w-full py-3 rounded-full text-[13px] font-semibold flex items-center justify-center gap-1.5 transition-all mb-8 cursor-pointer ${
                  plan.id === 'pro'
                    ? 'bg-white text-black hover:bg-neutral-200 shadow-md'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/15'
                }`}
              >
                <span>{plan.cta}</span>
                {plan.id === 'team' && <ArrowRight size={14} />}
              </button>

              <div className="text-[10.5px] font-mono tracking-wider text-neutral-400 uppercase mb-4">
                {plan.tier}
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-[12.5px] text-neutral-300">
                    <div className="w-[16px] h-[16px] rounded-full border border-white/20 flex items-center justify-center flex-shrink-0">
                      <Check size={10} className="text-white" strokeWidth={2.5} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Apple-Style Clean Footer ─── */}
      <footer className="py-14 px-6 sm:px-12 border-t border-white/[0.08] bg-[#14120B] text-neutral-400 text-[13px]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md border border-white/15 flex items-center justify-center">
              <CalvrasLogoIcon className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-white text-[14px]">Calvras</span>
            <span className="text-neutral-500 ml-2">© {new Date().getFullYear()} All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[12.5px]">
            <button onClick={() => handleLegalClick('about')} className="hover:text-white transition-colors cursor-pointer">About</button>
            <button onClick={() => handleLegalClick('refund')} className="hover:text-white transition-colors cursor-pointer">Shipping & Refunds</button>
            <button onClick={() => handleLegalClick('terms')} className="hover:text-white transition-colors cursor-pointer">Terms</button>
            <button onClick={() => handleLegalClick('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy</button>
            <button onClick={() => handleLegalClick('help')} className="hover:text-white transition-colors cursor-pointer">Support</button>
            <button onClick={onNavigatePricing} className="text-white hover:underline transition-colors cursor-pointer font-medium">Pricing & Plans</button>
            <button onClick={onSignIn} className="hover:text-white transition-colors cursor-pointer">Sign in</button>
            <button onClick={onSignUp} className="text-white hover:underline cursor-pointer font-medium">Sign Up</button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-[11.5px] text-neutral-500 text-center leading-relaxed">
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
