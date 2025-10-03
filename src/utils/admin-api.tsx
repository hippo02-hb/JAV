import { Course, CourseDetail } from "./courses-api";
import { LocalStorageService } from "./local-storage";
import { AdminAuth } from "./admin-auth";
import { eventBus, EVENTS } from "./event-bus";



export interface AdminCourse extends CourseDetail {
  studentsCount?: number;
  completionRate?: number;
  averageRating?: number;
  revenue?: number;
  lastUpdated?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: 'student' | 'teacher' | 'admin';
  status: 'active' | 'inactive' | 'suspended';
  enrolledCourses: number;
  completedCourses: number;
  createdAt: string;
  lastLogin?: string;
}

export class AdminAPI {
  // Check if user is admin
  static async checkAdminAccess(): Promise<{ isAdmin: boolean; error?: string }> {
    try {
      const isAdmin = AdminAuth.isAuthenticated();
      return { isAdmin, error: isAdmin ? undefined : 'Not authenticated' };
    } catch (error) {
      return { isAdmin: false, error: 'Authentication check failed' };
    }
  }

  // Course Management
  static async createCourse(courseData: Partial<CourseDetail>): Promise<{ data: Course | null; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        console.error('Create course failed: Not authenticated');
        return { data: null, error: 'Not authenticated' };
      }

      console.log('Creating course with data:', courseData);
      
      // Create course using LocalStorageService
      const newCourse = LocalStorageService.addCourse(courseData);
      
      console.log('Course created successfully:', newCourse);
      
      // Convert to Course type for response
      const courseResponse: Course = {
        id: newCourse.id,
        name: newCourse.name,
        level: newCourse.level,
        description: newCourse.description,
        duration: newCourse.duration,
        price: newCourse.price,
        image: newCourse.image,
        features: newCourse.features,
        isActive: newCourse.isActive,
        createdAt: newCourse.createdAt
      };
      
      // Emit event to notify other components
      eventBus.emit(EVENTS.COURSE_CREATED, courseResponse);
      eventBus.emit(EVENTS.COURSES_UPDATED);
      
      console.log('Total courses after creation:', LocalStorageService.getAllCourses().length);
      
      return { data: courseResponse, error: null };
    } catch (error) {
      console.error('Error creating course:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to create course' };
    }
  }

  static async updateCourse(courseId: string, courseData: Partial<CourseDetail>): Promise<{ data: Course | null; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      // Update course using LocalStorageService
      const updatedCourse = LocalStorageService.updateCourse(courseId, courseData);
      
      if (!updatedCourse) {
        return { data: null, error: 'Course not found' };
      }
      
      // Convert to Course type for response
      const courseResponse: Course = {
        id: updatedCourse.id,
        name: updatedCourse.name,
        level: updatedCourse.level,
        description: updatedCourse.description,
        duration: updatedCourse.duration,
        price: updatedCourse.price,
        image: updatedCourse.image,
        features: updatedCourse.features,
        isActive: updatedCourse.isActive,
        createdAt: updatedCourse.createdAt
      };
      
      // Emit event to notify other components
      eventBus.emit(EVENTS.COURSE_UPDATED, courseResponse);
      eventBus.emit(EVENTS.COURSES_UPDATED);
      
      return { data: courseResponse, error: null };
    } catch (error) {
      console.error('Error updating course:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to update course' };
    }
  }

  static async deleteCourse(courseId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { success: false, error: 'Not authenticated' };
      }

      // Delete course using LocalStorageService
      const success = LocalStorageService.deleteCourse(courseId);
      
      if (success) {
        // Emit event to notify other components
        eventBus.emit(EVENTS.COURSE_DELETED, courseId);
        eventBus.emit(EVENTS.COURSES_UPDATED);
      }
      
      return { 
        success, 
        error: success ? null : 'Course not found or could not be deleted' 
      };
    } catch (error) {
      console.error('Error deleting course:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Failed to delete course' };
    }
  }

  // Get detailed course info for admin
  static async getAdminCourseDetail(courseId: string): Promise<{ data: AdminCourse | null; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      // Get course from LocalStorageService
      const course = LocalStorageService.getCourseById(courseId);
      
      if (!course) {
        return { data: null, error: 'Course not found' };
      }

      // Convert to AdminCourse with additional mock analytics data
      const adminCourse: AdminCourse = {
        ...course,
        studentsCount: Math.floor(Math.random() * 500) + 100, // Mock data
        completionRate: Math.floor(Math.random() * 30) + 70, // 70-100%
        averageRating: Math.round((Math.random() * 1 + 4) * 10) / 10, // 4.0-5.0
        revenue: course.price * (Math.floor(Math.random() * 100) + 50), // Mock revenue
        lastUpdated: new Date().toISOString()
      };

      return { data: adminCourse, error: null };
    } catch (error) {
      console.error('Error getting admin course detail:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get course detail' };
    }
  }

  // User Management
  static async getAllUsers(page: number = 1, limit: number = 20): Promise<{ data: AdminUser[] | null; error: string | null; total?: number }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      // Return mock users data for now
      return {
        data: this.getMockUsers(),
        error: null,
        total: 150
      };
    } catch (error) {
      console.error('Error getting users:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get users' };
    }
  }

  static async updateUserStatus(userId: string, status: 'active' | 'inactive' | 'suspended'): Promise<{ success: boolean; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { success: false, error: 'Not authenticated' };
      }

      // Mock successful update for now
      console.log('User status update:', { userId, status });
      return { success: true, error: null };
    } catch (error) {
      console.error('Error updating user status:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Failed to update user status' };
    }
  }

  // System Settings
  static async getSystemSettings(): Promise<{ data: any | null; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      return { data: this.getMockSystemSettings(), error: null };
    } catch (error) {
      console.error('Error getting system settings:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get system settings' };
    }
  }

  static async updateSystemSettings(settings: any): Promise<{ success: boolean; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { success: false, error: 'Not authenticated' };
      }

      // Mock successful update for now
      console.log('System settings update:', settings);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error updating system settings:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Failed to update system settings' };
    }
  }

  // Mock data generators

  private static getMockUsers(): AdminUser[] {
    return [
      {
        id: "user-1",
        email: "nguyen.van.a@email.com",
        fullName: "Nguyễn Văn A",
        phone: "0123456789",
        role: "student",
        status: "active",
        enrolledCourses: 2,
        completedCourses: 1,
        createdAt: "2024-01-15T00:00:00Z",
        lastLogin: "2024-10-01T10:30:00Z"
      },
      {
        id: "user-2",
        email: "tran.thi.b@email.com",
        fullName: "Trần Thị B",
        phone: "0987654321",
        role: "student",
        status: "active",
        enrolledCourses: 1,
        completedCourses: 0,
        createdAt: "2024-02-20T00:00:00Z",
        lastLogin: "2024-09-30T14:20:00Z"
      }
    ];
  }

  private static getMockSystemSettings() {
    return {
      siteName: "Tiếng Nhật Quang Dũng Online",
      siteDescription: "Trung tâm dạy tiếng Nhật trực tuyến hàng đầu",
      contactEmail: "contact@tnqdo.com",
      contactPhone: "+84 123 456 789",
      allowRegistration: true,
      maintenanceMode: false,
      maxStudentsPerCourse: 50,
      defaultCoursePrice: 1500000,
      emailNotifications: true,
      autoBackup: true
    };
  }
}