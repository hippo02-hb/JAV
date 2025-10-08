import { createClient } from '@supabase/supabase-js';

// Use import.meta.env for Vite projects
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Add checks to ensure the variables are not undefined
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be defined in the .env file and prefixed with VITE_");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
