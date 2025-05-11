
import React from 'react';
import { Navigate } from 'react-router-dom';
import AuthForm from '@/components/AuthForm';
import { useAuth } from '@/hooks/useAuth';

const Auth = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if user is already logged in
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  // Render the AuthForm directly
  return <AuthForm />;
};

export default Auth;
