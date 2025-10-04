import { supabase } from '../lib/supabase';

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
  static async getAllCourses(): Promise<{ data: Course[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const courses: Course[] = (data || []).map(course => ({
        id: course.id,
        name: course.name,
        level: course.level,
        description: course.description,
        duration: course.duration,
        price: course.price,
        image: course.image,
        features: course.features,
        isActive: course.is_active,
        createdAt: course.created_at
      }));
      
      return { data: courses, error: null };
    } catch (error) {
      console.error('Error getting courses:', error);
      return { data: [], error: 'Failed to get courses' };
    }
  }

  static async getCourseById(courseId: string): Promise<{ data: CourseDetail | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (error) throw error;
      if (!data) return { data: null, error: 'Course not found' };

      const course: CourseDetail = {
        id: data.id,
        name: data.name,
        level: data.level,
        description: data.description,
        duration: data.duration,
        price: data.price,
        image: data.image,
        features: data.features,
        isActive: data.is_active,
        createdAt: data.created_at,
        syllabus: data.syllabus || [],
        requirements: data.requirements || [],
        outcomes: data.outcomes || []
      };

      return { data: course, error: null };
    } catch (error) {
      console.error('Error getting course by ID:', error);
      return { data: null, error: 'Failed to get course' };
    }
  }

  static async getFeaturedCourses(): Promise<{ data: Course[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false })
        .limit(3);

      if (error) throw error;

      const courses: Course[] = (data || []).map(course => ({
        id: course.id,
        name: course.name,
        level: course.level,
        description: course.description,
        duration: course.duration,
        price: course.price,
        image: course.image,
        features: course.features,
        isActive: course.is_active,
        createdAt: course.created_at
      }));

      return { data: courses, error: null };
    } catch (error) {
      console.error('Get featured courses error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get featured courses' };
    }
  }

  static async searchCourses(query: string, level?: string): Promise<{ data: Course[] | null; error: string | null }> {
    try {
      let queryBuilder = supabase
        .from('courses')
        .select('*')
        .eq('is_active', true);

      if (query) {
        queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`);
      }

      if (level) {
        queryBuilder = queryBuilder.eq('level', level);
      }

      const { data, error } = await queryBuilder.order('created_at', { ascending: false });

      if (error) throw error;

      const courses: Course[] = (data || []).map(course => ({
        id: course.id,
        name: course.name,
        level: course.level,
        description: course.description,
        duration: course.duration,
        price: course.price,
        image: course.image,
        features: course.features,
        isActive: course.is_active,
        createdAt: course.created_at
      }));
      
      return { data: courses, error: null };
    } catch (error) {
      console.error('Search courses error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to search courses' };
    }
  }
}