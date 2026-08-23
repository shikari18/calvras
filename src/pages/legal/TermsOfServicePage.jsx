import React from 'react';
import { BrandBurstLogo } from '../../components/cy/CySidebar';
import { ArrowLeft, Shield, CheckCircle2, Lock } from 'lucide-react';

export const TermsOfServicePage = ({ onBack }) => {
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
            Terms of Service
          </h1>
          <p className="text-sm text-neutral-500">
            Official Terms of Service for Calvras (calvras.com) and associated marketing services.
          </p>
        </div>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Calvras (calvras.com), you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the services.
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">2. Service Description & AI Marketing</h2>
          <p>
            Calvras is an AI-powered autonomous marketing and campaign strategist designed to help businesses, creators, and brands plan marketing campaigns, write creative ad copy, and analyze social media content.
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">3. Third-Party Integrations (TikTok, Meta, X)</h2>
          <p>
            When you connect third-party platforms such as TikTok, Instagram, X (Twitter), or Facebook to Calvras:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li>Calvras requests <strong>read-only</strong> access to public profile data and video metrics for diagnostic purposes.</li>
            <li>Calvras does not publish, alter, or delete your content without your explicit instruction.</li>
            <li>You agree to comply with TikTok's Terms of Service and Developer Guidelines when utilizing TikTok Login Kit or Display API features.</li>
          </ul>
        </section>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">4. User Accounts & Credits</h2>
          <p>
            Each registered account receives an initial credit balance for AI generations. Credits are consumed on a per-prompt basis and can be topped up via available billing plans in Ghanaian Cedis (GHS) or USD.
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">5. Limitation of Liability</h2>
          <p>
            Calvras provides AI marketing suggestions and strategy blueprints. While our algorithms aim for high engagement and conversion, marketing outcomes are subject to market conditions.
          </p>
        </section>

        <section className="space-y-3 text-sm text-neutral-700 leading-relaxed">
          <h2 className="text-base font-bold text-neutral-950">6. Contact Information</h2>
          <p>
            For any legal inquiries regarding these Terms, contact our team at <strong>legal@calvras.com</strong> or <strong>zenithzone18@gmail.com</strong>.
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
