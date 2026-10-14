import type { AppointmentRecord } from '../types';
import { getSupabaseClient, getSupabaseUserId, type AppointmentRow } from './supabase';

function toAppointmentRecord(row: AppointmentRow): AppointmentRecord {
  return {
    id: row.id,
    referenceNumber: row.reference_number,
    serviceId: row.service_id,
    serviceName: row.service_name,
    serviceCategory: row.service_category,
    specialistId: row.specialist_id,
    specialistName: row.specialist_name,
    date: row.date,
    time: row.time,
    clientName: row.client_name,
    clientEmail: row.client_email,
    clientPhone: row.client_phone,
    clientNotes: row.client_notes ?? undefined,
    addOns: row.add_ons,
    totalPrice: row.total_price,
    totalDuration: row.total_duration,
    bookingStatus: row.booking_status,
    intakeStatus: row.intake_status,
    createdAt: row.created_at,
  };
}

function toAppointmentRow(appointment: AppointmentRecord, ownerId: string) {
  return {
    id: appointment.id,
    owner_id: ownerId,
    reference_number: appointment.referenceNumber,
    service_id: appointment.serviceId,
    service_name: appointment.serviceName,
    service_category: appointment.serviceCategory,
    specialist_id: appointment.specialistId,
    specialist_name: appointment.specialistName,
    date: appointment.date,
    time: appointment.time,
    client_name: appointment.clientName,
    client_email: appointment.clientEmail,
    client_phone: appointment.clientPhone,
    client_notes: appointment.clientNotes ?? null,
    add_ons: appointment.addOns,
    total_price: appointment.totalPrice,
    total_duration: appointment.totalDuration,
    created_at: appointment.createdAt,
  };
}

export async function fetchAppointments(): Promise<AppointmentRecord[]> {
  const supabase = getSupabaseClient();
  const ownerId = await getSupabaseUserId();
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('owner_id', ownerId)
    .neq('booking_status', 'cancelled')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data.map(toAppointmentRecord);
}

export async function fetchAdminAppointments(): Promise<AppointmentRecord[]> {
  const { data, error } = await getSupabaseClient()
    .from('appointments')
    .select('*')
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (error) throw error;
  return data.map(toAppointmentRecord);
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentRecord['bookingStatus']
): Promise<void> {
  const { error } = await getSupabaseClient().rpc('admin_update_appointment_status', {
    p_appointment_id: id,
    p_booking_status: status,
  });

  if (error) throw error;
}

export async function createAppointment(appointment: AppointmentRecord): Promise<void> {
  const supabase = getSupabaseClient();
  const ownerId = await getSupabaseUserId();
  const { error } = await supabase
    .from('appointments')
    .insert(toAppointmentRow(appointment, ownerId));

  if (error) throw error;
}

export async function deleteAppointment(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const ownerId = await getSupabaseUserId();
  const { data, error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id)
    .eq('owner_id', ownerId)
    .select('id')
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Appointment was not found or could not be cancelled.');
}

export async function completeAppointmentIntake(id: string): Promise<void> {
  const supabase = getSupabaseClient();
  const ownerId = await getSupabaseUserId();
  const { data, error } = await supabase
    .from('appointments')
    .update({ intake_status: 'completed' })
    .eq('id', id)
    .eq('owner_id', ownerId)
    .select('id')
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error('Appointment was not found or its intake status could not be updated.');
}
