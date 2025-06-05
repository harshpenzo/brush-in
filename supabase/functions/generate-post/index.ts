
// Updated 2025-06-05 to use research-driven OpenAI prompt instead of Lovable templates

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
      // Research-driven system prompt for authentic LinkedIn content
      systemPrompt = `You are a professional LinkedIn content strategist and researcher with deep expertise in ${industry} industry trends, audience psychology, and viral content creation. Your mission is to create authentic, research-backed LinkedIn posts that feel genuinely human and drive meaningful professional engagement.

Research Framework:
1. Industry Context: Draw upon current ${industry} trends, challenges, and opportunities
2. Audience Psychology: Understand what motivates professionals in this space
3. Engagement Patterns: Apply proven storytelling and formatting techniques
4. Authority Building: Position the author as a thoughtful industry voice

Content Philosophy:
- Lead with genuine insight, not generic advice
- Use specific examples and concrete details
- Create emotional connection through storytelling
- Avoid buzzwords and corporate speak
- Focus on practical value and actionable takeaways

Formatting Requirements:
- Hook: Start with a compelling question, surprising statistic, or bold statement
- Story Arc: Use narrative structure with setup, conflict, and resolution
- Readability: Short paragraphs (1-3 sentences), strategic line breaks
- Call-to-Action: End with genuine curiosity or meaningful question
- Length: ${postLength === 'short' ? '150-300' : postLength === 'medium' ? '300-600' : '600-1000'} characters
- Tone: ${tone} but always authentic and conversational

Visual Elements:
- Strategic emoji use (2-4 relevant emojis maximum)
- Bullet points or numbered lists when appropriate
- White space for enhanced readability

The post should feel like it came from a real professional sharing genuine insights, not an AI or marketing template.`;

      const keywordsList = keywords ? keywords.split(",").map((k: string) => k.trim()).filter((k: string) => k) : [];
      const keywordsText = keywordsList.length > 0 ? `Keywords to naturally incorporate: ${keywordsList.join(", ")}` : "";
      
      userPrompt = `Create a research-driven LinkedIn post about: ${topic}

Industry Context: ${industry}
Content Style: ${contentStyle}
Tone: ${tone}
Post Length: ${postLength}
${keywordsText}
${description ? `Additional Context: ${description}` : ''}

Requirements:
1. Start with a compelling hook that makes people stop scrolling
2. Include specific, researched insights about the topic
3. Use storytelling elements to create emotional connection
4. Provide genuine value and actionable takeaways
5. End with an engaging question or call-to-action
6. Include 3-5 relevant hashtags at the end
7. Format with short paragraphs and strategic white space

Make this feel like authentic professional insight, not generic AI content.`;
    } else if (action === 'optimize') {
      systemPrompt = `You are an expert LinkedIn content optimizer specializing in ${optimizationGoal}. Your role is to enhance existing posts while maintaining their authentic voice and core message.

Optimization Focus: ${optimizationGoal}

Enhancement Framework:
- Strengthen the opening hook for maximum impact
- Improve narrative flow and readability
- Add specific details and concrete examples
- Enhance emotional resonance and relatability
- Optimize for the specific goal while maintaining authenticity
- Improve formatting and visual appeal
- Strengthen the call-to-action or engagement prompt

Maintain the original:
- Core message and intent
- Author's authentic voice
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

The optimized version should feel more engaging and effective while staying true to the original intent.`;
    } else if (action === 'hashtags') {
      systemPrompt = `You are a LinkedIn hashtag strategist with expertise in maximizing post visibility and engagement across professional networks.`;
      
      userPrompt = `Generate 5 strategic LinkedIn hashtags for a post about "${topic}" in the ${industry} industry.
${keywords ? `Consider these keywords: ${keywords}` : ''}

Requirements:
- Mix of popular and niche hashtags for optimal reach
- Relevant to both the topic and industry
- Avoid overly saturated hashtags
- Focus on professional networking value

Return only the hashtags without # symbols, separated by commas.`;
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: action === 'hashtags' ? 0.3 : 0.85,
        max_tokens: action === 'hashtags' ? 100 : 600,
        top_p: 0.9,
        frequency_penalty: 0.2,
        presence_penalty: 0.1,
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
