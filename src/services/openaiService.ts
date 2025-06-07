
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
    // Handle specific OpenAI API errors
    if (data?.error) {
      if (data.error.includes('quota') || data.error.includes('billing')) {
        throw new Error('Your OpenAI API key has reached its usage limit. Please check your OpenAI billing or try using GPT-3.5-turbo which requires less quota.');
      } else if (data.error.includes('invalid_api_key')) {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration in the settings.');
      } else {
        throw new Error(data.error);
      }
    }
    throw new Error('No content generated from OpenAI. Your API key might need GPT-3.5 access or billing enabled.');
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
    // Handle specific OpenAI API errors
    if (data?.error) {
      if (data.error.includes('quota') || data.error.includes('billing')) {
        throw new Error('Your OpenAI API key has reached its usage limit. Please check your OpenAI billing or upgrade your plan.');
      } else if (data.error.includes('invalid_api_key')) {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
      } else {
        throw new Error(data.error);
      }
    }
    throw new Error('No content generated from OpenAI. Your API key might need GPT-3.5 access or billing enabled.');
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
    // Handle specific OpenAI API errors with fallback hashtags
    if (data?.error) {
      console.error('OpenAI hashtag generation failed:', data.error);
      // Return some basic hashtags as fallback
      return ['linkedin', 'professional', 'networking', 'career', 'business'];
    }
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
