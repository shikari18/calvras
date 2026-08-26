import React from 'react';
import { Check, X, ArrowRight } from 'lucide-react';

export const ComparisonSection = ({ onNavigate }) => {
  const comparisonRows = [
    {
      feature: "Full-Funnel Strategy Generation",
      calvras: "Autonomous 30-day multi-channel roadmap with budget pacing",
      traditional: "Single-turn prompt box (user must piece everything together)",
      calvrasCheck: true,
      traditionalCheck: false
    },
    {
      feature: "AI Video Prompt Directing & Controls",
      calvras: "Precise camera lenses, lighting physics & cues for Sora, Runway & Kling",
      traditional: "Basic text prompts with zero cinematic physics or lighting controls",
      calvrasCheck: true,
      traditionalCheck: false
    },
    {
      feature: "High-Converting Copy Teardowns",
      calvras: "300+ practitioner formulas, boxed template outputs & objection handling",
      traditional: "Generic robotic copy loaded with cliché filler phrases",
      calvrasCheck: true,
      traditionalCheck: false
    },
    {
      feature: "Campaign Doctor (Conversion Diagnostics)",
      calvras: "Diagnoses high CPA, funnel leaks, and landing page drop-offs",
      traditional: "No funnel diagnostics or analytics capabilities",
      calvrasCheck: true,
      traditionalCheck: false
    },
    {
      feature: "Media Buying & Ad Scaling Blueprints",
      calvras: "ASC+, DCT 3:2:2 workflows, and Cost Cap guardrails",
      traditional: "Disconnected from actual ad account buying realities",
      calvrasCheck: true,
      traditionalCheck: false
    }
  ];

  return (
    <section className="py-24 sm:py-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/10 text-white">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <p className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-neutral-400">
          PURPOSE-BUILT VS GENERIC
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-tight">
          Why Calvras outperforms generic AI tools
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400">
          Compare autonomous multi-channel marketing to isolated chatbot prompts.
        </p>
      </div>

      {/* Comparison Table */}
      <div className="bg-[#141512] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            
            {/* Table Head */}
            <thead>
              <tr className="border-b border-white/10 bg-[#171815]">
                <th className="py-4 px-6 font-mono text-neutral-400 font-semibold uppercase tracking-wider text-[11px] w-1/3">
                  Capability
                </th>
                <th className="py-4 px-6 font-bold text-white bg-white/5 w-1/3 border-x border-white/10">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/calvras.png" 
                      alt="Calvras" 
                      className="w-[25px] h-[25px] rounded-md object-contain" 
                    />
                    <span className="text-white text-sm">Calvras Autonomous OS</span>
                  </div>
                </th>
                <th className="py-4 px-6 font-medium text-neutral-400 w-1/3">
                  Generic AI Prompt Tools
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-white/5">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  
                  {/* Feature Name */}
                  <td className="py-4.5 px-6 font-semibold text-white">
                    {row.feature}
                  </td>

                  {/* Calvras Column */}
                  <td className="py-4.5 px-6 bg-white/[0.03] border-x border-white/10">
                    <div className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} strokeWidth={3} />
                      </div>
                      <span className="text-neutral-200 leading-snug">
                        {row.calvras}
                      </span>
                    </div>
                  </td>

                  {/* Generic AI Column */}
                  <td className="py-4.5 px-6">
                    <div className="flex items-start gap-2.5 text-neutral-500">
                      <div className="w-4 h-4 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0 mt-0.5">
                        <X size={11} strokeWidth={3} />
                      </div>
                      <span className="leading-snug">
                        {row.traditional}
                      </span>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

    </section>
  );
};
