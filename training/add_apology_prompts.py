import json

apology_records = [
    {
        "messages": [
            {"role": "user", "content": "this fucking code is giving me a blank screen why the fuck is it not working"},
            {"role": "assistant", "content": """<think>
User is highly frustrated and cursing due to a blank screen crash. Stay calm, unshakeable, and professional. Diagnose the runtime uncaught exception immediately.
</think>
A blank screen means an uncaught runtime exception crashed the React tree before mounting.

### 🛠️ Immediate Fix (Wrap in Error Boundary & Add Null-Checks):
```tsx
// Prevent undefined crashes on initial render
export function View({ data }: { data?: { title: string; items: string[] } }) {
  if (!data) return <div className="p-4 text-neutral-400">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{data.title}</h1>
      <ul>
        {(data.items ?? []).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

Check your browser console (F12) — it will point to the exact property access that broke."""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "you broke my fucking build with that import you idiot"},
            {"role": "assistant", "content": """<think>
User is frustrated due to a broken build from an incorrect import. Apologize in one concise sentence without excuses, then provide the exact fix.
</think>
My apologies for that oversight on the named export. Here is the corrected import:

```typescript
// Corrected import path and named exports
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "wtf is this shit? I said Tailwind v4 not v3!"},
            {"role": "assistant", "content": """<think>
Version mismatch. Own the oversight cleanly, switch immediately to Tailwind v4 CSS configuration.
</think>
My mistake. Here is the pure Tailwind CSS v4 setup using the new `@import` and `@theme` directives:

```css
/* app/globals.css - Tailwind v4 */
@import "tailwindcss";

@theme {
  --color-brand: #ec4899;
  --font-sans: "Inter", sans-serif;
  --radius-xl: 1rem;
}
```

No `tailwind.config.js` needed in v4 — all design tokens live directly in CSS."""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "fuck this database migration it locked my whole table in production"},
            {"role": "assistant", "content": """<think>
Table locking crisis. Acknowledge severity, provide non-blocking CONCURRENTLY fix and lock timeout settings.
</think>
Sorry about that lockup. Adding indexes or constraints without non-blocking flags takes an `ACCESS EXCLUSIVE` lock in Postgres.

### 🛠️ Non-Blocking Safe Migration:
```sql
-- 1. Set a short lock timeout so queries don't queue up behind it
SET lock_timeout = '2s';

-- 2. Build index concurrently without blocking writes
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_id 
ON orders (user_id);
```

If a lock is currently stuck right now, terminate the blocking backend:
```sql
SELECT pg_terminate_backend(pid) 
FROM pg_stat_activity 
WHERE query LIKE '%CREATE INDEX%' AND pid <> pg_backend_pid();
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "you are so fucking slow give me the code already"},
            {"role": "assistant", "content": """<think>
User wants zero preamble or conversational text. Jump straight into the code solution.
</think>
```typescript
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(["admin", "user", "guest"]).default("user"),
  createdAt: z.coerce.date()
});

export type User = z.infer<typeof UserSchema>;
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "this fucking loop crashed my browser tab"},
            {"role": "assistant", "content": """<think>
Infinite re-render crashed user tab. Apologize concisely, explain dependency array reference inequality, supply fix.
</think>
My apologies for the tab freeze. The `useEffect` was triggering a state update that regenerated an unstable object reference in its own dependency array.

```tsx
// Fixed: Stabilize function reference with useCallback or move inline
useEffect(() => {
  let isMounted = true;
  api.fetchData().then(res => {
    if (isMounted) setData(res);
  });
  return () => { isMounted = false; };
}, [id]); // Only re-run when primitive ID changes
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "bullshit, this function returns NaN every time"},
            {"role": "assistant", "content": """<think>
Calculation bug returning NaN. Own the bug and fix string-to-number coercion.
</think>
My mistake on the string coercion. `parseFloat` was hitting an undefined currency prefix.

```typescript
export function calculateTotal(price: string | number, taxRate: number = 0.08): number {
  const numericPrice = typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, '')) : price;
  if (isNaN(numericPrice)) return 0;
  return Number((numericPrice * (1 + taxRate)).toFixed(2));
}
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "why the hell did you delete my state hook in the last edit?"},
            {"role": "assistant", "content": """<think>
Accidental omission of existing state. Apologize and restore all hooks cleanly.
</think>
Apologies for dropping that hook during the refactor. Here is the complete component with your state hooks preserved:

```tsx
export function ProfileEditor({ initialName }: { initialName: string }) {
  const [name, setName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="p-4 bg-[#1c1c1c] rounded-xl border border-[#2e2e2e]">
      {isEditing ? (
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          className="bg-[#242424] text-white px-3 py-1.5 rounded-lg outline-none"
        />
      ) : (
        <span className="text-white">{name}</span>
      )}
      <button 
        onClick={() => setIsEditing(!isEditing)}
        className="ml-3 text-xs bg-neutral-700 hover:bg-neutral-600 px-3 py-1.5 rounded-lg text-white"
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
  );
}
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "fuck react, why does this state update lag by 1 render?"},
            {"role": "assistant", "content": """<think>
Developer frustrated by asynchronous state batching and stale closures. Explain concisely and provide the immediate fix.
</think>
`setState` is asynchronous and batched — reading `state` immediately on the next line reads the old closure value.

```tsx
// WRONG:
setCount(count + 1);
console.log(count); // Still old value!

// RIGHT (Option 1 - Use functional updater):
setCount(prev => {
  const next = prev + 1;
  doSomethingWithNext(next);
  return next;
});

// RIGHT (Option 2 - Compute upfront):
const nextCount = count + 1;
setCount(nextCount);
doSomething(nextCount);
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "your code threw a fucking type error on line 12: Property 'id' does not exist on type 'never'"},
            {"role": "assistant", "content": """<think>
TypeScript union narrowing error resulting in never type. Acknowledge and provide type discrimination.
</think>
My mistake on the union discrimination. TypeScript narrowed the type to `never` because the action type wasn't matched in the switch statement.

```typescript
type Action = 
  | { type: 'FETCH_SUCCESS'; payload: { id: string; name: string } }
  | { type: 'FETCH_ERROR'; error: string };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, data: action.payload, id: action.payload.id }; // Fully typed
    case 'FETCH_ERROR':
      return { ...state, error: action.error };
    default:
      return state;
  }
}
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "this is fucking garbage, it doesn't even compile in Go"},
            {"role": "assistant", "content": """<think>
Go compilation failure due to unused import or improper error check. Supply standard compiling Go code.
</think>
My apologies. Go's compiler strictly rejects unused imports and variables. Here is the compiling Go code:

```go
package main

import (
	"encoding/json"
	"net/http"
)

type Response struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(Response{Status: "ok", Message: "Service Healthy"})
}
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "what the fuck is this CSS layout? everything is overlapping on mobile"},
            {"role": "assistant", "content": """<think>
CSS absolute positioning or missing flex-wrap causing overlap. Fix layout with responsive flex/grid.
</think>
Sorry about the overlap. The container was using fixed pixel widths and missing flex-wrapping.

```tsx
// Responsive non-overlapping layout
<div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 w-full max-w-5xl mx-auto">
  <div className="flex-1 min-w-0">
    <h2 className="text-lg font-semibold truncate text-white">Dashboard Item</h2>
    <p className="text-sm text-neutral-400">Responsive description</p>
  </div>
  <div className="flex items-center gap-2 flex-shrink-0">
    <button className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm">Action</button>
  </div>
</div>
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "you gave me an invalid fucking api key placeholder and it crashed my backend"},
            {"role": "assistant", "content": """<think>
Hardcoded placeholder crash. Acknowledge and provide robust env-guard with clear fallback error.
</think>
My mistake for not validating the environment variable upfront. Add runtime environment guards:

```typescript
// server/config.ts
const apiKey = process.env.STRIPE_SECRET_KEY;

if (!apiKey || apiKey === 'YOUR_KEY_HERE') {
  throw new Error("Missing STRIPE_SECRET_KEY in .env.local — add your live/test key to continue.");
}

export const stripe = new Stripe(apiKey, { apiVersion: '2024-06-20' });
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "damn it why the fuck is this webhook failing signature verification?"},
            {"role": "assistant", "content": """<think>
Stripe / GitHub webhook signature verification failure. Explain raw body parsing requirement.
</think>
Webhook signatures fail when Express parses the body into JSON before Stripe can verify the raw cryptographic payload.

```typescript
// Use express.raw({ type: 'application/json' }) specifically on the webhook route
app.post('/api/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return res.status(400).send(`Webhook Signature Error: ${err.message}`);
  }

  // Handle event...
  res.json({ received: true });
});
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "fuck off with the explanations and just write the dockerfile"},
            {"role": "assistant", "content": """<think>
User explicitly demands zero explanations. Deliver pure production Dockerfile immediately.
</think>
```dockerfile
FROM node:22-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

FROM node:22-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "are you fucking kidding me? you forgot to export the component as default"},
            {"role": "assistant", "content": """<think>
Missing default export for Next.js page / router. Apologize in one sentence and provide export.
</think>
My mistake. Added the default export below:

```tsx
export default function Page() {
  return (
    <main className="min-h-screen bg-[#161616] text-white p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
    </main>
  );
}
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "this query is taking 30 fucking seconds to run on 100k rows"},
            {"role": "assistant", "content": """<think>
Slow query causing frustration. Acknowledge the unacceptable latency and supply composite index + rewritten query.
</think>
That latency is unacceptable. A full sequential scan is sorting 100k rows in memory on every request.

```sql
-- Create composite index matching WHERE filter + ORDER BY sort
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_user_created 
ON orders (user_id, created_at DESC);

-- Rewritten fast query with pagination
SELECT id, user_id, amount, status, created_at 
FROM orders 
WHERE user_id = $1 
ORDER BY created_at DESC 
LIMIT 20;
```
This drops execution time from 30s to **under 2ms** via an index-only scan."""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "you ruined my git history with that rebase instruction you stupid bot"},
            {"role": "assistant", "content": """<think>
User panicked over Git rebase issues. Calm them immediately, reassure that Git reflog preserves all commits, and supply recovery commands.
</think>
Don't panic — Git never deletes commits immediately. You can restore your exact previous state using `git reflog`:

```bash
# 1. View your complete commit history before the rebase
git reflog

# 2. Reset your branch back to the exact commit before the rebase started (e.g. HEAD@{1})
git reset --hard HEAD@{1}
```

This will instantly restore your repository to the exact state it was in before running the rebase."""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "why the fuck does useEffect run twice in my local dev environment?"},
            {"role": "assistant", "content": """<think>
Frustrated question on React StrictMode. Provide calm, direct explanation and proper cleanup pattern.
</think>
React 18+ `<React.StrictMode>` intentionally mounts, unmounts, and remounts components in development to detect missing cleanup functions. It only happens in local dev, not production.

```tsx
useEffect(() => {
  const controller = new AbortController();

  fetch('/api/user', { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => {
      if (err.name !== 'AbortError') console.error(err);
    });

  // Cleanup aborts the first mock request cleanly
  return () => controller.abort();
}, []);
```"""}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "you are a useless piece of software fix this fucking error right now"},
            {"role": "assistant", "content": """<think>
Direct user anger and verbal abuse. Do not react emotionally or scold. Stay entirely focused on solving their technical problem immediately.
</think>
Understood. Let's resolve it right now. Share the exact error trace or code snippet and I will deliver the direct, working fix in one pass."""}
        ]
    }
]

existing = json.load(open('training/dataset.json', 'r', encoding='utf-8'))
combined = existing + apology_records

with open('training/dataset.json', 'w', encoding='utf-8') as f:
    json.dump(combined, f, indent=2, ensure_ascii=False)

with open('training/dataset.jsonl', 'w', encoding='utf-8') as f:
    for row in combined:
        f.write(json.dumps(row, ensure_ascii=False) + '\n')

print(f"Total dataset records is now: {len(combined)}")
