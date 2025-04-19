
import { Linkedin, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

interface HeaderProps {
  onScrollToFeatures: () => void;
}

const Header = ({ onScrollToFeatures }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-slate-900/90 shadow-sm backdrop-blur-md py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative bg-brand-600 text-white p-2 rounded-lg">
            <Linkedin size={24} />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">
            Brush<span className="text-brand-600">In</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#" 
            className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 transition-smooth font-medium text-sm"
          >
            About
          </a>
          <a 
            href="#features" 
            className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 transition-smooth font-medium text-sm"
          >
            Features
          </a>
          <a 
            href="#" 
            className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 transition-smooth font-medium text-sm"
          >
            Tips
          </a>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={() => onScrollToFeatures()}
            className="hidden md:flex bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow transition-smooth"
          >
            Get Started
          </Button>

          <button 
            className="md:hidden text-slate-700 dark:text-slate-200" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-md py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <a 
              href="#" 
              className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-2 transition-smooth font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#features" 
              className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-2 transition-smooth font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#" 
              className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-2 transition-smooth font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tips
            </a>
            <Button 
              onClick={() => {
                onScrollToFeatures();
                setIsMobileMenuOpen(false);
              }}
              className="bg-brand-600 hover:bg-brand-700 text-white w-full py-2 rounded-lg font-medium shadow-sm hover:shadow transition-smooth"
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
