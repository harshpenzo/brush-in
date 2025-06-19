
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider, Helmet } from "react-helmet-async";
import AppRoutes from "./AppRoutes";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <TooltipProvider>
              <Helmet>
                <title>Brushin.in - Best AI LinkedIn Post Generator 2025 | Create Viral Content in Seconds</title>
                <meta name="description" content="Brushin.in is the #1 AI LinkedIn post generator trusted by 100,000+ professionals. Create viral LinkedIn content, boost engagement by 500%, and build your personal brand with our advanced AI LinkedIn content creator. Get 10 free posts monthly!" />
                <meta name="keywords" content="Brushin.in, Brushin AI, LinkedIn post generator, AI LinkedIn content creator, viral LinkedIn posts, LinkedIn AI tools, professional content writer, LinkedIn engagement, LinkedIn marketing, AI content generator, LinkedIn automation, social media AI, LinkedIn growth tool" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#0ea5e9" />
                <link rel="canonical" href="https://brushin.in/" />
                
                {/* Enhanced Open Graph */}
                <meta property="og:title" content="Brushin.in - Best AI LinkedIn Post Generator 2025 | Create Viral Content" />
                <meta property="og:description" content="Generate viral LinkedIn posts with AI. Trusted by 100,000+ professionals. Increase engagement by 500% and build your brand with Brushin.in. Get 10 free posts monthly!" />
                <meta property="og:url" content="https://brushin.in/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Brushin.in AI LinkedIn Post Generator Dashboard" />
                <meta property="og:site_name" content="Brushin.in" />
                <meta property="og:locale" content="en_US" />
                
                {/* Enhanced Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Brushin.in - Best AI LinkedIn Post Generator | Create Viral Content" />
                <meta name="twitter:description" content="Generate viral LinkedIn posts with AI. Trusted by 100,000+ professionals. Increase engagement by 500% and build your brand with Brushin.in." />
                <meta name="twitter:image" content="https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png" />
                <meta name="twitter:creator" content="@BrushinAI" />
                <meta name="twitter:site" content="@BrushinAI" />
                
                {/* Additional SEO meta tags */}
                <meta name="author" content="Brushin.in Team" />
                <meta name="publisher" content="Brushin.in" />
                <meta name="copyright" content="Brushin.in 2025" />
                <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
                <meta name="bingbot" content="index, follow" />
                <meta name="rating" content="general" />
                <meta name="distribution" content="global" />
                <meta name="coverage" content="worldwide" />
                <meta name="target" content="all" />
                <meta name="audience" content="all" />
                <meta name="subject" content="AI LinkedIn Post Generator, Content Creation, Professional Networking" />
                <meta name="abstract" content="Brushin.in helps professionals create viral LinkedIn content with AI" />
                <meta name="topic" content="AI, LinkedIn, Content Creation, Professional Networking" />
                <meta name="summary" content="Create viral LinkedIn posts with AI. Trusted by 100,000+ professionals." />
                <meta name="classification" content="Business, Technology, AI" />
                <meta name="owner" content="Brushin.in" />
                <meta name="url" content="https://brushin.in" />
                <meta name="identifier-URL" content="https://brushin.in" />
                <meta name="category" content="Business Tools, AI, Content Creation" />
                <meta name="coverage" content="Worldwide" />
                
                {/* LinkedIn specific */}
                <meta property="linkedin:owner" content="" />
                <meta name="linkedin:site" content="https://brushin.in" />
                
                {/* Language and locale */}
                <meta name="language" content="English" />
                <meta httpEquiv="content-language" content="en" />
                <meta name="geo.region" content="US" />
                <meta name="geo.placename" content="United States" />
                
                {/* App-specific */}
                <meta name="application-name" content="Brushin.in" />
                <meta name="apple-mobile-web-app-title" content="Brushin.in" />
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="mobile-web-app-capable" content="yes" />
                <meta name="msapplication-TileColor" content="#0ea5e9" />
                <meta name="msapplication-tap-highlight" content="no" />
              </Helmet>
              <AppRoutes />
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  );
};

export default App;
