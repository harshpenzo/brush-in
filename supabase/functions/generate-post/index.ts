
// OpenAI-only LinkedIn post generation system

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Reusable OpenAI API call function with improved error handling
async function callOpenAI(messages: any[], action: string) {
  console.log(`Making OpenAI API call for action: ${action}`);
  
  // Get OpenAI API key from environment
  const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
  console.log(`OpenAI API Key status: ${openAIApiKey ? 'PRESENT' : 'MISSING'}`);
  console.log(`OpenAI API Key length: ${openAIApiKey ? openAIApiKey.length : 0}`);
  
  if (!openAIApiKey) {
    console.error('OpenAI API key is missing from environment variables');
    throw new Error('OpenAI API key is not configured. Please add your API key to the Supabase secrets.');
  }

  // Validate API key format (should start with sk-)
  if (!openAIApiKey.startsWith('sk-')) {
    console.error('Invalid OpenAI API key format - should start with sk-');
    throw new Error('Invalid OpenAI API key format. Please check your API key.');
  }

  const model = 'gpt-5-2025-08-07'; // Latest GPT-5 model for superior content generation
  console.log(`Using OpenAI model: ${model}`);

  const requestBody = {
    model: model,
    messages: messages,
    max_completion_tokens: action === 'hashtags' ? 150 : 1200, // Using max_completion_tokens for GPT-5
    // Note: temperature not supported in GPT-5, defaults to 1.0 for optimal creativity
    top_p: 0.9,
    frequency_penalty: 0.3,
    presence_penalty: 0.2,
  };

  console.log('OpenAI request payload:', JSON.stringify({
    model: requestBody.model,
    messageCount: messages.length,
    temperature: requestBody.temperature,
    max_tokens: requestBody.max_tokens
  }));
  
  try {
    console.log('Sending request to OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log(`OpenAI API response status: ${response.status}`);
    console.log(`OpenAI API response headers:`, Object.fromEntries(response.headers.entries()));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API Error Response:', errorText);
      
      let errorMessage = 'Unknown OpenAI API error';
      let errorCode = 'unknown_error';
      
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorMessage;
        errorCode = errorJson.error?.code || errorJson.error?.type || errorCode;
        
        console.error(`OpenAI Error - Code: ${errorCode}, Message: ${errorMessage}`);
        
        // Handle specific error cases
        if (errorCode === 'insufficient_quota' || errorMessage.includes('quota') || errorMessage.includes('billing')) {
          throw new Error('Your OpenAI API key has exceeded its quota or billing limit. Please check your OpenAI billing settings.');
        } else if (errorCode === 'invalid_api_key' || errorMessage.includes('invalid_api_key') || errorMessage.includes('Incorrect API key')) {
          throw new Error('Invalid OpenAI API key. Please verify your API key is correct.');
        } else if (errorCode === 'invalid_request_error') {
          throw new Error(`OpenAI API request error: ${errorMessage}`);
        } else {
          throw new Error(`OpenAI API error (${response.status}): ${errorMessage}`);
        }
      } catch (parseError) {
        console.error('Failed to parse OpenAI error response:', parseError);
        if (response.status === 401) {
          throw new Error('Authentication failed. Please check your OpenAI API key.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later or check your OpenAI billing.');
        } else {
          throw new Error(`OpenAI API error: HTTP ${response.status} - ${errorText}`);
        }
      }
    }

    const data = await response.json();
    console.log('OpenAI API call successful');
    console.log('Response data structure:', {
      hasChoices: !!data.choices,
      choicesLength: data.choices?.length || 0,
      hasMessage: !!(data.choices?.[0]?.message),
      hasContent: !!(data.choices?.[0]?.message?.content),
      usage: data.usage
    });
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid OpenAI response structure:', JSON.stringify(data, null, 2));
      throw new Error('Invalid response format from OpenAI API');
    }

    const content = data.choices[0].message.content;
    console.log(`Generated content preview: ${content ? content.substring(0, 100) + '...' : 'No content'}`);
    
    if (!content || content.trim().length === 0) {
      throw new Error('OpenAI returned empty content. Please try again.');
    }
    
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
    console.log('Request body received:', JSON.stringify({
      action: requestBody.action,
      topic: requestBody.topic?.substring(0, 50) + '...',
      hasDescription: !!requestBody.description,
      tone: requestBody.tone,
      industry: requestBody.industry
    }));
    
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

    console.log(`Processing ${action} request`);

    let systemPrompt = '';
    let userPrompt = '';

    if (action === 'generate') {
      systemPrompt = `You are an elite LinkedIn content strategist with 15+ years of experience creating viral posts for Fortune 500 executives and industry thought leaders. You specialize in ${industry} content that drives genuine engagement, builds authority, and generates business results.

🎯 CONTENT STRATEGY FRAMEWORK:

1. PSYCHOLOGY-DRIVEN HOOKS:
   • Use pattern interrupts that break scroll momentum
   • Start with contrarian takes or surprising insights
   • Include specific numbers, percentages, or timeframes
   • Pose questions that create instant curiosity gaps
   • Challenge conventional wisdom in the ${industry} space

2. VALUE-FIRST STORYTELLING:
   • Share real experiences with lessons learned
   • Include specific examples with measurable outcomes
   • Use the "Problem → Insight → Solution → Result" structure
   • Add personal vulnerability for authentic connection
   • Provide frameworks or templates others can use

3. ENGAGEMENT OPTIMIZATION:
   • Write for ${industry} professionals actively seeking growth
   • Use conversational tone that feels like peer-to-peer advice
   • Include actionable takeaways in every paragraph
   • End with thought-provoking questions that spark debate
   • Create content worth saving and sharing

4. FORMAT FOR MAXIMUM IMPACT:
   • Length: ${postLength === 'short' ? '200-350' : postLength === 'medium' ? '400-650' : '700-1000'} characters
   • Structure: 1-2 sentence paragraphs with strategic white space
   • Tone: ${tone} yet approachable and human
   • Emojis: 2-3 strategically placed for visual breaks
   • Hashtags: 3-5 high-value tags that expand reach

5. AUTHENTICITY MARKERS:
   • Avoid corporate jargon and buzzword bingo
   • Include specific details that prove credibility
   • Use "I" statements for personal connection
   • Share both successes AND failures
   • Write like you're talking to a colleague over coffee

🚀 VIRAL CONTENT ELEMENTS:
- Controversial but defensible opinions
- Behind-the-scenes industry insights
- Contrarian frameworks that challenge status quo
- Specific examples with real numbers/results
- Content that makes readers think "I wish I knew this earlier"

Remember: The best LinkedIn posts feel like valuable conversations with industry insiders, not marketing copy.`;

      const keywordsList = keywords ? keywords.split(",").map((k: string) => k.trim()).filter((k: string) => k) : [];
      const keywordsText = keywordsList.length > 0 ? `Keywords to naturally incorporate: ${keywordsList.join(", ")}` : "";
      
      userPrompt = `Create a breakthrough LinkedIn post about: "${topic}"

🎯 TARGET AUDIENCE: ${industry} professionals seeking competitive advantage
📊 CONTENT APPROACH: ${contentStyle} style with ${tone} tone
📏 OPTIMAL LENGTH: ${postLength} format for maximum engagement
🔑 STRATEGIC KEYWORDS: ${keywordsText || 'Focus on industry-relevant terms'}
💡 CONTEXT: ${description || 'Leverage your expertise to provide unique insights on this topic'}

🚀 EXECUTION REQUIREMENTS:

HOOK (First 1-2 lines):
- Create an immediate pattern interrupt
- Use specific numbers, surprising facts, or contrarian statements
- Make readers think "Wait, what?" or "I need to know more"
- Challenge common assumptions in ${industry}

BODY (Main content):
- Share a specific example, case study, or personal experience
- Include actionable insights readers can implement immediately
- Use the structure: Insight → Evidence → Application
- Add credibility markers (numbers, specific companies, real outcomes)
- Write in short, scannable paragraphs (1-2 sentences max)

ENGAGEMENT TRIGGER (Final section):
- End with a thought-provoking question that sparks debate
- OR provide a framework/template others can use
- OR ask for specific experiences/opinions from the audience
- Make it impossible for engaged readers NOT to comment

FORMATTING FOR VIRALITY:
✓ Strategic line breaks for mobile readability
✓ 2-3 relevant emojis for visual appeal (not excessive)
✓ Bullet points or numbered lists when appropriate
✓ 3-5 high-impact hashtags that industry leaders actually use
✓ Content that begs to be shared or saved

🎯 FINAL GOAL: Create a post that established ${industry} professionals would share with their networks because it makes them look smart and provides genuine value.

Write this as if you're sharing hard-earned wisdom with ambitious peers who respect expertise over fluff.`;

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
      } else if (error.message.includes('invalid_api_key') || error.message.includes('Authentication failed')) {
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
