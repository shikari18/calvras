import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ArrowLeft, ChevronRight, FileText, HelpCircle, 
  ShieldCheck, RefreshCw, Zap, BookOpen, ExternalLink, 
  MessageSquare, Key, Globe, CheckCircle2, ChevronLeft, Sparkles,
  Lock, CreditCard, Terminal, Code2, Server, Check
} from 'lucide-react';

export const SUPPORT_ARTICLES = [
  {
    id: 'usage-limits-best-practices',
    collectionId: 'usage-limits',
    title: 'Usage limit best practices',
    updatedAt: 'September 2026',
    readTime: '5 min read',
    summary: 'How to optimize your message allocations, plan limits, and project caching across Calvras.',
    content: `### 1. Overview of Usage Allocations
The number of messages, vision analyses, and full-stack builds you can execute varies by your Calvras plan:

- **Calvras Pro ($14/mo):** Built-in web search, high usage limit, early access to new features, and priority access to flagship models.
- **Calvras Max ($40/mo):** Everything in Pro, **Unlimited API Key Usage (BYOK & platform inference)**, 2x higher usage limits than Pro, zero rate limits, and 24/7 dedicated engineering support.

---

### 2. Factors that determine compute consumption
- **Prompt Complexity & Depth:** Multi-step autonomous architectural instructions require larger context windows.
- **Screenshot & Vision Analysis:** High-resolution screenshots analyzed for pixel-perfect duplication scale dynamically with token depth.
- **Continuous Conversation Context:** Conversations retain previous turn state in memory so subsequent edits understand your codebase.
- **Integrated Tool Execution:** Web searches, real-time database schema generation, and live sandbox bundling.

---

### 3. Intelligent Virtual File System (VFS) Caching
Calvras features intelligent client and server caching:
1. **Unchanged File Caching:** Code files that remain untouched during an edit do not consume additional generation cycles.
2. **Scaffolding Reuse:** Common architectural primitives (Tailwind configurations, Vite setups, Lucide icon libraries) are synthesized with sub-second execution.
3. **Session Anchoring:** Calvras anchors component trees to prevent full re-renders when making minor styling tweaks.

---

### 4. Best Practices for Developers
- **Be direct and descriptive:** Combine layout structure, color preferences, and state requirements in your initial prompt.
- **Request surgical in-place edits:** Use specific prompts (e.g. *"In src/App.tsx, shift the CTA button 12px right and add border-white/20"*) rather than regenerating the entire project.
- **Batch related adjustments:** Group 2–3 minor styling or copy adjustments into one prompt.`,
  },
  {
    id: 'refund-shipping-policy',
    collectionId: 'billing-refunds',
    title: 'Will Calvras refund my purchase? (Shipping & Refund Policy)',
    updatedAt: 'September 2026',
    readTime: '4 min read',
    summary: 'Our 14-day unconditional money-back guarantee, digital fulfillment, and Paystack settlement timeline.',
    content: `### 1. 14-Day Unconditional Money-Back Guarantee
Yes. We offer an unconditional **14-day money-back guarantee** on all subscription purchases ($14 Pro and $40 Max plans). If Calvras does not meet your development needs or business standards, you are entitled to a 100% full refund within 14 calendar days of your purchase. No questions asked.

---

### 2. How to Request a Refund
Requesting a refund is simple and immediate:
1. Send an email to **support@calvras.ai** or **billing@calvras.ai**.
2. Include your registered account email and your Paystack payment reference or receipt number.
3. Our billing desk reviews and authorizes your refund within **24 hours**.

---

### 3. Paystack Refund Settlement Timeline
- Once authorized, funds are returned directly to your original payment card or bank account via our merchant processor, **Paystack**.
- Depending on your issuing bank, the refunded funds typically reflect in your account within **3 to 5 business days**.

---

### 4. Digital SaaS Fulfillment & Delivery (Shipping Policy)
- Calvras provides strictly digital Software-as-a-Service (SaaS) cloud subscriptions and developer tooling.
- **No physical parcels or hardware goods are shipped.**
- Upon successful payment verification by Paystack, your account permissions, unlimited API key access, and compute tiers are provisioned electronically in real-time within **5 seconds**.
- There are zero shipping, freight, handling, or customs charges of any kind.

---

### 5. Subscription Cancellation
You can cancel your subscription at any time with 1 click in your **Account Settings**. Upon cancellation, you will never be billed again, and you retain complete access until the end of your billing cycle.`,
  },
  {
    id: 'max-plan-unlimited-api-usage',
    collectionId: 'api-developer',
    title: 'What is included in the $40 Max plan with Unlimited API usage?',
    updatedAt: 'September 2026',
    readTime: '4 min read',
    summary: 'Complete details on BYOK, platform keys, zero rate-throttling, and high-concurrency cloud generation.',
    content: `### 1. Unlimited API Key Usage Defined
The **Calvras Max ($40/mo)** plan is purpose-built for high-volume developers, agencies, and engineering teams who require unrestricted compute throughput.

---

### 2. Bring Your Own Key (BYOK) & Cloud Inference
- **Zero Rate Limits:** Connect your own Anthropic, OpenAI, or Google Cloud keys with zero artificial rate limits imposed by Calvras.
- **Client-Side Hardware Encryption:** Your custom API keys are encrypted client-side using AES-256 before transport. Keys are never logged or stored in plain text.
- **Managed High-Speed Pool:** If you don't provide custom keys, you can run directly on our managed high-speed cluster with 2x more compute allocation than the Pro plan.

---

### 3. Key Benefits of the Max Plan
- **Everything in Pro:** Built-in web search, early feature access, and flagship model routing.
- **Unlimited Usage of API Key:** Unlimited autonomous builds, code refactors, and test executions.
- ***2 More Usage Than Pro:** Double the concurrent session capacity and workspace file limits.
- **Priority Access to New Models:** Immediate day-one access to new reasoning architectures.
- **Full API Access & Webhooks:** Connect Calvras autonomous agents directly into your GitHub Actions and CI/CD pipelines.`,
  },
  {
    id: 'getting-started-sandboxes',
    collectionId: 'calvras-basics',
    title: 'Getting started with Calvras & Live Preview Sandboxes',
    updatedAt: 'September 2026',
    readTime: '4 min read',
    summary: 'How to build full-stack web applications, run live browser previews, and export clean code.',
    content: `### 1. Autonomous Full-Stack Architecture
Calvras isn't just an autocomplete tool. It is an autonomous full-stack software engineer that designs, writes, and bundles complete production applications:

- **Frontend:** Modern React 18, Vite, TypeScript, Tailwind CSS, and Lucide icons.
- **Backend:** Node.js Express REST APIs with live endpoints and request validation.
- **Database:** Relational schemas and mock stores designed for SQLite or PostgreSQL.

---

### 2. Interactive Live Preview
Every code generation or modification automatically renders in the interactive right-side split screen workspace:
- **Hot Module Reload:** Code changes reflect instantaneously without losing your application state.
- **Responsive Viewport Controls:** Toggle between desktop, tablet, and mobile dimensions with 1 click.
- **Console & Terminal:** Inspect real-time execution logs, network requests, and compile states.

---

### 3. Exporting Your Work
- **ZIP Download:** Export the entire workspace folder including \`package.json\`, \`vite.config.ts\`, and asset structures.
- **Git Push:** Connect your GitHub account to push repositories directly to your personal or organization account.`,
  },
  {
    id: 'screenshot-to-code-guide',
    collectionId: 'ui-vision',
    title: 'UI Screenshot duplication: 10/10 pixel accuracy guidelines',
    updatedAt: 'September 2026',
    readTime: '4 min read',
    summary: 'Best practices for uploading design mockups, mobile screenshots, and matching typography.',
    content: `### 1. How UI Duplication Works
When you paste or drag-and-drop an image into Calvras, our multimodal vision models dissect the design at the token level:
- **Geometry & Alignment:** Extracts exact flexbox/grid hierarchies, padding, and zero-phantom margins.
- **Color Extraction:** Identifies exact hex palettes and dark obsidian undertones.
- **Typography:** Maps header and body text to modern sans-serif scales (Inter, SF Pro) with correct weights.
- **Iconography:** Emits clean, functional Lucide icons or inline SVGs matching the visual reference.

---

### 2. Tips for 10/10 Duplication Accuracy
1. **Provide Clear, High-Resolution Images:** Ensure text, button borders, and navigation items are crisp and uncompressed.
2. **Crop to Relevant Regions:** If you only want to change or duplicate a specific card or navbar, crop the screenshot to that region.
3. **Specify Interaction Details:** State what actions should occur when a user clicks buttons or inputs (e.g. *"When the search input is focused, show the filter dropdown"*).`,
  },
  {
    id: 'privacy-soc2-compliance',
    collectionId: 'privacy-legal',
    title: 'Data privacy, security standards & zero training policy',
    updatedAt: 'September 2026',
    readTime: '5 min read',
    summary: 'How Calvras protects your proprietary source code, credentials, and business IP.',
    content: `### 1. Zero Code Training Policy
Your source code and designs are your confidential intellectual property. Calvras enforces a strict zero-data-retention policy:
- **No Training on Customer Data:** We do not train, fine-tune, or evaluate public models on your proprietary code, prompts, or uploaded images.
- **Ephemeral Processing:** Prompts and context files are processed transiently during generation and stored only in your private workspace.

---

### 2. SOC2 & PCI-DSS Compliance
- **Payment Security:** Calvras does not store credit card numbers. All billing and card processing is handled by **Paystack**, a certified PCI-DSS Level 1 service provider.
- **Transport Encryption:** All data in transit is protected using TLS 1.3 encryption with modern forward-secret cipher suites.
- **Data at Rest:** Workspaces and account metadata are encrypted using AES-256 at rest.`,
  }
];

const COLLECTIONS = [
  { id: 'all', name: 'All Articles', count: 6 },
  { id: 'calvras-basics', name: 'Calvras Basics', count: 1 },
  { id: 'billing-refunds', name: 'Billing & Refunds', count: 1 },
  { id: 'api-developer', name: 'Developer & API', count: 1 },
  { id: 'ui-vision', name: 'UI & Screenshot Duplication', count: 1 },
  { id: 'usage-limits', name: 'Usage Limits & Best Practices', count: 1 },
  { id: 'privacy-legal', name: 'Privacy & Security', count: 1 },
];

function formatInline(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-neutral-300">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-white/10 text-emerald-300 px-1.5 py-0.5 rounded text-[12px] font-mono">$1</code>');
}

function renderFormattedContent(text) {
  if (!text) return null;
  const blocks = text.split('\n\n');

  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-lg sm:text-xl font-bold text-white mt-8 mb-3 tracking-tight">
          {trimmed.replace('### ', '')}
        </h3>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={idx} className="text-xl sm:text-2xl font-bold text-white mt-9 mb-4 tracking-tight">
          {trimmed.replace('## ', '')}
        </h2>
      );
    }
    if (trimmed === '---') {
      return <hr key={idx} className="my-6 border-white/10" />;
    }
    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
      return (
        <ul key={idx} className="list-disc pl-5 space-y-2.5 my-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
          {items.map((item, i) => {
            const line = item.replace(/^- /, '');
            return (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
            );
          })}
        </ul>
      );
    }
    if (/^\d+\.\s/.test(trimmed)) {
      const items = trimmed.split('\n').filter(l => /^\d+\.\s/.test(l.trim()));
      return (
        <ol key={idx} className="list-decimal pl-5 space-y-2.5 my-4 text-neutral-300 text-sm sm:text-base leading-relaxed">
          {items.map((item, i) => {
            const line = item.replace(/^\d+\.\s/, '');
            return (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInline(line) }} />
            );
          })}
        </ol>
      );
    }

    return (
      <p 
        key={idx} 
        className="text-neutral-300 leading-relaxed my-3.5 text-sm sm:text-base"
        dangerouslySetInnerHTML={{ __html: formatInline(trimmed) }} 
      />
    );
  });
}

export default function SupportCenterPage({ onBack, onNavigateLegal, onNavigatePricing, initialArticleId = null }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [activeArticleId, setActiveArticleId] = useState(initialArticleId);

  useEffect(() => {
    if (initialArticleId) {
      setActiveArticleId(initialArticleId);
    }
  }, [initialArticleId]);

  const filteredArticles = useMemo(() => {
    let list = SUPPORT_ARTICLES;
    if (selectedCollection !== 'all') {
      list = list.filter(a => a.collectionId === selectedCollection);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.summary.toLowerCase().includes(q) || 
        a.content.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedCollection, searchQuery]);

  const activeArticle = useMemo(() => {
    return SUPPORT_ARTICLES.find(a => a.id === activeArticleId) || null;
  }, [activeArticleId]);

  return (
    <div className="min-h-screen w-full bg-[#14120B] text-white font-sans selection:bg-white selection:text-black flex flex-col">
      
      {/* ─── Top Header on #14120B ─── */}
      <header className="sticky top-0 z-40 bg-[#14120B] border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-white/15" />
            <div 
              onClick={() => { setActiveArticleId(null); setSelectedCollection('all'); setSearchQuery(''); }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-6 h-6 rounded-md object-contain" />
              <span className="font-bold text-base text-white tracking-tight uppercase">Calvras Support</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs text-neutral-400 font-medium">
            <button onClick={() => onNavigateLegal && onNavigateLegal('terms')} className="hover:text-white transition-colors cursor-pointer hidden md:inline">
              Terms
            </button>
            <button onClick={() => onNavigateLegal && onNavigateLegal('refund')} className="hover:text-white transition-colors cursor-pointer hidden md:inline">
              Refund Policy
            </button>
            <button onClick={onNavigatePricing} className="hover:text-white transition-colors cursor-pointer hidden md:inline">
              Pricing & Plans
            </button>
            <a 
              href="mailto:support@calvras.ai"
              className="px-3.5 py-1.5 rounded-full bg-white text-black font-semibold hover:bg-neutral-200 transition-colors shadow-sm"
            >
              Contact Support
            </a>
          </div>
        </div>
      </header>

      {/* ─── Body: 2-Column Knowledge Base ─── */}
      <div className="max-w-7xl mx-auto w-full px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        {/* Left Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="border border-white/10 rounded-2xl p-4 bg-[#14120B]">
            <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-3 font-semibold">
              Knowledge Collections
            </div>
            <nav className="space-y-1 text-xs font-medium">
              {COLLECTIONS.map(col => {
                const isSelected = selectedCollection === col.id && !activeArticleId;
                return (
                  <button
                    key={col.id}
                    onClick={() => {
                      setSelectedCollection(col.id);
                      setActiveArticleId(null);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-colors text-left cursor-pointer ${
                      isSelected 
                        ? 'bg-white text-black font-bold shadow-sm' 
                        : 'text-neutral-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{col.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                      isSelected ? 'bg-black/10 text-black' : 'bg-white/10 text-neutral-400'
                    }`}>
                      {col.count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="border border-white/10 rounded-2xl p-5 bg-[#14120B] text-xs text-neutral-400 space-y-3">
            <div className="flex items-center gap-2 text-white font-semibold">
              <HelpCircle size={15} className="text-emerald-400" />
              <span>Need merchant assistance?</span>
            </div>
            <p className="leading-relaxed text-[11.5px]">
              Our technical engineering and Paystack billing desk is online 24/7.
            </p>
            <div className="font-mono text-emerald-400 font-semibold text-[12px]">
              support@calvras.ai
            </div>
          </div>
        </aside>

        {/* Right Main Article / List View */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Search Bar */}
          <div className="relative w-full">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles, refund timeline, BYOK, or vision duplication..."
              className="w-full pl-11 pr-4 py-3 bg-[#14120B] border border-white/10 rounded-2xl text-xs sm:text-sm text-white placeholder-neutral-500 outline-none focus:border-white/30 transition-all shadow-inner"
            />
          </div>

          {activeArticle ? (
            /* Detailed Article View */
            <div className="border border-white/10 rounded-3xl p-6 sm:p-10 bg-[#14120B] space-y-6 animate-in fade-in duration-150">
              <button
                onClick={() => setActiveArticleId(null)}
                className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer font-medium"
              >
                <ChevronLeft size={14} />
                <span>Back to all guides</span>
              </button>

              <div className="space-y-2 border-b border-white/10 pb-6">
                <div className="flex items-center gap-3 text-[11px] font-mono text-neutral-400">
                  <span>{activeArticle.updatedAt}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeArticle.title}
                </h1>
                <p className="text-neutral-400 text-sm">
                  {activeArticle.summary}
                </p>
              </div>

              <div className="article-body">
                {renderFormattedContent(activeArticle.content)}
              </div>

              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-neutral-400">Was this guide helpful?</span>
                <div className="flex gap-2">
                  <button className="px-3.5 py-1.5 rounded-xl border border-white/10 hover:border-white/20 text-xs font-semibold text-white transition-colors">
                    Yes, helpful
                  </button>
                  <button className="px-3.5 py-1.5 rounded-xl border border-white/10 hover:border-white/20 text-xs font-semibold text-white transition-colors">
                    Needs update
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Articles Cards List */
            <div className="space-y-4">
              <div className="border border-white/10 rounded-3xl p-6 sm:p-8 bg-[#14120B] space-y-2 mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight">Calvras Knowledge Base</h2>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-2xl">
                  Official engineering documentation, Paystack merchant compliance details, 14-day refund policies, and unlimited API usage architectures.
                </p>
              </div>

              <div className="space-y-3">
                {filteredArticles.map(art => (
                  <div
                    key={art.id}
                    onClick={() => setActiveArticleId(art.id)}
                    className="p-5 sm:p-6 rounded-2xl border border-white/10 bg-[#14120B] hover:border-white/25 transition-all cursor-pointer group flex items-start justify-between gap-4 shadow-sm"
                  >
                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                        <FileText size={12} className="text-neutral-400" />
                        <span>{art.readTime}</span>
                        <span>•</span>
                        <span>{art.updatedAt}</span>
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>
                    <ChevronRight size={18} className="text-neutral-500 group-hover:text-white group-hover:translate-x-1 transition-all mt-3 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ─── Massive Cursor-Style 5-Column Footer (Increased Height) ─── */}
      <footer className="py-20 px-6 sm:px-12 border-t border-white/[0.08] bg-[#14120B] text-neutral-400 text-[13px] mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-10 pb-16 border-b border-white/[0.08] text-left">
          
          <div className="space-y-3.5">
            <h4 className="text-[13px] font-semibold text-white tracking-wider">Product</h4>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-400">
              <li><button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">Autonomous Studio</button></li>
              <li><button onClick={onNavigatePricing} className="hover:text-white transition-colors cursor-pointer">Pricing ($14 / $40)</button></li>
              <li><button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">Live Preview Sandbox</button></li>
              <li><button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">UI Vision Duplicator</button></li>
              <li><button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">BYOK API Gateway</button></li>
            </ul>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-[13px] font-semibold text-white tracking-wider">Resources</h4>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-400">
              <li><button onClick={() => { setActiveArticleId(null); setSelectedCollection('all'); }} className="hover:text-white transition-colors cursor-pointer">Knowledge Base</button></li>
              <li><button onClick={() => setActiveArticleId('usage-limits-best-practices')} className="hover:text-white transition-colors cursor-pointer">Usage Limits</button></li>
              <li><button onClick={() => setActiveArticleId('max-plan-unlimited-api-usage')} className="hover:text-white transition-colors cursor-pointer">Unlimited API Guide</button></li>
              <li><button onClick={() => setActiveArticleId('screenshot-to-code-guide')} className="hover:text-white transition-colors cursor-pointer">Vision Cloning Guide</button></li>
              <li><button onClick={() => setActiveArticleId('getting-started-sandboxes')} className="hover:text-white transition-colors cursor-pointer">Sandbox Quickstart</button></li>
            </ul>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-[13px] font-semibold text-white tracking-wider">Company</h4>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-400">
              <li><button onClick={() => onNavigateLegal && onNavigateLegal('about')} className="hover:text-white transition-colors cursor-pointer">About Calvras</button></li>
              <li><button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">Engineering Philosophy</button></li>
              <li><button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">Research Lab</button></li>
              <li><button onClick={onBack} className="hover:text-white transition-colors cursor-pointer">Brand Assets</button></li>
              <li><a href="mailto:support@calvras.ai" className="hover:text-white transition-colors">support@calvras.ai</a></li>
            </ul>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-[13px] font-semibold text-white tracking-wider">Legal & Compliance</h4>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-400">
              <li><button onClick={() => onNavigateLegal && onNavigateLegal('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button></li>
              <li><button onClick={() => onNavigateLegal && onNavigateLegal('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button></li>
              <li><button onClick={() => onNavigateLegal && onNavigateLegal('refund')} className="hover:text-white transition-colors cursor-pointer">Shipping & Refunds</button></li>
              <li><button onClick={() => setActiveArticleId('privacy-soc2-compliance')} className="hover:text-white transition-colors cursor-pointer">Zero Training Policy</button></li>
            </ul>
          </div>

          <div className="space-y-3.5">
            <h4 className="text-[13px] font-semibold text-white tracking-wider">Connect</h4>
            <ul className="space-y-2.5 text-[12.5px] text-neutral-400">
              <li><a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">X (Twitter)</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://github.com/shikari18/calvras" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
              <li><a href="mailto:billing@calvras.ai" className="hover:text-white transition-colors">billing@calvras.ai</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11.5px] text-neutral-500">
          <div className="flex items-center gap-2">
            <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-4 h-4 rounded object-contain" />
            <span className="text-white font-medium">Calvras Technologies</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div>
            All subscriptions and cloud services are distributed digitally with electronic provisioning and a 14-day refund guarantee processed via Paystack.
          </div>
        </div>
      </footer>

    </div>
  );
}
