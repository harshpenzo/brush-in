
-- Create the posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    hashtags TEXT[] DEFAULT '{}',
    readability_score INT DEFAULT 0,
    tone VARCHAR(50) DEFAULT 'professional',
    industry VARCHAR(100) DEFAULT 'general',
    topic VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON public.posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON public.posts(created_at);

-- Set up RLS (Row Level Security)
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Policy for users to select only their own posts
CREATE POLICY select_own_posts ON public.posts
    FOR SELECT
    USING (auth.uid() = user_id);

-- Policy for users to insert their own posts
CREATE POLICY insert_own_posts ON public.posts
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Policy for users to update only their own posts
CREATE POLICY update_own_posts ON public.posts
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Policy for users to delete only their own posts
CREATE POLICY delete_own_posts ON public.posts
    FOR DELETE
    USING (auth.uid() = user_id);

-- Set up updated_at trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_posts_modtime
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- Create view for user posts with engagement statistics (to be populated later)
CREATE OR REPLACE VIEW user_posts_stats AS
    SELECT 
        p.id,
        p.user_id,
        p.content,
        p.hashtags,
        p.readability_score,
        p.topic,
        p.created_at,
        0 AS likes_count,
        0 AS comments_count,
        0 AS shares_count
    FROM posts p;

-- Give public access to this view for authenticated users
GRANT SELECT ON user_posts_stats TO authenticated;

-- Documentation comment
COMMENT ON TABLE public.posts IS 'Stores user LinkedIn posts created through Brushin';
