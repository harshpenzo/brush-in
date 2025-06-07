
import { useState, useEffect, useRef } from "react";

interface AboutHeroProps {
  onSectionRef: (index: number, ref: HTMLDivElement | null) => void;
  isLoaded: boolean;
}

const AboutHero = ({ onSectionRef, isLoaded }: AboutHeroProps) => {
  return (
    <section 
      ref={(el) => onSectionRef(0, el as HTMLDivElement | null)} 
      className="text-center mb-16"
      style={{ 
        opacity: isLoaded ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out'
      }}
      aria-labelledby="about-hero-heading"
    >
      <span className="inline-block px-4 py-2 bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium mb-4">
        About Brushin AI
      </span>
      <h1 id="about-hero-heading" className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 relative">
        Empowering Professionals with AI LinkedIn Content Creation
        <div className="absolute -top-8 -right-8 text-7xl text-sky-400/20 animate-bounce">✨</div>
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
        Brushin was founded with a simple mission: to help professionals create engaging, 
        viral LinkedIn content without the stress or time commitment. We're the leading AI LinkedIn post generator 
        trusted by thousands of professionals worldwide.
      </p>
    </section>
  );
};

export default AboutHero;
