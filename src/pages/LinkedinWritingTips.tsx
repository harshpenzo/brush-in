import SEOMetaTags from '@/components/SEOMetaTags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PenTool, Target, TrendingUp, Users, MessageCircle, Eye, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

const LinkedinWritingTips = () => {
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "LinkedIn Writing Tips - Professional Content Creation Guide",
    "description": "Complete guide to LinkedIn writing with expert tips, best practices, and proven strategies to create engaging professional content that drives results.",
    "author": {
      "@type": "Organization",
      "name": "Brushin.in"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Brushin.in"
    },
    "url": "https://brushin.in/linkedin-writing-tips"
  };

  const writingTips = {
    hooks: [
      "Start with a bold statement or question",
      "Use the 'I used to think... but now I know...' format",
      "Share a surprising statistic or fact",
      "Begin with a personal confession or vulnerability",
      "Use the 'After X years of...' approach"
    ],
    structure: [
      "Hook (first 1-2 lines)",
      "Context or story setup",
      "Main content or lesson",
      "Key takeaways or action items",
      "Engaging question or call-to-action"
    ],
    engagement: [
      "Ask specific questions to encourage comments",
      "Use emojis strategically for visual appeal",
      "Include 3-5 relevant hashtags",
      "Tag relevant people when appropriate",
      "End with a clear call-to-action"
    ],
    formatting: [
      "Use line breaks for readability",
      "Bold key points with ** syntax",
      "Use bullet points or numbered lists",
      "Keep paragraphs short (1-3 sentences)",
      "Add emojis as visual separators"
    ]
  };

  const commonMistakes = [
    {
      mistake: "Writing like a press release",
      solution: "Write conversationally, like you're talking to a friend"
    },
    {
      mistake: "Being too promotional",
      solution: "Follow the 80/20 rule: 80% value, 20% promotion"
    },
    {
      mistake: "Using corporate jargon",
      solution: "Use simple, clear language that everyone understands"
    },
    {
      mistake: "Posting without a clear purpose",
      solution: "Always have a specific goal for each post"
    },
    {
      mistake: "Ignoring the first two lines",
      solution: "Make your opening compelling to encourage 'See more' clicks"
    }
  ];

  const contentTypes = [
    {
      type: "Personal Stories",
      description: "Share professional experiences, failures, and lessons learned",
      example: "How a major client rejection led to my biggest breakthrough",
      engagement: "High - people connect with authentic experiences"
    },
    {
      type: "Industry Insights",
      description: "Comment on trends, news, and developments in your field",
      example: "3 AI trends that will reshape marketing in 2025",
      engagement: "Medium-High - valuable for professional development"
    },
    {
      type: "How-To Guides",
      description: "Share actionable advice and step-by-step processes",
      example: "How to negotiate a 20% salary increase (with script)",
      engagement: "High - practical value drives saves and shares"
    },
    {
      type: "Behind-the-Scenes",
      description: "Show your work process, daily routine, or company culture",
      example: "My 5 AM morning routine that tripled my productivity",
      engagement: "Medium - builds personal connection"
    }
  ];

  return (
    <>
      <SEOMetaTags 
        title="LinkedIn Writing Tips - Professional Content Creation Guide | Brushin.in"
        description="Master LinkedIn writing with expert tips and best practices. Learn how to create engaging professional content that drives results, builds your network, and establishes thought leadership."
        keywords="LinkedIn writing tips, LinkedIn content creation, professional writing, LinkedIn copywriting, social media writing, business writing, LinkedIn engagement, content strategy"
        url="https://brushin.in/linkedin-writing-tips"
        schemaMarkup={schemaMarkup}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <PenTool className="h-4 w-4" />
              Professional Writing Guide
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              LinkedIn Writing Tips
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Master the art of LinkedIn writing with proven strategies, expert tips, and best practices to create content that engages, converts, and builds your professional brand.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <Tabs defaultValue="structure" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="structure">Structure</TabsTrigger>
                <TabsTrigger value="content">Content Types</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="mistakes">Common Mistakes</TabsTrigger>
              </TabsList>

              <TabsContent value="structure" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Target className="h-6 w-6 text-primary" />
                        Post Structure Framework
                      </CardTitle>
                      <CardDescription>
                        The proven 5-part structure for high-performing LinkedIn posts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {writingTips.structure.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{item}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <Lightbulb className="h-6 w-6 text-yellow-500" />
                        Powerful Hook Examples
                      </CardTitle>
                      <CardDescription>
                        Proven opening lines that grab attention and drive engagement
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {writingTips.hooks.map((hook, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                            <p className="text-sm">{hook}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Eye className="h-6 w-6 text-blue-500" />
                      Formatting Best Practices
                    </CardTitle>
                    <CardDescription>
                      Make your content easy to read and visually appealing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-3">Do This:</h4>
                        <div className="space-y-2">
                          {writingTips.formatting.map((tip, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <p className="text-sm">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="bg-accent/30 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3">Example Format:</h4>
                        <div className="text-sm space-y-2 font-mono">
                          <p><strong>Hook:</strong> I made a $50K mistake last year.</p>
                          <p></p>
                          <p>Here's what happened:</p>
                          <p></p>
                          <p>→ Main point 1</p>
                          <p>→ Main point 2</p>
                          <p>→ Main point 3</p>
                          <p></p>
                          <p><strong>Key takeaway:</strong> [Lesson learned]</p>
                          <p></p>
                          <p>What's your biggest professional lesson?</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="content" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {contentTypes.map((content, index) => (
                    <Card key={index} className="h-full">
                      <CardHeader>
                        <CardTitle className="text-xl">{content.type}</CardTitle>
                        <CardDescription>{content.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-accent/30 p-3 rounded-lg">
                          <div className="text-sm font-medium mb-1">Example:</div>
                          <p className="text-sm italic">"{content.example}"</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {content.engagement}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Content Planning Calendar</CardTitle>
                    <CardDescription>
                      Strategic content mix for consistent engagement
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 mb-2">40%</div>
                        <div className="text-sm font-medium mb-1">Educational Content</div>
                        <div className="text-xs text-muted-foreground">
                          How-tos, tips, industry insights
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 mb-2">30%</div>
                        <div className="text-sm font-medium mb-1">Personal Stories</div>
                        <div className="text-xs text-muted-foreground">
                          Experiences, lessons, behind-the-scenes
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 mb-2">30%</div>
                        <div className="text-sm font-medium mb-1">Engagement Posts</div>
                        <div className="text-xs text-muted-foreground">
                          Questions, polls, discussion starters
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="engagement" className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <MessageCircle className="h-6 w-6 text-green-500" />
                        Engagement Strategies
                      </CardTitle>
                      <CardDescription>
                        Proven tactics to increase likes, comments, and shares
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {writingTips.engagement.map((strategy, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                            <p className="text-sm">{strategy}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-orange-500" />
                        Engagement Metrics
                      </CardTitle>
                      <CardDescription>
                        Key metrics to track and optimize your content performance
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm font-medium">Engagement Rate</span>
                          <span className="text-sm text-muted-foreground">Target: 2-5%</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm font-medium">Comment Rate</span>
                          <span className="text-sm text-muted-foreground">Target: 0.5-2%</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-border/50">
                          <span className="text-sm font-medium">Share Rate</span>
                          <span className="text-sm text-muted-foreground">Target: 0.1-0.5%</span>
                        </div>
                        <div className="flex justify-between items-center py-2">
                          <span className="text-sm font-medium">Click-Through Rate</span>
                          <span className="text-sm text-muted-foreground">Target: 1-3%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Question Frameworks That Drive Comments</CardTitle>
                    <CardDescription>
                      Use these proven question formats to encourage meaningful discussions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Experience-Based Questions:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• "What's your biggest [topic] lesson?"</li>
                          <li>• "How do you handle [situation]?"</li>
                          <li>• "What would you do differently?"</li>
                          <li>• "Share your experience with..."</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-semibold">Opinion Questions:</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• "Agree or disagree?"</li>
                          <li>• "What's your take on this?"</li>
                          <li>• "Am I missing something?"</li>
                          <li>• "What's your unpopular opinion?"</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mistakes" className="space-y-8">
                <div className="space-y-6">
                  {commonMistakes.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-6 w-6 text-red-500" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div>
                              <h4 className="font-semibold text-red-600 mb-1">
                                ❌ Mistake: {item.mistake}
                              </h4>
                              <p className="text-green-600 font-medium">
                                ✅ Solution: {item.solution}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">Content Audit Checklist</CardTitle>
                    <CardDescription>
                      Review your posts against these criteria before publishing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Content Quality:</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Compelling hook in first 2 lines</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Clear value proposition</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Personal story or experience</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Actionable takeaways</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Formatting & Engagement:</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Easy to read formatting</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Engaging question at the end</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">3-5 relevant hashtags</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-sm">Call-to-action included</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-accent/5">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Apply These Writing Tips?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Use our AI-powered LinkedIn post generator to create content that follows these best practices automatically.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/dashboard">Start Writing Better Posts</a>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default LinkedinWritingTips;