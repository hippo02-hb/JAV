
import { supabase } from './supabaseClient';
import { BlogPost } from './blog-api'; // Assuming BlogPost is defined in blog-api
import { AdminAuth } from './admin-auth';
import { eventBus, EVENTS } from './event-bus';

// Helper function to convert camelCase to snake_case
const camelToSnake = (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

const convertKeysToSnakeCase = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(v => convertKeysToSnakeCase(v));
  }
  if (obj.constructor === Object) {
    return Object.keys(obj).reduce((acc, key) => {
      acc[camelToSnake(key)] = convertKeysToSnakeCase(obj[key]);
      return acc;
    }, {} as any);
  }
  return obj;
};


export class BlogAdminAPI {
  // Get all blog posts for admin
  static async getPosts(): Promise<{ data: BlogPost[]; error: string | null }> {
    try {
      if (!AdminAuth.isAuthenticated()) {
        return { data: [], error: 'Not authenticated' };
      }

      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('published_at', { ascending: false });

      if (error) throw error;

      const posts: BlogPost[] = (data || []).map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        image: post.image,
        category: post.category,
        tags: post.tags || [],
        author: {
          name: post.author_name || '', // Fallback for null author name
          avatar: post.author_avatar || undefined
        },
        publishedAt: post.published_at,
        updatedAt: post.updated_at,
        isPublished: post.is_published,
        views: post.views || 0
      }));

      return { data: posts, error: null };
    } catch (error) {
      console.error('Error getting blog posts:', error);
      return { data: [], error: 'Failed to get blog posts' };
    }
  }

  // Create new blog post
  static async createPost(postData: Partial<BlogPost>): Promise<{ data: BlogPost | null; error: string | null }> {
    try {
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      // Flatten the author object before sending to Supabase
      const dataToSend: any = { ...postData };
      if (dataToSend.author) {
        dataToSend.author_name = dataToSend.author.name;
        dataToSend.author_avatar = dataToSend.author.avatar;
        delete dataToSend.author;
      }

      const snakeCasePostData = convertKeysToSnakeCase(dataToSend);

      const { data, error } = await supabase
        .from('blog_posts')
        .insert([snakeCasePostData])
        .select();

      if (error) throw error;

      const newPost = data ? data[0] : null;
      eventBus.emit(EVENTS.BLOG_UPDATED);
      return { data: newPost, error: null };
    } catch (error) {
      console.error('Error creating blog post:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to create blog post' };
    }
  }

  // Update a blog post
  static async updatePost(id: string, postData: Partial<BlogPost>): Promise<{ data: BlogPost | null; error: string | null }> {
    try {
      if (!AdminAuth.isAuthenticated()) {
        return { data: null, error: 'Not authenticated' };
      }

      // Flatten the author object before sending to Supabase
      const dataToSend: any = { ...postData };
      if (dataToSend.author) {
        dataToSend.author_name = dataToSend.author.name;
        dataToSend.author_avatar = dataToSend.author.avatar;
        delete dataToSend.author;
      }

      const snakeCasePostData = convertKeysToSnakeCase(dataToSend);

      const { data, error } = await supabase
        .from('blog_posts')
        .update(snakeCasePostData)
        .eq('id', id)
        .select();

      if (error) throw error;

      const updatedPost = data ? data[0] : null;
      eventBus.emit(EVENTS.BLOG_UPDATED);
      return { data: updatedPost, error: null };
    } catch (error) {
      console.error('Error updating blog post:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to update blog post' };
    }
  }

  // Delete a blog post
  static async deletePost(id: string): Promise<{ error: string | null }> {
    try {
      if (!AdminAuth.isAuthenticated()) {
        return { error: 'Not authenticated' };
      }

      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      eventBus.emit(EVENTS.BLOG_UPDATED);
      return { error: null };
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return { error: 'Failed to delete blog post' };
    }
  }
}
