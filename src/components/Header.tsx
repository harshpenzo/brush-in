
import { Menu, X, Feather } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface HeaderProps {
  onScrollToFeatures?: () => void;
}

const Header = ({ onScrollToFeatures }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Logo animation
    const animateLogo = () => {
      const logo = logoRef.current;
      if (logo) {
        const pulseAnimation = () => {
          logo.style.transform = "scale(1.15)";
          setTimeout(() => {
            logo.style.transform = "scale(1)";
          }, 300);
        };
        
        // Add rotation animation
        const rotateAnimation = () => {
          logo.style.transition = "transform 0.5s ease-out";
          logo.style.transform = "rotate(12deg)";
          
          setTimeout(() => {
            logo.style.transition = "transform 0.5s ease-out";
            logo.style.transform = "rotate(0deg)";
          }, 500);
          
          setTimeout(rotateAnimation, 5000);
        };
        
        // Initial delay before starting animation
        setTimeout(() => {
          pulseAnimation();
          // Set interval for repeated animation
          setInterval(pulseAnimation, 6000);
          
          // Start rotation animation after pulse
          setTimeout(rotateAnimation, 2000);
        }, 2000);
      }
    };
    
    animateLogo();
    
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
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-slate-900/90 backdrop-blur-md py-3 shadow-lg border-b border-slate-800/50' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div 
            ref={logoRef} 
            className="bg-sky-500 text-white p-2 rounded-lg transition-all duration-300 group-hover:bg-sky-600 shadow-lg"
          >
            <Feather size={20} className="transition-transform group-hover:rotate-12" />
          </div>
          <h1 className="text-xl font-bold text-white">
            <span className="text-sky-400 group-hover:text-sky-300 transition-smooth">Brushin</span>
          </h1>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            to="/about" 
            className={`text-slate-300 hover:text-sky-400 transition-smooth font-medium text-sm ${
              isActive('/about') ? 'text-sky-400' : ''
            }`}
          >
            About
          </Link>
          <Link 
            to="/pricing" 
            className={`text-slate-300 hover:text-sky-400 transition-smooth font-medium text-sm ${
              isActive('/pricing') ? 'text-sky-400' : ''
            }`}
          >
            Pricing
          </Link>
          <Link 
            to="/testimonials" 
            className={`text-slate-300 hover:text-sky-400 transition-smooth font-medium text-sm ${
              isActive('/testimonials') ? 'text-sky-400' : ''
            }`}
          >
            Testimonials
          </Link>
          <Link 
            to="/contact" 
            className={`text-slate-300 hover:text-sky-400 transition-smooth font-medium text-sm ${
              isActive('/contact') ? 'text-sky-400' : ''
            }`}
          >
            Contact
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            onClick={handleSignIn}
            className="hidden md:flex bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-smooth"
          >
            Sign In
          </Button>

          <button 
            className="md:hidden text-white hover:bg-slate-800/50 p-2 rounded-full transition-smooth" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Enhanced mobile menu with animations */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-xl py-4 animate-slide-in-right">
          <div className="container mx-auto px-4 flex flex-col gap-4">
            <Link 
              to="/about" 
              className={`text-slate-300 hover:text-sky-400 py-3 px-4 rounded-lg transition-smooth font-medium hover:bg-slate-800/50 ${
                isActive('/about') ? 'bg-slate-800/70 text-sky-400' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/pricing" 
              className={`text-slate-300 hover:text-sky-400 py-3 px-4 rounded-lg transition-smooth font-medium hover:bg-slate-800/50 ${
                isActive('/pricing') ? 'bg-slate-800/70 text-sky-400' : ''
              }`}
            >
              Pricing
            </Link>
            <Link 
              to="/testimonials" 
              className={`text-slate-300 hover:text-sky-400 py-3 px-4 rounded-lg transition-smooth font-medium hover:bg-slate-800/50 ${
                isActive('/testimonials') ? 'bg-slate-800/70 text-sky-400' : ''
              }`}
            >
              Testimonials
            </Link>
            <Link 
              to="/contact" 
              className={`text-slate-300 hover:text-sky-400 py-3 px-4 rounded-lg transition-smooth font-medium hover:bg-slate-800/50 ${
                isActive('/contact') ? 'bg-slate-800/70 text-sky-400' : ''
              }`}
            >
              Contact
            </Link>
            <Button 
              onClick={handleSignIn}
              className="bg-sky-500 hover:bg-sky-600 text-white w-full py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-smooth mt-2"
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
