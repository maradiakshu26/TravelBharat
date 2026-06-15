
-- 1. Replace overly-permissive enquiries INSERT policy with explicit length-bounded check
DROP POLICY IF EXISTS "Anyone can submit enquiries" ON public.enquiries;

CREATE POLICY "Anyone can submit enquiries"
ON public.enquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(full_name) BETWEEN 1 AND 200
  AND char_length(email) BETWEEN 3 AND 255
  AND char_length(region) BETWEEN 1 AND 100
  AND (phone IS NULL OR char_length(phone) <= 30)
  AND (message IS NULL OR char_length(message) <= 2000)
);

-- 2. Server-side validation trigger (format + allowlist) — defense in depth
CREATE OR REPLACE FUNCTION public.validate_enquiry()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.full_name := btrim(NEW.full_name);
  NEW.email := lower(btrim(NEW.email));
  NEW.region := btrim(NEW.region);
  IF NEW.phone IS NOT NULL THEN NEW.phone := btrim(NEW.phone); END IF;
  IF NEW.message IS NOT NULL THEN NEW.message := btrim(NEW.message); END IF;

  IF NEW.full_name = '' OR char_length(NEW.full_name) > 200 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;
  IF NEW.email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR char_length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;
  IF NEW.region NOT IN (
    'Royal Rajasthan', 'Himalayan Peaks', 'Southern Sanctuaries',
    'Cultural Heartland', 'Wildlife Trails'
  ) THEN
    RAISE EXCEPTION 'Invalid region';
  END IF;
  IF NEW.phone IS NOT NULL AND NEW.phone <> '' AND NEW.phone !~ '^[+\d\s\-()]{1,30}$' THEN
    RAISE EXCEPTION 'Invalid phone';
  END IF;
  IF NEW.message IS NOT NULL AND char_length(NEW.message) > 2000 THEN
    RAISE EXCEPTION 'Message too long';
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS validate_enquiry_trigger ON public.enquiries;
CREATE TRIGGER validate_enquiry_trigger
BEFORE INSERT OR UPDATE ON public.enquiries
FOR EACH ROW EXECUTE FUNCTION public.validate_enquiry();

-- 3. Explicit RESTRICTIVE policy on user_roles: only admins may write
CREATE POLICY "Only admins may modify roles"
ON public.user_roles
AS RESTRICTIVE
FOR ALL
TO anon, authenticated
USING (public.has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));

-- 4. Restrict EXECUTE on has_role — only authenticated callers need it (admin policies are auth-only)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
