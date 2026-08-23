import React from 'react';
import { BrandBurstLogo } from '../../components/cy/CySidebar';
import { ArrowLeft, Shield, Lock, Eye, CheckCircle2 } from 'lucide-react';

export const PrivacyPolicyPage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#fafafc] text-neutral-900 font-sans select-none flex flex-col justify-between antialiased">
      
      {/* Header */}
      <header className="w-full py-5 px-6 sm:px-12 flex items-center justify-between border-b border-neutral-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-1.5 rounded-xl hover:bg-neutral-100 text-neutral-600 transition cursor-pointer"
            >
              <ArrowLeft size={16} />
            </button>
          )}
          <BrandBurstLogo size={22} className="text-neutral-950" />
          <span className="font-serif font-bold text-neutral-950 text-lg tracking-tight">
            Calvras
          </span>
        </div>
        <span className="text-xs text-neutral-400 font-mono">
          Last Updated: August 2026
        </span>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-6 py-12 text-left space-y-8 flex-1">
        
        <div className="space-y-2 border-b border-neutral-200 pb-6">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-950 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-neutral-500">
            Privacy Policy and Data Protection Standards for Calvras (calvras.com).
          </p>
        </div>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">1. Information We Collect</h2>
          <p>
            When you use Calvras, we collect information necessary to provide AI marketing tools and campaign analytics:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li><strong>Account Information</strong>: Name, email address, and profile picture provided via Google OAuth.</li>
            <li><strong>Connected Social Media Telemetry</strong>: When authorized by the user, we access public video captions, view counts, and engagement metrics via TikTok for Developers APIs.</li>
            <li><strong>Marketing Inputs</strong>: Product descriptions, prices, campaign targets, and prompts submitted in the workspace.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">2. How We Use TikTok & Social Data</h2>
          <p>
            Data retrieved through the <strong>TikTok Login Kit</strong> and <strong>TikTok Display API</strong> is used strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li>Audit video retention, hook effectiveness, and engagement metrics.</li>
            <li>Generate tailored marketing strategies, hook recommendations, and caption improvements for the creator.</li>
            <li>We <strong>never sell, lease, or share</strong> your social media data or video metrics with third parties.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">3. Data Retention & Deletion</h2>
          <p>
            You may disconnect your TikTok or social accounts at any time from the Calvras dashboard. Disconnecting an account immediately removes all cached tokens and prevents further telemetry synchronization.
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">4. Security Standards</h2>
          <p>
            We enforce industry-standard security protocols, including OAuth 2.0 PKCE authentication, HTTPS encryption in transit, and encrypted local token storage.
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">5. Contact Us</h2>
          <p>
            For data privacy inquiries or requests to delete account data, contact our privacy team at <strong>privacy@calvras.com</strong>.
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 text-center text-xs text-neutral-400 border-t border-neutral-200">
        <span>© {new Date().getFullYear()} Calvras (calvras.com). All rights reserved.</span>
      </footer>

    </div>
  );
};
