import React from 'react';
import { Calendar, FileText, Sparkles, Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenConsultation: (type?: 'medical-aesthetic' | 'hair-trichology') => void;
  onOpenMyAppointments: () => void;
  appointmentCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenBooking,
  onOpenConsultation,
  onOpenMyAppointments,
  appointmentCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#ECE5DC] transition-all">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-baseline gap-3">
          <a href="#" className="flex items-baseline group">
            <span className="text-2xl sm:text-3xl font-normal tracking-tight text-[#1F1D1B] lowercase">
              aurélle
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E273E] ml-0.5 mb-1 group-hover:scale-125 transition-transform" />
          </a>
          <span className="hidden lg:inline-block text-[10px] tracking-widest uppercase text-[#78716C] border-l border-[#ECE5DC] pl-3">
            A NEW PERSPECTIVE ON FEELING GOOD.
          </span>
        </div>

        {/* Zone 2: Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-[13px] tracking-wide text-[#57534E]">
          <button
            onClick={() => scrollTo('services-catalog')}
            className="hover:text-[#1F1D1B] transition-colors cursor-pointer"
          >
            The good stuff
          </button>
          <button
            onClick={() => scrollTo('our-approach')}
            className="hover:text-[#1F1D1B] transition-colors cursor-pointer"
          >
            Our approach
          </button>
          <button
            onClick={() => scrollTo('hair-salon-atelier')}
            className="text-[#4E273E] font-medium hover:text-[#1F1D1B] transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4E273E]" />
            Hair Salon
          </button>
          <button
            onClick={() => scrollTo('services-catalog')}
            className="hover:text-[#1F1D1B] transition-colors cursor-pointer"
          >
            Treatments
          </button>
          <button
            onClick={() => scrollTo('clinical-intake')}
            className="hover:text-[#1F1D1B] transition-colors cursor-pointer"
          >
            Your visit
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Intake Forms launcher */}
          <button
            onClick={() => onOpenConsultation()}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#4E273E] bg-[#FBF0EA] border border-[#F2DDD2] rounded-md hover:bg-[#F2DDD2] transition-colors cursor-pointer"
            title="Fill out your pre-treatment medical or hair consultation form"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="whitespace-nowrap">Consultation Forms</span>
          </button>

          {/* Appointments Drawer Button */}
          {appointmentCount > 0 && (
            <button
              onClick={onOpenMyAppointments}
              className="relative inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#1F1D1B] bg-white border border-[#ECE5DC] rounded-md hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5 text-[#4E273E]" />
              <span className="hidden sm:inline">My Visits</span>
              <span className="w-4 h-4 rounded-full bg-[#4E273E] text-white text-[10px] font-bold flex items-center justify-center">
                {appointmentCount}
              </span>
            </button>
          )}

          {/* Primary Action Button - matches screenshot Let's meet ↗ */}
          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-medium tracking-wide text-white bg-[#1F1D1B] hover:bg-[#37182A] rounded-sm transition-all shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
          >
            <span>Let&apos;s meet</span>
            <span className="text-xs">↗</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#57534E] hover:text-[#1F1D1B]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#ECE5DC] bg-[#FAF8F5] px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3 text-sm text-[#44403C]">
            <button
              onClick={() => scrollTo('services-catalog')}
              className="text-left py-1 hover:text-[#1F1D1B]"
            >
              The good stuff (Treatments)
            </button>
            <button
              onClick={() => scrollTo('hair-salon-atelier')}
              className="text-left py-1 font-medium text-[#4E273E] flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#4E273E]" />
              Hair Salon Atelier & Trichology
            </button>
            <button
              onClick={() => scrollTo('our-approach')}
              className="text-left py-1 hover:text-[#1F1D1B]"
            >
              Our approach
            </button>
            <button
              onClick={() => scrollTo('clinical-intake')}
              className="text-left py-1 hover:text-[#1F1D1B]"
            >
              Patient Consultation & Safety
            </button>
          </div>
          <div className="pt-3 border-t border-[#ECE5DC] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center py-2.5 text-xs font-medium text-[#4E273E] bg-[#FBF0EA] border border-[#F2DDD2] rounded-md"
            >
              Patient Consultation Forms
            </button>
            {appointmentCount > 0 && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyAppointments();
                }}
                className="w-full text-center py-2.5 text-xs font-medium text-[#1F1D1B] bg-white border border-[#ECE5DC] rounded-md"
              >
                View My Booked Visits ({appointmentCount})
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
