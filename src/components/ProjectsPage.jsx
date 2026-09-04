import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Globe, Sparkles, Folder } from 'lucide-react';

export default function ProjectsPage({ 
  sessions = [], 
  onSelectProject, 
  onCreateProject 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('last_edited');

  // Starter showcase projects matching the reference screenshot
  const defaultShowcaseProjects = [
    {
      id: 'proj-orb-anim',
      title: 'Andrew AI Orb Signature Animation',
      date: 'Jul 20',
      thumbnail: null,
      prompt: 'Recreate the Andrew AI Orb signature fluid canvas animation with glowing particle shaders and audio responsiveness.'
    },
    {
      id: 'proj-orb-rec',
      title: 'Andrew AI Orb Recreation',
      date: 'Jul 20',
      thumbnail: null,
      prompt: 'Interactive WebGL recreation of the generative AI orb with mouse tracking and dynamic gradient shifts.'
    },
    {
      id: 'proj-ui-dup',
      title: 'UI Duplication',
      date: 'Jul 20',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
      prompt: 'Pixel-perfect 10/10 UI duplication of fullstack SaaS dashboard with analytics, data tables, and dark mode.'
    },
    {
      id: 'proj-3d-creative',
      title: 'Interactive 3D Creative Services Website',
      date: 'Jun 9',
      thumbnail: null,
      prompt: 'Build an interactive 3D creative agency website with Three.js hero, smooth page transitions, and contact portal.'
    },
    {
      id: 'proj-services',
      title: 'Interactive 3D Services Website',
      date: 'Jun 9',
      thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      prompt: 'Modern 3D agency portfolio with interactive canvas hero and live service calculator.'
    },
    {
      id: 'proj-animated',
      title: '3D Animated Creative Services Website',
      date: 'Jun 9',
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      prompt: 'High-performance interactive creative agency platform with glowing cyberpunk headers and fullstack API.'
    }
  ];

  // Merge user sessions with showcase projects
  const userProjects = sessions.map(s => ({
    id: s.id,
    title: s.title || 'Untitled Project',
    date: 'Recent',
    thumbnail: null,
    isSession: true,
    sessionId: s.id
  }));

  const allProjects = [...userProjects, ...defaultShowcaseProjects];

  const filteredProjects = allProjects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#0f0f12] text-white p-6 sm:p-10 select-none">
      <div className="max-w-6xl mx-auto space-y-7">
        
        {/* Page Header matching reference */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            All projects
          </h1>
        </div>

        {/* Toolbar: Search input, Sort, Create Project Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search bar */}
          <div className="flex items-center gap-2.5 bg-[#17171d] border border-white/[0.08] rounded-xl px-3.5 py-2 w-full sm:max-w-md focus-within:border-neutral-500 transition-colors">
            <Search size={16} className="text-neutral-400 flex-shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a project"
              className="bg-transparent text-sm text-white placeholder-neutral-500 outline-none w-full"
            />
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Sort selector */}
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#17171d] border border-white/[0.08] text-xs text-neutral-300 cursor-pointer hover:bg-[#1e1e26] transition-colors">
              <span>Last edited</span>
              <ChevronDown size={14} className="text-neutral-400" />
            </div>

            {/* + Create Project Button */}
            <button
              type="button"
              onClick={onCreateProject}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0084ff] hover:bg-[#0073e6] text-white text-xs font-semibold shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Create project</span>
            </button>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group flex flex-col rounded-2xl bg-[#141419] border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.015]"
            >
              {/* Thumbnail Container matching the reference image */}
              <div className="relative w-full aspect-[16/10] bg-[#1a1a22] overflow-hidden flex items-center justify-center">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#181820] to-[#121217]">
                    {/* Stylized 'b' brand icon matching reference screenshot */}
                    <span className="text-4xl font-serif italic font-bold text-neutral-600/70 group-hover:text-neutral-400 transition-colors">
                      b
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-full bg-white text-black text-xs font-semibold shadow-lg">
                    Open Project
                  </span>
                </div>
              </div>

              {/* Title & Date Details */}
              <div className="p-3.5 flex flex-col">
                <h3 className="text-[13.5px] font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <span className="text-[11.5px] text-neutral-500 mt-1">
                  {project.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-16 text-center text-neutral-500 text-sm">
            No projects found matching "{searchTerm}"
          </div>
        )}

      </div>
    </div>
  );
}
