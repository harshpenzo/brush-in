
import Layout from "@/components/Layout";
import SEOMetaTags from "@/components/SEOMetaTags";
import { useEffect, useRef, useState } from "react";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutTeam from "@/components/about/AboutTeam";
import AboutValues from "@/components/about/AboutValues";
import AboutCTA from "@/components/about/AboutCTA";

const About = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const setSectionRef = (index: number, ref: HTMLDivElement | null) => {
    if (sectionRefs.current) {
      sectionRefs.current[index] = ref;
    }
  };

  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 100);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
            }
          });
        }, 
        { 
          threshold: 0.1,
          rootMargin: '50px 0px'
        }
      );

      const observeElements = () => {
        if (sectionRefs.current) {
          sectionRefs.current.forEach((ref, index) => {
            if (ref) {
              ref.style.opacity = '0';
              ref.style.transform = 'translateY(20px)';
              ref.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out';
              
              setTimeout(() => {
                if (ref) {
                  observer.observe(ref);
                }
              }, 100 + (index * 100));
            }
          });
        }
      };

      if (isLoaded) {
        observeElements();
      }

      return () => {
        observer.disconnect();
        clearTimeout(timer);
      };
    } catch (error) {
      console.error('Error in About page useEffect:', error);
      setHasError(true);
    }
  }, [isLoaded]);

  const aboutSchemaMarkup = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Brushin.in - AI LinkedIn Post Generator",
    "description": "Learn about Brushin.in, the leading AI LinkedIn post generator helping professionals create viral content and build their personal brand.",
    "url": "https://brushin.in/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Brushin.in",
      "description": "AI-powered LinkedIn post generator helping professionals create viral content"
    }
  };

  // Error fallback
  if (hasError) {
    return (
      <Layout>
        <SEOMetaTags
          title="About Brushin.in - AI LinkedIn Post Generator | Our Story & Mission"
          description="Discover how Brushin.in became the #1 AI LinkedIn post generator. Learn about our mission to help professionals create viral content and build their personal brand with AI technology."
          keywords="about Brushin.in, AI LinkedIn generator company, LinkedIn content creation team, AI writing tool developers, professional content creation"
          url="https://brushin.in/about"
          schemaMarkup={aboutSchemaMarkup}
        />
        <div className="min-h-screen py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
          <div className="container px-4 mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
                About Brushin.in
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                We are the leading AI LinkedIn post generator helping professionals create viral content.
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  To help professionals create engaging, viral LinkedIn content without the stress or time commitment.
                </p>
              </div>
              
              <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-4">
                  What We Do
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  We provide AI-powered LinkedIn post generation that helps users create professional content 
                  optimized for maximum engagement and reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div>
        <SEOMetaTags
          title="About Brushin.in - AI LinkedIn Post Generator | Our Story & Mission"
          description="Discover how Brushin.in became the #1 AI LinkedIn post generator. Learn about our mission to help professionals create viral content and build their personal brand with AI technology."
          keywords="about Brushin.in, AI LinkedIn generator company, LinkedIn content creation team, AI writing tool developers, professional content creation"
          url="https://brushin.in/about"
          schemaMarkup={aboutSchemaMarkup}
        />
        <div className="min-h-screen py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute -top-[500px] -right-[500px] w-[800px] h-[800px] bg-sky-500/5 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
          <div className="absolute -bottom-[300px] -left-[300px] w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
          
          <div className="container px-4 mx-auto relative z-10 max-w-7xl">
            <AboutHero onSectionRef={setSectionRef} isLoaded={isLoaded} />
            <AboutMission onSectionRef={setSectionRef} />
            <AboutTeam onSectionRef={setSectionRef} />
            <AboutValues onSectionRef={setSectionRef} />
            <AboutCTA onSectionRef={setSectionRef} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
