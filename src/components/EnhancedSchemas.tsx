import { useEffect } from 'react';

const EnhancedSchemas = () => {
  useEffect(() => {
    // Add FAQ Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Brushin.in?",
          "acceptedAnswer": {
            "@type": "Answer", 
            "text": "Brushin.in is an AI-powered LinkedIn content creation platform that helps professionals generate viral LinkedIn posts, optimize engagement, and build their personal brand. Our advanced algorithms analyze millions of high-performing posts to create content that resonates with your audience."
          }
        },
        {
          "@type": "Question",
          "name": "How does the AI LinkedIn post generator work?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our AI analyzes your topic, industry, and preferred tone to generate customized LinkedIn posts. It uses natural language processing and machine learning to create content that matches LinkedIn's algorithm preferences and maximizes engagement potential."
          }
        },
        {
          "@type": "Question",
          "name": "Is Brushin.in free to use?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes! Brushin.in offers 10 free AI-generated LinkedIn posts per month during our beta phase. We also offer premium plans with unlimited posts, advanced features, and priority support for growing professionals and teams."
          }
        },
        {
          "@type": "Question",
          "name": "Can I customize the generated LinkedIn posts?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! All generated posts can be edited and customized to match your voice and style. You can adjust tone, length, add personal touches, and optimize the content before publishing to LinkedIn."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Brushin.in different from other AI content tools?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Brushin.in is specifically designed for LinkedIn's unique professional environment. Our AI understands LinkedIn's algorithm, professional networking dynamics, and content psychology to create posts that not only engage but also build meaningful professional relationships."
          }
        }
      ]
    };

    // Add HowTo Schema for LinkedIn Content Creation
    const howToSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Create Viral LinkedIn Posts with AI",
      "description": "Learn how to use Brushin.in's AI technology to create engaging LinkedIn content that increases your professional visibility and drives meaningful connections.",
      "image": "https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png",
      "totalTime": "PT5M",
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
      },
      "supply": [
        {
          "@type": "HowToSupply",
          "name": "Free Brushin.in Account"
        },
        {
          "@type": "HowToSupply", 
          "name": "LinkedIn Profile"
        }
      ],
      "tool": [
        {
          "@type": "HowToTool",
          "name": "Brushin.in AI Content Generator"
        }
      ],
      "step": [
        {
          "@type": "HowToStep",
          "name": "Choose Your Content Topic",
          "text": "Select your industry focus or specific topic you want to discuss on LinkedIn",
          "url": "https://brushin.in",
          "image": "https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png"
        },
        {
          "@type": "HowToStep", 
          "name": "Set Your Professional Tone",
          "text": "Choose from various professional tones including thought leadership, industry insights, or personal branding",
          "url": "https://brushin.in",
          "image": "https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png"
        },
        {
          "@type": "HowToStep",
          "name": "Generate AI Content",
          "text": "Let Brushin.in's advanced AI create your optimized LinkedIn post with engaging hooks and clear calls-to-action",
          "url": "https://brushin.in", 
          "image": "https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png"
        },
        {
          "@type": "HowToStep",
          "name": "Customize and Optimize",
          "text": "Review, edit, and personalize the generated content to match your unique voice and brand",
          "url": "https://brushin.in",
          "image": "https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png"
        },
        {
          "@type": "HowToStep",
          "name": "Publish and Engage",
          "text": "Share your AI-generated LinkedIn post and engage with your professional network for maximum impact",
          "url": "https://brushin.in",
          "image": "https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png"
        }
      ]
    };

    // Enhanced SoftwareApplication Schema
    const softwareSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Brushin.in - AI LinkedIn Content Creator",
      "description": "Professional AI-powered LinkedIn content creation platform trusted by 10,000+ professionals worldwide. Generate viral LinkedIn posts, optimize engagement, and build your personal brand with advanced AI technology.",
      "url": "https://brushin.in",
      "applicationCategory": "BusinessApplication",
      "applicationSubCategory": "Content Creation",
      "operatingSystem": "Web Browser, iOS, Android",
      "softwareVersion": "2.0",
      "datePublished": "2024-01-01",
      "dateModified": new Date().toISOString(),
      "author": {
        "@type": "Organization",
        "name": "Brushin.in Team",
        "url": "https://brushin.in/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Brushin.in",
        "logo": {
          "@type": "ImageObject",
          "url": "https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png"
        }
      },
      "offers": [
        {
          "@type": "Offer",
          "name": "Free Plan",
          "price": "0",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "description": "10 free AI-generated LinkedIn posts per month"
        },
        {
          "@type": "Offer", 
          "name": "Pro Plan",
          "price": "29",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock", 
          "description": "Unlimited posts with advanced features"
        },
        {
          "@type": "Offer",
          "name": "Business Plan", 
          "price": "99",
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "description": "Team collaboration and white-label solution"
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "10000",
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": [
        {
          "@type": "Review",
          "author": {
            "@type": "Person",
            "name": "Emma Johnson"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5"
          },
          "reviewBody": "Brushin has completely transformed how I create content for LinkedIn. The AI-powered suggestions are spot-on and have helped me increase engagement by over 200%."
        }
      ],
      "featureList": [
        "AI-powered LinkedIn content generation",
        "Real-time engagement optimization", 
        "Industry-specific templates",
        "Professional tone adjustment",
        "Hashtag optimization",
        "Content calendar integration",
        "Analytics and performance tracking",
        "Team collaboration tools"
      ],
      "screenshot": "https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png",
      "softwareHelp": "https://brushin.in/faq",
      "installUrl": "https://brushin.in/auth",
      "downloadUrl": "https://brushin.in/auth",
      "sameAs": [
        "https://linkedin.com/company/brushin",
        "https://twitter.com/BrushinAI",
        "https://facebook.com/BrushinAI"
      ]
    };

    // Create and append schema scripts
    const schemas = [faqSchema, howToSchema, softwareSchema];
    const schemaElements: HTMLScriptElement[] = [];

    schemas.forEach((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = `enhanced-schema-${index}`;
      script.text = JSON.stringify(schema);
      
      if (!document.getElementById(`enhanced-schema-${index}`)) {
        document.head.appendChild(script);
        schemaElements.push(script);
      }
    });

    // Cleanup function
    return () => {
      schemaElements.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return null;
};

export default EnhancedSchemas;