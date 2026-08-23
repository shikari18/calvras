import React from 'react';
import { ArrowRight, Hash } from 'lucide-react';

export const CyOverviewPage = ({ onSelectTab, userName = 'SHIKARI', threadTitle = 'Help Making Product Popular' }) => {
  return (
    <div className="flex-1 min-h-screen bg-white p-6 sm:p-10 font-sans antialiased text-neutral-900 select-none text-left overflow-y-auto">
      
      <div className="max-w-5xl mx-auto space-y-8 pt-4 sm:pt-6">
        
        {/* Big Editorial Serif Title */}
        <div className="space-y-1.5">
          <h1 className="text-3xl sm:text-4xl font-serif font-normal text-neutral-900 tracking-tight">
            Good morning, {userName}.
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal">
            Your autonomous marketing operating system — plan campaigns, publish viral content, and accelerate growth.
          </p>
        </div>

        {/* 4 Clean Metric Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bg-white border border-[#e5e5e7] rounded-2xl p-5 shadow-2xs space-y-1 hover:border-neutral-400 transition">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              CONNECTORS
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-tight">
              2
            </h3>
            <span className="text-xs text-neutral-400 block font-normal">
              of 1093 available
            </span>
          </div>

          <div className="bg-white border border-[#e5e5e7] rounded-2xl p-5 shadow-2xs space-y-1 hover:border-neutral-400 transition">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              FLOWS
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-tight">
              0
            </h3>
            <span className="text-xs text-neutral-400 block font-normal">
              published
            </span>
          </div>

          <div className="bg-white border border-[#e5e5e7] rounded-2xl p-5 shadow-2xs space-y-1 hover:border-neutral-400 transition">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              RUNS
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-tight">
              1
            </h3>
            <span className="text-xs text-neutral-400 block font-normal">
              last 24h
            </span>
          </div>

          <div className="bg-white border border-[#e5e5e7] rounded-2xl p-5 shadow-2xs space-y-1 hover:border-neutral-400 transition">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              THREADS
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-neutral-950 tracking-tight">
              1
            </h3>
            <span className="text-xs text-neutral-400 block font-normal">
              across 2 channels
            </span>
          </div>

        </div>

        {/* Bottom 2 Cards Grid: Recent Activity & Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Recent Activity Card (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#e5e5e7] rounded-2xl p-5 shadow-2xs space-y-4">
            <h3 className="text-xs font-semibold text-neutral-900">
              Recent activity
            </h3>

            <div 
              onClick={() => onSelectTab('threads')}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 border border-transparent hover:border-[#e5e5e7] transition cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-4 h-4 rounded-full border border-neutral-300 shrink-0" />
                <span className="text-[11px] font-medium text-neutral-500 bg-neutral-100 px-1.5 py-0.5 rounded">
                  #general
                </span>
                <span className="text-xs font-medium text-neutral-900 truncate">
                  {threadTitle}
                </span>
              </div>

              <span className="text-[11px] text-neutral-400 font-normal shrink-0">
                1m ago
              </span>
            </div>
          </div>

          {/* Workspace Card (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-[#e5e5e7] rounded-2xl p-5 shadow-2xs space-y-4">
            <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider block">
              WORKSPACE
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500 font-normal">Name</span>
                <span className="font-semibold text-neutral-900">{userName}'s Organization</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-neutral-100">
                <span className="text-neutral-500 font-normal">Connected tools</span>
                <span className="font-semibold text-neutral-900">2</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2">
              <button 
                onClick={() => onSelectTab('team')}
                className="text-xs text-neutral-700 hover:text-neutral-950 font-medium flex items-center gap-1 cursor-pointer transition"
              >
                <span>Manage team</span>
                <ArrowRight size={13} className="text-neutral-400" />
              </button>
              <button 
                onClick={() => onSelectTab('connectors')}
                className="text-xs text-neutral-700 hover:text-neutral-950 font-medium flex items-center gap-1 cursor-pointer transition"
              >
                <span>All connectors</span>
                <ArrowRight size={13} className="text-neutral-400" />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
