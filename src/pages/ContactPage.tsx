import { Contact } from "../components/Contact";
import { Card } from "../components/ui/card";
import { MapPin, Clock, Globe } from "lucide-react";

export function ContactPage() {
  const workingHours = [
    { day: "Thứ 2 - Thứ 6", time: "8:00 - 20:00" },
    { day: "Thứ 7 - Chủ nhật", time: "9:00 - 18:00" }
  ];
  
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.163397943485!2d106.6225247152019!3d10.78359959231438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c033ddd4697%3A0xb6b9dd2506df4c36!2zMkIgxJAuIEhvw6BuZyBOZ-G7jWMgUGjDoWNoLCBQaMO6IFRo4buNIEhvw6AsIFTDom4gUGjDuiwgSOG7kyBDaMOtIE1pbmggNzAwMDAwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1628842602051!5m2!1svi!2s";

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-brand-navy to-brand-navy/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-xl text-white/90">
              Sẵn sàng đồng hành cùng bạn trên hành trình chinh phục tiếng Nhật
            </p>
          </div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-lavender/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-brand-navy" />
                </div>
                <h3 className="mb-2">Địa chỉ</h3>
                <p className="text-sm text-muted-foreground">
                  2B Hoàng Ngọc Phách<br />
                  P. Phú Thọ Hòa, Q. Tân Phú<br />
                  TP. Hồ Chí Minh
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-lavender/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-brand-navy" />
                </div>
                <h3 className="mb-2">Giờ làm việc</h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  {workingHours.map((item, index) => (
                    <div key={index}>
                      <div>{item.day}</div>
                      <div>{item.time}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-brand-lavender/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-brand-navy" />
                </div>
                <h3 className="mb-2">Học Online</h3>
                <p className="text-sm text-muted-foreground">
                  100% trực tuyến<br />
                  Học mọi lúc, mọi nơi<br />
                  Phù hợp mọi đối tượng
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact */}
      <Contact />

      {/* Map & Additional Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Map Section */}
              <Card className="p-6 overflow-hidden">
                <h3 className="mb-4">Vị Trí Của Chúng Tôi</h3>
                <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
                   <iframe 
                    src={mapEmbedUrl}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                 <p className="text-sm text-muted-foreground mt-4">
                  <strong>Địa chỉ:</strong> 2B Hoàng Ngọc Phách, P. Phú Thọ Hòa, Q. Tân Phú, TP. Hồ Chí Minh
                </p>
              </Card>

              {/* Social & Additional */}
              <div className="space-y-6">
                <Card className="p-6">
                  <h3 className="mb-4">Thông Tin Thêm</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-brand-navy">•</span>
                      <p>
                        <strong>Thời gian phản hồi:</strong> Chúng tôi cam kết phản hồi 
                        mọi yêu cầu trong vòng 24 giờ làm việc.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-brand-navy">•</span>
                      <p>
                        <strong>Tư vấn miễn phí:</strong> Đăng ký để nhận tư vấn chi tiết 
                        về lộ trình học phù hợp với bạn.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-brand-navy">•</span>
                      <p>
                        <strong>Kiểm tra đầu vào:</strong> Miễn phí kiểm tra trình độ 
                        để xác định lộ trình học phù hợp.
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-brand-navy">•</span>
                      <p>
                        <strong>Học thử:</strong> Có thể tham gia học thử 1 buổi để 
                        trải nghiệm phương pháp giảng dạy.
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-brand-lavender/20 to-brand-lavender/10 border-2 border-brand-lavender">
                  <h3 className="mb-3">Ưu Đãi Đặc Biệt</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎁</span>
                      <span>Giảm 10% khi đóng học phí toàn khóa</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📚</span>
                      <span>Tặng tài liệu học tập độc quyền</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🎯</span>
                      <span>Miễn phí kiểm tra trình độ đầu vào</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">💝</span>
                      <span>Quà tặng khi giới thiệu bạn bè</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Snippet */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-4">
              Có Câu Hỏi?
            </h2>
            <p className="text-muted-foreground mb-8">
              Xem thêm các câu hỏi thường gặp hoặc liên hệ trực tiếp với chúng tôi
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => window.location.hash = '#/faq'}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Xem câu hỏi thường gặp
              </button>
              <a
                href="tel:+84901189399"
                className="px-6 py-3 bg-brand-navy text-white hover:bg-brand-navy/90 rounded-lg transition-colors"
              >
                Gọi ngay: (+84) 901 189 399
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
