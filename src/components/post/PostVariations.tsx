import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Check, Sparkles, TrendingUp } from "lucide-react";
import { PostVariation } from "@/types/post";
import { toast } from "@/hooks/use-toast";

interface PostVariationsProps {
  variations: PostVariation[];
  isLoading?: boolean;
}

export const PostVariations = ({ variations, isLoading }: PostVariationsProps) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (content: string, index: number) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedIndex(index);
      toast({
        title: "Copied to clipboard!",
        description: "Post variation copied successfully.",
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const getCharacterColor = (count: number) => {
    if (count <= 1300) return "text-green-600 dark:text-green-400";
    if (count <= 3000) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          Generating post variations...
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6 animate-pulse">
              <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!variations || variations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          {variations.length} Post Variations Generated
        </h3>
        <Badge variant="outline" className="flex items-center gap-1">
          <TrendingUp className="h-3 w-3" />
          Optimized for Engagement
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {variations.map((variation, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2">
                    {variation.format}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {variation.formatDescription}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(variation.content, index)}
                  className="shrink-0"
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="h-4 w-4 mr-1" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4 mr-1" />
                      Copy
                    </>
                  )}
                </Button>
              </div>

              {/* Hook Preview */}
              <div className="bg-muted/50 p-3 rounded-lg border-l-4 border-primary">
                <p className="text-xs font-semibold text-muted-foreground mb-1">
                  HOOK
                </p>
                <p className="text-sm font-medium text-foreground">
                  {variation.hook}
                </p>
              </div>

              {/* Post Content */}
              <div className="bg-background p-4 rounded-lg border max-h-64 overflow-y-auto">
                <p className="text-sm whitespace-pre-wrap text-foreground leading-relaxed">
                  {variation.content}
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className={`text-sm font-medium ${getCharacterColor(variation.characterCount)}`}>
                  {variation.characterCount} characters
                  {variation.characterCount <= 1300 && " ✓"}
                </span>
              </div>

              {/* Engagement Tip */}
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-xs font-semibold text-primary mb-1 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  ENGAGEMENT TIP
                </p>
                <p className="text-xs text-muted-foreground">
                  {variation.engagementTip}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
