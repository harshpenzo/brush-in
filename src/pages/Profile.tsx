
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Calendar, LayoutDashboard, LogOut, Edit } from "lucide-react";
import { supabase } from "@/lib/supabase";

const Profile = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    if (loading) return;
    
    if (!loading && !isAuthenticated) {
      navigate("/auth");
      return;
    }
  }, [isAuthenticated, loading, navigate]);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await supabase.auth.signOut();
      logout();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out."
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "Failed to sign out. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  const getUserInitial = () => {
    if (!user) return "U";
    const initial = user.user_metadata?.name?.charAt(0) || 
                   user.email?.charAt(0) || 
                   "U";
    return initial.toUpperCase();
  };

  const getUserDisplayName = () => {
    if (!user) return "User";
    return user.user_metadata?.name || user.email?.split('@')[0] || "User";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="py-16 bg-slate-900 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse space-y-6">
                <div className="h-8 bg-slate-700 rounded w-1/3"></div>
                <div className="bg-slate-800 rounded-lg p-6 space-y-4">
                  <div className="h-20 w-20 bg-slate-700 rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Layout>
      <div className="py-16 bg-slate-900 text-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
              <p className="text-slate-400">Manage your account and preferences</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card */}
              <div className="lg:col-span-2">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Profile Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avatar and Name */}
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-sky-500/20 rounded-full flex items-center justify-center border-4 border-sky-500/30">
                        <span className="text-2xl font-bold text-sky-400">{getUserInitial()}</span>
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-white">{getUserDisplayName()}</h2>
                        <p className="text-slate-400">LinkedIn Content Creator</p>
                      </div>
                    </div>

                    {/* User Details */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                        <Mail className="h-5 w-5 text-sky-400" />
                        <div>
                          <p className="text-sm text-slate-400">Email</p>
                          <p className="text-white">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-slate-700/50 rounded-lg">
                        <Calendar className="h-5 w-5 text-sky-400" />
                        <div>
                          <p className="text-sm text-slate-400">Member since</p>
                          <p className="text-white">{formatDate(user.created_at)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Edit Profile Button */}
                    <Button 
                      variant="outline" 
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      onClick={() => navigate("/dashboard")}
                      className="w-full bg-sky-600 hover:bg-sky-700 text-white"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      View Dashboard
                    </Button>
                    
                    <Button 
                      onClick={() => navigate("/")}
                      variant="outline"
                      className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      Create New Post
                    </Button>
                    
                    <Button 
                      onClick={handleSignOut}
                      disabled={isSigningOut}
                      variant="outline"
                      className="w-full border-red-600 text-red-400 hover:bg-red-950 hover:text-red-300"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {isSigningOut ? "Signing out..." : "Sign Out"}
                    </Button>
                  </CardContent>
                </Card>

                {/* Stats Card */}
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">Account Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Posts Created</span>
                        <span className="text-white font-semibold">-</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Account Type</span>
                        <span className="text-sky-400 font-semibold">Free</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
