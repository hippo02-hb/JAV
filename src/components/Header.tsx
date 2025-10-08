import { Button } from "./ui/button";
import { Menu, X, Settings } from "lucide-react";
import { useState, useEffect } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#/');

  const navigate = (path: string) => {
    window.location.hash = path;
    setCurrentPath(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Update current path when hash changes
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash || '#/');
    };

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const isActive = (path: string) => {
    return currentPath === path ? 'text-brand-navy' : '';
  };

  const handleAdminAccess = () => {
    navigate('#/admin/login');
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => navigate('#/')} className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-brand-navy to-brand-navy/80 rounded-lg flex items-center justify-center">
              <span className="text-white">日</span>
            </div>
            <div>
              <div className="font-bold text-lg leading-tight">TIẾNG NHẬT</div>
              <div className="text-xs text-muted-foreground leading-tight">QUANG DŨNG ONLINE</div>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <button onClick={() => navigate('#/about')} className={`hover:text-brand-navy transition-colors ${isActive('#/about')}`}>
              Giới thiệu
            </button>
            <button onClick={() => navigate('#/courses')} className={`hover:text-brand-navy transition-colors ${isActive('#/courses')}`}>
              Khóa học
            </button>
            <button onClick={() => navigate('#/blog')} className={`hover:text-brand-navy transition-colors ${isActive('#/blog')}`}>
              Blog
            </button>
            <button onClick={() => navigate('#/teachers')} className={`hover:text-brand-navy transition-colors ${isActive('#/teachers')}`}>
              Giáo viên
            </button>
            <button onClick={() => navigate('#/faq')} className={`hover:text-brand-navy transition-colors ${isActive('#/faq')}`}>
              Hỏi đáp
            </button>
            
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-3 border-t">
            <button 
              onClick={() => navigate('#/about')} 
              className={`block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors ${isActive('#/about')}`}
            >
              Giới thiệu
            </button>
            <button 
              onClick={() => navigate('#/courses')} 
              className={`block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors ${isActive('#/courses')}`}
            >
              Khóa học
            </button>
            <button 
              onClick={() => navigate('#/blog')} 
              className={`block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors ${isActive('#/blog')}`}
            >
              Blog
            </button>
            <button 
              onClick={() => navigate('#/teachers')} 
              className={`block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors ${isActive('#/teachers')}`}
            >
              Giáo viên
            </button>
            <button 
              onClick={() => navigate('#/faq')} 
              className={`block w-full text-left px-4 py-2 hover:bg-accent rounded-lg transition-colors ${isActive('#/faq')}`}
            >
              Hỏi đáp
            </button>
            <div className="px-4">
              <Button onClick={handleAdminAccess} className="w-full bg-brand-navy hover:bg-brand-navy/90">
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
