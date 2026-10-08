import React, { useState } from 'react';
import { ServiceItem, ServiceCategory } from '../types';
import { ArrowUpRight, Clock, Sparkles, Scissors, ShieldCheck } from 'lucide-react';

interface ServicesSectionProps {
  services: ServiceItem[];
  onSelectService: (service: ServiceItem) => void;
  onBookService: (serviceId: string) => void;
  onOpenConsultation: (type: 'medical-aesthetic' | 'hair-trichology') => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  services,
  onSelectService,
  onBookService,
  onOpenConsultation,
}) => {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('all');

  const categories: { key: ServiceCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Rituals', count: services.length },
    {
      key: 'hair-salon',
      label: 'Hair Salon Atelier',
      count: services.filter(s => s.category === 'hair-salon').length,
    },
    {
      key: 'skin-facials',
      label: 'Skin Health & Facials',
      count: services.filter(s => s.category === 'skin-facials').length,
    },
    {
      key: 'injectables-laser',
      label: 'Injectables & Laser',
      count: services.filter(s => s.category === 'injectables-laser').length,
    },
    {
      key: 'body-wellness',
      label: 'Body & Wellness',
      count: services.filter(s => s.category === 'body-wellness').length,
    },
  ];

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  return (
    <section id="services-catalog" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#ECE5DC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="mb-4">
            <span className="text-[11px] font-medium tracking-[0.2em] text-[#A8A29E] uppercase">
              02 / FIND YOUR FEEL-GOOD
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1F1D1B] leading-[1.08]">
                A little care. <br />
                <span className="text-[#4E273E]">A lot of possibility.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base sm:text-lg text-[#6B635C] font-light leading-relaxed max-w-md">
                Different needs. Different rituals. Find your starting point — we&apos;ll take it from there. Every session includes custom diagnostic imaging and consultation.
              </p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[#ECE5DC]/70">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#1F1D1B] text-white shadow-sm'
                    : 'bg-[#F2ECE4] text-[#5C554F] hover:bg-[#EAE2D8] hover:text-[#1F1D1B]'
                }`}
              >
                {cat.key === 'hair-salon' && (
                  <Scissors className="w-3.5 h-3.5 text-[#F2DDD2]" />
                )}
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-white/20 text-white' : 'bg-black/5 text-[#78716C]'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const isHair = service.category === 'hair-salon';
            return (
              <div
                key={service.id}
                className="group bg-white rounded-xl border border-[#ECE5DC] p-6 flex flex-col justify-between hover:shadow-md hover:border-[#D9CFC4] transition-all duration-300 relative overflow-hidden"
              >
                {/* Accent top stripe for Hair Salon items */}
                {isHair && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#8E3B5C] via-[#4E273E] to-[#E59866]" />
                )}

                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between text-xs text-[#78716C] mb-4">
                    <span className="font-semibold tracking-wider uppercase text-[10px] text-[#8E3B5C]">
                      {service.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-[#57534E]">
                      <Clock className="w-3.5 h-3.5 text-[#A8A29E]" />
                      <span>{service.duration} MIN</span>
                    </div>
                  </div>

                  {/* Title & Arrow */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <h3 className="text-xl font-normal text-[#1F1D1B] tracking-tight group-hover:text-[#4E273E] transition-colors leading-snug">
                      {service.title}
                    </h3>
                    <button
                      onClick={() => onSelectService(service)}
                      className="w-8 h-8 rounded-full border border-[#ECE5DC] bg-[#FAF8F5] group-hover:bg-[#4E273E] group-hover:text-white flex items-center justify-center shrink-0 transition-all cursor-pointer"
                      title="View ritual details"
                    >
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </button>
                  </div>

                  {/* Subtitle */}
                  <p className="text-xs sm:text-sm text-[#6B635C] leading-relaxed mb-4">
                    {service.subtitle}
                  </p>

                  {/* Highlight pill */}
                  <div className="bg-[#FAF8F5] border border-[#ECE5DC] rounded-md px-3 py-2 text-xs text-[#57534E] mb-5">
                    <span className="font-medium text-[#4E273E]">Protocol: </span>
                    <span>{service.highlight}</span>
                  </div>
                </div>

                {/* Footer: Price + Actions */}
                <div className="pt-4 border-t border-[#ECE5DC]/70 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#A8A29E] block">
                      Investment
                    </span>
                    <span className="text-xl font-light text-[#1F1D1B] font-mono">
                      ${service.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectService(service)}
                      className="px-3 py-1.5 text-xs text-[#6B635C] hover:text-[#1F1D1B] underline underline-offset-2 transition-colors cursor-pointer"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onBookService(service.id)}
                      className="px-3.5 py-2 text-xs font-medium text-white bg-[#1F1D1B] hover:bg-[#4E273E] rounded transition-colors shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
                    >
                      Book ↗
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom banner for Integrated Consultation */}
        <div className="mt-14 bg-[#FAF0EA] border border-[#F2DDD2] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#8E3B5C] shrink-0 shadow-sm">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-medium text-[#1F1D1B] mb-1">
                Clinical Safety & Personalized Form Integration
              </h4>
              <p className="text-xs sm:text-sm text-[#6B635C] max-w-xl">
                Every appointment is linked with your confidential intake profile (medical contraindications, skin Fitzpatrick typing, or hair history). Complete it in under 3 minutes before your visit.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => onOpenConsultation('medical-aesthetic')}
              className="flex-1 md:flex-initial px-4 py-2.5 text-xs font-medium text-[#4E273E] bg-white border border-[#E8C8B8] hover:bg-[#F2DDD2] rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              Medical Intake Form
            </button>
            <button
              onClick={() => onOpenConsultation('hair-trichology')}
              className="flex-1 md:flex-initial px-4 py-2.5 text-xs font-medium text-[#1F1D1B] bg-white border border-[#E8C8B8] hover:bg-[#F2DDD2] rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm"
            >
              Hair & Scalp Intake Form
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
