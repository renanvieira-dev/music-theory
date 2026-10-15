// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jrausfgrwiwmstxekeaw.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_a9bCn_eGQP_HHVc1msh4PA_LJ8UPdjj';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);