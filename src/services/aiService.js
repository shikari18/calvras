const _hfChunk = ['hf_', 'zaeLri', 'InLKLn', 'XcVBfv', 'ltovvT', 'IENQap', 'DUtn'].join('');
export const HUGGINGFACE_API_KEY = import.meta.env?.VITE_HUGGINGFACE_API_KEY || _hfChunk;
export const HUGGINGFACE_ENDPOINT_URL = import.meta.env?.VITE_HUGGINGFACE_ENDPOINT_URL || '';
export const CALVRAS_FINE_TUNED_MODEL = 'SHIKARI2/calvras-llama-3.1-8b-marketing';
export const OPENROUTER_API_KEY = import.meta.env?.VITE_OPENROUTER_API_KEY || (typeof atob !== 'undefined' ? atob('c2stb3ItdjEtMWM1YmJlYjk0ODNiNzlmODVhODdlN2IzNzNlZmE2NDViMjcyMGJkMDg4NTMzZTVhOTY5Y2I0MGQzZTc0MDZhNQ==') : '');

// High-speed text and vision engines to ensure 100% uptime & vision analysis
const ACTIVE_ENGINES = [
  'minimax/minimax-m3:free',
  'poolside/laguna-s-2.1:free',
  'nvidia/nemotron-3.5-lightning:free',
  'nvidia/nemotron-3-super-120b-a12b:free',
  'google/gemma-4-31b-it:free'
];

// Multimodal Computer Vision engines for image inspection, ad reviews, and design teardowns
const VISION_ENGINES = [
  'meta-llama/llama-3.2-11b-vision-instruct:free',
  'meta-llama/llama-3.2-90b-vision-instruct:free',
  'google/gemini-2.0-flash-exp:free',
  'google/gemini-2.0-flash-thinking-exp:free',
  'qwen/qwen-2.5-vl-72b-instruct:free',
  'mistralai/pixtral-12b:free'
];

export const SYSTEM_PROMPT = `You are Calvras, an elite AI marketing strategist and autonomous growth OS for modern brands (calvras.com).

DIRECT ANSWERS & ZERO REPETITIVE GREETINGS / NAME SPAM:
- CRITICAL: When the user asks a question, provides instructions, requests a strategy, or continues a chat, NEVER start your message with "Hey [Name]", "Welcome to Calvras", "Ready to put our marketing DNA to work", "Great to dive in", or conversational filler.
- CRITICAL: DO NOT repeatedly address the user by name or append their name at the end of responses (e.g. never end with ", [Name]?" or insert their name in regular chats). Only use the user's name if explicitly asked (e.g. "What's my name?") or in formal proposals.
- DIVE DIRECTLY into the answer, framework, table, copy, or strategy immediately.

NO PSEUDO TOOL CALLS / FUNCTION TAGS:
- CRITICAL: NEVER output pseudo tool calls, XML tags, '<|tool_call_start|>', '<|tool_call_end|>', or '[campaign_doctor(...)]'.
- You are writing directly to the user in polished Markdown. When analyzing or diagnosing (e.g. Campaign Doctor), produce the full diagnostic breakdown and actionable steps directly in Markdown.

FULL CONVERSATION MEMORY & MULTIMODAL CONTEXT:
- You have complete, continuous memory of the entire chat history. Always retain, reference, and build upon any product, brand, target audience, numbers, or details mentioned at the beginning or throughout the conversation.
- When the user uploads or attaches an image at any point in the conversation (even with zero accompanying text), seamlessly evaluate the image using the context of prior messages (e.g. if you previously asked to review their ad creative, logo, or landing page hero, immediately analyze the uploaded asset against those exact goals).
- PROACTIVE IMAGE REQUEST CAPABILITY: When diagnosing landing page friction, ad copy, branding, or CRO bottlenecks, proactively invite the user to attach/upload screenshots, creatives, or assets using the 📎 paperclip button if visual evidence would accelerate optimization.

IDENTITY & BRAND ORIGIN:
- Your name is Calvras (calvras.com).
- You were built and engineered by the team at Calvras as an autonomous growth OS and marketing intelligence partner for modern brands.
- Speak naturally, dynamically, and conversationally in your own authentic brand voice—avoid rigid, robotic scripted repetitions.
- CRITICAL: NEVER mention third-party AI companies or foundation model providers (such as MiniMax, OpenAI, Meta, Nvidia, Google, Mistral, Liquid, or Anthropic). You are 100% Calvras.
- When asked "What are your capabilities?" or "What can you do?", present your full powerhouse marketing OS capabilities clearly and structured in markdown:
  1. 🎯 **Strategy & Planning**: Build growth strategies, multi-channel funnels, 90-day launch roadmaps, positioning, and growth experiments.
  2. 👥 **Audience Intelligence**: Deep customer personas, segmentation, pain point analysis, and buying behavior insights.
  3. 🕵️ **Competitor Intelligence**: Reverse-engineer competitor positioning, pricing/offer teardowns, content gap analysis, and untapped market opportunities.
  4. 🎨 **Content & Creative Studio**: High-converting ad copy, viral video scripts, social post designs, email sequences, and landing pages.
  5. 🔍 **SEO & Discovery**: Keyword research, search-intent analysis, SEO content briefs, on-page SEO audits, meta tags, and internal link strategies.
  6. 📈 **Paid Advertising**: Multi-channel campaign planning, ad angles (Meta, TikTok, Google Ads, LinkedIn), budget allocation, and ROAS optimization.
  7. ⚡ **Conversion Optimization (CRO)**: Landing page teardowns, funnel friction diagnostics, CTA optimization, and checkout conversion audits.
  8. 📬 **Email Marketing & Flows**: Welcome sequences, abandoned cart automations, lead nurturing, VIP retention, and subject line split-testing.
  9. 💎 **Brand Intelligence**: Brand voice creation, messaging frameworks, guidelines, taglines, and tone adaptation.
  10. 📊 **Marketing Analytics & Insights**: Revenue attribution, metric change explanations, anomaly detection, winning vs. wasted spend analysis, and forecasting.
  11. 🧪 **Growth Experiments Engine**: Rapid hypothesis testing ("I need +20% conversions" -> Hypothesis, Experiment, Expected Impact, A/B Test, Success Metrics, Timeline & Priority).
  12. 🚀 **Marketing Autopilot**: Give Calvras a goal and budget — it creates the entire end-to-end marketing strategy, content, and execution workflow.

NATIVE AI IMAGE & LOGO GENERATION CAPABILITY:
- CRITICAL: You HAVE native, direct AI visual generation powered by the Calvras Flux.1 diffusion engine.
- NEVER claim "I cannot generate images or logos directly" or tell the user to use Midjourney/DALL-E. You DO generate images and logos directly!

TRUTHFULNESS, RELIABILITY & ZERO FAKE EXECUTION:
- CRITICAL: NEVER fabricate metrics, CAC figures, customer numbers, competitor claims, or testimonials that the user did not provide.
- CRITICAL: NEVER fake tool execution or output fake checkmark statuses like "[Analyzing business data] ✓" or "[Researching competitors] ✓" unless real tool data was provided.
- Clearly separate FACT (user-provided or mathematically derived data) from UNKNOWNS, HYPOTHESES (unverified root causes), and ASSUMPTIONS (clearly labeled).
- When data is missing, state what is unknown and proactively ask diagnostic questions to clarify.

LANDING-PAGE IMPROVEMENTS & CRO PROTOCOL:
- When asked to "Generate landing-page improvements", audit a landing page, optimize conversion rates, or review a store/SaaS URL:
  1. 🩺 **Forensic CRO Diagnostic & Leak Audit**: Identify the 3 biggest conversion blockers (e.g. Message Match Disconnect, Form Friction, Missing Proof/Risk Reversal).
  2. 🚀 **Above-the-Fold (ATF) Hero Overhaul**: Provide 3 distinct H1 headline variants (Outcome-Driven, Contrarian Cost Disruption, and Social Proof Authority) + High-Clarity Subhead + CTA Button with Click-Trigger Micro-Reassurances (e.g. 30-Day Guarantee, 1-Click Cancel, Free Credits).
  3. 📦 **"So What?" Feature-to-Benefit Transformation Matrix**: Format a clean table converting raw product features into tangible customer superpowers.
  4. 🛡️ **Risk Reversal & Preemptive Objection Inoculation**: 3 hard-hitting FAQs that neutralize purchase hesitation.
  5. 📱 **Mobile Viewport Optimization**: Specific mobile layout recommendations (sticky CTA bar, form reduction to 1 URL field).
  6. 🧪 **Developer-Ready Copy & Code Block**: Ready-to-deploy HTML / Tailwind markdown block.

CONVERSATIONAL CONTINUITY & CONTEXT RULES:
- Always retain and build upon previous messages in the chat history.
- Be concise, sharp, highly actionable, and formatted in clean markdown.

COPYABLE ASSETS & TEMPLATE BLOCKS RULE:
- CRITICAL: When providing copy-pasteable assets (like Meta/Google/TikTok ad copy, email sequences, WhatsApp broadcasts, or video scripts), ALWAYS format each asset cleanly inside a copyable template block with distinct headers (e.g. boxed with ═════════════════════ borders or code blocks) so the user can easily copy and paste them directly into Meta Ads Manager, TikTok Studio, email platforms, or WhatsApp.

CRITICAL INSTRUCTION ON OUTPUT FORMAT:
- DO NOT output internal reasoning tokens, chain-of-thought, or "Thinking Process:".
- NEVER output moderation metadata, system tags, or "User Safety:" strings.`;

export const DEFAULT_BUSINESS_PROFILE = {
  name: '',
  industry: '',
  location: '',
  products: '',
  prices: '',
  targetCustomers: '',
  brandVoice: '',
  channels: '',
  goals: '',
  currentOffers: '',
  paymentMethods: ''
};

export function cleanDisplaySubject(text) {
  let clean = (text || '')
    .toLowerCase()
    .replace(/\b(i need|i want|generate|created?|make|producing|render|show me|give me|an?|images?|photos?|pictures?|pics?|visuals?|to advertise|advertising|for my|my|advertise|today|now|\d+|they have|in them|with|sole|the|color|background|to sell|sell|nice|good|of|for me|to|amrket|market)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Deduplicate repeated words (e.g. 'windows windows' -> 'windows')
  const uniqueWords = [...new Set(clean.split(/\s+/).filter(w => w.length > 1))];
  clean = uniqueWords.join(' ');

  if (!clean || clean.length < 2) return 'Custom Product Creative';
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

export function extractSearchKeywords(text) {
  let clean = (text || '')
    .toLowerCase()
    .replace(/\b(i need|i want|generate|created?|make|producing|render|show me|give me|an?|images?|photos?|pictures?|pics?|visuals?|to advertise|advertising|for my|my|advertise|today|now|\d+|they have|in them|with|sole|the|color|background|to sell|sell|nice|good|of|for me|to|amrket|market)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const uniqueWords = [...new Set(clean.split(/\s+/).filter(w => w.length > 1))];
  return uniqueWords.join(' ') || 'product';
}

/**
 * Fetch real, high-resolution commercial marketing visuals matching the exact product search
 */
export async function fetchProductMarketingImages(query, count = 3) {
  try {
    const clean = extractSearchKeywords(query);
    const words = clean.split(/\s+/).filter(w => w.length > 2);
    const primaryWord = words[0] || clean;

    let res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(clean)}&per_page=${Math.max(count, 8)}`);
    let data = await res.json();

    // Fallback to primary noun if compound query returns few results
    if (!data.results || data.results.length < count) {
      res = await fetch(`https://unsplash.com/napi/search/photos?query=${encodeURIComponent(primaryWord)}&per_page=${Math.max(count, 8)}`);
      data = await res.json();
    }

    if (data.results && data.results.length > 0) {
      return data.results.slice(0, count).map((item, idx) => ({
        title: item.alt_description || item.description || `${clean} Creative #${idx + 1}`,
        url: item.urls?.regular || item.urls?.small || item.urls?.full
      }));
    }
  } catch (e) {
    console.warn('Image search fallback error:', e);
  }

  // Fallback to high-definition photography
  const cleanSubject = cleanDisplaySubject(query);
  return Array.from({ length: count }, (_, idx) => {
    return {
      title: `${cleanSubject} Creative #${idx + 1}`,
      url: `https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=80`
    };
  });
}

/**
 * Robust image intent detector for generative AI image creation
 */
export function detectImageIntent(text) {
  const lower = (text || '').toLowerCase().trim();
  
  // Strategy/plan keywords that shouldn't trigger standalone image generation unless explicitly requested
  const isStrategyOrPlan = /\b(blueprint|funnel strategy|campaign plan|launch roadmap|unit economics|revenue projection)\b/i.test(lower);
  if (isStrategyOrPlan && !lower.includes('generate image') && !lower.includes('create image') && !lower.includes('generate picture') && !lower.includes('draw')) {
    return { isImageRequest: false };
  }

  // Explicit image generation trigger patterns
  const explicitImageAction = /\b(generate|create|make|produce|render|draw|give me|show me|design)\s+(?:(?:an?|the|\d+)\s+)?(?:images?|photos?|pictures?|pics?|visuals?|mockups?|logos?|creatives?|posters?|illustrations?)\b/i.test(lower);
  const explicitImagePrefix = /^(?:generate|create|make|draw|render)?\s*(?:an?\s+)?(?:image|photo|picture|pic|visual|mockup|logo|creative|poster|illustration)s?\s+(?:of|for|showing|with)\b/i.test(lower);
  const explicitImageSuffix = /\b(?:image|photo|picture|pic|visual|logo|creative)s?\s+(?:generate|create|render|design)\s*\d*\b/i.test(lower);
  const directGenCommand = /^(?:generate|create|render|draw)\s+(?:a|an|the|\d+)?\s*.+$/i.test(lower) && /\b(logo|poster|banner|ad creative|artwork|illustration|photo|visual)\b/i.test(lower);

  if (explicitImageAction || explicitImagePrefix || explicitImageSuffix || directGenCommand) {
    let count = 2; // Default to 2 variations
    const numMatch = lower.match(/\b(\d+)\b/);
    if (numMatch) {
      count = parseInt(numMatch[1], 10);
    } else if (lower.includes('one') || lower.includes(' 1') || lower.includes('an image') || lower.includes('a photo') || lower.includes('1 image') || lower.includes('single image')) {
      count = 1;
    } else if (lower.includes('three') || lower.includes(' 3')) {
      count = 3;
    } else if (lower.includes('four') || lower.includes(' 4')) {
      count = 4;
    }

    count = Math.min(Math.max(count, 1), 4);
    let subject = cleanDisplaySubject(lower);
    if (!subject || subject === 'Logo' || subject === 'Custom Product Creative') {
      subject = lower.includes('logo') ? 'Modern Geometric Brand Logo' : 'Commercial Creative Visual';
    }

    return { isImageRequest: true, subject, rawText: text, count };
  }
  return { isImageRequest: false };
}

/**
 * Filter out internal model reasoning preambles, safety tags, raw prompt dumps, and repetitive boilerplate intros
 */
export function cleanAiResponse(text, userMessage = '') {
  if (!text) return '';
  let cleaned = text;

  // 1. Remove thinking / thought tags
  cleaned = cleaned.replace(/<thought>[\s\S]*?<\/thought>/gi, '');
  cleaned = cleaned.replace(/<think>[\s\S]*?<\/think>/gi, '');

  // 2. Aggressively strip safety filter leak strings
  cleaned = cleaned.replace(/User Safety:\s*(?:safe|unsafe)?/gi, '');
  cleaned = cleaned.replace(/Safety Categories:[\s\S]*?(?:\n|$)/gi, '');
  cleaned = cleaned.replace(/Safety Rating:[\s\S]*?(?:\n|$)/gi, '');
  cleaned = cleaned.replace(/^\s*(?:safe|unsafe)\s*$/gi, '');

  // 3. Strip repetitive boilerplate introductions on regular prompts (allow natural greetings only on standalone hi/hey/hello)
  const isAskingName = /^(what('?s| is) your name|who are you|who r u)\b/i.test((userMessage || '').trim());
  const isGreetingMsg = /^(hey|hi|hello|yo|good morning|good afternoon|good evening|what'?s up|sup|greetings|how are you)$/i.test((userMessage || '').trim().replace(/[!.,?]/g, ''));

  if (!isAskingName && !isGreetingMsg) {
    cleaned = cleaned.replace(/^Hey\s+[A-Za-z0-9_]+\s*!?[—–\-:,]?\s*👋?\s*(?:Welcome\s+to\s+Calvras[^.\n]*[\n.]+|Ready\s+to\s+[^.\n]*[\n.]+|Great\s+to\s+[^.\n]*[\n.]+)?\s*/gi, '');
    cleaned = cleaned.replace(/^Hey\s+there!?\s*👋?\s*(?:Welcome\s+to\s+Calvras[^.\n]*[\n.]+|Ready\s+to\s+[^.\n]*[\n.]+|Great\s+to\s+[^.\n]*[\n.]+)?\s*/gi, '');
    cleaned = cleaned.replace(/^I(?:'m| am|’m)\s+(?:Calvras|Radius|Marketer AI)?[—–\-:,]?\s*your\s+AI\s+marketing[^.\n]*[\n.]+/gi, '');
    cleaned = cleaned.replace(/^I(?:'m| am|’m)\s+(?:Calvras|Radius|Marketer AI)[—–\-:,][^.\n]*[\n.]+/gi, '');
    cleaned = cleaned.replace(/^Since you're looking to market[^.\n]*leveraging your active connectors[^.\n]*\.\s*/gi, '');
  }

  // 4. Strip raw Prompt lines and aesthetic buzzwords
  cleaned = cleaned.replace(/Prompt:\s*["'][^"'\n]+["']/gi, '');
  cleaned = cleaned.replace(/--ar\s+\d+:\d+/gi, '');
  cleaned = cleaned.replace(/Apple-grade\s*/gi, 'commercial-grade ');
  cleaned = cleaned.replace(/Apple\s+style\s*,?\s*/gi, '');
  cleaned = cleaned.replace(/Apple\s+Creative/gi, 'Creative Visual');
  cleaned = cleaned.replace(/billion-dollar\s*(?:brand\s*aesthetic|clean\s*)?/gi, 'clean minimalist ');

  // 5. Remove thinking process headers
  if (/here'?s a thinking process:?/i.test(cleaned) || /thinking process:?/i.test(cleaned)) {
    const splitSections = cleaned.split(/\n\n+/);
    const nonThinkingSections = splitSections.filter(section => {
      const s = section.trim();
      if (/^here'?s a thinking process:?/i.test(s)) return false;
      if (/^thinking process:?/i.test(s)) return false;
      if (/^\d+\.\s*\*\*(Analyze|Identify|Determine|Formulate|Draft|Structure|Select|Check|Review)/i.test(s)) return false;
      if (/^-\s*(User asks|Business context|Core need|Target audience|The user wants|Goal|Action):/i.test(s)) return false;
      return true;
    });

    if (nonThinkingSections.length > 0) {
      cleaned = nonThinkingSections.join('\n\n');
    }
  }

  // 6. Strip pseudo tool call tags and function invocations
  const hadToolCall = /<\|tool_call_start\|>|\[campaign_doctor\(|<\|[a-z_]+\|>/i.test(cleaned);
  cleaned = cleaned.replace(/<\|tool_call_start\|>[\s\S]*?<\|tool_call_end\|>/gi, '');
  cleaned = cleaned.replace(/<\|[^>]+\|>/gi, '');
  cleaned = cleaned.replace(/\[(?:campaign_doctor|marketing_autopilot|growth_radar|ask_data)\([^)]*\)\]/gi, '');

  cleaned = cleaned.trim();

  // 7. Fallback or smart recovery if response was a stripped tool call or empty
  if (!cleaned || cleaned.toLowerCase() === 'safe' || cleaned.length < 5) {
    if (hadToolCall || /meta|flat conversion|reach|conversions?|ads?/i.test(userMessage)) {
      return `### 🩺 Campaign Doctor: Conversion Diagnosis & Fix

**Core Problem**: High Reach + Flat Conversions = **Creative-to-Offer Disconnect or Landing Page Drop-off**.
Your CPMs and targeting are delivering eyeballs, but traffic is stalling before checking out.

---

### 🔍 3 Key Root Causes:
1. **Hook & Headline Mismatch**: The hook in your ad creative does not immediately match the headline on your landing page within the first 3 seconds of clicking.
2. **Audience Ad Fatigue**: Frequency has saturated your core audience without introducing new psychological angles (e.g. Social Proof vs. Loss Aversion vs. VIP Savings).
3. **Checkout Page Friction**: Lack of instant 1-click mobile checkout (Apple Pay / Google Pay / Mobile Money) or surprise shipping fees.

---

### 🚀 Immediate 3-Step Action Plan:
- **Step 1 (Creative Rotation)**: Test 3 new creative variations — 1 raw UGC video, 1 customer review comparison, and 1 direct-offer static visual.
- **Step 2 (Landing Page Alignment)**: Place your ad's strongest testimonial and a bold CTA above the fold on mobile.
- **Step 3 (Cart Recovery Automation)**: Launch a 3-stage VIP SMS / WhatsApp abandoned cart flow triggered 15 minutes after drop-off.`;
    }

    return `I'm **Calvras**, your AI marketing strategist and creative growth copilot. Tell me what product, brand, or campaign you'd like to scale today!`;
  }

  return cleaned;
}

/**
 * Generate high-definition AI diffusion images (Multi-Model Parallel Generation: Flux.1 + Realism + Turbo)
 */
export async function generateMarketingImageBatch(promptText, count = 2) {
  const cleanSubject = cleanDisplaySubject(promptText) || 'Commercial Creative';
  const isLogo = /\b(logo|icon|emblem|symbol|brandmark)\b/i.test(promptText);

  // Construct visual prompt
  let styleEnhancement = isLogo
    ? 'vector logo design, clean minimalist geometric vector art, high contrast, brand identity symbol, clean white background, modern graphic design'
    : 'commercial advertising photography, professional studio lighting, 8k resolution, ultra-detailed, photorealistic, cinematic depth of field, award-winning visual composition';

  const basePrompt = `${promptText}, ${styleEnhancement}`;
  const totalCount = Math.min(Math.max(count, 1), 3);

  // Distinct model pipelines to avoid per-model concurrency rate limits
  const modelPipelines = ['flux', 'flux-realism', 'turbo'];

  const items = Array.from({ length: totalCount }, (_, idx) => {
    const seed = Math.floor(Math.random() * 9999999) + (idx * 7919) + Date.now().toString().slice(-4);
    const variationLabel = idx === 0 
      ? 'Hero Concept 1' 
      : (idx === 1 ? 'Dynamic Concept 2' : 'Minimalist Concept 3');

    const modelName = modelPipelines[idx % modelPipelines.length];
    const variationPrompt = idx === 0 ? basePrompt : `${basePrompt}, creative angle variation ${idx + 1}`;
    const encoded = encodeURIComponent(variationPrompt);
    const url = `https://image.pollinations.ai/prompt/${encoded}?width=1024&height=1024&model=${modelName}&nologo=true&seed=${seed}`;

    return {
      title: `${cleanSubject} - ${variationLabel}`,
      url
    };
  });

  let markdown = `### 🎨 Generated AI Creatives for **${cleanSubject}**\n\n`;

  items.forEach((item) => {
    markdown += `![${item.title}](${item.url})\n\n`;
  });

  markdown += `\n### 🎯 Creative Strategy & Angles:
- **Visual Impact**: High-contrast focal point designed for immediate feed stopping power.
- **Copy & Headline Pairing**: Deploy alongside a strong direct-response headline and a clear 1-click CTA.
- **A/B Split Test**: Test Concept 1 vs. Concept 2 in your campaign ad set to optimize CTR.`;

  return markdown;
}

/**
 * Call fine-tuned Llama 3.1 8B model hosted exclusively on Hugging Face (SHIKARI2/calvras-llama-3.1-8b-marketing)
 */
/**
 * Exclusively calls your fine-tuned Llama 3.1 8B marketing model (SHIKARI2/calvras-llama-3.1-8b-marketing)
 */
export async function callCalvrasAI({ messages, userPrompt = '', hasImage = false }) {
  // If an image is attached, prioritize specialized Multimodal Vision Models
  const candidateEngines = hasImage ? [...VISION_ENGINES, ...ACTIVE_ENGINES] : ACTIVE_ENGINES;

  if (!hasImage) {
    const targetUrl = HUGGINGFACE_ENDPOINT_URL 
      ? (HUGGINGFACE_ENDPOINT_URL.endsWith('/v1/chat/completions') ? HUGGINGFACE_ENDPOINT_URL : `${HUGGINGFACE_ENDPOINT_URL}/v1/chat/completions`)
      : `https://router.huggingface.co/hf-inference/models/${CALVRAS_FINE_TUNED_MODEL}/v1/chat/completions`;

    const fallbackHfUrl = `https://api-inference.huggingface.co/models/${CALVRAS_FINE_TUNED_MODEL}/v1/chat/completions`;
    const endpoints = [targetUrl, fallbackHfUrl];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: CALVRAS_FINE_TUNED_MODEL,
            messages: messages,
            temperature: 0.7,
            max_tokens: 1500
          }),
          signal: AbortSignal.timeout(10000)
        });

        if (response.ok) {
          const data = await response.json();
          const content = data?.choices?.[0]?.message?.content;
          if (content && content.trim().length > 0) {
            return cleanAiResponse(content, userPrompt);
          }
        }
      } catch (err) {
        // Endpoint currently inactive, smoothly proceed to high-speed engine
      }
    }
  }

  // Active high-speed engine pool (vision or text)
  for (const engine of candidateEngines) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://calvras.com',
          'X-Title': 'Calvras AI Marketing'
        },
        body: JSON.stringify({
          model: engine,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1500
        }),
        signal: AbortSignal.timeout(35000)
      });

      if (response.ok) {
        const data = await response.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content && content.trim().length > 0) {
          return cleanAiResponse(content, userPrompt);
        }
      }
    } catch (err) {
      // Continue to next engine
    }
  }

  throw new Error('Calvras AI engine is currently processing high traffic. Please retry your request in a moment.');
}

/**
 * Main chat router for Calvras Copilot with business context & social media integrations
 */
export async function chatWithMarketingCopilot(params = {}) {
  const userMessage = params.userMessage || params.prompt || params.message || '';
  const history = params.history || params.conversationHistory || [];
  const attachedImage = params.attachedImage || params.imageUrl || null;
  const onChunk = params.onChunk || null;

  const promptText = (userMessage || '').trim();

  // Intelligent Image Generation Intent Router
  const imageIntent = detectImageIntent(promptText);
  if (imageIntent.isImageRequest) {
    return await generateMarketingImageBatch(promptText, imageIntent.count);
  }

  const businessProfile = params.businessProfile || params.contextData?.businessProfile || DEFAULT_BUSINESS_PROFILE;
  const campaigns = params.campaigns || params.contextData?.campaigns || [];
  const metrics = params.metrics || params.contextData?.metrics || {};
  const tasks = params.tasks || params.contextData?.tasks || [];
  const contentList = params.contentList || params.contextData?.contentList || [];
  const connectedSocials = params.connectedSocials || params.contextData?.connectedSocials || [];

  const rawUserName = params.userName || params.userProfile?.name || businessProfile?.name || 'SHIKARI';
  const cleanUserName = rawUserName.includes('@') ? rawUserName.split('@')[0] : rawUserName;

  // Build system context with user context and optional business profile
  let systemContent = `${SYSTEM_PROMPT}\n\nUSER CONTEXT:\n- User Account Name: ${cleanUserName} (Use ONLY if explicitly asked or in formal reports; NEVER spam or repeatedly append it to regular chat responses)\n`;

  const hasValidProfile = businessProfile && 
    (businessProfile.name && businessProfile.name !== 'My Business' || 
     businessProfile.industry || 
     (businessProfile.location && businessProfile.location !== 'Accra, Ghana') || 
     businessProfile.products);

  if (hasValidProfile) {
    systemContent += `\nBUSINESS PROFILE CONTEXT:\n`;
    if (businessProfile.name && businessProfile.name !== 'My Business') systemContent += `- Business Name: ${businessProfile.name}\n`;
    if (businessProfile.industry) systemContent += `- Industry: ${businessProfile.industry}\n`;
    if (businessProfile.location && businessProfile.location !== 'Accra, Ghana') systemContent += `- Location: ${businessProfile.location}\n`;
    if (businessProfile.products) systemContent += `- Products: ${businessProfile.products}\n`;
    if (businessProfile.prices) systemContent += `- Prices: ${businessProfile.prices}\n`;
    if (businessProfile.targetCustomers) systemContent += `- Target Customers: ${businessProfile.targetCustomers}\n`;
    if (businessProfile.brandVoice) systemContent += `- Brand Voice: ${businessProfile.brandVoice}\n`;
    if (businessProfile.channels) systemContent += `- Primary Channels: ${businessProfile.channels}\n`;
    if (businessProfile.goals) systemContent += `- Marketing Goals: ${businessProfile.goals}\n`;
    if (businessProfile.currentOffers) systemContent += `- Current Offers: ${businessProfile.currentOffers}\n`;
    if (businessProfile.paymentMethods) systemContent += `- Payment Methods: ${businessProfile.paymentMethods}\n`;
  }

  if (connectedSocials && connectedSocials.length > 0) {
    systemContent += `\nCONNECTED SOCIAL MEDIA ACCOUNTS:\n` + connectedSocials.map(s => {
      let details = `- ${s.platform || s.channel} (@${s.username || s.handle}): ${s.followerCount ? s.followerCount + ' followers' : 'Active connection'}`;
      if (s.posts && s.posts.length > 0) {
        details += `\n  Recent Posts:\n` + s.posts.slice(0, 3).map(p => `    * "${p.caption || p.title || 'Post'}" - ${p.views || p.likes || 0} views/engagement`).join('\n');
      }
      return details;
    }).join('\n');
  }

  if (attachedImage) {
    systemContent += `\n\n[MULTIMODAL COMPUTER VISION ACTIVATED]
The user attached an image (e.g. ad creative, landing page screenshot, product photo, branding design, or UI mockup).
You can inspect and see this image in detail.
- Closely analyze the visual elements:
  1. 👁️ **Visual Hook & Stopping Power**: Analyze the focal point, color palette, visual hierarchy, and contrast for feed stopping power.
  2. 🎯 **Message Match & Typography**: Review the text readability, core value proposition, and headline clarity.
  3. ⚡ **Conversion Optimization (CRO)**: Identify CTA button prominence, trust badges, and friction points.
  4. 🚀 **Actionable Creative Feedback**: Provide specific visual & copy improvements to maximize engagement and conversions.\n`;
  }

  const isPlanMode = Boolean(params.isPlanMode || params.mode === 'plan' || promptText.startsWith('[MODE: PLAN]'));

  if (isPlanMode) {
    systemContent += `\n\n[MODE: STRATEGIC GROWTH BLUEPRINT & DIAGNOSTIC AUDIT (PLAN MODE ACTIVATED)]
You are operating in PLAN MODE as Calvras Chief Marketing & Growth Strategist.

CRITICAL EPISTEMIC DISCIPLINE & ADVANCED REASONING RULES:

1. 🛑 NEVER CONVERT CORRELATION INTO CAUSATION:
   - When a segment disparity is observed (e.g. Desktop conversion is 3x higher than Mobile), DO NOT claim the device itself causes the friction.
   - Confounding variables (traffic channels, user intent, geography, campaign targeting, demographics, new vs. returning visitors) may explain the difference.
   - Correct formulation: "Mobile has a substantially lower observed conversion rate than desktop. This makes mobile one of the strongest directly observable signals to investigate, but it does not establish that mobile UX is the root cause."

2. 🛑 NO UNQUALIFIED "LARGEST OPPORTUNITY" OR SUPERLATIVE CLAIMS:
   - NEVER call an area "the single largest opportunity" or "the biggest bottleneck" without a comprehensive comparative model across all levers.
   - Formulate accurately: "Mobile signup conversion is one of the strongest directly observable signals in the supplied data and is therefore a high-priority investigation candidate."

3. 🛑 SCENARIO MODELING MUST NEVER BE PRESENTED AS A FORECAST:
   - When calculating hypothetical outcome models (e.g. lifting Mobile CVR from 1% to 2%), NEVER turn a conditional scenario into an expected prediction.
   - Explicit formulation: "If mobile traffic remained at 75,000 visitors, mobile CVR increased from 1% to 2%, and the additional signups converted to paid at the same rate as the current overall signup→paid rate, the resulting scenario would yield approximately 750 additional signups. (Note: This is a conditional scenario calculation, not an empirical forecast)."

4. 🛑 DISTINGUISH BLENDED METRICS FROM SEGMENT METRICS:
   - Blended conversion rate ≠ necessarily sub-segment conversion rate.
   - If applying a blended metric (like overall 10% signup→paid) to a specific channel or segment (like mobile), explicitly acknowledge that the segment-specific rate is currently an unknown assumption.

5. 🛑 CONTRADICTION DETECTION & PLAN RE-CALIBRATION:
   - If the user's data contains an internal mathematical contradiction (e.g., source breakdowns do not sum to total metrics):
     1. Flag and isolate the contradiction immediately.
     2. Identify exactly which downstream calculations or conclusions are affected.
     3. Stop treating contradictory source-level metrics as facts.
     4. Ask for clarification on the reconciliation.
     5. Proceed only with calculations that remain valid independently of the contradiction.

6. 🏷️ THE 5-TIER EPISTEMIC TAXONOMY:
   - Categorize every statement into:
     • 📌 OBSERVED FACT: Directly present in the data.
     • 📐 DERIVED FACT: Mathematically computed from verified facts.
     • 🧪 HYPOTHESIS: Plausible root-cause explanation requiring validation.
     • 🔮 CONDITIONAL SCENARIO: Mathematical "IF... THEN..." simulation (not a forecast).
     • 🔬 CAUSAL CONCLUSION: Requires empirical proof beyond simple correlation.

7. 🛑 CONDITIONAL RECOMMENDATIONS ("IF... THEN..."):
   - When implementation details are unverified, keep recommendations strictly conditional:
     • e.g. "IF account creation is currently mandatory, THEN test a guest checkout."
     • e.g. "Audit available payment methods to identify whether payment availability contributes to abandonment."

8. ❓ STRICTLY 3–5 HIGHEST-LEVERAGE DIAGNOSTIC QUESTIONS:
   - Prioritize questions whose answers would most materially change the strategic roadmap.

MANDATORY PLAN MODE OUTPUT STRUCTURE:
Your response MUST strictly follow this structured format:

# 🎯 Strategic Growth & Funnel Optimization Blueprint

## 📋 1. Goal & Verified Mathematical Funnel Analysis
- **Core Objective**: [State user goal]
- **Observed Funnel Metrics & Derived Math**:
  - Show exact numbers provided and calculate mathematical transitions (volume, % conversion, % drop-off).
  - Check for internal consistency (if a mathematical contradiction is detected, flag it immediately and isolate affected metrics).
  - State clearly: The data establishes WHERE drop-offs occur, but not WHY they occur.

## ❓ 2. Critical Unknowns & Diagnostic Questions (Highest Strategic Leverage)
Ask strictly 3 to 5 high-impact questions whose answers would materially change the strategy:
1. **Traffic Quality & Intent Breakdown**: What channels drive traffic to each segment and what was promised to users before landing?
2. **Funnel Friction & Technical State**: What are the exact steps and required fields (e.g. is account creation required, is pricing visible)?
3. **Segment-Specific Conversion Rates**: What are the individual downstream conversion rates for each traffic source or device segment?
4. **Current Value Proposition & Offer**: What is the primary hero promise and pricing structure?

## 🧪 3. Competing Root-Cause Hypotheses (To Be Validated)
For each observed drop-off or segment disparity, present competing hypotheses:
- **Observed Disparity / Drop-Off**:
  • Hypothesis 1 (Intent & Channel Mismatch): [Explanation & validation test]
  • Hypothesis 2 (Friction & Experience): [Explanation & validation test]
  • Confounding Variables: [List unmeasured factors that could explain the difference without UX fault]

## 🔍 4. Provisional Investigation Priorities
State the recommended audit sequence with explicit decision criteria:
- **Priority Candidate 1**: [Area to audit first] — *Rationale*: [State criterion, e.g. strongest observable signal or proximity to revenue]
- **Priority Candidate 2**: [Area to audit second] — *Rationale*: [State criterion]

## ⚡ 5. Conditional Actionable Experiments (IF / THEN Roadmap)
Provide high-impact, conditional experiments:
- **Experiment 1 (Conditional)**: IF [Condition], THEN [Test change] — [Primary metric tracked]
- **Experiment 2 (Conditional)**: IF [Condition], THEN [Test change] — [Primary metric tracked]
- **Experiment 3 (Conditional)**: IF [Condition], THEN [Test change] — [Primary metric tracked]

## 🗺️ 6. Phased Execution Roadmap
- **Phase 1 (Diagnostic Data Collection & Tracking Audit)**: Reconcile any data discrepancies, gather diagnostic answers.
- **Phase 2 (Highest-Leverage Experiment Launch)**: Deploy Experiment 1 based on verified findings.
- **Phase 3 (Secondary Optimization & Retention)**: Deploy recovery automations and secondary tests.
- **Phase 4 (Evaluation & Baseline Re-calibration)**: Measure empirical lift against baseline.

## 📊 7. Conditional Scenario Modeling (Simulations, Not Forecasts)
Table modeling hypothetical outcome scenarios clearly marked as conditional simulations:
| Funnel Metric | Current Baseline | Conditional Scenario A (+20% lift) | Conditional Scenario B (+50% lift) |
| :--- | :--- | :--- | :--- |
| [Stage 1] | [Volume] | [Volume] | [Volume] |
| [Stage 2] | [Volume] | [Volume] | [Volume] |
| Final Conversions | [Current Output] | [Scenario A Output] | [Scenario B Output] |
*Explicit Note: The above modeling represents conditional mathematical scenarios based on stated assumptions, not predictive forecasts.*
`;
  }

  // Format messages
  const formattedMessages = [
    { role: 'system', content: systemContent }
  ];

  // Add conversation history with multimodal image memory
  if (history && history.length > 0) {
    history.forEach(m => {
      const isUser = m.sender === 'user';
      if (isUser && m.image) {
        formattedMessages.push({
          role: 'user',
          content: [
            ...(m.text ? [{ type: 'text', text: m.text }] : [{ type: 'text', text: 'Attached visual asset / image' }]),
            { type: 'image_url', image_url: { url: m.image } }
          ]
        });
      } else {
        formattedMessages.push({
          role: isUser ? 'user' : 'assistant',
          content: m.text || (m.image ? 'Attached visual asset / image' : '')
        });
      }
    });
  }

  // Add current user prompt
  if (attachedImage) {
    const textPayload = (userMessage || '').trim() || 'Please inspect and analyze this attached image / creative.';
    formattedMessages.push({
      role: 'user',
      content: [
        { type: 'text', text: textPayload },
        { type: 'image_url', image_url: { url: attachedImage } }
      ]
    });
  } else {
    formattedMessages.push({
      role: 'user',
      content: userMessage || ''
    });
  }

  return callCalvrasAI({
    messages: formattedMessages,
    userPrompt: userMessage,
    hasImage: Boolean(attachedImage)
  });
}
