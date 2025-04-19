
import { ArrowDown, Linkedin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onScrollToFeatures: () => void;
  onSelectOption: (option: "create" | "optimize") => void;
}

const Hero = ({ onScrollToFeatures, onSelectOption }: HeroProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 bg-gradient-to-b from-brand-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>AI-powered LinkedIn content generator</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
              Create engaging <span className="text-brand-600 dark:text-brand-400">LinkedIn</span> content that drives results
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300">
              Your AI companion for crafting professional LinkedIn posts that stand out, engage your network, and establish your personal brand.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-6 rounded-lg font-medium text-base shadow-sm hover:shadow-md transition-smooth"
                onClick={() => onSelectOption("create")}
              >
                Create New Post
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-brand-200 bg-white hover:bg-brand-50 text-brand-700 px-8 py-6 rounded-lg font-medium text-base transition-smooth dark:bg-transparent dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30"
                onClick={() => onSelectOption("optimize")}
              >
                Optimize Existing Post
              </Button>
            </div>
          </div>
          
          <div className="relative w-full max-w-md animate-fade-in animation-delay-300">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-smooth-lg border border-slate-200 dark:border-slate-700 p-6 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">LinkedIn Post</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">AI-generated content</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <p className="text-slate-700 dark:text-slate-300">🚀 Excited to share my thoughts on digital transformation!</p>
                <p className="text-slate-700 dark:text-slate-300">In today's fast-paced professional environment, it's crucial to understand the impact of innovation on our industry.</p>
                <p className="text-slate-700 dark:text-slate-300">What's your experience with emerging technologies? Let me know in the comments!</p>
                <p className="text-slate-700 dark:text-slate-300">#Innovation #ProfessionalDevelopment #Leadership</p>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700"></div>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700"></div>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">25 reactions</p>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-brand-100 dark:bg-brand-900/30 rounded-xl -z-10"></div>
            <div className="absolute -bottom-3 -right-3 w-full h-full bg-brand-50 dark:bg-brand-800/30 rounded-xl -z-20"></div>
          </div>
        </div>
      </div>
      
      <div 
        className="absolute bottom-10 cursor-pointer transition-transform duration-300 animate-bounce hover:animate-none"
        onClick={onScrollToFeatures}
      >
        <div className="bg-white dark:bg-slate-800 p-3 rounded-full shadow-sm hover:shadow-md transition-smooth border border-slate-200 dark:border-slate-700">
          <ArrowDown 
            size={24} 
            className="text-brand-600 dark:text-brand-400" 
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
