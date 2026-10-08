export type ServiceCategory = 'all' | 'skin-facials' | 'injectables-laser' | 'hair-salon' | 'body-wellness';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'skin-facials' | 'injectables-laser' | 'hair-salon' | 'body-wellness';
  categoryLabel: string;
  subtitle: string;
  duration: number; // minutes
  price: number;
  specialistRole: string;
  description: string;
  highlight: string;
  benefits: string[];
  preCare: string[];
  postCare: string[];
  requiresIntake: boolean;
  intakeType: 'medical-aesthetic' | 'hair-trichology';
}

export interface Specialist {
  id: string;
  name: string;
  role: string;
  department: 'Med Spa' | 'Hair Atelier' | 'Dermatology' | 'Trichology';
  bio: string;
  avatar: string;
  specialties: string[];
  availability: string[];
}

export interface AddOnOption {
  id: string;
  name: string;
  duration: number;
  price: number;
  category: 'all' | 'hair' | 'skin';
}

export interface AppointmentRecord {
  id: string;
  referenceNumber: string;
  serviceId: string;
  serviceName: string;
  serviceCategory: string;
  specialistId: string;
  specialistName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:30 AM"
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientNotes?: string;
  addOns: AddOnOption[];
  totalPrice: number;
  totalDuration: number;
  intakeStatus: 'pending' | 'completed';
  createdAt: string;
}

export interface MedicalAestheticIntakeData {
  fullName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  emergencyContact: string;
  fitzpatrickSkinType: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI';
  primarySkinConcerns: string[];
  allergies: string;
  currentMedications: string;
  hasRetinoidsAccutane: boolean;
  isPregnantOrNursing: boolean;
  previousBotoxFillers: boolean;
  previousFillersDate?: string;
  recentSunExposure: boolean;
  dailySpfUse: boolean;
  medicalConditions: string[];
  clientConsent: boolean;
  signatureDate: string;
  signatureDataUrl?: string;
}

export interface HairScalpIntakeData {
  fullName: string;
  phone: string;
  email: string;
  hairType: '1A-Straight' | '2B-Wavy' | '3B-Curly' | '4C-Coily' | 'Other';
  hairDensity: 'Fine' | 'Medium' | 'Dense';
  scalpProfile: 'Normal' | 'Dry/Flaky' | 'Oily' | 'Sensitive' | 'Thinning';
  colorHistory12Months: string[];
  bleachHistory: boolean;
  heatStylingFrequency: 'Daily' | '2-3x/week' | 'Rarely' | 'Never';
  primaryGoals: string[];
  productSensitivityNotes: string;
  clientConsent: boolean;
  signatureDate: string;
  signatureDataUrl?: string;
}
