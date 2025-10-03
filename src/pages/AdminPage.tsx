import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { CoursesAPI, Course, CourseDetail } from "../utils/courses-api";
import { CourseManagement } from "../components/admin/CourseManagement";
import { BlogManagement } from "../components/admin/BlogManagement";
import { AdminStats } from "../components/admin/AdminStats";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { DebugPanel } from "../components/admin/DebugPanel";
import { AdminAuth } from "../utils/admin-auth";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { toast } from "sonner@2.0.3";
import { 
  BookOpen, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  ArrowLeft,
  LogOut,
  User,
  FileText
} from "lucide-react";

type AdminView = 'dashboard' | 'courses' | 'blog' | 'students' | 'analytics' | 'settings';

export function AdminPage() {
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication first
    if (!AdminAuth.requireAuth()) {
      return; // Will redirect to login
    }
    
    // Initialize session tracking
    AdminAuth.initSession();
    
    // Check for session timeout every minute
    const timeoutCheck = setInterval(() => {
      if (AdminAuth.checkSessionTimeout(60)) { // 60 minutes timeout
        toast.error("Phiên đăng nhập đã hết hạn");
      }
    }, 60000); // Check every minute

    loadCourses();

    return () => clearInterval(timeoutCheck);
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const { data, error } = await CoursesAPI.getAllCourses();
      if (error) {
        toast.error("Lỗi tải danh sách khóa học: " + error);
      } else {
        setCourses(data || []);
      }
    } catch (error) {
      toast.error("Lỗi tải danh sách khóa học");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSite = () => {
    window.location.hash = '#/';
  };

  const handleLogout = () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      AdminAuth.logout();
      toast.success("Đã đăng xuất thành công");
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'courses':
        return (
          <CourseManagement 
            courses={courses} 
            onCoursesChange={loadCourses}
          />
        );
      case 'blog':
        return (
          <BlogManagement 
            onBlogChange={() => {
              // Refresh data if needed
              console.log('Blog updated');
            }}
          />
        );
      case 'students':
        return (
          <div className="space-y-6">
            <h1>Quản lý Học viên</h1>
            <Card className="p-6">
              <p className="text-muted-foreground">Tính năng đang phát triển...</p>
            </Card>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <h1>Thống kê & Báo cáo</h1>
            <Card className="p-6">
              <p className="text-muted-foreground">Tính năng đang phát triển...</p>
            </Card>
          </div>
        );
      case 'settings':
        return <DebugPanel />;
      default:
        return <AdminStats courses={courses} />;
    }
  };

  const sidebarItems = [
    {
      id: 'dashboard' as AdminView,
      label: 'Tổng quan',
      icon: BarChart3,
      active: currentView === 'dashboard'
    },
    {
      id: 'courses' as AdminView,
      label: 'Quản lý khóa học',
      icon: BookOpen,
      active: currentView === 'courses'
    },
    {
      id: 'blog' as AdminView,
      label: 'Quản lý Blog',
      icon: FileText,
      active: currentView === 'blog'
    },
    {
      id: 'students' as AdminView,
      label: 'Quản lý học viên',
      icon: Users,
      active: currentView === 'students'
    },
    {
      id: 'analytics' as AdminView,
      label: 'Thống kê',
      icon: BarChart3,
      active: currentView === 'analytics'
    },
    {
      id: 'settings' as AdminView,
      label: 'Debug & Data',
      icon: Settings,
      active: currentView === 'settings'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToSite}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Về trang chủ
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-xl font-semibold text-gray-900">
              Admin Panel - TNQDO
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">
                Xin chào, {AdminAuth.getDisplayName()}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-brand-rose hover:text-brand-rose/80 hover:bg-brand-rose/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AdminSidebar
          items={sidebarItems}
          onItemClick={setCurrentView}
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
}