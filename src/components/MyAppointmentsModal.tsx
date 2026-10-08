import React from 'react';
import { X, Calendar, Clock, User, Download, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';
import { AppointmentRecord } from '../types';

interface MyAppointmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: AppointmentRecord[];
  onCancelAppointment: (id: string) => void;
  onOpenConsultation: (type: 'medical-aesthetic' | 'hair-trichology', ref: string) => void;
}

export const MyAppointmentsModal: React.FC<MyAppointmentsModalProps> = ({
  isOpen,
  onClose,
  appointments,
  onCancelAppointment,
  onOpenConsultation,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#ECE5DC] overflow-hidden my-auto max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#ECE5DC] bg-white flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-[#8E3B5C] tracking-widest block mb-0.5">
              YOUR AURÉLLE ITINERARY
            </span>
            <h2 className="text-xl sm:text-2xl font-normal text-[#1F1D1B] tracking-tight">
              Upcoming Sanctuary Visits ({appointments.length})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#ECE5DC] flex items-center justify-center text-[#78716C] hover:text-[#1F1D1B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-12 text-[#78716C]">
              <Calendar className="w-10 h-10 mx-auto mb-3 text-[#A8A29E]" />
              <p className="text-sm font-medium text-[#1F1D1B]">No scheduled visits yet</p>
              <p className="text-xs mt-1">Explore our med spa treatments or Hair Atelier to book your session.</p>
            </div>
          ) : (
            appointments.map((apt) => {
              const isHair = apt.serviceCategory.toLowerCase().includes('hair') || apt.serviceCategory.toLowerCase().includes('scalp');
              return (
                <div
                  key={apt.id}
                  className="bg-white border border-[#ECE5DC] rounded-xl p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1 font-mono text-xs text-[#8E3B5C]">
                        <span className="font-semibold">{apt.referenceNumber}</span>
                        <span>·</span>
                        <span>{apt.serviceCategory}</span>
                      </div>
                      <h3 className="text-base font-medium text-[#1F1D1B]">
                        {apt.serviceName}
                      </h3>
                    </div>
                    <span className="font-mono text-base font-medium text-[#4E273E]">
                      ${apt.totalPrice}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-[#57534E] py-2 border-y border-[#ECE5DC]/60">
                    <div className="flex items-center gap-1.5 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-[#A8A29E]" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5 text-[#A8A29E]" />
                      <span>{apt.time} ({apt.totalDuration}m)</span>
                    </div>
                    <div className="flex items-center gap-1.5 col-span-2 sm:col-span-1">
                      <User className="w-3.5 h-3.5 text-[#A8A29E]" />
                      <span className="truncate">{apt.specialistName}</span>
                    </div>
                  </div>

                  {/* Consultation status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded font-medium ${
                        apt.intakeStatus === 'completed'
                          ? 'bg-[#E8F5E9] text-[#2E7D32]'
                          : 'bg-[#FAF0EA] text-[#8E3B5C]'
                      }`}>
                        {apt.intakeStatus === 'completed' ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            <span>Intake Form Verified</span>
                          </>
                        ) : (
                          <>
                            <AlertCircle className="w-3 h-3" />
                            <span>Intake Form Pending</span>
                          </>
                        )}
                      </span>

                      {apt.intakeStatus === 'pending' && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenConsultation(isHair ? 'hair-trichology' : 'medical-aesthetic', apt.referenceNumber);
                          }}
                          className="text-xs text-[#4E273E] underline hover:text-[#1F1D1B] cursor-pointer"
                        >
                          Complete Form Now
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => onCancelAppointment(apt.id)}
                      className="text-xs text-[#B91C1C] hover:text-[#7F1D1D] flex items-center gap-1 cursor-pointer"
                      title="Cancel this appointment"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#ECE5DC] bg-white flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-[#1F1D1B] rounded hover:bg-[#37182A]"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
