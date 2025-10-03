import { Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-navy text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-lavender to-brand-lavender/80 rounded-lg flex items-center justify-center">
                <span className="text-brand-navy">日</span>
              </div>
              <div>
                <div className="text-white">TIẾNG NHẬT</div>
                <div className="text-xs">QUANG DŨNG ONLINE</div>
              </div>
            </div>
            <p className="text-sm mb-4">
              Nơi kiến thức giao thoa,<br />
              Nơi cơ hội thăng tiến
            </p>
            <p className="text-xs text-gray-400">
              Thành viên của Otaku Online Group
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => window.location.hash = '#/about'} className="hover:text-brand-lavender transition-colors">
                  Giới thiệu
                </button>
              </li>
              <li>
                <button onClick={() => window.location.hash = '#/courses'} className="hover:text-brand-lavender transition-colors">
                  Khóa học
                </button>
              </li>
              <li>
                <button onClick={() => window.location.hash = '#/blog'} className="hover:text-brand-lavender transition-colors">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => window.location.hash = '#/teachers'} className="hover:text-brand-lavender transition-colors">
                  Giáo viên
                </button>
              </li>
              <li>
                <button onClick={() => window.location.hash = '#/faq'} className="hover:text-brand-lavender transition-colors">
                  Hỏi đáp
                </button>
              </li>
              <li>
                <button onClick={() => window.location.hash = '#/contact'} className="hover:text-brand-lavender transition-colors">
                  Liên hệ
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>2B Hoàng Ngọc Phách, P. Phú Thọ Hòa, Q. Tân Phú, TP.HCM</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <a href="tel:+84901189399" className="hover:text-brand-lavender transition-colors">
                  (+84) 901 189 399
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:otori.agimi@gmail.com" className="hover:text-brand-lavender transition-colors">
                  otori.agimi@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 Tiếng Nhật Quang Dũng Online. All rights reserved.</p>
          <p className="mt-2">
            Được xây dựng với ❤️ cho những người yêu tiếng Nhật
          </p>
        </div>
      </div>
    </footer>
  );
}
