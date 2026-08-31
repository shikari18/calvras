export function generateFullArchitectureApp(topic = 'Modern Application') {
  return {
    'Calvras/src/App.tsx': `import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Layers, 
  Database, 
  Server, 
  CheckCircle2, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  Heart, 
  Share2, 
  ArrowRight,
  TrendingUp,
  Activity,
  Code2
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeItem, setActiveItem] = useState(1);
  const [dbData, setDbData] = useState([]);

  useEffect(() => {
    setDbData([
      { id: 1, title: 'Summer Pulse 2026', artist: 'Nova Horizon', category: 'Trending', duration: '3:45', plays: '1.2M' },
      { id: 2, title: 'Midnight City Beats', artist: 'CyberWave', category: 'Electronic', duration: '4:12', plays: '890K' },
      { id: 3, title: 'Acoustic Sunset', artist: 'Aria Sterling', category: 'Acoustic', duration: '3:20', plays: '2.4M' },
      { id: 4, title: 'Deep Focus Flow', artist: 'Brainwave Lab', category: 'Ambient', duration: '5:05', plays: '4.1M' },
      { id: 5, title: 'Neon Highway', artist: 'RetroSynth', category: 'Synthwave', duration: '3:55', plays: '650K' },
      { id: 6, title: 'Golden Hour Memories', artist: 'Luna Vale', category: 'Indie Pop', duration: '3:30', plays: '3.8M' }
    ]);
  }, []);

  const filteredItems = dbData.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0d0d11] text-neutral-100 font-sans flex flex-col antialiased selection:bg-rose-500 selection:text-white">
      <header className="sticky top-0 z-40 bg-[#13131a]/90 backdrop-blur-md border-b border-white/10 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-amber-500 to-emerald-400 flex items-center justify-center text-white shadow-lg shadow-rose-500/20 font-bold text-sm">
            M
          </div>
          <span className="font-bold text-base tracking-tight text-white">Application Studio</span>
        </div>

        <div className="relative w-72 max-w-sm hidden md:block">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search catalog, tracks, or artists..."
            className="w-full pl-9 pr-4 py-1.5 bg-[#1a1a24] border border-white/10 rounded-full text-xs text-white placeholder-neutral-500 outline-none focus:border-rose-500/50"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Backend Active</span>
          </div>
          <button className="px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-md transition-colors cursor-pointer">
            Explore Pro
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full p-6 space-y-8">
        <div className="relative rounded-3xl overflow-hidden p-8 md:p-10 border border-white/10 bg-gradient-to-br from-rose-900/40 via-[#161622] to-[#121218] shadow-2xl">
          <div className="max-w-xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
              <Sparkles size={13} />
              <span>Full Stack Architecture Online</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Experience Application
            </h1>
            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              High-performance responsive interface powered by React 18, Tailwind CSS, REST API endpoints, and real-time database models.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-6 py-2.5 rounded-full bg-white hover:bg-neutral-100 text-neutral-900 font-bold text-xs flex items-center gap-2 shadow-lg transition-transform active:scale-95 cursor-pointer"
              >
                {isPlaying ? <Pause size={15} /> : <Play size={15} className="fill-neutral-900" />}
                <span>{isPlaying ? 'Pause Experience' : 'Start Experience'}</span>
              </button>
              <button className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/10 transition-colors cursor-pointer">
                View Database
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-tight">Featured Catalog</h2>
            <span className="text-xs text-neutral-400 font-medium">Showing {filteredItems.length} items</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                onClick={() => { setActiveItem(item.id); setIsPlaying(true); }}
                className={"p-4 rounded-2xl border transition-all cursor-pointer " + (
                  activeItem === item.id 
                    ? "bg-rose-950/30 border-rose-500/50 shadow-lg shadow-rose-500/10" 
                    : "bg-[#15151e] border-white/5 hover:border-white/15 hover:bg-[#1a1a24]"
                )}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 font-medium">
                    {item.category}
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">{item.duration}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-rose-400 transition-colors">{item.title}</h3>
                <p className="text-xs text-neutral-400">{item.artist}</p>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-xs text-neutral-500">
                  <span className="flex items-center gap-1 font-mono">
                    <Activity size={13} className="text-rose-400" />
                    {item.plays} streams
                  </span>
                  <span className="text-rose-400 font-semibold text-[11px] flex items-center gap-1">
                    Play now <ChevronRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="sticky bottom-0 bg-[#121218]/95 backdrop-blur-lg border-t border-white/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-bold">
            {activeItem}
          </div>
          <div>
            <span className="text-xs font-bold text-white block">{dbData.find(d => d.id === activeItem)?.title || 'Selected Track'}</span>
            <span className="text-[11px] text-neutral-400">{dbData.find(d => d.id === activeItem)?.artist || 'Featured Artist'}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-9 h-9 rounded-full bg-white text-neutral-900 flex items-center justify-center shadow hover:scale-105 transition-transform cursor-pointer"
          >
            {isPlaying ? <Pause size={16} /> : <Play size={16} className="fill-neutral-900 ml-0.5" />}
          </button>
        </div>

        <div className="flex items-center gap-2 text-neutral-400 text-xs font-mono">
          <Database size={14} className="text-emerald-400" />
          <span>SQLite / REST API connected</span>
        </div>
      </footer>
    </div>
  );
}`,
    'Calvras/src/lib/db.ts': `export interface DatabaseRecord {
  id: number;
  title: string;
  artist: string;
  category: string;
  duration: string;
  plays: string;
  created_at: string;
}

export const initialRecords: DatabaseRecord[] = [
  { id: 1, title: 'Summer Pulse 2026', artist: 'Nova Horizon', category: 'Trending', duration: '3:45', plays: '1.2M', created_at: '2026-08-30' },
  { id: 2, title: 'Midnight City Beats', artist: 'CyberWave', category: 'Electronic', duration: '4:12', plays: '890K', created_at: '2026-08-30' },
  { id: 3, title: 'Acoustic Sunset', artist: 'Aria Sterling', category: 'Acoustic', duration: '3:20', plays: '2.4M', created_at: '2026-08-30' }
];

export async function queryDatabase(sql: string) {
  console.log('[DB SQL Query]:', sql);
  return initialRecords;
}`,
    'Calvras/server/api.js': `import express from 'express';
const router = express.Router();

router.get('/api/items', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    data: [
      { id: 1, title: 'Summer Pulse 2026', artist: 'Nova Horizon', category: 'Trending' },
      { id: 2, title: 'Midnight City Beats', artist: 'CyberWave', category: 'Electronic' }
    ]
  });
});

export default router;`
  };
}