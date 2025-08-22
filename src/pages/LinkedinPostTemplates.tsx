import { useState } from 'react';
import SEOMetaTags from '@/components/SEOMetaTags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { postTemplates, getTemplatesByCategory, getTemplateCategories } from '@/data/postTemplates';
import { Copy, FileText, Search, Lightbulb, CheckCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const LinkedinPostTemplates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [customizedTemplate, setCustomizedTemplate] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const { toast } = useToast();

  const categories = ['all', ...getTemplateCategories()];

  const filteredTemplates = postTemplates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const copyTemplate = (template: string) => {
    navigator.clipboard.writeText(template);
    toast({
      title: "Template copied!",
      description: "The template has been copied to your clipboard.",
    });
  };

  const selectTemplate = (template: any) => {
    setSelectedTemplate(template);
    setCustomizedTemplate(template.template);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "LinkedIn Post Templates - Viral Content Formats",
    "description": "Free collection of proven LinkedIn post templates and formats. Copy-paste templates for viral content, storytelling, engagement, and professional networking.",
    "url": "https://brushin.in/linkedin-post-templates",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": postTemplates.slice(0, 10).map((template, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": template.title,
        "description": template.description,
        "category": template.category
      }))
    }
  };

  return (
    <>
      <SEOMetaTags 
        title="Free LinkedIn Post Templates - Viral Content Formats | Brushin.in"
        description="Access 50+ proven LinkedIn post templates and formats. Copy-paste templates for viral content, storytelling, engagement posts, and professional networking. Boost your LinkedIn presence!"
        keywords="LinkedIn post templates, LinkedIn content templates, viral LinkedIn posts, LinkedIn writing templates, social media templates, LinkedIn content formats, professional posting templates"
        url="https://brushin.in/linkedin-post-templates"
        schemaMarkup={schemaMarkup}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FileText className="h-4 w-4" />
              50+ LinkedIn Templates
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              LinkedIn Post Templates
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Proven LinkedIn post templates that drive engagement, build your network, and establish thought leadership. Copy, customize, and watch your content perform.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full text-lg"
              />
            </div>
          </div>
        </section>

        {/* Templates Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Templates List */}
              <div className="lg:col-span-2">
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="Storytelling">Stories</TabsTrigger>
                    <TabsTrigger value="Educational">Educational</TabsTrigger>
                    <TabsTrigger value="Thought Leadership">Leadership</TabsTrigger>
                  </TabsList>

                  <div className="space-y-6">
                    {filteredTemplates.map((template) => (
                      <Card key={template.id} className="group hover:shadow-lg transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-2">
                            <Badge variant="secondary">{template.category}</Badge>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => selectTemplate(template)}
                              className="text-primary hover:text-primary"
                            >
                              <Lightbulb className="h-4 w-4 mr-2" />
                              Customize
                            </Button>
                          </div>
                          
                          <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                            {template.title}
                          </CardTitle>
                          
                          <CardDescription className="text-base mb-3">
                            {template.description}
                          </CardDescription>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {template.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          <div className="bg-accent/30 p-4 rounded-lg mb-4">
                            <div className="text-sm font-medium mb-2">Template:</div>
                            <pre className="whitespace-pre-wrap text-sm text-muted-foreground font-sans">
                              {template.template}
                            </pre>
                          </div>
                          
                          <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-lg mb-4">
                            <div className="text-sm font-medium mb-2 text-green-700 dark:text-green-300">Example:</div>
                            <p className="text-sm text-green-600 dark:text-green-400">
                              {template.example}
                            </p>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              Use case: {template.useCase}
                            </span>
                            
                            <Button
                              size="sm"
                              onClick={() => copyTemplate(template.template)}
                            >
                              <Copy className="h-4 w-4 mr-2" />
                              Copy Template
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {filteredTemplates.length === 0 && (
                    <div className="text-center py-12">
                      <h3 className="text-xl font-semibold mb-2">No templates found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search terms or selecting a different category.
                      </p>
                    </div>
                  )}
                </Tabs>
              </div>

              {/* Template Customizer */}
              <div className="lg:col-span-1">
                <Card className="sticky top-6">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      Template Customizer
                    </CardTitle>
                    <CardDescription>
                      {selectedTemplate ? 'Customize your selected template' : 'Select a template to customize it'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {selectedTemplate ? (
                      <div className="space-y-4">
                        <div>
                          <div className="text-sm font-medium mb-2">Selected Template:</div>
                          <div className="text-sm text-primary font-medium">{selectedTemplate.title}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Customize your post:</div>
                          <Textarea
                            value={customizedTemplate}
                            onChange={(e) => setCustomizedTemplate(e.target.value)}
                            rows={12}
                            className="resize-none text-sm"
                            placeholder="Your customized post will appear here..."
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Button
                            onClick={() => copyTemplate(customizedTemplate)}
                            className="w-full"
                          >
                            <Copy className="h-4 w-4 mr-2" />
                            Copy Customized Post
                          </Button>
                          
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedTemplate(null);
                              setCustomizedTemplate('');
                            }}
                            className="w-full"
                          >
                            Clear Selection
                          </Button>
                        </div>

                        <div className="text-xs text-muted-foreground">
                          <strong>Tip:</strong> Replace the bracketed placeholders with your specific content to personalize the template.
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">
                          Click "Customize" on any template to start personalizing it for your use.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section className="py-16 px-4 bg-accent/5">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Template Best Practices</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Follow these guidelines to maximize the effectiveness of your LinkedIn post templates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Personalization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Replace all bracketed placeholders</li>
                    <li>• Add your personal experiences</li>
                    <li>• Use your authentic voice</li>
                    <li>• Include specific details and numbers</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Timing & Frequency</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Use 1-2 templates per week maximum</li>
                    <li>• Space out similar template types</li>
                    <li>• Post during peak engagement hours</li>
                    <li>• Track performance of each template</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Engagement Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• End with engaging questions</li>
                    <li>• Use relevant hashtags (3-5)</li>
                    <li>• Include call-to-actions</li>
                    <li>• Respond to comments quickly</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Want AI-Powered Content Creation?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Skip the manual work and let our AI generate personalized LinkedIn posts based on these proven templates.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/dashboard">Generate Posts with AI</a>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default LinkedinPostTemplates;