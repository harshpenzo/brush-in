import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechGrowth Inc.",
    quote: "BrushIn has completely transformed my LinkedIn presence. What used to take me hours now happens in minutes, and the engagement on my posts has increased by 300%.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Startup Founder",
    company: "NexGen Solutions",
    quote: "As a busy entrepreneur, I don't have time to craft perfect LinkedIn posts. BrushIn has been a game-changer for maintaining my professional presence while focusing on growing my business.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "Career Coach",
    company: "Career Elevate",
    quote: "I recommend BrushIn to all my clients who are looking to build their personal brand on LinkedIn. The AI-generated content is so natural that no one would guess it wasn't written manually.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Sales Director",
    company: "Global Connections Ltd.",
    quote: "The optimization feature in BrushIn is incredible. I've seen my connection requests and responses increase dramatically since I started using it to refine my outreach messages.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "Content Strategist",
    company: "Horizon Media",
    quote: "The industry-specific templates have been invaluable for my clients across different sectors. BrushIn understands the nuances of professional communication in a way I haven't seen in other tools.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  },
  {
    id: 6,
    name: "Thomas Greene",
    role: "HR Consultant",
    company: "People First Advisors",
    quote: "I was skeptical about AI-generated content, but BrushIn has changed my mind. It captures my voice perfectly and has helped me establish thought leadership in my industry.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80"
  }
];

const Testimonials = () => {
  return (
    <Layout>
      <div className="py-16 bg-white dark:bg-slate-900">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium mb-4">
              User Success Stories
            </span>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              See What Our Users Are Saying
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Discover how professionals across industries are transforming their LinkedIn presence with BrushIn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonialsData.map((testimonial) => (
              <Card key={testimonial.id} className="border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-14 h-14 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{testimonial.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-yellow-400">★</span>
                    ))}
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Join thousands of professionals who trust BrushIn
            </h2>
            <div className="flex flex-wrap justify-center gap-y-8 gap-x-16">
              <img src="https://via.placeholder.com/120x40?text=Company+Logo" alt="Company Logo" className="h-10 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
              <img src="https://via.placeholder.com/120x40?text=Company+Logo" alt="Company Logo" className="h-10 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
              <img src="https://via.placeholder.com/120x40?text=Company+Logo" alt="Company Logo" className="h-10 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
              <img src="https://via.placeholder.com/120x40?text=Company+Logo" alt="Company Logo" className="h-10 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
              <img src="https://via.placeholder.com/120x40?text=Company+Logo" alt="Company Logo" className="h-10 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Testimonials;
