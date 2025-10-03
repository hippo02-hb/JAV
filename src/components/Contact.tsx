import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-brand-lavender/50 text-brand-navy rounded-full mb-4">
              Liên hệ
            </div>
            <h2 className="text-3xl md:text-4xl mb-6">
              Bắt Đầu Hành Trình Của Bạn
            </h2>
            <p className="text-xl text-muted-foreground">
              Liên hệ ngay với chúng tôi để được tư vấn chi tiết
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-lavender/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-brand-navy" />
                  </div>
                  <div>
                    <h4 className="mb-2">Địa chỉ</h4>
                    <p className="text-sm text-muted-foreground">
                      2B Hoàng Ngọc Phách<br />
                      P. Phú Thọ Hòa - Q. Tân Phú<br />
                      TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-lavender/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-brand-navy" />
                  </div>
                  <div className="flex-1">
                    <h4 className="mb-2">Hotline</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <p className="text-muted-foreground">Mr. Triệu - Giám đốc chương trình</p>
                        <a href="tel:+84901189399" className="text-brand-navy hover:underline">
                          (+84) 901 189 399
                        </a>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Mr. Hưng - Thư ký & CSKH</p>
                        <a href="tel:+84939734210" className="text-brand-navy hover:underline">
                          (+84) 939 734 210
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-brand-lavender/50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-brand-navy" />
                  </div>
                  <div>
                    <h4 className="mb-2">Email</h4>
                    <a 
                      href="mailto:otori.agimi@gmail.com" 
                      className="text-sm text-brand-navy hover:underline"
                    >
                      otori.agimi@gmail.com
                    </a>
                  </div>
                </div>
              </Card>
            </div>

            {/* CTA Card */}
            <Card className="p-8 bg-gradient-to-br from-brand-navy to-brand-navy/80 text-white">
              <h3 className="text-white mb-4">
                Đăng Ký Tư Vấn Miễn Phí
              </h3>
              <p className="mb-6 text-white/90">
                Nhận tư vấn chi tiết về lộ trình học phù hợp, học phí ưu đãi và các chương trình khuyến mãi đặc biệt.
              </p>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm">Tư vấn lộ trình học phù hợp</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm">Kiểm tra trình độ miễn phí</span>
                </div>
                <div className="flex items-center gap-3 text-white/90">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="text-sm">Nhận ưu đãi học phí đặc biệt</span>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-white text-brand-navy hover:bg-gray-100"
                onClick={() => window.location.href = 'tel:+84901189399'}
              >
                Liên hệ ngay
              </Button>

              <p className="text-xs text-center mt-4 text-white/70">
                Hoặc gọi hotline để được hỗ trợ ngay lập tức
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
