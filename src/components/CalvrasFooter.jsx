import React from 'react';

export const FOOTER_SECTIONS = [
  {
    title: 'Products',
    links: [
      { name: 'Calvras', slug: 'calvras-chat', desc: 'Next-generation AI assistant and autonomous workspace for developers and creators.' },
      { name: 'Calvras Code', slug: 'calvras-code', desc: 'Autonomous coding agent that builds, tests, refactors, and deploys production applications.' },
      { name: 'Calvras for Enterprise', slug: 'calvras-enterprise', desc: 'Dedicated VPC deployment, audit logging, custom compliance, and priority SLA.' },
      { name: 'Calvras for Teams', slug: 'calvras-teams', desc: 'Shared workspace sandboxes, collaborative debugging, and centralized billing.' },
      { name: 'Calvras for Education', slug: 'calvras-education', desc: 'Subsidized workspace compute and interactive sandboxes for schools and universities.' },
      { name: 'Download App', slug: 'download-app', desc: 'Desktop client with system terminal integration and offline sandbox execution.' },
      { name: 'Pricing', slug: 'pricing', isDirectRoute: true, desc: 'Transparent plans starting from $0 with 14-day refund guarantee.' },
    ]
  },
  {
    title: 'Models',
    links: [
      { name: 'Calvras Opus 3.7', slug: 'model-opus', desc: 'Frontier reasoning engine with multi-step autonomous planning and self-healing code synthesis.' },
      { name: 'Calvras Sonnet 3.5', slug: 'model-sonnet', desc: 'Optimal balance of ultra-fast inference speed, deep coding capabilities, and vision intelligence.' },
      { name: 'Calvras Core Haiku', slug: 'model-haiku', desc: 'Ultra-lightweight, near-zero latency model for rapid syntax validation and live auto-complete.' },
      { name: 'Model Overview & Benchmarks', slug: 'models-overview', desc: 'Comprehensive benchmark comparisons across SWE-bench, HumanEval, and real-world frontend tasks.' },
    ]
  },
  {
    title: 'Solutions',
    links: [
      { name: 'Code Modernization', slug: 'solution-modernization', desc: 'Automated legacy migration, dependency upgrades, and full-stack framework refactoring.' },
      { name: 'Autonomous QA & Testing', slug: 'solution-qa-testing', desc: 'Automatic unit test generation, end-to-end assertions, and live preview runtime confirmation.' },
      { name: 'Customer Support Bot', slug: 'solution-support-bot', desc: 'Intelligent, 24/7 automated support workflows powered by Calvras knowledge retrieval.' },
      { name: 'Fintech & Digital Commerce', slug: 'solution-fintech', desc: 'Secure payment orchestration, Paystack-backed checkout flows, and compliance auditing.' },
    ]
  },
  {
    title: 'Platform',
    links: [
      { name: 'API Console', slug: 'api-console', desc: 'Manage API credentials, view token analytics, monitor rate limits, and configure webhooks.' },
      { name: 'Documentation', slug: 'documentation', desc: 'Complete developer guides, REST API references, and interactive code generation recipes.' },
      { name: 'Web Search & Browse Engine', slug: 'platform-search-engine', desc: 'Autonomous headless web search and real-time DOM extraction engine.' },
      { name: 'Live Preview Sandbox', slug: 'platform-sandbox', desc: 'Isolated in-browser virtualization running full React 18 and Tailwind runtime.' },
    ]
  },
  {
    title: 'Resources',
    links: [
      { name: 'Research & Papers', slug: 'research-papers', desc: 'Frontier publications on autonomous agent loops, code self-repair, and alignment.' },
      { name: 'Changelog & Updates', slug: 'changelog', desc: 'Weekly release notes detailing improvements, new models, and sandbox speed boosts.' },
      { name: 'Customer Stories', slug: 'customer-stories', desc: 'How engineering teams scale development velocity 10x with Calvras agents.' },
      { name: 'Calvras Cookbook', slug: 'cookbook', desc: 'Curated code recipes, system prompt templates, and complex UI replication guides.' },
    ]
  },
  {
    title: 'Programs',
    links: [
      { name: 'Calvras Certified Architect', slug: 'program-architect', desc: 'Official certification program for senior developers architecting autonomous AI agent pipelines.' },
      { name: 'Calvras for Startups', slug: 'program-startups', desc: 'Up to $25,000 in workspace compute credits, architecture mentorship, and priority support.' },
      { name: 'Open Source Grant', slug: 'program-opensource', desc: 'Free compute and developer tooling for high-impact open-source libraries.' },
    ]
  },
  {
    title: 'Help & Security',
    links: [
      { name: 'Help Center', slug: 'help', isDirectRoute: true, desc: 'Searchable guides, video walkthroughs, billing FAQs, and troubleshooting.' },
      { name: 'System Status', slug: 'status', desc: '99.99% uptime metrics, incident history, and live API operational health.' },
      { name: 'Trust & Safety', slug: 'trust-safety', desc: 'Enterprise data encryption, SOC 2 compliance, and zero code training guarantees.' },
      { name: 'Customer Support', slug: 'customer-service', isCustomService: true, desc: 'Direct support bot with live engineering team escalation.' },
    ]
  },
  {
    title: 'Company',
    links: [
      { name: 'About Calvras', slug: 'about', isDirectRoute: true, desc: 'Mission, founding principles, and our team dedicated to precision autonomous AI.' },
      { name: 'Careers', slug: 'careers', desc: 'Join our research and product engineering teams pushing autonomous coding to the frontier.' },
      { name: 'Security & Compliance', slug: 'security', desc: 'Continuous vulnerability management, encrypted key vaulting, and privacy protection.' },
      { name: 'Press & Media', slug: 'press', desc: 'Brand assets, press kits, official announcements, and media contacts.' },
    ]
  },
  {
    title: 'Terms & Policies',
    links: [
      { name: 'Terms of Service', slug: 'terms', isDirectRoute: true, desc: 'Clear terms governing consumer, professional, and enterprise platform usage.' },
      { name: 'Privacy Policy', slug: 'privacy', isDirectRoute: true, desc: 'Our strict privacy commitment: zero data selling, encrypted storage, and GDPR compliance.' },
      { name: 'Shipping & Refund Policy', slug: 'refund', isDirectRoute: true, desc: 'Immediate electronic fulfillment with an unconditional 14-day refund guarantee.' },
      { name: 'Acceptable Use Policy', slug: 'acceptable-use', desc: 'Guidelines ensuring safe, non-harmful, and high-integrity AI generation.' },
    ]
  }
];

export default function CalvrasFooter({ onNavigate, onOpenCustomerService }) {
  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (link.isCustomService && onOpenCustomerService) {
      onOpenCustomerService();
      return;
    }
    if (onNavigate) {
      onNavigate(link.slug, link);
    }
  };

  return (
    <footer className="w-full bg-[#1B1B1D] text-neutral-300 border-t border-white/[0.08] select-none font-sans mt-auto">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 pb-12">
        
        {/* ── 9 Columns Grid (Anthropic Style) ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-9 gap-y-10 gap-x-6 text-[13px]">
          {FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="font-semibold text-white tracking-tight text-[13.5px]">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={`/${link.slug}`}
                      onClick={(e) => handleLinkClick(e, link)}
                      className="text-neutral-400 hover:text-white transition-colors duration-150 inline-block leading-snug cursor-pointer"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Hairline Divider ── */}
        <div className="border-t border-white/[0.08] mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          
          {/* Copyright Brand Statement */}
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Calvras" className="w-5 h-5 object-contain opacity-80" />
            <span className="font-medium text-neutral-300 tracking-tight">
              © 2026 Calvras Technologies. All rights reserved.
            </span>
          </div>

          {/* Compliance & Processing Note */}
          <div className="flex flex-wrap items-center gap-4 text-neutral-400">
            <span>Powered by Paystack</span>
            <span className="hidden sm:inline">•</span>
            <span>14-Day Money-Back Guarantee</span>
            <span className="hidden sm:inline">•</span>
            <span>Zero Code Training Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
