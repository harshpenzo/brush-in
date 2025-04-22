
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/Layout";
import { Quote } from "lucide-react";

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
                className="bg-slate-800 border-slate-700 text-white hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
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
