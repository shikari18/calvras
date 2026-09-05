import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight, Globe, Check, ShieldCheck, Mail, FileText } from 'lucide-react';

export default function LegalDocumentPage({ documentType = 'privacy', onBack, onNavigateLegal, onNavigatePricing, onSignIn }) {
  const [activeDoc, setActiveDoc] = useState(documentType);

  useEffect(() => {
    if (documentType) {
      setActiveDoc(documentType);
    }
  }, [documentType]);

  return (
    <div className="min-h-screen w-full bg-[#14120B] text-white font-sans selection:bg-white selection:text-black flex flex-col">
      
      {/* ─── Top Header on #14120B ─── */}
      <header className="sticky top-0 z-40 bg-[#14120B] border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
              title="Return to previous page"
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
            <div className="h-4 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-6 h-6 rounded-md object-contain" />
              <span className="font-extrabold text-base tracking-tight text-white uppercase">CALVRAS</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs text-neutral-400 font-medium">
            <button 
              onClick={() => setActiveDoc('privacy')} 
              className={`transition-colors cursor-pointer ${activeDoc === 'privacy' ? 'text-white font-bold underline underline-offset-4' : 'hover:text-white'}`}
            >
              Privacy
            </button>
            <button 
              onClick={() => setActiveDoc('terms')} 
              className={`transition-colors cursor-pointer ${activeDoc === 'terms' ? 'text-white font-bold underline underline-offset-4' : 'hover:text-white'}`}
            >
              Terms of Service
            </button>
            <button 
              onClick={() => setActiveDoc('refund')} 
              className={`transition-colors cursor-pointer ${activeDoc === 'refund' ? 'text-white font-bold underline underline-offset-4' : 'hover:text-white'}`}
            >
              Shipping & Refunds
            </button>
            <button 
              onClick={() => setActiveDoc('about')} 
              className={`transition-colors cursor-pointer ${activeDoc === 'about' ? 'text-white font-bold underline underline-offset-4' : 'hover:text-white'}`}
            >
              About
            </button>
            <button 
              onClick={onNavigatePricing} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              Pricing
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onSignIn || onBack}
              className="text-xs font-semibold px-4 py-1.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-all cursor-pointer"
            >
              Enter App →
            </button>
          </div>

        </div>
      </header>

      {/* ─── Document Container ─── */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 sm:px-10 py-12 sm:py-16">
        
        {/* ═══════════════════════════════════════════════════════════════════
            DOCUMENT 1: PRIVACY POLICY (Exhaustive, matching Anthropic)
        ═══════════════════════════════════════════════════════════════════ */}
        {activeDoc === 'privacy' && (
          <article className="space-y-10 text-neutral-300 leading-relaxed text-[15px] animate-fade-in font-sans">
            
            <div className="border-b border-white/10 pb-8">
              <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
                Privacy Policy
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 font-mono">
                <span>Effective July 8, 2026</span>
                <span>•</span>
                <span>English</span>
                <span>•</span>
                <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">PCI-DSS Level 1 Secure</span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-lg leading-relaxed font-normal text-[#1f1e1d]">
                Calvras Technologies is an AI software engineering and research company working to build reliable, autonomous, and steerable full-stack coding systems.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, disclose, and process your personal data when you use our website, Calvras.ai, or other Calvras products, sandboxes, and services (the “Services”). This Privacy Policy does not apply to content that we process on behalf of customers of our business offerings, such as our Enterprise accounts. Our use of that data is governed by our customer agreements covering access to and use of those offerings.
              </p>
              <p>
                This Privacy Policy also describes your privacy rights. More information about your rights, and how to exercise them, is set out in Section 4 (“Rights and Choices”).
              </p>
            </div>

            {/* Section 1 */}
            <div className="space-y-4 pt-4 border-t border-[#e5e3dc]">
              <h2 className="text-2xl font-bold text-[#1f1e1d] font-sans">1. Collection of Personal Data</h2>
              <p>We collect the following categories of personal data:</p>
              <h3 className="text-lg font-bold text-[#1f1e1d] font-sans pt-2">Personal data you provide to us directly</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Identity and Contact Data:</strong> Calvras collects identifiers, including your name, email address, and phone number when you sign up for a Calvras account, or to receive information on our Services.</li>
                <li><strong>Payment Information:</strong> We collect payment and billing information if you choose to purchase a subscription to Calvras Services. All payment processing is securely managed by our certified merchant partner <strong>Paystack</strong>. <em>We never store or retain your full credit card number, CVV, or banking credentials.</em></li>
                <li><strong>Inputs and Outputs:</strong> You are able to interact with our Services in a variety of formats, including but not limited to chat, fullstack coding, agentic sessions (where Calvras performs multi-step tasks or takes actions on your behalf), terminal execution, and connected repositories. The content you submit through these interactions are your “Inputs”, generating responses, files, and architectures (“Outputs”).</li>
                <li><strong>Feedback on your use of our Services:</strong> If you submit feedback, star ratings, or error reports, we collect your comments and diagnostic logs to refine our software models.</li>
                <li><strong>Communication Information:</strong> If you communicate with us via customer support, help desks, or email at support@calvras.ai, we collect your contact information and messages.</li>
              </ul>

              <h3 className="text-lg font-bold text-[#1f1e1d] font-sans pt-3">Personal data we receive automatically from your use of the Services</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Device and Connection Information:</strong> Device type, operating system, browser information, IP address (and general approximate location derived from IP), and device identifiers.</li>
                <li><strong>Usage and Performance Information:</strong> Timestamps of access, project sandboxes opened, build durations, and compile logs.</li>
                <li><strong>Cookies & Similar Technologies:</strong> Cookies essential for authentication, session tokens, and workspace preferences.</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="space-y-4 pt-4 border-t border-[#e5e3dc]">
              <h2 className="text-2xl font-bold text-[#1f1e1d] font-sans">2. Uses of Personal Data Permitted Under Data Protection Laws</h2>
              <p>We use your personal data for the following legitimate purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide, maintain, and facilitate the Calvras software engineering platform and live preview sandboxes.</li>
                <li>To create and administer your account and subscription tier (Free, Pro, or Max).</li>
                <li>To facilitate instant digital SaaS delivery and subscription billing via Paystack.</li>
                <li>To investigate and resolve technical support inquiries, errors, or refund requests.</li>
                <li>To prevent fraud, security compromises, malicious code execution, and terms violations.</li>
                <li>To maintain user code privacy: <strong>We do not sell, rent, or trade your code, data, or personal information to third parties.</strong></li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-4 pt-4 border-t border-[#e5e3dc]">
              <h2 className="text-2xl font-bold text-[#1f1e1d] font-sans">3. Recipients and Third-Party Data Sources</h2>
              <p>Calvras discloses personal data strictly to trusted service providers essential for platform operations:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Payment Processors:</strong> We partner with <strong>Paystack</strong> to process transactions securely under PCI-DSS Level 1 compliance.</li>
                <li><strong>Cloud Infrastructure Providers:</strong> High-security GPU edge compute clusters and database hosting providers that adhere to rigorous SOC2 and ISO27001 data protection standards.</li>
                <li><strong>Legal & Regulatory Compliance:</strong> Government authorities where disclosure is required by law or legal process.</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="space-y-4 pt-4 border-t border-[#e5e3dc]">
              <h2 className="text-2xl font-bold text-[#1f1e1d] font-sans">4. Rights and Choices</h2>
              <p>Depending on your jurisdiction (including GDPR, CCPA, and LGPD), you enjoy the following rights:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Right to Know & Access:</strong> The right to request confirmation and copies of personal data processed about you.</li>
                <li><strong>Right to Deletion:</strong> The right to request the permanent deletion of your account, conversation history, and workspace files.</li>
                <li><strong>Right to Data Portability:</strong> The right to export your complete projects, source code, and configurations at any time.</li>
                <li><strong>Right to Correction:</strong> The right to rectify inaccurate account details.</li>
                <li><strong>Right to Withdraw Consent:</strong> You may disconnect integrations or API keys at any time in your Settings.</li>
              </ul>
              <p className="pt-2">To exercise any of these rights, simply email our data protection officer at <span className="font-mono text-[#1f1e1d] font-semibold">privacy@calvras.ai</span>.</p>
            </div>

            {/* Section 5 & 6 */}
            <div className="space-y-4 pt-4 border-t border-[#e5e3dc]">
              <h2 className="text-2xl font-bold text-[#1f1e1d] font-sans">5. Data Retention, Security Controls, & Encryption</h2>
              <p>
                We implement appropriate technical and organizational security controls designed to protect personal data from loss, unauthorized access, or destruction. All data in transit is protected using bank-grade TLS 1.3 / HTTPS encryption, and sensitive configurations are encrypted at rest.
              </p>
              <p>
                Personal data is retained only for as long as necessary to fulfill the purposes outlined in this Policy or as required by financial, tax, or legal obligations.
              </p>
            </div>

            {/* Section 7 */}
            <div className="space-y-4 pt-4 border-t border-[#e5e3dc]">
              <h2 className="text-2xl font-bold text-[#1f1e1d] font-sans">6. Children's Privacy</h2>
              <p>
                Our Services are not directed towards, and we do not knowingly collect personal data from, children under the age of 18. If you believe a minor has provided us with personal information, contact us at <span className="font-mono text-[#1f1e1d]">privacy@calvras.ai</span> for prompt removal.
              </p>
            </div>

            {/* Section 8 & 9 */}
            <div className="space-y-4 pt-4 border-t border-[#e5e3dc]">
              <h2 className="text-2xl font-bold text-[#1f1e1d] font-sans">7. Contact Information</h2>
              <p>If you have any questions or complaints regarding this Privacy Policy, you may contact our global privacy team:</p>
              <div className="p-5 rounded-xl bg-white border border-[#dcd9d0] font-sans text-xs space-y-1.5">
                <p><strong>Calvras Technologies Inc.</strong></p>
                <p>Email: <a href="mailto:privacy@calvras.ai" className="underline font-mono">privacy@calvras.ai</a></p>
                <p>Support: <a href="mailto:support@calvras.ai" className="underline font-mono">support@calvras.ai</a></p>
                <p>Billing & Compliance: <a href="mailto:billing@calvras.ai" className="underline font-mono">billing@calvras.ai</a></p>
              </div>
            </div>

            {/* Section 10: Legal Bases Table */}
            <div className="space-y-4 pt-4 border-t border-[#e5e3dc] font-sans">
              <h2 className="text-2xl font-bold text-[#1f1e1d]">8. Legal Bases for Processing Table</h2>
              <div className="overflow-x-auto border border-[#dcd9d0] rounded-xl bg-white">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#f2f0e8] border-b border-[#dcd9d0] text-[#1f1e1d]">
                      <th className="p-3 font-bold">Purpose</th>
                      <th className="p-3 font-bold">Type of Data</th>
                      <th className="p-3 font-bold">Legal Basis</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e5e3dc] text-[#33312e]">
                    <tr>
                      <td className="p-3 font-medium">To provide and facilitate autonomous code builds and preview sandboxes</td>
                      <td className="p-3">Identity, Inputs & Outputs, Technical Data</td>
                      <td className="p-3 font-semibold">Contract</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">To create and administer your user account</td>
                      <td className="p-3">Identity and Contact Data</td>
                      <td className="p-3 font-semibold">Contract</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">To facilitate payments, subscriptions, and refunds via Paystack</td>
                      <td className="p-3">Identity, Payment Reference, Transaction IDs</td>
                      <td className="p-3 font-semibold">Contract & Legal Obligation</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">To investigate security issues and prevent abuse</td>
                      <td className="p-3">Technical Data, Log files, Verification Data</td>
                      <td className="p-3 font-semibold">Legitimate Interests</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium">To debug and repair platform errors and compile faults</td>
                      <td className="p-3">Error traces, Workspace diagnostics</td>
                      <td className="p-3 font-semibold">Legitimate Interests</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 11: Regional Supplemental Disclosures */}
            <div className="space-y-4 pt-4 border-t border-[#e5e3dc]">
              <h2 className="text-2xl font-bold text-[#1f1e1d] font-sans">9. Regional Supplemental Disclosures</h2>
              <div className="space-y-3 text-sm">
                <h3 className="font-bold text-[#1f1e1d] font-sans">Disclosures for Residents of Canada</h3>
                <p>
                  Consent: By using Calvras, you consent to the processing of personal data in accordance with this Policy. You may withdraw consent at any time subject to contractual notice by emailing privacy@calvras.ai.
                </p>
                <h3 className="font-bold text-[#1f1e1d] font-sans pt-2">Disclosures for Residents of Brazil (LGPD)</h3>
                <p>
                  LGPD grants rights to confirm processing, access, rectify, anonymize, and port your personal data. We respond to verified LGPD requests in accordance with statutory Brazilian deadlines.
                </p>
                <h3 className="font-bold text-[#1f1e1d] font-sans pt-2">Disclosures for Residents of the European Union & UK</h3>
                <p>
                  We operate under GDPR adequacy frameworks and Standard Contractual Clauses (SCCs) to ensure equivalent data protection across all international data transfers.
                </p>
              </div>
            </div>

          </article>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            DOCUMENT 2: TERMS OF SERVICE (Exhaustive, user code ownership)
        ═══════════════════════════════════════════════════════════════════ */}
        {activeDoc === 'terms' && (
          <article className="space-y-8 text-[#33312e] leading-relaxed text-[15px] animate-fade-in font-serif">
            <div className="border-b border-[#e5e3dc] pb-8 font-sans">
              <h1 className="text-4xl sm:text-5xl font-black text-[#1f1e1d] tracking-tight mb-4">
                Terms of Service
              </h1>
              <div className="flex items-center gap-3 text-xs text-[#8c887b] font-mono">
                <span>Effective Date: January 1, 2026 • Last Updated: September 2026</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-[#1f1e1d] font-sans mb-2">1. Agreement to Terms</h2>
                <p>
                  These Terms of Service constitute a legally binding agreement between you and Calvras Technologies Inc. By registering an account, signing up, or purchasing a subscription, you agree to be bound by these terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#1f1e1d] font-sans mb-2">2. Description of Digital Services</h2>
                <p>
                  Calvras provides web-based autonomous software development tools, React 18 / TypeScript / Tailwind CSS code generation, in-browser live sandboxes, repository synchronization, and developer API connectivity. All services are distributed as electronic digital software subscriptions.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-[#dcd9d0] space-y-2 font-sans">
                <h3 className="text-base font-bold text-emerald-800 flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-600" />
                  <span>3. Complete User Code Ownership (100% IP Guarantee)</span>
                </h3>
                <p className="text-sm text-[#33312e]">
                  <strong>You own 100% of all intellectual property rights</strong> in and to the source code, applications, user interfaces, database schemas, and digital assets generated or written through your use of Calvras. Calvras claims zero ownership, license fees, or ongoing royalties over your creations.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#1f1e1d] font-sans mb-2">4. Subscriptions, Fees & Paystack Processing</h2>
                <p>
                  Calvras offers Free, Pro ($14/month), and Max ($40/month with Unlimited API key usage) plans. Subscriptions are billed in advance on a monthly or annual basis. All transactions are securely processed by <strong>Paystack</strong>. You may cancel your subscription at any time with one click in your Account Settings.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#1f1e1d] font-sans mb-2">5. Acceptable Use</h2>
                <p>
                  You agree not to use Calvras to generate malware, distribute phishing campaigns, violate third-party trademarks, or bypass system security controls. We reserve the right to terminate accounts that violate these terms.
                </p>
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#1f1e1d] font-sans mb-2">6. Limitation of Liability</h2>
                <p>
                  To the maximum extent permitted by applicable law, Calvras Technologies shall not be liable for indirect, incidental, special, or consequential damages resulting from downtime, service interruption, or loss of profits.
                </p>
              </div>
            </div>
          </article>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            DOCUMENT 3: SHIPPING & REFUND POLICY (Digital Fulfillment & Paystack)
        ═══════════════════════════════════════════════════════════════════ */}
        {activeDoc === 'refund' && (
          <article className="space-y-8 text-[#33312e] leading-relaxed text-[15px] animate-fade-in font-serif">
            <div className="border-b border-[#e5e3dc] pb-8 font-sans">
              <h1 className="text-4xl sm:text-5xl font-black text-[#1f1e1d] tracking-tight mb-4">
                Shipping & Refund Policy
              </h1>
              <div className="flex items-center gap-3 text-xs text-[#8c887b] font-mono">
                <span>Effective Date: January 1, 2026 • Verified Paystack Merchant Policy</span>
              </div>
            </div>

            <div className="space-y-6">
              {/* Shipping Policy */}
              <div className="p-6 rounded-2xl bg-white border border-[#dcd9d0] space-y-3 font-sans">
                <h2 className="text-xl font-bold text-[#1f1e1d]">1. Digital Delivery & Fulfillment (Shipping Policy)</h2>
                <p className="text-sm text-[#33312e] leading-relaxed">
                  Calvras provides digital Software-as-a-Service (SaaS) products, cloud development credits, and developer tools. 
                  <strong> No physical goods or postal shipments are involved.</strong>
                </p>
                <div className="pt-2 space-y-2 text-xs text-[#55524b]">
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Instant Electronic Delivery:</strong> Upon successful payment authorization by our payment gateway <strong>Paystack</strong>, your account is immediately upgraded. Plan credits, access permissions, and features are provisioned electronically in real time within 5 seconds.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={14} className="text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Zero Shipping & Handling Charges:</strong> All software and exports are delivered through our web platform at <code className="text-black bg-black/5 px-1 py-0.5 rounded">https://calvras.ai</code> with $0 freight or customs fees.</span>
                  </div>
                </div>
              </div>

              {/* Refund Policy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[#1f1e1d] font-sans">2. 14-Day Unconditional Money-Back Guarantee (Refund Policy)</h2>
                <p>
                  We offer an unconditional <strong>14-day money-back guarantee</strong> on all initial subscription purchases. If Calvras does not meet your software development needs, you are entitled to a full 100% refund within 14 calendar days of your transaction.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-sans">
                  <div className="p-4 rounded-xl bg-white border border-[#dcd9d0]">
                    <span className="text-xs font-bold text-[#1f1e1d] block mb-1">Eligibility Window</span>
                    <p className="text-xs text-[#66635c]">Request within 14 calendar days of transaction.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#dcd9d0]">
                    <span className="text-xs font-bold text-[#1f1e1d] block mb-1">Fast Turnaround</span>
                    <p className="text-xs text-[#66635c]">Refunds initiated within 24 hours of receiving your email.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-[#dcd9d0]">
                    <span className="text-xs font-bold text-[#1f1e1d] block mb-1">Paystack Settlement</span>
                    <p className="text-xs text-[#66635c]">Returned directly to your original card or bank in 3–5 business days.</p>
                  </div>
                </div>
              </div>

              {/* Refund Step-by-Step */}
              <div className="space-y-3 font-sans">
                <h2 className="text-xl font-bold text-[#1f1e1d]">3. How to Request Your Refund</h2>
                <p className="text-sm text-[#33312e]">
                  To request a refund, simply email our billing desk at:
                </p>
                <div className="p-4 rounded-xl bg-white border border-[#dcd9d0] text-sm">
                  <p className="font-mono font-bold text-[#1f1e1d]">support@calvras.ai (or billing@calvras.ai)</p>
                  <p className="text-xs text-[#66635c] mt-1">Please include: Your registered email address and your Paystack transaction receipt or reference ID.</p>
                </div>
              </div>

              {/* Cancellation */}
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-[#1f1e1d] font-sans">4. Subscription Cancellation Policy</h2>
                <p>
                  You may cancel your recurring monthly or annual subscription at any time from your Account Settings. Upon cancellation, your payment method will never be billed again, and you retain full access until the conclusion of your prepaid period.
                </p>
              </div>
            </div>
          </article>
        )}

        {/* ═══════════════════════════════════════════════════════════════════
            DOCUMENT 4: ABOUT CALVRAS TECHNOLOGIES
        ═══════════════════════════════════════════════════════════════════ */}
        {activeDoc === 'about' && (
          <article className="space-y-8 text-[#33312e] leading-relaxed text-[15px] animate-fade-in font-serif">
            <div className="border-b border-[#e5e3dc] pb-8 font-sans">
              <h1 className="text-4xl sm:text-5xl font-black text-[#1f1e1d] tracking-tight mb-4">
                About Calvras Technologies
              </h1>
              <div className="flex items-center gap-3 text-xs text-[#8c887b] font-mono">
                <span>Company Overview • Autonomous AI Engineering Platform</span>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-[#1f1e1d]">
                Calvras Technologies is an autonomous full-stack software development platform. We build cutting-edge artificial intelligence systems that empower solo developers, startup founders, agencies, and enterprises to design, build, preview, and deploy full-stack web applications, APIs, and modern user interfaces in record time.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans pt-2">
                <div className="p-6 rounded-2xl bg-white border border-[#dcd9d0] space-y-3">
                  <h3 className="text-sm font-bold text-[#1f1e1d] uppercase tracking-wider">Our Core Services</h3>
                  <ul className="space-y-2 text-xs text-[#55524b]">
                    <li>• <strong>Autonomous Web App Generation:</strong> Production React 18, TypeScript, Tailwind CSS, and Express backends.</li>
                    <li>• <strong>Vision UI Duplication:</strong> Turning screenshots and mockups into responsive, interactive web interfaces.</li>
                    <li>• <strong>Live In-Browser Sandboxes:</strong> Sub-second compiling with real-time DOM previews.</li>
                    <li>• <strong>Developer APIs & BYOK:</strong> Unlimited API key usage and webhook integrations.</li>
                  </ul>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#dcd9d0] space-y-3">
                  <h3 className="text-sm font-bold text-[#1f1e1d] uppercase tracking-wider">Registered Business Details</h3>
                  <div className="space-y-1.5 text-xs text-[#55524b]">
                    <p><strong>Entity:</strong> Calvras Technologies Inc.</p>
                    <p><strong>Support Email:</strong> support@calvras.ai</p>
                    <p><strong>Billing Desk:</strong> billing@calvras.ai</p>
                    <p><strong>Payment Partner:</strong> Paystack (PCI-DSS Level 1)</p>
                    <p><strong>Availability:</strong> 24/7 Automated Cloud Platform</p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        )}

      </main>

      {/* ─── Rich Footer (Matching Anthropic Footer Style) ─── */}
      <footer className="mt-auto border-t border-[#e5e3dc] bg-[#141416] text-[#a3a19b] text-xs py-14 px-6 sm:px-12 font-sans">
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-tight">Products</h4>
            <ul className="space-y-2">
              <li><button onClick={onNavigatePricing} className="hover:text-white transition-colors cursor-pointer">Calvras Studio</button></li>
              <li><button onClick={onNavigatePricing} className="hover:text-white transition-colors cursor-pointer">Live Preview Sandbox</button></li>
              <li><button onClick={onNavigatePricing} className="hover:text-white transition-colors cursor-pointer">UI Duplication Vision</button></li>
              <li><button onClick={onNavigatePricing} className="hover:text-white transition-colors cursor-pointer">Developer API & BYOK</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-tight">Support & Plans</h4>
            <ul className="space-y-2">
              <li><button onClick={onNavigatePricing} className="hover:text-white transition-colors cursor-pointer">Free Plan ($0)</button></li>
              <li><button onClick={onNavigatePricing} className="hover:text-white transition-colors cursor-pointer">Pro Plan ($14/mo)</button></li>
              <li><button onClick={onNavigatePricing} className="hover:text-white transition-colors cursor-pointer">Max Plan ($40/mo)</button></li>
              <li><button onClick={() => setActiveDoc('refund')} className="hover:text-white transition-colors cursor-pointer">Shipping & Refunds</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-tight">Legal & Trust</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveDoc('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button></li>
              <li><button onClick={() => setActiveDoc('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button></li>
              <li><button onClick={() => setActiveDoc('refund')} className="hover:text-white transition-colors cursor-pointer">Money-Back Guarantee</button></li>
              <li><a href="mailto:compliance@calvras.ai" className="hover:text-white transition-colors">Merchant Compliance</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm tracking-tight">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setActiveDoc('about')} className="hover:text-white transition-colors cursor-pointer">About Calvras</button></li>
              <li><a href="mailto:support@calvras.ai" className="hover:text-white transition-colors">Contact Support</a></li>
              <li><span className="text-[#66635c]">Status: All Systems Operational</span></li>
            </ul>
          </div>

        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#706e68]">
          <div className="flex items-center gap-2">
            <img src="/sidebar-logo.jpeg" alt="Calvras" className="w-5 h-5 rounded object-contain" />
            <span className="text-white font-semibold">Calvras Technologies Inc.</span>
            <span>© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <p>
            Secure digital payments processed via Paystack. Instant electronic fulfillment with a 14-day money-back guarantee.
          </p>
        </div>
      </footer>

    </div>
  );
}
