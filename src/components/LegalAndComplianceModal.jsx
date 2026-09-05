import React, { useState } from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Info, Mail, CheckCircle } from 'lucide-react';

export default function LegalAndComplianceModal({ initialTab = 'about', onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'about', label: 'About Calvras', icon: Info },
    { id: 'refund', label: 'Shipping & Refund Policy', icon: RefreshCw },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: ShieldCheck },
    { id: 'contact', label: 'Contact & Business Info', icon: Mail },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-4xl bg-[#121214] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-[#ececed]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#16161a]">
          <div className="flex items-center gap-3">
            <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-7 h-7 rounded-lg object-contain border border-white/10" />
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                CALVRAS COMPLIANCE & LEGAL CENTER
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Verified Business
                </span>
              </h2>
              <p className="text-[11px] text-neutral-400">Official business information, terms, and digital service policies</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/10 bg-[#141417] px-4 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 text-xs font-semibold whitespace-nowrap transition-colors border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-emerald-500 text-white bg-white/[0.03]'
                    : 'border-transparent text-neutral-400 hover:text-neutral-200 hover:bg-white/[0.01]'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-emerald-400' : 'text-neutral-500'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans">
          
          {/* TAB 1: ABOUT CALVRAS */}
          {activeTab === 'about' && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="text-lg font-bold text-white mb-2">About Calvras Technologies</h3>
                <p className="text-neutral-300 leading-relaxed">
                  Calvras is an autonomous full-stack software engineering platform. We build cutting-edge artificial intelligence systems that empower solo developers, startup founders, agencies, and enterprises to design, build, preview, and deploy full-stack web applications, APIs, and modern user interfaces in record time.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-emerald-400">Our Core Business Activities</h4>
                  <ul className="space-y-1.5 text-xs text-neutral-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Autonomous Web Application Development:</strong> Generating production-ready React 18, TypeScript, Tailwind CSS, and Node/Express backend architectures.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Screenshot & UI Duplication:</strong> Multimodal vision engineering that converts visual designs into clean, responsive application code.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Live Interactive Sandboxes:</strong> Instant in-browser compilation, file system mounting, and real-time live preview rendering.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Developer APIs & BYOK:</strong> Unlimited API key usage, webhook integrations, and high-concurrency cloud computing infrastructure.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
                  <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-blue-400">Company Mission & Values</h4>
                  <p className="text-xs text-neutral-300 leading-relaxed">
                    Our mission is to eliminate the repetitive friction in software development. We believe creators should be able to transform an idea or design into a live, scalable, production-tested application within minutes.
                  </p>
                  <p className="text-xs text-neutral-400 pt-2 border-t border-white/5">
                    Calvras complies with global software security practices, PCI-DSS Level 1 payment protection standards via Paystack, and provides 100% intellectual property ownership to creators.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h5 className="font-semibold text-white text-xs">Official Registered Entity</h5>
                  <p className="text-xs text-neutral-400 mt-0.5">Calvras Technologies • Operating Globally with Secure Payment Processing</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-emerald-400 font-mono">support@calvras.ai</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SHIPPING & REFUND POLICY */}
          {activeTab === 'refund' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white mb-1">Digital Service Delivery & Refund Policy</h3>
                <p className="text-xs text-neutral-400">Effective Date: January 1, 2026 • Last Updated: September 2026</p>
              </div>

              {/* Digital Shipping / Delivery */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white text-emerald-400 uppercase tracking-wide">
                  1. Digital Delivery & Fulfillment (Shipping Policy)
                </h4>
                <p className="text-neutral-300 leading-relaxed">
                  Calvras provides digital Software-as-a-Service (SaaS) products, cloud infrastructure credits, and developer tooling. 
                  <strong> No physical goods or shipments are involved.</strong>
                </p>
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-xs">Instant Electronic Delivery:</strong>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Upon successful payment authorization via our authorized payment partner <strong>Paystack</strong>, your account is immediately upgraded. Plan credits, access permissions, and features are provisioned electronically in real-time within 5 seconds.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-white text-xs">No Shipping or Handling Charges:</strong>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        Because all software, code exports, and API keys are delivered through our web application at <code className="text-white bg-white/10 px-1 py-0.5 rounded">https://calvras.ai</code>, there are zero shipping fees, freight costs, customs fees, or delivery delays.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 14-Day Refund Guarantee */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white text-blue-400 uppercase tracking-wide">
                  2. 14-Day Unconditional Money-Back Guarantee (Refund Policy)
                </h4>
                <p className="text-neutral-300 leading-relaxed">
                  We stand 100% behind the quality of Calvras. If our platform does not meet your expectations, we offer a straightforward, unconditional <strong>14-day refund guarantee</strong> for all first-time subscription purchases.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-white block mb-1">Eligibility Window</span>
                    <p className="text-xs text-neutral-400">Request within 14 calendar days of your initial transaction.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-white block mb-1">Fast Processing</span>
                    <p className="text-xs text-neutral-400">Refunds are initiated within 24 hours of receiving your request.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10">
                    <span className="text-xs font-bold text-white block mb-1">Direct Bank Credit</span>
                    <p className="text-xs text-neutral-400">Funds return to your original payment card or bank via Paystack in 3–5 business days.</p>
                  </div>
                </div>
              </div>

              {/* How to Request Refund */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                  3. Step-by-Step: How to Request a Refund
                </h4>
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2 text-xs">
                  <p className="text-neutral-300">
                    To request a refund, simply send an email to our billing desk at:
                  </p>
                  <p className="font-mono text-emerald-400 font-bold text-sm bg-black/40 p-2.5 rounded-lg border border-emerald-500/20">
                    support@calvras.ai (or billing@calvras.ai)
                  </p>
                  <p className="text-neutral-400 pt-1">
                    Please include: (1) Your registered email address, (2) The transaction receipt or Paystack reference ID, and (3) A brief reason (optional, used solely to improve our software).
                  </p>
                </div>
              </div>

              {/* Cancellation */}
              <div className="space-y-2">
                <h4 className="text-sm font-bold text-white uppercase tracking-wide">
                  4. Subscription Cancellation Policy
                </h4>
                <p className="text-neutral-300 leading-relaxed text-xs">
                  You may cancel your monthly or annual subscription at any time directly through your Account Settings. Upon cancellation, your card will never be billed again, and you retain full access to your plan features until the end of your prepaid billing period.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white mb-1">Terms of Service</h3>
                <p className="text-xs text-neutral-400">Please review the terms and conditions governing the use of Calvras</p>
              </div>

              <div className="space-y-4 text-xs text-neutral-300">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">1. Acceptance of Terms</h4>
                  <p className="leading-relaxed">
                    By registering an account, accessing, or subscribing to Calvras (the "Service"), you enter into a binding agreement with Calvras Technologies. If you do not agree to these terms, you must discontinue use immediately.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">2. Description of Digital Services</h4>
                  <p className="leading-relaxed">
                    Calvras provides web-based software development automation, artificial intelligence code generation, interactive sandbox hosting, API connectivity, and code repository synchronization. Services are provided on a subscription and usage-credit basis.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">3. Intellectual Property Ownership</h4>
                  <p className="leading-relaxed text-white bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    <strong>100% User Code Ownership:</strong> You own all right, title, and interest in and to the code, software applications, websites, media, and digital assets you generate or create using Calvras. Calvras claims no ownership over your intellectual property or proprietary software.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">4. Payment Terms & Paystack Processing</h4>
                  <p className="leading-relaxed">
                    All financial transactions, card payments, and subscription renewals are securely processed by <strong>Paystack</strong>. By subscribing to a paid tier (e.g. Pro $14/month, Max $40/month), you authorize Paystack to charge your selected payment method. Prices are displayed clearly before checkout with no hidden surcharges.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">5. Acceptable Use Policy</h4>
                  <p className="leading-relaxed">
                    You agree not to use Calvras to create malicious software, distribute viruses, facilitate phishing, violate third-party copyright, or infringe upon any applicable domestic or international law. We reserve the right to suspend accounts violating these provisions.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">6. Limitation of Liability</h4>
                  <p className="leading-relaxed">
                    Calvras is provided on an "as-is" and "as-available" basis. In no event shall Calvras Technologies or its directors be liable for indirect, incidental, or consequential damages resulting from downtime or service interruptions.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white mb-1">Privacy & Data Security Policy</h3>
                <p className="text-xs text-neutral-400">How Calvras protects, collects, and manages your personal and business information</p>
              </div>

              <div className="space-y-4 text-xs text-neutral-300">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">1. Information We Collect</h4>
                  <p className="leading-relaxed">
                    We collect essential information required to provision your software developer account: your email address, name, usage logs, and workspace preferences.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">2. Payment Security (PCI-DSS Compliance)</h4>
                  <p className="leading-relaxed">
                    <strong>We never store, see, or retain your credit card number, CVV, or banking credentials.</strong> All payment data is processed directly by <strong>Paystack</strong>, a certified PCI-DSS Level 1 payment processor utilizing bank-grade 256-bit encryption.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">3. Code Privacy & Workspace Data</h4>
                  <p className="leading-relaxed">
                    Your code files and private repository workspaces are confidential. We do not sell your code, data, or personal information to third parties, advertising brokers, or external entities.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">4. User Rights & Data Deletion</h4>
                  <p className="leading-relaxed">
                    You have the right to request a full export or permanent deletion of your account and associated workspace files at any time by emailing <span className="text-emerald-400">privacy@calvras.ai</span>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CONTACT & BUSINESS INFO */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white mb-1">Official Business & Contact Information</h3>
                <p className="text-xs text-neutral-400">Get in touch with our customer service, compliance, or billing department</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-emerald-400">Direct Support Channels</h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Customer & Technical Support:</span>
                      <a href="mailto:support@calvras.ai" className="text-white font-mono font-medium hover:underline">support@calvras.ai</a>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Billing, Refunds & Payments:</span>
                      <a href="mailto:billing@calvras.ai" className="text-white font-mono font-medium hover:underline">billing@calvras.ai</a>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Merchant Compliance & Legal:</span>
                      <a href="mailto:compliance@calvras.ai" className="text-white font-mono font-medium hover:underline">compliance@calvras.ai</a>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider text-blue-400">Operational Details</h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Business Entity:</span>
                      <span className="text-white font-medium">Calvras Technologies Inc.</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Support Response Times:</span>
                      <span className="text-white font-medium">Under 2 hours for Pro/Max; within 24 hours for all users</span>
                    </div>
                    <div>
                      <span className="text-neutral-400 block text-[11px]">Service Availability:</span>
                      <span className="text-white font-medium">24 hours a day, 7 days a week (99.9% Cloud Uptime)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 text-center">
                Need immediate assistance? You can also message our team via the live in-app Customer Service drawer inside your workspace.
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#16161a]">
          <span className="text-[11px] text-neutral-500">
            Calvras SaaS Compliance • Secure checkout powered by Paystack
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
