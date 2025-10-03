import { LocalStorageService } from "./local-storage";

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
  // Get all published blog posts
  static async getAllPosts(): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const posts = LocalStorageService.getAllBlogPosts();
      const publishedPosts = posts.filter(post => post.isPublished);
      return { data: publishedPosts, error: null };
    } catch (error) {
      console.error('Error getting blog posts:', error);
      return { data: [], error: 'Failed to get blog posts' };
    }
  }

  // Get all posts (including unpublished) - for admin
  static async getAllPostsAdmin(): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const posts = LocalStorageService.getAllBlogPosts();
      return { data: posts, error: null };
    } catch (error) {
      console.error('Error getting blog posts:', error);
      return { data: [], error: 'Failed to get blog posts' };
    }
  }

  // Get post by slug
  static async getPostBySlug(slug: string): Promise<{ data: BlogPost | null; error: string | null }> {
    try {
      const post = LocalStorageService.getBlogPostBySlug(slug);
      if (!post || !post.isPublished) {
        return { data: null, error: 'Post not found' };
      }
      
      // Increment view count
      LocalStorageService.incrementBlogViews(post.id);
      
      return { data: post, error: null };
    } catch (error) {
      console.error('Error getting blog post:', error);
      return { data: null, error: 'Failed to get blog post' };
    }
  }

  // Get posts by category
  static async getPostsByCategory(category: string): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const posts = LocalStorageService.getBlogPostsByCategory(category);
      return { data: posts, error: null };
    } catch (error) {
      console.error('Error getting posts by category:', error);
      return { data: [], error: 'Failed to get posts' };
    }
  }

  // Search posts
  static async searchPosts(query: string): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const posts = LocalStorageService.searchBlogPosts(query);
      return { data: posts, error: null };
    } catch (error) {
      console.error('Error searching posts:', error);
      return { data: [], error: 'Failed to search posts' };
    }
  }

  // Get featured posts (most viewed)
  static async getFeaturedPosts(limit: number = 3): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const posts = LocalStorageService.getAllBlogPosts()
        .filter(post => post.isPublished)
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
      return { data: posts, error: null };
    } catch (error) {
      console.error('Error getting featured posts:', error);
      return { data: [], error: 'Failed to get featured posts' };
    }
  }

  // Get recent posts
  static async getRecentPosts(limit: number = 5): Promise<{ data: BlogPost[] | null; error: string | null }> {
    try {
      const posts = LocalStorageService.getAllBlogPosts()
        .filter(post => post.isPublished)
        .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, limit);
      return { data: posts, error: null };
    } catch (error) {
      console.error('Error getting recent posts:', error);
      return { data: [], error: 'Failed to get recent posts' };
    }
  }

  // Get all categories
  static async getCategories(): Promise<{ data: string[] | null; error: string | null }> {
    try {
      const categories = LocalStorageService.getBlogCategories();
      return { data: categories, error: null };
    } catch (error) {
      console.error('Error getting categories:', error);
      return { data: [], error: 'Failed to get categories' };
    }
  }
}
