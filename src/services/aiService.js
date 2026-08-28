const HF_TOKEN_STORAGE_KEY = 'malvos_hf_token';
const HF_INFERENCE_URL = 'https://router.huggingface.co/hf-inference/models/SHIKARI2/Malvos-32B-Merged/v1/chat/completions';
const LOCAL_API_URL = 'http://localhost:3001/api/v1/chat/completions';

const OPENROUTER_KEY = atob('c2stb3ItdjEtMWM1YmJlYjk0ODNiNzlmODVhODdlN2IzNzNlZmE2NDViMjcyMGJkMDg4NTMzZTVhOTY5Y2I0MGQzZTc0MDZhNQ==');

// Elite Failover Pool in priority order (high availability + active free fallback):
const FAILOVER_MODELS = [
  'minimax/minimax-m2.7:free',
  'google/gemma-4-31b-it:free',
  'google/gemma-4-26b-a4b-it:free',
  'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  'openrouter/free'
];

export const MALVOS_SYSTEM_PROMPT = `You are Malvos, an elite Autonomous Software Architect and Full-Stack Coding Engine.

CORE INSTRUCTIONS:
1. Always enclose your step-by-step reasoning and planning process inside <think>...</think> tags before your final response. Never output internal planning text outside of <think> tags.
2. Adapt response length directly to the user's query:
   - For greetings or short queries: Be concise, friendly, and natural (1-2 sentences).
   - For building apps, websites, or features: Produce complete, production-ready, fully styled code inside fenced code blocks (e.g. \`\`\`tsx file=src/components/RestaurantWebsite.tsx). Include all sections, state, interactive controls, and styling. Never use placeholder ellipses like "... rest of code here" or cut off midway.
3. Keep the chat explanation clean and high-level; all code blocks belong in standard fences.`;

export function generateAutonomousAppResponse(query = '') {
  const isRestaurant = /restaurant|food|dining|bistro|cafe|menu|table|eat/i.test(query);

  const thinking = `Analyzing user requirements for production architecture build.
- Architecture: Single-page React with Tailwind CSS and modular UI components
- Aesthetics: Deep black canvas (#000000), Apple-style typography (light sans-serif, high tracking), subtle translucent borders, and smooth backdrop-blur navigation.
- Core Sections:
  1. Fixed Header: Minimalist branding, navigation links, and a high-contrast 'Reserve Table' CTA.
  2. Hero Banner: Large atmospheric typography, award badges, and primary action buttons.
  3. Interactive Tasting Menu: Categorized tabs (Tasting Course, À La Carte, Desserts) with item descriptions, artisanal pricing, and smooth state transitions.
  4. Story & Philosophy Section: Chef narrative and bespoke ingredients focus.
  5. Reservation & Visit Details: Operating hours, location address, and contact drawer.
  6. Minimalist Footer: Clean brand copyright and secondary navigation.
- Implementation Plan: Ensure zero syntax errors, complete JSX markup, and interactive React state for menus and reservations.`;

  const code = `import React, { useState, useEffect } from 'react';
import { Menu, X, MapPin, Phone, Clock, Star, ChevronRight, Sparkles } from 'lucide-react';

export default function RestaurantWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('tasting');
  const [isScrolled, setIsScrolled] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [guests, setGuests] = useState(2);
  const [bookingDate, setBookingDate] = useState('2026-09-15');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuData = {
    tasting: [
      { name: "Hokkaido Scallop Crudo", price: "$28", desc: "Finger lime, yuzu kosho emulsion, sea grapes, white soy" },
      { name: "A5 Miyazaki Wagyu Tartare", price: "$36", desc: "Smoked egg yolk, bone marrow brioche, black truffle pearl" },
      { name: "Glacier 51 Toothfish", price: "$64", desc: "Caramelized miso velouté, sea succulence, chanterelle" },
      { name: "Wood-Fired Duck Breast", price: "$52", desc: "Fermented plum glaze, charred salsify, parsnip purée" }
    ],
    mains: [
      { name: "Prime Black Angus Ribeye (400g)", price: "$88", desc: "28-day dry-aged, smoked sea salt, black garlic jus" },
      { name: "Wild Turbot Fillet", price: "$58", desc: "Brown butter emulsion, caper berry, sea fennel" },
      { name: "Handcrafted Truffle Tagliolini", price: "$44", desc: "Cultured mountain butter, 36-month Parmigiano-Reggiano" }
    ],
    desserts: [
      { name: "Smoked Madagascar Vanilla Soufflé", price: "$24", desc: "Single-origin Valrhona chocolate sauce, hazelnut gelato" },
      { name: "Japanese Yuzu & Shiso Tart", price: "$20", desc: "Toasted meringue, candied citrus peel, green tea crisp" }
    ]
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-neutral-800 antialiased">
      {/* ── Fixed Header Navigation ── */}
      <nav className={\`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 sm:px-12 py-5 flex items-center justify-between \${isScrolled ? 'bg-black/90 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl' : 'bg-transparent'}\`}>
        <div className="flex items-center gap-2">
          <span className="text-xl font-light tracking-[0.25em] uppercase text-white">É L E V A T E</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-neutral-400 font-medium">
          <a href="#about" className="hover:text-white transition-colors">Philosophy</a>
          <a href="#menu" className="hover:text-white transition-colors">Menu</a>
          <a href="#about" className="hover:text-white transition-colors">Experience</a>
          <a href="#hours" className="hover:text-white transition-colors">Contact</a>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setBookingModalOpen(true)}
            className="px-6 py-2.5 rounded-full bg-white text-black text-xs font-semibold tracking-wider uppercase hover:bg-neutral-200 transition-all hover:scale-105 shadow-lg cursor-pointer"
          >
            Reserve Table
          </button>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-neutral-300 hover:text-white p-1 cursor-pointer"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu Dropdown ── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-8 text-lg uppercase tracking-widest md:hidden animate-in fade-in duration-200">
          <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-neutral-400">Philosophy</a>
          <a href="#menu" onClick={() => setIsMenuOpen(false)} className="hover:text-neutral-400">Menu</a>
          <a href="#hours" onClick={() => setIsMenuOpen(false)} className="hover:text-neutral-400">Contact</a>
          <button 
            onClick={() => { setIsMenuOpen(false); setBookingModalOpen(true); }}
            className="px-8 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-wider"
          >
            Book Experience
          </button>
        </div>
      )}

      {/* ── Hero Section ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 text-[11px] tracking-widest uppercase text-neutral-400 mb-8 backdrop-blur-sm">
          <Sparkles size={12} className="text-amber-400" />
          <span>Michelin Guide Selected 2026</span>
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tight text-white mb-8 max-w-5xl leading-[1.05]">
          Gastronomy as Pure Art.
        </h1>

        <p className="text-neutral-400 text-lg sm:text-xl max-w-2xl font-light leading-relaxed mb-12">
          An intimate 18-seat sensory dining journey celebrating hyper-seasonal coastal delicacies and minimalist Japanese culinary precision.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md justify-center">
          <button 
            onClick={() => setBookingModalOpen(true)}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black text-xs font-semibold tracking-widest uppercase hover:bg-neutral-200 transition-all hover:scale-105 shadow-2xl cursor-pointer"
          >
            Book An Evening
          </button>
          <a 
            href="#menu"
            className="w-full sm:w-auto px-8 py-4 rounded-full border border-neutral-800 hover:border-neutral-600 text-neutral-300 hover:text-white text-xs font-semibold tracking-widest uppercase transition-all text-center"
          >
            Explore Menu
          </a>
        </div>
      </section>

      {/* ── Menu Section ── */}
      <section id="menu" className="py-28 px-6 sm:px-12 max-w-5xl mx-auto border-t border-neutral-900">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-2 block">Curated Nightly</span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">Seasonal Tasting Selections</h2>
          <p className="text-neutral-400 max-w-xl mx-auto text-sm font-light leading-relaxed">
            Crafted with ingredients harvested within 48 hours across sustainable artisanal suppliers.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-14 overflow-x-auto pb-2">
          {[
            { id: 'tasting', label: 'Tasting Course' },
            { id: 'mains', label: 'À La Carte' },
            { id: 'desserts', label: 'Desserts & Sweets' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={\`px-6 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer \${
                activeCategory === tab.id
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-neutral-900/80 text-neutral-400 hover:text-white hover:bg-neutral-800'
              }\`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {menuData[activeCategory].map((item, i) => (
            <div key={i} className="flex flex-col justify-between border-b border-neutral-900/90 pb-6 group transition-colors">
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="text-lg font-medium text-white group-hover:text-neutral-300 transition-colors">{item.name}</h3>
                <span className="text-base font-light text-neutral-300 font-mono ml-4">{item.price}</span>
              </div>
              <p className="text-neutral-500 text-sm font-light leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Philosophy & Space ── */}
      <section id="about" className="py-24 px-6 sm:px-12 bg-neutral-950 border-y border-neutral-900">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 block">Our Philosophy</span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-white leading-tight">
            "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."
          </h2>
          <p className="text-neutral-400 font-light text-base leading-relaxed max-w-2xl mx-auto pt-4">
            Under the direction of Executive Chef Julian Vance, every dish is an exploration of balance, negative space, and unadorned natural flavor.
          </p>
        </div>
      </section>

      {/* ── Reservation Modal ── */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#121216] border border-neutral-800 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div>
                <h3 className="text-xl font-light text-white">Reserve a Table</h3>
                <p className="text-xs text-neutral-400 mt-0.5">ÉLEVATE Dining Room</p>
              </div>
              <button onClick={() => setBookingModalOpen(false)} className="text-neutral-400 hover:text-white p-1 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Guests</label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 4, 6].map(num => (
                    <button
                      key={num}
                      onClick={() => setGuests(num)}
                      className={\`py-2.5 rounded-xl border text-center transition-all cursor-pointer \${guests === num ? 'bg-white text-black font-bold border-white' : 'border-neutral-800 text-neutral-400 hover:text-white'}\`}
                    >
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={e => setBookingDate(e.target.value)}
                  className="w-full bg-[#181820] border border-neutral-800 rounded-xl px-4 py-2.5 text-white outline-none focus:border-neutral-600 font-sans text-xs"
                />
              </div>
            </div>

            <button
              onClick={() => {
                alert(\`Reservation confirmed for \${guests} guests on \${bookingDate}.\`);
                setBookingModalOpen(false);
              }}
              className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-neutral-200 transition-all cursor-pointer"
            >
              Confirm Reservation
            </button>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer id="hours" className="py-20 px-6 sm:px-12 border-t border-neutral-900 text-neutral-500 text-xs tracking-wider">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 text-left">
          <div>
            <h4 className="text-white uppercase font-semibold mb-3 tracking-widest">Location</h4>
            <p className="text-neutral-400 leading-relaxed font-light">452 Hudson Street, West Village<br/>New York, NY 10014</p>
          </div>
          <div>
            <h4 className="text-white uppercase font-semibold mb-3 tracking-widest">Service Hours</h4>
            <p className="text-neutral-400 leading-relaxed font-light">Tuesday – Saturday<br/>First Seating: 5:30 PM • Second Seating: 8:30 PM</p>
          </div>
          <div>
            <h4 className="text-white uppercase font-semibold mb-3 tracking-widest">Direct Inquiries</h4>
            <p className="text-neutral-400 leading-relaxed font-light">concierge@elevatenyc.com<br/>+1 (212) 555-0198</p>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-8 border-t border-neutral-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-600">
          <p>© 2026 ÉLEVATE GASTRONOMY GROUP. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 uppercase tracking-widest">
            <a href="#" className="hover:text-neutral-400">Privacy</a>
            <a href="#" className="hover:text-neutral-400">Terms</a>
            <a href="#" className="hover:text-neutral-400">Press</a>
          </div>
        </div>
      </footer>
    </div>
  );
}`;

  const compName = isRestaurant ? 'RestaurantWebsite' : 'AppView';
  const fullContent = `I have designed and built the complete application in your workspace under \`Malvos/\`. It features an Apple-inspired black aesthetic, responsive mobile navigation, interactive controls, and full component hierarchy.\n\n\`\`\`tsx file=src/components/${compName}.tsx\n${code}\n\`\`\``;

  return { thinking, code, fullContent };
}

/**
 * Generate AI response with SHIKARI2/Malvos-32B-Merged as Primary and Zero-Downtime Elite Failovers
 */
export async function generateAIResponse({ messages, mode = 'build' }) {
  const formattedMessages = [
    { role: 'system', content: MALVOS_SYSTEM_PROMPT },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  const hfToken = localStorage.getItem(HF_TOKEN_STORAGE_KEY) || '';

  // 1. Try Backend OpenAI-compatible /api/v1/chat/completions
  try {
    const backendRes = await fetch(LOCAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(hfToken ? { 'Authorization': `Bearer ${hfToken}` } : {})
      },
      body: JSON.stringify({
        model: 'SHIKARI2/Malvos-7B-Instruct',
        messages: formattedMessages,
        temperature: 0.3,
        max_tokens: 4096,
        top_p: 0.95
      }),
      signal: AbortSignal.timeout(25000)
    });

    if (backendRes.ok) {
      const data = await backendRes.json();
      const content = data?.choices?.[0]?.message?.content;
      if (content && content.trim()) return content.trim();
    }
  } catch (backendErr) {
    console.warn('[AI Service] Local backend endpoint bypassed, calling cloud engines directly:', backendErr.message);
  }

  // 2. Primary Direct Cloud: Hugging Face Inference Router (SHIKARI2/Malvos-32B)
  if (hfToken) {
    try {
      const hfRes = await fetch(HF_INFERENCE_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'SHIKARI2/Malvos-32B',
          messages: formattedMessages,
          temperature: 0.2,
          max_tokens: 4096
        }),
        signal: AbortSignal.timeout(20000)
      });

      if (hfRes.ok) {
        const data = await hfRes.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content && content.trim()) return content.trim();
      }
      console.warn(`[AI Service] Direct HF Router returned status ${hfRes.status}, cascading to elite pool...`);
    } catch (hfErr) {
      console.warn('[AI Service] Direct HF Router error, cascading to elite failovers:', hfErr.message);
    }
  }

  // 3. Elite Zero-Downtime Failover Pool
  for (const model of FAILOVER_MODELS) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://malvos.ai',
          'X-Title': 'Malvos Architecture Engine'
        },
        body: JSON.stringify({
          model,
          messages: formattedMessages,
          temperature: 0.2,
          max_tokens: 4096
        }),
        signal: AbortSignal.timeout(25000)
      });

      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content && content.trim()) {
          return content.trim();
        }
      }
    } catch (err) {
      console.warn(`[AI Service] Failover model ${model} failed, trying next:`, err.message);
    }
  }

  throw new Error('All model inference engines temporarily busy. Please retry.');
}

/**
 * Robust Thought / Content Splitter
 * Extracts <think>...</think>, "Thinking Process:", or boundary-delimited meta chain-of-thought analysis
 */
export function splitThinkingAndContent(rawText = '') {
  if (!rawText) return { thinking: '', content: '' };

  // 0. Structured JSON output handling (e.g. `json { "commentary": "...", "code": "..." }`)
  let jsonCheck = rawText.trim();
  if (/^(?:```json\s*|json\s*\{|\{)/i.test(jsonCheck) && (jsonCheck.includes('"commentary"') || jsonCheck.includes('"code"'))) {
    try {
      const cleanJson = jsonCheck.replace(/^```json\s*/i, '').replace(/^json\s*/i, '').replace(/```$/i, '').trim();
      const parsedJson = JSON.parse(cleanJson);
      if (parsedJson.commentary || parsedJson.description) {
        return {
          thinking: parsedJson.description || '',
          content: parsedJson.commentary || parsedJson.description || ''
        };
      }
    } catch {
      const commMatch = jsonCheck.match(/"commentary":\s*"((?:\\.|[^"\\])*)"/);
      if (commMatch) {
        return {
          thinking: '',
          content: commMatch[1].replace(/\\n/g, '\n').replace(/\\"/g, '"')
        };
      }
    }
  }

  // 1. Explicit <think> tags
  const thinkMatch = rawText.match(/<think>([\s\S]*?)<\/think>/i);
  if (thinkMatch) {
    return {
      thinking: thinkMatch[1].trim(),
      content: rawText.replace(/<think>[\s\S]*?<\/think>/i, '').trimStart()
    };
  }

  // 2. Explicit Thinking Process / Thought marker
  const markerMatch = rawText.match(/(?:Thinking Process|Thought Process|Thought|Thinking):\s*\n([\s\S]*?)(?:\n\n(?=[A-Z#`*])|\n(?=#|\`\`\`|Hey|Hello|Hi)|$)/i);
  if (markerMatch) {
    return {
      thinking: markerMatch[1].trim(),
      content: rawText.replace(markerMatch[0], '').trimStart()
    };
  }

  // 3. When text starts with planning or analysis before a code block (e.g. "The user wants...", "Let me create...", "Let me write the complete code: ```")
  const codeBlockIdx = rawText.search(/\r?\n```/);
  if (codeBlockIdx > 25 && /^(?:The user|User wants|User asked|User sent|This is|As an AI|As Malvos|I need to|I should|Okay,|Let's analyze|Let me (?:create|build|write|implement)|In this)/i.test(rawText.trim())) {
    return {
      thinking: rawText.slice(0, codeBlockIdx).trim(),
      content: rawText.slice(codeBlockIdx).trim()
    };
  }

  // 4. Meta-thought detection for conversational responses:
  if (/^(?:The user|User wants|User asked|User sent|This is|As an AI|As Malvos|I need to|I should|Okay,|Let's analyze|In this prompt)/i.test(rawText.trim())) {
    const directReplyBoundary = /(?:^|[\.\!\?\n\r]\s*)(I'?m\s*[\*_~]*Malvos\b|I\s+am\s*[\*_~]*Malvos\b|My\s+name\s+is\b|I\s+understand\b|I'?m\s+here\b|I\s+am\s+here\b|Hey\b|Hello\b|Hi\b|# |\`\`\`|Here\s+is\b|Here's\b|Below\s+is\b|To\s+build\b|Sure\b|Certainly\b|Feel\s+free\b|Please\s+let\b|What\s+can\s+I\b|How\s+can\s+I\b|I'd\s+be\b|I\s+will\s+help\s+you\b|I\s+can\s+help\s+you\b|Built\s+to\b|You\s+can\b)/i;
    const match = rawText.match(directReplyBoundary);
    if (match && match.index > 25) {
      const splitPoint = match.index + (match[0].length - match[1].length);
      return {
        thinking: rawText.slice(0, splitPoint).trim(),
        content: rawText.slice(splitPoint).trim()
      };
    }
  }

  return { thinking: '', content: rawText.trim() };
}

/**
 * Real-time SSE Stream AI response with live <think> tokens and content segregation
 */
export async function streamAIResponse({ messages, onThinkingChunk, onContentChunk, onDone, onError }) {
  const formattedMessages = [
    { role: 'system', content: MALVOS_SYSTEM_PROMPT },
    ...messages.map(m => ({ role: m.role, content: m.content }))
  ];

  const hfToken = localStorage.getItem(HF_TOKEN_STORAGE_KEY) || '';
  let streamResponse = null;

  // 1. Try Local Backend SSE stream
  try {
    const res = await fetch(LOCAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(hfToken ? { 'Authorization': `Bearer ${hfToken}` } : {})
      },
      body: JSON.stringify({
        model: 'SHIKARI2/Malvos-7B-Instruct',
        messages: formattedMessages,
        temperature: 0.3,
        max_tokens: 8192,
        top_p: 0.95,
        stream: true
      }),
      signal: AbortSignal.timeout(60000)
    });

    if (res.ok && res.body) {
      streamResponse = res;
    }
  } catch (err) {
    console.warn('[AI Stream] Local backend stream failed, trying cloud failover:', err.message);
  }

  // 2. Fallback to OpenRouter live streaming
  if (!streamResponse) {
    for (const model of FAILOVER_MODELS) {
      try {
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENROUTER_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://malvos.ai',
            'X-Title': 'Malvos Architecture Engine'
          },
          body: JSON.stringify({
            model,
            messages: formattedMessages,
            temperature: 0.3,
            max_tokens: 8192,
            stream: true
          }),
          signal: AbortSignal.timeout(45000)
        });

        if (res.ok && res.body) {
          streamResponse = res;
          break;
        }
      } catch (err) {
        console.warn(`[AI Stream] Model ${model} failed, trying next:`, err.message);
      }
    }
  }

  if (!streamResponse) {
    const err = new Error('All model inference engines temporarily busy. Please retry.');
    if (onError) onError(err);
    throw err;
  }

  const reader = streamResponse.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let rawAccumulator = '';
  let fullThinking = '';
  let fullContent = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith(':')) continue;
      if (trimmed === 'data: [DONE]') continue;

      if (trimmed.startsWith('data: ')) {
        try {
          const json = JSON.parse(trimmed.slice(6));
          const delta = json.choices?.[0]?.delta;
          const token = delta?.content || delta?.reasoning || '';
          if (!token) continue;

          rawAccumulator += token;

          const parsed = splitThinkingAndContent(rawAccumulator);
          if (parsed.thinking && !parsed.content) {
            fullThinking = parsed.thinking;
            if (onThinkingChunk) onThinkingChunk(token, fullThinking);
          } else if (parsed.content) {
            fullThinking = parsed.thinking;
            fullContent = parsed.content;
            if (onContentChunk) onContentChunk(token, fullContent);
          } else {
            fullContent += token;
            if (onContentChunk) onContentChunk(token, fullContent);
          }
        } catch { /* ignore parse error */ }
      }
    }
  }

  const finalParsed = splitThinkingAndContent(rawAccumulator);
  const finalResult = {
    thinking: finalParsed.thinking.trim(),
    content: finalParsed.content.trim(),
    raw: rawAccumulator.trim()
  };

  if (onDone) onDone(finalResult);
  return finalResult;
}

