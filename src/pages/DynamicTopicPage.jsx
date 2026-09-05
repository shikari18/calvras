import React, { useState } from 'react';
import { 
  ChevronRight, ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, 
  Terminal, Cpu, Code2, Globe, FileCode2, Layers, Zap, Lock, Users, Building2,
  Play, Check, ExternalLink, ArrowRight, Server, Compass, Clock, Sliders
} from 'lucide-react';
import CalvrasFooter from '../components/CalvrasFooter';
import { ALL_FOOTER_LINKS, FOOTER_COLUMNS } from '../data/topicRegistry';

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
  const [activeCodeTab, setActiveCodeTab] = useState('agent');

  const topicTitle = link?.name || (topicSlug ? topicSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Platform Overview');
  const topicDesc = link?.desc || 'Explore Calvras next-generation autonomous AI architecture, model capabilities, and developer tools.';

  // Contextual sample code tailored to the category
  const getSampleCode = () => {
    if (category === 'Models') {
      return `import { CalvrasEngine } from '@calvras/sdk';

// Initialize Calvras Frontier Model with deep reasoning
const client = new CalvrasEngine({
  apiKey: process.env.CALVRAS_API_KEY,
  model: '${topicSlug.includes('opus') ? 'calvras-opus-3.7' : topicSlug.includes('sonnet') ? 'calvras-sonnet-3.5' : 'calvras-mythos-1.0'}',
  telemetry: { verifyRuntime: true, autoHeal: true }
});

const session = await client.createSession({
  systemPrompt: 'You are an autonomous staff engineer. Verify all code syntax and runtime assertions.',
  contextWindow: 200_000,
  sandbox: 'react-vite-node20'
});

const result = await session.executeTask({
  intent: 'Refactor auth state machine to zero-retention JWT architecture with tests',
  autonomousTesting: true
});

console.log('✓ Compilation verified:', result.testsPassed);`;
    }

    if (category === 'Solutions') {
      return `// Calvras Autonomous Solution Pipeline: ${topicTitle}
import { Pipeline, AgentCluster } from '@calvras/enterprise';

const cluster = new AgentCluster({
  vertical: '${topicSlug}',
  compliance: ['SOC2-TypeII', 'HIPAA-Ready', 'GDPR'],
  trainingRetention: 'ZERO_RETENTION_GUARANTEE'
});

export async function runAutonomousWorkflow(repositoryUri: string) {
  const pipeline = await cluster.mountRepository(repositoryUri);
  
  // 1. Ingest entire codebase AST into 200K token context
  const analysis = await pipeline.analyzeArchitecture();
  
  // 2. Synthesize enterprise-grade solution
  const patch = await pipeline.synthesizeRefactor({
    target: 'production-scale',
    assertions: ['zero-regression', 'sub-20ms-latency']
  });

  // 3. Autonomous live sandbox verification
  return await pipeline.verifyAndDeploy(patch);
}`;
    }

    // Default: Products & Platform
    return `// Calvras Workspace Virtualization: ${topicTitle}
import React, { useState, useEffect } from 'react';
import { CalvrasAgent, VirtualSandbox } from '@calvras/client';

export default function AutonomousApp() {
  const [status, setStatus] = useState('initializing');
  const [telemetry, setTelemetry] = useState({ cpu: '12%', memory: '142MB', uptime: '99.99%' });

  useEffect(() => {
    const sandbox = new VirtualSandbox({ hotReload: true });
    sandbox.mount().then(() => setStatus('verified'));
  }, []);

  return (
    <div className="calvras-workspace flex flex-col p-6 bg-[#1B1B1C] text-white">
      <header className="flex items-center justify-between border-b border-white/10 pb-4">
        <h1 className="text-xl font-bold tracking-tight">${topicTitle}</h1>
        <span className="px-2.5 py-1 rounded-full text-xs bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
          ● Autonomous Engine Ready
        </span>
      </header>
      <main className="mt-6 space-y-4">
        <p className="text-sm text-neutral-300">Live virtualization running on port 5173 with automated assertions.</p>
      </main>
    </div>
  );
}`;
  };

  return (
    <div className="min-h-screen w-full bg-[#1B1B1C] text-white font-sans flex flex-col selection:bg-white selection:text-black overflow-y-auto">
      
      {/* ── Top Apple Frosted Glass Header Bar ── */}
      <header className="sticky top-0 z-50 bg-[#1B1B1C]/80 backdrop-blur-xl border-b border-white/[0.06] px-6 py-3.5 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 cursor-pointer" onClick={onBack}>
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
              className="px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* ── Apple-Grade Hero Section with Ambient Glow ── */}
      <main className="flex-1 w-full relative">
        
        {/* Subtle radial ambient spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-blue-600/10 via-indigo-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-6 pt-12 sm:pt-16 pb-16 flex flex-col items-center text-center">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6 select-none flex-wrap justify-center">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={onBack}>Home</span>
            <ChevronRight size={13} className="text-neutral-600" />
            <span className="text-neutral-400">{category}</span>
            <ChevronRight size={13} className="text-neutral-600" />
            <span className="text-white font-medium">{topicTitle}</span>
          </div>

          {/* Glowing Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-neutral-300 shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>{category} • Calvras Frontier Suite</span>
          </div>

          {/* Billion-Dollar Apple Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl">
            {topicTitle}
          </h1>

          {/* High-Contrast Subtitle */}
          <p className="text-base sm:text-xl text-neutral-400 font-normal leading-relaxed max-w-2xl mt-5">
            {topicDesc}
          </p>

          {/* Dual Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mt-8">
            <button
              onClick={onSignIn}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs sm:text-sm font-semibold transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center gap-2 cursor-pointer"
            >
              <span>Launch in Calvras</span>
              <ArrowRight size={15} />
            </button>
            <button
              onClick={onOpenCustomerService}
              className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/[0.1] text-xs sm:text-sm font-medium transition-all cursor-pointer"
            >
              Talk to Specialist
            </button>
          </div>

          {/* ── Visual Showcase: Interactive macOS IDE Window ── */}
          <div className="w-full mt-14 rounded-2xl bg-[#141416] border border-white/[0.1] shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden text-left font-mono text-xs">
            
            {/* macOS Window Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#18181B] border-b border-white/[0.06] select-none">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5F56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#FFBD2E] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27C93F] inline-block" />
              </div>
              <div className="text-[11px] text-neutral-400 font-sans font-medium flex items-center gap-1.5">
                <Terminal size={13} className="text-blue-400" />
                <span>calvras-agent-session — {topicTitle.toLowerCase().replace(/\s+/g, '-')}.ts</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] text-emerald-400 font-sans">AST Verified</span>
              </div>
            </div>

            {/* Editor Body */}
            <div className="p-5 overflow-x-auto text-[#e6edf3] bg-[#0E0E10] leading-relaxed">
              <pre className="font-mono text-[12px] sm:text-[12.5px]">
                <code>{getSampleCode()}</code>
              </pre>
            </div>

            {/* Bottom Real-Time Telemetry Bar */}
            <div className="px-4 py-2.5 bg-[#141416] border-t border-white/[0.06] flex flex-wrap items-center justify-between text-[11px] text-neutral-400 font-sans gap-2">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 flex items-center gap-1">
                  <Check size={13} /> 0 Syntax Errors
                </span>
                <span>•</span>
                <span className="text-neutral-300">Context: 200,000 Tokens Active</span>
                <span>•</span>
                <span className="text-neutral-300">Hot Module Reload: 42ms</span>
              </div>
              <div className="text-neutral-500 font-mono">
                Port 5173 (Ready)
              </div>
            </div>
          </div>

          {/* ── Apple Bento Grid Feature Showcase ── */}
          <div className="w-full mt-16 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 text-center">
              Engineered for Frontier Precision
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto text-center mb-10">
              Autonomous engineering backed by compiler-grade validation and zero-compromise architectural rigor.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              
              {/* Bento Card 1: Autonomous Loop */}
              <div className="p-6 rounded-2xl bg-[#141416] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Cpu size={20} />
                </div>
                <h3 className="text-base font-semibold text-white">Full-Stack Agentic Autonomy</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Calvras does not merely output text suggestions. It autonomously navigates project trees, generates multi-file TypeScript components, and tests API schemas directly in an in-memory virtual container.
                </p>
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-neutral-300 space-y-1">
                  <div className="text-blue-400">➜ Step 1: Synthesize AST code representation</div>
                  <div className="text-amber-400">➜ Step 2: Run in-container TypeScript validation</div>
                  <div className="text-emerald-400">➜ Step 3: Verified runtime assertions (Pass)</div>
                </div>
              </div>

              {/* Bento Card 2: Deep Context Retention */}
              <div className="p-6 rounded-2xl bg-[#141416] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                  <Layers size={20} />
                </div>
                <h3 className="text-base font-semibold text-white">200,000+ Token Context Window</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Ingest entire production codebases, multi-layer dependencies, and historical commits without loss of recall. Speculative decoding maintains sub-second interactive response velocity.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-sans">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-sm font-bold text-white">200K</div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Context</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-sm font-bold text-emerald-400">99.98%</div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Recall</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-sm font-bold text-blue-400">&lt;90ms</div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Latency</div>
                  </div>
                </div>
              </div>

              {/* Bento Card 3: Deterministic Safety */}
              <div className="p-6 rounded-2xl bg-[#141416] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <ShieldCheck size={20} />
                </div>
                <h3 className="text-base font-semibold text-white">Zero Code Training Guarantee</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Your proprietary intellectual property, API keys, and sensitive prompts are never retained or utilized to train foundation models. Cryptographic tenant isolation ensures compliance at enterprise scale.
                </p>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 size={15} />
                  <span>SOC 2 Type II Certified • Zero Retention Infrastructure</span>
                </div>
              </div>

              {/* Bento Card 4: Paystack Protection */}
              <div className="p-6 rounded-2xl bg-[#141416] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                  <Lock size={20} />
                </div>
                <h3 className="text-base font-semibold text-white">14-Day Money-Back Guarantee</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  All subscriptions, compute allocations, and enterprise team seats are processed securely via Paystack with an unconditional 14-day refund guarantee. No lock-in, no hidden quotas.
                </p>
                <div className="flex items-center gap-2 text-xs text-neutral-300 font-medium">
                  <Globe size={15} className="text-blue-400" />
                  <span>Immediate Electronic Fulfillment & Instant Activation</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── Apple-Style Tech Specs Table ── */}
          <div className="w-full mt-16 text-left">
            <h2 className="text-xl font-bold tracking-tight text-white mb-6">
              Technical Specifications
            </h2>

            <div className="rounded-2xl border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06] text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-[#141416]">
                <div className="font-semibold text-white">Agent Runtime Environment</div>
                <div className="sm:col-span-2 text-neutral-400">Node.js 20 LTS, Vite 6 Virtualization, React 18 / TypeScript 5.4 runtime sandbox</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-[#141416]">
                <div className="font-semibold text-white">Context Window Capacity</div>
                <div className="sm:col-span-2 text-neutral-400">200,000+ active tokens with hierarchical AST retrieval and KV-cache compression</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-[#141416]">
                <div className="font-semibold text-white">Syntax & Verification Engine</div>
                <div className="sm:col-span-2 text-neutral-400">Real-time compiler parsing with automatic self-repair loops before mounting live preview</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-[#141416]">
                <div className="font-semibold text-white">Data Privacy & Retention</div>
                <div className="sm:col-span-2 text-neutral-400">Strict zero-retention policy. Customer source code is never used for model training</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-[#141416]">
                <div className="font-semibold text-white">Billing & Guarantees</div>
                <div className="sm:col-span-2 text-neutral-400">Paystack secure checkout, instant electronic delivery, unconditional 14-day refund window</div>
              </div>
            </div>
          </div>

          {/* ── Apple Shimmering Glass CTA Card ── */}
          <div className="w-full mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-transparent border border-white/[0.12] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
            <div className="space-y-2 relative z-10 max-w-xl">
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                Experience {topicTitle} with Calvras
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Empower your development workflows with autonomous coding agents that test, build, and deploy with frontier precision.
              </p>
            </div>
            <div className="flex items-center gap-3 relative z-10 flex-shrink-0">
              <button
                onClick={onOpenCustomerService}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer border border-white/10"
              >
                Ask Support
              </button>
              <button
                onClick={onSignIn}
                className="px-5 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                Launch Workspace →
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ── 4-Track 74-Link Footer ── */}
      <CalvrasFooter 
        onNavigate={onNavigateTopic}
        onOpenCustomerService={onOpenCustomerService}
      />
    </div>
  );
}
