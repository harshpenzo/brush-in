import { Helmet } from 'react-helmet-async';

interface SEOMetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  schemaMarkup?: object;
}

const SEOMetaTags = ({
  title = "Brushin.in - AI LinkedIn Post Generator | Create Viral Content in Minutes",
  description = "Transform your LinkedIn presence with AI-powered content creation. Generate viral LinkedIn posts, optimize engagement, and build your professional brand. Helped 10,000+ professionals worldwide. Try free!",
  keywords = "LinkedIn post generator, AI content creator, viral LinkedIn posts, professional content creation, LinkedIn marketing, social media automation, personal branding, AI writing assistant, LinkedIn growth, content optimization",
  image = "https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png",
  url = "https://brushin.in/",
  type = "website",
  schemaMarkup
}: SEOMetaTagsProps) => {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Brushin.in" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta name="twitter:creator" content="@brushin_in" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="Brushin.in Team" />
      <meta name="category" content="AI Tools, Professional Networking, Content Marketing" />

      {/* Schema.org markup */}
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOMetaTags;