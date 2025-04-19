
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 dark:bg-slate-800">
        <div className="text-center max-w-md px-4">
          <h1 className="text-7xl font-bold text-slate-900 dark:text-white mb-4">404</h1>
          <p className="text-2xl text-gray-600 dark:text-slate-300 mb-6">Oops! Page not found</p>
          <p className="text-lg text-gray-500 dark:text-slate-400 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Button size="lg" asChild>
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
