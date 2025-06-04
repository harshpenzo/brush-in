
import { Menu, X, Feather, LogOut, User as UserIcon, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onScrollToFeatures?: () => void;
}

const Header = ({ onScrollToFeatures }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Enhanced feather logo animation
    const animateLogo = () => {
      const logo = logoRef.current;
      if (logo) {
        // Feather falling/floating animation
        const floatingAnimation = () => {
          // Create a sequence of movements that simulate a feather blown by wind
          const sequence = async () => {
            // Float down and right
            logo.style.transition = "transform 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            logo.style.transform = "translateY(8px) translateX(4px) rotate(15deg)";
            
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Float up and left (wind blowing)
            logo.style.transition = "transform 2s cubic-bezier(0.34, 1.56, 0.64, 1)";
            logo.style.transform = "translateY(-5px) translateX(-3px) rotate(-8deg)";
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Gentle bob in place
            logo.style.transition = "transform 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            logo.style.transform = "translateY(2px) translateX(2px) rotate(5deg)";
            
            await new Promise(resolve => setTimeout(resolve, 1800));
            
            // Return to original position with a slight wobble
            logo.style.transition = "transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)";
            logo.style.transform = "translateY(0) translateX(0) rotate(0deg)";
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Repeat the sequence
            floatingAnimation();
          };
          
          sequence();
        };
        
        // Start the floating animation with an initial delay
        setTimeout(floatingAnimation, 1000);
      }
    };
    
    animateLogo();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper function to get user's first name or first initial
  const getUserDisplayName = () => {
    if (!user) return "";
    
    // Access the name from user.user_metadata
    const name = user.user_metadata?.name || user.email?.charAt(0) || "U";
    return name;
  };

  // Helper function to get the user's initials for avatar
  const getUserInitial = () => {
    if (!user) return "";
    
    // Get first character from name in metadata or email
    const initial = user.user_metadata?.name?.charAt(0) || 
                   user.email?.charAt(0) || 
                   "U";
    return initial.toUpperCase();
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignIn = () => {
    navigate("/auth");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
            <Feather size={20} className="feather-logo" />
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
          {isAuthenticated ? (
            <div className="hidden md:flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full flex items-center justify-center bg-sky-500/20 hover:bg-sky-500/30 text-sky-400">
                    <span className="font-medium text-lg">{getUserInitial()}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20">
                      <span className="font-medium text-sky-400">{getUserInitial()}</span>
                    </div>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium text-white">{getUserDisplayName()}</p>
                      <p className="text-xs text-slate-400">{user?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem onClick={() => navigate("/profile")} className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-700">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/dashboard")} className="cursor-pointer text-slate-300 hover:text-white hover:bg-slate-700">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-950">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Button 
              onClick={handleSignIn}
              className="hidden md:flex bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-smooth"
            >
              Sign In
            </Button>
          )}

          <button 
            className="md:hidden text-white hover:bg-slate-800/50 p-2 rounded-full transition-smooth" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

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
            
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 py-3 px-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20">
                    <span className="font-medium text-sky-400">{getUserInitial()}</span>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-white">{getUserDisplayName()}</p>
                    <p className="text-xs text-slate-400">{user?.email}</p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate("/profile")}
                  className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 w-full py-3 rounded-lg font-medium transition-smooth"
                >
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button 
                  onClick={() => navigate("/dashboard")}
                  className="bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 w-full py-3 rounded-lg font-medium transition-smooth"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
                <Button 
                  onClick={handleLogout}
                  className="bg-red-500/10 hover:bg-red-500/20 text-red-400 w-full py-3 rounded-lg font-medium transition-smooth mt-2"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                onClick={handleSignIn}
                className="bg-sky-500 hover:bg-sky-600 text-white w-full py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-smooth mt-2"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
