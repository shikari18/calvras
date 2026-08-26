import React from 'react';
import { GitFork, Plus, Sparkles } from 'lucide-react';

export const CyFlowsPage = ({ onNewChat }) => {
  return (
    <div className="flex-1 min-h-screen bg-[#1c1c1c] p-6 sm:p-10 font-sans antialiased text-white select-none text-left overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8 pt-4 sm:pt-6">
        
        {/* Title Header */}
        <div className="space-y-1.5 border-b border-white/10 pb-6">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
            Flows
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-normal">
            Automations Calvras builds and runs — versioned, with live telemetry and execution history.
          </p>
        </div>

        {/* Empty State Card */}
        <div className="bg-[#242424] border border-white/10 rounded-3xl p-12 sm:p-16 shadow-2xl flex flex-col items-center justify-center text-center space-y-4 min-h-[320px]">
          <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-neutral-300 flex items-center justify-center mb-1 shadow-sm">
            <GitFork size={22} />
          </div>
          
          <h3 className="text-base font-bold text-white tracking-tight">
            No flows yet
          </h3>

          <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
            Ask Calvras in Chat to build and publish a growth flow — automated sequences and their run history will appear here.
          </p>

          <button
            onClick={onNewChat}
            className="mt-2 text-xs font-bold bg-white hover:bg-neutral-100 text-neutral-950 px-5 py-2.5 rounded-xl transition cursor-pointer shadow-md active:scale-95 inline-flex items-center gap-2"
          >
            <Sparkles size={14} className="text-neutral-950" />
            <span>Build Flow with Calvras</span>
          </button>
        </div>

      </div>
    </div>
  );
};
