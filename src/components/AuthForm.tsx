
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Eye, EyeOff, Loader2, LogIn, UserPlus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/Layout";

const AuthForm = () => {
  const { login, signUp, loginWithGoogle, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await login(loginEmail, loginPassword);
      // Navigation is handled in the useAuth hook
    } catch (error) {
      console.error("Login error:", error);
      // Error handling is done in the useAuth hook
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupEmail || !signupPassword || !signupName) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    if (!termsAccepted) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await signUp(signupEmail, signupPassword, signupName);
      // Navigation is handled in the useAuth hook
    } catch (error) {
      console.error("Signup error:", error);
      // Error handling is done in the useAuth hook
    }
  };

  return (
    <Layout>
      <div className="container relative min-h-[calc(100vh-14rem)] py-10">
        {/* Animated background elements similar to home page */}
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
        <div className="absolute -bottom-[200px] -left-[200px] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-brand-400/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '3s' }}></div>
        
        <div className="flex items-center justify-center h-full relative z-10">
          <div className="w-full max-w-md space-y-6 fade-in-bottom">
            {/* Special offer banner */}
            <div className="p-4 mb-6 text-center bg-yellow-100 border border-yellow-300 rounded-lg dark:bg-yellow-900/30 dark:border-yellow-800">
              <p className="font-medium text-yellow-800 dark:text-yellow-200">
                <span className="font-bold">Special Offer:</span> Free premium access for new users this month!
              </p>
            </div>
            
            <Card className="w-full border border-gray-300 dark:border-gray-700 shadow-lg bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to BrushIn</CardTitle>
                <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                  Sign in to your account or create a new one
                </CardDescription>
              </CardHeader>
              
              <Tabs 
                defaultValue="login" 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Log In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-base font-medium text-gray-900 dark:text-white">Email</Label>
                        <div className="relative">
                          <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                            className="text-base bg-white dark:bg-gray-800"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-base font-medium text-gray-900 dark:text-white">Password</Label>
                          <a 
                            href="#" 
                            className="text-xs text-blue-500 hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              toast({ title: "Coming soon", description: "Password reset functionality coming soon!" });
                            }}
                          >
                            Forgot password?
                          </a>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showLoginPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            className="text-base bg-white dark:bg-gray-800 pr-10"
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                          >
                            {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="remember" 
                          checked={rememberMe} 
                          onCheckedChange={(checked) => setRememberMe(checked === true)}
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full hover-lift" 
                        disabled={loading}
                        size="lg"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Signing in...
                          </>
                        ) : (
                          <>
                            <LogIn className="w-4 h-4 mr-2" />
                            Sign In
                          </>
                        )}
                      </Button>
                      
                      <div className="relative">
                        <Separator />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-background px-2 text-xs text-muted-foreground">
                            OR
                          </span>
                        </div>
                      </div>
                      
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full hover-lift" 
                        disabled={loading}
                        size="lg"
                        onClick={loginWithGoogle}
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup}>
                    <CardContent className="space-y-4 pt-4">
                      <div className="space-y-2">
                        <Label htmlFor="full-name" className="text-base font-medium text-gray-900 dark:text-white">Full Name</Label>
                        <Input
                          id="full-name"
                          placeholder="John Doe"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          required
                          className="text-base bg-white dark:bg-gray-800"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-base font-medium text-gray-900 dark:text-white">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="m@example.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          required
                          className="text-base bg-white dark:bg-gray-800"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-base font-medium text-gray-900 dark:text-white">Password</Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showSignupPassword ? "text" : "password"}
                            placeholder="••••••••"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                            className="text-base bg-white dark:bg-gray-800 pr-10"
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                          >
                            {showSignupPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <Checkbox 
                          id="terms" 
                          checked={termsAccepted} 
                          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                          required
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm text-gray-700 dark:text-gray-300"
                        >
                          I agree to the{" "}
                          <a
                            href="#"
                            className="text-blue-500 hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              toast({ title: "Terms of Service", description: "Terms of Service page coming soon!" });
                            }}
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="#"
                            className="text-blue-500 hover:underline"
                            onClick={(e) => {
                              e.preventDefault();
                              toast({ title: "Privacy Policy", description: "Privacy Policy page coming soon!" });
                            }}
                          >
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="space-y-4">
                      <Button 
                        type="submit" 
                        className="w-full hover-lift" 
                        disabled={loading || !termsAccepted}
                        size="lg"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating account...
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Create Account
                          </>
                        )}
                      </Button>
                      
                      <div className="relative">
                        <Separator />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="bg-background px-2 text-xs text-muted-foreground">
                            OR
                          </span>
                        </div>
                      </div>
                      
                      <Button 
                        type="button"
                        variant="outline" 
                        className="w-full hover-lift" 
                        disabled={loading}
                        size="lg"
                        onClick={loginWithGoogle}
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                      </Button>
                    </CardFooter>
                  </form>
                </TabsContent>
              </Tabs>
              
              <div className="pb-5 px-5 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activeTab === "login" 
                    ? "Don't have an account? " 
                    : "Already have an account? "}
                  <a 
                    href="#" 
                    className="text-blue-500 hover:underline" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(activeTab === "login" ? "signup" : "login");
                    }}
                  >
                    {activeTab === "login" ? "Sign up" : "Log in"}
                  </a>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuthForm;
