alter table whitepaper_downloads
add column if not exists download_token uuid not null default gen_random_uuid();

create unique index if not exists whitepaper_downloads_download_token_idx
on whitepaper_downloads (download_token);
