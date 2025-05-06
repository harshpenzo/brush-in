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

    // Create enhanced animated background
    const createAnimatedBackground = () => {
      // Create more vibrant gradient orbs for the background
      const orbs = Array.from({ length: 8 }, (_, i) => {
        const orb = document.createElement("div");
        const size = Math.random() * 350 + 200;
        // More varied and vibrant color range
        const hue = i % 2 === 0 
          ? Math.random() * 60 + 180 // Blue to cyan range
          : Math.random() * 40 + 220; // Purple to blue range
        
        orb.className = "absolute rounded-full blur-3xl opacity-20 animate-float";
        orb.style.width = `${size}px`;
        orb.style.height = `${size}px`;
        orb.style.backgroundColor = `hsl(${hue}, ${70 + Math.random() * 20}%, ${50 + Math.random() * 20}%)`;
        orb.style.left = `${Math.random() * 100}%`;
        orb.style.top = `${Math.random() * 100}%`;
        orb.style.animationDelay = `${Math.random() * 5}s`;
        orb.style.transform = "translate(-50%, -50%)";
        orb.style.zIndex = "0";
        
        // Add custom animation to each orb
        orb.style.animation = `floatOrb ${10 + Math.random() * 15}s ease-in-out infinite`;
        
        container.appendChild(orb);
        return orb;
      });

      // Add subtle moving particle effects
      const addParticles = () => {
        const particleCount = 40;
        const particles: HTMLDivElement[] = [];
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          const size = Math.random() * 6 + 2;
          
          particle.className = "absolute rounded-full";
          particle.style.width = `${size}px`;
          particle.style.height = `${size}px`;
          particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.15 + 0.05})`;
          particle.style.left = `${Math.random() * 100}%`;
          particle.style.top = `${Math.random() * 100}%`;
          particle.style.zIndex = "1";
          
          // Create unique floating animation for each particle
          particle.style.transition = "transform 3s ease-in-out, opacity 3s ease-in-out";
          
          container.appendChild(particle);
          particles.push(particle);
          
          // Animate particles
          const moveParticle = () => {
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const opacity = Math.random() * 0.15 + 0.05;
            
            particle.style.transform = `translate(${x}vw, ${y}vh)`;
            particle.style.opacity = `${opacity}`;
            
            setTimeout(() => moveParticle(), 3000 + Math.random() * 2000);
          };
          
          moveParticle();
        }
        
        return particles;
      };
      
      const particles = addParticles();

      return () => {
        orbs.forEach(orb => container.removeChild(orb));
        particles.forEach(particle => container.removeChild(particle));
      };
    };

    // Create floating ink pots and feathers with enhanced movement
    const createFloatingElements = () => {
      const elements: HTMLDivElement[] = [];
      const count = 20; // Increased count for more visual interest
      
      // Create elements outside of main content
      const safeMargin = 120; // Margin to keep elements away from center content
      const centerX = container.offsetWidth / 2;
      const centerY = container.offsetHeight / 2;
      const contentWidth = Math.min(1000, container.offsetWidth * 0.8);
      const contentHeight = 600;
      
      for (let i = 0; i < count; i++) {
        const element = document.createElement("div");
        element.className = "absolute text-slate-200/10 pointer-events-none select-none transition-all duration-500 svg-element";
        
        // Randomly choose between feather and inkpot with more feathers
        const isFeather = Math.random() > 0.2;
        if (isFeather) {
          // Create different feather angles and types
          const rotation = Math.random() * 360;
          const scale = 0.8 + Math.random() * 0.6;
          element.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" style="transform: rotate(${rotation}deg) scale(${scale});" class="hand-drawn"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>`;
        } else {
          // Inkpots with varying designs
          const variation = Math.floor(Math.random() * 3);
          if (variation === 0) {
            element.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="hand-drawn"><circle cx="12" cy="12" r="7"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>`;
          } else if (variation === 1) {
            element.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="hand-drawn"><rect x="8" y="8" width="8" height="12" rx="2"></rect><path d="M10 8V6a2 2 0 0 1 4 0v2"></path></svg>`;
          } else {
            element.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" class="hand-drawn"><path d="M9 3h6v11h4l-7 7-7-7h4z"></path></svg>`;
          }
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
        element.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        container.appendChild(element);
        elements.push(element);
        
        // Add more natural and varied floating animation
        const animateFloat = () => {
          // Enhanced natural movement simulation
          const moveX = (Math.random() - 0.5) * 25; 
          const moveY = (Math.random() - 0.5) * 25;
          const rotation = (Math.random() - 0.5) * 30;
          const duration = 6 + Math.random() * 8; // Varied durations
          const easing = ['ease-in-out', 'cubic-bezier(0.37, 0, 0.63, 1)', 'cubic-bezier(0.34, 1.56, 0.64, 1)'][Math.floor(Math.random() * 3)];
          
          element.style.transition = `transform ${duration}s ${easing}, opacity 3s ease-in-out`;
          element.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${rotation}deg)`;
          element.style.opacity = `${Math.random() * 0.3 + 0.1}`;
          
          setTimeout(animateFloat, duration * 1000 + Math.random() * 3000);
        };
        
        setTimeout(animateFloat, Math.random() * 2000);
      }

      // Enhanced mouse interaction with more responsive easing
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
          const maxDistance = 300; // Increased interaction range
          
          if (distance < maxDistance) {
            const angle = Math.atan2(dy, dx);
            // Force inverse proportional to distance - stronger push when closer
            const force = (1 - distance / maxDistance) * 100;
            const moveX = Math.cos(angle + Math.PI) * force;
            const moveY = Math.sin(angle + Math.PI) * force;
            
            // More natural, physics-like movement
            element.style.transition = "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)";
            element.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px)) rotate(${(Math.random() - 0.5) * 60}deg)`;
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
            <span className="inline-block px-3 py-1 bg-sky-500/20 text-sky-400 rounded-full text-xs font-medium mb-2">
              Professional LinkedIn Content
            </span>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Create engaging <span className="text-sky-400 relative">LinkedIn</span> content that drives results
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 font-light">
              Your AI companion for crafting professional LinkedIn posts that stand out, engage your network, and establish your personal brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-6 rounded-lg font-medium text-base shadow-lg hover:shadow-xl transition-smooth group"
                onClick={() => onSelectOption("create")}
              >
                <Sparkles className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Create New Post
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-slate-600 bg-slate-800/50 hover:bg-slate-700 text-white px-8 py-6 rounded-lg font-medium text-base transition-smooth hover:border-sky-400"
                onClick={() => onSelectOption("optimize")}
              >
                <Feather className="mr-2 h-5 w-5 transition-transform group-hover:rotate-12" />
                Optimize Post
              </Button>
            </div>
          </div>
          
          <div className="relative w-full max-w-md animate-fade-in fade-in-bottom" style={{ animationDelay: "300ms" }}>
            <div className="card-depth bg-white/5 backdrop-blur-md rounded-xl shadow-2xl border border-white/10 p-6 relative z-10 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-sky-500/20">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop" 
                  alt="Satya Nadella Profile" 
                  className="w-12 h-12 rounded-full object-cover border-2 border-sky-400/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
                  <span className="text-sky-400">#AI</span> <span className="text-sky-400">#Innovation</span> <span className="text-sky-400">#Technology</span> <span className="text-sky-400">#Leadership</span>
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
            
            <div className="absolute -bottom-3 -right-3 w-full h-full bg-sky-500/10 rounded-xl -z-10 blur-xl"></div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-10 cursor-pointer transition-transform duration-300 animate-bounce hover:animate-none z-10 group"
        onClick={onScrollToFeatures}
        aria-label="Scroll to features"
      >
        <div className="bg-sky-500/20 backdrop-blur-sm p-3 rounded-full group-hover:bg-sky-500/30 transition-smooth">
          <ArrowDown size={24} className="text-sky-400" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
