
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Edit3 } from "lucide-react";
import { CreatePostForm } from "./post/CreatePostForm";
import { OptimizePostForm } from "./post/OptimizePostForm";
import { CreatePostFormValues } from "./post/CreatePostForm";
import { OptimizePostFormValues } from "./post/OptimizePostForm";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface PostFormProps {
  onGenerate: (values: CreatePostFormValues) => void;
  onOptimize: (values: OptimizePostFormValues) => void;
  initialMode?: "create" | "optimize";
  isGenerating: boolean;
}

const PostForm = ({ onGenerate, onOptimize, initialMode = "create", isGenerating }: PostFormProps) => {
  const [activeTab, setActiveTab] = useState<string>(initialMode);

  // Update active tab when initialMode prop changes
  useEffect(() => {
    setActiveTab(initialMode);
  }, [initialMode]);

  return (
    <Card className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-5">
        <Tabs 
          defaultValue={activeTab} 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid grid-cols-2 mb-6 bg-slate-50 dark:bg-slate-700/30 p-1 rounded-lg w-full">
            <TabsTrigger 
              value="create" 
              className={activeTab === "create" 
                ? "bg-sky-500 hover:bg-sky-600 text-white rounded-md flex items-center justify-center px-4 py-2" 
                : "bg-white dark:bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md"}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              <span className={activeTab === "create" ? "text-white" : "text-slate-900 dark:text-white"}>Create Post</span>
            </TabsTrigger>
            <TabsTrigger 
              value="optimize" 
              className={activeTab === "optimize" 
                ? "bg-sky-500 hover:bg-sky-600 text-white rounded-md flex items-center justify-center px-4 py-2" 
                : "bg-white dark:bg-transparent hover:bg-slate-100 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-md"}
            >
              <Edit3 className="mr-2 h-4 w-4" />
              <span className={activeTab === "optimize" ? "text-white" : "text-slate-900 dark:text-white"}>Optimize Post</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create">
            <CreatePostForm 
              onGenerate={onGenerate} 
              isGenerating={isGenerating} 
            />
          </TabsContent>
          <TabsContent value="optimize">
            <OptimizePostForm 
              onOptimize={onOptimize}
              isGenerating={isGenerating} 
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PostForm;
