export const PROJECT_CARDS = [
  {
    id: 'proj-1',
    title: 'AI Marketing Automation Platform',
    headline: 'Meet your new marketing team.',
    subtext: 'Automate content workflows, campaign analytics, and conversion funnels with multi-agent orchestration.',
    category: 'My projects',
    tag: 'Next.js 15 + Tailwind',
    updated: '2 hours ago',
    previewTheme: 'light',
    bgGradient: 'from-blue-50 to-indigo-100',
    accentColor: '#3b82f6',
  },
  {
    id: 'proj-2',
    title: 'Ultra-Fast Grocery & Delivery Hub',
    headline: 'Ordered now. At your door by evening.',
    subtext: 'Real-time courier dispatch, live cart synchronisation, and instant checkout with Stripe integration.',
    category: 'My projects',
    tag: 'E-commerce + Stripe',
    updated: 'Yesterday',
    previewTheme: 'dark',
    bgGradient: 'from-neutral-900 to-black',
    accentColor: '#f59e0b',
  },
  {
    id: 'proj-3',
    title: 'Local Neighborhood Corner Shop',
    headline: 'The corner shop that carries everything — now delivering.',
    subtext: 'Inventory tracking, localized geo-fencing, and WhatsApp order routing for neighborhood stores.',
    category: 'My projects',
    tag: 'Fullstack + Mapbox',
    updated: '3 days ago',
    previewTheme: 'light',
    bgGradient: 'from-emerald-50 to-teal-100',
    accentColor: '#10b981',
  },
  {
    id: 'proj-4',
    title: 'Developer Analytics & Telemetry',
    headline: 'Realtime observability for edge computing.',
    subtext: 'High-throughput time-series metrics, latency traces, and distributed log aggregation.',
    category: 'CODED templates',
    tag: 'ClickHouse + WebSocket',
    updated: 'Featured',
    previewTheme: 'dark',
    bgGradient: 'from-purple-950 to-slate-900',
    accentColor: '#a855f7',
  }
];

export const CONNECTED_TOOLS = [
  { id: 'github', name: 'GitHub', icon: 'GitBranch', connected: true, color: 'bg-neutral-800 text-white' },
  { id: 'figma', name: 'Figma', icon: 'Figma', connected: true, color: 'bg-purple-600/20 text-purple-400' },
  { id: 'supabase', name: 'Supabase DB', icon: 'Database', connected: true, color: 'bg-emerald-600/20 text-emerald-400' },
  { id: 'slack', name: 'Slack', icon: 'MessageSquare', connected: false, color: 'bg-amber-600/20 text-amber-400' },
  { id: 'notion', name: 'Notion', icon: 'FileText', connected: false, color: 'bg-blue-600/20 text-blue-400' },
  { id: 'stripe', name: 'Stripe Payments', icon: 'CreditCard', connected: false, color: 'bg-indigo-600/20 text-indigo-400' },
];

export const BUILD_MODES = [
  { id: 'build', name: 'Build', desc: 'Generate complete full-stack web applications' },
  { id: 'chat', name: 'Chat', desc: 'Discuss architecture and get technical advice' },
  { id: 'plan', name: 'Plan', desc: 'Create technical specifications and database schemas' },
  { id: 'edit', name: 'Edit', desc: 'Refactor existing code and implement components' },
];

export const INSPIRATIONS = [
  { tag: 'SaaS', category: 'Coding', title: 'Subscription billing dashboard', description: 'Build a SaaS dashboard with Stripe billing, plan management, and usage analytics.' },
  { tag: 'App', category: 'Coding', title: 'Real-time chat app', description: 'Create a full-stack chat application with rooms, typing indicators, and message history.' },
  { tag: 'E-commerce', category: 'Coding', title: 'Online store with cart', description: 'Build a product listing, cart, and checkout flow with Stripe payments integration.' },
  { tag: 'Portfolio', category: 'Coding', title: 'Developer portfolio site', description: 'Generate a sleek personal portfolio with projects, skills, and contact form.' },
  { tag: 'API', category: 'Architecture', title: 'REST API with auth', description: 'Scaffold a Node.js REST API with JWT authentication, rate limiting, and CRUD endpoints.' },
  { tag: 'Agent', category: 'Swarm Agents', title: 'Autonomous research agent', description: 'Build a multi-step AI agent that searches the web, summarizes findings, and writes reports.' },
  { tag: 'Marketing', category: 'Coding', title: 'Landing page with CTA', description: 'Create a high-converting landing page with hero, features, pricing section, and email capture.' },
  { tag: 'Analytics', category: 'Coding', title: 'Analytics dashboard', description: 'Build a real-time analytics dashboard with charts, filters, and data export.' },
  { tag: 'AI', category: 'Swarm Agents', title: 'AI content pipeline', description: 'Create an agent that generates blog posts, social captions, and email sequences from one brief.' },
  { tag: 'Design', category: 'Design', title: 'Component library', description: 'Generate a reusable React component library with buttons, forms, modals, and dark mode.' },
  { tag: 'Data', category: 'Data', title: 'CSV data visualizer', description: 'Build a drag-and-drop CSV uploader with automatic chart generation and filtering.' },
  { tag: 'Mobile', category: 'Coding', title: 'Responsive mobile app', description: 'Create a mobile-first PWA with offline support, push notifications, and app shell.' },
];
