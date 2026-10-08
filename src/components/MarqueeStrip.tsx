import React from 'react';

export const MarqueeStrip: React.FC = () => {
  const phrases = [
    'SCIENCE, WITH A SOFTER SIDE',
    'YOUR FACE. YOUR PACE.',
    'GOOD ENERGY STARTS HERE',
    'COME AS YOU ARE',
    'ARCHITECTURAL HAIR ATELIER',
    'CLINICAL RIGOR. SENSORY LUXURY',
    'FEEL GOOD IN YOUR SKIN'
  ];

  return (
    <div className="w-full bg-[#F4EDE6] border-y border-[#ECE5DC] py-3.5 overflow-hidden select-none">
      <div className="flex items-center space-x-8 whitespace-nowrap animate-marquee">
        {/* Double the list for seamless continuous look */}
        {[...phrases, ...phrases].map((text, idx) => (
          <div key={idx} className="inline-flex items-center space-x-8">
            <span className="text-[11px] sm:text-xs tracking-[0.22em] font-medium text-[#6B5A55] uppercase">
              {text}
            </span>
            <span className="text-[#997B72] text-xs">✧</span>
          </div>
        ))}
      </div>
    </div>
  );
};
