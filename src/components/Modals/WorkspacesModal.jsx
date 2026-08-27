import React from 'react';
import { X, GitBranch, GitPullRequest, GitCommit, CheckCircle2, RefreshCw } from 'lucide-react';

export default function WorkspacesModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const branches = [
    { name: 'main', status: 'Production', commit: 'chore: optimize bundle size', time: '10 mins ago', active: true },
    { name: 'feature/auth-supabase', status: 'Preview', commit: 'feat: add magic link authentication', time: '2 hours ago', active: false },
    { name: 'dev/checkout-stripe', status: 'Draft', commit: 'fix: webhook idempotency key', time: 'Yesterday', active: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#18181c] border border-[#2f2f38] rounded-3xl p-6 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#23232c] hover:bg-[#2c2c36] transition-colors"
        >
          <X size={17} />
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <GitBranch className="text-pink-400" size={20} />
            <span>GitHub Branches & Workspaces</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Manage your Git repository sync, preview environments, and deployment branches.
          </p>
        </div>

        <div className="space-y-2.5 max-h-72 overflow-y-auto">
          {branches.map((b, i) => (
            <div
              key={i}
              className={`p-3.5 rounded-2xl border transition-all ${
                b.active 
                  ? 'bg-[#20202a] border-pink-500/40 text-white' 
                  : 'bg-[#1b1b22] border-white/5 text-neutral-300 hover:border-white/15'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold">
                  <GitBranch size={14} className={b.active ? 'text-pink-400' : 'text-neutral-500'} />
                  <span>{b.name}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  b.status === 'Production' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                }`}>
                  {b.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2">
                <span className="truncate max-w-[260px]">{b.commit}</span>
                <span className="text-neutral-500 text-[10px]">{b.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#25252e]">
          <span className="text-xs text-neutral-500">Auto-sync enabled with GitHub</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-400 hover:to-rose-500 text-white text-xs font-bold transition-all shadow-md shadow-pink-500/20"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
