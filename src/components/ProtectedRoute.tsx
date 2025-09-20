import { ReactNode } from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export const ProtectedRoute = ({ children, fallback }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuthGuard();

  if (loading) {
    return (
      fallback || (
        <div className="flex items-center justify-center h-screen bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading...</p>
          </div>
        </div>
      )
    );
  }

  // If user is not authenticated, useAuthGuard will handle the redirect
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};