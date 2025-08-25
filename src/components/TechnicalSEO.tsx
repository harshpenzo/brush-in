import { useEffect } from 'react';

const TechnicalSEO = () => {
  useEffect(() => {
    // Add structured data for local business (if applicable)
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Brushin.in",
      "url": "https://brushin.in",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Content Creation",
      "operatingSystem": "Web Browser",
      "description": "AI-powered LinkedIn post generator for creating viral content",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "10000"
      }
    };

    // Add software product schema
    const productSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Brushin.in AI LinkedIn Post Generator",
      "description": "Professional LinkedIn content creation tool powered by AI",
      "brand": {
        "@type": "Brand",
        "name": "Brushin.in"
      },
      "category": "Software > Business Software > Content Management",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      }
    };

    // Create script elements
    const localScript = document.createElement('script');
    localScript.type = 'application/ld+json';
    localScript.text = JSON.stringify(localBusinessSchema);
    
    const productScript = document.createElement('script');
    productScript.type = 'application/ld+json';
    productScript.text = JSON.stringify(productSchema);

    // Add to head
    document.head.appendChild(localScript);
    document.head.appendChild(productScript);

    // Cleanup
    return () => {
      document.head.removeChild(localScript);
      document.head.removeChild(productScript);
    };
  }, []);

  useEffect(() => {
    // Add preload hints for critical resources
    const addPreloadHints = () => {
      // Preload critical fonts
      if (!document.querySelector('link[href*="Inter"]')) {
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
        fontLink.as = 'style';
        fontLink.crossOrigin = 'anonymous';
        document.head.appendChild(fontLink);
      }

      // Add resource hints
      const addResourceHint = (href: string, rel: string) => {
        if (!document.querySelector(`link[href="${href}"]`)) {
          const link = document.createElement('link');
          link.rel = rel;
          link.href = href;
          document.head.appendChild(link);
        }
      };

      // Preconnect to external domains
      addResourceHint('https://fonts.googleapis.com', 'preconnect');
      addResourceHint('https://fonts.gstatic.com', 'preconnect');
      addResourceHint('https://api.openai.com', 'preconnect');
      
      // DNS prefetch for social platforms
      addResourceHint('//linkedin.com', 'dns-prefetch');
      addResourceHint('//twitter.com', 'dns-prefetch');
      addResourceHint('//facebook.com', 'dns-prefetch');
    };

    addPreloadHints();
  }, []);

  useEffect(() => {
    // Add meta tags for social platforms
    const addSocialMetaTags = () => {
      const metaTags = [
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:updated_time', content: new Date().toISOString() },
        { property: 'article:modified_time', content: new Date().toISOString() },
        { name: 'twitter:label1', content: 'Users' },
        { name: 'twitter:data1', content: '10,000+' },
        { name: 'twitter:label2', content: 'Engagement Boost' },
        { name: 'twitter:data2', content: '500%' },
        { property: 'og:see_also', content: 'https://brushin.in/about' },
        { property: 'og:see_also', content: 'https://brushin.in/pricing' },
        { name: 'pinterest-rich-pin', content: 'true' },
        { property: 'business:contact_data:street_address', content: 'Global' },
        { property: 'business:contact_data:locality', content: 'Worldwide' },
        { property: 'business:contact_data:country_name', content: 'Global' }
      ];

      metaTags.forEach(tag => {
        const key = tag.property ? 'property' : 'name';
        const value = tag.property || tag.name;
        
        if (!document.querySelector(`meta[${key}="${value}"]`)) {
          const meta = document.createElement('meta');
          meta.setAttribute(key, value);
          meta.content = tag.content;
          document.head.appendChild(meta);
        }
      });
    };

    addSocialMetaTags();
  }, []);

  return null; // This component doesn't render anything
};

export default TechnicalSEO;