import React, { useState } from 'react';
import { X, Check, GitBranch, Database, MessageSquare, FileText, CreditCard, Box } from 'lucide-react';

const iconMap = {
  GitBranch: GitBranch,
  Figma: Box,
  Database: Database,
  MessageSquare: MessageSquare,
  FileText: FileText,
  CreditCard: CreditCard,
};

const DEFAULT_TOOLS = [
  { id: 'github', name: 'GitHub', icon: 'GitBranch', color: 'bg-neutral-800 text-white' },
  { id: 'figma', name: 'Figma', icon: 'Figma', color: 'bg-purple-600/20 text-purple-400' },
  { id: 'supabase', name: 'Supabase DB', icon: 'Database', color: 'bg-emerald-600/20 text-emerald-400' },
  { id: 'slack', name: 'Slack', icon: 'MessageSquare', color: 'bg-amber-600/20 text-amber-400' },
  { id: 'notion', name: 'Notion', icon: 'FileText', color: 'bg-blue-600/20 text-blue-400' },
  { id: 'stripe', name: 'Stripe Payments', icon: 'CreditCard', color: 'bg-indigo-600/20 text-indigo-400' },
];

export default function ConnectToolsModal({ isOpen, onClose }) {
  const [tools, setTools] = useState(() => {
    try {
      const saved = localStorage.getItem('calvras_connected_tools');
      const ghToken = localStorage.getItem('malvos_gh_token');
      const savedMap = saved ? JSON.parse(saved) : {};
      return DEFAULT_TOOLS.map(t => ({
        ...t,
        connected: t.id === 'github' ? (Boolean(ghToken) || Boolean(savedMap[t.id])) : Boolean(savedMap[t.id])
      }));
    } catch {
      return DEFAULT_TOOLS.map(t => ({ ...t, connected: false }));
    }
  });

  if (!isOpen) return null;

  const toggleTool = (id) => {
    const updated = tools.map(t => t.id === id ? { ...t, connected: !t.connected } : t);
    setTools(updated);
    try {
      const stateMap = {};
      updated.forEach(t => { stateMap[t.id] = t.connected; });
      localStorage.setItem('calvras_connected_tools', JSON.stringify(stateMap));
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#14141a] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#1e1e26] hover:bg-[#282834] transition-colors"
        >
          <X size={17} />
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-white">Connect all your tools</h2>
          <p className="text-xs text-neutral-400 mt-1">
            Seamlessly link your codebase repositories, databases, messaging channels, and payment systems.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 max-h-72 overflow-y-auto">
          {tools.map((tool) => {
            const Icon = iconMap[tool.icon] || Box;
            return (
              <div
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  tool.connected 
                    ? 'bg-[#1b1f30] border-blue-500/40 text-white' 
                    : 'bg-[#171720] border-white/5 text-neutral-400 hover:border-white/15'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs ${tool.color}`}>
                    <Icon size={15} />
                  </div>
                  <span className="text-xs font-semibold">{tool.name}</span>
                </div>

                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  tool.connected ? 'bg-blue-500 text-white' : 'border border-neutral-600'
                }`}>
                  {tool.connected && <Check size={10} strokeWidth={3} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t border-white/5">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-lg shadow-pink-500/20"
          >
            Save Connections
          </button>
        </div>
      </div>
    </div>
  );
}
