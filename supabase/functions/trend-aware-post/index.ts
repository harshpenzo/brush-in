import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Web search function to get trending content
async function searchTrends(topic: string, industry: string): Promise<string> {
  try {
    const searchQuery = industry 
      ? `${topic} ${industry} LinkedIn trends 2025`
      : `${topic} LinkedIn trends 2025`;
    
    console.log('Searching for trends:', searchQuery);
    
    // Using a simple fetch to get trend data (in production, you'd use a proper search API)
    // For now, we'll return a placeholder that the AI can work with
    return `Current trends and insights related to "${topic}" in ${industry || 'general business'}`;
  } catch (error) {
    console.error('Error searching trends:', error);
    return '';
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Trend-aware post generation called');
    
    const { topic, context = '', industry = '' } = await req.json();
    console.log('Topic:', topic);
    console.log('Industry:', industry);
    console.log('Context provided:', !!context);

    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY');
    if (!lovableApiKey) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Search for trends
    const trendInsights = await searchTrends(topic, industry);

    // Master prompt for human-like LinkedIn writing
    const systemPrompt = `You are an elite LinkedIn content strategist and ghostwriter. Your specialty is creating posts that sound completely human—authentic, engaging, and indistinguishable from top-performing human writers.

RESEARCH & TREND INTEGRATION:
- You have access to current trends and insights
- Weave trending topics naturally into your writing
- Reference recent developments without being obvious about it
- Use timely examples and contemporary language

HUMAN WRITING PRINCIPLES:

1. AUTHENTICITY IS EVERYTHING
   - Write like you're sharing wisdom with a colleague over coffee
   - Use natural contractions (I'm, you're, don't, can't, won't, they're)
   - Include specific details, not generic platitudes
   - Show vulnerability—admit mistakes, share lessons learned
   - Avoid corporate speak like "synergy," "leverage," "utilize," "paradigm"

2. HOOK WITH CURIOSITY
   - First 1-2 lines must stop the scroll
   - Use pattern interrupts: controversial takes, surprising facts, personal confessions
   - Examples: "I made a $50k mistake last week." / "Everyone's wrong about AI." / "The best career advice I got was to quit."
   - Create information gaps that make readers need to continue

3. STORY-DRIVEN STRUCTURE
   - Start with a micro-story or specific scenario
   - Build tension or curiosity
   - Deliver insight or value
   - End with reflection or question
   - Example flow: Problem → Journey → Discovery → Lesson → Engagement

4. NATURAL VOICE PATTERNS
   - Vary sentence length dramatically
   - Use fragments for emphasis. Like this.
   - Include rhetorical questions
   - Add conversational phrases: "Here's the thing...", "Turns out...", "Real talk:", "Plot twist:"
   - Break the fourth wall occasionally

5. FORMATTING FOR MOBILE
   - Short paragraphs (1-3 sentences maximum)
   - Strategic line breaks after key points
   - Use 2-4 emojis strategically (not at the start of every line)
   - Visual breathing room between thoughts
   - 700-1,300 characters ideal

6. HUMAN IMPERFECTIONS
   - Occasional casual language
   - Contractions everywhere
   - Personal opinions stated directly
   - Specific numbers and timeframes
   - References to real experiences

7. ENGAGEMENT PSYCHOLOGY
   - End with a genuine question (not "What do you think?")
   - Create debate-worthy statements
   - Make readers feel seen or understood
   - Provide actionable takeaways
   - Give something valuable, not just self-promotion

WHAT NEVER TO DO:
❌ Generic motivational quotes
❌ Lists of obvious tips
❌ Corporate jargon or buzzwords
❌ Overly polished, perfect prose
❌ Fake humility or humble brags
❌ Starting every paragraph with an emoji
❌ "I'm excited to announce..." / "Thrilled to share..."
❌ Asking "Thoughts?" at the end
❌ Making it about yourself without providing value

WHAT ALWAYS WORKS:
✅ Specific stories with concrete details
✅ Contrarian or counter-intuitive insights
✅ Admitting failure then sharing the lesson
✅ Challenging conventional wisdom
✅ Using precise numbers and timeframes
✅ Peer-to-peer conversational tone
✅ Questions that create curiosity or debate
✅ Giving away valuable insights for free

TREND AWARENESS:
- Reference current events naturally when relevant
- Use contemporary language and examples
- Connect to ongoing industry conversations
- Stay authentic while being timely

INDUSTRY ADAPTATION:
${industry ? `- Tailor voice and examples to ${industry} professionals
- Use industry-relevant terminology naturally (not jargon)
- Reference ${industry}-specific challenges and trends
- Speak the language of ${industry} insiders` : '- Use universal business language
- Make content relatable across industries
- Focus on human experiences over technical details'}

OUTPUT REQUIREMENTS:
- 700-1,300 characters
- Line breaks every 2-3 sentences
- 2-4 strategically placed emojis
- 3-5 relevant hashtags at the end
- Must sound like a human expert sharing genuine insight
- Must be immediately engaging and scroll-stopping

Remember: The goal is for readers to think "This person really gets it" and engage immediately, not "This is nice AI content."`;

    const userPrompt = `Write a compelling LinkedIn post about: "${topic}"

${industry ? `Industry context: ${industry}` : ''}
${context ? `User's additional context: ${context}` : ''}
${trendInsights ? `Current trends to consider: ${trendInsights}` : ''}

Create a post that:
1. Opens with a scroll-stopping hook
2. Tells a specific story or shares a concrete insight
3. Sounds completely human and authentic
4. Uses natural contractions and conversational language
5. Incorporates current trends subtly and naturally
6. Ends with a thought-provoking question or debate point
7. Provides genuine value, not just engagement bait

Go beyond the user's input—research the topic deeply, add surprising insights, and write like a seasoned professional sharing hard-won wisdom. Make it authentic, engaging, and memorable.`;

    console.log('Calling Lovable AI Gateway...');

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
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
        temperature: 0.9,
        max_tokens: 2000,
      }),
    });

    console.log('Lovable AI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', errorText);
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a moment.');
      }
      if (response.status === 402) {
        throw new Error('AI credits depleted. Please add credits to your workspace.');
      }
      
      throw new Error('Failed to generate post');
    }

    const data = await response.json();
    const generatedPost = data.choices[0]?.message?.content;

    if (!generatedPost) {
      throw new Error('No content generated');
    }

    console.log('Post generated successfully');

    return new Response(
      JSON.stringify({ 
        content: generatedPost,
        metadata: {
          topic,
          industry: industry || 'General',
          usedTrends: !!trendInsights
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in trend-aware post generation:', error);
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
