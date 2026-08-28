import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight
} from 'lucide-react';

// Icon helper matching developer stack (React Atom, JavaScript badge, etc.)
function getFileIcon(filename = '') {
  if (filename.endsWith('.jsx') || filename.endsWith('.tsx')) {
    return (
      <span className="text-[#00d8ff] font-sans text-xs" title="React">
        ⚛
      </span>
    );
  }
  if (filename.endsWith('.js') || filename.endsWith('.mjs')) {
    return (
      <span className="px-1 py-0.2 bg-[#f7df1e] text-black font-bold text-[9.5px] rounded-[3px] leading-tight select-none">
        JS
      </span>
    );
  }
  if (filename.endsWith('.ts')) {
    return (
      <span className="px-1 py-0.2 bg-[#3178c6] text-white font-bold text-[9.5px] rounded-[3px] leading-tight select-none">
        TS
      </span>
    );
  }
  if (filename.endsWith('.css')) {
    return (
      <span className="text-[#264de4] font-bold text-xs">
        #
      </span>
    );
  }
  return <span className="text-neutral-400 text-xs">📄</span>;
}

// Inline code renderer for thoughts (e.g. `generateCodeEdit`, `currentRepo`)
function renderThoughtWithPills(text) {
  if (!text) return null;
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-[rgb(28,28,32)] text-[#e2e8f0] font-mono text-[11.5px] border border-white/5 mx-0.5">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

export default function AgentExecutionStream({ 
  activities = [],
  isLive = false
}) {
  const [openSections, setOpenSections] = useState({
    root_0: false,
    root_1: false,
    root_2: false,
    exploring_root: true,
    thinking_active: true
  });

  const toggle = (key) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (!activities || activities.length === 0) return null;

  return (
    <div className="w-full max-w-[620px] mb-2.5 space-y-1.5 font-sans text-xs text-[#d1d5db] select-none text-left">
      {activities.map((act, aIdx) => {
        // 1. Direct Thought Item (e.g. "Thought for 7s ⌄")
        if (act.type === 'thought') {
          const isOpen = openSections[`thought_${aIdx}`] ?? false;
          return (
            <div key={`act-${aIdx}`} className="py-0.5">
              <button
                onClick={() => toggle(`thought_${aIdx}`)}
                className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200 font-normal text-[13px] cursor-pointer transition-colors"
              >
                <span>Thought for {act.duration || '7s'}</span>
                <ChevronDown size={13} className={`text-neutral-400 transition-transform duration-150 ${isOpen ? '' : '-rotate-90'}`} />
              </button>
              {isOpen && (
                <div className="pl-3 py-1.5 my-1 space-y-1 text-[13px] leading-relaxed text-neutral-300 font-sans animate-in fade-in duration-150">
                  {act.title && (
                    <div className="font-bold text-white text-[13.5px]">
                      {act.title}
                    </div>
                  )}
                  <p className="text-neutral-300 leading-relaxed text-[13px] whitespace-pre-wrap">
                    {renderThoughtWithPills(act.content)}
                  </p>
                </div>
              )}
            </div>
          );
        }

        // 2. Analyzed File Item (e.g. "Analyzed 📄 index.js #L355-375")
        if (act.type === 'analyzed') {
          return (
            <div key={`act-${aIdx}`} className="flex items-center gap-2 py-0.5 text-neutral-300 font-mono text-[12.5px]">
              <span className="text-neutral-400 font-sans">Analyzed</span>
              {getFileIcon(act.file || act.name)}
              <span className="text-neutral-100 font-medium">{act.file || act.name}</span>
              {act.range && <span className="text-neutral-500">{act.range}</span>}
            </div>
          );
        }

        // 3. Exploring Multiple Files (Grouped)
        if (act.type === 'exploring') {
          const filesCount = act.files?.length || 0;
          const isExploringOpen = openSections[`exp_${aIdx}`] ?? true;
          return (
            <div key={`act-${aIdx}`} className="space-y-1">
              {filesCount > 1 && (
                <div className="flex items-center gap-2">
                  {act.subagent && (
                    <span className="px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-300 border border-purple-500/25 text-[10.5px] font-semibold tracking-wide uppercase">
                      {act.subagent}
                    </span>
                  )}
                  <button 
                    onClick={() => toggle(`exp_${aIdx}`)}
                    className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors font-normal text-[13px] cursor-pointer"
                  >
                    <span>{isLive ? `Exploring ${filesCount} files` : `Explored ${filesCount} files`}</span>
                    <ChevronDown size={13} className={`transition-transform duration-150 ${isExploringOpen ? '' : '-rotate-90'}`} />
                  </button>
                </div>
              )}

              {isExploringOpen && (
                <div className="space-y-1 pl-0.5">
                  {act.files?.map((f, fIdx) => (
                    <React.Fragment key={fIdx}>
                      <div className="flex items-center gap-2 py-0.5 text-neutral-300 font-mono text-[12.5px]">
                        <span className="text-neutral-400 font-sans">Analyzed</span>
                        {getFileIcon(f.name)}
                        <span className="text-neutral-100 font-medium">{f.name}</span>
                        {f.range && <span className="text-neutral-500">{f.range}</span>}
                      </div>

                      {/* Interspersed file thought if present */}
                      {f.thought && (
                        <div className="py-0.5 pl-2">
                          <button
                            onClick={() => toggle(`fthought_${aIdx}_${fIdx}`)}
                            className="flex items-center gap-1 text-neutral-400 hover:text-neutral-200 font-normal text-[13px] cursor-pointer"
                          >
                            <span>Thought for {f.thought.duration || '4s'}</span>
                            <ChevronDown size={13} className={`text-neutral-400 transition-transform duration-150 ${openSections[`fthought_${aIdx}_${fIdx}`] ? '' : '-rotate-90'}`} />
                          </button>
                          {openSections[`fthought_${aIdx}_${fIdx}`] && (
                            <div className="pl-3 py-1 space-y-1 text-[13px] text-neutral-300 font-sans leading-relaxed">
                              {f.thought.title && <div className="font-bold text-white text-[13.5px]">{f.thought.title}</div>}
                              <p className="text-neutral-300 leading-relaxed">{renderThoughtWithPills(f.thought.content)}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          );
        }

        // 4. File Edit Item (e.g. "Edited ⚛ ChatMessage.jsx +15 -2")
        if (act.type === 'edit') {
          return (
            <div key={`act-${aIdx}`} className="flex items-center gap-2 text-[12.5px] font-mono pl-0.5 pt-0.5">
              {act.subagent && (
                <span className="px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-300 border border-blue-500/25 text-[10.5px] font-semibold tracking-wide uppercase font-sans">
                  {act.subagent}
                </span>
              )}
              <span className="text-neutral-400 font-sans">Edited</span>
              {getFileIcon(act.file)}
              <span className="text-neutral-100 font-medium">{act.file}</span>
              {act.diff && (
                <span className="font-medium text-emerald-400">
                  +{act.diff.added} <span className="text-rose-400">-{act.diff.removed}</span>
                </span>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
