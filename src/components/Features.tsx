
import { MessageCircle, Edit3, Zap, Users, TrendingUp, Award, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FeaturesProps {
  onSelectOption: (option: "create" | "optimize") => void;
}

const Features = ({ onSelectOption }: FeaturesProps) => {
  const features = [
    {
      icon: <Zap className="w-12 h-12 text-yellow-400" />,
      title: "AI-Powered Content",
      description: "Generate professional LinkedIn posts with just a few clicks using advanced AI"
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-pink-500" />,
      title: "Engagement Optimization",
      description: "Get data-driven suggestions to increase your post's reach and engagement"
    },
    {
      icon: <Users className="w-12 h-12 text-cyan-500" />,
      title: "Audience Targeting",
      description: "Craft messages that resonate with your specific professional audience"
    },
    {
      icon: <Award className="w-12 h-12 text-purple-500" />,
      title: "Best Practices",
      description: "Learn LinkedIn content strategies used by top industry professionals"
    }
  ];

  return (
    <div className="py-32 bg-gradient-to-b from-indigo-100 to-white relative" id="features">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-8 bg-[linear-gradient(90deg,#ff71ce,#01cdfe,#05ffa1,#b967ff,#fffb96)]"></div>
      
      <Star className="absolute top-12 left-[10%] w-8 h-8 text-yellow-400 animate-spin" style={{ animationDuration: '10s' }} />
      <Star className="absolute bottom-12 right-[10%] w-6 h-6 text-yellow-400 animate-pulse" />
      <Sparkles className="absolute top-1/2 right-[5%] w-10 h-10 text-pink-400 animate-ping" style={{ animationDuration: '4s' }} />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-24">
          <div className="inline-block bg-white p-8 border-4 border-black transform -rotate-1 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-indigo-900 font-pixel">Power Features</h2>
          </div>
          <p className="text-xl text-indigo-800 max-w-3xl mx-auto font-pixel mt-6">
            Level up your LinkedIn game with our cutting-edge AI tools
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <Card key={index} className="bg-white p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all transform rotate-0 hover:rotate-1">
              <div className="mb-6 p-4 bg-indigo-100 inline-block rounded-full border-2 border-black">{feature.icon}</div>
              <h3 className="text-2xl font-semibold mb-4 text-indigo-900 font-pixel">{feature.title}</h3>
              <p className="text-lg text-indigo-700">{feature.description}</p>
            </Card>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="bg-indigo-100 p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all relative overflow-hidden transform hover:rotate-1">
            <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-pink-400 animate-ping" />
            <h3 className="text-3xl font-bold mb-6 text-indigo-900 font-pixel">Create a New LinkedIn Post</h3>
            <p className="text-lg text-indigo-700 mb-8">
              Generate engaging LinkedIn content from scratch with AI assistance
            </p>
            <Button 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-2 border-black font-pixel text-lg px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              onClick={() => onSelectOption("create")}
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Create New Post
            </Button>
          </Card>
          
          <Card className="bg-pink-100 p-8 rounded-lg border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all relative overflow-hidden transform hover:rotate-1">
            <Star className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-pulse" />
            <h3 className="text-3xl font-bold mb-6 text-indigo-900 font-pixel">Enhance Your Existing Post</h3>
            <p className="text-lg text-indigo-700 mb-8">
              Optimize your draft for maximum engagement and professional impact
            </p>
            <Button 
              variant="outline"
              className="bg-white border-2 border-black text-pink-600 hover:bg-pink-50 font-pixel text-lg px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
              onClick={() => onSelectOption("optimize")}
            >
              <Edit3 className="mr-2 h-5 w-5" />
              Optimize Post
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Features;
