
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
      title: "Brushin.in AI-Powered LinkedIn Content Generator",
      description: "Generate professional LinkedIn posts instantly with Brushin.in's advanced AI technology. Our LinkedIn post generator creates engaging content that drives results and builds your professional brand. Trusted by 100,000+ professionals worldwide."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-brand-600 dark:text-brand-400" />,
      title: "Viral Content Optimization with Brushin.in",
      description: "Get data-driven suggestions to create viral LinkedIn content with Brushin.in. Our AI analyzes top-performing posts to optimize your content for maximum reach and engagement, increasing your visibility by 500%."
    },
    {
      icon: <Users className="w-12 h-12 text-brand-600 dark:text-brand-400" />,
      title: "Professional Audience Targeting",
      description: "Craft LinkedIn posts that resonate with your specific professional audience using Brushin.in. Target your industry, role, and network with AI-powered content personalization for maximum impact."
    },
    {
      icon: <Award className="w-12 h-12 text-brand-600 dark:text-brand-400" />,
      title: "LinkedIn Best Practices by Brushin.in",
      description: "Learn proven LinkedIn content strategies used by top professionals and thought leaders. Brushin.in's AI incorporates industry best practices for maximum impact and engagement optimization."
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-slate-900" id="features" aria-labelledby="features-heading">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-12 sm:mb-16 animate-slide-in">
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4">
            Brushin.in LinkedIn AI Tools
          </span>
          <h2 id="features-heading" className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-3 sm:mb-4 leading-tight">
            Brushin.in - Best AI LinkedIn Post Generator for Professionals
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Create viral LinkedIn content with Brushin.in's AI-powered tools. Generate engaging posts, optimize for engagement, and build your professional brand with the #1 LinkedIn content AI trusted by 100,000+ professionals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white dark:bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-smooth hover-lift"
            >
              <div className="p-2 sm:p-3 bg-brand-50 dark:bg-brand-900/20 rounded-lg inline-block mb-4 sm:mb-5">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-brand-600 dark:text-brand-400">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-slate-900 dark:text-white leading-tight">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <Card className="bg-brand-50 dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-brand-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-smooth relative overflow-hidden hover-lift">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white leading-tight">Create New LinkedIn Posts with Brushin.in AI</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 leading-relaxed">
              Generate engaging LinkedIn content from scratch with Brushin.in's AI LinkedIn post generator. Perfect for busy professionals who want viral content without spending hours writing. Create posts that drive engagement and build your personal brand with 500% better results.
            </p>
            <Button 
              className="w-full sm:w-auto bg-brand-600 hover:bg-brand-700 text-white px-4 sm:px-6 py-3 sm:py-2 rounded-lg font-medium shadow-sm hover:shadow transition-smooth text-sm sm:text-base min-h-[44px] touch-target"
              onClick={() => onSelectOption("create")}
              aria-label="Start creating LinkedIn posts with Brushin.in AI"
            >
              <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="truncate">Generate LinkedIn Post with Brushin.in</span>
            </Button>
            
            <div className="absolute -right-10 -bottom-10 w-32 h-32 sm:w-40 sm:h-40 bg-brand-100 dark:bg-brand-900/20 rounded-full opacity-70"></div>
          </Card>
          
          <Card className="bg-white dark:bg-slate-800 rounded-xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-smooth relative overflow-hidden hover-lift">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900 dark:text-white leading-tight">Optimize Existing LinkedIn Content with Brushin.in</h3>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-4 sm:mb-6 leading-relaxed">
              Transform your draft LinkedIn posts into viral content with Brushin.in's AI optimization tool. Get suggestions to improve engagement, readability, and professional impact. Make your LinkedIn content stand out in the feed with 500% better performance.
            </p>
            <Button 
              variant="outline"
              className="w-full sm:w-auto border-2 border-brand-200 bg-white hover:bg-brand-50 text-brand-700 px-4 sm:px-6 py-3 sm:py-2 rounded-lg font-medium transition-smooth dark:bg-transparent dark:border-brand-700 dark:text-brand-400 dark:hover:bg-brand-900/30 text-sm sm:text-base min-h-[44px] touch-target"
              onClick={() => onSelectOption("optimize")}
              aria-label="Optimize your LinkedIn content with Brushin.in AI"
            >
              <Edit3 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              <span className="truncate">Optimize Content with Brushin.in</span>
            </Button>
            
            <div className="absolute -right-10 -bottom-10 w-32 h-32 sm:w-40 sm:h-40 bg-slate-100 dark:bg-slate-700 rounded-full opacity-50"></div>
          </Card>
        </div>

        <div className="mt-12 sm:mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
              <span className="whitespace-nowrap">Brushin.in AI Content Generator</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
              <span className="whitespace-nowrap">Professional Content Creation</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0"></span>
              <span className="whitespace-nowrap">Viral LinkedIn Posts with Brushin.in</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
