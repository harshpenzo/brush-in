import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

interface UseAuthGuardOptions {
  redirectTo?: string;
  redirectAfterAuth?: string;
}

export const useAuthGuard = (options: UseAuthGuardOptions = {}) => {
  const { redirectTo = '/auth', redirectAfterAuth } = options;
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Store intended destination for post-auth redirect
      const currentPath = window.location.pathname + window.location.search;
      if (currentPath !== '/auth' && currentPath !== '/') {
        sessionStorage.setItem('redirectAfterAuth', currentPath);
      }
      
      // If a specific post-auth destination is provided, store it
      if (redirectAfterAuth) {
        sessionStorage.setItem('redirectAfterAuth', redirectAfterAuth);
      }
      
      navigate(redirectTo, { replace: true });
    }
  }, [loading, isAuthenticated, redirectTo, redirectAfterAuth, navigate]);

  return { isAuthenticated, loading };
};

// Helper function to get and clear the stored redirect destination
export const getAndClearRedirectDestination = (): string => {
  const destination = sessionStorage.getItem('redirectAfterAuth') || '/dashboard';
  sessionStorage.removeItem('redirectAfterAuth');
  return destination;
};