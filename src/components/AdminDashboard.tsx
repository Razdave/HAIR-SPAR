import React, { useEffect, useMemo, useState } from 'react';
import { CalendarDays, Clock3, LogOut, RefreshCw, Search, ShieldCheck, UserRound } from 'lucide-react';
import type { Session } from '@supabase/supabase-js';
import type { AppointmentRecord } from '../types';
import { fetchAdminAppointments, updateAppointmentStatus } from '../lib/appointments';
import { getSupabaseClient } from '../lib/supabase';

const STATUSES: AppointmentRecord['bookingStatus'][] = [
  'pending',
  'confirmed',
  'completed',
  'cancelled',
];

function formatDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function statusLabel(status: AppointmentRecord['bookingStatus']) {
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export function AdminDashboard() {
  const [session, setSession] = useState<Session | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [isLoadingAppointments, setIsLoadingAppointments] = useState(false);
  const [appointmentsError, setAppointmentsError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | AppointmentRecord['bookingStatus']>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    let unsubscribe = () => {};

    try {
      const supabase = getSupabaseClient();
      const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
        if (isMounted) {
          setSession(nextSession);
          setAuthLoading(false);
          setAuthError(null);
        }
      });
      unsubscribe = () => data.subscription.unsubscribe();

      supabase.auth.getSession().then(({ data: sessionData, error }) => {
        if (!isMounted) return;
        if (error) {
          setAuthError(error.message);
        } else {
          setSession(sessionData.session);
        }
        setAuthLoading(false);
      }).catch((error: unknown) => {
        if (!isMounted) return;
        setAuthError(error instanceof Error ? error.message : 'Unable to check your staff session.');
        setAuthLoading(false);
      });
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to connect to Supabase.');
      setAuthLoading(false);
    }

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, []);

  const isAdmin = session?.user.app_metadata.role === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      setAppointments([]);
      return;
    }

    let isMounted = true;
    setIsLoadingAppointments(true);
    setAppointmentsError(null);
    fetchAdminAppointments()
      .then((records) => {
        if (isMounted) setAppointments(records);
      })
      .catch((error: unknown) => {
        if (isMounted) {
          setAppointmentsError(error instanceof Error ? error.message : 'Unable to load appointments.');
        }
      })
      .finally(() => {
        if (isMounted) setIsLoadingAppointments(false);
      });

    return () => {
      isMounted = false;
    };
  }, [isAdmin]);

  const filteredAppointments = useMemo(() => {
    const query = search.trim().toLowerCase();
    return appointments.filter((appointment) => {
      const matchesStatus = statusFilter === 'all' || appointment.bookingStatus === statusFilter;
      const matchesQuery = !query || [
        appointment.clientName,
        appointment.clientEmail,
        appointment.clientPhone,
        appointment.referenceNumber,
        appointment.serviceName,
        appointment.specialistName,
      ].some((value) => value.toLowerCase().includes(query));
      return matchesStatus && matchesQuery;
    });
  }, [appointments, search, statusFilter]);

  const activeAppointments = appointments.filter((appointment) => (
    appointment.bookingStatus === 'pending' || appointment.bookingStatus === 'confirmed'
  ));
  const currentDate = new Date();
  const today = [
    currentDate.getFullYear(),
    String(currentDate.getMonth() + 1).padStart(2, '0'),
    String(currentDate.getDate()).padStart(2, '0'),
  ].join('-');
  const upcomingCount = activeAppointments.filter((appointment) => appointment.date >= today).length;
  const pendingCount = appointments.filter((appointment) => appointment.bookingStatus === 'pending').length;
  const expectedRevenue = appointments
    .filter((appointment) => appointment.bookingStatus !== 'cancelled')
    .reduce((total, appointment) => total + appointment.totalPrice, 0);

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setAuthError(null);

    try {
      const { error } = await getSupabaseClient().auth.signInWithPassword({ email, password });
      if (error) throw error;
      setPassword('');
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Unable to sign in.');
    }
  };

  const handleSignOut = async () => {
    setAuthError(null);
    const { error } = await getSupabaseClient().auth.signOut();
    if (error) setAuthError(error.message);
  };

  const handleStatusChange = async (
    appointment: AppointmentRecord,
    status: AppointmentRecord['bookingStatus']
  ) => {
    if (appointment.bookingStatus === status || updatingId) return;
    setUpdatingId(appointment.id);
    setAppointmentsError(null);

    try {
      await updateAppointmentStatus(appointment.id, status);
      setAppointments((current) => current.map((record) => (
        record.id === appointment.id ? { ...record, bookingStatus: status } : record
      )));
    } catch (error) {
      setAppointmentsError(error instanceof Error ? error.message : 'Unable to update appointment status.');
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] flex items-center justify-center text-sm text-[#57534E]">
        Checking staff access…
      </main>
    );
  }

  if (!session || !isAdmin) {
    return (
      <main className="min-h-screen bg-[#FAF8F5] px-5 py-12 flex items-center justify-center">
        <section className="w-full max-w-md rounded-2xl border border-[#ECE5DC] bg-white p-7 shadow-sm sm:p-9">
          <a href="/" className="text-2xl lowercase tracking-tight text-[#1F1D1B]">aurélle<span className="text-[#4E273E]">.</span></a>
          <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8E3B5C]">Staff portal</p>
          <h1 className="mt-2 text-3xl font-normal tracking-tight text-[#1F1D1B]">
            {session ? 'Staff access required' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-sm leading-6 text-[#78716C]">
            {session
              ? 'This account is not assigned the administrator role.'
              : 'Sign in with your staff account to manage appointments.'}
          </p>

          {authError && (
            <p role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {authError}
            </p>
          )}

          {session ? (
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="mt-7 w-full rounded-md bg-[#1F1D1B] px-4 py-3 text-sm font-medium text-white hover:bg-[#37182A]"
            >
              Sign out
            </button>
          ) : (
            <form onSubmit={(event) => void handleSignIn(event)} className="mt-7 space-y-4">
              <label className="block text-xs font-medium text-[#44403C]">
                Email
                <input
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-[#D6CEC4] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8E3B5C] focus:ring-2 focus:ring-[#8E3B5C]/15"
                />
              </label>
              <label className="block text-xs font-medium text-[#44403C]">
                Password
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-1.5 w-full rounded-md border border-[#D6CEC4] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8E3B5C] focus:ring-2 focus:ring-[#8E3B5C]/15"
                />
              </label>
              <button
                type="submit"
                className="w-full rounded-md bg-[#1F1D1B] px-4 py-3 text-sm font-medium text-white hover:bg-[#37182A]"
              >
                Sign in
              </button>
            </form>
          )}

          <a href="/" className="mt-6 block text-center text-xs text-[#78716C] underline underline-offset-4">
            Return to the booking site
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] text-[#1F1D1B]">
      <header className="border-b border-[#ECE5DC] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div>
            <a href="/" className="text-xl lowercase tracking-tight">aurélle<span className="text-[#4E273E]">.</span></a>
            <span className="ml-3 border-l border-[#ECE5DC] pl-3 text-[10px] uppercase tracking-widest text-[#78716C]">
              Staff dashboard
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-[#78716C] sm:inline">{session.user.email}</span>
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="inline-flex items-center gap-2 rounded-md border border-[#ECE5DC] px-3 py-2 text-xs hover:bg-[#FAF8F5]"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8E3B5C]">Operations</p>
            <h1 className="mt-2 text-3xl font-normal tracking-tight sm:text-4xl">Appointments</h1>
            <p className="mt-2 text-sm text-[#78716C]">Review bookings and keep the day running smoothly.</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setIsLoadingAppointments(true);
              setAppointmentsError(null);
              fetchAdminAppointments()
                .then(setAppointments)
                .catch((error: unknown) => setAppointmentsError(
                  error instanceof Error ? error.message : 'Unable to refresh appointments.'
                ))
                .finally(() => setIsLoadingAppointments(false));
            }}
            disabled={isLoadingAppointments}
            className="inline-flex items-center gap-2 rounded-md border border-[#D6CEC4] bg-white px-3 py-2 text-xs font-medium hover:bg-[#FAF8F5] disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoadingAppointments ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: 'All bookings', value: appointments.length, icon: CalendarDays },
            { label: 'Upcoming', value: upcomingCount, icon: Clock3 },
            { label: 'Needs confirmation', value: pendingCount, icon: ShieldCheck },
            { label: 'Booked value', value: `$${expectedRevenue.toLocaleString()}`, icon: UserRound },
          ].map(({ label, value, icon: Icon }) => (
            <section key={label} className="rounded-xl border border-[#ECE5DC] bg-white p-4">
              <div className="flex items-center justify-between text-xs text-[#78716C]">
                {label}
                <Icon className="h-4 w-4 text-[#8E3B5C]" />
              </div>
              <p className="mt-3 text-2xl font-medium tracking-tight">{value}</p>
            </section>
          ))}
        </div>

        {appointmentsError && (
          <p role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
            {appointmentsError}
          </p>
        )}

        <section className="mt-7">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row">
            <label className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A8A29E]" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search client, service, email, or reference"
                className="w-full rounded-md border border-[#D6CEC4] bg-white py-2.5 pl-9 pr-3 text-sm outline-none focus:border-[#8E3B5C]"
              />
            </label>
            <select
              aria-label="Filter by appointment status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
              className="rounded-md border border-[#D6CEC4] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#8E3B5C]"
            >
              <option value="all">All statuses</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>{statusLabel(status)}</option>
              ))}
            </select>
          </div>

          {isLoadingAppointments && appointments.length === 0 ? (
            <p className="rounded-xl border border-[#ECE5DC] bg-white px-5 py-12 text-center text-sm text-[#78716C]">
              Loading appointments…
            </p>
          ) : filteredAppointments.length === 0 ? (
            <p className="rounded-xl border border-[#ECE5DC] bg-white px-5 py-12 text-center text-sm text-[#78716C]">
              No appointments match your filters.
            </p>
          ) : (
            <div className="space-y-3">
              {filteredAppointments.map((appointment) => (
                <article key={appointment.id} className="rounded-xl border border-[#ECE5DC] bg-white p-4 sm:p-5">
                  <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="font-medium">{appointment.clientName}</h2>
                        <span className="rounded bg-[#FAF0EA] px-2 py-1 font-mono text-[10px] text-[#4E273E]">
                          {appointment.referenceNumber}
                        </span>
                        <span className="text-xs text-[#78716C]">{appointment.serviceCategory}</span>
                      </div>
                      <p className="mt-1 text-sm text-[#44403C]">{appointment.serviceName}</p>
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#78716C]">
                        <span>{formatDate(appointment.date)} · {appointment.time}</span>
                        <span>{appointment.specialistName}</span>
                        <a className="hover:text-[#4E273E]" href={`mailto:${appointment.clientEmail}`}>
                          {appointment.clientEmail}
                        </a>
                        <a className="hover:text-[#4E273E]" href={`tel:${appointment.clientPhone}`}>
                          {appointment.clientPhone}
                        </a>
                      </div>
                      {appointment.clientNotes && (
                        <p className="mt-2 text-xs text-[#78716C]">Note: {appointment.clientNotes}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-between gap-4 border-t border-[#ECE5DC] pt-3 lg:border-0 lg:pt-0">
                      <div className="text-right">
                        <p className="font-medium">${appointment.totalPrice}</p>
                        <p className="text-[11px] text-[#78716C]">{appointment.totalDuration} min</p>
                      </div>
                      <select
                        aria-label={`Status for ${appointment.referenceNumber}`}
                        value={appointment.bookingStatus}
                        disabled={updatingId === appointment.id}
                        onChange={(event) => void handleStatusChange(
                          appointment,
                          event.target.value as AppointmentRecord['bookingStatus']
                        )}
                        className="rounded-md border border-[#D6CEC4] bg-white px-2.5 py-2 text-xs font-medium outline-none focus:border-[#8E3B5C] disabled:opacity-50"
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>{statusLabel(status)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
