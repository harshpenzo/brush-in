import { generateOpenAIPost, optimizeOpenAIPost, generateOpenAIHashtags } from './openaiService';
import { generateGeminiPost, optimizeGeminiPost, generateGeminiHashtags } from './geminiService';
import { toast } from "@/hooks/use-toast";

/**
 * Multi-AI service that uses multiple AI providers for enhanced content generation
 * This provides fallback options and can combine results from different models
 * Enhanced with robust error handling, retry mechanisms, and error categorization
 */

// Error types for better categorization
enum ErrorType {
  NETWORK = 'NETWORK',
  API_LIMIT = 'API_LIMIT', 
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  UNKNOWN = 'UNKNOWN'
}

interface CategorizedError {
  type: ErrorType;
  message: string;
  originalError: any;
  retryable: boolean;
}

/**
 * Categorize errors based on their characteristics
 */
const categorizeError = (error: any): CategorizedError => {
  const message = error?.message?.toLowerCase() || '';
  const status = error?.status || error?.response?.status;

  if (message.includes('network') || message.includes('fetch') || !status) {
    return {
      type: ErrorType.NETWORK,
      message: 'Network connection error',
      originalError: error,
      retryable: true
    };
  }

  if (status === 429 || message.includes('rate limit') || message.includes('quota')) {
    return {
      type: ErrorType.API_LIMIT,
      message: 'API rate limit exceeded',
      originalError: error,
      retryable: true
    };
  }

  if (status === 401 || status === 403 || message.includes('unauthorized') || message.includes('api key')) {
    return {
      type: ErrorType.AUTHENTICATION,
      message: 'Authentication failed',
      originalError: error,
      retryable: false
    };
  }

  if (status === 400 || message.includes('validation') || message.includes('invalid')) {
    return {
      type: ErrorType.VALIDATION,
      message: 'Invalid request parameters',
      originalError: error,
      retryable: false
    };
  }

  return {
    type: ErrorType.UNKNOWN,
    message: error?.message || 'Unknown error occurred',
    originalError: error,
    retryable: true
  };
};

/**
 * Retry mechanism with exponential backoff
 */
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: CategorizedError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = categorizeError(error);
      
      console.warn(`Attempt ${attempt + 1}/${maxRetries} failed:`, {
        type: lastError.type,
        message: lastError.message,
        retryable: lastError.retryable
      });

      // Don't retry non-retryable errors
      if (!lastError.retryable) {
        throw lastError;
      }

      // Don't wait after the last attempt
      if (attempt === maxRetries - 1) {
        throw lastError;
      }

      // Exponential backoff with jitter
      const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
      console.log(`Retrying in ${Math.round(delay)}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw lastError!;
};

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
 * Enhanced with retry logic and proper error handling
 */
export const generateMultiAIPost = async (options: PostGenerationOptions): Promise<string> => {
  const { topic, tone, keywords, description, contentStyle, postLength, industry } = options;
  
  console.log('Multi-AI post generation started with enhanced error handling');
  
  try {
    // Primary: Use OpenAI with GPT-5 with retry logic
    console.log('Attempting generation with OpenAI GPT-5...');
    const openAIResult = await retryWithBackoff(
      async () => {
        const result = await generateOpenAIPost(
          topic, tone, keywords, description, contentStyle, postLength, industry
        );
        
        if (!result || result.trim().length < 50) {
          throw new Error('OpenAI result too short or empty');
        }
        
        return result;
      },
      3, // max retries
      1000 // base delay
    );
    
    console.log('OpenAI generation successful');
    return openAIResult;
    
  } catch (openAIError) {
    const categorizedError = categorizeError(openAIError);
    console.warn('OpenAI generation failed, trying Gemini fallback:', {
      type: categorizedError.type,
      message: categorizedError.message
    });
    
    try {
      // Fallback: Use Gemini Pro with retry logic
      console.log('Attempting generation with Gemini Pro...');
      const geminiResult = await retryWithBackoff(
        async () => {
          const result = await generateGeminiPost(
            topic, tone, keywords, description, contentStyle, postLength, industry
          );
          
          if (!result || result.trim().length < 50) {
            throw new Error('Gemini result too short or empty');
          }
          
          return result;
        },
        2, // fewer retries for fallback
        1500 // slightly longer delay
      );
      
      console.log('Gemini generation successful as fallback');
      toast({
        title: "Using Gemini AI",
        description: "OpenAI was unavailable, used Gemini Pro as backup",
        variant: "default"
      });
      return geminiResult;
      
    } catch (geminiError) {
      const geminiCategorizedError = categorizeError(geminiError);
      console.error('Both AI services failed:', {
        openAI: categorizedError,
        gemini: geminiCategorizedError
      });
      
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
 * Enhanced with retry logic and proper error handling
 */
export const optimizeMultiAIPost = async (options: OptimizationOptions): Promise<string> => {
  const { post, optimizationGoal } = options;
  
  console.log('Multi-AI post optimization started with enhanced error handling');
  
  try {
    // Primary: Use OpenAI with GPT-5 with retry logic
    console.log('Attempting optimization with OpenAI GPT-5...');
    const openAIResult = await retryWithBackoff(
      async () => {
        const result = await optimizeOpenAIPost(post, optimizationGoal);
        
        if (!result || result.trim().length < 50) {
          throw new Error('OpenAI optimization result too short');
        }
        
        return result;
      },
      3, // max retries
      1000 // base delay
    );
    
    console.log('OpenAI optimization successful');
    return openAIResult;
    
  } catch (openAIError) {
    const categorizedError = categorizeError(openAIError);
    console.warn('OpenAI optimization failed, trying Gemini fallback:', {
      type: categorizedError.type,
      message: categorizedError.message
    });
    
    try {
      // Fallback: Use Gemini Pro with retry logic
      console.log('Attempting optimization with Gemini Pro...');
      const geminiResult = await retryWithBackoff(
        async () => {
          const result = await optimizeGeminiPost(post, optimizationGoal);
          
          if (!result || result.trim().length < 50) {
            throw new Error('Gemini optimization result too short');
          }
          
          return result;
        },
        2, // fewer retries for fallback
        1500 // slightly longer delay
      );
      
      console.log('Gemini optimization successful as fallback');
      toast({
        title: "Using Gemini AI",
        description: "OpenAI was unavailable, used Gemini Pro for optimization",
        variant: "default"
      });
      return geminiResult;
      
    } catch (geminiError) {
      const geminiCategorizedError = categorizeError(geminiError);
      console.error('Both AI services failed for optimization:', {
        openAI: categorizedError,
        gemini: geminiCategorizedError
      });
      
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
 * Enhanced with retry logic and proper error handling
 */
export const generateMultiAIHashtags = async (options: HashtagOptions): Promise<string[]> => {
  const { topic, industry, keywords } = options;
  
  console.log('Multi-AI hashtag generation started with enhanced error handling');
  
  try {
    // Primary: Use OpenAI with GPT-5 with retry logic
    console.log('Attempting hashtag generation with OpenAI GPT-5...');
    const openAIResult = await retryWithBackoff(
      async () => {
        const result = await generateOpenAIHashtags(topic, industry, keywords);
        
        if (!result || result.length === 0) {
          throw new Error('OpenAI hashtag result empty');
        }
        
        return result;
      },
      3, // max retries
      1000 // base delay
    );
    
    console.log('OpenAI hashtag generation successful');
    return openAIResult;
    
  } catch (openAIError) {
    const categorizedError = categorizeError(openAIError);
    console.warn('OpenAI hashtag generation failed, trying Gemini fallback:', {
      type: categorizedError.type,
      message: categorizedError.message
    });
    
    try {
      // Fallback: Use Gemini Pro with retry logic
      console.log('Attempting hashtag generation with Gemini Pro...');
      const geminiResult = await retryWithBackoff(
        async () => {
          const result = await generateGeminiHashtags(topic, industry, keywords);
          
          if (!result || result.length === 0) {
            throw new Error('Gemini hashtag result empty');
          }
          
          return result;
        },
        2, // fewer retries for fallback
        1500 // slightly longer delay
      );
      
      console.log('Gemini hashtag generation successful as fallback');
      return geminiResult;
      
    } catch (geminiError) {
      const geminiCategorizedError = categorizeError(geminiError);
      console.error('Both AI services failed for hashtags:', {
        openAI: categorizedError,
        gemini: geminiCategorizedError
      });
      
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