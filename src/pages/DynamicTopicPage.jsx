import React, { useState } from 'react';
import { 
  ChevronRight, ArrowLeft, Sparkles, CheckCircle2, ShieldCheck, 
  Terminal, Cpu, Code2, Globe, FileCode2, Layers, Zap, Lock, Users, Building2,
  Play, Check, ExternalLink, ArrowRight, Server, Compass, Clock, Sliders, Award
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

// Curated high-resolution imagery tailored to category/theme
const TOPIC_IMAGES = {
  'Models': 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600&auto=format&fit=crop&q=80',
  'Products': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&auto=format&fit=crop&q=80',
  'Solutions': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&auto=format&fit=crop&q=80',
  'Research': 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1600&auto=format&fit=crop&q=80',
  'Company': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&auto=format&fit=crop&q=80',
  'Resources': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&auto=format&fit=crop&q=80',
  'Default': 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1600&auto=format&fit=crop&q=80'
};

const SECONDARY_IMAGES = {
  'Models': 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
  'Products': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
  'Solutions': 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&auto=format&fit=crop&q=80',
  'Research': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80',
  'Company': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
  'Resources': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&auto=format&fit=crop&q=80',
  'Default': 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80'
};

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

  const heroImage = TOPIC_IMAGES[category] || TOPIC_IMAGES['Default'];
  const secondaryImage = SECONDARY_IMAGES[category] || SECONDARY_IMAGES['Default'];

  return (
    <div className="min-h-screen w-full bg-[#121232] text-white font-sans flex flex-col selection:bg-white selection:text-black overflow-y-auto">
      
      {/* ── Top Apple Frosted Glass Header Bar ── */}
      <header className="sticky top-0 z-50 bg-[#121232]/85 backdrop-blur-xl border-b border-white/[0.06] px-6 py-3.5 transition-all">
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

      {/* ── Editorial Main Canvas ── */}
      <main className="flex-1 w-full relative">
        
        {/* Subtle radial ambient midnight glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-blue-600/15 via-indigo-600/8 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-6 pt-12 sm:pt-16 pb-24 flex flex-col items-center text-center">
          
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 mb-6 select-none flex-wrap justify-center">
            <span className="hover:text-white cursor-pointer transition-colors" onClick={onBack}>Home</span>
            <ChevronRight size={13} className="text-neutral-600" />
            <span className="text-neutral-400">{category}</span>
            <ChevronRight size={13} className="text-neutral-600" />
            <span className="text-white font-medium">{topicTitle}</span>
          </div>

          {/* Glowing Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-neutral-300 shadow-sm mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            <span>{category} • Calvras Frontier Suite</span>
          </div>

          {/* Apple-Grade Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08] max-w-4xl">
            {topicTitle}
          </h1>

          {/* High-Contrast Narrative Subtitle */}
          <p className="text-base sm:text-xl text-neutral-400 font-normal leading-relaxed max-w-2xl mt-6">
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

          {/* ── Full Editorial Hero Image Banner (Zero Code Boxes) ── */}
          <div className="w-full mt-14 rounded-3xl overflow-hidden border border-white/[0.1] bg-[#16163A] shadow-2xl relative group">
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden relative">
              <img 
                src={heroImage} 
                alt={topicTitle}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121232] via-transparent to-black/30 pointer-events-none" />
              
              {/* Floating Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between flex-wrap gap-4 text-left">
                <div className="bg-[#141436]/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-xl">
                  <div className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">Enterprise Architecture</div>
                  <div className="text-sm font-bold text-white">{topicTitle} Operational Sandbox</div>
                </div>
                <div className="bg-[#141436]/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-xs font-medium text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Verified 99.99% Availability</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Deep Technical Article Narrative ── */}
          <div className="w-full mt-20 text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7 space-y-6 text-neutral-300 text-sm sm:text-base leading-relaxed">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Next-Generation Architecture Engineered for Scale
              </h2>
              <p>
                In production computing environments, precision is not a luxury—it is the baseline requirement. Calvras {topicTitle} has been constructed from the silicon up to deliver uncompromised reliability, deterministic throughput, and automated verification across complex distributed tasks.
              </p>
              <p>
                Unlike generic language models that produce superficial recommendations, Calvras operates through a deeply orchestrated agent loop. It continuously validates structural assertions, cross-verifies dependencies, and ensures that every synthesized workflow conforms strictly to modern security standards.
              </p>

              <div className="p-6 rounded-2xl bg-[#16163A] border border-white/[0.08] space-y-3 mt-6">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <Award size={14} />
                  <span>Key Architectural Milestone</span>
                </div>
                <p className="text-sm text-white font-medium">
                  Autonomous self-correction pipelines identify and repair edge cases in real-time, delivering sub-20 millisecond roundtrip latency with zero human intervention required.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/[0.1] bg-[#16163A] shadow-xl">
                <img 
                  src={secondaryImage} 
                  alt="Architecture In Action" 
                  className="w-full h-56 object-cover object-center opacity-85"
                />
                <div className="p-5 space-y-2">
                  <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">Production Telemetry</div>
                  <div className="text-sm font-semibold text-white">Zero-Compromise Security Standard</div>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Cryptographic isolation guarantees that tenant computations remain completely confidential. Data is never used for training foundation models.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Apple Bento Grid Feature Showcase ── */}
          <div className="w-full mt-20 text-left">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 text-center">
              Engineered for Frontier Precision
            </h2>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto text-center mb-12">
              Autonomous workflows backed by compiler-grade validation and zero-compromise architectural rigor.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Bento Card 1: Full Autonomy */}
              <div className="p-7 rounded-3xl bg-[#16163A] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group shadow-lg">
                <div className="w-11 h-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                  <Cpu size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">Full-Stack Agentic Autonomy</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Calvras executes multi-phase tasks independently. It decomposes complex technical prompts into parallel tasks, performs recursive testing, and verifies runtime outputs before returning complete deliverables.
                </p>
                <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 text-xs text-blue-400 font-medium">
                  <CheckCircle2 size={15} />
                  <span>Autonomous Self-Repair Active</span>
                </div>
              </div>

              {/* Bento Card 2: Deep Context Retention */}
              <div className="p-7 rounded-3xl bg-[#16163A] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group shadow-lg">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                  <Layers size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">200,000+ Token Context Recall</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Ingest comprehensive documentation libraries, multi-repository codebases, and historical schemas without token degradation. Speculative retrieval preserves near-instantaneous query response speeds.
                </p>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center font-sans">
                  <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="text-sm font-bold text-white">200K</div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Tokens</div>
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
              <div className="p-7 rounded-3xl bg-[#16163A] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group shadow-lg">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                  <ShieldCheck size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">Zero Data Training Guarantee</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Your intellectual property, proprietary assets, and API configurations are never retained or utilized to train foundation models. Cryptographic tenant segregation ensures complete enterprise confidentiality.
                </p>
                <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 size={15} />
                  <span>SOC 2 Type II Certified • Strict Zero-Retention</span>
                </div>
              </div>

              {/* Bento Card 4: Paystack Protection */}
              <div className="p-7 rounded-3xl bg-[#16163A] border border-white/[0.08] hover:border-white/20 transition-all space-y-4 group shadow-lg">
                <div className="w-11 h-11 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 group-hover:scale-105 transition-transform">
                  <Lock size={22} />
                </div>
                <h3 className="text-lg font-semibold text-white">14-Day Money-Back Guarantee</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Every subscription is processed seamlessly via Paystack with an unconditional 14-day refund window. Experience Calvras without financial risk or restrictive long-term commitments.
                </p>
                <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2 text-xs text-neutral-300 font-medium">
                  <Globe size={15} className="text-blue-400" />
                  <span>Instant Digital Delivery • Immediate Activation</span>
                </div>
              </div>

            </div>
          </div>

          {/* ── Apple-Style Tech Specs Table ── */}
          <div className="w-full mt-20 text-left">
            <h2 className="text-xl font-bold tracking-tight text-white mb-6">
              Platform Specifications
            </h2>

            <div className="rounded-3xl border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06] text-xs sm:text-sm bg-[#16163A]">
              <div className="grid grid-cols-1 sm:grid-cols-3 p-5">
                <div className="font-semibold text-white">Agent Execution Environment</div>
                <div className="sm:col-span-2 text-neutral-300">Isolated micro-container sandboxes with automated live validation</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-5">
                <div className="font-semibold text-white">Context Window Capacity</div>
                <div className="sm:col-span-2 text-neutral-300">200,000+ active tokens with hierarchical recall indexing</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-5">
                <div className="font-semibold text-white">Verification Engine</div>
                <div className="sm:col-span-2 text-neutral-300">Continuous runtime assertion checks with automated regression prevention</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-5">
                <div className="font-semibold text-white">Data Privacy Standard</div>
                <div className="sm:col-span-2 text-neutral-300">Strict zero-retention policy; user inputs are never utilized for model fine-tuning</div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 p-5">
                <div className="font-semibold text-white">Payment & Protection</div>
                <div className="sm:col-span-2 text-neutral-300">Paystack secure payment gateway with unconditional 14-day refund warranty</div>
              </div>
            </div>
          </div>

          {/* ── Apple Shimmering Glass CTA Card ── */}
          <div className="w-full mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-white/[0.08] via-[#16163A] to-[#141436] border border-white/[0.12] shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
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
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-semibold text-white transition-colors cursor-pointer border border-white/10"
              >
                Ask Support
              </button>
              <button
                onClick={onSignIn}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)] cursor-pointer"
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
