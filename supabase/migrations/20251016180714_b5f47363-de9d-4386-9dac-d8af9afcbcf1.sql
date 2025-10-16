-- 1. Create enum for user types
CREATE TYPE public.user_type AS ENUM ('client', 'lawyer');

-- 2. Create user_roles table to store user types server-side
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  user_type public.user_type NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id)
);

-- 3. Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for user_roles
CREATE POLICY "Users can view own user type"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own user type"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 5. Create security definer function to get user type
CREATE OR REPLACE FUNCTION public.get_user_type(_user_id UUID)
RETURNS public.user_type
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT user_type 
  FROM public.user_roles 
  WHERE user_id = _user_id
  LIMIT 1;
$$;

-- 6. Update lawyers table RLS policy to restrict viewing to own profile only
DROP POLICY IF EXISTS "Allow authenticated users to view lawyers" ON public.lawyers;

CREATE POLICY "Users can view own lawyer profile"
  ON public.lawyers
  FOR SELECT
  USING (auth.uid() = user_id);

-- 7. Create trigger function to auto-populate user_roles from signup metadata
CREATE OR REPLACE FUNCTION public.handle_new_user_role()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, user_type)
  VALUES (
    NEW.id, 
    COALESCE(
      (NEW.raw_user_meta_data->>'user_type')::public.user_type,
      'client'::public.user_type
    )
  )
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 8. Create trigger to automatically populate user_roles on signup
CREATE TRIGGER on_auth_user_created_role
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_role();