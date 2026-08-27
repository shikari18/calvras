import React from 'react';
import { X, Layers, FileCode, ExternalLink, Download } from 'lucide-react';

export default function ArtifactsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const artifacts = [
    { id: 'art-1', name: 'QueryPipeline.ts', type: 'TypeScript', updated: '10 mins ago', size: '2.4 KB' },
    { id: 'art-2', name: 'BenchmarkReport.md', type: 'Markdown', updated: '2 hours ago', size: '8.1 KB' },
    { id: 'art-3', name: 'DistributedStream.svg', type: 'Diagram', updated: 'Yesterday', size: '14.2 KB' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#1a1a1a] border border-[#2b2b2b] rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-neutral-400 hover:text-white rounded-full bg-[#242424] hover:bg-[#2d2d2d] transition-colors"
        >
          <X size={17} />
        </button>

        <div className="mb-5">
          <h2 className="text-xl font-medium text-white flex items-center gap-2">
            <Layers className="text-neutral-300" size={19} />
            <span>Generated Artifacts & Files</span>
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Access, export, and manage documents, components, and code created across sessions.
          </p>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          {artifacts.map((art) => (
            <div
              key={art.id}
              className="flex items-center justify-between p-3 rounded-xl bg-[#222222] border border-[#2d2d2d] hover:border-[#3d3d3d] transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2b2b2b] flex items-center justify-center text-neutral-300">
                  <FileCode size={16} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-neutral-200">{art.name}</div>
                  <div className="text-[10px] text-neutral-500">{art.type} · {art.size} · {art.updated}</div>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-[#2e2e2e] transition-colors">
                  <Download size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
