/* ---------------------------------------------------------------
   CONFIG: the only place you put keys.
   Supabase: Project Settings > API
   Use the PUBLISHABLE (anon) key only. Never put a secret/service key here.
---------------------------------------------------------------- */
window.SITE_CONFIG = {
  SUPABASE_URL: 'PASTE_YOUR_SUPABASE_PROJECT_URL_HERE',   // e.g. https://abcd1234.supabase.co
  SUPABASE_KEY: 'PASTE_YOUR_PUBLISHABLE_ANON_KEY_HERE',
  TABLE: 'inquiries',                                     // table created by supabase.sql
};
