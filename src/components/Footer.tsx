import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenConsultation: (type?: 'medical-aesthetic' | 'hair-trichology') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenConsultation,
}) => {
  return (
    <footer className="bg-[#1F1D1B] text-[#FAF8F5] pt-16 pb-12 border-t border-[#37182A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-light tracking-tight text-white lowercase">
                aurélle
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8E3B5C]" />
            </div>
            <p className="text-xs text-[#A8A29E] leading-relaxed max-w-sm">
              A new perspective on feeling good. Unhurried aesthetic medicine, Japanese trichology, and architectural hair design in warm Japandi-inspired sanctuaries.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-[#1F1D1B] bg-[#FAF8F5] hover:bg-[#F2DDD2] rounded transition-colors cursor-pointer"
              >
                <span>Schedule a Visit</span>
                <span className="text-xs">↗</span>
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E3B5C] font-semibold block">
              SANCTUARY
            </span>
            <ul className="space-y-2 text-xs text-[#D6CEC4]">
              <li><a href="#services-catalog" className="hover:text-white transition-colors">The Good Stuff</a></li>
              <li><a href="#hair-salon-atelier" className="hover:text-white transition-colors">Hair Atelier</a></li>
              <li><a href="#our-approach" className="hover:text-white transition-colors">Our Approach</a></li>
              <li><a href="#clinical-intake" className="hover:text-white transition-colors">Clinical Safety</a></li>
            </ul>
          </div>

          {/* Patient Forms */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E3B5C] font-semibold block">
              PATIENT INTAKE
            </span>
            <ul className="space-y-2 text-xs text-[#D6CEC4]">
              <li>
                <button
                  onClick={() => onOpenConsultation('medical-aesthetic')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Medical Aesthetics Intake Form
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenConsultation('hair-trichology')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Hair Atelier & Scalp Intake Form
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Schedule Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Hours & Locations */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E3B5C] font-semibold block">
              HOURS & CARE
            </span>
            <div className="text-xs text-[#D6CEC4] space-y-1 font-mono">
              <p>Tuesday – Saturday: 9:00 AM – 7:30 PM</p>
              <p>Sunday: 10:00 AM – 5:00 PM</p>
              <p>Monday: Private Clinical Consultations Only</p>
            </div>
            <p className="text-[11px] text-[#A8A29E] pt-2">
              concierge@aurelle-sanctuary.com · +1 (212) 890-4100
            </p>
          </div>

        </div>

        {/* Bottom copyright and legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A8A29E] gap-4">
          <div>
            © {new Date().getFullYear()} aurélle wellness & aesthetics llc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>HIPAA & GDPR Compliant Medical Records</span>
            <span>·</span>
            <span>Board-Certified Oversight</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
