import React from 'react';
import { ArrowLeft, Sparkles, ShieldCheck, CheckCircle2, Bot, Terminal, Code2, Globe, ChevronRight } from 'lucide-react';
import CalvrasFooter from '../components/CalvrasFooter';

export const ANNOUNCEMENTS = [
  {
    category: 'ANNOUNCEMENT',
    date: 'Sep 2026',
    title: 'Calvras 3.7: Introducing Autonomous In-Browser Testing, Self-Repair & Live Token Streaming',
    slug: 'changelog'
  },
  {
    category: 'PRODUCT',
    date: 'Sep 2026',
    title: 'Live Web Browsing & Headless Search Engine for 1-Click Production UI Replication',
    slug: 'platform-search-engine'
  },
  {
    category: 'RESEARCH',
    date: 'Aug 2026',
    title: 'Multi-Turn Context Preservation: Eliminating Hallucinations in Virtualized Sandboxes',
    slug: 'research-papers'
  },
  {
    category: 'SECURITY',
    date: 'Aug 2026',
    title: 'Paystack-Backed Commerce Security with 14-Day Money-Back Guarantee',
    slug: 'refund'
  },
  {
    category: 'COMPANY',
    date: 'Jul 2026',
    title: 'Calvras Technologies: The Principles of High-Precision Autonomous Software Engineering',
    slug: 'about'
  }
];

export default function AboutUsPage({ onBack, onNavigatePricing, onNavigateTopic, onOpenCustomerService, onSignIn }) {
  return (
    <div className="min-h-screen w-full bg-[#1B1B1C] text-white font-sans selection:bg-white selection:text-black flex flex-col overflow-y-auto">
      
      {/* ── Top Apple/Claude-Style Navigation Bar ── */}
      <header className="sticky top-0 z-40 bg-[#1B1B1C]/90 backdrop-blur-xl border-b border-white/[0.08] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Calvras" className="w-5 h-5 object-contain" />
              <span className="font-bold text-sm tracking-tight text-white">CALVRAS</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigatePricing}
              className="text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg hover:bg-white/5"
            >
              Pricing
            </button>
            <button
              onClick={onSignIn}
              className="px-3.5 py-1.5 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
            >
              Launch Calvras
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Hero Section (Image 1 Style) ── */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 sm:px-8 pt-16 sm:pt-24 pb-16">
        
        {/* Category Chip */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-xs font-medium text-neutral-300 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>About Calvras Technologies</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal tracking-tight text-white leading-[1.15] mb-8 max-w-4xl">
          AI systems and autonomous coding agents that put precision at the frontier
        </h1>

        <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed max-w-3xl mb-14">
          At Calvras, we build AI to empower human creativity and engineering excellence. We develop autonomous software agents that plan, write, test, and self-heal complex web applications with 100% precision.
        </p>

        {/* ── Core Value Pillars (Image 1 Style Cards) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-20">
          <div className="p-6 rounded-2xl bg-[#141416] border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Bot size={18} />
            </div>
            <h3 className="text-sm font-semibold text-white">Autonomous Testing</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every code edit and generated component is verified automatically with syntax and runtime checks before rendering.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141416] border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Globe size={18} />
            </div>
            <h3 className="text-sm font-semibold text-white">Live Web Intelligence</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Real-time web search and deep browsing engines allow Calvras to inspect documentation, fetch live APIs, and duplicate UIs.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141416] border border-white/[0.08] space-y-3">
            <div className="w-9 h-9 rounded-xl bg-violet-500/15 border border-violet-500/30 flex items-center justify-center text-violet-400">
              <ShieldCheck size={18} />
            </div>
            <h3 className="text-sm font-semibold text-white">Zero Code Training</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Your proprietary code, architecture designs, and API keys remain strictly confidential and are never used to train public models.
            </p>
          </div>
        </div>

        {/* ── Mission & Engineering Section ── */}
        <div className="border-t border-white/[0.08] pt-16 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <h2 className="text-sm font-bold uppercase tracking-widest text-neutral-400">
                Our Purpose
              </h2>
            </div>
            <div className="md:col-span-8 space-y-6 text-base text-neutral-300 leading-relaxed">
              <p>
                Software development has reached an inflection point. Building modern, production-grade applications requires orchestrating complex frontend systems, responsive layout tokens, dynamic state management, API contracts, and unit tests.
              </p>
              <p>
                Calvras was created to eliminate the friction of boilerplate engineering. By combining frontier multi-modal reasoning models with an isolated, live in-browser React 18 virtualization sandbox, Calvras transforms ideas into fully testable, interactive software in seconds.
              </p>
              <p>
                All transactions are securely handled via Paystack with an immediate electronic fulfillment guarantee and an unconditional 14-day refund policy.
              </p>
            </div>
          </div>
        </div>

        {/* ── Research & Announcements Table (Image 2 Style) ── */}
        <div className="border-t border-white/[0.08] pt-16 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl sm:text-2xl font-serif font-normal text-white">
              Research & Announcements
            </h2>
            <span className="text-xs text-neutral-400">Latest frontier milestones</span>
          </div>

          <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {ANNOUNCEMENTS.map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => {
                  if (onNavigateTopic) onNavigateTopic(item.slug);
                }}
                className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 group cursor-pointer hover:bg-white/[0.02] -mx-4 px-4 rounded-xl transition-colors"
              >
                <div className="flex items-baseline gap-4 sm:gap-6 flex-1 min-w-0">
                  <span className="text-[11px] font-semibold text-neutral-400 tracking-wider w-28 flex-shrink-0 uppercase">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-medium text-neutral-200 group-hover:text-white transition-colors truncate">
                    {item.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-xs text-neutral-400 flex-shrink-0">
                  <span>{item.date}</span>
                  <ChevronRight size={14} className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ── Anthropic-Style Shared Footer Network ── */}
      <CalvrasFooter 
        onNavigate={onNavigateTopic}
        onOpenCustomerService={onOpenCustomerService}
      />

    </div>
  );
}
