import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { IdeaToEverywhere } from '../components/IdeaToEverywhere';
import { BusinessChanges } from '../components/BusinessChanges';
import { BuiltAroundBusiness } from '../components/BuiltAroundBusiness';
import { ComparisonSection } from '../components/ComparisonSection';
import { PricingSection } from '../components/PricingSection';
import { FAQSection } from '../components/FAQSection';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';

export const LandingPage = ({ onGetStarted, onOpenLegal }) => {
  const handleNavigate = (target, sectionId) => {
    if (target === 'get-started' || target === 'signin' || target === 'dashboard' || target === 'new-campaign') {
      if (onGetStarted) onGetStarted();
      return;
    }

    if (sectionId) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden text-left">
      <Navbar onNavigate={handleNavigate} />
      <Hero onNavigate={handleNavigate} />
      <div id="how-it-works">
        <IdeaToEverywhere />
        <BusinessChanges />
        <BuiltAroundBusiness />
      </div>
      <ComparisonSection onNavigate={handleNavigate} />
      <PricingSection onNavigate={handleNavigate} />
      <FAQSection />
      <FinalCTA onNavigate={handleNavigate} />
      <Footer onOpenLegal={onOpenLegal} />
    </div>
  );
};
