import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

/**
 * Generate enhanced LinkedIn post content using the secure edge function
 */
export const generateGeminiPost = async (
  topic: string,
  tone: string,
  keywords: string,
  description: string,
  contentStyle: string,
  postLength: string,
  industry: string,
  targetAudience?: string,
  postObjective?: string
): Promise<string> => {
  try {
    console.log('Generating post via edge function...');
    
    const { data, error } = await supabase.functions.invoke('gemini-generate', {
      body: {
        action: 'generate',
        topic,
        tone,
        keywords,
        description,
        contentStyle,
        postLength,
        industry,
      },
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to generate content');
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    if (data?.content) {
      return data.content;
    }

    throw new Error('No content generated');
  } catch (error) {
    console.error('Error generating content:', error);
    toast({
      title: "AI service error",
      description: "Falling back to local generation. Check console for details.",
      variant: "destructive"
    });
    
    // Fallback to local generation
    const { generateEnhancedPost } = await import("@/utils/postGenerationUtils");
    return generateEnhancedPost(topic, tone, keywords, description, contentStyle, postLength, industry);
  }
};

/**
 * Optimize an existing LinkedIn post using the secure edge function
 */
export const optimizeGeminiPost = async (
  post: string,
  optimizationGoal: string
): Promise<string> => {
  try {
    console.log('Optimizing post via edge function...');
    
    const { data, error } = await supabase.functions.invoke('gemini-generate', {
      body: {
        action: 'optimize',
        post,
        optimizationGoal,
      },
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to optimize content');
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    if (data?.content) {
      return data.content;
    }

    throw new Error('No content generated');
  } catch (error) {
    console.error('Error optimizing content:', error);
    toast({
      title: "AI service error",
      description: "Falling back to local optimization. Check console for details.",
      variant: "destructive"
    });
    
    // Fallback to local optimization
    const { optimizeEnhancedPost } = await import("@/utils/postGenerationUtils");
    return optimizeEnhancedPost(post, optimizationGoal);
  }
};

/**
 * Generate hashtags for a LinkedIn post using the secure edge function
 */
export const generateGeminiHashtags = async (
  topic: string,
  industry: string,
  keywords: string
): Promise<string[]> => {
  try {
    console.log('Generating hashtags via edge function...');
    
    const { data, error } = await supabase.functions.invoke('gemini-generate', {
      body: {
        action: 'hashtags',
        topic,
        industry,
        keywords,
      },
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to generate hashtags');
    }

    if (data?.error) {
      throw new Error(data.error);
    }

    if (data?.hashtags) {
      return data.hashtags;
    }

    throw new Error('No hashtags generated');
  } catch (error) {
    console.error('Error generating hashtags:', error);
    
    // Fallback to local hashtag generation
    const { generateHashtags } = await import("@/utils/postGenerationUtils");
    return generateHashtags(topic, industry, keywords);
  }
};
