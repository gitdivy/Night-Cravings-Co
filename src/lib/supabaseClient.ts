import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ldfkqzutmhzkvnjkkjjm.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_sDEu3Xzih5NvXFPASjhLhg_NHE2K-d5';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
