# Supabase setup

The app uses Supabase Auth and the `public.appointments` table for customer bookings and staff management.

## Connect the app

1. Create a Supabase project.
2. In the Supabase dashboard, enable **Anonymous sign-ins** and the **Email** provider under **Authentication → Sign In / Providers**. Anonymous sign-in is used by the public booking flow; staff use email and password.
3. Copy `.env.example` to `.env.local` in the app folder (the same folder as `package.json`). Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to the project URL and publishable/anon key from **Project Settings → API**.
4. Open **SQL Editor**, run [`schema.sql`](./schema.sql), then start the app with `npm run dev`.

Do not put a Supabase `service_role` or secret key in a `VITE_` variable or in frontend code.

## Create the first staff account

1. In **Authentication → Users**, create a staff user with an email and password.
2. In **SQL Editor**, run the role-assignment statement at the bottom of [`schema.sql`](./schema.sql), replacing `staff@example.com` with that user's email.
3. Sign out and back in after changing the role so Supabase issues a refreshed access token.
4. Open `/admin` on the app and sign in with the staff account.

The admin role is stored in server-managed `app_metadata`, not user-editable profile metadata. Row-level security protects appointment reads, and the status-update database function verifies the admin role before changing a booking.

## MVP scope

The dashboard lists bookings, supports searching/filtering, shows basic booking totals, and lets staff mark a booking pending, confirmed, completed, or cancelled. Customers can still view and cancel their own bookings.

This is an initial MVP, not yet a complete scheduling or clinical-record system: available times are currently static and are not checked against existing bookings, there are no staff schedules or automated reminders, and intake form answers are not stored as clinical records. Do not use client notes or intake forms to collect real health information until the data handling, access controls, retention, and applicable compliance requirements have been reviewed.
