
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
      title: "AI-Powered Content",
      description: "Generate professional LinkedIn posts with just a few clicks using advanced AI technology."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-brand-600 dark:text-brand-400" />,
      title: "Engagement Optimization",
      description: "Get data-driven suggestions to increase your post's reach and engagement with your network."
    },
    {
      icon: <Users className="w-12 h-12 text-brand-600 dark:text-brand-400" />,
      title: "Audience Targeting",
      description: "Craft messages that resonate with your specific professional audience and industry."
    },
    {
      icon: <Award className="w-12 h-12 text-brand-600 dark:text-brand-400" />,
      title: "Best Practices",
      description: "Learn LinkedIn content strategies used by top industry professionals and thought leaders."
    }
  ];

  return (
    <div className="py-24 bg-white dark:bg-slate-900" id="features">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16 animate-slide-in">
          <span className="inline-block px-4 py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-sm font-medium mb-4">
            Our Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Powerful AI Tools for LinkedIn Success
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Level up your LinkedIn game with our cutting-edge AI tools designed to help you create impactful content.
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
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Create a New LinkedIn Post</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Generate engaging LinkedIn content from scratch with AI assistance. Perfect for busy professionals who want quality content without the time investment.
            </p>
            <Button 
              className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm hover:shadow transition-smooth"
              onClick={() => onSelectOption("create")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Create New Post
            </Button>
            
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-100 dark:bg-brand-900/20 rounded-full opacity-70"></div>
          </Card>
          
          <Card className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-smooth relative overflow-hidden hover-lift">
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Enhance Your Existing Post</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Optimize your draft for maximum engagement and professional impact. Our AI will suggest improvements to help your content perform better.
            </p>
            <Button 
              variant="outline"
              className="border-2 border-brand-200 bg-white hover:bg-brand-50 text-brand-700 px-6 py-2 rounded-lg font-medium transition-smooth dark:bg-transparent dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30"
              onClick={() => onSelectOption("optimize")}
            >
              <Edit3 className="mr-2 h-5 w-5" />
              Optimize Post
            </Button>
            
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-slate-100 dark:bg-slate-700 rounded-full opacity-50"></div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Features;
