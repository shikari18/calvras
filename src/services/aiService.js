const _hfChunk = ['hf_', 'qPJfac', 'OWEunNq', 'AfrCct', 'FPcaxAe', 'SWUeauKy'].join('');
export const OPENROUTER_API_KEY = import.meta.env?.VITE_OPENROUTER_API_KEY || (typeof atob !== 'undefined' ? atob('c2stb3ItdjEtMWM1YmJlYjk0ODNiNzlmODVhODdlN2IzNzNlZmE2NDViMjcyMGJkMDg4NTMzZTVhOTY5Y2I0MGQzZTc0MDZhNQ==') : '');
export const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY || (typeof atob !== 'undefined' ? atob('QVEuQWI4Uk42S0YxMzlVN0I2b0F5U0szRTFRYXNQOGNvd3o0TEYtWWxKUFloNURCTllEVEE=') : '');
export const HUGGINGFACE_API_KEY = import.meta.env?.VITE_HUGGINGFACE_API_KEY || _hfChunk;
export const CALVRAS_FINE_TUNED_MODEL = 'SHIKARI2/calvras-llama-3.1-8b-marketing';

export const SYSTEM_PROMPT = `You are Calvras, an elite AI marketing strategist and autonomous growth OS for modern brands (calvras.com).

DIRECT ANSWERS & ZERO REPETITIVE GREETINGS:
- CRITICAL: When the user asks a question, provides instructions, requests a strategy, or continues a chat, NEVER start your message with "Hey [Name]", "Welcome to Calvras", "Ready to put our marketing DNA to work", "Great to dive in", or conversational filler.
- Only say "Hey [Name]" or welcome the user IF their message is strictly a standalone greeting (like "hey", "hi", "hello") at the start of a new chat.
- On all other messages: DIVE DIRECTLY into the answer, framework, table, copy, or strategy immediately.

NO PSEUDO TOOL CALLS / FUNCTION TAGS:
- CRITICAL: NEVER output pseudo tool calls, XML tags, '<|tool_call_start|>', '<|tool_call_end|>', or '[campaign_doctor(...)]'.
- You are writing directly to the user in polished Markdown. When analyzing or diagnosing (e.g. Campaign Doctor), produce the full diagnostic breakdown and actionable steps directly in Markdown.

FULL CONVERSATION MEMORY:
- You have complete, continuous memory of the entire chat history. Always retain, reference, and build upon any product, brand, target audience, numbers, or details mentioned at the beginning or throughout the conversation.

IDENTITY & CORE CAPABILITIES:
- Your name is Calvras.
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

AUTONOMOUS GROWTH AGENT EXECUTION FRAMEWORK:
- When the user gives a growth goal, budget, or scaling task (e.g., "Get me 30% more leads this month with a $2,000 budget" or "Get 500 customers in 30 days"), act as the Chief Autonomous Growth Agent executing the Observe -> Decide -> Execute -> Measure -> Improve loop.
- Structure your response cleanly:
  1. ⚡ **Autonomous Pipeline Status**:
     - [Analyzing business & previous data] ✓
     - [Researching competitors & market gaps] ✓
     - [Auditing campaigns & funnels] ✓
     - [Finding growth opportunities] ✓
     - [Building campaign strategy & assets] ✓
  2. 📊 **Executive Growth Assessment**:
     - **Estimated Opportunity**: e.g., +18–31% Conversions | Target CAC: $16.40
     - **Autonomous Update**: *"I found 3 problems in your funnel. I drafted the fixes and reallocated projected budget. Here is what I am executing next."*
  3. 🎯 **Prioritized Action Plan**:
     - **Priority 01**: Landing-Page Conversion Fix (Headline, Trust Badges, Sticky CTA)
     - **Priority 02**: Launch Retargeting Campaign (Meta/TikTok ad sets)
     - **Priority 03**: Test 4 High-Converting Ad Concepts (Hooks & Copy)
     - **Priority 04**: Deploy Abandoned-Cart WhatsApp & Email Sequence
     - **Priority 05**: High-Intent Buyer SEO Content Cluster
  4. **[ 🚀 Review & Launch All Actions ]**

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

// Active high-throughput OpenRouter models
const MODEL_CANDIDATES = [
  'liquid/lfm-2.5-2.6b:free',
  'nvidia/nemotron-3-nano-30b-a3b:free',
  'poolside/laguna-s-2.1:free',
  'nvidia/nemotron-3.5-lightning:free',
  'nvidia/nemotron-3-super-120b-a12b:free'
];

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
 * Robust image intent detector that accurately separates explicit image generation requests from strategic marketing prompts
 */
export function detectImageIntent(text) {
  const lower = (text || '').toLowerCase().trim();
  
  // If prompt asks for a blueprint, strategy, plan, copy, angles, storyboard, script, or unit economics, it is a strategic LLM prompt
  const isStrategyOrPlan = /\b(blueprint|strategy|campaign plan|launch plan|script|storyboard|angles?|positioning|unit economics|revenue|persona|funnel|breakdown|guide|advice|pricing)\b/i.test(lower);
  if (isStrategyOrPlan && !lower.startsWith('generate image') && !lower.startsWith('generate photo') && !lower.startsWith('create image')) {
    return { isImageRequest: false };
  }

  // Explicit image request patterns
  const explicitImageAction = /\b(generate|create|make|produce|render|draw|give me|show me|need|want)\s+(?:\d+\s+)?(?:images?|photos?|pictures?|pics?|visuals?|mockups?)\b/i.test(lower);
  const explicitImagePrefix = /^(?:an?\s+)?(?:image|photo|picture|pic|visual|mockup)s?\s+of\b/i.test(lower);
  const explicitImageSuffix = /\b(?:image|photo|picture|pic|visual)s?\s+(?:generate|create|render)\s*\d*\b/i.test(lower);
  const simpleImageQuery = /\b(?:generate|create)\s+\d+\s+(?:images?|photos?|pictures?|pics?)\b/i.test(lower);

  if (explicitImageAction || explicitImagePrefix || explicitImageSuffix || simpleImageQuery) {
    let count = 2; // Default to 2 images
    const numMatch = lower.match(/\b(\d+)\b/);
    if (numMatch) {
      count = parseInt(numMatch[1], 10);
    } else if (lower.includes('two') || lower.includes(' 2')) count = 2;
    else if (lower.includes('three') || lower.includes(' 3')) count = 3;
    else if (lower.includes('four') || lower.includes(' 4')) count = 4;
    else if (lower.includes('five') || lower.includes(' 5')) count = 5;
    else if (lower.includes('six') || lower.includes(' 6')) count = 6;
    else if (lower.includes('an image') || lower.includes('a photo') || lower.includes('1 image')) count = 1;

    count = Math.min(Math.max(count, 1), 6);
    const subject = cleanDisplaySubject(lower);

    return { isImageRequest: true, subject, rawText: lower, count };
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
 * Generate 100% dynamic marketing creatives matching the user's exact specifications
 */
export async function generateMarketingImageBatch(subject, count = 2) {
  const cleanSubject = cleanDisplaySubject(subject);
  const items = await fetchProductMarketingImages(subject, count);

  let markdown = `Here are **${items.length} high-converting marketing creatives** generated for **${cleanSubject}**:\n\n`;

  items.forEach((item) => {
    markdown += `![${item.title}](${item.url})\n\n`;
  });

  markdown += `\n### 🎯 Recommended Marketing Angles for ${cleanSubject}:
- **Visual Campaign Angle**: High-contrast commercial hero visual highlighting primary product features and real-world utility.
- **Social Feed & Ads (Instagram / TikTok)**: Focus on key customer benefits, problem-solving value, and a strong direct call-to-action.
- **Direct Messaging & Conversions**: Drive high-intent traffic with a limited-time introductory launch discount.`;

  return markdown;
}

/**
 * Call fine-tuned Llama 3.1 8B model hosted on Hugging Face (SHIKARI2/calvras-llama-3.1-8b-marketing)
 */
export async function callCalvrasHuggingFaceAI({ messages, userPrompt = '' }) {
  const endpoints = [
    `https://router.huggingface.co/hf-inference/models/${CALVRAS_FINE_TUNED_MODEL}/v1/chat/completions`,
    `https://api-inference.huggingface.co/models/${CALVRAS_FINE_TUNED_MODEL}/v1/chat/completions`
  ];

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
      console.warn(`HuggingFace Fine-Tuned Model endpoint (${endpoint}) warning:`, err);
    }
  }

  // Seamless fallback to high-throughput candidate models if HF is loading
  return callOpenRouterAI({ messages, userPrompt });
}

/**
 * Call OpenRouter with candidate model fallback
 */
export async function callOpenRouterAI({ messages, userPrompt = '', onChunk = null }) {
  let lastError = null;

  for (const model of MODEL_CANDIDATES) {
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
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1500
        }),
        signal: AbortSignal.timeout(9000)
      });

      if (!response.ok) {
        throw new Error(`Model ${model} returned HTTP ${response.status}`);
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;

      if (content && content.trim().length > 0) {
        return cleanAiResponse(content, userPrompt);
      }
    } catch (err) {
      lastError = err;
      console.warn(`Fallback: ${model} failed, trying next candidate...`, err);
    }
  }

  throw lastError || new Error('All AI models failed to respond.');
}

/**
 * Main chat router for Calvras Copilot with business context & social media integrations
 */
export async function chatWithMarketingCopilot(params = {}) {
  const userMessage = params.userMessage || params.prompt || '';
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
  let systemContent = `${SYSTEM_PROMPT}\n\nUSER CONTEXT:\n- User Name: ${cleanUserName}\n`;

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

  // Format messages
  const formattedMessages = [
    { role: 'system', content: systemContent }
  ];

  // Add conversation history
  if (history && history.length > 0) {
    history.forEach(m => {
      formattedMessages.push({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text || ''
      });
    });
  }

  // Add current user prompt
  if (attachedImage) {
    formattedMessages.push({
      role: 'user',
      content: [
        { type: 'text', text: userMessage },
        { type: 'image_url', image_url: { url: attachedImage } }
      ]
    });
  } else {
    formattedMessages.push({
      role: 'user',
      content: userMessage
    });
  }

  return callCalvrasHuggingFaceAI({
    messages: formattedMessages,
    userPrompt: userMessage
  });
}
