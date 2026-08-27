import React from 'react';
import { GitFork, Plus, Sparkles } from 'lucide-react';

export const CyFlowsPage = ({ onNewChat }) => {
  return (
    <div className="flex-1 min-h-screen bg-[#0d0e0c] text-[#f4f4ee] p-6 sm:p-10 font-sans antialiased text-white select-none text-left overflow-y-auto">
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
        <div className="bg-[#131412] border border-white/10 rounded-3xl p-12 sm:p-16 shadow-2xs flex flex-col items-center justify-center text-center space-y-4 min-h-[320px]">
          <div className="w-12 h-12 rounded-2xl bg-neutral-100/80 border border-white/10 text-neutral-600 flex items-center justify-center mb-1 shadow-sm">
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
            className="mt-2 text-xs font-bold bg-neutral-900 hover:bg-neutral-800 text-white px-5 py-2.5 rounded-xl transition cursor-pointer shadow-sm active:scale-95 inline-flex items-center gap-2"
          >
            <Sparkles size={14} className="text-white" />
            <span>Build Flow with Calvras</span>
          </button>
        </div>

      </div>
    </div>
  );
};
