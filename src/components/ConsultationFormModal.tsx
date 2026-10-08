import React, { useState, useRef, useEffect } from 'react';
import { X, Check, Shield, AlertCircle, FileCheck, Sparkles, Scissors, PenTool, RotateCcw } from 'lucide-react';
import { MedicalAestheticIntakeData, HairScalpIntakeData } from '../types';

interface ConsultationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialType?: 'medical-aesthetic' | 'hair-trichology';
  linkedAppointmentRef?: string;
  onSaveIntake: (type: 'medical-aesthetic' | 'hair-trichology', data: any) => void;
}

export const ConsultationFormModal: React.FC<ConsultationFormModalProps> = ({
  isOpen,
  onClose,
  initialType = 'medical-aesthetic',
  linkedAppointmentRef,
  onSaveIntake,
}) => {
  const [formType, setFormType] = useState<'medical-aesthetic' | 'hair-trichology'>(initialType);
  const [step, setStep] = useState<number>(1);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // Sync initial type when opened
  useEffect(() => {
    if (initialType) {
      setFormType(initialType);
      setStep(1);
      setSubmitted(false);
    }
  }, [initialType, isOpen]);

  // Medical Aesthetic Form State
  const [medData, setMedData] = useState<MedicalAestheticIntakeData>({
    fullName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    emergencyContact: '',
    fitzpatrickSkinType: 'III',
    primarySkinConcerns: ['Fine lines & wrinkles', 'Skin firmness & elasticity'],
    allergies: 'None known',
    currentMedications: 'None',
    hasRetinoidsAccutane: false,
    isPregnantOrNursing: false,
    previousBotoxFillers: true,
    previousFillersDate: 'Approx 8 months ago',
    recentSunExposure: false,
    dailySpfUse: true,
    medicalConditions: [],
    clientConsent: false,
    signatureDate: new Date().toISOString().split('T')[0],
  });

  // Hair & Scalp Form State
  const [hairData, setHairData] = useState<HairScalpIntakeData>({
    fullName: '',
    phone: '',
    email: '',
    hairType: '2B-Wavy',
    hairDensity: 'Medium',
    scalpProfile: 'Normal',
    colorHistory12Months: ['Gloss / Toner'],
    bleachHistory: false,
    heatStylingFrequency: '2-3x/week',
    primaryGoals: ['Hydration & shine', 'Shape definition & volume'],
    productSensitivityNotes: 'None',
    clientConsent: false,
    signatureDate: new Date().toISOString().split('T')[0],
  });

  // Simple signature canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawnSignature, setHasDrawnSignature] = useState(false);

  useEffect(() => {
    if (step === 3 && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#4E273E';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
      }
    }
  }, [step, isOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    setHasDrawnSignature(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = 'touches' in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      setHasDrawnSignature(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let sigUrl = '';
    if (canvasRef.current) {
      sigUrl = canvasRef.current.toDataURL();
    }

    if (formType === 'medical-aesthetic') {
      const payload = { ...medData, signatureDataUrl: sigUrl };
      onSaveIntake('medical-aesthetic', payload);
    } else {
      const payload = { ...hairData, signatureDataUrl: sigUrl };
      onSaveIntake('hair-trichology', payload);
    }
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const skinConcernsOptions = [
    'Fine lines & wrinkles',
    'Hyperpigmentation & sun spots',
    'Loss of elasticity & firmness',
    'Acne & active breakouts',
    'Enlarged pores & congestion',
    'Rosacea & facial redness',
    'Dehydration & dullness',
    'Jaw clenching / TMJ tension'
  ];

  const hairGoalsOptions = [
    'Hydration & shine',
    'Effortless shape memory',
    'Frizz reduction & smoothing',
    'Balayage dimension',
    'Scalp detox & flake relief',
    'Density & hair follicle stimulation',
    'Damage & split end restoration'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#ECE5DC] overflow-hidden my-auto max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-[#FAF8F5] border-b border-[#ECE5DC] p-5 sm:p-6 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-[#8E3B5C]">
                CLINICAL PRACTICE PROTOCOL
              </span>
              {linkedAppointmentRef && (
                <span className="text-[10px] bg-[#FAF0EA] text-[#4E273E] px-2 py-0.5 rounded font-mono font-medium">
                  Ref: {linkedAppointmentRef}
                </span>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-normal text-[#1F1D1B] tracking-tight">
              Patient Consultation & Clinical Intake
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-[#ECE5DC] flex items-center justify-center text-[#78716C] hover:text-[#1F1D1B] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Category Switcher Tabs */}
        {!submitted && (
          <div className="bg-[#F2ECE4] p-1.5 flex gap-1 border-b border-[#ECE5DC] shrink-0">
            <button
              onClick={() => { setFormType('medical-aesthetic'); setStep(1); }}
              className={`flex-1 py-2 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                formType === 'medical-aesthetic'
                  ? 'bg-white text-[#1F1D1B] shadow-sm'
                  : 'text-[#6B635C] hover:text-[#1F1D1B]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8E3B5C]" />
              <span>Medical & Aesthetic Form</span>
            </button>
            <button
              onClick={() => { setFormType('hair-trichology'); setStep(1); }}
              className={`flex-1 py-2 text-xs font-medium rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                formType === 'hair-trichology'
                  ? 'bg-white text-[#1F1D1B] shadow-sm'
                  : 'text-[#6B635C] hover:text-[#1F1D1B]'
              }`}
            >
              <Scissors className="w-3.5 h-3.5 text-[#4E273E]" />
              <span>Hair Atelier & Scalp Intake</span>
            </button>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-7 overflow-y-auto flex-1">
          {submitted ? (
            /* Success confirmation */
            <div className="py-10 text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-[#FAF0EA] border border-[#F2DDD2] flex items-center justify-center text-[#4E273E] mb-4">
                <FileCheck className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-normal text-[#1F1D1B] tracking-tight mb-2">
                Consultation Intake Verified
              </h3>
              <p className="text-sm text-[#6B635C] max-w-md mb-6 leading-relaxed">
                Thank you, <strong>{formType === 'medical-aesthetic' ? medData.fullName || 'Valued Client' : hairData.fullName || 'Valued Client'}</strong>. Your clinical history, safety contraindications, and treatment consent are securely saved and synced with our practitioners.
              </p>
              
              <div className="bg-white border border-[#ECE5DC] rounded-xl p-4 w-full max-w-md text-left text-xs space-y-2 mb-8">
                <div className="flex justify-between py-1 border-b border-[#ECE5DC]/60">
                  <span className="text-[#78716C]">Protocol:</span>
                  <span className="font-medium text-[#1F1D1B]">
                    {formType === 'medical-aesthetic' ? 'Aesthetic Facial & Clinical Med-Spa' : 'Hair Atelier & Trichology'}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#ECE5DC]/60">
                  <span className="text-[#78716C]">Submission Date:</span>
                  <span className="font-mono text-[#1F1D1B]">{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#78716C]">Clinical Status:</span>
                  <span className="text-[#2E7D32] font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Approved for Treatment
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-medium text-white bg-[#1F1D1B] hover:bg-[#4E273E] rounded transition-colors cursor-pointer"
              >
                Close & Return to Sanctuary
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Stepper tracker */}
              <div className="flex items-center justify-between text-xs font-mono text-[#78716C] pb-3 border-b border-[#ECE5DC]">
                <span>STEP {step} OF 3</span>
                <span>
                  {step === 1 && '1. Contact & Baseline Profile'}
                  {step === 2 && (formType === 'medical-aesthetic' ? '2. Clinical Health & Contraindications' : '2. Hair Profile & Chemical History')}
                  {step === 3 && '3. Informed Consent & Digital Signature'}
                </span>
              </div>

              {/* Step 1: Contact Information */}
              {step === 1 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                        Full Legal Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formType === 'medical-aesthetic' ? medData.fullName : hairData.fullName}
                        onChange={(e) => {
                          if (formType === 'medical-aesthetic') {
                            setMedData({ ...medData, fullName: e.target.value });
                          } else {
                            setHairData({ ...hairData, fullName: e.target.value });
                          }
                        }}
                        placeholder="e.g. Camille Laurent"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#4E273E]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formType === 'medical-aesthetic' ? medData.email : hairData.email}
                        onChange={(e) => {
                          if (formType === 'medical-aesthetic') {
                            setMedData({ ...medData, email: e.target.value });
                          } else {
                            setHairData({ ...hairData, email: e.target.value });
                          }
                        }}
                        placeholder="camille@example.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#4E273E]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formType === 'medical-aesthetic' ? medData.phone : hairData.phone}
                        onChange={(e) => {
                          if (formType === 'medical-aesthetic') {
                            setMedData({ ...medData, phone: e.target.value });
                          } else {
                            setHairData({ ...hairData, phone: e.target.value });
                          }
                        }}
                        placeholder="(555) 234-5678"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#4E273E]"
                      />
                    </div>
                    {formType === 'medical-aesthetic' ? (
                      <div>
                        <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                          Date of Birth *
                        </label>
                        <input
                          type="date"
                          required
                          value={medData.dateOfBirth}
                          onChange={(e) => setMedData({ ...medData, dateOfBirth: e.target.value })}
                          className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#4E273E]"
                        />
                      </div>
                    ) : (
                      <div>
                        <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                          Emergency Contact or Note
                        </label>
                        <input
                          type="text"
                          value={hairData.productSensitivityNotes}
                          onChange={(e) => setHairData({ ...hairData, productSensitivityNotes: e.target.value })}
                          placeholder="Allergies to scents or dyes"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#4E273E]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Primary Concerns Selection */}
                  <div className="pt-2">
                    <label className="block text-xs font-medium text-[#44403C] mb-2">
                      {formType === 'medical-aesthetic' ? 'Select Primary Skin & Aesthetic Concerns' : 'Select Primary Hair & Scalp Goals'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(formType === 'medical-aesthetic' ? skinConcernsOptions : hairGoalsOptions).map((option) => {
                        const isSelected = formType === 'medical-aesthetic'
                          ? medData.primarySkinConcerns.includes(option)
                          : hairData.primaryGoals.includes(option);

                        return (
                          <button
                            type="button"
                            key={option}
                            onClick={() => {
                              if (formType === 'medical-aesthetic') {
                                const updated = isSelected
                                  ? medData.primarySkinConcerns.filter(i => i !== option)
                                  : [...medData.primarySkinConcerns, option];
                                setMedData({ ...medData, primarySkinConcerns: updated });
                              } else {
                                const updated = isSelected
                                  ? hairData.primaryGoals.filter(i => i !== option)
                                  : [...hairData.primaryGoals, option];
                                setHairData({ ...hairData, primaryGoals: updated });
                              }
                            }}
                            className={`p-2.5 text-left text-xs rounded-md border transition-all cursor-pointer flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#FAF0EA] border-[#4E273E] text-[#4E273E] font-medium'
                                : 'bg-white border-[#ECE5DC] text-[#6B635C] hover:border-[#D9CFC4]'
                            }`}
                          >
                            <span>{option}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 shrink-0 text-[#4E273E]" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2 text-xs font-medium text-white bg-[#1F1D1B] hover:bg-[#4E273E] rounded transition-colors cursor-pointer"
                    >
                      Continue to Step 2 ↗
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Clinical / Hair Specific Details */}
              {step === 2 && (
                <div className="space-y-5">
                  {formType === 'medical-aesthetic' ? (
                    <>
                      {/* Fitzpatrick Skin Scale Selector */}
                      <div>
                        <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                          Fitzpatrick Skin Phototype (Determines Laser & Peeling Safety)
                        </label>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                          {[
                            { type: 'I', desc: 'Always burns, never tans' },
                            { type: 'II', desc: 'Usually burns, tans with difficulty' },
                            { type: 'III', desc: 'Sometimes burns, gradual tan' },
                            { type: 'IV', desc: 'Rarely burns, tans easily' },
                            { type: 'V', desc: 'Very rarely burns, deep tan' },
                            { type: 'VI', desc: 'Never burns, deeply pigmented' },
                          ].map((item) => (
                            <button
                              type="button"
                              key={item.type}
                              onClick={() => setMedData({ ...medData, fitzpatrickSkinType: item.type as any })}
                              className={`p-2 rounded border text-center transition-all cursor-pointer ${
                                medData.fitzpatrickSkinType === item.type
                                  ? 'bg-[#4E273E] text-white border-[#4E273E]'
                                  : 'bg-white border-[#ECE5DC] text-[#6B635C] hover:border-[#D6CEC4]'
                              }`}
                            >
                              <div className="font-mono font-bold text-xs">Type {item.type}</div>
                              <div className="text-[9px] mt-0.5 opacity-80 leading-tight">{item.desc}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Clinical Contraindications Checklist */}
                      <div className="space-y-3 bg-white p-4 rounded-xl border border-[#ECE5DC]">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                          Safety Contraindications
                        </h4>
                        
                        <label className="flex items-start gap-3 text-xs text-[#44403C] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={medData.hasRetinoidsAccutane}
                            onChange={(e) => setMedData({ ...medData, hasRetinoidsAccutane: e.target.checked })}
                            className="mt-0.5 rounded text-[#4E273E] focus:ring-[#4E273E]"
                          />
                          <span>Have used Accutane / Isotretinoin in past 6 months, or prescription Retin-A / Tretinoin within 5 days</span>
                        </label>

                        <label className="flex items-start gap-3 text-xs text-[#44403C] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={medData.isPregnantOrNursing}
                            onChange={(e) => setMedData({ ...medData, isPregnantOrNursing: e.target.checked })}
                            className="mt-0.5 rounded text-[#4E273E] focus:ring-[#4E273E]"
                          />
                          <span>Currently pregnant or actively breastfeeding</span>
                        </label>

                        <label className="flex items-start gap-3 text-xs text-[#44403C] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={medData.recentSunExposure}
                            onChange={(e) => setMedData({ ...medData, recentSunExposure: e.target.checked })}
                            className="mt-0.5 rounded text-[#4E273E] focus:ring-[#4E273E]"
                          />
                          <span>Direct sunbathing, sunburn, or tanning beds in the last 14 days</span>
                        </label>

                        <label className="flex items-start gap-3 text-xs text-[#44403C] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={medData.previousBotoxFillers}
                            onChange={(e) => setMedData({ ...medData, previousBotoxFillers: e.target.checked })}
                            className="mt-0.5 rounded text-[#4E273E] focus:ring-[#4E273E]"
                          />
                          <span>Have had injectable treatments (Botox, Dysport, or Dermal fillers) in the past 12 months</span>
                        </label>
                      </div>

                      {/* Known Allergies */}
                      <div>
                        <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                          Known Allergies or Drug Sensitivities (Latex, Lidocaine, etc.)
                        </label>
                        <input
                          type="text"
                          value={medData.allergies}
                          onChange={(e) => setMedData({ ...medData, allergies: e.target.value })}
                          placeholder="e.g., Lidocaine topical allergy, none"
                          className="w-full px-3.5 py-2.5 bg-white border border-[#D6CEC4] rounded-md text-xs sm:text-sm focus:outline-none focus:border-[#4E273E]"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Hair Type & Texture Matrix */}
                      <div>
                        <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                          Natural Hair Wave Pattern
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { id: '1A-Straight', label: 'Straight (1A-1C)', detail: 'Fine or pin-straight' },
                            { id: '2B-Wavy', label: 'Wavy (2A-2C)', detail: 'S-pattern waves' },
                            { id: '3B-Curly', label: 'Curly (3A-3C)', detail: 'Springy ringlets' },
                            { id: '4C-Coily', label: 'Coily (4A-4C)', detail: 'Tight zigzag coils' },
                          ].map((item) => (
                            <button
                              type="button"
                              key={item.id}
                              onClick={() => setHairData({ ...hairData, hairType: item.id as any })}
                              className={`p-2.5 rounded border text-left transition-all cursor-pointer ${
                                hairData.hairType === item.id
                                  ? 'bg-[#4E273E] text-white border-[#4E273E]'
                                  : 'bg-white border-[#ECE5DC] text-[#6B635C] hover:border-[#D6CEC4]'
                              }`}
                            >
                              <div className="font-medium text-xs">{item.label}</div>
                              <div className="text-[10px] opacity-75">{item.detail}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Scalp Profile */}
                      <div>
                        <label className="block text-xs font-medium text-[#44403C] mb-1.5">
                          Current Scalp Profile (For Japanese Scalp Spa calibration)
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {['Normal', 'Dry/Flaky', 'Oily', 'Sensitive', 'Thinning'].map((profile) => (
                            <button
                              type="button"
                              key={profile}
                              onClick={() => setHairData({ ...hairData, scalpProfile: profile as any })}
                              className={`p-2 rounded border text-center text-xs transition-all cursor-pointer ${
                                hairData.scalpProfile === profile
                                  ? 'bg-[#1F1D1B] text-white border-[#1F1D1B]'
                                  : 'bg-white border-[#ECE5DC] text-[#6B635C] hover:border-[#D6CEC4]'
                              }`}
                            >
                              {profile}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Chemical and Color History */}
                      <div className="bg-white p-4 rounded-xl border border-[#ECE5DC] space-y-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#78716C]">
                          Chemical & Processing History
                        </h4>
                        <label className="flex items-center gap-3 text-xs text-[#44403C] cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hairData.bleachHistory}
                            onChange={(e) => setHairData({ ...hairData, bleachHistory: e.target.checked })}
                            className="rounded text-[#4E273E]"
                          />
                          <span>Lightened / Bleached hair in the past 12 months</span>
                        </label>
                        <div>
                          <label className="block text-[11px] text-[#78716C] mb-1">
                            Heat styling frequency:
                          </label>
                          <div className="flex gap-2">
                            {['Daily', '2-3x/week', 'Rarely', 'Never'].map((freq) => (
                              <button
                                type="button"
                                key={freq}
                                onClick={() => setHairData({ ...hairData, heatStylingFrequency: freq as any })}
                                className={`px-3 py-1 text-xs rounded border transition-all ${
                                  hairData.heatStylingFrequency === freq
                                    ? 'bg-[#FAF0EA] border-[#4E273E] text-[#4E273E] font-medium'
                                    : 'bg-white border-[#ECE5DC] text-[#6B635C]'
                                }`}
                              >
                                {freq}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-medium text-[#6B635C] bg-white border border-[#ECE5DC] rounded hover:bg-[#FAF8F5]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2 text-xs font-medium text-white bg-[#1F1D1B] hover:bg-[#4E273E] rounded transition-colors cursor-pointer"
                    >
                      Continue to Consent & Signature ↗
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Consent & Digital Signature */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl border border-[#ECE5DC] text-xs text-[#57534E] leading-relaxed max-h-40 overflow-y-auto space-y-2">
                    <p className="font-semibold text-[#1F1D1B]">
                      Informed Treatment Consent & Clinical Agreement
                    </p>
                    <p>
                      I confirm that all information provided in this clinical consultation intake is accurate and complete. I understand that aesthetic treatments, scalp trichology rituals, chemical smoothing, and skin therapies carry individualized response rates.
                    </p>
                    <p>
                      I agree to notify my practitioner immediately of any changes to my medications, medical conditions, or topical skincare regimen. I authorize Aurélle to maintain this confidential record in accordance with patient privacy standards.
                    </p>
                  </div>

                  <label className="flex items-start gap-3 text-xs text-[#1F1D1B] font-medium cursor-pointer bg-[#FAF0EA] p-3 rounded-lg border border-[#F2DDD2]">
                    <input
                      type="checkbox"
                      required
                      checked={formType === 'medical-aesthetic' ? medData.clientConsent : hairData.clientConsent}
                      onChange={(e) => {
                        if (formType === 'medical-aesthetic') {
                          setMedData({ ...medData, clientConsent: e.target.checked });
                        } else {
                          setHairData({ ...hairData, clientConsent: e.target.checked });
                        }
                      }}
                      className="mt-0.5 rounded text-[#4E273E] focus:ring-[#4E273E]"
                    />
                    <span>
                      I have read, understood, and agreed to the clinical consent terms and pre/post treatment guidance. *
                    </span>
                  </label>

                  {/* Digital Signature Pad */}
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#78716C] mb-1.5">
                      <span className="flex items-center gap-1.5 font-medium text-[#44403C]">
                        <PenTool className="w-3.5 h-3.5 text-[#8E3B5C]" />
                        <span>Draw Digital Signature (Mouse or Touch)</span>
                      </span>
                      <button
                        type="button"
                        onClick={clearSignature}
                        className="text-[11px] text-[#78716C] hover:text-[#1F1D1B] flex items-center gap-1 cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Clear pad</span>
                      </button>
                    </div>

                    <div className="border border-[#D6CEC4] rounded-lg bg-white overflow-hidden shadow-inner">
                      <canvas
                        ref={canvasRef}
                        width={580}
                        height={120}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={startDrawing}
                        onTouchMove={draw}
                        onTouchEnd={stopDrawing}
                        className="w-full h-28 cursor-crosshair touch-none"
                      />
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-[#A8A29E] mt-1 font-mono">
                      <span>Date: {new Date().toLocaleDateString()}</span>
                      <span>Encrypted Clinical Signature Record</span>
                    </div>
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs font-medium text-[#6B635C] bg-white border border-[#ECE5DC] rounded hover:bg-[#FAF8F5]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={!(formType === 'medical-aesthetic' ? medData.clientConsent : hairData.clientConsent)}
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-[#4E273E] hover:bg-[#37182A] disabled:opacity-50 disabled:pointer-events-none rounded transition-colors shadow cursor-pointer"
                    >
                      Verify & Submit Consultation Form ↗
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
