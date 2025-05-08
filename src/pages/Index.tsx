
import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PostForm from "@/components/PostForm";
import PostPreview from "@/components/PostPreview";
import Tips from "@/components/Tips";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [generatedPost, setGeneratedPost] = useState("");
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [activeOption, setActiveOption] = useState<"create" | "optimize" | null>(null);
  
  const featuresRef = useRef<HTMLDivElement>(null);
  const postCreatorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleGeneratePost = (post: string) => {
    setGeneratedPost(post);
  };

  const handleOptimizePost = (post: string) => {
    setGeneratedPost(post);
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const selectOption = (option: "create" | "optimize") => {
    setActiveOption(option);
    setShowPostCreator(true);
    setTimeout(() => {
      postCreatorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Layout onScrollToFeatures={scrollToFeatures}>
      <Hero onScrollToFeatures={scrollToFeatures} onSelectOption={selectOption} />
      
      <div ref={featuresRef}>
        <Features onSelectOption={selectOption} />
      </div>
      
      {showPostCreator && (
        <div ref={postCreatorRef} className="py-16 bg-slate-800 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
          <div className="absolute -bottom-[200px] -left-[200px] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-8 fade-in-bottom">
              <span className="inline-block px-4 py-2 bg-sky-500/20 text-sky-400 rounded-full text-sm font-medium mb-4">
                AI Content Generator
              </span>
              <h2 className="text-3xl font-bold text-white mb-3 relative">
                {activeOption === "create" 
                  ? "Create Your LinkedIn Post" 
                  : "Optimize Your LinkedIn Post"}
                <div className="absolute -top-8 -right-8 text-7xl text-brand-400/10 animate-pulse">✍️</div>
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                {activeOption === "create"
                  ? "Generate engaging content for your professional network with our AI-powered tools."
                  : "Enhance your existing post to maximize engagement and professional impact."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              <div className="lg:col-span-2 space-y-6 fade-in-bottom perspective-1000" style={{ animationDelay: "100ms" }}>
                <div className="perspective-child transition-transform duration-500 hover:rotate-y-1 transform-style-3d">
                  <PostForm 
                    onGenerate={handleGeneratePost} 
                    onOptimize={handleOptimizePost} 
                    initialMode={activeOption === "optimize" ? "optimize" : "create"}
                  />
                </div>
              </div>
              
              <div className="lg:flex lg:flex-col lg:space-y-4 fade-in-bottom order-first lg:order-last perspective-1000" style={{ animationDelay: "200ms" }}>
                <div className="mb-4 lg:flex-grow transition-transform duration-500 hover:scale-105">
                  <PostPreview post={generatedPost} />
                </div>
                
                <div className="h-auto transition-transform duration-500 hover:translate-y-[-5px]">
                  <Tips />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <TestimonialsSection />
      <CtaSection />
    </Layout>
  );
};

export default Index;
