import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ArrowLeft, ChevronRight, FileText, HelpCircle, 
  ShieldCheck, RefreshCw, Zap, BookOpen, ExternalLink, 
  MessageSquare, Key, Globe, CheckCircle2, ChevronLeft, Sparkles
} from 'lucide-react';

export const SUPPORT_ARTICLES = [
  {
    id: 'usage-limits-best-practices',
    collectionId: 'usage-limits',
    title: 'Usage limit best practices',
    updatedAt: 'June 2, 2026',
    readTime: '4 min read',
    summary: 'How to optimize your message allocations, plan limits, and project caching across Calvras.',
    content: `The number of messages and builds you can execute will vary based on your Calvras plan. For more information on your plan’s usage, refer to the following resources:

- **Free Plan:** Daily credit resets, public workspaces, standard model inference.
- **Pro Plan ($14/mo):** 100 Pro cloud credits, credit rollovers, on-demand top-ups, custom domains.
- **Max Plan ($40/mo):** 100 Max credits included plus **Unlimited API Key Usage (BYOK & platform endpoints)**, high-speed execution, and 24/7 priority engineering support.

---

### Additional factors that affect your usage limits include:
- **Message length & Prompt complexity:** Detailed prompts require more token context.
- **File attachment & Screenshot size:** Multimodal vision processing for screenshot duplication scales with image resolution.
- **Current conversation length:** Long continuous chat sessions retain previous context in memory.
- **Tool usage:** Multi-step autonomous agent tools (e.g. web search, terminal execution, live preview compiling).
- **Model choice:** Flagship reasoning vs fast conversational models.
- **Artifact creation and workspace updates:** Full React 18 / Node.js multi-file workspace generation.

---

### System Caching & Optimization:
Our system also includes intelligent caching that helps you optimize your limits:
1. **Workspace Virtual File System:** Content in active projects is cached in your local VFS and doesn't count against your limits when unchanged.
2. **Similar Prompts:** Common architectural scaffolding prompts are cached for sub-second execution.
3. **Session Memory:** Calvras preserves component context from earlier turns to avoid full re-generation.

---

### 1. Start by planning your conversations
Before starting a complex build or duplication with Calvras, consider:
- What specific components, state, or APIs do you need?
- Can you combine layout structure and style preferences in your initial prompt?
- Provide relevant design guidelines upfront to minimize iterative revisions.

### 2. Be specific and concise
- Provide clear, detailed instructions in each turn.
- Avoid vague queries that require clarification passes.
- When uploading screenshots for UI duplication, ensure all text, headers, and cards are clearly legible.

### 3. Take advantage of Memory & Workspace state
- Refer back to existing files: *"In src/App.tsx, update the navbar layout"* rather than re-pasting entire files.
- Use surgical editing instructions: Calvras can make in-place code edits without rewriting your entire project.

### 4. Batch similar modifications in one prompt
If you need 3 related changes (e.g. *"add dark mode toggle, increase card padding to 24px, and connect the search bar"*), request them together in a single prompt rather than three separate messages.

### 5. Monitor your consumption in Usage Settings
Users on Pro and Max plans can view real-time credit consumption, active session tokens, and rollover balances in **Account Settings > Billing & Usage**.`,
  },
  {
    id: 'refund-shipping-policy',
    collectionId: 'billing-refunds',
    title: 'Will Calvras refund my purchase? (Shipping & Refund Policy)',
    updatedAt: 'September 2026',
    readTime: '3 min read',
    summary: 'Our 14-day unconditional money-back guarantee, digital fulfillment, and Paystack settlement timeline.',
    content: `### 1. 14-Day Unconditional Money-Back Guarantee
Yes. We offer an unconditional **14-day money-back guarantee** on all initial subscription purchases (Pro and Max plans). If Calvras does not meet your expectations or development requirements, you are entitled to a 100% full refund within 14 calendar days of your transaction.

---

### 2. How to Request a Refund
Requesting a refund is simple and immediate:
1. Send an email to **support@calvras.ai** or **billing@calvras.ai**.
2. Include your registered account email and your Paystack transaction receipt or reference ID.
3. Our billing desk initiates your refund within **24 hours**.

---

### 3. Paystack Refund Processing Timeline
- Once initiated, your refund is processed directly back through **Paystack** to your original payment method (card, bank account, or mobile money).
- Depending on your banking institution, funds will reflect in your account within **3 to 5 business days**.

---

### 4. Digital Delivery & Fulfillment (Shipping Policy)
- Calvras products are strictly digital Software-as-a-Service (SaaS) subscriptions and cloud compute credits.
- **No physical goods or parcel shipments are involved.**
- Upon successful payment authorization by Paystack, your account permissions, credits, and features are provisioned electronically in real-time within 5 seconds.
- There are zero shipping, freight, handling, or customs charges.

---

### 5. Subscription Cancellation
You can cancel your subscription at any time with 1 click in your **Account Settings**. Upon cancellation, you will never be charged again, and you retain complete access to your paid features until the end of your current billing period.`,
  },
  {
    id: 'max-plan-unlimited-api',
    collectionId: 'plans-pricing',
    title: 'What is included in the $40 Max plan with Unlimited API usage?',
    updatedAt: 'September 2026',
    readTime: '3 min read',
    summary: 'Complete details on BYOK, platform keys, zero rate-throttling, and high-concurrency cloud generation.',
    content: `The **Max plan ($40/month or $32/mo billed annually)** is engineered for power users, engineering leads, agencies, and high-volume developers.

### Core Features of Max:
- **Unlimited API Key Usage (BYOK & Cloud Inference):** Connect your own OpenRouter, OpenAI, Anthropic, or Gemini API keys with zero platform throttling, or leverage our enterprise inference endpoints.
- **100 Max Cloud Credits Included:** Dedicated monthly cloud compute credits for autonomous builds and multi-agent reasoning.
- **Full API Access & Webhook Integrations:** Programmatically trigger builds, retrieve workspace code, and sync to external repos.
- **Role-Based Access & Internal Publish:** Host staging preview links and internal shareable sandboxes.
- **Unlimited Private Workspaces:** Keep client codebases and prototypes completely private and isolated.
- **24/7 Priority Engineering Support:** Dedicated support queue with response times under 2 hours.`,
  },
  {
    id: 'getting-started-live-preview',
    collectionId: 'getting-started',
    title: 'Getting started with Calvras & Live Preview Sandboxes',
    updatedAt: 'September 2026',
    readTime: '3 min read',
    summary: 'How Calvras compiles React 18, TypeScript, and Tailwind in your browser with 0 build steps.',
    content: `Calvras provides an in-browser live preview sandbox that mounts and compiles modern full-stack web applications instantaneously.

### Key Capabilities:
- **Zero Local Environment Setup:** No need to run \`npm install\` or configure Vite—code executes live inside an isolated virtual browser sandbox.
- **React 18 & TypeScript:** Full support for hooks (\`useState\`, \`useEffect\`, \`useRef\`), modern JSX, and typed interfaces.
- **Tailwind CSS & Lucide Icons:** Complete responsive utility classes and 500+ scalable SVG icons pre-bundled.
- **Full Code Ownership & Export:** Download your complete multi-file project as a standard Vite + React project ZIP at any time.`,
  },
  {
    id: 'screenshot-to-code-vision',
    collectionId: 'vision-duplication',
    title: 'How does AI Screenshot & UI Duplication work?',
    updatedAt: 'September 2026',
    readTime: '3 min read',
    summary: 'Using multimodal vision models to clone websites, inspect visual assets, and generate matching code.',
    content: `Calvras features state-of-the-art multimodal vision coding capabilities:

1. **Upload any UI screenshot:** Simply drag and drop or paste a screenshot of any web or mobile interface.
2. **Visual Inspection:** Our vision models analyze layout geometry, flex/grid hierarchies, padding, typography, color palettes, and embedded imagery.
3. **Exact Matching AI Image Generation:** All images, album covers, banners, and avatars detected in the screenshot are generated directly inside \`src/App.tsx\` code—never dumped into chat text.
4. **Instant Live Preview:** The duplicated code mounts immediately into the live sandbox for interaction, testing, and customization.`,
  },
  {
    id: 'managing-api-keys-byok',
    collectionId: 'developer-api',
    title: 'Managing your API keys & Bring Your Own Key (BYOK)',
    updatedAt: 'September 2026',
    readTime: '2 min read',
    summary: 'How to configure custom API keys for maximum autonomy and limitless coding throughput.',
    content: `Calvras gives you complete control over your AI inference engines:

- Go to **Developer Settings** or click **Connect Tools** in your workspace.
- Input your Hugging Face, OpenRouter, Anthropic, or OpenAI API key.
- Keys are encrypted locally in your browser and sent securely only during inference calls.
- On the **Max Plan**, enjoy unlimited BYOK requests with zero platform surcharges or request throttling.`,
  },
  {
    id: 'code-ownership-ip',
    collectionId: 'privacy-legal',
    title: 'Code ownership and intellectual property rights',
    updatedAt: 'September 2026',
    readTime: '2 min read',
    summary: 'You own 100% of all code, designs, and applications generated on Calvras.',
    content: `### 100% Commercial Ownership
You own all intellectual property rights to the source code, applications, user interfaces, and digital assets you generate or create using Calvras.

- You may use, sell, license, deploy, or patent any code created with Calvras without paying royalties.
- Calvras claims zero ownership over your proprietary software or client work.
- All workspace files can be exported to GitHub or downloaded as standard ZIP archives at any time.`,
  },
];

export const SUPPORT_COLLECTIONS = [
  { id: 'getting-started', name: 'Calvras Basics', desc: 'Get started with Calvras across everyday full-stack coding, live previews, and projects.' },
  { id: 'plans-pricing', name: 'Pro and Max plans', desc: 'Plan comparisons, cloud credits, and the $40 Max plan with unlimited API key usage.' },
  { id: 'billing-refunds', name: 'Billing & Refunds', desc: 'Payment receipts, Paystack transactions, 14-day refund guarantee, and cancellations.' },
  { id: 'usage-limits', name: 'Usage limits & Caching', desc: 'Best practices for managing message limits, caching, and token allocation.' },
  { id: 'vision-duplication', name: 'UI & Screenshot Duplication', desc: 'Multimodal vision duplication, exact layout cloning, and AI image generation.' },
  { id: 'developer-api', name: 'Developer API & Console', desc: 'BYOK, API keys, webhooks, and programmatic workspace automation.' },
  { id: 'privacy-legal', name: 'Privacy and Legal', desc: 'Terms of service, privacy policy, data security, and compliance information.' },
];

function formatInline(str) {
  if (!str) return '';
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#1f1e1d]">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    .replace(/`(.*?)`/g, '<code class="bg-[#edeae1] text-[#1f1e1d] px-1.5 py-0.5 rounded text-[12px] font-mono">$1</code>');
}

function renderFormattedContent(text) {
  if (!text) return null;
  const blocks = text.split('\n\n');

  return blocks.map((block, idx) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('### ')) {
      return (
        <h3 key={idx} className="text-base sm:text-lg font-bold text-[#1f1e1d] mt-6 mb-2 tracking-tight">
          {trimmed.replace('### ', '')}
        </h3>
      );
    }
    if (trimmed.startsWith('## ')) {
      return (
        <h2 key={idx} className="text-lg sm:text-xl font-bold text-[#1f1e1d] mt-7 mb-3 tracking-tight">
          {trimmed.replace('## ', '')}
        </h2>
      );
    }
    if (trimmed === '---') {
      return <hr key={idx} className="my-6 border-[#e5e3dc]" />;
    }
    if (trimmed.startsWith('- ')) {
      const items = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
      return (
        <ul key={idx} className="list-disc pl-5 space-y-2 my-3 text-[#33312e] text-xs sm:text-sm">
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
        <ol key={idx} className="list-decimal pl-5 space-y-2 my-3 text-[#33312e] text-xs sm:text-sm">
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
        className="text-[#33312e] leading-relaxed my-2.5 text-xs sm:text-sm"
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
    <div className="min-h-screen w-screen bg-[#faf9f5] text-[#1f1e1d] font-sans selection:bg-[#1f1e1d] selection:text-white flex flex-col">
      
      {/* ─── Top Header (Matching Claude Support) ─── */}
      <header className="sticky top-0 z-40 bg-[#faf9f5]/95 backdrop-blur-md border-b border-[#e5e3dc] px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg text-[#66635c] hover:text-[#1f1e1d] hover:bg-[#eae8e1] transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
              title="Back"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="h-4 w-px bg-[#dcd9d0]" />
            <div 
              onClick={() => { setActiveArticleId(null); setSelectedCollection('all'); setSearchQuery(''); }}
              className="flex items-center gap-2 cursor-pointer"
            >
              <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-6 h-6 rounded-md object-contain" />
              <span className="font-bold text-base text-[#1f1e1d] tracking-tight">Calvras Support</span>
            </div>
          </div>

          {/* Right Header Links */}
          <div className="flex items-center gap-5 text-xs text-[#66635c] font-medium">
            <button onClick={() => onNavigateLegal && onNavigateLegal('terms')} className="hover:text-[#1f1e1d] transition-colors cursor-pointer hidden md:inline">
              Terms
            </button>
            <button onClick={() => onNavigateLegal && onNavigateLegal('refund')} className="hover:text-[#1f1e1d] transition-colors cursor-pointer hidden md:inline">
              Refund Policy
            </button>
            <button onClick={() => onNavigatePricing && onNavigatePricing()} className="hover:text-[#1f1e1d] transition-colors cursor-pointer hidden sm:inline">
              Pricing & Plans
            </button>
            <a 
              href="mailto:support@calvras.ai"
              className="px-3.5 py-1.5 rounded-full bg-[#1f1e1d] text-white text-xs font-semibold hover:bg-[#33312e] transition-all cursor-pointer"
            >
              Contact Support
            </a>
          </div>

        </div>
      </header>

      {/* ─── Main Support Layout ─── */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row px-4 sm:px-6 py-6 sm:py-8 gap-8">
        
        {/* ── Left Sidebar: Collections ── */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          <div className="px-3 py-2 text-[11px] font-bold tracking-wider uppercase text-[#8c887b]">
            Knowledge Collections
          </div>
          
          <button
            onClick={() => { setSelectedCollection('all'); setActiveArticleId(null); }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
              selectedCollection === 'all' && !activeArticleId
                ? 'bg-[#eae8e1] text-[#1f1e1d]'
                : 'text-[#66635c] hover:bg-[#f2f0e8] hover:text-[#1f1e1d]'
            }`}
          >
            <span>All Articles</span>
            <span className="text-[10px] font-mono bg-black/5 px-1.5 py-0.5 rounded">{SUPPORT_ARTICLES.length}</span>
          </button>

          {SUPPORT_COLLECTIONS.map(col => {
            const isSelected = selectedCollection === col.id && !activeArticleId;
            const count = SUPPORT_ARTICLES.filter(a => a.collectionId === col.id).length;
            return (
              <button
                key={col.id}
                onClick={() => { setSelectedCollection(col.id); setActiveArticleId(null); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors text-left cursor-pointer ${
                  isSelected
                    ? 'bg-[#eae8e1] text-[#1f1e1d]'
                    : 'text-[#66635c] hover:bg-[#f2f0e8] hover:text-[#1f1e1d]'
                }`}
              >
                <span className="truncate pr-2">{col.name}</span>
                <span className="text-[10px] font-mono text-[#8c887b]">{count}</span>
              </button>
            );
          })}

          <div className="pt-6 px-3 border-t border-[#e5e3dc] mt-6 space-y-2 text-xs text-[#8c887b]">
            <p className="font-semibold text-[#1f1e1d]">Need urgent assistance?</p>
            <p className="text-[11px] leading-relaxed">Our billing and technical engineering desk is available 24/7 at <span className="font-mono text-[#1f1e1d]">support@calvras.ai</span>.</p>
          </div>
        </aside>

        {/* ── Main Content Area ── */}
        <main className="flex-1 min-w-0">
          
          {/* Breadcrumb & Search Bar */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-[#8c887b] flex items-center gap-1.5">
              <span 
                onClick={() => { setActiveArticleId(null); setSelectedCollection('all'); }} 
                className="hover:underline cursor-pointer"
              >
                All Collections
              </span>
              <ChevronRight size={12} />
              <span className="text-[#1f1e1d] font-semibold">
                {activeArticle ? activeArticle.title : selectedCollection === 'all' ? 'Calvras Knowledge Base' : SUPPORT_COLLECTIONS.find(c => c.id === selectedCollection)?.name}
              </span>
            </div>

            {/* Live Search Input */}
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8c887b]" />
              <input
                type="text"
                placeholder="Search articles & guides..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-[#dcd9d0] text-xs text-[#1f1e1d] placeholder-[#8c887b] focus:outline-none focus:border-[#1f1e1d] transition-colors shadow-sm"
              />
            </div>
          </div>

          {/* ── DETAIL VIEW: Active Article ── */}
          {activeArticle ? (
            <article className="bg-white rounded-2xl border border-[#dcd9d0] p-6 sm:p-10 shadow-sm animate-fade-in">
              <button
                onClick={() => setActiveArticleId(null)}
                className="inline-flex items-center gap-1.5 text-xs text-[#8c887b] hover:text-[#1f1e1d] font-semibold mb-6 transition-colors cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>Back to articles</span>
              </button>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#1f1e1d] tracking-tight mb-2">
                {activeArticle.title}
              </h1>

              <div className="flex items-center gap-3 text-xs text-[#8c887b] pb-6 border-b border-[#e5e3dc] mb-6 font-mono">
                <span>{activeArticle.updatedAt}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>

              {/* Body */}
              <div className="text-[#33312e] leading-relaxed font-sans">
                {renderFormattedContent(activeArticle.content)}
              </div>

              {/* Feedback footer */}
              <div className="mt-12 pt-6 border-t border-[#e5e3dc] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8c887b]">
                <span>Did this answer your question?</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:support@calvras.ai?subject=Feedback on ${encodeURIComponent(activeArticle.title)}`}
                    className="px-3.5 py-1.5 rounded-lg border border-[#dcd9d0] hover:bg-[#f2f0e8] text-[#1f1e1d] font-semibold transition-colors"
                  >
                    Contact Support
                  </a>
                </div>
              </div>
            </article>
          ) : (
            /* ── LIST VIEW: Articles & Collections ── */
            <div className="space-y-6">
              
              {/* Hero Banner */}
              <div className="bg-white rounded-2xl border border-[#dcd9d0] p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1f1e1d] tracking-tight mb-1">
                  {selectedCollection === 'all' ? 'Calvras' : SUPPORT_COLLECTIONS.find(c => c.id === selectedCollection)?.name}
                </h2>
                <p className="text-xs sm:text-sm text-[#66635c] leading-relaxed max-w-2xl">
                  {selectedCollection === 'all' 
                    ? 'Get started with Calvras across everyday full-stack coding, vision duplication, live previews, and API scaling.' 
                    : SUPPORT_COLLECTIONS.find(c => c.id === selectedCollection)?.desc}
                </p>
                <div className="mt-4 text-xs text-[#8c887b] font-mono">
                  {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'} available
                </div>
              </div>

              {/* Articles Grid */}
              <div className="space-y-3">
                {filteredArticles.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-[#dcd9d0] p-12 text-center text-[#8c887b] text-xs">
                    No matching articles found for "{searchQuery}". Email <a href="mailto:support@calvras.ai" className="underline text-[#1f1e1d]">support@calvras.ai</a> for direct assistance.
                  </div>
                ) : (
                  filteredArticles.map(art => (
                    <div
                      key={art.id}
                      onClick={() => setActiveArticleId(art.id)}
                      className="group bg-white rounded-xl border border-[#dcd9d0] hover:border-[#1f1e1d] p-5 transition-all cursor-pointer shadow-sm hover:shadow-md flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1.5 flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <FileText size={15} className="text-[#8c887b] group-hover:text-[#1f1e1d] transition-colors shrink-0" />
                          <h3 className="text-sm font-bold text-[#1f1e1d] group-hover:underline truncate">
                            {art.title}
                          </h3>
                        </div>
                        <p className="text-xs text-[#66635c] line-clamp-2 leading-relaxed">
                          {art.summary}
                        </p>
                        <div className="text-[11px] text-[#8c887b] font-mono pt-1">
                          {art.updatedAt} • {art.readTime}
                        </div>
                      </div>

                      <ChevronRight size={16} className="text-[#8c887b] group-hover:text-[#1f1e1d] group-hover:translate-x-1 transition-all shrink-0 mt-2" />
                    </div>
                  ))
                )}
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ─── Footer ─── */}
      <footer className="mt-auto border-t border-[#e5e3dc] bg-[#faf9f5] py-8 px-6 text-xs text-[#8c887b]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-5 h-5 rounded object-contain" />
            <span className="font-bold text-[#1f1e1d]">Calvras Support Center</span>
            <span>© {new Date().getFullYear()} Calvras Technologies Inc.</span>
          </div>

          <div className="flex items-center gap-5">
            <button onClick={() => onNavigateLegal && onNavigateLegal('privacy')} className="hover:text-[#1f1e1d] transition-colors cursor-pointer">Privacy Policy</button>
            <button onClick={() => onNavigateLegal && onNavigateLegal('terms')} className="hover:text-[#1f1e1d] transition-colors cursor-pointer">Terms of Service</button>
            <button onClick={() => onNavigateLegal && onNavigateLegal('refund')} className="hover:text-[#1f1e1d] transition-colors cursor-pointer">Shipping & Refunds</button>
            <a href="mailto:support@calvras.ai" className="hover:text-[#1f1e1d] transition-colors">support@calvras.ai</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
