
import { Card, CardContent } from "@/components/ui/card";
import { 
  ThumbsUp, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Clock, 
  Hash, 
  Image, 
  AlertCircle,
  Star,
  Sparkles
} from "lucide-react";

const Tips = () => {
  const tips = [
    {
      icon: <Clock className="h-5 w-5 text-cyan-500" />,
      title: "Post Timing",
      description: "Post during weekdays between 8-10 AM or 5-6 PM for maximum visibility."
    },
    {
      icon: <ThumbsUp className="h-5 w-5 text-pink-500" />,
      title: "Engagement",
      description: "Ask questions at the end to encourage comments and boost your post's reach."
    },
    {
      icon: <Hash className="h-5 w-5 text-indigo-500" />,
      title: "Hashtags",
      description: "Use 3-5 relevant hashtags to increase discoverability."
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-purple-500" />,
      title: "Trending Topics",
      description: "Incorporate trending industry topics for more visibility."
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-cyan-500" />,
      title: "First Hour",
      description: "Respond to comments within the first hour to boost the algorithm."
    },
    {
      icon: <Image className="h-5 w-5 text-pink-500" />,
      title: "Visuals",
      description: "Add relevant images or videos to increase engagement by 98%."
    },
    {
      icon: <Users className="h-5 w-5 text-indigo-500" />,
      title: "Tagging",
      description: "Tag relevant connections but limit to 5 per post."
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-purple-500" />,
      title: "Avoid",
      description: "External links in the main post can reduce reach."
    }
  ];

  return (
    <Card className="h-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-[linear-gradient(90deg,#ff71ce,#01cdfe,#05ffa1,#b967ff,#fffb96)]"></div>
      
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <h2 className="text-lg font-bold text-indigo-900 font-pixel">LinkedIn Best Practices</h2>
          <Star className="w-4 h-4 ml-2 text-yellow-400 animate-pulse" />
        </div>
        
        <div className="grid gap-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3 group hover:bg-indigo-50 p-2 rounded-md transition-colors border-2 border-transparent hover:border-indigo-200">
              <div className="mt-0.5 group-hover:scale-110 transition-transform bg-white p-1 rounded-full border border-indigo-200 shadow-sm">
                {tip.icon}
              </div>
              <div>
                <h3 className="font-medium text-sm text-indigo-900 font-pixel">{tip.title}</h3>
                <p className="text-sm text-indigo-700">{tip.description}</p>
              </div>
              {index % 4 === 0 && <Sparkles className="w-3 h-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Tips;
