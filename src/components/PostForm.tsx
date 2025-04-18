
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface PostFormProps {
  onGenerate: (post: string) => void;
  onOptimize: (post: string) => void;
}

const PostForm = ({ onGenerate, onOptimize }: PostFormProps) => {
  const [topic, setTopic] = useState("");
  const [industry, setIndustry] = useState("");
  const [tone, setTone] = useState("professional");
  const [keywords, setKeywords] = useState("");
  const [currentPost, setCurrentPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!topic || !industry) {
      toast({
        title: "Missing information",
        description: "Please provide a topic and industry",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const generatedPost = generatePost(topic, industry, tone, keywords);
      onGenerate(generatedPost);
      setIsLoading(false);
    }, 1000);
  };

  const handleOptimize = () => {
    if (!currentPost) {
      toast({
        title: "Missing content",
        description: "Please provide the post you want to optimize",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const optimizedPost = optimizePost(currentPost, keywords);
      onOptimize(optimizedPost);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Generate a New Post</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic">Topic</Label>
              <Input
                id="topic"
                placeholder="E.g., Leadership, Innovation, Industry News"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                placeholder="E.g., Tech, Finance, Healthcare"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="conversational">Conversational</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                  <SelectItem value="educational">Educational</SelectItem>
                  <SelectItem value="storytelling">Storytelling</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="keywords">Keywords (optional, comma separated)</Label>
              <Input
                id="keywords"
                placeholder="E.g., trends, best practices, skills"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={handleGenerate} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Post"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Optimize Existing Post</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="current-post">Your Current Post</Label>
              <Textarea
                id="current-post"
                placeholder="Paste your LinkedIn post here for optimization"
                className="min-h-[150px]"
                value={currentPost}
                onChange={(e) => setCurrentPost(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="optimize-keywords">Target Keywords (optional)</Label>
              <Input
                id="optimize-keywords"
                placeholder="E.g., engagement, connections, opportunities"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>
            
            <Button 
              onClick={handleOptimize} 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Optimizing..." : "Optimize Post"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper functions to generate content
const generatePost = (topic: string, industry: string, tone: string, keywords: string) => {
  const keywordsList = keywords ? keywords.split(",").map(k => k.trim()) : [];
  
  // Template library based on tone
  const templates = {
    professional: [
      `As a ${industry} professional, I've been reflecting on the importance of ${topic}. ${keywordsList.length > 0 ? `\n\nThree key aspects that stand out:\n\n1. ${keywordsList[0] || 'Strategy'}\n2. ${keywordsList[1] || 'Implementation'}\n3. ${keywordsList[2] || 'Results'}\n\n` : ''}What strategies have worked for you in this area?\n\n#${industry.replace(/\s+/g, '')} #${topic.replace(/\s+/g, '')} #ProfessionalDevelopment`,
      `I recently came across a fascinating insight about ${topic} in the ${industry} sector. ${keywordsList.length > 0 ? `It highlights the connection between ${keywordsList.join(' and ')}.` : ''}\n\nHas anyone else observed this trend? I'd appreciate your thoughts.\n\n#${industry.replace(/\s+/g, '')} #${topic.replace(/\s+/g, '')}`
    ],
    conversational: [
      `Hey LinkedIn family! 👋 I've been thinking about ${topic} in ${industry} lately. ${keywordsList.length > 0 ? `\n\nSome thoughts:\n• ${keywordsList.join('\n• ')}\n\n` : ''}What's your take on this? Drop your thoughts below! 💭\n\n#${industry.replace(/\s+/g, '')} #${topic.replace(/\s+/g, '')}`,
      `Question for my network: How do you approach ${topic} in your ${industry} work? ${keywordsList.length > 0 ? `\n\nI'm especially interested in hearing about ${keywordsList.join(', ')}!` : ''}\n\nLet's learn from each other! 🤝\n\n#${industry.replace(/\s+/g, '')} #${topic.replace(/\s+/g, '')}`
    ],
    inspirational: [
      `Today I'm reflecting on how ${topic} has transformed the ${industry} landscape. ${keywordsList.length > 0 ? `\n\nRemember:\n✨ ${keywordsList.join('\n✨ ')}\n\n` : ''}The possibilities are endless when we embrace change and innovation.\n\n#${industry.replace(/\s+/g, '')} #${topic.replace(/\s+/g, '')} #Inspiration`,
      `Success in ${industry} isn't just about ${topic}—it's about perseverance and vision. ${keywordsList.length > 0 ? `\n\nKey principles I live by:\n🌟 ${keywordsList.join('\n🌟 ')}` : ''}\n\nWhat principles guide your professional journey?\n\n#${industry.replace(/\s+/g, '')} #${topic.replace(/\s+/g, '')} #Success`
    ],
    educational: [
      `Did you know? Recent studies on ${topic} in ${industry} reveal fascinating insights. ${keywordsList.length > 0 ? `\n\nKey findings:\n📊 ${keywordsList.join('\n📊 ')}\n\n` : ''}What implications do you see for our field?\n\n#${industry.replace(/\s+/g, '')} #${topic.replace(/\s+/g, '')} #Learning`,
      `I recently explored the evolution of ${topic} in ${industry}, and here's what I learned: ${keywordsList.length > 0 ? `\n\nImportant concepts:\n📚 ${keywordsList.join('\n📚 ')}\n\n` : ''}Does this align with your experience?\n\n#${industry.replace(/\s+/g, '')} #${topic.replace(/\s+/g, '')} #ProfessionalDevelopment`
    ],
    storytelling: [
      `When I first encountered ${topic} in my ${industry} career, I was skeptical. ${keywordsList.length > 0 ? `\n\nThe journey taught me:\n🔹 ${keywordsList.join('\n🔹 ')}\n\n` : ''}Now I can't imagine working without these insights.\n\nHave you had a similar experience?\n\n#${industry.replace(/\s+/g, '')} #${topic.replace(/\s+/g, '')} #ProfessionalJourney`,
      `Last week, I faced a challenge with ${topic} while working on a ${industry} project. ${keywordsList.length > 0 ? `\n\nMy approach involved:\n1️⃣ ${keywordsList.join('\n2️⃣ ')}\n\n` : ''}The outcome exceeded expectations and taught me valuable lessons.\n\nWhat's your approach to similar challenges?\n\n#${industry.replace(/\s+/g, '')} #${topic.replace(/\s+/g, '')} #ProblemSolving`
    ]
  };

  // Select random template from the appropriate tone category
  const toneTemplates = templates[tone as keyof typeof templates] || templates.professional;
  const randomTemplate = toneTemplates[Math.floor(Math.random() * toneTemplates.length)];
  
  return randomTemplate;
};

const optimizePost = (post: string, keywords: string) => {
  const keywordsList = keywords ? keywords.split(",").map(k => k.trim()) : [];
  
  // Simple optimization: Add an engaging opener, incorporate keywords, enhance formatting, add hashtags
  let optimized = post;
  
  // Add an engaging hook if the post doesn't seem to have one
  if (!optimized.match(/^(Hey|👋|🚨|💡|Attention|Breaking|Just in|Today|Question|Did you know|Excited to|I'm thrilled)/i)) {
    const hooks = [
      "💡 Insight alert: ",
      "👋 Hey LinkedIn family! ",
      "🚨 Attention ${industry} professionals: ",
      "Excited to share: ",
      "Question for my network: ",
      "Did you know? ",
      "Today I learned something valuable about "
    ];
    optimized = hooks[Math.floor(Math.random() * hooks.length)] + optimized;
  }
  
  // Incorporate keywords if they're not already present
  keywordsList.forEach(keyword => {
    if (!optimized.toLowerCase().includes(keyword.toLowerCase())) {
      // Try to insert it naturally
      const sentences = optimized.split('. ');
      if (sentences.length > 1) {
        const position = Math.floor(Math.random() * (sentences.length - 1)) + 1;
        sentences[position] = `This relates directly to ${keyword}. ${sentences[position]}`;
        optimized = sentences.join('. ');
      } else {
        optimized += ` This highlights the importance of ${keyword}.`;
      }
    }
  });
  
  // Improve formatting
  if (!optimized.includes('\n\n')) {
    optimized = optimized.replace(/\. /g, '.\n\n');
  }
  
  // Add a call to action if not present
  if (!optimized.match(/(what do you think|what's your take|agree|thoughts|comment|share your|let me know)/i)) {
    optimized += "\n\nWhat's your experience with this? I'd love to hear your thoughts in the comments!";
  }
  
  // Add relevant hashtags if not present
  if (!optimized.includes('#')) {
    const defaultHashtags = ['#ProfessionalDevelopment', '#CareerGrowth', '#LinkedInTips'];
    const keywordHashtags = keywordsList.map(k => `#${k.replace(/\s+/g, '')}`);
    const allHashtags = [...keywordHashtags, ...defaultHashtags].slice(0, 5);
    
    optimized += `\n\n${allHashtags.join(' ')}`;
  }
  
  return optimized;
};

export default PostForm;
