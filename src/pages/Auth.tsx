
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/lib/supabase';

const Auth = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  
  // Handle auth callback from Supabase email confirmations and OAuth providers
  useEffect(() => {
    // Check for auth hash in URL (from OAuth or email confirmations)
    const handleAuthCallback = async () => {
      if (location.hash && (location.hash.includes('access_token') || location.hash.includes('error'))) {
        try {
          // Process the hash and exchange it for a session
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error('Auth callback error:', error);
          }
          
          console.log('Auth callback processed', !!data.session);
        } catch (err) {
          console.error('Error processing auth callback:', err);
        }
      }
    };
    
    handleAuthCallback();
  }, [location.hash]);
  
  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-500"></div>
      </div>
    );
  }
  
  // Redirect to dashboard if user is already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render the AuthForm
  return <AuthForm />;
};

export default Auth;
