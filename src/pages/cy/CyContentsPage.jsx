import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Copy, 
  Check, 
  Clock, 
  Calendar, 
  Layers, 
  ExternalLink, 
  Trash2, 
  CheckCircle2, 
  Sparkles, 
  Video 
} from 'lucide-react';
import { useMarketing } from '../../context/MarketingContext';
import confetti from 'canvas-confetti';

const ChannelIcons = {
  Instagram: () => (
    <span className="text-[10px] font-bold text-pink-600 bg-pink-50 border border-pink-100 px-2 py-0.5 rounded-full flex items-center gap-1">
      <span>📸</span> Instagram
    </span>
  ),
  TikTok: () => (
    <span className="text-[10px] font-bold text-white bg-neutral-100 border border-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
      <span>🎵</span> TikTok
    </span>
  ),
  WhatsApp: () => (
    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
      <span>💬</span> WhatsApp
    </span>
  ),
  Website: () => (
    <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
      <span>🌐</span> Website
    </span>
  ),
  Facebook: () => (
    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1">
      <span>👥</span> Facebook
    </span>
  )
};

export const CyContentsPage = ({ onNewChat }) => {
  const { contentList, toggleContentStatus, deleteContent } = useMarketing();
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const filterTabs = ['All', 'Scheduled', 'Posted', 'Instagram', 'TikTok', 'WhatsApp', 'Website'];

  const filteredItems = useMemo(() => {
    return contentList.filter(item => {
      const matchesSearch = (item.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (item.caption || '').toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (activeFilter === 'All') return true;
      if (activeFilter === 'Scheduled') return item.status === 'Scheduled';
      if (activeFilter === 'Posted') return item.status === 'Posted';
      if (item.channel === activeFilter) return true;
      return true;
    });
  }, [contentList, activeFilter, searchQuery]);

  const handleCopyCaption = (id, caption) => {
    navigator.clipboard.writeText(caption);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleTogglePosted = (id) => {
    toggleContentStatus(id);
    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } catch (e) {}
  };

  return (
    <div className="flex-1 min-h-screen bg-[#1c1c1c] text-[#f4f4ee] p-6 sm:p-10 font-sans antialiased text-white select-none text-left overflow-y-auto">
      <div className="max-w-6xl mx-auto space-y-8 pt-4 sm:pt-6">
        
        {/* Header Title with Action Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-5">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
              Contents & Publishing Hub
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-normal">
              Your autonomous campaign schedule, multi-channel creatives, and one-click publishing studio.
            </p>
          </div>

          <button
            onClick={onNewChat}
            className="text-xs font-semibold bg-neutral-950 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs inline-flex items-center gap-1.5 shrink-0 self-start sm:self-auto active:scale-95"
          >
            <Plus size={14} />
            <span>Create Campaign</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-xl transition cursor-pointer shrink-0 ${
                  activeFilter === tab
                    ? 'bg-neutral-900 text-white shadow-2xs'
                    : 'text-neutral-600 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search captions & products..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl bg-[#282828] border border-white/10 focus:outline-none focus:border-neutral-900 transition"
            />
          </div>
        </div>

        {/* Content Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => {
              const ChannelBadge = ChannelIcons[item.channel] || ChannelIcons.Website;
              const isPosted = item.status === 'Posted';

              return (
                <div
                  key={item.id}
                  className="bg-[#282828] border border-white/10 hover:border-neutral-400 rounded-3xl overflow-hidden shadow-2xs transition flex flex-col justify-between group"
                >
                  <div>
                    {/* Media Thumbnail */}
                    <div className="h-44 w-full relative bg-neutral-100 overflow-hidden">
                      <img
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition duration-300"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80';
                        }}
                      />
                      <div className="absolute top-3 left-3">
                        <ChannelBadge />
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div className="p-4 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">
                          {item.format || 'Social Post'}
                        </span>
                        <h3 className="text-xs font-bold text-white mt-0.5 line-clamp-1">
                          {item.title}
                        </h3>
                      </div>

                      {/* Scheduled Time Banner */}
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-purple-700 bg-purple-50/70 border border-purple-100/80 px-2.5 py-1 rounded-xl">
                        <Clock size={12} />
                        <span>{item.scheduledTime || 'Scheduled for Peak Hour'}</span>
                      </div>

                      {/* Caption Box */}
                      <div className="p-3 bg-[#fafafc] border border-white/10/60 rounded-2xl text-xs text-neutral-700 leading-relaxed max-h-24 overflow-y-auto whitespace-pre-line">
                        {item.caption}
                      </div>

                      {/* Video Hook & Script if available */}
                      {item.videoHook && (
                        <div className="p-2.5 bg-amber-50/50 border border-amber-200/50 rounded-xl text-[11px] text-amber-900 space-y-0.5">
                          <span className="font-bold block flex items-center gap-1">
                            <Video size={11} />
                            <span>3s Video Hook</span>
                          </span>
                          <p className="italic">"{item.videoHook}"</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Actions */}
                  <div className="p-3 border-t border-white/5 flex items-center justify-between bg-[#282828]">
                    <button
                      onClick={() => handleCopyCaption(item.id, item.caption)}
                      className="text-xs font-semibold text-neutral-700 hover:text-white flex items-center gap-1 cursor-pointer transition"
                    >
                      {copiedId === item.id ? (
                        <>
                          <Check size={13} className="text-emerald-600" />
                          <span className="text-emerald-600">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Caption</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleTogglePosted(item.id)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1 ${
                          isPosted
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-neutral-900 hover:bg-neutral-800 text-white shadow-2xs'
                        }`}
                      >
                        {isPosted ? (
                          <>
                            <CheckCircle2 size={12} />
                            <span>Posted ✓</span>
                          </>
                        ) : (
                          <span>Mark as Posted</span>
                        )}
                      </button>

                      <button
                        onClick={() => deleteContent(item.id)}
                        className="text-neutral-400 hover:text-red-600 p-1 transition cursor-pointer"
                        title="Delete asset"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* Clean Empty State */
          <div className="bg-[#282828] border border-white/10 rounded-3xl p-12 sm:p-16 shadow-2xs flex flex-col items-center justify-center text-center space-y-3 min-h-[320px]">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-1">
              <Sparkles size={24} />
            </div>
            
            <h3 className="text-sm font-semibold text-white">
              No content published yet
            </h3>

            <p className="text-xs text-neutral-400 max-w-md leading-relaxed">
              Start a project in <strong>Chat</strong> and ask the AI to generate a complete multi-channel campaign suite. The generated captions and posting schedule will land here automatically.
            </p>

            <button
              onClick={onNewChat}
              className="mt-2 text-xs font-semibold bg-neutral-950 hover:bg-neutral-800 text-white px-4 py-2 rounded-xl transition cursor-pointer shadow-xs inline-flex items-center gap-1.5"
            >
              <Plus size={13} />
              <span>Create Campaign</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
