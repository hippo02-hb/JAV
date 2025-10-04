import { supabase } from '../lib/supabase';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt: string;
  isPublished: boolean;
  views: number;
}

export class BlogAPI {
  static async getAllPosts(): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
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
          name: post.author_name,
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

  static async getAllPostsAdmin(): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('updated_at', { ascending: false });

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
          name: post.author_name,
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

  static async getPostBySlug(slug: string): Promise<{ data: BlogPost | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('is_published', true)
        .single();

      if (error) throw error;
      if (!data) return { data: null, error: 'Post not found' };

      await supabase
        .from('blog_posts')
        .update({ views: (data.views || 0) + 1 })
        .eq('id', data.id);

      const post: BlogPost = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        image: data.image,
        category: data.category,
        tags: data.tags || [],
        author: {
          name: data.author_name,
          avatar: data.author_avatar || undefined
        },
        publishedAt: data.published_at,
        updatedAt: data.updated_at,
        isPublished: data.is_published,
        views: (data.views || 0) + 1
      };

      return { data: post, error: null };
    } catch (error) {
      console.error('Error getting blog post:', error);
      return { data: null, error: 'Failed to get blog post' };
    }
  }

  static async getPostsByCategory(category: string): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('category', category)
        .eq('is_published', true)
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
          name: post.author_name,
          avatar: post.author_avatar || undefined
        },
        publishedAt: post.published_at,
        updatedAt: post.updated_at,
        isPublished: post.is_published,
        views: post.views || 0
      }));

      return { data: posts, error: null };
    } catch (error) {
      console.error('Error getting posts by category:', error);
      return { data: [], error: 'Failed to get posts' };
    }
  }

  static async searchPosts(query: string): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
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
          name: post.author_name,
          avatar: post.author_avatar || undefined
        },
        publishedAt: post.published_at,
        updatedAt: post.updated_at,
        isPublished: post.is_published,
        views: post.views || 0
      }));

      return { data: posts, error: null };
    } catch (error) {
      console.error('Error searching posts:', error);
      return { data: [], error: 'Failed to search posts' };
    }
  }

  static async getFeaturedPosts(limit: number = 3): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('views', { ascending: false })
        .limit(limit);

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
          name: post.author_name,
          avatar: post.author_avatar || undefined
        },
        publishedAt: post.published_at,
        updatedAt: post.updated_at,
        isPublished: post.is_published,
        views: post.views || 0
      }));

      return { data: posts, error: null };
    } catch (error) {
      console.error('Error getting featured posts:', error);
      return { data: [], error: 'Failed to get featured posts' };
    }
  }

  static async getRecentPosts(limit: number = 5): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(limit);

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
          name: post.author_name,
          avatar: post.author_avatar || undefined
        },
        publishedAt: post.published_at,
        updatedAt: post.updated_at,
        isPublished: post.is_published,
        views: post.views || 0
      }));

      return { data: posts, error: null };
    } catch (error) {
      console.error('Error getting recent posts:', error);
      return { data: [], error: 'Failed to get recent posts' };
    }
  }

  static async getCategories(): Promise<{ data: string[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('category')
        .eq('is_published', true);

      if (error) throw error;

      const categories = [...new Set((data || []).map(post => post.category))];
      return { data: categories, error: null };
    } catch (error) {
      console.error('Error getting categories:', error);
      return { data: [], error: 'Failed to get categories' };
    }
  }
}
