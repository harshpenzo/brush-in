
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SEOMetaTags from "@/components/SEOMetaTags";
import { useAuth } from "@/hooks/useAuth";
import { fetchUserPosts, deletePost, Post } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit, Copy, Calendar, BarChart3, User, LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase";
import UsageTracker from "@/components/UsageTracker";

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    
    // Redirect if not authenticated
    if (!loading && !isAuthenticated) {
      navigate("/auth");
      return;
    }
    
    // Load user posts
    const loadPosts = async () => {
      if (!user?.id) return;
      
      try {
        setIsLoading(true);
        const userPosts = await fetchUserPosts(user.id);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
        toast({
          title: "Error loading posts",
          description: "Failed to load your saved posts. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, [isAuthenticated, loading, user, navigate, toast]);

  const handleDelete = async (postId: string) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter(post => post.id !== postId));
      toast({
        title: "Post deleted",
        description: "Your post has been deleted successfully."
      });
    } catch (error) {
      toast({
        title: "Error deleting post",
        description: "Failed to delete post. Please try again.",
        variant: "destructive"
      });
    }
  };
  
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Your post has been copied to the clipboard."
    });
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
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
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <SEOMetaTags 
        title="Dashboard - Manage Your LinkedIn Posts | Brushin.in"
        description="Access your LinkedIn content dashboard. Manage saved posts, track performance, and create new viral LinkedIn content with AI. Free dashboard for professional content creators."
        keywords="LinkedIn dashboard, content management, post analytics, LinkedIn content creator dashboard, social media management"
        url="https://brushin.in/dashboard"
      />
      <Layout>
      <div className="py-16 bg-slate-900 min-h-screen relative overflow-hidden">
        {/* Animated background elements similar to home page */}
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none"></div>
        <div className="absolute -bottom-[200px] -left-[200px] w-[400px] h-[400px] bg-brand-500/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: '2s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
                <p className="text-slate-400 mt-1">
                  Manage all your LinkedIn posts in one place
                </p>
              </div>
              <div className="flex gap-3">
                <div className="relative">
                  <Button 
                    variant="outline"
                    onClick={() => setShowProfile(!showProfile)}
                    className="flex items-center gap-2 border-slate-600 text-white hover:bg-slate-800"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Button>
                  
                  {showProfile && (
                    <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg z-50">
                      <div className="p-3 border-b border-slate-700">
                        <p className="font-medium text-white">{user?.email}</p>
                        <p className="text-sm text-slate-400">User Profile</p>
                      </div>
                      <div className="p-1">
                        <Button
                          variant="ghost"
                          onClick={handleSignOut}
                          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-950"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <Button 
                  onClick={() => navigate("/")} 
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Create New Post
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
              <div className="lg:col-span-1">
                <UsageTracker />
              </div>
              <div className="lg:col-span-3">
                <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button 
                        onClick={() => navigate("/")} 
                        className="bg-primary text-primary-foreground hover:bg-primary/90 h-12"
                      >
                        Create New Post
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => navigate("/pricing")}
                        className="h-12 border-slate-600 text-white hover:bg-slate-700"
                      >
                        View Pricing
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-slate-800/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow border border-slate-700">
                      <CardContent className="p-5">
                        <div className="animate-pulse space-y-4">
                          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                          <div className="space-y-2">
                            <div className="h-3 bg-slate-700 rounded"></div>
                            <div className="h-3 bg-slate-700 rounded w-5/6"></div>
                            <div className="h-3 bg-slate-700 rounded w-4/6"></div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="h-10 bg-slate-700 rounded w-10"></div>
                            <div className="h-10 bg-slate-700 rounded flex-grow"></div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <Card key={post.id} className="bg-slate-800/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow border border-slate-700">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="text-lg font-semibold text-white line-clamp-1">
                              {post.topic || "Untitled Post"}
                            </div>
                            <div className="flex items-center text-xs text-slate-400 space-x-2">
                              <span className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {post.created_at && formatDate(post.created_at)}
                              </span>
                              <span className="flex items-center">
                                <BarChart3 className="h-3 w-3 mr-1" />
                                Score: {post.readability_score || "N/A"}
                              </span>
                            </div>
                          </div>
                          <div className="px-2 py-1 bg-slate-700 text-xs rounded-md text-slate-200 font-medium">
                            {post.tone}
                          </div>
                        </div>
                        
                        <div className="text-slate-300 mb-4 line-clamp-3 text-sm">
                          {post.content}
                        </div>
                        
                        <div className="flex items-center gap-2 mt-4">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-slate-600 text-white hover:bg-slate-700" 
                            onClick={() => handleCopy(post.content)}
                          >
                            <Copy className="h-4 w-4 mr-1" /> Copy
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1 border-slate-600 text-white hover:bg-slate-700"
                          >
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="text-red-400 border-red-500/50 hover:bg-red-950 hover:text-red-300" 
                            onClick={() => post.id && handleDelete(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center bg-slate-800/50 backdrop-blur-sm rounded-lg p-10 border border-dashed border-slate-600">
                  <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400">
                      <path d="M12 20v-6M9 17h6"></path>
                      <path d="M5 3a2 2 0 0 0-2 2"></path>
                      <path d="M19 3a2 2 0 0 1 2 2"></path>
                      <path d="M21 19a2 2 0 0 1-2 2"></path>
                      <path d="M5 21a2 2 0 0 1-2-2"></path>
                      <path d="M9 3h1"></path>
                      <path d="M14 3h1"></path>
                      <path d="M21 9v1"></path>
                      <path d="M21 14v1"></path>
                      <path d="M3 9v1"></path>
                      <path d="M3 14v1"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">No posts yet</h3>
                  <p className="text-slate-400 text-center mb-4">
                    Create your first LinkedIn post to get started
                  </p>
                  <Button onClick={() => navigate("/")} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Create New Post
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
    </>
  );
};

export default Dashboard;
