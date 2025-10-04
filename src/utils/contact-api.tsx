import { supabase } from '../lib/supabase';

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt?: string;
  status?: 'pending' | 'processing' | 'resolved';
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
  isActive: boolean;
  createdAt: string;
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
  subscribedAt?: string;
  isActive?: boolean;
}

export interface CompanyInfo {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
}

export class ContactAPI {
  static async sendContactMessage(message: ContactMessage): Promise<{ data: any | null; error: string | null }> {
    try {
      console.log('Contact message sent:', message);
      return {
        data: { id: Date.now().toString(), status: 'pending' },
        error: null
      };
    } catch (error) {
      console.error('Error sending contact message:', error);
      return { data: null, error: 'Failed to send message' };
    }
  }

  static async getFAQs(): Promise<{ data: FAQ[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('is_active', true)
        .order('order', { ascending: true });

      if (error) throw error;

      const faqs: FAQ[] = (data || []).map(faq => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: faq.order,
        isActive: faq.is_active,
        createdAt: faq.created_at
      }));

      return { data: faqs, error: null };
    } catch (error) {
      console.error('Error getting FAQs:', error);
      return { data: [], error: 'Failed to get FAQs' };
    }
  }

  static async getFAQsByCategory(category: string): Promise<{ data: FAQ[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .eq('category', category)
        .eq('is_active', true)
        .order('order', { ascending: true });

      if (error) throw error;

      const faqs: FAQ[] = (data || []).map(faq => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        order: faq.order,
        isActive: faq.is_active,
        createdAt: faq.created_at
      }));

      return { data: faqs, error: null };
    } catch (error) {
      console.error('Error getting FAQs by category:', error);
      return { data: [], error: 'Failed to get FAQs' };
    }
  }

  static async subscribeNewsletter(subscription: NewsletterSubscription): Promise<{ data: any | null; error: string | null }> {
    try {
      console.log('Newsletter subscription:', subscription);
      return {
        data: { email: subscription.email, status: 'subscribed' },
        error: null
      };
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      return { data: null, error: 'Failed to subscribe' };
    }
  }

  static async getCompanyInfo(): Promise<{ data: CompanyInfo | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('company_info')
        .select('*')
        .single();

      if (error) throw error;
      if (!data) return { data: null, error: 'Company info not found' };

      const companyInfo: CompanyInfo = {
        id: data.id,
        name: data.name,
        description: data.description,
        address: data.address,
        phone: data.phone,
        email: data.email,
        website: data.website,
        socialLinks: data.social_links || {}
      };

      return { data: companyInfo, error: null };
    } catch (error) {
      console.error('Error getting company info:', error);
      return { data: null, error: 'Failed to get company info' };
    }
  }
}
