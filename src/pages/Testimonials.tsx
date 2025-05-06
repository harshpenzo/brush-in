
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Quote } from "lucide-react";

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
    name: "David Chen",
    role: "Startup Founder",
    company: "Nexus Ventures",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    quote: "As someone who struggled with creating compelling LinkedIn content, Brushin has been a game-changer. My network has grown significantly since I started using it."
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "HR Specialist",
    company: "Global Solutions",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
    quote: "The optimization feature is brilliant! It takes my rough drafts and turns them into polished, professional posts that consistently get high engagement."
  },
  {
    id: 4,
    name: "Michael Roberts",
    role: "Content Strategist",
    company: "Creative Labs",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop",
    quote: "Brushin's AI understands the LinkedIn algorithm better than any tool I've used before. My posts now receive more comments and shares than I ever thought possible."
  },
  {
    id: 5,
    name: "Jessica Thompson",
    role: "Sales Director",
    company: "Global Connect",
    avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop",
    quote: "My sales team relies on Brushin daily to create engaging posts that attract potential clients. It's become an essential tool in our social selling strategy."
  },
  {
    id: 6,
    name: "Thomas Anderson",
    role: "Tech Entrepreneur",
    company: "Future Systems",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    quote: "The time I save with Brushin allows me to focus on growing my business while maintaining a strong professional presence online. Worth every penny!"
  }
];

const Testimonials = () => {
  return (
    <Layout>
      <div className="py-16 bg-slate-900 text-white">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-500/20 text-brand-400 rounded-full text-sm font-medium mb-4">
              User Success Stories
            </span>
            <h1 className="text-4xl font-bold text-white mb-4">
              See What Our Users Are Saying
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Discover how professionals are transforming their LinkedIn presence with Brushin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonialsData.map((testimonial) => (
              <Card 
                key={testimonial.id} 
                className="bg-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
              >
                <CardContent className="p-6">
                  <div className="absolute top-4 left-4 text-brand-400/40 group-hover:text-brand-400/70 transition-colors">
                    <Quote size={36} />
                  </div>
                  <div className="flex items-center mb-4 mt-12">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-brand-400/30 group-hover:border-brand-400 transition-all"
                    />
                    <div>
                      <h3 className="font-semibold text-white">{testimonial.name}</h3>
                      <p className="text-sm text-slate-400">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
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
