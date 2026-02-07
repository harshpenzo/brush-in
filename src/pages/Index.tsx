import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import PostPreview from "@/components/PostPreview";
import { TrendAwarePostCreator } from "@/components/post/TrendAwarePostCreator";
import Tips from "@/components/Tips";
import TestimonialsSection from "@/components/TestimonialsSection";
import CtaSection from "@/components/CtaSection";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useAnonymousGeneration } from "@/hooks/useAnonymousGeneration";
import { canCreatePost, incrementPostCount } from "@/services/usageService";
import { supabase } from "@/integrations/supabase/client";
import SEOMetaTags from "@/components/SEOMetaTags";
import KeywordOptimizedContent from "@/components/KeywordOptimizedContent";
import AdvancedSEO from "@/components/AdvancedSEO";
import TechnicalSEO from "@/components/TechnicalSEO";
import EnhancedSchemas from "@/components/EnhancedSchemas";
import DomainAuthorityInfo from "@/components/DomainAuthorityInfo";
import InternalLinkingHub from "@/components/InternalLinkingHub";
import AdvancedTechnicalSEO from "@/components/AdvancedTechnicalSEO";
import SocialProofSEO from "@/components/SocialProofSEO";
import { Button } from "@/components/ui/button";
import { Sparkles, Lock, Zap } from "lucide-react";

const Index = () => {
  const [generatedPost, setGeneratedPost] = useState("");
  const [showPostCreator, setShowPostCreator] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const featuresRef = useRef<HTMLDivElement>(null);
  const postCreatorRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const anonymousGeneration = useAnonymousGeneration();

  const startCreating = () => {
    setShowPostCreator(true);
    setTimeout(() => {
      postCreatorRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleTrendAwareGenerate = async (data: {
    topic: string;
    context: string;
    industry: string;
    tone: string;
    writingStyle: string;
  }) => {
    // Check authentication and limits
    if (!isAuthenticated) {
      if (!anonymousGeneration.canGenerate) {
        toast({
          title: "Free Trial Limit Reached",
          description: "Sign up for free to continue generating LinkedIn posts!",
          variant: "destructive",
          action: (
            <Button
              size="sm"
              onClick={() => navigate('/auth')}
              className="bg-primary hover:bg-primary/90"
            >
              Sign Up Free
            </Button>
          ),
        });
        return;
      }
    } else {
      const { canCreate, usage } = await canCreatePost(user!.id);
      if (!canCreate) {
        toast({
          title: "Usage limit reached",
          description: `You've reached your monthly limit of ${usage?.monthly_limit || 50} posts. Upgrade for unlimited access!`,
          variant: "destructive"
        });
        navigate("/pricing");
        return;
      }
    }

    setIsGenerating(true);
    
    try {
      console.log('Generating research-based post:', data);
      
      const { data: responseData, error } = await supabase.functions.invoke('research-post', {
        body: data
      });

      if (error) {
        console.error('Edge function error:', error);
        throw new Error(error.message || 'Failed to generate post');
      }

      if (!responseData || !responseData.content) {
        throw new Error('No content generated');
      }

      setGeneratedPost(responseData.content);

      // Track usage
      if (!isAuthenticated) {
        anonymousGeneration.incrementUsage();
        
        toast({
          title: "✨ Post Created!",
          description: `Research-backed post with citations created. ${anonymousGeneration.remainingGenerations - 1} free generations remaining.`,
        });
      } else {
        await incrementPostCount();
        
        toast({
          title: "✨ Post Created!",
          description: "Your research-backed post with citations is ready!",
        });
      }
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
        title="Brushin.in - Free AI LinkedIn Post Generator | Create Viral Posts in Seconds"
        description="Generate engaging LinkedIn posts instantly with AI. Free LinkedIn post creator with templates, hashtags, and viral content ideas. Try now - no credit card required."
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
            onSelectOption={startCreating} 
          />
        </section>
        
        <section ref={featuresRef} className="scroll-mt-16" aria-label="Features section">
          <Features onSelectOption={startCreating} />
        </section>
      
        {showPostCreator && (
          <section ref={postCreatorRef} className="py-16 bg-slate-800 relative overflow-hidden scroll-mt-16" aria-label="Smart post creation section">
            {/* Animated background elements */}
            <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
            <div className="absolute -bottom-[200px] -left-[200px] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
            
            <div className="container mx-auto px-4 relative z-10">
              {!isAuthenticated && (
                <div className="mb-6 max-w-3xl mx-auto p-4 bg-accent/50 backdrop-blur-sm rounded-lg border border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary rounded-full">
                        <Sparkles className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          Try Before You Sign Up!
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {anonymousGeneration.remainingGenerations} free {anonymousGeneration.remainingGenerations === 1 ? 'generation' : 'generations'} remaining
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => navigate('/auth')}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Lock className="h-3 w-3 mr-1" />
                      Sign Up for More
                    </Button>
                  </div>
                </div>
              )}
              
              <header className="text-center mb-8 fade-in-bottom">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500/20 to-purple-500/20 text-sky-300 rounded-full text-sm font-medium mb-4">
                  <Zap className="h-4 w-4" />
                  Smart AI Post Generator
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 relative">
                  Create Personalized LinkedIn Posts
                  <div className="absolute -top-8 -right-8 text-7xl text-brand-400/10 animate-pulse" aria-hidden="true">✨</div>
                </h2>
                <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                  AI learns from your favorite LinkedIn posts and creates humanized content that sounds like you.
                </p>
              </header>
            
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                <div className="space-y-6 fade-in-bottom">
          <TrendAwarePostCreator
            onGenerate={handleTrendAwareGenerate}
            isGenerating={isGenerating}
          />
                </div>
                
                <div className="space-y-6 fade-in-bottom" style={{ animationDelay: "100ms" }}>
                  {generatedPost && (
                    <div className="transition-all duration-500">
                      <PostPreview 
                        post={generatedPost}
                        hashtags={[]}
                        readabilityScore={null}
                        topic=""
                        tone=""
                        industry=""
                      />
                    </div>
                  )}
                </div>
              </div>

              {generatedPost && (
                <div className="mt-8 max-w-6xl mx-auto fade-in-bottom" style={{ animationDelay: "200ms" }}>
                  <Tips />
                </div>
              )}
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
        <EnhancedSchemas />
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
