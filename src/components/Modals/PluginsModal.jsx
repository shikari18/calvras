import React from 'react';
import { X, Check, Search, Globe, Terminal, GitBranch, Figma, Database, Box } from 'lucide-react';

const iconMap = {
  Globe: Globe,
  Terminal: Terminal,
  GitBranch: GitBranch,
  Figma: Figma,
  Database: Database,
  Container: Box,
};

export default function PluginsModal({ isOpen, onClose, plugins, setPlugins }) {
  if (!isOpen) return null;

  const togglePlugin = (id) => {
    setPlugins(plugins.map(p => p.id === id ? { ...p, active: !p.active } : p));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#131318] border border-[#2b2b3a] rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#1c1c24] hover:bg-[#252533] transition-colors"
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div className="mb-5">
          <h2 className="text-xl font-bold text-white">CODED Plugins & Skills</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Enable live runtime integrations to grant agents access to web browsing, live sandboxes, and repository tools.
          </p>
        </div>

        {/* Plugins Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-1">
          {plugins.map((plugin) => {
            const Icon = iconMap[plugin.icon] || Globe;
            return (
              <div
                key={plugin.id}
                onClick={() => togglePlugin(plugin.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  plugin.active 
                    ? 'bg-[#181d2e] border-blue-500/50 shadow-md shadow-blue-500/5' 
                    : 'bg-[#171720] border-[#262633] hover:border-[#353545]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-9 h-9 rounded-xl border ${plugin.color}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">{plugin.name}</div>
                    <div className="text-[11px] text-neutral-400">{plugin.category}</div>
                  </div>
                </div>

                <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                  plugin.active ? 'bg-blue-600 text-white' : 'border border-neutral-600'
                }`}>
                  {plugin.active && <Check size={12} strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#222230]">
          <span className="text-xs text-neutral-400">
            {plugins.filter(p => p.active).length} of {plugins.length} plugins active
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
