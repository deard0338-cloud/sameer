import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim() || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim() || '';

/**
 * Validates whether real Supabase backend credentials are configured.
 * As per Step 5 & 36: We do not fake backend connectivity.
 */
export const isBackendConfigured = (): boolean => {
  if (!supabaseUrl || !supabaseAnonKey) return false;
  if (!supabaseUrl.startsWith('http')) return false;
  if (supabaseUrl.includes('your-project.supabase.co')) return false;
  return true;
};

let clientInstance: SupabaseClient | null = null;

if (isBackendConfigured()) {
  try {
    clientInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    });
  } catch {
    clientInstance = null;
  }
}

export const supabase = clientInstance;

/**
 * Retrieves the active Supabase client instance or null if not yet configured.
 */
export const getSupabaseClient = (): SupabaseClient | null => {
  return clientInstance;
};
