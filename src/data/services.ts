import { ServiceItem, AddOnOption } from '../types';

export const SERVICES: ServiceItem[] = [
  // --- HAIR ATELIER & SALON (Requested feature) ---
  {
    id: 'hair-couture-cut',
    title: 'Couture Silhouette Cut & Styling',
    category: 'hair-salon',
    categoryLabel: 'Hair Atelier',
    subtitle: 'Precision architectural cutting tailored to your bone structure and natural movement.',
    duration: 60,
    price: 155,
    specialistRole: 'Master Hair Stylist',
    description: 'A bespoke scissor architecture ritual beginning with scalp analysis, gentle botanical cleanse, customized texturizing cut, and finished with a luminous signature blowout.',
    highlight: 'Custom blade geometry & organic botanicals',
    benefits: [
      'Preserves organic hair texture and enhances natural movement',
      'Scalp pressure-point massage with Japanese cedarwood essence',
      'Weightless heat-activated moisture sealing'
    ],
    preCare: [
      'Arrive with hair in its natural state if possible to evaluate wave patterns',
      'Bring reference imagery of silhouettes you resonate with'
    ],
    postCare: [
      'Avoid tight hairbands for 24 hours to preserve the shape memory',
      'Use sulfate-free nourishing shampoo and cold water rinse'
    ],
    requiresIntake: true,
    intakeType: 'hair-trichology',
  },
  {
    id: 'hair-scalp-spa',
    title: 'Japanese Scalp Spa & Trichology Ritual',
    category: 'hair-salon',
    categoryLabel: 'Scalp & Trichology',
    subtitle: 'Microscopic scalp imaging, warm herbal steam, and detoxifying acupressure massage.',
    duration: 75,
    price: 195,
    specialistRole: 'Clinical Trichologist',
    description: 'An immersive scalp sanctuary experience designed to reset follicular health. Combines 200x digital trichoscopy, deep micro-bubble cleanse, sea kelp exfoliation, warm hydro-mist steam infusion, and cranial lymphatic release.',
    highlight: '200x Digital Trichoscopy & Herbal Steam Ring',
    benefits: [
      'Unclogs sebum buildup around dormant hair follicles',
      'Improves scalp blood micro-circulation by 40%',
      'Soothes inflammation, flakiness, and tension headaches'
    ],
    preCare: [
      'Do not wash hair on the morning of your visit for accurate sebum imaging',
      'Avoid chemical coloring within 48 hours prior to scalp treatment'
    ],
    postCare: [
      'Leave nourishing scalp elixir unwashed overnight for prolonged absorption',
      'Avoid dry shampoo for 3 days post-treatment'
    ],
    requiresIntake: true,
    intakeType: 'hair-trichology',
  },
  {
    id: 'hair-balayage-gloss',
    title: 'French Balayage & Botanical Glossing',
    category: 'hair-salon',
    categoryLabel: 'Hair Atelier',
    subtitle: 'Hand-painted dimensional contouring paired with ammonia-free silk glaze.',
    duration: 150,
    price: 360,
    specialistRole: 'Colorist Specialist',
    description: 'Artisanal freehand painting method mimicking natural sun-kissed reflection. Infused with plant-derived keratin bond repair and sealed with a bespoke pH-balanced acidic gloss for unmatched glass shine.',
    highlight: 'Ammonia-free bond repair + glass shine finish',
    benefits: [
      'Seamless multi-tone regrowth with zero harsh lines',
      'Strengthens cuticle integrity during lightening with organic lipids',
      'Tailored toner matching your unique skin undertone'
    ],
    preCare: [
      'Avoid heavy silicone styling products 24 hours prior',
      'Wear clothing with open collar or button-down shirt'
    ],
    postCare: [
      'Wait 48 hours before initial shampoo wash',
      'Use UV hair mist when outdoors to prevent oxidation'
    ],
    requiresIntake: true,
    intakeType: 'hair-trichology',
  },
  {
    id: 'hair-keratin-glaze',
    title: 'Bio-Keratin Restorative Silk Glaze',
    category: 'hair-salon',
    categoryLabel: 'Hair Atelier',
    subtitle: 'Formaldehyde-free amino smoothing for humidity resistance and velvet softness.',
    duration: 120,
    price: 310,
    specialistRole: 'Master Hair Stylist',
    description: 'A clean restorative smoothing therapy formulated with fermented plant proteins and marula oil. Subdues unruly frizz while preserving natural curl bounce and eliminating blow-dry time.',
    highlight: 'Zero toxins · 4-month humidity shield',
    benefits: [
      'Eliminates 90% of frizz without flattening volume',
      'Restores tensile elasticity in chemically stressed strands',
      'Slashes styling and blow-drying duration in half'
    ],
    preCare: [
      'Hair coloring should be performed either 1 week before or 2 weeks after',
      'Plan for 2 uninterrupted hours of salon atelier time'
    ],
    postCare: [
      'Keep hair dry for 48 hours following treatment',
      'Use only sodium chloride-free and sulfate-free hair cleansers'
    ],
    requiresIntake: true,
    intakeType: 'hair-trichology',
  },

  // --- SKIN & FACIALS (MED SPA) ---
  {
    id: 'skin-lymphatic-buccal',
    title: 'Lymphatic Sculpt & Intra-Oral Buccal Facial',
    category: 'skin-facials',
    categoryLabel: 'Skin Health',
    subtitle: 'Deep cranial-facial release, jade gua sha, and intra-oral contouring.',
    duration: 75,
    price: 260,
    specialistRole: 'Master Aesthetician',
    description: 'A transformative non-invasive face lifting ritual. Our practitioners perform meticulous deep-tissue intra-oral buccal massage to relieve jaw tension, drain lymphatic stagnant fluids, and carve cheekbone definition.',
    highlight: 'Sculpted jawline & tension relief',
    benefits: [
      'Instant lift and definition along jawline and zygomatic arch',
      'Relieves TMJ discomfort and chronic clenching tension',
      'Stimulates micro-circulation for immediate dewy rosy flush'
    ],
    preCare: [
      'Avoid dental work or tooth whitening for 10 days prior',
      'Stop strong exfoliating acids 48 hours before session'
    ],
    postCare: [
      'Drink plenty of warm water with electrolytes to aid lymphatic flushing',
      'Avoid intense sauna or vigorous workout for 12 hours'
    ],
    requiresIntake: true,
    intakeType: 'medical-aesthetic',
  },
  {
    id: 'skin-microneedling-exosome',
    title: 'Medical Microneedling & Exosome Infusion',
    category: 'skin-facials',
    categoryLabel: 'Clinical Aesthetics',
    subtitle: 'Clinical micro-channels saturated with lab-purified bio-signaling exosomes.',
    duration: 60,
    price: 540,
    specialistRole: 'Medical Aesthetician',
    description: 'The golden standard of regenerative cellular aesthetics. Controlled medical microneedling stimulates your natural collagen matrix, followed by clinical application of billions of lyophilized human-derived exosomes for accelerated cellular renewal.',
    highlight: 'Next-gen cellular regeneration & pore refinement',
    benefits: [
      'Reduces acne scars, fine lines, and enlarged pores',
      'Down time reduced by 60% compared to traditional microneedling',
      'Promotes deep structural collagen synthesis'
    ],
    preCare: [
      'Discontinue topical retinoids, AHA/BHA 5 days before',
      'No active sunburn or open blemishes in the target zone'
    ],
    postCare: [
      'No makeup or sweaty exercise for 24 hours',
      'Apply prescribed sterile soothing serum and physical SPF 50+'
    ],
    requiresIntake: true,
    intakeType: 'medical-aesthetic',
  },

  // --- INJECTABLES & LASER (MED SPA) ---
  {
    id: 'injectables-neuromodulator',
    title: 'Bespoke Neuromodulator Micro-Dosing',
    category: 'injectables-laser',
    categoryLabel: 'Medical Injectables',
    subtitle: 'Full facial mapping for softened expressions without frozen immobility.',
    duration: 30,
    price: 380,
    specialistRole: 'Aesthetic Nurse Specialist',
    description: 'Our conservative French-technique philosophy delivers unclockable results. We analyze subtle micro-expressions to gently quiet forehead lines, crow’s feet, and glabella while preserving your natural emotional warmth.',
    highlight: 'French subtle dosing · Untouched natural look',
    benefits: [
      'Relaxes dynamic expression creases seamlessly',
      'Prevents deepening of static wrinkles',
      'Completely natural brow positioning'
    ],
    preCare: [
      'Avoid blood-thinning supplements (Fish oil, Ginkgo, Aspirin, Ibuprofen) for 5 days',
      'Avoid alcohol consumption 24 hours prior to prevent bruising'
    ],
    postCare: [
      'Remain upright for 4 hours post-injection',
      'Do not massage or rub treated areas for 24 hours'
    ],
    requiresIntake: true,
    intakeType: 'medical-aesthetic',
  },
  {
    id: 'laser-clear-brilliant',
    title: 'Clear + Brilliant® Fractional Laser Glow',
    category: 'injectables-laser',
    categoryLabel: 'Laser & Light',
    subtitle: 'Gentle fractional photothermolysis to reverse early photo-aging and boost radiance.',
    duration: 45,
    price: 460,
    specialistRole: 'Laser Aesthetician',
    description: 'A gentle preventive laser treatment that refreshes skin from the inside out. Creates millions of microscopic treatment zones in the upper layers, replacing damaged tissue with healthy, radiant younger skin.',
    highlight: 'Subtle resurfacing · Weekend recovery only',
    benefits: [
      'Noticeably refined skin texture and even tone',
      'Minimizes appearance of enlarged pores and dullness',
      'Enhances topical active skincare penetration'
    ],
    preCare: [
      'Avoid direct sunbathing and self-tanners for 2 weeks prior',
      'Discontinue chemical peels and retinol 7 days prior'
    ],
    postCare: [
      'Apply gentle hydrating barrier balm; expect sandpaper texture for 3-4 days',
      'Strict daily broad-spectrum mineral sunscreen mandatory'
    ],
    requiresIntake: true,
    intakeType: 'medical-aesthetic',
  },

  // --- BODY & WELLNESS ---
  {
    id: 'body-lymph-infrared',
    title: 'Cellular Detox Infrared & Lymph Contouring',
    category: 'body-wellness',
    categoryLabel: 'Body & Wellness',
    subtitle: 'Far-infrared thermal cocoon paired with botanical draining contour wrap.',
    duration: 90,
    price: 285,
    specialistRole: 'Wellness Therapist',
    description: 'A holistic full-body metabolic reset. Begins with dry body brushing, application of magnesium-rich botanical draining oils, followed by a deeply relaxing far-infrared thermal detox cocoon that purifies cellular fluids.',
    highlight: 'Deep metabolic boost & fluid retention release',
    benefits: [
      'Encourages elimination of accumulated toxins and excess fluids',
      'Deep thermal muscular tension relief and relaxation',
      'Leaves full body skin firm, silky, and toned'
    ],
    preCare: [
      'Hydrate with at least 1.5L of water prior to appointment',
      'Eat lightly 2 hours before the thermal ritual'
    ],
    postCare: [
      'Continue drinking generous water with lemon or pink salt',
      'Rest and enjoy the profound calm state'
    ],
    requiresIntake: true,
    intakeType: 'medical-aesthetic',
  }
];

export const ADD_ONS: AddOnOption[] = [
  { id: 'addon-led', name: 'Medical-Grade LED Collagen Light Therapy', duration: 15, price: 55, category: 'skin' },
  { id: 'addon-scalp-acupressure', name: 'Aromatic Scalp & Acupressure Release', duration: 15, price: 45, category: 'all' },
  { id: 'addon-hair-mask', name: 'Deep Botanical Caviar Conditioning Mask', duration: 15, price: 38, category: 'hair' },
  { id: 'addon-eye-contour', name: 'Cryo-Sculpt Eye De-Puffing Treatment', duration: 15, price: 40, category: 'skin' },
  { id: 'addon-hair-gloss', name: 'Express Clear Shine Glaze Finish', duration: 20, price: 65, category: 'hair' },
];
