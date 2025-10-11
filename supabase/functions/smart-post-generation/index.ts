import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Analyze reference posts to extract patterns
function analyzeReferencePosts(references: string[]): string {
  if (!references || references.length === 0) {
    return "No reference posts provided. Use proven LinkedIn best practices.";
  }

  // Build analysis prompt
  return `
REFERENCE POST ANALYSIS:
I will now analyze ${references.length} successful LinkedIn post${references.length > 1 ? 's' : ''} to learn their patterns:

${references.map((ref, idx) => `
REFERENCE POST ${idx + 1}:
${ref}
---
`).join('\n')}

From these references, extract and apply:
1. HOOK PATTERN: How does it grab attention in the first 1-2 lines?
2. WRITING STYLE: Tone, voice, sentence structure, use of contractions
3. STORY STRUCTURE: How is the narrative built? Personal story, data, question?
4. FORMATTING: Paragraph length, line breaks, emoji usage
5. ENGAGEMENT TACTICS: How does it encourage interaction?
6. AUTHENTICITY MARKERS: What makes it feel human and genuine?

Apply these learned patterns to create a new post on the user's topic.`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('Smart post generation called');
    
    const { topic, referencePosts = [], context = '' } = await req.json();
    console.log('Topic:', topic);
    console.log('Reference posts count:', referencePosts.length);
    console.log('Context provided:', !!context);

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key is not configured');
    }

    // Analyze reference posts
    const referenceAnalysis = analyzeReferencePosts(referencePosts);

    // Build the system prompt for smart generation
    const systemPrompt = `You are an elite LinkedIn content creator and writing coach. Your specialty is creating authentic, humanized LinkedIn posts that sound like they're written by a real person, not AI.

${referenceAnalysis}

CORE PRINCIPLES FOR HUMAN-LIKE LINKEDIN POSTS:

1. AUTHENTICITY FIRST
   - Write in first person with genuine voice
   - Use natural contractions (I'm, you're, don't, can't)
   - Include specific, concrete details (not generic statements)
   - Show vulnerability and real experiences
   - Avoid corporate jargon and buzzwords

2. ENGAGING STRUCTURE
   - Start with a pattern-interrupt hook that creates curiosity
   - Build context with a brief personal story or specific example
   - Deliver value through actionable insights or lessons
   - End with a thought-provoking question

3. READABILITY
   - Short paragraphs (1-3 sentences max)
   - Strategic line breaks for mobile reading
   - Vary sentence length for natural rhythm
   - Use 2-4 emojis strategically (not excessive)

4. HUMAN PATTERNS
   - Include micro-stories or specific anecdotes
   - Share actual numbers, timeframes, or outcomes when relevant
   - Admit mistakes or challenges (shows authenticity)
   - Use conversational phrases ("Here's the thing...", "Turns out...", "Real talk...")

5. ENGAGEMENT ELEMENTS
   - Ask genuine questions that invite discussion
   - Create curiosity gaps that make readers want to engage
   - Include relatable insights others can connect to
   - End with a specific call to engage

WHAT TO AVOID:
❌ Generic motivational quotes
❌ Robotic, formal language
❌ Corporate buzzword bingo
❌ Fake humility or humble brags
❌ Overly polished, perfect prose
❌ Lists of obvious tips
❌ Sales-y or promotional tone

WHAT TO EMBRACE:
✅ Personal perspective and real experiences
✅ Specific details and concrete examples
✅ Conversational, peer-to-peer tone
✅ Brief vulnerability or lessons from failure
✅ Natural speech patterns and contractions
✅ Thought-provoking insights
✅ Genuine questions that spark discussion

FORMATTING:
- 700-1300 characters (LinkedIn sweet spot)
- Line break after every 2-3 sentences
- 3-5 relevant hashtags at the end
- Mobile-optimized structure

Remember: The best LinkedIn posts feel like wisdom shared by a trusted colleague over coffee, not marketing copy or AI-generated content.`;

    const userPrompt = `Create a compelling LinkedIn post about: "${topic}"

${context ? `Additional context: ${context}` : ''}

${referencePosts.length > 0 
  ? 'Use the patterns you learned from the reference posts to match their engaging style, authenticity, and structure.'
  : 'Use proven best practices for viral LinkedIn content that sounds genuinely human.'
}

Generate a post that:
1. Sounds authentically human (not AI-generated)
2. Tells a brief, specific story or shares a concrete insight
3. Uses natural, conversational language with contractions
4. Includes strategic line breaks and 2-4 emojis
5. Ends with a thought-provoking question
6. Feels like it's written by a real professional sharing genuine value

The post should make readers think "This person gets it" and want to engage immediately.`;

    console.log('Calling OpenAI API...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-5-2025-08-07',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_completion_tokens: 1500,
        top_p: 0.9,
        frequency_penalty: 0.3,
        presence_penalty: 0.2,
      }),
    });

    console.log('OpenAI response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI error:', errorText);
      
      let errorMessage = 'Failed to generate post';
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.error?.message || errorMessage;
      } catch (e) {
        // Keep default message
      }
      
      throw new Error(errorMessage);
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
        learnedPatterns: referencePosts.length > 0 ? {
          referencesUsed: referencePosts.length,
          patternsLearned: true
        } : null
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Error in smart post generation:', error);
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
