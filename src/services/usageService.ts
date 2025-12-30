import { supabase } from "@/integrations/supabase/client";

export interface UserUsage {
  id: string;
  user_id: string;
  post_count: number;
  last_post_date: string | null;
  monthly_limit: number;
  created_at: string;
  updated_at: string;
}

/**
 * Get user's current usage statistics
 */
export const getUserUsage = async (userId: string): Promise<UserUsage | null> => {
  try {
    const { data, error } = await supabase
      .from('user_usage')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching user usage:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getUserUsage:', error);
    return null;
  }
};

/**
 * Check if user can create a new post (within limits)
 */
export const canCreatePost = async (userId: string): Promise<{ canCreate: boolean; usage: UserUsage | null }> => {
  try {
    const usage = await getUserUsage(userId);
    
    if (!usage) {
      // Initialize usage for new user
      const { data: newUsage, error } = await supabase
        .from('user_usage')
        .insert({
          user_id: userId,
          post_count: 0,
          monthly_limit: 50
        })
        .select()
        .single();

      if (error) {
        console.error('Error initializing user usage:', error);
        return { canCreate: false, usage: null };
      }

      return { canCreate: true, usage: newUsage };
    }

    const canCreate = usage.post_count < usage.monthly_limit;
    return { canCreate, usage };
  } catch (error) {
    console.error('Error in canCreatePost:', error);
    return { canCreate: false, usage: null };
  }
};

/**
 * Increment user's post count after successful post creation
 * Note: The function now uses auth.uid() internally for security - no parameter needed
 */
export const incrementPostCount = async (): Promise<boolean> => {
  try {
    // Function uses auth.uid() internally - no user_uuid parameter needed
    const { data, error } = await supabase.rpc('increment_post_count');

    if (error) {
      console.error('Error incrementing post count:', error);
      return false;
    }

    return data === true;
  } catch (error) {
    console.error('Error in incrementPostCount:', error);
    return false;
  }
};

/**
 * Get usage statistics for display
 */
export const getUsageStats = async (userId: string) => {
  const usage = await getUserUsage(userId);
  
  if (!usage) {
    return {
      postsUsed: 0,
      postsRemaining: 50,
      totalLimit: 50,
      usagePercentage: 0
    };
  }

  const postsRemaining = Math.max(0, usage.monthly_limit - usage.post_count);
  const usagePercentage = Math.round((usage.post_count / usage.monthly_limit) * 100);

  return {
    postsUsed: usage.post_count,
    postsRemaining,
    totalLimit: usage.monthly_limit,
    usagePercentage
  };
};