import React, { useState, useRef } from 'react';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  MessageSquare, 
  Layers,
  Bot, 
  GitFork, 
  Radio, 
  Hash, 
  Zap, 
  Activity, 
  Gauge, 
  Plug, 
  ShieldCheck, 
  Users, 
  CreditCard, 
  Bell, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Check, 
  Settings, 
  LogOut, 
  Building2,
  Trash2,
  Clock,
  ChevronRight,
  Code2,
  BarChart3
} from 'lucide-react';

import { useMarketing } from '../../context/MarketingContext';

// Official Calvras Image Logo
export const BrandBurstLogo = ({ size = 20, className = "" }) => (
  <img 
    src="/calvras.png" 
    alt="Calvras" 
    className={`shrink-0 object-contain rounded-md select-none ${className}`}
    style={{ width: size, height: size }}
    loading="eager"
  />
);

export const CySidebar = ({ 
  activeTab, 
  onSelectTab, 
  onSelectThread,
  onNewChat, 
  onSignOut, 
  threadTitle,
  userProfile = { name: 'SHIKARI Ogar', email: 'zenithzone18@gmail.com' },
  isCollapsed = false,
  onToggleCollapse
}) => {
  const { credits, chatThreads, activeThreadId, deleteThread } = useMarketing();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isRecentHovered, setIsRecentHovered] = useState(false);
  const hoverTimeoutRef = useRef(null);

  const handleMouseEnterRecent = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsRecentHovered(true);
  };

  const handleMouseLeaveRecent = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsRecentHovered(false);
    }, 250);
  };

  const navItems = [
    { id: 'threads', label: 'Chat', icon: MessageSquare },
    { id: 'recent', label: 'Recent Chats', icon: Clock, isRecentFlyout: true },
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'contents', label: 'Contents', icon: Layers },
    { id: 'agents', label: 'Agents', icon: Bot },
    { id: 'flows', label: 'Flows', icon: GitFork },
    { id: 'signals', label: 'Signals', icon: Radio },
    { id: 'artifacts', label: 'Artifacts', icon: Hash },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'runs', label: 'Runs', icon: Activity },
    { id: 'usage', label: 'Usage', icon: Gauge },
  ];

  const adminItems = [
    { id: 'connectors', label: 'Connectors', icon: Plug },
    { id: 'permissions', label: 'Permissions', icon: ShieldCheck },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  // Collapsed Rail View
  if (isCollapsed) {
    return (
      <aside className="w-14 bg-white border-r border-[#e5e5e7] flex flex-col justify-between h-screen shrink-0 text-left select-none text-[13px] font-sans antialiased py-3 items-center transition-all duration-300 relative z-30 overflow-visible">
        
        {/* Top Logo & Expand Button */}
        <div className="space-y-4 flex flex-col items-center">
          <div className="cursor-pointer p-1 rounded-lg hover:bg-purple-50 transition" onClick={() => onSelectTab('overview')} title="Calvras">
            <BrandBurstLogo size={22} />
          </div>

          <button 
            onClick={onToggleCollapse} 
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
            title="Expand Sidebar"
          >
            <PanelLeftOpen size={16} />
          </button>

          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-lg transition cursor-pointer relative"
            title="Notifications"
          >
            <Bell size={15} />
          </button>

          <button
            onClick={onNewChat}
            className="p-2 bg-white border border-[#e5e5e7] hover:bg-neutral-100 rounded-xl text-neutral-800 transition cursor-pointer shadow-2xs"
            title="New Chat"
          >
            <Plus size={15} />
          </button>

          <div className="w-6 h-px bg-[#ebebec]" />

          {/* Collapsed Nav Stack with Hover Flyout on Recent Chats */}
          <div className="space-y-1.5 flex flex-col items-center relative overflow-visible">
            
            {/* Chat Icon */}
            <button
              onClick={() => onSelectTab('threads')}
              className={`p-2 rounded-xl transition cursor-pointer ${
                activeTab === 'threads' 
                  ? 'bg-[#efeff1] text-neutral-900 shadow-2xs font-semibold' 
                  : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
              title="Chat"
            >
              <MessageSquare size={16} />
            </button>

            {/* Recent Chats Icon with Hover Flyout Dropout on Right */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnterRecent}
              onMouseLeave={handleMouseLeaveRecent}
            >
              <button
                onClick={() => onSelectTab('threads')}
                className={`p-2 rounded-xl transition cursor-pointer ${
                  isRecentHovered
                    ? 'bg-[#efeff1] text-neutral-900 shadow-2xs font-semibold' 
                    : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
                title="Recent Chats"
              >
                <Clock size={16} />
              </button>

              {/* Flyout Dropout to the Right */}
              {isRecentHovered && (
                <div 
                  className="absolute left-full top-0 ml-2 w-64 bg-white border border-[#e5e5e7] rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-left-2 duration-150 space-y-1.5"
                  onMouseEnter={handleMouseEnterRecent}
                  onMouseLeave={handleMouseLeaveRecent}
                >
                  <div className="absolute -left-3 top-0 bottom-0 w-3" />
                  
                  <div className="flex items-center justify-between px-2 py-1 border-b border-neutral-100 pb-1.5">
                    <span className="text-[11px] font-bold text-neutral-900">Recent Chats</span>
                    <button 
                      onClick={onNewChat}
                      className="text-[10px] text-purple-600 hover:text-purple-800 font-semibold cursor-pointer"
                    >
                      + New
                    </button>
                  </div>

                  <div className="space-y-0.5 max-h-56 overflow-y-auto scrollbar-thin">
                    {chatThreads && chatThreads.length > 0 ? (
                      chatThreads.map((t) => {
                        const isCurrent = activeThreadId === t.id && activeTab === 'threads';
                        return (
                          <div 
                            key={t.id}
                            className={`group flex items-center justify-between px-2 py-1.5 rounded-xl text-xs transition cursor-pointer ${
                              isCurrent 
                                ? 'bg-[#efeff1] text-neutral-950 font-semibold shadow-2xs' 
                                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                            }`}
                            onClick={() => {
                              if (onSelectThread) onSelectThread(t.id);
                              else onSelectTab('threads');
                              setIsRecentHovered(false);
                            }}
                          >
                            <div className="flex items-center gap-2 truncate mr-1">
                              <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCurrent ? 'bg-neutral-950' : 'bg-neutral-400'}`} />
                              <span className="truncate">{t.title}</span>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                deleteThread(t.id, e);
                              }}
                              className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-600 hover:bg-neutral-200/70 rounded-md transition cursor-pointer shrink-0"
                              title="Delete chat"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        );
                      })
                    ) : (
                      <div className="py-4 px-2 text-center text-xs text-neutral-400">
                        No recent chats
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Other Nav Items */}
            {navItems.slice(2, 6).map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`p-2 rounded-xl transition cursor-pointer ${
                    isActive 
                      ? 'bg-[#efeff1] text-neutral-900 shadow-2xs font-semibold' 
                      : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900'
                  }`}
                  title={item.label}
                >
                  <Icon size={16} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Collapsed Bottom User Profile Avatar */}
        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="cursor-pointer p-1 rounded-xl hover:bg-neutral-100 transition"
          title={userProfile?.name}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xs font-semibold overflow-hidden shadow-2xs">
            {userProfile?.picture ? (
              <img 
                src={userProfile.picture} 
                referrerPolicy="no-referrer"
                alt={userProfile?.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <span>{(userProfile?.name || 'U').charAt(0).toUpperCase()}</span>
            )}
          </div>
        </div>

      </aside>
    );
  }

  // Expanded Sidebar View
  return (
    <aside className="w-60 bg-white border-r border-[#e5e5e7] flex flex-col justify-between h-screen shrink-0 text-left select-none text-[13px] font-sans antialiased relative transition-all duration-300 z-40 overflow-visible">
      
      {/* Top Section */}
      <div className="p-3 space-y-2 flex-1 overflow-visible">
        
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 py-1.5 mb-1">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onSelectTab('overview')}>
            <BrandBurstLogo size={20} className="group-hover:rotate-45 transition duration-300" />
            <span className="font-serif font-bold text-neutral-950 text-base tracking-tight">
              Calvras
            </span>
          </div>

          <div className="flex items-center gap-1 text-neutral-400">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition cursor-pointer relative" 
              title="Notifications"
            >
              <Bell size={14} />
            </button>
            <button 
              onClick={onToggleCollapse} 
              className="p-1 hover:text-neutral-700 hover:bg-neutral-100 rounded-md transition cursor-pointer" 
              title="Collapse Sidebar"
            >
              <PanelLeftClose size={14} />
            </button>
          </div>
        </div>

        {/* Notifications Dropdown Modal */}
        {showNotifications && (
          <div className="absolute top-12 left-3 right-3 bg-white border border-[#e5e5e7] rounded-2xl shadow-xl p-5 z-50 text-left space-y-4 animate-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-neutral-950">Notifications</h3>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-neutral-400 hover:text-neutral-700 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
              <div className="w-10 h-10 rounded-full bg-neutral-50 border border-neutral-100 flex items-center justify-center text-neutral-400 relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 text-[9px] font-bold text-neutral-400">zZ</span>
              </div>
              <h4 className="text-xs font-bold text-neutral-900">You're all caught up</h4>
              <p className="text-[11px] text-neutral-400 max-w-[180px]">
                Requests and updates land here.
              </p>
            </div>
          </div>
        )}

        {/* New Chat Button */}
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-1.5 bg-white border border-[#e5e5e7] hover:bg-neutral-50 text-neutral-800 font-medium py-1.5 px-3 rounded-xl transition shadow-2xs cursor-pointer text-xs"
        >
          <Plus size={14} className="text-neutral-600" />
          <span>New Chat</span>
        </button>

        {/* Search Bar */}
        <div className="flex items-center justify-between px-2.5 py-1.5 text-neutral-400 border border-transparent hover:border-[#e5e5e7] rounded-xl cursor-pointer transition">
          <div className="flex items-center gap-2">
            <Search size={13} />
            <span className="text-xs text-neutral-500 font-normal">Search</span>
          </div>
          <span className="text-[10px] bg-neutral-100 text-neutral-500 px-1.5 py-0.5 rounded font-medium">Ctrl K</span>
        </div>

        {/* Unified Main Navigation Menu */}
        <div className="space-y-0.5 pt-1 overflow-visible">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            // Special Case: "Recent Chats" row with Hover Dropout Flyout to the Right
            if (item.isRecentFlyout) {
              return (
                <div 
                  key={item.id} 
                  className="relative overflow-visible"
                  onMouseEnter={handleMouseEnterRecent}
                  onMouseLeave={handleMouseLeaveRecent}
                >
                  <button
                    onClick={() => onSelectTab('threads')}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                      isRecentHovered
                        ? 'bg-[#efeff1] text-neutral-950 font-semibold shadow-2xs' 
                        : 'text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon size={14} className={isRecentHovered ? 'text-neutral-900' : 'text-neutral-500'} />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight size={12} className="text-neutral-400 opacity-60" />
                  </button>

                  {/* Dropout Flyout Card to the Right of Sidebar on Hover (Unclipped & Elevated) */}
                  {isRecentHovered && (
                    <div 
                      className="absolute left-full top-0 ml-2 w-64 bg-white border border-[#e5e5e7] rounded-2xl shadow-2xl p-2.5 z-50 animate-in fade-in slide-in-from-left-2 duration-150 space-y-1.5"
                      onMouseEnter={handleMouseEnterRecent}
                      onMouseLeave={handleMouseLeaveRecent}
                    >
                      <div className="absolute -left-3 top-0 bottom-0 w-3" />

                      <div className="flex items-center justify-between px-2 py-1 border-b border-neutral-100 pb-1.5">
                        <span className="text-[11px] font-bold text-neutral-900">Recent Chats</span>
                        <button 
                          onClick={onNewChat}
                          className="text-[10px] text-purple-600 hover:text-purple-800 font-semibold cursor-pointer"
                        >
                          + New
                        </button>
                      </div>

                      <div className="space-y-0.5 max-h-56 overflow-y-auto scrollbar-thin">
                        {chatThreads && chatThreads.length > 0 ? (
                          chatThreads.map((t) => {
                            const isCurrent = activeThreadId === t.id && activeTab === 'threads';
                            return (
                              <div 
                                key={t.id}
                                className={`group flex items-center justify-between px-2 py-1.5 rounded-xl text-xs transition cursor-pointer ${
                                  isCurrent 
                                  ? 'bg-[#efeff1] text-neutral-950 font-semibold shadow-2xs' 
                                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                                }`}
                                onClick={() => {
                                  if (onSelectThread) onSelectThread(t.id);
                                  else onSelectTab('threads');
                                  setIsRecentHovered(false);
                                }}
                              >
                                <div className="flex items-center gap-2 truncate mr-1">
                                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${isCurrent ? 'bg-neutral-950' : 'bg-neutral-400'}`} />
                                  <span className="truncate">{t.title}</span>
                                </div>

                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    deleteThread(t.id, e);
                                  }}
                                  className="opacity-0 group-hover:opacity-100 p-1 text-neutral-400 hover:text-rose-600 hover:bg-neutral-200/70 rounded-md transition cursor-pointer shrink-0"
                                  title="Delete chat"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            );
                          })
                        ) : (
                          <div className="py-4 px-2 text-center text-xs text-neutral-400">
                            No recent chats
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Normal Uniform Nav Row Item
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isActive 
                    ? 'bg-[#efeff1] text-neutral-950 font-semibold shadow-2xs' 
                    : 'text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-neutral-900' : 'text-neutral-500'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="h-px bg-[#ebebec] my-2" />

        {/* Admin Menu Items */}
        <div className="space-y-0.5">
          {adminItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                  isActive 
                    ? 'bg-[#efeff1] text-neutral-950 font-semibold shadow-2xs' 
                    : 'text-neutral-600 hover:bg-neutral-100/70 hover:text-neutral-900'
                }`}
              >
                <Icon size={14} className={isActive ? 'text-neutral-900' : 'text-neutral-500'} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Bottom User & Credits Section */}
      <div className="p-3 border-t border-[#e5e5e7] space-y-2.5 bg-white relative">
        
        {/* Credits Remaining */}
        <div className="px-1 flex items-center justify-between text-[11px]">
          <span className="text-neutral-500">Credits remaining</span>
          <span className="text-neutral-900 font-bold">{credits?.remaining ?? 100} credits</span>
        </div>

        {/* Upgrade Plan Button */}
        <button 
          onClick={() => onSelectTab('billing')}
          className="w-full bg-[#17171a] hover:bg-neutral-800 text-white text-xs font-medium py-2 rounded-xl transition cursor-pointer shadow-xs"
        >
          Upgrade Plan
        </button>

        {/* User Profile Bar */}
        <div 
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-2.5 pt-1 px-1 p-1 rounded-xl hover:bg-neutral-50 transition cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center text-xs font-semibold shrink-0 overflow-hidden shadow-2xs">
            {userProfile?.picture ? (
              <img 
                src={userProfile.picture} 
                referrerPolicy="no-referrer"
                alt={userProfile?.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            ) : (
              <span>{(userProfile?.name || 'U').charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-xs font-semibold text-neutral-900 block truncate leading-tight">{userProfile.name}</span>
            <span className="text-[10px] text-neutral-400 block truncate">{userProfile.email}</span>
          </div>
        </div>

        {/* Profile Popup Menu */}
        {showProfileMenu && (
          <div className="absolute bottom-16 left-3 right-3 bg-white border border-[#e5e5e7] rounded-2xl shadow-xl p-2 z-50 text-xs space-y-2 animate-in slide-in-from-bottom-2 duration-150">
            <div className="px-2 py-1 border-b border-neutral-100 pb-2">
              <span className="font-bold text-neutral-900 block">{userProfile.name}</span>
              <span className="text-[10px] text-neutral-400 block">{userProfile.email}</span>
            </div>

            <button 
              onClick={() => {
                onSelectTab('billing');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 text-neutral-700 transition cursor-pointer text-left"
            >
              <Settings size={13} />
              <span>Workspace Settings</span>
            </button>

            <button 
              onClick={() => {
                onSelectTab('team');
                setShowProfileMenu(false);
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-neutral-100 text-neutral-700 transition cursor-pointer text-left"
            >
              <Building2 size={13} />
              <span>Organization</span>
            </button>

            <div className="h-px bg-neutral-100 my-1" />

            <button 
              onClick={() => {
                setShowProfileMenu(false);
                onSignOut();
              }}
              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-rose-50 text-rose-600 transition cursor-pointer text-left"
            >
              <LogOut size={13} />
              <span>Sign Out</span>
            </button>
          </div>
        )}

      </div>

    </aside>
  );
};
