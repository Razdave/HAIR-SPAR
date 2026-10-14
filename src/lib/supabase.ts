import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { AddOnOption, AppointmentRecord } from '../types';

export type AppointmentRow = {
  id: string;
  owner_id: string;
  reference_number: string;
  service_id: string;
  service_name: string;
  service_category: string;
  specialist_id: string;
  specialist_name: string;
  date: string;
  time: string;
  client_name: string;
  client_email: string;
  client_phone: string;
  client_notes: string | null;
  add_ons: Array<Pick<AddOnOption, 'id' | 'name' | 'duration' | 'price' | 'category'>>;
  total_price: number;
  total_duration: number;
  booking_status: AppointmentRecord['bookingStatus'];
  intake_status: AppointmentRecord['intakeStatus'];
  created_at: string;
};

type Database = {
  public: {
    Tables: {
      appointments: {
        Row: AppointmentRow;
        Insert: Omit<AppointmentRow, 'booking_status' | 'intake_status'>;
        Update: Partial<AppointmentRow>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: {
      admin_update_appointment_status: {
        Args: {
          p_appointment_id: string;
          p_booking_status: AppointmentRecord['bookingStatus'];
        };
        Returns: undefined;
      };
    };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};

let client: SupabaseClient<Database> | undefined;
let userIdPromise: Promise<string> | undefined;

export function getSupabaseClient() {
  if (client) return client;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to the project root .env.local file.'
    );
  }

  client = createClient<Database>(url, anonKey);
  return client;
}

export function getSupabaseUserId(): Promise<string> {
  if (!userIdPromise) {
    userIdPromise = (async () => {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.auth.getSession();

      if (error) throw error;
      if (data.session) return data.session.user.id;

      const { data: signInData, error: signInError } = await supabase.auth.signInAnonymously();

      if (signInError) throw signInError;
      if (!signInData.user) {
        throw new Error('Supabase anonymous sign-in did not return a user.');
      }

      return signInData.user.id;
    })().catch((error: unknown) => {
      userIdPromise = undefined;
      throw error;
    });
  }

  return userIdPromise;
}
