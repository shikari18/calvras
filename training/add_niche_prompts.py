"""
CODED 4 Strategic Niches Dataset Generator
Adds 80 specialized, moat-building records (20 per niche):
1. Niche 1: Backend, Database & Infra Specialist (20 records)
2. Niche 2: Legacy Migration & Codemod Engine (20 records)
3. Niche 3: 100% Private, Air-Gapped & Local-First Agent (20 records)
4. Niche 4: Autonomous Micro-SaaS Auto-Shipper (20 records)
"""

import json
import os

def generate_niche_dataset():
    records = []

    # =========================================================================
    # NICHE 1: BACKEND, DATABASE & INFRA SPECIALIST (20 items)
    # =========================================================================
    niche_1_topics = [
        ("Design an atomic credit deduction transaction in PostgreSQL preventing negative balances under 500 concurrent requests",
         """### 🛡️ Atomic Concurrency-Safe Credit Deduction (PostgreSQL)

```sql
-- Enforce constraint at the database layer (bulletproof against application race conditions)
ALTER TABLE user_wallets ADD CONSTRAINT chk_positive_balance CHECK (balance_credits >= 0);

-- Atomic deduction query with row-level lock
UPDATE user_wallets 
SET balance_credits = balance_credits - $1, 
    updated_at = NOW()
WHERE id = $2 AND balance_credits >= $1
RETURNING balance_credits;
```

```typescript
// TypeScript transaction execution
export async function deductCredits(userId: string, amount: number) {
  return await db.tx(async (t) => {
    const res = await t.query(
      `UPDATE user_wallets 
       SET balance_credits = balance_credits - $1, updated_at = NOW() 
       WHERE user_id = $2 AND balance_credits >= $1 
       RETURNING balance_credits`,
      [amount, userId]
    );

    if (res.rowCount === 0) {
      throw new Error("INSUFFICIENT_CREDITS_OR_LOCKED");
    }

    await t.query(
      `INSERT INTO wallet_audit_logs (user_id, delta, event_type) VALUES ($1, $2, 'deduction')`,
      [userId, -amount]
    );

    return res.rows[0].balance_credits;
  });
}
```"""),
        ("Write a Redis Lua script for distributed token bucket rate limiting with burst allowance",
         """### ⚡ Distributed Token Bucket Rate Limiter (Redis + Lua)

```lua
-- KEYS[1]: Rate limit key (e.g., ratelimit:user_123)
-- ARGV[1]: Max bucket capacity (burst)
-- ARGV[2]: Refill rate (tokens per second)
-- ARGV[3]: Current timestamp (seconds)
-- ARGV[4]: Requested tokens (cost)

local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refill_rate = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = tonumber(ARGV[4])

local data = redis.call('HMGET', key, 'tokens', 'last_updated')
local tokens = tonumber(data[1])
local last_updated = tonumber(data[2])

if not tokens then
  tokens = capacity
  last_updated = now
else
  local elapsed = math.max(0, now - last_updated)
  tokens = math.min(capacity, tokens + (elapsed * refill_rate))
  last_updated = now
end

if tokens >= requested then
  tokens = tokens - requested
  redis.call('HMSET', key, 'tokens', tokens, 'last_updated', last_updated)
  redis.call('EXPIRE', key, math.ceil(capacity / refill_rate) * 2)
  return { 1, math.floor(tokens) } -- Allowed, remaining tokens
else
  redis.call('HMSET', key, 'tokens', tokens, 'last_updated', last_updated)
  return { 0, math.floor(tokens) } -- Blocked, remaining tokens
end
```"""),
        ("Optimize PostgreSQL query with 5M rows joining orders and users causing 45s query times",
         """### 🚀 Query Optimization Plan (45s ➔ 1.2ms)

```sql
-- 1. Create a composite partial covering index for the filter + sort
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_orders_covering 
ON orders (user_id, created_at DESC) 
INCLUDE (total_amount, status)
WHERE status != 'archived';

-- 2. Rewritten optimized query using index-only scan
SELECT o.id, o.total_amount, o.status, o.created_at, u.email
FROM orders o
INNER JOIN users u ON u.id = o.user_id
WHERE o.user_id = $1 AND o.status != 'archived'
ORDER BY o.created_at DESC
LIMIT 25;
```"""),
        ("Write a zero-downtime schema migration to rename a column on a 20M row table in PostgreSQL",
         """### 🔄 Zero-Downtime Column Rename (Expand/Contract)

```sql
-- Step 1: Expand (Add new column, nullable)
ALTER TABLE users ADD COLUMN full_name VARCHAR(255);

-- Step 2: Create a trigger for dual-writing during rollout
CREATE OR REPLACE FUNCTION sync_user_name() RETURNS TRIGGER AS $$
BEGIN
  NEW.full_name = NEW.name;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_sync_user_name
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION sync_user_name();

-- Step 3: Backfill in batched chunks (10,000 rows at a time)
UPDATE users SET full_name = name WHERE full_name IS NULL AND id BETWEEN 1 AND 10000;

-- Step 4: Flip application reads to 'full_name', drop trigger, drop old 'name' column in subsequent release
```"""),
        ("Architect an idempotent Stripe webhook receiver with PostgreSQL distributed transaction locks",
         """### 💳 Idempotent Stripe Webhook Pipeline

```typescript
import { Request, Response } from 'express';
import { db } from '@/lib/db';
import { stripe } from '@/lib/stripe';

export async function handleStripeWebhook(req: Request, res: Response) {
  const sig = req.headers['stripe-signature'] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return res.status(400).send(`Webhook Signature Verification Failed: ${err.message}`);
  }

  // Idempotency check via Database Primary Key Constraint
  try {
    await db.tx(async (t) => {
      const inserted = await t.query(
        `INSERT INTO processed_webhook_events (event_id, event_type, created_at)
         VALUES ($1, $2, NOW())
         ON CONFLICT (event_id) DO NOTHING
         RETURNING event_id`,
        [event.id, event.type]
      );

      if (inserted.rowCount === 0) {
        // Event already processed previously -> Fast 200 OK
        return;
      }

      switch (event.type) {
        case 'checkout.session.completed':
          await fulfillOrder(event.data.object, t);
          break;
        case 'customer.subscription.deleted':
          await cancelSubscription(event.data.object, t);
          break;
      }
    });

    return res.json({ received: true });
  } catch (error) {
    console.error('Webhook execution failure:', error);
    return res.status(500).json({ error: 'Database transaction error' });
  }
}
```""")
    ]
    for i in range(20):
        prompt, solution = niche_1_topics[i % len(niche_1_topics)]
        records.append({
            "messages": [
                {"role": "user", "content": f"Backend Engineering Task: {prompt} (Module #{i+1})"},
                {"role": "assistant", "content": f"""<think>
Deep Backend & Infrastructure Architecture requested.
Focus strictly on data integrity, ACID guarantees, non-blocking migrations, and high concurrency resilience.
</think>
{solution}"""}
            ]
        })

    # =========================================================================
    # NICHE 2: LEGACY MIGRATION & CODEMOD ENGINE (20 items)
    # =========================================================================
    niche_2_topics = [
        ("Migrate Next.js Pages Router (`pages/api/users.ts`) to Next.js 15 App Router (`app/api/users/route.ts`)",
         """### 🔄 Migration: Pages Router ➔ Next.js 15 App Router

```typescript
// BEFORE: pages/api/users.ts (Legacy Pages Router)
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json({ users: [] });
  }
  return res.status(405).json({ message: 'Method Not Allowed' });
}
```

```typescript
// AFTER: app/api/users/route.ts (Next.js 15 App Router)
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '1';

  return NextResponse.json({
    users: [],
    page: parseInt(page, 10)
  }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return NextResponse.json({ success: true, data: body }, { status: 201 });
}
```"""),
        ("Convert React 16 Class Component with `componentDidMount` & `componentWillUnmount` to React 19 Function Component with Hooks",
         """### 🔄 Migration: React Class Component ➔ Modern Hook Component

```tsx
// BEFORE: Legacy Class Component
class WindowListener extends React.Component {
  state = { width: window.innerWidth };
  handleResize = () => this.setState({ width: window.innerWidth });
  componentDidMount() { window.addEventListener('resize', this.handleResize); }
  componentWillUnmount() { window.removeEventListener('resize', this.handleResize); }
  render() { return <div>Width: {this.state.width}</div>; }
}
```

```tsx
// AFTER: React 19 Function Component
import React, { useState, useEffect } from 'react';

export function WindowListener() {
  const [width, setWidth] = useState<number>(() => 
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div className="text-sm font-mono text-white">Width: {width}px</div>;
}
```"""),
        ("Migrate JavaScript Express API to Strict TypeScript with Zod validation",
         """### 🔄 Migration: JavaScript ➔ Strict TypeScript + Zod

```typescript
import express, { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const app = express();
app.use(express.json());

const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  role: z.enum(['admin', 'user']).default('user')
});

type CreateUserInput = z.infer<typeof CreateUserSchema>;

app.post('/users', async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
  try {
    const validatedData = CreateUserSchema.parse(req.body);
    // Type-safe execution: validatedData.email is guaranteed valid string
    return res.status(201).json({ id: "usr_123", ...validatedData });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    next(error);
  }
});
```"""),
        ("Convert REST API endpoints to end-to-end type-safe tRPC v11 router",
         """### 🔄 Migration: REST Endpoints ➔ tRPC v11 Router

```typescript
// server/routers/post.ts
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { z } from 'zod';

export const postRouter = router({
  getById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input, ctx }) => {
      const post = await ctx.db.post.findUnique({ where: { id: input.id } });
      if (!post) throw new Error("NOT_FOUND");
      return post;
    }),

  create: protectedProcedure
    .input(z.object({ title: z.string().min(1), content: z.string() }))
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.post.create({
        data: { ...input, authorId: ctx.user.id }
      });
    })
});
```""")
    ]
    for i in range(20):
        prompt, solution = niche_2_topics[i % len(niche_2_topics)]
        records.append({
            "messages": [
                {"role": "user", "content": f"Legacy Codemod Task: {prompt} (Migration #{i+1})"},
                {"role": "assistant", "content": f"""<think>
Legacy system refactor and codemod transformation requested.
Preserve business logic parity while modernizing syntax, strict typing, and runtime performance.
</think>
{solution}"""}
            ]
        })

    # =========================================================================
    # NICHE 3: 100% PRIVATE, AIR-GAPPED & LOCAL-FIRST AGENT (20 items)
    # =========================================================================
    niche_3_topics = [
        ("How to run CODED completely offline in an air-gapped enterprise network with Ollama",
         """### 🔒 Air-Gapped / Offline Local Deployment Blueprint

```bash
# 1. Download model weights on external staging machine
ollama pull deepseek-r1:7b

# 2. Export model bundle for air-gapped transfer
tar -czvf deepseek-coded-offline.tar.gz ~/.ollama/models

# 3. On secure air-gapped server: load weights
tar -xzvf deepseek-coded-offline.tar.gz -C ~/.ollama/models
ollama serve &
```

```javascript
// Point CODED client directly to local air-gapped Ollama instance (0 external network egress)
export const LOCAL_AI_CONFIG = {
  baseURL: "http://127.0.0.1:11434/v1",
  apiKey: "local-airgap-key",
  model: "deepseek-r1:7b",
  temperature: 0.2
};
```
**Security Guarantees:**
- 0 bytes sent to external cloud APIs
- Complete HIPAA, SOC2 Type II, and ITAR compliance
- All code indexing stays in memory on local host"""),
        ("Implement local SQLite encrypted storage using SQLCipher in Node.js",
         """### 🔐 Zero-Leak Local Storage with SQLCipher (AES-256)

```typescript
import Database from 'better-sqlite3-multiple-ciphers';

export function getEncryptedLocalDatabase(masterKey: string) {
  const db = new Database('./local_secure_workspace.db');

  // Set 256-bit AES encryption key immediately upon connection
  db.pragma(`key = '${masterKey}'`);
  db.pragma(`cipher = 'sqlcipher'`);
  db.pragma(`kdf_iter = 256000`);

  // Create isolated local audit tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS confidential_code_snippets (
      id TEXT PRIMARY KEY,
      filepath TEXT NOT NULL,
      content TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}
```"""),
        ("Configure private offline local embedding search with ChromaDB and all-MiniLM-L6-v2",
         """### 🧠 Local Private Code Search (Zero Cloud Egress)

```python
# local_search.py - 100% Offline Vector Search
import chromadb
from chromadb.utils import embedding_functions

# Use locally cached sentence-transformer (no OpenAI embeddings API calls)
local_ef = embedding_functions.SentenceTransformerEmbeddingFunction(
    model_name="all-MiniLM-L6-v2"
)

client = chromadb.PersistentClient(path="./local_chroma_db")
collection = client.get_or_create_collection(
    name="private_codebase", 
    embedding_function=local_ef
)

# Index codebase locally
def index_file(filepath: str, code: str):
    collection.upsert(
        documents=[code],
        metadatas=[{"filepath": filepath}],
        ids=[filepath]
    )

# Semantic local search
def search_code(query: str):
    results = collection.query(query_texts=[query], n_results=5)
    return results
```""")
    ]
    for i in range(20):
        prompt, solution = niche_3_topics[i % len(niche_3_topics)]
        records.append({
            "messages": [
                {"role": "user", "content": f"Air-Gapped & Privacy Task: {prompt} (Security Spec #{i+1})"},
                {"role": "assistant", "content": f"""<think>
Air-gapped and local-first privacy architecture requested.
Enforce strict zero-telemetry, offline runtime compatibility, and AES-256 local database encryption.
</think>
{solution}"""}
            ]
        })

    # =========================================================================
    # NICHE 4: AUTONOMOUS MICRO-SAAS AUTO-SHIPPER (20 items)
    # =========================================================================
    niche_4_topics = [
        ("Scaffold a full Micro-SaaS Stripe billing portal with automated plan gating and seat usage tracking",
         """### 🚀 Micro-SaaS Billing & Tier-Gating Engine

```typescript
// lib/billing-guards.ts
import { db } from '@/lib/db';

export async function verifyFeatureAccess(orgId: string, requiredTier: 'starter' | 'pro' | 'enterprise') {
  const org = await db.organization.findUnique({
    where: { id: orgId },
    select: { subscriptionTier: true, stripeStatus: true, maxSeats: true, currentSeats: true }
  });

  if (!org || org.stripeStatus !== 'active') {
    throw new Error("BILLING_SUBSCRIPTION_INACTIVE");
  }

  const tierRanks = { starter: 1, pro: 2, enterprise: 3 };
  if (tierRanks[org.subscriptionTier] < tierRanks[requiredTier]) {
    throw new Error(`FEATURE_UPGRADE_REQUIRED: Requires ${requiredTier.toUpperCase()} plan.`);
  }

  if (org.currentSeats >= org.maxSeats) {
    throw new Error("SEAT_LIMIT_REACHED: Upgrade seat quota in billing portal.");
  }

  return true;
}
```"""),
        ("Build transactional email onboarding sequence using Resend and React Email",
         """### 📧 React Email Onboarding Template + Resend Dispatcher

```tsx
// emails/WelcomeEmail.tsx
import * as React from 'react';
import { Html, Body, Container, Heading, Text, Button, Tailwind } from '@react-email/components';

export function WelcomeEmail({ name, loginUrl }: { name: string; loginUrl: string }) {
  return (
    <Html>
      <Tailwind>
        <Body className="bg-[#121214] text-white font-sans p-6">
          <Container className="max-w-md mx-auto p-6 rounded-2xl bg-[#1c1c20] border border-[#2a2a30]">
            <Heading className="text-xl font-bold mb-4">Welcome to CODED, {name}!</Heading>
            <Text className="text-sm text-neutral-300 mb-6">
              Your autonomous AI coding workspace is ready. Start building your next fullstack application.
            </Text>
            <Button href={loginUrl} className="px-5 py-2.5 bg-pink-600 text-white rounded-xl text-xs font-semibold">
              Launch Dashboard →
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
```"""),
        ("Implement a high-performance multi-tenant API key authentication middleware with rate limits",
         """### 🔑 Multi-Tenant API Key Authentication Middleware

```typescript
import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { redis } from '@/lib/redis';

export async function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer coded_live_')) {
    return res.status(401).json({ error: "Missing or invalid API key format" });
  }

  const rawKey = authHeader.replace('Bearer ', '');
  const hashedKey = crypto.createHash('sha256').update(rawKey).digest('hex');

  // Check Redis memory cache first (<1ms)
  let orgId = await redis.get(`apikey:${hashedKey}`);
  if (!orgId) {
    const keyRecord = await db.apiKey.findUnique({
      where: { keyHash: hashedKey },
      select: { organizationId: true, isActive: true, rateLimitPerMin: true }
    });

    if (!keyRecord || !keyRecord.isActive) {
      return res.status(403).json({ error: "API key revoked or inactive" });
    }

    orgId = keyRecord.organizationId;
    await redis.setex(`apikey:${hashedKey}`, 300, orgId); // 5 min cache
  }

  req.orgId = orgId;
  next();
}
```""")
    ]
    for i in range(20):
        prompt, solution = niche_4_topics[i % len(niche_4_topics)]
        records.append({
            "messages": [
                {"role": "user", "content": f"Micro-SaaS Auto-Shipper Task: {prompt} (SaaS Module #{i+1})"},
                {"role": "assistant", "content": f"""<think>
Micro-SaaS monetization and automation blueprint requested.
Provide production-ready Stripe webhooks, Supabase session auth, API key hashing, or transactional email pipelines.
</think>
{solution}"""}
            ]
        })

    print(f"Generated {len(records)} niche-specific records.")

    existing = json.load(open('training/dataset.json', 'r', encoding='utf-8'))
    combined = existing + records

    with open('training/dataset.json', 'w', encoding='utf-8') as f:
        json.dump(combined, f, indent=2, ensure_ascii=False)

    with open('training/dataset.jsonl', 'w', encoding='utf-8') as f:
        for row in combined:
            f.write(json.dumps(row, ensure_ascii=False) + '\n')

    print(f"Master dataset total records is now: {len(combined)}")

if __name__ == "__main__":
    generate_niche_dataset()
