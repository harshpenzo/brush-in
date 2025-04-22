
import { ArrowDown, Sparkles, Linkedin, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

interface HeroProps {
  onScrollToFeatures: () => void;
  onSelectOption: (option: "create" | "optimize") => void;
}

const Hero = ({ onScrollToFeatures, onSelectOption }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create floating elements (ink pots and feathers)
    const createFloatingElement = () => {
      const element = document.createElement("div");
      element.className = "absolute text-slate-200/10 pointer-events-none select-none transition-all duration-500";
      
      // Randomly choose between feather and inkpot (using + symbol for inkpot)
      const isFeather = Math.random() > 0.3;
      if (isFeather) {
        element.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="hand-drawn"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>`;
      } else {
        element.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="hand-drawn"><path d="M12 2v20M2 12h20"></path></svg>`;
      }
      
      // Random initial position (avoiding content area)
      const safeZone = 150; // pixels from the center
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      
      let x = Math.random() * containerWidth;
      let y = Math.random() * containerHeight;
      
      // Ensure elements don't overlap with central content
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;
      if (Math.abs(x - centerX) < safeZone && Math.abs(y - centerY) < safeZone) {
        if (x < centerX) x = x - safeZone;
        else x = x + safeZone;
      }
      
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.transform = "translate(-50%, -50%) rotate(0deg)";
      container.appendChild(element);

      // Mouse interaction with smooth easing
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const elementRect = element.getBoundingClientRect();
        const elementX = elementRect.left - rect.left + elementRect.width / 2;
        const elementY = elementRect.top - rect.top + elementRect.height / 2;
        
        const dx = mouseX - elementX;
        const dy = mouseY - elementY;
        const distance = Math.hypot(dx, dy);
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          const angle = Math.atan2(dy, dx);
          const force = (1 - distance / maxDistance) * 100;
          const moveX = Math.cos(angle + Math.PI) * force;
          const moveY = Math.sin(angle + Math.PI) * force;
          
          element.style.transform = `translate(${moveX}px, ${moveY}px) rotate(${(Math.random() - 0.5) * 45}deg)`;
        } else {
          element.style.transform = "translate(0, 0) rotate(0deg)";
        }
      };

      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeChild(element);
      };
    };

    // Create multiple background elements
    const cleanupFns = Array.from({ length: 30 }, createFloatingElement);
    
    return () => {
      cleanupFns.forEach(cleanup => cleanup());
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 bg-white overflow-hidden relative">
      {/* SVG filter for hand-drawn effect */}
      <svg width="0" height="0" className="absolute">
        <filter id="hand-drawn-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
        </filter>
      </svg>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6 animate-fade-in fade-in-bottom">
            <span className="inline-block px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-medium mb-2">
              Professional LinkedIn Content
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
              Create engaging <span className="text-brand-600 relative">
                LinkedIn
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-brand-300 hand-drawn" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 C20,10 50,0 100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span> content that drives results
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 font-light">
              Your AI companion for crafting professional LinkedIn posts that stand out, engage your network, and establish your personal brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 rounded-lg font-medium text-base shadow-sm hover:shadow-md transition-smooth group"
                onClick={() => onSelectOption("create")}
              >
                <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Create New Post
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 px-8 py-6 rounded-lg font-medium text-base transition-smooth hover:border-brand-200"
                onClick={() => onSelectOption("optimize")}
              >
                <Feather className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Optimize Post
              </Button>
            </div>
          </div>
          
          <div className="relative w-full max-w-md animate-fade-in fade-in-bottom" style={{ animationDelay: "300ms" }}>
            <div className="card-depth bg-white rounded-xl shadow-smooth-lg border border-slate-200 p-6 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop" 
                  alt="Satya Nadella Profile" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                />
                <div>
                  <p className="font-medium text-slate-900">Satya Nadella</p>
                  <p className="text-sm text-slate-500">CEO at Microsoft</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <p className="text-slate-700">Excited to announce Microsoft's continued commitment to AI innovation and responsible development. Our latest breakthroughs in machine learning are not just advancing technology—they're transforming how we work, learn, and connect. 🚀</p>
                <p className="text-slate-700">The future of AI is collaborative, ethical, and accessible to all. Looking forward to sharing more at our upcoming AI Summit.</p>
                <p className="text-slate-700 font-medium">
                  <span className="text-brand-600">#AI</span> <span className="text-brand-600">#Innovation</span> <span className="text-brand-600">#Technology</span> <span className="text-brand-600">#Leadership</span>
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" alt="Avatar 1" className="w-8 h-8 rounded-full border-2 border-white hover:scale-110 transition-transform cursor-pointer"/>
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop" alt="Avatar 2" className="w-8 h-8 rounded-full border-2 border-white hover:scale-110 transition-transform cursor-pointer"/>
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop" alt="Avatar 3" className="w-8 h-8 rounded-full border-2 border-white hover:scale-110 transition-transform cursor-pointer"/>
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 text-xs flex items-center justify-center border-2 border-white hover:scale-110 transition-transform cursor-pointer">+124</div>
                </div>
                <p className="text-sm text-slate-500 font-medium">2.5K reactions</p>
              </div>
            </div>
            
            <div className="absolute -bottom-3 -right-3 w-full h-full bg-slate-50 rounded-xl -z-10"></div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-10 cursor-pointer transition-transform duration-300 animate-bounce hover:animate-none z-10 group"
        onClick={onScrollToFeatures}
        aria-label="Scroll to features"
      >
        <div className="bg-brand-500/10 backdrop-blur-sm p-3 rounded-full group-hover:bg-brand-500/20 transition-smooth">
          <ArrowDown size={24} className="text-brand-700" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
