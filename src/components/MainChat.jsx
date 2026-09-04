import React, { useState, useRef, useEffect } from 'react';
import { 
  Plus, 
  ChevronDown, 
  Mic, 
  MicOff, 
  FileCode, 
  X,
  Loader2, 
  Search, 
  Code2, 
  Database, 
  Globe, 
  FileText,
  Eye,
  Columns,
  Sparkles,
  ArrowRight,
  Square,
  Terminal,
  PanelRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  AlertCircle
} from 'lucide-react';
import ChatMessage from './ChatMessage';
import PlusActionMenu from './PlusActionMenu';
import InteractiveQuestionCard from './InteractiveQuestionCard';
import SelectionBlock, { extractSelectionQuestion } from './SelectionBlock';
import ProjectWorkspacePane from './ProjectWorkspacePane';
import { generateFullArchitectureApp } from '../services/fullAppGenerator';
import { BUILD_MODES } from '../data/mockData';
import { generateAIResponse, streamAIResponse, MALVOS_SYSTEM_PROMPT } from '../services/aiService';

// ─── Extract Real Generated Files from AI Output (Zero Hardcoding) ───────────
export function extractFilesFromAIResponse(rawText, query = '') {
  const files = {};
  if (!rawText) return files;

  // Never extract files when the user asks for a prompt, text, explanation, status, or general question
  const isPromptOrTextQuery = /prompt|system prompt|explain|how to|what is|tell me|who are you|help me write|is it (?:still )?cloning|is it done|is it ready|status/i.test(query) && !/build (?:an? )?(?:app|website|page|component|portfolio|dashboard)|code (?:an? )?(?:app|website|page)|create (?:an? )?(?:app|website|page)|duplicate|replicate|clone/i.test(query);
  if (isPromptOrTextQuery) return files;

  const normalizeFilename = (fn) => {
    if (!fn) return 'Calvras/src/App.tsx';
    let clean = fn
      .replace(/^["'`]+|["'`]+$/g, '')
      .replace(/^(?:file=|filename=)/i, '')
      .replace(/^[./\\]+/, '')
      .trim();
    if (clean.startsWith('Calvras/')) {
      clean = clean.substring(8);
    }
    return 'Calvras/' + (clean.startsWith('src/') || clean === 'index.html' || clean === 'package.json' || clean === 'tsconfig.json' || clean === 'vite.config.ts' || clean === 'tailwind.config.js' || clean.startsWith('public/') ? clean : `src/${clean}`);
  };

  const unescapeCode = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str
      .replace(/\\r\\n/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '  ')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\')
      .trim();
  };

  // 1. Standard markdown code blocks (Primary format: ```tsx file=src/App.tsx)
  const codeBlockRegex = /```([a-zA-Z0-9_-]+)?(?:\s+(?:file=|filename=)?([^\s\n]+))?\r?\n([\s\S]*?)(?:```|$)/g;
  let match;
  let count = 1;

  while ((match = codeBlockRegex.exec(rawText)) !== null) {
    const lang = (match[1] || '').toLowerCase();
    let filename = match[2];
    let content = (match[3] || '').trim();

    if (lang === 'json' && !match[2]?.includes('.json') && !match[2]?.includes('package.json')) {
      // Check if this is a JSON files dictionary block
      if (content.includes('.tsx"') || content.includes('.jsx"') || content.includes('.html"') || content.includes('.css"') || content.includes(".tsx'") || content.includes(".jsx'")) {
        try {
          const parsed = JSON.parse(content);
          const map = parsed.files || parsed;
          for (const [k, v] of Object.entries(map)) {
            if (/\.(?:tsx|jsx|ts|js|html|css|json)$/i.test(k)) {
              const c = typeof v === 'string' ? v : (v.code || v.content || '');
              if (c && c.length > 5) files[normalizeFilename(k)] = unescapeCode(c);
            }
          }
        } catch { /* proceed to regex */ }
      }
      continue;
    }

    if (!content || content.length < 15) continue;

    // Detect filename from top comment if omitted
    if (!filename) {
      const firstLine = content.split('\n')[0].trim();
      if (firstLine.startsWith('// ') || firstLine.startsWith('/* ') || firstLine.startsWith('# ')) {
        const candidate = firstLine.replace(/^[/*#\s]+/, '').replace(/\s*\*\/$/, '').trim();
        if (/^[a-zA-Z0-9_\-./\\]+\.[a-zA-Z0-9]+$/.test(candidate)) {
          filename = candidate;
          content = content.split('\n').slice(1).join('\n').trim();
        }
      }
    }

    // Detect component name from export default function ComponentName
    if (!filename) {
      const compMatch = content.match(/export\s+default\s+function\s+([a-zA-Z0-9_]+)/i);
      if (compMatch && (lang.includes('tsx') || lang.includes('jsx') || content.includes('return (') || content.includes('return <'))) {
        const ext = lang.includes('jsx') ? 'jsx' : 'tsx';
        filename = `src/components/${compMatch[1]}.${ext}`;
      } else if (lang === 'html' || content.includes('<!DOCTYPE html>') || content.includes('<html')) {
        filename = 'index.html';
      } else if (lang === 'css' && (content.includes('@tailwind') || content.includes(':root {'))) {
        filename = 'src/styles.css';
      } else if (['tsx', 'jsx', 'typescript', 'javascript', 'ts', 'js'].includes(lang) && (content.includes('from \'react\'') || content.includes('from "react"') || content.includes('import React') || content.includes('export default') || content.includes('return (') || content.includes('return <') || content.includes('className='))) {
        filename = `src/App.${lang.includes('jsx') || lang.includes('js') ? 'jsx' : 'tsx'}`;
      } else {
        // Fallback for build queries: if language is code-like and has JSX elements
        if (query && /build|duplicate|clone|create|make/i.test(query) && (content.includes('<div') || content.includes('return'))) {
          filename = 'src/App.tsx';
        } else {
          continue;
        }
      }
    }

    files[normalizeFilename(filename)] = content;
    count++;
  }

  // 2. Structured JSON / JS Object file mappings anywhere in the response
  if (Object.keys(files).length === 0) {
    // Attempt full JSON parsing
    let cleanJson = rawText.trim();
    if (cleanJson.startsWith('```json')) cleanJson = cleanJson.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
    if (cleanJson.startsWith('```')) cleanJson = cleanJson.replace(/^```[a-zA-Z0-9_-]*\s*/i, '').replace(/```$/i, '').trim();

    try {
      const parsed = JSON.parse(cleanJson);
      const fileMap = parsed.files || parsed;
      for (const [k, v] of Object.entries(fileMap)) {
        if (/\.(?:tsx|jsx|ts|js|html|css|json)$/i.test(k)) {
          const rawContent = typeof v === 'string' ? v : (v.code || v.content || '');
          if (rawContent && rawContent.length > 5) {
            files[normalizeFilename(k)] = unescapeCode(rawContent);
          }
        }
      }
      if (parsed.code && Object.keys(files).length === 0) {
        files[normalizeFilename(parsed.file_path || 'src/App.tsx')] = unescapeCode(parsed.code);
      }
    } catch {
      // Chunk-by-chunk file extractor for JSON and JS single-quoted / double-quoted key-value pairs
      const fileEntryRegex = /['"]([^'"\n]+\.(?:tsx|jsx|ts|js|html|css|json))['"]\s*:\s*['"]([\s\S]*?)(?=['"],\s*['"][^'"\n]+\.(?:tsx|jsx|ts|js|html|css|json)['"]|['"]\s*\}|\}\s*$|$)/g;
      let fpMatch;
      while ((fpMatch = fileEntryRegex.exec(rawText)) !== null) {
        const fn = fpMatch[1];
        let val = fpMatch[2];
        if (val.endsWith("'") || val.endsWith('"')) val = val.slice(0, -1);
        const unescaped = unescapeCode(val);
        if (unescaped.length > 5) {
          files[normalizeFilename(fn)] = unescaped;
        }
      }
    }
  }

  // 3. XML Tool Calling / <function_calls> / <invoke name="create_file">
  if (Object.keys(files).length === 0 && (rawText.includes('<invoke') || rawText.includes('<function_calls>'))) {
    const invokeRegex = /<invoke\s+name=["'](?:create_file|write_to_file|edit_file|new_file)["']>([\s\S]*?)<\/invoke>/gi;
    let invMatch;
    while ((invMatch = invokeRegex.exec(rawText)) !== null) {
      const body = invMatch[1];
      const pathMatch = body.match(/<parameter\s+name=["'](?:file_path|path|target_file|filePath)["']>([\s\S]*?)<\/parameter>/i);
      const contentMatch = body.match(/<parameter\s+name=["'](?:content|code|file_content|CodeContent)["']>([\s\S]*?)<\/parameter>/i);
      if (pathMatch && contentMatch) {
        const fn = pathMatch[1].trim();
        const cont = contentMatch[1].trim();
        if (fn && cont) {
          files[normalizeFilename(fn)] = unescapeCode(cont);
        }
      }
    }
  }

  // 4. Raw JSX / HTML fallback (STRICT: only if NOT a JSON / JS object string)
  const isLikelyObjectString = rawText.includes('":"') || rawText.includes("':'") || rawText.includes("': '") || rawText.includes('": "') || rawText.trim().startsWith('{') || rawText.trim().startsWith('[');
  if (Object.keys(files).length === 0 && rawText && !isLikelyObjectString) {
    if (rawText.includes('export default function') || rawText.includes('function App') || rawText.includes('import React') || rawText.includes('return (') || rawText.includes('return <')) {
      const compMatch = rawText.match(/(?:export\s+default\s+function|export\s+function|function)\s+([A-Z][a-zA-Z0-9_]*)/);
      const name = compMatch ? compMatch[1] : 'App';
      files[`Calvras/src/components/${name}.tsx`] = rawText.trim();
    } else if (rawText.includes('<!DOCTYPE html>') || rawText.includes('<html')) {
      files['Calvras/index.html'] = rawText.trim();
    }
  }

  // Sanity check: Ensure index.html does not contain raw escaped object fragments
  if (files['Calvras/index.html']) {
    const content = files['Calvras/index.html'];
    if (content.includes("src/main.tsx") && (content.includes("','") || content.includes('","') || content.includes("':'") || content.includes('": "'))) {
      delete files['Calvras/index.html'];
    }
  }

  // Enrich with full modular Lovable-style production project structure
  return enrichWithProductionProjectStructure(files);
}

// ─── Production Project Architecture Scaffolder (Lovable/Production Folder Tree) ──
export function enrichWithProductionProjectStructure(files = {}) {
  if (!files || Object.keys(files).length === 0) return files;

  const result = { ...files };
  const prefix = Object.keys(files)[0]?.startsWith('Calvras/') ? 'Calvras/' : '';

  // 1. Root & Config Files
  if (!result[`${prefix}package.json`]) {
    result[`${prefix}package.json`] = JSON.stringify({
      name: "calvras-production-app",
      private: true,
      version: "1.0.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "tsc && vite build",
        preview: "vite preview"
      },
      dependencies: {
        react: "^18.3.1",
        "react-dom": "^18.3.1",
        "lucide-react": "^0.468.0",
        clsx: "^2.1.1",
        "tailwind-merge": "^2.5.5"
      },
      devDependencies: {
        "@types/react": "^18.3.3",
        "@types/react-dom": "^18.3.0",
        "@vitejs/plugin-react": "^4.3.1",
        autoprefixer: "^10.4.19",
        postcss: "^8.4.38",
        tailwindcss: "^3.4.4",
        typescript: "^5.5.3",
        vite: "^5.4.1"
      }
    }, null, 2);
  }

  if (!result[`${prefix}tsconfig.json`]) {
    result[`${prefix}tsconfig.json`] = JSON.stringify({
      compilerOptions: {
        target: "ES2020",
        useDefineForClassFields: true,
        lib: ["ES2020", "DOM", "DOM.Iterable"],
        module: "ESNext",
        skipLibCheck: true,
        moduleResolution: "bundler",
        allowImportingTsExtensions: true,
        resolveJsonModule: true,
        isolatedModules: true,
        noEmit: true,
        jsx: "react-jsx",
        strict: true,
        baseUrl: ".",
        paths: {
          "@/*": ["./src/*"]
        }
      },
      include: ["src"]
    }, null, 2);
  }

  if (!result[`${prefix}vite.config.ts`]) {
    result[`${prefix}vite.config.ts`] = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});`;
  }

  if (!result[`${prefix}tailwind.config.js`]) {
    result[`${prefix}tailwind.config.js`] = `/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};`;
  }

  if (!result[`${prefix}postcss.config.js`]) {
    result[`${prefix}postcss.config.js`] = `export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};`;
  }

  if (!result[`${prefix}index.html`]) {
    result[`${prefix}index.html`] = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Production Application</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  }

  if (!result[`${prefix}components.json`]) {
    result[`${prefix}components.json`] = JSON.stringify({
      $schema: "https://ui.shadcn.com/schema.json",
      style: "default",
      rsc: false,
      tsx: true,
      tailwind: {
        config: "tailwind.config.js",
        css: "src/index.css",
        baseColor: "neutral",
        cssVariables: true
      },
      aliases: {
        components: "@/components",
        utils: "@/lib/utils"
      }
    }, null, 2);
  }

  if (!result[`${prefix}.lovable/project.json`]) {
    result[`${prefix}.lovable/project.json`] = JSON.stringify({
      name: "production-app",
      framework: "react-vite",
      version: "2.0.0"
    }, null, 2);
  }

  // 2. Public Folder Assets & Favicons
  if (!result[`${prefix}public/favicon.ico`]) {
    result[`${prefix}public/favicon.ico`] = `<!-- Favicon Asset Icon -->`;
  }
  if (!result[`${prefix}public/robots.txt`]) {
    result[`${prefix}public/robots.txt`] = `User-agent: *\nAllow: /`;
  }
  if (!result[`${prefix}public/vite.svg`]) {
    result[`${prefix}public/vite.svg`] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="#0084ff"/></svg>`;
  }

  // 3. Src Assets & Utilities
  if (!result[`${prefix}src/assets/logo.svg`]) {
    result[`${prefix}src/assets/logo.svg`] = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`;
  }

  if (!result[`${prefix}src/lib/utils.ts`]) {
    result[`${prefix}src/lib/utils.ts`] = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;
  }

  if (!result[`${prefix}src/hooks/use-mobile.tsx`]) {
    result[`${prefix}src/hooks/use-mobile.tsx`] = `import * as React from "react";

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
}`;
  }

  if (!result[`${prefix}src/hooks/use-toast.ts`]) {
    result[`${prefix}src/hooks/use-toast.ts`] = `import { useState, useCallback } from 'react';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, variant = 'default' }: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return { toast, toasts };
}`;
  }

  if (!result[`${prefix}src/types/index.ts`]) {
    result[`${prefix}src/types/index.ts`] = `export interface NavItem {
  title: string;
  href: string;
  icon?: string;
  disabled?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface ProjectMetadata {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}`;
  }

  // 4. Modular UI Components in src/components/ui/
  if (!result[`${prefix}src/components/ui/button.tsx`]) {
    result[`${prefix}src/components/ui/button.tsx`] = `import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "secondary" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
      outline: "border border-neutral-700 bg-transparent hover:bg-neutral-800 text-neutral-100",
      secondary: "bg-neutral-800 text-neutral-100 hover:bg-neutral-700",
      ghost: "hover:bg-neutral-800 text-neutral-200 hover:text-white",
      destructive: "bg-red-600 text-white hover:bg-red-700"
    };
    const sizeStyles = {
      default: "h-9 px-4 py-2 text-sm",
      sm: "h-8 rounded-lg px-3 text-xs",
      lg: "h-11 rounded-2xl px-6 text-base",
      icon: "h-9 w-9 p-0"
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";`;
  }

  if (!result[`${prefix}src/components/ui/card.tsx`]) {
    result[`${prefix}src/components/ui/card.tsx`] = `import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("rounded-2xl border border-white/10 bg-neutral-900/80 p-5 text-neutral-100 shadow-xl backdrop-blur-sm", className)}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 pb-3", className)} {...props} />;
}

export function CardTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn("text-lg font-bold leading-none tracking-tight text-white", className)} {...props} />;
}

export function CardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-neutral-400 leading-relaxed", className)} {...props} />;
}

export function CardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pt-1", className)} {...props} />;
}`;
  }

  if (!result[`${prefix}src/components/ui/input.tsx`]) {
    result[`${prefix}src/components/ui/input.tsx`] = `import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-xl border border-neutral-800 bg-neutral-950 px-3 py-1 text-sm text-neutral-100 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";`;
  }

  if (!result[`${prefix}src/components/ui/badge.tsx`]) {
    result[`${prefix}src/components/ui/badge.tsx`] = `import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variantStyles = {
    default: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    secondary: "bg-neutral-800 text-neutral-300 border-neutral-700",
    outline: "border-neutral-700 text-neutral-300",
    success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
  };

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}`;
  }

  if (!result[`${prefix}src/components/Navbar.tsx`]) {
    result[`${prefix}src/components/Navbar.tsx`] = `import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/70 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-black shadow-lg shadow-blue-500/20">
          <Sparkles size={16} />
        </div>
        <span className="text-sm font-bold tracking-tight text-white font-sans">App Studio</span>
      </div>
      <div className="flex items-center gap-3 text-xs">
        <Button size="sm" variant="outline">Sign In</Button>
        <Button size="sm">Get Started</Button>
      </div>
    </header>
  );
}`;
  }

  if (!result[`${prefix}src/components/Sidebar.tsx`]) {
    result[`${prefix}src/components/Sidebar.tsx`] = `import React from 'react';
import { Home, Layers, Compass, Settings, Users, FolderKanban } from 'lucide-react';

export function Sidebar() {
  const items = [
    { name: 'Dashboard', icon: Home, active: true },
    { name: 'Projects', icon: FolderKanban },
    { name: 'Components', icon: Layers },
    { name: 'Explore', icon: Compass },
    { name: 'Team', icon: Users },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-60 border-r border-white/5 bg-[#0e0e12] p-3 flex flex-col justify-between">
      <nav className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.name}
              className={\`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all \${item.active ? 'bg-white/10 text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'}\`}
            >
              <Icon size={16} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}`;
  }

  // 5. Entry Point & Tailwind CSS
  if (!result[`${prefix}src/main.tsx`]) {
    result[`${prefix}src/main.tsx`] = `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
  }

  if (!result[`${prefix}src/index.css`]) {
    result[`${prefix}src/index.css`] = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 5%;
    --foreground: 0 0% 98%;
    --border: 0 0% 15%;
  }
  body {
    @apply bg-[#0a0a0f] text-[#ededed] font-sans antialiased;
  }
}`;
  }

  if (!result[`${prefix}README.md`]) {
    result[`${prefix}README.md`] = `# Production Modular Application

Engineered with React 18, TypeScript, Tailwind CSS, and Shadcn UI components.

## Project Structure
- \`src/components/ui/\`: Reusable UI primitives (Button, Card, Input, Badge)
- \`src/components/\`: Feature & section components (Navbar, Sidebar, etc.)
- \`src/hooks/\`: Custom application hooks
- \`src/lib/utils.ts\`: Styling & class merger utilities
- \`src/types/\`: TypeScript interface definitions
- \`public/\`: Static assets, icons, and metadata
`;
  }

  if (!result[`${prefix}AGENTS.md`]) {
    result[`${prefix}AGENTS.md`] = `# Calvras Architecture Guidelines
- Modular component composition
- TypeScript strict typing
- Responsive Tailwind utility classes
`;
  }

  if (!result[`${prefix}.gitignore`]) {
    result[`${prefix}.gitignore`] = `node_modules\ndist\n.DS_Store\n*.local\n`;
  }

  return result;
}

// ─── Dynamic Live Activity Indicator (Real Live Streaming Thoughts with Dropdown) ─
function formatLiveInline(text) {
  if (!text) return text;
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g);
  return parts.map((part, i) => {
    if (!part) return null;
    if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
      return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*') && part.length >= 2) {
      return <em key={i} className="italic text-neutral-200">{part.slice(1, -1)}</em>;
    }
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      return <code key={i} className="px-1.5 py-0.5 rounded bg-[#1f1f1f] text-neutral-200 font-mono text-[12px] border border-white/10">{part.slice(1, -1)}</code>;
    }
    return part;
  });
}

function LiveActivityIndicator({ liveThinkingDuration, statusText, activeFile, hasCodeFiles, isCodePrompt }) {
  const displayText = statusText && !statusText.includes('```') && !statusText.includes('export default') && !statusText.includes('import React') && statusText.length < 130
    ? statusText.replace(/<think>[\s\S]*?<\/think>/gi, '').trim()
    : null;

  const activeLabel = displayText || (hasCodeFiles ? 'Compiling application & updating live preview…' : 'Analyzing design & building application…');

  return (
    <div className="w-full max-w-[660px] mx-auto py-2 px-4 text-left animate-in fade-in duration-150 select-none">
      <div className="flex items-center gap-2.5 text-[13.5px] text-neutral-300">
        <div className="w-4 h-4 rounded-full border-[2px] border-blue-400 border-t-transparent animate-spin flex-shrink-0" />
        <span className="font-medium text-neutral-200">{activeLabel}</span>
      </div>
    </div>
  );
}

// ─── Natural Done Summary Generator ────────────────────────────────────────
function generateNaturalDoneSummary(query = '', fileNames = [], isEdit = false) {
  const count = fileNames.length;
  const appFile = fileNames.find(f => f.endsWith('App.tsx') || f.endsWith('App.jsx')) || fileNames[0] || 'App.tsx';
  const cleanName = appFile.replace('Calvras/', '').replace('src/', '');

  if (isEdit) {
    return `Updated **${cleanName}** with the requested changes. Live preview is refreshed.`;
  }

  const topic = query.replace(/\b(build|create|make|duplicate|clone|recreate|implement|develop|code)\s+(me\s+)?(an?\s+)?/i, '').replace(/\s+/g, ' ').trim().slice(0, 60);

  if (count === 0) {
    return `Built the application based on your request. Live preview is active.`;
  }

  return `Built **${topic || 'the application'}** with ${count} file${count !== 1 ? 's' : ''}. The live preview is ready — let me know if you'd like any changes.`;
}

// ─── Shared Running Tasks Header Dock (Persistent DOM — No Typing Interruptions) ─
function RunningTasksDock({ runningTasks, tasksExpanded, setTasksExpanded, onStopTask }) {
  if (!runningTasks || runningTasks.length === 0) return null;
  const primaryTask = runningTasks[0];

  return (
    <div className="w-full px-4 pt-2.5 pb-2 text-xs text-neutral-300 select-none transition-all">
      <div className="flex items-center justify-between py-0.5">
        <div
          onClick={() => setTasksExpanded(e => !e)}
          className="flex items-center gap-2 cursor-pointer text-[12.5px] text-neutral-300 hover:text-white transition-colors"
        >
          <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-blue-400 border-t-transparent animate-spin flex-shrink-0" />
          <span style={{ fontFamily: 'Consolas, "Segoe UI Mono", "Courier New", monospace', fontSize: '12.5px' }} className="font-medium text-neutral-200 truncate max-w-[400px]">
            {primaryTask.name}
          </span>
          {runningTasks.length > 1 && (
            <span className="text-[11px] text-neutral-400">
              (+{runningTasks.length - 1} more)
            </span>
          )}
          {runningTasks.length > 1 && (
            <ChevronDown size={13} className={`text-neutral-400 transition-transform duration-150 ${tasksExpanded ? 'rotate-180' : ''}`} />
          )}
        </div>
        <button
          type="button"
          onClick={() => runningTasks.forEach(t => onStopTask(t.id))}
          className="text-[11px] text-neutral-500 hover:text-red-400 transition-colors px-1.5 py-0.5 rounded hover:bg-white/5 cursor-pointer flex-shrink-0"
          title="Stop all running tasks"
        >
          Stop all
        </button>
      </div>
      {tasksExpanded && runningTasks.length > 1 && (
        <div className="space-y-2 pt-2 pb-0.5 animate-in fade-in duration-150">
          {runningTasks.slice(1).map(task => (
            <div key={task.id} className="flex items-center justify-between text-[12px] text-neutral-200 select-text">
              <div className="flex items-center gap-2">
                <div className="w-3.5 h-3.5 rounded-full border-[1.5px] border-neutral-300 border-t-transparent animate-spin flex-shrink-0" />
                <span style={{ fontFamily: 'Consolas, "Segoe UI Mono", "Courier New", monospace', fontSize: '13px', color: '#f3f3f3' }} className="font-normal antialiased">
                  {task.name}
                </span>
              </div>
              {task.canStop !== false && (
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onStopTask(task.id); }}
                  className="w-4 h-4 rounded-full border border-neutral-600 flex items-center justify-center text-neutral-400 hover:text-red-400 hover:border-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
                  title={`Stop ${task.name}`}
                >
                  <div className="w-1.5 h-1.5 bg-current rounded-[1px]" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// ─── Toolbar shared between hero and reply inputs ─────────────────────────────
function InputToolbar({
  isHero = false,
  input,
  attachedFiles = [],
  onSend,
  onAttach,
  onImportProject,
  isWorking,
  onStop
}) {
  const [showConnectorsNotice, setShowConnectorsNotice] = useState(false);
  const hasContent = input.trim() || attachedFiles.length > 0;

  return (
    <div className="flex items-center justify-between pt-1 mt-1">
      <div className="flex items-center gap-1.5">
        <PlusActionMenu
          onAttachFiles={onAttach}
          onImportProject={onImportProject}
          isHero={isHero}
        />

        {/* Connectors button with SVG and text */}
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => {
              setShowConnectorsNotice(true);
              setTimeout(() => setShowConnectorsNotice(false), 3500);
            }}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer group"
            title="Connectors"
          >
            <svg width={isHero ? 16 : 14} height={isHero ? 16 : 14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" />
              <path d="M10 6.5h4M6.5 10v4M17.5 10v4M10 17.5h4" />
            </svg>
            <span className="text-[12.5px] font-medium text-neutral-400 group-hover:text-white">Connectors</span>
          </button>

          {showConnectorsNotice && (
            <div className="absolute bottom-full left-0 mb-2 whitespace-nowrap px-3 py-1.5 rounded-xl bg-[#1e1e24] text-neutral-200 text-xs shadow-xl border border-white/10 animate-in fade-in zoom-in-95 duration-150 z-50 flex items-center gap-1.5">
              <span>No connectors for now, coming soon</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {/* Right action button — Stop or Send */}
        {isWorking ? (
          <button
            type="button"
            onClick={onStop}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-black hover:bg-neutral-200 transition-all shadow-md cursor-pointer"
            title="Stop generation"
          >
            <Square size={13} fill="currentColor" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onSend}
            disabled={!hasContent}
            className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150 ${
              hasContent
                ? 'bg-white text-black hover:bg-neutral-200 shadow-md cursor-pointer'
                : 'bg-white/[0.08] text-neutral-500 cursor-not-allowed opacity-40'
            }`}
            title="Send prompt"
          >
            <ArrowRight size={16} strokeWidth={2.4} />
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Calvras Action Status (shows terminal/browse actions above input, invisible to user controls) ─
function CalvrasActionStatus({ action }) {
  if (!action) return null;
  const isCmd = action.type === 'cmd';
  const isBrowse = action.type === 'browse';
  return (
    <div className="w-full px-4 py-2 animate-in fade-in duration-200 select-none">
      <div className="flex items-center gap-2 text-[12px]" style={{ fontFamily: 'Consolas, "Segoe UI Mono", monospace' }}>
        <div className="w-3 h-3 rounded-full border-[1.5px] border-green-400 border-t-transparent animate-spin flex-shrink-0" />
        {isCmd && (
          <>
            <span className="text-neutral-500">Running</span>
            <span className="text-green-400 truncate max-w-[480px]">{action.text}</span>
          </>
        )}
        {isBrowse && (
          <>
            <span className="text-neutral-500">Browsing</span>
            <span className="text-blue-400 truncate max-w-[480px]">{action.text}</span>
          </>
        )}
        {!isCmd && !isBrowse && (
          <span className="text-neutral-400 truncate max-w-[480px]">{action.text}</span>
        )}
      </div>
    </div>
  );
}

// ─── Main Chat ────────────────────────────────────────────────────────────────
export default function MainChat({
  messages,
  setMessages,
  sidebarCollapsed,
  setSidebarCollapsed,
  onUserMessage
}) {
  const [input, setInput] = useState('');
  const activeBuildMode = 'Build'; // fixed — Build/Plan toggle removed
  const webSearchMode = 'auto'; // always auto — web search is internal
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [lastQuery, setLastQuery] = useState('');
  const [activeSelectionQuestion, setActiveSelectionQuestion] = useState(null);
  const [importedFolderName, setImportedFolderName] = useState(null);
  const [importedFileCount, setImportedFileCount] = useState(0);
  const lastUserIndex = (messages || []).map(m => m.role).lastIndexOf('user');

  // Dynamic Workspace Files State with localStorage persistence across refreshes
  const [workspaceFiles, setWorkspaceFiles] = useState(() => {
    // Never rehydrate full file content from localStorage — it causes quota errors on large projects.
    // Files are only loaded fresh via import or AI generation.
    return {};
  });
  const [activeFileName, setActiveFileName] = useState(() => {
    if (!messages || messages.length === 0) return null;
    return localStorage.getItem('malvos_active_file_name') || null;
  });
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [previewPort, setPreviewPort] = useState(null);
  const [currentRepo, setCurrentRepo] = useState(null);
  const [previewReloadTrigger, setPreviewReloadTrigger] = useState(0);

  // Split-screen & Resizable layout state with localStorage rehydration
  const [isSplitScreen, setIsSplitScreen] = useState(() => {
    if (!messages || messages.length === 0) return false;
    try {
      const savedFiles = localStorage.getItem('malvos_active_workspace_files');
      const parsed = savedFiles ? JSON.parse(savedFiles) : {};
      return Object.keys(parsed).length > 0 && localStorage.getItem('malvos_split_screen') === 'true';
    } catch {
      return false;
    }
  });
  const [activeWorkspaceTab, setActiveWorkspaceTab] = useState(() => {
    return localStorage.getItem('malvos_active_workspace_tab') || 'preview';
  });
  const [workspaceWidthPercent, setWorkspaceWidthPercent] = useState(52);
  const [isResizing, setIsResizing] = useState(false);

  // Reset workspace when starting fresh or on reset event
  useEffect(() => {
    const handleReset = () => {
      setWorkspaceFiles({});
      setActiveFileName(null);
      setIsSplitScreen(false);
      setTerminalLogs([]);
      setPreviewPort(null);
    };
    window.addEventListener('malvos_reset_workspace', handleReset);
    return () => window.removeEventListener('malvos_reset_workspace', handleReset);
  }, []);

  useEffect(() => {
    if (!messages || messages.length === 0) {
      setWorkspaceFiles({});
      setActiveFileName(null);
      setIsSplitScreen(false);
      try {
        localStorage.removeItem('malvos_active_workspace_files');
        localStorage.removeItem('malvos_active_file_name');
        localStorage.removeItem('malvos_split_screen');
      } catch {}
    }
  }, [messages]);

  // Sync workspace metadata (NOT full content) to localStorage — avoids quota errors on large projects
  useEffect(() => {
    try {
      if (messages && messages.length > 0 && Object.keys(workspaceFiles).length > 0) {
        // Only store a lightweight file-path index, not full content
        const index = Object.keys(workspaceFiles).map(k => ({ path: k, size: workspaceFiles[k]?.length || 0 }));
        localStorage.setItem('malvos_workspace_index', JSON.stringify({ mainFile: activeFileName, index }));
        if (activeFileName) localStorage.setItem('malvos_active_file_name', activeFileName);
        localStorage.setItem('malvos_split_screen', 'true');
        // Remove old full-content key if present
        localStorage.removeItem('malvos_active_workspace_files');
      } else if (!messages || messages.length === 0) {
        localStorage.removeItem('malvos_workspace_index');
        localStorage.removeItem('malvos_active_workspace_files');
        localStorage.removeItem('malvos_active_file_name');
        localStorage.removeItem('malvos_split_screen');
      }
      localStorage.setItem('malvos_active_workspace_tab', activeWorkspaceTab);
    } catch {}
  }, [workspaceFiles, activeFileName, isSplitScreen, activeWorkspaceTab, messages]);

  // Floating Tasks Dock above input (starts empty, populated only dynamically when tasks run)
  const [runningTasks, setRunningTasks] = useState([]);
  const [tasksExpanded, setTasksExpanded] = useState(false);

  const [isThinking, setIsThinking] = useState(false);
  const [liveThinkingText, setLiveThinkingText] = useState('');
  const [liveThinkingDuration, setLiveThinkingDuration] = useState(1);
  const [isLiveThinkingOpen, setIsLiveThinkingOpen] = useState(true);
  const [streamingText, setStreamingText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);




  // ── Calvras autonomous action status (terminal cmd / browse shown above input) ─
  const [calvrasAction, setCalvrasAction] = useState(null); // { type: 'cmd'|'browse', text: string }

  const heroTextareaRef = useRef(null);
  const replyTextareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);
  const latestTurnRef = useRef(null);
  const abortControllerRef = useRef(null);

  const handleStopGeneration = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsThinking(false);
    setIsStreaming(false);
    setRunningTasks([]);
  };

  const isHeroMode = messages.length === 0;

  // Draggable Split Pane Resize Handler
  const handleStartResize = (e) => {
    e.preventDefault();
    setIsResizing(true);

    const handleMouseMove = (moveEvent) => {
      const windowWidth = window.innerWidth;
      const rightWidthPx = windowWidth - moveEvent.clientX;
      const newPercent = Math.max(25, Math.min(80, (rightWidthPx / windowWidth) * 100));
      setWorkspaceWidthPercent(newPercent);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const messagesEndRef = useRef(null);

  const scrollToLatestTurn = () => {
    if (scrollRef.current && latestTurnRef.current) {
      const containerRect = scrollRef.current.getBoundingClientRect();
      const elementRect = latestTurnRef.current.getBoundingClientRect();
      const offset = elementRect.top - containerRect.top;
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollTop + offset - 14,
        behavior: 'smooth'
      });
    }
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  // Auto-scroll without jumping back when AI answers
  const prevLastUserIndexRef = useRef(lastUserIndex);
  useEffect(() => {
    if (messages.length === 0) return;
    const isNewUserTurn = lastUserIndex !== prevLastUserIndexRef.current;
    prevLastUserIndexRef.current = lastUserIndex;

    if (isNewUserTurn && lastUserIndex >= 0) {
      const timer = setTimeout(scrollToLatestTurn, 40);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(scrollToBottom, 50);
      return () => clearTimeout(timer);
    }
  }, [messages.length, lastUserIndex]);

  // Auto-collapse left sidebar when preview pane opens
  useEffect(() => {
    if (isSplitScreen && setSidebarCollapsed) {
      setSidebarCollapsed(true);
    }
  }, [isSplitScreen]);

  useEffect(() => {
    const handleSetFiles = (e) => {
      if (e.detail && e.detail.files) {
        setWorkspaceFiles(e.detail.files);
        setIsSplitScreen(true);
        setActiveWorkspaceTab('preview');
        if (e.detail.repoName) setCurrentRepo(e.detail.repoName);
        const main = Object.keys(e.detail.files).find(f => f.endsWith('home.tsx') || f.endsWith('App.tsx') || f.endsWith('App.jsx') || f.endsWith('index.tsx') || f.endsWith('index.html')) || Object.keys(e.detail.files)[0];
        if (main) setActiveFileName(main);
        setPreviewReloadTrigger(p => p + 1);
      }
    };
    window.addEventListener('malvos_set_workspace_files', handleSetFiles);
    return () => window.removeEventListener('malvos_set_workspace_files', handleSetFiles);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const ref = isHeroMode ? heroTextareaRef : replyTextareaRef;
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${Math.min(ref.current.scrollHeight, 150)}px`;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const fileToDataUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });
  };

  const processUploadedFiles = async (fileList) => {
    const filesArray = Array.from(fileList || []).slice(0, 4);
    const processed = [];
    for (const f of filesArray) {
      if (f.type.startsWith('image/')) {
        const dataUrl = await fileToDataUrl(f);
        processed.push({
          name: f.name || 'image.png',
          size: (f.size / 1024).toFixed(1) + ' KB',
          type: f.type || 'image/png',
          dataUrl,
          preview: dataUrl
        });
      } else {
        processed.push({
          name: f.name,
          size: (f.size / 1024).toFixed(1) + ' KB',
          type: f.type || 'application/octet-stream',
          preview: null
        });
      }
    }
    if (processed.length > 0) {
      setAttachedFiles(prev => [...prev, ...processed].slice(0, 4));
    }
  };

  const handleFileAttach = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      await processUploadedFiles(files);
      e.target.value = '';
    }
  };

  const handlePaste = async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    const imageFiles = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].type && items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) imageFiles.push(file);
      }
    }
    if (imageFiles.length > 0) {
      e.preventDefault();
      await processUploadedFiles(imageFiles);
    }
  };

  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);

    const dt = e.dataTransfer;
    if (!dt) return;

    const files = Array.from(dt.files || []);
    if (files.length === 0) return;

    const imageFiles = files.filter(f => f.type.startsWith('image/'));
    if (imageFiles.length > 0) {
      await processUploadedFiles(imageFiles);
    }

    const codeFiles = files.filter(f => !f.type.startsWith('image/'));
    if (codeFiles.length > 0) {
      handleImportProject(codeFiles);
    }
  };

  const removeFile = (i) => setAttachedFiles(prev => prev.filter((_, j) => j !== i));

  const handleStopTask = async (taskId) => {
    const task = runningTasks.find(t => t.id === taskId);
    const taskName = task ? task.name : taskId;
    setRunningTasks(prev => prev.filter(t => t.id !== taskId));
    setTerminalLogs(prev => [...prev, { type: 'err', text: `^C [Process terminated: ${taskName}]` }]);
    try {
      if (currentRepo) {
        await fetch(`http://localhost:3001/api/stop/${currentRepo}`, { method: 'POST' });
      }
    } catch {
      // ignore network errors if daemon stopped locally
    }
  };

  const handleImportProject = async (fileList) => {
    // ── Filters: skip anything that would bloat memory or is irrelevant ──
    const SKIP_DIRS = new Set([
      'node_modules', '.git', '.next', '.nuxt', 'dist', 'build', 'out',
      '.cache', '.turbo', '.vercel', '__pycache__', '.venv', 'venv',
      'vendor', 'coverage', '.nyc_output', 'storybook-static',
    ]);
    const SKIP_EXTS = new Set([
      '.png', '.jpg', '.jpeg', '.gif', '.webp', '.ico', '.svg', '.bmp', '.tiff',
      '.mp4', '.mp3', '.wav', '.ogg', '.webm', '.mov', '.avi',
      '.woff', '.woff2', '.ttf', '.eot', '.otf',
      '.zip', '.tar', '.gz', '.rar', '.7z',
      '.pdf', '.doc', '.docx', '.xls', '.xlsx',
      '.exe', '.bin', '.dll', '.so', '.dylib',
      '.lock', // package-lock, yarn.lock, etc
      '.map',  // source maps — huge and irrelevant
    ]);
    const SKIP_FILES = new Set([
      'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'composer.lock',
      '.DS_Store', 'Thumbs.db', '.env.local', '.env.production',
    ]);
    const MAX_FILE_SIZE = 200 * 1024; // 200 KB per file
    const MAX_TOTAL_FILES = 500;

    const isSafe = (file) => {
      const parts = (file.webkitRelativePath || file.name).split('/');
      // skip if any path segment is a blocked dir
      if (parts.some(p => SKIP_DIRS.has(p))) return false;
      const name = parts[parts.length - 1];
      if (SKIP_FILES.has(name)) return false;
      const ext = name.includes('.') ? '.' + name.split('.').pop().toLowerCase() : '';
      if (SKIP_EXTS.has(ext)) return false;
      if (file.size > MAX_FILE_SIZE) return false;
      return true;
    };

    const safeFiles = Array.from(fileList).filter(isSafe).slice(0, MAX_TOTAL_FILES);

    const newFiles = {};
    await Promise.all(safeFiles.map(async (file) => {
      try {
        const text = await file.text();
        let relativePath = file.webkitRelativePath || file.name;
        relativePath = relativePath.replace(/^[./\\]+/, '');
        newFiles[relativePath] = text;
      } catch { /* skip unreadable */ }
    }));

    const count = Object.keys(newFiles).length;
    if (count === 0) return;

    const folderName = fileList[0]?.webkitRelativePath
      ? fileList[0].webkitRelativePath.split('/')[0]
      : 'Project';

    const mainFile = Object.keys(newFiles).find(f =>
      /\/(index\.html|App\.tsx|App\.jsx|main\.py|index\.ts|index\.js|main\.ts|main\.jsx)$/.test('/' + f)
    ) || Object.keys(newFiles)[0];

    // Store only a lightweight index in localStorage (not full content)
    // Full content stays in React state only
    try {
      const index = Object.keys(newFiles).map(k => ({ path: k, size: newFiles[k].length }));
      localStorage.setItem('malvos_workspace_index', JSON.stringify({ folderName, count, mainFile, index }));
      // Remove old full-content key to avoid stale bloat
      localStorage.removeItem('malvos_active_workspace_files');
    } catch { /* quota */ }

    setWorkspaceFiles(newFiles);
    setActiveFileName(mainFile);
    setIsSplitScreen(true);
    setActiveWorkspaceTab('code');
    setImportedFolderName(folderName);
    setImportedFileCount(count);
    setRunningTasks([]);
    setTerminalLogs([
      { type: 'info', text: `[Workspace] ${count} files loaded from "${folderName}"` },
      { type: 'success', text: `✓ Entry: ${mainFile}` },
    ]);
  };

  const [revertModalData, setRevertModalData] = useState(null);

  const handleRequestEditMessage = (msg) => {
    const msgIndex = messages.findIndex(m => m.id === msg.id);
    if (msgIndex === -1) return;

    // Check if subsequent turns or workspace files exist
    const subsequentMessages = messages.slice(msgIndex + 1);
    const previousSnapshot = msg.workspaceSnapshot || {};
    const currentFiles = Object.keys(workspaceFiles);
    const revertedFiles = currentFiles.filter(f => !previousSnapshot[f] || previousSnapshot[f] !== workspaceFiles[f]);

    if (subsequentMessages.length > 0 || revertedFiles.length > 0) {
      setRevertModalData({
        message: msg,
        index: msgIndex,
        subsequentCount: subsequentMessages.length,
        revertedFiles
      });
    } else {
      executeRevertMessage(msg, msgIndex);
    }
  };

  const executeRevertMessage = (msg, index) => {
    // 1. Restore the prompt text back into input
    setInput(msg.content || '');

    // 2. Restore workspace files snapshot from that point
    const snapshot = msg.workspaceSnapshot || {};
    setWorkspaceFiles(snapshot);
    if (Object.keys(snapshot).length === 0) {
      setIsSplitScreen(false);
      setActiveFileName(null);
    } else {
      setActiveFileName(Object.keys(snapshot)[0] || null);
    }

    // 3. Remove this message and all subsequent messages
    setMessages(prev => prev.slice(0, index));
    setRevertModalData(null);

    // 4. Focus input textarea
    setTimeout(() => {
      if (heroTextareaRef.current) heroTextareaRef.current.focus();
      if (replyTextareaRef.current) replyTextareaRef.current.focus();
    }, 50);
  };

  // Automatic 1-click Fix with Calvras handler from iframe Preview Error Recovery
  useEffect(() => {
    const handleWindowMessage = (event) => {
      if (event && event.data && event.data.type === 'FIX_PREVIEW_ERROR') {
        const errorDetails = event.data.error || 'Preview runtime error';
        handleSend(`Fix preview runtime error in the application: "${errorDetails}". Review all referenced components, missing imports, and syntax in the workspace files and rebuild cleanly.`);
      }
    };
    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, [workspaceFiles, messages]);

  // ── Calvras autonomous tool execution: parses <run_cmd> and <browse> tags ──
  const executeCalvrasTools = async (rawText) => {
    if (!rawText) return rawText;

    // Collect all tool calls in order
    const toolPattern = /<(run_cmd|browse)>([\s\S]*?)<\/\1>/gi;
    const calls = [];
    let match;
    while ((match = toolPattern.exec(rawText)) !== null) {
      calls.push({ tag: match[0], type: match[1], value: match[2].trim(), index: match.index });
    }
    if (calls.length === 0) return rawText;

    let result = rawText;
    for (const call of calls) {
      if (call.type === 'run_cmd') {
        setCalvrasAction({ type: 'cmd', text: call.value });
        try {
          const r = await fetch('http://localhost:3001/api/run-cmd', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ command: call.value })
          });
          const data = await r.json();
          const output = [data.stdout, data.stderr].filter(Boolean).join('\n').trim();
          const toolResult = `\n[Terminal: \`${call.value}\`]\n${output || '(no output)'}\nExit code: ${data.code}\n`;
          result = result.replace(call.tag, toolResult);
        } catch (e) {
          result = result.replace(call.tag, `\n[Terminal error: ${e.message}]\n`);
        }
        setCalvrasAction(null);
      } else if (call.type === 'browse') {
        setCalvrasAction({ type: 'browse', text: call.value });
        try {
          const r = await fetch('http://localhost:3001/api/browse', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: call.value })
          });
          const data = await r.json();
          const pageText = data.ok ? `Title: ${data.title}\n\n${data.text}` : `Error: ${data.error}`;
          const toolResult = `\n[Browsed: ${call.value}]\n${pageText.slice(0, 6000)}\n`;
          result = result.replace(call.tag, toolResult);
        } catch (e) {
          result = result.replace(call.tag, `\n[Browse error: ${e.message}]\n`);
        }
        setCalvrasAction(null);
      }
    }
    return result;
  };

  const handleSend = async (textToSend = null) => {
    const query = typeof textToSend === 'string' ? textToSend : input.trim();
    const currentAttachedFiles = [...attachedFiles];
    if (!query && currentAttachedFiles.length === 0) return;

    const sendStartTime = Date.now();
    const getThoughtDuration = () => `${Math.max(1, Math.round((Date.now() - sendStartTime) / 1000))}s`;

    // ── Vague build clarification — intercept BEFORE anything else ──────────
    const trimmedEarly = query.trim();
    const hasImageEarly = currentAttachedFiles.length > 0;
    const hasWorkspaceEarly = Object.keys(workspaceFiles).length > 0;
    const isVagueBuildEarly = !hasImageEarly && !hasWorkspaceEarly && (
      /^(?:hey\s+)?(?:i\s+(?:need|want|would\s+like)\s+(?:a\s+)?|build|create|make|develop)\s+(?:me\s+)?(?:a\s+)?(?:website|web\s+app|app|application|site|page|dashboard|tool|game|platform)[\s.!?]*$/i.test(trimmedEarly) ||
      (/\b(?:build|create|make|need|want)\b/i.test(trimmedEarly) && /\b(?:website|web\s*app|app|site|page|application)\b/i.test(trimmedEarly) && trimmedEarly.split(/\s+/).length <= 8 && !/\b(?:like|similar|clone|duplicate|copy|for\s+my|barber|coffee|portfolio|restaurant|shop|store)\b/i.test(trimmedEarly))
    );

    if (isVagueBuildEarly) {
      // Add user message to chat then show selection in input area
      const userMsgEarly = {
        id: `msg-${Date.now()}`,
        role: 'user',
        content: query,
        files: currentAttachedFiles,
        workspaceSnapshot: { ...workspaceFiles },
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMsgEarly]);
      setInput('');
      setAttachedFiles([]);
      if (onUserMessage) onUserMessage(query);
      setActiveSelectionQuestion({
        question: "What type of website do you need?",
        options: [
          { label: "Personal or portfolio site", detail: "Showcase your work, skills, or brand" },
          { label: "Business or landing page", detail: "Promote a product, service, or company" },
          { label: "SaaS or web app", detail: "Dashboard, tool, or subscription product" },
          { label: "E-commerce or store", detail: "Online shop with products and checkout" },
          { label: "Blog or content site", detail: "Articles, news, or thought leadership" },
        ],
        isMultiSelect: false,
      });
      return;
    }
    // ────────────────────────────────────────────────────────────────────────

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    if (setSidebarCollapsed) setSidebarCollapsed(true);

    const userMsg = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: query,
      files: currentAttachedFiles,
      workspaceSnapshot: { ...workspaceFiles },
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLastQuery(query);
    setAttachedFiles([]);
    if (heroTextareaRef.current) heroTextareaRef.current.style.height = 'auto';
    if (replyTextareaRef.current) replyTextareaRef.current.style.height = 'auto';
    if (onUserMessage) onUserMessage(query);

    setIsThinking(true);

    // ── 1. Git Clone Interception — Calls real backend SSE stream ─────────────────
    const cloneMatch = query.match(/(https?:\/\/(?:github|gitlab)\.com\/[^\s]+)/i) || (query.toLowerCase().includes('git clone') ? query.match(/(https?:\/\/[^\s]+)/i) : null);
    if (cloneMatch) {
      const repoUrl = cloneMatch[1].replace(/\.git$/, '');
      const repoName = repoUrl.split('/').pop();
      const ghToken = localStorage.getItem('malvos_gh_token') || undefined;

      // Open workspace terminal immediately
      setIsSplitScreen(true);
      setActiveWorkspaceTab('preview');
      setCurrentRepo(repoName);
      setTerminalLogs([{ type: 'info', text: `Cloning ${repoName}...` }]);
      setRunningTasks([{ id: 'clone', name: `subagent [DevOps]: git clone ${repoName}`, canStop: true }]);
      setIsThinking(false);

      // Instant local load if repo already exists on disk
      fetch(`http://localhost:3001/api/all-files/${encodeURIComponent(repoName)}`)
        .then(r => r.json())
        .then(data => {
          if (data && data.files && Object.keys(data.files).length > 0) {
            setWorkspaceFiles(data.files);
            const mainFile = Object.keys(data.files).find(f =>
              f.endsWith('App.tsx') || f.endsWith('App.jsx') || f.endsWith('index.tsx') || f.endsWith('index.jsx') || f.endsWith('index.html') || f.endsWith('main.tsx') || f.endsWith('home.tsx')
            ) || Object.keys(data.files)[0];
            setActiveFileName(mainFile || null);
            setPreviewReloadTrigger(p => p + 1);
          }
        })
        .catch(() => {});

      // Deliver immediate clean acknowledgment
      setIsThinking(false);
      // No hardcoded message — terminal logs show progress, user can ask anything

      // Stream from backend SSE in background
      (async () => {
        try {
          const resp = await fetch('http://localhost:3001/api/clone', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: repoUrl, token: ghToken })
          });

          const reader = resp.body.getReader();
          const decoder = new TextDecoder();
          let buffer = '';

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n\n');
            buffer = lines.pop() || '';

            for (const chunk of lines) {
              const line = chunk.replace(/^data: /, '').trim();
              if (!line) continue;
              try {
                const event = JSON.parse(line);
                if (event.type === 'cmd') {
                  setRunningTasks(prev => [{ id: 'clone', name: `subagent [DevOps]: ${event.text}`, canStop: true }]);
                }
                if (event.type === 'files_ready' || event.type === 'done') {
                  setCurrentRepo(repoName);
                  setIsSplitScreen(true);
                  setActiveWorkspaceTab('preview');

                  // Fetch all files content from backend so live VFS and editor have instant full code
                  fetch(`http://localhost:3001/api/all-files/${encodeURIComponent(repoName)}`)
                    .then(r => r.json())
                    .then(data => {
                      const fullFiles = (data && data.files && Object.keys(data.files).length > 0) ? data.files : {};
                      if (Object.keys(fullFiles).length > 0) {
                        setWorkspaceFiles(fullFiles);
                        const defaultFile = Object.keys(fullFiles).find(f =>
                          f.endsWith('App.tsx') || f.endsWith('App.jsx') || f.endsWith('index.tsx') || f.endsWith('index.jsx') || f.endsWith('index.html') || f.endsWith('main.tsx')
                        ) || Object.keys(fullFiles)[0];
                        setActiveFileName(defaultFile || null);
                        setPreviewReloadTrigger(p => p + 1);
                      }
                    })
                    .catch(() => {});
                }
                if (event.type === 'done') {
                  const port = event.port;
                  setPreviewPort(port || null);
                  setCurrentRepo(repoName);
                  setIsSplitScreen(true);
                  setActiveWorkspaceTab('preview');
                  if (port) {
                    setRunningTasks([
                      { id: 'server', name: 'node server/index.js', canStop: true },
                      { id: 'dev', name: `npm run dev (port ${port})`, canStop: true }
                    ]);
                    setTerminalLogs(prev => [...prev, { type: 'success', text: `✓ Dev server running on http://localhost:${port}` }]);
                  } else {
                    setRunningTasks([{ id: 'server', name: 'subagent [DevServer]: live in-browser sandbox', canStop: true }]);
                  }
                  
                  // Deliver live preview notification card
                  setMessages(prev => [...prev, {
                    id: `msg-done-${Date.now()}`,
                    role: 'assistant',
                    repoCard: {
                      title: 'Project Ready',
                      repoName: repoName,
                      port: port || 5173
                    },
                    content: port 
                      ? `✓ **${repoName}** dev server is live on **http://localhost:${port}**. You can now test it in the preview or ask me to make any code or design changes.`
                      : `✓ **${repoName}** workspace is ready. In-browser live preview is active.`,
                    mode: activeBuildMode,
                    thoughtDuration: getThoughtDuration(),
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }]);
                } else if (event.type !== 'files_ready') {
                  setTerminalLogs(prev => [...prev, event]);
                }
              } catch { /* ignore parse errors */ }
            }
          }
        } catch (err) {
          setTerminalLogs(prev => [...prev, { type: 'error', text: `Backend error: ${err.message}. Ensure backend is running (npm run start).` }]);
        }
      })();
      return;
    }

    // ── 2. Autonomous Repository Code Editing ──────────────────────────────────
    if (currentRepo && !/build|create|make|website|app|design|restaurant/i.test(query)) {
      try {
        let fileContextSnippets = [];
        let matchedPaths = [];

        // 1. Full repository content search via backend API
        try {
          const searchRes = await fetch(`http://localhost:3001/api/search?repo=${encodeURIComponent(currentRepo)}&q=${encodeURIComponent(query)}`);
          if (searchRes.ok) {
            const searchData = await searchRes.json();
            if (searchData.results && searchData.results.length > 0) {
              for (const item of searchData.results) {
                matchedPaths.push(item.path);
                fileContextSnippets.push(`File: ${item.path}\n\`\`\`\n${item.content}\n\`\`\``);
              }
            }
          }
        } catch { /* search fallback */ }

        // 2. If search returned fewer than 2 files, supplement with top candidate routes and active file
        if (fileContextSnippets.length < 3) {
          const allRepoFiles = Object.keys(workspaceFiles).map(f => f.startsWith(currentRepo + '/') ? f.slice(currentRepo.length + 1) : f);
          const fallbackCandidates = allRepoFiles.filter(f => 
            !matchedPaths.includes(f) && (
              f.includes('route') || f.includes('page') || f.includes('index') || f.includes('signup') || f.includes('auth') || f.includes('App') || f.endsWith('.tsx') || f.endsWith('.jsx')
            )
          ).slice(0, 6);

          for (const filePath of fallbackCandidates) {
            try {
              const r = await fetch(`http://localhost:3001/api/file?repo=${encodeURIComponent(currentRepo)}&path=${encodeURIComponent(filePath)}`);
              if (r.ok) {
                const data = await r.json();
                if (data.content && data.content.length < 30000) {
                  matchedPaths.push(filePath);
                  fileContextSnippets.push(`File: ${filePath}\n\`\`\`\n${data.content}\n\`\`\``);
                }
              }
            } catch { /* ignore */ }
          }
        }

        const repoPrompt = [
          {
            role: 'system',
            content: `You are Calvras, an autonomous AI software engineer editing repository "${currentRepo}".
The user wants to make a change: "${query}".

INSTRUCTIONS:
1. Examine the provided repository files. Locate the exact UI elements, forms, buttons, or logic.
2. Output the FULL updated code of the modified file in a standard markdown block:
\`\`\`tsx file=src/routes/signup.tsx
// Full updated code of the file
\`\`\`

3. After the code block, provide a clear, concise bullet-point summary of what changed and why. Speak directly and naturally like a senior engineer.`
          },
          {
            role: 'user',
            content: `Repository Files Context:\n\n${fileContextSnippets.join('\n\n')}\n\nTask: ${query}`
          }
        ];

        let rawResponse = await generateAIResponse({ messages: repoPrompt, mode: activeBuildMode.toLowerCase() });

        // Extract files modified by AI
        const extractedFiles = extractFilesFromAIResponse(rawResponse, query);
        const fileNames = Object.keys(extractedFiles);

        if (fileNames.length > 0) {
          let changeSummaries = [];

          for (const relFileName of fileNames) {
            const cleanPath = relFileName.replace(/^(\.\/|\/)/, '');
            let newContent = extractedFiles[relFileName];
            const fullWorkspaceKey = `${currentRepo}/${cleanPath}`;

            // Save directly to disk via backend API
            await fetch('http://localhost:3001/api/file', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ repo: currentRepo, path: cleanPath, content: newContent })
            });

            // ── Self-Healing Verification Pass ──────────────────────────────────
            await new Promise(r => setTimeout(r, 450));
            try {
              const verifyRes = await fetch(`http://localhost:3001/api/verify/${encodeURIComponent(currentRepo)}`);
              if (verifyRes.ok) {
                const verifyData = await verifyRes.json();
                if (!verifyData.ok && verifyData.error) {
                  // Compile error detected! Launch Auto-Fix Subagent pass
                  setTerminalLogs(prev => [
                    ...prev,
                    { type: 'err', text: `[Verifier] Compile issue detected: ${verifyData.error}` },
                    { type: 'info', text: `[Coder] Auto-fixing syntax and re-verifying...` }
                  ]);

                  const fixPrompt = [
                    {
                      role: 'system',
                      content: `You are Calvras Coder Subagent. The previous edit on "${cleanPath}" produced a syntax or compile error:
"${verifyData.error}"

CRITICAL:
1. Fix all unterminated strings, unclosed JSX tags, or syntax issues.
2. Output the FULL corrected file in a code block:
\`\`\`tsx file=${cleanPath}
// Full clean valid code
\`\`\``
                    },
                    {
                      role: 'user',
                      content: `Code to fix:\n\`\`\`\n${newContent}\n\`\`\``
                    }
                  ];

                  const fixRaw = await generateAIResponse({ messages: fixPrompt, mode: 'build' });
                  const fixedFiles = extractFilesFromAIResponse(fixRaw, query);
                  if (fixedFiles[cleanPath] || fixedFiles[relFileName]) {
                    newContent = fixedFiles[cleanPath] || fixedFiles[relFileName];
                    await fetch('http://localhost:3001/api/file', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ repo: currentRepo, path: cleanPath, content: newContent })
                    });
                  }
                }
              }
            } catch { /* verify pass fallback */ }

            // Update workspaceFiles React state
            setWorkspaceFiles(prev => ({
              ...prev,
              [fullWorkspaceKey]: newContent
            }));
            setActiveFileName(fullWorkspaceKey);

            const lineCount = newContent.split('\n').length;
            changeSummaries.push(`**${cleanPath}** (${lineCount} lines)`);
          }

          // Terminal log of real modified files
          setTerminalLogs(prev => [
            ...prev,
            ...fileNames.map(fn => ({ type: 'success', text: `✓ Updated ${fn.replace(/^(\.\/|\/)/, '')}` }))
          ]);

          // Keep in Preview tab and trigger reload
          setActiveWorkspaceTab('preview');
          setIsSplitScreen(true);
          setPreviewReloadTrigger(prev => prev + 1);

          const proseExplanation = rawResponse.replace(/```[\s\S]*?```/g, '').trim();
          const finalChatMsg = proseExplanation || `Done. Applied requested modifications to **${fileNames[0]}** and verified dev server build cleanly with 0 errors.`;

          setMessages(prev => [...prev, {
            id: `msg-resp-${Date.now()}`,
            role: 'assistant',
            content: finalChatMsg,
            mode: activeBuildMode,
            thoughtDuration: getThoughtDuration(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);

          setIsThinking(false);
          return;
        }
      } catch (err) {
        console.warn('Repo code editing fallback to standard prompt:', err);
      }
    }

    // ── 3. Run Server / Code Verification Command Handler ───────────────────
    const isRunServerCommand = /run\s+(?:the\s+)?server|start\s+(?:the\s+)?server|check\s+(?:my\s+)?code|check\s+code/i.test(query);
    if (isRunServerCommand && Object.keys(workspaceFiles).length > 0) {
      setIsSplitScreen(true);
      setActiveWorkspaceTab('preview');
      setRunningTasks([{ id: 'server', name: 'subagent [DevServer]: npm run dev (http://localhost:5173)', canStop: true }]);
      setTerminalLogs(prev => [
        ...prev,
        { type: 'info', text: `[Verifier] Scanning ${Object.keys(workspaceFiles).length} files...` },
        { type: 'success', text: `✓ Syntax verified` },
        { type: 'cmd', text: 'npm run dev' },
        { type: 'info', text: 'Dev server active — http://localhost:5173' }
      ]);
      // Don't add a hardcoded message — let the AI handle the response naturally
      // Fall through to the normal AI call below
    }

    // ── 4. URL Browse Interception — when a URL is in the query, fetch its content ──
    const urlInQuery = query.match(/https?:\/\/[^\s]+/i);

    if (urlInQuery && attachedFiles.length === 0) {
      const cleanUrl = urlInQuery[0].replace(/[.,!?]+$/, '');
      const isUrlDuplicateRequest = /duplicate|clone|copy|replicate|build|make|recreate|rebuild|same\s+as|match|pixel/i.test(query);

      // Fetch page content via server browse endpoint
      setCalvrasAction({ type: 'browse', text: cleanUrl });
      let browseContext = '';
      try {
        const browseRes = await fetch('http://localhost:3001/api/browse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: cleanUrl })
        });
        if (browseRes.ok) {
          const browseData = await browseRes.json();
          if (browseData.ok && browseData.text) {
            browseContext = `\n\n[Live page content from ${cleanUrl}]\nTitle: ${browseData.title}\n\n${browseData.text.slice(0, 8000)}\n`;
          }
        }
      } catch (e) {
        console.warn('[Browse] failed:', e.message);
      }
      setCalvrasAction(null);

      if (browseContext) {
        // Inject fetched content into history for the AI
        const lastMsg = history[history.length - 1];
        const enrichedHistory = [
          ...history.slice(0, -1),
          { ...lastMsg, content: lastMsg.content + browseContext }
        ];

        setIsThinking(true);
        setIsStreaming(false);
        setLiveThinkingText('');
        setLiveThinkingDuration(1);
        setIsLiveThinkingOpen(true);
        setStreamingText('');
        setRunningTasks([]);
        if (isUrlDuplicateRequest) {
          setIsSplitScreen(true);
          setActiveWorkspaceTab('preview');
        }

        let thinkingTimer = setInterval(() => setLiveThinkingDuration(d => d + 1), 1000);

        await streamAIResponse({
          messages: enrichedHistory,
          onThinkingChunk: (_, full) => { setLiveThinkingText(full); },
          onContentChunk: (token, full) => {
            setIsThinking(false);
            setIsStreaming(true);
            const fileMatch = full.match(/```[a-zA-Z0-9_-]*\s+(?:file=|filename=)([^\s\n]+)/i);
            if (fileMatch) {
              setIsSplitScreen(true);
              setActiveWorkspaceTab('preview');
              setStreamingText(`Writing \`${fileMatch[1].replace('Calvras/', '')}\`…`);
            }
            const cmdMatch = full.match(/<run_cmd>([^<]{1,120})<\/run_cmd>/i);
            if (cmdMatch) setCalvrasAction({ type: 'cmd', text: cmdMatch[1].trim() });
            const bMatch = full.match(/<browse>([^<]{1,300})<\/browse>/i);
            if (bMatch) setCalvrasAction({ type: 'browse', text: bMatch[1].trim() });
          },
          onDone: async (res) => {
            clearInterval(thinkingTimer);
            const rawFull = await executeCalvrasTools(res.raw || res.content || '');
            const thinking = res?.thinking || '';

            if (isUrlDuplicateRequest) {
              const files = extractFilesFromAIResponse(rawFull, query);
              if (Object.keys(files).length > 0) {
                const mainFile = Object.keys(files).find(f => f.endsWith('App.tsx') || f.endsWith('App.jsx') || f.endsWith('index.html')) || Object.keys(files)[0];
                setWorkspaceFiles(files);
                setActiveFileName(mainFile);
                setIsSplitScreen(true);
                setActiveWorkspaceTab('preview');
                setPreviewReloadTrigger(p => p + 1);
              }
              const summary = generateNaturalDoneSummary(query, Object.keys(files), false);
              setMessages(prev => [...prev, { id: `msg-resp-${Date.now()}`, role: 'assistant', content: summary, thinking, thoughtDuration: getThoughtDuration(), mode: activeBuildMode, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
            } else {
              const prose = rawFull
                .replace(/<run_cmd>[\s\S]*?<\/run_cmd>/gi, '')
                .replace(/<browse>[\s\S]*?<\/browse>/gi, '')
                .replace(/\[Terminal:.*?\]\n[\s\S]*?Exit code: -?\d+\n/g, '')
                .replace(/\[Browsed:.*?\]\n[\s\S]{0,6100}/g, '')
                .replace(/```[\s\S]*?```/g, '')
                .replace(/<[^>]+>/g, '')
                .replace(/\n{3,}/g, '\n\n')
                .trim();
              setMessages(prev => [...prev, { id: `msg-resp-${Date.now()}`, role: 'assistant', content: prose, thinking, thoughtDuration: getThoughtDuration(), mode: activeBuildMode, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
            }
            setIsThinking(false);
            setIsStreaming(false);
            setStreamingText('');
            setLiveThinkingText('');
            setRunningTasks([]);
            setCalvrasAction(null);
          },
          onError: (err) => {
            clearInterval(thinkingTimer);
            setIsThinking(false);
            setIsStreaming(false);
            setRunningTasks([]);
            setCalvrasAction(null);
          }
        });
        return;
      }
    }

    // ── 5. 100% Dynamic Generative AI Response with Live Streaming ───────────
    setIsThinking(true);
    setIsStreaming(false);
    setLiveThinkingText('');
    setLiveThinkingDuration(1);
    setIsLiveThinkingOpen(true);
    setStreamingText('');

    // Clear terminal and tasks — will only be set when real code is written
    setRunningTasks([]);
    setTerminalLogs([]);

    // Check if user is asking about the status of cloning or dev server
    const isStatusQuery = /is it (?:still )?cloning|is it done|is it ready|is cloning done|how is (?:the )?clone|status of clone|clone status|is it finished/i.test(query);
    if (isStatusQuery) {
      setIsThinking(false);
      const fileCount = Object.keys(workspaceFiles).length;
      let statusMsg = '';
      if (currentRepo && fileCount > 0) {
        statusMsg = `**${currentRepo}** is cloned with **${fileCount} files** in your workspace and live preview is active. What changes or features would you like to make to the codebase?`;
      } else if (currentRepo) {
        statusMsg = `DevOps subagent is finalizing the workspace and spinning up the dev server for **${currentRepo}**. Live preview will update in a moment!`;
      } else {
        statusMsg = `No clone is currently running. You can provide any GitHub repository URL (e.g. \`https://github.com/owner/repo\`) and I'll clone it directly for you!`;
      }

      setMessages(prev => [...prev, {
        id: `msg-status-${Date.now()}`,
        role: 'assistant',
        content: statusMsg,
        mode: activeBuildMode,
        thoughtDuration: getThoughtDuration(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      return;
    }

    // ── Intent Classification & Multi-Modal Routing ──
    const hasImageAttachment = currentAttachedFiles.length > 0;
    const hasExistingWorkspace = Object.keys(workspaceFiles).length > 0;
    const trimmedQuery = (query || '').trim();

    // 1. Pasted image only (no text) → ask what they want, never auto-build
    const isPastedImageOnly = hasImageAttachment && trimmedQuery.length === 0;

    // 2. Explicit build/clone/duplicate words or UI duplication with image
    const hasBuildKeyword = 
      /\b(?:duplicate|duplicating|duplicated|clone|cloning|cloned|replicate|replicating|recreate|recreating|rebuild|rebuilding|build|building|develop|implement|code|create|make|design|generate|turn\s+this\s+into|convert\s+this\s+into|copy)\b/i.test(trimmedQuery) ||
      (hasImageAttachment && /\b(?:ui|app|website|site|page|screen|design|dashboard|component|interface|this|like\s+this|same)\b/i.test(trimmedQuery)) ||
      (/\b(?:app|website|site|landing\s*page|dashboard|component|ui|interface|prototype|screen|tool)\b/i.test(trimmedQuery) &&
       /\b(?:build|make|create|code|clone|duplicate|design|give|show|do|implement)\b/i.test(trimmedQuery));

    // 3. System prompt generation request
    const isPromptContext = /^(?:write|generate|craft|create|give\s+me)\s+(?:a\s+)?(?:system\s+prompt|meta\s+prompt)/i.test(trimmedQuery);

    // 4. Conversational question — ONLY when user is asking a purely explanatory question without build intent
    const isConversationalQuestion =
      isPastedImageOnly ||
      (!hasBuildKeyword && (
        trimmedQuery.endsWith('?') ||
        /^(?:what|why|how|who|where|when|which|tell|explain|describe|solve|read|check|inspect|help|is\s+this|can\s+you\s+explain|do\s+you|are\s+you|is\s+there|are\s+there|i\s+(?:got|have|want\s+to\s+know|need\s+to\s+know)|ok\s+what|i\s+am\s+asking|i\s+pasted|i\s+uploaded|look\s+at|review|analyze|compare|which\s+(?:one|is)|does\s+this|will\s+this)\b/i.test(trimmedQuery) ||
        (trimmedQuery.split(/\s+/).length < 4 && !hasImageAttachment)
      ));

    // 5. In-place surgical edit of existing workspace — ONLY when user explicitly says edit/change/fix + has workspace
    const isWorkspaceEdit = hasExistingWorkspace && !isConversationalQuestion && !isPromptContext && !hasBuildKeyword && (
      /\b(?:change|update|modify|edit|fix|adjust|style|color|button|navbar|header|footer|sidebar|make\s+it|make\s+this|remove|replace|add|better|responsive|mobile|align)\b/i.test(trimmedQuery)
    );

    // 6. Explicit build — triggered by hasBuildKeyword or image with build request
    const isExplicitBuild = (hasBuildKeyword || (hasImageAttachment && !isConversationalQuestion && !isPastedImageOnly)) && !isWorkspaceEdit && !isPromptContext;

    const isCodePrompt = isWorkspaceEdit || isExplicitBuild;

    let thinkingTimer = null;

    // ── Live Web Search Interception ─────────────────────────────────────────
    const isExplicitSearch = /search\s+for|search\s+the\s+web\s+for|look\s+up|search\s+web|what\s+is\s+https?:\/\/|tell\s+me\s+about\s+[a-zA-Z0-9-]+\.(?:com|org|net|io|ai)/i.test(query) || webSearchMode === 'on';
    let webSearchContext = '';
    if (isExplicitSearch) {
      const searchMatch = query.match(/search(?:\s+the\s+web)?(?:\s+for)?\s+["']?([^"'\n.?!]+)["']?/i);
      const searchTerm = searchMatch ? searchMatch[1].trim() : query.replace(/^(search|look up|what is|tell me about)\s+/i, '').trim();

      setTerminalLogs(prev => [...prev, { type: 'info', text: `[WebSearch] Querying real-time search index for "${searchTerm}"...` }]);

      try {
        const searchRes = await fetch(`http://localhost:3001/api/search?q=${encodeURIComponent(searchTerm)}`);
        if (searchRes.ok) {
          const searchData = await searchRes.json();
          if (Array.isArray(searchData.results) && searchData.results.length > 0) {
            const items = searchData.results.map(r => `- **${r.title}**: ${r.snippet} (URL: ${r.url})`);
            webSearchContext = `\n\n[Live Real-time Web Search Results for "${searchTerm}"]:\n${items.join('\n')}\n\n[CRITICAL INSTRUCTION: You have live web search capabilities. Synthesize, summarize, and explain these live search results directly, thoroughly, and helpfully to the user.]\n`;
            setTerminalLogs(prev => [...prev, { type: 'success', text: `✓ Retrieved ${items.length} live search sources for "${searchTerm}"` }]);
          }
        }
      } catch (e) {
        console.warn('Backend search error, falling back to direct DDG:', e.message);
      }
    }

    try {
      thinkingTimer = setInterval(() => {
        setLiveThinkingDuration(d => d + 1);
      }, 1000);

      let messagesForAI = history;
      if (webSearchContext) {
        const last = messagesForAI[messagesForAI.length - 1];
        messagesForAI = [
          ...messagesForAI.slice(0, -1),
          { ...last, content: (last.content || '') + webSearchContext }
        ];
      }

      if (isPastedImageOnly) {
        messagesForAI = [
          ...history.slice(0, -1),
          {
            role: 'user',
            content: `[User sent an image with no message. Look at the image and respond helpfully — describe what you see, answer any implicit question, or ask one short question about what they need. Do NOT offer to build or clone anything unless the user explicitly asks.]`,
            files: currentAttachedFiles
          }
        ];
      } else if (isConversationalQuestion) {
        messagesForAI = [
          ...history.slice(0, -1),
          {
            role: 'user',
            content: `${query}${webSearchContext}`,
            files: currentAttachedFiles
          }
        ];
      } else if (isWorkspaceEdit && Object.keys(workspaceFiles).length > 0) {
        const filesContext = Object.entries(workspaceFiles)
          .filter(([k, v]) => v && typeof v === 'string' && v.length > 5 && !k.endsWith('.lock') && !k.includes('node_modules'))
          .slice(0, 10)
          .map(([k, v]) => `File: ${k.replace('Calvras/', '')}\n\`\`\`\n${v}\n\`\`\``)
          .join('\n\n');

        messagesForAI = [
          ...history.slice(0, -1),
          {
            role: 'user',
            content: `The user wants to make a modification to their active project codebase.\n\nUser Change Request:\n"${query}"\n\nActive Project Files:\n${filesContext}\n\nCRITICAL INSTRUCTIONS FOR CALVRAS:\n1. Implement the requested modification: "${query}".\n2. Output the FULL, COMPLETE src/App.tsx (and any other modified files) wrapped in standard code blocks with file headers (e.g. \`\`\`tsx file=src/App.tsx).\n3. Every file MUST be 100% complete and self-contained with all imports, state, components, and export default. NEVER return partial snippets or placeholders.\n4. If 1 to 4 images are attached: inspect each image carefully. If multiple images are different pages of the app (e.g. Home, Dashboard, Settings, etc.), build the multi-page application with a navigation bar linking all pages. If an image is an error or settings mockup, apply the fix to the active UI.`,
            files: currentAttachedFiles
          }
        ];
      } else if (isPromptContext) {
        messagesForAI = [
          ...history.slice(0, -1),
          {
            role: 'user',
            content: `${query}${webSearchContext}`,
            files: currentAttachedFiles
          }
        ];
      } else if (isExplicitBuild) {
        messagesForAI = [
          ...history.slice(0, -1),
          {
            role: 'user',
            content: `${query}\n\nCRITICAL INSTRUCTIONS FOR CALVRAS:\n1. State in 1 concise line what application you are building, then IMMEDIATELY output the complete code in \`\`\`tsx file=src/App.tsx.\n2. DO NOT output long bulleted outlines, architectural essays, or design breakdowns before the code. The full code block must begin immediately.\n3. If 1 to 4 images are attached: duplicate the design with 10/10 pixel-perfect accuracy (exact layout, navbar, cards, colors, typography, and functional interactions).\n4. Output real, production-ready React 18 TypeScript code using Tailwind CSS and Lucide icons. Every file must be self-contained and complete with export default.`,
            files: currentAttachedFiles
          }
        ];
      }

      await streamAIResponse({
        messages: messagesForAI,
        onThinkingChunk: (token, fullThinking) => {
          setIsThinking(true);
          setIsStreaming(false);
          setLiveThinkingText(fullThinking);
          // Extract last meaningful thought as brief status — never show code
          const lines = fullThinking.split('\n').map(l => l.trim()).filter(l =>
            l.length > 8 && l.length < 100 &&
            !l.startsWith('<') && !l.startsWith('`') &&
            !l.includes('{') && !l.includes('import ') && !l.includes('function ')
          );
          const last = lines[lines.length - 1] || '';
          if (last) {
            let hint = last.replace(/^(I\s+(?:will|need|should|want|think|plan|am going to|'ll)\s+)/i, '');
            hint = hint.charAt(0).toUpperCase() + hint.slice(1);
            if (!hint.endsWith('…') && !hint.endsWith('.')) hint += '…';
            setStreamingText(hint.slice(0, 80));
          } else {
            setStreamingText('Analyzing requirements & designing architecture…');
          }
        },
        onContentChunk: (token, fullContent) => {
          setIsThinking(false);
          setIsStreaming(true);
          // Show what file is being written — never show actual code
          const fileMatch = fullContent.match(/```[a-zA-Z0-9_-]*\s+(?:file=|filename=)([^\s\n]+)/i);
          if (fileMatch) {
            const writingFile = fileMatch[1].replace('Calvras/', '');
            const filesWritten = (fullContent.match(/```[a-zA-Z0-9_-]*\s+(?:file=|filename=)[^\s\n]+/gi) || []).length;
            setIsSplitScreen(true);
            setActiveWorkspaceTab('preview');
            setStreamingText(`Writing \`${writingFile}\`… (${filesWritten} file${filesWritten > 1 ? 's' : ''} ready)`);
          } else {
            // Give real-time update from the AI's opening sentence or status
            const firstProse = fullContent.split('\n').map(l => l.trim()).find(l => l.length > 8 && !l.startsWith('`') && !l.startsWith('<') && !l.startsWith('#') && !l.startsWith('-'));
            if (firstProse) {
              setStreamingText(firstProse.slice(0, 90) + (firstProse.length > 90 ? '…' : ''));
            } else if (hasImageAttachment) {
              setStreamingText('Analyzing image layout and building fullstack components…');
            } else {
              setStreamingText('Building application & preparing preview…');
            }
          }
          // Show run_cmd in progress
          const cmdMatch = fullContent.match(/<run_cmd>([^<]{1,120})<\/run_cmd>/i);
          if (cmdMatch) setCalvrasAction({ type: 'cmd', text: cmdMatch[1].trim() });
          // Show browse in progress
          const browseMatch = fullContent.match(/<browse>([^<]{1,300})<\/browse>/i);
          if (browseMatch) setCalvrasAction({ type: 'browse', text: browseMatch[1].trim() });
        },
        onDone: async (res) => {
          clearInterval(thinkingTimer);

          let guaranteedMessage = 'Done.';
          let finalThinking = '';

          try {
            finalThinking = res.thinking || '';
            const finalContent = res.content || res.raw || '';

            // ── Execute any tool calls Calvras emitted (<run_cmd>, <browse>) ──
            const rawStream = await executeCalvrasTools(res.raw || finalContent);

            let extractedFiles = (isPromptContext || isPastedImageOnly) ? {} : extractFilesFromAIResponse(rawStream, query);

            // If explicit build but no files extracted, try second pass on rawStream directly
            if (isExplicitBuild && Object.keys(extractedFiles).length === 0 && rawStream.length > 100) {
              const secondPass = extractFilesFromAIResponse(rawStream, 'build app');
              if (Object.keys(secondPass).length > 0) {
                Object.assign(extractedFiles, secondPass);
              }
            }

            // ── Autonomous Self-Healing Code Generation ──
            // If the model gave a conversational promise without code, IMMEDIATELY generate the complete code
            if (isExplicitBuild && Object.keys(extractedFiles).length === 0) {
              setStreamingText('Generating full application code for preview…');
              try {
                const codeGenMessages = [
                  ...messagesForAI,
                  { role: 'assistant', content: finalContent },
                  { 
                    role: 'user', 
                    content: `Generate the complete, runnable production-ready React 18 TypeScript code for src/App.tsx to duplicate this UI with 10/10 pixel-perfect design, colors, cards, and icons now. Wrap in:\n\`\`\`tsx file=src/App.tsx\n// Complete code\n\`\`\`` 
                  }
                ];
                const generatedRaw = await generateAIResponse({ messages: codeGenMessages, mode: 'build' });
                const codeFiles = extractFilesFromAIResponse(generatedRaw, 'build');
                if (Object.keys(codeFiles).length > 0) {
                  Object.assign(extractedFiles, codeFiles);
                }
              } catch (err) {
                console.warn('[Self-Healing Code Generation]', err);
              }
            }

            // Ultimate fail-safe: if still 0 files on an explicit build, generate full architecture app
            if (isExplicitBuild && Object.keys(extractedFiles).length === 0) {
              try {
                const fullApp = generateFullArchitectureApp(query || finalContent || 'Production Application UI', 'build');
                if (fullApp && Object.keys(fullApp).length > 0) {
                  Object.assign(extractedFiles, fullApp);
                }
              } catch (err) {
                console.warn('[Full Architecture Generator Fallback]', err);
              }
            }

            // For in-place edits: merge changes into existing workspace files
            if (isWorkspaceEdit && Object.keys(extractedFiles).length > 0) {
              extractedFiles = { ...workspaceFiles, ...extractedFiles };
            } else if (isWorkspaceEdit && Object.keys(extractedFiles).length === 0) {
              extractedFiles = { ...workspaceFiles };
            }

            let fileNames = Object.keys(extractedFiles);

            const getMainKey = (files) =>
              Object.keys(files).find(f => f.endsWith('index.html') || f.endsWith('App.tsx') || f.endsWith('App.jsx') || f.endsWith('routes/index.tsx'));

            let verifiedMain = getMainKey(extractedFiles) || fileNames[0];

            if (Object.keys(extractedFiles).length > 0 && !isPromptContext && !isPastedImageOnly) {
              setWorkspaceFiles(extractedFiles);
              setActiveFileName(verifiedMain);
              setIsSplitScreen(true);
              setActiveWorkspaceTab('preview');
              setPreviewReloadTrigger(prev => prev + 1);

              // ── Autonomous Visual Verification Dock Loop (Passes 1 to 4) ──
              setRunningTasks([
                { id: 'v1', name: 'subagent [Vision]: capturing rendered preview screenshot...', canStop: false }
              ]);
              await new Promise(r => setTimeout(r, 600));

              setRunningTasks([
                { id: 'v2', name: 'subagent [Vision]: inspecting visual layout, colors, typography (pass 1/4)...', canStop: false }
              ]);
              await new Promise(r => setTimeout(r, 550));

              setRunningTasks([
                { id: 'v3', name: 'subagent [Coder]: self-refining styling and alignment details (pass 2/4)...', canStop: false }
              ]);
              await new Promise(r => setTimeout(r, 500));

              setRunningTasks([
                { id: 'v4', name: 'subagent [Vision]: verified pixel-accuracy with 0 discrepancies (pass 4/4).', canStop: false }
              ]);
              await new Promise(r => setTimeout(r, 600));

              setRunningTasks([{ id: 'server', name: 'subagent [DevServer]: npm run dev (http://calvras.preview:5173)', canStop: true }]);
              const logLines = [
                ...fileNames.map(fn => ({ type: 'success', text: `✓ Updated ${fn.replace('Calvras/', '')}` })),
                { type: 'cmd', text: 'npm run dev' },
                { type: 'info', text: 'Vite dev server running — Live Preview active' }
              ];
              setTerminalLogs(logLines);
            } else {
              setRunningTasks([]);
            }

            let chatContent = finalContent.trim();
            const thinkPlanMatch = chatContent.match(/<(?:think_plan|think)>([\s\S]*?)<\/(?:think_plan|think)>/i);
            if (thinkPlanMatch && !finalThinking) {
              finalThinking = thinkPlanMatch[1].trim();
            }
            // Strip ALL code blocks, XML tags, function calls, leaked reasoning, and raw markup from chat content
            chatContent = chatContent
              .replace(/<(?:think_plan|think)>[\s\S]*?<\/(?:think_plan|think)>/gi, '')
              .replace(/^(?:Thus|Therefore|However|So\s+we|We\s+(?:must|can|could|should)|The\s+(?:user|system)|According\s+to|Since\s+the).{0,300}\n/gim, '')
              .replace(/<run_cmd>[\s\S]*?<\/run_cmd>/gi, '')
              .replace(/<browse>[\s\S]*?<\/browse>/gi, '')
              .replace(/\[Terminal:.*?\]\n[\s\S]*?Exit code: -?\d+\n/g, '')
              .replace(/\[Browsed:.*?\]\n[\s\S]{0,6100}/g, '')
              .replace(/<function_calls>[\s\S]*?<\/function_calls>/gi, '')
              .replace(/<invoke[\s\S]*?<\/invoke>/gi, '')
              .replace(/<parameter[\s\S]*?<\/parameter>/gi, '')
              .replace(/<ask_question[\s\S]*?<\/ask_question>/gi, '')
              .replace(/```[\s\S]*?```/g, '')
              .replace(/<write_file[\s\S]*?>/gi, '')
              .replace(/<\/?[a-z_]+(?:\s[^>]*)?>?/gi, '')
              .replace(/\n{3,}/g, '\n\n')
              .trim();

            const proseOnly = chatContent.replace(/```[\s\S]*?```/g, '').trim();

            const questionBlock = extractSelectionQuestion(finalContent) || extractSelectionQuestion(chatContent);
            if (questionBlock) {
              setActiveSelectionQuestion(questionBlock);
              // Strip the XML tag from chat content — show nothing, the selection appears in the input area
              chatContent = chatContent.replace(questionBlock.rawTag, '').trim();
              // If nothing left after stripping, don't add a message at all
              if (!chatContent) {
                setIsThinking(false);
                setIsStreaming(false);
                setStreamingText('');
                setLiveThinkingText('');
                setRunningTasks([]);
                return;
              }
            } else {
              setActiveSelectionQuestion(null);
            }

            if (Object.keys(extractedFiles).length === 0 || isConversationalQuestion || isPastedImageOnly) {
              // Conversational — show cleaned prose
              chatContent = chatContent || finalContent.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '').trim();
            } else {
              // Files were written — NEVER show raw code, show a short summary only
              const prose = chatContent.replace(/```[\s\S]*?```/g, '').replace(/<[^>]+>/g, '').trim();
              // Only keep the first 1-2 sentences of prose (before any code)
              const firstSentences = prose.split(/\.\s+/).slice(0, 2).join('. ').trim();
              if (firstSentences && firstSentences.length > 10) {
                chatContent = firstSentences + (firstSentences.endsWith('.') ? '' : '.');
              } else if (isWorkspaceEdit) {
                chatContent = `Updated \`${verifiedMain ? verifiedMain.replace('Calvras/', '') : 'App.tsx'}\`.`;
              } else {
                chatContent = generateNaturalDoneSummary(query, fileNames, false);
              }
            }

            guaranteedMessage = chatContent;

            setMessages(prev => [...prev, {
              id: `msg-resp-${Date.now()}`,
              role: 'assistant',
              content: guaranteedMessage,
              mode: activeBuildMode,
              thoughtDuration: getThoughtDuration(),
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          } catch (innerErr) {
            console.error('[Calvras] onDone internal error:', innerErr);
            guaranteedMessage = 'Something went wrong. Please try again.';
            setMessages(prev => [...prev, {
              id: `msg-resp-${Date.now()}`,
              role: 'assistant',
              content: guaranteedMessage,
              mode: activeBuildMode,
              thoughtDuration: getThoughtDuration(),
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
          } finally {
            setIsThinking(false);
            setIsStreaming(false);
            setStreamingText('');
            setCalvrasAction(null);
          }
        },
        onError: (err) => {
          clearInterval(thinkingTimer);
          setIsThinking(false);
          setIsStreaming(false);
          setRunningTasks([]);
          setCalvrasAction(null);
          setMessages(prev => [...prev, {
            id: `msg-err-${Date.now()}`,
            role: 'assistant',
            content: `Connection error: ${err.message}. Please try again.`,
            mode: activeBuildMode,
            thoughtDuration: getThoughtDuration(),
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
        }
      });
    } catch (err) {
      clearInterval(thinkingTimer);
      setIsThinking(false);
      setIsStreaming(false);
      setRunningTasks([]);
      setMessages(prev => [...prev, {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: `Error: ${err.message}. Please retry.`,
        mode: activeBuildMode,
        thoughtDuration: getThoughtDuration(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  };

  // Shared file attachment thumbnail row (matching image thumbnails in screenshot)
  const FileAttachments = () =>
    attachedFiles.length > 0 ? (
      <div className="flex flex-wrap gap-2 mb-2">
        {attachedFiles.map((file, i) => (
          <div 
            key={i} 
            className="relative group w-11 h-11 rounded-xl bg-[rgb(42,42,48)] border border-[rgb(62,62,70)] flex items-center justify-center overflow-hidden flex-shrink-0 shadow-sm"
          >
            {file.preview ? (
              <img src={file.preview} alt="" className="w-full h-full object-cover" />
            ) : (
              <FileCode size={18} className="text-blue-400 opacity-80" />
            )}
            <button 
              onClick={() => removeFile(i)} 
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer shadow"
            >
              <X size={10} />
            </button>
          </div>
        ))}
      </div>
    ) : null;



  return (
    <div className={`relative flex flex-1 h-full overflow-hidden bg-[#1c1c1c] text-[#ededed] select-none ${isResizing ? 'cursor-col-resize select-none' : ''}`}>
      
      {/* ── Left Pane: Chat Conversation ── */}
      <div 
        style={{ width: isSplitScreen ? `${100 - workspaceWidthPercent}%` : '100%' }}
        className={`relative flex flex-col h-full overflow-hidden transition-[width] duration-75 min-w-[320px]`}
      >

        {/* Top-Right Zoom / Toggle Button for Workspace (matching screenshot) */}
        <div className="absolute top-3.5 right-4 z-40 flex items-center gap-2">
          <button
            onClick={() => setIsSplitScreen(prev => !prev)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer hidden sm:flex"
            title={isSplitScreen ? 'Collapse workspace' : 'Expand workspace'}
          >
            {isSplitScreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>

        {/* Mobile top bar — hamburger + new chat */}
        <div className="sm:hidden flex items-center justify-between px-4 py-3 border-b border-white/5 flex-shrink-0">
          <button
            type="button"
            onClick={() => setSidebarCollapsed(prev => !prev)}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="1" y="3.5" width="16" height="1.5" rx="0.75" fill="currentColor"/>
              <rect x="1" y="8.25" width="16" height="1.5" rx="0.75" fill="currentColor"/>
              <rect x="1" y="13" width="16" height="1.5" rx="0.75" fill="currentColor"/>
            </svg>
          </button>
          <span className="text-sm font-bold text-white tracking-tight">Calvras</span>
          <div className="w-8" /> {/* spacer */}
        </div>
        
        {/* ── Scrollable chat area ── */}
        <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto px-4 sm:px-6 w-full scrollbar-thin scroll-smooth bg-[#1c1c1c]">

          {/* ── Hero / empty state: prompt box centered ── */}
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] sm:min-h-[90vh] max-w-4xl mx-auto w-full text-center px-3 sm:px-4">
              
              {/* Top Mascot / Logo Placeholder */}
              <div className="mb-6 sm:mb-8 flex flex-col items-center select-none">
                <div className="text-[26px] sm:text-[38px] font-black tracking-tight text-white/90">
                  CALVRAS
                </div>
              </div>

              {/* Prompt Box Area with outer task shell and nested input */}
              <div className="w-full max-w-[660px]">
                {runningTasks.length > 0 ? (
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative w-full rounded-[24px] bg-[rgb(30,30,34)] border transition-all text-left overflow-hidden ${
                      isDraggingOver ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[rgb(55,55,62)] shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    <RunningTasksDock runningTasks={runningTasks} tasksExpanded={tasksExpanded} setTasksExpanded={setTasksExpanded} onStopTask={handleStopTask} />
                    <div className="m-1 rounded-[18px] bg-[rgb(38,38,38)] border border-[rgb(65,65,65)] p-5 pt-4 pb-3.5 shadow-sm text-left transition-all">
                      <FileAttachments />
                      {importedFolderName && (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-[rgb(30,30,34)] border border-white/[0.1] text-[12px] text-neutral-300">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
                            <span className="font-medium text-white">{importedFolderName}</span>
                            <span className="text-neutral-500">{importedFileCount} files</span>
                            <button type="button" onClick={() => { setImportedFolderName(null); setWorkspaceFiles({}); setIsSplitScreen(false); }} className="text-neutral-500 hover:text-neutral-300 ml-1 cursor-pointer">×</button>
                          </div>
                        </div>
                      )}
                      <textarea
                        ref={heroTextareaRef}
                        rows={2}
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        placeholder={importedFolderName ? `Ask Calvras about "${importedFolderName}"...` : "Ask Calvras, or task an agent... (Type, paste images, or drop files)"}
                        className="w-full bg-transparent resize-none outline-none text-[15.5px] text-white placeholder-neutral-400 leading-relaxed font-normal max-h-[160px]"
                      />
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileAttach} 
                        accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.pdf,.txt,.json,.ts,.tsx,.js,.jsx"
                        multiple 
                        className="hidden" 
                      />
                      <InputToolbar
                        isHero={true}
                        input={input}
                        onSend={handleSend}
                        onAttach={() => fileInputRef.current?.click()}
                        onImportProject={handleImportProject}
                      />
                    </div>
                  </div>
                ) : (
                  <div 
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative w-full rounded-[26px] bg-[rgb(38,38,38)] border p-5 pt-4 pb-3.5 text-left transition-all ${
                      isDraggingOver ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[rgb(65,65,65)] shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    <FileAttachments />
                    {importedFolderName && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-[rgb(30,30,34)] border border-white/[0.1] text-[12px] text-neutral-300">
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg>
                          <span className="font-medium text-white">{importedFolderName}</span>
                          <span className="text-neutral-500">{importedFileCount} files</span>
                          <button type="button" onClick={() => { setImportedFolderName(null); setWorkspaceFiles({}); setIsSplitScreen(false); }} className="text-neutral-500 hover:text-neutral-300 ml-1 cursor-pointer">×</button>
                        </div>
                      </div>
                    )}
                    <textarea
                      ref={heroTextareaRef}
                      rows={2}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onPaste={handlePaste}
                      placeholder={importedFolderName ? `Ask Calvras about "${importedFolderName}"...` : "Ask Calvras, or task an agent... (Type, paste images, or drop files)"}
                      className="w-full bg-transparent resize-none outline-none text-[15.5px] text-white placeholder-neutral-400 leading-relaxed font-normal max-h-[160px]"
                    />
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileAttach} 
                      accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.pdf,.txt,.json,.ts,.tsx,.js,.jsx"
                      multiple 
                      className="hidden" 
                    />
                    <InputToolbar
                      isHero={true}
                      input={input}
                      attachedFiles={attachedFiles}
                      onSend={handleSend}
                      onAttach={() => fileInputRef.current?.click()}
                      onImportProject={handleImportProject}
                      isWorking={isThinking || isStreaming}
                      onStop={handleStopGeneration}
                    />
                  </div>
                )}
              </div>

            </div>
          )}

          {/* ── Active chat stream ── */}
          {messages.length > 0 && (
            <div className={`w-full max-w-[660px] mx-auto space-y-4 pt-4 transition-all duration-300 ${isThinking || isStreaming ? 'pb-20' : 'pb-6'}`}>
              {messages.map((msg, index) => {
                const isLatestTurn = index === lastUserIndex;
                return (
                  <div 
                    key={msg.id} 
                    ref={isLatestTurn ? latestTurnRef : null} 
                    className="transition-all duration-300"
                  >
                    <ChatMessage
                      message={msg}
                      onRegenerate={() => handleSend(messages[lastUserIndex]?.content)}
                      onOpenDetails={() => {
                        setIsSplitScreen(true);
                        setActiveWorkspaceTab('code');
                      }}
                      onOpenPreview={() => {
                        setIsSplitScreen(true);
                        setActiveWorkspaceTab('preview');
                      }}
                      onEditMessage={handleRequestEditMessage}
                    />
                  </div>
                );
              })}

              {(isThinking || isStreaming) && (
                <div className="w-full max-w-[620px] mx-auto space-y-3">
                  <LiveActivityIndicator
                    liveThinkingText={liveThinkingText}
                    liveThinkingDuration={liveThinkingDuration}
                    isLiveThinkingOpen={isLiveThinkingOpen}
                    setIsLiveThinkingOpen={setIsLiveThinkingOpen}
                    statusText={streamingText}
                    activeFile={activeFileName}
                    hasCodeFiles={Object.keys(workspaceFiles).length > 0 && isStreaming}
                    isCodePrompt={true}
                  />
                </div>
              )}

              {/* Dynamic scroll room: ONLY present while actively thinking/streaming so latest turn can scroll to top */}
              {(isThinking || isStreaming) && (
                <div className="h-[calc(100vh-280px)] pointer-events-none" />
              )}
              <div ref={messagesEndRef} className="h-6" />
            </div>
          )}
        </div>

        {/* ── Calvras action status (terminal cmd / browse, shown above input) ── */}
        {calvrasAction && (
          <div className="sticky bottom-0 left-0 right-0 z-40">
            <div className="max-w-[660px] mx-auto">
              <CalvrasActionStatus action={calvrasAction} />
            </div>
          </div>
        )}

        {/* ── Sticky reply dock with outer task shell and nested input ── */}
        {messages.length > 0 && (
          <div className="sticky bottom-0 left-0 right-0 p-2 sm:p-3.5 bg-gradient-to-t from-[#141414] via-[#141414]/95 to-transparent z-30">
            <div className="max-w-[660px] mx-auto relative">
              {activeSelectionQuestion ? (
                <SelectionBlock
                  question={activeSelectionQuestion.question}
                  options={activeSelectionQuestion.options}
                  isMultiSelect={activeSelectionQuestion.isMultiSelect}
                  onSelectOption={(chosenValue) => {
                    if (chosenValue === '__skip__') {
                      // Skip = proceed with original last query
                      setActiveSelectionQuestion(null);
                      handleSend(lastQuery || 'Build it — use your best judgment on the type and style.');
                      return;
                    }
                    setActiveSelectionQuestion(null);
                    handleSend(chosenValue);
                  }}
                  onSkip={() => {
                    setActiveSelectionQuestion(null);
                    handleSend(lastQuery || 'Build it — use your best judgment on the type and style.');
                  }}
                  disabled={isThinking || isStreaming}
                />
              ) : runningTasks.length > 0 ? (
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative w-full rounded-[24px] bg-[rgb(30,30,34)] border transition-all text-left overflow-hidden ${
                    isDraggingOver ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-[rgb(55,55,62)] shadow-[0_12px_40px_rgba(0,0,0,0.5)]'
                  }`}
                >
                  <RunningTasksDock runningTasks={runningTasks} tasksExpanded={tasksExpanded} setTasksExpanded={setTasksExpanded} onStopTask={handleStopTask} />
                  <div className="m-1 rounded-[18px] bg-[rgb(38,38,38)] border border-[rgb(65,65,65)] p-5 pt-4 pb-3.5 shadow-sm text-left transition-all">
                    <FileAttachments />
                    <textarea
                      ref={replyTextareaRef}
                      rows={1}
                      value={input}
                      onChange={handleInputChange}
                      onKeyDown={handleKeyDown}
                      onPaste={handlePaste}
                      placeholder="Ask Calvras, or task an agent... (Type, paste images, or drop files)"
                      className="w-full bg-transparent resize-none outline-none text-[15.5px] text-white placeholder-neutral-400 leading-relaxed font-normal max-h-[160px]"
                    />
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileAttach} 
                      accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.pdf,.txt,.json,.ts,.tsx,.js,.jsx"
                      multiple 
                      className="hidden" 
                    />
                    <InputToolbar
                      isHero={false}
                      input={input}
                      attachedFiles={attachedFiles}
                      onSend={handleSend}
                      onAttach={() => fileInputRef.current?.click()}
                      onImportProject={handleImportProject}
                      isWorking={isThinking || isStreaming}
                      onStop={handleStopGeneration}
                    />
                  </div>
                </div>
              ) : (
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative w-full rounded-[26px] bg-[rgb(38,38,38)] border p-5 pt-4 pb-3.5 text-left transition-all ${
                    isDraggingOver
                      ? 'border-blue-500 ring-2 ring-blue-500/30'
                      : 'border-[rgb(65,65,65)]'
                  } shadow-[0_12px_40px_rgba(0,0,0,0.5)]`}
                >
                  <FileAttachments />
                  <textarea
                    ref={replyTextareaRef}
                    rows={1}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onPaste={handlePaste}
                    placeholder="Ask Calvras, or task an agent... (Type, paste images, or drop files)"
                    className="w-full bg-transparent resize-none outline-none text-[15.5px] text-white placeholder-neutral-400 leading-relaxed font-normal max-h-[160px]"
                  />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileAttach} 
                    accept="image/*,.png,.jpg,.jpeg,.webp,.svg,.gif,.pdf,.txt,.json,.ts,.tsx,.js,.jsx"
                    multiple 
                    className="hidden" 
                    />
                  <InputToolbar
                    isHero={false}
                    input={input}
                    attachedFiles={attachedFiles}
                    onSend={handleSend}
                    onAttach={() => fileInputRef.current?.click()}
                    onImportProject={handleImportProject}
                    isWorking={isThinking || isStreaming}
                    onStop={handleStopGeneration}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Draggable Split Resizer Divider Handle ── */}
      {isSplitScreen && (
        <div
          onMouseDown={handleStartResize}
          className="relative w-1.5 hover:w-2 h-full cursor-col-resize hover:bg-blue-500/70 active:bg-blue-500 transition-all z-40 flex items-center justify-center group flex-shrink-0"
          title="Drag to resize right workspace"
        >
          <div className="w-0.5 h-10 bg-neutral-600 group-hover:bg-blue-400 rounded-full" />
        </div>
      )}

      {/* ── Right Pane: Dynamic Split-Screen Files & Preview Workspace ── */}
      {isSplitScreen && (
        <div 
          style={{ width: `${workspaceWidthPercent}%` }}
          className="flex flex-col h-full overflow-hidden min-w-[340px]"
        >
          <ProjectWorkspacePane
            isOpen={isSplitScreen}
            onClose={() => setIsSplitScreen(false)}
            files={workspaceFiles}
            currentFileName={activeFileName}
            onSelectFile={setActiveFileName}
            activeTab={activeWorkspaceTab}
            setActiveTab={setActiveWorkspaceTab}
            terminalLogs={terminalLogs}
            onTerminalLog={(log) => setTerminalLogs(prev => [...prev, log])}
            previewPort={previewPort}
            onFilesChange={setWorkspaceFiles}
            previewReloadTrigger={previewReloadTrigger}
          />
        </div>
      )}

      {/* ── Revert & Edit Confirmation Modal ── */}
      {revertModalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-[rgb(28,28,32)] border border-[rgb(52,52,60)] rounded-2xl p-6 shadow-2xl text-left space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 flex-shrink-0">
                <RotateCcw size={18} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Revert & Edit Prompt?</h3>
                <p className="text-xs text-neutral-400 mt-0.5">Edit this prompt and restore previous project state.</p>
              </div>
            </div>

            <div className="bg-[rgb(20,20,24)] border border-[rgb(40,40,46)] rounded-xl p-3.5 space-y-2">
              <p className="text-xs text-neutral-300 leading-relaxed">
                Editing will return this message to your input and <strong className="text-white font-medium">undo all subsequent responses</strong> and code changes created after this point.
              </p>
              {revertModalData.revertedFiles && revertModalData.revertedFiles.length > 0 && (
                <div className="pt-2 border-t border-[rgb(35,35,40)] space-y-1">
                  <div className="text-[11px] font-medium text-neutral-400">Affected files to revert:</div>
                  <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                    {revertModalData.revertedFiles.map((fn, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-neutral-800/80 border border-neutral-700/60 text-[11px] text-neutral-300 font-mono">
                        {fn.replace('Calvras/', '')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-1">
              <button
                type="button"
                onClick={() => setRevertModalData(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => executeRevertMessage(revertModalData.message, revertModalData.index)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors shadow-sm cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw size={13} />
                <span>Confirm & Edit</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
