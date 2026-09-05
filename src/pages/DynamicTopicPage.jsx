import React from 'react';
import { 
  ChevronRight, ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, 
  Terminal, Cpu, Code2, Globe, FileCode2, Layers, Zap, Lock, Users, Building2 
} from 'lucide-react';
import CalvrasFooter from '../components/CalvrasFooter';
import { ALL_FOOTER_LINKS, FOOTER_COLUMNS } from '../data/topicRegistry';

// Category metadata helper
function getCategoryInfo(slug) {
  for (const col of FOOTER_COLUMNS) {
    for (const sec of col.sections) {
      const match = sec.links.find(l => l.slug === slug);
      if (match) {
        return {
          category: sec.title,
          link: match
        };
      }
    }
  }
  return {
    category: 'Platform',
    link: null
  };
}

export default function DynamicTopicPage({ 
  topicSlug, 
  onBack, 
  onNavigateTopic, 
  onNavigatePricing, 
  onOpenCustomerService,
  onSignIn 
}) {
  const { category, link } = getCategoryInfo(topicSlug);

  const topicTitle = link?.name || (topicSlug ? topicSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Platform Overview');
  const topicDesc = link?.desc || 'Explore Calvras next-generation autonomous AI architecture, model capabilities, and developer tools.';

  // Contextual pillar highlights based on category
  const getPillars = () => {
    if (category === 'Models') {
      return [
        { icon: Cpu, title: 'Frontier Reasoning Engine', desc: 'Engineered with deep multi-token speculative decoding and AST-guided logical synthesis.' },
        { icon: Zap, title: 'Extreme Latency Optimization', desc: 'Sub-millisecond first-token response times designed for real-time interactive development.' },
        { icon: Layers, title: '200,000+ Context Window', desc: 'Ingest entire multi-repository projects, full API schemas, and historical logs seamlessly.' },
        { icon: ShieldCheck, title: 'Verifiable Safety Alignment', desc: 'Trained under constitutional safety constraints with zero data leakage guarantees.' }
      ];
    }
    if (category === 'Solutions') {
      return [
        { icon: Code2, title: 'End-to-End Task Autonomy', desc: 'Deconstruct complex enterprise objectives into deterministic verification milestones.' },
        { icon: ShieldCheck, title: 'Strict Enterprise Compliance', desc: 'Certified for SOC 2 Type II, ISO 27001, HIPAA readiness, and zero code retention.' },
        { icon: Terminal, title: 'Direct Pipeline Integration', desc: 'Seamlessly connects with GitHub Actions, GitLab CI, Jira, and Slack webhooks.' },
        { icon: Users, title: 'Collaborative Governance', desc: 'Granular permission controls, auditable diff reviews, and single sign-on (SSO).' }
      ];
    }
    if (category === 'Company' || category === 'Terms and policies') {
      return [
        { icon: ShieldCheck, title: 'Constitutional Safety', desc: 'Rigorous alignment research ensuring AI actions remain safe, verifiable, and transparent.' },
        { icon: Lock, title: 'Zero Data Training', desc: 'Customer source code and proprietary prompts are never used to train base foundation models.' },
        { icon: Globe, title: 'Responsible Scaling Policy', desc: 'Clear, pre-committed safety thresholds and capability evaluations before deployment.' },
        { icon: Building2, title: 'Public Benefit Mission', desc: 'Balancing frontier capability advancement with societal resilience and economic safety.' }
      ];
    }
    // Default / Products / Resources / Platform
    return [
      { icon: Sparkles, title: 'Autonomous Sandbox Virtualization', desc: 'Runs real-time full-stack preview sandboxes with live React 18 and Node runtime.' },
      { icon: Terminal, title: 'Native Terminal & Tool Calling', desc: 'Executes linters, installs dependencies, and tests API endpoints autonomously.' },
      { icon: CheckCircle2, title: 'Automated Syntax & Import Verification', desc: 'Every line of generated code is verified against runtime assertions before delivery.' },
      { icon: Lock, title: 'Enterprise Cryptographic Security', desc: 'All sessions, keys, and workspace storage are protected with AES-256 GCM encryption.' }
    ];
  };

  const pillars = getPillars();

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
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6 flex-wrap">
          <span className="hover:text-white cursor-pointer transition-colors" onClick={onBack}>Home</span>
          <ChevronRight size={13} className="text-neutral-600" />
          <span className="text-neutral-400">{category}</span>
          <ChevronRight size={13} className="text-neutral-600" />
          <span className="text-white font-medium">{topicTitle}</span>
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-4 mb-10">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.06] border border-white/10 text-[11px] font-medium text-neutral-300">
            <Sparkles size={12} className="text-blue-400" />
            <span>{category} • Calvras Frontier Suite</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {topicTitle}
          </h1>
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl">
            {topicDesc}
          </p>
        </div>

        {/* ── 4 Feature Pillars Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-[#141416] border border-white/[0.08] space-y-2">
                <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-blue-400">
                  <Icon size={16} />
                </div>
                <h3 className="text-sm font-semibold text-white pt-1">{item.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* ── Architecture & Deep Dive Card ── */}
        <div className="p-8 rounded-2xl bg-[#141416] border border-white/[0.08] space-y-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Terminal size={20} />
            </div>
            <div>
              <h2 className="text-base font-semibold text-white">System Architecture & Runtime Specifications</h2>
              <p className="text-xs text-neutral-400">Autonomous precision engineering at frontier scale</p>
            </div>
          </div>

          <p className="text-sm text-neutral-300 leading-relaxed">
            Calvras pairs deep contextual reasoning with autonomous workspace virtualization. Whether inspecting external API contracts, generating React components, or stress-testing dependencies, every operation is validated continuously against strict runtime assertions before changes are committed.
          </p>

          {/* Technical Spec Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Context Window</div>
              <div className="text-sm font-bold text-white mt-1">200K Tokens</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Runtime Sandboxes</div>
              <div className="text-sm font-bold text-white mt-1">Node 20 / Vite 6</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Training Policy</div>
              <div className="text-sm font-bold text-white mt-1 text-emerald-400">Zero Retention</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
              <div className="text-[11px] text-neutral-400 uppercase tracking-wider">Target SLA</div>
              <div className="text-sm font-bold text-white mt-1">99.99% Uptime</div>
            </div>
          </div>

          {/* Trust & Guarantee Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
              <div className="text-xs font-semibold text-white flex items-center gap-2">
                <CheckCircle2 size={14} className="text-emerald-400" />
                <span>Zero Code Training Guarantee</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Your prompts, proprietary codebases, and API credentials are never stored or used to train frontier models.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-1.5">
              <div className="text-xs font-semibold text-white flex items-center gap-2">
                <ShieldCheck size={14} className="text-blue-400" />
                <span>Paystack Backed Security</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                All subscriptions, compute quotas, and refunds are protected with an unconditional 14-day refund guarantee.
              </p>
            </div>
          </div>
        </div>

        {/* ── Action Bar ── */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border border-blue-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-white">Experience {topicTitle} in Calvras</h3>
            <p className="text-xs text-neutral-400">Start with our free plan or explore professional compute tiers.</p>
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
