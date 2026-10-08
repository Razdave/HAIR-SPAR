import React, { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon, Clock, User, Sparkles, Check, ChevronRight, ChevronLeft, ShieldCheck, Scissors, ArrowRight, Download } from 'lucide-react';
import { ServiceItem, Specialist, AddOnOption, AppointmentRecord } from '../types';
import { SERVICES, ADD_ONS } from '../data/services';
import { SPECIALISTS } from '../data/specialists';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  onBookingConfirmed: (appointment: AppointmentRecord) => void;
  onOpenConsultationForm: (type: 'medical-aesthetic' | 'hair-trichology', ref: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  onBookingConfirmed,
  onOpenConsultationForm,
}) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preselectedServiceId || SERVICES[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<string>('any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('10:30 AM');
  const [selectedAddOns, setSelectedAddOns] = useState<AddOnOption[]>([]);
  
  // Client details
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [wantsIntakeNow, setWantsIntakeNow] = useState(true);

  // Confirmed record
  const [confirmedBooking, setConfirmedBooking] = useState<AppointmentRecord | null>(null);

  // Calendar dates generation
  const today = new Date();
  const [currentMonthOffset, setCurrentMonthOffset] = useState(0);

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
      const svc = SERVICES.find(s => s.id === preselectedServiceId);
      if (svc) {
        setSelectedCategory(svc.category);
      }
    }
    // Default to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setSelectedDate(tomorrow.toISOString().split('T')[0]);
  }, [preselectedServiceId, isOpen]);

  const selectedService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  const specialistsForService = SPECIALISTS.filter(spec => {
    if (selectedService.category === 'hair-salon') {
      return spec.department === 'Hair Atelier' || spec.department === 'Trichology';
    }
    return spec.department === 'Med Spa' || spec.department === 'Dermatology';
  });

  const selectedSpecialist = selectedSpecialistId === 'any'
    ? { id: 'any', name: 'First Available Specialist', role: selectedService.specialistRole }
    : SPECIALISTS.find(s => s.id === selectedSpecialistId) || { id: 'any', name: 'First Available Specialist', role: selectedService.specialistRole };

  // Calculate pricing
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.price, 0);
  const addOnsDuration = selectedAddOns.reduce((sum, item) => sum + item.duration, 0);
  const totalPrice = selectedService.price + addOnsTotal;
  const totalDuration = selectedService.duration + addOnsDuration;

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:15 AM', '01:00 PM',
    '02:30 PM', '03:45 PM', '05:00 PM', '06:15 PM'
  ];

  // Calendar days helper
  const renderCalendarDays = () => {
    const days = [];
    const date = new Date(today.getFullYear(), today.getMonth() + currentMonthOffset, 1);
    const monthName = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    
    // First day of month padding
    const startDay = date.getDay();
    const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    for (let i = 0; i < startDay; i++) {
      days.push(<div key={`pad-${i}`} className="h-8" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), d);
      const dateStr = dayDate.toISOString().split('T')[0];
      const isPast = dayDate < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSelected = selectedDate === dateStr;

      days.push(
        <button
          type="button"
          key={dateStr}
          disabled={isPast}
          onClick={() => setSelectedDate(dateStr)}
          className={`h-8 sm:h-9 rounded-md text-xs font-mono transition-all flex items-center justify-center cursor-pointer ${
            isSelected
              ? 'bg-[#4E273E] text-white font-bold shadow-sm'
              : isPast
              ? 'text-[#D6CEC4] cursor-not-allowed'
              : 'text-[#44403C] hover:bg-[#F2DDD2] hover:text-[#4E273E]'
          }`}
        >
          {d}
        </button>
      );
    }

    return { monthName, days };
  };

  const { monthName, days } = renderCalendarDays();

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    const refNum = `AUR-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment: AppointmentRecord = {
      id: `apt-${Date.now()}`,
      referenceNumber: refNum,
      serviceId: selectedService.id,
      serviceName: selectedService.title,
      serviceCategory: selectedService.categoryLabel,
      specialistId: selectedSpecialist.id,
      specialistName: selectedSpecialist.name,
      date: selectedDate,
      time: selectedTime,
      clientName,
      clientEmail,
      clientPhone,
      clientNotes,
      addOns: selectedAddOns,
      totalPrice,
      totalDuration,
      intakeStatus: 'pending',
      createdAt: new Date().toISOString(),
    };

    setConfirmedBooking(newAppointment);
    onBookingConfirmed(newAppointment);
    setStep(5); // Confirmation screen
  };

  const downloadCalendarFile = () => {
    if (!confirmedBooking) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aurelle Med Spa and Hair Atelier//Booking//EN
BEGIN:VEVENT
SUMMARY:Aurélle Sanctuary: ${confirmedBooking.serviceName}
DESCRIPTION:Your appointment for ${confirmedBooking.serviceName} with ${confirmedBooking.specialistName}. Reference: ${confirmedBooking.referenceNumber}.
LOCATION:Aurélle Sanctuary, 148 Rue Vivienne / 450 Madison Ave
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Aurelle_Appointment_${confirmedBooking.referenceNumber}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#ECE5DC] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#FAF8F5] border-b border-[#ECE5DC] p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8E3B5C]">
                AURÉLLE SCHEDULING CONCIERGE
              </span>
              <span className="text-[10px] bg-[#FAF0EA] text-[#4E273E] px-2 py-0.5 rounded font-mono">
                {step < 5 ? `Step ${step} of 4` : 'Confirmed'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-normal text-[#1F1D1B] tracking-tight">
              {step === 5 ? 'Your Sanctuary Ritual is Reserved' : 'Schedule Your Sanctuary Visit'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#ECE5DC] flex items-center justify-center text-[#78716C] hover:text-[#1F1D1B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Wizard Stepper Bar (if not confirmed) */}
        {step < 5 && (
          <div className="bg-[#F2ECE4] px-6 py-2 border-b border-[#ECE5DC] flex items-center justify-between text-xs font-mono text-[#78716C] shrink-0">
            <span className={step >= 1 ? 'text-[#4E273E] font-medium' : ''}>1. Service</span>
            <span className="text-[#D6CEC4]">→</span>
            <span className={step >= 2 ? 'text-[#4E273E] font-medium' : ''}>2. Practitioner</span>
            <span className="text-[#D6CEC4]">→</span>
            <span className={step >= 3 ? 'text-[#4E273E] font-medium' : ''}>3. Date & Time</span>
            <span className="text-[#D6CEC4]">→</span>
            <span className={step >= 4 ? 'text-[#4E273E] font-medium' : ''}>4. Client & Intake</span>
          </div>
        )}

        {/* Content Area */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          
          {/* STEP 1: Select Ritual & Category */}
          {step === 1 && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-1.5 pb-2 border-b border-[#ECE5DC]">
                {[
                  { key: 'all', label: 'All Services' },
                  { key: 'hair-salon', label: 'Hair Salon Atelier' },
                  { key: 'skin-facials', label: 'Skin & Facials' },
                  { key: 'injectables-laser', label: 'Injectables & Laser' },
                  { key: 'body-wellness', label: 'Body & Wellness' },
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setSelectedCategory(tab.key)}
                    className={`px-3 py-1.5 text-xs rounded transition-all cursor-pointer ${
                      selectedCategory === tab.key
                        ? 'bg-[#1F1D1B] text-white font-medium'
                        : 'bg-white border border-[#ECE5DC] text-[#6B635C] hover:text-[#1F1D1B]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                {SERVICES
                  .filter(s => selectedCategory === 'all' || s.category === selectedCategory)
                  .map((service) => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <div
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#FAF0EA] border-[#4E273E] ring-1 ring-[#4E273E]'
                            : 'bg-white border-[#ECE5DC] hover:border-[#D6CEC4]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-[#78716C] mb-1">
                            <span className="uppercase text-[#8E3B5C] font-semibold">{service.categoryLabel}</span>
                            <span>{service.duration} MIN</span>
                          </div>
                          <h4 className="text-sm font-medium text-[#1F1D1B] mb-1">
                            {service.title}
                          </h4>
                          <p className="text-xs text-[#6B635C] line-clamp-2 mb-3">
                            {service.subtitle}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-[#ECE5DC]/60 font-mono text-xs">
                          <span className="font-semibold text-[#1F1D1B]">${service.price}</span>
                          {isSelected && (
                            <span className="text-[#4E273E] font-sans font-medium flex items-center gap-1 text-[11px]">
                              <Check className="w-3.5 h-3.5" /> Selected
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#ECE5DC]">
                <div className="text-xs text-[#6B635C]">
                  Selected: <strong className="text-[#1F1D1B]">{selectedService.title}</strong> (${selectedService.price})
                </div>
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2 text-xs font-medium text-white bg-[#1F1D1B] hover:bg-[#4E273E] rounded transition-colors cursor-pointer"
                >
                  Next: Select Practitioner ↗
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Specialist */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="bg-white p-4 rounded-xl border border-[#ECE5DC] mb-2 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-[#8E3B5C]">Active Ritual</span>
                  <h4 className="text-sm font-medium text-[#1F1D1B]">{selectedService.title}</h4>
                </div>
                <span className="font-mono text-sm text-[#4E273E] font-semibold">${selectedService.price}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Any available option */}
                <div
                  onClick={() => setSelectedSpecialistId('any')}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedSpecialistId === 'any'
                      ? 'bg-[#FAF0EA] border-[#4E273E] ring-1 ring-[#4E273E]'
                      : 'bg-white border-[#ECE5DC] hover:border-[#D6CEC4]'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#F2DDD2] flex items-center justify-center text-[#4E273E] font-bold text-xs">
                      ⚡
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-[#1F1D1B]">First Available Specialist</h4>
                      <p className="text-xs text-[#78716C]">Fastest booking confirmation</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#6B635C] leading-snug">
                    Assigned to the highest rated available {selectedService.specialistRole}.
                  </p>
                </div>

                {/* Specific specialists */}
                {specialistsForService.map((spec) => {
                  const isSelected = selectedSpecialistId === spec.id;
                  return (
                    <div
                      key={spec.id}
                      onClick={() => setSelectedSpecialistId(spec.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-[#FAF0EA] border-[#4E273E] ring-1 ring-[#4E273E]'
                          : 'bg-white border-[#ECE5DC] hover:border-[#D6CEC4]'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <img
                          src={spec.avatar}
                          alt={spec.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#ECE5DC]"
                        />
                        <div>
                          <h4 className="text-sm font-medium text-[#1F1D1B]">{spec.name}</h4>
                          <p className="text-[11px] text-[#8E3B5C] font-mono">{spec.role}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#6B635C] line-clamp-2 leading-relaxed">
                        {spec.bio}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#ECE5DC]">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-[#6B635C] bg-white border border-[#ECE5DC] rounded hover:bg-[#FAF8F5]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2 text-xs font-medium text-white bg-[#1F1D1B] hover:bg-[#4E273E] rounded transition-colors cursor-pointer"
                >
                  Next: Date & Time ↗
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date, Time & Add-Ons */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Calendar View */}
                <div className="md:col-span-7 bg-white p-4 rounded-xl border border-[#ECE5DC]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1F1D1B]">
                      {monthName}
                    </span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => setCurrentMonthOffset(Math.max(0, currentMonthOffset - 1))}
                        disabled={currentMonthOffset === 0}
                        className="p-1 rounded text-[#78716C] hover:text-[#1F1D1B] disabled:opacity-30"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentMonthOffset(currentMonthOffset + 1)}
                        className="p-1 rounded text-[#78716C] hover:text-[#1F1D1B]"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Day headers */}
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-[#A8A29E] mb-2">
                    <div>SU</div><div>MO</div><div>TU</div><div>WE</div><div>TH</div><div>FR</div><div>SA</div>
                  </div>

                  {/* Days grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {days}
                  </div>
                </div>

                {/* Time Slots */}
                <div className="md:col-span-5 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-3">
                      Available Time Slots
                    </h4>
                    <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                      {timeSlots.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            type="button"
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`p-2.5 rounded-lg text-xs font-mono transition-all text-center cursor-pointer ${
                              isSelected
                                ? 'bg-[#4E273E] text-white font-medium shadow-sm'
                                : 'bg-white border border-[#ECE5DC] text-[#44403C] hover:border-[#D6CEC4]'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary date */}
                  <div className="mt-4 bg-[#FAF0EA] p-3 rounded-lg border border-[#F2DDD2] text-xs">
                    <span className="text-[#8E3B5C] font-semibold block mb-0.5">Selected Schedule:</span>
                    <span className="font-mono text-[#1F1D1B] font-medium">
                      {selectedDate} at {selectedTime}
                    </span>
                  </div>
                </div>
              </div>

              {/* Add-on enhancements */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-3">
                  Complementary Add-On Rituals (Optional)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ADD_ONS.map((addOn) => {
                    const isChecked = selectedAddOns.some(a => a.id === addOn.id);
                    return (
                      <div
                        key={addOn.id}
                        onClick={() => {
                          if (isChecked) {
                            setSelectedAddOns(selectedAddOns.filter(a => a.id !== addOn.id));
                          } else {
                            setSelectedAddOns([...selectedAddOns, addOn]);
                          }
                        }}
                        className={`p-3 rounded-lg border text-xs flex items-center justify-between cursor-pointer transition-all ${
                          isChecked
                            ? 'bg-[#FAF0EA] border-[#4E273E] text-[#4E273E]'
                            : 'bg-white border-[#ECE5DC] text-[#57534E]'
                        }`}
                      >
                        <div>
                          <div className="font-medium">{addOn.name}</div>
                          <div className="text-[10px] text-[#A8A29E] font-mono">+{addOn.duration} min</div>
                        </div>
                        <div className="font-mono font-medium">+${addOn.price}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#ECE5DC]">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-medium text-[#6B635C] bg-white border border-[#ECE5DC] rounded hover:bg-[#FAF8F5]"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-5 py-2 text-xs font-medium text-white bg-[#1F1D1B] hover:bg-[#4E273E] rounded transition-colors cursor-pointer"
                >
                  Next: Client Details ↗
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Client Info & Consultation Option */}
          {step === 4 && (
            <form onSubmit={handleConfirm} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Juliette Dupont"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#4E273E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="juliette@domain.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#4E273E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                    Mobile Phone (For Visit Reminders) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+1 (555) 345-6789"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#4E273E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                    Specific Aesthetic or Hair Goals
                  </label>
                  <input
                    type="text"
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder="e.g., Sensitive scalp, subtle natural highlights"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#4E273E]"
                  />
                </div>
              </div>

              {/* Consultation Link Hook */}
              <div className="bg-[#FAF0EA] p-4 rounded-xl border border-[#F2DDD2] flex items-start gap-3">
                <input
                  type="checkbox"
                  id="intake-opt"
                  checked={wantsIntakeNow}
                  onChange={(e) => setWantsIntakeNow(e.target.checked)}
                  className="mt-1 rounded text-[#4E273E] focus:ring-[#4E273E]"
                />
                <label htmlFor="intake-opt" className="text-xs text-[#44403C] cursor-pointer">
                  <span className="font-semibold text-[#4E273E] block mb-0.5">
                    Open Integrated Patient Consultation Form upon confirmation
                  </span>
                  <span>
                    Fills out your clinical skin Fitzpatrick or hair architecture profile in advance for your practitioner.
                  </span>
                </label>
              </div>

              {/* Order total overview */}
              <div className="bg-white p-4 rounded-xl border border-[#ECE5DC] space-y-2 text-xs">
                <div className="flex justify-between text-[#6B635C]">
                  <span>{selectedService.title} ({selectedService.duration}m)</span>
                  <span className="font-mono">${selectedService.price}</span>
                </div>
                {selectedAddOns.map(a => (
                  <div key={a.id} className="flex justify-between text-[#6B635C]">
                    <span>+ {a.name} ({a.duration}m)</span>
                    <span className="font-mono">+${a.price}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-[#ECE5DC] flex justify-between font-bold text-[#1F1D1B] text-sm">
                  <span>Total Investment ({totalDuration} min)</span>
                  <span className="font-mono text-[#4E273E]">${totalPrice}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-[#ECE5DC]">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-medium text-[#6B635C] bg-white border border-[#ECE5DC] rounded hover:bg-[#FAF8F5]"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#4E273E] hover:bg-[#37182A] rounded transition-colors shadow cursor-pointer"
                >
                  Confirm & Reserve Sanctuary Visit ↗
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Confirmation Pass */}
          {step === 5 && confirmedBooking && (
            <div className="py-6 text-center flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-[#FAF0EA] border border-[#F2DDD2] flex items-center justify-center text-[#4E273E] mb-4">
                <Check className="w-7 h-7" />
              </div>

              <span className="text-[11px] font-mono tracking-widest text-[#8E3B5C] uppercase mb-1">
                RESERVATION CONFIRMED
              </span>
              <h3 className="text-2xl font-normal text-[#1F1D1B] tracking-tight mb-2">
                We Look Forward to Welcoming You
              </h3>
              <p className="text-xs sm:text-sm text-[#6B635C] max-w-md mb-6 leading-relaxed">
                A confirmation voucher and calendar invitation have been sent to <strong>{confirmedBooking.clientEmail}</strong>.
              </p>

              {/* Digital Pass Card */}
              <div className="w-full max-w-md bg-white border border-[#ECE5DC] rounded-2xl p-5 text-left text-xs shadow-sm mb-6 space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#ECE5DC]">
                  <div>
                    <span className="text-[10px] text-[#A8A29E] uppercase tracking-wider block">Booking Ref</span>
                    <span className="font-mono font-bold text-sm text-[#4E273E]">{confirmedBooking.referenceNumber}</span>
                  </div>
                  <span className="px-2.5 py-1 bg-[#FAF0EA] text-[#4E273E] rounded text-[11px] font-medium">
                    {confirmedBooking.serviceCategory}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-[#78716C]">Ritual:</span>
                    <span className="font-medium text-[#1F1D1B]">{confirmedBooking.serviceName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#78716C]">Practitioner:</span>
                    <span className="font-medium text-[#1F1D1B]">{confirmedBooking.specialistName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#78716C]">Date & Time:</span>
                    <span className="font-mono font-medium text-[#1F1D1B]">{confirmedBooking.date} at {confirmedBooking.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#78716C]">Duration:</span>
                    <span className="font-mono text-[#1F1D1B]">{confirmedBooking.totalDuration} minutes</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#ECE5DC]/60 font-semibold text-sm">
                    <span className="text-[#1F1D1B]">Total Due at Visit:</span>
                    <span className="font-mono text-[#4E273E]">${confirmedBooking.totalPrice}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <button
                  onClick={downloadCalendarFile}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#1F1D1B] bg-white border border-[#ECE5DC] rounded hover:bg-[#FAF8F5] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[#4E273E]" />
                  <span>Download Calendar (.ics)</span>
                </button>

                {wantsIntakeNow ? (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenConsultationForm(
                        selectedService.category === 'hair-salon' ? 'hair-trichology' : 'medical-aesthetic',
                        confirmedBooking.referenceNumber
                      );
                    }}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#4E273E] hover:bg-[#37182A] rounded transition-colors shadow cursor-pointer"
                  >
                    <span>Complete Intake Form Now ↗</span>
                  </button>
                ) : (
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2.5 text-xs font-medium text-white bg-[#1F1D1B] rounded hover:bg-[#37182A]"
                  >
                    Done
                  </button>
                )}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
