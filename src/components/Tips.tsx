
import { Card, CardContent } from "@/components/ui/card";
import { 
  ThumbsUp, 
  TrendingUp, 
  MessageSquare, 
  Users, 
  Clock, 
  Hash, 
  Image, 
  AlertCircle 
} from "lucide-react";

const Tips = () => {
  const tips = [
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Post Timing",
      description: "Post during weekdays between 8-10 AM or 5-6 PM for maximum visibility."
    },
    {
      icon: <ThumbsUp className="h-5 w-5 text-primary" />,
      title: "Engagement",
      description: "Ask questions at the end to encourage comments and boost your post's reach."
    },
    {
      icon: <Hash className="h-5 w-5 text-primary" />,
      title: "Hashtags",
      description: "Use 3-5 relevant hashtags to increase discoverability."
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-primary" />,
      title: "Trending Topics",
      description: "Incorporate trending industry topics for more visibility."
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      title: "First Hour",
      description: "Respond to comments within the first hour to boost the algorithm."
    },
    {
      icon: <Image className="h-5 w-5 text-primary" />,
      title: "Visuals",
      description: "Add relevant images or videos to increase engagement by 98%."
    },
    {
      icon: <Users className="h-5 w-5 text-primary" />,
      title: "Tagging",
      description: "Tag relevant connections but limit to 5 per post."
    },
    {
      icon: <AlertCircle className="h-5 w-5 text-primary" />,
      title: "Avoid",
      description: "External links in the main post can reduce reach."
    }
  ];

  return (
    <Card className="h-full">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">LinkedIn Best Practices</h2>
        <div className="grid gap-3">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="mt-0.5">{tip.icon}</div>
              <div>
                <h3 className="font-medium text-sm">{tip.title}</h3>
                <p className="text-sm text-gray-500">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Tips;
