import json

new_records = [
  {
    "messages": [
      {
        "role": "user",
        "content": "hey if you were asked to build a full website how would you do it"
      },
      {
        "role": "assistant",
        "content": """<think>
User is asking how I approach building a full production website from scratch. Lay out the exact file architecture, technology choices, and concrete execution steps. Conclude with 6 clear prompts they can pick to start.
</think>
Here is my exact blueprint for building a production-grade fullstack web application:

### 📁 Architecture & File Tree
```
├── src/
│   ├── app/                   # Next.js 15 App Router
│   │   ├── (auth)/            # Login, Signup, OAuth callback routes
│   │   ├── (dashboard)/       # Authenticated app shell and views
│   │   ├── api/               # Webhooks & REST endpoints
│   │   ├── layout.tsx         # Root layout with fonts & providers
│   │   └── page.tsx           # High-converting landing page
│   ├── components/
│   │   ├── ui/                # Accessible primitives (Button, Modal, Input)
│   │   └── dashboard/         # Feature components (Stats, Sidebar, DataGrid)
│   ├── lib/
│   │   ├── db.ts              # Database client & connection pool
│   │   └── auth.ts            # Session management & middleware
│   ├── hooks/                 # Custom React hooks (useAuth, useLocalStorage)
│   └── styles/globals.css     # Tailwind CSS theme variables
├── prisma/schema.prisma       # Database schema & migrations
├── package.json
└── tsconfig.json
```

### ⚡ 4-Stage Execution Plan
1. **Scaffold & Theme**: Setup Next.js 15, TypeScript, Tailwind CSS, and global dark mode tokens.
2. **Database & Auth**: Configure PostgreSQL with Prisma/Drizzle and secure session middleware.
3. **Core Features**: Build responsive UI components, Server Actions for mutations, and optimistic state.
4. **Polish & Deploy**: Add SEO metadata, OpenGraph tags, error boundaries, and deploy to Vercel/Docker.

---

### 🎯 Pick one of these 6 prompts to start immediately:
1. `"Scaffold the Next.js 15 landing page with hero, features, and pricing sections."`
2. `"Generate the PostgreSQL Prisma schema for users, teams, and subscriptions."`
3. `"Build the authenticated dashboard layout with collapsible sidebar and topbar."`
4. `"Implement JWT auth middleware with session refresh and protected route guards."`
5. `"Create the complete Tailwind UI component library (buttons, inputs, dialogs)."`
6. `"Setup the Stripe billing integration with webhook handlers and plan gates."`"""
      }
    ]
  },
  {
    "messages": [
      {
        "role": "user",
        "content": "how would you build a high-performance e-commerce website?"
      },
      {
        "role": "assistant",
        "content": """<think>
E-commerce architecture inquiry. Detail product catalogs, server-side caching, cart state, payment gateways, and order processing with a modular file tree and 6 action prompts.
</think>
For high conversion and sub-second page loads, here is the full e-commerce architecture:

### 📁 Architecture & File Tree
```
├── src/
│   ├── app/
│   │   ├── products/[slug]/   # ISR Cached Product Detail Pages
│   │   ├── cart/              # Persistent cart review
│   │   ├── checkout/          # Stripe Elements single-page checkout
│   │   └── api/stripe/webhook # Webhook for payment capture & stock deduction
│   ├── components/shop/
│   │   ├── ProductCard.tsx    # Optimized image cards with skeleton loaders
│   │   ├── ProductFilters.tsx # Faceted search (price, category, rating)
│   │   └── CartDrawer.tsx     # Slide-over cart with optimistic quantity updates
│   ├── lib/
│   │   ├── stripe.ts          # Stripe SDK instance & payment intents
│   │   └── redis.ts           # Upstash Redis for real-time inventory locking
│   └── store/useCart.ts       # Zustand cart store with localStorage sync
```

### ⚡ Key Guarantees
- **Incremental Static Regeneration (ISR)**: Product pages revalidate in the background.
- **Inventory Race-Condition Protection**: Redis distributed locks prevent double-selling stock during checkout.
- **Optimistic Cart UI**: Instant quantity changes without UI delay.

---

### 🎯 6 Prompts to kick off this build:
1. `"Build the responsive Product Grid with sorting, price filters, and search."`
2. `"Create the Zustand slide-over Cart Drawer with coupon code support."`
3. `"Write the Stripe Checkout Server Action with order confirmation emails."`
4. `"Design the PostgreSQL schema for Products, Variants, Orders, and Customers."`
5. `"Implement inventory reservation with Redis to prevent overselling on flash sales."`
6. `"Build the Seller Admin Portal for managing products, stock, and shipments."`"""
      }
    ]
  },
  {
    "messages": [
      {
        "role": "user",
        "content": "how would you architect a browser-based AI code workspace website?"
      },
      {
        "role": "assistant",
        "content": """<think>
Inquiry on building an IDE / AI Code Studio. Detail the Monaco Editor integration, multi-file tree, streaming chat pipeline, and sandboxed preview execution.
</think>
Here is the architecture for an autonomous AI-driven code studio:

### 📁 Architecture & File Tree
```
├── src/
│   ├── components/studio/
│   │   ├── FileExplorer.tsx   # Recursive tree view with rename/delete/create
│   │   ├── MonacoEditor.tsx   # Multi-tab code editor with syntax highlighting
│   │   ├── LivePreview.tsx    # Sandboxed WebContainer / iframe runner
│   │   └── AIChatPanel.tsx    # Streaming reasoning chat with codegen diffs
│   ├── hooks/
│   │   ├── useFileSystem.ts   # Virtual in-memory file system with export to ZIP
│   │   └── useAIStream.ts     # SSE stream handler with AST diff patcher
│   ├── lib/parser.ts          # Extracts [FILE: path]...[ENDFILE] blocks
│   └── store/studioStore.ts   # Zustand active file & editor state
```

### ⚡ Execution Roadmap
1. **Virtual File Tree**: In-memory file system state supporting nested directories and tabs.
2. **Monaco Engine**: Code editor with language servers, formatting, and line numbers.
3. **AI Stream Parser**: Real-time regex chunking that extracts generated files and applies code diffs live.

---

### 🎯 6 Prompts to start building:
1. `"Create the recursive File Explorer component with folder toggling and icons."`
2. `"Integrate the Monaco Code Editor with active tab switching and syntax themes."`
3. `"Build the AI stream parser to extract [FILE: path] code blocks into the virtual FS."`
4. `"Create the Sandboxed Preview iframe with hot-reloading for React apps."`
5. `"Write the project export utility to bundle all generated files into a ZIP download."`
6. `"Implement real-time code diff preview with Accept/Reject change buttons."`"""
      }
    ]
  },
  {
    "messages": [
      {
        "role": "user",
        "content": "how would you build a real-time collaborative document platform?"
      },
      {
        "role": "assistant",
        "content": """<think>
Collaborative real-time app architecture. Detail WebSockets, Yjs/CRDTs, TipTap rich text, presence cursors, and Postgres persistence.
</think>
Here is the architecture for zero-latency multiplayer document editing:

### 📁 Architecture & File Tree
```
├── src/
│   ├── components/editor/
│   │   ├── RichTextEditor.tsx # TipTap / Block-based document canvas
│   │   ├── LiveCursors.tsx    # Multiplayer colored mouse pointers & avatars
│   │   └── VersionHistory.tsx # Snapshot recovery timeline
│   ├── server/
│   │   ├── websocket.ts       # Hocuspocus / Yjs WebSocket room sync server
│   │   └── persistence.ts     # Debounced PostgreSQL binary updates
│   ├── hooks/useMultiplayer.ts# Yjs CRDT provider and awareness hook
│   └── lib/crdt.ts            # Conflict-free replicated data types
```

### ⚡ Multiplayer Guarantees
- **CRDT Sync via Yjs**: Edits merge seamlessly without merge conflicts.
- **Presence Awareness**: Real-time cursor positions, user selection highlights, and active presence.
- **Offline First**: Changes queue locally and sync automatically on reconnection.

---

### 🎯 6 Prompts to build this platform:
1. `"Setup the TipTap block editor with bold, headers, code blocks, and slash commands."`
2. `"Implement the Yjs WebSocket server for real-time document synchronization."`
3. `"Create the Live Cursors component showing other active users on the document."`
4. `"Build the PostgreSQL schema for workspaces, documents, permissions, and history."`
5. `"Implement automatic autosave with debounced snapshot persistence."`
6. `"Add workspace team sharing with Viewer, Editor, and Admin permission roles."`"""
      }
    ]
  },
  {
    "messages": [
      {
        "role": "user",
        "content": "how would you build a multi-tenant client scheduling and booking website?"
      },
      {
        "role": "assistant",
        "content": """<think>
Multi-tenant scheduling system. Cover vanity subdomains, calendar slot math, timezones, automated email reminders, and payment deposits.
</think>
Here is the complete multi-tenant booking platform blueprint (Cal.com / Calendly style):

### 📁 Architecture & File Tree
```
├── src/
│   ├── app/
│   │   ├── [tenant]/[event]/  # Vanity booking page (e.g., app.com/acme/30min)
│   │   ├── dashboard/schedule # Availability calendar configuration
│   │   └── api/calendar/sync  # Google Calendar / Outlook OAuth sync
│   ├── components/booking/
│   │   ├── TimeSlotPicker.tsx # Timezone-aware available slot grid
│   │   └── BookingForm.tsx    # Client details and payment deposit form
│   ├── lib/
│   │   ├── slotCalculator.ts  # Math engine computing available slots vs busy times
│   │   └── timezone.ts        # Daylight saving & IANA timezone conversions
│   └── server/cron/reminders.ts# Automated 24h & 1h appointment notifications
```

### ⚡ Core Capabilities
- **Subdomain / Path Routing**: Dynamically resolves tenant_id from the URL.
- **Timezone Normalization**: Computes available blocks across any client timezone.
- **Two-Way Calendar Sync**: Syncs with Google Calendar to prevent double-booking.

---

### 🎯 6 Prompts to start this project:
1. `"Write the TimeSlot calculation algorithm that filters out existing calendar conflicts."`
2. `"Build the interactive Booking Calendar UI with time picker and timezone selector."`
3. `"Create the PostgreSQL multi-tenant schema for Hosts, EventTypes, and Bookings."`
4. `"Implement Google Calendar OAuth2 sync to fetch busy events in real time."`
5. `"Setup automated email confirmation and calendar invite (.ics) generation."`
6. `"Build the Provider Dashboard to configure working hours and custom booking forms."`"""
      }
    ]
  },
  {
    "messages": [
      {
        "role": "user",
        "content": "how would you build a modern developer documentation and forum website?"
      },
      {
        "role": "assistant",
        "content": """<think>
Developer documentation & community hub inquiry. Cover MDX parsing, fulltext search, interactive API playground, and discussion forums.
</think>
Here is the architecture for a lightning-fast developer hub (Stripe Docs + GitHub Discussions style):

### 📁 Architecture & File Tree
```
├── src/
│   ├── app/
│   │   ├── docs/[[...slug]]/  # Dynamic MDX documentation pages
│   │   ├── community/         # Threaded Q&A and forum discussions
│   │   └── playground/        # Interactive REST/GraphQL API console
│   ├── components/docs/
│   │   ├── MDXRenderer.tsx    # Syntax highlighted code snippets with copy button
│   │   ├── DocSearchModal.tsx # Cmd+K fast indexed full-text search
│   │   └── TableOfContents.tsx# Active viewport scroll spy navigation
│   ├── content/docs/          # Markdown/MDX documentation source files
│   └── lib/
│       ├── mdx.ts             # Rehype / Remark plugins for callouts and diagrams
│       └── searchIndex.ts     # Minisearch / Algolia indexing engine
```

### ⚡ Performance Features
- **Zero-JS Static Content**: MDX pages pre-rendered statically for instant load times.
- **Interactive API Playground**: Test API endpoints with live parameter tweaking directly on the page.
- **Cmd+K Search**: Full-text instant indexing with keyboard shortcuts.

---

### 🎯 6 Prompts to build this hub:
1. `"Build the MDX Documentation layout with sidebar navigation and scroll-spy TOC."`
2. `"Create the Cmd+K Global Search modal with fuzzy search across all doc files."`
3. `"Build an interactive API Playground component to send live requests to endpoints."`
4. `"Add copy-to-clipboard buttons, syntax highlighting, and multi-language tab code blocks."`
5. `"Create the Community Forum with upvoting, accepted answers, and markdown support."`
6. `"Setup automated documentation versioning (v1, v2, v3) with version switcher dropdown."`"""
      }
    ]
  }
]

existing = json.load(open('training/dataset.json', 'r', encoding='utf-8'))
combined = existing + new_records
with open('training/dataset.json', 'w', encoding='utf-8') as f:
    json.dump(combined, f, indent=2, ensure_ascii=False)

with open('training/dataset.jsonl', 'w', encoding='utf-8') as f:
    for row in combined:
        f.write(json.dumps(row, ensure_ascii=False) + '\n')

print(f"Total dataset records is now: {len(combined)}")
