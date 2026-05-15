# 🚀 Supabase Master Setup Guide

Run these SQL commands in your Supabase **SQL Editor** to perfectly configure your portfolio database and storage.

---

## 1. Core Tables Creation

```sql
-- 1. Projects Table
create table projects (
  id bigint primary key generated always as identity,
  title text not null,
  description text,
  image text,
  tags text[],
  github text,
  live text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Blog Posts Table
create table posts (
  id bigint primary key generated always as identity,
  title text not null,
  excerpt text,
  content text,
  date text,
  author text default 'Mostafa Ahmed',
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Settings Table
create table settings (
  id bigint primary key generated always as identity,
  site_title text,
  site_description text,
  email text,
  github_url text,
  linkedin_url text,
  whatsapp text,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Admin Credentials Table
create table admins (
  id bigint primary key generated always as identity,
  username text unique not null,
  password_hash text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
```

---

## 2. Security & RLS (Row Level Security)

```sql
-- Disable RLS for internal management tables to allow admin access via custom login
alter table projects disable row level security;
alter table posts disable row level security;
alter table settings disable row level security;
alter table admins disable row level security;

-- Storage Policies for "images" bucket
-- Note: Create the bucket named "images" first in the Storage tab.
CREATE POLICY "Allow public upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'images');
CREATE POLICY "Allow public select" ON storage.objects FOR SELECT USING (bucket_id = 'images');
CREATE POLICY "Allow public update" ON storage.objects FOR UPDATE USING (bucket_id = 'images');
CREATE POLICY "Allow public delete" ON storage.objects FOR DELETE USING (bucket_id = 'images');
```

---

## 3. Initial Data Setup

```sql
-- Add Default Admin (User: admin | Pass: admin123)
-- The hash represents 'admin123' using Bcrypt
insert into admins (username, password_hash) 
values ('admin', '$2a$10$6mR596C6E.XmS2x9y6kE9OpxC7YyR9Q2f7k5v/Gv9Q.7wZ/y.6YV6');

-- Add Default Site Settings
insert into settings (site_title, site_description, email) 
values ('Mostafa Ahmed | Portfolio', 'Software Engineer', 'your-email@example.com');
```

---

## 4. Storage Bucket Instructions
1. Go to **Storage** in Supabase Dashboard.
2. Click **New Bucket**.
3. Name it **`images`**.
4. Set it to **Public**.
5. Save.

---

### ✅ Everything is ready!
Your dashboard is now fully synced with these tables and policies.
