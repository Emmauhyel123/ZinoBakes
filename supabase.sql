-- Run once in Supabase: SQL Editor > New query
create table if not exists inquiries (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  phone text,
  type text,
  needed_by date,
  message text not null,
  status text not null default 'new'   -- you can change this to 'replied' / 'done' in the Table Editor
);

-- If the table already existed from an earlier version, these add the new columns safely:
alter table inquiries add column if not exists phone text;
alter table inquiries add column if not exists status text not null default 'new';

alter table inquiries enable row level security;

-- Visitors can only ADD inquiries. They cannot read, edit or delete any.
drop policy if exists "anyone can submit an inquiry" on inquiries;
create policy "anyone can submit an inquiry"
  on inquiries for insert to anon
  with check (true);

-- Reading is locked to your admin login: see the ADMIN ACCESS block at the bottom.

-- ============ ADMIN ACCESS (for /admin) ============
-- Only the logged-in owner can read, update or delete enquiries.
-- 1) Supabase > Authentication > Users > Add user (your email + password).
-- 2) Supabase > Authentication > Sign In / Providers > turn OFF "Allow new users to sign up".
-- 3) Replace the email below with YOUR admin email, then run this block.
drop policy if exists "owner can read inquiries" on inquiries;
drop policy if exists "owner can update inquiries" on inquiries;
drop policy if exists "owner can delete inquiries" on inquiries;

create policy "owner can read inquiries" on inquiries
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'oceanmediaglobal@gmail.com');

create policy "owner can update inquiries" on inquiries
  for update to authenticated
  using ((auth.jwt() ->> 'email') = 'oceanmediaglobal@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'oceanmediaglobal@gmail.com');

create policy "owner can delete inquiries" on inquiries
  for delete to authenticated
  using ((auth.jwt() ->> 'email') = 'oceanmediaglobal@gmail.com');
