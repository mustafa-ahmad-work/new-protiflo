export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  budget: string;
  timeline: string;
  subject: string;
  message: string;
}

export interface ContactApiPayload {
  name: string;
  email: string;
  phone?: string;
  serviceType?: string;
  budget?: string;
  timeline?: string;
  subject?: string;
  message: string;
}

export interface ContactApiResponse {
  success?: boolean;
  simulated?: boolean;
  message?: string;
  error?: string;
  data?: unknown;
  details?: unknown;
}
