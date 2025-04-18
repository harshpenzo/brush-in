
import { Linkedin, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onScrollToFeatures: () => void;
}

const Header = ({ onScrollToFeatures }: HeaderProps) => {
  return (
    <header className="bg-indigo-900 py-4 px-6 shadow-lg fixed w-full z-10 border-b-4 border-pink-500">
      <div className="absolute top-0 left-0 w-full h-1 bg-[linear-gradient(90deg,#ff71ce,#01cdfe,#05ffa1,#b967ff,#fffb96)]"></div>
      
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Linkedin size={28} className="text-cyan-400" />
            <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-xl font-bold text-white [text-shadow:_2px_2px_0_#000] font-pixel tracking-wider transform -rotate-1">
            BrushIn
          </h1>
          <Star className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors font-pixel text-sm">About</a>
          <a href="#features" className="text-cyan-300 hover:text-pink-400 transition-colors font-pixel text-sm">Features</a>
          <a href="#" className="text-cyan-300 hover:text-pink-400 transition-colors font-pixel text-sm">Tips</a>
        </nav>
        
        <Button 
          onClick={onScrollToFeatures}
          className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white border-2 border-white font-pixel text-sm px-4 py-2 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
        >
          Press Start
        </Button>
      </div>
    </header>
  );
};

export default Header;
