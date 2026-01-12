export interface Appointment {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'archived';
}

export enum ServiceType {
  GENERAL_CONSULTATION = 'General Consultation',
  PEDIATRICS = 'Pediatrics',
  CARDIOLOGY = 'Cardiology',
  DERMATOLOGY = 'Dermatology',
  CHRONIC_CARE = 'Chronic Disease Management',
  EMERGENCY = 'Emergency Care'
}

export const SERVICE_OPTIONS = [
  { value: 'general', label: 'General Consultation (సాధారణ సమాలోచన)' },
  { value: 'pediatrics', label: 'Pediatrics (చిన్నపిల్లల వైద్యం)' },
  { value: 'cardiology', label: 'Cardiology (గుండె సంబంధిత)' },
  { value: 'dermatology', label: 'Dermatology (చర్మ సంబంధిత)' },
  { value: 'chronic', label: 'Chronic Disease Management (దీర్ఘకాలిక వ్యాధులు)' },
  { value: 'emergency', label: 'Emergency Care (అత్యవసర చికిత్స)' },
];