import React, { useState } from 'react';
import { X, Sparkles, Scissors, Heart, ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '../data/services';
import { ServiceItem } from '../types';

interface ConciergeConsultModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceAndBook: (serviceId: string) => void;
}

export const ConciergeConsultModal: React.FC<ConciergeConsultModalProps> = ({
  isOpen,
  onClose,
  onSelectServiceAndBook,
}) => {
  const [focusArea, setFocusArea] = useState<string>('hair');
  const [primaryGoal, setPrimaryGoal] = useState<string>('frizz-cut');
  const [urgency, setUrgency] = useState<string>('routine');

  if (!isOpen) return null;

  // Compute matched service
  let matchedService: ServiceItem = SERVICES[0];
  if (focusArea === 'hair') {
    if (primaryGoal === 'scalp-health') {
      matchedService = SERVICES.find(s => s.id === 'hair-scalp-spa') || SERVICES[1];
    } else if (primaryGoal === 'color-shine') {
      matchedService = SERVICES.find(s => s.id === 'hair-balayage-gloss') || SERVICES[2];
    } else {
      matchedService = SERVICES.find(s => s.id === 'hair-couture-cut') || SERVICES[0];
    }
  } else if (focusArea === 'skin') {
    if (primaryGoal === 'deep-lift') {
      matchedService = SERVICES.find(s => s.id === 'skin-lymphatic-buccal') || SERVICES[4];
    } else {
      matchedService = SERVICES.find(s => s.id === 'skin-microneedling-exosome') || SERVICES[5];
    }
  } else if (focusArea === 'injectables') {
    matchedService = SERVICES.find(s => s.id === 'injectables-neuromodulator') || SERVICES[6];
  } else {
    matchedService = SERVICES.find(s => s.id === 'body-lymph-infrared') || SERVICES[8];
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#ECE5DC] overflow-hidden my-auto">
        
        {/* Header */}
        <div className="p-6 bg-[#F2DDD2] border-b border-[#E8C8B8] flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-semibold text-[#7C485C] tracking-widest block mb-0.5">
              PERSONALIZED RITUAL CONCIERGE
            </span>
            <h2 className="text-xl sm:text-2xl font-normal text-[#1F1D1B] tracking-tight">
              Let&apos;s talk about you.
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/70 border border-white flex items-center justify-center text-[#4E273E] hover:bg-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs sm:text-sm">
          
          {/* Question 1: Focus Domain */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
              Where would you love to begin?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'hair', label: 'Hair & Scalp Atelier', icon: Scissors },
                { id: 'skin', label: 'Facial Health & Glow', icon: Sparkles },
                { id: 'injectables', label: 'Micro-Dose Aesthetics', icon: Heart },
                { id: 'body', label: 'Lymph & Detox Body', icon: Sparkles },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = focusArea === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFocusArea(item.id)}
                    className={`p-3 rounded-lg border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#4E273E] text-white border-[#4E273E]'
                        : 'bg-white border-[#ECE5DC] text-[#44403C] hover:border-[#D6CEC4]'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Primary Desired Feeling */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#78716C] mb-2">
              What outcome feels most pressing?
            </label>
            <div className="space-y-1.5">
              {focusArea === 'hair' ? (
                <>
                  {[
                    { id: 'frizz-cut', label: 'Precision cut tailored to my wave pattern & movement' },
                    { id: 'scalp-health', label: 'Relief from scalp tension, dryness, or hair thinning' },
                    { id: 'color-shine', label: 'Sun-kissed hand-painted balayage with high gloss' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPrimaryGoal(opt.id)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        primaryGoal === opt.id
                          ? 'bg-[#FAF0EA] border-[#4E273E] text-[#4E273E] font-medium'
                          : 'bg-white border-[#ECE5DC] text-[#57534E]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {primaryGoal === opt.id && <Check className="w-3.5 h-3.5 text-[#4E273E]" />}
                    </button>
                  ))}
                </>
              ) : (
                <>
                  {[
                    { id: 'deep-lift', label: 'Instant lymphatic drainage, buccal contouring & jaw release' },
                    { id: 'cellular-glow', label: 'Deep collagen renewal, cellular exosome regeneration' },
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPrimaryGoal(opt.id)}
                      className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${
                        primaryGoal === opt.id
                          ? 'bg-[#FAF0EA] border-[#4E273E] text-[#4E273E] font-medium'
                          : 'bg-white border-[#ECE5DC] text-[#57534E]'
                      }`}
                    >
                      <span>{opt.label}</span>
                      {primaryGoal === opt.id && <Check className="w-3.5 h-3.5 text-[#4E273E]" />}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Recommended Match Card */}
          <div className="bg-white p-5 rounded-xl border border-[#ECE5DC] shadow-sm">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E3B5C] font-semibold block mb-1">
              YOUR TAILORED AURÉLLE RITUAL
            </span>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-medium text-[#1F1D1B]">{matchedService.title}</h3>
                <p className="text-xs text-[#6B635C] mt-1">{matchedService.subtitle}</p>
                <div className="flex items-center gap-3 mt-3 text-xs font-mono text-[#57534E]">
                  <span>{matchedService.duration} MIN</span>
                  <span>·</span>
                  <span className="font-semibold text-[#4E273E]">${matchedService.price}</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#ECE5DC] bg-[#FAF8F5] flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs text-[#78716C] hover:text-[#1F1D1B] cursor-pointer"
          >
            I&apos;ll browse on my own
          </button>
          <button
            onClick={() => {
              onClose();
              onSelectServiceAndBook(matchedService.id);
            }}
            className="px-5 py-2.5 text-xs font-medium text-white bg-[#4E273E] hover:bg-[#37182A] rounded transition-colors shadow cursor-pointer flex items-center gap-2"
          >
            <span>Book Recommended Ritual</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
