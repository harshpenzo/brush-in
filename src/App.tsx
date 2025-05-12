
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { HelmetProvider, Helmet } from "react-helmet-async";

import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Faq from "./pages/Faq";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <AuthProvider>
              <Helmet>
                <title>Brushin - AI LinkedIn Post Creator for Professionals</title>
                <meta name="description" content="Create engaging, professional LinkedIn posts with Brushin AI. Generate content that drives engagement and builds your professional brand." />
                <meta name="keywords" content="Brushin, LinkedIn post creator, LinkedIn content, professional content, AI writer, LinkedIn engagement, LinkedIn strategy, social media for professionals" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="theme-color" content="#0ea5e9" />
                <link rel="canonical" href="https://brushin.app/" />
              </Helmet>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </div>
  );
};

export default App;
