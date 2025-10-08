import { Course, CourseDetail } from "./courses-api";
import { supabase } from "../lib/supabase";
import { AdminAuth } from "./admin-auth";
import { eventBus, EVENTS } from "./event-bus";

export class AdminAPI {
  // Course Management
  static async createCourse(courseData: Partial<CourseDetail>): Promise<{ data: Course | null; error: string | null }> {
    try {
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('courses')
        .insert([{
          name: courseData.name,
          level: courseData.level,
          description: courseData.description,
          duration: courseData.duration,
          price: courseData.price,
          image: courseData.image,
          features: courseData.features,
          is_active: courseData.isActive,
          syllabus: courseData.syllabus,
          requirements: courseData.requirements,
          outcomes: courseData.outcomes
        }])
        .select()
        .single();

      if (error) throw error;
      if (!data) return { data: null, error: 'Failed to create course' };

      const courseResponse: Course = {
        id: data.id,
        name: data.name,
        level: data.level,
        description: data.description,
        duration: data.duration,
        price: data.price,
        image: data.image,
        features: data.features,
        isActive: data.is_active,
        createdAt: data.created_at
      };

      eventBus.emit(EVENTS.COURSES_UPDATED);
      return { data: courseResponse, error: null };
    } catch (error) {
      console.error('Error creating course:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to create course' };
    }
  }

  static async updateCourse(courseId: string, courseData: Partial<CourseDetail>): Promise<{ data: Course | null; error: string | null }> {
    try {
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('courses')
        .update({
          name: courseData.name,
          level: courseData.level,
          description: courseData.description,
          duration: courseData.duration,
          price: courseData.price,
          image: courseData.image,
          features: courseData.features,
          is_active: courseData.isActive,
          syllabus: courseData.syllabus,
          requirements: courseData.requirements,
          outcomes: courseData.outcomes,
          updated_at: new Date().toISOString()
        })
        .eq('id', courseId)
        .select()
        .single();

      if (error) throw error;

      if (!data) return { data: null, error: 'Course not found or failed to update' };

      const courseResponse: Course = {
        id: data.id,
        name: data.name,
        level: data.level,
        description: data.description,
        duration: data.duration,
        price: data.price,
        image: data.image,
        features: data.features,
        isActive: data.is_active,
        createdAt: data.created_at
      };

      eventBus.emit(EVENTS.COURSES_UPDATED);
      return { data: courseResponse, error: null };
    } catch (error) {
      console.error('Error updating course:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to update course' };
    }
  }

  static async deleteCourse(courseId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      if (!AdminAuth.isAuthenticated()) {
        return { success: false, error: 'Not authenticated' };
      }

      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', courseId);

      if (error) throw error;

      eventBus.emit(EVENTS.COURSES_UPDATED);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting course:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Failed to delete course' };
    }
  }
}
