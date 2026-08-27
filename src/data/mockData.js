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
