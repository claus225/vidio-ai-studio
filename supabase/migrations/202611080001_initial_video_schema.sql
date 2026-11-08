-- Private user-owned video jobs and storage buckets.
-- Apply with: supabase db push
create extension if not exists pgcrypto;

create table if not exists public.video_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prompt text not null default '',
  mode text not null check (mode in ('text', 'image')),
  duration_seconds integer not null check (duration_seconds in (5, 10)),
  aspect_ratio text not null check (aspect_ratio in ('16:9', '9:16', '1:1')),
  quality text not null default 'standard' check (quality in ('standard', 'high')),
  status text not null default 'queued' check (status in ('queued', 'processing', 'succeeded', 'failed')),
  input_image_path text,
  output_video_path text,
  provider_job_id text,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint video_jobs_prompt_length_check check (char_length(prompt) <= 1200),
  constraint video_jobs_mode_input_check check (
    (mode = 'text' and length(trim(prompt)) > 0 and input_image_path is null)
    or
    (mode = 'image' and input_image_path is not null
      and split_part(input_image_path, '/', 1) = user_id::text)
  )
);

create index if not exists video_jobs_user_created_idx
  on public.video_jobs (user_id, created_at desc);

alter table public.video_jobs enable row level security;

drop policy if exists "Users can read their own video jobs" on public.video_jobs;
create policy "Users can read their own video jobs"
  on public.video_jobs for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can create their own video jobs" on public.video_jobs;
create policy "Users can create their own video jobs"
  on public.video_jobs for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and status = 'queued'
    and output_video_path is null
    and provider_job_id is null
    and error_message is null
  );

-- Status changes and provider metadata must be performed by trusted server-side code,
-- not directly by the browser. The service role bypasses RLS and must never be exposed.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('video-inputs', 'video-inputs', false, 10485760, array['image/jpeg', 'image/png', 'image/webp']),
  ('video-outputs', 'video-outputs', false, 104857600, array['video/mp4', 'video/webm'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Users can upload their own input images" on storage.objects;
create policy "Users can upload their own input images"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'video-inputs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can read their own input images" on storage.objects;
create policy "Users can read their own input images"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'video-inputs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can delete their own input images" on storage.objects;
create policy "Users can delete their own input images"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'video-inputs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "Users can read their own generated videos" on storage.objects;
create policy "Users can read their own generated videos"
  on storage.objects for select
  to authenticated
  using (
    bucket_id = 'video-outputs'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
