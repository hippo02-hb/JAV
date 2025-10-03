import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { AboutPage } from "./pages/AboutPage";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetailPage } from "./pages/BlogDetailPage";
import { TeachersPage } from "./pages/TeachersPage";
import { FAQPage } from "./pages/FAQPage";
import { ContactPage } from "./pages/ContactPage";
import { AdminPage } from "./pages/AdminPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { Toaster } from "./components/ui/sonner";
import { LocalStorageService } from "./utils/local-storage";

export default function App() {
  const [currentPage, setCurrentPage] = useState(window.location.hash || '#/');

  useEffect(() => {
    // Initialize LocalStorage with default data only if empty
    LocalStorageService.initializeDefaultCourses();
    LocalStorageService.initializeDefaultBlogPosts();
    
    // Debug: Log current data
    console.log('Current courses in storage:', LocalStorageService.getAllCourses().length);
    console.log('Current blog posts in storage:', LocalStorageService.getAllBlogPosts().length);
    
    const handleHashChange = () => {
      setCurrentPage(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    // Handle course detail page
    if (currentPage.startsWith('#/courses/')) {
      const courseId = currentPage.split('/')[2];
      return <CourseDetailPage courseId={courseId} />;
    }

    // Handle blog detail page
    if (currentPage.startsWith('#/blog/')) {
      const slug = currentPage.split('/')[2];
      return <BlogDetailPage slug={slug} />;
    }

    switch (currentPage) {
      case '#/about':
        return <AboutPage />;
      case '#/courses':
        return <CoursesPage />;
      case '#/blog':
        return <BlogPage />;
      case '#/teachers':
        return <TeachersPage />;
      case '#/faq':
        return <FAQPage />;
      case '#/contact':
        return <ContactPage />;
      case '#/admin':
        return <AdminPage />;
      case '#/admin/login':
        return <AdminLoginPage />;
      default:
        return <Home />;
    }
  };

  const showFooter = !['#/admin', '#/admin/login'].includes(currentPage);

  const showHeader = !['#/admin', '#/admin/login'].includes(currentPage);

  return (
    <div className="min-h-screen">
      {showHeader && <Header />}
      <main>
        {renderPage()}
      </main>
      {showFooter && <Footer />}
      <Toaster />
    </div>
  );
}
