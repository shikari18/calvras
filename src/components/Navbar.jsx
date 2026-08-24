import React, { useState, useEffect } from 'react';
import { BrandBurstLogo } from './cy/CySidebar';
import { Menu, X, Sparkles, Workflow, CreditCard, ArrowRight, LogIn } from 'lucide-react';

export const Navbar = ({ onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    onNavigate('home', id);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/80 shadow-xs py-3' 
          : 'bg-white/70 backdrop-blur-xs py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => onNavigate('home', 'hero')}
          className="flex items-center gap-2.5 group cursor-pointer transition-opacity hover:opacity-90"
        >
          <div className="w-8 h-8 rounded-xl bg-purple-50/90 border border-purple-100 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-2xs">
            <BrandBurstLogo size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight text-neutral-950 font-serif">
            Calvras
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('hero')} className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer">Product</button>
          <button onClick={() => scrollToSection('how-it-works')} className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer">How it works</button>
          <button onClick={() => scrollToSection('pricing')} className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors cursor-pointer">Pricing</button>
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={() => onNavigate('signin')} 
            className="text-[13.5px] font-medium text-neutral-600 hover:text-neutral-950 transition-colors px-3 py-1.5 cursor-pointer"
          >
            Sign In
          </button>
          <button 
            onClick={() => onNavigate('get-started')} 
            className="bg-neutral-950 hover:bg-neutral-850 text-white text-[13.5px] font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden w-9 h-9 rounded-xl border border-neutral-200/80 bg-white/80 flex items-center justify-center text-neutral-700 hover:text-neutral-950 transition cursor-pointer shadow-2xs active:scale-95"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Full-Screen Luxury Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[100] bg-white/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Top Bar with Logo & Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center shadow-2xs">
                <BrandBurstLogo size={18} />
              </div>
              <span className="font-bold text-lg tracking-tight text-neutral-950 font-serif">
                Calvras
              </span>
            </div>

            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition cursor-pointer active:scale-95 shadow-2xs"
              aria-label="Close navigation menu"
            >
              <X size={18} />
            </button>
          </div>

          {/* Center Navigation Links */}
          <div className="flex-1 flex flex-col justify-center py-8 space-y-3">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-50/70 hover:bg-neutral-100/80 active:bg-neutral-100 border border-neutral-100 transition group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-100/70 text-purple-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Sparkles size={18} />
                </div>
                <div>
                  <span className="text-base font-bold text-neutral-950 block group-hover:text-purple-600 transition">Product</span>
                  <span className="text-xs text-neutral-500 font-normal">Autonomous AI growth features</span>
                </div>
              </div>
              <ArrowRight size={18} className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition duration-200" />
            </button>

            <button 
              onClick={() => scrollToSection('how-it-works')} 
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-50/70 hover:bg-neutral-100/80 active:bg-neutral-100 border border-neutral-100 transition group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-indigo-100/70 text-indigo-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <Workflow size={18} />
                </div>
                <div>
                  <span className="text-base font-bold text-neutral-950 block group-hover:text-indigo-600 transition">How it works</span>
                  <span className="text-xs text-neutral-500 font-normal">Observe, Decide, Execute loop</span>
                </div>
              </div>
              <ArrowRight size={18} className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition duration-200" />
            </button>

            <button 
              onClick={() => scrollToSection('pricing')} 
              className="w-full flex items-center justify-between p-4 rounded-2xl bg-neutral-50/70 hover:bg-neutral-100/80 active:bg-neutral-100 border border-neutral-100 transition group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-100/70 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
                  <CreditCard size={18} />
                </div>
                <div>
                  <span className="text-base font-bold text-neutral-950 block group-hover:text-emerald-600 transition">Pricing</span>
                  <span className="text-xs text-neutral-500 font-normal">Transparent tiers & credits</span>
                </div>
              </div>
              <ArrowRight size={18} className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-1 transition duration-200" />
            </button>
          </div>

          {/* Bottom Action CTAs */}
          <div className="pt-4 border-t border-neutral-100 space-y-3">
            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigate('get-started'); }} 
              className="w-full py-4 px-5 bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-sm sm:text-base rounded-2xl transition shadow-lg active:scale-[0.98] flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span>Get Started Free</span>
              <ArrowRight size={16} />
            </button>

            <button 
              onClick={() => { setMobileMenuOpen(false); onNavigate('signin'); }} 
              className="w-full py-3.5 px-5 bg-neutral-50 hover:bg-neutral-100 border border-neutral-200/90 text-neutral-900 font-bold text-xs sm:text-sm rounded-2xl transition flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <LogIn size={15} className="text-neutral-700" />
              <span>Sign In</span>
            </button>

            <p className="text-[11px] text-neutral-400 text-center pt-2">
              Calvras Autonomous AI Marketing & Growth OS
            </p>
          </div>

        </div>
      )}
    </header>
  );
};
