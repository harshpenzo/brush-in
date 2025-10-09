// Re-export the centralized Supabase client to avoid multiple instances
import { supabase } from '@/integrations/supabase/client';
export { supabase };
import type { Database } from '@/integrations/supabase/types';

// Type definition for our database schema
export type Post = Database['public']['Tables']['posts']['Row'];

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

export async function savePost(post: Omit<Post, 'id' | 'created_at' | 'updated_at'>) {
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
