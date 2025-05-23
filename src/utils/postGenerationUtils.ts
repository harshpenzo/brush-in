
// Generate enhanced post with various parameters
export const generateEnhancedPost = (
  topic: string, 
  tone: string, 
  keywords: string, 
  description: string, 
  contentStyle: string,
  postLength: string,
  industry: string
) => {
  const keywordsList = keywords ? keywords.split(",").map((k: string) => k.trim()) : [];
  const keywordsText = keywordsList.length > 0 ? ` including ${keywordsList.join(", ")}` : "";
  const contextText = description ? `\n\nContext: ${description}\n\n` : "\n\n";
  
  let postTemplate;
  
  // Select content style
  switch (contentStyle) {
    case "storytelling":
      postTemplate = [
        `📖 Let me share a story about ${topic}...${contextText}It all started when I first encountered a challenge related to ${topic}${keywordsText}. The situation seemed impossible at first.\n\nBut then I discovered that by approaching it with a fresh perspective, everything changed. The key insight was understanding that ${topic} isn't just about the technical aspects, but about the human elements too.\n\nHas anyone else had a similar journey with ${topic}? I'd love to hear your stories!\n\n#${topic.replace(/\s+/g, "")} #ProfessionalJourney #Insights`,
        
        `🔍 I want to share something that changed my perspective on ${topic}...${contextText}Three years ago, I was struggling to understand the true impact of ${topic} in our industry${keywordsText}.\n\nThen something clicked. I realized that success with ${topic} isn't about following the standard playbook - it's about innovation and adaptation.\n\nThis realization transformed how I approach ${topic} challenges now. I've seen firsthand how this mindset shift can create remarkable outcomes.\n\nWhat's a perspective shift that changed your professional journey?\n\n#${topic.replace(/\s+/g, "")} #MindsetShift #ProfessionalGrowth`
      ];
      break;
    
    case "listicle":
      postTemplate = [
        `📋 Top 5 Insights About ${topic} Every Professional Should Know${contextText}After working with ${topic}${keywordsText} for years, here's what I've learned:\n\n1️⃣ Integration is key - ${topic} doesn't exist in isolation\n2️⃣ The landscape is constantly evolving, staying updated is crucial\n3️⃣ The fundamentals matter more than trends\n4️⃣ Cross-functional collaboration amplifies results\n5️⃣ Measuring impact drives continuous improvement\n\nWhich of these resonates most with you? Any you'd add to the list?\n\n#${topic.replace(/\s+/g, "")} #ProfessionalDevelopment #IndustryInsights`,
        
        `🔑 3 Game-Changing Approaches to ${topic} I Wish I Knew Earlier${contextText}After deep diving into ${topic}${keywordsText}, here's what I've discovered:\n\n1. Focus on outcomes over outputs - what real-world results are you creating?\n\n2. Build systems, not just solutions - how does ${topic} fit into the broader ecosystem?\n\n3. Prioritize adaptability - the only constant is change, especially with ${topic}\n\nWhich of these principles have you found most valuable in your work?\n\n#${topic.replace(/\s+/g, "")} #CareerLessons #ProfessionalGrowth`
      ];
      break;
    
    case "question-based":
      postTemplate = [
        `❓ Is ${topic} really as transformative as everyone claims?${contextText}I've been contemplating this question a lot lately. While many praise ${topic}${keywordsText} as revolutionary, I'm curious about the practical impact.\n\nHave you implemented ${topic} in your organization? What tangible results did you see?\n\nDid it live up to the hype or were there unexpected challenges?\n\nWhat metrics did you use to measure success?\n\nLet's have a real conversation about the actual impact of ${topic} beyond the buzzwords.\n\n#${topic.replace(/\s+/g, "")} #RealTalk #PracticalInsights`,
        
        `🤔 What's the biggest misconception about ${topic} in today's business landscape?${contextText}After working extensively with ${topic}${keywordsText}, I've noticed several myths that persist.\n\nIs it that ${topic} is only for large enterprises? Or perhaps that it requires massive investment to implement effectively?\n\nMaybe it's the belief that ${topic} is just a passing trend?\n\nWhat misconception have you encountered? And how has your real-world experience contradicted it?\n\nI'd love to hear your perspective!\n\n#${topic.replace(/\s+/g, "")} #MythBusting #IndustryInsights`
      ];
      break;
    
    default: // "default"
      postTemplate = [
        `🔥 Excited to share my thoughts on ${topic}!${contextText}In today's fast-paced ${industry} environment, it's crucial to understand the impact of ${topic} on our industry${keywordsText}.\n\nI've seen firsthand how ${topic} can transform business outcomes when implemented correctly.\n\nWhat's your experience with ${topic}? Have you found success implementing this in your organization?\n\n#ProfessionalDevelopment #${topic.replace(/\s+/g, "")} #IndustryInsights`,
        
        `I've been reflecting on ${topic} lately, and wanted to share some insights...${contextText}Three key takeaways about ${topic} that every ${industry} professional should know:\n\n1️⃣ It drives meaningful engagement across teams\n2️⃣ It can significantly improve operational efficiency${keywordsText}\n3️⃣ When implemented properly, it leads to measurable ROI\n\nHas anyone else experienced similar results with ${topic}? Would love to hear your thoughts!\n\n#${topic.replace(/\s+/g, "")} #ProfessionalGrowth #BestPractices`,
        
        `💡 Just completed an intensive deep-dive on ${topic}!${contextText}The most surprising thing I learned? The correlation between ${topic} and overall business success is stronger than ever before${keywordsText}.\n\nIf you're not exploring how ${topic} can benefit your organization, you might be leaving opportunities on the table.\n\nDM me if you'd like to discuss how this could apply to your specific situation.\n\n#${topic.replace(/\s+/g, "")} #Innovation #GrowthMindset`
      ];
  }
  
  // Select post based on length preference
  let selectedPost = postTemplate[Math.floor(Math.random() * postTemplate.length)];
  
  // Adjust post length
  if (postLength === "short" && selectedPost.length > 500) {
    // Create shorter version by removing some detail
    selectedPost = selectedPost.replace(/\n\n[^#]+\n\n/g, "\n\n");
  } else if (postLength === "long" && selectedPost.length < 1000) {
    // Add more detail for longer posts
    const industryContext = `\n\nIn the ${industry} industry, we're seeing rapid changes that make ${topic} more relevant than ever. Professionals who understand this intersection gain a significant competitive advantage.\n\n`;
    selectedPost = selectedPost.replace(/\n\n#/, industryContext + "\n\n#");
  }
  
  // Adjust tone
  if (tone === "casual" && selectedPost.indexOf("🔥") === -1) {
    selectedPost = "👋 Hey everyone! " + selectedPost.replace(/\b(I've|I'm|I'll)\b/g, match => match.toLowerCase());
  } else if (tone === "inspirational") {
    selectedPost = "✨ Inspiration struck me today about " + selectedPost.replace(/(excited|reflecting|completed)/i, "passionate");
  } else if (tone === "educational") {
    selectedPost = "📚 Today's learning: " + selectedPost.replace(/(share|reflecting|completed)/i, "exploring");
  }
  
  return selectedPost;
};

// Optimize existing post based on goal
export const optimizeEnhancedPost = (post: string, optimizationGoal: string) => {
  let optimized = post;
  
  // Add strategic hashtags if not present
  if (!optimized.includes("#")) {
    const topics = ["ProfessionalDevelopment", "Innovation", "Leadership", "GrowthMindset", "LinkedIn"];
    const randomTags = Array(3).fill(0).map(() => topics[Math.floor(Math.random() * topics.length)]);
    const uniqueTags = [...new Set(randomTags)];
    
    optimized += `\n\n#${uniqueTags.join(" #")}`;
  }
  
  // Enhanced optimization based on goals
  switch (optimizationGoal) {
    case "engagement":
      // Add engaging question if not present
      if (!optimized.includes("?")) {
        optimized += "\n\nWhat are your thoughts on this? I'd love to hear your perspective!";
      }
      
      // Add emoji if not present
      if (!/[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25B6}\u{23F8}-\u{23FA}]/u.test(optimized)) {
        const emojis = ["🚀", "💡", "🔥", "⭐", "📈", "💪", "🎯"];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        optimized = randomEmoji + " " + optimized;
      }
      
      // Improve call to action
      if (!optimized.toLowerCase().includes("comment") && !optimized.toLowerCase().includes("share") && !optimized.toLowerCase().includes("like")) {
        optimized += "\n\nShare your thoughts in the comments or tag someone who would find this valuable!";
      }
      break;
      
    case "clarity":
      // Simplify sentences (simulated)
      optimized = optimized.replace(/([^.!?]+[.!?])\s+/g, (match, sentence) => {
        if (sentence.length > 140) {
          // Break long sentences (simulated)
          return sentence.substring(0, sentence.lastIndexOf(",", 70) + 1) + " " + 
                sentence.substring(sentence.lastIndexOf(",", 70) + 1) + " ";
        }
        return match;
      });
      
      // Add structural elements for better readability
      if (!optimized.includes("•") && !optimized.includes("1.") && !optimized.includes("1)") && optimized.length > 400) {
        const sentences = optimized.split(/[.!?]+/).filter(s => s.trim().length > 0);
        if (sentences.length >= 4) {
          // Convert to bullet points if appropriate
          const bulletPoint = "• ";
          const firstPart = sentences.slice(0, 1).join(". ") + ".\n\n";
          const bulletPoints = sentences.slice(1, 4).map(s => bulletPoint + s.trim()).join("\n");
          const lastPart = sentences.length > 4 ? "\n\n" + sentences.slice(4).join(". ") + "." : "";
          
          optimized = firstPart + bulletPoints + lastPart;
        }
      }
      break;
      
    case "professionalism":
      // Remove excessive emojis (simulated)
      let emojiCount = 0;
      optimized = optimized.replace(/[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25B6}\u{23F8}-\u{23FA}]/ug, (match) => {
        if (emojiCount < 2) {
          emojiCount++;
          return match;
        }
        return '';
      });
      
      // Refine informal language
      optimized = optimized.replace(/\b(wanna|gonna|gotta)\b/gi, match => {
        if (match.toLowerCase() === 'wanna') return 'want to';
        if (match.toLowerCase() === 'gonna') return 'going to';
        if (match.toLowerCase() === 'gotta') return 'have to';
        return match;
      });
      
      // Add industry-specific terms if appropriate
      if (!optimized.toLowerCase().includes("roi") && 
          !optimized.toLowerCase().includes("strategy") && 
          !optimized.toLowerCase().includes("analysis")) {
        optimized = optimized.replace(/\n\n([^#]*)$/, (match, ending) => {
          return "\n\nThe strategic implications for professionals in this space are significant, particularly when considering long-term ROI and market positioning.\n\n" + ending;
        });
      }
      break;
      
    default:
      // General optimization for readability and structure
      // Add paragraph breaks for readability if missing
      if (!optimized.includes("\n\n") && optimized.length > 300) {
        optimized = optimized.replace(/([.!?])\s+/g, (match, punctuation, index) => {
          if (index > 150 && index < optimized.length - 150) {
            return punctuation + "\n\n";
          }
          return match;
        });
      }
      
      // Ensure there's a clear takeaway or value proposition
      if (!optimized.toLowerCase().includes("takeaway") && 
          !optimized.toLowerCase().includes("benefit") && 
          !optimized.toLowerCase().includes("learn")) {
        optimized += "\n\nKey takeaway: Implementing these insights can lead to meaningful improvements in both personal effectiveness and organizational outcomes.";
      }
  }
  
  return optimized;
};

// Extract topic from post
export const extractTopicFromPost = (post: string) => {
  const topics = ["leadership", "innovation", "technology", "marketing", "personal development", 
                  "career growth", "productivity", "team building", "strategy", "communication"];
  
  // Find the most mentioned topic (simulated)
  for (const topic of topics) {
    if (post.toLowerCase().includes(topic)) {
      return topic;
    }
  }
  
  return "professional development";
};

// Generate hashtags for post
export const generateHashtags = (topic: string, industry: string, keywords: string) => {
  const industryTags: Record<string, string[]> = {
    "technology": ["TechTrends", "Innovation", "DigitalTransformation", "TechLeadership"],
    "marketing": ["MarketingStrategy", "DigitalMarketing", "BrandGrowth", "MarketingTips"],
    "finance": ["FinancialLiteracy", "Investment", "FinTech", "WealthManagement"],
    "healthcare": ["HealthTech", "PatientCare", "Healthcare", "MedicalInnovation"],
    "education": ["EdTech", "LearningAndDevelopment", "Education", "TeachingSkills"],
    "general": ["ProfessionalDevelopment", "CareerGrowth", "Leadership", "Innovation"]
  };
  
  // Get base tags from industry
  const baseTags = industryTags[industry] || industryTags.general;
  
  // Add topic-specific tags
  const topicTag = topic.replace(/\s+/g, "");
  
  // Process keywords
  let keywordTags: string[] = [];
  if (keywords) {
    keywordTags = keywords
      .split(",")
      .map(k => k.trim().replace(/\s+/g, ""))
      .filter(k => k.length > 0);
  }
  
  // Combine and ensure uniqueness
  const allTags = [topicTag, ...baseTags, ...keywordTags];
  const uniqueTags = [...new Set(allTags)].slice(0, 5); // Limit to 5 hashtags
  
  return uniqueTags;
};
