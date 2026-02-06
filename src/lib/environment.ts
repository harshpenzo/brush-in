// Environment configuration for production/development
const isDevelopment = import.meta.env.DEV;
const isProduction = import.meta.env.PROD;

// Supabase configuration
export const supabaseConfig = {
  url: isDevelopment 
    ? import.meta.env.VITE_SUPABASE_URL || "https://adhjacvblsxpzshkwsww.supabase.co"
    : "https://adhjacvblsxpzshkwsww.supabase.co",
  anonKey: isDevelopment
    ? import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkaGphY3ZibHN4cHpzaGt3c3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNjg1NjAsImV4cCI6MjA2MDc0NDU2MH0.bWAFpRmDOOHEbW824DvWl4LnVLF0othCDu_zb7LxsKg"
    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkaGphY3ZibHN4cHpzaGt3c3d3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNjg1NjAsImV4cCI6MjA2MDc0NDU2MH0.bWAFpRmDOOHEbW824DvWl4LnVLF0othCDu_zb7LxsKg"
};

// API configuration - API keys are now handled server-side via edge functions
// VITE_ prefixed keys are removed for security - they were exposed in client bundles
export const apiConfig = {
  // Deprecated: API keys are no longer stored client-side
  // Use edge functions (gemini-generate, research-post) for AI features
};

// App configuration
export const appConfig = {
  name: "Brushin.in",
  version: "3.0.0",
  environment: isProduction ? "production" : "development",
  isDevelopment,
  isProduction,
};

// Feature flags
export const features = {
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  enablePWA: import.meta.env.VITE_ENABLE_PWA === "true",
  enableOfflineMode: import.meta.env.VITE_ENABLE_OFFLINE_MODE === "true",
};

// Validate required environment variables
export const validateEnvironment = () => {
  const required = [
    { key: 'VITE_SUPABASE_URL', value: supabaseConfig.url },
    { key: 'VITE_SUPABASE_ANON_KEY', value: supabaseConfig.anonKey },
  ];

  const missing = required.filter(({ value }) => !value);
  
  if (missing.length > 0 && isDevelopment) {
    console.warn('Missing environment variables:', missing.map(({ key }) => key));
  }

  return missing.length === 0;
};

// Initialize environment validation
validateEnvironment();