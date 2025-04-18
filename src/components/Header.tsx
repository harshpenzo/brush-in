
import { Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onScrollToFeatures: () => void;
}

const Header = ({ onScrollToFeatures }: HeaderProps) => {
  return (
    <header className="bg-white py-4 px-6 shadow-sm fixed w-full z-10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Linkedin size={28} className="text-[#0077B5]" />
          <h1 className="text-xl font-bold text-gray-800">BrusIn</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-[#0077B5] transition-colors">About</a>
          <a href="#features" className="text-gray-600 hover:text-[#0077B5] transition-colors">Features</a>
          <a href="#" className="text-gray-600 hover:text-[#0077B5] transition-colors">Tips</a>
        </nav>
        
        <Button 
          onClick={onScrollToFeatures}
          className="bg-[#0077B5] hover:bg-[#0077B5]/90"
        >
          Get Started
        </Button>
      </div>
    </header>
  );
};

export default Header;
