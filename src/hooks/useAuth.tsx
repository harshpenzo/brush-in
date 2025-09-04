import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useLocation, useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
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
        
        // If this was an auth redirect, go to dashboard after successful login
        if (isAuthRedirect && location.pathname === '/auth') {
          console.log('Redirecting to dashboard after successful auth...');
          navigate('/dashboard', { replace: true });
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
              navigate('/dashboard', { replace: true });
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

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // Clean up existing state first
      cleanupAuthState();
      
      // Try global sign out to ensure clean state
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        // Handle email not confirmed error specially
        if (error.message.toLowerCase().includes('email not confirmed')) {
          toast({
            title: "Email not confirmed",
            description: "Please check your email for a confirmation link. Click resend to get a new confirmation email.",
            variant: "destructive",
          });
          
          // Attempt to resend confirmation email
          const { error: resendError } = await supabase.auth.resend({
            type: 'signup',
            email,
            options: {
              emailRedirectTo: `${window.location.origin}/auth`,
            },
          });
          
          if (!resendError) {
            toast({
              title: "Confirmation email sent",
              description: "Please check your inbox for the confirmation link.",
            });
          }
        } else {
          toast({
            title: "Authentication failed",
            description: error.message,
            variant: "destructive"
          });
        }
        throw error;
      }

      if (data.user) {
        toast({
          title: "Welcome back!",
          description: "You've successfully signed in",
        });
        
        // Navigate programmatically rather than refreshing the page
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // Clean up existing state first
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          },
          emailRedirectTo: `${window.location.origin}/auth`,
        }
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      if (data?.user) {
        // Check if email confirmation is required
        if (data.user.identities && data.user.identities.length === 0) {
          toast({
            title: "Account already exists",
            description: "An account with this email already exists. Please log in instead.",
          });
          
          // Switch to login tab
          return;
        } else if (!data.user.email_confirmed_at) {
          toast({
            title: "Account created!",
            description: "Please check your email to confirm your account before logging in.",
          });
        } else {
          // Auto login if email confirmation not required
          toast({
            title: "Account created",
            description: "Your account has been created successfully!",
          });
          
          // Navigate programmatically rather than refreshing the page
          navigate('/dashboard', { replace: true });
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      
      // Clean up existing state first
      cleanupAuthState();
      
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth`
        }
      });

      if (error) {
        toast({
          title: "Google sign-in failed",
          description: error.message,
          variant: "destructive"
        });
        throw error;
      }

      // OAuth redirect will handle the rest
    } catch (error) {
      console.error('Google login error:', error);
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
    <AuthContext.Provider value={{ user, isAuthenticated, login, signUp, loginWithGoogle, logout, loading }}>
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
