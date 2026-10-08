import React from 'react';
import { Sparkles, MapPin, Clock, Coffee, Shield } from 'lucide-react';

interface SanctuaryShowcaseSectionProps {
  onOpenBooking: () => void;
}

export const SanctuaryShowcaseSection: React.FC<SanctuaryShowcaseSectionProps> = ({
  onOpenBooking,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#ECE5DC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Full-width Architectural Banner */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg mb-12 bg-[#ECE4DA] group">
          <img
            src="/src/assets/images/aurelle_sanctuary_interior_1791474145215.jpg"
            alt="Aurélle Sanctuary travertine reception and styling lounge"
            referrerPolicy="no-referrer"
            className="w-full aspect-[16/9] sm:aspect-[21/9] object-cover object-center group-hover:scale-101 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 sm:p-10 text-white">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#F2DDD2] mb-2 font-medium">
              THE PHYSICAL SPACES
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-light tracking-tight max-w-2xl mb-3">
              Crafted for profound stillness.
            </h2>
            <p className="text-xs sm:text-base text-white/80 font-light max-w-xl leading-relaxed">
              Curved travertine, warm plaster, acoustically softened treatment suites, and an organic botanical tea bar.
            </p>
          </div>
        </div>

        {/* Amenities Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 text-[#57534E]">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F1D1B]">
              <MapPin className="w-3.5 h-3.5 text-[#8E3B5C]" />
              <span>Two Flagship Locations</span>
            </div>
            <p className="text-xs text-[#78716C]">
              Paris (Place Vendôme) & New York (Upper East Side)
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F1D1B]">
              <Clock className="w-3.5 h-3.5 text-[#8E3B5C]" />
              <span>Unhurried Protocol</span>
            </div>
            <p className="text-xs text-[#78716C]">
              15-minute diagnostic buffer before and after every ritual
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F1D1B]">
              <Coffee className="w-3.5 h-3.5 text-[#8E3B5C]" />
              <span>Botanical Tea Bar</span>
            </div>
            <p className="text-xs text-[#78716C]">
              Cold-pressed adaptogen elixirs and artisanal matcha
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#1F1D1B]">
              <Shield className="w-3.5 h-3.5 text-[#8E3B5C]" />
              <span>Medical Oversight</span>
            </div>
            <p className="text-xs text-[#78716C]">
              Board-certified dermatologists & certified trichologists
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
