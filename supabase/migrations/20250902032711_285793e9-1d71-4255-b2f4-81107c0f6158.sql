-- Fix security warnings by setting search_path for functions
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, avatar_url)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'avatar_url');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.initialize_user_usage()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_usage (user_id, post_count, monthly_limit)
  VALUES (NEW.id, 0, 50);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;