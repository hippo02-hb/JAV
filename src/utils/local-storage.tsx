// Local storage utilities for course management
import { Course, CourseDetail } from "./courses-api";
import { BlogPost } from "./blog-api";

const COURSES_KEY = 'tnqdo_courses';
const COURSES_COUNTER_KEY = 'tnqdo_courses_counter';
const BLOG_KEY = 'tnqdo_blog_posts';
const BLOG_COUNTER_KEY = 'tnqdo_blog_counter';

export class LocalStorageService {
  // Initialize with default courses if none exist
  static initializeDefaultCourses(): void {
    const existingCourses = this.getAllCourses();
    if (existingCourses.length === 0) {
      const defaultCourses = this.getDefaultCourses();
      localStorage.setItem(COURSES_KEY, JSON.stringify(defaultCourses));
      // Set counter to number of default courses + 1
      localStorage.setItem(COURSES_COUNTER_KEY, (defaultCourses.length + 1).toString());
      console.log(`Initialized ${defaultCourses.length} default courses`);
    }
  }

  // Get all courses from localStorage
  static getAllCourses(): CourseDetail[] {
    try {
      const coursesJson = localStorage.getItem(COURSES_KEY);
      if (!coursesJson) return [];
      return JSON.parse(coursesJson);
    } catch (error) {
      console.error('Error reading courses from localStorage:', error);
      return [];
    }
  }

  // Get course by ID
  static getCourseById(courseId: string): CourseDetail | null {
    const courses = this.getAllCourses();
    return courses.find(course => course.id === courseId) || null;
  }

  // Add new course
  static addCourse(courseData: Partial<CourseDetail>): CourseDetail {
    try {
      const courses = this.getAllCourses();
      const counter = this.getNextId();
      
      console.log('Adding course - Current count:', courses.length, 'Next ID:', counter);
      
      const newCourse: CourseDetail = {
        id: `course-${counter}`,
        name: courseData.name || '',
        level: courseData.level || 'N5',
        description: courseData.description || '',
        duration: courseData.duration || '',
        price: courseData.price || 0,
        image: courseData.image || 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        features: courseData.features || [],
        isActive: courseData.isActive ?? true,
        createdAt: new Date().toISOString(),
        syllabus: courseData.syllabus || [
          { 
            week: 1, 
            topic: "Giới thiệu khóa học", 
            content: ["Tổng quan chương trình", "Mục tiêu học tập", "Phương pháp học"] 
          }
        ],
        requirements: courseData.requirements || ["Có đam mê học tiếng Nhật", "Cam kết học tập nghiêm túc"],
        outcomes: courseData.outcomes || ["Nắm vững kiến thức cấp độ", "Có thể giao tiếp cơ bản"]
      };

      courses.push(newCourse);
      localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
      this.incrementCounter();
      
      console.log('Course added successfully. Total courses now:', courses.length);
      console.log('Saved to localStorage:', COURSES_KEY);
      
      return newCourse;
    } catch (error) {
      console.error('Error adding course:', error);
      throw new Error('Failed to add course');
    }
  }

  // Update existing course
  static updateCourse(courseId: string, courseData: Partial<CourseDetail>): CourseDetail | null {
    try {
      const courses = this.getAllCourses();
      const courseIndex = courses.findIndex(course => course.id === courseId);
      
      if (courseIndex === -1) return null;
      
      const updatedCourse: CourseDetail = {
        ...courses[courseIndex],
        ...courseData,
        id: courseId, // Ensure ID doesn't change
        createdAt: courses[courseIndex].createdAt, // Preserve creation date
      };

      courses[courseIndex] = updatedCourse;
      localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
      
      return updatedCourse;
    } catch (error) {
      console.error('Error updating course:', error);
      return null;
    }
  }

  // Delete course
  static deleteCourse(courseId: string): boolean {
    try {
      const courses = this.getAllCourses();
      const filteredCourses = courses.filter(course => course.id !== courseId);
      
      if (filteredCourses.length === courses.length) {
        return false; // Course not found
      }
      
      localStorage.setItem(COURSES_KEY, JSON.stringify(filteredCourses));
      return true;
    } catch (error) {
      console.error('Error deleting course:', error);
      return false;
    }
  }

  // Search courses
  static searchCourses(query: string = '', level: string = ''): CourseDetail[] {
    const courses = this.getAllCourses();
    
    return courses.filter(course => {
      const matchesQuery = !query || 
        course.name.toLowerCase().includes(query.toLowerCase()) ||
        course.description.toLowerCase().includes(query.toLowerCase());
      
      const matchesLevel = !level || course.level === level;
      
      return matchesQuery && matchesLevel && course.isActive;
    });
  }

  // Get featured courses (first 3 active courses)
  static getFeaturedCourses(): Course[] {
    const courses = this.getAllCourses();
    return courses
      .filter(course => course.isActive)
      .slice(0, 3)
      .map(course => ({
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
  }

  // Helper methods
  private static getNextId(): number {
    try {
      const counter = localStorage.getItem(COURSES_COUNTER_KEY);
      return counter ? parseInt(counter, 10) : 1;
    } catch (error) {
      return 1;
    }
  }

  private static incrementCounter(): void {
    try {
      const currentCounter = this.getNextId();
      localStorage.setItem(COURSES_COUNTER_KEY, (currentCounter + 1).toString());
    } catch (error) {
      console.error('Error incrementing counter:', error);
    }
  }

  // Clear all data (for debugging)
  static clearAll(): void {
    localStorage.removeItem(COURSES_KEY);
    localStorage.removeItem(COURSES_COUNTER_KEY);
  }

  // Export data for backup
  static exportData(): string {
    const courses = this.getAllCourses();
    return JSON.stringify(courses, null, 2);
  }

  // Import data from backup
  static importData(jsonData: string): boolean {
    try {
      const courses = JSON.parse(jsonData);
      if (Array.isArray(courses)) {
        localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  // Default courses data
  private static getDefaultCourses(): CourseDetail[] {
    return [
      {
        id: "jlpt-n5",
        name: "Tiếng Nhật N5 Cơ Bản",
        level: "N5",
        description: "Khóa học tiếng Nhật cơ bản cho người mới bắt đầu, học alphabet Hiragana, Katakana và 600 từ vựng cơ bản.",
        duration: "3 tháng",
        price: 1500000,
        image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        features: ["Học Hiragana & Katakana", "600 từ vựng N5", "Ngữ pháp cơ bản", "Luyện nghe nói"],
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
        syllabus: [
          { week: 1, topic: "Hiragana & Chào hỏi", content: ["Học bảng chữ cái Hiragana", "Cách chào hỏi cơ bản", "Tự giới thiệu"] },
          { week: 2, topic: "Katakana & Số đếm", content: ["Học bảng chữ cái Katakana", "Số đếm từ 1-100", "Ngày tháng năm"] },
          { week: 3, topic: "Từ vựng sinh hoạt", content: ["Từ vựng gia đình", "Đồ vật trong nhà", "Hoạt động hàng ngày"] },
          { week: 4, topic: "Ngữ pháp cơ bản", content: ["Trợ từ は, が, を", "Động từ nhóm 1,2,3", "Thời hiện tại, quá khứ"] }
        ],
        requirements: ["Có đam mê học tiếng Nhật", "Cam kết học tập nghiêm túc", "Tham gia đầy đủ các buổi học"],
        outcomes: ["Nắm vững kiến thức N5", "Có thể giao tiếp cơ bản", "Sẵn sàng cho cấp độ N4"]
      },
      {
        id: "jlpt-n4",
        name: "Tiếng Nhật N4 Trung Cấp",
        level: "N4",
        description: "Khóa học tiếng Nhật trung cấp với 1500 từ vựng và ngữ pháp phức tạp hơn.",
        duration: "4 tháng",
        price: 2000000,
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        features: ["1500 từ vựng N4", "Ngữ pháp trung cấp", "Kanji cơ bản", "Luyện thi N4"],
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
        syllabus: [
          { week: 1, topic: "Ôn tập N5", content: ["Ôn tập Hiragana, Katakana", "Từ vựng N5", "Ngữ pháp cơ bản"] },
          { week: 2, topic: "Kanji cơ bản", content: ["50 chữ Kanji đầu tiên", "Cách đọc On, Kun", "Từ ghép Kanji"] },
          { week: 3, topic: "Ngữ pháp N4", content: ["Thể て của động từ", "Thể potential", "Thể passive"] },
          { week: 4, topic: "Hội thoại nâng cao", content: ["Giao tiếp công việc", "Mua sắm", "Đi du lịch"] }
        ],
        requirements: ["Đã hoàn thành N5 hoặc có kiến thức tương đương", "Cam kết học tập nghiêm túc"],
        outcomes: ["Nắm vững kiến thức N4", "Giao tiếp tự tin hơn", "Sẵn sàng cho cấp độ N3"]
      },
      {
        id: "jlpt-n3",
        name: "Tiếng Nhật N3 Nâng Cao",
        level: "N3",
        description: "Khóa học tiếng Nhật nâng cao với 3000 từ vựng và 600 chữ Kanji.",
        duration: "6 tháng",
        price: 2500000,
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        features: ["3000 từ vựng N3", "600 chữ Kanji", "Ngữ pháp nâng cao", "Luyện thi N3"],
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
        syllabus: [
          { week: 1, topic: "Giới thiệu khóa học", content: ["Tổng quan chương trình", "Mục tiêu học tập", "Phương pháp học"] }
        ],
        requirements: ["Đã hoàn thành N4 hoặc có kiến thức tương đương", "Cam kết học tập nghiêm túc"],
        outcomes: ["Nắm vững kiến thức N3", "Giao tiếp thành thạo", "Có thể làm việc bằng tiếng Nhật"]
      },
      {
        id: "business-japanese",
        name: "Tiếng Nhật Thương Mại",
        level: "Business",
        description: "Khóa học tiếng Nhật chuyên ngành cho môi trường công việc và kinh doanh.",
        duration: "3 tháng",
        price: 3000000,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        features: ["Tiếng Nhật công sở", "Email & báo cáo", "Thuyết trình", "Giao tiếp khách hàng"],
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
        syllabus: [
          { week: 1, topic: "Giới thiệu khóa học", content: ["Tổng quan chương trình", "Mục tiêu học tập", "Phương pháp học"] }
        ],
        requirements: ["Có trình độ N3 trở lên", "Muốn làm việc tại Nhật Bản"],
        outcomes: ["Giao tiếp thành thạo trong môi trường công việc", "Viết email và báo cáo chuyên nghiệp"]
      },
      {
        id: "anime-translation",
        name: "Biên Dịch Anime & Manga",
        level: "Professional",
        description: "Khóa đào tạo nghiệp vụ biên dịch anime, manga và light novel.",
        duration: "2 tháng",
        price: 2200000,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        features: ["Kỹ thuật biên dịch", "Phần mềm chuyên dụng", "Thực hành dự án", "Chứng chỉ hoàn thành"],
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
        syllabus: [
          { week: 1, topic: "Giới thiệu khóa học", content: ["Tổng quan chương trình", "Mục tiêu học tập", "Phương pháp học"] }
        ],
        requirements: ["Có trình độ N2 trở lên", "Yêu thích anime/manga"],
        outcomes: ["Có thể biên dịch anime/manga chuyên nghiệp", "Nắm vững các công cụ biên dịch"]
      },
      {
        id: "teaching-methodology",
        name: "Nghiệp Vụ Dạy Tiếng Nhật",
        level: "Professional",
        description: "Khóa đào tạo phương pháp giảng dạy tiếng Nhật hiệu quả.",
        duration: "3 tháng",
        price: 2800000,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        features: ["Phương pháp giảng dạy", "Quản lý lớp học", "Thiết kế bài học", "Đánh giá học viên"],
        isActive: true,
        createdAt: "2024-01-01T00:00:00Z",
        syllabus: [
          { week: 1, topic: "Giới thiệu khóa học", content: ["Tổng quan chương trình", "Mục tiêu học tập", "Phương pháp học"] }
        ],
        requirements: ["Có trình độ N2 trở lên", "Muốn trở thành giáo viên tiếng Nhật"],
        outcomes: ["Nắm vững phương pháp giảng dạy", "Có thể quản lý lớp học hiệu quả"]
      }
    ];
  }

  // ==================== BLOG METHODS ====================

  // Initialize blog posts
  static initializeDefaultBlogPosts(): void {
    const existingPosts = this.getAllBlogPosts();
    if (existingPosts.length === 0) {
      const defaultPosts = this.getDefaultBlogPosts();
      localStorage.setItem(BLOG_KEY, JSON.stringify(defaultPosts));
      localStorage.setItem(BLOG_COUNTER_KEY, (defaultPosts.length + 1).toString());
      console.log(`Initialized ${defaultPosts.length} default blog posts`);
    }
  }

  // Get all blog posts
  static getAllBlogPosts(): BlogPost[] {
    try {
      const postsJson = localStorage.getItem(BLOG_KEY);
      if (!postsJson) return [];
      return JSON.parse(postsJson);
    } catch (error) {
      console.error('Error reading blog posts from localStorage:', error);
      return [];
    }
  }

  // Get blog post by slug
  static getBlogPostBySlug(slug: string): BlogPost | null {
    const posts = this.getAllBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  }

  // Get blog post by ID
  static getBlogPostById(id: string): BlogPost | null {
    const posts = this.getAllBlogPosts();
    return posts.find(post => post.id === id) || null;
  }

  // Add new blog post
  static addBlogPost(postData: Partial<BlogPost>): BlogPost {
    try {
      const posts = this.getAllBlogPosts();
      const counter = this.getNextBlogId();
      
      const newPost: BlogPost = {
        id: `post-${counter}`,
        title: postData.title || '',
        slug: postData.slug || this.generateSlug(postData.title || ''),
        excerpt: postData.excerpt || '',
        content: postData.content || '',
        image: postData.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        category: postData.category || 'Học tiếng Nhật',
        tags: postData.tags || [],
        author: postData.author || { name: 'TNQDO' },
        publishedAt: postData.publishedAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isPublished: postData.isPublished ?? true,
        views: 0
      };

      posts.push(newPost);
      localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
      this.incrementBlogCounter();
      
      return newPost;
    } catch (error) {
      console.error('Error adding blog post:', error);
      throw new Error('Failed to add blog post');
    }
  }

  // Update blog post
  static updateBlogPost(postId: string, postData: Partial<BlogPost>): BlogPost | null {
    try {
      const posts = this.getAllBlogPosts();
      const index = posts.findIndex(post => post.id === postId);
      
      if (index === -1) return null;

      const updatedPost = {
        ...posts[index],
        ...postData,
        id: posts[index].id, // Preserve ID
        updatedAt: new Date().toISOString()
      };

      posts[index] = updatedPost;
      localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
      
      return updatedPost;
    } catch (error) {
      console.error('Error updating blog post:', error);
      return null;
    }
  }

  // Delete blog post
  static deleteBlogPost(postId: string): boolean {
    try {
      const posts = this.getAllBlogPosts();
      const filteredPosts = posts.filter(post => post.id !== postId);
      
      if (filteredPosts.length === posts.length) return false;
      
      localStorage.setItem(BLOG_KEY, JSON.stringify(filteredPosts));
      return true;
    } catch (error) {
      console.error('Error deleting blog post:', error);
      return false;
    }
  }

  // Get posts by category
  static getBlogPostsByCategory(category: string): BlogPost[] {
    const posts = this.getAllBlogPosts();
    return posts.filter(post => post.isPublished && post.category === category);
  }

  // Search blog posts
  static searchBlogPosts(query: string): BlogPost[] {
    const posts = this.getAllBlogPosts();
    const searchLower = query.toLowerCase();
    
    return posts.filter(post => 
      post.isPublished && (
        post.title.toLowerCase().includes(searchLower) ||
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.content.toLowerCase().includes(searchLower) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchLower))
      )
    );
  }

  // Get all categories
  static getBlogCategories(): string[] {
    const posts = this.getAllBlogPosts();
    const categories = new Set(posts.map(post => post.category));
    return Array.from(categories);
  }

  // Increment blog views
  static incrementBlogViews(postId: string): void {
    try {
      const posts = this.getAllBlogPosts();
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.views = (post.views || 0) + 1;
        localStorage.setItem(BLOG_KEY, JSON.stringify(posts));
      }
    } catch (error) {
      console.error('Error incrementing blog views:', error);
    }
  }

  // Helper: Generate slug from title
  private static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove Vietnamese diacritics
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  }

  // Helper: Get next blog ID
  private static getNextBlogId(): number {
    const counter = localStorage.getItem(BLOG_COUNTER_KEY);
    return counter ? parseInt(counter, 10) : 1;
  }

  // Helper: Increment blog counter
  private static incrementBlogCounter(): void {
    const current = this.getNextBlogId();
    localStorage.setItem(BLOG_COUNTER_KEY, (current + 1).toString());
  }

  // Default blog posts
  private static getDefaultBlogPosts(): BlogPost[] {
    return [
      {
        id: "blog-1",
        title: "5 Mẹo Học Kanji Hiệu Quả Cho Người Mới Bắt Đầu",
        slug: "5-meo-hoc-kanji-hieu-qua",
        excerpt: "Học Kanji không còn là nỗi ác mộng với 5 phương pháp đã được kiểm chứng này. Khám phá cách học thông minh để nhớ lâu hơn.",
        content: `<h2>Giới thiệu</h2>
<p>Kanji là một trong những thử thách lớn nhất khi học tiếng Nhật. Với hơn 2000 chữ Kanji cần thiết để đọc hiểu tiếng Nhật thông thường, nhiều người cảm thấy choáng ngợp. Nhưng đừng lo, với 5 mẹo sau đây, bạn sẽ học Kanji hiệu quả hơn rất nhiều!</p>

<h3>1. Sử dụng Phương Pháp Mnemonics</h3>
<p>Mnemonics là kỹ thuật liên kết chữ Kanji với câu chuyện hoặc hình ảnh. Ví dụ, chữ 森 (rừng) được tạo bởi 3 chữ 木 (cây) - nhiều cây tạo thành rừng!</p>

<h3>2. Viết Tay Thay Vì Gõ Máy</h3>
<p>Nghiên cứu chứng minh rằng việc viết tay giúp bộ nhớ ghi nhớ tốt hơn 50% so với gõ máy. Hãy dành 10-15 phút mỗi ngày để luyện viết.</p>

<h3>3. Học Theo Bộ Thủ (Radicals)</h3>
<p>214 bộ thủ cơ bản là nền tảng của hàng ngàn chữ Kanji. Nắm vững bộ thủ sẽ giúp bạn đoán nghĩa và cách đọc của chữ mới.</p>

<h3>4. Flashcards Với Spaced Repetition</h3>
<p>Sử dụng các ứng dụng như Anki để ôn tập định kỳ. Phương pháp SRS giúp bạn nhớ lâu hơn với ít thời gian hơn.</p>

<h3>5. Đọc Truyện Tranh Manga</h3>
<p>Manga là cách học vui và hiệu quả. Bắt đầu với manga dành cho trẻ em rồi dần nâng cao độ khó.</p>

<h2>Kết Luận</h2>
<p>Học Kanji cần kiên trì và phương pháp đúng đắn. Đừng vội vàng, hãy học đều đặn mỗi ngày và bạn sẽ thấy tiến bộ rõ rệt!</p>`,
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Học tiếng Nhật",
        tags: ["Kanji", "Học tiếng Nhật", "Mẹo học tập"],
        author: {
          name: "Nguyễn Quang Triệu",
          avatar: "https://ui-avatars.com/api/?name=NQT&background=1b2460&color=fff"
        },
        publishedAt: "2025-01-15T10:00:00Z",
        updatedAt: "2025-01-15T10:00:00Z",
        isPublished: true,
        views: 245
      },
      {
        id: "blog-2",
        title: "Lộ Trình Học JLPT N5 Trong 3 Tháng",
        slug: "lo-trinh-hoc-jlpt-n5-trong-3-thang",
        excerpt: "Bạn muốn đạt N5 trong thời gian ngắn? Đây là lộ trình học chi tiết từng tuần giúp bạn chinh phục JLPT N5 chỉ sau 3 tháng.",
        content: `<h2>Giới Thiệu</h2>
<p>JLPT N5 là cấp độ cơ bản nhất của kỳ thi năng lực tiếng Nhật. Với lộ trình học đúng đắn, bạn hoàn toàn có thể đạt được trong 3 tháng!</p>

<h3>Tháng 1: Nền Tảng</h3>
<ul>
<li><strong>Tuần 1-2:</strong> Học Hiragana và Katakana hoàn toàn thuộc</li>
<li><strong>Tuần 3-4:</strong> 100 từ vựng N5 đầu tiên + Ngữ pháp cơ bản (です/ます)</li>
</ul>

<h3>Tháng 2: Phát Triển</h3>
<ul>
<li><strong>Tuần 5-6:</strong> 200 từ vựng tiếp theo + Ngữ pháp trợ từ (は、が、を)</li>
<li><strong>Tuần 7-8:</strong> Kanji cơ bản (50 chữ đầu tiên) + Luyện nghe</li>
</ul>

<h3>Tháng 3: Hoàn Thiện</h3>
<ul>
<li><strong>Tuần 9-10:</strong> Hoàn thành 800 từ vựng N5 + 80 chữ Kanji</li>
<li><strong>Tuần 11-12:</strong> Luyện đề thi + Ôn tập tổng hợp</li>
</ul>

<h2>Tài Liệu Cần Thiết</h2>
<ul>
<li>Sách Minna no Nihongo 1</li>
<li>Đề thi mẫu JLPT N5</li>
<li>App Anki để ôn từ vựng</li>
</ul>`,
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "JLPT",
        tags: ["JLPT", "N5", "Lộ trình học"],
        author: {
          name: "Lê Đình Tân",
          avatar: "https://ui-avatars.com/api/?name=LDT&background=d1d7fe&color=1b2460"
        },
        publishedAt: "2025-01-20T14:30:00Z",
        updatedAt: "2025-01-20T14:30:00Z",
        isPublished: true,
        views: 189
      },
      {
        id: "blog-3",
        title: "Văn Hóa Làm Việc Tại Nhật Bản: Những Điều Cần Biết",
        slug: "van-hoa-lam-viec-tai-nhat-ban",
        excerpt: "Hiểu rõ văn hóa làm việc Nhật Bản sẽ giúp bạn thành công hơn khi làm việc với người Nhật hoặc tại Nhật Bản.",
        content: `<h2>Giới Thiệu</h2>
<p>Văn hóa làm việc tại Nhật Bản có nhiều điểm khác biệt so với Việt Nam. Việc hiểu và thích nghi với văn hóa này là chìa khóa để thành công.</p>

<h3>1. Đúng Giờ Là Vàng</h3>
<p>Người Nhật rất coi trọng thời gian. Đến muộn dù chỉ 1 phút cũng được coi là thiếu tôn trọng.</p>

<h3>2. Báo Cáo - Liên Lạc - Tư Vấn (報連相)</h3>
<p>Horenso (ほうれんそう) là nguyên tắc vàng: luôn báo cáo tiến độ, liên lạc kịp thời và tham vấn cấp trên.</p>

<h3>3. Làm Việc Nhóm</h3>
<p>Tinh thần đồng đội được đề cao. Quyết định thường được đưa ra theo sự đồng thuận chứ không phải cá nhân.</p>

<h3>4. Chào Hỏi Đúng Cách</h3>
<p>お疲れ様です (Otsukaresama desu) là câu chào chuẩn trong công sở. Cúi chào là dấu hiệu tôn trọng.</p>`,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        category: "Văn hóa",
        tags: ["Văn hóa Nhật", "Làm việc", "Business"],
        author: {
          name: "Nguyễn Quang Triệu",
          avatar: "https://ui-avatars.com/api/?name=NQT&background=1b2460&color=fff"
        },
        publishedAt: "2025-01-25T09:00:00Z",
        updatedAt: "2025-01-25T09:00:00Z",
        isPublished: true,
        views: 156
      }
    ];
  }
}

// Note: initialization will be called from App.tsx