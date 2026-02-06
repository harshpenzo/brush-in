import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// Input validation schema for post generation
const generatePostSchema = z.object({
  action: z.literal('generate'),
  topic: z.string().trim().min(1).max(500),
  tone: z.string().trim().max(50).default('professional'),
  keywords: z.string().trim().max(500).optional().default(''),
  description: z.string().trim().max(2000).optional().default(''),
  contentStyle: z.string().trim().max(50).default('educational'),
  postLength: z.string().trim().max(20).default('medium'),
  industry: z.string().trim().max(100).default('general'),
});

// Input validation schema for post optimization
const optimizePostSchema = z.object({
  action: z.literal('optimize'),
  post: z.string().trim().min(10).max(5000),
  optimizationGoal: z.string().trim().max(50).default('engagement'),
});

// Input validation schema for hashtag generation
const hashtagsSchema = z.object({
  action: z.literal('hashtags'),
  topic: z.string().trim().min(1).max(500),
  industry: z.string().trim().max(100).default('general'),
  keywords: z.string().trim().max(500).optional().default(''),
});

// Combined schema
const inputSchema = z.discriminatedUnion('action', [
  generatePostSchema,
  optimizePostSchema,
  hashtagsSchema,
]);

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent";

// Create advanced LinkedIn content prompt
const createAdvancedLinkedInPrompt = (tone: string, industry: string, contentStyle: string, postLength: string) => {
  const lengthGuidelines: Record<string, string> = {
    short: "100-200 characters - Perfect for quick insights or announcements",
    medium: "200-400 characters - Ideal for storytelling with engagement hooks", 
    long: "400-700 characters - Comprehensive posts with detailed insights and CTAs"
  };

  const styleInstructions: Record<string, string> = {
    storytelling: "Use narrative structure with a clear beginning, middle, and end. Include personal anecdotes or case studies.",
    listicle: "Present information in numbered or bulleted format. Use clear, actionable points.",
    "question-based": "Start with thought-provoking questions to drive engagement. Encourage responses and discussions.",
    educational: "Share valuable insights, tips, or industry knowledge. Focus on teaching something new.",
    inspirational: "Use motivational language and success stories. Include uplifting messages and calls to action."
  };

  return `You are an expert LinkedIn content strategist specializing in ${industry} industry content.

CONTENT REQUIREMENTS:
- Length: ${lengthGuidelines[postLength] || lengthGuidelines.medium}
- Style: ${styleInstructions[contentStyle] || styleInstructions.educational}
- Tone: ${tone} and professional

FORMATTING GUIDELINES:
- Use strategic line breaks for readability (maximum 2-3 lines per paragraph)
- Include 1-2 relevant emojis per post (not excessive)
- Add 3-5 strategic hashtags at the end
- Include a clear call-to-action or question to drive engagement

CONTENT STRATEGY:
- Hook: Start with an attention-grabbing opening line
- Value: Provide genuine insights or actionable advice
- Engagement: End with a question or call-to-action
- Authenticity: Write in a human, conversational style
- Industry Focus: Tailor content specifically for ${industry} professionals

AVOID:
- Generic motivational quotes
- Overly salesy language
- Excessive hashtags or emojis
- Clichéd business jargon
- Controversial or polarizing topics

FORMAT OUTPUT:
Provide the post content with proper formatting, including line breaks and hashtags.`;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Gemini generate function called');
    
    // Get API key from environment
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    
    // Use GEMINI_API_KEY if available, otherwise fall back to LOVABLE_API_KEY for the AI gateway
    const useGeminiDirect = !!geminiApiKey;
    
    if (!geminiApiKey && !lovableApiKey) {
      console.error('No AI API key configured');
      return new Response(
        JSON.stringify({ error: 'AI service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Initialize Supabase client for rate limiting
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting: 20 requests per hour for unauthenticated users
    const identifier = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    console.log('Rate limit check for:', identifier);
    
    const { data: rateLimitCheck, error: rateLimitError } = await supabase.rpc('check_rate_limit', {
      _identifier: identifier,
      _endpoint: 'gemini-generate',
      _max_requests: 20,
      _window_minutes: 60,
    });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
    }

    if (rateLimitCheck === false) {
      console.log('Rate limit exceeded for:', identifier);
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate and parse input
    const rawInput = await req.json();
    const validatedInput = inputSchema.parse(rawInput);
    
    console.log('Action:', validatedInput.action);

    let requestPayload: Record<string, unknown>;
    let generationConfig: Record<string, unknown>;

    if (validatedInput.action === 'generate') {
      const { topic, tone, keywords, description, contentStyle, postLength, industry } = validatedInput;
      
      const keywordsList = keywords ? keywords.split(",").map((k: string) => k.trim()).filter((k: string) => k) : [];
      const keywordsText = keywordsList.length > 0 ? `incorporating these keywords: ${keywordsList.join(", ")}` : "";
      
      const userPrompt = `Create a LinkedIn post about ${topic} in a ${tone} tone. 
The post should be in a ${contentStyle} style and ${postLength.toLowerCase()} in length (${postLength === 'short' ? '100-200' : postLength === 'medium' ? '200-400' : '400-700'} characters).
The post is for someone in the ${industry} industry ${keywordsText}.
${description ? `Additional context: ${description}` : ''}
Make sure the post sounds natural, professional, and engaging.`;

      requestPayload = {
        contents: [
          { parts: [{ text: createAdvancedLinkedInPrompt(tone, industry, contentStyle, postLength) }], role: "user" },
          { parts: [{ text: userPrompt }], role: "user" }
        ],
        safetySettings: [{ category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }]
      };
      generationConfig = { temperature: 0.7, topP: 0.95, topK: 40, maxOutputTokens: 800 };
      
    } else if (validatedInput.action === 'optimize') {
      const { post, optimizationGoal } = validatedInput;
      
      const systemPrompt = `You are an expert LinkedIn content optimizer.
Your task is to improve an existing LinkedIn post to maximize ${optimizationGoal}.
Make the content more engaging, professional, and effective while maintaining its original message.
The changes should feel natural and subtle, not completely rewriting the post.`;

      const userPrompt = `Please optimize this LinkedIn post for better ${optimizationGoal}:
"${post}"

If the post lacks hashtags, add 3-5 relevant ones.
If appropriate for ${optimizationGoal}, add a question or call to action to drive engagement.
Improve readability by breaking up long paragraphs.
Enhance the overall tone to make it more professional yet authentic.`;

      requestPayload = {
        contents: [
          { parts: [{ text: systemPrompt }], role: "system" },
          { parts: [{ text: userPrompt }], role: "user" }
        ]
      };
      generationConfig = { temperature: 0.6, topP: 0.95, topK: 40, maxOutputTokens: 800 };
      
    } else if (validatedInput.action === 'hashtags') {
      const { topic, industry, keywords } = validatedInput;
      
      const keywordsList = keywords ? keywords.split(",").map((k: string) => k.trim()).filter((k: string) => k) : [];
      
      const promptText = `Generate 5 relevant, professional LinkedIn hashtags related to the topic "${topic}" for the ${industry} industry.
${keywordsList.length > 0 ? `Include hashtags related to these keywords if possible: ${keywordsList.join(", ")}` : ''}
The hashtags should follow LinkedIn best practices:
- No spaces between words
- Not too generic or too specific
- Mix of popular and niche hashtags
- Professional and industry-appropriate
- No special characters except hyphens and underscores

Return only the hashtags without the # symbol, separated by comma, no numbering or explanation.`;

      requestPayload = {
        contents: [{ parts: [{ text: promptText }], role: "user" }]
      };
      generationConfig = { temperature: 0.2, topP: 0.95, topK: 40, maxOutputTokens: 100 };
      
    } else {
      throw new Error('Invalid action');
    }

    // Make API request
    let response: Response;
    
    if (useGeminiDirect) {
      // Use direct Gemini API
      console.log('Using direct Gemini API');
      response = await fetch(`${GEMINI_API_URL}?key=${geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...requestPayload, generationConfig }),
      });
    } else {
      // Use Lovable AI gateway
      console.log('Using Lovable AI gateway');
      response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${lovableApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'google/gemini-2.5-flash',
          messages: (requestPayload.contents as Array<{parts: {text: string}[], role: string}>).map((c) => ({
            role: c.role === 'system' ? 'system' : 'user',
            content: c.parts[0].text
          })),
          temperature: (generationConfig.temperature as number) || 0.7,
          max_tokens: (generationConfig.maxOutputTokens as number) || 800,
        }),
      });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI API error:', errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits depleted. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error('AI service error');
    }

    const data = await response.json();
    
    // Extract content based on API used
    let content: string;
    
    if (useGeminiDirect) {
      // Direct Gemini API response format
      if (data.promptFeedback?.blockReason) {
        throw new Error(`Content blocked: ${data.promptFeedback.blockReason}`);
      }
      content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    } else {
      // OpenAI-compatible response format from Lovable gateway
      content = data.choices?.[0]?.message?.content;
    }

    if (!content) {
      throw new Error('No content generated');
    }

    console.log('Content generated successfully');

    // For hashtags action, parse the response
    if (validatedInput.action === 'hashtags') {
      const hashtags = content
        .split(/,|\n/)
        .map((tag: string) => tag.trim())
        .filter((tag: string) => tag)
        .map((tag: string) => tag.startsWith('#') ? tag.substring(1) : tag)
        .slice(0, 5);
      
      return new Response(
        JSON.stringify({ hashtags }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      );
    }

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );

  } catch (error) {
    console.error('Error in gemini-generate:', error);
    
    // Handle validation errors
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: 'Invalid input', details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`) }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Generation failed' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
