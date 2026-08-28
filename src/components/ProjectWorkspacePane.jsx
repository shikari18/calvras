import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Eye, 
  Code2, 
  Database, 
  Settings, 
  Share2, 
  Zap, 
  ExternalLink, 
  RotateCw, 
  Copy, 
  Check, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  FileCode, 
  FileText, 
  Download,
  X,
  Github,
  Plus,
  Terminal as TerminalIcon,
  Rocket,
  Save,
  Undo2,
  RefreshCw,
  Smartphone,
  Tablet,
  Monitor
} from 'lucide-react';
import GitHubTokenModal from './GitHubTokenModal';

const API = 'http://localhost:3001';

export function generateLivePreviewSrcdoc(filesObj = {}) {
  const fileKeys = Object.keys(filesObj);
  if (fileKeys.length === 0) return '';

  const codeFiles = fileKeys.filter(k => k.endsWith('.tsx') || k.endsWith('.jsx') || k.endsWith('.js') || k.endsWith('.ts'));
  let primaryComponent = 'App';
  let combinedCode = '';

  // Sort components so sub-components come before main App
  codeFiles.sort((a, b) => (a.includes('App') ? 1 : b.includes('App') ? -1 : 0));

  for (const fk of codeFiles) {
    if (fk.endsWith('.d.ts') || fk.includes('vite.config') || fk.includes('main.tsx') || fk.includes('tsconfig')) continue;
    const raw = filesObj[fk] || '';
    if (!raw.trim()) continue;

    const compMatch = raw.match(/export\s+default\s+function\s+([a-zA-Z0-9_]+)/);
    if (compMatch) {
      if (!fk.includes('App') || primaryComponent === 'App') {
        primaryComponent = compMatch[1];
      }
    }

    const cleaned = raw
      .replace(/import\s+React.*?from\s+['"]react['"];?/g, '')
      .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
      .replace(/export\s+default\s+function\s+/g, 'function ')
      .replace(/export\s+function\s+/g, 'function ')
      .replace(/export\s+const\s+/g, 'const ')
      .replace(/:\s*(?:React\.[a-zA-Z0-9_]+|[a-zA-Z0-9_]+(?:<.*?>)?(?:\[\])?)/g, '');

    combinedCode += `\n// --- File: ${fk} ---\n` + cleaned + '\n';
  }

  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Live App Preview</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: '#0084ff',
          }
        }
      }
    }
  </script>
  <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { background-color: #000; color: #fff; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; overflow-x: hidden; }
  </style>
</head>
<body>
  <div id="root"></div>

  <script type="text/babel">
    const { useState, useEffect, useRef, useMemo, useCallback } = React;

    // SVG icon mock fallbacks for standard Lucide icon names
    const IconWrapper = ({ children, className = "w-5 h-5", ...props }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        {children}
      </svg>
    );
    const Menu = (p) => <IconWrapper {...p}><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="18" x2="20" y2="18"/></IconWrapper>;
    const X = (p) => <IconWrapper {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></IconWrapper>;
    const MapPin = (p) => <IconWrapper {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></IconWrapper>;
    const Phone = (p) => <IconWrapper {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></IconWrapper>;
    const Clock = (p) => <IconWrapper {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconWrapper>;
    const Star = (p) => <IconWrapper {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></IconWrapper>;
    const Instagram = (p) => <IconWrapper {...p}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></IconWrapper>;
    const ChevronRight = (p) => <IconWrapper {...p}><polyline points="9 18 15 12 9 6"/></IconWrapper>;

    ${combinedCode}

    try {
      const container = document.getElementById('root');
      const root = ReactDOM.createRoot(container);
      if (typeof ${primaryComponent} !== 'undefined') {
        root.render(<${primaryComponent} />);
      } else {
        const anyComp = typeof RestaurantWebsite !== 'undefined' ? RestaurantWebsite : typeof Restaurant !== 'undefined' ? Restaurant : typeof App !== 'undefined' ? App : null;
        if (anyComp) root.render(React.createElement(anyComp));
      }
    } catch (err) {
      document.getElementById('root').innerHTML = '<div style="color:#ef4444;padding:24px;font-family:monospace;background:#111;min-height:100vh;"><b>Live Preview Error:</b><br/>' + err.message + '</div>';
    }
  </script>
</body>
</html>`;
}

export function buildFileTree(filePaths = []) {
  const root = { name: 'root', type: 'folder', children: [] };

  for (const filePath of filePaths) {
    const parts = filePath.split('/');
    let current = root;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = i === parts.length - 1;

      if (isFile) {
        current.children.push({ name: part, type: 'file', fullPath: filePath });
      } else {
        let folder = current.children.find(c => c.type === 'folder' && c.name === part);
        if (!folder) {
          folder = { name: part, type: 'folder', children: [] };
          current.children.push(folder);
        }
        current = folder;
      }
    }
  }

  return root.children;
}

function TreeNode({ node, pathPrefix = '', activeFileKey, onSelectFile, expandedFolders, toggleFolder }) {
  if (node.type === 'file') {
    const isSelected = activeFileKey === node.fullPath;
    return (
      <button
        onClick={() => onSelectFile(node.fullPath)}
        className={`flex items-center gap-2 w-full px-2 py-1 rounded text-left transition-colors cursor-pointer ${
          isSelected ? 'bg-[rgb(45,45,55)] text-blue-400 font-medium' : 'text-neutral-300 hover:text-white hover:bg-[rgb(42,42,42)]'
        }`}
      >
        <FileCode size={12} className={isSelected ? 'text-blue-400' : 'text-neutral-400'} />
        <span className="truncate text-[11.5px]">{node.name}</span>
      </button>
    );
  }

  // Folder Node
  const folderPath = pathPrefix ? `${pathPrefix}/${node.name}` : node.name;
  const isExpanded = expandedFolders[folderPath] ?? true;

  return (
    <div className="space-y-0.5">
      <button
        onClick={() => toggleFolder(folderPath)}
        className="flex items-center gap-1.5 w-full px-2 py-1 rounded text-neutral-300 hover:text-white hover:bg-[rgb(42,42,42)] text-left cursor-pointer"
      >
        {isExpanded ? <ChevronDown size={12} className="text-neutral-400" /> : <ChevronRight size={12} className="text-neutral-400" />}
        <span className="font-semibold text-neutral-200 text-[12px]">{node.name}</span>
      </button>
      {isExpanded && (
        <div className="pl-3 space-y-0.5 border-l border-[rgb(50,50,50)] ml-2">
          {node.children.map((child) => (
            <TreeNode
              key={child.name}
              node={child}
              pathPrefix={folderPath}
              activeFileKey={activeFileKey}
              onSelectFile={onSelectFile}
              expandedFolders={expandedFolders}
              toggleFolder={toggleFolder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectWorkspacePane({
  isOpen = true,
  onClose,
  files = {},
  activeTab = 'preview',
  setActiveTab,
  currentFileName = null,
  onSelectFile,
  terminalLogs = [],
  onTerminalLog,
  previewPort = null,
  currentRepo = null,
  onFilesChange,
  previewReloadTrigger = 0
}) {
  const [tab, setTab] = useState(activeTab || 'preview');
  const fileKeys = Object.keys(files);
  const [selectedFile, setSelectedFile] = useState(currentFileName || fileKeys[0] || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarTab, setSidebarTab] = useState('files');
  const [copied, setCopied] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState({});
  const [terminalOpen, setTerminalOpen] = useState(true);
  const [activeTerminalTab, setActiveTerminalTab] = useState('terminal');

  // Device Viewport State: 'desktop' | 'tablet' | 'mobile'
  const [deviceViewport, setDeviceViewport] = useState('desktop');

  // File content — loaded from backend or from files prop
  const [fileContent, setFileContent] = useState('');
  const [originalContent, setOriginalContent] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Push
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [pushMessage, setPushMessage] = useState('');
  const [showPushInput, setShowPushInput] = useState(false);

  // Preview
  const [iframeKey, setIframeKey] = useState(0);

  // Terminal
  const [logs, setLogs] = useState(terminalLogs.length > 0 ? terminalLogs : [{ type: 'cwd', text: '~/project' }]);
  const [terminalInput, setTerminalInput] = useState('');
  const terminalEndRef = useRef(null);

  const currentTab = setActiveTab ? activeTab : tab;
  const handleTabChange = (newTab) => {
    if (setActiveTab) setActiveTab(newTab);
    setTab(newTab);
  };

  const activeFileKey = (selectedFile && files.hasOwnProperty(selectedFile)) ? selectedFile : (fileKeys[0] || '');
  const isMarkdownDoc = activeFileKey.endsWith('.md') || activeFileKey.endsWith('.txt');

  // Sync logs from parent
  useEffect(() => {
    if (terminalLogs && terminalLogs.length > 0) {
      setLogs(terminalLogs);
    }
  }, [terminalLogs]);

  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  // Sync selected file when parent changes currentFileName
  useEffect(() => {
    if (currentFileName) setSelectedFile(currentFileName);
  }, [currentFileName]);

  // Load file content when selected file changes
  useEffect(() => {
    if (!activeFileKey) return;

    const cachedContent = files[activeFileKey];

    if (cachedContent !== null && cachedContent !== undefined) {
      // Already have content (AI-generated files)
      setFileContent(cachedContent);
      setOriginalContent(cachedContent);
      setIsDirty(false);
      return;
    }

    // null = lazy load from backend
    if (currentRepo && activeFileKey.startsWith(currentRepo + '/')) {
      const relativePath = activeFileKey.slice(currentRepo.length + 1);
      fetch(`${API}/api/file?repo=${encodeURIComponent(currentRepo)}&path=${encodeURIComponent(relativePath)}`)
        .then(r => r.json())
        .then(data => {
          const content = data.content || '';
          setFileContent(content);
          setOriginalContent(content);
          setIsDirty(false);
          // Cache it
          if (onFilesChange) {
            onFilesChange(prev => ({ ...prev, [activeFileKey]: content }));
          }
        })
        .catch(() => {
          setFileContent('// Failed to load file');
          setOriginalContent('// Failed to load file');
        });
    }
  }, [activeFileKey, currentRepo]);

  const handleUndo = () => {
    setFileContent(originalContent);
    setIsDirty(false);
  };

  const toggleFolder = (folder) => {
    setExpandedFolders(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  const handleCopyCode = () => {
    if (!fileContent) return;
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!fileContent) return;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFileKey.split('/').pop() || 'file.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSaveFile = async () => {
    if (!currentRepo || !activeFileKey) return;
    const relativePath = activeFileKey.startsWith(currentRepo + '/') 
      ? activeFileKey.slice(currentRepo.length + 1) 
      : activeFileKey;
    setIsSaving(true);
    try {
      await fetch(`${API}/api/file`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repo: currentRepo, path: relativePath, content: fileContent })
      });
      if (onFilesChange) {
        onFilesChange(prev => ({ ...prev, [activeFileKey]: fileContent }));
      }
      setIsDirty(false);
    } catch {
      // ignore
    }
    setIsSaving(false);
  };

  const handlePush = async (token) => {
    if (!currentRepo) return;
    setIsPushing(true);
    try {
      const resp = await fetch(`${API}/api/push/${currentRepo}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, message: pushMessage || 'Update from Malvos' })
      });
      const data = await resp.json();
      if (data.ok) {
        if (onTerminalLog) onTerminalLog({ type: 'success', text: '✓ Pushed to GitHub successfully.' });
      } else {
        if (onTerminalLog) onTerminalLog({ type: 'error', text: `Push failed: ${data.error}` });
      }
    } catch (err) {
      if (onTerminalLog) onTerminalLog({ type: 'error', text: `Push error: ${err.message}` });
    }
    setIsPushing(false);
    setShowPushInput(false);
    setPushMessage('');
  };

  const handlePushClick = () => {
    const token = localStorage.getItem('malvos_gh_token');
    if (!token) {
      setShowTokenModal(true);
      return;
    }
    setShowPushInput(p => !p);
  };

  const handleTerminalSubmit = (e) => {
    if (e.key === 'Enter' && terminalInput.trim()) {
      const cmd = terminalInput.trim();
      const newEntry = { type: 'cmd', text: cmd };
      setLogs(prev => [...prev, newEntry]);
      if (onTerminalLog) onTerminalLog(newEntry);

      if (cmd === 'clear') {
        setLogs([{ type: 'cwd', text: '~/project' }]);
      } else {
        // Echo back — real commands run on the backend via the dev server process
        const info = { type: 'info', text: `Command received. Use backend terminal for live execution.` };
        setLogs(prev => [...prev, info]);
      }
      setTerminalInput('');
    }
  };

  const filteredFileKeys = fileKeys.filter(k =>
    !searchQuery || k.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group files into folder structure
  const folders = {};
  const rootFiles = [];
  filteredFileKeys.forEach(path => {
    if (path.includes('/')) {
      const folderName = path.split('/')[0];
      if (!folders[folderName]) folders[folderName] = [];
      folders[folderName].push(path);
    } else {
      rootFiles.push(path);
    }
  });

  // Auto-reload preview when trigger updates
  useEffect(() => {
    if (previewReloadTrigger) {
      setIframeKey(k => k + 1);
    }
  }, [previewReloadTrigger]);

  const lines = fileContent ? fileContent.split('\n') : [];

  return (
    <>
      {showTokenModal && (
        <GitHubTokenModal
          onClose={() => setShowTokenModal(false)}
          onSave={(token) => {
            setShowTokenModal(false);
            setShowPushInput(true);
          }}
        />
      )}

      <div className="flex flex-col h-[calc(100%-12px)] w-[calc(100%-6px)] my-1.5 mr-1.5 bg-[rgb(30,30,30)] text-[#ececed] rounded-tl-2xl rounded-bl-2xl border-l border-t border-b border-[rgb(55,55,60)] select-none overflow-hidden font-sans shadow-2xl">

        {/* ── Top Header ── */}
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-[rgb(55,55,60)] bg-[rgb(30,30,30)] flex-shrink-0">

          {/* Left: View Tabs */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center bg-[rgb(40,40,40)] p-0.5 rounded-xl border border-[rgb(60,60,60)]">
              <button
                onClick={() => handleTabChange('preview')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentTab === 'preview'
                    ? 'bg-[#0084ff] text-white shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Eye size={13} strokeWidth={2.2} />
                <span>Preview</span>
              </button>

              <button
                onClick={() => handleTabChange('code')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentTab === 'code'
                    ? 'bg-[#0084ff] text-white shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Code2 size={13} strokeWidth={2.2} />
                <span>Code</span>
              </button>

              <button
                onClick={() => handleTabChange('database')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  currentTab === 'database'
                    ? 'bg-[#0084ff] text-white shadow-sm'
                    : 'text-neutral-300 hover:text-white'
                }`}
                title="Database"
              >
                <Database size={13} strokeWidth={2.2} />
              </button>
            </div>

            {/* Device Viewport Toggle in Header (PC / Tablet / Mobile) */}
            <div className="flex items-center bg-[rgb(40,40,40)] p-0.5 rounded-xl border border-[rgb(60,60,60)] ml-1">
              <button
                onClick={() => { setDeviceViewport('desktop'); handleTabChange('preview'); }}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  deviceViewport === 'desktop' ? 'bg-[rgb(60,60,60)] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
                title="PC / Desktop View"
              >
                <Monitor size={13} />
              </button>
              <button
                onClick={() => { setDeviceViewport('tablet'); handleTabChange('preview'); }}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  deviceViewport === 'tablet' ? 'bg-[rgb(60,60,60)] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
                title="Tablet View"
              >
                <Tablet size={13} />
              </button>
              <button
                onClick={() => { setDeviceViewport('mobile'); handleTabChange('preview'); }}
                className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                  deviceViewport === 'mobile' ? 'bg-[rgb(60,60,60)] text-white shadow-sm' : 'text-neutral-400 hover:text-white'
                }`}
                title="iPhone 16 Pro View"
              >
                <Smartphone size={13} />
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {isDirty && currentRepo && (
              <button
                onClick={handleSaveFile}
                disabled={isSaving}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white border border-emerald-500 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Save size={12} />
                <span>{isSaving ? 'Saving…' : 'Save'}</span>
              </button>
            )}

            {currentRepo && (
              <button
                onClick={handlePushClick}
                disabled={isPushing}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[rgb(45,45,45)] hover:bg-[rgb(55,55,55)] text-neutral-200 hover:text-white border border-[rgb(60,60,60)] text-xs font-medium transition-colors cursor-pointer"
              >
                <Github size={12} />
                <span>{isPushing ? 'Pushing…' : 'Push'}</span>
              </button>
            )}

            <button className="px-3 py-1 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer">
              Upgrade
            </button>

            <button className="px-3 py-1 bg-[rgb(45,45,45)] hover:bg-[rgb(55,55,55)] text-neutral-200 hover:text-white border border-[rgb(60,60,60)] text-xs font-medium rounded-lg transition-colors cursor-pointer">
              Share
            </button>

            <a
              href={previewPort ? `http://localhost:${previewPort}` : '#'}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1 bg-[#0084ff] hover:bg-[#0074e0] text-white text-xs font-semibold rounded-lg shadow-sm shadow-blue-500/20 transition-all cursor-pointer select-none"
              title="Publish / Open in New Tab"
            >
              <span>Publish</span>
              <ExternalLink size={12} strokeWidth={2.4} />
            </a>
          </div>
        </div>

        {/* Push commit message bar */}
        {showPushInput && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[rgb(28,28,28)] border-b border-[rgb(55,55,60)]">
            <input
              value={pushMessage}
              onChange={e => setPushMessage(e.target.value)}
              placeholder="Commit message (optional)…"
              className="flex-1 bg-[rgb(40,40,40)] border border-[rgb(60,60,60)] rounded-lg px-3 py-1.5 text-xs text-white placeholder-neutral-500 outline-none focus:border-blue-500"
              onKeyDown={e => e.key === 'Enter' && handlePush(localStorage.getItem('malvos_gh_token'))}
            />
            <button
              onClick={() => handlePush(localStorage.getItem('malvos_gh_token'))}
              className="px-3 py-1.5 bg-[#0084ff] hover:bg-[#0074e0] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Push to GitHub
            </button>
          </div>
        )}

        {/* ── Main Workspace Body ── */}
        <div className="flex-1 flex overflow-hidden">

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: CODE & DOCUMENT EXPLORER                                     */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {currentTab === 'code' && (
            <div className="flex h-full w-full overflow-hidden">

              {/* Left Sub-sidebar: File Tree */}
              <div className="w-56 flex-shrink-0 border-r border-[rgb(55,55,60)] bg-[rgb(32,32,32)] flex flex-col font-sans">

                <div className="flex items-center px-3 py-2 border-b border-[rgb(55,55,60)] text-xs font-medium text-neutral-400 gap-4">
                  <button
                    onClick={() => setSidebarTab('files')}
                    className={`flex items-center gap-1.5 cursor-pointer ${sidebarTab === 'files' ? 'text-white font-semibold' : 'hover:text-white'}`}
                  >
                    <FileCode size={13} />
                    <span>Files</span>
                  </button>
                  <button
                    onClick={() => setSidebarTab('search')}
                    className={`flex items-center gap-1.5 cursor-pointer ${sidebarTab === 'search' ? 'text-white font-semibold' : 'hover:text-white'}`}
                  >
                    <Search size={13} />
                    <span>Search</span>
                  </button>
                </div>

                {sidebarTab === 'search' && (
                  <div className="p-2 border-b border-[rgb(55,55,60)]">
                    <input
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Search in files..."
                      className="w-full bg-[rgb(40,40,40)] border border-[rgb(60,60,60)] rounded-lg px-2.5 py-1 text-xs text-white outline-none placeholder-neutral-500"
                    />
                  </div>
                )}

                <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5 text-xs font-mono scrollbar-thin">
                  {filteredFileKeys.length === 0 ? (
                    <div className="p-3 text-center text-neutral-500 text-[11.5px] font-sans">
                      No files in workspace
                    </div>
                  ) : (
                    buildFileTree(filteredFileKeys).map(node => (
                      <TreeNode
                        key={node.name}
                        node={node}
                        activeFileKey={activeFileKey}
                        onSelectFile={(f) => {
                          setSelectedFile(f);
                          if (onSelectFile) onSelectFile(f);
                        }}
                        expandedFolders={expandedFolders}
                        toggleFolder={toggleFolder}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Right Editor / Document Preview Canvas */}
              <div className="flex-1 flex flex-col h-full overflow-hidden bg-[rgb(30,30,30)]">

                {/* Breadcrumb Header with Actions */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-[rgb(55,55,60)] bg-[rgb(34,34,34)] text-xs text-neutral-300 font-mono flex-shrink-0">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="text-neutral-400 truncate">{activeFileKey.includes('/') ? activeFileKey.split('/')[0] : 'root'}</span>
                    <ChevronRight size={11} className="text-neutral-500 flex-shrink-0" />
                    <span className="text-white font-medium truncate">{activeFileKey.split('/').pop() || 'No file selected'}</span>
                    {isDirty && <span className="ml-1 w-1.5 h-1.5 rounded-full bg-amber-400 inline-block flex-shrink-0" title="Unsaved changes" />}
                  </div>
                  <div className="flex items-center gap-2">
                    {isDirty && (
                      <button
                        onClick={handleUndo}
                        className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#2a2a30] hover:bg-[#353540] text-neutral-300 text-[11px] font-sans transition-colors cursor-pointer"
                        title="Undo changes"
                      >
                        <Undo2 size={12} />
                        <span>Undo</span>
                      </button>
                    )}
                    {isDirty && (
                      <button
                        onClick={handleSaveFile}
                        disabled={isSaving}
                        className="flex items-center gap-1 px-2.5 py-0.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-sans font-medium transition-colors cursor-pointer"
                        title="Save file (Ctrl+S)"
                      >
                        <Save size={12} />
                        <span>{isSaving ? 'Saving...' : 'Save'}</span>
                      </button>
                    )}
                    {fileContent && (
                      <span className="text-[11px] text-neutral-400 font-sans ml-1">
                        {lines.length} lines
                      </span>
                    )}
                  </div>
                </div>

                {/* Document Preview or Code Editor */}
                <div className="flex-1 overflow-auto scrollbar-thin bg-[rgb(28,28,28)]">
                  {activeFileKey ? (
                    isMarkdownDoc ? (
                      /* ─── White Sheet Document Preview ─── */
                      <div className="p-4">
                        <div className="max-w-3xl mx-auto bg-[#ffffff] text-[#111827] p-8 sm:p-10 rounded-2xl shadow-xl font-sans selection:bg-blue-100 selection:text-black leading-relaxed">
                          <pre className="whitespace-pre-wrap font-sans text-[13.5px] leading-relaxed text-[#111827]">
                            {fileContent}
                          </pre>
                        </div>
                      </div>
                    ) : (
                      /* ─── Editable Code Editor ─── */
                      <div className="flex min-w-full h-full font-mono text-[12.5px] leading-relaxed">
                        {/* Line numbers */}
                        <div className="flex flex-col text-right pr-3 pt-4 pb-4 text-neutral-600 select-none flex-shrink-0 text-[12px] bg-[rgb(26,26,26)] border-r border-[rgb(40,40,40)]">
                          {lines.map((_, i) => (
                            <div key={i} className="leading-relaxed px-2">{i + 1}</div>
                          ))}
                        </div>
                        {/* Editable textarea */}
                        <textarea
                          value={fileContent}
                          onChange={e => {
                            setFileContent(e.target.value);
                            setIsDirty(true);
                          }}
                          onKeyDown={e => {
                            // Tab key inserts 2 spaces
                            if (e.key === 'Tab') {
                              e.preventDefault();
                              const s = e.target.selectionStart;
                              const end = e.target.selectionEnd;
                              const val = fileContent;
                              setFileContent(val.substring(0, s) + '  ' + val.substring(end));
                              setTimeout(() => e.target.setSelectionRange(s + 2, s + 2), 0);
                            }
                            // Ctrl+S saves
                            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                              e.preventDefault();
                              handleSaveFile();
                            }
                          }}
                          spellCheck={false}
                          className="flex-1 bg-transparent outline-none resize-none text-neutral-100 p-4 pt-4 font-mono text-[12.5px] leading-relaxed whitespace-pre"
                        />
                      </div>
                    )
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center text-neutral-500 font-sans">
                      <FileCode size={36} className="mb-2 opacity-40" />
                      <p className="text-sm font-medium text-neutral-400">Select a file to inspect</p>
                    </div>
                  )}
                </div>

                {/* Bottom Terminal Dock */}
                <div className="border-t border-[rgb(55,55,60)] bg-[rgb(24,24,24)] flex flex-col font-mono flex-shrink-0">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-[rgb(28,28,28)] border-b border-[rgb(45,45,45)] text-xs text-neutral-400 select-none">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setActiveTerminalTab('bolt')}
                        className={`flex items-center gap-1.5 cursor-pointer ${activeTerminalTab === 'bolt' ? 'text-white font-semibold' : 'hover:text-white'}`}
                      >
                        <Zap size={12} className="text-violet-400" />
                        <span>Bolt</span>
                      </button>
                      <button
                        onClick={() => setActiveTerminalTab('publish')}
                        className={`flex items-center gap-1.5 cursor-pointer ${activeTerminalTab === 'publish' ? 'text-white font-semibold' : 'hover:text-white'}`}
                      >
                        <Rocket size={12} className="text-blue-400" />
                        <span>Publish Output</span>
                      </button>
                      <button
                        onClick={() => setActiveTerminalTab('terminal')}
                        className={`flex items-center gap-1.5 cursor-pointer ${activeTerminalTab === 'terminal' ? 'text-white font-semibold' : 'hover:text-white'}`}
                      >
                        <TerminalIcon size={12} className="text-emerald-400" />
                        <span>Terminal</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setTerminalOpen(o => !o)}
                      className="p-1 text-neutral-400 hover:text-white cursor-pointer"
                    >
                      <ChevronDown size={13} className={`transition-transform ${terminalOpen ? '' : 'rotate-180'}`} />
                    </button>
                  </div>

                  {terminalOpen && (
                    <div className="p-3 text-[11.5px] leading-relaxed text-neutral-300 max-h-36 overflow-y-auto select-text scrollbar-thin bg-[rgb(20,20,20)]">
                      {logs.map((log, idx) => (
                        <div key={idx}>
                          {log.type === 'cwd' && <div className="text-neutral-400">{log.text}</div>}
                          {log.type === 'cmd' && (
                            <div className="text-white flex items-center gap-1">
                              <span className="text-neutral-500">&gt;</span>
                              <span>{log.text}</span>
                            </div>
                          )}
                          {log.type === 'success' && <div className="text-emerald-400">{log.text}</div>}
                          {log.type === 'info' && <div className="text-neutral-300">{log.text}</div>}
                          {log.type === 'error' && <div className="text-rose-400">{log.text}</div>}
                        </div>
                      ))}

                      <div className="flex items-center gap-1.5 mt-1 pt-1 border-t border-[rgb(35,35,35)] text-white">
                        <span className="text-emerald-400 font-bold">$</span>
                        <input
                          value={terminalInput}
                          onChange={e => setTerminalInput(e.target.value)}
                          onKeyDown={handleTerminalSubmit}
                          placeholder="Type a command..."
                          className="w-full bg-transparent outline-none text-xs text-white placeholder-neutral-600 font-mono"
                        />
                      </div>
                      <div ref={terminalEndRef} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: PREVIEW                                                       */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {currentTab === 'preview' && (
            <div className="relative flex-1 flex flex-col h-full w-full bg-[rgb(20,20,22)] overflow-hidden">
              {(previewPort || Object.keys(files).length > 0) ? (
                <div className="flex-1 overflow-auto flex items-center justify-center p-4 bg-[rgb(18,18,20)]">
                  {deviceViewport === 'desktop' && (
                    <iframe
                      key={iframeKey}
                      src={previewPort ? `http://localhost:${previewPort}` : undefined}
                      srcDoc={!previewPort ? generateLivePreviewSrcdoc(files) : undefined}
                      className="w-full h-full border-0 bg-black shadow-xl"
                      title="App Desktop Preview"
                      sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
                    />
                  )}

                  {deviceViewport === 'tablet' && (
                    <div className="relative w-[768px] h-[92%] max-h-[960px] bg-[#1a1a1e] border-[8px] border-[#2d2d34] rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col">
                      <iframe
                        key={iframeKey}
                        src={previewPort ? `http://localhost:${previewPort}` : undefined}
                        srcDoc={!previewPort ? generateLivePreviewSrcdoc(files) : undefined}
                        className="flex-1 w-full h-full border-0 bg-black"
                        title="App Tablet Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
                      />
                    </div>
                  )}

                  {deviceViewport === 'mobile' && (
                    /* ─── iPhone 16 Pro Realistic Device Mockup ─── */
                    <div className="relative w-[385px] h-[830px] max-h-[97%] bg-black border-[5px] border-[#1e1e22] ring-1 ring-white/15 rounded-[50px] shadow-[0_30px_90px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col flex-shrink-0">
                      {/* Dynamic Island Notch */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[108px] h-[28px] bg-black rounded-full z-30 shadow-lg pointer-events-none flex items-center justify-between px-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#121216] border border-[#22222a]" />
                        <div className="w-2 h-2 rounded-full bg-[#081b2e]/90" />
                      </div>

                      {/* Mobile Screen Iframe */}
                      <iframe
                        key={iframeKey}
                        src={previewPort ? `http://localhost:${previewPort}` : undefined}
                        srcDoc={!previewPort ? generateLivePreviewSrcdoc(files) : undefined}
                        className="flex-1 w-full h-full border-0 bg-black rounded-[44px]"
                        title="iPhone 16 Pro Preview"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
                      />

                      {/* Bottom Home Indicator Bar */}
                      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/40 rounded-full z-30 pointer-events-none" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-neutral-500">
                  <Eye size={32} className="mb-2 opacity-30" />
                  <p className="text-sm font-medium text-neutral-400">Ask Malvos to build an app or website to see its live preview here</p>
                </div>
              )}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* TAB: DATABASE                                                      */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          {currentTab === 'database' && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[rgb(30,30,30)] text-neutral-400 text-xs">
              <Database size={32} className="mb-2 opacity-50 text-emerald-400" />
              <p className="font-semibold text-white">Database</p>
              <p className="mt-1 text-neutral-500 max-w-xs">No active database connections configured.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
