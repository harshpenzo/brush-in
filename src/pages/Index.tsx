
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PostForm from "@/components/PostForm";
import PostPreview from "@/components/PostPreview";
import Tips from "@/components/Tips";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import { CreatePostFormValues } from "@/components/post/CreatePostForm";
import { OptimizePostFormValues } from "@/components/post/OptimizePostForm";
import { extractTopicFromPost } from "@/utils/postGenerationUtils";
import { generateGeminiPost, optimizeGeminiPost, generateGeminiHashtags } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [generatedPost, setGeneratedPost] = useState("");
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [activeOption, setActiveOption] = useState<"create" | "optimize" | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [readabilityScore, setReadabilityScore] = useState<number | null>(null);
  const [currentTopic, setCurrentTopic] = useState("");
  const [currentTone, setCurrentTone] = useState("");
  const [currentIndustry, setCurrentIndustry] = useState("");
  
  const featuresRef = useRef<HTMLDivElement>(null);
  const postCreatorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Check if user is authenticated before proceeding
  const checkAuthAndProceed = (option: "create" | "optimize") => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please log in or sign up to create posts",
      });
      navigate("/auth");
      return;
    }
    
    // If authenticated, proceed with post creation
    setActiveOption(option);
    setShowPostCreator(true);
    setTimeout(() => {
      postCreatorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleGeneratePost = async (values: CreatePostFormValues) => {
    setIsGenerating(true);
    
    try {
      // Save values for post metadata
      setCurrentTopic(values.topic);
      setCurrentTone(values.tone);
      setCurrentIndustry(values.industry);
      
      // Generate post using Gemini API
      const generatedPost = await generateGeminiPost(
        values.topic,
        values.tone,
        values.keywords,
        values.description,
        values.contentStyle,
        values.postLength,
        values.industry
      );
      
      // Calculate readability score - this could be enhanced with a real algorithm
      const simulatedScore = Math.floor(Math.random() * 30) + 70; // 70-100 score
      setReadabilityScore(simulatedScore);
      
      // Generate related hashtags with Gemini API
      const generatedHashtags = await generateGeminiHashtags(values.topic, values.industry, values.keywords);
      setHashtags(generatedHashtags);
      
      setGeneratedPost(generatedPost);
      
      toast({
        title: "Post generated",
        description: "Your LinkedIn post has been created successfully.",
      });
    } catch (error) {
      console.error("Error generating post:", error);
      toast({
        title: "Generation failed",
        description: "There was an error generating your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptimizePost = async (values: OptimizePostFormValues) => {
    setIsGenerating(true);
    
    try {
      // Extract topic from post for metadata
      const extractedTopic = extractTopicFromPost(values.existingPost);
      setCurrentTopic(extractedTopic);
      setCurrentTone(values.optimizationGoal);
      setCurrentIndustry("general");
      
      // Optimize post using Gemini API
      const optimizedPost = await optimizeGeminiPost(values.existingPost, values.optimizationGoal);
      
      // Calculate simulated readability score - could be enhanced with a real algorithm
      const simulatedScore = Math.floor(Math.random() * 20) + 80; // 80-100 score (optimized should be better)
      setReadabilityScore(simulatedScore);
      
      // Generate related hashtags
      const generatedHashtags = await generateGeminiHashtags(extractedTopic, "general", "");
      setHashtags(generatedHashtags);
      
      setGeneratedPost(optimizedPost);
      
      toast({
        title: "Post optimized",
        description: `Your LinkedIn post has been enhanced for better ${values.optimizationGoal}.`,
      });
    } catch (error) {
      console.error("Error optimizing post:", error);
      toast({
        title: "Optimization failed",
        description: "There was an error optimizing your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Layout onScrollToFeatures={scrollToFeatures}>
      <Hero 
        onScrollToFeatures={scrollToFeatures} 
        onSelectOption={checkAuthAndProceed} 
      />
      
      <div ref={featuresRef} className="scroll-mt-16">
        <Features onSelectOption={checkAuthAndProceed} />
      </div>
      
      {showPostCreator && (
        <div ref={postCreatorRef} className="py-16 bg-slate-800 relative overflow-hidden scroll-mt-16">
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
                    initialMode={activeOption || "create"}
                    isGenerating={isGenerating}
                  />
                </div>
              </div>
              
              <div className="lg:flex lg:flex-col lg:space-y-4 fade-in-bottom order-first lg:order-last perspective-1000" style={{ animationDelay: "200ms" }}>
                <div className="mb-4 lg:flex-grow transition-transform duration-500 hover:scale-105">
                  <PostPreview 
                    post={generatedPost} 
                    hashtags={hashtags}
                    readabilityScore={readabilityScore}
                    topic={currentTopic}
                    tone={currentTone}
                    industry={currentIndustry}
                  />
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
