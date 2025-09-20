
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  
  // Handle auth callback from Supabase email confirmations and OAuth providers
  useEffect(() => {
    // Check for auth hash in URL (from OAuth or email confirmations)
    const handleAuthCallback = async () => {
      // Check if URL contains access_token or hash parameters
      if (location.hash && (location.hash.includes('access_token') || location.hash.includes('error'))) {
        try {
          console.log('Auth callback detected, processing session...');
          // Process the hash and exchange it for a session
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Auth callback error:', error);
            toast({
              title: "Authentication error",
              description: error.message,
              variant: "destructive"
            });
          } else if (data?.session) {
            console.log('Auth callback processed successfully, session found');
            toast({
              title: "Authentication successful",
              description: "You have been logged in successfully.",
            });
          } else {
            console.warn('Auth callback processed but no session found');
            toast({
              title: "Authentication issue",
              description: "Session not established. Please try logging in again.",
              variant: "destructive"
            });
          }
        } catch (err) {
          console.error('Error processing auth callback:', err);
          toast({
            title: "Authentication error",
            description: "Failed to process authentication. Please try again.",
            variant: "destructive"
          });
        }
      }
    };
    
    handleAuthCallback();
  }, [location.hash, toast]);
  
  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500 mx-auto"></div>
          <p className="text-white mt-4">Loading authentication status...</p>
        </div>
      </div>
    );
  }
  
  // Redirect to intended destination if user is already logged in
  if (isAuthenticated) {
    const destination = sessionStorage.getItem('redirectAfterAuth') || '/dashboard';
    sessionStorage.removeItem('redirectAfterAuth');
    return <Navigate to={destination} replace />;
  }

  // Render the AuthForm with animated background to match home page
  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated background elements similar to home page */}
      <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="absolute -bottom-[200px] -left-[200px] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
      
      <div className="container mx-auto px-4 py-16">
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
