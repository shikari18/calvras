import React, { useState } from 'react';
import { 
  Home, 
  Megaphone, 
  FileText, 
  Users, 
  BarChart2, 
  Bot, 
  Settings, 
  HelpCircle, 
  Rocket, 
  ArrowLeft, 
  ArrowRight, 
  UploadCloud, 
  Plus, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Target, 
  Calendar, 
  DollarSign, 
  Tag, 
  MessageSquare, 
  Globe, 
  Store, 
  Mail, 
  MessageCircle, 
  Edit3, 
  Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useMarketing } from '../../context/MarketingContext';
import { generateFullCampaignSuite } from '../../services/aiService';

// Custom Crisp Brand SVGs
const InstagramSvg = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookSvg = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokSvg = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const WhatsAppSvg = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

export const NewCampaignPage = ({ onNavigate, onCampaignCreated }) => {
  const { businessProfile, updateBusinessProfile, addCampaign } = useMarketing();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // STEP 1 STATE: Product details with zero hardcoded dummy values
  const [productImages, setProductImages] = useState([]);
  const [productName, setProductName] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [keyFeatures, setKeyFeatures] = useState([
    { id: 1, text: '', checked: true }
  ]);
  const [priceRange, setPriceRange] = useState('');
  const [variants, setVariants] = useState('');

  // STEP 2 STATE: Campaign Details
  const [campaignGoal, setCampaignGoal] = useState('Increase Sales');
  const [campaignType, setCampaignType] = useState('Product Launch');
  const [duration, setDuration] = useState('7 Days');
  const [budget, setBudget] = useState('1000');
  const [offer, setOffer] = useState('');
  const [keyMessage, setKeyMessage] = useState('');
  const [campaignNotes, setCampaignNotes] = useState('');

  // STEP 3 STATE: Audience & Goals (Consistent 18–30)
  const [audienceDesc, setAudienceDesc] = useState('');
  const [ageRange, setAgeRange] = useState('18 – 30');
  const [gender, setGender] = useState('All');
  const [location, setLocation] = useState('Accra, Ghana');
  const [interests, setInterests] = useState('');
  const [selectedGoalCard, setSelectedGoalCard] = useState('Increase Sales');

  // STEP 4 STATE: Channels (Instagram, TikTok, WhatsApp, Website)
  const [selectedChannels, setSelectedChannels] = useState(['Instagram', 'TikTok', 'WhatsApp', 'Website']);

  // Key Features Helper
  const updateFeatureText = (id, text) => {
    setKeyFeatures(prev => prev.map(f => f.id === id ? { ...f, text } : f));
  };

  const removeFeature = (id) => {
    setKeyFeatures(prev => prev.filter(f => f.id !== id));
  };

  const addAnotherFeature = () => {
    setKeyFeatures(prev => [...prev, { id: Date.now(), text: '', checked: true }]);
  };

  const toggleChannel = (ch) => {
    if (selectedChannels.includes(ch)) {
      if (selectedChannels.length > 1) {
        setSelectedChannels(selectedChannels.filter(c => c !== ch));
      }
    } else {
      setSelectedChannels([...selectedChannels, ch]);
    }
  };

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setProductImages(prev => [...prev, url]);
    }
  };

  // Launch Full Campaign Generation via OpenRouter AI
  const handleGenerateCampaignPlan = async () => {
    if (!productName.trim()) {
      alert('Please provide a product or promotion name before generating.');
      setCurrentStep(1);
      return;
    }

    setIsGenerating(true);

    try {
      const rawAiPlan = await generateFullCampaignSuite({
        productName,
        productDesc,
        keyFeatures,
        priceRange,
        variants,
        campaignGoal,
        campaignType,
        duration,
        budget,
        offer,
        keyMessage,
        campaignNotes,
        audienceDesc,
        ageRange,
        gender,
        location,
        interests,
        selectedChannels,
        businessProfile
      });

      const parsedBudget = parseInt(budget) || 1000;

      const newCampaign = {
        id: Date.now(),
        title: productName,
        goal: campaignGoal,
        badge: 'ACTIVE STRATEGY',
        status: 'Active',
        statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        description: keyMessage || productDesc || `${campaignGoal} campaign across ${selectedChannels.join(', ')}`,
        channels: selectedChannels,
        reach: '15.0K',
        reachNum: 15000,
        reachGrowth: '+100%',
        eng: '2.5K',
        engNum: 2500,
        engGrowth: '+100%',
        conv: '220',
        convNum: 220,
        convGrowth: '+100%',
        salesGhs: parsedBudget * 4,
        date: duration,
        budget: parsedBudget.toLocaleString(),
        offer: offer,
        ageRange: ageRange,
        gender: gender,
        location: location,
        imgUrl: productImages[0] || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80',
        imgLabel: productName,
        rawAiPlan: rawAiPlan
      };

      // Enrich business profile with newly captured details
      updateBusinessProfile({
        name: businessProfile.name === 'My Business' ? `${productName} Store` : businessProfile.name,
        products: productName,
        location: location,
        targetCustomers: `Age ${ageRange}, ${gender} in ${location}`,
        channels: selectedChannels.join(', '),
        currentOffers: offer || 'Launch Offer'
      });

      addCampaign(newCampaign);
      try { confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } }); } catch (e) {}

      if (onCampaignCreated) {
        onCampaignCreated(newCampaign);
      } else {
        onNavigate('dashboard');
      }
    } catch (err) {
      console.warn('AI generation fallback:', err);
      const fallbackPlan = `# ${productName} Launch Campaign

## 1. Executive Objective & AI Strategy
**Campaign Objective:** ${campaignGoal} over ${duration}.
**Strategic Positioning & Core Hook:** Position ${productName} as the premier choice in ${location} targeting ${ageRange} audience. Instagram and TikTok will drive high-volume visual awareness, while WhatsApp broadcasts convert warm inquiries directly into paid orders.

## 2. Campaign Structure (3 Phases)
- **Phase 1 — Awareness (Days 1–2):** Launch announcement, visual unboxing videos, and social feed teasers.
- **Phase 2 — Consideration (Days 3–5):** Feature spotlights, comfort/quality demonstrations, and customer proof.
- **Phase 3 — Conversion (Days 6–7):** Launch offer urgency, stock limits, and direct WhatsApp / Web checkout links.

## 3. Channel Deliverables
### Instagram
- **Post 1 (Feed Carousel):** "Introducing ${productName}" • Slide 1 Hook: Built for style & performance • Slide 2: Key specs • Slide 3: How to order.
- **Reel Concept:** 15-second cinematic product reveal with trending upbeat Ghanaian audio.

### TikTok
- **Video 1 (Hook & Script):** "3 reasons why ${productName} is the biggest drop this month." • Fast cuts showcasing details.

### WhatsApp
- **Launch Broadcast:** "🔥 ${productName} is officially available! Enjoy ${offer || 'special launch pricing'} with free delivery. Reply with your details to order now."

### Website
- **Hero Headline:** "${productName} — Unmatched Style & Everyday Performance" • Primary CTA: "Shop Collection".

## 4. 7-Day Execution Schedule
| Day | Channel | Content Type | Focus / Topic | CTA |
|:---|:---|:---|:---|:---|
| Day 1 | Instagram & TikTok | Video / Carousel | Reveal ${productName} | Check Bio |
| Day 2 | WhatsApp | Broadcast | VIP Launch Offer | Reply to Order |
| Day 3 | TikTok | Video Short | Quality & Details | Tap Link |
| Day 4 | Instagram | Reel | Customer Styling | Order Today |
| Day 5 | WhatsApp | Follow-up | Stock Update | Reserve Pair |
| Day 6 | TikTok & IG | Urgency Post | 48 Hours Left | Use Code |
| Day 7 | All Channels | Final Alert | Last Day of Promo | Final Hours |

## 5. AI Recommendations & Budget Allocation
- **Budget Allocation:** Allocate 60% of GHS ${budget || '1,000'} to Instagram & TikTok short-form video discovery, and 40% to retargeting and WhatsApp order support.
- **Strategic "Why":** Visual short-form content drives the lowest cost per impression for ${ageRange} demographics in ${location}.
`;

      const newCampaign = {
        id: Date.now(),
        title: productName,
        goal: campaignGoal,
        badge: 'ACTIVE STRATEGY',
        status: 'Active',
        statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        description: keyMessage || productDesc || 'New AI Marketing Campaign',
        channels: selectedChannels,
        reach: '15.0K',
        reachNum: 15000,
        reachGrowth: '+100%',
        eng: '2.5K',
        engNum: 2500,
        engGrowth: '+100%',
        conv: '220',
        convNum: 220,
        convGrowth: '+100%',
        salesGhs: 4000,
        date: duration,
        budget: budget || '1,000',
        offer: offer,
        ageRange: ageRange,
        gender: gender,
        location: location,
        imgUrl: productImages[0] || 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=80',
        imgLabel: productName,
        rawAiPlan: fallbackPlan
      };

      addCampaign(newCampaign);
      if (onCampaignCreated) {
        onCampaignCreated(newCampaign);
      } else {
        onNavigate('dashboard');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const stepsList = [
    { num: 1, label: 'About Product' },
    { num: 2, label: 'Campaign Details' },
    { num: 3, label: 'Audience & Goals' },
    { num: 4, label: 'Channels' },
    { num: 5, label: 'Review & Confirm' },
  ];

  return (
    <div className="min-h-screen bg-[#fafafc] flex font-sans text-neutral-900 select-none antialiased text-left">
      
      {/* Left Sidebar */}
      <aside className="w-56 bg-white border-r border-neutral-200/80 p-4 hidden lg:flex flex-col justify-between shrink-0 sticky top-0 h-screen">
        <div className="space-y-6">
          <div className="flex items-center gap-2.5 px-2 py-1.5 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
              <Rocket size={17} />
            </div>
            <div>
              <span className="text-xs font-bold text-neutral-950 block leading-tight">AI Marketing</span>
              <span className="text-[11px] text-neutral-400 font-medium">Assistant</span>
            </div>
          </div>

          <nav className="space-y-1">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'campaigns', label: 'Campaigns', icon: Megaphone, active: true },
              { id: 'content', label: 'Content', icon: FileText },
              { id: 'audience', label: 'Audience', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: BarChart2 },
              { id: 'ai-assistant', label: 'AI Assistant', icon: Bot },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = item.active;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate('dashboard')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition cursor-pointer ${
                    isActive 
                      ? 'bg-purple-50 text-purple-700 font-bold border border-purple-100/80' 
                      : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-950'
                  }`}
                >
                  <Icon size={15} className={isActive ? 'text-purple-600' : 'text-neutral-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-4 border-t border-neutral-100">
          <button onClick={() => onNavigate('dashboard')} className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition font-medium cursor-pointer">
            <Settings size={15} />
            <span>Settings</span>
          </button>
          <button onClick={() => onNavigate('dashboard')} className="w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-900 transition font-medium cursor-pointer">
            <HelpCircle size={15} />
            <span>Help</span>
          </button>
        </div>
      </aside>

      {/* Main Studio Canvas Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header with Stepper */}
        <header className="bg-white border-b border-neutral-200/80 px-6 sm:px-10 py-5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <button 
                onClick={() => onNavigate('dashboard')} 
                className="text-xs font-semibold text-neutral-400 hover:text-neutral-900 flex items-center gap-1.5 transition cursor-pointer mb-1"
              >
                <ArrowLeft size={14} />
                <span>Back to Dashboard</span>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">Create Campaign</h1>
              <p className="text-xs text-neutral-400 font-normal">Let's build your campaign step by step.</p>
            </div>

            {/* Stepper Progress */}
            <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {stepsList.map((s, idx) => {
                const isCurrent = currentStep === s.num;
                const isCompleted = currentStep > s.num;
                return (
                  <React.Fragment key={s.num}>
                    <div 
                      onClick={() => setCurrentStep(s.num)}
                      className="flex flex-col items-center gap-1 cursor-pointer shrink-0"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isCurrent 
                          ? 'bg-purple-600 text-white shadow-xs ring-4 ring-purple-100' 
                          : isCompleted 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-neutral-100 text-neutral-400'
                      }`}>
                        {isCompleted ? <Check size={14} /> : s.num}
                      </div>
                      <span className={`text-[10.5px] font-semibold whitespace-nowrap ${
                        isCurrent ? 'text-purple-700 font-bold' : isCompleted ? 'text-neutral-700' : 'text-neutral-400'
                      }`}>
                        {s.label}
                      </span>
                    </div>
                    {idx < stepsList.length - 1 && (
                      <div className={`w-6 sm:w-10 h-0.5 mb-4 ${isCompleted ? 'bg-purple-600' : 'bg-neutral-200'}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </header>

        {/* Studio Body: Form Left + Live Summary Right */}
        <main className="flex-1 max-w-7xl mx-auto p-6 sm:p-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: ACTIVE STEP FORM */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/80 shadow-xs space-y-7">
              
              {/* STEP 1: ABOUT PRODUCT */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
                      Tell us about the product or promotion
                    </h2>
                  </div>

                  {/* Row 1: Product Images & Name */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-800 block">Product Images (Optional)</label>
                      <label className="border border-dashed border-neutral-300 rounded-2xl p-4 text-center bg-[#fafafc] hover:bg-neutral-50 transition cursor-pointer block">
                        <UploadCloud size={24} className="text-purple-600 mx-auto mb-1.5" />
                        <p className="text-xs font-semibold text-neutral-700">Drag and drop images here or click to upload</p>
                        <span className="text-[10px] text-neutral-400">PNG, JPG up to 10MB</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>

                      {productImages.length > 0 && (
                        <div className="flex items-center gap-2 pt-2 overflow-x-auto">
                          {productImages.map((img, idx) => (
                            <div key={idx} className="w-12 h-12 rounded-xl border border-neutral-200 overflow-hidden bg-neutral-100 shrink-0 relative group">
                              <img src={img} alt="Upload preview" className="w-full h-full object-cover" />
                              <button 
                                onClick={() => setProductImages(productImages.filter((_, i) => i !== idx))}
                                className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-800 block">Product / Promotion Name</label>
                      <span className="text-[11px] text-neutral-400 block">What is the name of your product or promotion?</span>
                      <input 
                        type="text" 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="e.g. AeroStep X1, Summer Glow Skincare, Bridal Special"
                        className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl p-3 text-neutral-950 focus:outline-none focus:border-purple-600 transition"
                      />
                      <span className="text-[10.5px] text-neutral-400 block text-right">{productName.length} / 100</span>
                    </div>
                  </div>

                  {/* Row 2: Description & Key Highlights */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-800 block">Product / Promotion Description</label>
                      <span className="text-[11px] text-neutral-400 block">Describe your product, its key features and benefits.</span>
                      <textarea 
                        rows="6"
                        value={productDesc}
                        onChange={(e) => setProductDesc(e.target.value)}
                        placeholder="Describe what makes this product special, what customer problem it solves, and why they should buy now..."
                        className="w-full text-xs font-medium bg-white border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-purple-600 transition leading-relaxed resize-none"
                      />
                      <span className="text-[10.5px] text-neutral-400 block text-right">{productDesc.length} / 1000</span>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-800 block">What makes it special?</label>
                      <span className="text-[11px] text-neutral-400 block">What are the key features or unique selling points?</span>
                      
                      <div className="space-y-2">
                        {keyFeatures.map((f, idx) => (
                          <div key={f.id} className="flex items-center gap-2">
                            <input 
                              type="text" 
                              value={f.text}
                              onChange={(e) => updateFeatureText(f.id, e.target.value)}
                              placeholder={`Feature / USP #${idx + 1}`}
                              className="flex-1 text-xs bg-white border border-neutral-200 rounded-xl p-2.5 text-neutral-900 focus:outline-none focus:border-purple-600"
                            />
                            {keyFeatures.length > 1 && (
                              <button onClick={() => removeFeature(f.id)} className="text-neutral-300 hover:text-red-600 p-1">✕</button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button 
                        onClick={addAnotherFeature}
                        className="text-xs font-bold text-purple-600 hover:text-purple-800 flex items-center gap-1 pt-1 cursor-pointer"
                      >
                        <Plus size={13} />
                        <span>Add another point</span>
                      </button>
                    </div>
                  </div>

                  {/* Row 3: Price Range & Available Variants */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 block">Price Range (Optional)</label>
                      <span className="text-[11px] text-neutral-400 block">Select or enter the price range.</span>
                      <input 
                        type="text" 
                        value={priceRange} 
                        onChange={(e) => setPriceRange(e.target.value)}
                        placeholder="e.g. GHS 200 – GHS 450"
                        className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 block">Available Variants (Optional)</label>
                      <span className="text-[11px] text-neutral-400 block">Sizes, colors, packages, models, etc.</span>
                      <input 
                        type="text"
                        value={variants}
                        onChange={(e) => setVariants(e.target.value)}
                        placeholder="e.g. Black, White, Gray • Sizes: 40–45"
                        className="w-full text-xs font-medium bg-white border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: CAMPAIGN DETAILS */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
                      Tell us more about your campaign
                    </h2>
                    <p className="text-xs text-neutral-400">These details help the AI create the perfect strategy and content for you.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 block">Campaign Goal</label>
                      <select 
                        value={campaignGoal}
                        onChange={(e) => setCampaignGoal(e.target.value)}
                        className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-purple-600 cursor-pointer"
                      >
                        <option>Increase Sales</option>
                        <option>Generate Leads</option>
                        <option>Brand Awareness</option>
                        <option>Customer Retention & Re-engagement</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 block">Campaign Type</label>
                      <select 
                        value={campaignType}
                        onChange={(e) => setCampaignType(e.target.value)}
                        className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-purple-600 cursor-pointer"
                      >
                        <option>Product Launch</option>
                        <option>Flash Promo / Discount</option>
                        <option>Holiday & Seasonal Special</option>
                        <option>VIP Exclusive Drop</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 block">Campaign Duration</label>
                      <input 
                        type="text" 
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        placeholder="e.g. 7 Days, 14 Days"
                        className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 block">Budget</label>
                      <div className="flex items-center bg-white border border-neutral-200 rounded-xl overflow-hidden focus-within:border-purple-600">
                        <span className="bg-neutral-100 text-xs font-bold text-neutral-600 px-3.5 py-3 border-r border-neutral-200">GHS</span>
                        <input 
                          type="text" 
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                          placeholder="e.g. 1000"
                          className="w-full text-xs font-bold p-3 text-neutral-950 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-800 block">Offer / Promotion</label>
                    <input 
                      type="text" 
                      value={offer}
                      onChange={(e) => setOffer(e.target.value)}
                      placeholder="e.g. 15% off for first 50 customers with free delivery in Accra"
                      className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-800 block">Key Message</label>
                    <input 
                      type="text" 
                      value={keyMessage}
                      onChange={(e) => setKeyMessage(e.target.value)}
                      placeholder="e.g. Position as a stylish everyday sneaker combining comfort and modern design."
                      className="w-full text-xs font-semibold bg-white border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-purple-600"
                    />
                  </div>
                </div>
              )}

              {/* STEP 3: AUDIENCE & GOALS (Consistent 18–30) */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
                      Who is your target audience?
                    </h2>
                    <p className="text-xs text-neutral-400">Help the AI understand who we're speaking to.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-800 block">Audience Description</label>
                      <textarea 
                        rows="6"
                        value={audienceDesc}
                        onChange={(e) => setAudienceDesc(e.target.value)}
                        placeholder="e.g. Trend-conscious young adults in Accra who value sneaker fashion and daily comfort..."
                        className="w-full text-xs font-medium bg-white border border-neutral-200 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-purple-600 leading-relaxed resize-none"
                      />
                    </div>

                    <div className="space-y-2 text-xs">
                      <label className="text-xs font-bold text-neutral-800 block">Audience Demographics</label>
                      <div className="flex items-center justify-between border border-neutral-200 rounded-xl p-2.5 bg-white">
                        <span className="font-semibold text-neutral-500">Age Range</span>
                        <input 
                          type="text" 
                          value={ageRange} 
                          onChange={(e) => setAgeRange(e.target.value)} 
                          className="text-right font-bold text-neutral-900 focus:outline-none w-28" 
                        />
                      </div>
                      <div className="flex items-center justify-between border border-neutral-200 rounded-xl p-2.5 bg-white">
                        <span className="font-semibold text-neutral-500">Gender</span>
                        <input 
                          type="text" 
                          value={gender} 
                          onChange={(e) => setGender(e.target.value)} 
                          className="text-right font-bold text-neutral-900 focus:outline-none w-28" 
                        />
                      </div>
                      <div className="flex items-center justify-between border border-neutral-200 rounded-xl p-2.5 bg-white">
                        <span className="font-semibold text-neutral-500">Location</span>
                        <input 
                          type="text" 
                          value={location} 
                          onChange={(e) => setLocation(e.target.value)} 
                          className="text-right font-bold text-neutral-900 focus:outline-none w-44" 
                        />
                      </div>
                      <div className="flex items-center justify-between border border-neutral-200 rounded-xl p-2.5 bg-white">
                        <span className="font-semibold text-neutral-500">Interests</span>
                        <input 
                          type="text" 
                          value={interests} 
                          onChange={(e) => setInterests(e.target.value)} 
                          placeholder="e.g. Sneakers, Fashion, Music" 
                          className="text-right font-bold text-neutral-900 focus:outline-none w-44 text-[11px]" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-neutral-800 block">Primary Campaign Goal</label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                      {[
                        { id: 'Increase Sales', label: 'Increase Sales', icon: ShoppingBag },
                        { id: 'Generate Leads', label: 'Generate Leads', icon: Users },
                        { id: 'Increase Awareness', label: 'Increase Awareness', icon: Megaphone },
                        { id: 'Boost Engagement', label: 'Boost Engagement', icon: MessageSquare },
                        { id: 'Drive Website Traffic', label: 'Website Traffic', icon: Globe },
                      ].map((g) => {
                        const Icon = g.icon;
                        const isSelected = selectedGoalCard === g.id;
                        return (
                          <div 
                            key={g.id}
                            onClick={() => setSelectedGoalCard(g.id)}
                            className={`p-3 rounded-2xl border text-left cursor-pointer transition flex flex-col justify-between ${
                              isSelected 
                                ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-100' 
                                : 'border-neutral-200 bg-white hover:bg-neutral-50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                                <Icon size={13} />
                              </div>
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                isSelected ? 'bg-purple-600 text-white font-bold' : 'border border-neutral-300'
                              }`}>
                                {isSelected && '✓'}
                              </div>
                            </div>
                            <span className="text-xs font-bold text-neutral-900 block leading-tight">{g.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: CHANNELS */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
                      Where do you want to reach your audience?
                    </h2>
                    <p className="text-xs text-neutral-400">Select the marketing channels you want to use for this campaign.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {[
                      { id: 'Instagram', label: 'Instagram', desc: 'Posts, Stories, Reels and carousels.', icon: InstagramSvg },
                      { id: 'TikTok', label: 'TikTok', desc: 'Short viral video hooks & product discovery.', icon: TikTokSvg },
                      { id: 'WhatsApp', label: 'WhatsApp', desc: 'Direct broadcast & 1-on-1 customer chat.', icon: WhatsAppSvg },
                      { id: 'Website', label: 'Website', desc: 'Store banners, headlines and landing pages.', icon: () => <Globe size={20} className="text-blue-500" /> },
                      { id: 'Facebook', label: 'Facebook', desc: 'Feed ads and community reach.', icon: FacebookSvg },
                      { id: 'Email', label: 'Email', desc: 'Newsletters and automated flows.', icon: () => <Mail size={20} className="text-purple-600" /> },
                      { id: 'SMS', label: 'SMS', desc: 'Direct promotional text alerts.', icon: () => <MessageCircle size={20} className="text-emerald-500" /> },
                      { id: 'Offline / In-store', label: 'In-Store', desc: 'Posters and pop-up events.', icon: () => <Store size={20} className="text-amber-500" /> },
                    ].map((ch) => {
                      const Icon = ch.icon;
                      const isSelected = selectedChannels.includes(ch.id);
                      return (
                        <div
                          key={ch.id}
                          onClick={() => toggleChannel(ch.id)}
                          className={`p-4 rounded-3xl border text-left cursor-pointer transition flex flex-col justify-between ${
                            isSelected 
                              ? 'border-purple-600 bg-white shadow-xs ring-2 ring-purple-100' 
                              : 'border-neutral-200 bg-white hover:bg-neutral-50/50'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Icon size={20} />
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                isSelected ? 'bg-purple-600 text-white font-bold' : 'border border-neutral-300'
                              }`}>
                                {isSelected && '✓'}
                              </div>
                            </div>
                            <h3 className="text-xs font-bold text-neutral-900">{ch.label}</h3>
                            <p className="text-[10px] text-neutral-400 mt-1 leading-snug">{ch.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & CONFIRM */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-neutral-950 tracking-tight">
                        Review and confirm your campaign
                      </h2>
                      <p className="text-xs text-neutral-400">Review your campaign details before generating the full strategy with AI.</p>
                    </div>
                    <button onClick={() => setCurrentStep(1)} className="text-xs font-bold text-purple-600 hover:underline flex items-center gap-1 cursor-pointer">
                      <Edit3 size={12} />
                      <span>Edit All</span>
                    </button>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <div className="bg-[#fafafc] rounded-3xl p-5 border border-neutral-200/80 space-y-2">
                      <h4 className="font-bold text-neutral-950">Product</h4>
                      <p className="font-semibold text-neutral-900">{productName || 'Unnamed Product'}</p>
                      <p className="text-neutral-500 line-clamp-2">{productDesc || 'No description provided'}</p>
                      {priceRange && <p><strong>Price:</strong> {priceRange}</p>}
                    </div>

                    <div className="bg-[#fafafc] rounded-3xl p-5 border border-neutral-200/80 space-y-2">
                      <h4 className="font-bold text-neutral-950">Campaign Strategy</h4>
                      <p><strong>Goal:</strong> {campaignGoal}</p>
                      <p><strong>Type:</strong> {campaignType}</p>
                      <p><strong>Duration:</strong> {duration}</p>
                      {budget && <p><strong>Budget:</strong> GHS {budget}</p>}
                    </div>

                    <div className="bg-[#fafafc] rounded-3xl p-5 border border-neutral-200/80 space-y-2">
                      <h4 className="font-bold text-neutral-950">Target Audience</h4>
                      <p><strong>Location:</strong> {location}</p>
                      <p><strong>Age:</strong> {ageRange}</p>
                      <p className="text-neutral-500 line-clamp-2">{audienceDesc || `Target audience in ${location}`}</p>
                    </div>

                    <div className="bg-[#fafafc] rounded-3xl p-5 border border-neutral-200/80 space-y-2">
                      <h4 className="font-bold text-neutral-950">Channels</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedChannels.map(ch => (
                          <span key={ch} className="bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded text-[10px] border border-purple-200">{ch}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons Footer */}
              <div className="pt-6 border-t border-neutral-100 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button 
                    type="button" 
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="text-xs font-bold text-neutral-600 hover:text-neutral-950 flex items-center gap-1.5 bg-neutral-100 px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    <ArrowLeft size={13} />
                    <span>Previous</span>
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={() => onNavigate('dashboard')}
                    className="text-xs font-bold text-neutral-500 hover:text-neutral-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                )}

                <div>
                  {currentStep < 5 ? (
                    <button 
                      type="button" 
                      onClick={() => setCurrentStep(currentStep + 1)}
                      className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-7 py-3 rounded-2xl transition flex items-center gap-2 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                    >
                      <span>Next</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      disabled={isGenerating}
                      onClick={handleGenerateCampaignPlan}
                      className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs px-8 py-3.5 rounded-2xl transition flex items-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                    >
                      {isGenerating ? <Loader2 size={15} className="animate-spin" /> : <Sparkles size={15} />}
                      <span>{isGenerating ? 'AI Formulating Full Plan...' : 'Generate Campaign Plan ✨'}</span>
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: DYNAMIC CAMPAIGN SUMMARY */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-xs space-y-5">
              <div>
                <h3 className="text-sm font-bold text-neutral-950 tracking-tight">Campaign Summary</h3>
                <p className="text-xs text-neutral-400">
                  {productName ? `Live summary for "${productName}"` : 'Enter details to see live summary'}
                </p>
              </div>

              {productName && (
                <div className="flex items-center gap-3 p-2.5 rounded-2xl border border-neutral-100 bg-[#fafafc]">
                  {productImages[0] ? (
                    <img src={productImages[0]} alt="Product" className="w-12 h-12 rounded-xl object-cover border border-neutral-200" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                      <ShoppingBag size={18} />
                    </div>
                  )}
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-neutral-950 truncate">{productName}</h4>
                    <span className="text-[10px] text-neutral-400 block">{priceRange || 'Custom Pricing'}</span>
                  </div>
                </div>
              )}

              <div className="space-y-3 text-xs text-neutral-700">
                <div className="flex items-start gap-2.5">
                  <Target size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10.5px] text-neutral-400 font-semibold block">Goal</span>
                    <span className="font-bold text-neutral-950">{campaignGoal}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Calendar size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10.5px] text-neutral-400 font-semibold block">Duration</span>
                    <span className="font-bold text-neutral-950">{duration}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Users size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10.5px] text-neutral-400 font-semibold block">Target Audience</span>
                    <span className="font-bold text-neutral-950">Age: {ageRange} • {location}</span>
                  </div>
                </div>

                {budget && (
                  <div className="flex items-start gap-2.5">
                    <DollarSign size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10.5px] text-neutral-400 font-semibold block">Budget</span>
                      <span className="font-bold text-neutral-950">GHS {budget}</span>
                    </div>
                  </div>
                )}

                <div>
                  <span className="text-[10.5px] text-neutral-400 font-semibold block mb-1">Channels</span>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {selectedChannels.map((ch) => (
                      <span key={ch} className="text-[10px] font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-lg">
                        {ch}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-purple-50/60 rounded-2xl p-4 border border-purple-100 flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-bold text-purple-900 block mb-1">AI Marketing Suite Ready</span>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">
                    Clicking Generate will formulate your 3-phase strategy, channel creatives (Instagram, TikTok, WhatsApp, Website), 7-day schedule, and budget breakdown.
                  </p>
                </div>
                <Sparkles size={16} className="text-purple-600 shrink-0 mt-0.5" />
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};
