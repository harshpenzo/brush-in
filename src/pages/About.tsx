
import Layout from "@/components/Layout";
import { useEffect, useRef, useState } from "react";
import AboutHero from "@/components/about/AboutHero";
import AboutMission from "@/components/about/AboutMission";
import AboutTeam from "@/components/about/AboutTeam";
import AboutValues from "@/components/about/AboutValues";
import AboutCTA from "@/components/about/AboutCTA";

const About = () => {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const setSectionRef = (index: number, ref: HTMLDivElement | null) => {
    sectionRefs.current[index] = ref;
  };

  useEffect(() => {
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
    };

    if (isLoaded) {
      observeElements();
    }

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isLoaded]);

  return (
    <Layout>
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
    </Layout>
  );
};

export default About;
