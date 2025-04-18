
import { useState } from "react";
import { ArrowDown, MessageCircle, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onScrollToFeatures: () => void;
  onSelectOption: (option: "create" | "optimize") => void;
}

const Hero = ({ onScrollToFeatures, onSelectOption }: HeroProps) => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-gradient-to-b from-[#0077B5]/10 to-[#0077B5]/5 px-4">
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-5 pointer-events-none" />
      
      <div className="text-center space-y-6 max-w-3xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-800">
          Meet <span className="text-[#0077B5]">BrusIn</span> AI
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
          The intelligent assistant that helps you craft engaging LinkedIn posts that drive results
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            size="lg" 
            className="bg-[#0077B5] hover:bg-[#0077B5]/90 text-white px-8"
            onClick={() => onScrollToFeatures()}
          >
            Get Started
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5]/10"
            onClick={() => window.open("https://www.linkedin.com/", "_blank")}
          >
            Learn More
          </Button>
        </div>
      </div>
      
      <div 
        className="absolute bottom-8 cursor-pointer transition-transform duration-300 animate-bounce"
        onClick={onScrollToFeatures}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <ArrowDown 
          size={32} 
          className={`text-[#0077B5] transition-all duration-300 ${isHovering ? 'scale-125' : 'scale-100'}`} 
        />
      </div>
    </div>
  );
};

export default Hero;
