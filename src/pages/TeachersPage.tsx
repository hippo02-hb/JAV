import { Teachers } from "../components/Teachers";
import { Card } from "../components/ui/card";
import { Award, Briefcase, Heart, Target } from "lucide-react";

export function TeachersPage() {
  const teacherQualities = [
    {
      icon: Award,
      title: "Chuyên nghiệp",
      description: "Giáo viên có chứng chỉ JLPT N2 và được đào tạo nghiệp vụ dạy học bài bản"
    },
    {
      icon: Briefcase,
      title: "Kinh nghiệm thực tế",
      description: "Làm việc trong môi trường Nhật Bản, biên dịch anime-manga chuyên nghiệp"
    },
    {
      icon: Heart,
      title: "Tâm huyết",
      description: "Đội ngũ giáo viên là những Otaku chính hiệu, yêu văn hóa Nhật Bản"
    },
    {
      icon: Target,
      title: "Cam kết chất lượng",
      description: "Luôn đồng hành, hỗ trợ học viên từ đầu đến cuối khóa học"
    }
  ];

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-brand-navy to-brand-navy/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Đội Ngũ Giáo Viên
            </h1>
            <p className="text-xl text-white/90">
              Đội ngũ giảng viên giàu kinh nghiệm, tâm huyết và chuyên nghiệp
            </p>
          </div>
        </div>
      </section>

      {/* Teacher Qualities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-brand-lavender/50 text-brand-navy rounded-full mb-4">
                Phẩm chất giáo viên
              </div>
              <h2 className="text-3xl md:text-4xl mb-4">
                Vì Sao Chọn Giáo Viên TNQDO?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {teacherQualities.map((quality, index) => {
                const Icon = quality.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-brand-lavender/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-brand-navy" />
                    </div>
                    <h3 className="mb-2">{quality.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {quality.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Teachers List */}
      <Teachers />

      {/* Teaching Approach */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="mb-4">Phương Pháp Giảng Dạy</h2>
                <p className="text-muted-foreground">
                  TNQDO áp dụng các phương pháp giảng dạy hiện đại và hiệu quả
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50 rounded-lg">
                  <h3 className="mb-3">Phương pháp Chunking</h3>
                  <p className="text-sm text-muted-foreground">
                    Chia nhỏ kiến thức phức tạp thành các phần dễ hiểu, giúp học viên 
                    tiếp thu nhanh và nhớ lâu hơn.
                  </p>
                </div>

                <div className="p-6 bg-brand-lavender/20 rounded-lg">
                  <h3 className="mb-3">Phương pháp Mnemonics</h3>
                  <p className="text-sm text-muted-foreground">
                    Sử dụng kỹ thuật ghi nhớ thông minh giúp học Kanji và từ vựng 
                    một cách hiệu quả.
                  </p>
                </div>

                <div className="p-6 bg-brand-green/10 rounded-lg">
                  <h3 className="mb-3">Huyền lục thư</h3>
                  <p className="text-sm text-muted-foreground">
                    Phương pháp độc quyền giúp học viên hiểu sâu về Hán tự và 
                    cách sử dụng trong ngữ cảnh.
                  </p>
                </div>

                <div className="p-6 bg-brand-lavender/20 rounded-lg">
                  <h3 className="mb-3">Hỗ trợ AI</h3>
                  <p className="text-sm text-muted-foreground">
                    Hệ thống AI tính toán tỷ lệ đậu, giúp giáo viên điều chỉnh 
                    lộ trình phù hợp với từng học viên.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-brand-lavender/20 rounded-lg text-center">
                <p className="text-sm text-brand-navy">
                  <strong>"Học là phải vui!"</strong> - Chúng tôi tin rằng khi học bằng niềm đam mê, 
                  bạn sẽ tiếp thu kiến thức tốt nhất và phát triển bền vững.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Support Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-brand-lavender/50 text-brand-navy rounded-full mb-4">
              Đội ngũ hỗ trợ
            </div>
            <h2 className="mb-6">
              Không Chỉ Có Giáo Viên
            </h2>
            <p className="text-muted-foreground mb-8">
              Tại TNQDO, bạn sẽ được hỗ trợ bởi một đội ngũ hoàn chỉnh
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <div className="text-4xl mb-3">👨‍🏫</div>
                <h3 className="mb-2">Giáo viên</h3>
                <p className="text-sm text-muted-foreground">
                  1-2 giáo viên chuyên nghiệp cho mỗi lớp học
                </p>
              </Card>

              <Card className="p-6">
                <div className="text-4xl mb-3">👨‍🎓</div>
                <h3 className="mb-2">Trợ giảng</h3>
                <p className="text-sm text-muted-foreground">
                  Theo sát và hỗ trợ học viên trong suốt khóa học
                </p>
              </Card>

              <Card className="p-6">
                <div className="text-4xl mb-3">💁‍♀️</div>
                <h3 className="mb-2">CSKH</h3>
                <p className="text-sm text-muted-foreground">
                  Bộ phận chăm sóc học viên luôn sẵn sàng hỗ trợ
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
