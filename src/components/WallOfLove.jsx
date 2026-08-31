import React from 'react';
import { Star, ShieldCheck, TrendingUp, CheckCircle, Quote } from 'lucide-react';

export const WallOfLove = () => {
  const testimonials = [
    {
      name: "Marcus Vance",
      role: "Founder, Lumina Apparel",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      quote: "We were paying $5,000/mo to a boutique agency and waiting 2 weeks for 4 Canva banners. With Calvras, we generated 15 winning ad hooks in 90 seconds. Our blended CPA dropped from $48.50 to $16.20 in 18 days.",
      metric: "$18k ➔ $142k/mo at 4.25x ROAS",
      verified: true
    },
    {
      name: "Elena Rostova",
      role: "Head of Growth, Zenith Labs",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      quote: "The 3-Hook Matrix completely solved our creative ad fatigue on TikTok. We deploy 20 new multivariate hooks every Friday morning before lunch. It paid for itself 100x over in our first weekend.",
      metric: "+308% Ad Testing Velocity",
      verified: true
    },
    {
      name: "David Chen",
      role: "Managing Director, Chen Growth Capital",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      quote: "As an agency managing 12 DTC brands, Calvras allowed us to 10x our client creative output without adding a single graphic design headcount. The enterprise SOC-2 compliance makes client onboarding effortless.",
      metric: "12 Client Workspaces Managed",
      verified: true
    }
  ];

  return (
    <section className="py-24 md:py-36 border-t border-white/10 bg-[#1c1c1c] text-white text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <p className="text-xs font-mono font-semibold tracking-[0.24em] uppercase text-emerald-400">
            PROVEN IN THE FIELD
          </p>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-white tracking-tight">
            Loved by 10,480+ growth operators
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
            Real receipts from founders and media buyers who fired their marketing agencies and scaled autonomously.
          </p>
        </div>

        {/* 3-Column Wall of Love Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div 
              key={idx} 
              className="bg-[#141512] rounded-3xl border border-white/10 p-7 flex flex-col justify-between space-y-6 hover:border-white/20 transition-all shadow-xl relative group"
            >
              <div className="space-y-4">
                
                {/* 5 Stars + Metric Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                    {t.metric}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-[13px] text-neutral-300 leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                <img 
                  src={t.image} 
                  alt={t.name} 
                  className="w-10 h-10 rounded-full object-cover border border-white/15"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white">{t.name}</span>
                    {t.verified && (
                      <CheckCircle size={12} className="text-cyan-400" />
                    )}
                  </div>
                  <span className="text-[11px] text-neutral-400 block">{t.role}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
