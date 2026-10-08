import React from 'react';
import { ArrowUpRight, Sparkles, Shield, HeartHandshake, Eye } from 'lucide-react';

interface OurApproachSectionProps {
  onOpenBooking: () => void;
  onOpenConsultation: () => void;
}

export const OurApproachSection: React.FC<OurApproachSectionProps> = ({
  onOpenBooking,
  onOpenConsultation,
}) => {
  return (
    <section id="our-approach" className="py-20 lg:py-28 bg-[#FAF8F5] border-b border-[#ECE5DC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Section Tag */}
        <div className="mb-14">
          <span className="text-[11px] font-medium tracking-[0.2em] text-[#A8A29E] uppercase block mb-3">
            04 / OUR APPROACH
          </span>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1F1D1B] leading-[1.08]">
                Real care. <br />
                <span className="text-[#4E273E]">Zero pressure.</span>
              </h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-base text-[#6B635C] font-light leading-relaxed">
                We dismantled the clinical coldness of traditional med spas and the chaotic pace of modern hair salons to build a sanctuary of restorative precision.
              </p>
            </div>
          </div>
        </div>

        {/* 2-Column Split: Image on Left, 4 Editorial Steps on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden shadow-sm bg-[#ECE4DA]">
            <img
              src="/src/assets/images/aurelle_spa_facial_1791474134131.jpg"
              alt="Aesthetician gentle facial therapy at Aurélle"
              referrerPolicy="no-referrer"
              className="w-full aspect-[4/3] object-cover object-center"
            />
            <div className="absolute top-4 left-4 backdrop-blur-md bg-white/85 px-3 py-1 rounded text-[10px] tracking-widest font-semibold uppercase text-[#1F1D1B]">
              MED-SPA SANCTUARY
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            
            <div className="border-b border-[#ECE5DC] pb-5">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs font-mono text-[#8E3B5C] font-semibold">01. INTAKE & BIO-METRIC ANALYSIS</span>
                <span className="text-[11px] text-[#A8A29E]">Pre-Visit</span>
              </div>
              <h3 className="text-lg font-medium text-[#1F1D1B] mb-1">
                Your Story Before the Scalpel or Scissor
              </h3>
              <p className="text-xs sm:text-sm text-[#6B635C] leading-relaxed">
                Our digital consultation forms capture your medical contraindications, Fitzpatrick skin tone, and hair processing history before you ever step foot through our doors.
              </p>
            </div>

            <div className="border-b border-[#ECE5DC] pb-5">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs font-mono text-[#8E3B5C] font-semibold">02. CLINICAL IMAGING & TRICHOSCOPY</span>
                <span className="text-[11px] text-[#A8A29E]">Day of Visit</span>
              </div>
              <h3 className="text-lg font-medium text-[#1F1D1B] mb-1">
                Objective Diagnostics, Not Guesses
              </h3>
              <p className="text-xs sm:text-sm text-[#6B635C] leading-relaxed">
                Whether assessing cellular collagen density or examining follicular scalp sebum under 200x magnification, every recommendation is proven by diagnostic science.
              </p>
            </div>

            <div className="border-b border-[#ECE5DC] pb-5">
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs font-mono text-[#8E3B5C] font-semibold">03. BESPOKE RITUAL EXECUTION</span>
                <span className="text-[11px] text-[#A8A29E]">Treatment</span>
              </div>
              <h3 className="text-lg font-medium text-[#1F1D1B] mb-1">
                Unhurried Artistry in Private Suites
              </h3>
              <p className="text-xs sm:text-sm text-[#6B635C] leading-relaxed">
                Each guest occupies their own serene acoustic suite. No double booking, no assembly line treatments. One practitioner dedicated exclusively to you.
              </p>
            </div>

            <div>
              <div className="flex items-baseline justify-between mb-1.5">
                <span className="text-xs font-mono text-[#8E3B5C] font-semibold">04. CONTINUOUS PROGRESSION</span>
                <span className="text-[11px] text-[#A8A29E]">Home Care</span>
              </div>
              <h3 className="text-lg font-medium text-[#1F1D1B] mb-1">
                Post-Care Transparency
              </h3>
              <p className="text-xs sm:text-sm text-[#6B635C] leading-relaxed">
                Tailored home recovery protocols and botanical formulations keep your barrier resilient and your cut sculpted until our next encounter.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
