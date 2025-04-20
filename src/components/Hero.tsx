
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
      element.className = "absolute text-slate-200/10 pointer-events-none select-none transition-transform duration-500";
      
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
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight font-sans">
              Create engaging <span className="text-brand-600">LinkedIn</span> content that drives results
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 font-light">
              Your AI companion for crafting professional LinkedIn posts that stand out, engage your network, and establish your personal brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-lg font-medium text-base shadow-sm hover:shadow-md transition-smooth"
                onClick={() => onSelectOption("create")}
              >
                Create New Post
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-slate-200 bg-white hover:bg-slate-50 text-slate-900 px-8 py-6 rounded-lg font-medium text-base transition-smooth"
                onClick={() => onSelectOption("optimize")}
              >
                Optimize Post
              </Button>
            </div>
          </div>
          
          <div className="relative w-full max-w-md animate-fade-in animation-delay-300">
            <div className="bg-white rounded-xl shadow-smooth-lg border border-slate-200 p-6 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop" 
                  alt="Profile" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-slate-900">Satya Nadella</p>
                  <p className="text-sm text-slate-500">CEO at Microsoft</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <p className="text-slate-700">Excited to announce Microsoft's continued commitment to AI innovation and responsible development. Our latest breakthroughs in machine learning are not just advancing technology—they're transforming how we work, learn, and connect. 🚀</p>
                <p className="text-slate-700">The future of AI is collaborative, ethical, and accessible to all. Looking forward to sharing more at our upcoming AI Summit.</p>
                <p className="text-slate-700">#AI #Innovation #Technology #Leadership</p>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" alt="Avatar 1" className="w-8 h-8 rounded-full border-2 border-white"/>
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop" alt="Avatar 2" className="w-8 h-8 rounded-full border-2 border-white"/>
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop" alt="Avatar 3" className="w-8 h-8 rounded-full border-2 border-white"/>
                </div>
                <p className="text-sm text-slate-500">2.5K reactions</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-slate-100 rounded-xl -z-10"></div>
            <div className="absolute -bottom-3 -right-3 w-full h-full bg-slate-50 rounded-xl -z-20"></div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-10 cursor-pointer transition-transform duration-300 animate-bounce hover:animate-none z-10"
        onClick={onScrollToFeatures}
      >
        <div className="bg-slate-900/10 backdrop-blur-sm p-3 rounded-full hover:bg-slate-900/20 transition-smooth">
          <ArrowDown size={24} className="text-slate-900" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
