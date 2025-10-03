import { Courses } from "../components/Courses";
import { Card } from "../components/ui/card";
import { Clock, Calendar, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";

export function CoursesPage() {
  const learningPath = [
    {
      step: "1",
      title: "Nhập môn",
      duration: "1-2 tháng",
      description: "Học Hiragana, Katakana và kiến thức nền tảng"
    },
    {
      step: "2",
      title: "N5-N4",
      duration: "8-11 tháng",
      description: "Làm chủ kiến thức sơ cấp với 4 môn học"
    },
    {
      step: "3",
      title: "N3",
      duration: "5-6 tháng",
      description: "Nâng cao với 3 môn học trung cấp"
    },
    {
      step: "4",
      title: "Nghiệp vụ",
      duration: "Linh hoạt",
      description: "Chọn nghề nghiệp phù hợp với đam mê"
    }
  ];

  const benefits = [
    "Đóng học phí linh hoạt theo tháng hoặc toàn khóa",
    "Giảm ngay 10% khi đóng học phí toàn khóa",
    "Tài liệu độc quyền và bài giảng chuyên nghiệp",
    "Hỗ trợ 1-1 với trợ giảng và CSKH",
    "Được tính tỷ lệ đỗ bằng hệ thống AI",
    "Lộ trình học cá nhân hóa cho khóa 1 kèm 1"
  ];

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-brand-navy to-brand-navy/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Chương Trình Khóa Học
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Từ N5 tới N3 chỉ trong 7 môn học! Chỉ từ 8 tháng bạn có thể làm chủ N5 và N4
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-white">📚 9+ Khóa học</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-white">⏱️ Linh hoạt thời gian</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-white">🎯 Cam kết chất lượng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-brand-lavender/50 text-brand-navy rounded-full mb-4">
                Lộ trình học
              </div>
              <h2 className="text-3xl md:text-4xl mb-4">
                Lộ Trình Học Tập Hoàn Chỉnh
              </h2>
              <p className="text-xl text-muted-foreground">
                Từ người mới bắt đầu đến chuyên gia
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {learningPath.map((item, index) => (
                <Card key={index} className="p-6 relative hover:shadow-lg transition-shadow">
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-brand-navy text-white rounded-full flex items-center justify-center text-xl">
                    {item.step}
                  </div>
                  <div className="mt-4">
                    <h3 className="mb-2">{item.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Clock className="w-4 h-4" />
                      <span>{item.duration}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses List */}
      <Courses />

      {/* Benefits & Pricing */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Benefits */}
              <div>
                <h2 className="mb-6">Quyền Lợi Học Viên</h2>
                <div className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Payment Options */}
              <div>
                <h2 className="mb-6">Phương Thức Thanh Toán</h2>
                
                <Card className="p-6 mb-4 border-2 border-brand-green/20 bg-brand-green/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-brand-green rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2">Thanh toán toàn khóa</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Đóng học phí một lần cho toàn bộ khóa học
                      </p>
                      <div className="inline-block px-3 py-1 bg-brand-green text-white rounded-full text-sm">
                        Giảm ngay 10%
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 mb-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="mb-2">Thanh toán theo tháng</h3>
                      <p className="text-sm text-muted-foreground">
                        Linh hoạt đóng học phí từng tháng phù hợp với nhu cầu của bạn
                      </p>
                    </div>
                  </div>
                </Card>

                <Button 
                  size="lg" 
                  className="w-full bg-brand-navy hover:bg-brand-navy/90"
                  onClick={() => window.location.hash = '#/contact'}
                >
                  Tư vấn học phí chi tiết
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
