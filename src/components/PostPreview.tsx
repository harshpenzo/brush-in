
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy, Eye, Heart, MessageCircle, Repeat2, Send, TrendingUp, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SavePostButton } from "./post/SavePostButton";

interface PostPreviewProps {
  post: string;
  hashtags?: string[];
  readabilityScore?: number | null;
  topic?: string;
  tone?: string;
  industry?: string;
}

const PostPreview = ({ post, hashtags = [], readabilityScore, topic, tone, industry }: PostPreviewProps) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(post + "\n\n" + hashtags.map(tag => `#${tag}`).join(" "));
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-slate-400";
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getScoreLabel = (score: number | null) => {
    if (!score) return "Not calculated";
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Needs improvement";
  };

  return (
    <div className="space-y-4">
      {/* LinkedIn Post Preview */}
      <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="h-5 w-5 text-sky-500" />
              LinkedIn Preview
            </CardTitle>
            {post && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyToClipboard}
                  className="border-slate-300 dark:border-slate-600"
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
                <SavePostButton 
                  post={post}
                  hashtags={hashtags}
                  readabilityScore={readabilityScore}
                  topic={topic || ""}
                  tone={tone || "professional"}
                  industry={industry || "general"}
                />
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {post ? (
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
              {/* LinkedIn Post Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Your Name</h3>
                    <Badge variant="secondary" className="text-xs bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                      Professional
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Your Title • 2nd</p>
                  <p className="text-xs text-slate-500 dark:text-slate-500">2m • 🌐</p>
                </div>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-slate-900 dark:text-white whitespace-pre-wrap leading-relaxed">
                  {post}
                </p>
                {hashtags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {hashtags.map((tag, index) => (
                      <span key={index} className="text-sky-600 dark:text-sky-400 text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* LinkedIn Engagement Stats */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3">
                <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-3">
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                      <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                        <Heart className="h-3 w-3 text-white" />
                      </div>
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <TrendingUp className="h-3 w-3 text-white" />
                      </div>
                    </div>
                    <span>47 reactions</span>
                  </div>
                  <div className="flex gap-4">
                    <span>12 comments</span>
                    <span>8 reposts</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-around border-t border-slate-200 dark:border-slate-700 pt-2">
                  <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm font-medium">Like</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950">
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Comment</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950">
                    <Repeat2 className="h-4 w-4" />
                    <span className="text-sm font-medium">Repost</span>
                  </button>
                  <button className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950">
                    <Send className="h-4 w-4" />
                    <span className="text-sm font-medium">Send</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-8 text-center border border-slate-200 dark:border-slate-700">
              <div className="w-16 h-16 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-slate-400 dark:text-slate-500" />
              </div>
              <p className="text-slate-500 dark:text-slate-400">Your generated post will appear here</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analytics Card */}
      {(readabilityScore || post) && (
        <Card className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sky-500" />
              Post Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className={`text-2xl font-bold ${getScoreColor(readabilityScore)}`}>
                  {readabilityScore || "--"}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Readability Score</div>
                <div className={`text-xs ${getScoreColor(readabilityScore)}`}>
                  {getScoreLabel(readabilityScore)}
                </div>
              </div>
              <div className="text-center p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="text-2xl font-bold text-green-500">
                  {post ? Math.floor(post.length / 5) : 0}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Est. Reach</div>
                <div className="text-xs text-green-500">Projected views</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 dark:text-slate-400">Character count:</span>
                <span className="text-slate-900 dark:text-white">{post?.length || 0}/3000</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div 
                  className="bg-sky-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min((post?.length || 0) / 3000 * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {hashtags.length > 0 && (
                <Badge variant="outline" className="border-sky-200 text-sky-700 dark:border-sky-800 dark:text-sky-300">
                  {hashtags.length} hashtags
                </Badge>
              )}
              {tone && (
                <Badge variant="outline" className="border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300">
                  {tone} tone
                </Badge>
              )}
              {industry && (
                <Badge variant="outline" className="border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">
                  {industry}
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PostPreview;
