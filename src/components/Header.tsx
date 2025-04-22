
import { Menu, X, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  onScrollToFeatures?: () => void;
}

const Header = ({ onScrollToFeatures }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignIn = () => {
    navigate("/auth");
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-brand-600 text-white p-1.5 rounded transition-smooth group-hover:bg-brand-700">
            <Linkedin size={20} />
          </div>
          <h1 className="text-xl font-bold text-slate-900">
            Brush<span className="text-brand-400 group-hover:text-brand-500 transition-smooth">In</span>
          </h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/about" 
            className={`link-underline text-slate-700 hover:text-brand-600 transition-smooth font-medium text-sm ${
              isActive('/about') ? 'text-brand-600 after:scale-x-100' : ''
            }`}
          >
            About
          </Link>
          <Link 
            to="/pricing" 
            className={`link-underline text-slate-700 hover:text-brand-600 transition-smooth font-medium text-sm ${
              isActive('/pricing') ? 'text-brand-600 after:scale-x-100' : ''
            }`}
          >
            Pricing
          </Link>
          <Link 
            to="/testimonials" 
            className={`link-underline text-slate-700 hover:text-brand-600 transition-smooth font-medium text-sm ${
              isActive('/testimonials') ? 'text-brand-600 after:scale-x-100' : ''
            }`}
          >
            Testimonials
          </Link>
          <Link 
            to="/contact" 
            className={`link-underline text-slate-700 hover:text-brand-600 transition-smooth font-medium text-sm ${
              isActive('/contact') ? 'text-brand-600 after:scale-x-100' : ''
            }`}
          >
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleSignIn}
            className="hidden md:flex bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow-md transition-smooth"
          >
            Sign In
          </Button>

          <button 
            className="md:hidden text-slate-700 dark:text-slate-200 hover:bg-slate-100 p-2 rounded-full transition-smooth" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Enhanced mobile menu with animations */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-md py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link 
              to="/about" 
              className={`text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-3 px-4 rounded-lg transition-smooth font-medium hover:bg-slate-50 ${
                isActive('/about') ? 'bg-slate-50 text-brand-600' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/pricing" 
              className={`text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-3 px-4 rounded-lg transition-smooth font-medium hover:bg-slate-50 ${
                isActive('/pricing') ? 'bg-slate-50 text-brand-600' : ''
              }`}
            >
              Pricing
            </Link>
            <Link 
              to="/testimonials" 
              className={`text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-3 px-4 rounded-lg transition-smooth font-medium hover:bg-slate-50 ${
                isActive('/testimonials') ? 'bg-slate-50 text-brand-600' : ''
              }`}
            >
              Testimonials
            </Link>
            <Link 
              to="/contact" 
              className={`text-slate-700 hover:text-brand-600 dark:text-slate-200 dark:hover:text-brand-400 py-3 px-4 rounded-lg transition-smooth font-medium hover:bg-slate-50 ${
                isActive('/contact') ? 'bg-slate-50 text-brand-600' : ''
              }`}
            >
              Contact
            </Link>
            <Button 
              onClick={handleSignIn}
              className="bg-brand-600 hover:bg-brand-700 text-white w-full py-3 rounded-lg font-medium shadow-sm hover:shadow-md transition-smooth mt-2"
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
