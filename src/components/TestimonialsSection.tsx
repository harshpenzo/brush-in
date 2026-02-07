
import { Quote } from "lucide-react";
import { useEffect, useRef } from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Emma Johnson",
    role: "Marketing Director",
    company: "TechGrowth Inc.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    quote: "Brushin has completely transformed how I create content for LinkedIn. The AI-powered suggestions are spot-on and have helped me increase engagement by over 200%."
  },
  {
    id: 2,
    name: "Rajiv Mehta",
    role: "Startup Founder",
    company: "Nexus Ventures",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    quote: "As someone who struggled with creating compelling LinkedIn content, Brushin has been a game-changer. My network has grown significantly since I started using it."
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "HR Specialist",
    company: "Global Solutions",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    quote: "The optimization feature is brilliant! It takes my rough drafts and turns them into polished, professional posts that consistently get high engagement."
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll('.testimonial-card');
    
    // Immediately add animation classes
    cards.forEach((card, index) => {
      card.classList.add('animate-fade-in');
      card.setAttribute('style', `animation-delay: ${index * 0.2}s`);
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute -bottom-[200px] -left-[200px] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 opacity-100 animate-fade-in">
          <span className="inline-block px-4 py-2 bg-brand-500/20 text-brand-400 rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 relative">
            What our users are saying
            <div className="absolute -top-8 -right-8 text-7xl text-brand-400/10 animate-pulse">❝</div>
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Professionals from various industries have transformed their LinkedIn presence with Brushin.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="testimonial-card opacity-100 bg-slate-700/50 backdrop-blur-sm rounded-xl p-8 border border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group perspective"
              style={{ 
                animationDelay: `${index * 0.2}s`,
                transform: `perspective(1000px) rotateX(0deg)`
              }}
              onMouseMove={(e) => {
                const card = e.currentTarget;
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
              }}
            >
              <div className="mb-6 text-brand-400/40 group-hover:text-brand-400/70 transition-colors">
                <Quote size={36} className="hand-drawn transform transition-transform group-hover:scale-110" />
              </div>
              
              <p className="text-slate-300 italic mb-6 text-lg relative">
                {testimonial.quote}
                <span className="absolute -bottom-2 -right-2 text-5xl text-brand-400/5">❞</span>
              </p>
              
              <div className="flex items-center">
                <div className="relative overflow-hidden rounded-full w-14 h-14 mr-4 border-2 border-brand-400/30 group-hover:border-brand-400/80 transition-colors">
                  <img 
                    src={testimonial.avatarUrl} 
                    alt={testimonial.name}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 rounded-full shadow-inner"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-white">{testimonial.name}</h3>
                  <p className="text-sm text-slate-400">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              
              <div className="mt-6 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="w-5 h-5 text-yellow-500 transition-transform duration-300 hover:scale-125" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <div className="absolute inset-0 bg-gradient-to-t from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="/testimonials" className="inline-flex items-center text-brand-400 font-medium hover:text-brand-300 transition-smooth group">
            View all testimonials
            <svg className="ml-2 w-4 h-4 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
