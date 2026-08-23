import React, { useState } from 'react';
import { Lightbulb, Target, Edit3, Send, BarChart3 } from 'lucide-react';

const STAGES = [
  { id: 'idea', label: 'IDEA', icon: Lightbulb, desc: 'Input one raw thought or business goal.' },
  { id: 'campaign', label: 'CAMPAIGN', icon: Target, desc: 'AI formulates strategy, channels & budget.' },
  { id: 'content', label: 'CONTENT', icon: Edit3, desc: 'Generates on-brand copy, creatives & ads.' },
  { id: 'publish', label: 'PUBLISH', icon: Send, desc: 'Automated scheduling across all channels.' },
  { id: 'results', label: 'RESULTS', icon: BarChart3, desc: 'Real-time performance tracking & optimization.' }
];

export const IdeaToEverywhere = () => {
  const [activeStage, setActiveStage] = useState(null);

  return (
    <section className="py-24 md:py-32 border-t border-neutral-100 bg-white text-neutral-950">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-[38px] sm:text-[48px] lg:text-[56px] font-bold text-neutral-950 tracking-[-0.035em] leading-[1.08] mb-16">
          From idea<br />to everywhere.
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isHovered = activeStage === stage.id;
            return (
              <React.Fragment key={stage.id}>
                <div onMouseEnter={() => setActiveStage(stage.id)} onMouseLeave={() => setActiveStage(null)} className="flex flex-col items-center group cursor-pointer">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
                    isHovered ? 'bg-purple-600 text-white shadow-md scale-105' : 'bg-neutral-50 text-neutral-700 border border-neutral-200/80 group-hover:border-purple-200 group-hover:text-purple-600'
                  }`}><Icon size={22} className="transition-transform group-hover:scale-110" /></div>
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-neutral-400 group-hover:text-neutral-950">{stage.label}</span>
                </div>
                {idx < STAGES.length - 1 && <div className="text-neutral-300 text-sm sm:text-base font-light mb-6">→</div>}
              </React.Fragment>
            );
          })}
        </div>
        <div className="h-10 mt-10 flex items-center justify-center">
          <p className="text-sm text-neutral-500 font-normal transition-opacity duration-300">
            {activeStage ? STAGES.find(s => s.id === activeStage)?.desc : 'One continuous, automated engine that scales your marketing footprint.'}
          </p>
        </div>
      </div>
    </section>
  );
};
