import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, ArrowLeft, ChevronRight, FileText, HelpCircle, 
  ShieldCheck, RefreshCw, Zap, BookOpen, ExternalLink, 
  MessageSquare, Key, Globe, CheckCircle2, ChevronLeft, Sparkles,
  Lock, CreditCard, Terminal, Code2, Server, Check, ChevronDown,
  Layers, Database, Laptop, ArrowUpRight, Clock, ThumbsUp, ThumbsDown, Cpu
} from 'lucide-react';

export const SUPPORT_ARTICLES = [
  {
    id: 'usage-limits-best-practices',
    collectionId: 'getting-started',
    collectionName: 'Getting Started',
    title: 'Usage limit best practices & project allocations',
    updatedAt: 'September 2026',
    readTime: '5 min read',
    summary: 'How to optimize your message allocations, plan limits, and project caching across Calvras.',
    content: `### 1. Overview of Usage Allocations
The number of messages, vision analyses, and full-stack builds you can execute varies by your Calvras plan:

- **Calvras Free ($0/mo):** 10 messages/day, 3 image uploads per project, standard speed, community support.
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
- **Batch related adjustments:** Group 2–3 minor styling or copy adjustments into one prompt.`
  },
  {
    id: 'refund-shipping-policy',
    collectionId: 'billing-refunds',
    collectionName: 'Billing & Refunds',
    title: 'Will Calvras refund my purchase? (Shipping & 14-Day Refund Policy)',
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
You can cancel your subscription at any time with 1 click in your **Account Settings**. Upon cancellation, you will never be billed again, and you retain complete access until the end of your billing cycle.`
  },
  {
    id: 'max-plan-unlimited-api-usage',
    collectionId: 'models-byok',
    collectionName: 'AI Models & BYOK',
    title: 'What is included in the $40 Max plan with Unlimited API usage?',
    updatedAt: 'September 2026',
    readTime: '4 min read',
    summary: 'Complete details on BYOK, platform keys, zero rate-throttling, and high-concurrency cloud generation.',
    content: `### 1. Unlimited API Key Usage Defined
The **Calvras Max ($40/mo)** plan is purpose-built for high-volume developers, agencies, and engineering teams who require unrestricted compute throughput.

---

### 2. Bring Your Own Key (BYOK) & Cloud Inference
- **Zero Rate Limits:** Connect your own OpenRouter, Anthropic, OpenAI, or Google Cloud keys with zero artificial rate limits imposed by Calvras.
- **Client-Side Hardware Encryption:** Your custom API keys are encrypted client-side using AES-256 before transport. Keys are never logged or stored in plain text.
- **Managed High-Speed Pool:** If you don't provide custom keys, you can run directly on our managed high-speed cluster with 2x more compute allocation than the Pro plan.

---

### 3. High-Concurrency Generation
- Up to 10 parallel subagents executing simultaneous code refactoring, database migrations, and UI generation.
- Priority queue access during peak global usage hours.`
  },
  {
    id: 'screenshot-to-code-duplication',
    collectionId: 'getting-started',
    collectionName: 'Getting Started',
    title: 'How does Calvras duplicate screenshots with 10/10 pixel perfection?',
    updatedAt: 'September 2026',
    readTime: '6 min read',
    summary: 'Understanding multimodal vision inspection, font matching, and surgical UI duplication.',
    content: `### 1. Multimodal Vision Pipeline
When you upload a screenshot or wireframe to Calvras:
1. **Geometric Layout Extraction:** The vision pipeline calculates exact flex/grid alignments, paddings, margins, and aspect ratios.
2. **Typography & Color Harmonization:** Exact font weights, tracking, line heights, and hex color codes are mapped to Tailwind CSS utilities.
3. **Interactive Component Synthesis:** Static UI elements are converted into dynamic React 19 components with Lucide icons and hover transitions.
4. **Contextual Image Generation:** Banners, avatars, and media cards seen in the screenshot are generated directly into the project code.

---

### 2. Tips for Best Duplication Results
- Upload uncompressed, high-resolution PNG or WebP screenshots.
- Specify if you want exact desktop (1280px+) or responsive mobile views.
- Prompt with any specific library preferences (e.g. Tailwind, Lucide icons, Framer Motion).`
  },
  {
    id: 'privacy-soc2-compliance',
    collectionId: 'privacy-security',
    collectionName: 'Privacy & Security',
    title: 'Data privacy, security standards & Zero Training Policy',
    updatedAt: 'September 2026',
    readTime: '5 min read',
    summary: 'How Calvras protects your proprietary source code, secrets, and customer data.',
    content: `### 1. Zero Code Training Policy
Calvras **never trains** public foundation models on your private prompts, code files, uploaded screenshots, or business logic. Your Intellectual Property remains 100% yours.

---

### 2. Encryption at Rest & In Transit
- All data in transit is encrypted using **TLS 1.3**.
- Codebases and session state are secured with **AES-256 encryption at rest**.
- API keys provided via BYOK are isolated client-side and never saved to persistent server databases.`
  },
  {
    id: 'troubleshooting-preview-errors',
    collectionId: 'troubleshooting',
    collectionName: 'Troubleshooting',
    title: 'Fixing preview runtime errors and Vite sandbox issues',
    updatedAt: 'September 2026',
    readTime: '3 min read',
    summary: 'How to recover from syntax faults, unimported symbols, and iframe build errors.',
    content: `### 1. 1-Click Error Recovery
If your live preview encounters a syntax or runtime error:
- Look for the **"Fix with Calvras"** recovery banner in the preview header.
- Calvras automatically captures the browser console error stack and applies a surgical patch in seconds.

---

### 2. Manual Diagnostics
- Click **Terminal / Logs** in the bottom workspace bar to inspect raw bundling output.
- Ensure all custom imports point to valid files in your project directory.`
  }
];

export const CATEGORIES = [
  {
    id: 'getting-started',
    title: 'Getting Started & Builds',
    icon: Laptop,
    description: 'Autonomous React builds, prompt best practices, and screenshot duplication.'
  },
  {
    id: 'billing-refunds',
    title: 'Billing & 14-Day Refunds',
    icon: CreditCard,
    description: 'Paystack payments, instant digital delivery, and unconditional money-back policy.'
  },
  {
    id: 'models-byok',
    title: 'AI Models & Unlimited BYOK',
    icon: Cpu,
    description: 'Bring Your Own Key, zero rate limits, and 4-tier model failover clusters.'
  },
  {
    id: 'web-research',
    title: 'Autonomous Web Research',
    icon: Globe,
    description: 'Real-time npm crawling, live API testing, and deep technical inspection.'
  },
  {
    id: 'privacy-security',
    title: 'Privacy & Security Standards',
    icon: ShieldCheck,
    description: 'Zero code training policy, client-side encryption, and GDPR compliance.'
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting & Debugging',
    icon: Terminal,
    description: 'Live sandbox diagnostics, error recovery, and terminal console logs.'
  }
];

export const FAQS = [
  {
    q: 'How does the 14-day refund guarantee work?',
    a: 'Every Calvras subscription ($14 Pro and $40 Max) comes with an unconditional 14-day money-back guarantee. If you are not satisfied for any reason, email support@calvras.ai with your receipt, and we will refund 100% of your payment via Paystack within 24 hours.'
  },
  {
    q: 'Is there a Free plan available?',
    a: 'Yes! Calvras provides a 100% Free plan with a standard daily chat limit, 3 image uploads per project, standard model execution, and community support.'
  },
  {
    q: 'What is included in Unlimited API Key Usage on the Max plan?',
    a: 'The $40 Max plan allows you to input your own OpenRouter, Anthropic, or OpenAI keys with zero rate limits, zero throttling, and unlimited tokens from your own provider, plus 2x more compute than Pro.'
  },
  {
    q: 'Are any physical products shipped?',
    a: 'No. Calvras is 100% digital cloud software. All subscriptions and workspace compute are fulfilled electronically within 5 seconds of payment verification.'
  },
  {
    q: 'Does Calvras train AI models on my code?',
    a: 'Never. Calvras enforces a strict Zero Code Training Policy. Your code, prompts, and designs remain exclusively your private property.'
  }
];

export default function SupportCenterPage({
  initialArticleId = null,
  onBack,
  onNavigateLegal,
  onNavigatePricing
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activeArticleId, setActiveArticleId] = useState(initialArticleId);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [feedbackGiven, setFeedbackGiven] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeArticleId, selectedCategory]);

  const filteredArticles = useMemo(() => {
    let list = SUPPORT_ARTICLES;
    if (selectedCategory) {
      list = list.filter(a => a.collectionId === selectedCategory);
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
  }, [selectedCategory, searchQuery]);

  const activeArticle = useMemo(() => {
    return SUPPORT_ARTICLES.find(a => a.id === activeArticleId) || null;
  }, [activeArticleId]);

  return (
    <div className="min-h-screen w-full bg-[#121232] text-white font-sans selection:bg-white selection:text-black flex flex-col overflow-y-auto">
      
      {/* ─── Top Apple/Claude-Style Navigation Bar ─── */}
      <header className="sticky top-0 z-40 bg-[#121232]/90 backdrop-blur-xl border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={activeArticleId ? () => setActiveArticleId(null) : onBack}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-white/10" />
            <div 
              onClick={() => { setActiveArticleId(null); setSelectedCategory(null); setSearchQuery(''); }}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-6 h-6 rounded-md object-contain" />
              <span className="font-bold text-sm text-white tracking-tight">Calvras Support</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs text-neutral-400">
            <button 
              onClick={() => onNavigateLegal && onNavigateLegal('terms')} 
              className="hover:text-white transition-colors cursor-pointer hidden md:inline"
            >
              Terms
            </button>
            <button 
              onClick={() => onNavigateLegal && onNavigateLegal('privacy')} 
              className="hover:text-white transition-colors cursor-pointer hidden md:inline"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => onNavigateLegal && onNavigateLegal('refund')} 
              className="hover:text-white transition-colors cursor-pointer hidden md:inline"
            >
              14-Day Refunds
            </button>
            <button 
              onClick={onNavigatePricing} 
              className="hover:text-white transition-colors cursor-pointer hidden md:inline"
            >
              Pricing
            </button>
            <a 
              href="mailto:support@calvras.ai"
              className="px-3.5 py-1.5 rounded-full bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow-sm"
            >
              Contact Support
            </a>
          </div>
        </div>
      </header>

      {/* ─── Detail Article View (When an article is clicked) ─── */}
      {activeArticle ? (
        <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 text-left">
          <button
            type="button"
            onClick={() => setActiveArticleId(null)}
            className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white mb-8 transition-colors cursor-pointer font-medium"
          >
            <ChevronLeft size={14} />
            <span>Back to Help Center</span>
          </button>

          <article className="bg-[#12110E] border border-white/10 rounded-3xl p-8 sm:p-12 space-y-8 shadow-2xl animate-in fade-in duration-150">
            <div className="space-y-3 border-b border-white/10 pb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span className="text-white font-medium">{activeArticle.collectionName}</span>
                <span>•</span>
                <span>{activeArticle.updatedAt}</span>
                <span>•</span>
                <span>{activeArticle.readTime}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {activeArticle.title}
              </h1>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {activeArticle.summary}
              </p>
            </div>

            <div className="space-y-5 text-neutral-300 text-sm leading-relaxed font-normal whitespace-pre-line">
              {activeArticle.content}
            </div>

            {/* Was this helpful feedback dock */}
            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-400">
                {feedbackGiven ? 'Thank you for your feedback!' : 'Was this guide helpful?'}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFeedbackGiven('yes')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    feedbackGiven === 'yes' ? 'bg-white text-black border-white' : 'border-white/10 text-neutral-300 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <ThumbsUp size={13} />
                  <span>Yes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackGiven('no')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                    feedbackGiven === 'no' ? 'bg-white text-black border-white' : 'border-white/10 text-neutral-300 hover:border-white/25 hover:text-white'
                  }`}
                >
                  <ThumbsDown size={13} />
                  <span>No</span>
                </button>
              </div>
            </div>
          </article>
        </main>
      ) : (
        /* ─── Main Claude/Apple Help Center Homepage ─── */
        <main className="flex-1 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col items-center">
          
          {/* Hero Section */}
          <div className="w-full max-w-2xl text-center space-y-4 mb-10">
            <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
              How can we help?
            </h1>
            <p className="text-sm text-neutral-400">
              Search knowledge guides, 14-day refund policy, API keys, or technical specifications.
            </p>

            {/* Apple-style Centered Search Input */}
            <div className="relative w-full mt-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, refund timeline, BYOK, or vision duplication..."
                className="w-full pl-12 pr-10 py-3.5 bg-[#12110E] border border-white/15 rounded-2xl text-sm text-white placeholder-neutral-500 outline-none focus:border-white/40 shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white p-1 text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Suggestion Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
              <span className="text-neutral-500">Popular:</span>
              {[
                '14-Day Refund Guarantee',
                'Unlimited API Keys',
                'Paystack Settlement',
                'Vision Duplication'
              ].map(chip => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setSearchQuery(chip)}
                  className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Categorized Cards Grid (Claude / Apple Style) ─── */}
          {!searchQuery && (
            <div className="w-full mb-16 text-left">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 font-semibold">
                Browse by Topic
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CATEGORIES.map(cat => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => setSelectedCategory(isSelected ? null : cat.id)}
                      className={`p-6 rounded-3xl border transition-all cursor-pointer select-none flex flex-col justify-between ${
                        isSelected 
                          ? 'bg-[#1A1812] border-white/40 ring-1 ring-white/20' 
                          : 'bg-[#12110E] border-white/10 hover:border-white/25 hover:bg-[#161510]'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="w-9 h-9 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                          <Icon size={18} />
                        </div>
                        <h3 className="text-base font-semibold text-white tracking-tight">
                          {cat.title}
                        </h3>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>
                      <div className="pt-4 flex items-center gap-1 text-xs text-neutral-400 font-medium group-hover:text-white">
                        <span>{isSelected ? 'Viewing topic' : 'Explore articles'}</span>
                        <ChevronRight size={13} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── Articles List ─── */}
          <div className="w-full mb-16 text-left space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-white tracking-tight">
                {selectedCategory 
                  ? `Articles in ${CATEGORIES.find(c => c.id === selectedCategory)?.title}` 
                  : (searchQuery ? `Search Results (${filteredArticles.length})` : 'Popular Articles')}
              </h2>
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
                >
                  Show all
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredArticles.map(article => (
                <div
                  key={article.id}
                  onClick={() => setActiveArticleId(article.id)}
                  className="p-5 rounded-2xl bg-[#12110E] border border-white/10 hover:border-white/25 hover:bg-[#161510] transition-all cursor-pointer group flex items-start justify-between gap-4 select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2 text-[11px] font-mono text-neutral-400">
                      <span>{article.collectionName}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                      {article.title}
                    </h4>
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-neutral-500 group-hover:text-white transition-transform group-hover:translate-x-0.5 flex-shrink-0 mt-2" />
                </div>
              ))}
            </div>
          </div>

          {/* ─── Interactive FAQ Accordion ─── */}
          <div className="w-full max-w-3xl mb-16 text-left space-y-4">
            <h2 className="text-lg font-bold text-white tracking-tight text-center mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2.5">
              {FAQS.map((faq, i) => {
                const isOpen = expandedFaq === i;
                return (
                  <div
                    key={i}
                    className="rounded-2xl bg-[#12110E] border border-white/10 overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedFaq(isOpen ? null : i)}
                      className="w-full px-5 py-4 flex items-center justify-between text-left text-xs sm:text-sm font-semibold text-white hover:text-neutral-200 cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={16} className={`text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs text-neutral-400 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── Contact Desk Banner ─── */}
          <div className="w-full max-w-3xl p-8 rounded-3xl bg-gradient-to-b from-[#14120D] to-[#0E0D0A] border border-white/10 text-center space-y-3 mb-8">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mx-auto">
              <HelpCircle size={20} className="text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">Still have questions?</h3>
            <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
              Our engineering team and Paystack merchant billing desk are available 24/7.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="mailto:support@calvras.ai"
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow-md"
              >
                Email Technical Support
              </a>
              <a
                href="mailto:billing@calvras.ai"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/10 transition-colors"
              >
                Billing & Refunds Desk
              </a>
            </div>
          </div>

        </main>
      )}

      {/* ─── Comprehensive Footer ─── */}
      <footer className="w-full border-t border-white/10 bg-[#0E0D0A] px-6 py-12 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-neutral-400">
          <div className="flex items-center gap-2.5">
            <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-5 h-5 rounded object-contain" />
            <span className="font-semibold text-white">Calvras Technologies</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigateLegal && onNavigateLegal('terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </button>
            <button onClick={() => onNavigateLegal && onNavigateLegal('privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onNavigateLegal && onNavigateLegal('refund')} className="hover:text-white transition-colors cursor-pointer">
              14-Day Refund Policy
            </button>
            <button onClick={onNavigatePricing} className="hover:text-white transition-colors cursor-pointer">
              Pricing Plans
            </button>
          </div>
        </div>
      </footer>

    </div>
  );
}
