
// OpenAI-only LinkedIn post generation system

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Reusable OpenAI API call function with improved error handling
async function callOpenAI(messages: any[], action: string) {
  console.log(`Making OpenAI API call for action: ${action}`);
  console.log(`OpenAI API Key present: ${openAIApiKey ? 'YES' : 'NO'}`);
  console.log(`Using model: gpt-3.5-turbo`);
  
  if (!openAIApiKey) {
    throw new Error('OpenAI API key is not configured. Please add your API key to the environment variables.');
  }

  const requestBody = {
    model: 'gpt-3.5-turbo',
    messages: messages,
    temperature: action === 'hashtags' ? 0.3 : 0.85,
    max_tokens: action === 'hashtags' ? 100 : 600,
    top_p: 0.9,
    frequency_penalty: 0.2,
    presence_penalty: 0.1,
  };

  console.log('OpenAI request body:', JSON.stringify(requestBody, null, 2));
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log(`OpenAI API response status: ${response.status}`);
    
    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API Error Response:', errorData);
      
      // Parse error for better user feedback
      try {
        const errorJson = JSON.parse(errorData);
        const errorMessage = errorJson.error?.message || 'Unknown OpenAI API error';
        const errorCode = errorJson.error?.code || 'unknown_error';
        
        console.error(`OpenAI Error Code: ${errorCode}, Message: ${errorMessage}`);
        
        if (errorCode === 'insufficient_quota' || errorMessage.includes('quota')) {
          throw new Error('Your OpenAI API key has exceeded its quota. Please check your billing details or upgrade your plan.');
        } else if (errorCode === 'invalid_api_key' || errorMessage.includes('invalid_api_key')) {
          throw new Error('Invalid OpenAI API key. Please check your API key configuration.');
        } else if (errorJson.error?.type === 'invalid_request_error') {
          throw new Error(`OpenAI API request error: ${errorMessage}`);
        } else {
          throw new Error(`OpenAI API error: ${errorMessage}`);
        }
      } catch (parseError) {
        console.error('Failed to parse OpenAI error response:', parseError);
        throw new Error(`OpenAI API error: ${response.status} - ${errorData}`);
      }
    }

    const data = await response.json();
    console.log('OpenAI API call successful, response received');
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response format:', JSON.stringify(data, null, 2));
      throw new Error('Invalid response format from OpenAI API');
    }

    const content = data.choices[0].message.content;
    console.log(`Generated content length: ${content ? content.length : 0} characters`);
    
    return content;
  } catch (fetchError) {
    console.error('OpenAI API fetch error:', fetchError);
    throw fetchError;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Edge function called, processing request...');
    
    const requestBody = await req.json();
    console.log('Request body received:', JSON.stringify(requestBody, null, 2));
    
    const { 
      action,
      topic, 
      tone, 
      keywords, 
      description, 
      contentStyle, 
      postLength, 
      industry,
      existingPost,
      optimizationGoal 
    } = requestBody;

    console.log(`Processing ${action} request for topic: ${topic || 'optimization'}`);

    let systemPrompt = '';
    let userPrompt = '';

    if (action === 'generate') {
      systemPrompt = `You are an expert LinkedIn content strategist and AI specialist with deep expertise in ${industry} industry trends, audience psychology, and viral content creation. Your mission is to create authentic, engaging LinkedIn posts that drive meaningful professional engagement and go viral.

Content Creation Philosophy:
- Lead with genuine insight and industry expertise
- Use specific examples and concrete details
- Create emotional connection through storytelling
- Avoid generic advice and corporate buzzwords
- Focus on practical value and actionable takeaways
- Make content shareable and discussion-worthy

Professional Formatting:
- Hook: Start with a compelling question, surprising statistic, or bold statement
- Structure: Use clear narrative flow with setup, insight, and resolution
- Readability: Short paragraphs (1-3 sentences), strategic line breaks
- Engagement: End with genuine questions or meaningful calls-to-action
- Length: ${postLength === 'short' ? '150-400' : postLength === 'medium' ? '400-800' : '800-1200'} characters
- Tone: ${tone} but always authentic and conversational

Visual Enhancement:
- Strategic emoji use (2-4 relevant emojis maximum)
- Bullet points or numbered lists when appropriate
- White space for enhanced readability
- Bold text for emphasis on key points

The post should feel like it came from a real industry professional sharing genuine insights, not generic AI content.`;

      const keywordsList = keywords ? keywords.split(",").map((k: string) => k.trim()).filter((k: string) => k) : [];
      const keywordsText = keywordsList.length > 0 ? `Keywords to naturally incorporate: ${keywordsList.join(", ")}` : "";
      
      userPrompt = `Create a high-quality LinkedIn post about: ${topic}

Industry Context: ${industry}
Content Style: ${contentStyle}
Tone: ${tone}
Post Length: ${postLength}
${keywordsText}
${description ? `Additional Context: ${description}` : ''}

Requirements:
1. Start with a compelling hook that stops scrollers
2. Include specific, researched insights about the topic
3. Use storytelling elements for emotional connection
4. Provide genuine value and actionable takeaways
5. End with an engaging question or call-to-action
6. Include 3-5 relevant hashtags at the end
7. Format with short paragraphs and strategic white space
8. Make it authentic and professional, not robotic

Create content that feels like genuine professional insight and drives real engagement.`;

    } else if (action === 'optimize') {
      systemPrompt = `You are an expert LinkedIn content optimizer specializing in ${optimizationGoal}. Your role is to enhance existing posts while maintaining their authentic voice and core message.

Optimization Focus: ${optimizationGoal}

Enhancement Framework:
- Strengthen the opening hook for maximum scroll-stopping impact
- Improve narrative flow and readability
- Add specific details and concrete examples
- Enhance emotional resonance and relatability
- Optimize specifically for ${optimizationGoal} while maintaining authenticity
- Improve formatting and visual appeal
- Strengthen the call-to-action or engagement prompt
- Make content more shareable and discussion-worthy

Maintain the original:
- Core message and intent
- Author's authentic voice and perspective
- Key insights and value propositions
- Professional tone and credibility`;

      userPrompt = `Optimize this LinkedIn post for better ${optimizationGoal}:

"${existingPost}"

Requirements:
1. Maintain the original message and authentic voice
2. Strengthen the hook and overall structure
3. Improve readability with better formatting
4. Add strategic emoji use if missing (2-4 maximum)
5. Include 3-5 relevant hashtags if not present
6. Enhance the call-to-action or engagement question
7. Focus specifically on improving ${optimizationGoal}
8. Make it more likely to go viral while staying professional

The optimized version should feel more engaging and effective while staying true to the original intent.`;

    } else if (action === 'hashtags') {
      systemPrompt = `You are a LinkedIn hashtag strategist with expertise in maximizing post visibility and engagement across professional networks.`;
      
      userPrompt = `Generate 5 strategic LinkedIn hashtags for a post about "${topic}" in the ${industry} industry.
${keywords ? `Consider these keywords: ${keywords}` : ''}

Requirements:
- Mix of popular and niche hashtags for optimal reach
- Relevant to both the topic and industry
- Avoid overly saturated hashtags (#entrepreneur, #motivation)
- Focus on professional networking value
- Ensure hashtags are actively used and engaging

Return only the hashtags without # symbols, separated by commas.`;
    }

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt }
    ];

    const generatedContent = await callOpenAI(messages, action);

    console.log(`Successfully generated content for ${action} action`);

    return new Response(JSON.stringify({ content: generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in generate-post function:', error);
    console.error('Error stack:', error.stack);
    
    // Return structured error response
    let errorMessage = 'Post generation failed. Please check your OpenAI key or usage limit.';
    let errorType = 'unknown_error';
    
    if (error.message) {
      errorMessage = error.message;
      
      if (error.message.includes('quota') || error.message.includes('billing')) {
        errorType = 'quota_exceeded';
      } else if (error.message.includes('invalid_api_key')) {
        errorType = 'invalid_api_key';
      } else if (error.message.includes('API key is not configured')) {
        errorType = 'missing_api_key';
      }
    }
    
    return new Response(JSON.stringify({ 
      error: errorMessage,
      type: errorType,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
