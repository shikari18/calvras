import React, { useState } from 'react';
import { Search, ArrowRight, Sparkles, Monitor, Layers, ShoppingBag, BarChart3, Palette } from 'lucide-react';

export const TEMPLATE_ITEMS = [
  {
    id: 'inspo',
    title: 'Inspo',
    subtitle: 'Your visual thinking space',
    category: 'Creative',
    prompt: 'Build an Inspo visual moodboard & canvas app with image uploads, sticky notes, tagging, and draggable boards.',
    renderPreview: () => (
      <div className="w-full h-full bg-[#f4f2ee] p-2 flex flex-col justify-between select-none relative overflow-hidden">
        <div className="flex items-center justify-between border-b border-black/5 pb-1 mb-1">
          <span className="text-[9px] font-bold text-neutral-800 tracking-tight">Inspo</span>
          <span className="text-[7.5px] text-neutral-400 font-mono">v1.2</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 flex-1">
          <div className="rounded-md overflow-hidden bg-rose-100/80 border border-rose-200/60 p-1 flex items-center justify-center">
            <span className="text-[14px]">🌸</span>
          </div>
          <div className="rounded-md overflow-hidden bg-neutral-900 border border-neutral-700 flex items-center justify-center col-span-1">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format&fit=crop"
              alt="Model"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="rounded-md overflow-hidden bg-amber-50 border border-amber-200/60 p-1 flex items-center justify-center">
            <span className="text-[14px]">🐱</span>
          </div>
        </div>
        <div className="mt-1.5 bg-white/95 rounded-md p-1.5 shadow-sm border border-black/5 text-center">
          <div className="text-[9.5px] font-bold text-neutral-900 leading-none">Inspo</div>
          <div className="text-[7px] text-neutral-500 mt-0.5">Your visual thinking space</div>
        </div>
      </div>
    ),
  },
  {
    id: 'slides',
    title: 'CalvrasSlides',
    subtitle: 'Interactive code presentations',
    category: 'Presentation',
    prompt: 'Build an interactive presentation and pitch deck generator with slide transitions, presenter mode, and code blocks.',
    renderPreview: () => (
      <div className="w-full h-full bg-gradient-to-br from-[#3b82f6] via-[#8b5cf6] to-[#ec4899] p-3 flex flex-col items-center justify-center text-center select-none text-white relative">
        <div className="w-6 h-6 rounded-lg bg-white/20 backdrop-blur-md flex items-center justify-center mb-1.5 border border-white/25 shadow-sm">
          <Monitor size={12} className="text-white" />
        </div>
        <div className="text-[12px] font-black tracking-tight text-white drop-shadow-sm">CalvrasSlides</div>
        <div className="text-[7.5px] text-white/80 max-w-[150px] mt-0.5 leading-tight line-clamp-2">
          Build stunning, interactive presentations with the power of code
        </div>
      </div>
    ),
  },
  {
    id: 'maison',
    title: 'Maison',
    subtitle: 'Objects of Quiet Beauty',
    category: 'E-commerce',
    prompt: 'Build a luxury minimalist e-commerce store called Maison for curated design objects, editorial catalog, and cart checkout.',
    renderPreview: () => (
      <div className="w-full h-full bg-[#f7f5f0] p-2.5 flex flex-col justify-between select-none text-neutral-900 relative">
        <div className="flex items-center justify-between border-b border-neutral-300 pb-1">
          <span className="text-[9px] font-serif tracking-widest uppercase font-bold text-neutral-800">Maison</span>
          <div className="flex gap-1.5 text-[6.5px] text-neutral-500 uppercase tracking-wider font-sans">
            <span>Shop</span>
            <span>About</span>
          </div>
        </div>
        <div className="my-auto py-1">
          <span className="text-[6px] tracking-widest uppercase text-neutral-500 font-mono block mb-0.5">Curated Living</span>
          <h5 className="text-[12px] font-serif leading-tight font-medium text-neutral-900">
            Objects of Quiet Beauty
          </h5>
        </div>
        <div className="h-10 rounded bg-[#e8e4db] overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=300&q=80&auto=format&fit=crop"
            alt="Interior"
            className="w-full h-full object-cover opacity-90"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'growth',
    title: 'GrowthOS',
    subtitle: 'Autonomous Revenue Attribution',
    category: 'SaaS',
    prompt: 'Build a real-time autonomous marketing growth operating system with campaign tracking, CAC/LTV attribution, and AI copy generators.',
    renderPreview: () => (
      <div className="w-full h-full bg-[#111116] p-2.5 flex flex-col justify-between select-none text-white relative border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <BarChart3 size={10} className="text-emerald-400" />
            <span className="text-[9px] font-bold text-white tracking-tight">GrowthOS</span>
          </div>
          <span className="text-[7.5px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-mono">+38.4%</span>
        </div>
        <div className="space-y-1 my-auto">
          <div className="text-[14px] font-black text-white">$124,500 <span className="text-[8px] font-normal text-neutral-400">ARR</span></div>
          <div className="h-4 w-full flex items-end gap-1 pt-1">
            <div className="flex-1 bg-emerald-500/30 rounded-t h-[40%]" />
            <div className="flex-1 bg-emerald-500/50 rounded-t h-[65%]" />
            <div className="flex-1 bg-emerald-500/70 rounded-t h-[50%]" />
            <div className="flex-1 bg-emerald-400 rounded-t h-[90%]" />
            <div className="flex-1 bg-emerald-300 rounded-t h-[100%]" />
          </div>
        </div>
        <div className="text-[7.5px] text-neutral-400 font-mono flex items-center justify-between">
          <span>Attribution</span>
          <span className="text-neutral-500">Live Sync</span>
        </div>
      </div>
    ),
  },
  {
    id: 'studio',
    title: 'Creative Studio',
    subtitle: 'Full-Stack GenAI Canvas',
    category: 'Design',
    prompt: 'Build a dark cyber-aesthetic creative AI studio with drag-and-drop generative nodes, multi-modal asset previews, and prompt chaining.',
    renderPreview: () => (
      <div className="w-full h-full bg-gradient-to-tr from-[#18181b] via-[#27272a] to-[#3f3f46] p-2.5 flex flex-col justify-between select-none text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Palette size={10} className="text-pink-400" />
            <span className="text-[9px] font-bold text-white tracking-tight">Studio Gen</span>
          </div>
          <span className="text-[7px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded font-mono">Nodes</span>
        </div>
        <div className="my-auto text-center">
          <div className="text-[11px] font-bold text-white">Full-Stack GenAI</div>
          <div className="text-[7.5px] text-neutral-300 mt-0.5">Creative Suite</div>
        </div>
        <div className="flex gap-1">
          <div className="flex-1 h-2 rounded bg-pink-500/40" />
          <div className="flex-1 h-2 rounded bg-purple-500/40" />
          <div className="flex-1 h-2 rounded bg-blue-500/40" />
        </div>
      </div>
    ),
  },
];

export default function InspirationDrawer({ onSelectPrompt, onOpenBrowseAll }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('Calvras templates');

  const filtered = TEMPLATE_ITEMS.filter(item => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q) || item.category.toLowerCase().includes(q);
  });

  return (
    <div className="w-full max-w-[840px] mx-auto rounded-[24px] bg-[#1a1a1e] border border-[#2e2e36] p-3.5 sm:p-4 shadow-2xl transition-all select-none">
      {/* ── Top Header Row matching the exact reference image ── */}
      <div className="flex items-center justify-between gap-3 mb-3.5 px-1">
        {/* Left: Search pill + templates tag */}
        <div className="flex items-center gap-2 bg-[#222228] border border-[#32323c] rounded-full px-3 py-1.5 max-w-[280px] sm:max-w-[320px] transition-colors focus-within:border-neutral-400">
          <Search size={13} className="text-neutral-400 flex-shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search"
            className="bg-transparent text-xs text-white placeholder-neutral-400 outline-none w-16 sm:w-20 font-medium"
          />
          <button
            type="button"
            className="px-2.5 py-0.5 rounded-full bg-[#2c2c34] hover:bg-[#363640] border border-white/10 text-[11px] font-medium text-neutral-200 transition-colors flex-shrink-0 cursor-pointer"
          >
            {selectedTag}
          </button>
        </div>

        {/* Right: Browse all -> */}
        <button
          type="button"
          onClick={() => {
            if (onOpenBrowseAll) onOpenBrowseAll();
            else onSelectPrompt('Explore all fullstack starters, templates, and generative workspaces.');
          }}
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors font-medium px-2 py-1 rounded-lg hover:bg-white/5 cursor-pointer"
        >
          <span>Browse all</span>
          <ArrowRight size={13} />
        </button>
      </div>

      {/* ── Horizontal Gallery Cards matching reference ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 overflow-x-auto pb-1 scrollbar-none">
        {filtered.slice(0, 3).map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectPrompt(item.prompt)}
            className="group relative h-[140px] sm:h-[150px] rounded-2xl overflow-hidden border border-[#2e2e38] hover:border-neutral-400/50 transition-all cursor-pointer shadow-md hover:shadow-xl hover:scale-[1.015] flex flex-col bg-[#141417]"
          >
            {/* Custom Interactive Preview Canvas */}
            <div className="flex-1 w-full overflow-hidden relative">
              {item.renderPreview()}
            </div>

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3">
              <span className="px-3 py-1.5 rounded-full bg-white text-black font-semibold text-xs shadow-lg flex items-center gap-1.5">
                <Sparkles size={11} /> Use Template
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
