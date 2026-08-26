import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, CheckCircle2, Database, Key } from 'lucide-react';

export const PrivacyPolicyPage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#0d0e0c] text-[#f4f4ee] font-sans flex flex-col justify-between antialiased selection:bg-white/20 selection:text-white">
      
      {/* Top Header */}
      <header className="w-full py-5 px-6 sm:px-12 flex items-center justify-between border-b border-white/10 bg-[#0d0e0c]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl hover:bg-white/10 text-neutral-400 hover:text-white transition cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          )}
          <img 
            src="/calvras.png" 
            alt="Calvras Logo" 
            className="w-[33px] h-[33px] rounded-lg object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/calvras-icon.png';
            }}
          />
          <span className="font-serif font-bold text-white text-lg tracking-tight">
            Calvras
          </span>
        </div>
        <span className="text-xs text-neutral-400 font-mono">
          Last Updated: August 2026
        </span>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-6 sm:px-8 py-12 md:py-16 text-left space-y-10 flex-1">
        
        {/* Title Header */}
        <div className="space-y-3 border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono uppercase tracking-wider text-neutral-300">
            <Shield size={13} className="text-emerald-400" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
            This Privacy Policy explains how Calvras ("we", "our", or "us") collects, secures, uses, and protects your personal and business data.
          </p>
        </div>

        {/* Security Commitment Box */}
        <div className="p-5 rounded-2xl bg-[#161714] border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Lock size={16} className="text-emerald-400" />
            <span>Our Core Privacy Principle: We Never Sell Your Data</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Calvras does not sell, rent, or monetize your personal information, proprietary product data, customer lists, or ad telemetry to any third party or data brokers.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">1. Information We Collect</h2>
          <p>
            We collect only the minimum information necessary to provide our autonomous marketing copilot and diagnostic tools:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-neutral-400">
            <li>
              <strong>Account & Profile Information:</strong> Name, email address, and avatar provided via Google OAuth, Discord authentication, or direct registration.
            </li>
            <li>
              <strong>Workspace & Campaign Data:</strong> Brand names, product descriptions, offer parameters, target audiences, and prompts submitted during marketing sessions.
            </li>
            <li>
              <strong>Connected Platform Telemetry (Optional):</strong> When you explicitly authorize third-party connectors (such as TikTok, Meta Ads, or Google Ads), we access read-only video metrics, engagement statistics, and campaign performance to provide CRO diagnoses.
            </li>
            <li>
              <strong>Technical Usage & Logs:</strong> IP address, browser type, device information, and diagnostic crash reports to maintain platform uptime.
            </li>
          </ul>
        </section>

        {/* Section 2: How We Use Your Data */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">2. How We Use Your Information</h2>
          <p>
            Your information is used strictly to power your workspace features:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li>To formulate tailored 30-day marketing roadmaps and high-converting ad copy.</li>
            <li>To generate viral video hooks, script directives, and cinematic AI video prompts.</li>
            <li>To process subscription payments and calculate credit balances.</li>
            <li>To detect and resolve campaign conversion rate leaks through Campaign Doctor.</li>
          </ul>
        </section>

        {/* Section 3: Third-Party APIs & Social Connectors */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">3. Third-Party Integrations & Social Data</h2>
          <p>
            When utilizing social connectors (e.g., TikTok for Developers, Meta Graph API):
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li>Access is strictly <strong>read-only</strong> unless you explicitly schedule or trigger an outbound campaign.</li>
            <li>We do not store private credentials; all access relies on standard OAuth 2.0 tokens encrypted with AES-256.</li>
            <li>You may revoke platform access at any time from your Connected Apps dashboard, which immediately purges all active session tokens.</li>
          </ul>
        </section>

        {/* Section 4: Data Security & Encryption */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">4. Data Security & Storage</h2>
          <p>
            We implement enterprise-grade technical safeguards to protect your information:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li><strong>Encryption in Transit:</strong> All data transmitted between your browser and Calvras servers is protected via TLS 1.3 encryption.</li>
            <li><strong>Encryption at Rest:</strong> Database records and access tokens are secured with AES-256 encryption.</li>
            <li><strong>Isolation:</strong> Customer workspaces and AI conversation threads are logically partitioned to prevent cross-account contamination.</li>
          </ul>
        </section>

        {/* Section 5: User Rights & Data Deletion */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">5. Your Privacy Rights (GDPR & CCPA)</h2>
          <p>
            Regardless of your geographic location, Calvras provides full control over your data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li><strong>Right to Access:</strong> You may request a complete export of all data associated with your account.</li>
            <li><strong>Right to Deletion:</strong> You can delete your account and all associated campaign histories, workspace threads, and profile data permanently.</li>
            <li><strong>Opt-out:</strong> You may opt out of non-essential marketing emails at any time.</li>
          </ul>
        </section>

        {/* Section 6: Contact Us */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">6. Privacy Inquiries & Contact</h2>
          <p>
            To exercise your data privacy rights or ask questions regarding our privacy practices, please contact our Data Protection Officer:
          </p>
          <div className="p-4 rounded-xl bg-[#161714] border border-white/10 text-xs sm:text-sm text-neutral-300 space-y-1 font-mono">
            <div>Email: privacy@calvras.com</div>
            <div>Legal: legal@calvras.com</div>
            <div>Website: https://calvras.com/privacy</div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 text-center text-xs text-neutral-500 border-t border-white/10 bg-[#0d0e0c]">
        <span>© {new Date().getFullYear()} Calvras (calvras.com). All rights reserved.</span>
      </footer>

    </div>
  );
};
