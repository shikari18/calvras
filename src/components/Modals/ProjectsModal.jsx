import React, { useState } from 'react';
import { X, FolderPlus, Folder, Trash2 } from 'lucide-react';

export default function ProjectsModal({ 
  isOpen, 
  onClose, 
  projects, 
  setProjects, 
  currentProject, 
  setCurrentProject 
}) {
  const [newProjectName, setNewProjectName] = useState('');

  if (!isOpen) return null;

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    const newProj = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      created: 'Just now'
    };
    setProjects([...projects, newProj]);
    setCurrentProject(newProj.name);
    setNewProjectName('');
  };

  const handleDelete = (id, name, e) => {
    e.stopPropagation();
    const updated = projects.filter(p => p.id !== id);
    setProjects(updated);
    if (currentProject === name && updated.length > 0) {
      setCurrentProject(updated[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#131318] border border-[#2b2b3a] rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#1c1c24] hover:bg-[#252533] transition-colors"
        >
          <X size={18} />
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Folder className="text-blue-400" size={20} />
            <span>Manage Projects</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Group chats, memory context, and code artifacts into isolated workspaces.
          </p>
        </div>

        {/* Create Form */}
        <form onSubmit={handleCreateProject} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="New project name..."
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl bg-[#1a1a24] border border-[#2e2e3e] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold transition-colors"
          >
            <FolderPlus size={14} />
            <span>Create</span>
          </button>
        </form>

        {/* Projects List */}
        <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => { setCurrentProject(proj.name); onClose(); }}
              className={`flex items-center justify-between p-3 rounded-xl border transition-colors cursor-pointer ${
                currentProject === proj.name
                  ? 'bg-[#181d2e] border-blue-500/40 text-white'
                  : 'bg-[#171720] border-[#252533] text-neutral-300 hover:bg-[#1f1f2a]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Folder size={16} className={currentProject === proj.name ? 'text-blue-400' : 'text-neutral-500'} />
                <span className="text-xs font-semibold">{proj.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {currentProject === proj.name && (
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded-full font-medium">
                    Active
                  </span>
                )}
                {projects.length > 1 && (
                  <button
                    onClick={(e) => handleDelete(proj.id, proj.name, e)}
                    className="p-1 text-neutral-500 hover:text-red-400 rounded transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
