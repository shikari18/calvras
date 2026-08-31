import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0f0f0e] text-[#ececed] p-2 pl-0.5 gap-2 select-none animate-in fade-in duration-300">
      
      {/* Left Sidebar Skeleton */}
      <div className="w-[260px] h-full flex-shrink-0 flex flex-col justify-between p-3 rounded-[18px] bg-[#141414] border border-[#383838]">
        <div className="space-y-4">
          {/* Logo & Brand */}
          <div className="flex items-center justify-between px-1 py-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-neutral-800 animate-pulse" />
              <div className="h-4 w-20 rounded bg-neutral-800 animate-pulse" />
            </div>
            <div className="w-5 h-5 rounded bg-neutral-800 animate-pulse" />
          </div>

          {/* New Chat Button */}
          <div className="h-10 w-full rounded-xl bg-neutral-800/80 border border-neutral-700/50 animate-pulse flex items-center px-3 gap-2">
            <div className="w-4 h-4 rounded-full bg-neutral-700" />
            <div className="h-3.5 w-24 rounded bg-neutral-700" />
          </div>

          {/* Nav Items */}
          <div className="space-y-1.5 pt-2">
            <div className="h-8 w-full rounded-lg bg-neutral-800/50 animate-pulse flex items-center px-2.5 gap-2.5">
              <div className="w-4 h-4 rounded bg-neutral-700" />
              <div className="h-3 w-16 rounded bg-neutral-700" />
            </div>
            <div className="h-8 w-full rounded-lg bg-neutral-800/30 animate-pulse flex items-center px-2.5 gap-2.5">
              <div className="w-4 h-4 rounded bg-neutral-700/80" />
              <div className="h-3 w-20 rounded bg-neutral-700/80" />
            </div>
            <div className="h-8 w-full rounded-lg bg-neutral-800/30 animate-pulse flex items-center px-2.5 gap-2.5">
              <div className="w-4 h-4 rounded bg-neutral-700/80" />
              <div className="h-3 w-24 rounded bg-neutral-700/80" />
            </div>
          </div>

          {/* Recent Conversations List Skeleton */}
          <div className="pt-4 space-y-2">
            <div className="h-2.5 w-16 rounded bg-neutral-800 animate-pulse mb-3" />
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-7 w-full rounded-md bg-neutral-800/40 animate-pulse flex items-center px-2">
                <div className="h-2.5 rounded bg-neutral-700/60" style={{ width: `${60 + (i * 8)}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom User Profile */}
        <div className="flex items-center justify-between p-2 rounded-xl bg-neutral-800/40 border border-neutral-700/40 animate-pulse">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-neutral-700" />
            <div className="space-y-1.5">
              <div className="h-3 w-16 rounded bg-neutral-700" />
              <div className="h-2 w-12 rounded bg-neutral-700/60" />
            </div>
          </div>
          <div className="w-4 h-4 rounded bg-neutral-700/80" />
        </div>
      </div>

      {/* Main Chat Inset Frame Skeleton */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="relative flex flex-col items-center justify-center flex-1 h-full rounded-[20px] border border-[#52525a] bg-[rgb(30,30,30)] shadow-[0_4px_30px_rgba(0,0,0,0.5)] p-6">
          
          {/* Top-Right action button skeletons */}
          <div className="absolute top-4 right-5 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700/60 animate-pulse" />
            <div className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700/60 animate-pulse" />
          </div>

          {/* Centered Hero Content */}
          <div className="flex flex-col items-center justify-center max-w-[620px] w-full space-y-8 text-center -mt-12">
            
            {/* Mascot / Logo Shimmer */}
            <div className="flex flex-col items-center space-y-3">
              <div className="h-10 w-44 rounded-xl bg-neutral-800 animate-pulse" />
              <div className="h-3 w-56 rounded bg-neutral-800/60 animate-pulse" />
            </div>

            {/* Prompt Box Area Skeleton */}
            <div className="w-full rounded-[24px] bg-[rgb(38,38,38)] border border-[rgb(65,65,65)] p-4 shadow-xl space-y-6">
              
              {/* Textarea lines */}
              <div className="space-y-2 py-2">
                <div className="h-4 w-3/4 rounded bg-neutral-700/50 animate-pulse" />
                <div className="h-4 w-1/2 rounded bg-neutral-700/30 animate-pulse" />
              </div>

              {/* Bottom input toolbar skeleton */}
              <div className="flex items-center justify-between pt-2 border-t border-neutral-700/30">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-neutral-700/60 animate-pulse" />
                  <div className="w-8 h-8 rounded-lg bg-neutral-700/60 animate-pulse" />
                  <div className="w-20 h-7 rounded-lg bg-neutral-700/40 animate-pulse" />
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-20 h-8 rounded-xl bg-neutral-700/80 animate-pulse" />
                  <div className="w-9 h-9 rounded-xl bg-neutral-700 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Quick Inspiration Pills Skeleton */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <div className="h-8 w-32 rounded-xl bg-neutral-800/80 border border-neutral-700/40 animate-pulse" />
              <div className="h-8 w-36 rounded-xl bg-neutral-800/80 border border-neutral-700/40 animate-pulse" />
              <div className="h-8 w-28 rounded-xl bg-neutral-800/80 border border-neutral-700/40 animate-pulse" />
              <div className="h-8 w-32 rounded-xl bg-neutral-800/80 border border-neutral-700/40 animate-pulse" />
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}