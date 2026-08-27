import React from 'react';

export const BuiltAroundBusiness = () => {
  return (
    <section className="py-24 md:py-36 border-t border-white/10 bg-[#1c1c1c] text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center">
        
        <div className="space-y-4 mb-16">
          <p className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-neutral-400">
            DEEP CONTEXTUAL MEMORY
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-tight leading-[1.08]">
            Built around<br />your business.
          </h2>
        </div>

        {/* Orbit Visualization */}
        <div className="relative w-full max-w-xl mx-auto h-[260px] sm:h-[300px] flex items-center justify-center my-6">
          <div className="absolute w-full h-[180px] sm:h-[220px] rounded-[100%] border border-white/10 -rotate-6 pointer-events-none" />
          <div className="absolute w-[80%] h-[140px] sm:h-[160px] rounded-[100%] border border-white/20 rotate-12 pointer-events-none" />
          
          {/* Center Core */}
          <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#181915] border border-white/20 flex items-center justify-center shadow-2xl">
            <img 
              src="/calvras.png" 
              alt="Calvras" 
              className="w-[45px] h-[45px] rounded-xl object-contain" 
            />
          </div>

          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#161714] px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-[13px] font-semibold text-neutral-200 shadow-md">
            Your products
          </div>
          <div className="absolute right-0 sm:right-6 top-1/2 -translate-y-1/2 bg-[#161714] px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-[13px] font-semibold text-neutral-200 shadow-md">
            Your customers
          </div>
          <div className="absolute bottom-4 right-12 sm:right-24 bg-[#161714] px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-[13px] font-semibold text-neutral-200 shadow-md">
            Your brand
          </div>
          <div className="absolute bottom-4 left-12 sm:left-24 bg-[#161714] px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-[13px] font-semibold text-neutral-200 shadow-md">
            Your voice
          </div>
          <div className="absolute left-0 sm:left-6 top-1/2 -translate-y-1/2 bg-[#161714] px-4 py-1.5 rounded-full border border-white/15 text-xs sm:text-[13px] font-semibold text-neutral-200 shadow-md">
            Your goals
          </div>
        </div>

        <p className="text-xl sm:text-2xl font-serif text-neutral-300 tracking-tight mt-12">
          Calvras remembers every campaign, customer cohort, and metric.
        </p>

      </div>
    </section>
  );
};
