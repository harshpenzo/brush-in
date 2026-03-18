import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import Layout from "@/components/Layout";

const AuthForm = () => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, loading } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error("Google login error:", error);
      toast({
        title: "Authentication failed",
        description: "Failed to sign in with Google. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing fields",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Password must be at least 6 characters.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsLoading(true);
      if (isSignUp) {
        await signUpWithEmail(email, password);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
      } else {
        await signInWithEmail(email, password);
      }
    } catch (error: any) {
      console.error("Email auth error:", error);
      toast({
        title: isSignUp ? "Sign up failed" : "Sign in failed",
        description: error?.message || "Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const buttonLoading = loading || isLoading;

  return (
    <Layout>
      <div className="container relative min-h-[calc(100vh-14rem)] py-8">
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-md space-y-6 fade-in-bottom">
            {/* Special offer banner */}
            <div className="p-4 text-center bg-sky-500/10 border border-sky-500/20 rounded-lg">
              <p className="font-medium text-white">
                <span className="font-bold text-sky-400">Special Offer:</span> Free premium access for new users this month!
              </p>
            </div>
            
            <Card className="w-full border border-slate-700 shadow-smooth-lg bg-slate-800/95 backdrop-blur-sm">
              <CardHeader className="space-y-3 text-center pb-6">
                <CardTitle className="text-2xl font-bold text-white">
                  {isSignUp ? "Create your account" : "Welcome to BrushIn"}
                </CardTitle>
                <CardDescription className="text-base text-slate-400">
                  {isSignUp 
                    ? "Sign up to start creating viral LinkedIn posts" 
                    : "Sign in to your account to get started"
                  }
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6 pb-8">
                {/* Email/Password Form */}
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-300">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-sky-500"
                        disabled={buttonLoading}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-300">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-sky-500"
                        disabled={buttonLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                        <Input
                          id="confirmPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 bg-slate-900 border-slate-600 text-white placeholder:text-slate-500 focus:border-sky-500"
                          disabled={buttonLoading}
                        />
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit"
                    className="w-full h-12 font-medium text-base bg-sky-500 hover:bg-sky-600 text-white" 
                    disabled={buttonLoading}
                    size="lg"
                  >
                    {buttonLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        {isSignUp ? "Creating account..." : "Signing in..."}
                      </>
                    ) : (
                      isSignUp ? "Create Account" : "Sign In"
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-slate-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-slate-800 px-2 text-slate-500">Or continue with</span>
                  </div>
                </div>

                {/* Google Login */}
                <Button 
                  onClick={handleGoogleLogin}
                  className="w-full h-12 font-medium text-base gap-3 bg-slate-900 border border-slate-600 text-white hover:bg-slate-700" 
                  disabled={buttonLoading}
                  size="lg"
                  variant="outline"
                >
                  {buttonLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                      Continue with Google
                    </>
                  )}
                </Button>

                {/* Toggle Sign Up / Sign In */}
                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setPassword("");
                      setConfirmPassword("");
                    }}
                    className="text-sm text-sky-400 hover:text-sky-300 hover:underline"
                  >
                    {isSignUp 
                      ? "Already have an account? Sign in" 
                      : "Don't have an account? Sign up"
                    }
                  </button>
                </div>
                
                <p className="text-xs text-center text-slate-500">
                  By signing in, you agree to our{" "}
                  <a href="/terms" className="text-sky-400 hover:underline">Terms of Service</a>
                  {" "}and{" "}
                  <a href="/privacy" className="text-sky-400 hover:underline">Privacy Policy</a>
                </p>
              </CardContent>
            </Card>
            
            <div className="text-center text-sm text-slate-500">
              <p>Trusted by thousands of professionals to create engaging LinkedIn content</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthForm;
