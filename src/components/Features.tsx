
import { MessageCircle, Edit3, Zap, Users, TrendingUp, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturesProps {
  onSelectOption: (option: "create" | "optimize") => void;
}

const Features = ({ onSelectOption }: FeaturesProps) => {
  const features = [
    {
      icon: <Zap className="w-10 h-10 text-[#0077B5]" />,
      title: "AI-Powered Content",
      description: "Generate professional LinkedIn posts with just a few clicks using advanced AI"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-[#0077B5]" />,
      title: "Engagement Optimization",
      description: "Get data-driven suggestions to increase your post's reach and engagement"
    },
    {
      icon: <Users className="w-10 h-10 text-[#0077B5]" />,
      title: "Audience Targeting",
      description: "Craft messages that resonate with your specific professional audience"
    },
    {
      icon: <Award className="w-10 h-10 text-[#0077B5]" />,
      title: "Best Practices",
      description: "Learn LinkedIn content strategies used by top industry professionals"
    }
  ];

  return (
    <div className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What BrusIn Can Do</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            BrusIn helps you create impactful LinkedIn content that engages your network and builds your professional brand
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gradient-to-r from-[#0077B5]/10 to-[#0077B5]/5 p-8 rounded-lg shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left justify-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Create a New LinkedIn Post</h3>
              <p className="text-gray-600 mb-6">
                Generate engaging LinkedIn content from scratch with AI assistance
              </p>
              <Button 
                className="bg-[#0077B5] hover:bg-[#0077B5]/90"
                size="lg"
                onClick={() => onSelectOption("create")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Create New Post
              </Button>
            </div>
            
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left justify-center">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Enhance Your Existing Post</h3>
              <p className="text-gray-600 mb-6">
                Optimize your draft for maximum engagement and professional impact
              </p>
              <Button 
                variant="outline"
                className="border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5]/10"
                size="lg"
                onClick={() => onSelectOption("optimize")}
              >
                <Edit3 className="mr-2 h-5 w-5" />
                Optimize Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
