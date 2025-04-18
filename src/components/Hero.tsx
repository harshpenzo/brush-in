
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
  
  // Cycle through animation steps for the title
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStep((prev) => (prev + 1) % 3);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative pt-20 px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-sky-300 to-indigo-300 -z-10"></div>
      
      {/* Pixel art clouds - fixed positions */}
      <div className="absolute top-[20%] left-[10%] w-24 h-12 bg-white rounded-full"></div>
      <div className="absolute top-[15%] left-[20%] w-32 h-16 bg-white rounded-full"></div>
      <div className="absolute top-[25%] left-[60%] w-40 h-20 bg-white rounded-full"></div>
      <div className="absolute top-[10%] left-[80%] w-20 h-10 bg-white rounded-full"></div>
      
      {/* Stars */}
      <Star className="absolute top-[30%] left-[15%] w-6 h-6 text-yellow-300 animate-pulse" />
      <Star className="absolute top-[20%] left-[75%] w-8 h-8 text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <Sparkles className="absolute top-[60%] left-[85%] w-6 h-6 text-pink-400 animate-ping" style={{ animationDuration: '3s' }} />
      <Sparkles className="absolute top-[70%] left-[10%] w-6 h-6 text-pink-400 animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.7s' }} />
      
      <div className="text-center space-y-6 max-w-3xl relative z-10">
        <div className="bg-white inline-block p-8 relative border-4 border-black transform rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center font-pixel leading-relaxed">
            <span className="text-indigo-900">Meet </span>
            <span className={`${animationStep === 0 ? 'text-pink-500' : animationStep === 1 ? 'text-cyan-500' : 'text-purple-500'} inline-block transition-colors duration-300`}>
              BrushIn
            </span>
            <Sparkles className="inline-block w-8 h-8 ml-2 text-yellow-400 animate-ping" style={{ animationDuration: '3s' }} />
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-indigo-900 max-w-2xl mx-auto font-pixel leading-relaxed">
          The intelligent assistant that helps you craft engaging LinkedIn posts that drive results
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-2 border-black font-pixel text-lg px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            onClick={() => onScrollToFeatures()}
          >
            <Zap className="mr-2 h-5 w-5" />
            GET STARTED
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="bg-white border-2 border-black text-indigo-900 font-pixel text-lg px-8 py-4 hover:bg-indigo-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            onClick={() => window.open("https://www.linkedin.com/", "_blank")}
          >
            LEARN MORE
          </Button>
        </div>
      </div>
      
      {/* Ground/platform */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-green-500 border-t-4 border-black"></div>
      <div className="absolute bottom-0 left-0 w-full h-12 bg-green-600 border-t-4 border-black"></div>
      <div className="absolute bottom-0 left-0 w-full h-6 bg-brown-700 border-t-4 border-black"></div>
      
      <div 
        className="absolute bottom-28 cursor-pointer transition-transform duration-300 z-20 animate-bounce"
        onClick={onScrollToFeatures}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="bg-yellow-300 p-3 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] border-2 border-black">
          <ArrowDown 
            size={32} 
            className={`text-indigo-900 transition-all duration-300 ${isHovering ? 'scale-125' : 'scale-100'}`} 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
