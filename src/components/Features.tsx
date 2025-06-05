
import { MessageCircle, Edit3, Zap, Users, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FeaturesProps {
  onSelectOption: (option: "create" | "optimize") => void;
}

const Features = ({ onSelectOption }: FeaturesProps) => {
  const features = [
    {
      icon: <Zap className="w-12 h-12 text-brand-600 dark:text-brand-400" />,
      title: "AI-Powered LinkedIn Content Generator",
      description: "Generate professional LinkedIn posts instantly with advanced AI technology. Our LinkedIn post generator creates engaging content that drives results and builds your professional brand."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-brand-600 dark:text-brand-400" />,
      title: "Viral Content Optimization",
      description: "Get data-driven suggestions to create viral LinkedIn content. Our AI analyzes top-performing posts to optimize your content for maximum reach and engagement."
    },
    {
      icon: <Users className="w-12 h-12 text-brand-600 dark:text-brand-400" />,
      title: "Professional Audience Targeting",
      description: "Craft LinkedIn posts that resonate with your specific professional audience. Target your industry, role, and network with AI-powered content personalization."
    },
    {
      icon: <Award className="w-12 h-12 text-brand-600 dark:text-brand-400" />,
      title: "LinkedIn Best Practices",
      description: "Learn proven LinkedIn content strategies used by top professionals and thought leaders. Our AI incorporates industry best practices for maximum impact."
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-slate-900" id="features" aria-labelledby="features-heading">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-slide-in">
          <span className="inline-block px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium mb-4">
            LinkedIn AI Tools
          </span>
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Best AI LinkedIn Post Generator for Professionals
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Create viral LinkedIn content with our AI-powered tools. Generate engaging posts, optimize for engagement, and build your professional brand with the #1 LinkedIn content AI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-smooth hover-lift"
            >
              <div className="p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg inline-block mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="bg-brand-50 dark:bg-slate-800 rounded-xl p-8 border border-brand-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-smooth relative overflow-hidden hover-lift">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Create New LinkedIn Posts with AI</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Generate engaging LinkedIn content from scratch with our AI LinkedIn post generator. Perfect for busy professionals who want viral content without spending hours writing. Create posts that drive engagement and build your personal brand.
            </p>
            <Button 
              className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow transition-smooth"
              onClick={() => onSelectOption("create")}
              aria-label="Start creating LinkedIn posts with AI"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Generate LinkedIn Post
            </Button>
            
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-100 dark:bg-brand-900/20 rounded-full opacity-70"></div>
          </Card>
          
          <Card className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-smooth relative overflow-hidden hover-lift">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Optimize Existing LinkedIn Content</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Transform your draft LinkedIn posts into viral content with our AI optimization tool. Get suggestions to improve engagement, readability, and professional impact. Make your LinkedIn content stand out in the feed.
            </p>
            <Button 
              variant="outline"
              className="border-2 border-brand-200 bg-white hover:bg-brand-50 text-brand-700 px-6 py-2 rounded-lg font-medium transition-smooth dark:bg-transparent dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30"
              onClick={() => onSelectOption("optimize")}
              aria-label="Optimize your LinkedIn content with AI"
            >
              <Edit3 className="mr-2 h-5 w-5" />
              Optimize Content
            </Button>
            
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-slate-100 dark:bg-slate-700 rounded-full opacity-50"></div>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              LinkedIn AI Content Generator
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              Professional Content Creation
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              Viral LinkedIn Posts
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
