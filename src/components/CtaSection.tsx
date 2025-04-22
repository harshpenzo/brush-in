
import { Button } from "@/components/ui/button";
import { Feather } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CtaSection = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-800 relative overflow-hidden">
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
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to transform your LinkedIn presence?
          </h2>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who are creating engaging content and growing their network with BrushIn.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white hover:bg-white/90 text-brand-700 px-8 py-6 rounded-lg font-medium shadow-lg hover:shadow-xl transition-smooth"
              onClick={() => navigate('/auth')}
            >
              Get Started For Free
            </Button>
            
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/40 hover:border-white/60 bg-transparent text-white hover:bg-white/10 px-8 py-6 rounded-lg font-medium transition-smooth"
              onClick={() => navigate('/pricing')}
            >
              <Feather className="mr-2 h-5 w-5" />
              View Pricing
            </Button>
          </div>
          
          <p className="mt-6 text-white/70 text-sm">
            No credit card required. Free plan includes 10 posts per month.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
