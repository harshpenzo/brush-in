
import { useState } from "react";
import Header from "@/components/Header";
import PostForm from "@/components/PostForm";
import PostPreview from "@/components/PostPreview";
import Tips from "@/components/Tips";

const Index = () => {
  const [generatedPost, setGeneratedPost] = useState("");

  const handleGeneratePost = (post: string) => {
    setGeneratedPost(post);
  };

  const handleOptimizePost = (post: string) => {
    setGeneratedPost(post);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Create Your LinkedIn Post</h2>
            <p className="text-gray-600">
              Generate engaging content or optimize existing posts to increase your LinkedIn engagement.
            </p>
            
            <PostForm 
              onGenerate={handleGeneratePost} 
              onOptimize={handleOptimizePost} 
            />
          </div>
          
          <div className="space-y-6">
            <div className="h-[400px]">
              <PostPreview post={generatedPost} />
            </div>
            
            <Tips />
          </div>
        </div>
      </main>
      
      <footer className="bg-gray-100 py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          LinkedIn Post Generator - Create engaging content for your professional network
        </div>
      </footer>
    </div>
  );
};

export default Index;
