
import { useState, useRef } from "react";
import { Linkedin, Sparkles, Star, Music, Zap } from "lucide-react";
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
    <div className="min-h-screen flex flex-col bg-sky-300">
      {/* Pixel art grid background overlay */}
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5')] bg-cover bg-center opacity-10 pointer-events-none" style={{ imageRendering: 'pixelated' }}></div>
      <div className="fixed inset-0 bg-grid-pattern opacity-20 pointer-events-none"></div>
      
      <Header onScrollToFeatures={scrollToFeatures} />
      
      <Hero onScrollToFeatures={scrollToFeatures} onSelectOption={selectOption} />
      
      <div ref={featuresRef}>
        <Features onSelectOption={selectOption} />
      </div>
      
      {showPostCreator && (
        <div ref={postCreatorRef} className="py-16 backdrop-blur-sm">
          <main className="container mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-block pixel-border bg-white py-3 px-8 mb-6 transform rotate-1 shadow-lg">
                <h2 className="text-3xl font-bold text-pink-500 [text-shadow:_2px_2px_0_#000]">
                  {activeOption === "create" 
                    ? "Create Your LinkedIn Post" 
                    : "Optimize Your LinkedIn Post"}
                </h2>
              </div>
              <p className="text-xl text-indigo-900 mt-2 font-semibold">
                {activeOption === "create"
                  ? "Generate engaging content for your professional network"
                  : "Enhance your existing post to maximize engagement"}
              </p>
              
              <div className="flex justify-center items-center mt-4 gap-2">
                <Star className="w-5 h-5 text-yellow-500 animate-pulse" />
                <Sparkles className="w-5 h-5 text-pink-500 animate-ping" style={{ animationDuration: '3s' }} />
                <Star className="w-5 h-5 text-yellow-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
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
      
      <footer className="bg-indigo-900 py-6 mt-auto border-t-4 border-pink-500 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-[linear-gradient(90deg,#ff71ce,#01cdfe,#05ffa1,#b967ff,#fffb96)]"></div>
        <div className="container mx-auto px-4 text-center text-white">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Linkedin size={20} className="text-[#0077B5]" />
            <span className="font-semibold font-pixel text-xl">BrushIn</span>
            <Sparkles className="w-5 h-5 text-yellow-300" />
          </div>
          <p className="text-sm">
            BrushIn - Create engaging LinkedIn content that drives results for your professional network
          </p>
          <div className="flex justify-center mt-4 gap-4">
            <Music className="w-5 h-5 text-pink-400 animate-bounce" style={{ animationDuration: '2s' }} />
            <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
            <Star className="w-5 h-5 text-cyan-300 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
