import React from 'react';
import { Scissors, Sparkles, Droplets, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface HairSalonSectionProps {
  hairServices: ServiceItem[];
  onBookService: (serviceId: string) => void;
  onOpenConsultation: (type: 'hair-trichology') => void;
}

export const HairSalonSection: React.FC<HairSalonSectionProps> = ({
  hairServices,
  onBookService,
  onOpenConsultation,
}) => {
  return (
    <section id="hair-salon-atelier" className="py-20 lg:py-28 bg-[#FAF6F0] border-b border-[#ECE5DC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Tag & Header */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#8E3B5C]" />
            <span className="text-[11px] font-semibold tracking-[0.2em] text-[#78716C] uppercase">
              03 / THE HAIR ATELIER & TRICHOLOGY
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1F1D1B] leading-[1.08]">
                Where architectural cut <br />
                <span className="text-[#4E273E]">meets follicular health.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <button
                onClick={() => onOpenConsultation('hair-trichology')}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#4E273E] bg-white border border-[#E0D2C7] rounded hover:bg-[#F2DDD2] transition-colors cursor-pointer shadow-sm"
              >
                <span>Hair & Scalp Consultation Intake</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
          
          {/* Main Visual: Generated Hair Salon Atelier Image */}
          <div className="lg:col-span-7 relative group overflow-hidden rounded-2xl shadow-md bg-[#ECE4DA]">
            <img
              src="/src/assets/images/aurelle_hair_salon_1791474120466.jpg"
              alt="Aurélle Hair Salon Atelier with stylist crafting glossy brunette waves"
              referrerPolicy="no-referrer"
              className="w-full aspect-[4/3] object-cover object-center group-hover:scale-102 transition-transform duration-700"
            />
            {/* Viewfinder Badge */}
            <div className="absolute top-4 left-4 backdrop-blur-md bg-white/85 px-3 py-1.5 rounded text-[10px] tracking-widest font-semibold uppercase text-[#1F1D1B] flex items-center gap-2">
              <Scissors className="w-3 h-3 text-[#8E3B5C]" />
              <span>THE SALON ATELIER</span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 rounded-xl text-white">
              <p className="text-xs uppercase tracking-widest text-white/80 font-medium mb-1">
                ORGANIC FORM · UNHURRIED PRECISION
              </p>
              <p className="text-sm font-light text-white/95">
                Every hair appointment includes private consultation, micro-pore scalp cleansing, and bespoke botanical treatment.
              </p>
            </div>
          </div>

          {/* Pillars & Philosophy */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            
            <div className="bg-white p-6 rounded-xl border border-[#ECE5DC] shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#FAF0EA] flex items-center justify-center text-[#8E3B5C]">
                  <Scissors className="w-4 h-4" />
                </div>
                <h3 className="text-base font-medium text-[#1F1D1B]">
                  Bespoke Scissor Architecture
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6B635C] leading-relaxed">
                We cut dry and wet to honor the natural growth vortex, cowlicks, and density of your strands. Resulting in effortless silhouettes that hold their shape for months without wrestling with heat tools.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#ECE5DC] shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#FAF0EA] flex items-center justify-center text-[#4E273E]">
                  <Droplets className="w-4 h-4" />
                </div>
                <h3 className="text-base font-medium text-[#1F1D1B]">
                  Japanese Scalp Spa & Trichology
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6B635C] leading-relaxed">
                Healthy hair demands a thriving root microbiome. Using 200x digital trichoscopy, deep micro-bubble steam baths, and sea kelp scalp scrubs, we alleviate dryness, inflammation, and thinning.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-[#ECE5DC] shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[#FAF0EA] flex items-center justify-center text-[#8E3B5C]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-medium text-[#1F1D1B]">
                  Clean Botanical Gloss & Balayage
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#6B635C] leading-relaxed">
                Freehand Parisian balayage and low-pH acidic glazes infused with fermented plant amino acids. Zero ammonia, zero harsh chemical odors, maximum dimensional mirror reflection.
              </p>
            </div>

          </div>

        </div>

        {/* Featured Hair Atelier Rituals Cards */}
        <div className="mb-6">
          <h3 className="text-xs font-semibold tracking-[0.2em] uppercase text-[#78716C] mb-4">
            FEATURED HAIR ATELIER APPOINTMENTS
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hairServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl border border-[#ECE5DC] p-5 flex flex-col justify-between hover:border-[#4E273E] transition-all group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-[#78716C] mb-2 font-mono">
                    <span className="text-[10px] uppercase font-bold text-[#8E3B5C]">
                      {service.categoryLabel}
                    </span>
                    <span>{service.duration}m</span>
                  </div>
                  <h4 className="text-base font-medium text-[#1F1D1B] group-hover:text-[#4E273E] transition-colors mb-2 leading-snug">
                    {service.title}
                  </h4>
                  <p className="text-xs text-[#6B635C] line-clamp-2 mb-4 leading-relaxed">
                    {service.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#ECE5DC]/60 flex items-center justify-between">
                  <span className="text-base font-medium text-[#1F1D1B] font-mono">
                    ${service.price}
                  </span>
                  <button
                    onClick={() => onBookService(service.id)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-[#4E273E] hover:bg-[#37182A] rounded transition-colors cursor-pointer"
                  >
                    Schedule ↗
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
