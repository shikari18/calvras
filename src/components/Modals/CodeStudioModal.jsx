import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  Folder, 
  FolderOpen, 
  FileCode, 
  FileText, 
  ChevronRight, 
  ChevronDown, 
  Search, 
  Download, 
  Copy, 
  Check, 
  Maximize2, 
  Minimize2, 
  Code2 
} from 'lucide-react';

const getFileIcon = (filename) => {
  const ext = filename.split('.').pop()?.toLowerCase();
  if (['tsx', 'jsx', 'ts', 'js'].includes(ext)) {
    return <FileCode size={13} className="text-blue-400 flex-shrink-0" />;
  }
  if (['json', 'sql', 'prisma'].includes(ext)) {
    return <FileCode size={13} className="text-amber-400 flex-shrink-0" />;
  }
  if (['css', 'html'].includes(ext)) {
    return <FileCode size={13} className="text-cyan-400 flex-shrink-0" />;
  }
  return <FileText size={13} className="text-neutral-400 flex-shrink-0" />;
};

export default function CodeStudioModal({ isOpen, onClose, workspaceFiles = null, initialFile = null }) {
  const [searchFilter, setSearchFilter] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [openFolders, setOpenFolders] = useState({});

  // Dynamically resolve real project files from props or active session localStorage
  const projectFiles = useMemo(() => {
    if (workspaceFiles && Object.keys(workspaceFiles).length > 0) {
      return workspaceFiles;
    }
    if (typeof window !== 'undefined') {
      try {
        const s = localStorage.getItem('coded_user');
        const email = (s ? JSON.parse(s)?.email || 'guest' : 'guest').toLowerCase().trim().replace(/[^a-z0-9_]/g, '_');
        const activeId = localStorage.getItem(`calvras_active_session_${email}`) || localStorage.getItem('coded_active_session');
        const savedSessions = localStorage.getItem(`calvras_sessions_${email}`) || localStorage.getItem('coded_sessions');
        if (savedSessions && activeId) {
          const parsed = JSON.parse(savedSessions);
          const active = parsed.find(x => x.id === activeId);
          if (active && active.files && Object.keys(active.files).length > 0) {
            return active.files;
          }
        }
        const vfs = localStorage.getItem('calvras_vfs');
        if (vfs) {
          const parsed = JSON.parse(vfs);
          if (parsed && Object.keys(parsed).length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Could not read session files for CodeStudio:', e);
      }
    }
    return {
      'src/App.tsx': 'export default function App() {\n  return (\n    <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">\n      <h1 className="text-xl font-bold">Your Workspace is Ready</h1>\n    </div>\n  );\n}\n',
      'package.json': '{\n  "name": "my-calvras-app",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0",\n    "lucide-react": "^0.475.0"\n  }\n}'
    };
  }, [workspaceFiles, isOpen]);

  const allFilePaths = useMemo(() => Object.keys(projectFiles), [projectFiles]);
  
  const defaultFile = useMemo(() => {
    if (initialFile && projectFiles[initialFile]) return initialFile;
    if (allFilePaths.includes('src/App.tsx')) return 'src/App.tsx';
    if (allFilePaths.includes('src/App.jsx')) return 'src/App.jsx';
    return allFilePaths[0] || 'src/App.tsx';
  }, [allFilePaths, initialFile, projectFiles]);

  const [openTabs, setOpenTabs] = useState([defaultFile]);
  const [activeTab, setActiveTab] = useState(defaultFile);

  useEffect(() => {
    if (defaultFile && !openTabs.includes(defaultFile)) {
      setOpenTabs(prev => [defaultFile, ...prev]);
      setActiveTab(defaultFile);
    }
  }, [defaultFile]);

  if (!isOpen) return null;

  const toggleFolder = (path) => {
    setOpenFolders(prev => ({ ...prev, [path]: !prev[path] }));
  };

  const handleSelectFile = (file) => {
    if (!openTabs.includes(file)) {
      setOpenTabs(prev => [...prev, file]);
    }
    setActiveTab(file);
  };

  const handleCloseTab = (file, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== file);
    setOpenTabs(newTabs);
    if (activeTab === file && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]);
    }
  };

  const copyCode = () => {
    const code = projectFiles[activeTab] || '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentCode = projectFiles[activeTab] || '// Select a file from the explorer';
  const codeLines = currentCode.split('\n');

  const filteredFiles = searchFilter 
    ? allFilePaths.filter(f => f.toLowerCase().includes(searchFilter.toLowerCase()))
    : allFilePaths;

  // Build hierarchical tree structure dynamically from allFilePaths
  const treeData = useMemo(() => {
    const root = { files: [], dirs: {} };
    for (const filePath of filteredFiles) {
      const parts = filePath.split('/');
      if (parts.length === 1) {
        root.files.push({ name: parts[0], path: filePath });
      } else {
        let current = root;
        for (let i = 0; i < parts.length - 1; i++) {
          const dirName = parts[i];
          if (!current.dirs[dirName]) {
            current.dirs[dirName] = { files: [], dirs: {}, fullPath: parts.slice(0, i + 1).join('/') };
          }
          current = current.dirs[dirName];
        }
        current.files.push({ name: parts[parts.length - 1], path: filePath });
      }
    }
    return root;
  }, [filteredFiles]);

  const renderTree = (node, depth = 0) => {
    return (
      <div className={`space-y-0.5 ${depth > 0 ? 'ml-3 border-l border-white/5 pl-2' : ''}`}>
        {/* Directories */}
        {Object.entries(node.dirs).map(([dirName, dirNode]) => {
          const isExpanded = openFolders[dirNode.fullPath] !== false;
          return (
            <div key={dirNode.fullPath}>
              <button 
                onClick={() => toggleFolder(dirNode.fullPath)}
                className="flex items-center gap-1.5 w-full px-1.5 py-1 rounded hover:bg-[#18181e] text-neutral-400 font-medium text-left cursor-pointer"
              >
                {isExpanded ? <ChevronDown size={13} className="text-neutral-500" /> : <ChevronRight size={13} className="text-neutral-500" />}
                {isExpanded ? <FolderOpen size={13} className="text-blue-400" /> : <Folder size={13} className="text-neutral-400" />}
                <span className="text-[12px] truncate text-neutral-300">{dirName}</span>
              </button>
              {isExpanded && renderTree(dirNode, depth + 1)}
            </div>
          );
        })}

        {/* Files */}
        {node.files.map((file) => {
          const isSelected = activeTab === file.path;
          return (
            <button
              key={file.path}
              onClick={() => handleSelectFile(file.path)}
              className={`flex items-center gap-2 w-full px-2 py-1 rounded text-left truncate transition-colors cursor-pointer ${
                isSelected 
                  ? 'bg-[#202028] text-white font-medium border-l-2 border-pink-500' 
                  : 'hover:bg-[#18181e] text-neutral-400'
              }`}
            >
              {getFileIcon(file.name)}
              <span className="text-[12px] truncate">{file.name}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`relative flex flex-col bg-[#141416] border border-[#26262e] rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 ${
        isFullScreen ? 'w-screen h-screen rounded-none' : 'w-full max-w-6xl h-[88vh]'
      }`}>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181c] border-b border-[#24242c] select-none">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
            <Code2 size={15} className="text-pink-400" />
            <span>Calvras Project Workspace Explorer</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#202028] border border-[#30303a] text-neutral-400">
              {allFilePaths.length} files
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#262630] transition-colors cursor-pointer"
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#262630] transition-colors cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Main Split Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left File Tree Sidebar */}
          <div className="w-64 flex-shrink-0 bg-[#121214] border-r border-[#222228] flex flex-col select-none">
            {/* Search code input */}
            <div className="p-2.5 border-b border-[#202026]">
              <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-[#18181e] border border-[#282832] text-xs text-neutral-400">
                <Search size={13} className="text-neutral-500 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Filter files..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs text-white placeholder-neutral-500 w-full"
                />
                {searchFilter && (
                  <button onClick={() => setSearchFilter('')} className="text-neutral-500 hover:text-white cursor-pointer">×</button>
                )}
              </div>
            </div>

            {/* Dynamic File Tree Explorer */}
            <div className="flex-1 overflow-y-auto p-2 font-mono text-xs">
              {renderTree(treeData)}
            </div>
          </div>

          {/* Right Code Editor Pane */}
          <div className="flex-1 flex flex-col bg-[#141416] overflow-hidden">
            {/* Multi-Tab Bar */}
            <div className="flex items-center justify-between bg-[#16161a] border-b border-[#222228] px-2">
              <div className="flex items-center gap-1 overflow-x-auto">
                {openTabs.map((tab) => (
                  <div
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-3 py-2 text-xs border-r border-[#222228] cursor-pointer transition-colors ${
                      activeTab === tab 
                        ? 'bg-[#141416] text-white font-medium border-t-2 border-t-pink-500' 
                        : 'text-neutral-400 hover:bg-[#18181e] hover:text-neutral-200'
                    }`}
                  >
                    {getFileIcon(tab)}
                    <span className="truncate max-w-[160px]">{tab}</span>
                    <button
                      onClick={(e) => handleCloseTab(tab, e)}
                      className="text-neutral-500 hover:text-white p-0.5 rounded cursor-pointer"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Action Buttons: Copy & Download */}
              <div className="flex items-center gap-2 pr-2">
                <button
                  onClick={copyCode}
                  className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-[#202028] transition-colors cursor-pointer"
                >
                  {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={() => {
                    const blob = new Blob([currentCode], { type: 'text/plain;charset=utf-8' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = activeTab.split('/').pop() || 'file.tsx';
                    a.click();
                  }}
                  className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-2.5 py-1 rounded-lg bg-[#202028] hover:bg-[#282834] border border-[#30303c] transition-colors cursor-pointer"
                >
                  <Download size={13} />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Code Line Numbers and Content */}
            <div className="flex-1 overflow-auto p-4 font-mono text-[13px] leading-relaxed bg-[#101012] text-[#e2e2e8]">
              <div className="flex">
                {/* Line numbers */}
                <div className="select-none pr-4 text-right text-neutral-600 font-mono text-[12px]">
                  {codeLines.map((_, i) => (
                    <div key={i} className="leading-relaxed">{i + 1}</div>
                  ))}
                </div>
                {/* Code body */}
                <pre className="flex-1 overflow-x-auto text-[#d4d4dc] font-mono whitespace-pre leading-relaxed">
                  <code>{currentCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
