import { supabase } from '../lib/supabase';

export interface Teacher {
  id: string;
  name: string;
  title: string;
  avatar: string;
  bio: string;
  specializations: string[];
  experience: string;
  education: string[];
  certifications: string[];
  teachingStyle: string;
  coursesCount: number;
  studentsCount: number;
  rating: number;
  isActive: boolean;
  createdAt: string;
}

export interface TeacherDetail extends Teacher {
  socialLinks: {
    facebook?: string;
    linkedin?: string;
    youtube?: string;
  };
  achievements: string[];
  coursesTeaching: string[];
  testimonials: {
    studentName: string;
    comment: string;
    rating: number;
    date: string;
  }[];
}

export class TeachersAPI {
  static async getAllTeachers(): Promise<{ data: Teacher[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const teachers: Teacher[] = (data || []).map(teacher => ({
        id: teacher.id,
        name: teacher.name,
        title: teacher.title,
        avatar: teacher.avatar,
        bio: teacher.bio,
        specializations: teacher.specializations || [],
        experience: teacher.experience,
        education: teacher.education || [],
        certifications: teacher.certifications || [],
        teachingStyle: teacher.teaching_style,
        coursesCount: teacher.courses_count || 0,
        studentsCount: teacher.students_count || 0,
        rating: teacher.rating || 0,
        isActive: teacher.is_active,
        createdAt: teacher.created_at
      }));

      return { data: teachers, error: null };
    } catch (error) {
      console.error('Error getting teachers:', error);
      return { data: [], error: 'Failed to get teachers' };
    }
  }

  static async getTeacherById(teacherId: string): Promise<{ data: TeacherDetail | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('id', teacherId)
        .single();

      if (error) throw error;
      if (!data) return { data: null, error: 'Teacher not found' };

      const teacher: TeacherDetail = {
        id: data.id,
        name: data.name,
        title: data.title,
        avatar: data.avatar,
        bio: data.bio,
        specializations: data.specializations || [],
        experience: data.experience,
        education: data.education || [],
        certifications: data.certifications || [],
        teachingStyle: data.teaching_style,
        coursesCount: data.courses_count || 0,
        studentsCount: data.students_count || 0,
        rating: data.rating || 0,
        isActive: data.is_active,
        createdAt: data.created_at,
        socialLinks: data.social_links || {},
        achievements: data.achievements || [],
        coursesTeaching: data.courses_teaching || [],
        testimonials: data.testimonials || []
      };

      return { data: teacher, error: null };
    } catch (error) {
      console.error('Error getting teacher by ID:', error);
      return { data: null, error: 'Failed to get teacher' };
    }
  }

  static async getFeaturedTeachers(): Promise<{ data: Teacher[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('teachers')
        .select('*')
        .eq('is_active', true)
        .order('rating', { ascending: false })
        .limit(3);

      if (error) throw error;

      const teachers: Teacher[] = (data || []).map(teacher => ({
        id: teacher.id,
        name: teacher.name,
        title: teacher.title,
        avatar: teacher.avatar,
        bio: teacher.bio,
        specializations: teacher.specializations || [],
        experience: teacher.experience,
        education: teacher.education || [],
        certifications: teacher.certifications || [],
        teachingStyle: teacher.teaching_style,
        coursesCount: teacher.courses_count || 0,
        studentsCount: teacher.students_count || 0,
        rating: teacher.rating || 0,
        isActive: teacher.is_active,
        createdAt: teacher.created_at
      }));

      return { data: teachers, error: null };
    } catch (error) {
      console.error('Get featured teachers error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get featured teachers' };
    }
  }
}
