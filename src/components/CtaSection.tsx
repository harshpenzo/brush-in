
import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

const CtaSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    // Create animated background
    const createAnimatedBackground = () => {
      const particles: HTMLDivElement[] = [];
      const count = 20;
      
      for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        const size = Math.random() * 8 + 2;
        
        particle.className = "absolute rounded-full";
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = `${Math.random() * 0.6 + 0.2}`;
        
        // Set initial positions
        particle.style.transform = `translate(-50%, -50%)`;
        section.appendChild(particle);
        particles.push(particle);
        
        // Add animation
        const animateParticle = () => {
          const speedX = (Math.random() - 0.5) * 1;
          const speedY = (Math.random() - 0.5) * 1;
          let posX = Math.random() * 100;
          let posY = Math.random() * 100;
          
          const move = () => {
            posX += speedX;
            posY += speedY;
            
            // Boundary checking
            if (posX < 0 || posX > 100) posX = Math.random() * 100;
            if (posY < 0 || posY > 100) posY = Math.random() * 100;
            
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.opacity = `${Math.random() * 0.6 + 0.2}`;
            
            requestAnimationFrame(move);
          };
          
          move();
        };
        
        animateParticle();
      }
      
      return () => {
        particles.forEach(particle => section.removeChild(particle));
      };
    };
    
    const cleanup = createAnimatedBackground();
    
    return cleanup;
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-brand-800 via-brand-700 to-brand-800 relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 0 L40 0 L40 40 L0 40 Z" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" className="hand-drawn" />
        </svg>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -top-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-white/10 backdrop-blur-sm p-1.5 rounded-full mb-6">
            <Feather className="h-6 w-6 text-white animate-pulse" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your LinkedIn presence?
          </h2>
          
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of professionals who are creating engaging content and growing their network with Brush.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white hover:bg-white/90 text-brand-700 px-8 py-6 rounded-xl font-medium shadow-xl hover:shadow-2xl transition-smooth group"
              onClick={() => navigate('/auth')}
            >
              <span className="relative">
                Get Started For Free
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-brand-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </span>
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/40 hover:border-white/70 bg-transparent text-white hover:bg-white/10 px-8 py-6 rounded-xl font-medium transition-smooth"
              onClick={() => navigate('/pricing')}
            >
              <Feather className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              View Pricing
            </Button>
          </div>
          
          <p className="mt-8 text-white/80 text-sm">
            No credit card required. Free plan includes 10 posts per month.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
