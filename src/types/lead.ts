export interface LeadPayload {
  name: string;
  phone: string;
  email: string;
  city: string;
  practiceArea: string;
  message: string;
  consent: boolean;
  /** Campo honeypot: deve chegar vazio. Preenchido = bot. */
  website?: string;
}

export interface LeadResponse {
  success: boolean;
  message: string;
}
