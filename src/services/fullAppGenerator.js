export function generateFullArchitectureApp(topic = 'Modern Application') {
  const queryStr = String(topic || '').toLowerCase();

  // 1. Perplexity / AI Search & Research Engine UI
  if (/perplexity|search|what do you want to know|ask|query|research|engine|browser|finder/i.test(queryStr)) {
    return generatePerplexityApp();
  }

  // 2. Analytics & Management Dashboard UI
  if (/dashboard|analytics|admin|crm|metrics|stat|finance|crypto|sales/i.test(queryStr)) {
    return generateDashboardApp();
  }

  // 3. Default High-End Application Studio UI (Audio / Catalog)
  return generateDefaultStudioApp();
}

function generatePerplexityApp() {
  return {
    'Calvras/src/App.tsx': `import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Compass, 
  Library, 
  Plus, 
  ArrowRight, 
  Paperclip, 
  Globe, 
  Cpu, 
  BookOpen, 
  Youtube, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
  Flame,
  ArrowUp
} from 'lucide-react';

interface SearchResult {
  query: string;
  sources: { title: string; domain: string; url: string }[];
  summary: string;
  keyPoints: string[];
}

export default function App() {
  const [activeNav, setActiveNav] = useState<'home' | 'discover' | 'library'>('home');
  const [query, setQuery] = useState('');
  const [isPro, setIsPro] = useState(false);
  const [focus, setFocus] = useState('All');
  const [showFocusMenu, setShowFocusMenu] = useState(false);
  const [activeResult, setActiveResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [copied, setCopied] = useState(false);

  const focusOptions = ['All', 'Academic', 'Writing', 'YouTube', 'Reddit', 'Finance'];

  const quickPrompts = [
    { title: 'Explain quantum computing simply', tag: 'Science' },
    { title: 'Compare React 19 vs Next.js 15 features', tag: 'Tech' },
    { title: 'Top breakthrough AI models of 2026', tag: 'AI' },
    { title: 'How does high-frequency trading work?', tag: 'Finance' }
  ];

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setActiveResult({
        query: q,
        sources: [
          { title: 'Deep Dive Architecture & Modern Implementations', domain: 'nature.com', url: '#' },
          { title: 'State of Technology & Industry Analysis 2026', domain: 'github.com', url: '#' },
          { title: 'Autonomous Systems & Scalable Systems Overview', domain: 'arxiv.org', url: '#' },
          { title: 'Practical Engineering Guide & Benchmark Results', domain: 'techcrunch.com', url: '#' }
        ],
        summary: \`Here is a comprehensive, synthesis-driven breakdown regarding "\${q}". Modern engineering paradigms emphasize end-to-end type safety, distributed edge compute, and automated reactive pipelines [1]. Benchmarking across contemporary implementations demonstrates a 40% reduction in cold-start latency when combined with optimized bundling and native WASM extensions [2].\`,
        keyPoints: [
          'High performance zero-copy execution pipelines [1]',
          'Fault-tolerant failover mechanisms with distributed consensus [2]',
          'Standardized REST & WebSocket integration protocols [3]',
          'Seamless interoperability across modern browser engines [4]'
        ]
      });
      setIsSearching(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!activeResult) return;
    navigator.clipboard.writeText(activeResult.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#191a1a] text-neutral-200 font-sans antialiased selection:bg-teal-500/30 selection:text-white">
      {/* Left Vertical Icon Rail */}
      <aside className="w-16 md:w-56 border-r border-[#262828] bg-[#141515] flex flex-col justify-between p-3 shrink-0">
        <div className="space-y-6">
          {/* Logo */}
          <div className="flex items-center gap-3 px-2 py-1.5 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-lg">
              ✻
            </div>
            <span className="hidden md:inline font-semibold text-white tracking-tight text-base font-serif">
              perplexity
            </span>
          </div>

          {/* New Thread Button */}
          <button 
            onClick={() => { setActiveResult(null); setQuery(''); }}
            className="w-full flex items-center justify-center md:justify-between px-2.5 py-2 rounded-xl bg-[#202222] hover:bg-[#282a2a] border border-white/5 text-xs text-neutral-300 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Plus size={16} className="text-neutral-400" />
              <span className="hidden md:inline font-medium">New Thread</span>
            </div>
            <span className="hidden md:inline text-[10px] font-mono text-neutral-500 border border-neutral-700 px-1.5 py-0.5 rounded">Ctrl K</span>
          </button>

          {/* Nav Items */}
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveNav('home')}
              className={\`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer \${activeNav === 'home' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'}\`}
            >
              <Search size={16} />
              <span className="hidden md:inline">Home</span>
            </button>
            <button 
              onClick={() => setActiveNav('discover')}
              className={\`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer \${activeNav === 'discover' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'}\`}
            >
              <Compass size={16} />
              <span className="hidden md:inline">Discover</span>
            </button>
            <button 
              onClick={() => setActiveNav('library')}
              className={\`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer \${activeNav === 'library' ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'}\`}
            >
              <Library size={16} />
              <span className="hidden md:inline">Library</span>
            </button>
          </nav>
        </div>

        {/* Bottom User Area */}
        <div className="space-y-3">
          <div className="hidden md:flex items-center justify-between p-2 rounded-xl bg-[#202222]/70 border border-white/5 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-neutral-400">Free plan</span>
            </div>
            <button className="text-[11px] font-semibold text-teal-400 hover:text-teal-300">Upgrade</button>
          </div>
          <div className="flex items-center gap-2 px-1 py-1">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-400 text-black font-bold text-xs flex items-center justify-center">
              U
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-medium text-white leading-none">Developer</p>
              <p className="text-[10px] text-neutral-500 mt-0.5">Pro Active</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col justify-between">
        <div className="max-w-3xl w-full mx-auto px-4 py-8 md:py-16 flex-1 flex flex-col justify-center">
          {!activeResult ? (
            /* Home Landing State */
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <h1 className="text-3xl md:text-4xl font-serif font-normal text-white tracking-tight">
                  What do you want to know?
                </h1>
                <p className="text-xs md:text-sm text-neutral-400">
                  Search the web, synthesize answers, and explore real-time knowledge.
                </p>
              </div>

              {/* Main Search Input Box */}
              <div className="rounded-2xl bg-[#202222] border border-white/10 shadow-2xl p-3.5 space-y-3 focus-within:border-teal-500/50 transition-all">
                <textarea
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  rows={2}
                  placeholder="Ask anything or search the web..."
                  className="w-full bg-transparent border-none outline-none text-white placeholder-neutral-500 text-sm md:text-base resize-none"
                />

                {/* Bottom Bar Inside Input */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    {/* Focus Pill */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowFocusMenu(!showFocusMenu)}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2a2c2c] hover:bg-[#343636] text-neutral-300 transition-colors"
                      >
                        <Globe size={13} className="text-teal-400" />
                        <span>{focus}</span>
                        <ChevronDown size={11} />
                      </button>
                      {showFocusMenu && (
                        <div className="absolute left-0 bottom-8 w-32 bg-[#252727] border border-white/10 rounded-xl shadow-xl py-1 z-30">
                          {focusOptions.map(opt => (
                            <button
                              key={opt}
                              onClick={() => { setFocus(opt); setShowFocusMenu(false); }}
                              className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/5 hover:text-white"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Attach Pill */}
                    <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#2a2c2c] hover:bg-[#343636] text-neutral-300 transition-colors">
                      <Paperclip size={13} />
                      <span className="hidden sm:inline">Attach</span>
                    </button>

                    {/* Pro Toggle */}
                    <button 
                      onClick={() => setIsPro(!isPro)}
                      className={\`flex items-center gap-1.5 px-2.5 py-1 rounded-full transition-colors \${isPro ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30' : 'bg-[#2a2c2c] text-neutral-400 hover:text-neutral-300'}\`}
                    >
                      <Sparkles size={13} className={isPro ? 'text-teal-400' : ''} />
                      <span>Pro</span>
                    </button>
                  </div>

                  <button 
                    onClick={() => handleSearch()}
                    disabled={!query.trim() || isSearching}
                    className="w-8 h-8 rounded-full bg-teal-500 hover:bg-teal-400 disabled:opacity-30 disabled:hover:bg-teal-500 text-black flex items-center justify-center transition-all cursor-pointer shadow-md"
                  >
                    <ArrowUp size={16} strokeWidth={2.5} />
                  </button>
                </div>
              </div>

              {/* Quick Prompts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {quickPrompts.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setQuery(item.title); handleSearch(item.title); }}
                    className="p-3.5 rounded-xl bg-[#202222]/50 hover:bg-[#202222] border border-white/5 hover:border-white/10 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-teal-400 tracking-wider font-mono">
                        {item.tag}
                      </span>
                      <p className="text-xs text-neutral-300 group-hover:text-white transition-colors">
                        {item.title}
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-neutral-500 group-hover:text-teal-400 transition-transform group-hover:translate-x-0.5" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Search Results State */
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Question Heading */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-2xl font-serif text-white font-medium">
                  {activeResult.query}
                </h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy response"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                  <button 
                    onClick={() => setActiveResult(null)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="New search"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>

              {/* Sources Section */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono text-neutral-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <BookOpen size={13} className="text-teal-400" />
                  <span>Sources</span>
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {activeResult.sources.map((src, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#202222] border border-white/5 hover:border-white/15 transition-all text-xs space-y-1">
                      <div className="flex items-center justify-between text-neutral-500 text-[10px]">
                        <span>{src.domain}</span>
                        <span className="font-mono">[{i + 1}]</span>
                      </div>
                      <p className="text-neutral-300 font-medium line-clamp-2 text-[11px] leading-snug">
                        {src.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Answer Synthesis */}
              <div className="space-y-4 pt-2">
                <span className="text-xs uppercase font-mono text-neutral-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <Sparkles size={13} className="text-teal-400" />
                  <span>Answer</span>
                </span>
                <div className="p-5 rounded-2xl bg-[#202222]/80 border border-white/5 space-y-4 text-sm text-neutral-200 leading-relaxed font-normal">
                  <p>{activeResult.summary}</p>
                  <ul className="space-y-2 pl-4 list-disc text-neutral-300 text-xs">
                    {activeResult.keyPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ask Follow-up Bar */}
              <div className="pt-4">
                <div className="rounded-xl bg-[#202222] border border-white/10 p-2.5 flex items-center gap-2">
                  <input 
                    type="text"
                    placeholder="Ask a follow up question..."
                    className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-neutral-500"
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSearch((e.target as HTMLInputElement).value);
                    }}
                  />
                  <button className="px-3 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Status Footer */}
        <footer className="border-t border-[#262828] px-6 py-2.5 bg-[#141515] flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Calvras Engine v4 · REST & SQLite Connected</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Pro Search: {isPro ? 'Enabled' : 'Standard'}</span>
            <span>Focus: {focus}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}`,
    'Calvras/src/lib/db.ts': `export interface KnowledgeItem {
  id: number;
  title: string;
  source: string;
  category: string;
  summary: string;
}

export const knowledgeBase: KnowledgeItem[] = [
  { id: 1, title: 'Quantum Computing and Cryptography', source: 'Nature 2026', category: 'Science', summary: 'Quantum annealing algorithms applied to cryptographic lattices.' },
  { id: 2, title: 'React 19 Server Components at Scale', source: 'React Core', category: 'Tech', summary: 'Optimized hydration strategies and zero-bundle server boundaries.' },
  { id: 3, title: 'Autonomous Multi-Agent Orchestration', source: 'ArXiv', category: 'AI', summary: 'Coordinated execution topologies for code generation and verification.' }
];

export async function searchKnowledge(q: string) {
  return knowledgeBase.filter(k => k.title.toLowerCase().includes(q.toLowerCase()) || k.summary.toLowerCase().includes(q.toLowerCase()));
}`,
    'Calvras/server/api.js': `import express from 'express';
const router = express.Router();

router.get('/api/search', (req, res) => {
  const query = req.query.q || '';
  res.json({
    query,
    status: 'ok',
    timestamp: new Date().toISOString(),
    results: [
      { title: 'Perplexity Engine Synthesis', domain: 'perplexity.ai', relevance: 0.98 },
      { title: 'Modern Fullstack Architecture', domain: 'calvras.com', relevance: 0.95 }
    ]
  });
});

export default router;`
  };
}

function generateDashboardApp() {
  return {
    'Calvras/src/App.tsx': `import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Bell, 
  Filter,
  CheckCircle2,
  Clock,
  Settings
} from 'lucide-react';

export default function App() {
  const [filter, setFilter] = useState('30d');

  const stats = [
    { title: 'Total Revenue', value: '$124,592', change: '+14.2%', isPositive: true, icon: CreditCard },
    { title: 'Active Subscriptions', value: '8,420', change: '+8.1%', isPositive: true, icon: Users },
    { title: 'System Throughput', value: '99.98%', change: '+0.04%', isPositive: true, icon: Activity },
    { title: 'Average Latency', value: '142ms', change: '-18.5%', isPositive: true, icon: Clock }
  ];

  const transactions = [
    { id: 'TX-9021', customer: 'Acme Global', plan: 'Enterprise Pro', amount: '$4,200', status: 'Completed', date: 'Just now' },
    { id: 'TX-9020', customer: 'Nexus Labs', plan: 'Team License', amount: '$1,450', status: 'Completed', date: '14 mins ago' },
    { id: 'TX-9019', customer: 'Starlight Media', plan: 'Developer Starter', amount: '$290', status: 'Pending', date: '1 hour ago' },
    { id: 'TX-9018', customer: 'Apex Robotics', plan: 'Enterprise Custom', amount: '$8,900', status: 'Completed', date: '3 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-[#0d0e12] text-neutral-100 font-sans antialiased selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#12141a]/90 backdrop-blur px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
            ▲
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">Nexus Operational Studio</h1>
            <p className="text-[10px] text-neutral-400">Enterprise Metric Control</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#1a1d24] border border-white/10 rounded-lg px-2.5 py-1 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-300 text-[11px] font-medium">Cluster Healthy</span>
          </div>
          <button className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors">
            Generate Report
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="p-5 rounded-2xl bg-[#141720] border border-white/5 hover:border-white/10 transition-all space-y-3">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>{st.title}</span>
                  <Icon size={16} className="text-indigo-400" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-white tracking-tight">{st.value}</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                    <ArrowUpRight size={13} />
                    {st.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transactions Table */}
        <div className="p-6 rounded-2xl bg-[#141720] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Real-time Settlement Ledger</h2>
              <p className="text-xs text-neutral-400">Verified transactions across active API clusters</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-neutral-300 border border-white/10 hover:bg-white/10">
                Filter
              </button>
              <button className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-neutral-300 border border-white/10 hover:bg-white/10">
                Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-neutral-400">
                  <th className="py-2.5 font-medium">Transaction ID</th>
                  <th className="py-2.5 font-medium">Customer</th>
                  <th className="py-2.5 font-medium">Tier</th>
                  <th className="py-2.5 font-medium">Amount</th>
                  <th className="py-2.5 font-medium">Status</th>
                  <th className="py-2.5 font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-mono text-indigo-400">{tx.id}</td>
                    <td className="py-3 font-semibold text-white">{tx.customer}</td>
                    <td className="py-3 text-neutral-300">{tx.plan}</td>
                    <td className="py-3 font-mono font-bold text-white">{tx.amount}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                        <CheckCircle2 size={11} />
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 text-neutral-400 font-mono text-[11px]">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}`,
    'Calvras/src/lib/db.ts': `export const sampleTransactions = [
  { id: 'TX-9021', customer: 'Acme Global', amount: 4200 },
  { id: 'TX-9020', customer: 'Nexus Labs', amount: 1450 }
];`,
    'Calvras/server/api.js': `import express from 'express';
const router = express.Router();
router.get('/api/analytics', (req, res) => res.json({ status: 'ok', revenue: 124592 }));
export default router;`
  };
}

function generateDefaultStudioApp() {
  return {
    'Calvras/src/App.tsx': `import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Layers, 
  Database, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Pause, 
  Activity
} from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    setDbData([
      { id: 1, title: 'Summer Pulse 2026', artist: 'Nova Horizon', category: 'Trending', duration: '3:45', plays: '1.2M' },
      { id: 2, title: 'Midnight City Beats', artist: 'CyberWave', category: 'Electronic', duration: '4:12', plays: '890K' },
      { id: 3, title: 'Acoustic Sunset', artist: 'Aria Sterling', category: 'Acoustic', duration: '3:20', plays: '2.4M' },
      { id: 4, title: 'Deep Focus Flow', artist: 'Brainwave Lab', category: 'Ambient', duration: '5:05', plays: '4.1M' }
    ]);
  }, []);

  const filteredItems = dbData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d0d11] text-neutral-100 font-sans flex flex-col antialiased selection:bg-rose-500 selection:text-white">
      <header className="sticky top-0 z-40 bg-[#13131a]/90 backdrop-blur-md border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-emerald-400 flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <span className="font-bold text-base tracking-tight text-white">Application Studio</span>
        </div>

        <div className="relative w-72 max-w-sm hidden md:block">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search catalog or items..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#1a1a24] border border-white/10 rounded-full text-xs text-white placeholder-neutral-500 outline-none focus:border-rose-500/50"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Backend Online</span>
          </div>
          <button className="px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold transition-colors cursor-pointer">
            Explore Pro
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-6 space-y-8">
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-10 border border-white/10 bg-gradient-to-br from-rose-900/40 via-[#161622] to-[#121218] shadow-2xl">
          <div className="max-w-xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
              <Sparkles size={13} />
              <span>Full Stack Architecture Online</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Calvras Experience
            </h1>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              High-performance responsive interface powered by React 18, Tailwind CSS, REST API endpoints, and real-time database models.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} className="fill-neutral-900" />}
                <span>{isPlaying ? 'Pause Experience' : 'Start Experience'}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">Featured Catalog</h2>
            <span className="text-xs text-neutral-400 font-medium">Showing {filteredItems.length} items</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                onClick={() => { setActiveItem(item.id); setIsPlaying(true); }}
                className={"p-4 rounded-2xl border transition-all cursor-pointer " + (
                  activeItem === item.id 
                    ? "bg-rose-950/30 border-rose-500/50 shadow-lg shadow-rose-500/10" 
                    : "bg-[#15151e] border-white/5 hover:border-white/15 hover:bg-[#1a1a24]"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 font-medium">
                    {item.category}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">{item.duration}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1">{item.title}</h3>
                <p className="text-xs text-neutral-400">{item.artist}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs text-neutral-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Activity size={13} className="text-rose-400" />
                    {item.plays} streams
                  </span>
                  <span className="text-rose-400 font-semibold text-[11px] flex items-center gap-1">
                    Play now <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-[#121218]/95 backdrop-blur-lg border-t border-white/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold text-xs">
            {activeItem}
          </div>
          <div>
            <span className="text-xs font-bold text-white block">{dbData.find(d => d.id === activeItem)?.title || 'Selected Item'}</span>
            <span className="text-[10px] text-neutral-400">{dbData.find(d => d.id === activeItem)?.artist || 'Active Node'}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
          <Database size={14} className="text-emerald-400" />
          <span>SQLite / REST API connected</span>
        </div>
      </footer>
    </div>
  );
}`,
    'Calvras/src/lib/db.ts': `export const sampleData = [
  { id: 1, title: 'Sample Node', status: 'Active' }
];`,
    'Calvras/server/api.js': `import express from 'express';
const router = express.Router();
router.get('/api/health', (req, res) => res.json({ status: 'ok' }));
export default router;`
  };
}