
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
      icon: <Clock className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "Post Timing",
      description: "Post during weekdays between 8-10 AM or 5-6 PM for maximum visibility."
    },
    {
      icon: <ThumbsUp className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "Engagement",
      description: "Ask questions to encourage comments and boost your post's reach."
    },
    {
      icon: <Hash className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "Hashtags",
      description: "Use 3-5 relevant hashtags to increase discoverability."
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "Trending Topics",
      description: "Incorporate trending industry topics for more visibility."
    }
  ];

  const moreTips = [
    {
      icon: <MessageSquare className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "First Hour",
      description: "Respond to comments within the first hour to boost the algorithm."
    },
    {
      icon: <Image className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "Visuals",
      description: "Add relevant images or videos to increase engagement by 98%."
    },
    {
      icon: <Users className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "Tagging",
      description: "Tag relevant connections but limit to 5 per post."
    },
    {
      icon: <AlertCircle className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "Avoid",
      description: "External links in the main post can reduce reach."
    }
  ];

  return (
    <Card className="h-full bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white">LinkedIn Best Practices</h2>
        </div>
        
        <div className="grid gap-2">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-2 group hover:bg-slate-50 dark:hover:bg-slate-700 p-1.5 rounded-md transition-smooth">
              <div className="mt-0.5 group-hover:scale-110 transition-all bg-sky-50 dark:bg-sky-900/20 p-1 rounded-full">
                {tip.icon}
              </div>
              <div>
                <h3 className="font-medium text-xs text-slate-900 dark:text-white">{tip.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">{tip.description}</p>
              </div>
            </div>
          ))}
          
          {/* Additional tips collapsed into a dropdown could be added here if needed */}
        </div>
      </CardContent>
    </Card>
  );
};

export default Tips;
