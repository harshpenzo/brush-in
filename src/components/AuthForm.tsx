
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
      <div className="container relative min-h-[calc(100vh-14rem)] py-8">
        <div className="flex items-center justify-center h-full">
          <div className="w-full max-w-md space-y-6 fade-in-bottom">
            {/* Special offer banner */}
            <div className="p-4 text-center bg-primary/10 border border-primary/20 rounded-lg">
              <p className="font-medium text-primary-foreground">
                <span className="font-bold">Special Offer:</span> Free premium access for new users this month!
              </p>
            </div>
            
            <Card className="w-full border shadow-smooth-lg bg-card/95 backdrop-blur-sm">
              <CardHeader className="space-y-3 text-center pb-6">
                <CardTitle className="text-2xl font-bold text-card-foreground">Welcome to BrushIn</CardTitle>
                <CardDescription className="text-base text-muted-foreground">
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
                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-medium text-card-foreground">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="m@example.com"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                          className="h-11 text-base"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password" className="text-sm font-medium text-card-foreground">Password</Label>
                          <button
                            type="button"
                            className="text-xs text-primary hover:text-primary/80 hover:underline transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              toast({ title: "Coming soon", description: "Password reset functionality coming soon!" });
                            }}
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showLoginPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            className="h-11 text-base pr-11"
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                            onClick={() => setShowLoginPassword(!showLoginPassword)}
                          >
                            {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 pt-2">
                        <Checkbox 
                          id="remember" 
                          checked={rememberMe} 
                          onCheckedChange={(checked) => setRememberMe(checked === true)}
                        />
                        <Label
                          htmlFor="remember"
                          className="text-sm font-medium text-muted-foreground cursor-pointer"
                        >
                          Remember me for 30 days
                        </Label>
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
                      <div className="space-y-3">
                        <Label htmlFor="full-name" className="text-sm font-medium text-card-foreground">Full Name</Label>
                        <Input
                          id="full-name"
                          placeholder="Enter your full name"
                          value={signupName}
                          onChange={(e) => setSignupName(e.target.value)}
                          required
                          className="h-11 text-base"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="signup-email" className="text-sm font-medium text-card-foreground">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="Enter your email"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          required
                          className="h-11 text-base"
                        />
                      </div>
                      
                      <div className="space-y-3">
                        <Label htmlFor="signup-password" className="text-sm font-medium text-card-foreground">Password</Label>
                        <div className="relative">
                          <Input
                            id="signup-password"
                            type={showSignupPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                            className="h-11 text-base pr-11"
                          />
                          <button 
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                            onClick={() => setShowSignupPassword(!showSignupPassword)}
                          >
                            {showSignupPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-3 pt-2">
                        <Checkbox 
                          id="terms" 
                          checked={termsAccepted} 
                          onCheckedChange={(checked) => setTermsAccepted(checked === true)}
                          required
                          className="mt-1"
                        />
                        <Label
                          htmlFor="terms"
                          className="text-sm text-muted-foreground cursor-pointer leading-relaxed"
                        >
                          I agree to the{" "}
                          <button
                            type="button"
                            className="text-primary hover:text-primary/80 hover:underline transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              toast({ title: "Terms of Service", description: "Terms of Service page coming soon!" });
                            }}
                          >
                            Terms of Service
                          </button>{" "}
                          and{" "}
                          <button
                            type="button"
                            className="text-primary hover:text-primary/80 hover:underline transition-colors"
                            onClick={(e) => {
                              e.preventDefault();
                              toast({ title: "Privacy Policy", description: "Privacy Policy page coming soon!" });
                            }}
                          >
                            Privacy Policy
                          </button>
                        </Label>
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
              
              <div className="pb-6 px-6 text-center border-t border-border mt-4 pt-4">
                <p className="text-sm text-muted-foreground">
                  {activeTab === "login" 
                    ? "Don't have an account? " 
                    : "Already have an account? "}
                  <button 
                    type="button"
                    className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium" 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveTab(activeTab === "login" ? "signup" : "login");
                    }}
                  >
                    {activeTab === "login" ? "Sign up" : "Log in"}
                  </button>
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
