import { projectId, publicAnonKey } from "./supabase/info";

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-68e7fa3d`;

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
  // Get all teachers
  static async getAllTeachers(): Promise<{ data: Teacher[] | null; error: string | null }> {
    try {
      const response = await fetch(`${API_BASE}/teachers`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        // Return mock data if API is not available
        return {
          data: this.getMockTeachers(),
          error: null
        };
      }

      const data = await response.json();
      return { data: data.teachers || [], error: null };
    } catch (error) {
      console.log('Using mock data for teachers');
      return {
        data: this.getMockTeachers(),
        error: null
      };
    }
  }

  // Get teacher by ID
  static async getTeacherById(teacherId: string): Promise<{ data: TeacherDetail | null; error: string | null }> {
    try {
      const response = await fetch(`${API_BASE}/teachers/${teacherId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        // Return mock data if API is not available
        const mockTeacher = this.getMockTeacherDetail(teacherId);
        return {
          data: mockTeacher,
          error: mockTeacher ? null : 'Teacher not found'
        };
      }

      const data = await response.json();
      return { data: data.teacher, error: null };
    } catch (error) {
      console.log('Using mock data for teacher detail');
      const mockTeacher = this.getMockTeacherDetail(teacherId);
      return {
        data: mockTeacher,
        error: mockTeacher ? null : 'Teacher not found'
      };
    }
  }

  // Get featured teachers
  static async getFeaturedTeachers(): Promise<{ data: Teacher[] | null; error: string | null }> {
    try {
      const { data: allTeachers, error } = await this.getAllTeachers();
      if (error || !allTeachers) {
        return { data: null, error };
      }

      // Return teachers with highest ratings as featured
      const featured = allTeachers
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
      
      return { data: featured, error: null };
    } catch (error) {
      console.error('Get featured teachers error:', error);
      return { data: null, error: error instanceof Error ? error.message : 'Failed to get featured teachers' };
    }
  }

  // Mock data for development
  private static getMockTeachers(): Teacher[] {
    return [
      {
        id: "teacher-quang-dung",
        name: "Thầy Quang Dũng",
        title: "Giám đốc Học thuật & Giảng viên chính",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        bio: "Với hơn 10 năm kinh nghiệm giảng dạy tiếng Nhật, thầy Quang Dũng đã đào tạo hàng nghìn học viên đạt chứng chỉ JLPT. Chuyên gia về phương pháp giảng dạy hiện đại và tương tác.",
        specializations: ["JLPT N5-N1", "Tiếng Nhật Thương mại", "Phương pháp giảng dạy"],
        experience: "10+ năm",
        education: ["Thạc sĩ Ngôn ngữ Nhật - Đại học Ngoại ngữ Hà Nội", "Chứng chỉ Giảng dạy Tiếng Nhật - Tokyo University"],
        certifications: ["JLPT N1", "JTEST A Level", "Teaching Japanese as Foreign Language"],
        teachingStyle: "Tương tác, thực hành nhiều, học qua trò chơi và tình huống thực tế",
        coursesCount: 15,
        studentsCount: 2500,
        rating: 4.9,
        isActive: true,
        createdAt: "2020-01-01T00:00:00Z"
      },
      {
        id: "teacher-minh-anh",
        name: "Cô Minh Anh",
        title: "Giảng viên Tiếng Nhật & Chuyên gia Anime-Manga",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c5db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        bio: "Chuyên gia về văn hóa Nhật Bản và biên dịch Anime-Manga. Cô Minh Anh mang đến phương pháp học tiếng Nhật thông qua văn hóa pop một cách sinh động và thú vị.",
        specializations: ["Biên dịch Anime-Manga", "Văn hóa Nhật Bản", "JLPT N5-N3"],
        experience: "7 năm",
        education: ["Cử nhân Ngôn ngữ Nhật - Đại học Khoa học Xã hội và Nhân văn", "Khóa đào tạo Biên dịch chuyên nghiệp"],
        certifications: ["JLPT N1", "Chung chỉ Biên dịch Anime-Manga"],
        teachingStyle: "Học qua phim ảnh, manga, và các tình huống văn hóa thực tế",
        coursesCount: 8,
        studentsCount: 1200,
        rating: 4.8,
        isActive: true,
        createdAt: "2021-06-01T00:00:00Z"
      },
      {
        id: "teacher-duc-thanh",
        name: "Thầy Đức Thành",
        title: "Giảng viên Tiếng Nhật Thương mại",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        bio: "Với kinh nghiệm làm việc tại các công ty Nhật Bản, thầy Đức Thành chuyên về tiếng Nhật thương mại và kỹ năng giao tiếp trong môi trường công việc chuyên nghiệp.",
        specializations: ["Tiếng Nhật Thương mại", "Giao tiếp công sở", "JLPT N2-N1"],
        experience: "8 năm",
        education: ["Thạc sĩ Quản trị Kinh doanh - Keio University", "Cử nhân Ngôn ngữ Nhật - Đại học Ngoại thương"],
        certifications: ["JLPT N1", "Business Japanese Proficiency Test", "TOEIC 950"],
        teachingStyle: "Thực hành giao tiếp, mô phỏng tình huống công việc thực tế",
        coursesCount: 6,
        studentsCount: 800,
        rating: 4.7,
        isActive: true,
        createdAt: "2022-03-01T00:00:00Z"
      }
    ];
  }

  private static getMockTeacherDetail(teacherId: string): TeacherDetail | null {
    const teachers = this.getMockTeachers();
    const teacher = teachers.find(t => t.id === teacherId);
    
    if (!teacher) return null;

    const detailsMap: { [key: string]: any } = {
      "teacher-quang-dung": {
        socialLinks: {
          facebook: "https://facebook.com/quangdung.japanese",
          linkedin: "https://linkedin.com/in/quangdung",
          youtube: "https://youtube.com/@QuangDungJapanese"
        },
        achievements: [
          "Giải thưởng Giảng viên Xuất sắc 2023",
          "Tác giả sách 'Học tiếng Nhật hiệu quả'",
          "Chuyên gia tư vấn chương trình JLPT",
          "Founder Otaku Online Group"
        ],
        coursesTeaching: ["jlpt-n5", "jlpt-n4", "jlpt-n3", "teaching-methodology"],
        testimonials: [
          {
            studentName: "Nguyễn Thị Mai",
            comment: "Thầy dạy rất tâm huyết và dễ hiểu. Em đã pass N3 trong lần thi đầu tiên!",
            rating: 5,
            date: "2024-01-15"
          },
          {
            studentName: "Trần Văn Nam",
            comment: "Phương pháp giảng dạy của thầy rất hiệu quả, giúp em có được công việc tại công ty Nhật.",
            rating: 5,
            date: "2024-02-20"
          }
        ]
      },
      "teacher-minh-anh": {
        socialLinks: {
          facebook: "https://facebook.com/minhanh.anime",
          youtube: "https://youtube.com/@MinhAnhAnime"
        },
        achievements: [
          "Chuyên gia biên dịch Anime hàng đầu",
          "Dịch giả cho 50+ bộ Anime nổi tiếng",
          "Giải thưởng Người dịch xuất sắc 2022"
        ],
        coursesTeaching: ["anime-translation", "jlpt-n5", "jlpt-n4"],
        testimonials: [
          {
            studentName: "Lê Thị Hoa",
            comment: "Cô dạy rất vui và sinh động. Em học được rất nhiều về văn hóa Nhật qua anime.",
            rating: 5,
            date: "2024-01-10"
          }
        ]
      },
      "teacher-duc-thanh": {
        socialLinks: {
          linkedin: "https://linkedin.com/in/ducthanh"
        },
        achievements: [
          "Cựu nhân viên Toyota Việt Nam",
          "Chuyên gia đào tạo Tiếng Nhật Thương mại",
          "Tư vấn cho 100+ sinh viên đi làm tại Nhật"
        ],
        coursesTeaching: ["business-japanese", "jlpt-n2", "jlpt-n1"],
        testimonials: [
          {
            studentName: "Phạm Văn Tùng",
            comment: "Thầy có kinh nghiệm thực tế rất tốt, giúp em chuẩn bị tốt cho môi trường làm việc Nhật Bản.",
            rating: 5,
            date: "2024-03-05"
          }
        ]
      }
    };

    const details = detailsMap[teacherId] || {
      socialLinks: {},
      achievements: [],
      coursesTeaching: [],
      testimonials: []
    };

    return {
      ...teacher,
      ...details
    };
  }
}