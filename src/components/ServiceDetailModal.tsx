import React from 'react';
import { X, Clock, CheckCircle2, AlertTriangle, ShieldCheck, ArrowRight, Scissors } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBook: (serviceId: string) => void;
  onOpenConsultation: (type: 'medical-aesthetic' | 'hair-trichology') => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onBook,
  onOpenConsultation,
}) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#ECE5DC] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-[#ECE5DC] bg-white flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-[10px] text-[#8E3B5C]">
              <span className="uppercase font-semibold">{service.categoryLabel}</span>
              <span>·</span>
              <span>{service.specialistRole}</span>
            </div>
            <h2 className="text-2xl font-normal text-[#1F1D1B] tracking-tight">
              {service.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#6B635C] mt-1">
              {service.subtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FAF8F5] border border-[#ECE5DC] flex items-center justify-center text-[#78716C] hover:text-[#1F1D1B] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm">
          
          {/* Key metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white p-3.5 rounded-xl border border-[#ECE5DC]">
              <span className="text-[10px] uppercase text-[#A8A29E] block mb-0.5">Session Time</span>
              <span className="text-base font-medium font-mono text-[#1F1D1B]">{service.duration} Minutes</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#ECE5DC]">
              <span className="text-[10px] uppercase text-[#A8A29E] block mb-0.5">Investment</span>
              <span className="text-base font-medium font-mono text-[#4E273E]">${service.price}</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-[#ECE5DC] col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase text-[#A8A29E] block mb-0.5">Clinical Protocol</span>
              <span className="text-xs font-medium text-[#1F1D1B] truncate block">{service.highlight}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
              Ritual Philosophy & Methodology
            </h3>
            <p className="text-[#57534E] leading-relaxed bg-white p-4 rounded-xl border border-[#ECE5DC]">
              {service.description}
            </p>
          </div>

          {/* Clinical Benefits */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
              Clinical & Sensory Benefits
            </h3>
            <div className="space-y-2">
              {service.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[#44403C]">
                  <CheckCircle2 className="w-4 h-4 text-[#8E3B5C] shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pre & Post Care Guidelines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-[#ECE5DC]">
              <h4 className="text-xs font-semibold text-[#8E3B5C] flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Pre-Visit Guidance</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#6B635C]">
                {service.preCare.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#A8A29E] font-mono">0{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-4 rounded-xl border border-[#ECE5DC]">
              <h4 className="text-xs font-semibold text-[#4E273E] flex items-center gap-1.5 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Post-Treatment Care</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-[#6B635C]">
                {service.postCare.map((item, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-[#A8A29E] font-mono">0{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#ECE5DC] bg-white flex items-center justify-between gap-4">
          <button
            onClick={() => {
              onClose();
              onOpenConsultation(service.intakeType);
            }}
            className="text-xs text-[#4E273E] underline hover:text-[#1F1D1B] cursor-pointer"
          >
            Review Intake Requirements
          </button>
          
          <button
            onClick={() => {
              onClose();
              onBook(service.id);
            }}
            className="px-6 py-2.5 text-xs font-medium text-white bg-[#1F1D1B] hover:bg-[#4E273E] rounded transition-colors shadow cursor-pointer flex items-center gap-2"
          >
            <span>Book This Ritual</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
