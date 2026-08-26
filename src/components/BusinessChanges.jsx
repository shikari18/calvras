import React, { useState } from 'react';
import { ArrowUpRight, Check, ArrowRight } from 'lucide-react';

export const BusinessChanges = () => {
  const [selectedRec, setSelectedRec] = useState(0);
  const recommendations = [
    { 
      id: 0, 
      title: 'Scale weekend ad spend', 
      desc: 'Engagement is 42% higher on Saturdays.', 
      stat: '9.7%', 
      growth: '+28% vs last week', 
      chartPoints: [{ day: 'Mon', val: 20 }, { day: 'Tue', val: 35 }, { day: 'Wed', val: 25 }, { day: 'Thu', val: 45 }, { day: 'Fri', val: 60 }, { day: 'Sat', val: 95 }, { day: 'Sun', val: 75 }] 
    },
    { 
      id: 1, 
      title: 'Deploy UGC hook variations', 
      desc: 'Repurpose top 3 high-converting angles.', 
      stat: '14.2%', 
      growth: '+42% vs last week', 
      chartPoints: [{ day: 'Mon', val: 30 }, { day: 'Tue', val: 50 }, { day: 'Wed', val: 65 }, { day: 'Thu', val: 55 }, { day: 'Fri', val: 80 }, { day: 'Sat', val: 88 }, { day: 'Sun', val: 92 }] 
    },
    { 
      id: 2, 
      title: 'Test Advantage+ Shopping', 
      desc: 'Inject winners with cost cap guardrails.', 
      stat: '11.8%', 
      growth: '+31% vs last week', 
      chartPoints: [{ day: 'Mon', val: 25 }, { day: 'Tue', val: 40 }, { day: 'Wed', val: 45 }, { day: 'Thu', val: 70 }, { day: 'Fri', val: 65 }, { day: 'Sat', val: 82 }, { day: 'Sun', val: 85 }] 
    }
  ];
  const active = recommendations[selectedRec];

  return (
    <section className="py-24 md:py-36 border-t border-white/10 bg-[#0d0e0c] text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 text-left space-y-4">
            <p className="text-xs font-mono font-semibold tracking-[0.2em] uppercase text-neutral-400">
              ADAPTIVE TELEMETRY
            </p>
            <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white tracking-tight leading-[1.1]">
              Your business changes.<br />
              Your marketing should too.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-[420px]">
              AI analyzes live conversion performance and suggests the next highest-ROI strategic move.
            </p>
          </div>

          <div className="lg:col-span-7 bg-[#141512] rounded-3xl border border-white/10 shadow-2xl p-6 sm:p-8 text-left">
            <div className="grid sm:grid-cols-2 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              
              {/* Left Column: Stat & Chart */}
              <div className="sm:pr-6 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-medium text-neutral-400 block mb-2">
                    PERFORMANCE OVERVIEW
                  </span>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-white tracking-tight">
                      {active.stat}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-neutral-400">Engagement rate</span>
                      <span className="text-xs font-semibold text-emerald-400 flex items-center">
                        <ArrowUpRight size={13} />
                        {active.growth}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <div className="h-28 w-full relative flex items-end">
                    <svg className="w-full h-24 overflow-visible" viewBox="0 0 280 80">
                      <defs>
                        <linearGradient id="chartGradDark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path 
                        d={`M 0 80 ${active.chartPoints.map((p, i) => `L ${i * 45} ${80 - (p.val * 0.7)}`).join(' ')} L 270 80 Z`} 
                        fill="url(#chartGradDark)" 
                      />
                      <path 
                        d={`M 0 ${80 - (active.chartPoints[0].val * 0.7)} ${active.chartPoints.map((p, i) => `L ${i * 45} ${80 - (p.val * 0.7)}`).join(' ')}`} 
                        fill="none" 
                        stroke="#ffffff" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                      />
                      {active.chartPoints.map((p, i) => (
                        <circle key={i} cx={i * 45} cy={80 - (p.val * 0.7)} r="3" fill="#ffffff" stroke="#141512" strokeWidth="2" />
                      ))}
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-2 pt-2 border-t border-white/10">
                    {active.chartPoints.map((p, i) => <span key={i}>{p.day}</span>)}
                  </div>
                </div>
              </div>

              {/* Right Column: AI Recommendations */}
              <div className="pt-6 sm:pt-0 sm:pl-6">
                <span className="text-xs font-mono font-medium text-neutral-400 block mb-3">
                  AI RECOMMENDS
                </span>
                <div className="space-y-2.5">
                  {recommendations.map((rec, idx) => {
                    const isSelected = selectedRec === idx;
                    return (
                      <div 
                        key={rec.id} 
                        onClick={() => setSelectedRec(idx)} 
                        className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          isSelected 
                            ? 'bg-white/10 border-white/30 shadow-md' 
                            : 'bg-[#10110e] border-white/5 hover:border-white/15'
                        }`}
                      >
                        <div>
                          <p className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-neutral-300'}`}>
                            {rec.title}
                          </p>
                          <p className="text-[11px] text-neutral-400 mt-0.5">
                            {rec.desc}
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ml-2 ${
                          isSelected ? 'bg-white text-black' : 'text-neutral-500'
                        }`}>
                          {isSelected ? <Check size={13} /> : <ArrowRight size={13} />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
