alter table contact_submissions
  add column if not exists inquiry_type text;
