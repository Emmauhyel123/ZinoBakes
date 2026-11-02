/* ---------------------------------------------------------------
   CONFIG: the only place you put keys.
   Supabase: Project Settings > API
   Use the PUBLISHABLE (anon) key only. Never put a secret/service key here.
---------------------------------------------------------------- */
window.SITE_CONFIG = {
  SUPABASE_URL: 'https://vqyyhzjwrjyfidqspftb.supabase.co',
  SUPABASE_KEY: 'sb_publishable_e08VQGAP_ErOMPTHakYeiw_GbDAX9bP',
  TABLE: 'inquiries',                 // table created by supabase.sql

  // Your WhatsApp number in international format, digits only, no + or spaces.
  // Example: 2348012345678. Leave as '' to turn the WhatsApp step off.
  WHATSAPP_NUMBER: '',
};
