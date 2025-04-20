
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { 
  SignedIn, 
  SignedOut, 
  RedirectToSignIn 
} from "@clerk/clerk-react";

import Index from "./pages/Index";
import AuthPage from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Faq from "./pages/Faq";
import Testimonials from "./pages/Testimonials";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <SignedIn>
                  <Index />
                </SignedIn>
              } 
            />
            <Route 
              path="/sign-in/*" 
              element={<AuthPage />} 
            />
            <Route 
              path="/sign-up/*" 
              element={<AuthPage />} 
            />
            <Route 
              path="/pricing" 
              element={
                <SignedIn>
                  <Pricing />
                </SignedIn>
              } 
            />
            <Route 
              path="/faq" 
              element={
                <SignedIn>
                  <Faq />
                </SignedIn>
              } 
            />
            <Route 
              path="/testimonials" 
              element={
                <SignedIn>
                  <Testimonials />
                </SignedIn>
              } 
            />
            <Route 
              path="/about" 
              element={
                <SignedIn>
                  <About />
                </SignedIn>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <SignedIn>
                  <Contact />
                </SignedIn>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
