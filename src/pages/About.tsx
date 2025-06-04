
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { useEffect, useRef } from "react";

const About = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }, index * 200);
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '50px 0px'
    });

    sectionRefs.current.forEach((ref) => {
      if (ref) {
        ref.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Layout>
      <div className="py-16 bg-slate-900 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute -top-[500px] -right-[500px] w-[800px] h-[800px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
        <div className="absolute -bottom-[300px] -left-[300px] w-[500px] h-[500px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
        
        <div className="container px-4 mx-auto relative z-10">
          {/* Hero Section */}
          <div ref={(el) => sectionRefs.current[0] = el} className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-brand-500/20 text-brand-400 rounded-full text-sm font-medium mb-4">
              Our Story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative">
              Empowering Professionals on LinkedIn
              <div className="absolute -top-8 -right-8 text-7xl text-brand-400/10 animate-pulse">✨</div>
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mx-auto mb-8">
              Brushin was founded with a simple mission: to help professionals create engaging, 
              high-quality LinkedIn content without the stress or time commitment.
            </p>
          </div>

          {/* Mission Section */}
          <div ref={(el) => sectionRefs.current[1] = el} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-slate-300 mb-6">
                In today's fast-paced professional world, maintaining an active LinkedIn presence is 
                crucial for career growth and networking. However, creating compelling content consistently 
                can be time-consuming and challenging.
              </p>
              <p className="text-slate-300 mb-6">
                We built Brushin to democratize content creation on LinkedIn, leveraging the power of AI 
                to help professionals of all writing abilities share their expertise, insights, and 
                experiences effectively.
              </p>
              <p className="text-slate-300">
                Our goal is to remove the barriers to consistent professional communication, helping 
                you build your personal brand and expand your network without sacrificing your valuable time.
              </p>
            </div>
            <div className="bg-slate-800 rounded-2xl p-8 md:p-12 border border-slate-700">
              <div className="flex flex-col space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">We believe:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">1</span>
                      <p className="text-slate-300">Everyone has valuable professional insights worth sharing</p>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">2</span>
                      <p className="text-slate-300">Technology should enhance human creativity, not replace it</p>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">3</span>
                      <p className="text-slate-300">Professional communication should be accessible to everyone</p>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-brand-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5 flex-shrink-0">4</span>
                      <p className="text-slate-300">Your time is better spent on what you do best</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div ref={(el) => sectionRefs.current[2] = el} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                We're a dedicated group of professionals passionate about helping others succeed on LinkedIn.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-2">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  alt="Alex Morgan"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-brand-500/30"
                />
                <h3 className="text-xl font-semibold text-white">Alex Morgan</h3>
                <p className="text-brand-400 mb-2">Founder & CEO</p>
                <p className="text-slate-300 text-sm max-w-xs mx-auto">
                  Former LinkedIn content strategist with 10+ years of experience in professional networking.
                </p>
              </div>
              <div className="text-center bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-2">
                <img 
                  src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  alt="Taylor Chen"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-brand-500/30"
                />
                <h3 className="text-xl font-semibold text-white">Taylor Chen</h3>
                <p className="text-brand-400 mb-2">CTO</p>
                <p className="text-slate-300 text-sm max-w-xs mx-auto">
                  AI specialist with expertise in natural language processing and content generation.
                </p>
              </div>
              <div className="text-center bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-2">
                <img 
                  src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80" 
                  alt="Jordan Lee"
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-brand-500/30"
                />
                <h3 className="text-xl font-semibold text-white">Jordan Lee</h3>
                <p className="text-brand-400 mb-2">Head of Product</p>
                <p className="text-slate-300 text-sm max-w-xs mx-auto">
                  Product strategist focused on creating intuitive tools for professional development.
                </p>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div ref={(el) => sectionRefs.current[3] = el} className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Our Core Values</h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                These principles guide everything we do at Brushin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">Innovation</h3>
                <p className="text-slate-300">
                  We continuously explore new ways to leverage AI to enhance professional communication.
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">Inclusivity</h3>
                <p className="text-slate-300">
                  We build tools that empower professionals across all industries and experience levels.
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">Integrity</h3>
                <p className="text-slate-300">
                  We prioritize privacy, transparency, and ethical AI use in everything we build.
                </p>
              </div>
              <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-brand-500/50 transition-all duration-300 hover:-translate-y-2">
                <div className="w-12 h-12 bg-brand-500/20 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="font-semibold text-lg text-white mb-2">Excellence</h3>
                <p className="text-slate-300">
                  We strive for the highest quality in our content generation and user experience.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div ref={(el) => sectionRefs.current[4] = el} className="text-center bg-slate-800 rounded-2xl p-10 max-w-4xl mx-auto border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to transform your LinkedIn presence?
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who are saving time and getting better results with Brushin - completely free!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="bg-brand-600 hover:bg-brand-700 text-white" asChild>
                <a href="/">Try Brushin Free</a>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700" asChild>
                <a href="/testimonials">Read Success Stories</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
