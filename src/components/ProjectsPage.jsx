import React, { useState } from 'react';
import { Search, ChevronDown, Plus, Globe, Sparkles, Folder, Trash2 } from 'lucide-react';

export default function ProjectsPage({ 
  sessions = [], 
  onSelectProject, 
  onCreateProject,
  onDeleteProject
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('last_edited');

  // Strictly user's real project sessions — NO hardcoded showcase entries
  const userProjects = (sessions || []).map(s => {
    let dateStr = 'Recent';
    if (s.createdAt) {
      try {
        dateStr = new Date(s.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' });
      } catch {}
    }

    return {
      id: s.id,
      title: s.title || 'Untitled Project',
      date: dateStr,
      thumbnail: s.previewImage || null,
      isSession: true,
      sessionId: s.id
    };
  });

  const filteredProjects = userProjects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#1B1B1D] text-white p-6 sm:p-10 select-none">
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

        {/* Empty State when user has no projects/chats */}
        {userProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.01]">
            <div className="w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-neutral-400 mb-4 shadow-sm">
              <Folder size={26} strokeWidth={1.5} />
            </div>
            <h2 className="text-lg font-semibold text-white mb-1.5">No projects or chats yet</h2>
            <p className="text-sm text-neutral-400 max-w-sm mb-6">
              When you start chats and build fullstack apps, your saved projects and conversations will appear here.
            </p>
            <button
              type="button"
              onClick={onCreateProject}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0084ff] hover:bg-[#0073e6] text-white text-xs font-semibold shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <Plus size={15} strokeWidth={2.5} />
              <span>Start new project / chat</span>
            </button>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-neutral-400 text-sm">
            No projects found matching "{searchTerm}"
          </div>
        ) : (
          /* Project Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group flex flex-col rounded-2xl bg-[#141419] border border-white/[0.06] hover:border-white/20 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.015] relative"
              >
                {/* Thumbnail Container */}
                <div className="relative w-full aspect-[16/10] bg-[#1a1a22] overflow-hidden flex items-center justify-center">
                  {project.thumbnail ? (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#181820] to-[#121217]">
                      <span className="text-4xl font-serif italic font-bold text-neutral-600/70 group-hover:text-neutral-400 transition-colors">
                        b
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                    <span className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-semibold shadow-lg">
                      Open Project
                    </span>
                  </div>

                  {/* Delete button on top-right of thumbnail */}
                  {onDeleteProject && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Delete project "${project.title}"?`)) {
                          onDeleteProject(project.id);
                        }
                      }}
                      className="absolute top-2.5 right-2.5 z-20 p-2 rounded-xl bg-black/70 hover:bg-red-600/90 text-neutral-300 hover:text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer border border-white/10"
                      title="Delete project"
                    >
                      <Trash2 size={13} strokeWidth={2} />
                    </button>
                  )}
                </div>

                {/* Title & Date Details */}
                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex flex-col min-w-0 flex-1 pr-2">
                    <h3 className="text-[13.5px] font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-[11.5px] text-neutral-500 mt-1">
                      {project.date}
                    </span>
                  </div>
                  {onDeleteProject && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (window.confirm(`Delete project "${project.title}"?`)) {
                          onDeleteProject(project.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer flex-shrink-0"
                      title="Delete project"
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
    </div>
  );
}
