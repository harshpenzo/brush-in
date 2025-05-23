
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Linkedin, Share2, Hash, BarChart3 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import SavePostButton from "./post/SavePostButton";

interface PostPreviewProps {
  post: string;
  hashtags?: string[];
  readabilityScore?: number | null;
  topic?: string;
  tone?: string;
  industry?: string;
}

const PostPreview = ({ 
  post, 
  hashtags = [], 
  readabilityScore = null,
  topic = "",
  tone = "",
  industry = ""
}: PostPreviewProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const charCount = post.length;
  const maxChars = 3000; // LinkedIn's character limit
  
  // Extract hashtags from post for displaying separately if not provided
  const extractHashtags = (text: string) => {
    const hashtagRegex = /#(\w+)/g;
    const matches = text.match(hashtagRegex) || [];
    return matches.map(tag => tag.substring(1)); // Remove # prefix
  };
  
  // Use provided hashtags or extract them from the post
  const displayHashtags = hashtags.length > 0 ? hashtags : extractHashtags(post);
  
  // Format post with clickable hashtags for display
  const formatPostForDisplay = (text: string) => {
    if (!text) return "";
    
    // Replace hashtags with styled spans
    const formattedText = text.replace(/#(\w+)/g, '<span class="text-brand-600 dark:text-brand-400 font-medium">$&</span>');
    
    // Replace line breaks with <br> tags for proper HTML display
    return formattedText.replace(/\n/g, '<br>');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(post);
    setCopied(true);
    toast({
      title: "Copied to clipboard",
      description: "Your post has been copied to the clipboard."
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    // In a real implementation, this would use LinkedIn's Share API
    window.open('https://www.linkedin.com/feed/?shareActive=true', '_blank');
    
    toast({
      title: "Ready to share",
      description: "LinkedIn opened in a new tab. Paste your post to share."
    });
  };

  // Get appropriate color for readability score
  const getReadabilityScoreColor = (score: number | null) => {
    if (!score) return "bg-gray-200 dark:bg-gray-700";
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-brand-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Post Preview</h2>
          </div>
          <div className={`text-xs font-medium px-2 py-1 rounded-md ${
            charCount > maxChars 
              ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
              : 'bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400'
          }`}>
            {charCount}/{maxChars} chars
          </div>
        </div>
        
        {post ? (
          <>
            {readabilityScore !== null && (
              <div className="mb-4 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300">
                    <BarChart3 className="mr-1 h-4 w-4" />
                    <span>Readability Score</span>
                  </div>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{readabilityScore}/100</span>
                </div>
                <Progress 
                  value={readabilityScore} 
                  className="h-2" 
                  indicatorClassName={getReadabilityScoreColor(readabilityScore)}
                />
              </div>
            )}
            
            <div className="relative bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-700 flex-grow overflow-auto mb-4 text-slate-700 dark:text-slate-300">
              {/* LinkedIn-like UI container */}
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                  <Linkedin className="h-5 w-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-slate-800 dark:text-slate-200">Your Name</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">Just now • <span>🌐</span></div>
                </div>
              </div>
              
              {/* Post content with clickable hashtags */}
              <div 
                className="post-content whitespace-pre-line mb-2 animate-fade-in" 
                dangerouslySetInnerHTML={{ __html: formatPostForDisplay(post) }}
              />
              
              {/* LinkedIn-like engagement metrics */}
              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-center">
                <span className="flex items-center mr-3 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer transition-colors">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                  Like
                </span>
                <span className="flex items-center mr-3 hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer transition-colors">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  Comment
                </span>
                <span className="flex items-center hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer transition-colors">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                  Share
                </span>
              </div>
            </div>
            
            {/* Hashtags section with improved animation */}
            {displayHashtags.length > 0 && (
              <div className="mb-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Hash className="mr-1 h-4 w-4" />
                  <span>Hashtags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {displayHashtags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-brand-100 text-brand-800 dark:bg-brand-900/30 dark:text-brand-300 hover:bg-brand-200 dark:hover:bg-brand-800/40 transition-colors cursor-pointer animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mt-auto">
              <Button 
                onClick={handleCopy} 
                variant="outline" 
                className="flex-1 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-all duration-300"
              >
                {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              
              <SavePostButton 
                post={post} 
                hashtags={displayHashtags}
                readabilityScore={readabilityScore}
                topic={topic}
                tone={tone}
                industry={industry}
              />
              
              <Button 
                onClick={handleShare} 
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-all duration-300 hover:shadow-md"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 p-6">
            <div className="text-center">
              <Linkedin className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4 animate-pulse" />
              <p className="text-slate-500 dark:text-slate-400 mb-2">
                Generated post will appear here
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500">
                Complete the form and click "Generate" to create content
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostPreview;
