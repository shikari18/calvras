export function generateFullArchitectureApp(topic = 'Modern Application') {
  const queryStr = String(topic || '').toLowerCase();

  // 1. Dribbble / Design Inspiration Gallery / Dark Background / Image Card Grid
  if (/dribbble|gallery|inspiration|dark background|portfolio|card|shots|designers|numbers|image/i.test(queryStr)) {
    return generateDribbbleGalleryApp();
  }

  // 2. Perplexity / AI Search & Research Engine UI
  if (/perplexity|search|what do you want to know|ask|query|research|engine|browser|finder/i.test(queryStr)) {
    return generatePerplexityApp();
  }

  // 3. Analytics & Management Dashboard UI
  if (/dashboard|analytics|admin|crm|metrics|stat|finance|crypto|sales/i.test(queryStr)) {
    return generateDashboardApp();
  }

  // 4. Default High-End Application Studio UI (Audio / Catalog)
  return generateDefaultStudioApp();
}

function generateDribbbleGalleryApp() {
  return {
    'Calvras/src/App.tsx': `import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  Eye, 
  Bookmark, 
  Share2, 
  MessageSquare, 
  Bell, 
  ChevronDown, 
  Filter, 
  Sparkles, 
  Menu, 
  X,
  ArrowUpRight
} from 'lucide-react';

interface CardItem {
  id: number;
  title: string;
  author: string;
  badge: 'PRO' | 'Ad' | 'Team';
  likes: number;
  views: string;
  category: string;
  image: string;
  avatar: string;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [likedCards, setLikedCards] = useState<Record<number, boolean>>({});
  const [savedCards, setSavedCards] = useState<Record<number, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categories = [
    'All', 
    'Animation', 
    'Branding', 
    'Illustration', 
    'Mobile', 
    'Print', 
    'Product Design', 
    'Typography', 
    'Web Design'
  ];

  const initialCards: CardItem[] = [
    {
      id: 1,
      title: 'Baseball Dynamic Illustrated Action',
      author: 'Orbix Studio LLC',
      badge: 'PRO',
      likes: 138,
      views: '10.2k',
      category: 'Illustration',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=800&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 2,
      title: '{ Code Smarter } Dark Multi-Device Mockup',
      author: 'Nizam',
      badge: 'PRO',
      likes: 186,
      views: '10.2k',
      category: 'Mobile',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 3,
      title: 'The professional canvas with built-in agents',
      author: 'Framer',
      badge: 'Ad',
      likes: 420,
      views: '15.1k',
      category: 'Web Design',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 4,
      title: 'Iridescent 3D Cosmic Glow Sphere',
      author: 'Tridimensi',
      badge: 'PRO',
      likes: 50,
      views: '9.0k',
      category: 'Product Design',
      image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      title: 'NRC Running Companion Mobile Experience',
      author: 'Nike Digital',
      badge: 'PRO',
      likes: 240,
      views: '12.4k',
      category: 'Mobile',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      title: 'Global Currency & Financial Flow Architecture',
      author: 'Apex Wealth',
      badge: 'PRO',
      likes: 95,
      views: '8.1k',
      category: 'Branding',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 7,
      title: 'Design intelligent systems that move, adapt, and scale',
      author: 'Aura UI',
      badge: 'PRO',
      likes: 310,
      views: '14.5k',
      category: 'Web Design',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
    },
    {
      id: 8,
      title: 'Artisanal Ice Cream & Seaside Lighthouse Scene',
      author: 'VectorCraft',
      badge: 'PRO',
      likes: 162,
      views: '7.9k',
      category: 'Illustration',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80'
    }
  ];

  const toggleLike = (id: number) => {
    setLikedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id: number) => {
    setSavedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredCards = initialCards.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          c.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#0d0d12] text-white font-sans antialiased selection:bg-rose-500 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d0d12]/95 backdrop-blur-md border-b border-neutral-800/80 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Dribbble Logo */}
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-2xl font-serif italic font-extrabold tracking-tight text-white">
              Dribbble
            </span>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-full px-4 py-2 w-80 text-xs text-neutral-200">
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search dark background..."
              className="bg-transparent border-none outline-none flex-1 placeholder-neutral-500 text-xs text-white"
            />
            <div className="flex items-center gap-2 pl-2 border-l border-neutral-700 text-neutral-400">
              <span className="font-medium text-[11px]">Shots</span>
              <ChevronDown size={12} />
              <button className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors">
                <Search size={11} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-neutral-400">
            <a href="#explore" className="hover:text-white transition-colors flex items-center gap-1">
              Explore <ChevronDown size={11} />
            </a>
            <a href="#hire" className="hover:text-white transition-colors flex items-center gap-1">
              Hire Talent <ChevronDown size={11} />
            </a>
            <a href="#jobs" className="hover:text-white transition-colors flex items-center gap-1">
              Get Hired <ChevronDown size={11} />
            </a>
            <a href="#community" className="hover:text-white transition-colors flex items-center gap-1">
              Community <ChevronDown size={11} />
            </a>
          </nav>
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          <button className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-700 hover:border-neutral-600 text-xs font-semibold text-neutral-200 transition-colors">
            Start Project Brief
          </button>
          <button className="p-2 text-neutral-400 hover:text-white transition-colors hidden sm:block">
            <MessageSquare size={16} />
          </button>
          <button className="p-2 text-neutral-400 hover:text-white transition-colors hidden sm:block">
            <Bell size={16} />
          </button>
          <div className="relative cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" 
              alt="User profile" 
              className="w-8 h-8 rounded-full object-cover ring-1 ring-neutral-700"
            />
            <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#0d0d12]" />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-white md:hidden"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-[#121217] p-4 space-y-3 animate-in slide-in-from-top-2">
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 text-xs">
            <Search size={14} className="text-neutral-400 mr-2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search shots..."
              className="bg-transparent border-none outline-none flex-1 text-xs text-white"
            />
          </div>
          <div className="flex flex-col space-y-2 text-sm font-semibold text-neutral-300 pt-2">
            <a href="#explore">Explore</a>
            <a href="#hire">Hire Talent</a>
            <a href="#jobs">Get Hired</a>
            <a href="#community">Community</a>
          </div>
        </div>
      )}

      {/* Main Inspiration Hero */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-14">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
            Dark Background
          </h1>
          <p className="text-xs md:text-sm text-neutral-400 font-normal leading-relaxed">
            487 inspirational dark mode designs, user interfaces, and mobile screens from the world's best designers.
          </p>
        </div>

        {/* Categories / Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={` + '`' + `whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer \${
                activeCategory === cat
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }` + '`' + `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Design Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCards.map((card) => {
            const isLiked = likedCards[card.id];
            const isSaved = savedCards[card.id];

            return (
              <div 
                key={card.id}
                className="group flex flex-col space-y-3 cursor-pointer"
              >
                {/* Card Visual Image Container */}
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800/80 shadow-sm group-hover:shadow-xl group-hover:border-neutral-700 transition-all duration-300">
                  <img 
                    src={card.image} 
                    alt={card.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 pointer-events-none">
                    <div className="flex justify-end pointer-events-auto">
                      <button 
                        onClick={(e) => { e.stopPropagation(); toggleSave(card.id); }}
                        className="p-2 rounded-full bg-neutral-800/90 hover:bg-neutral-700 text-white shadow-md transition-transform active:scale-95"
                      >
                        <Bookmark size={14} className={isSaved ? 'fill-white' : ''} />
                      </button>
                    </div>

                    <div className="text-white space-y-1">
                      <h3 className="text-sm font-bold line-clamp-1">{card.title}</h3>
                      <p className="text-[11px] text-neutral-400">{card.category}</p>
                    </div>
                  </div>
                </div>

                {/* Author & Metrics Row */}
                <div className="flex items-center justify-between text-xs px-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <img 
                      src={card.avatar} 
                      alt={card.author} 
                      className="w-6 h-6 rounded-full object-cover ring-1 ring-neutral-800"
                    />
                    <span className="font-bold text-neutral-200 truncate text-[12px]">{card.author}</span>
                    <span className={` + '`' + `text-[9px] font-extrabold px-1.5 py-0.5 rounded tracking-wider uppercase \${
                      card.badge === 'PRO' ? 'bg-neutral-800 text-neutral-300 border border-neutral-700' : 'bg-neutral-800/60 text-neutral-400'
                    }` + '`' + `}>
                      {card.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-neutral-400 font-medium text-[11px]">
                    <button 
                      onClick={() => toggleLike(card.id)}
                      className="flex items-center gap-1 hover:text-rose-500 transition-colors"
                    >
                      <Heart 
                        size={13} 
                        className={` + '`' + `transition-colors \${isLiked ? 'fill-rose-500 text-rose-500' : ''}` + '`' + `} 
                      />
                      <span>{card.likes + (isLiked ? 1 : 0)}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <Eye size={13} />
                      <span>{card.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCards.length === 0 && (
          <div className="py-20 text-center space-y-2">
            <p className="text-base font-semibold text-white">No design shots found matching "{searchQuery}"</p>
            <p className="text-xs text-neutral-400">Try searching for different keywords or clear the category filter.</p>
          </div>
        )}
      </main>
    </div>
  );
}`,
    'Calvras/src/lib/db.ts': `export const sampleDribbbleShots = [
  { id: 1, title: 'Baseball Illustration', author: 'Orbix Studio LLC', likes: 138 },
  { id: 2, title: 'Code Smarter Mockup', author: 'Nizam', likes: 186 }
];`,
    'Calvras/server/api.js': `import express from 'express';
const router = express.Router();
router.get('/api/shots', (req, res) => res.json({ status: 'ok', count: 8 }));
export default router;`
  };
}

function generatePerplexityApp() {
  return {
    'Calvras/src/App.tsx': `import React, { useState } from 'react';
import { 
  Search, 
  Sparkles, 
  Compass, 
  Library, 
  Plus, 
  ArrowRight, 
  Globe, 
  Cpu, 
  BookOpen, 
  Share2, 
  Copy, 
  Check, 
  ExternalLink,
  ChevronDown,
  RotateCcw,
  SlidersHorizontal,
  ArrowUp,
  MessageSquare,
  Settings,
  Clock,
  Bell,
  Monitor,
  Mic,
  AudioLines,
  Download,
  Menu,
  LayoutGrid
} from 'lucide-react';

interface SearchResult {
  query: string;
  sources: { title: string; domain: string; url: string }[];
  summary: string;
  keyPoints: string[];
}

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [query, setQuery] = useState('');
  const [focus, setFocus] = useState('Search');
  const [showFocusMenu, setShowFocusMenu] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Sonar');
  const [showModelMenu, setShowModelMenu] = useState(false);
  const [activeResult, setActiveResult] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [copied, setCopied] = useState(false);

  const focusOptions = ['Search', 'Academic', 'Writing', 'YouTube', 'Reddit', 'Finance'];
  const modelOptions = ['Sonar', 'Claude 3.7', 'GPT-4o', 'DeepSeek R1', 'o3-mini'];

  const handleSearch = (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setActiveResult({
        query: q,
        sources: [
          { title: 'Deep Dive Architecture & Modern Implementations', domain: 'nature.com', url: '#' },
          { title: 'State of Technology & Industry Analysis 2026', domain: 'github.com', url: '#' },
          { title: 'Autonomous Systems & Scalable Systems Overview', domain: 'arxiv.org', url: '#' },
          { title: 'Practical Engineering Guide & Benchmark Results', domain: 'techcrunch.com', url: '#' }
        ],
        summary: \`Here is a comprehensive, synthesis-driven breakdown regarding "\${q}". Modern engineering paradigms emphasize end-to-end type safety, distributed edge compute, and automated reactive pipelines [1]. Benchmarking across contemporary implementations demonstrates a 40% reduction in cold-start latency when combined with optimized bundling and native WASM extensions [2].\`,
        keyPoints: [
          'High performance zero-copy execution pipelines [1]',
          'Fault-tolerant failover mechanisms with distributed consensus [2]',
          'Standardized REST & WebSocket integration protocols [3]',
          'Seamless interoperability across modern browser engines [4]'
        ]
      });
      setIsSearching(false);
    }, 600);
  };

  const handleCopy = () => {
    if (!activeResult) return;
    navigator.clipboard.writeText(activeResult.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#191a1a] text-neutral-200 font-sans antialiased selection:bg-teal-500/30 selection:text-white">
      {/* Left Slim Vertical Icon Rail */}
      <aside className="w-14 border-r border-[#262828] bg-[#141515] flex flex-col justify-between items-center py-3.5 shrink-0 select-none">
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 font-bold text-lg cursor-pointer hover:bg-teal-500/20 transition-colors">
            ✻
          </div>

          {/* Nav Icons */}
          <div className="flex flex-col items-center space-y-2 pt-2">
            <button 
              onClick={() => { setActiveResult(null); setQuery(''); }}
              title="New Thread" 
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Plus size={18} />
            </button>
            <button 
              onClick={() => setActiveNav('threads')}
              title="Threads" 
              className={\`p-2 rounded-xl transition-colors cursor-pointer \${activeNav === 'threads' ? 'text-white bg-white/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'}\`}
            >
              <MessageSquare size={18} />
            </button>
            <button 
              onClick={() => setActiveNav('library')}
              title="Library" 
              className={\`p-2 rounded-xl transition-colors cursor-pointer \${activeNav === 'library' ? 'text-white bg-white/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'}\`}
            >
              <Library size={18} />
            </button>
            <button 
              onClick={() => setActiveNav('settings')}
              title="Settings" 
              className={\`p-2 rounded-xl transition-colors cursor-pointer \${activeNav === 'settings' ? 'text-white bg-white/10' : 'text-neutral-400 hover:text-white hover:bg-white/5'}\`}
            >
              <Settings size={18} />
            </button>
            <button 
              onClick={() => setActiveNav('download')}
              title="Download App" 
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Download size={18} />
            </button>
            <button 
              onClick={() => setActiveNav('history')}
              title="History" 
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            >
              <Clock size={18} />
            </button>
          </div>
        </div>

        {/* Bottom Rail Actions */}
        <div className="flex flex-col items-center space-y-3">
          <button className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <ArrowUp size={16} />
          </button>
          <button className="p-2 text-neutral-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
            <Bell size={16} />
          </button>
          <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center cursor-pointer shadow">
            S
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col justify-between">
        {/* Top Bar */}
        <header className="px-6 py-3.5 flex items-center justify-between border-b border-transparent">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#202222] border border-white/5 text-xs text-neutral-300">
            <span className="text-neutral-400">Free plan</span>
            <span className="text-neutral-600">•</span>
            <button className="text-teal-400 hover:text-teal-300 font-medium cursor-pointer">Upgrade</button>
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <button className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <LayoutGrid size={16} />
            </button>
            <button className="p-1.5 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <Menu size={16} />
            </button>
          </div>
        </header>

        <div className="max-w-3xl w-full mx-auto px-4 py-8 md:py-16 flex-1 flex flex-col justify-center">
          {!activeResult ? (
            /* Home Landing State */
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="text-center space-y-2">
                <p className="text-xs font-semibold text-neutral-400 tracking-wider">Search</p>
                <h1 className="text-3xl md:text-4xl font-serif font-normal text-white tracking-tight">
                  What do you want to know?
                </h1>
              </div>

              {/* Main Search Input Box */}
              <div className="rounded-2xl bg-[#202222] border border-neutral-800 shadow-2xl p-3.5 space-y-3 focus-within:border-neutral-700 transition-all">
                <textarea
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                  rows={2}
                  placeholder="Type / for search modes"
                  className="w-full bg-transparent border-none outline-none text-white placeholder-neutral-500 text-sm md:text-base resize-none leading-relaxed"
                />

                {/* Bottom Bar Inside Input */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs text-neutral-400">
                  <div className="flex items-center gap-2">
                    <button className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer">
                      <Plus size={15} />
                    </button>

                    {/* Focus / Search Pill */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowFocusMenu(!showFocusMenu)}
                        className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#2a2c2c] hover:bg-[#343636] text-neutral-300 transition-colors cursor-pointer text-xs font-medium"
                      >
                        <Search size={13} className="text-neutral-400" />
                        <span>{focus}</span>
                        <ChevronDown size={11} className="text-neutral-500" />
                      </button>
                      {showFocusMenu && (
                        <div className="absolute left-0 bottom-8 w-32 bg-[#252727] border border-white/10 rounded-xl shadow-xl py-1 z-30">
                          {focusOptions.map(opt => (
                            <button
                              key={opt}
                              onClick={() => { setFocus(opt); setShowFocusMenu(false); }}
                              className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/5 hover:text-white"
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Computer Pill */}
                    <button className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2a2c2c] hover:bg-[#343636] text-neutral-300 transition-colors text-xs font-medium cursor-pointer">
                      <Monitor size={13} className="text-neutral-400" />
                      <span>Computer</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Model Pill */}
                    <div className="relative">
                      <button 
                        onClick={() => setShowModelMenu(!showModelMenu)}
                        className="flex items-center gap-1 px-2.5 py-1 text-neutral-400 hover:text-white transition-colors cursor-pointer text-xs"
                      >
                        <span>{selectedModel}</span>
                        <ChevronDown size={11} />
                      </button>
                      {showModelMenu && (
                        <div className="absolute right-0 bottom-8 w-36 bg-[#252727] border border-white/10 rounded-xl shadow-xl py-1 z-30">
                          {modelOptions.map(m => (
                            <button
                              key={m}
                              onClick={() => { setSelectedModel(m); setShowModelMenu(false); }}
                              className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-white/5 hover:text-white"
                            >
                              {m}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Mic button */}
                    <button className="p-1.5 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors cursor-pointer">
                      <Mic size={15} />
                    </button>

                    {/* Voice audio wave button */}
                    <button 
                      onClick={() => handleSearch()}
                      className="p-1.5 rounded-full bg-white text-black hover:bg-neutral-200 transition-colors cursor-pointer shadow-md"
                    >
                      <AudioLines size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Prompts Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                {quickPrompts.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => { setQuery(item.title); handleSearch(item.title); }}
                    className="p-3.5 rounded-xl bg-[#202222]/50 hover:bg-[#202222] border border-white/5 hover:border-white/10 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-teal-400 tracking-wider font-mono">
                        {item.tag}
                      </span>
                      <p className="text-xs text-neutral-300 group-hover:text-white transition-colors">
                        {item.title}
                      </p>
                    </div>
                    <ArrowRight size={14} className="text-neutral-500 group-hover:text-teal-400 transition-transform group-hover:translate-x-0.5" />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Search Results State */
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Question Heading */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-2xl font-serif text-white font-medium">
                  {activeResult.query}
                </h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleCopy}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="Copy response"
                  >
                    {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                  </button>
                  <button 
                    onClick={() => setActiveResult(null)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    title="New search"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>
              </div>

              {/* Sources Section */}
              <div className="space-y-2">
                <span className="text-xs uppercase font-mono text-neutral-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <BookOpen size={13} className="text-teal-400" />
                  <span>Sources</span>
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {activeResult.sources.map((src, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-[#202222] border border-white/5 hover:border-white/15 transition-all text-xs space-y-1">
                      <div className="flex items-center justify-between text-neutral-500 text-[10px]">
                        <span>{src.domain}</span>
                        <span className="font-mono">[{i + 1}]</span>
                      </div>
                      <p className="text-neutral-300 font-medium line-clamp-2 text-[11px] leading-snug">
                        {src.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Answer Synthesis */}
              <div className="space-y-4 pt-2">
                <span className="text-xs uppercase font-mono text-neutral-400 font-semibold tracking-wider flex items-center gap-1.5">
                  <Sparkles size={13} className="text-teal-400" />
                  <span>Answer</span>
                </span>
                <div className="p-5 rounded-2xl bg-[#202222]/80 border border-white/5 space-y-4 text-sm text-neutral-200 leading-relaxed font-normal">
                  <p>{activeResult.summary}</p>
                  <ul className="space-y-2 pl-4 list-disc text-neutral-300 text-xs">
                    {activeResult.keyPoints.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Ask Follow-up Bar */}
              <div className="pt-4">
                <div className="rounded-xl bg-[#202222] border border-white/10 p-2.5 flex items-center gap-2">
                  <input 
                    type="text"
                    placeholder="Ask a follow up question..."
                    className="flex-1 bg-transparent border-none outline-none text-xs text-white placeholder-neutral-500"
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleSearch((e.target as HTMLInputElement).value);
                    }}
                  />
                  <button className="px-3 py-1 rounded-lg bg-teal-500 hover:bg-teal-400 text-black text-xs font-semibold">
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Global Status Footer */}
        <footer className="border-t border-[#262828] px-6 py-2.5 bg-[#141515] flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Calvras Engine v4 · REST & SQLite Connected</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Pro Search: {isPro ? 'Enabled' : 'Standard'}</span>
            <span>Focus: {focus}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}`,
    'Calvras/src/lib/db.ts': `export interface KnowledgeItem {
  id: number;
  title: string;
  source: string;
  category: string;
  summary: string;
}

export const knowledgeBase: KnowledgeItem[] = [
  { id: 1, title: 'Quantum Computing and Cryptography', source: 'Nature 2026', category: 'Science', summary: 'Quantum annealing algorithms applied to cryptographic lattices.' },
  { id: 2, title: 'React 19 Server Components at Scale', source: 'React Core', category: 'Tech', summary: 'Optimized hydration strategies and zero-bundle server boundaries.' },
  { id: 3, title: 'Autonomous Multi-Agent Orchestration', source: 'ArXiv', category: 'AI', summary: 'Coordinated execution topologies for code generation and verification.' }
];

export async function searchKnowledge(q: string) {
  return knowledgeBase.filter(k => k.title.toLowerCase().includes(q.toLowerCase()) || k.summary.toLowerCase().includes(q.toLowerCase()));
}`,
    'Calvras/server/api.js': `import express from 'express';
const router = express.Router();

router.get('/api/search', (req, res) => {
  const query = req.query.q || '';
  res.json({
    query,
    status: 'ok',
    timestamp: new Date().toISOString(),
    results: [
      { title: 'Perplexity Engine Synthesis', domain: 'perplexity.ai', relevance: 0.98 },
      { title: 'Modern Fullstack Architecture', domain: 'calvras.com', relevance: 0.95 }
    ]
  });
});

export default router;`
  };
}

function generateDashboardApp() {
  return {
    'Calvras/src/App.tsx': `import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CreditCard, 
  Activity, 
  ArrowUpRight, 
  ArrowDownRight, 
  Search, 
  Bell, 
  Filter,
  CheckCircle2,
  Clock,
  Settings
} from 'lucide-react';

export default function App() {
  const [filter, setFilter] = useState('30d');

  const stats = [
    { title: 'Total Revenue', value: '$124,592', change: '+14.2%', isPositive: true, icon: CreditCard },
    { title: 'Active Subscriptions', value: '8,420', change: '+8.1%', isPositive: true, icon: Users },
    { title: 'System Throughput', value: '99.98%', change: '+0.04%', isPositive: true, icon: Activity },
    { title: 'Average Latency', value: '142ms', change: '-18.5%', isPositive: true, icon: Clock }
  ];

  const transactions = [
    { id: 'TX-9021', customer: 'Acme Global', plan: 'Enterprise Pro', amount: '$4,200', status: 'Completed', date: 'Just now' },
    { id: 'TX-9020', customer: 'Nexus Labs', plan: 'Team License', amount: '$1,450', status: 'Completed', date: '14 mins ago' },
    { id: 'TX-9019', customer: 'Starlight Media', plan: 'Developer Starter', amount: '$290', status: 'Pending', date: '1 hour ago' },
    { id: 'TX-9018', customer: 'Apex Robotics', plan: 'Enterprise Custom', amount: '$8,900', status: 'Completed', date: '3 hours ago' }
  ];

  return (
    <div className="min-h-screen bg-[#0d0e12] text-neutral-100 font-sans antialiased selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#12141a]/90 backdrop-blur px-6 py-3.5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
            ▲
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight">Nexus Operational Studio</h1>
            <p className="text-[10px] text-neutral-400">Enterprise Metric Control</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-[#1a1d24] border border-white/10 rounded-lg px-2.5 py-1 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-neutral-300 text-[11px] font-medium">Cluster Healthy</span>
          </div>
          <button className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors">
            Generate Report
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="p-5 rounded-2xl bg-[#141720] border border-white/5 hover:border-white/10 transition-all space-y-3">
                <div className="flex items-center justify-between text-neutral-400 text-xs">
                  <span>{st.title}</span>
                  <Icon size={16} className="text-indigo-400" />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-white tracking-tight">{st.value}</span>
                  <span className="text-xs font-semibold text-emerald-400 flex items-center gap-0.5">
                    <ArrowUpRight size={13} />
                    {st.change}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Transactions Table */}
        <div className="p-6 rounded-2xl bg-[#141720] border border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Real-time Settlement Ledger</h2>
              <p className="text-xs text-neutral-400">Verified transactions across active API clusters</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-neutral-300 border border-white/10 hover:bg-white/10">
                Filter
              </button>
              <button className="px-2.5 py-1 rounded-lg bg-white/5 text-xs text-neutral-300 border border-white/10 hover:bg-white/10">
                Export CSV
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-neutral-400">
                  <th className="py-2.5 font-medium">Transaction ID</th>
                  <th className="py-2.5 font-medium">Customer</th>
                  <th className="py-2.5 font-medium">Tier</th>
                  <th className="py-2.5 font-medium">Amount</th>
                  <th className="py-2.5 font-medium">Status</th>
                  <th className="py-2.5 font-medium">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-3 font-mono text-indigo-400">{tx.id}</td>
                    <td className="py-3 font-semibold text-white">{tx.customer}</td>
                    <td className="py-3 text-neutral-300">{tx.plan}</td>
                    <td className="py-3 font-mono font-bold text-white">{tx.amount}</td>
                    <td className="py-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-medium border border-emerald-500/20">
                        <CheckCircle2 size={11} />
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 text-neutral-400 font-mono text-[11px]">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}`,
    'Calvras/src/lib/db.ts': `export const sampleTransactions = [
  { id: 'TX-9021', customer: 'Acme Global', amount: 4200 },
  { id: 'TX-9020', customer: 'Nexus Labs', amount: 1450 }
];`,
    'Calvras/server/api.js': `import express from 'express';
const router = express.Router();
router.get('/api/analytics', (req, res) => res.json({ status: 'ok', revenue: 124592 }));
export default router;`
  };
}

function generateDefaultStudioApp(topic = 'Application Studio') {
  const cleanTitle = topic && topic !== 'build' && topic !== 'Production Application UI' ? topic.slice(0, 40) : 'Calvras Application';
  return {
    'Calvras/src/App.tsx': `import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  Globe,
  Zap,
  Code2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#14120B] text-neutral-100 font-sans flex flex-col antialiased selection:bg-white selection:text-black">
      <header className="sticky top-0 z-40 bg-[#14120B] border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center text-white font-bold text-xs">
            C
          </div>
          <span className="font-bold text-sm tracking-tight text-white uppercase">${cleanTitle}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Autonomous Engine Active</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 sm:p-10 space-y-8">
        <div className="rounded-3xl border border-white/10 p-8 md:p-12 bg-[#14120B] space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/15">
            <Sparkles size={13} />
            <span>Production Architecture</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-normal text-white tracking-tight leading-tight">
            ${cleanTitle}
          </h1>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl">
            Custom application built with React 18, Tailwind CSS, live state management, and real-time database endpoints.
          </p>
        </div>
      </main>
    </div>
  );
}`,
    'Calvras/src/lib/db.ts': `export const sampleData = [
  { id: 1, title: 'Item 1', status: 'Active' }
];`,
    'Calvras/server/api.js': `import express from 'express';
const router = express.Router();
router.get('/api/health', (req, res) => res.json({ status: 'ok' }));
export default router;`
  };
}