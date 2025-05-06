
import { Card, CardContent } from "@/components/ui/card";
import { 
  ThumbsUp, 
  TrendingUp, 
  Hash,
  MessageSquare,
  Star
} from "lucide-react";

const Tips = () => {
  const tips = [
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
      icon: <MessageSquare className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "Call to Action",
      description: "Include a specific ask to drive more interactions."
    },
    {
      icon: <Star className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "Value First",
      description: "Provide insights before promoting anything."
    },
    {
      icon: <TrendingUp className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
      title: "Trending Topics",
      description: "Link your expertise to current industry trends."
    }
  ];

  return (
    <Card className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
      <CardContent className="p-2">
        <div className="flex items-center mb-1">
          <h2 className="text-xs font-semibold text-slate-900 dark:text-white">LinkedIn Best Practices</h2>
        </div>
        
        <div className="grid gap-1">
          {tips.map((tip, index) => (
            <div key={index} className="flex items-start gap-1 group hover:bg-slate-50 dark:hover:bg-slate-700 p-0.5 rounded-md transition-smooth">
              <div className="mt-0.5 group-hover:scale-110 transition-all bg-sky-50 dark:bg-sky-900/20 p-1 rounded-full">
                {tip.icon}
              </div>
              <div>
                <h3 className="font-medium text-xs text-slate-900 dark:text-white">{tip.title}</h3>
                <p className="text-[10px] text-slate-600 dark:text-slate-300 leading-tight">{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Tips;
