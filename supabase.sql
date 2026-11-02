-- Run once in Supabase: SQL Editor > New query
create table if not exists inquiries (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  type text,
  needed_by date,
  message text not null
);

alter table inquiries enable row level security;

-- Visitors can only ADD inquiries. They cannot read, edit or delete any.
create policy "anyone can submit an inquiry"
  on inquiries for insert to anon
  with check (true);
