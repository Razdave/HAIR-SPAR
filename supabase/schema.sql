-- Enable anonymous sign-ins in Supabase Auth settings before using the public booking flow.
create table if not exists public.appointments (
  id text primary key,
  owner_id uuid not null references auth.users (id) on delete cascade,
  reference_number text not null,
  service_id text not null,
  service_name text not null,
  service_category text not null,
  specialist_id text not null,
  specialist_name text not null,
  date date not null,
  time text not null,
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  client_notes text,
  add_ons jsonb not null default '[]'::jsonb,
  total_price numeric not null,
  total_duration integer not null,
  booking_status text not null default 'pending'
    check (booking_status in ('pending', 'confirmed', 'cancelled', 'completed')),
  intake_status text not null default 'pending'
    check (intake_status in ('pending', 'completed')),
  created_at timestamptz not null
);

alter table public.appointments
  add column if not exists booking_status text not null default 'pending';

alter table public.appointments
  drop constraint if exists appointments_booking_status_check;
alter table public.appointments
  add constraint appointments_booking_status_check
  check (booking_status in ('pending', 'confirmed', 'cancelled', 'completed'));

create index if not exists appointments_owner_created_at_idx
  on public.appointments (owner_id, created_at desc);

create index if not exists appointments_date_time_idx
  on public.appointments (date, time);

alter table public.appointments enable row level security;

revoke all on public.appointments from anon, authenticated;
grant select, delete on public.appointments to authenticated;
grant insert (
  id,
  owner_id,
  reference_number,
  service_id,
  service_name,
  service_category,
  specialist_id,
  specialist_name,
  date,
  time,
  client_name,
  client_email,
  client_phone,
  client_notes,
  add_ons,
  total_price,
  total_duration,
  created_at
) on public.appointments to authenticated;
grant update (intake_status) on public.appointments to authenticated;

drop policy if exists "Visitors can read their own appointments" on public.appointments;
create policy "Visitors and staff can read appointments"
  on public.appointments for select to authenticated
  using (
    (select auth.uid()) = owner_id
    or (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "Visitors can create their own appointments" on public.appointments;
create policy "Visitors can create their own appointments"
  on public.appointments for insert to authenticated
  with check ((select auth.uid()) = owner_id);

drop policy if exists "Visitors can update their own appointments" on public.appointments;
create policy "Visitors can update their own intake status"
  on public.appointments for update to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

drop policy if exists "Visitors can delete their own appointments" on public.appointments;
create policy "Visitors can delete their own appointments"
  on public.appointments for delete to authenticated
  using ((select auth.uid()) = owner_id);

create or replace function public.admin_update_appointment_status(
  p_appointment_id text,
  p_booking_status text
)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if (auth.jwt() -> 'app_metadata' ->> 'role') is distinct from 'admin' then
    raise exception 'Admin access required.'
      using errcode = '42501';
  end if;

  if p_booking_status is null
    or p_booking_status not in ('pending', 'confirmed', 'cancelled', 'completed') then
    raise exception 'Invalid appointment status.'
      using errcode = '22023';
  end if;

  update public.appointments
  set booking_status = p_booking_status
  where id = p_appointment_id;

  if not found then
    raise exception 'Appointment not found.'
      using errcode = 'P0002';
  end if;
end;
$$;

revoke all on function public.admin_update_appointment_status(text, text) from public, anon;
grant execute on function public.admin_update_appointment_status(text, text) to authenticated;

-- After creating a staff account in Supabase Auth, grant its server-managed admin role:
-- update auth.users
-- set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
-- where email = 'staff@example.com';
