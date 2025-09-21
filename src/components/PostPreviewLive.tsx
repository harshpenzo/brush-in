import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Sparkles } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface PostPreviewLiveProps {
  preview?: string;
  isLoading?: boolean;
  isEnabled?: boolean;
}

const PostPreviewLive = ({ preview, isLoading, isEnabled }: PostPreviewLiveProps) => {
  if (!isEnabled) {
    return (
      <Card className="bg-slate-50 dark:bg-slate-800/50 border-dashed border-slate-300 dark:border-slate-600">
        <CardContent className="p-6 text-center">
          <Eye className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            Start typing to see live preview
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Sparkles className="h-4 w-4" />
          Live Preview
          <Badge variant="secondary" className="text-xs">AI</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : preview ? (
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
              {preview.substring(0, 200)}{preview.length > 200 ? "..." : ""}
            </p>
            {preview.length > 200 && (
              <p className="text-xs text-slate-500 mt-2">
                Preview truncated • Full post will be generated
              </p>
            )}
          </div>
        ) : (
          <p className="text-slate-500 dark:text-slate-400 text-sm italic">
            Generating preview...
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PostPreviewLive;