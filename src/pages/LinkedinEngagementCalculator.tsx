import { useState } from 'react';
import SEOMetaTags from '@/components/SEOMetaTags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Calculator, TrendingUp, Users, Heart, MessageCircle, Share2, Eye, BarChart3 } from 'lucide-react';

const LinkedinEngagementCalculator = () => {
  const [followers, setFollowers] = useState('');
  const [likes, setLikes] = useState('');
  const [comments, setComments] = useState('');
  const [shares, setShares] = useState('');
  const [views, setViews] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateEngagement = () => {
    const followersNum = parseInt(followers) || 0;
    const likesNum = parseInt(likes) || 0;
    const commentsNum = parseInt(comments) || 0;
    const sharesNum = parseInt(shares) || 0;
    const viewsNum = parseInt(views) || 0;

    if (followersNum === 0) return;

    const totalEngagements = likesNum + commentsNum + sharesNum;
    const engagementRate = (totalEngagements / followersNum) * 100;
    const reachRate = viewsNum > 0 ? (viewsNum / followersNum) * 100 : 0;
    const interactionRate = viewsNum > 0 ? (totalEngagements / viewsNum) * 100 : 0;

    let performance = '';
    let performanceColor = '';
    if (engagementRate >= 5) {
      performance = 'Excellent';
      performanceColor = 'text-green-600';
    } else if (engagementRate >= 2) {
      performance = 'Good';
      performanceColor = 'text-blue-600';
    } else if (engagementRate >= 1) {
      performance = 'Average';
      performanceColor = 'text-yellow-600';
    } else {
      performance = 'Needs Improvement';
      performanceColor = 'text-red-600';
    }

    setResults({
      engagementRate: engagementRate.toFixed(2),
      reachRate: reachRate.toFixed(2),
      interactionRate: interactionRate.toFixed(2),
      totalEngagements,
      performance,
      performanceColor,
      followersNum,
      likesNum,
      commentsNum,
      sharesNum,
      viewsNum
    });
  };

  const resetCalculator = () => {
    setFollowers('');
    setLikes('');
    setComments('');
    setShares('');
    setViews('');
    setResults(null);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "LinkedIn Engagement Rate Calculator",
    "description": "Free LinkedIn engagement rate calculator to measure your post performance and analyze your LinkedIn metrics. Calculate engagement rates, reach, and interaction rates.",
    "url": "https://brushin.in/linkedin-engagement-calculator",
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
        title="LinkedIn Engagement Rate Calculator - Measure Your Performance | Brushin.in"
        description="Calculate your LinkedIn engagement rate instantly. Free tool to measure post performance, analyze metrics, and improve your LinkedIn content strategy. Get detailed engagement insights."
        keywords="LinkedIn engagement calculator, engagement rate calculator, LinkedIn analytics, social media metrics, LinkedIn performance, engagement analysis, LinkedIn marketing tools"
        url="https://brushin.in/linkedin-engagement-calculator"
        schemaMarkup={schemaMarkup}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Calculator className="h-4 w-4" />
              Free LinkedIn Tool
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              LinkedIn Engagement Calculator
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Measure your LinkedIn post performance with our free engagement rate calculator. Get detailed insights into your content's reach and effectiveness.
            </p>
          </div>
        </section>

        {/* Calculator Tool */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BarChart3 className="h-6 w-6 text-primary" />
                    Enter Your LinkedIn Metrics
                  </CardTitle>
                  <CardDescription>
                    Input your post metrics to calculate engagement rates and performance insights.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="followers" className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Total Followers *
                    </Label>
                    <Input
                      id="followers"
                      type="number"
                      placeholder="e.g., 5000"
                      value={followers}
                      onChange={(e) => setFollowers(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="likes" className="flex items-center gap-2">
                        <Heart className="h-4 w-4" />
                        Likes
                      </Label>
                      <Input
                        id="likes"
                        type="number"
                        placeholder="e.g., 150"
                        value={likes}
                        onChange={(e) => setLikes(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="comments" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        Comments
                      </Label>
                      <Input
                        id="comments"
                        type="number"
                        placeholder="e.g., 25"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="shares" className="flex items-center gap-2">
                        <Share2 className="h-4 w-4" />
                        Shares
                      </Label>
                      <Input
                        id="shares"
                        type="number"
                        placeholder="e.g., 10"
                        value={shares}
                        onChange={(e) => setShares(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="views" className="flex items-center gap-2">
                        <Eye className="h-4 w-4" />
                        Views (Optional)
                      </Label>
                      <Input
                        id="views"
                        type="number"
                        placeholder="e.g., 2500"
                        value={views}
                        onChange={(e) => setViews(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Button 
                      onClick={calculateEngagement} 
                      size="lg"
                      className="flex-1"
                      disabled={!followers}
                    >
                      <Calculator className="h-5 w-5 mr-2" />
                      Calculate Engagement
                    </Button>
                    
                    <Button 
                      onClick={resetCalculator} 
                      variant="outline"
                      size="lg"
                    >
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-green-500" />
                    Engagement Analysis
                  </CardTitle>
                  <CardDescription>
                    {results ? 'Your LinkedIn post performance metrics' : 'Results will appear here after calculation'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {results ? (
                    <div className="space-y-6">
                      {/* Main Engagement Rate */}
                      <div className="text-center p-6 bg-accent/50 rounded-lg">
                        <div className="text-4xl font-bold text-primary mb-2">
                          {results.engagementRate}%
                        </div>
                        <div className="text-lg font-semibold mb-1">Engagement Rate</div>
                        <div className={`text-sm font-medium ${results.performanceColor}`}>
                          {results.performance}
                        </div>
                      </div>

                      {/* Detailed Metrics */}
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Total Engagements</span>
                          <span className="text-lg font-bold">{results.totalEngagements}</span>
                        </div>
                        
                        {results.viewsNum > 0 && (
                          <>
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Reach Rate</span>
                              <span className="text-lg font-bold">{results.reachRate}%</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">Interaction Rate</span>
                              <span className="text-lg font-bold">{results.interactionRate}%</span>
                            </div>
                          </>
                        )}

                        {/* Engagement Breakdown */}
                        <div className="space-y-3">
                          <h4 className="font-semibold">Engagement Breakdown:</h4>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Likes ({results.likesNum})</span>
                              <span>{((results.likesNum / results.totalEngagements) * 100).toFixed(1)}%</span>
                            </div>
                            <Progress value={((results.likesNum / results.totalEngagements) * 100)} className="h-2" />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Comments ({results.commentsNum})</span>
                              <span>{((results.commentsNum / results.totalEngagements) * 100).toFixed(1)}%</span>
                            </div>
                            <Progress value={((results.commentsNum / results.totalEngagements) * 100)} className="h-2" />
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Shares ({results.sharesNum})</span>
                              <span>{((results.sharesNum / results.totalEngagements) * 100).toFixed(1)}%</span>
                            </div>
                            <Progress value={((results.sharesNum / results.totalEngagements) * 100)} className="h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      <Calculator className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Enter your metrics to see detailed engagement analysis</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Benchmarks */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>LinkedIn Engagement Benchmarks</CardTitle>
                <CardDescription>
                  Industry standards for LinkedIn engagement rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-red-600">0-1%</div>
                    <div className="text-sm font-medium">Needs Improvement</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Content may not be resonating with your audience
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">1-2%</div>
                    <div className="text-sm font-medium">Average</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Typical performance for most LinkedIn posts
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">2-5%</div>
                    <div className="text-sm font-medium">Good</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Above average engagement with your audience
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">5%+</div>
                    <div className="text-sm font-medium">Excellent</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Outstanding performance and high audience engagement
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>How to Improve Your LinkedIn Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Content Strategy:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Share personal stories and experiences</li>
                      <li>• Ask questions to encourage comments</li>
                      <li>• Post consistently (3-5 times per week)</li>
                      <li>• Use relevant hashtags (3-5 per post)</li>
                      <li>• Share industry insights and trends</li>
                      <li>• Create carousel posts with multiple slides</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Engagement Tactics:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Respond to comments within 2 hours</li>
                      <li>• Engage with others' posts regularly</li>
                      <li>• Post during peak hours (8-10 AM, 12-2 PM)</li>
                      <li>• Use native video content</li>
                      <li>• Build genuine relationships</li>
                      <li>• Share valuable, actionable insights</li>
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
              Ready to Boost Your LinkedIn Engagement?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Use our AI-powered LinkedIn post generator to create content that drives higher engagement rates.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/dashboard">Create High-Engagement Posts</a>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default LinkedinEngagementCalculator;