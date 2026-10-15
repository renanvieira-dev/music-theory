// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jrausfgrwiwmstxekeaw.supabase.co';

// Fallback com formato JWT válido para passar a validação do build estático
const dummyAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.dummy-key-for-static-build-validation';

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || dummyAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);