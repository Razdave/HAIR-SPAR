import React from 'react';
import { FileText, ShieldCheck, Sparkles, Scissors, Lock, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ConsultationIntroSectionProps {
  onOpenConsultation: (type: 'medical-aesthetic' | 'hair-trichology') => void;
  onOpenBooking: () => void;
}

export const ConsultationIntroSection: React.FC<ConsultationIntroSectionProps> = ({
  onOpenConsultation,
  onOpenBooking,
}) => {
  return (
    <section id="clinical-intake" className="py-20 lg:py-28 bg-[#FAF6F0] border-b border-[#ECE5DC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#8E3B5C]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#78716C] uppercase">
              05 / INTEGRATED PATIENT CONSULTATION
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1F1D1B] leading-[1.08]">
                Intelligent intake. <br />
                <span className="text-[#4E273E]">Zero clinical surprises.</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base text-[#6B635C] font-light leading-relaxed">
                Prior to every treatment, your medical history, skin sensitivities, and hair chemical timeline are analyzed to ensure flawless safety and tailored results.
              </p>
            </div>
          </div>
        </div>

        {/* 2 Interactive Intake Launchers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Medical Aesthetic Consultation Card */}
          <div className="bg-white rounded-2xl border border-[#ECE5DC] p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#8E3B5C] transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FAF0EA] flex items-center justify-center text-[#8E3B5C] mb-6">
                <Sparkles className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#8E3B5C] mb-2 uppercase tracking-wider">
                <span>MED-SPA & DERMATOLOGY INTAKE</span>
              </div>

              <h3 className="text-2xl font-normal text-[#1F1D1B] tracking-tight mb-3 group-hover:text-[#4E273E] transition-colors">
                Aesthetic & Clinical Facial Consultation
              </h3>

              <p className="text-xs sm:text-sm text-[#6B635C] leading-relaxed mb-6">
                Covers your Fitzpatrick skin typing, contraindication screening (Accutane, retinoids, anticoagulants, pregnancy), previous neuromodulator dates, and current skincare active ingredients.
              </p>

              <div className="space-y-2 mb-8 text-xs text-[#57534E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Interactive Fitzpatrick I-VI phototype classification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Laser & injectable safety contraindication check</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Encrypted digital signature & legal clinical consent</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECE5DC] flex items-center justify-between">
              <span className="text-xs font-mono text-[#A8A29E]">~3 MIN COMPLETION</span>
              <button
                onClick={() => onOpenConsultation('medical-aesthetic')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-[#1F1D1B] hover:bg-[#4E273E] rounded transition-colors shadow-sm cursor-pointer"
              >
                <span>Complete Medical Intake</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Hair Atelier & Trichology Consultation Card */}
          <div className="bg-white rounded-2xl border border-[#ECE5DC] p-7 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#4E273E] transition-all group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#FAF0EA] flex items-center justify-center text-[#4E273E] mb-6">
                <Scissors className="w-6 h-6" />
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#4E273E] mb-2 uppercase tracking-wider">
                <span>HAIR ATELIER & TRICHOLOGY INTAKE</span>
              </div>

              <h3 className="text-2xl font-normal text-[#1F1D1B] tracking-tight mb-3 group-hover:text-[#4E273E] transition-colors">
                Hair Architecture & Scalp Health Consultation
              </h3>

              <p className="text-xs sm:text-sm text-[#6B635C] leading-relaxed mb-6">
                Analyzes natural curl curl-pattern (1A-4C), density, scalp microbiome profile (dandruff, oiliness, sensitivity), 12-month chemical color history, and heat styling cadence.
              </p>

              <div className="space-y-2 mb-8 text-xs text-[#57534E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Curl pattern & natural wave classification</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Scalp barrier analysis for Japanese head spa calibration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2E7D32]" />
                  <span>Bleach & color history documentation</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECE5DC] flex items-center justify-between">
              <span className="text-xs font-mono text-[#A8A29E]">~2 MIN COMPLETION</span>
              <button
                onClick={() => onOpenConsultation('hair-trichology')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-white bg-[#4E273E] hover:bg-[#37182A] rounded transition-colors shadow-sm cursor-pointer"
              >
                <span>Complete Hair Intake</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Security & Privacy Banner */}
        <div className="bg-[#FAF8F5] border border-[#ECE5DC] rounded-xl p-5 flex items-center justify-between gap-4 text-xs text-[#6B635C]">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-[#8E3B5C] shrink-0" />
            <span>
              All medical and consultation records are stored encrypted in accordance with client medical confidentiality standards and never shared with third parties.
            </span>
          </div>
          <button
            onClick={onOpenBooking}
            className="text-xs font-medium text-[#1F1D1B] underline hover:text-[#4E273E] whitespace-nowrap cursor-pointer"
          >
            Schedule appointment first ↗
          </button>
        </div>

      </div>
    </section>
  );
};
