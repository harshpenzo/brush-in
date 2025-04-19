
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Linkedin, Share2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface PostPreviewProps {
  post: string;
}

const PostPreview = ({ post }: PostPreviewProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const charCount = post.length;
  const maxChars = 3000; // LinkedIn's character limit

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
    // For now, we'll just open LinkedIn in a new tab
    window.open('https://www.linkedin.com/feed/', '_blank');
    
    toast({
      title: "Ready to share",
      description: "LinkedIn opened in a new tab. Paste your post to share."
    });
  };

  return (
    <Card className="h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
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
            <div className="bg-slate-50 dark:bg-slate-900 p-5 rounded-lg border border-slate-200 dark:border-slate-700 flex-grow overflow-auto whitespace-pre-line mb-4 text-slate-700 dark:text-slate-300">
              {post}
            </div>
            
            <div className="flex gap-2 mt-auto">
              <Button 
                onClick={handleCopy} 
                variant="outline" 
                className="flex-1 bg-white dark:bg-transparent border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-smooth"
              >
                {copied ? <Check className="mr-2 h-4 w-4 text-green-500" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              
              <Button 
                onClick={handleShare} 
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white rounded-lg transition-smooth"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share on LinkedIn
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow bg-slate-50 dark:bg-slate-900 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 p-6">
            <div className="text-center">
              <Linkedin className="h-12 w-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-slate-500 dark:text-slate-400">
                Generated post will appear here
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostPreview;
