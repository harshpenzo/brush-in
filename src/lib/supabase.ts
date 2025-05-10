
import { createClient } from '@supabase/supabase-js';

// Supabase client setup
// Use default values for development when environment variables are not available
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-supabase-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Type definition for our database schema
export type Post = {
  id?: string;
  user_id: string;
  content: string;
  hashtags: string[];
  created_at?: string;
  readability_score?: number;
  tone: string;
  industry: string;
  topic: string;
};

// Check if the required Supabase credentials are provided
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase credentials missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file. ' +
    'Using placeholder values for now, which will cause authentication and database operations to fail.'
  );
}

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper functions for post operations
export async function fetchUserPosts(userId: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
  
  return data || [];
}

export async function savePost(post: Post) {
  const { data, error } = await supabase
    .from('posts')
    .insert([post])
    .select();
  
  if (error) {
    console.error('Error saving post:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function updatePost(id: string, updates: Partial<Post>) {
  const { data, error } = await supabase
    .from('posts')
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) {
    console.error('Error updating post:', error);
    throw error;
  }
  
  return data?.[0];
}

export async function deletePost(id: string) {
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
  
  return true;
}
