import { LocalStorageService } from "./local-storage";
import { AdminAuth } from "./admin-auth";
import { eventBus, EVENTS } from "./event-bus";
import { BlogPost } from "./blog-api";

export class BlogAdminAPI {
  // Check if user is admin
  static async checkAdminAccess(): Promise<{ isAdmin: boolean; error?: string }> {
    try {
      const isAdmin = AdminAuth.isAuthenticated();
      return { isAdmin, error: isAdmin ? undefined : 'Not authenticated' };
    } catch (error) {
      return { isAdmin: false, error: 'Authentication check failed' };
    }
  }

  // Get all blog posts (including unpublished) - for admin
  static async getAllPosts(): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      const posts = LocalStorageService.getAllBlogPosts();
      // Sort by updated date, newest first
      posts.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      
      return { data: posts, error: null };
    } catch (error) {
      console.error('Error getting blog posts:', error);
      return { data: [], error: 'Failed to get blog posts' };
    }
  }

  // Create new blog post
  static async createPost(postData: Partial<BlogPost>): Promise<{ data: BlogPost | null; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      console.log('Creating blog post with data:', postData);

      // Create post using LocalStorageService
      const newPost = LocalStorageService.addBlogPost(postData);
      
      console.log('Blog post created successfully:', newPost);
      
      // Emit event to notify other components
      eventBus.emit(EVENTS.BLOG_CREATED, newPost);
      eventBus.emit(EVENTS.BLOG_UPDATED);
      
      console.log('Total blog posts after creation:', LocalStorageService.getAllBlogPosts().length);
      
      return { data: newPost, error: null };
    } catch (error) {
      console.error('Error creating blog post:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to create blog post' };
    }
  }

  // Update blog post
  static async updatePost(postId: string, postData: Partial<BlogPost>): Promise<{ data: BlogPost | null; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      console.log('Updating blog post:', postId, postData);

      // Update post using LocalStorageService
      const updatedPost = LocalStorageService.updateBlogPost(postId, postData);
      
      if (!updatedPost) {
        return { data: null, error: 'Blog post not found' };
      }

      console.log('Blog post updated successfully:', updatedPost);
      
      // Emit event to notify other components
      eventBus.emit(EVENTS.BLOG_UPDATED, updatedPost);
      
      return { data: updatedPost, error: null };
    } catch (error) {
      console.error('Error updating blog post:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to update blog post' };
    }
  }

  // Delete blog post
  static async deletePost(postId: string): Promise<{ success: boolean; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { success: false, error: 'Not authenticated' };
      }

      console.log('Deleting blog post:', postId);

      // Delete post using LocalStorageService
      const success = LocalStorageService.deleteBlogPost(postId);
      
      if (!success) {
        return { success: false, error: 'Blog post not found' };
      }

      console.log('Blog post deleted successfully');
      
      // Emit event to notify other components
      eventBus.emit(EVENTS.BLOG_DELETED, postId);
      eventBus.emit(EVENTS.BLOG_UPDATED);
      
      return { success: true, error: null };
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Failed to delete blog post' };
    }
  }

  // Get blog post by ID (for editing)
  static async getPostById(postId: string): Promise<{ data: BlogPost | null; error: string | null }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      const post = LocalStorageService.getBlogPostById(postId);
      
      return {
        data: post,
        error: post ? null : 'Blog post not found'
      };
    } catch (error) {
      console.error('Error getting blog post by ID:', error);
      return { data: null, error: 'Failed to get blog post' };
    }
  }

  // Get blog statistics
  static async getBlogStats(): Promise<{ 
    data: {
      totalPosts: number;
      publishedPosts: number;
      draftPosts: number;
      totalViews: number;
      averageViews: number;
      topCategories: { category: string; count: number }[];
    } | null; 
    error: string | null 
  }> {
    try {
      // Check authentication
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      const posts = LocalStorageService.getAllBlogPosts();
      
      const publishedPosts = posts.filter(p => p.isPublished);
      const draftPosts = posts.filter(p => !p.isPublished);
      const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
      
      // Get category distribution
      const categoryCount = posts.reduce((acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const topCategories = Object.entries(categoryCount)
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);

      return {
        data: {
          totalPosts: posts.length,
          publishedPosts: publishedPosts.length,
          draftPosts: draftPosts.length,
          totalViews,
          averageViews: posts.length > 0 ? Math.round(totalViews / posts.length) : 0,
          topCategories
        },
        error: null
      };
    } catch (error) {
      console.error('Error getting blog stats:', error);
      return { data: null, error: 'Failed to get blog statistics' };
    }
  }
}