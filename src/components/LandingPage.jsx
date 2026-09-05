import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, Code2, Megaphone, Zap, Shield, 
  Terminal, BarChart3, Globe, Cpu, Check, Layers, Play, ChevronDown
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
  const [activeTab, setActiveTab] = useState('marketing');
  const [legalTab, setLegalTab] = useState(null);
  const [resourcesOpen, setResourcesOpen] = useState(false);

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
    <div className="min-h-screen w-full bg-[rgb(15,15,17)] text-white font-sans selection:bg-white selection:text-black">
      
      {/* ─── Top Header (Cursor.com Style with Resources Dropdown) ─── */}
      <header className="sticky top-0 z-50 w-full bg-[#0f0f11]/92 backdrop-blur-xl border-b border-white/[0.08] px-6 py-3.5 select-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Left: Brand Logo & Title */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 cursor-pointer select-none group"
          >
            <div className="w-7 h-7 rounded-lg bg-[#222226] border border-white/10 flex items-center justify-center shadow-inner group-hover:border-white/30 transition-colors">
              <CalvrasLogoIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-bold text-white tracking-tight">
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
                  <div className="bg-[#141416]/98 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-[0_25px_60px_rgba(0,0,0,0.85)] grid grid-cols-2 gap-x-6 gap-y-3 text-left">
                    {/* Column 1 */}
                    <div className="space-y-3">
                      <button onClick={() => scrollToSection('changelog')} className="block w-full text-left text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer font-medium">
                        Changelog
                      </button>
                      <button onClick={() => handleLegalClick('about')} className="block w-full text-left text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer font-medium">
                        Docs
                      </button>
                      <button onClick={() => handleLegalClick('help')} className="block w-full text-left text-xs text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer font-medium flex items-center justify-between">
                        <span>Help</span>
                        <span className="text-[9.5px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded font-mono">Center</span>
                      </button>
                      <button onClick={() => scrollToSection('faq')} className="block w-full text-left text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer font-medium">
                        Forum
                      </button>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-3">
                      <button onClick={() => scrollToSection('about')} className="block w-full text-left text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer font-medium">
                        Blog
                      </button>
                      <button onClick={() => scrollToSection('usecases')} className="block w-full text-left text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer font-medium">
                        Community
                      </button>
                      <button onClick={() => handleLegalClick('refund')} className="block w-full text-left text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer font-medium">
                        Workshops
                      </button>
                      <button onClick={() => handleLegalClick('about')} className="block w-full text-left text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer font-medium">
                        Careers
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right: Action Buttons (Cursor style) */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onSignIn}
              className="text-[13.5px] font-medium text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={onSignUp}
              className="text-[13px] font-medium text-white px-4 py-1.5 rounded-full border border-white/20 bg-white/[0.06] hover:bg-white/[0.12] transition-all cursor-pointer shadow-sm active:scale-95"
            >
              Contact
            </button>
          </div>
        </div>
      </header>

      {/* ─── Hero Section ─── */}
      <section className="relative pt-20 pb-20 px-6 sm:px-10 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
        
        {/* Ambient Glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/20 to-purple-600/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Announcement Badge */}
        <div id="changelog" className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/10 text-[12px] font-medium text-neutral-300 mb-8 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Calvras AI 2.0 is Live</span>
          <span className="text-neutral-500">•</span>
          <span className="text-neutral-400">Marketing & Coding Copilot</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-[38px] sm:text-[56px] md:text-[64px] font-bold text-white tracking-[-0.035em] leading-[1.08] max-w-4xl mb-6">
          Supercharge your growth with <span className="bg-gradient-to-r from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">AI marketing</span> & <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">instant code</span>.
        </h1>

        {/* Hero Subtitle */}
        <p className="text-[16px] sm:text-[18px] text-neutral-400 max-w-2xl leading-relaxed mb-10">
          From viral marketing funnels, high-converting ad copy, and SEO playbooks to autonomous full-stack software development. Build, launch, and scale in record time.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 mb-16">
          <button
            onClick={onSignUp}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-black font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all shadow-lg shadow-white/10 cursor-pointer group active:scale-98"
          >
            <span>Get Started for Free</span>
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => scrollToSection('products')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/10 font-medium text-[14px] flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Play size={14} className="text-neutral-400" />
            <span>Explore Platform</span>
          </button>
        </div>

        {/* Interactive Dual AI Showcase Window */}
        <div id="models" className="w-full max-w-4xl rounded-2xl bg-[#18181b]/80 border border-white/10 p-2 sm:p-3 shadow-2xl shadow-black/80 backdrop-blur-xl">
          
          {/* Showcase Tabs */}
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>

            <div className="flex items-center bg-[#27272a] rounded-lg p-1 border border-white/5">
              <button
                onClick={() => setActiveTab('marketing')}
                className={`px-3 py-1 rounded-md text-[12px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'marketing' ? 'bg-white text-black shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Megaphone size={13} />
                <span>AI Marketing Engine</span>
              </button>
              <button
                onClick={() => setActiveTab('coding')}
                className={`px-3 py-1 rounded-md text-[12px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'coding' ? 'bg-white text-black shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Code2 size={13} />
                <span>Full-Stack Coding Agent</span>
              </button>
            </div>

            <span className="text-[11px] text-neutral-500 font-mono hidden sm:inline">
              calvras-engine v2.0
            </span>
          </div>

          {/* Tab Content Display */}
          {activeTab === 'marketing' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-3 text-left">
              <div className="bg-[#202024] rounded-xl p-4 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Sparkles size={11} /> Viral Ad Hooks & Copy
                  </div>
                  <p className="text-[13px] font-semibold text-white mb-2">
                    "Stop losing 80% of your funnel traffic. Here is the 1-click stack."
                  </p>
                  <p className="text-[11.5px] text-neutral-400 leading-relaxed">
                    Tuned for TikTok ads, Meta reels, and LinkedIn sponsored campaigns with high conversion index.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Target ROAS: 4.8x</span>
                  <span className="text-emerald-400 font-medium">99.4% SEO Score</span>
                </div>
              </div>

              <div className="bg-[#202024] rounded-xl p-4 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Globe size={11} /> Auto Landing Page CRO
                  </div>
                  <p className="text-[13px] font-semibold text-white mb-2">
                    Dynamic Hero & Pricing Conversion Test
                  </p>
                  <p className="text-[11.5px] text-neutral-400 leading-relaxed">
                    AI analyzes visitor bounce signals and rewrites headings and call-to-actions in real-time.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>A/B Variant B</span>
                  <span className="text-emerald-400 font-medium">+34% Lift</span>
                </div>
              </div>

              <div className="bg-[#202024] rounded-xl p-4 border border-white/5 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                    <BarChart3 size={11} /> Automated Email Sequences
                  </div>
                  <p className="text-[13px] font-semibold text-white mb-2">
                    7-Day High Retention Welcome Flow
                  </p>
                  <p className="text-[11.5px] text-neutral-400 leading-relaxed">
                    Personalized onboarding drips that educate users and upsell to Pro and Team plans automatically.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Open Rate: 62%</span>
                  <span className="text-emerald-400 font-medium">18.2% CTR</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#121214] rounded-xl p-4 font-mono text-left text-[12.5px] border border-white/5 text-neutral-300 space-y-2">
              <div className="flex items-center justify-between text-neutral-500 text-[11px] pb-2 border-b border-white/5 font-sans">
                <span>App.jsx • Full-Stack React + Node + Tailwind</span>
                <span className="text-emerald-400">● Live Sandbox Ready</span>
              </div>
              <p className="text-purple-400">import <span className="text-white">React, &#123; useState, useEffect &#125;</span> from <span className="text-amber-300">'react'</span>;</p>
              <p className="text-purple-400">import <span className="text-white">&#123; createMarketingEngine &#125;</span> from <span className="text-amber-300">'@calvras/ai'</span>;</p>
              <p className="text-neutral-500">// Autonomous full-stack agent creates endpoints, DB schemas & UI components</p>
              <p><span className="text-blue-400">export default function</span> <span className="text-yellow-300">RevenueDashboard</span>() &#123;</p>
              <p className="pl-4"><span className="text-blue-400">const</span> [stats, setStats] = <span className="text-yellow-300">useState</span>(&#123; mrr: <span className="text-amber-300">14250</span>, growth: <span className="text-emerald-400">'+38%'</span> &#125;);</p>
              <p className="pl-4"><span className="text-purple-400">return</span> (</p>
              <p className="pl-8 text-neutral-300">&lt;<span className="text-blue-400">div</span> <span className="text-indigo-300">className</span>=<span className="text-amber-300">"grid grid-cols-3 gap-6 p-8 bg-zinc-950 rounded-2xl"</span>&gt;</p>
              <p className="pl-12 text-neutral-400">&lt;<span className="text-blue-400">RevenueCard</span> <span className="text-indigo-300">title</span>=<span className="text-amber-300">"Active MRR"</span> <span className="text-indigo-300">value</span>=&#123;stats.mrr&#125; /&gt;</p>
              <p className="pl-8 text-neutral-300">&lt;/<span className="text-blue-400">div</span>&gt;</p>
              <p className="pl-4">);</p>
              <p>&#125;</p>
            </div>
          )}
        </div>
      </section>

      {/* ─── Products & Features Section ─── */}
      <section id="products" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-[12px] font-bold tracking-widest text-blue-400 uppercase mb-3">
            Platform Capabilities
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-white tracking-tight leading-tight">
            Everything you need to market, code, and monetize.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-[#18181b] rounded-2xl p-7 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all">
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
          <div className="bg-[#18181b] rounded-2xl p-7 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all">
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
          <div id="enterprise" className="bg-[#18181b] rounded-2xl p-7 border border-white/5 flex flex-col justify-between hover:border-white/15 transition-all">
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

      {/* ─── About & Use Cases Section ─── */}
      <section id="usecases" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto border-t border-white/5">
        <div id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[12px] font-bold tracking-widest text-emerald-400 uppercase mb-3">
              Built for Modern Builders
            </div>
            <h2 className="text-[32px] sm:text-[40px] font-bold text-white tracking-tight leading-tight mb-6">
              Empowering creators to turn ideas into profitable software.
            </h2>
            <p className="text-[15px] text-neutral-400 leading-relaxed mb-8">
              Calvras bridges the gap between engineering and marketing. No longer do developers build products that fail to market, or marketers create campaigns without working software. Build the product and the revenue engine in one unified space.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} className="text-white" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-white">SaaS Founders & Indie Hackers</h4>
                  <p className="text-[12.5px] text-neutral-400">Launch MVPs and high-converting marketing funnels within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} className="text-white" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-white">Growth Marketers & Agencies</h4>
                  <p className="text-[12.5px] text-neutral-400">Deliver multi-client ad campaigns, copy variations, and landing pages with 10x velocity.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={14} className="text-white" />
                </div>
                <div>
                  <h4 className="text-[14px] font-bold text-white">Software Developers</h4>
                  <p className="text-[12.5px] text-neutral-400">Get autonomous AI pair-programming with production-quality code and instant exports.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#18181b] rounded-3xl p-8 border border-white/10 relative overflow-hidden shadow-2xl">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-[20px] font-bold text-white mb-6">Calvras Growth Benchmark</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-[12.5px] mb-2 font-medium">
                  <span className="text-neutral-300">Development Velocity</span>
                  <span className="text-emerald-400 font-bold">10x Faster</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-[92%] h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12.5px] mb-2 font-medium">
                  <span className="text-neutral-300">Ad Campaign Conversion Lift</span>
                  <span className="text-emerald-400 font-bold">+38% Conversion</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-[78%] h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[12.5px] mb-2 font-medium">
                  <span className="text-neutral-300">Time-to-First-Dollar Revenue</span>
                  <span className="text-emerald-400 font-bold">Under 48 Hours</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="w-[85%] h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[12px] text-neutral-400">Ready to build your next revenue stream?</span>
              <button
                onClick={onSignUp}
                className="text-[12.5px] font-semibold text-white hover:text-neutral-300 flex items-center gap-1.5 cursor-pointer"
              >
                Sign Up Now <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Interactive Pricing Preview ─── */}
      <section id="pricing" className="py-24 px-6 sm:px-10 max-w-6xl mx-auto border-t border-white/5">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-[12px] font-bold tracking-widest text-indigo-400 uppercase mb-3">
            Pricing Plans
          </div>
          <h2 className="text-[32px] sm:text-[40px] font-bold text-white tracking-tight leading-tight mb-4">
            Simple, transparent pricing for all stages.
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
              className={`flex flex-col bg-[#1c1c1f] rounded-[24px] p-7 border transition-all ${
                plan.id === 'pro' 
                  ? 'border-indigo-500/40 shadow-2xl shadow-indigo-500/10 relative' 
                  : 'border-white/10'
              }`}
            >
              {plan.id === 'pro' && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-600 text-[11px] font-bold text-white uppercase tracking-wider shadow-md">
                  Most Popular
                </div>
              )}

              <div>
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

              <div className="text-[10.5px] font-bold tracking-[0.06em] text-neutral-500 uppercase mb-4">
                {plan.tier}
              </div>

              <ul className="space-y-3 flex-1">
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
      <footer className="py-12 px-6 sm:px-10 border-t border-white/5 bg-[rgb(12,12,14)] text-neutral-500 text-[13px]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-[#27272a] border border-white/10 flex items-center justify-center">
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
            <button onClick={onNavigatePricing} className="text-emerald-400 hover:underline transition-colors cursor-pointer font-medium">Pricing & Plans</button>
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
