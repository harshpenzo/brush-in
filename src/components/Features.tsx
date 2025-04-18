
import { MessageCircle, Edit3, Zap, Users, TrendingUp, Award, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturesProps {
  onSelectOption: (option: "create" | "optimize") => void;
}

const Features = ({ onSelectOption }: FeaturesProps) => {
  const features = [
    {
      icon: <Zap className="w-10 h-10 text-yellow-400" />,
      title: "AI-Powered Content",
      description: "Generate professional LinkedIn posts with just a few clicks using advanced AI"
    },
    {
      icon: <TrendingUp className="w-10 h-10 text-pink-500" />,
      title: "Engagement Optimization",
      description: "Get data-driven suggestions to increase your post's reach and engagement"
    },
    {
      icon: <Users className="w-10 h-10 text-cyan-500" />,
      title: "Audience Targeting",
      description: "Craft messages that resonate with your specific professional audience"
    },
    {
      icon: <Award className="w-10 h-10 text-purple-500" />,
      title: "Best Practices",
      description: "Learn LinkedIn content strategies used by top industry professionals"
    }
  ];

  return (
    <div className="py-20 bg-indigo-100 relative" id="features">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-8 bg-[linear-gradient(90deg,#ff71ce,#01cdfe,#05ffa1,#b967ff,#fffb96)]"></div>
      
      <Star className="absolute top-12 left-[10%] w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '10s' }} />
      <Star className="absolute bottom-12 right-[10%] w-6 h-6 text-yellow-400 animate-pulse" />
      <Sparkles className="absolute top-1/2 right-[5%] w-10 h-10 text-pink-400 animate-ping" style={{ animationDuration: '4s' }} />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-white p-6 border-4 border-black transform -rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-900 font-pixel">What BrushIn Can Do</h2>
          </div>
          <p className="text-lg text-indigo-800 max-w-2xl mx-auto font-pixel">
            BrushIn helps you create impactful LinkedIn content that engages your network and builds your professional brand
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all transform rotate-0 hover:rotate-1">
              <div className="mb-4 p-4 bg-indigo-100 inline-block rounded-full border-2 border-black">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-indigo-900 font-pixel">{feature.title}</h3>
              <p className="text-indigo-700">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-white p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[linear-gradient(90deg,#ff71ce,#01cdfe,#05ffa1,#b967ff,#fffb96)]"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left justify-center p-6 bg-indigo-100 rounded-lg border-2 border-black relative">
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-pink-400" />
              <h3 className="text-2xl font-bold mb-4 text-indigo-900 font-pixel">Create a New LinkedIn Post</h3>
              <p className="text-indigo-700 mb-6">
                Generate engaging LinkedIn content from scratch with AI assistance
              </p>
              <Button 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-2 border-black font-pixel shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                size="lg"
                onClick={() => onSelectOption("create")}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Create New Post
              </Button>
            </div>
            
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left justify-center p-6 bg-pink-100 rounded-lg border-2 border-black relative">
              <Star className="absolute -top-2 -right-2 w-6 h-6 text-yellow-400" />
              <h3 className="text-2xl font-bold mb-4 text-indigo-900 font-pixel">Enhance Your Existing Post</h3>
              <p className="text-indigo-700 mb-6">
                Optimize your draft for maximum engagement and professional impact
              </p>
              <Button 
                variant="outline"
                className="bg-white border-2 border-black text-pink-600 hover:bg-pink-50 font-pixel shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
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
