/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MarqueeStrip } from './components/MarqueeStrip';
import { ServicesSection } from './components/ServicesSection';
import { HairSalonSection } from './components/HairSalonSection';
import { OurApproachSection } from './components/OurApproachSection';
import { ConsultationIntroSection } from './components/ConsultationIntroSection';
import { SanctuaryShowcaseSection } from './components/SanctuaryShowcaseSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { ConsultationFormModal } from './components/ConsultationFormModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { MyAppointmentsModal } from './components/MyAppointmentsModal';
import { ConciergeConsultModal } from './components/ConciergeConsultModal';
import { AdminDashboard } from './components/AdminDashboard';
import { SERVICES } from './data/services';
import { ServiceItem, AppointmentRecord } from './types';
import {
  completeAppointmentIntake,
  createAppointment,
  deleteAppointment,
  fetchAppointments,
} from './lib/appointments';

function PublicApp() {
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [isAppointmentsLoading, setIsAppointmentsLoading] = useState(true);
  const [appointmentError, setAppointmentError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchAppointments()
      .then((records) => {
        if (isMounted) setAppointments(records);
      })
      .catch((error: unknown) => {
        console.error('Unable to load appointments from Supabase.', error);
        if (isMounted) {
          setAppointmentError(error instanceof Error ? error.message : 'Unable to load appointments from Supabase.');
        }
      })
      .finally(() => {
        if (isMounted) setIsAppointmentsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Modal states
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPreselectedServiceId, setBookingPreselectedServiceId] = useState<string | undefined>();
  
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationType, setConsultationType] = useState<'medical-aesthetic' | 'hair-trichology'>('medical-aesthetic');
  const [consultationLinkedRef, setConsultationLinkedRef] = useState<string | undefined>();

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailService, setDetailService] = useState<ServiceItem | null>(null);

  const [isMyAppointmentsOpen, setIsMyAppointmentsOpen] = useState(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState(false);

  // Handlers
  const handleOpenBooking = (serviceId?: string) => {
    setBookingPreselectedServiceId(serviceId);
    setIsBookingOpen(true);
  };

  const handleOpenConsultation = (type: 'medical-aesthetic' | 'hair-trichology' = 'medical-aesthetic', ref?: string) => {
    setConsultationType(type);
    setConsultationLinkedRef(ref);
    setIsConsultationOpen(true);
  };

  const handleSelectServiceDetail = (service: ServiceItem) => {
    setDetailService(service);
    setIsDetailOpen(true);
  };

  const handleBookingConfirmed = async (newAppointment: AppointmentRecord) => {
    try {
      await createAppointment(newAppointment);
      setAppointments(prev => [newAppointment, ...prev]);
      setAppointmentError(null);
    } catch (error) {
      console.error('Unable to save appointment to Supabase.', error);
      setAppointmentError(error instanceof Error ? error.message : 'Unable to save appointment.');
      throw error;
    }
  };

  const handleCancelAppointment = async (id: string) => {
    try {
      await deleteAppointment(id);
      setAppointments(prev => prev.filter(appointment => appointment.id !== id));
      setAppointmentError(null);
    } catch (error) {
      console.error('Unable to cancel appointment in Supabase.', error);
      throw error;
    }
  };

  const handleSaveIntake = async (type: 'medical-aesthetic' | 'hair-trichology', _data: unknown) => {
    const appointment = consultationLinkedRef
      ? appointments.find(record => record.referenceNumber === consultationLinkedRef)
      : appointments.find(record => {
        if (record.intakeStatus !== 'pending') return false;
        const isHair = record.serviceCategory.toLowerCase().includes('hair')
          || record.serviceCategory.toLowerCase().includes('scalp');
        return (type === 'hair-trichology' && isHair) || (type === 'medical-aesthetic' && !isHair);
      });

    if (!appointment) {
      throw new Error('No matching appointment was found. Book a visit before submitting the intake form.');
    }
    if (appointment.intakeStatus === 'completed') return;

    try {
      await completeAppointmentIntake(appointment.id);
      setAppointments(prev => prev.map(record => (
        record.id === appointment.id ? { ...record, intakeStatus: 'completed' } : record
      )));
      setAppointmentError(null);
    } catch (error) {
      console.error('Unable to update appointment intake status in Supabase.', error);
      setAppointmentError(error instanceof Error ? error.message : 'Unable to update intake status.');
      throw error;
    }
  };

  const hairServices = SERVICES.filter(s => s.category === 'hair-salon');

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1D1B] flex flex-col font-sans selection:bg-[#4E273E] selection:text-white">
      {isAppointmentsLoading && (
        <p className="px-4 py-2 text-center text-xs text-[#57534E]" aria-live="polite">
          Connecting to appointments…
        </p>
      )}
      {appointmentError && (
        <div role="alert" className="flex items-center justify-between gap-4 bg-red-50 px-4 py-3 text-sm text-red-800">
          <span>{appointmentError}</span>
          <button type="button" onClick={() => setAppointmentError(null)} className="font-medium underline">
            Dismiss
          </button>
        </div>
      )}

      {/* 3-Zone Top Navigation Bar */}
      <Header
        onOpenBooking={() => handleOpenBooking()}
        onOpenConsultation={(type) => handleOpenConsultation(type || 'medical-aesthetic')}
        onOpenMyAppointments={() => setIsMyAppointmentsOpen(true)}
        appointmentCount={appointments.length}
      />

      {/* Hero Section matching exact screenshot layout and cards */}
      <main className="flex-1">
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onOpenConsultation={(type) => handleOpenConsultation(type)}
          onOpenConcierge={() => setIsConciergeOpen(true)}
        />

        {/* Editorial Separator Ticker */}
        <MarqueeStrip />

        {/* 02 / FIND YOUR FEEL-GOOD: Treatment Catalog */}
        <ServicesSection
          services={SERVICES}
          onSelectService={handleSelectServiceDetail}
          onBookService={handleOpenBooking}
          onOpenConsultation={(type) => handleOpenConsultation(type)}
        />

        {/* 03 / THE HAIR ATELIER: Requested Hair Salon addition */}
        <HairSalonSection
          hairServices={hairServices}
          onBookService={handleOpenBooking}
          onOpenConsultation={(type) => handleOpenConsultation(type)}
        />

        {/* 04 / OUR APPROACH: Philosophy, Diagnostic imaging, Private Suites */}
        <OurApproachSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenConsultation={() => handleOpenConsultation()}
        />

        {/* 05 / CLINICAL INTAKE: Patient consultation forms and safety */}
        <ConsultationIntroSection
          onOpenConsultation={(type) => handleOpenConsultation(type)}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Sanctuary Spaces & Amenities showcase */}
        <SanctuaryShowcaseSection
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Editorial Footer */}
      <Footer
        onOpenBooking={() => handleOpenBooking()}
        onOpenConsultation={(type) => handleOpenConsultation(type)}
      />

      {/* --- Interactive Modals & Workflows --- */}
      
      {/* Appointment Scheduling System */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedServiceId={bookingPreselectedServiceId}
        onBookingConfirmed={handleBookingConfirmed}
        onOpenConsultationForm={(type, ref) => handleOpenConsultation(type, ref)}
      />

      {/* Integrated Patient Consultation Forms */}
      <ConsultationFormModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        initialType={consultationType}
        linkedAppointmentRef={consultationLinkedRef}
        onSaveIntake={handleSaveIntake}
      />

      {/* Treatment Protocol & Clinical Details Modal */}
      <ServiceDetailModal
        service={detailService}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onBook={handleOpenBooking}
        onOpenConsultation={(type) => handleOpenConsultation(type)}
      />

      {/* My Appointments Manager */}
      <MyAppointmentsModal
        isOpen={isMyAppointmentsOpen}
        onClose={() => setIsMyAppointmentsOpen(false)}
        appointments={appointments}
        onCancelAppointment={handleCancelAppointment}
        onOpenConsultation={(type, ref) => handleOpenConsultation(type, ref)}
      />

      {/* "Let's talk about you" Concierge */}
      <ConciergeConsultModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
        onSelectServiceAndBook={(serviceId) => {
          setIsConciergeOpen(false);
          handleOpenBooking(serviceId);
        }}
      />
    </div>
  );
}

export default function App() {
  return window.location.pathname.replace(/\/+$/, '') === '/admin'
    ? <AdminDashboard />
    : <PublicApp />;
}
