
import { useState, useEffect } from "react";
import { ArrowDown, MessageCircle, Edit3, Star, Sparkles, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onScrollToFeatures: () => void;
  onSelectOption: (option: "create" | "optimize") => void;
}

const Hero = ({ onScrollToFeatures, onSelectOption }: HeroProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 3);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative pt-20 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-900 to-indigo-800 -z-10"></div>
      
      {/* Animated pixel art grid background */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10 bg-repeat animate-pulse"></div>
      
      {/* Decorative elements */}
      <Star className="absolute top-[30%] left-[15%] w-6 h-6 text-yellow-300 animate-pulse" />
      <Star className="absolute top-[20%] left-[75%] w-8 h-8 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <Sparkles className="absolute top-[60%] left-[85%] w-6 h-6 text-pink-400 animate-ping" style={{ animationDuration: '3s' }} />
      <Sparkles className="absolute top-[70%] left-[10%] w-6 h-6 text-pink-400 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.7s' }} />
      
      <div className="text-center space-y-8 max-w-4xl relative z-10 mb-20">
        <div className="bg-white inline-block p-8 relative border-4 border-black transform rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center font-pixel leading-relaxed mb-4">
            <span className="text-indigo-900">Meet </span>
            <span className={`${animationStep === 0 ? 'text-pink-500' : animationStep === 1 ? 'text-cyan-500' : 'text-purple-500'} inline-block transition-colors duration-300`}>
              BrushIn
            </span>
            <Sparkles className="inline-block w-8 h-8 ml-2 text-yellow-400 animate-ping" style={{ animationDuration: '3s' }} />
          </h1>
          <p className="text-xl md:text-2xl text-indigo-900 font-pixel leading-relaxed mt-4 px-4">
            Your AI companion for crafting engaging LinkedIn content that drives results
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-2 border-black font-pixel text-lg px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            onClick={() => onSelectOption("create")}
          >
            <Zap className="mr-2 h-5 w-5" />
            EXPLORE FEATURES
          </Button>
        </div>
      </div>
      
      <div 
        className="absolute bottom-12 cursor-pointer transition-transform duration-300 z-20 animate-bounce"
        onClick={() => onSelectOption("create")}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="bg-yellow-300 p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] border-2 border-black">
          <ArrowDown 
            size={48} 
            className={`text-indigo-900 transition-all duration-300 ${isHovering ? 'scale-125' : 'scale-100'}`} 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
