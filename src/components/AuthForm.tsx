
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageCircle, User, LogIn } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState<string>("signin");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful authentication
    toast({
      title: "Welcome back!",
      description: "You've successfully signed in",
    });
    navigate("/");
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful registration
    toast({
      title: "Account created",
      description: "Your account has been created successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4 py-20">
      <div className="w-full max-w-md">
        <Card className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg">
          <CardHeader className="text-center space-y-2 pb-2">
            <div className="mx-auto bg-sky-500/20 p-3 rounded-full w-14 h-14 flex items-center justify-center">
              <MessageCircle className="h-7 w-7 text-sky-500" />
            </div>
            <CardTitle className="text-2xl font-bold">Welcome to BrushIn</CardTitle>
            <CardDescription>Create professional LinkedIn content with AI</CardDescription>
          </CardHeader>

          <CardContent className="pt-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="signin" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </TabsTrigger>
                <TabsTrigger value="signup" className="data-[state=active]:bg-sky-500 data-[state=active]:text-white">
                  <User className="mr-2 h-4 w-4" />
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Password
                      </label>
                      <a href="#" className="text-xs text-sky-500 hover:text-sky-600">
                        Forgot password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="signup-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Full Name
                    </label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="John Doe"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-email" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Email Address
                    </label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="you@example.com"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="signup-password" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Password
                    </label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      required
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600">
                    Create Account
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
