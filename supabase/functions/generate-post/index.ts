
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

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
    } = await req.json();

    let systemPrompt = '';
    let userPrompt = '';

    if (action === 'generate') {
      systemPrompt = `You are an expert LinkedIn content creator specializing in ${industry} industry content.
Your task is to create highly engaging, professional LinkedIn posts that feel authentic and human-written.
Write in a ${tone} tone that resonates with professional audiences.
Focus on creating content that drives genuine engagement through thoughtful insights, questions, or stories.
Avoid clichés, generic advice, and overly promotional language.
Format the post appropriately for LinkedIn with proper spacing and strategic emoji use.
The post should be concise but substantive, with clear value for the reader.
Always include 3-5 relevant hashtags at the end.`;

      const keywordsList = keywords ? keywords.split(",").map((k: string) => k.trim()).filter((k: string) => k) : [];
      const keywordsText = keywordsList.length > 0 ? `incorporating these keywords: ${keywordsList.join(", ")}` : "";
      
      userPrompt = `Create a LinkedIn post about ${topic} in a ${tone} tone. 
The post should be in a ${contentStyle} style and ${postLength.toLowerCase()} in length (${postLength === 'short' ? '150-300' : postLength === 'medium' ? '300-600' : '600-1000'} characters).
The post is for someone in the ${industry} industry ${keywordsText}.
${description ? `Additional context: ${description}` : ''}
Make sure the post sounds natural, professional, and engaging with a clear call-to-action or question to drive engagement.`;
    } else if (action === 'optimize') {
      systemPrompt = `You are an expert LinkedIn content optimizer.
Your task is to improve an existing LinkedIn post to maximize ${optimizationGoal}.
Make the content more engaging, professional, and effective while maintaining its original message.
The changes should feel natural and enhance the post's impact.`;

      userPrompt = `Please optimize this LinkedIn post for better ${optimizationGoal}:

"${existingPost}"

Requirements:
- Maintain the original message and intent
- Improve structure and readability
- Add strategic emoji use if missing
- Include 3-5 relevant hashtags if not present
- Add a compelling call-to-action or engagement question
- Ensure professional yet authentic tone`;
    } else if (action === 'hashtags') {
      systemPrompt = `You are a LinkedIn hashtag specialist. Generate relevant, professional hashtags that will maximize post visibility and engagement.`;
      
      userPrompt = `Generate 5 relevant, professional LinkedIn hashtags for a post about "${topic}" in the ${industry} industry.
${keywords ? `Consider these keywords: ${keywords}` : ''}
Return only the hashtags without the # symbol, separated by commas, no explanations.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: action === 'hashtags' ? 0.3 : 0.7,
        max_tokens: action === 'hashtags' ? 100 : 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`OpenAI API error: ${errorData}`);
    }

    const data = await response.json();
    const generatedContent = data.choices[0].message.content;

    return new Response(JSON.stringify({ content: generatedContent }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-post function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
