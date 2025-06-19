
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
                <title>Brushin.in - #1 AI LinkedIn Post Generator | Create Viral Content in Seconds</title>
                <meta name="description" content="Brushin.in is the best AI LinkedIn post generator for professionals. Create viral LinkedIn content, increase engagement by 300%, and build your personal brand. Trusted by 50,000+ professionals worldwide." />
                <meta name="keywords" content="Brushin.in, LinkedIn post generator, AI LinkedIn content creator, viral LinkedIn posts, LinkedIn AI tools, professional content writer, LinkedIn engagement, LinkedIn marketing, AI content generator" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#0ea5e9" />
                <link rel="canonical" href="https://brushin.in/" />
                
                <!-- Open Graph -->
                <meta property="og:title" content="Brushin.in - AI LinkedIn Post Generator | Create Viral Content" />
                <meta property="og:description" content="Generate viral LinkedIn posts with AI. Trusted by 50,000+ professionals. Increase engagement by 300% and build your brand." />
                <meta property="og:url" content="https://brushin.in/" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png" />
                
                <!-- Twitter -->
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Brushin.in - AI LinkedIn Post Generator" />
                <meta name="twitter:description" content="Generate viral LinkedIn posts with AI. Increase engagement by 300%." />
                <meta name="twitter:image" content="https://brushin.in/lovable-uploads/cf6f2de5-2a9d-47ec-86e5-84d47c46319c.png" />
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
