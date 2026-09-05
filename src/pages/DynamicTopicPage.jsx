import React from 'react';
import { ChevronRight, ArrowLeft, Bot, Sparkles, CheckCircle2, ShieldCheck, Terminal, ExternalLink } from 'lucide-react';
import CalvrasFooter, { FOOTER_SECTIONS } from '../components/CalvrasFooter';

export default function DynamicTopicPage({ 
  topicSlug, 
  onBack, 
  onNavigateTopic, 
  onNavigatePricing, 
  onOpenCustomerService,
  onSignIn 
}) {
  // Find metadata from FOOTER_SECTIONS
  let foundLink = null;
  let foundCategory = 'Platform';

  for (const section of FOOTER_SECTIONS) {
    const l = section.links.find(x => x.slug === topicSlug);
    if (l) {
      foundLink = l;
      foundCategory = section.title;
      break;
    }
  }

  const topicTitle = foundLink?.name || (topicSlug ? topicSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Topic Overview');
  const topicDesc = foundLink?.desc || 'Explore Calvras next-generation autonomous AI architecture, model capabilities, and developer tools.';

  return (
    <div className="min-h-screen w-full bg-[#1B1B1D] text-white font-sans flex flex-col selection:bg-white selection:text-black overflow-y-auto">
      
      {/* ── Top Header Bar ── */}
      <header className="sticky top-0 z-40 bg-[#1B1B1D]/90 backdrop-blur-xl border-b border-white/[0.08] px-6 py-4">
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
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ── Main Hero Content ── */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12 sm:py-16 w-full">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6">
          <span className="hover:text-white cursor-pointer" onClick={onBack}>Home</span>
          <ChevronRight size={13} className="text-neutral-600" />
          <span className="text-neutral-400">{foundCategory}</span>
          <ChevronRight size={13} className="text-neutral-600" />
          <span className="text-white font-medium">{topicTitle}</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
          {topicTitle}
        </h1>
        <p className="text-lg text-neutral-300 leading-relaxed mb-10 max-w-2xl">
          {topicDesc}
        </p>

        {/* Content Card */}
        <div className="p-8 rounded-2xl bg-[#141416] border border-white/[0.08] space-y-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Sparkles size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">System Architecture & Capabilities</h2>
              <p className="text-xs text-neutral-400">Autonomous precision engineering at the frontier</p>
            </div>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed">
            Calvras pairs deep contextual reasoning with autonomous workspace virtualization. Whether inspecting external API contracts, generating React components, or stress-testing dependencies, every operation is validated continuously against strict runtime assertions.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
              <div className="text-xs font-semibold text-white flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Zero Code Training</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Your prompts, proprietary codebases, and API credentials are never used to train frontier models.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
              <div className="text-xs font-semibold text-white flex items-center gap-2">
                <ShieldCheck size={14} className="text-blue-400" />
                <span>Paystack Backed Security</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All subscriptions, compute quotas, and refunds are protected with an unconditional 14-day guarantee.
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Ready to experience Calvras?</h3>
            <p className="text-xs text-neutral-400">Start with our free plan or explore professional compute.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCustomerService}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-medium text-white transition-colors cursor-pointer border border-white/10"
            >
              Ask Support
            </button>
            <button
              onClick={onSignIn}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors cursor-pointer"
            >
              Launch Workspace →
            </button>
          </div>
        </div>

      </main>

      {/* ── Footer Network ── */}
      <CalvrasFooter 
        onNavigate={onNavigateTopic}
        onOpenCustomerService={onOpenCustomerService}
      />
    </div>
  );
}
