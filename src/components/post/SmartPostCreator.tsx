import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Wand2, Loader2, Plus, X, Lightbulb } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface ReferencePost {
  id: string;
  content: string;
}

interface SmartPostCreatorProps {
  onGenerate: (topic: string, referencePosts: string[], context: string) => void;
  isGenerating: boolean;
}

export const SmartPostCreator = ({ onGenerate, isGenerating }: SmartPostCreatorProps) => {
  const [topic, setTopic] = useState("");
  const [context, setContext] = useState("");
  const [referencePosts, setReferencePosts] = useState<ReferencePost[]>([]);
  const [currentReference, setCurrentReference] = useState("");

  const addReferencePost = () => {
    if (currentReference.trim()) {
      setReferencePosts([...referencePosts, { 
        id: Date.now().toString(), 
        content: currentReference.trim() 
      }]);
      setCurrentReference("");
    }
  };

  const removeReferencePost = (id: string) => {
    setReferencePosts(referencePosts.filter(post => post.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(
        topic,
        referencePosts.map(p => p.content),
        context
      );
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic */}
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-slate-200 font-medium flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-sky-400" />
              What do you want to post about?
            </Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., My experience scaling a startup, Lessons from failure, Industry insights..."
              className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500/20"
              required
            />
          </div>

          {/* Context */}
          <div className="space-y-2">
            <Label htmlFor="context" className="text-slate-200 font-medium">
              Additional context (optional)
            </Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Any specific details, key points, or personal experiences you want to include..."
              className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500/20 min-h-[80px]"
              rows={3}
            />
          </div>

          {/* Reference Posts */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-slate-200 font-medium">
                Reference Posts (optional)
              </Label>
              <span className="text-xs text-slate-400">
                {referencePosts.length}/3 added
              </span>
            </div>
            <p className="text-sm text-slate-400">
              Paste LinkedIn posts you admire. AI will learn their style, hooks, and structure.
            </p>

            {referencePosts.length > 0 && (
              <div className="space-y-2">
                {referencePosts.map((post) => (
                  <div 
                    key={post.id} 
                    className="relative bg-slate-800/50 border border-slate-700 rounded-lg p-3 group"
                  >
                    <button
                      type="button"
                      onClick={() => removeReferencePost(post.id)}
                      className="absolute top-2 right-2 p-1 bg-slate-700 hover:bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3 text-slate-200" />
                    </button>
                    <p className="text-sm text-slate-300 line-clamp-3 pr-8">
                      {post.content}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {referencePosts.length < 3 && (
              <div className="space-y-2">
                <Textarea
                  value={currentReference}
                  onChange={(e) => setCurrentReference(e.target.value)}
                  placeholder="Paste a LinkedIn post you like here..."
                  className="bg-slate-800 border-slate-600 text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500/20 min-h-[100px]"
                  rows={4}
                />
                <Button
                  type="button"
                  onClick={addReferencePost}
                  disabled={!currentReference.trim()}
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-200 hover:bg-slate-800"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Reference
                </Button>
              </div>
            )}
          </div>

          {/* Info box */}
          <div className="bg-sky-500/10 border border-sky-500/30 rounded-lg p-4">
            <h4 className="text-sm font-medium text-sky-300 mb-2">
              How it works:
            </h4>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>• AI analyzes your reference posts for patterns, hooks, and style</li>
              <li>• Learns what makes them engaging and human-like</li>
              <li>• Creates a personalized post matching your topic in a similar style</li>
              <li>• No references? AI uses proven LinkedIn best practices</li>
            </ul>
          </div>

          {/* Generate Button */}
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all shadow-lg shadow-sky-500/25"
            disabled={isGenerating || !topic.trim()}
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating your personalized post...
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" />
                Generate Smart Post
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
