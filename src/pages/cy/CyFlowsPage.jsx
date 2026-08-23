import React from 'react';
import { GitFork, Plus } from 'lucide-react';

export const CyFlowsPage = ({ onNewChat }) => {
  return (
    <div className="flex-1 min-h-screen bg-white p-6 sm:p-10 font-sans antialiased text-neutral-900 select-none text-left overflow-y-auto">
      <div className="max-w-5xl mx-auto space-y-8 pt-4 sm:pt-6">
        
        {/* Title Header */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
            Flows
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            Automations the agent builds and runs — versioned, with live run history.
          </p>
        </div>

        {/* Empty State Card */}
        <div className="bg-white border border-[#e5e5e7] rounded-3xl p-12 sm:p-16 shadow-2xs flex flex-col items-center justify-center text-center space-y-3 min-h-[320px]">
          <div className="w-10 h-10 rounded-2xl bg-neutral-100/70 text-neutral-400 flex items-center justify-center mb-1">
            <GitFork size={20} />
          </div>
          
          <h3 className="text-sm font-semibold text-neutral-900">
            No flows yet
          </h3>

          <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
            Ask the agent in a channel to build and publish a flow — published flows and their runs land here.
          </p>

          <button
            onClick={onNewChat}
            className="mt-2 text-xs font-semibold bg-neutral-950 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl transition cursor-pointer shadow-xs inline-flex items-center gap-1.5"
          >
            <Plus size={13} />
            <span>Build Flow</span>
          </button>
        </div>

      </div>
    </div>
  );
};
