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
import { SERVICES } from './data/services';
import { ServiceItem, AppointmentRecord } from './types';

export default function App() {
  // Appointments state with localStorage persistence
  const [appointments, setAppointments] = useState<AppointmentRecord[]>(() => {
    try {
      const saved = localStorage.getItem('aurelle_appointments');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial sample appointment to show off the system immediately
    return [
      {
        id: 'apt-sample-1',
        referenceNumber: 'AUR-4821',
        serviceId: 'hair-couture-cut',
        serviceName: 'Couture Silhouette Cut & Styling',
        serviceCategory: 'Hair Atelier',
        specialistId: 'spec-chantal',
        specialistName: 'Chantal Moreau',
        date: '2026-10-14',
        time: '11:30 AM',
        clientName: 'Elena Rostova',
        clientEmail: 'elena@example.com',
        clientPhone: '(212) 555-0192',
        clientNotes: 'Focus on softening ends and natural face frame.',
        addOns: [
          { id: 'addon-hair-mask', name: 'Deep Botanical Caviar Conditioning Mask', duration: 15, price: 38, category: 'hair' }
        ],
        totalPrice: 193,
        totalDuration: 75,
        intakeStatus: 'pending',
        createdAt: new Date().toISOString(),
      }
    ];
  });

  // Sync appointments to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('aurelle_appointments', JSON.stringify(appointments));
    } catch (e) {
      console.error(e);
    }
  }, [appointments]);

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

  const handleBookingConfirmed = (newAppointment: AppointmentRecord) => {
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  const handleSaveIntake = (type: 'medical-aesthetic' | 'hair-trichology', data: any) => {
    // If an appointment was linked, mark it as verified/completed!
    if (consultationLinkedRef) {
      setAppointments(prev =>
        prev.map(apt =>
          apt.referenceNumber === consultationLinkedRef
            ? { ...apt, intakeStatus: 'completed' as const }
            : apt
        )
      );
    } else {
      // If none explicitly linked, mark the newest matching type
      setAppointments(prev => {
        let updated = false;
        return prev.map(apt => {
          if (!updated && apt.intakeStatus === 'pending') {
            const isHair = apt.serviceCategory.toLowerCase().includes('hair') || apt.serviceCategory.toLowerCase().includes('scalp');
            if ((type === 'hair-trichology' && isHair) || (type === 'medical-aesthetic' && !isHair)) {
              updated = true;
              return { ...apt, intakeStatus: 'completed' as const };
            }
          }
          return apt;
        });
      });
    }
  };

  const hairServices = SERVICES.filter(s => s.category === 'hair-salon');

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1F1D1B] flex flex-col font-sans selection:bg-[#4E273E] selection:text-white">
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
