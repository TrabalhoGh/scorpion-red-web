// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://hxpwiocvdfiqoqqfpsmw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4cHdpb2N2ZGZpcW9xcWZwc213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyODkyMjksImV4cCI6MjA2MTg2NTIyOX0.i7UqvuF44tdqdo3Ok1GJVk_gbK09JDC7AC2CH5nIiEM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);