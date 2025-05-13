
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
                <title>Brushin - AI LinkedIn Post Creator for Professionals</title>
                <meta name="description" content="Create engaging, professional LinkedIn posts with Brushin AI. Generate content that drives engagement and builds your professional brand." />
                <meta name="keywords" content="Brushin, LinkedIn post creator, LinkedIn content, professional content, AI writer, LinkedIn engagement, LinkedIn strategy, social media for professionals" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#0ea5e9" />
                <link rel="canonical" href="https://brushin.app/" />
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
