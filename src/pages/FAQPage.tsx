import { FAQ } from "../components/FAQ";
import { Card } from "../components/ui/card";
import { MessageCircle, HelpCircle, Phone } from "lucide-react";
import { Button } from "../components/ui/button";

export function FAQPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Gọi điện trực tiếp",
      description: "Liên hệ hotline để được tư vấn ngay",
      action: "Gọi ngay",
      link: "tel:+84901189399"
    },
    {
      icon: MessageCircle,
      title: "Gửi email",
      description: "Gửi câu hỏi qua email, chúng tôi sẽ phản hồi trong 24h",
      action: "Gửi email",
      link: "mailto:otori.agimi@gmail.com"
    },
    {
      icon: HelpCircle,
      title: "Đăng ký tư vấn",
      description: "Để lại thông tin, chúng tôi sẽ liên hệ tư vấn",
      action: "Đăng ký",
      link: "#/contact"
    }
  ];

  const popularTopics = [
    {
      topic: "Về khóa học",
      questions: [
        "Thời gian học mỗi khóa là bao lâu?",
        "Có cần kiến thức nền không?",
        "Học online như thế nào?"
      ]
    },
    {
      topic: "Về học phí",
      questions: [
        "Học phí các khóa như thế nào?",
        "Có thể đóng từng tháng không?",
        "Có ưu đãi gì khi đăng ký sớm?"
      ]
    },
    {
      topic: "Về thi JLPT",
      questions: [
        "Có hỗ trợ đăng ký thi JLPT không?",
        "Tỷ lệ đậu của học viên ra sao?",
        "Có luyện đề thi thật không?"
      ]
    }
  ];

  return (
    <div className="pt-16">
      {/* Page Header */}
      <section className="py-20 bg-gradient-to-br from-brand-navy to-brand-navy/80 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl text-white mb-6">
              Câu Hỏi Thường Gặp
            </h1>
            <p className="text-xl text-white/90">
              Tìm câu trả lời cho những thắc mắc của bạn
            </p>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block px-4 py-2 bg-brand-lavender/50 text-brand-navy rounded-full mb-4">
                Chủ đề phổ biến
              </div>
              <h2 className="text-3xl md:text-4xl mb-4">
                Các Câu Hỏi Được Quan Tâm
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {popularTopics.map((item, index) => (
                <Card key={index} className="p-6">
                  <h3 className="mb-4">{item.topic}</h3>
                  <ul className="space-y-2">
                    {item.questions.map((question, qIndex) => (
                      <li key={qIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-brand-navy mt-1">•</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Component */}
      <FAQ />

      {/* Still Have Questions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="mb-4">
                Vẫn Còn Thắc Mắc?
              </h2>
              <p className="text-xl text-muted-foreground">
                Chúng tôi luôn sẵn sàng giải đáp mọi câu hỏi của bạn
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                    <div className="w-16 h-16 bg-brand-lavender/50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-brand-navy" />
                    </div>
                    <h3 className="text-center mb-2">{method.title}</h3>
                    <p className="text-sm text-muted-foreground text-center mb-4">
                      {method.description}
                    </p>
                    <Button 
                      className="w-full bg-brand-navy hover:bg-brand-navy/90"
                      onClick={() => {
                        if (method.link.startsWith('#')) {
                          window.location.hash = method.link;
                        } else {
                          window.location.href = method.link;
                        }
                      }}
                    >
                      {method.action}
                    </Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Tips */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 md:p-12 bg-gradient-to-br from-brand-lavender/20 to-brand-lavender/10 border-2 border-brand-lavender">
              <div className="text-center">
                <h2 className="mb-6">
                  💡 Lời Khuyên Từ Giáo Viên
                </h2>
                <div className="space-y-4 text-left">
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm">
                      <strong>Bắt đầu từ đâu?</strong> Nếu bạn chưa biết gì về tiếng Nhật, 
                      hãy bắt đầu với khóa "Nhập môn ngôn ngữ Nhật". Đây là nền tảng quan trọng 
                      cho toàn bộ hành trình học tập sau này.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm">
                      <strong>Học bao lâu để đạt N5?</strong> Theo kinh nghiệm của thầy Quang Triệu, 
                      chỉ cần 7-11 tháng thay vì 1-2 năm tự học. TNQDO đã tối ưu lộ trình để 
                      bạn học hiệu quả hơn.
                    </p>
                  </div>
                  <div className="p-4 bg-white rounded-lg">
                    <p className="text-sm">
                      <strong>Học online có hiệu quả không?</strong> Với phương pháp độc quyền, 
                      hỗ trợ AI và đội ngũ giáo viên tâm huyết, học online tại TNQDO không thua kém 
                      offline mà còn linh hoạt hơn nhiều!
                    </p>
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
