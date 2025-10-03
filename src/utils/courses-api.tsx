import { LocalStorageService } from "./local-storage";

export interface Course {
  id: string;
  name: string;
  level: string;
  description: string;
  duration: string;
  price: number;
  image: string;
  features: string[];
  isActive: boolean;
  createdAt: string;
}

export interface CourseDetail extends Course {
  syllabus: {
    week: number;
    topic: string;
    content: string[];
  }[];
  requirements: string[];
  outcomes: string[];
}

export class CoursesAPI {
  // Get all courses
  static async getAllCourses(): Promise<{ data: Course[] | null; error: string | null }> {
    try {
      const courses = LocalStorageService.getAllCourses();
      const simpleCourses: Course[] = courses.map(course => ({
        id: course.id,
        name: course.name,
        level: course.level,
        description: course.description,
        duration: course.duration,
        price: course.price,
        image: course.image,
        features: course.features,
        isActive: course.isActive,
        createdAt: course.createdAt
      }));
      
      return { data: simpleCourses, error: null };
    } catch (error) {
      console.error('Error getting courses:', error);
      return { data: [], error: 'Failed to get courses' };
    }
  }

  // Get course by ID
  static async getCourseById(courseId: string): Promise<{ data: CourseDetail | null; error: string | null }> {
    try {
      const course = LocalStorageService.getCourseById(courseId);
      return {
        data: course,
        error: course ? null : 'Course not found'
      };
    } catch (error) {
      console.error('Error getting course by ID:', error);
      return { data: null, error: 'Failed to get course' };
    }
  }

  // Get featured courses
  static async getFeaturedCourses(): Promise<{ data: Course[] | null; error: string | null }> {
    try {
      const featured = LocalStorageService.getFeaturedCourses();
      return { data: featured, error: null };
    } catch (error) {
      console.error('Get featured courses error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get featured courses' };
    }
  }

  // Search courses
  static async searchCourses(query: string, level?: string): Promise<{ data: Course[] | null; error: string | null }> {
    try {
      const courses = LocalStorageService.searchCourses(query, level);
      const simpleCourses: Course[] = courses.map(course => ({
        id: course.id,
        name: course.name,
        level: course.level,
        description: course.description,
        duration: course.duration,
        price: course.price,
        image: course.image,
        features: course.features,
        isActive: course.isActive,
        createdAt: course.createdAt
      }));
      
      return { data: simpleCourses, error: null };
    } catch (error) {
      console.error('Search courses error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to search courses' };
    }
  }
}