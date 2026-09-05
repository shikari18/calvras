import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Plus, 
  ChevronDown, 
  Check,
  Settings,
  Zap,
  ShoppingBag,
  MessageSquare,
  Sparkles,
  Bot,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Edit3,
  Tag,
  Clock,
  DollarSign,
  Store,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Bespoke Brand SVG Logos
const BrandLogos = {
  paystack: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-cyan-500">
      <path d="M2 4h20v3H2V4zm0 6h20v3H2v-3zm0 6h14v3H2v-3z" />
    </svg>
  ),
  woocommerce: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-purple-600">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.8 14.5l-3.2-3.2 1.4-1.4 1.8 1.8 4.8-4.8 1.4 1.4-6.2 6.2z"/>
    </svg>
  ),
  hubtel: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-emerald-600">
      <circle cx="12" cy="12" r="10" fill="#059669" />
      <path d="M8 12l3 3 5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  shopify: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-emerald-600">
      <path d="M19.9 6.2c-.1-.4-.5-.6-.9-.6h-.1c-.3.1-1.3.3-2.7.7-1.4.3-3.6.9-6.3 1.7L8.6 3.3C8.4 2.8 7.9 2.5 7.4 2.6c-.1 0-.3.1-.4.2L2.5 6.1C2.2 6.3 2 6.7 2.1 7.1l3.5 13.6c.1.5.5.8 1 .8h10.8c.5 0 .9-.3 1-.8l2.9-13.4c.1-.4 0-.8-.4-1.1zM8.3 4.4l1.1 3.8-3.4-.8L8.3 4.4zm3.9 14.5H6.4L3.6 7.8l5.8 1.4-1.2 4.3c-.1.5.1 1 .6 1.2.5.1 1-.1 1.2-.6l1.2-4.3 1.2.3-1.2 4.3c-.1.5.1 1 .6 1.2.5.1 1-.1 1.2-.6l1.2-4.3 1.2.3-3.1 11.2zm5.7-4.1l-2.1 4.1h-.2l2.6-9.5 2 1.4-2.3 4z"/>
    </svg>
  ),
  whatsapp: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-emerald-500">
      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.8 14.15c-.24.67-1.39 1.29-1.92 1.37-.5.08-1.14.12-3.69-.94-3.26-1.35-5.36-4.66-5.52-4.88-.16-.22-1.32-1.76-1.32-3.36 0-1.6 1.05-2.39 1.42-2.71.37-.32.8-.4 1.07-.4.27 0 .54.01.78.02.25.01.58-.09.91.7.34.81 1.16 2.83 1.26 3.03.1.2.17.44.03.71-.14.27-.21.44-.42.68-.21.24-.44.53-.63.71-.21.2-.43.42-.18.84.24.42 1.08 1.78 2.32 2.88 1.6 1.42 2.94 1.86 3.36 2.07.42.21.67.18.92-.11.25-.29 1.07-1.25 1.36-1.68.29-.43.58-.36.97-.22.39.14 2.48 1.17 2.9 1.38.42.21.7.32.8.49.1.17.1.99-.14 1.66z"/>
    </svg>
  ),
  meta: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-blue-600">
      <path d="M16.994 4.544c-2.316 0-4.321 1.254-5.006 3.094-.684-1.84-2.69-3.094-5.006-3.094C3.125 4.544 0 7.828 0 11.884c0 4.606 3.864 7.572 6.982 7.572 2.316 0 4.321-1.254 5.006-3.094.684 1.84 2.69 3.094 5.006 3.094 3.857 0 6.982-3.284 6.982-7.34 0-4.056-3.125-7.572-6.982-7.572zm-10.012 12.3c-2.28 0-4.37-2.096-4.37-4.96 0-2.863 2.09-4.959 4.37-4.959 2.28 0 4.37 2.096 4.37 4.96 0 2.863-2.09 4.959-4.37 4.959zm10.012 0c-2.28 0-4.37-2.096-4.37-4.96 0-2.863 2.09-4.959 4.37-4.959 2.28 0 4.37 2.096 4.37 4.96 0 2.863-2.09 4.959-4.37 4.959z" />
    </svg>
  ),
  tiktok: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-neutral-950">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  twitter: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-neutral-950">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  stripe: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-indigo-600">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.521.5 6.398.5 2.457 3.655 2.457 8.877c0 5.406 5.485 7.159 9.07 8.423 2.735.962 3.67 1.674 3.67 2.709 0 1.055-.992 1.547-2.368 1.547-2.483 0-5.467-1.189-7.391-2.23l-.93 5.618c1.868.966 5.093 1.556 8.321 1.556 6.394 0 10.709-3.087 10.709-8.527.001-5.321-5.011-7.292-9.562-8.823z"/>
    </svg>
  ),
  hubspot: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-orange-500">
      <path d="M18.8 8.1V5.5c.8-.4 1.4-1.2 1.4-2.2 0-1.4-1.1-2.5-2.5-2.5S15.2 1.9 15.2 3.3c0 1 .6 1.8 1.4 2.2v2.6c-1.3.5-2.4 1.4-3.1 2.6L7.2 6.8c.1-.3.1-.7.1-1C7.3 3.7 5.6 2 3.5 2S-.3 3.7-.3 5.8 1.4 9.6 3.5 9.6c.7 0 1.4-.2 1.9-.5l6.1 3.9c-.3.8-.4 1.6-.4 2.5 0 3.9 3.2 7.1 7.1 7.1s7.1-3.2 7.1-7.1c.1-3.4-2.4-6.4-5.8-7.1zM18.2 18.6c-2.4 0-4.3-1.9-4.3-4.3s1.9-4.3 4.3-4.3 4.3 1.9 4.3 4.3-1.9 4.3-4.3 4.3z"/>
    </svg>
  ),
  mailchimp: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-yellow-500">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm2-6c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-6 0C8.17 10.5 7.5 9.83 7.5 9s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
    </svg>
  ),
  google_ads: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5">
      <path fill="#FBBC05" d="M12 2L2 19.5h7L14 10z"/>
      <path fill="#4285F4" d="M22 19.5h-7L7 5h7z"/>
      <circle cx="5" cy="19" r="3" fill="#34A853"/>
    </svg>
  ),
  google_analytics: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-amber-500">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-5h2v5zm4 0h-2v-9h2v9zm4 0h-2V7h2v10z"/>
    </svg>
  ),
  linkedin: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-blue-700">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.74c-.95 0-1.72.77-1.72 1.72s.77 1.72 1.72 1.72 1.72-.77 1.72-1.72-.77-1.72-1.72-1.72z"/>
    </svg>
  ),
  apollo: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-amber-500">
      <path d="M12 2L14.4 9.6H22L15.8 14.2L18.2 21.8L12 17.2L5.8 21.8L8.2 14.2L2 9.6H9.6L12 2Z" />
    </svg>
  ),
  generic: () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-neutral-600">
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
};

const INITIAL_CONNECTORS = [
  {
    id: 'paystack',
    name: 'Paystack Store & Payments',
    tag: 'E-COMMERCE & MOMO',
    connected: false,
    statusText: 'Not connected',
    isStoreApp: true,
    logo: BrandLogos.paystack,
    desc: 'Auto-trigger instant VIP WhatsApp post-purchase upsells, Mobile Money checkout confirmations, and automated receipt messaging.'
  },
  {
    id: 'shopify',
    name: 'Shopify Store',
    tag: 'E-COMMERCE STORE',
    connected: false,
    statusText: 'Not connected',
    isStoreApp: true,
    logo: BrandLogos.shopify,
    desc: 'Sync product catalog, auto-post new arrivals to TikTok & Instagram, and send abandoned cart recovery discounts on WhatsApp.'
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce / WordPress',
    tag: 'E-COMMERCE STORE',
    connected: false,
    statusText: 'Not connected',
    isStoreApp: true,
    logo: BrandLogos.woocommerce,
    desc: 'Connect your WordPress store to automatically broadcast flash sales and send customer post-delivery 5-star review prompts.'
  },
  {
    id: 'hubtel',
    name: 'Hubtel Mobile Money',
    tag: 'GHANA PAYMENTS',
    connected: false,
    statusText: 'Not connected',
    isStoreApp: true,
    logo: BrandLogos.hubtel,
    desc: 'Receive instant alerts on MTN MoMo, Telecel Cash & AT Money transactions with automated customer receipts and upsells.'
  },
  {
    id: 'whatsapp-business',
    name: 'WhatsApp Business API',
    tag: 'MANAGED',
    connected: false,
    statusText: 'Not connected',
    isStoreApp: true,
    logo: BrandLogos.whatsapp,
    desc: 'Automate direct broadcast messages, order confirmations, VIP offers, and customer engagement directly via WhatsApp.'
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads Manager',
    tag: 'MANAGED',
    connected: false,
    statusText: 'Not connected',
    logo: BrandLogos.meta,
    desc: 'Automate ad campaign creation, budget optimization, and lead collection across Instagram and Facebook.'
  },
  {
    id: 'tiktok-business',
    name: 'TikTok for Business',
    tag: 'MANAGED',
    connected: false,
    statusText: 'Not connected',
    logo: BrandLogos.tiktok,
    desc: 'Publish short viral videos, analyze video hook engagement, and launch Spark Ads.'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    tag: 'MANAGED',
    connected: false,
    statusText: 'Not connected',
    logo: BrandLogos.twitter,
    desc: 'Twitter / X is a social media platform for sharing real-time updates, conversations, and trending topics.'
  },
  {
    id: 'stripe',
    name: 'Stripe Payments',
    tag: 'MANAGED',
    connected: false,
    statusText: 'Not connected',
    logo: BrandLogos.stripe,
    desc: 'Accept payments, monitor recurring subscriptions, track revenue attribution, and trigger post-purchase flows.'
  },
  {
    id: 'hubspot',
    name: 'HubSpot CRM',
    tag: 'MANAGED',
    connected: false,
    statusText: 'Not connected',
    logo: BrandLogos.hubspot,
    desc: 'Full inbound marketing suite, CRM pipeline management, and contact lead scoring.'
  },
  {
    id: 'google-ads',
    name: 'Google Ads',
    tag: 'SEARCH & DISPLAY',
    connected: false,
    statusText: 'Not connected',
    logo: BrandLogos.google_ads,
    desc: 'Sync high-intent Google search keywords, optimize CPC bids, and launch Performance Max campaigns.'
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics 4',
    tag: 'ANALYTICS & ATTRIBUTION',
    connected: false,
    statusText: 'Not connected',
    logo: BrandLogos.google_analytics,
    desc: 'Track web traffic attribution, real-time funnel conversions, and revenue per source.'
  },
  {
    id: 'linkedin',
    name: 'LinkedIn Ads & B2B Leads',
    tag: 'B2B MARKETING',
    connected: false,
    statusText: 'Not connected',
    logo: BrandLogos.linkedin,
    desc: 'Target business decision makers, founders, and B2B corporate leads across Africa & global markets.'
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    tag: 'MANAGED',
    connected: false,
    statusText: 'Not connected',
    logo: BrandLogos.mailchimp,
    desc: 'Email marketing platform for newsletters, automated drip campaigns, and audience segmentation.'
  }
];

export const CyConnectorsPage = ({ userName = 'User' }) => {
  const [connectors, setConnectors] = useState(() => {
    try {
      const saved = localStorage.getItem('calvras_connectors_state');
      if (saved) {
        const savedMap = JSON.parse(saved);
        return INITIAL_CONNECTORS.map(c => {
          const isConn = Boolean(savedMap[c.id]);
          return {
            ...c,
            connected: isConn,
            statusText: isConn ? (c.isStoreApp ? 'Connected & Listening' : 'Platform') : 'Not connected'
          };
        });
      }
    } catch {}
    return INITIAL_CONNECTORS;
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Store Connector Configuration Drawer
  const [selectedStoreApp, setSelectedStoreApp] = useState(null);
  const [upsellEnabled, setUpsellEnabled] = useState(true);
  const [abandonedCartEnabled, setAbandonedCartEnabled] = useState(true);
  const [autoSocialSyncEnabled, setAutoSocialSyncEnabled] = useState(true);
  
  // Full Customization Fields
  const [storeName, setStoreName] = useState(userName ? `${userName}'s Store` : 'My Store');
  const [sampleCustomerName, setSampleCustomerName] = useState('Alex');
  const [sampleProductBought, setSampleProductBought] = useState('Premium Headphones');
  const [upsellItemName, setUpsellItemName] = useState('Protective Case & Cable');
  const [upsellPrice, setUpsellPrice] = useState('$25');
  const [originalPrice, setOriginalPrice] = useState('$50');
  const [discountPercent, setDiscountPercent] = useState('20%');
  const [offerTimer, setOfferTimer] = useState('15 minutes');
  const [sendDelay, setSendDelay] = useState('15 seconds (Instant)');
  
  // Fully Editable WhatsApp Message Template
  const [whatsappTemplate, setWhatsappTemplate] = useState(
    `🎉 Hi {customer_name}! Thanks for ordering {purchased_item} from {store_name}.\n\nBecause you ordered today, we unlocked an exclusive {discount_percent} VIP Package Deal: Add our {upsell_item} for just {upsell_price} (usually {original_price}) shipped in the same box with FREE delivery!\n\n⏳ Offer expires in {offer_timer}. Reply YES to add to your order.`
  );

  // Fully Editable Abandoned Cart Template
  const [abandonedCartTemplate, setAbandonedCartTemplate] = useState(
    `👋 Hi {customer_name}, we noticed you left items in your cart at {store_name}!\n\nUse code FREESHIP at checkout for 100% Free Express Delivery today.\n\n👉 Complete your order here: {checkout_link}`
  );

  const [activeTabInsideModal, setActiveTabInsideModal] = useState('upsell'); // 'upsell' | 'cart' | 'settings'
  const [testSent, setTestSent] = useState(false);

  const connectedCount = connectors.filter(c => c.connected).length;
  const storeAppsCount = connectors.filter(c => c.isStoreApp).length;

  const filterTabs = [
    { id: 'All', label: 'All', count: connectors.length },
    { id: 'Store Apps', label: 'Store & Payments', count: storeAppsCount },
    { id: 'Connected', label: 'Connected', count: connectedCount },
    { id: 'Social', label: 'Social & Ads', count: 3 }
  ];

  const filteredConnectors = useMemo(() => {
    return connectors.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            c.desc.toLowerCase().includes(searchQuery.toLowerCase());
      if (!matchesSearch) return false;

      if (activeFilter === 'All') return true;
      if (activeFilter === 'Store Apps') return c.isStoreApp;
      if (activeFilter === 'Connected') return c.connected;
      if (activeFilter === 'Social') return ['meta-ads', 'tiktok-business', 'twitter'].includes(c.id);
      return true;
    });
  }, [connectors, searchQuery, activeFilter]);

  const toggleConnect = (id) => {
    setConnectors(prev => {
      const updated = prev.map(c => {
        if (c.id === id) {
          const nextState = !c.connected;
          return {
            ...c,
            connected: nextState,
            statusText: nextState ? (c.isStoreApp ? 'Connected & Listening' : 'Platform') : 'Not connected'
          };
        }
        return c;
      });
      try {
        const stateMap = {};
        updated.forEach(c => { stateMap[c.id] = c.connected; });
        localStorage.setItem('calvras_connectors_state', JSON.stringify(stateMap));
      } catch {}
      return updated;
    });
  };

  const handleSendTestUpsell = () => {
    setTestSent(true);
    try { confetti({ particleCount: 40, spread: 50 }); } catch (e) {}
    setTimeout(() => setTestSent(false), 3000);
  };

  // Helper to insert variable tags into textarea
  const insertTag = (tag) => {
    setWhatsappTemplate(prev => prev + ' ' + tag);
  };

  // Render dynamic live WhatsApp message based on user template and variables
  const renderedLiveMessage = useMemo(() => {
    let text = whatsappTemplate;
    text = text.replace(/{customer_name}/g, sampleCustomerName || 'Kwame');
    text = text.replace(/{purchased_item}/g, sampleProductBought || 'Product');
    text = text.replace(/{store_name}/g, storeName || 'My Store');
    text = text.replace(/{discount_percent}/g, discountPercent || '20%');
    text = text.replace(/{upsell_item}/g, upsellItemName || 'Accessory');
    text = text.replace(/{upsell_price}/g, upsellPrice || '40 GHS');
    text = text.replace(/{original_price}/g, originalPrice || '80 GHS');
    text = text.replace(/{offer_timer}/g, offerTimer || '15 minutes');
    return text;
  }, [whatsappTemplate, sampleCustomerName, sampleProductBought, storeName, discountPercent, upsellItemName, upsellPrice, originalPrice, offerTimer]);

  const renderedCartMessage = useMemo(() => {
    let text = abandonedCartTemplate;
    text = text.replace(/{customer_name}/g, sampleCustomerName || 'Kwame');
    text = text.replace(/{store_name}/g, storeName || 'My Store');
    return text;
  }, [abandonedCartTemplate, sampleCustomerName, storeName]);

  const applyPresetTone = (presetType) => {
    if (presetType === 'local') {
      setWhatsappTemplate(`🇬🇭 Chale {customer_name}! Big thanks for ordering {purchased_item} from {store_name}.\n\nQuick heads up: We unlocked a VIP add-on deal just for you today. Add our {upsell_item} for just {upsell_price} (was {original_price}) and we will pack it inside your delivery for FREE!\n\n⏳ Deal ends in {offer_timer}. Just reply YES to add am.`);
    } else if (presetType === 'urgent') {
      setWhatsappTemplate(`⚡ URGENT VIP OFFER for {customer_name}:\n\nYour order of {purchased_item} is confirmed. Get {discount_percent} OFF on {upsell_item} ({upsell_price} instead of {original_price}) before packaging closes!\n\n⏳ {offer_timer} left. Reply YES immediately to claim.`);
    } else if (presetType === 'clean') {
      setWhatsappTemplate(`🎉 Hi {customer_name}! Thank you for your order at {store_name}.\n\nAs a valued customer, you qualify for an exclusive {discount_percent} discount on our {upsell_item} at {upsell_price} (original {original_price}) with free shipping.\n\n⏳ Valid for {offer_timer}. Reply YES to include this in your delivery.`);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#1c1c1c] text-[#f4f4ee] p-6 sm:p-10 font-sans antialiased text-white select-none text-left overflow-y-auto">
      <div className="max-w-7xl mx-auto space-y-6 pt-2 sm:pt-4">
        
        {/* Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-serif font-normal text-white tracking-tight">
              Connectors & Store Apps
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-normal">
              Connect your online store, payment gateways, and social accounts for <strong>{userName}'s Business</strong> to automate WhatsApp VIP upsells, inventory posting, and ad campaigns.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/80 flex items-center gap-1.5">
              <Zap size={13} className="text-purple-600" />
              <span>{connectedCount} Active Connectors</span>
            </span>
          </div>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
          
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`text-xs px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  activeFilter === tab.id
                    ? 'bg-[#efeff1] text-white font-semibold shadow-2xs'
                    : 'text-neutral-400 hover:text-white hover:bg-white/10/60'
                }`}
              >
                <span>{tab.label}</span>
                <span className="text-[11px] text-neutral-400 font-normal">{tab.count}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search store apps & connectors..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-[#282828] border border-white/10 hover:border-neutral-400 focus:border-neutral-900 rounded-xl text-white placeholder:text-neutral-400 focus:outline-none transition"
            />
          </div>

        </div>

        {/* Connectors Grid with Real Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
          {filteredConnectors.map((c) => {
            const LogoComponent = c.logo;
            return (
              <div 
                key={c.id} 
                className="bg-[#282828] border border-white/10 hover:border-neutral-400 rounded-2xl p-4 shadow-2xs flex flex-col justify-between space-y-4 transition group"
              >
                <div className="space-y-2.5">
                  
                  {/* Card Top: Real Logo, Name, Status, Tag */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-50 border border-white/5 flex items-center justify-center shadow-2xs shrink-0">
                        <LogoComponent />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-white">{c.name}</h3>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className={`w-2 h-2 rounded-full ${c.connected ? 'bg-emerald-500' : 'bg-neutral-300'}`} />
                          <span className="text-[11px] text-neutral-400 font-normal">{c.statusText}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[9.5px] font-semibold text-neutral-400 tracking-wider bg-neutral-100 px-2 py-0.5 rounded uppercase">
                      {c.tag}
                    </span>
                  </div>

                  {/* Card Description */}
                  <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                    {c.desc}
                  </p>
                </div>

                {/* Card Actions */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                  {c.isStoreApp && (
                    <button
                      onClick={() => setSelectedStoreApp(c)}
                      className="text-xs text-purple-700 hover:text-purple-900 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Settings size={12} />
                      <span>Customize Automations</span>
                    </button>
                  )}

                  <button
                    onClick={() => toggleConnect(c.id)}
                    className={`ml-auto text-xs px-3 py-1.5 rounded-xl font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                      c.connected
                        ? 'bg-neutral-100 hover:bg-rose-50 hover:text-rose-600 text-neutral-700'
                        : 'bg-neutral-950 hover:bg-neutral-800 text-white shadow-2xs'
                    }`}
                  >
                    {c.connected ? (
                      <>
                        <Check size={12} className="text-emerald-600" />
                        <span>Connected</span>
                      </>
                    ) : (
                      <>
                        <Plus size={12} />
                        <span>Connect</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* 100% FULLY CUSTOMIZABLE STORE AUTOMATIONS MODAL */}
      {selectedStoreApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#282828] border border-white/10 rounded-3xl max-w-3xl w-full p-5 sm:p-7 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200 text-left my-auto max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100">
                  {React.createElement(selectedStoreApp.logo)}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>{selectedStoreApp.name} Automations</span>
                    <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                      100% Customizable
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Customize every word, price, discount, timer, and variable sent to your customers on WhatsApp.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedStoreApp(null)}
                className="text-neutral-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs Inside Modal */}
            <div className="flex items-center gap-2 border-b border-white/10/80">
              <button
                onClick={() => setActiveTabInsideModal('upsell')}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  activeTabInsideModal === 'upsell'
                    ? 'border-purple-600 text-purple-900'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles size={13} />
                <span>1. Post-Purchase VIP WhatsApp</span>
              </button>

              <button
                onClick={() => setActiveTabInsideModal('cart')}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  activeTabInsideModal === 'cart'
                    ? 'border-purple-600 text-purple-900'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <ShoppingBag size={13} />
                <span>2. Abandoned Cart Recovery</span>
              </button>

              <button
                onClick={() => setActiveTabInsideModal('settings')}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold border-b-2 transition cursor-pointer ${
                  activeTabInsideModal === 'settings'
                    ? 'border-purple-600 text-purple-900'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Settings size={13} />
                <span>3. Store & Delay Settings</span>
              </button>
            </div>

            {/* TAB 1: POST-PURCHASE VIP UPSELL */}
            {activeTabInsideModal === 'upsell' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                
                {/* Main Toggle */}
                <div className="flex items-center justify-between p-3.5 bg-purple-50/50 border border-purple-100 rounded-2xl">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles size={14} className="text-purple-600" />
                      <span>Enable Post-Purchase WhatsApp VIP Upsell</span>
                    </span>
                    <p className="text-[11px] text-neutral-400">
                      Fires automatically whenever a customer completes payment on {selectedStoreApp.name}.
                    </p>
                  </div>
                  <input 
                    type="checkbox"
                    checked={upsellEnabled}
                    onChange={(e) => setUpsellEnabled(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                  />
                </div>

                {/* Customizable Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-neutral-600 flex items-center gap-1">
                      <Tag size={12} />
                      <span>VIP Offer Item Name</span>
                    </label>
                    <input 
                      type="text"
                      value={upsellItemName}
                      onChange={(e) => setUpsellItemName(e.target.value)}
                      placeholder="e.g. 10m Booster Cable"
                      className="w-full bg-[#282828] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-neutral-600 flex items-center gap-1">
                      <DollarSign size={12} />
                      <span>VIP Price / Original</span>
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input 
                        type="text"
                        value={upsellPrice}
                        onChange={(e) => setUpsellPrice(e.target.value)}
                        placeholder="40 GHS"
                        className="w-1/2 bg-[#282828] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-600 font-medium"
                      />
                      <input 
                        type="text"
                        value={originalPrice}
                        onChange={(e) => setOriginalPrice(e.target.value)}
                        placeholder="80 GHS"
                        className="w-1/2 bg-[#282828] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-neutral-400 line-through focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-neutral-600 flex items-center gap-1">
                      <Clock size={12} />
                      <span>Urgency Countdown</span>
                    </label>
                    <select
                      value={offerTimer}
                      onChange={(e) => setOfferTimer(e.target.value)}
                      className="w-full bg-[#282828] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-purple-600"
                    >
                      <option value="10 minutes">10 minutes</option>
                      <option value="15 minutes">15 minutes (Best)</option>
                      <option value="30 minutes">30 minutes</option>
                      <option value="1 hour">1 hour</option>
                    </select>
                  </div>
                </div>

                {/* 1-Click Tone Presets */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Tone Presets:</span>
                  <button 
                    onClick={() => applyPresetTone('local')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 font-medium text-neutral-200 transition cursor-pointer"
                  >
                    🇬🇭 Ghanaian VIP Style
                  </button>
                  <button 
                    onClick={() => applyPresetTone('clean')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 font-medium text-neutral-200 transition cursor-pointer"
                  >
                    ✨ Sleek & Clean
                  </button>
                  <button 
                    onClick={() => applyPresetTone('urgent')}
                    className="text-[11px] px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 font-medium text-neutral-200 transition cursor-pointer"
                  >
                    ⚡ Flash Urgency
                  </button>
                </div>

                {/* Fully Editable Message Textarea */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Edit3 size={13} className="text-purple-600" />
                      <span>Custom WhatsApp Message Template (Edit Freely)</span>
                    </label>
                    <span className="text-[11px] text-neutral-400 font-mono">Dynamic Tag Mode</span>
                  </div>

                  <textarea
                    rows={4}
                    value={whatsappTemplate}
                    onChange={(e) => setWhatsappTemplate(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-3 text-xs text-white font-sans leading-relaxed focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600 shadow-2xs"
                  />

                  {/* Variable Tag Pills */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-1">
                    <span className="text-[10.5px] font-medium text-neutral-400">Click to insert tag:</span>
                    {[
                      '{customer_name}',
                      '{purchased_item}',
                      '{store_name}',
                      '{discount_percent}',
                      '{upsell_item}',
                      '{upsell_price}',
                      '{original_price}',
                      '{offer_timer}'
                    ].map(tag => (
                      <button
                        key={tag}
                        onClick={() => insertTag(tag)}
                        className="px-2 py-0.5 bg-neutral-100 hover:bg-purple-100 hover:text-purple-900 border border-white/10 rounded-md font-mono text-[10px] text-neutral-600 transition cursor-pointer"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* LIVE EVALUATED WHATSAPP PREVIEW */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                      <Smartphone size={13} className="text-emerald-600" />
                      <span>Live WhatsApp Chat Preview (Exactly What Customer Receives)</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      WhatsApp Verified
                    </span>
                  </div>

                  <div className="bg-[#e7f8e8] border border-emerald-200/90 rounded-2xl p-4 text-xs text-white leading-relaxed font-sans shadow-sm whitespace-pre-line">
                    {renderedLiveMessage}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: ABANDONED CART RECOVERY */}
            {activeTabInsideModal === 'cart' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                
                <div className="flex items-center justify-between p-3.5 bg-purple-50/50 border border-purple-100 rounded-2xl">
                  <div className="space-y-0.5">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShoppingBag size={14} className="text-purple-600" />
                      <span>Enable Abandoned Cart Recovery</span>
                    </span>
                    <p className="text-[11px] text-neutral-400">
                      Automatically message shoppers who leave checkout without paying on {selectedStoreApp.name}.
                    </p>
                  </div>
                  <input 
                    type="checkbox"
                    checked={abandonedCartEnabled}
                    onChange={(e) => setAbandonedCartEnabled(e.target.checked)}
                    className="w-4 h-4 accent-purple-600 rounded cursor-pointer"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Edit3 size={13} className="text-purple-600" />
                    <span>Abandoned Cart Message Template</span>
                  </label>

                  <textarea
                    rows={4}
                    value={abandonedCartTemplate}
                    onChange={(e) => setAbandonedCartTemplate(e.target.value)}
                    className="w-full bg-white border border-neutral-300 rounded-xl p-3 text-xs text-white font-sans leading-relaxed focus:outline-none focus:border-purple-600 shadow-2xs"
                  />
                </div>

                <div className="bg-[#e7f8e8] border border-emerald-200/90 rounded-2xl p-4 text-xs text-white leading-relaxed font-sans shadow-sm whitespace-pre-line">
                  {renderedCartMessage}
                </div>

              </div>
            )}

            {/* TAB 3: STORE & TIMING SETTINGS */}
            {activeTabInsideModal === 'settings' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-200 block">Your Store / Brand Name</label>
                    <input 
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full bg-[#282828] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-200 block">Message Dispatch Delay</label>
                    <select
                      value={sendDelay}
                      onChange={(e) => setSendDelay(e.target.value)}
                      className="w-full bg-[#282828] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-600"
                    >
                      <option value="15 seconds (Instant)">15 seconds (Instant after payment)</option>
                      <option value="2 minutes">2 minutes</option>
                      <option value="5 minutes">5 minutes</option>
                      <option value="15 minutes">15 minutes</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-200 block">Sample Customer Name for Testing</label>
                    <input 
                      type="text"
                      value={sampleCustomerName}
                      onChange={(e) => setSampleCustomerName(e.target.value)}
                      className="w-full bg-[#282828] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-neutral-200 block">Sample Product Purchased</label>
                    <input 
                      type="text"
                      value={sampleProductBought}
                      onChange={(e) => setSampleProductBought(e.target.value)}
                      className="w-full bg-[#282828] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-600"
                    />
                  </div>

                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                onClick={handleSendTestUpsell}
                className="text-xs font-semibold text-purple-700 hover:text-purple-900 px-3.5 py-2 rounded-xl border border-purple-200 hover:bg-purple-50 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs"
              >
                {testSent ? <Check size={14} className="text-emerald-600" /> : <Smartphone size={14} />}
                <span>{testSent ? '✓ Test WhatsApp Message Sent!' : 'Send Test WhatsApp to My Phone'}</span>
              </button>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setSelectedStoreApp(null)}
                  className="text-xs text-neutral-400 hover:text-white px-3 py-2 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                
                <button
                  onClick={() => {
                    setSelectedStoreApp(null);
                    try { confetti({ particleCount: 50, spread: 60 }); } catch (e) {}
                  }}
                  className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer shadow-xs"
                >
                  Save & Apply Custom Automations
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
