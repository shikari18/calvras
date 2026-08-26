import React from 'react';
import { ArrowLeft, Shield, CheckCircle2, Lock, FileText, Scale, Sparkles, ExternalLink } from 'lucide-react';

export const TermsOfServicePage = ({ onBack }) => {
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
            <Scale size={13} className="text-emerald-400" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
            Please review these Terms of Service carefully before utilizing Calvras (calvras.com) and associated autonomous marketing copilot services.
          </p>
        </div>

        {/* Highlight Callout Box */}
        <div className="p-5 rounded-2xl bg-[#161714] border border-white/10 space-y-2">
          <div className="flex items-center gap-2 text-white font-semibold text-sm">
            <Sparkles size={16} className="text-emerald-400" />
            <span>100% Commercial Ownership Guarantee</span>
          </div>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
            You own all intellectual property rights to the ad copy, campaign strategies, video scripts, and marketing assets generated through your Calvras account. You are free to use them commercially across all platforms with zero royalties.
          </p>
        </div>

        {/* Section 1 */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By creating an account, accessing the Calvras platform, or using any associated APIs and applications, you agree to comply with and be legally bound by these Terms of Service and our Privacy Policy. If you are entering into this agreement on behalf of a company or legal entity, you represent that you possess the authority to bind such entity.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">2. Description of Services & AI Architecture</h2>
          <p>
            Calvras operates an autonomous AI marketing and campaign growth operating system. Our platform synthesizes natural language processing, creative generation models, and conversion rate optimization (CRO) diagnostics to produce:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li>Multi-channel advertising campaigns for Meta, TikTok, Google Ads, LinkedIn, and X.</li>
            <li>Direct-response copywriting frameworks, video hooks, and script directives.</li>
            <li>Conversion funnels, landing page teardowns, and automated email retention sequences.</li>
            <li>AI video generation prompt engineering packages for cinematic text-to-video tools.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">3. User Content & Intellectual Property</h2>
          <p>
            <strong>Your Content:</strong> You retain full ownership and copyright of all input materials (brand assets, product descriptions, images, logos) uploaded to Calvras.
          </p>
          <p>
            <strong>Generated Output:</strong> Subject to your compliance with these Terms, Calvras assigns to you all right, title, and interest in and to the marketing outputs generated by your account. You may freely use, publish, monetize, and distribute these assets without attribution.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">4. Subscriptions, Credits & Billing</h2>
          <p>
            Calvras offers Free, Basic, and Pro subscription plans. Paid tiers provide allocated monthly credits, priority neural compute, and advanced features.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li><strong>Billing Cycle:</strong> Subscriptions are billed on a recurring monthly or annual basis until canceled.</li>
            <li><strong>Cancellations:</strong> You can cancel your subscription at any time directly through your Account Settings. Cancellation takes effect at the end of the current billing cycle.</li>
            <li><strong>Credit Expiration:</strong> Monthly plan credits refresh at the start of each billing period.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">5. Acceptable Use Policy</h2>
          <p>
            You agree not to use Calvras to generate:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-neutral-400">
            <li>Misleading, fraudulent, deceptive, or illegal advertising campaigns.</li>
            <li>Defamatory, hateful, harassing, or sexually explicit material.</li>
            <li>Content that infringes upon third-party copyrights, trademarks, or trade secrets.</li>
            <li>Malicious code, phishing exploits, or automated platform abuse.</li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">6. Limitation of Liability & Disclaimers</h2>
          <p>
            Calvras provides AI-assisted strategic suggestions and copy recommendations. Marketing performance, advertising return on ad spend (ROAS), and conversion rates depend on dynamic market factors, ad platform bidding auctions, and external customer behaviors. Calvras does not guarantee specific revenue returns or conversion benchmarks.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 text-sm text-neutral-300 leading-relaxed">
          <h2 className="text-lg font-serif font-bold text-white">7. Contact Information</h2>
          <p>
            If you have questions regarding these Terms of Service, please reach out to our legal team:
          </p>
          <div className="p-4 rounded-xl bg-[#161714] border border-white/10 text-xs sm:text-sm text-neutral-300 space-y-1 font-mono">
            <div>Email: legal@calvras.com</div>
            <div>Support: support@calvras.com</div>
            <div>Website: https://calvras.com</div>
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
