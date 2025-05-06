
import { ArrowDown, Sparkles, Linkedin, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

interface HeroProps {
  onScrollToFeatures: () => void;
  onSelectOption: (option: "create" | "optimize") => void;
}

const Hero = ({ onScrollToFeatures, onSelectOption }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create animated background
    const createAnimatedBackground = () => {
      // Create gradient orbs for the background
      const orbs = Array.from({ length: 5 }, (_, i) => {
        const orb = document.createElement("div");
        const size = Math.random() * 300 + 200;
        const hue = Math.random() * 60 + 180; // Blue to cyan range
        
        orb.className = "absolute rounded-full blur-3xl opacity-20 animate-float";
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.backgroundColor = `hsl(${hue}, 70%, 60%)`;
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        orb.style.animationDelay = `${Math.random() * 5}s`;
        orb.style.transform = "translate(-50%, -50%)";
        orb.style.zIndex = "0";
        
        container.appendChild(orb);
        return orb;
      });

      return () => {
        orbs.forEach(orb => container.removeChild(orb));
      };
    };

    // Create floating ink pots and feathers
    const createFloatingElements = () => {
      const elements: HTMLDivElement[] = [];
      const count = 15; // Reduced count to avoid clutter
      
      // Create elements outside of main content
      const safeMargin = 150; // Margin to keep elements away from center content
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
      const contentWidth = Math.min(1000, container.offsetWidth * 0.8);
      const contentHeight = 600;
      
      for (let i = 0; i < count; i++) {
        const element = document.createElement("div");
        element.className = "absolute text-slate-200/10 pointer-events-none select-none transition-all duration-500 svg-element";
        
        // Randomly choose between feather and inkpot
        const isFeather = Math.random() > 0.3;
        if (isFeather) {
          element.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="hand-drawn"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>`;
        } else {
          element.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="hand-drawn"><circle cx="12" cy="12" r="7"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>`;
        }
        
        // Position elements to avoid the central content area
        let x, y;
        const contentLeft = centerX - contentWidth / 2;
        const contentRight = centerX + contentWidth / 2;
        const contentTop = centerY - contentHeight / 2;
        const contentBottom = centerY + contentHeight / 2;
        
        do {
          x = Math.random() * container.offsetWidth;
          y = Math.random() * container.offsetHeight;
        } while (
          x > contentLeft - safeMargin && 
          x < contentRight + safeMargin && 
          y > contentTop - safeMargin && 
          y < contentBottom + safeMargin
        );
        
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;
        element.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
        element.style.opacity = `${Math.random() * 0.2 + 0.1}`;
        container.appendChild(element);
        elements.push(element);
        
        // Add floating animation
        const animateFloat = () => {
          const floatX = (Math.random() - 0.5) * 15;
          const floatY = (Math.random() - 0.5) * 15;
          const rotation = (Math.random() - 0.5) * 20;
          
          element.style.transition = "transform 8s ease-in-out, opacity 3s ease-in-out";
          element.style.transform = `translate(calc(-50% + ${floatX}px), calc(-50% + ${floatY}px)) rotate(${rotation}deg)`;
          element.style.opacity = `${Math.random() * 0.3 + 0.1}`;
          
          setTimeout(animateFloat, 8000 + Math.random() * 4000);
        };
        
        setTimeout(animateFloat, Math.random() * 2000);
      }

      // Mouse interaction with smooth easing
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        elements.forEach(element => {
          const elementRect = element.getBoundingClientRect();
          const elementX = elementRect.left - rect.left + elementRect.width / 2;
          const elementY = elementRect.top - rect.top + elementRect.height / 2;
          
          const dx = mouseX - elementX;
          const dy = mouseY - elementY;
          const distance = Math.hypot(dx, dy);
          const maxDistance = 250;
          
          if (distance < maxDistance) {
            const angle = Math.atan2(dy, dx);
            const force = (1 - distance / maxDistance) * 70;
            const moveX = Math.cos(angle + Math.PI) * force;
            const moveY = Math.sin(angle + Math.PI) * force;
            
            element.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
            element.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${(Math.random() - 0.5) * 45}deg)`;
          }
        });
      };

      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        elements.forEach(element => container.removeChild(element));
        container.removeEventListener("mousemove", handleMouseMove);
      };
    };

    const cleanupBackground = createAnimatedBackground();
    const cleanupElements = createFloatingElements();
    
    // Animate the logo
    const animateLogo = () => {
      const logo = logoRef.current;
      if (logo) {
        const rotateAnimation = () => {
          logo.style.transition = "transform 0.5s ease-out";
          logo.style.transform = "rotate(12deg)";
          
          setTimeout(() => {
            logo.style.transition = "transform 0.5s ease-out";
            logo.style.transform = "rotate(0deg)";
          }, 500);
          
          setTimeout(rotateAnimation, 5000);
        };
        
        rotateAnimation();
      }
    };
    
    animateLogo();
    
    return () => {
      cleanupBackground();
      cleanupElements();
    };
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">
      {/* SVG filter for hand-drawn effect */}
      <svg width="0" height="0" className="absolute">
        <filter id="hand-drawn-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1" />
        </filter>
      </svg>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6 animate-fade-in fade-in-bottom backdrop-blur-sm bg-slate-900/30 p-8 rounded-2xl border border-slate-700/50">
            <span className="inline-block px-3 py-1 bg-brand-500/20 text-brand-400 rounded-full text-xs font-medium mb-2">
              Professional LinkedIn Content
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Create engaging <span className="text-brand-400 relative">
                LinkedIn
                {/* Arrow pointing from LinkedIn to the post preview */}
                <svg className="absolute -right-16 top-full hidden md:block animate-bounce" width="80" height="60" viewBox="0 0 80 60" fill="none">
                  <path d="M5,5 Q40,0 75,45" stroke="#38bdf8" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                  <path d="M70,30 L75,45 L60,40" fill="none" stroke="#38bdf8" strokeWidth="2" />
                </svg>
              </span> content that drives results
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 font-light">
              Your AI companion for crafting professional LinkedIn posts that stand out, engage your network, and establish your personal brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-brand-500 hover:bg-brand-600 text-white px-8 py-6 rounded-lg font-medium text-base shadow-lg hover:shadow-xl transition-smooth group"
                onClick={() => onSelectOption("create")}
              >
                <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Create New Post
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-slate-600 bg-slate-800/50 hover:bg-slate-700 text-white px-8 py-6 rounded-lg font-medium text-base transition-smooth hover:border-brand-400"
                onClick={() => onSelectOption("optimize")}
              >
                <Feather className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Optimize Post
              </Button>
            </div>
          </div>
          
          <div className="relative w-full max-w-md animate-fade-in fade-in-bottom" style={{ animationDelay: "300ms" }}>
            <div className="card-depth bg-white/5 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-6 relative z-10 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-brand-500/20">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop" 
                  alt="Satya Nadella Profile" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-400/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                />
                <div>
                  <p className="font-medium text-white">Satya Nadella</p>
                  <p className="text-sm text-slate-400">CEO at Microsoft</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <p className="text-slate-300">Excited to announce Microsoft's continued commitment to AI innovation and responsible development. Our latest breakthroughs in machine learning are not just advancing technology—they're transforming how we work, learn, and connect. 🚀</p>
                <p className="text-slate-300">The future of AI is collaborative, ethical, and accessible to all. Looking forward to sharing more at our upcoming AI Summit.</p>
                <p className="text-slate-300 font-medium">
                  <span className="text-brand-400">#AI</span> <span className="text-brand-400">#Innovation</span> <span className="text-brand-400">#Technology</span> <span className="text-brand-400">#Leadership</span>
                </p>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-slate-700">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" alt="Avatar 1" className="w-8 h-8 rounded-full border-2 border-slate-800 hover:scale-110 transition-transform cursor-pointer"/>
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop" alt="Avatar 2" className="w-8 h-8 rounded-full border-2 border-slate-800 hover:scale-110 transition-transform cursor-pointer"/>
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop" alt="Avatar 3" className="w-8 h-8 rounded-full border-2 border-slate-800 hover:scale-110 transition-transform cursor-pointer"/>
                  <div className="w-8 h-8 rounded-full bg-slate-700 text-slate-300 text-xs flex items-center justify-center border-2 border-slate-800 hover:scale-110 transition-transform cursor-pointer">+124</div>
                </div>
                <p className="text-sm text-slate-400 font-medium">2.5K reactions</p>
              </div>
            </div>
            
            <div className="absolute -bottom-3 -right-3 w-full h-full bg-brand-500/10 rounded-xl -z-10 blur-xl"></div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-10 cursor-pointer transition-transform duration-300 animate-bounce hover:animate-none z-10 group"
        onClick={onScrollToFeatures}
        aria-label="Scroll to features"
      >
        <div className="bg-brand-500/20 backdrop-blur-sm p-3 rounded-full group-hover:bg-brand-500/30 transition-smooth">
          <ArrowDown size={24} className="text-brand-400" />
        </div>
      </div>
      
      {/* Animated logo */}
      <div ref={logoRef} className="fixed top-5 left-6 z-50 transition-transform">
        <div className="bg-brand-500 text-white p-2 rounded-lg hover:bg-brand-600 shadow-lg">
          <Feather size={20} className="transition-transform" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
