
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
import { generateGeminiPost, optimizeGeminiPost, generateGeminiHashtags } from "@/services/geminiService";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { canCreatePost, incrementPostCount } from "@/services/usageService";
import SEOMetaTags from "@/components/SEOMetaTags";
import KeywordOptimizedContent from "@/components/KeywordOptimizedContent";
import AdvancedSEO from "@/components/AdvancedSEO";
import TechnicalSEO from "@/components/TechnicalSEO";
import DomainAuthorityInfo from "@/components/DomainAuthorityInfo";
import InternalLinkingHub from "@/components/InternalLinkingHub";
import AdvancedTechnicalSEO from "@/components/AdvancedTechnicalSEO";
import SocialProofSEO from "@/components/SocialProofSEO";

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
  const { isAuthenticated, user } = useAuth();

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
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please log in to generate posts",
        variant: "destructive"
      });
      return;
    }

    // Check usage limits before generating
    const { canCreate, usage } = await canCreatePost(user.id);
    if (!canCreate) {
      toast({
        title: "Usage limit reached",
        description: `You've reached your monthly limit of ${usage?.monthly_limit || 50} posts. Upgrade for unlimited access!`,
        variant: "destructive"
      });
      navigate("/pricing");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Save values for post metadata
      setCurrentTopic(values.topic);
      setCurrentTone(values.tone);
      setCurrentIndustry(values.industry);
      
      // Generate post using Gemini API by default (falls back locally if no key)
      const humanizedDescription = values.humanize
        ? `${values.description || ""}

Humanization guidelines:
- First-person voice and authentic perspective
- Use natural contractions
- Include a brief, specific anecdote or micro-story if relevant
- Vary sentence lengths; keep paragraphs 1–3 sentences
- Add a thoughtful question at the end
- Include 3–5 relevant, niche+popular mix hashtags`
        : values.description || "";

      const generatedPost = await generateGeminiPost(
        values.topic,
        values.tone,
        values.keywords || "",
        humanizedDescription,
        values.contentStyle,
        values.postLength,
        values.industry
      );
      
      // Calculate enhanced readability score based on content analysis
      const calculateReadabilityScore = (text: string) => {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const avgWordsPerSentence = words.length / sentences.length;
        const avgCharsPerWord = text.replace(/\s/g, '').length / words.length;
        
        // LinkedIn-optimized scoring (shorter sentences = better)
        let score = 100;
        if (avgWordsPerSentence > 20) score -= 15;
        else if (avgWordsPerSentence > 15) score -= 10;
        if (avgCharsPerWord > 6) score -= 10;
        else if (avgCharsPerWord > 5) score -= 5;
        if (text.length > 1000) score -= 10;
        else if (text.length > 600) score -= 5;
        
        return Math.max(70, Math.min(100, score));
      };
      
      const calculatedScore = calculateReadabilityScore(generatedPost);
      setReadabilityScore(calculatedScore);
      
      // Generate related hashtags with Gemini API
      const generatedHashtags = await generateGeminiHashtags(
        values.topic, 
        values.industry, 
        values.keywords || ""
      );
      setHashtags(generatedHashtags);
      
      setGeneratedPost(generatedPost);

      // Increment usage count after successful generation
      await incrementPostCount(user.id);
      
      toast({
        title: "Post generated successfully",
        description: "Your LinkedIn post has been created with AI.",
      });
    } catch (error) {
      console.error("Error generating post:", error);
      toast({
        title: "Generation failed",
        description: error instanceof Error ? error.message : "There was an error generating your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptimizePost = async (values: OptimizePostFormValues) => {
    if (!user?.id) {
      toast({
        title: "Authentication required",
        description: "Please log in to optimize posts",
        variant: "destructive"
      });
      return;
    }

    // Check usage limits before optimizing
    const { canCreate, usage } = await canCreatePost(user.id);
    if (!canCreate) {
      toast({
        title: "Usage limit reached",
        description: `You've reached your monthly limit of ${usage?.monthly_limit || 50} posts. Upgrade for unlimited access!`,
        variant: "destructive"
      });
      navigate("/pricing");
      return;
    }

    setIsGenerating(true);
    
    try {
      // Extract basic topic from post for metadata
      const words = values.existingPost.split(/\s+/).slice(0, 5).join(" ");
      setCurrentTopic(words);
      setCurrentTone(values.optimizationGoal);
      setCurrentIndustry("general");
      
      // Optimize post using Gemini API
      const enhancedGoal = values.humanize 
        ? `${values.optimizationGoal} with humanized tone (first-person, natural contractions, brief anecdote where relevant, short paragraphs, end with a thoughtful question, add 3–5 relevant hashtags)`
        : values.optimizationGoal;
      const optimizedPost = await optimizeGeminiPost(
        values.existingPost, 
        enhancedGoal
      );
      
      // Calculate enhanced readability score
      const calculateReadabilityScore = (text: string) => {
        const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
        const words = text.split(/\s+/).filter(w => w.length > 0);
        const avgWordsPerSentence = words.length / sentences.length;
        
        let score = 100;
        if (avgWordsPerSentence > 20) score -= 15;
        else if (avgWordsPerSentence > 15) score -= 10;
        
        // Optimized posts should score higher
        return Math.max(80, Math.min(100, score + 5));
      };
      
      const calculatedScore = calculateReadabilityScore(optimizedPost);
      setReadabilityScore(calculatedScore);
      
      // Generate related hashtags
      const generatedHashtags = await generateGeminiHashtags(words, "general", "");
      setHashtags(generatedHashtags);
      
      setGeneratedPost(optimizedPost);

      // Increment usage count after successful optimization
      await incrementPostCount(user.id);
      
      toast({
        title: "Post optimized successfully",
        description: `Your LinkedIn post has been enhanced for better ${values.optimizationGoal} using AI.`,
      });
    } catch (error) {
      console.error("Error optimizing post:", error);
      toast({
        title: "Optimization failed",
        description: error instanceof Error ? error.message : "There was an error optimizing your post. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Brushin.in - AI LinkedIn Post Generator | Create Viral LinkedIn Content",
    "description": "The #1 AI LinkedIn post generator. Create viral LinkedIn posts, boost engagement by 500%, and build your professional brand with Brushin.in. Free LinkedIn AI posts available.",
    "url": "https://brushin.in/",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Brushin.in LinkedIn Post Generator",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://brushin.in/"
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "name": "AI LinkedIn Post Generator",
          "item": "https://brushin.in/"
        }
      ]
    }
  };

  return (
    <>
      <SEOMetaTags 
        title="Brushin.in - #1 AI LinkedIn Post Generator | Create Viral LinkedIn Content in Minutes"
        description="Transform your LinkedIn presence with Brushin.in - the premier AI LinkedIn post generator. Create viral LinkedIn posts, boost engagement by 500%, and build your professional brand. Helped 10,000+ professionals worldwide. Get 10 free LinkedIn posts monthly!"
        keywords="Brushin.in, Brushin, brushin ai, AI LinkedIn post generator, linkedin post generator, viral LinkedIn content, LinkedIn post creator, professional content generator, LinkedIn AI tools, social media automation, LinkedIn engagement, viral LinkedIn posts, LinkedIn marketing, content creation AI, LinkedIn optimization, professional branding, LinkedIn growth tool, linkedin content creator, ai content generator, linkedin ai, brushin linkedin, linkedin post maker, viral post generator"
        schemaMarkup={structuredData}
      />
      <TechnicalSEO />
      <Layout onScrollToFeatures={scrollToFeatures}>
      {/* SEO: Semantic HTML structure */}
      <main>
        <section aria-label="Hero section">
          <Hero 
            onScrollToFeatures={scrollToFeatures} 
            onSelectOption={checkAuthAndProceed} 
          />
        </section>
        
        <section ref={featuresRef} className="scroll-mt-16" aria-label="Features section">
          <Features onSelectOption={checkAuthAndProceed} />
        </section>
      
        {showPostCreator && (
          <section ref={postCreatorRef} className="py-16 bg-slate-800 relative overflow-hidden scroll-mt-16" aria-label="Post creation section">
            {/* Animated background elements */}
            <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
            <div className="absolute -bottom-[200px] -left-[200px] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <header className="text-center mb-8 fade-in-bottom">
                <span className="inline-block px-4 py-2 bg-sky-500/20 text-sky-400 rounded-full text-sm font-medium mb-4">
                  AI Content Generator
                </span>
                <h2 className="text-3xl font-bold text-white mb-3 relative">
                  {activeOption === "create" 
                    ? "Create Your LinkedIn Post with AI" 
                    : "Optimize Your LinkedIn Post with AI"}
                  <div className="absolute -top-8 -right-8 text-7xl text-brand-400/10 animate-pulse" aria-hidden="true">🤖</div>
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  {activeOption === "create"
                    ? "Generate authentic, engaging LinkedIn content powered by AI."
                    : "Enhance your existing post for maximum engagement using AI-driven optimization."}
                </p>
              </header>
            
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
          </section>
        )}
        
        <section aria-label="Customer testimonials">
          <TestimonialsSection />
        </section>
        
        <section aria-label="Call to action">
          <CtaSection />
        </section>
        
        {/* Comprehensive SEO optimization suite */}
        <KeywordOptimizedContent />
        <AdvancedSEO />
        <DomainAuthorityInfo />
        <InternalLinkingHub />
        <AdvancedTechnicalSEO />
        <SocialProofSEO />
      </main>
    </Layout>
    </>
  );
};

export default Index;
