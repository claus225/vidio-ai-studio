# Supabase setup

This repository now includes the first database and private-storage foundation.

## 1. Create or select a Supabase project

In the Supabase dashboard, create a project and keep its database credentials private.

## 2. Configure local environment

Copy `.env.example` to `.env.local` and fill in only:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

The anon key is intended for browser use when Row Level Security is enabled. Never put a `service_role` key or a video-provider API key in a variable beginning with `VITE_`, and never commit real secrets.

## 3. Apply the database migration

Install the Supabase CLI, log in, link this repository to your own project, then run:

```sh
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

The migration creates:

- `public.video_jobs`, with per-user row-level security;
- private `video-inputs` and `video-outputs` storage buckets;
- storage policies that keep each user's files in their own user-id folder.

Input image uploads must use a path beginning with the authenticated user's UUID, for example `USER_UUID/source.webp`.

## Current limitation

This migration does **not** generate videos. No video provider is connected yet, and the frontend does not yet use Supabase authentication or storage. The next implementation stage is to connect the UI to Supabase Auth, then add an authenticated server-side generation function and a provider adapter. Provider secrets must stay in Supabase Edge Function secrets.

Do not mark a job as successful or show a download until a real provider result has been received and the output file has been stored.
