import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';

export const DashboardCalendar = ({ onOpenNewCampaign }) => {
  const { businessProfile, campaigns, contentList } = useMarketing();

  const days = [
    { name: 'Mon', date: 'May 19', isToday: true },
    { name: 'Tue', date: 'May 20', isToday: false },
    { name: 'Wed', date: 'May 21', isToday: false },
    { name: 'Thu', date: 'May 22', isToday: false },
    { name: 'Fri', date: 'May 23', isToday: false },
    { name: 'Sat', date: 'May 24', isToday: false },
    { name: 'Sun', date: 'May 25', isToday: false }
  ];

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-[28px] font-bold text-neutral-950 tracking-tight">Calendar & Scheduling</h1>
          <p className="text-sm text-neutral-500 font-normal mt-0.5">
            Active multi-channel marketing schedule for <strong>{businessProfile.name}</strong>.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-white border border-neutral-200 rounded-xl p-1 shadow-2xs">
            <button className="p-1 hover:bg-neutral-100 rounded-lg text-neutral-600 cursor-pointer"><ChevronLeft size={16} /></button>
            <span className="text-xs font-bold px-2">May 19 – 25, 2025</span>
            <button className="p-1 hover:bg-neutral-100 rounded-lg text-neutral-600 cursor-pointer"><ChevronRight size={16} /></button>
          </div>
          <button onClick={onOpenNewCampaign} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm cursor-pointer">
            <Plus size={15} /><span>Schedule Campaign</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
        {days.map((d, i) => (
          <div key={i} className="bg-white rounded-2xl p-3.5 border border-neutral-200/80 shadow-2xs min-h-[380px] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="text-xs font-bold text-neutral-900 pb-2 mb-1 border-b border-neutral-100 flex items-center justify-between">
                <span>{d.name}, {d.date}</span>
                {d.isToday && <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" title="Today" />}
              </div>

              {/* Dynamic items from campaigns & content */}
              {campaigns.slice(i * 1, i * 1 + 1).map((c) => (
                <div key={c.id} className="bg-purple-50/80 border border-purple-200/80 rounded-xl p-2.5 text-xs text-neutral-900 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-bold text-purple-700">{c.channels.slice(0, 2).join(' • ')}</span>
                    <span className="text-[9px] bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded">{c.status}</span>
                  </div>
                  <p className="font-bold text-[11px] text-neutral-950 leading-tight">{c.title}</p>
                  <span className="text-[9.5px] text-neutral-500 block">{c.date.split('•')[0]}</span>
                </div>
              ))}

              {contentList.slice(i * 1, i * 1 + 1).map((item) => (
                <div key={item.id} className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-2.5 text-xs text-neutral-900 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[9.5px] font-bold text-emerald-700">{item.platform}</span>
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">Asset</span>
                  </div>
                  <p className="font-bold text-[11px] text-neutral-950 leading-tight">{item.title}</p>
                </div>
              ))}
            </div>

            <button onClick={onOpenNewCampaign} className="w-full text-center py-1.5 text-[11px] text-neutral-400 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition border border-dashed border-neutral-200 cursor-pointer">
              + Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
