"""
CODED Dataset Generator for DeepSeek-R1-Distill-Qwen Fine-Tuning.
Generates Chain-of-Thought (<think>...</think>) reasoning pairs with autonomous multi-file repository synthesis.
"""

import json
import os

SYSTEM_PROMPT = """You are CODED-R1, an autonomous AI software architect and deep reasoning systems engineer.
When given a software engineering or debugging task:
1. Use your internal `<think>...</think>` reasoning block to analyze edge cases, dependencies, performance implications, and architecture.
2. Provide a clean project overview and directory structure.
3. Emit production-ready, complete files marked with:
[FILE: path/to/filename.ext]
```language
// complete code
```
[ENDFILE]
"""

SAMPLES = [
    {
        "prompt": "Build a production-ready fullstack SaaS dashboard with TanStack Router, responsive shell, and authentication state.",
        "response": """<think>
1. Requirements Analysis:
   - User wants a production-ready SaaS dashboard.
   - Core needs: Responsive desktop/mobile sidebar shell, routing with TanStack Router, authentication guard, and modular component hierarchy.
2. Architecture Decisions:
   - Framework: React 19 + TypeScript + Vite + Tailwind CSS.
   - Router: TanStack Router for type-safe routing.
   - State & Hooks: Custom `useIsMobile` hook for responsive drawer behavior, React state for active navigation.
   - Icons: Lucide-react for clean, consistent developer UI.
3. File Structure Planning:
   - `.lovable/project.json` -> Agent and workspace metadata
   - `src/hooks/use-mobile.tsx` -> Viewport detection breakpoint
   - `src/components/dashboard/Shell.tsx` -> Main layout with sidebar and user plan pill
   - `src/routes/router.tsx` -> Route definitions
   - `package.json` -> Dependencies and build scripts
4. Validation & Edge Cases:
   - Ensure `useIsMobile` safely handles SSR and window resize events with event listener cleanup.
   - Shell must support flexible child render without layout shift.
</think>

### Architecture Blueprint
We will build a high-performance full-stack SaaS application utilizing React 19, TypeScript, TanStack Router, and Lucide icons.

### File Tree
```
├── .lovable/
│   └── project.json
├── public/
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/
│   │   └── dashboard/
│   │       └── Shell.tsx
│   ├── hooks/
│   │   └── use-mobile.tsx
│   ├── routes/
│   │   └── router.tsx
│   ├── styles.css
│   └── start.ts
├── package.json
└── tsconfig.json
```

[FILE: src/hooks/use-mobile.tsx]
```tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
```
[ENDFILE]

[FILE: src/components/dashboard/Shell.tsx]
```tsx
import React, { ReactNode } from "react";
import { 
  Home, 
  Send, 
  FileEdit, 
  Users, 
  BarChart3, 
  Settings, 
  Sparkles 
} from "lucide-react";

type NavItem = {
  to?: string;
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
  { label: "Settings", icon: Settings },
];

export default function Shell({ children }: { children?: ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0c0c0e] text-white">
      <aside className="w-64 border-r border-[#222228] p-4 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2.5 px-3 py-2 mb-6">
            <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center font-black">
              C
            </div>
            <span className="font-bold text-lg tracking-tight">CODED</span>
          </div>

          <nav className="space-y-1">
            {nav.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-[#1a1a20] transition-colors"
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-3 rounded-2xl bg-[#17171c] border border-[#262630]">
          <div className="flex items-center gap-2 text-xs font-semibold text-pink-400 mb-1">
            <Sparkles size={14} />
            <span>Pro Plan Active</span>
          </div>
          <p className="text-[11px] text-neutral-400">Unlimited autonomous coding workflows.</p>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">
        {children || (
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Developer</h1>
            <p className="text-neutral-400 text-sm">Autonomous workspace initialized with hot-reload.</p>
          </div>
        )}
      </main>
    </div>
  );
}
```
[ENDFILE]

[FILE: package.json]
```json
{
  "name": "coded-saas-dashboard",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "lucide-react": "^0.475.0",
    "@tanstack/react-router": "^1.95.0"
  },
  "devDependencies": {
    "@types/react": "^19.0.0",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.0",
    "vite": "^6.2.0",
    "tailwindcss": "^3.4.17"
  }
}
```
[ENDFILE]
"""
    },
    {
        "prompt": "Fix this memory leak in React useEffect: fetching user analytics without cleanup causes unmounted state updates.",
        "response": """<think>
1. Problem Diagnosis:
   - An asynchronous fetch is executed inside `useEffect`.
   - If the component unmounts before the HTTP request resolves, the state setter runs on an unmounted component.
   - This causes memory leaks and console warnings in React.
2. Solution Strategy:
   - Use standard `AbortController` signal to cancel in-flight HTTP requests during unmount cleanup.
   - Use an `isMounted` boolean flag as an additional defensive safeguard.
3. Code Verification:
   - Ensure the return statement of `useEffect` invokes `controller.abort()`.
</think>

### Analysis & Solution
The issue occurs when an asynchronous network promise resolves after the React component unmounts. We fix this by passing an `AbortSignal` to `fetch` and aborting in the effect cleanup function.

```tsx
import React, { useState, useEffect } from "react";

export function UserAnalytics({ userId }: { userId: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let isSubscribed = true;

    async function loadAnalytics() {
      try {
        setLoading(true);
        const res = await fetch(`/api/analytics/${userId}`, {
          signal: controller.signal
        });
        if (!res.ok) throw new Error("Failed to load analytics");
        const json = await res.json();
        if (isSubscribed) {
          setData(json);
          setError(null);
        }
      } catch (err: any) {
        if (err.name !== "AbortError" && isSubscribed) {
          setError(err.message);
        }
      } finally {
        if (isSubscribed) {
          setLoading(false);
        }
      }
    }

    loadAnalytics();

    // Clean up on unmount or userId change
    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [userId]);

  if (loading) return <div className="p-4 text-neutral-400">Loading metrics...</div>;
  if (error) return <div className="p-4 text-red-400">Error: {error}</div>;

  return (
    <div className="p-6 rounded-2xl bg-[#161618] border border-[#26262e] text-white">
      <h3 className="font-bold text-lg mb-2">User Analytics</h3>
      <pre className="text-xs text-neutral-300 font-mono">{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```
"""
    }
]

def generate_dataset(output_path="dataset.jsonl"):
    with open(output_path, "w", encoding="utf-8") as f:
        for sample in SAMPLES:
            entry = {
                "messages": [
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": sample["prompt"]},
                    {"role": "assistant", "content": sample["response"]}
                ]
            }
            f.write(json.dumps(entry, ensure_ascii=False) + "\n")
    print(f"DeepSeek-R1 dataset generated with {len(SAMPLES)} reasoning samples at {output_path}")

if __name__ == "__main__":
    generate_dataset("dataset.jsonl")
