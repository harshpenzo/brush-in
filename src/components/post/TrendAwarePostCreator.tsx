import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles } from 'lucide-react';

interface TrendAwarePostCreatorProps {
  onGenerate: (topic: string, context: string, industry: string) => void;
  isGenerating: boolean;
}

export const TrendAwarePostCreator = ({ onGenerate, isGenerating }: TrendAwarePostCreatorProps) => {
  const [topic, setTopic] = useState('');
  const [context, setContext] = useState('');
  const [industry, setIndustry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onGenerate(topic, context, industry);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 rounded-2xl p-8 border border-primary/10 shadow-lg">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-primary/10 rounded-xl">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Writer</h2>
            <p className="text-sm text-muted-foreground">Connected to live trends & research</p>
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

          <div className="space-y-2">
            <Label htmlFor="industry" className="text-base font-semibold">
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
                Researching trends & writing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Post
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">How it works:</strong> Our AI researches current trends, 
            analyzes successful LinkedIn posts, and writes in a natural, human voice that matches your 
            industry and topic—going beyond your input to create engaging, authentic content.
          </p>
        </div>
      </div>
    </div>
  );
};
