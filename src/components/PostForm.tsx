
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Edit3 } from "lucide-react";
import { CreatePostForm } from "./post/CreatePostForm";
import { OptimizePostForm } from "./post/OptimizePostForm";
import { CreatePostFormValues } from "./post/CreatePostForm";
import { OptimizePostFormValues } from "./post/OptimizePostForm";

interface PostFormProps {
  onGenerate: (values: CreatePostFormValues) => void;
  onOptimize: (values: OptimizePostFormValues) => void;
  initialMode?: "create" | "optimize";
  isGenerating: boolean;
}

const PostForm = ({ onGenerate, onOptimize, initialMode = "create", isGenerating }: PostFormProps) => {
  const [mode, setMode] = useState<"create" | "optimize">(initialMode);

  // Update mode when initialMode prop changes
  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const handleModeChange = (newMode: "create" | "optimize") => {
    setMode(newMode);
  };

  return (
    <Card className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-5">
        <div className="flex gap-2 mb-6 bg-slate-50 dark:bg-slate-700/30 p-1 rounded-lg">
          <Button
            type="button"
            variant={mode === "create" ? "default" : "outline"}
            onClick={() => handleModeChange("create")}
            className={mode === "create" 
              ? "bg-sky-500 hover:bg-sky-600 text-white rounded-md flex-1 px-4 py-2" 
              : "bg-white dark:bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md flex-1"}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            <span className={mode === "create" ? "text-white" : "text-slate-900 dark:text-white"}>Create Post</span>
          </Button>
          <Button
            type="button"
            variant={mode === "optimize" ? "default" : "outline"}
            onClick={() => handleModeChange("optimize")}
            className={mode === "optimize" 
              ? "bg-sky-500 hover:bg-sky-600 text-white rounded-md flex-1 px-4 py-2" 
              : "bg-white dark:bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md flex-1"}
          >
            <Edit3 className="mr-2 h-4 w-4" />
            <span className={mode === "optimize" ? "text-white" : "text-slate-900 dark:text-white"}>Optimize Post</span>
          </Button>
        </div>

        {mode === "create" ? (
          <CreatePostForm 
            onGenerate={onGenerate} 
            isGenerating={isGenerating} 
          />
        ) : (
          <OptimizePostForm 
            onOptimize={onOptimize}
            isGenerating={isGenerating} 
          />
        )}
      </CardContent>
    </Card>
  );
};

export default PostForm;
