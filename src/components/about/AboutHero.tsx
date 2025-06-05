
import { useState, useEffect, useRef } from "react";

interface AboutHeroProps {
  onSectionRef: (index: number, ref: HTMLDivElement | null) => void;
  isLoaded: boolean;
}

const AboutHero = ({ onSectionRef, isLoaded }: AboutHeroProps) => {
  return (
    <div 
      ref={(el) => onSectionRef(0, el)} 
      className="text-center mb-16"
      style={{ opacity: isLoaded ? 1 : 0 }}
    >
      <span className="inline-block px-4 py-2 bg-sky-500/20 text-sky-600 dark:text-sky-400 rounded-full text-sm font-medium mb-4">
        Our Story
      </span>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 relative">
        Empowering Professionals on LinkedIn
        <div className="absolute -top-8 -right-8 text-7xl text-sky-400/20 animate-bounce">✨</div>
      </h1>
      <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
        Brushin was founded with a simple mission: to help professionals create engaging, 
        high-quality LinkedIn content without the stress or time commitment.
      </p>
    </div>
  );
};

export default AboutHero;
