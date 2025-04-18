
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
    <Card className="h-full shadow-md border-[#0077B5]/20">
      <CardContent className="pt-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Post Preview</h2>
          <div className={`text-sm ${charCount > maxChars ? 'text-red-500' : 'text-gray-500'}`}>
            {charCount}/{maxChars} characters
          </div>
        </div>
        
        {post ? (
          <>
            <div className="bg-white p-5 rounded-md border border-gray-200 flex-grow overflow-auto whitespace-pre-line mb-4 shadow-inner text-gray-700">
              {post}
            </div>
            
            <div className="flex gap-2 mt-auto">
              <Button 
                onClick={handleCopy} 
                variant="outline" 
                className="flex-1 border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5]/10"
              >
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
              
              <Button 
                onClick={handleShare} 
                className="flex-1 bg-[#0077B5] hover:bg-[#0077B5]/90"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share on LinkedIn
              </Button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-grow bg-gray-50 rounded-md border border-dashed border-gray-200 p-6">
            <div className="text-center">
              <Linkedin className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-400">
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
