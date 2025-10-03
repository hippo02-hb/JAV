import { About } from "../components/About";
import { Card } from "../components/ui/card";
import { Target, Users, Briefcase, TrendingUp } from "lucide-react";

export function AboutPage() {
  const highlights = [
    {
      icon: Target,
      title: "Ra đời 2021",
      description: "Khởi đầu từ thời Covid-19, TNQDO đã chuyển nguy thành cơ với mô hình học online hiệu quả."
    },
    {
      icon: Users,
      title: "Đội ngũ chuyên nghiệp",
      description: "Từ 2 giáo viên ban đầu, chúng tôi đã phát triển thành một tập thể giàu kinh nghiệm."
    },
    {
      icon: Briefcase,
      title: "Phương pháp độc quyền",
      description: "Áp dụng Chunking, Mnemonics, AI và các chiến lược học thi an toàn."
    },
    {
      icon: TrendingUp,
      title: "Định hướng nghề nghiệp",
      description: "Không chỉ dạy tiếng Nhật, chúng tôi giúp bạn tìm thấy đam mê và con đường sự nghiệp."
    }
  ];

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-brand-navy to-brand-navy/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Về Tiếng Nhật Quang Dũng Online
            </h1>
            <p className="text-xl text-white/90">
              Nơi kiến thức giao thoa, nơi cơ hội thăng tiến
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-brand-lavender/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-brand-navy" />
                    </div>
                    <h3 className="mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <About />

      {/* Otaku Online Group */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-brand-lavender/20 to-brand-lavender/10 border-2 border-brand-lavender">
              <div className="text-center">
                <div className="inline-block px-4 py-2 bg-brand-navy text-white rounded-full mb-4">
                  Otaku Online Group
                </div>
                <h2 className="mb-6">
                  Thành Viên Của Tập Đoàn Otaku Online Group
                </h2>
                <p className="text-muted-foreground mb-6">
                  TNQDO là một thành viên của Otaku Online Group - tập đoàn mẹ cung cấp các khóa học 
                  về Biên dịch Anime-Manga, Nghiệp vụ dạy tiếng Nhật, Kinh doanh trong Cosplay, 
                  Makeup Cosplay và nhiều lĩnh vực khác liên quan đến văn hóa Nhật Bản.
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="p-4 bg-white rounded-lg">
                    <div className="mb-2">🎌</div>
                    <div>Biên dịch Anime-Manga</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="mb-2">🎭</div>
                    <div>Cosplay & Makeup</div>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <div className="mb-2">📚</div>
                    <div>Nghiệp vụ dạy học</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
