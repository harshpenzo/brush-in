
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Quote } from "lucide-react";
import { useEffect, useRef } from "react";

const testimonialsData = [
  {
    id: 1,
    name: "Emma Johnson",
    role: "Marketing Director",
    company: "TechGrowth Inc.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    quote: "Brushin has completely transformed how I create content for LinkedIn. The AI-powered suggestions are spot-on and have helped me increase engagement by over 200%."
  },
  {
    id: 2,
    name: "Rajiv Mehta",
    role: "Startup Founder",
    company: "Nexus Ventures",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    quote: "As someone who struggled with creating compelling LinkedIn content, Brushin has been a game-changer. My network has grown significantly since I started using it."
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "HR Specialist",
    company: "Global Solutions",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    quote: "The optimization feature is brilliant! It takes my rough drafts and turns them into polished, professional posts that consistently get high engagement."
  },
  {
    id: 4,
    name: "Arjun Kapoor",
    role: "Content Strategist",
    company: "Creative Labs",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    quote: "Brushin's AI understands the LinkedIn algorithm better than any tool I've used before. My posts now receive more comments and shares than I ever thought possible."
  },
  {
    id: 5,
    name: "Kavita Patel",
    role: "Sales Director",
    company: "Global Connect",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
    quote: "My sales team relies on Brushin daily to create engaging posts that attract potential clients. It's become an essential tool in our social selling strategy."
  },
  {
    id: 6,
    name: "Vikram Singh",
    role: "Tech Entrepreneur",
    company: "Future Systems",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    quote: "The time I save with Brushin allows me to focus on growing my business while maintaining a strong professional presence online. Worth every penny!"
  }
];

const Testimonials = () => {
  const cardsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.testimonial-card');
      cards.forEach((card, index) => {
        // Cast card to HTMLElement to access style property
        const cardElement = card as HTMLElement;
        cardElement.classList.add('opacity-0');
        cardElement.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
      });
    }
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <Layout>
      <div className="py-16 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-[500px] -right-[500px] w-[800px] h-[800px] bg-brand-600/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
        <div className="absolute -bottom-[300px] -left-[300px] w-[500px] h-[500px] bg-brand-600/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
        
        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-500/20 text-brand-400 rounded-full text-sm font-medium mb-4">
              User Success Stories
            </span>
            <h1 className="text-4xl font-bold text-white mb-4 relative">
              See What Our Users Are Saying
              <div className="absolute -top-10 -right-10 text-8xl text-brand-400/10 animate-pulse">❝</div>
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Discover how professionals are transforming their LinkedIn presence with Brushin.
            </p>
          </div>

          <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonialsData.map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="testimonial-card bg-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group perspective"
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 30;
                  const rotateY = (centerX - x) / 30;
                  
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
                }}
              >
                <CardContent className="p-6 relative">
                  <div className="absolute top-4 left-4 text-brand-400/40 group-hover:text-brand-400/70 transition-colors">
                    <Quote size={36} />
                  </div>
                  <div className="flex items-center mb-4 mt-12">
                    <div className="relative w-14 h-14 overflow-hidden rounded-full mr-4">
                      <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 rounded-full border-2 border-brand-400/30 group-hover:border-brand-400 transition-all"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{testimonial.name}</h3>
                      <p className="text-sm text-slate-400">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 italic mb-4 relative">
                    "{testimonial.quote}"
                    <span className="absolute -bottom-2 -right-1 text-4xl text-brand-400/10">❞</span>
                  </p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400 transform transition-transform duration-300 hover:scale-125 cursor-pointer">★</span>
                    ))}
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Testimonials;
