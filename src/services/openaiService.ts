
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
  console.log('Calling generate-post edge function with OpenAI');
  
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
    throw new Error('Post generation failed. Please check your OpenAI key or usage limit.');
  }

  if (!data?.content) {
    // Handle specific OpenAI API errors with user-friendly messages
    if (data?.error) {
      console.error('OpenAI generation failed:', data.error);
      
      if (data.type === 'quota_exceeded') {
        throw new Error('Your OpenAI API key has reached its usage limit. Please check your OpenAI billing or try using GPT-3.5-turbo which requires less quota.');
      } else if (data.type === 'invalid_api_key') {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration in the settings.');
      } else if (data.type === 'missing_api_key') {
        throw new Error('OpenAI API key is missing. Please add your API key to continue.');
      } else {
        throw new Error(data.error || 'Post generation failed. Please check your OpenAI key or usage limit.');
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
  console.log('Calling optimize-post edge function with OpenAI');
  
  const { data, error } = await supabase.functions.invoke('generate-post', {
    body: {
      action: 'optimize',
      existingPost: post,
      optimizationGoal
    }
  });

  if (error) {
    console.error('Edge function error:', error);
    throw new Error('Post optimization failed. Please check your OpenAI key or usage limit.');
  }

  if (!data?.content) {
    // Handle specific OpenAI API errors with user-friendly messages
    if (data?.error) {
      console.error('OpenAI optimization failed:', data.error);
      
      if (data.type === 'quota_exceeded') {
        throw new Error('Your OpenAI API key has reached its usage limit. Please check your OpenAI billing or upgrade your plan.');
      } else if (data.type === 'invalid_api_key') {
        throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
      } else if (data.type === 'missing_api_key') {
        throw new Error('OpenAI API key is missing. Please add your API key to continue.');
      } else {
        throw new Error(data.error || 'Post optimization failed. Please check your OpenAI key or usage limit.');
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
  console.log('Calling hashtags generation with OpenAI');
  
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
    // Return fallback hashtags for hashtag generation failures
    return ['linkedin', 'professional', 'networking', 'career', 'business'];
  }

  if (!data?.content) {
    // Handle specific OpenAI API errors with fallback hashtags
    if (data?.error) {
      console.error('OpenAI hashtag generation failed:', data.error);
      // Return some basic hashtags as fallback
      return ['linkedin', 'professional', 'networking', 'career', 'business'];
    }
    // Return fallback hashtags
    return ['linkedin', 'professional', 'networking', 'career', 'business'];
  }

  // Process the hashtags response
  const hashtags = data.content
    .split(/,|\n/)
    .map((tag: string) => tag.trim())
    .filter((tag: string) => tag)
    .map((tag: string) => tag.startsWith('#') ? tag.substring(1) : tag)
    .slice(0, 5);

  return hashtags.length > 0 ? hashtags : ['linkedin', 'professional', 'networking', 'career', 'business'];
};
