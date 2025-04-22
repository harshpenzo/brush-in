
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
      <div className="bg-pattern">
        <Hero onScrollToFeatures={scrollToFeatures} onSelectOption={selectOption} />
      </div>
      
      <div ref={featuresRef}>
        <Features onSelectOption={selectOption} />
      </div>
      
      {showPostCreator && (
        <div ref={postCreatorRef} className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 fade-in-bottom">
              <span className="inline-block px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium mb-4">
                AI Content Generator
              </span>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
                {activeOption === "create" 
                  ? "Create Your LinkedIn Post" 
                  : "Optimize Your LinkedIn Post"}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                {activeOption === "create"
                  ? "Generate engaging content for your professional network with our AI-powered tools."
                  : "Enhance your existing post to maximize engagement and professional impact."}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <div className="space-y-6 fade-in-bottom" style={{ animationDelay: "100ms" }}>
                <PostForm 
                  onGenerate={handleGeneratePost} 
                  onOptimize={handleOptimizePost} 
                  initialMode={activeOption === "optimize" ? "optimize" : "create"}
                />
              </div>
              
              <div className="space-y-6 fade-in-bottom" style={{ animationDelay: "200ms" }}>
                <div className="h-[400px]">
                  <PostPreview post={generatedPost} />
                </div>
                
                <Tips />
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
