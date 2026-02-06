-- Remove the overly permissive rate_limits policy
-- The check_rate_limit function uses SECURITY DEFINER so no direct table access is needed
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.rate_limits;