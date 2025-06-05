
import { supabase } from "@/lib/supabase";

/**
 * Generate enhanced LinkedIn post content using OpenAI via Supabase Edge Function
 */
export const generateOpenAIPost = async (
  topic: string,
  tone: string,
  keywords: string,
  description: string,
  contentStyle: string,
  postLength: string,
  industry: string
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-post', {
      body: {
        action: 'generate',
        topic,
        tone,
        keywords,
        description,
        contentStyle,
        postLength,
        industry
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to generate post');
    }

    if (!data?.content) {
      throw new Error('No content generated');
    }

    return data.content;
  } catch (error) {
    console.error('Error generating post with OpenAI:', error);
    // Fallback to local generation if API fails
    const { generateEnhancedPost } = await import("@/utils/postGenerationUtils");
    return generateEnhancedPost(topic, tone, keywords, description, contentStyle, postLength, industry);
  }
};

/**
 * Optimize an existing LinkedIn post using OpenAI via Supabase Edge Function
 */
export const optimizeOpenAIPost = async (
  post: string,
  optimizationGoal: string
): Promise<string> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-post', {
      body: {
        action: 'optimize',
        existingPost: post,
        optimizationGoal
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to optimize post');
    }

    if (!data?.content) {
      throw new Error('No content generated');
    }

    return data.content;
  } catch (error) {
    console.error('Error optimizing post with OpenAI:', error);
    // Fallback to local optimization if API fails
    const { optimizeEnhancedPost } = await import("@/utils/postGenerationUtils");
    return optimizeEnhancedPost(post, optimizationGoal);
  }
};

/**
 * Generate hashtags for a LinkedIn post using OpenAI via Supabase Edge Function
 */
export const generateOpenAIHashtags = async (
  topic: string,
  industry: string,
  keywords: string
): Promise<string[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-post', {
      body: {
        action: 'hashtags',
        topic,
        industry,
        keywords
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(error.message || 'Failed to generate hashtags');
    }

    if (!data?.content) {
      throw new Error('No hashtags generated');
    }

    // Process the hashtags response
    const hashtags = data.content
      .split(/,|\n/)
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag)
      .map((tag: string) => tag.startsWith('#') ? tag.substring(1) : tag)
      .slice(0, 5);

    return hashtags;
  } catch (error) {
    console.error('Error generating hashtags with OpenAI:', error);
    // Fallback to local hashtag generation if API fails
    const { generateHashtags } = await import("@/utils/postGenerationUtils");
    return generateHashtags(topic, industry, keywords);
  }
};
