
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { savePost } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";
import type { Database } from "@/integrations/supabase/types";

type Post = Database['public']['Tables']['posts']['Row'];

interface SavePostButtonProps {
  post: string;
  hashtags: string[];
  readabilityScore: number | null;
  topic?: string;
  tone?: string;
  industry?: string;
  disabled?: boolean;
}

const SavePostButton = ({
  post,
  hashtags,
  readabilityScore,
  topic = "",
  tone = "professional",
  industry = "general",
  disabled = false
}: SavePostButtonProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();

  const handleSave = async () => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save posts",
        variant: "destructive"
      });
      return;
    }

    if (!post) {
      toast({
        title: "Cannot save empty post",
        description: "Please generate content first",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSaving(true);
      
      const postData = {
        user_id: user.id,
        content: post,
        hashtags: hashtags,
        readability_score: readabilityScore || 0,
        tone: tone,
        industry: industry,
        topic: topic
      };
      
      await savePost(postData);
      
      toast({
        title: "Post saved",
        description: "Your post has been saved to your account"
      });
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Save failed",
        description: "There was an error saving your post",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Button
      onClick={handleSave}
      disabled={disabled || isSaving || !post}
      variant="outline"
      className="flex-1 bg-white dark:bg-transparent border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30"
    >
      {isSaving ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Save className="mr-2 h-4 w-4" />
      )}
      {isSaving ? "Saving..." : "Save Post"}
    </Button>
  );
};

export default SavePostButton;
