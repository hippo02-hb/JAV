// Central API client that combines all API services
export { CoursesAPI } from './courses-api';
export { TeachersAPI } from './teachers-api';
export { ContactAPI } from './contact-api';
export { AdminAPI } from './admin-api';

// Re-export all types
export type {
  Course,
  CourseDetail
} from './courses-api';

export type {
  Teacher,
  TeacherDetail
} from './teachers-api';

export type {
  ContactMessage,
  FAQ,
  NewsletterSubscription
} from './contact-api';

export type {
  AdminCourse,
  AdminUser
} from './admin-api';

// API utilities
export class APIClient {
  // Generic error handler
  static handleError(error: any): string {
    if (typeof error === 'string') {
      return error;
    }
    
    if (error?.message) {
      return error.message;
    }
    
    if (error?.error) {
      return error.error;
    }
    
    return 'Đã có lỗi xảy ra. Vui lòng thử lại sau.';
  }

  // Check if API is available
  static async checkAPIHealth(): Promise<boolean> {
    try {
      // This would typically ping a health endpoint
      // For now, we'll assume API is available if we can make requests
      return true;
    } catch (error) {
      console.warn('API health check failed, using mock data');
      return false;
    }
  }

  // Format Vietnamese currency
  static formatCurrency(amount: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  }

  // Format date for Vietnamese locale
  static formatDate(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(dateObj);
  }

  // Format relative time
  static formatRelativeTime(date: string | Date): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return 'vừa xong';
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
      return `${diffInMinutes} phút trước`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
      return `${diffInHours} giờ trước`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
      return `${diffInDays} ngày trước`;
    }

    return this.formatDate(dateObj);
  }

  // Validate email
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate Vietnamese phone number
  static isValidPhoneNumber(phone: string): boolean {
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // Create pagination params
  static createPaginationParams(page: number = 1, limit: number = 10) {
    return {
      page,
      limit,
      offset: (page - 1) * limit
    };
  }

  // Cache management for better performance
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  static setCache(key: string, data: any, ttlMinutes: number = 5) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    });
  }

  static getCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  static clearCache(pattern?: string) {
    if (pattern) {
      for (const key of this.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }
}
