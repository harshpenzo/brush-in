import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  onScrollToFeatures?: () => void;
}

const Header = ({ onScrollToFeatures }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignIn = () => {
    navigate("/auth");
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-slate-900">
            Brush<span className="text-brand-400">In</span>
          </h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/about" 
            className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 transition-smooth font-medium text-sm"
          >
            About
          </Link>
          <Link 
            to="/pricing" 
            className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 transition-smooth font-medium text-sm"
          >
            Pricing
          </Link>
          <Link 
            to="/testimonials" 
            className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 transition-smooth font-medium text-sm"
          >
            Testimonials
          </Link>
          <Link 
            to="/contact" 
            className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 transition-smooth font-medium text-sm"
          >
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleSignIn}
            className="hidden md:flex bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow transition-smooth"
          >
            Sign In
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
            <Link 
              to="/about" 
              className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-2 transition-smooth font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/pricing" 
              className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-2 transition-smooth font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/testimonials" 
              className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-2 transition-smooth font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link 
              to="/contact" 
              className="text-slate-600 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-2 transition-smooth font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              onClick={handleSignIn}
              className="bg-slate-900 hover:bg-slate-800 text-white w-full py-2 rounded-lg font-medium shadow-sm hover:shadow transition-smooth"
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
