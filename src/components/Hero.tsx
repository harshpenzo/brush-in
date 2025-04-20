
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

    // Create floating feather elements
    const createFloatingElement = () => {
      const element = document.createElement("div");
      element.className = "absolute text-slate-200/10 pointer-events-none select-none";
      
      // Random feather or inkpot
      const isFeather = Math.random() > 0.3;
      if (isFeather) {
        element.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8L8 16"/><path d="M16 8L18 6"/><path d="M8 16L6 18"/><path d="M14 4l-4 4"/><path d="M4 14l4-4"/><path d="M20 8l-4-4"/><path d="M8 20l-4-4"/></svg>`;
      } else {
        element.innerHTML = `<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>`;
      }
      
      // Random initial position
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.transform = "translate(-50%, -50%) rotate(0deg)";
      container.appendChild(element);

      // Mouse interaction
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const elementRect = element.getBoundingClientRect();
        const elementX = elementRect.left - rect.left + elementRect.width / 2;
        const elementY = elementRect.top - rect.top + elementRect.height / 2;
        
        const angleRad = Math.atan2(y - elementY, x - elementX);
        const distance = Math.min(100, Math.hypot(x - elementX, y - elementY) / 5);
        const rotation = (Math.random() - 0.5) * 45;
        
        element.style.transform = `translate(${-Math.cos(angleRad) * distance}px, ${-Math.sin(angleRad) * distance}px) rotate(${rotation}deg)`;
        element.style.transition = "transform 0.3s ease-out";
      };

      container.addEventListener("mousemove", handleMouseMove);

      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeChild(element);
      };
    };

    // Create multiple elements
    const cleanupFns = Array.from({ length: 20 }, createFloatingElement);
    
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
