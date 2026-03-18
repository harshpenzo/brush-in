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
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

// Helper function to clean up auth state
const cleanupAuthState = () => {
  localStorage.removeItem('supabase.auth.token');
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
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

  const initAuth = useCallback(async () => {
    try {
      setLoading(true);
      
      const isAuthRedirect = location.hash && 
        (location.hash.includes('access_token') || location.hash.includes('error'));

      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error checking auth session:', error);
        setLoading(false);
        return;
      }
      
      if (data?.session) {
        setSession(data.session);
        setUser(data.session.user);
        setIsAuthenticated(true);
        
        if (isAuthRedirect && location.pathname === '/auth') {
          const destination = getAndClearRedirectDestination();
          navigate(destination, { replace: true });
        }
      } else if (isAuthRedirect && !data?.session) {
        toast({
          title: "Authentication failed",
          description: "Failed to authenticate. Please try again.",
          variant: "destructive"
        });
      } else {
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
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, currentSession: Session | null) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsAuthenticated(!!currentSession?.user);
        
        if (event === 'SIGNED_OUT') {
          cleanupAuthState();
        } else if (event === 'SIGNED_IN' && currentSession) {
          setTimeout(() => {
            if (location.pathname === '/auth') {
              const destination = getAndClearRedirectDestination();
              navigate(destination, { replace: true });
            }
          }, 0);
        }
      }
    );

    initAuth();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [initAuth, location.pathname, navigate]);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      cleanupAuthState();
      
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
    } catch (error) {
      console.error('Google sign in error:', error);
      setLoading(false);
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data?.session) {
        toast({
          title: "Welcome back!",
          description: "You've been signed in successfully.",
        });
      }
    } catch (error: any) {
      console.error('Email sign in error:', error);
      setLoading(false);
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        throw error;
      }

      // If email confirmation is required, user won't have a session yet
      if (data?.user && !data?.session) {
        setLoading(false);
        return; // Let the caller show the "check email" toast
      }

      if (data?.session) {
        toast({
          title: "Account created!",
          description: "Welcome to BrushIn!",
        });
      }
    } catch (error: any) {
      console.error('Email sign up error:', error);
      setLoading(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
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
      
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signInWithGoogle, signInWithEmail, signUpWithEmail, logout, loading }}>
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
