import React, { useState } from 'react';
import { Lightbulb, Target, Edit3, Send, BarChart3 } from 'lucide-react';

const STAGES = [
  { id: 'idea', label: 'IDEA', icon: Lightbulb, desc: 'Input one raw thought or business goal.' },
  { id: 'campaign', label: 'CAMPAIGN', icon: Target, desc: 'AI formulates multi-channel strategy, channels & budget.' },
  { id: 'content', label: 'CONTENT', icon: Edit3, desc: 'Generates on-brand copy, creatives & ad scripts.' },
  { id: 'publish', label: 'PUBLISH', icon: Send, desc: 'Automated workflow across Meta, TikTok & Email.' },
  { id: 'results', label: 'RESULTS', icon: BarChart3, desc: 'Continuous performance tracking & CRO diagnostics.' }
];

export const IdeaToEverywhere = () => {
  const [activeStage, setActiveStage] = useState(null);

  return (
    <section className="py-24 md:py-36 border-t border-white/10 bg-[#0d0e0c] text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-center space-y-12">
        
        <div className="space-y-4">
          <p className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-neutral-400">
            CONTINUOUS ENGINE
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-tight leading-[1.08]">
            From idea to everywhere.
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto pt-6">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isHovered = activeStage === stage.id;
            return (
              <React.Fragment key={stage.id}>
                <div 
                  onMouseEnter={() => setActiveStage(stage.id)} 
                  onMouseLeave={() => setActiveStage(null)} 
                  className="flex flex-col items-center group cursor-pointer"
                >
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${
                    isHovered 
                      ? 'bg-white text-black shadow-lg scale-105' 
                      : 'bg-[#161714] text-neutral-300 border border-white/10 group-hover:border-white/30 group-hover:text-white'
                  }`}>
                    <Icon size={22} className="transition-transform group-hover:scale-110" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold tracking-[0.14em] text-neutral-400 group-hover:text-white transition">
                    {stage.label}
                  </span>
                </div>
                {idx < STAGES.length - 1 && (
                  <div className="text-neutral-600 text-sm sm:text-base font-light mb-6">
                    →
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="h-10 flex items-center justify-center">
          <p className="text-xs sm:text-sm text-neutral-400 font-normal transition-opacity duration-300">
            {activeStage 
              ? STAGES.find(s => s.id === activeStage)?.desc 
              : 'One continuous, automated engine that scales your marketing footprint.'}
          </p>
        </div>

      </div>
    </section>
  );
};
