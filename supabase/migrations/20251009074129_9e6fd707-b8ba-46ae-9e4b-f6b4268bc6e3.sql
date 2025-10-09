-- Add performance indexes for posts table
CREATE INDEX IF NOT EXISTS idx_posts_user_created ON public.posts(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_topic ON public.posts USING gin(to_tsvector('english', topic));
CREATE INDEX IF NOT EXISTS idx_user_usage_lookup ON public.user_usage(user_id);