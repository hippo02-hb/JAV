import { Card } from "./ui/card";
import { Target, Eye, Heart, Zap, Users, TrendingUp } from "lucide-react";

export function About() {
  const coreValues = [
    {
      icon: Users,
      title: "Đồng hành & Hỗ trợ",
      description: "Không chỉ là giáo viên, TNQDO còn là người bạn, người hướng dẫn, luôn sát cánh cùng học viên."
    },
    {
      icon: Zap,
      title: "Đổi mới & Hiệu quả",
      description: "Ứng dụng AI, phương pháp Chunking, Mnemonics để tối ưu thời gian và tăng cao tỷ lệ đỗ."
    },
    {
      icon: Heart,
      title: "Đam mê & Truyền cảm hứng",
      description: "Khơi dậy tình yêu tiếng Nhật, biến việc học thành trải nghiệm thú vị, không gò bó."
    },
    {
      icon: Target,
      title: "Chất lượng & Chuyên nghiệp",
      description: "Tài liệu độc quyền, đội ngũ giàu kinh nghiệm luôn đảm bảo chuẩn đầu ra."
    },
    {
      icon: TrendingUp,
      title: "Cộng đồng & Phát triển",
      description: "Xây dựng cộng đồng năng động, kết nối người trẻ yêu tiếng Nhật."
    },
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-white to-brand-gray">
      <div className="container mx-auto px-4">
        {/* Brand Story */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-brand-lavender/50 text-brand-navy rounded-full mb-4">
              Về chúng tôi
            </div>
            <h2 className="text-3xl md:text-4xl mb-6">
              Hành Trình Của Chúng Tôi
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <img
                src="https://images.unsplash.com/photo-1743360164003-3b71179b8d51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKYXBhbmVzZSUyMHN0dWR5JTIwc3R1ZGVudHxlbnwxfHx8fDE3NTkyODYwODh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Students learning"
                className="w-full h-64 object-cover rounded-2xl"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="mb-4">
                TNQDO ra đời vào thời kì Covid-19 bùng nổ trong năm 2021. Từ khi chỉ mới là một nhóm 2 giáo viên, 
                TNQDO đã biến nguy thành cơ, từ đó chủ trương học Online, khám phá ra mô hình học Online tiện lợi.
              </p>
              <p>
                Giúp nhiều bạn Gen Z hứng thú với tiếng Nhật, lấy niềm đam mê làm cốt lõi cho định hướng nghề nghiệp về sau.
              </p>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-6 border-2 border-brand-lavender/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-navy rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2">Sứ mệnh</h3>
                  <p className="text-sm text-muted-foreground">
                    TNQDO mang đến cho mỗi học viên niềm đam mê cháy bổng để phát triển sự nghiệp tương lai. 
                    Chủ trương học tập trực tuyến tiện lợi cho Gen Y, Gen Z.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-2 border-brand-lavender/30">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-brand-navy rounded-lg flex items-center justify-center flex-shrink-0">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="mb-2">Tầm nhìn</h3>
                  <p className="text-sm text-muted-foreground">
                    "Học là phải vui!" - Trở thành nền tảng học tiếng Nhật Online hàng đầu dành cho thế hệ trẻ Việt Nam, 
                    nơi chinh phục JLPT dễ dàng và tìm thấy niềm vui, động lực lâu dài.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Core Values */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl mb-4">Giá Trị Cốt Lõi</h3>
            <p className="text-muted-foreground">
              Những giá trị mà chúng tôi cam kết mang đến cho học viên
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-brand-lavender/50 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-navy" />
                  </div>
                  <h4 className="mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
