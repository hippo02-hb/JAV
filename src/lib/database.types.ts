export interface Database {
  public: {
    Tables: {
      courses: {
        Row: {
          id: string;
          name: string;
          level: string;
          description: string;
          duration: string;
          price: number;
          image: string;
          features: string[];
          is_active: boolean;
          created_at: string;
          syllabus: {
            week: number;
            topic: string;
            content: string[];
          }[];
          requirements: string[];
          outcomes: string[];
        };
        Insert: Omit<Database['public']['Tables']['courses']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['courses']['Insert']>;
      };
      blog_posts: {
        Row: {
          id: string;
          title: string;
          slug: string;
          excerpt: string;
          content: string;
          image: string;
          category: string;
          tags: string[];
          author_name: string;
          author_avatar: string | null;
          published_at: string;
          updated_at: string;
          is_published: boolean;
          views: number;
        };
        Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'views'>;
        Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>;
      };
      teachers: {
        Row: {
          id: string;
          name: string;
          title: string;
          avatar: string;
          bio: string;
          specializations: string[];
          experience: string;
          education: string[];
          certifications: string[];
          teaching_style: string;
          courses_count: number;
          students_count: number;
          rating: number;
          is_active: boolean;
          created_at: string;
          social_links: {
            facebook?: string;
            linkedin?: string;
            youtube?: string;
          };
          achievements: string[];
          courses_teaching: string[];
          testimonials: {
            studentName: string;
            comment: string;
            rating: number;
            date: string;
          }[];
        };
        Insert: Omit<Database['public']['Tables']['teachers']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['teachers']['Insert']>;
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          order: number;
          is_active: boolean;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['faqs']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['faqs']['Insert']>;
      };
      company_info: {
        Row: {
          id: string;
          name: string;
          description: string;
          address: string;
          phone: string;
          email: string;
          website: string;
          social_links: {
            facebook?: string;
            instagram?: string;
            youtube?: string;
            linkedin?: string;
          };
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['company_info']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['company_info']['Insert']>;
      };
    };
  };
}
