
import { toast } from "@/hooks/use-toast";

// Interface for Gemini API requests
interface GeminiRequest {
  contents: {
    parts: {
      text?: string;
    }[];
    role: string;
  }[];
  generationConfig: {
    temperature: number;
    topP: number;
    topK: number;
    maxOutputTokens: number;
  };
  safetySettings?: {
    category: string;
    threshold: string;
  }[];
}

// Interface for a successful Gemini API response
interface GeminiSuccessResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
    finishReason: string;
  }[];
  promptFeedback?: {
    blockReason?: string;
  };
}

// Interface for an error Gemini API response
interface GeminiErrorResponse {
  error: {
    code: number;
    message: string;
    status: string;
  };
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent";

// Function to create a system prompt for LinkedIn content creation
const createLinkedInSystemPrompt = (tone: string, industry: string) => {
  return `You are an expert LinkedIn content creator specializing in ${industry} industry content.
Your task is to create highly engaging, professional LinkedIn posts that feel authentic and human-written.
Write in a ${tone} tone that resonates with professional audiences.
Focus on creating content that drives genuine engagement through thoughtful insights, questions, or stories.
Avoid clichés, generic advice, and overly promotional language.
Format the post appropriately for LinkedIn with proper spacing, occasional emojis where relevant, and appropriate hashtags.
The post should be concise but substantive, with clear value for the reader.`;
};

/**
 * Generate enhanced LinkedIn post content using Google's Gemini API
 */
export const generateGeminiPost = async (
  topic: string,
  tone: string,
  keywords: string,
  description: string,
  contentStyle: string,
  postLength: string,
  industry: string
): Promise<string> => {
  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is missing. Falling back to local generation.");
    // Import and use the local fallback generator
    const { generateEnhancedPost } = await import("@/utils/postGenerationUtils");
    return generateEnhancedPost(topic, tone, keywords, description, contentStyle, postLength, industry);
  }

  try {
    // Create prompt for Gemini API
    const keywordsList = keywords ? keywords.split(",").map((k) => k.trim()).filter(k => k) : [];
    const keywordsText = keywordsList.length > 0 ? `incorporating these keywords: ${keywordsList.join(", ")}` : "";
    
    const userPrompt = `Create a LinkedIn post about ${topic} in a ${tone} tone. 
The post should be in a ${contentStyle} style and ${postLength.toLowerCase()} in length (${postLength === 'short' ? '100-200' : postLength === 'medium' ? '200-400' : '400-700'} characters).
The post is for someone in the ${industry} industry ${keywordsText}.
${description ? `Additional context: ${description}` : ''}
Make sure the post sounds natural, professional, and engaging.`;

    // Prepare the request payload
    const requestPayload: GeminiRequest = {
      contents: [
        {
          parts: [{ text: createLinkedInSystemPrompt(tone, industry) }],
          role: "system"
        },
        {
          parts: [{ text: userPrompt }],
          role: "user"
        }
      ],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 800
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    // Make the API request
    const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      const errorData = await response.json() as GeminiErrorResponse;
      throw new Error(`AI service error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json() as GeminiSuccessResponse;

    // Check for content filtering
    if (data.promptFeedback?.blockReason) {
      throw new Error(`Content blocked: ${data.promptFeedback.blockReason}`);
    }

    // Extract the generated text
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error("No content generated");
  } catch (error) {
    console.error("Error generating content with Gemini:", error);
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
 * Optimize an existing LinkedIn post using Google's Gemini API
 */
export const optimizeGeminiPost = async (
  post: string,
  optimizationGoal: string
): Promise<string> => {
  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is missing. Falling back to local optimization.");
    // Import and use the local fallback optimizer
    const { optimizeEnhancedPost, extractTopicFromPost } = await import("@/utils/postGenerationUtils");
    return optimizeEnhancedPost(post, optimizationGoal);
  }

  try {
    // Create system prompt for optimization
    const systemPrompt = `You are an expert LinkedIn content optimizer.
Your task is to improve an existing LinkedIn post to maximize ${optimizationGoal}.
Make the content more engaging, professional, and effective while maintaining its original message.
The changes should feel natural and subtle, not completely rewriting the post.`;

    // Create user prompt for optimization
    const userPrompt = `Please optimize this LinkedIn post for better ${optimizationGoal}:
"${post}"

If the post lacks hashtags, add 3-5 relevant ones.
If appropriate for ${optimizationGoal}, add a question or call to action to drive engagement.
Improve readability by breaking up long paragraphs.
Enhance the overall tone to make it more professional yet authentic.`;

    // Prepare the request payload
    const requestPayload: GeminiRequest = {
      contents: [
        {
          parts: [{ text: systemPrompt }],
          role: "system"
        },
        {
          parts: [{ text: userPrompt }],
          role: "user"
        }
      ],
      generationConfig: {
        temperature: 0.6,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 800
      }
    };

    // Make the API request
    const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      const errorData = await response.json() as GeminiErrorResponse;
      throw new Error(`AI service error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json() as GeminiSuccessResponse;

    // Extract the generated text
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      return data.candidates[0].content.parts[0].text;
    }

    throw new Error("No content generated");
  } catch (error) {
    console.error("Error optimizing content with Gemini:", error);
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
 * Generate hashtags for a LinkedIn post using Google's Gemini API
 */
export const generateGeminiHashtags = async (
  topic: string,
  industry: string,
  keywords: string
): Promise<string[]> => {
  if (!GEMINI_API_KEY) {
    console.error("Gemini API key is missing. Falling back to local hashtag generation.");
    // Import and use the local fallback generator
    const { generateHashtags } = await import("@/utils/postGenerationUtils");
    return generateHashtags(topic, industry, keywords);
  }

  try {
    // Create prompt for hashtag generation
    const keywordsList = keywords ? keywords.split(",").map((k) => k.trim()).filter(k => k) : [];
    
    const promptText = `Generate 5 relevant, professional LinkedIn hashtags related to the topic "${topic}" for the ${industry} industry.
${keywordsList.length > 0 ? `Include hashtags related to these keywords if possible: ${keywordsList.join(", ")}` : ''}
The hashtags should follow LinkedIn best practices:
- No spaces between words
- Not too generic or too specific
- Mix of popular and niche hashtags
- Professional and industry-appropriate
- No special characters except hyphens and underscores

Return only the hashtags without the # symbol, separated by comma, no numbering or explanation.`;

    // Prepare the request payload
    const requestPayload: GeminiRequest = {
      contents: [
        {
          parts: [{ text: promptText }],
          role: "user"
        }
      ],
      generationConfig: {
        temperature: 0.2,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 100
      }
    };

    // Make the API request
    const apiUrl = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestPayload)
    });

    if (!response.ok) {
      throw new Error(`AI service error: ${response.statusText}`);
    }

    const data = await response.json() as GeminiSuccessResponse;

    // Extract the generated text
    if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
      const hashtagsText = data.candidates[0].content.parts[0].text;
      // Process the text to get clean hashtags
      const hashtags = hashtagsText
        .split(/,|\n/)
        .map(tag => tag.trim())
        .filter(tag => tag)
        .map(tag => tag.startsWith('#') ? tag.substring(1) : tag);
      
      return hashtags.slice(0, 5); // Limit to 5 hashtags
    }

    throw new Error("No hashtags generated");
  } catch (error) {
    console.error("Error generating hashtags with Gemini:", error);
    
    // Fallback to local hashtag generation
    const { generateHashtags } = await import("@/utils/postGenerationUtils");
    return generateHashtags(topic, industry, keywords);
  }
};
