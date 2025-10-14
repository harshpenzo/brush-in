-- Fix 1: Add INSERT policy to profiles table to allow user registration
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

-- Fix 3: Create rate limiting table for edge function abuse prevention
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(identifier, endpoint)
);

-- Enable RLS on rate_limits table
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Create policy for edge functions to manage rate limits
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
USING (true)
WITH CHECK (true);

-- Function to check and update rate limit
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  _identifier TEXT,
  _endpoint TEXT,
  _max_requests INTEGER,
  _window_minutes INTEGER
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_count INTEGER;
  window_start TIMESTAMPTZ;
BEGIN
  -- Get current rate limit record
  SELECT request_count, rate_limits.window_start
  INTO current_count, window_start
  FROM public.rate_limits
  WHERE identifier = _identifier AND endpoint = _endpoint;
  
  -- If no record exists, create one
  IF current_count IS NULL THEN
    INSERT INTO public.rate_limits (identifier, endpoint, request_count, window_start)
    VALUES (_identifier, _endpoint, 1, now());
    RETURN TRUE;
  END IF;
  
  -- Check if window has expired
  IF window_start < (now() - (_window_minutes || ' minutes')::INTERVAL) THEN
    -- Reset the window
    UPDATE public.rate_limits
    SET request_count = 1, window_start = now()
    WHERE identifier = _identifier AND endpoint = _endpoint;
    RETURN TRUE;
  END IF;
  
  -- Check if limit exceeded
  IF current_count >= _max_requests THEN
    RETURN FALSE;
  END IF;
  
  -- Increment counter
  UPDATE public.rate_limits
  SET request_count = request_count + 1
  WHERE identifier = _identifier AND endpoint = _endpoint;
  
  RETURN TRUE;
END;
$$;