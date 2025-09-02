-- Create usage tracking table
CREATE TABLE public.user_usage (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  post_count INTEGER NOT NULL DEFAULT 0,
  last_post_date TIMESTAMP WITH TIME ZONE,
  monthly_limit INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_usage ENABLE ROW LEVEL SECURITY;

-- Create policies for user_usage
CREATE POLICY "Users can view their own usage" 
ON public.user_usage 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own usage" 
ON public.user_usage 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage" 
ON public.user_usage 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create function to initialize user usage
CREATE OR REPLACE FUNCTION public.initialize_user_usage()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_usage (user_id, post_count, monthly_limit)
  VALUES (NEW.id, 0, 50);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to initialize usage when user profile is created
CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.initialize_user_usage();

-- Create function to increment post count
CREATE OR REPLACE FUNCTION public.increment_post_count(user_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
  current_count INTEGER;
  monthly_limit INTEGER;
BEGIN
  -- Get current usage
  SELECT post_count, monthly_limit 
  INTO current_count, monthly_limit
  FROM public.user_usage 
  WHERE user_id = user_uuid;
  
  -- Check if user exists in usage table
  IF current_count IS NULL THEN
    INSERT INTO public.user_usage (user_id, post_count, last_post_date)
    VALUES (user_uuid, 1, now());
    RETURN TRUE;
  END IF;
  
  -- Check if limit exceeded
  IF current_count >= monthly_limit THEN
    RETURN FALSE;
  END IF;
  
  -- Increment count
  UPDATE public.user_usage 
  SET post_count = post_count + 1,
      last_post_date = now(),
      updated_at = now()
  WHERE user_id = user_uuid;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;