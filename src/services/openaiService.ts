
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
    throw new Error(error.message || 'Failed to generate post with OpenAI');
  }

  if (!data?.content) {
    throw new Error('No content generated from OpenAI');
  }

  return data.content;
};

/**
 * Optimize an existing LinkedIn post using OpenAI via Supabase Edge Function
 */
export const optimizeOpenAIPost = async (
  post: string,
  optimizationGoal: string
): Promise<string> => {
  const { data, error } = await supabase.functions.invoke('generate-post', {
    body: {
      action: 'optimize',
      existingPost: post,
      optimizationGoal
    }
  });

  if (error) {
    console.error('Edge function error:', error);
    throw new Error(error.message || 'Failed to optimize post with OpenAI');
  }

  if (!data?.content) {
    throw new Error('No content generated from OpenAI');
  }

  return data.content;
};

/**
 * Generate hashtags for a LinkedIn post using OpenAI via Supabase Edge Function
 */
export const generateOpenAIHashtags = async (
  topic: string,
  industry: string,
  keywords: string
): Promise<string[]> => {
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
    throw new Error(error.message || 'Failed to generate hashtags with OpenAI');
  }

  if (!data?.content) {
    throw new Error('No hashtags generated from OpenAI');
  }

  // Process the hashtags response
  const hashtags = data.content
    .split(/,|\n/)
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag)
    .map((tag: string) => tag.startsWith('#') ? tag.substring(1) : tag)
    .slice(0, 5);

  return hashtags;
};
