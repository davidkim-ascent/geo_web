insert into storage.buckets (id, name, public)
values ('whitepaper-assets', 'whitepaper-assets', false)
on conflict (id) do update
set public = excluded.public;
