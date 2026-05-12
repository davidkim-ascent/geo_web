create table if not exists contact_submissions (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  company     text not null,
  role        text not null,
  name        text not null,
  phone       text not null,
  email       text not null,
  industry    text not null,
  website     text,
  challenge   text not null
);

alter table contact_submissions enable row level security;

create policy "insert only" on contact_submissions
  for insert to anon with check (true);
