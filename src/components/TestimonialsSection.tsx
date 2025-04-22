
import { Quote } from "lucide-react";

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
    quote: "BrushIn has completely transformed how I create content for LinkedIn. The AI-powered suggestions are spot-on and have helped me increase engagement by over 200%."
  },
  {
    id: 2,
    name: "David Chen",
    role: "Startup Founder",
    company: "Nexus Ventures",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    quote: "As someone who struggled with creating compelling LinkedIn content, BrushIn has been a game-changer. My network has grown significantly since I started using it."
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "HR Specialist",
    company: "Global Solutions",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    quote: "The optimization feature is brilliant! It takes my rough drafts and turns them into polished, professional posts that consistently get high engagement."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-bottom">
          <span className="inline-block px-4 py-2 bg-brand-100 text-brand-600 rounded-full text-sm font-medium mb-4">
            Success Stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            What our users are saying
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Professionals from various industries have transformed their LinkedIn presence with BrushIn.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-smooth hover:shadow-smooth-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center mb-6">
                <img 
                  src={testimonial.avatarUrl} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-brand-100"
                />
                <div>
                  <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                  <p className="text-sm text-slate-500">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
              
              <div className="mb-4 text-brand-300/50">
                <Quote size={32} className="hand-drawn" />
              </div>
              
              <p className="text-slate-700 italic">{testimonial.quote}</p>
              
              <div className="mt-6 flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg 
                    key={star} 
                    className="w-5 h-5 text-yellow-500" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a href="/testimonials" className="inline-flex items-center text-brand-600 font-medium hover:text-brand-700 transition-smooth link-underline">
            View all testimonials
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
