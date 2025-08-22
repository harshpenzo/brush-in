import { useState } from 'react';
import SEOMetaTags from '@/components/SEOMetaTags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { resources, getFeaturedResources, getResourcesByCategory } from '@/data/resources';
import { Download, Search, BookOpen, FileText, Wrench, CheckSquare, Star } from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredResources = getFeaturedResources();
  const categories = ['all', 'Guides', 'Templates', 'Tools', 'Checklists'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'guide': return <BookOpen className="h-5 w-5" />;
      case 'template': return <FileText className="h-5 w-5" />;
      case 'tool': return <Wrench className="h-5 w-5" />;
      case 'checklist': return <CheckSquare className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "LinkedIn Resources Hub - Free Templates, Guides & Tools",
    "description": "Comprehensive collection of free LinkedIn resources including content templates, optimization guides, and professional tools for content creators and marketers.",
    "url": "https://brushin.in/resources",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": featuredResources.map((resource, index) => ({
        "@type": "CreativeWork",
        "position": index + 1,
        "name": resource.title,
        "description": resource.description,
        "category": resource.category
      }))
    }
  };

  return (
    <>
      <SEOMetaTags 
        title="Free LinkedIn Resources Hub - Templates, Guides & Tools | Brushin.in"
        description="Access our comprehensive collection of free LinkedIn resources including viral post templates, optimization guides, content calendars, and professional tools. Boost your LinkedIn presence today!"
        keywords="LinkedIn resources, free LinkedIn templates, LinkedIn guides, content templates, LinkedIn tools, social media resources, professional development, LinkedIn optimization"
        url="https://brushin.in/resources"
        schemaMarkup={schemaMarkup}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="h-4 w-4" />
              Free LinkedIn Resources Hub
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Everything You Need to Master LinkedIn
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Access our comprehensive collection of free templates, guides, and tools designed to skyrocket your LinkedIn presence and professional success.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto mb-12">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full text-lg"
              />
            </div>
          </div>
        </section>

        {/* Resources Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="grid w-full grid-cols-5 mb-8">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category === 'all' ? 'All Resources' : category}
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2 text-primary">
                          {getTypeIcon(resource.type)}
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                        </div>
                        {resource.featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        )}
                      </div>
                      
                      <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                        {resource.title}
                      </CardTitle>
                      
                      <CardDescription className="text-base">
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        {resource.readTime && (
                          <span className="text-sm text-muted-foreground">
                            {resource.readTime}
                          </span>
                        )}
                        
                        <Button 
                          size="sm" 
                          className="ml-auto"
                          onClick={() => {
                            if (resource.downloadUrl) {
                              window.open(resource.downloadUrl, '_blank');
                            }
                          }}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          {resource.downloadUrl ? 'Download' : 'View'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredResources.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-semibold mb-2">No resources found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or selecting a different category.
                  </p>
                </div>
              )}
            </Tabs>
          </div>
        </section>

        {/* Featured Resources Section */}
        {searchTerm === '' && selectedCategory === 'all' && (
          <section className="py-16 px-4 bg-accent/5">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Featured Resources</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our most popular and impactful resources, handpicked to accelerate your LinkedIn success.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredResources.map((resource) => (
                  <Card key={resource.id} className="relative border-2 border-primary/20 hover:border-primary/40 transition-all duration-300">
                    <div className="absolute -top-3 -right-3">
                      <div className="bg-primary text-primary-foreground rounded-full p-2">
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                    
                    <CardHeader>
                      <div className="flex items-center gap-2 text-primary mb-2">
                        {getTypeIcon(resource.type)}
                        <Badge variant="outline">Featured</Badge>
                      </div>
                      
                      <CardTitle className="text-xl mb-2">
                        {resource.title}
                      </CardTitle>
                      
                      <CardDescription>
                        {resource.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {resource.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Access Resource
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Transform Your LinkedIn Presence?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get instant access to our AI-powered LinkedIn post generator and create viral content in minutes.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <a href="/dashboard">Start Creating Posts Now</a>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Resources;