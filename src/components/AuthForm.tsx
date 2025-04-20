
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Authentication logic will be implemented later
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <MessageSquare className="mx-auto h-12 w-12 text-slate-900" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            {isSignUp 
              ? "Start creating engaging content for your network" 
              : "Sign in to continue to BrushIn"}
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="relative block w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="relative block w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-slate-900 text-white hover:bg-slate-800 py-6"
          >
            {isSignUp ? "Sign up" : "Sign in"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-slate-600 hover:text-slate-900"
            >
              {isSignUp
                ? "Already have an account? Sign in"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
