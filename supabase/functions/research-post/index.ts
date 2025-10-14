import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.4';
import { z } from 'https://deno.land/x/zod@v3.22.4/mod.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Input validation schema
const inputSchema = z.object({
  topic: z.string().trim().min(1, 'Topic is required').max(500, 'Topic must be less than 500 characters'),
  context: z.string().trim().max(2000, 'Context must be less than 2000 characters').optional().default(''),
  industry: z.string().trim().max(100, 'Industry must be less than 100 characters').optional().default(''),
  tone: z.string().trim().max(50).optional().default('professional'),
  writingStyle: z.string().trim().max(50).optional().default('informative'),
});

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Research post generation called');
    
    // Initialize Supabase client for rate limiting
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Rate limiting: 10 requests per hour for unauthenticated users
    const identifier = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    console.log('Rate limit check for:', identifier);
    
    const { data: rateLimitCheck, error: rateLimitError } = await supabase.rpc('check_rate_limit', {
      _identifier: identifier,
      _endpoint: 'research-post',
      _max_requests: 10,
      _window_minutes: 60,
    });

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
    }

    if (rateLimitCheck === false) {
      console.log('Rate limit exceeded for:', identifier);
      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded. Please try again later or sign in for higher limits.' 
        }), 
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validate and sanitize input
    const rawInput = await req.json();
    const validatedInput = inputSchema.parse(rawInput);
    const { topic, context, industry, tone, writingStyle } = validatedInput;
    
    console.log('Topic:', topic);
    console.log('Industry:', industry);
    console.log('Tone:', tone);
    console.log('Writing Style:', writingStyle);

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Step 1: Research the topic using web search
    console.log('Step 1: Researching topic with web search...');
    const researchPrompt = `Search the web for the latest, most credible information about: "${topic}"${industry ? ' in the ' + industry + ' industry' : ''}. 
    
Focus on:
- Recent developments, trends, and statistics (2024-2025)
- Expert opinions and insights
- Real-world examples and case studies
- Credible sources (academic, industry publications, reputable news)

Provide a comprehensive summary with key findings and source URLs.`;

    const researchResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { 
            role: 'system', 
            content: 'You are a research assistant with web search capabilities. Provide detailed, well-sourced information with URLs.' 
          },
          { role: 'user', content: researchPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!researchResponse.ok) {
      const errorText = await researchResponse.text();
      console.error('Research API error:', errorText);
      throw new Error('Failed to research topic');
    }

    const researchData = await researchResponse.json();
    const researchResults = researchData.choices[0]?.message?.content;
    console.log('Research completed');

    // Step 2: Generate LinkedIn post based on research
    console.log('Step 2: Generating LinkedIn post...');
    
    const toneDescriptions = {
      professional: 'authoritative and polished, suitable for executives and industry leaders',
      casual: 'conversational and friendly, like talking to a colleague over coffee',
      inspirational: 'motivating and uplifting, encouraging readers to take action',
      humorous: 'lighthearted and witty, entertaining while being informative',
      'thought-provoking': 'challenging assumptions and sparking deep reflection',
    };

    const styleDescriptions = {
      informative: 'educational and fact-driven, focusing on teaching and explaining',
      storytelling: 'narrative-based with a clear beginning, middle, and end',
      listicle: 'structured as numbered points or key takeaways',
      'question-based': 'opening with compelling questions to engage readers',
      'case-study': 'real-world example with problem, solution, and results',
    };

    const systemPrompt = `You are an expert LinkedIn content writer who creates engaging posts with proper citations.

TONE: Write in a ${tone} tone - ${toneDescriptions[tone as keyof typeof toneDescriptions] || toneDescriptions.professional}

WRITING STYLE: Use a ${writingStyle} approach - ${styleDescriptions[writingStyle as keyof typeof styleDescriptions] || styleDescriptions.informative}

RESEARCH INTEGRATION:
- Use the provided research findings to support your points
- Include specific statistics, quotes, or facts from the research
- Add citations naturally within the post (e.g., "According to [Source]...")
- List all sources at the end with proper formatting

POST STRUCTURE:
1. HOOK (1-2 lines): Grab attention immediately
2. BODY: Develop your point using research-backed insights
3. VALUE: Provide actionable takeaways
4. ENGAGEMENT: End with a genuine question or call-to-action
5. REFERENCES: List all sources used

FORMATTING:
- 700-1,300 characters
- Short paragraphs (2-3 sentences max)
- Strategic line breaks for readability
- 2-4 relevant emojis
- 3-5 hashtags at the end
- Source citations in brackets [1], [2], etc.
- Reference list at the bottom

AUTHENTICITY:
- Use natural language and contractions
- Include specific numbers and data points
- Make it sound human, not AI-generated
- Be credible through proper attribution`;

    const userPrompt = `Write a compelling LinkedIn post about: "${topic}"

Research findings to use:
${researchResults}

${industry ? 'Industry context: ' + industry : ''}
${context ? 'User context: ' + context : ''}

Requirements:
- Tone: ${tone}
- Style: ${writingStyle}
- Include citations from the research
- Add a references section at the end
- Make it engaging and authentic
- Provide genuine value to readers`;

    const postResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${lovableApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!postResponse.ok) {
      const errorText = await postResponse.text();
      console.error('Post generation error:', errorText);
      
      if (postResponse.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      if (postResponse.status === 402) {
        throw new Error('AI credits depleted. Please add credits to your workspace.');
      }
      
      throw new Error('Failed to generate post');
    }

    const postData = await postResponse.json();
    const generatedPost = postData.choices[0]?.message?.content;

    if (!generatedPost) {
      throw new Error('No content generated');
    }

    console.log('Post generated successfully with citations');

    return new Response(
      JSON.stringify({ 
        content: generatedPost,
        metadata: {
          topic,
          industry: industry || 'General',
          tone,
          writingStyle,
          hasResearch: true
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in research post generation:', error);
    
    // Handle validation errors specifically
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.errors);
      return new Response(
        JSON.stringify({ 
          error: 'Invalid input', 
          details: error.errors.map(e => `${e.path.join('.')}: ${e.message}`) 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'Post generation failed',
        details: error.toString()
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
