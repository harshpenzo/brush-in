
import React from 'react';
import { SignIn, SignUp } from "@clerk/clerk-react";
import Layout from "@/components/Layout";

const AuthPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Welcome to BrushIn
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-8">
              Create professional LinkedIn content with AI
            </p>
          </div>
          
          <SignIn 
            routing="path" 
            path="/sign-in" 
            signUpUrl="/sign-up"
          />
          <SignUp 
            routing="path" 
            path="/sign-up" 
            signInUrl="/sign-in"
          />
        </div>
      </div>
    </Layout>
  );
};

export default AuthPage;
