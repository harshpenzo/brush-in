import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAndClearRedirectDestination } from './useAuthGuard';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Helper function to clean up auth state to prevent weird auth state issues
const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
  // Remove from sessionStorage if in use
  Object.keys(sessionStorage || {}).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      sessionStorage.removeItem(key);
    }
  });
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle auth state initialization and change detection
  const initAuth = useCallback(async () => {
    try {
      console.log('Initializing auth state...');
      setLoading(true);
      
      // Check if we're coming from an auth redirect
      const isAuthRedirect = location.hash && 
        (location.hash.includes('access_token') || 
         location.hash.includes('error'));

      if (isAuthRedirect) {
        console.log('Auth redirect detected, hash:', location.hash);
      }

      // First get the session directly to handle redirects and initial loading
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error checking auth session:', error);
        setLoading(false);
        return;
      }
      
      if (data?.session) {
        console.log('Session found during initialization:', !!data.session);
        setSession(data.session);
        setUser(data.session.user);
        setIsAuthenticated(true);
        
        // If this was an auth redirect, redirect to intended destination
        if (isAuthRedirect && location.pathname === '/auth') {
          const destination = getAndClearRedirectDestination();
          console.log('Redirecting after successful auth to:', destination);
          navigate(destination, { replace: true });
        }
      } else if (isAuthRedirect && !data?.session) {
        // Auth redirect with error
        console.error('Auth redirect detected but no session found');
        toast({
          title: "Authentication failed",
          description: "Failed to authenticate. Please try again.",
          variant: "destructive"
        });
      } else {
        console.log('No session found during initialization');
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (err) {
      console.error('Auth initialization error:', err);
    } finally {
      setLoading(false);
    }
  }, [location.hash, location.pathname, navigate, toast]);

  useEffect(() => {
    console.log('Setting up auth state listener...');
    
    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession: Session | null) => {
        console.log('Auth state changed:', event, !!currentSession);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession?.user);
        
        // Handle sign out event specifically
        if (event === 'SIGNED_OUT') {
          console.log('User signed out, cleaning up auth state...');
          cleanupAuthState();
        } 
        // Handle sign in event
        else if (event === 'SIGNED_IN' && currentSession) {
          console.log('User signed in, redirecting if on auth page...');
          // Use a timeout to avoid potential deadlocks with Supabase client
          setTimeout(() => {
            if (location.pathname === '/auth') {
              const destination = getAndClearRedirectDestination();
              navigate(destination, { replace: true });
            }
          }, 0);
        }
      }
    );

    // Initialize auth state
    initAuth();

    // Clean up subscription
    return () => {
      console.log('Cleaning up auth listener...');
      authListener.subscription.unsubscribe();
    };
  }, [initAuth, location.pathname, navigate]);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Clean up existing state first
      cleanupAuthState();
      
      // Store intended destination before redirecting
      const currentDestination = sessionStorage.getItem('redirectAfterAuth') || '/dashboard';
      sessionStorage.setItem('redirectAfterAuth', currentDestination);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        toast({
          title: "Authentication failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      // Note: OAuth flow will redirect, so we don't need to handle navigation here
    } catch (error) {
      console.error('Google sign in error:', error);
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      
      // Clean up auth state first
      cleanupAuthState();
      
      const { error } = await supabase.auth.signOut({ scope: 'global' });
      
      if (error) {
        toast({
          title: "Sign out failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }
      
      toast({
        title: "Signed out",
        description: "You've been successfully signed out",
      });
      
      // Navigate programmatically rather than refreshing the page
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signInWithGoogle, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
