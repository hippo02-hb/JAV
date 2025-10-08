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
import { CheckoutPage } from "./pages/CheckoutPage";
import { Toaster } from "./components/ui/sonner";
import { Button } from "./components/ui/button";

export default function App() {
  const [currentPage, setCurrentPage] = useState(window.location.hash || '#/');

  useEffect(() => {
    console.log("App.tsx: Initializing with page:", window.location.hash);
    const handleHashChange = () => {
      console.log("App.tsx: Hash changed to:", window.location.hash);
      setCurrentPage(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    console.log(`App.tsx: Rendering page for route: ${currentPage}`);
    try {
      if (currentPage.startsWith('#/checkout/')) {
        const parts = currentPage.split('/');
        const courseId = parts[2];
        console.log(`App.tsx: Matched /checkout/, Course ID: ${courseId}`);
        if (!courseId) return <div>Lỗi: ID Khóa học không tồn tại.</div>;
        return <CheckoutPage courseId={courseId} />;
      }

      if (currentPage.startsWith('#/courses/')) {
        const parts = currentPage.split('/');
        const courseId = parts[2];
        console.log(`App.tsx: Matched /courses/, Course ID: ${courseId}`);
        if (!courseId) return <div>Lỗi: ID Khóa học không tồn tại.</div>;
        return <CourseDetailPage courseId={courseId} />;
      }

      if (currentPage.startsWith('#/blog/')) {
        const parts = currentPage.split('/');
        const slug = parts[2];
        console.log(`App.tsx: Matched /blog/, Slug: ${slug}`);
        if (!slug) return <div>Lỗi: Slug bài viết không tồn tại.</div>;
        return <BlogDetailPage slug={slug} />;
      }

      switch (currentPage) {
        case '#/about': return <AboutPage />;
        case '#/courses': return <CoursesPage />;
        case '#/blog': return <BlogPage />;
        case '#/teachers': return <TeachersPage />;
        case '#/faq': return <FAQPage />;
        case '#/contact': return <ContactPage />;
        case '#/admin': return <AdminPage />;
        case '#/admin/login': return <AdminLoginPage />;
        case '#/': return <Home />;
        default: 
          console.log(`App.tsx: No route matched. Defaulting to Home.`);
          return <Home />;
      }
    } catch (error) {
        console.error("App.tsx: A critical error occurred during page rendering:", error);
        return (
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Đã xảy ra lỗi nghiêm trọng</h1>
                <p className="mb-4">Ứng dụng không thể hiển thị trang này. Vui lòng thử lại sau.</p>
                <Button onClick={() => window.location.hash = '#/'}>Về trang chủ</Button>
            </div>
        );
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
