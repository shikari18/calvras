import React from 'react';
import { X, Sliders, Moon, Sparkles, Terminal, Globe, Cpu } from 'lucide-react';

export default function CustomizeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#1a1a1a] border border-[#2b2b2b] rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#242424] hover:bg-[#2d2d2d] transition-colors"
        >
          <X size={17} />
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-medium text-white flex items-center gap-2">
            <Sliders className="text-neutral-300" size={19} />
            <span>Customize AI Persona & Environment</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Configure system prompts, response tone, default connectors, and execution environment.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-neutral-300 font-medium mb-1.5">Custom Instructions</label>
            <textarea
              rows={3}
              placeholder="What would you like CODED to know about you to provide better answers?"
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#222222] border border-[#303030] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-[#222222] border border-[#2f2f2f]">
              <div className="text-xs font-semibold text-white">Default Search Mode</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">All Web + Citations</div>
            </div>
            <div className="p-3 rounded-xl bg-[#222222] border border-[#2f2f2f]">
              <div className="text-xs font-semibold text-white">Code Execution</div>
              <div className="text-[11px] text-emerald-400 mt-0.5">Autonomous Python / Node</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-[#292929]">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#282828] hover:bg-[#323232] text-xs text-neutral-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
