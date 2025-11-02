import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOMetaTags from '@/components/SEOMetaTags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { blogPosts, getFeaturedPosts } from '@/data/blogPosts';
import { Search, Clock, User, Calendar, ArrowRight, TrendingUp } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredPosts = getFeaturedPosts();
  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Brushin.in LinkedIn Marketing Blog",
    "description": "Expert insights on LinkedIn marketing, content creation, and professional networking. Learn strategies to grow your LinkedIn presence and generate leads.",
    "url": "https://brushin.in/blog",
    "author": {
      "@type": "Organization",
      "name": "Brushin.in"
    },
    "blogPost": featuredPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "author": {
        "@type": "Organization",
        "name": post.author
      },
      "datePublished": post.publishDate,
      "url": `https://brushin.in/blog/${post.slug}`
    }))
  };

  return (
    <>
      <SEOMetaTags 
        title="LinkedIn Marketing Blog - Expert Tips & Strategies | Brushin.in"
        description="Discover proven LinkedIn marketing strategies, content creation tips, and professional networking insights. Learn how to grow your LinkedIn presence and generate more leads with expert guidance."
        keywords="LinkedIn marketing blog, LinkedIn tips, content marketing, professional networking, LinkedIn strategy, social media marketing, B2B marketing, LinkedIn content creation"
        url="https://brushin.in/blog"
        schemaMarkup={schemaMarkup}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Hero Section */}
        <section className="relative py-20 px-4">
          <div className="container mx-auto max-w-6xl text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TrendingUp className="h-4 w-4" />
              LinkedIn Marketing Insights
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Master LinkedIn Marketing
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Expert insights, proven strategies, and actionable tips to grow your LinkedIn presence, generate leads, and build your professional brand.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-lg mx-auto mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full text-lg"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === 'all' ? 'All Articles' : category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Posts Section */}
        {searchTerm === '' && selectedCategory === 'all' && (
          <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Featured Articles</h2>
                  <p className="text-muted-foreground">Our most popular and impactful LinkedIn marketing guides</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                {featuredPosts.slice(0, 2).map((post, index) => (
                  <Card key={post.id} className={`group hover:shadow-xl transition-all duration-300 ${index === 0 ? 'lg:col-span-2' : ''}`}>
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(post.publishDate).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                      </div>
                      
                      <Badge className="w-fit mb-3">{post.category}</Badge>
                      
                      <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        <Link to={`/blog/${post.slug}`}>
                          {post.title}
                        </Link>
                      </CardTitle>
                      
                      <CardDescription className="text-base line-clamp-3">
                        {post.excerpt}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-semibold text-sm group-hover:text-primary transition-colors">
                        Read Full Article
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All Posts Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  {searchTerm ? 'Search Results' : selectedCategory === 'all' ? 'Latest Articles' : `${selectedCategory} Articles`}
                </h2>
                <p className="text-muted-foreground">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <CardHeader className="pb-4 flex-1">
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.publishDate).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {post.readTime}
                      </div>
                    </div>
                    
                    <Badge className="w-fit mb-3">{post.category}</Badge>
                    
                    <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      <Link to={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                    
                    <CardDescription className="text-base line-clamp-3 flex-1">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 font-semibold text-sm group-hover:text-primary transition-colors">
                      Read Article
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search terms or selecting a different category.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 px-4 bg-accent/5">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with LinkedIn Marketing Trends
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Get weekly insights, tips, and strategies delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1"
              />
              <Button>Subscribe Now</Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Put These Strategies Into Action?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Use our AI-powered LinkedIn post generator to create engaging content based on these proven strategies.
            </p>
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link to="/dashboard">Start Creating Content</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Blog;