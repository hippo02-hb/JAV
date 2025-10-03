import { projectId, publicAnonKey } from "./supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-68e7fa3d`;

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

export class ContactAPI {
  // Send contact message
  static async sendContactMessage(message: ContactMessage): Promise<{ data: any | null; error: string | null }> {
    try {
      const response = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(message)
      });

      if (!response.ok) {
        // Simulate successful submission for demo
        console.log('Contact message sent (mock):', message);
        return {
          data: { id: Date.now().toString(), status: 'pending' },
          error: null
        };
      }

      const data = await response.json();
      return { data: data.message, error: null };
    } catch (error) {
      console.log('Contact message sent (mock):', message);
      // Return success for demo purposes
      return {
        data: { id: Date.now().toString(), status: 'pending' },
        error: null
      };
    }
  }

  // Get FAQs
  static async getFAQs(): Promise<{ data: FAQ[] | null; error: string | null }> {
    try {
      const response = await fetch(`${API_BASE}/faqs`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        // Return mock data if API is not available
        return {
          data: this.getMockFAQs(),
          error: null
        };
      }

      const data = await response.json();
      return { data: data.faqs || [], error: null };
    } catch (error) {
      console.log('Using mock data for FAQs');
      return {
        data: this.getMockFAQs(),
        error: null
      };
    }
  }

  // Get FAQs by category
  static async getFAQsByCategory(category: string): Promise<{ data: FAQ[] | null; error: string | null }> {
    try {
      const { data: allFAQs, error } = await this.getFAQs();
      if (error || !allFAQs) {
        return { data: null, error };
      }

      const filtered = allFAQs.filter(faq => faq.category === category);
      return { data: filtered, error: null };
    } catch (error) {
      console.error('Get FAQs by category error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get FAQs' };
    }
  }

  // Subscribe to newsletter
  static async subscribeNewsletter(subscription: NewsletterSubscription): Promise<{ data: any | null; error: string | null }> {
    try {
      const response = await fetch(`${API_BASE}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(subscription)
      });

      if (!response.ok) {
        // Simulate successful subscription for demo
        console.log('Newsletter subscription (mock):', subscription);
        return {
          data: { success: true, message: 'Subscribed successfully' },
          error: null
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error) {
      console.log('Newsletter subscription (mock):', subscription);
      // Return success for demo purposes
      return {
        data: { success: true, message: 'Subscribed successfully' },
        error: null
      };
    }
  }

  // Get company info
  static async getCompanyInfo(): Promise<{ data: any | null; error: string | null }> {
    try {
      const response = await fetch(`${API_BASE}/company/info`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        // Return mock data if API is not available
        return {
          data: this.getMockCompanyInfo(),
          error: null
        };
      }

      const data = await response.json();
      return { data: data.company, error: null };
    } catch (error) {
      console.log('Using mock data for company info');
      return {
        data: this.getMockCompanyInfo(),
        error: null
      };
    }
  }

  // Mock data for development
  private static getMockFAQs(): FAQ[] {
    return [
      {
        id: "faq-1",
        question: "Khóa học tiếng Nhật N5 kéo dài bao lâu?",
        answer: "Khóa học N5 kéo dài 3 tháng với 3 buổi/tuần, mỗi buổi 2 tiếng. Tổng cộng khoảng 72 tiếng học.",
        category: "courses",
        order: 1,
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z"
      },
      {
        id: "faq-2",
        question: "Tôi có thể học online hay chỉ offline?",
        answer: "Chúng tôi cung cấp cả hai hình thức học online và offline. Bạn có thể chọn hình thức phù hợp với lịch trình của mình.",
        category: "general",
        order: 2,
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z"
      },
      {
        id: "faq-3",
        question: "Học phí có bao gồm tài liệu học tập không?",
        answer: "Có, học phí đã bao gồm tất cả tài liệu học tập, bài tập, và quyền truy cập vào hệ thống học online.",
        category: "payment",
        order: 3,
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z"
      },
      {
        id: "faq-4",
        question: "Có hỗ trợ tư vấn việc làm sau khi học xong không?",
        answer: "Có, chúng tôi có dịch vụ tư vấn nghề nghiệp và giới thiệu việc làm tại các công ty Nhật Bản cho học viên xuất sắc.",
        category: "services",
        order: 4,
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z"
      },
      {
        id: "faq-5",
        question: "Tôi có thể hoàn tiền nếu không hài lòng không?",
        answer: "Có, chúng tôi có chính sách hoàn tiền trong vòng 7 ngày đầu nếu bạn không hài lòng với chất lượng khóa học.",
        category: "payment",
        order: 5,
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z"
      },
      {
        id: "faq-6",
        question: "Làm sao để đăng ký khóa học?",
        answer: "Bạn có thể đăng ký trực tiếp trên website, qua điện thoại, hoặc đến trực tiếp văn phòng của chúng tôi để được tư vấn chi tiết.",
        category: "registration",
        order: 6,
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z"
      },
      {
        id: "faq-7",
        question: "Có cần kiến thức nền tảng để học tiếng Nhật không?",
        answer: "Không cần. Khóa N5 dành cho người mới bắt đầu hoàn toàn. Chúng tôi sẽ dạy từ cơ bản nhất.",
        category: "courses",
        order: 7,
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z"
      },
      {
        id: "faq-8",
        question: "Có lớp học thử không?",
        answer: "Có, chúng tôi có buổi học thử miễn phí để bạn trải nghiệm phương pháp giảng dạy trước khi đăng ký.",
        category: "general",
        order: 8,
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z"
      }
    ];
  }

  private static getMockCompanyInfo() {
    return {
      name: "Tiếng Nhật Quang Dũng Online",
      shortName: "TNQDO",
      slogan: "Nơi kiến thức giao thoa, nơi cơ hội thăng tiến",
      vision: "Học là phải vui!",
      address: "123 Đường ABC, Quận 1, TP.HCM",
      phone: "+84 123 456 789",
      email: "contact@tnqdo.com",
      website: "https://tnqdo.com",
      workingHours: {
        weekdays: "8:00 - 21:00",
        saturday: "8:00 - 18:00",
        sunday: "Nghỉ"
      },
      socialMedia: {
        facebook: "https://facebook.com/tnqdo",
        youtube: "https://youtube.com/@tnqdo",
        zalo: "https://zalo.me/tnqdo"
      },
      parentCompany: "Otaku Online Group",
      established: "2020",
      studentsCount: 5000,
      coursesCount: 9,
      teachersCount: 3
    };
  }
}