
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
    
    // Note: This function supports anonymous usage for "try before you buy" feature
    // Usage tracking is handled on the client side via localStorage
    
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
      targetAudience,
      postObjective,
      existingPost,
      optimizationGoal,
      generateVariations = false
    } = requestBody;

    console.log(`Processing ${action} request`);

    let systemPrompt = '';
    let userPrompt = '';

    if (action === 'generate') {
      const audienceContext = targetAudience && targetAudience !== 'general' 
        ? `Specifically targeting ${targetAudience} with content that resonates with their challenges and aspirations.` 
        : '';
      
      const objectiveContext = postObjective 
        ? `Primary objective: ${postObjective}. Optimize content structure and CTA accordingly.` 
        : '';

      systemPrompt = `You are an elite LinkedIn content strategist and viral post architect with 15+ years creating breakthrough content for Fortune 500 executives and industry thought leaders. You specialize in ${industry} content that drives genuine engagement, builds authority, and generates measurable business results.

${audienceContext}
${objectiveContext}

🎯 VIRAL HOOK SYSTEM - Start with one of these proven patterns:

CURIOSITY HOOKS:
• "Here's what nobody tells you about [topic]..."
• "I spent [X years/dollars] learning this. Here's the truth..."
• "Everyone says [common belief]. They're wrong. Here's why..."

STORY HOOKS:
• "3 years ago, I made a $[X] mistake. Here's what I learned..."
• "I just [did something bold]. Here's what happened..."
• "The moment I realized [insight] changed everything..."

DATA HOOKS:
• "[X%] of professionals struggle with [problem]. Here's the real solution..."
• "After analyzing [X] successful [results], I found 3 patterns..."
• "I tested [X] approaches. Only one worked. Here it is..."

CONTRARIAN HOOKS:
• "Unpopular opinion: [bold statement about ${industry}]"
• "Stop doing [common practice]. It's killing your [results]."
• "Everyone's focusing on [X]. Meanwhile, [Y] is where real opportunity lies..."

PROBLEM-SOLUTION HOOKS:
• "Struggling with [pain point]? I was too, until I discovered..."
• "If [problem] is holding you back, this framework will help..."
• "The [X] strategy that took me from [before] to [after]..."

🎯 CONTENT ARCHITECTURE:

HOOK (Lines 1-2):
✓ Pattern interrupt that stops the scroll
✓ Use specific numbers, timeframes, or outcomes
✓ Create curiosity gap that demands reading more
✓ Speak directly to ${targetAudience || 'professionals'} pain points

CONTEXT & STORY (Lines 3-6):
✓ Personal anecdote or specific scenario
✓ Relatable struggle or surprising insight
✓ Build credibility with specific details
✓ Show vulnerability - share failures AND wins

VALUE DELIVERY (Middle section):
✓ 3-5 actionable insights or lessons
✓ Each point = 1-2 sentences max
✓ Include frameworks, templates, or specific steps
✓ Use numbers/data for credibility
✓ Add line breaks between each point
✓ Strategic emoji placement (2-4 total)

ENGAGEMENT CTA (Final lines):
✓ Thought-provoking question
✓ Ask for experiences/opinions
✓ Invite discussion or debate
✓ Make it impossible not to comment

HASHTAGS (End):
✓ 3-5 relevant hashtags
✓ Mix of niche (10k-100k) and popular (500k+)
✓ Specific to ${industry} and topic

📏 FORMAT REQUIREMENTS:
• Length: ${postLength === 'short' ? '350-700' : postLength === 'medium' ? '700-1200' : '1200-1800'} characters
• Paragraphs: 1-2 sentences MAX per paragraph
• White space: Line break after every 2-3 sentences
• Tone: ${tone} but always conversational and authentic
• Mobile-first: Optimized for phone screens

🚀 VIRAL ELEMENTS TO INCLUDE:
✓ Contrarian but defensible perspective
✓ Behind-the-scenes industry truth
✓ Specific numbers and real outcomes
✓ Personal vulnerability and authenticity
✓ Actionable takeaways readers can implement today
✓ Content that makes people think "I need to save/share this"

🎭 AUTHENTICITY RULES:
✗ No corporate jargon or buzzword bingo
✗ No generic motivational quotes
✗ No "humble brags" or fake modesty
✓ Write like texting a colleague
✓ Share real experiences with specific details
✓ Use "I" statements and personal voice
✓ Include both wins AND failures
✓ Make it feel like peer-to-peer wisdom sharing

Remember: The best LinkedIn posts feel like valuable insights from a trusted insider, not marketing copy. Write content that makes ${targetAudience || 'professionals'} think "This person gets it" and immediately want to engage.`;

      const keywordsList = keywords ? keywords.split(",").map((k: string) => k.trim()).filter((k: string) => k) : [];
      const keywordsText = keywordsList.length > 0 ? `Keywords to naturally weave in: ${keywordsList.join(", ")}` : "";
      
      if (generateVariations) {
        userPrompt = `Generate 4 DISTINCT LinkedIn post variations about: "${topic}"

🎯 AUDIENCE: ${targetAudience || 'professionals'} in ${industry}
📊 OBJECTIVE: ${postObjective || 'engagement'}
✍️ TONE: ${tone}
📏 LENGTH: ${postLength} format
🔑 KEYWORDS: ${keywordsText || 'Industry-relevant terms'}
💡 CONTEXT: ${description || 'Create unique, valuable perspectives'}

CRITICAL: Return a valid JSON array with exactly 4 variations. Each variation MUST have:
- Different hook pattern
- Different content format  
- Different angle on the topic
- Unique engagement strategy

Required JSON structure:
{
  "variations": [
    {
      "format": "Story-Driven",
      "formatDescription": "Personal narrative with lessons learned",
      "hook": "First 1-2 sentences that grab attention",
      "content": "Complete post content with proper line breaks and emojis",
      "engagementTip": "Specific tip to maximize engagement with this variation"
    },
    ... 3 more variations
  ]
}

VARIATION 1 - STORY-DRIVEN:
Format: Personal narrative
Hook Type: "3 years ago..." or "I just..." or "The moment I realized..."
Structure: Personal story → Lesson learned → Actionable insight → Question
Engagement: Ask readers to share similar experiences

VARIATION 2 - DATA/INSIGHTS:
Format: Statistics and findings
Hook Type: "[X%] of professionals..." or "After analyzing [X]..."
Structure: Surprising data → Why it matters → What to do about it → Discussion prompt
Engagement: Ask for readers' data or experiences

VARIATION 3 - CONTRARIAN/BOLD:
Format: Challenge conventional wisdom
Hook Type: "Unpopular opinion:" or "Everyone says [X]. They're wrong."
Structure: Bold statement → Why common approach fails → Better alternative → Debate question
Engagement: Invite agreement/disagreement

VARIATION 4 - LIST/FRAMEWORK:
Format: Actionable tips or framework
Hook Type: "Here's what nobody tells you..." or "[X] lessons I learned..."
Structure: Promise → Numbered insights (3-5 points) → Summary → Application question
Engagement: Ask which tip resonates most

REQUIREMENTS FOR EACH VARIATION:
✓ ${postLength === 'short' ? '350-700' : postLength === 'medium' ? '700-1200' : '1200-1800'} characters
✓ Unique hook from viral hook system
✓ 2-4 strategically placed emojis
✓ Line breaks every 2-3 sentences
✓ 3-5 relevant hashtags at end
✓ ${tone} tone but conversational
✓ Engaging question or CTA at end
✓ Optimized for ${postObjective || 'engagement'}
✓ Speaks directly to ${targetAudience || 'professionals'}

Return ONLY the JSON object. No additional text.`;
      } else {
        userPrompt = `Create a breakthrough LinkedIn post about: "${topic}"

🎯 AUDIENCE: ${targetAudience || 'professionals'} in ${industry}
📊 OBJECTIVE: ${postObjective || 'engagement'}
✍️ TONE: ${tone}
📊 FORMAT: ${contentStyle}
📏 LENGTH: ${postLength}
🔑 KEYWORDS: ${keywordsText || 'Industry-relevant terms'}
💡 CONTEXT: ${description || 'Provide unique insights and value'}

🚀 EXECUTION CHECKLIST:

HOOK (Lines 1-2):
✓ Use a viral hook pattern from the system prompt
✓ Include specific numbers or timeframes
✓ Create immediate curiosity or pattern interrupt
✓ Speak to ${targetAudience || 'professional'} pain points

CONTENT STRUCTURE:
✓ Follow ${contentStyle} format
✓ 1-2 sentence paragraphs maximum
✓ Line break after every 2-3 sentences
✓ Include 3-5 specific, actionable insights
✓ Add personal anecdote or real example
✓ Use ${tone} tone consistently
✓ Place 2-4 emojis strategically

VALUE DELIVERY:
✓ Share frameworks, templates, or specific steps
✓ Include credibility markers (data, outcomes, examples)
✓ Make every sentence valuable
✓ Optimize for ${postObjective || 'engagement'}

ENGAGEMENT CTA:
✓ End with compelling question
✓ Invite discussion or debate
✓ Ask for experiences/opinions
✓ Make commenting irresistible

FINISHING:
✓ Add 3-5 relevant hashtags
✓ Total ${postLength === 'short' ? '350-700' : postLength === 'medium' ? '700-1200' : '1200-1800'} characters
✓ Mobile-optimized formatting
✓ Authentic, conversational voice

Write content that makes ${targetAudience || 'professionals'} immediately want to engage, save, and share.`;

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

    // If generating variations, parse and return structured data
    if (generateVariations && action === 'generate') {
      try {
        const parsed = JSON.parse(generatedContent);
        if (parsed.variations && Array.isArray(parsed.variations)) {
          // Add character count to each variation
          const variationsWithCount = parsed.variations.map((v: any) => ({
            ...v,
            characterCount: v.content ? v.content.length : 0
          }));
          return new Response(JSON.stringify({ variations: variationsWithCount }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          });
        }
      } catch (parseError) {
        console.error('Failed to parse variations JSON, returning as single content:', parseError);
      }
    }

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
