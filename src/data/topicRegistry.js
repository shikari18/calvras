// Complete Footer Columns and Topic Registry for Calvras
// Adapted from the frontier reference footer (all 74 links across 4 primary tracks)

export const FOOTER_COLUMNS = [
  {
    sections: [
      {
        title: 'Products',
        links: [
          { name: 'Calvras', slug: 'calvras-chat', desc: 'Next-generation AI assistant and autonomous workspace for developers and creators.' },
          { name: 'Calvras Code', slug: 'calvras-code', desc: 'Autonomous coding agent that builds, tests, refactors, and deploys production applications.' },
          { name: 'Calvras Code Enterprise', slug: 'calvras-code-enterprise', desc: 'Dedicated VPC deployment, audit logging, custom compliance, and priority SLA.' },
          { name: 'Calvras Cowork', slug: 'calvras-cowork', desc: 'Real-time collaborative pair programming and multiplayer sandbox environments for remote teams.' },
          { name: '@Calvras', slug: 'at-calvras', desc: 'Trigger automated builds, PR reviews, and terminal tasks directly by mentioning Calvras.' },
          { name: 'Calvras Design', slug: 'calvras-design', desc: 'Autonomous UI/UX design generation, design system synchronization, and interactive component prototyping.' },
          { name: 'Calvras Science', slug: 'calvras-science', desc: 'Computational hypothesis testing, scientific literature synthesis, and mathematical proof validation.' },
          { name: 'Calvras Security', slug: 'calvras-security', desc: 'Automated vulnerability scanning, SAST/DAST static analysis, and zero-day patch synthesis.' },
          { name: 'Calvras in Chrome', slug: 'calvras-chrome', desc: 'Browser-native autonomous extension for real-time web exploration, DOM extraction, and web app testing.' },
          { name: 'Calvras for Microsoft 365', slug: 'calvras-m365', desc: 'Deep enterprise integration into Teams, Excel, and Word for automated report and code generation.' },
          { name: 'Skills', slug: 'skills', desc: 'Modular agent capabilities and plugins that extend Calvras with custom APIs, tools, and workflows.' },
          { name: 'Download app', slug: 'download-app', desc: 'Native desktop applications for macOS, Windows, and Linux with local GPU inference support.' },
          { name: 'Pricing', slug: 'pricing', isDirectRoute: true, desc: 'Transparent plans starting from $0 with 14-day refund guarantee.' },
          { name: 'Log in to Calvras', slug: 'auth', isDirectRoute: true, desc: 'Sign in to access your autonomous workspaces, saved sessions, and cloud sandboxes.' }
        ]
      },
      {
        title: 'Models',
        links: [
          { name: 'Mythos', slug: 'model-mythos', desc: 'Frontier superintelligence model engineered for extreme mathematical reasoning and multi-week autonomous workflows.' },
          { name: 'Fable', slug: 'model-fable', desc: 'Creative synthesis engine specializing in rich natural language, code documentation, and narrative logic.' },
          { name: 'Opus', slug: 'model-opus', desc: 'Frontier reasoning engine with multi-step autonomous planning and self-healing code synthesis.' },
          { name: 'Sonnet', slug: 'model-sonnet', desc: 'Optimal balance of ultra-fast inference speed, deep coding capabilities, and vision intelligence.' },
          { name: 'Haiku', slug: 'model-haiku', desc: 'Ultra-lightweight, near-zero latency model for rapid syntax validation and live auto-complete.' }
        ]
      }
    ]
  },
  {
    sections: [
      {
        title: 'Solutions',
        links: [
          { name: 'AI agents', slug: 'solution-ai-agents', desc: 'Deploy autonomous software engineering agents that plan, write, test, and self-heal codebases.' },
          { name: 'Code modernization', slug: 'solution-code-modernization', desc: 'Automated legacy migration, dependency upgrades, and full-stack framework refactoring.' },
          { name: 'Coding', slug: 'solution-coding', desc: 'Next-generation pair programmer that turns natural language intent into verified production code.' },
          { name: 'Customer support', slug: 'solution-customer-support', desc: 'Intelligent, 24/7 automated support workflows powered by Calvras knowledge retrieval.' },
          { name: 'Cybersecurity', slug: 'solution-cybersecurity', desc: 'Proactive vulnerability discovery, code exploit simulation, and continuous security patching.' },
          { name: 'Enterprise', slug: 'solution-enterprise', desc: 'Scalable autonomous AI infrastructure with enterprise access controls, custom models, and priority compute.' },
          { name: 'Financial services', slug: 'solution-financial-services', desc: 'High-integrity quantitative analysis, regulatory compliance checking, and automated trading algorithms.' },
          { name: 'Government', slug: 'solution-government', desc: 'Sovereign-grade secure AI systems compliant with strict public-sector data standards.' },
          { name: 'Healthcare', slug: 'solution-healthcare', desc: 'HIPAA-ready clinical workflows, medical text analysis, and patient triage automation.' },
          { name: 'Higher education', slug: 'solution-higher-education', desc: 'Empowering university researchers, professors, and students with advanced autonomous coding tools.' },
          { name: 'K-12 teachers', slug: 'solution-k12-teachers', desc: 'Personalized lesson planning, curriculum alignment, and interactive educational sandboxes.' },
          { name: 'Legal', slug: 'solution-legal', desc: 'Autonomous contract analysis, statutory citation cross-referencing, and legal brief drafting.' },
          { name: 'Life sciences', slug: 'solution-life-sciences', desc: 'Genomic sequence parsing, molecular structure modeling, and clinical trial protocol generation.' },
          { name: 'Nonprofits', slug: 'solution-nonprofits', desc: 'Subsidized AI compute and automation tools for mission-driven global organizations.' },
          { name: 'Small business', slug: 'solution-small-business', desc: 'Empowering SMBs with automated web development, customer communication, and billing workflows.' }
        ]
      },
      {
        title: 'Calvras Platform',
        links: [
          { name: 'Overview', slug: 'platform-overview', desc: 'The unified developer platform for autonomous coding agents, workspace sandboxes, and model APIs.' },
          { name: 'Developer docs', slug: 'platform-docs', desc: 'Comprehensive developer guides, REST API references, and interactive code generation recipes.' },
          { name: 'Pricing', slug: 'pricing', isDirectRoute: true, desc: 'Token-based and seat-based pricing options designed for seamless scale.' },
          { name: 'Ecosystem', slug: 'platform-ecosystem', desc: 'Partner integrations, community extensions, and third-party tools connected to Calvras.' }
        ]
      }
    ]
  },
  {
    sections: [
      {
        title: 'Resources',
        links: [
          { name: 'Blog', slug: 'resources-blog', desc: 'Latest thoughts, engineering deep dives, and system architecture breakdowns from the Calvras team.' },
          { name: 'Calvras partner network', slug: 'resources-partner-network', desc: 'Global system integrators and consultancy partners delivering enterprise autonomous AI solutions.' },
          { name: 'Community', slug: 'resources-community', desc: 'Join thousands of builders, researchers, and engineers sharing workflows in the Calvras community.' },
          { name: 'Connectors', slug: 'resources-connectors', desc: 'Pre-built connectors for GitHub, GitLab, Jira, Slack, AWS, and modern developer stacks.' },
          { name: 'Courses', slug: 'resources-courses', desc: 'Hands-on tutorials and certification courses on prompting, agent architecture, and autonomous coding.' },
          { name: 'Customer stories', slug: 'resources-customer-stories', desc: 'Case studies on how engineering teams boost delivery speed 10x with Calvras agents.' },
          { name: 'Engineering at Calvras', slug: 'resources-engineering', desc: 'Inside our engineering philosophy: compiler-grade rigor, sandbox isolation, and deterministic testing.' },
          { name: 'Events', slug: 'resources-events', desc: 'Global hackathons, developer meetups, and keynote announcements.' },
          { name: 'Plugins', slug: 'resources-plugins', desc: 'Extend Calvras with community plugins for syntax highlighting, database querying, and cloud deployment.' },
          { name: 'Powered by Calvras', slug: 'resources-powered-by', desc: 'Showcase of innovative commercial products built on top of the Calvras API.' },
          { name: 'Service partners', slug: 'resources-service-partners', desc: 'Certified agency partners ready to help you implement custom AI workflows.' },
          { name: 'Tutorials', slug: 'resources-tutorials', desc: 'Step-by-step guides for building full-stack apps, configuring autonomous testing, and CI/CD pipelines.' },
          { name: 'Use cases', slug: 'resources-use-cases', desc: 'Explore how organizations across industries solve complex problems with autonomous AI.' }
        ]
      },
      {
        title: 'Programs',
        links: [
          { name: 'Startups', slug: 'program-startups', desc: 'Up to $25,000 in compute credits, architecture reviews, and dedicated support for early-stage startups.' },
          { name: 'Research Labs', slug: 'program-research-labs', desc: 'Academic research grants and compute access for universities studying AI alignment and agentic autonomy.' }
        ]
      },
      {
        title: 'Help and security',
        links: [
          { name: 'Availability', slug: 'availability', desc: 'Global region availability, latency map, and data residency guarantees across US, EU, and APAC.' },
          { name: 'Status', slug: 'status', desc: 'Real-time service status, 99.99% uptime metrics, and incident history.' },
          { name: 'Customer Service', slug: 'customer-service', isCustomService: true, desc: 'Interactive AI support assistant with instant escalation.' }
        ]
      }
    ]
  },
  {
    sections: [
      {
        title: 'Company',
        links: [
          { name: 'Calvras', slug: 'about', isDirectRoute: true, desc: 'Our mission to build safe, precise, and autonomous AI systems that empower humanity.' },
          { name: 'Careers', slug: 'company-careers', desc: 'Join our frontier research and product teams pushing autonomous coding to the frontier.' },
          { name: 'Leadership', slug: 'company-leadership', desc: 'Meet the researchers, engineers, and leaders guiding Calvras\'s mission and safety principles.' },
          { name: 'Policy', slug: 'company-policy', desc: 'Our engagement with policymakers worldwide on responsible AI governance and safety benchmarks.' },
          { name: 'Economic Futures', slug: 'company-economic-futures', desc: 'Research and initiatives examining the economic impacts of autonomous AI on labor and productivity.' },
          { name: 'Research', slug: 'company-research', desc: 'Frontier publications on autonomous agent loops, code self-repair, and alignment.' },
          { name: 'News', slug: 'company-news', desc: 'Press releases, product launches, and official company milestones.' },
          { name: 'Calvras\'s Constitution', slug: 'company-constitution', desc: 'The core principles and constitutional constraints that guide Calvras\'s decision-making and safety.' },
          { name: 'Calvras Corps', slug: 'company-corps', desc: 'Our public interest and open-source contribution fellowship program.' },
          { name: 'Keep thinking', slug: 'company-keep-thinking', desc: 'Long-form philosophical and technical essays on intelligence, agency, and alignment.' },
          { name: 'Policy on the AI Exponential', slug: 'company-ai-exponential', desc: 'Our framework for navigating exponential technological progress responsibly.' },
          { name: 'Responsible Scaling Policy', slug: 'company-responsible-scaling', desc: 'Specific safety and security thresholds required before training and deploying frontier models.' },
          { name: 'Security and compliance', slug: 'company-security-compliance', desc: 'Enterprise security architecture, SOC 2 Type II, ISO 27001, and zero-retention infrastructure.' },
          { name: 'Transparency', slug: 'company-transparency', desc: 'Annual transparency reports, safety evaluations, and government reporting standards.' }
        ]
      },
      {
        title: 'Terms and policies',
        links: [
          { name: 'Privacy choices', slug: 'privacy-choices', desc: 'Manage your privacy preferences, cookie settings, and data retention controls.' },
          { name: 'Privacy policy', slug: 'privacy', isDirectRoute: true, desc: 'Our strict privacy commitment: zero data selling, encrypted storage, and GDPR compliance.' },
          { name: 'Consumer health data privacy policy', slug: 'health-privacy', desc: 'Specific privacy protections applied to health and medical data processed through Calvras.' },
          { name: 'Responsible disclosure policy', slug: 'responsible-disclosure', desc: 'Our bug bounty program and guidelines for security researchers reporting vulnerabilities.' },
          { name: 'Terms of service: Commercial', slug: 'terms', isDirectRoute: true, desc: 'Clear terms governing commercial, professional, and enterprise platform usage.' },
          { name: 'Shipping & Refund Policy', slug: 'refund', isDirectRoute: true, desc: 'Immediate electronic fulfillment with an unconditional 14-day refund guarantee.' }
        ]
      }
    ]
  }
];

// Flat array of all links for fast lookup
export const ALL_FOOTER_LINKS = FOOTER_COLUMNS.flatMap(col => col.sections.flatMap(sec => sec.links));

export const getTopicMetadata = (slug) => {
  const clean = (slug || '').toLowerCase().replace(/^\//, '').replace(/\/$/, '');
  let found = ALL_FOOTER_LINKS.find(l => l.slug === clean);
  if (!found) {
    // Also try fuzzy match
    found = ALL_FOOTER_LINKS.find(l => l.slug.includes(clean) || clean.includes(l.slug));
  }
  return found || null;
};
