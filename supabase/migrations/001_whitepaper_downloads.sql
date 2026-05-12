create table if not exists whitepaper_downloads (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  company     text not null,
  role        text not null,
  name        text not null,
  phone       text not null,
  email       text not null,
  industry    text not null,
  website     text,
  no_website  boolean not null default false,
  challenge   text not null
);

alter table whitepaper_downloads enable row level security;

-- anon 키로 INSERT만 허용 (읽기 불가)
create policy "insert only" on whitepaper_downloads
  for insert to anon with check (true);
