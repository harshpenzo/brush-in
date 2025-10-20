import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, Search } from 'lucide-react';

interface TrendAwarePostCreatorProps {
  onGenerate: (data: {
    topic: string;
    context: string;
    industry: string;
    tone: string;
    writingStyle: string;
  }) => void;
  isGenerating: boolean;
}

export const TrendAwarePostCreator = ({ onGenerate, isGenerating }: TrendAwarePostCreatorProps) => {
  const [topic, setTopic] = useState('');
  const [context, setContext] = useState('');
  const [industry, setIndustry] = useState('');
  const [tone, setTone] = useState('professional');
  const [writingStyle, setWritingStyle] = useState('informative');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate({ topic, context, industry, tone, writingStyle });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-2xl p-8 border border-primary/10 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Research Writer</h2>
            <p className="text-sm text-muted-foreground">Powered by live web research & citations</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic" className="text-base font-semibold">
              What do you want to write about?
            </Label>
            <Input
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., AI in healthcare, remote work productivity, startup growth..."
              className="text-base h-12"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tone" className="text-base font-semibold">
                Tone
              </Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger id="tone" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="professional">Professional</SelectItem>
                  <SelectItem value="casual">Casual</SelectItem>
                  <SelectItem value="inspirational">Inspirational</SelectItem>
                  <SelectItem value="humorous">Humorous</SelectItem>
                  <SelectItem value="thought-provoking">Thought-provoking</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="writingStyle" className="text-base font-semibold">
                Writing Style
              </Label>
              <Select value={writingStyle} onValueChange={setWritingStyle}>
                <SelectTrigger id="writingStyle" className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="informative">Informative</SelectItem>
                  <SelectItem value="storytelling">Storytelling</SelectItem>
                  <SelectItem value="listicle">Listicle</SelectItem>
                  <SelectItem value="question-based">Question-based</SelectItem>
                  <SelectItem value="case-study">Case Study</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="industry" className="text-base font-semibold text-white">
              Your Industry <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="E.g., Tech, Marketing, Finance, Healthcare..."
              className="text-base h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="context" className="text-base font-semibold">
              Additional Context <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Textarea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Any specific angle, personal experience, or message you want to include..."
              className="min-h-[100px] text-base resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="w-full h-14 text-base font-semibold gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Researching web & writing with citations...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Research & Generate Post
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">How it works:</strong> Our AI searches the web for the latest 
            information on your topic, analyzes credible sources, and crafts a compelling LinkedIn post with 
            citations—tailored to your preferred tone and writing style.
          </p>
        </div>
      </div>
    </div>
  );
};
