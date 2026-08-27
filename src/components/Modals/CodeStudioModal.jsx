import React, { useState } from 'react';
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
  Terminal, 
  Sparkles,
  Maximize2,
  Minimize2,
  Code2
} from 'lucide-react';

const INITIAL_PROJECT_FILES = {
  '.lovable/project.json': `{\n  "id": "coded-saas-core",\n  "framework": "react-19-vite",\n  "autonomous": true,\n  "agentVersion": "2.5.0"\n}`,
  'public/favicon.ico': `[Binary Icon File]`,
  'public/robots.txt': `User-agent: *\nAllow: /\nSitemap: https://coded.ai/sitemap.xml`,
  'src/components/dashboard/Shell.tsx': `import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  Send,
  FileEdit,
  Users,
  BarChart3,
  Mic2,
  Blocks,
  Settings,
  Database,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

type NavItem = {
  to?: "/dashboard" | "/dashboard/campaigns" | "/dashboard/content";
  label: string;
  icon: typeof Home;
  exact?: boolean;
};

const nav: NavItem[] = [
  { to: "/dashboard", label: "Home", icon: Home, exact: true },
  { to: "/dashboard/campaigns", label: "Campaigns", icon: Send },
  { to: "/dashboard/content", label: "Content", icon: FileEdit },
  { label: "Audience", icon: Users },
  { label: "Analytics", icon: BarChart3 },
  { label: "Brand Voice", icon: Mic2 },
  { label: "Integrations", icon: Blocks },
  { label: "Settings", icon: Settings },
];

export default function Shell({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0c0c0e] text-white">
      <aside className="w-64 border-r border-[#222228] p-4 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-2">
            <Sparkles size={18} className="text-pink-400" />
            <span className="font-bold text-base">CODED Platform</span>
          </div>
          <nav className="space-y-1">
            {nav.map((item, i) => (
              <button key={i} className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-[#1a1a20]">
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
}`,
  'src/hooks/use-mobile.tsx': `import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(\`(max-width: \${MOBILE_BREAKPOINT - 1}px)\`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}`,
  'src/routes/router.tsx': `import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}`,
  'src/server.ts': `import express from "express";
const app = express();
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

export default app;`,
  'src/styles.css': `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\nbody {\n  background-color: #0c0c0e;\n  color: #ededed;\n}`,
  '.gitignore': `node_modules\n.env\ndist\n.DS_Store`,
  '.prettierrc': `{\n  "semi": true,\n  "singleQuote": false,\n  "tabWidth": 2\n}`,
  'AGENTS.md': `# CODED Autonomous Agent Workspace\n- Model: Qwen2.5-Coder-7B-Instruct\n- Tooling: TanStack Router + Vite + TypeScript\n- State: Production Ready`,
  'package.json': `{\n  "name": "coded-autonomous-app",\n  "private": true,\n  "version": "1.0.0",\n  "type": "module",\n  "scripts": {\n    "dev": "vite",\n    "build": "tsc && vite build"\n  },\n  "dependencies": {\n    "react": "^19.0.0",\n    "react-dom": "^19.0.0",\n    "lucide-react": "^0.475.0",\n    "@tanstack/react-router": "^1.95.0"\n  },\n  "devDependencies": {\n    "typescript": "^5.7.0",\n    "vite": "^6.2.0",\n    "tailwindcss": "^3.4.17"\n  }\n}`
};

export default function CodeStudioModal({ isOpen, onClose, initialFile = 'src/components/dashboard/Shell.tsx' }) {
  const [openTabs, setOpenTabs] = useState(['src/hooks/use-mobile.tsx', 'src/components/dashboard/Shell.tsx']);
  const [activeTab, setActiveTab] = useState(initialFile);
  const [searchFilter, setSearchFilter] = useState('');
  const [copied, setCopied] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Folder open/closed states
  const [openFolders, setOpenFolders] = useState({
    '.lovable': true,
    'public': true,
    'src': true,
    'src/components': true,
    'src/components/dashboard': true,
    'src/hooks': true,
    'src/routes': true
  });

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
    const code = INITIAL_PROJECT_FILES[activeTab] || '';
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentCode = INITIAL_PROJECT_FILES[activeTab] || '// Select a file from the explorer';
  const codeLines = currentCode.split('\n');

  const filesList = Object.keys(INITIAL_PROJECT_FILES);
  const filteredFiles = searchFilter 
    ? filesList.filter(f => f.toLowerCase().includes(searchFilter.toLowerCase()))
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className={`relative flex flex-col bg-[#141416] border border-[#26262e] rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 ${
        isFullScreen ? 'w-screen h-screen rounded-none' : 'w-full max-w-6xl h-[88vh]'
      }`}>
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#18181c] border-b border-[#24242c] select-none">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-300">
            <Code2 size={15} className="text-pink-400" />
            <span>CODED Autonomous Code Studio</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#202028] border border-[#30303a] text-neutral-400">
              Qwen 2.5 Coder
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#262630] transition-colors"
              title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            >
              {isFullScreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-[#262630] transition-colors"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Main Split Body */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left File Tree Sidebar matching screenshot */}
          <div className="w-64 flex-shrink-0 bg-[#121214] border-r border-[#222228] flex flex-col select-none">
            {/* Search code input */}
            <div className="p-2.5 border-b border-[#202026]">
              <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#19191d] border border-[#2b2b34] text-xs">
                <Search size={13} className="text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search code"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="bg-transparent outline-none text-xs text-white w-full placeholder-neutral-500"
                />
              </div>
            </div>

            {/* Tree Items */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5 text-xs text-neutral-300 scrollbar-thin">
              {filteredFiles ? (
                filteredFiles.map((file) => (
                  <button
                    key={file}
                    onClick={() => handleSelectFile(file)}
                    className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-left truncate transition-colors ${
                      activeTab === file ? 'bg-[#202028] text-white font-medium' : 'hover:bg-[#18181e] text-neutral-400'
                    }`}
                  >
                    <FileCode size={13} className="text-blue-400 flex-shrink-0" />
                    <span className="truncate">{file}</span>
                  </button>
                ))
              ) : (
                <>
                  {/* .lovable */}
                  <div>
                    <button 
                      onClick={() => toggleFolder('.lovable')}
                      className="flex items-center gap-1.5 w-full px-1.5 py-1 rounded hover:bg-[#18181e] text-neutral-400 font-medium"
                    >
                      {openFolders['.lovable'] ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                      <span className="text-[12px]">.lovable</span>
                    </button>
                    {openFolders['.lovable'] && (
                      <div className="ml-4 space-y-0.5">
                        <button
                          onClick={() => handleSelectFile('.lovable/project.json')}
                          className={`flex items-center gap-2 w-full px-2 py-1 rounded text-left truncate ${
                            activeTab === '.lovable/project.json' ? 'bg-[#202028] text-white font-medium' : 'hover:bg-[#18181e] text-neutral-400'
                          }`}
                        >
                          <FileText size={12} className="text-yellow-400" />
                          <span>project.json</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* public */}
                  <div>
                    <button 
                      onClick={() => toggleFolder('public')}
                      className="flex items-center gap-1.5 w-full px-1.5 py-1 rounded hover:bg-[#18181e] text-neutral-400 font-medium"
                    >
                      {openFolders['public'] ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                      <span className="text-[12px]">public</span>
                    </button>
                    {openFolders['public'] && (
                      <div className="ml-4 space-y-0.5">
                        <button onClick={() => handleSelectFile('public/favicon.ico')} className="flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-[#18181e] text-neutral-400">
                          <FileText size={12} className="text-neutral-500" />
                          <span>favicon.ico</span>
                        </button>
                        <button onClick={() => handleSelectFile('public/robots.txt')} className="flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-[#18181e] text-neutral-400">
                          <FileText size={12} className="text-neutral-500" />
                          <span>robots.txt</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* src */}
                  <div>
                    <button 
                      onClick={() => toggleFolder('src')}
                      className="flex items-center gap-1.5 w-full px-1.5 py-1 rounded hover:bg-[#18181e] text-neutral-400 font-medium"
                    >
                      {openFolders['src'] ? <ChevronDown size={13} /> : <ChevronRight size={13} />}
                      <span className="text-[12px]">src</span>
                    </button>
                    {openFolders['src'] && (
                      <div className="ml-4 space-y-0.5">
                        {/* src/components */}
                        <div>
                          <button onClick={() => toggleFolder('src/components')} className="flex items-center gap-1.5 w-full px-1.5 py-1 rounded hover:bg-[#18181e] text-neutral-400">
                            {openFolders['src/components'] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                            <span>components</span>
                          </button>
                          {openFolders['src/components'] && (
                            <div className="ml-4 space-y-0.5">
                              <div>
                                <button onClick={() => toggleFolder('src/components/dashboard')} className="flex items-center gap-1.5 w-full px-1.5 py-1 rounded hover:bg-[#18181e] text-neutral-400">
                                  {openFolders['src/components/dashboard'] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                                  <span>dashboard</span>
                                </button>
                                {openFolders['src/components/dashboard'] && (
                                  <div className="ml-4 space-y-0.5">
                                    <button
                                      onClick={() => handleSelectFile('src/components/dashboard/Shell.tsx')}
                                      className={`flex items-center gap-2 w-full px-2 py-1 rounded text-left truncate ${
                                        activeTab === 'src/components/dashboard/Shell.tsx' ? 'bg-[#202028] text-white font-medium' : 'hover:bg-[#18181e] text-neutral-400'
                                      }`}
                                    >
                                      <FileCode size={12} className="text-blue-400" />
                                      <span>Shell.tsx</span>
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* src/hooks */}
                        <div>
                          <button onClick={() => toggleFolder('src/hooks')} className="flex items-center gap-1.5 w-full px-1.5 py-1 rounded hover:bg-[#18181e] text-neutral-400">
                            {openFolders['src/hooks'] ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
                            <span>hooks</span>
                          </button>
                          {openFolders['src/hooks'] && (
                            <div className="ml-4 space-y-0.5">
                              <button
                                onClick={() => handleSelectFile('src/hooks/use-mobile.tsx')}
                                className={`flex items-center gap-2 w-full px-2 py-1 rounded text-left truncate ${
                                  activeTab === 'src/hooks/use-mobile.tsx' ? 'bg-[#202028] text-white font-medium' : 'hover:bg-[#18181e] text-neutral-400'
                                }`}
                              >
                                <FileCode size={12} className="text-blue-400" />
                                <span>use-mobile.tsx</span>
                              </button>
                            </div>
                          )}
                        </div>

                        {/* src files */}
                        <button onClick={() => handleSelectFile('src/routes/router.tsx')} className={`flex items-center gap-2 w-full px-2 py-1 rounded ${activeTab === 'src/routes/router.tsx' ? 'bg-[#202028] text-white' : 'text-neutral-400 hover:bg-[#18181e]'}`}>
                          <FileCode size={12} className="text-cyan-400" />
                          <span>router.tsx</span>
                        </button>
                        <button onClick={() => handleSelectFile('src/server.ts')} className={`flex items-center gap-2 w-full px-2 py-1 rounded ${activeTab === 'src/server.ts' ? 'bg-[#202028] text-white' : 'text-neutral-400 hover:bg-[#18181e]'}`}>
                          <FileCode size={12} className="text-blue-400" />
                          <span>server.ts</span>
                        </button>
                        <button onClick={() => handleSelectFile('src/styles.css')} className={`flex items-center gap-2 w-full px-2 py-1 rounded ${activeTab === 'src/styles.css' ? 'bg-[#202028] text-white' : 'text-neutral-400 hover:bg-[#18181e]'}`}>
                          <FileText size={12} className="text-purple-400" />
                          <span>styles.css</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Root Config Files */}
                  <div className="pt-2 border-t border-[#1e1e24] space-y-0.5">
                    <button onClick={() => handleSelectFile('.gitignore')} className="flex items-center gap-2 w-full px-2 py-1 rounded text-neutral-400 hover:bg-[#18181e]">
                      <FileText size={12} className="text-neutral-500" />
                      <span>.gitignore</span>
                    </button>
                    <button onClick={() => handleSelectFile('.prettierrc')} className="flex items-center gap-2 w-full px-2 py-1 rounded text-neutral-400 hover:bg-[#18181e]">
                      <FileText size={12} className="text-neutral-500" />
                      <span>.prettierrc</span>
                    </button>
                    <button onClick={() => handleSelectFile('AGENTS.md')} className="flex items-center gap-2 w-full px-2 py-1 rounded text-neutral-400 hover:bg-[#18181e]">
                      <FileText size={12} className="text-emerald-400" />
                      <span>AGENTS.md</span>
                    </button>
                    <button onClick={() => handleSelectFile('package.json')} className={`flex items-center gap-2 w-full px-2 py-1 rounded ${activeTab === 'package.json' ? 'bg-[#202028] text-white font-medium' : 'text-neutral-400 hover:bg-[#18181e]'}`}>
                      <FileText size={12} className="text-yellow-400" />
                      <span>package.json</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Right Code Editor Pane matching screenshot */}
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
                    <span className="truncate max-w-[160px]">{tab}</span>
                    <button
                      onClick={(e) => handleCloseTab(tab, e)}
                      className="text-neutral-500 hover:text-white p-0.5 rounded"
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
                  className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white px-2 py-1 rounded hover:bg-[#202028] transition-colors"
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
                  className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-2.5 py-1 rounded-lg bg-[#202028] hover:bg-[#282834] border border-[#30303c] transition-colors"
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
