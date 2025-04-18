import { useState, useRef } from "react";
import { Linkedin } from "lucide-react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PostForm from "@/components/PostForm";
import PostPreview from "@/components/PostPreview";
import Tips from "@/components/Tips";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onScrollToFeatures={scrollToFeatures} />
      
      <Hero onScrollToFeatures={scrollToFeatures} onSelectOption={selectOption} />
      
      <div ref={featuresRef}>
        <Features onSelectOption={selectOption} />
      </div>
      
      {showPostCreator && (
        <div ref={postCreatorRef} className="py-16 bg-gray-50">
          <main className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800">
                {activeOption === "create" 
                  ? "Create Your LinkedIn Post" 
                  : "Optimize Your LinkedIn Post"}
              </h2>
              <p className="text-gray-600 mt-2">
                {activeOption === "create"
                  ? "Generate engaging content for your professional network"
                  : "Enhance your existing post to maximize engagement"}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <PostForm 
                  onGenerate={handleGeneratePost} 
                  onOptimize={handleOptimizePost} 
                  initialMode={activeOption === "optimize" ? "optimize" : "create"}
                />
              </div>
              
              <div className="space-y-6">
                <div className="h-[400px]">
                  <PostPreview post={generatedPost} />
                </div>
                
                <Tips />
              </div>
            </div>
          </main>
        </div>
      )}
      
      <footer className="bg-gray-100 py-6 border-t mt-auto">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Linkedin size={20} className="text-[#0077B5]" />
            <span className="font-semibold">BrusIn</span>
          </div>
          <p className="text-sm">
            BrusIn - Create engaging LinkedIn content that drives results for your professional network
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
