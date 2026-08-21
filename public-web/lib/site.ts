import { backendGet } from '@/lib/backend';

export type SiteContent = {
  brand: {
    name: string;
    tagline: string;
    heroNote: string;
  };
  menuNote: string;
  about: {
    title: string;
    paragraphs: string[];
    features: {
      icon: string;
      title: string;
      text: string;
    }[];
  };
};

export type Contact = {
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
  hours: {
    day: string;
    time: string;
  }[];
  whatsapp: {
    enabled: boolean;
    number: string | null;
    prefill: string;
  };
  socialLinks: {
    platform: string;
    url: string;
  }[];
};

const buildContentFallback: SiteContent = {
  brand: {
    name: 'Kirikopi',
    tagline: 'Slow coffee. Warm bakes. Good company.',
    heroNote: 'A neighbourhood coffee house in the heart of Colombo.'
  },
  menuNote: 'Prices in Sri Lankan Rupees.',
  about: {
    title: 'Our little story',
    paragraphs: [],
    features: []
  }
};

const buildContactFallback: Contact = {
  address: '',
  phone: '',
  email: '',
  mapEmbedUrl: '',
  hours: [],
  whatsapp: {
    enabled: false,
    number: null,
    prefill: ''
  },
  socialLinks: []
};

export function getSiteContent(): Promise<SiteContent> {
  return backendGet('/api/v1/content/site', buildContentFallback);
}

export function getContact(): Promise<Contact> {
  return backendGet('/api/v1/contact', buildContactFallback);
}

export function whatsappHref(
  whatsapp: Contact['whatsapp']
): string | null {
  if (!whatsapp.enabled || !whatsapp.number) {
    return null;
  }

  const number = whatsapp.number.replace(/\D/g, '');

  if (!number) {
    return null;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(
    whatsapp.prefill
  )}`;
}