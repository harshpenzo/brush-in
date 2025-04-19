import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Wand2, RefreshCw, Loader2, MessageCircle, Edit3 } from "lucide-react";

interface PostFormProps {
  onGenerate: (post: string) => void;
  onOptimize: (post: string) => void;
  initialMode?: "create" | "optimize";
}

const PostForm = ({ onGenerate, onOptimize, initialMode = "create" }: PostFormProps) => {
  const [mode, setMode] = useState<"create" | "optimize">(initialMode);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("professional");
  const [keywords, setKeywords] = useState("");
  const [existingPost, setExistingPost] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  // Update mode when initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleGenerate = () => {
    if (!topic) {
      toast({
        title: "Topic required",
        description: "Please enter a topic for your post",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const generatedPost = generateSamplePost(topic, tone, keywords);
      onGenerate(generatedPost);
      setIsGenerating(false);
      
      toast({
        title: "Post generated",
        description: "Your LinkedIn post has been created successfully.",
      });
    }, 1500);
  };

  const handleOptimize = () => {
    if (!existingPost) {
      toast({
        title: "Post required",
        description: "Please enter your existing post to optimize",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      const optimizedPost = optimizeSamplePost(existingPost);
      onOptimize(optimizedPost);
      setIsGenerating(false);
      
      toast({
        title: "Post optimized",
        description: "Your LinkedIn post has been enhanced for better engagement.",
      });
    }, 1500);
  };

  // Sample post generation function (would be replaced with actual API call)
  const generateSamplePost = (topic: string, tone: string, keywords: string) => {
    const keywordsList = keywords ? keywords.split(",").map(k => k.trim()) : [];
    const keywordsText = keywordsList.length > 0 ? ` including ${keywordsList.join(", ")}` : "";
    
    const posts = [
      `🔥 Excited to share my thoughts on ${topic}!\n\nIn today's fast-paced professional environment, it's crucial to understand the impact of ${topic} on our industry${keywordsText}.\n\nI've seen firsthand how ${topic} can transform business outcomes when implemented correctly.\n\nWhat's your experience with ${topic}? Have you found success implementing this in your organization?\n\n#ProfessionalDevelopment #${topic.replace(/\s+/g, "")} #IndustryInsights`,
      
      `I've been reflecting on ${topic} lately, and wanted to share some insights...\n\nThree key takeaways about ${topic} that every professional should know:\n\n1️⃣ It drives meaningful engagement across teams\n2️⃣ It can significantly improve operational efficiency${keywordsText}\n3️⃣ When implemented properly, it leads to measurable ROI\n\nHas anyone else experienced similar results with ${topic}? Would love to hear your thoughts!\n\n#${topic.replace(/\s+/g, "")} #ProfessionalGrowth #BestPractices`,
      
      `💡 Just completed an intensive deep-dive on ${topic}!\n\nThe most surprising thing I learned? The correlation between ${topic} and overall business success is stronger than ever before${keywordsText}.\n\nIf you're not exploring how ${topic} can benefit your organization, you might be leaving opportunities on the table.\n\nDM me if you'd like to discuss how this could apply to your specific situation.\n\n#${topic.replace(/\s+/g, "")} #Innovation #GrowthMindset`
    ];
    
    return posts[Math.floor(Math.random() * posts.length)];
  };

  // Sample post optimization function (would be replaced with actual API call)
  const optimizeSamplePost = (post: string) => {
    // Add hashtags if not present
    let optimized = post;
    
    if (!optimized.includes("#")) {
      const topics = ["ProfessionalDevelopment", "Innovation", "Leadership", "GrowthMindset", "LinkedIn"];
      const randomTags = Array(3).fill(0).map(() => topics[Math.floor(Math.random() * topics.length)]);
      const uniqueTags = [...new Set(randomTags)];
      
      optimized += `\n\n#${uniqueTags.join(" #")}`;
    }
    
    // Add engagement question if not present
    if (!optimized.includes("?")) {
      optimized += "\n\nWhat are your thoughts on this? I'd love to hear your perspective!";
    }
    
    // Add emoji if not present
    if (!/[\u{1F300}-\u{1F5FF}\u{1F900}-\u{1F9FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F191}-\u{1F251}\u{1F004}\u{1F0CF}\u{1F170}-\u{1F171}\u{1F17E}-\u{1F17F}\u{1F18E}\u{3030}\u{2B50}\u{2B55}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{3297}\u{3299}\u{303D}\u{00A9}\u{00AE}\u{2122}\u{23F3}\u{24C2}\u{23E9}-\u{23EF}\u{25B6}\u{23F8}-\u{23FA}]/u.test(optimized)) {
      const emojis = ["🚀", "💡", "🔥", "⭐", "📈", "💪", "🎯"];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      optimized = randomEmoji + " " + optimized;
    }
    
    return optimized;
  };

  return (
    <Card className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex gap-2 mb-6">
          <Button
            type="button"
            variant={mode === "create" ? "default" : "outline"}
            onClick={() => setMode("create")}
            className={mode === "create" 
              ? "bg-brand-600 hover:bg-brand-700 text-white rounded-lg" 
              : "bg-white dark:bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg"}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Create Post
          </Button>
          <Button
            type="button"
            variant={mode === "optimize" ? "default" : "outline"}
            onClick={() => setMode("optimize")}
            className={mode === "optimize" 
              ? "bg-brand-600 hover:bg-brand-700 text-white rounded-lg" 
              : "bg-white dark:bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-lg"}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            Optimize Post
          </Button>
        </div>

        {mode === "create" ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="topic" className="text-slate-700 dark:text-slate-300 font-medium mb-1.5 block">Topic</Label>
              <Input
                id="topic"
                placeholder="e.g. Leadership, Industry Trends, Work-Life Balance"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="border border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-500 dark:focus:border-brand-500 focus:ring focus:ring-brand-500/20"
              />
            </div>
            
            <div>
              <Label htmlFor="tone" className="text-slate-700 dark:text-slate-300 font-medium mb-1.5 block">Tone</Label>
              <select
                id="tone"
                className="w-full h-10 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-brand-500 dark:focus:border-brand-500 focus:ring focus:ring-brand-500/20"
                value={tone}
                onChange={(e) => setTone(e.target.value)}
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual</option>
                <option value="inspirational">Inspirational</option>
                <option value="educational">Educational</option>
                <option value="storytelling">Storytelling</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="keywords" className="text-slate-700 dark:text-slate-300 font-medium mb-1.5 block">Keywords (comma separated)</Label>
              <Input
                id="keywords"
                placeholder="e.g. innovation, strategy, growth"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="border border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-500 dark:focus:border-brand-500 focus:ring focus:ring-brand-500/20"
              />
            </div>
            
            <Button 
              onClick={handleGenerate}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 rounded-lg transition-smooth"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Post
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="existingPost" className="text-slate-700 dark:text-slate-300 font-medium mb-1.5 block">Your Existing Post</Label>
              <Textarea
                id="existingPost"
                placeholder="Paste your LinkedIn post here for optimization..."
                rows={8}
                value={existingPost}
                onChange={(e) => setExistingPost(e.target.value)}
                className="border border-slate-300 dark:border-slate-600 rounded-lg focus:border-brand-500 dark:focus:border-brand-500 focus:ring focus:ring-brand-500/20"
              />
            </div>
            
            <Button 
              onClick={handleOptimize}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-medium py-2.5 rounded-lg transition-smooth"
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Optimize Post
                </>
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostForm;
