
import { useState, useRef } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PostForm from "@/components/PostForm";
import PostPreview from "@/components/PostPreview";
import Tips from "@/components/Tips";
import { Linkedin } from "lucide-react";

const Index = () => {
  const [generatedPost, setGeneratedPost] = useState("");
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [activeOption, setActiveOption] = useState<"create" | "optimize" | null>(null);
  
  const featuresRef = useRef<HTMLDivElement>(null);
  const postCreatorRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">      
      <Header onScrollToFeatures={scrollToFeatures} />
      
      <Hero onScrollToFeatures={scrollToFeatures} onSelectOption={selectOption} />
      
      <div ref={featuresRef}>
        <Features onSelectOption={selectOption} />
      </div>
      
      {showPostCreator && (
        <div ref={postCreatorRef} className="py-16 bg-slate-50 dark:bg-slate-800">
          <main className="container mx-auto px-4">
            <div className="text-center mb-10 animate-slide-in">
              <span className="inline-block px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium mb-4">
                AI Content Generator
              </span>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {activeOption === "create" 
                  ? "Create Your LinkedIn Post" 
                  : "Optimize Your LinkedIn Post"}
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {activeOption === "create"
                  ? "Generate engaging content for your professional network"
                  : "Enhance your existing post to maximize engagement"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
              <div className="space-y-6 animate-slide-in" style={{ animationDelay: "100ms" }}>
                <PostForm 
                  onGenerate={handleGeneratePost} 
                  onOptimize={handleOptimizePost} 
                  initialMode={activeOption === "optimize" ? "optimize" : "create"}
                />
              </div>
              
              <div className="space-y-6 animate-slide-in" style={{ animationDelay: "200ms" }}>
                <div className="h-[400px]">
                  <PostPreview post={generatedPost} />
                </div>
                
                <Tips />
              </div>
            </div>
          </main>
        </div>
      )}
      
      <footer className="bg-slate-900 dark:bg-slate-950 py-12 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <div className="bg-brand-600 text-white p-2 rounded-lg">
              <Linkedin size={20} />
            </div>
            <span className="font-semibold text-white text-xl">Brush<span className="text-brand-400">In</span></span>
          </div>
          <p className="text-slate-400 max-w-md mx-auto">
            BrushIn - Create engaging LinkedIn content that drives results for your professional network
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-smooth">Terms</a>
            <a href="#" className="text-slate-400 hover:text-white transition-smooth">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-smooth">Contact</a>
          </div>
          <div className="mt-6 text-slate-500 text-sm">
            © {new Date().getFullYear()} BrushIn. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
