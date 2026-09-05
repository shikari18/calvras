import React, { useState, useMemo } from 'react';
import { 
  Search, ChevronDown, Plus, Globe, Sparkles, Folder, Trash2, 
  Layers, Cpu, ExternalLink, Code2, Play, LayoutGrid, List, CheckCircle2,
  Clock, ArrowRight, Zap, Terminal, ShieldCheck, Box
} from 'lucide-react';

const BLUEPRINTS = [
  {
    id: 'blueprint-saas',
    title: 'SaaS Revenue & Billing Engine',
    category: 'Full-Stack',
    description: 'Production subscription analytics, Stripe webhook sync, MRR charts, and tier management.',
    stack: ['Next.js 15', 'Tailwind', 'Stripe', 'Postgres'],
    prompt: 'Build a production full-stack SaaS revenue analytics dashboard with subscription webhooks, customer MRR charts, and billing tiers.',
    accent: 'from-blue-500/20 to-indigo-500/10'
  },
  {
    id: 'blueprint-agent',
    title: 'Autonomous Multi-Agent Workspace',
    category: 'AI Platform',
    description: 'Parallel engineering subagents with live tools, autonomous testing, and step execution logs.',
    stack: ['React 19', 'TypeScript', 'Agents', 'Sandboxes'],
    prompt: 'Build an autonomous multi-agent engineering platform with tool calling, live activity indicators, code generation, and test validation.',
    accent: 'from-emerald-500/20 to-teal-500/10'
  },
  {
    id: 'blueprint-canvas',
    title: 'Real-Time Collaborative Canvas',
    category: 'Interactive',
    description: 'Vector layout engine with infinite canvas, layer grouping, undo/redo history, and export.',
    stack: ['Vite', 'HTML5 Canvas', 'Tailwind', 'WebSockets'],
    prompt: 'Build an Apple-grade interactive infinite canvas whiteboard with shape rendering, drawing tools, undo/redo stack, and image export.',
    accent: 'from-amber-500/20 to-orange-500/10'
  },
  {
    id: 'blueprint-store',
    title: 'Headless Digital Storefront',
    category: 'E-Commerce',
    description: 'Modern product showroom with instantaneous search, persistent shopping cart, and Paystack checkout.',
    stack: ['React', 'Paystack', 'Zustand', 'Tailwind'],
    prompt: 'Build a high-end modern digital storefront with product catalog filtering, cart slide-over, and Paystack payment gateway integration.',
    accent: 'from-purple-500/20 to-pink-500/10'
  }
];

export default function ProjectsPage({ 
  sessions = [], 
  onSelectProject, 
  onCreateProject,
  onDeleteProject
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('last_edited');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Map real user sessions
  const userProjects = useMemo(() => {
    return (sessions || []).map(s => {
      let dateStr = 'Recent';
      let rawDate = s.createdAt || Date.now();
      if (s.createdAt) {
        try {
          dateStr = new Date(s.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
        } catch {}
      }

      return {
        id: s.id,
        title: s.title || 'Untitled Workspace',
        date: dateStr,
        rawDate,
        thumbnail: s.previewImage || null,
        isSession: true,
        sessionId: s.id,
        filesCount: s.filesCount || (s.files ? Object.keys(s.files).length : 0),
        status: 'Active Sandbox'
      };
    });
  }, [sessions]);

  // Filter and sort user projects
  const filteredProjects = useMemo(() => {
    let list = userProjects.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'last_edited') {
      list.sort((a, b) => new Date(b.rawDate) - new Date(a.rawDate));
    } else if (sortBy === 'alphabetical') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [userProjects, searchTerm, sortBy]);

  const filteredBlueprints = useMemo(() => {
    if (!searchTerm.trim()) return BLUEPRINTS;
    return BLUEPRINTS.filter(b => 
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#171615] text-white p-6 sm:p-10 select-none font-sans">
      <div className="max-w-6xl mx-auto space-y-9">
        
        {/* ── Top Hero Header & Telemetry Metrics ── */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center text-white">
                  <Box size={18} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  Projects & Workspaces
                </h1>
              </div>
              <p className="text-sm text-neutral-400">
                Manage your autonomous software builds, live sandbox virtualizations, and engineering repositories.
              </p>
            </div>

            <button
              type="button"
              onClick={onCreateProject}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-semibold shadow-lg shadow-white/5 transition-all hover:scale-[1.02] cursor-pointer self-start md:self-auto"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>New Project</span>
            </button>
          </div>

          {/* KPI Telemetry Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#1E1D1B] border border-white/[0.08] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Active Workspaces</span>
                <div className="text-2xl font-bold text-white tracking-tight">{userProjects.length}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300">
                <Layers size={18} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1E1D1B] border border-white/[0.08] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Micro-Container Runtime</span>
                <div className="flex items-center gap-2 text-sm font-semibold text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Vite 6 Sandbox Ready</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Cpu size={18} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#1E1D1B] border border-white/[0.08] flex items-center justify-between shadow-sm">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">Security & Isolation</span>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-200">
                  <ShieldCheck size={16} className="text-emerald-400" />
                  <span>Zero-Retention SOC-2</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-300">
                <Globe size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* ── Filter & Search Toolbar ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1 bg-[#1E1D1B] border border-white/[0.08] rounded-xl p-1 text-xs overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'all' ? 'bg-white text-black font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Projects ({userProjects.length})
            </button>
            <button
              type="button"
              onClick={() => setSelectedCategory('blueprints')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === 'blueprints' ? 'bg-white text-black font-semibold shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Starter Blueprints ({BLUEPRINTS.length})
            </button>
          </div>

          {/* Right Controls: Search, Sort, View Toggle */}
          <div className="flex items-center gap-2.5 flex-1 sm:flex-initial justify-end">
            
            {/* Search Input */}
            <div className="flex items-center gap-2 bg-[#1E1D1B] border border-white/[0.08] rounded-xl px-3 py-1.5 w-full sm:w-60 focus-within:border-white/25 transition-colors">
              <Search size={14} className="text-neutral-400 flex-shrink-0" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="bg-transparent text-xs text-white placeholder-neutral-500 outline-none w-full"
              />
              {searchTerm && (
                <button type="button" onClick={() => setSearchTerm('')} className="text-neutral-500 hover:text-white text-xs cursor-pointer">×</button>
              )}
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-[#1E1D1B] border border-white/[0.08] text-neutral-300 text-xs rounded-xl px-3 py-2 pr-7 outline-none cursor-pointer hover:border-white/20 transition-colors"
              >
                <option value="last_edited">Last modified</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
              <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#1E1D1B] border border-white/[0.08] rounded-xl p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white/[0.08] text-white' : 'text-neutral-500 hover:text-white'
                }`}
                title="Grid view"
              >
                <LayoutGrid size={14} />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  viewMode === 'list' ? 'bg-white/[0.08] text-white' : 'text-neutral-500 hover:text-white'
                }`}
                title="List view"
              >
                <List size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* ── User Workspaces Grid / List ── */}
        {selectedCategory !== 'blueprints' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400">
              <span>Your Active Workspaces ({filteredProjects.length})</span>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="p-10 rounded-3xl border border-dashed border-white/[0.08] bg-[#1E1D1B]/40 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center text-neutral-400 mx-auto">
                  <Folder size={22} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">No projects found</h3>
                  <p className="text-xs text-neutral-400 max-w-sm mx-auto mt-1">
                    {searchTerm 
                      ? `No workspaces match "${searchTerm}". Try a different search term.` 
                      : 'You have not created any projects yet. Start a new project or launch one of the curated architectural blueprints below.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onCreateProject}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-semibold shadow-md transition-all cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Start New Project</span>
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="group flex flex-col rounded-3xl bg-[#1E1D1B] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer overflow-hidden shadow-lg hover:shadow-2xl hover:scale-[1.015] relative"
                  >
                    {/* Realistic Preview Header */}
                    <div className="relative w-full aspect-[16/10] bg-[#11100F] overflow-hidden flex items-center justify-center border-b border-white/[0.06]">
                      {project.thumbnail ? (
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        /* Apple-tier Dynamic App Wireframe Mockup */
                        <div className="w-full h-full p-4 flex flex-col justify-between bg-gradient-to-br from-[#1E1D1B] to-[#11100F] font-mono text-[11px] select-none">
                          <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                              <span className="text-[10px] text-neutral-400 ml-1.5 font-sans">App.tsx</span>
                            </div>
                            <span className="text-[9px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20 font-sans font-medium">Verified Clean</span>
                          </div>

                          <div className="space-y-1 text-left text-neutral-400 py-1">
                            <div><span className="text-amber-300">export default</span> <span className="text-neutral-300">function</span> <span className="text-white">Workspace()</span> &#123;</div>
                            <div className="pl-3 text-neutral-300">&lt;<span className="text-white">MainView</span> active=&#123;<span className="text-emerald-300">true</span>&#125;&gt;</div>
                            <div className="pl-6 text-neutral-400">&lt;<span className="text-neutral-300">LiveComponent</span> /&gt;</div>
                            <div className="pl-3 text-neutral-300">&lt;/<span className="text-white">MainView</span>&gt;</div>
                            <div>&#125;</div>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-white/[0.04] text-[10px] text-neutral-500 font-sans">
                            <span className="flex items-center gap-1"><Terminal size={11} /> 0 errors</span>
                            <span>Node 20 • Vite</span>
                          </div>
                        </div>
                      )}

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none backdrop-blur-[2px]">
                        <span className="px-4 py-2 rounded-xl bg-white text-black text-xs font-semibold shadow-xl flex items-center gap-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform">
                          <span>Open in Studio</span>
                          <ArrowRight size={13} />
                        </span>
                      </div>

                      {/* Top Right Quick Delete */}
                      {onDeleteProject && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete workspace "${project.title}"?`)) {
                              onDeleteProject(project.id);
                            }
                          }}
                          className="absolute top-2.5 right-2.5 z-20 p-2 rounded-xl bg-black/70 hover:bg-red-600/90 text-neutral-400 hover:text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer border border-white/10"
                          title="Delete project"
                        >
                          <Trash2 size={13} strokeWidth={2} />
                        </button>
                      )}
                    </div>

                    {/* Card Content Footer */}
                    <div className="p-4 space-y-2.5 text-left">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-white truncate group-hover:text-amber-200 transition-colors">
                          {project.title}
                        </h3>
                        <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex-shrink-0 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          <span>Live</span>
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-neutral-400 pt-1 border-t border-white/[0.04]">
                        <span className="flex items-center gap-1 text-[11px]">
                          <Clock size={12} className="text-neutral-500" />
                          <span>{project.date}</span>
                        </span>
                        <span className="text-[11px] text-white/80 group-hover:text-white group-hover:underline flex items-center gap-1 font-medium">
                          <span>Launch</span>
                          <ArrowRight size={12} />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Clean List View */
              <div className="rounded-3xl bg-[#1E1D1B] border border-white/[0.08] overflow-hidden divide-y divide-white/[0.06]">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => onSelectProject(project)}
                    className="p-4 flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#11100F] border border-white/[0.08] flex items-center justify-center text-white flex-shrink-0">
                        <Code2 size={18} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-white truncate group-hover:text-amber-200 transition-colors">
                          {project.title}
                        </h4>
                        <div className="flex items-center gap-3 text-xs text-neutral-400 mt-0.5">
                          <span>{project.date}</span>
                          <span>•</span>
                          <span className="text-emerald-400">Active Sandbox</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-semibold text-white transition-colors cursor-pointer"
                      >
                        Open Workspace
                      </button>
                      {onDeleteProject && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (window.confirm(`Delete workspace "${project.title}"?`)) {
                              onDeleteProject(project.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                          title="Delete workspace"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Featured Architectural Starter Blueprints ── */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <span>Featured Architectural Blueprints</span>
            <span className="text-[11px] text-neutral-500 lowercase">One-click clone & build</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredBlueprints.map((bp) => (
              <div
                key={bp.id}
                onClick={() => onSelectProject({ prompt: bp.prompt })}
                className="group p-6 rounded-3xl bg-[#1E1D1B] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer shadow-lg hover:shadow-2xl hover:scale-[1.015] flex flex-col justify-between text-left relative overflow-hidden"
              >
                <div className="space-y-3 relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-200 px-2.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10">
                      {bp.category}
                    </span>
                    <span className="w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 group-hover:text-black group-hover:bg-white transition-all">
                      <ArrowRight size={14} />
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight group-hover:text-neutral-200 transition-colors">
                      {bp.title}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1 leading-relaxed line-clamp-2">
                      {bp.description}
                    </p>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-white/[0.06] flex items-center justify-between relative z-10">
                  <div className="flex flex-wrap gap-1.5">
                    {bp.stack.map((tech, idx) => (
                      <span key={idx} className="text-[10px] text-neutral-400 bg-white/[0.04] px-2 py-0.5 rounded-md border border-white/[0.06]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <span className="text-xs font-semibold text-white/80 group-hover:text-white group-hover:underline flex items-center gap-1">
                    Launch Blueprint
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
