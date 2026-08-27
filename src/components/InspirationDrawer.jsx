import React, { useState } from 'react';
import { Lightbulb, ChevronUp, ChevronDown, ArrowUpRight } from 'lucide-react';
import { INSPIRATIONS } from '../data/mockData';

export default function InspirationDrawer({ onSelectPrompt }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Coding', 'Architecture', 'Swarm Agents', 'Research', 'Design', 'Data'];

  const filteredInspirations = activeCategory === 'All' 
    ? INSPIRATIONS 
    : INSPIRATIONS.filter(item => item.category === activeCategory);

  return (
    <div className="w-full max-w-4xl mx-auto z-20 transition-all duration-200">
      {/* Bottom Bar / Trigger */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between px-4 py-2 rounded-2xl bg-[#1e1e1e] hover:bg-[#232323] border border-[#2b2b2b] text-neutral-400 hover:text-neutral-200 cursor-pointer transition-all select-none"
      >
        <div className="flex items-center gap-2 text-xs font-normal text-neutral-300">
          <Lightbulb size={14} className="text-neutral-400" />
          <span>Explore inspiration</span>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition-colors">
          <span>{isOpen ? 'Click to minimize' : 'Scroll to explore'}</span>
          {isOpen ? <ChevronDown size={13} /> : <ChevronUp size={13} />}
        </div>
      </div>

      {/* Expanded Inspiration Grid */}
      {isOpen && (
        <div className="mt-2.5 p-4 rounded-2xl bg-[#1c1c1c] border border-[#2c2c2c] shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2.5 mb-3 scrollbar-none text-xs">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={(e) => { e.stopPropagation(); setActiveCategory(cat); }}
                className={`px-3 py-1 rounded-full text-xs transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#2e2e2e] text-white font-medium'
                    : 'bg-[#222222] text-neutral-400 hover:text-white hover:bg-[#282828]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Prompt Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {filteredInspirations.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  onSelectPrompt(item.description);
                  setIsOpen(false);
                }}
                className="p-3.5 rounded-xl bg-[#222222] hover:bg-[#282828] border border-[#2d2d2d] hover:border-[#3d3d3d] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-mono text-neutral-400 bg-[#1a1a1a] px-2 py-0.5 rounded border border-[#2a2a2a]">
                      {item.tag}
                    </span>
                    <ArrowUpRight size={13} className="text-neutral-500 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="text-xs font-semibold text-neutral-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
