import React from 'react';
import { ArrowUpRight, MessageSquare, Heart, Sparkles, Scissors } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenConsultation: (type?: 'medical-aesthetic' | 'hair-trichology') => void;
  onOpenConcierge: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBooking,
  onOpenConsultation,
  onOpenConcierge,
}) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden border-b border-[#ECE5DC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        
        {/* Main Grid: Left Typography + Right Card Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          
          {/* Left Column: Hero Text */}
          <div className="lg:col-span-5 flex flex-col justify-between pt-2 lg:pt-8 min-h-[500px]">
            <div>
              {/* Bullet Kicker */}
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#8E3B5C]" />
                <span className="text-[11px] font-semibold tracking-[0.18em] text-[#78716C] uppercase">
                  WELLNESS. AESTHETICS. A LITTLE DIFFERENT.
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-normal tracking-tight text-[#1F1D1B] leading-[1.04] mb-8">
                Your kind <br />
                <span className="relative inline-block font-normal text-[#4E273E]">
                  of good.
                  {/* Subtle decorative sparkle star over the 'o' as seen in screenshot */}
                  <span className="absolute -top-1.5 left-[4.8rem] sm:left-[6rem] text-xs sm:text-sm text-[#4E273E] select-none">
                    ✧
                  </span>
                </span>
              </h1>

              {/* Subtitle & Circular Arrow CTA */}
              <div className="flex items-center gap-6 mb-8 max-w-md">
                <p className="text-base sm:text-lg text-[#57534E] font-light leading-relaxed">
                  Feel good in your skin. <br />
                  Even better in yourself.
                </p>

                {/* Round arrow button matching screenshot */}
                <button
                  onClick={onOpenBooking}
                  className="w-13 h-13 rounded-full border border-[#D6CEC4] bg-white hover:bg-[#1F1D1B] hover:text-white text-[#1F1D1B] flex items-center justify-center transition-all duration-300 shadow-sm hover:scale-105 shrink-0 cursor-pointer group"
                  aria-label="Book an appointment"
                >
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

              {/* New Atelier Announcement Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FAF3EE] border border-[#EADBCE] rounded text-xs text-[#5C3048] mb-6">
                <Scissors className="w-3.5 h-3.5 text-[#8E3B5C]" />
                <span>Now Open: <strong>The Hair Atelier</strong> — Scalp trichology & bespoke styling</span>
              </div>
            </div>

            {/* Bottom Section Index */}
            <div className="pt-8 lg:pt-16 border-t border-[#ECE5DC]/60">
              <span className="text-[11px] font-medium tracking-[0.2em] text-[#A8A29E] uppercase">
                01 / MEET YOUR NEXT CHAPTER
              </span>
            </div>
          </div>

          {/* Right Column: Exact Asymmetric Editorial Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-12 gap-4">
            
            {/* Left Sub-Column: Radiant Portrait + Peach "Let's talk about you" card */}
            <div className="sm:col-span-7 flex flex-col gap-4">
              
              {/* Tall Radiant Portrait Card */}
              <div className="relative group overflow-hidden rounded-xl bg-[#F5EFE8] aspect-[4/5] shadow-sm">
                <img
                  src="/src/assets/images/aurelle_hero_portrait_1791474107789.jpg"
                  alt="Aurelle client with glowing dewy skin"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                />

                {/* Top Badge: [+] NATURALLY YOU */}
                <div className="absolute top-4 left-4 backdrop-blur-md bg-white/80 border border-white/60 px-3 py-1.5 rounded-sm flex items-center gap-1.5 text-[10px] tracking-widest font-semibold uppercase text-[#1F1D1B]">
                  <span className="text-[#8E3B5C]">✢</span>
                  <span>NATURALLY YOU</span>
                </div>

                {/* Bottom Overlay Text */}
                <div className="absolute bottom-4 left-4 right-4 text-white drop-shadow-md">
                  <p className="text-[11px] tracking-wider font-medium uppercase text-white/95 flex items-center justify-between">
                    <span>LESS PERFECT. MORE PERSONAL.</span>
                    <span className="text-sm font-light">+</span>
                  </p>
                </div>
              </div>

              {/* Bottom Peach Card: "NOT SURE WHERE TO START? Let's talk about you. ↗" */}
              <div
                onClick={onOpenConcierge}
                className="bg-[#F2DDD2] hover:bg-[#EBCEBF] rounded-xl p-5 sm:p-6 transition-all duration-300 cursor-pointer group flex items-start gap-4 shadow-sm"
              >
                <div className="w-9 h-9 rounded-full bg-white/70 flex items-center justify-center shrink-0 text-[#4E273E] group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#7C485C] block mb-1">
                    NOT SURE WHERE TO START?
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-normal text-[#1F1D1B] tracking-tight group-hover:text-[#4E273E] transition-colors">
                      Let&apos;s talk about you.
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#4E273E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Sub-Column: Plum Wine Card + White Trust Card */}
            <div className="sm:col-span-5 flex flex-col gap-4">
              
              {/* Deep Plum Wine Card: "THE SCIENCE OF SELF-CARE" with Viewfinder */}
              <div
                onClick={onOpenBooking}
                className="bg-[#4E273E] text-[#FAF8F5] rounded-xl p-6 sm:p-7 flex flex-col justify-between min-h-[300px] sm:min-h-[340px] relative overflow-hidden group cursor-pointer shadow-md hover:bg-[#432035] transition-colors"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] tracking-widest uppercase font-medium text-white/70">
                    THE SCIENCE OF SELF-CARE
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                {/* Central Crosshair Viewfinder SVG (matches screenshot) */}
                <div className="my-auto py-6 flex items-center justify-center">
                  <div className="w-20 h-20 relative flex items-center justify-center text-white/40 group-hover:text-white/70 transition-colors">
                    {/* Viewfinder Corners */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-current" />
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-current" />
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-current" />
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-current" />
                    {/* Center cross */}
                    <div className="w-4 h-0.5 bg-current" />
                    <div className="h-4 w-0.5 bg-current absolute" />
                  </div>
                </div>

                {/* Footer Content */}
                <div>
                  <h3 className="text-xl sm:text-2xl font-light tracking-tight text-white leading-tight mb-2">
                    Skin deep. <br />
                    And beyond.
                  </h3>
                  <span className="text-xs text-white/70 group-hover:text-white underline underline-offset-4 font-light transition-colors">
                    Explore our practice
                  </span>
                </div>
              </div>

              {/* White Minimalist Card: "Real care. Zero pressure." */}
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-[#ECE5DC] flex flex-col justify-between flex-1 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#FAF8F5] flex items-center justify-center text-[#4E273E]">
                    <Heart className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <p className="text-base font-normal text-[#1F1D1B] tracking-tight leading-snug mb-1">
                    Real care. <br />
                    Zero pressure.
                  </p>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-[#A8A29E]">
                    THE AURÉLLE WAY
                  </span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
