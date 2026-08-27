import React from 'react';
import { 
  Home, 
  Search, 
  GitBranch, 
  LayoutGrid, 
  Star, 
  User, 
  Mail
} from 'lucide-react';

export default function SlimSidebar({ activeTab, setActiveTab, onNewChat, onOpenTools }) {
  return (
    <aside className="relative flex flex-col items-center justify-between w-[52px] h-screen bg-[#0e0e12] border-r border-[#1a1a22] py-3.5 z-30 select-none">
      {/* Top Section: Lovable Brand Logo + Navigation */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Brand Logo matching Lovable */}
        <button 
          onClick={onNewChat}
          className="relative w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 via-rose-500 to-pink-600 flex items-center justify-center shadow-md shadow-rose-500/30 hover:scale-105 transition-transform overflow-hidden"
          title="Lovable Dashboard"
        >
          <div className="w-3.5 h-3.5 bg-[#db2777] rounded-sm flex items-center justify-center text-[10px] font-black text-white">
            b
          </div>
        </button>

        {/* Navigation Icon List */}
        <div className="flex flex-col items-center gap-2 w-full px-1.5 mt-2">
          {/* Home (Active Box) */}
          <button
            onClick={() => setActiveTab('home')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'home' 
                ? 'bg-[#22222a] text-white shadow' 
                : 'text-neutral-400 hover:text-white hover:bg-[#1a1a22]'
            }`}
            title="Home"
          >
            <Home size={16} />
          </button>

          {/* Search */}
          <button
            onClick={() => setActiveTab('search')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'search' 
                ? 'bg-[#22222a] text-white' 
                : 'text-neutral-400 hover:text-white hover:bg-[#1a1a22]'
            }`}
            title="Search"
          >
            <Search size={16} />
          </button>

          {/* Branches */}
          <button
            onClick={() => setActiveTab('branches')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'branches' 
                ? 'bg-[#22222a] text-white' 
                : 'text-neutral-400 hover:text-white hover:bg-[#1a1a22]'
            }`}
            title="Branches"
          >
            <GitBranch size={16} />
          </button>

          {/* Grid */}
          <button
            onClick={() => setActiveTab('templates')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'templates' 
                ? 'bg-[#22222a] text-white' 
                : 'text-neutral-400 hover:text-white hover:bg-[#1a1a22]'
            }`}
            title="Templates"
          >
            <LayoutGrid size={16} />
          </button>

          {/* Starred */}
          <button
            onClick={() => setActiveTab('starred')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'starred' 
                ? 'bg-[#22222a] text-white' 
                : 'text-neutral-400 hover:text-white hover:bg-[#1a1a22]'
            }`}
            title="Favorites"
          >
            <Star size={16} />
          </button>

          {/* Profile */}
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
              activeTab === 'profile' 
                ? 'bg-[#22222a] text-white' 
                : 'text-neutral-400 hover:text-white hover:bg-[#1a1a22]'
            }`}
            title="Profile"
          >
            <User size={16} />
          </button>
        </div>
      </div>

      {/* Bottom Section: User Avatar with Red Indicator + Mail Icon */}
      <div className="flex flex-col items-center gap-3 w-full px-1.5">
        {/* User avatar with small red dot indicator */}
        <div className="relative cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-[#2a2a35] border border-white/10 flex items-center justify-center text-[10px] font-bold text-neutral-300">
            D
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 border border-[#0e0e12]" />
        </div>

        {/* Mail / Feedback Icon */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#1a1a22] transition-colors"
          title="Messages & Feedback"
        >
          <Mail size={16} />
        </button>
      </div>
    </aside>
  );
}
