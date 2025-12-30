-- Fix: Remove parameter and use auth.uid() directly to prevent unauthorized quota manipulation
-- This is the most secure approach as it eliminates the attack vector entirely

CREATE OR REPLACE FUNCTION public.increment_post_count()
RETURNS BOOLEAN AS $$
DECLARE
  current_user_id UUID;
  current_count INTEGER;
  user_monthly_limit INTEGER;
BEGIN
  -- Get authenticated user ID directly - cannot be spoofed
  current_user_id := auth.uid();
  
  -- Require authentication
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Must be authenticated to increment post count';
  END IF;
  
  -- Get current usage for the authenticated user only
  SELECT post_count, monthly_limit 
  INTO current_count, user_monthly_limit
  FROM public.user_usage 
  WHERE user_id = current_user_id;
  
  -- Check if user exists in usage table, if not create entry
  IF current_count IS NULL THEN
    INSERT INTO public.user_usage (user_id, post_count, last_post_date)
    VALUES (current_user_id, 1, now());
    RETURN TRUE;
  END IF;
  
  -- Check if limit exceeded
  IF current_count >= user_monthly_limit THEN
    RETURN FALSE;
  END IF;
  
  -- Increment count for authenticated user only
  UPDATE public.user_usage 
  SET post_count = post_count + 1,
      last_post_date = now(),
      updated_at = now()
  WHERE user_id = current_user_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;