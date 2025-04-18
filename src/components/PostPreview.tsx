
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Linkedin, Share2, Star, Sparkles } from "lucide-react";
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
    <Card className="h-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[linear-gradient(90deg,#ff71ce,#01cdfe,#05ffa1,#b967ff,#fffb96)]"></div>
      
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <h2 className="text-lg font-bold text-indigo-900 font-pixel">Post Preview</h2>
            <Star className="w-4 h-4 ml-2 text-yellow-400 animate-pulse" />
          </div>
          <div className={`text-sm font-medium px-2 py-1 rounded-md ${
            charCount > maxChars 
              ? 'bg-red-100 text-red-600 border border-red-300' 
              : 'bg-indigo-100 text-indigo-600 border border-indigo-300'
          }`}>
            {charCount}/{maxChars} chars
          </div>
        </div>
        
        {post ? (
          <>
            <div className="bg-white p-5 rounded-md border-2 border-black flex-grow overflow-auto whitespace-pre-line mb-4 shadow-inner text-gray-700 font-pixel">
              {post}
            </div>
            
            <div className="flex gap-2 mt-auto">
              <Button 
                onClick={handleCopy} 
                variant="outline" 
                className="flex-1 border-2 border-black text-indigo-600 hover:bg-indigo-50 font-pixel shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "COPIED" : "COPY"}
              </Button>
              
              <Button 
                onClick={handleShare} 
                className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white border-2 border-black font-pixel shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              >
                <Share2 className="mr-2 h-4 w-4" />
                SHARE ON LINKEDIN
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow bg-indigo-50 rounded-md border-2 border-dashed border-indigo-300 p-6 relative">
            <Sparkles className="absolute top-4 right-4 w-6 h-6 text-indigo-300 animate-ping" style={{ animationDuration: '3s' }} />
            <div className="text-center">
              <Linkedin className="h-12 w-12 text-indigo-300 mx-auto mb-4" />
              <p className="text-indigo-400 font-pixel">
                Generated post will appear here
              </p>
              <Star className="h-5 w-5 text-yellow-300 mx-auto mt-4 animate-pulse" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PostPreview;
