
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MessageCircle, User, LogIn, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<string>("signin");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSignupPassword, setShowSignupPassword] = useState<boolean>(false);
  
  // Form states
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const { login, signUp, loading } = useAuth();
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || loading) return;
    
    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error("Sign in error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || loading) return;
    
    try {
      setIsSubmitting(true);
      await signUp(email, password, name);
      navigate("/");
    } catch (error) {
      console.error("Sign up error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleSignupPasswordVisibility = () => {
    setShowSignupPassword(!showSignupPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20">
      <div className="w-full max-w-md">
        <Card className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader className="text-center space-y-2 pb-2">
            <div className="mx-auto bg-sky-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center">
              <MessageCircle className="h-7 w-7 text-sky-500" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to Brushin</CardTitle>
            <CardDescription>Create professional LinkedIn content with AI</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-full">
                <TabsTrigger 
                  value="signin" 
                  className="data-[state=active]:bg-sky-500 data-[state=active]:text-white font-semibold text-base"
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="data-[state=active]:bg-sky-500 data-[state=active]:text-white font-semibold text-base"
                >
                  <User className="mr-2 h-4 w-4" />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-900 dark:text-white">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                      disabled={isSubmitting || loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium text-slate-900 dark:text-white">
                        Password
                      </label>
                      <a href="#" className="text-xs text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-medium">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 pr-10"
                        disabled={isSubmitting || loading}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-base py-6"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-5">
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="text-sm font-medium text-slate-900 dark:text-white">
                      Full Name
                    </label>
                    <Input
                      id="signup-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                      disabled={isSubmitting || loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="text-sm font-medium text-slate-900 dark:text-white">
                      Email Address
                    </label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                      disabled={isSubmitting || loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="text-sm font-medium text-slate-900 dark:text-white">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showSignupPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        className="w-full bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 pr-10"
                        disabled={isSubmitting || loading}
                      />
                      <button
                        type="button"
                        onClick={toggleSignupPasswordVisibility}
                        className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                        aria-label={showSignupPassword ? "Hide password" : "Show password"}
                      >
                        {showSignupPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white font-semibold text-base py-6"
                    disabled={isSubmitting || loading}
                  >
                    {isSubmitting || loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AuthForm;
