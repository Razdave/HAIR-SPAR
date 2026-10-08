import { Specialist } from '../types';

export const SPECIALISTS: Specialist[] = [
  {
    id: 'spec-chantal',
    name: 'Chantal Moreau',
    role: 'Creative Director & Master Stylist',
    department: 'Hair Atelier',
    bio: 'Trained in Paris and London, Chantal specializes in effortless French architecture cuts and custom balayage contouring that grows out seamlessly.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    specialties: ['Couture Haircuts', 'French Balayage', 'Silk Smoothing Glazes'],
    availability: ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM'],
  },
  {
    id: 'spec-marcus',
    name: 'Marcus Thorne',
    role: 'Clinical Trichologist & Scalp Specialist',
    department: 'Trichology',
    bio: 'Certified clinical trichologist dedicated to follicular restoration, microscopic scalp analysis, and Japanese hydro-steam therapeutic head spas.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    specialties: ['Japanese Scalp Spa', 'Follicle Imaging', 'Scalp Barrier Reset'],
    availability: ['09:30 AM', '11:00 AM', '01:30 PM', '03:30 PM'],
  },
  {
    id: 'spec-elena',
    name: 'Dr. Elena Vance, MD',
    role: 'Medical Aesthetics Director',
    department: 'Dermatology',
    bio: 'Board-certified physician with a conservative, anatomically guided ethos. Master of natural facial harmony and micro-dosed neurotoxins.',
    avatar: 'https://images.unsplash.com/photo-1594824813633-8208f0a9bf6f?auto=format&fit=crop&w=300&q=80',
    specialties: ['Subtle Neuromodulators', 'Dermal Restoration', 'Clinical Consultations'],
    availability: ['10:00 AM', '12:00 PM', '02:30 PM', '04:30 PM'],
  },
  {
    id: 'spec-chloe',
    name: 'Chloe Saint-Laurent',
    role: 'Master Aesthetician & Buccal Specialist',
    department: 'Med Spa',
    bio: 'Specialized in European intra-oral buccal lifting massage, advanced microneedling, and cellular regenerative skin health.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    specialties: ['Buccal Sculpting', 'Exosome Microneedling', 'Clear + Brilliant'],
    availability: ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'],
  },
  {
    id: 'spec-julia',
    name: 'Julia Romero, BSN, RN',
    role: 'Senior Aesthetic Nurse Injector',
    department: 'Med Spa',
    bio: 'Registered nurse specializing in gentle laser therapies, skin barrier strengthening, and targeted wrinkle prevention.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    specialties: ['Fractional Laser', 'Light Therapy', 'Collagen Stimulation'],
    availability: ['10:30 AM', '01:00 PM', '03:30 PM'],
  }
];
