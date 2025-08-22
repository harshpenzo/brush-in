import { useState } from 'react';
import SEOMetaTags from '@/components/SEOMetaTags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Hash, TrendingUp, Target, Zap, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LinkedinHashtagGenerator = () => {
  const [topic, setTopic] = useState('');
  const [industry, setIndustry] = useState('');
  const [generatedHashtags, setGeneratedHashtags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const industries = [
    'Technology', 'Marketing', 'Sales', 'Finance', 'Healthcare', 'Education', 
    'Real Estate', 'Consulting', 'Human Resources', 'Manufacturing', 
    'Retail', 'Hospitality', 'Legal', 'Non-Profit', 'Startups'
  ];

  const sampleHashtags = {
    trending: ['#leadership', '#innovation', '#entrepreneurship', '#networking', '#careerdevelopment'],
    niche: ['#linkedintips', '#b2bmarketing', '#salesstrategy', '#contentmarketing', '#personalbranding'],
    industry: ['#technology', '#artificialintelligence', '#digitaltransformation', '#cybersecurity', '#cloudcomputing']
  };

  const generateHashtags = async () => {
    if (!topic.trim()) {
      toast({
        title: "Please enter a topic",
        description: "Enter a topic or theme for your LinkedIn post to generate relevant hashtags.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate API call - in real app, this would call your hashtag generation service
    setTimeout(() => {
      const mockHashtags = [
        `#${topic.toLowerCase().replace(/\s+/g, '')}`,
        '#leadership',
        '#innovation',
        '#business',
        '#professional',
        '#success',
        '#motivation',
        '#strategy',
        '#growth',
        '#networking',
        '#careerdevelopment',
        '#entrepreneurship',
        '#digitalmarketing',
        '#contentcreator',
        '#thoughtleadership',
        '#industry4',
        '#futureofwork',
        '#personalbranding',
        '#linkedin',
        '#businessgrowth'
      ];
      
      // Add industry-specific hashtags if selected
      if (industry) {
        mockHashtags.push(`#${industry.toLowerCase()}`);
        mockHashtags.push(`#${industry.toLowerCase()}industry`);
      }
      
      setGeneratedHashtags(mockHashtags.slice(0, 15));
      setIsGenerating(false);
      
      toast({
        title: "Hashtags generated!",
        description: "Your LinkedIn hashtags are ready to use.",
      });
    }, 2000);
  };

  const copyHashtags = (hashtags: string[]) => {
    const hashtagText = hashtags.join(' ');
    navigator.clipboard.writeText(hashtagText);
    toast({
      title: "Copied to clipboard!",
      description: "Hashtags have been copied to your clipboard.",
    });
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "LinkedIn Hashtag Generator",
    "description": "Free LinkedIn hashtag generator tool to find trending and relevant hashtags for your LinkedIn posts and increase engagement.",
    "url": "https://brushin.in/linkedin-hashtag-generator",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEOMetaTags 
        title="Free LinkedIn Hashtag Generator - Find Trending Hashtags | Brushin.in"
        description="Generate trending LinkedIn hashtags for your posts instantly. Find relevant, high-performing hashtags to boost your LinkedIn engagement and reach. Free hashtag research tool."
        keywords="LinkedIn hashtag generator, LinkedIn hashtags, trending hashtags, LinkedIn marketing, hashtag research, social media hashtags, LinkedIn engagement, free hashtag tool"
        url="https://brushin.in/linkedin-hashtag-generator"
        schemaMarkup={schemaMarkup}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Hash className="h-4 w-4" />
              Free LinkedIn Tool
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              LinkedIn Hashtag Generator
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Generate trending, relevant hashtags for your LinkedIn posts to increase reach, engagement, and build your professional network.
            </p>
          </div>
        </section>

        {/* Generator Tool */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" />
                  Generate LinkedIn Hashtags
                </CardTitle>
                <CardDescription>
                  Enter your post topic and industry to get relevant hashtags that will boost your LinkedIn engagement.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="topic">Post Topic or Theme *</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., artificial intelligence, team leadership, startup journey"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry (Optional)</Label>
                    <Select value={industry} onValueChange={setIndustry}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((ind) => (
                          <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={generateHashtags} 
                  disabled={isGenerating}
                  size="lg"
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                      Generating Hashtags...
                    </>
                  ) : (
                    <>
                      <Hash className="h-5 w-5 mr-2" />
                      Generate Hashtags
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Hashtags */}
            {generatedHashtags.length > 0 && (
              <Card className="mb-8">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Generated Hashtags
                    </CardTitle>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyHashtags(generatedHashtags)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy All
                    </Button>
                  </div>
                  <CardDescription>
                    Click on individual hashtags to copy them, or copy all at once.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {generatedHashtags.map((hashtag, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors text-sm py-2 px-3"
                        onClick={() => copyHashtags([hashtag])}
                      >
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                    <h4 className="font-semibold mb-2">Copy-ready format:</h4>
                    <Textarea
                      value={generatedHashtags.join(' ')}
                      readOnly
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sample Hashtags */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Trending Hashtags
                  </CardTitle>
                  <CardDescription>Popular hashtags across LinkedIn</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {sampleHashtags.trending.map((hashtag) => (
                      <Badge
                        key={hashtag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => copyHashtags([hashtag])}
                      >
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-500" />
                    Niche Hashtags
                  </CardTitle>
                  <CardDescription>Targeted, specific hashtags</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {sampleHashtags.niche.map((hashtag) => (
                      <Badge
                        key={hashtag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => copyHashtags([hashtag])}
                      >
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Hash className="h-5 w-5 text-purple-500" />
                    Industry Hashtags
                  </CardTitle>
                  <CardDescription>Tech industry examples</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {sampleHashtags.industry.map((hashtag) => (
                      <Badge
                        key={hashtag}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                        onClick={() => copyHashtags([hashtag])}
                      >
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tips Section */}
            <Card>
              <CardHeader>
                <CardTitle>LinkedIn Hashtag Best Practices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">Hashtag Strategy Tips:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Use 3-5 hashtags per post for optimal reach</li>
                      <li>• Mix popular and niche hashtags</li>
                      <li>• Research hashtag volume before using</li>
                      <li>• Create branded hashtags for campaigns</li>
                      <li>• Avoid overused generic hashtags</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">What to Avoid:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Using too many hashtags (looks spammy)</li>
                      <li>• Irrelevant hashtags for quick reach</li>
                      <li>• Only using trending hashtags</li>
                      <li>• Ignoring hashtag performance analytics</li>
                      <li>• Using banned or inappropriate hashtags</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-accent/5">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Create Engaging LinkedIn Posts?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Now that you have the perfect hashtags, create compelling LinkedIn content with our AI-powered post generator.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/dashboard">Generate LinkedIn Posts</a>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default LinkedinHashtagGenerator;