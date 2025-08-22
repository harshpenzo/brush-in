import { useParams, Link, Navigate } from 'react-router-dom';
import SEOMetaTags from '@/components/SEOMetaTags';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getBlogPost, blogPosts } from '@/data/blogPosts';
import { Clock, User, Calendar, ArrowLeft, ArrowRight, Share2, Bookmark } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getBlogPost(slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Organization",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Brushin.in",
      "logo": {
        "@type": "ImageObject",
        "url": "https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png"
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://brushin.in/blog/${post.slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.content.split(' ').length
  };

  return (
    <>
      <SEOMetaTags 
        title={post.seoTitle}
        description={post.seoDescription}
        keywords={post.tags.join(", ")}
        url={`https://brushin.in/blog/${post.slug}`}
        type="article"
        schemaMarkup={schemaMarkup}
      />
      
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
        {/* Navigation */}
        <section className="py-6 px-4 border-b border-border/50">
          <div className="container mx-auto max-w-4xl">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </section>

        {/* Article Header */}
        <article className="py-12 px-4">
          <div className="container mx-auto max-w-4xl">
            <header className="mb-12">
              <Badge className="mb-4">{post.category}</Badge>
              
              <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {post.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-8">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {new Date(post.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </header>

            <Separator className="mb-12" />

            {/* Article Content */}
            <div className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-code:text-foreground prose-pre:bg-accent prose-pre:text-foreground prose-blockquote:border-primary prose-blockquote:text-muted-foreground">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mt-12 mb-6 text-foreground">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-bold mt-10 mb-4 text-foreground">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-bold mt-8 mb-3 text-foreground">{children}</h3>,
                  p: ({ children }) => <p className="mb-6 text-muted-foreground leading-relaxed">{children}</p>,
                  ul: ({ children }) => <ul className="mb-6 space-y-2 text-muted-foreground">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-6 space-y-2 text-muted-foreground">{children}</ol>,
                  li: ({ children }) => <li className="ml-4">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-6 my-6 italic text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-accent px-2 py-1 rounded text-sm text-foreground">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-accent p-4 rounded-lg overflow-x-auto text-foreground my-6">
                      {children}
                    </pre>
                  )
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>

            <Separator className="my-12" />

            {/* Article Footer */}
            <footer className="text-center py-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Create Viral LinkedIn Content?</h3>
              <p className="text-muted-foreground mb-6">
                Use our AI-powered post generator to implement these strategies and create engaging LinkedIn content in minutes.
              </p>
              <Button size="lg" asChild>
                <Link to="/dashboard">Start Creating Posts</Link>
              </Button>
            </footer>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 px-4 bg-accent/5">
            <div className="container mx-auto max-w-6xl">
              <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="bg-background rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <Badge className="mb-3">{relatedPost.category}</Badge>
                    
                    <h3 className="text-xl font-bold mb-3 line-clamp-2">
                      <Link 
                        to={`/blog/${relatedPost.slug}`} 
                        className="hover:text-primary transition-colors"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{relatedPost.readTime}</span>
                      <Link 
                        to={`/blog/${relatedPost.slug}`}
                        className="text-primary hover:underline flex items-center"
                      >
                        Read more
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default BlogPost;