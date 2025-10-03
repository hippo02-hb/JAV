import { Card } from "./ui/card";
import { CheckCircle2 } from "lucide-react";

export function USP() {
  const benefits = [
    "Định hướng nghề nghiệp cá nhân cho học viên bên cạnh việc cung cấp kiến thức Nhật ngữ",
    "Đội ngũ giáo viên chuyên nghiệp, trợ giảng, bộ phận chăm sóc học viên luôn đồng hành từ đầu tới cuối khóa học",
    "Giáo trình độc quyền được xây dựng bởi đội ngũ giáo viên chuyên nghiệp, bên cạnh sách giáo khoa uy tín",
    "Chiến lược học thi an toàn, nâng cao tỷ lệ đỗ với phương pháp Chunking, Mnemonics, Huyền lục thư",
    "Hệ thống tính tỉ lệ đậu cực nhạy bén với AI",
    "Lộ trình học cá nhân hóa đối với khóa học 1 kèm 1",
    "Lớp đại trà: 1-2 giáo viên + 1 trợ giảng luôn theo sát, kèm cặp học viên",
    "Lớp coaching 1-1: 1 giáo viên + lộ trình cá nhân hóa + video, tài liệu độc quyền",
    "Linh hoạt thanh toán từng tháng hoặc toàn khóa (giảm 10% khi đóng trọn khóa)"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-brand-lavender/50 text-brand-navy rounded-full mb-4">
              Điểm khác biệt
            </div>
            <h2 className="text-3xl md:text-4xl mb-6">
              Vì Sao Chọn TNQDO?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Các bạn nhận được gì khi học tại TNQDO?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://images.unsplash.com/photo-1608600712992-03e5325d94c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBsZWFybmluZyUyMHZpZGVvJTIwY2FsbHxlbnwxfHx8fDE3NTkyMjA0MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Online learning"
                className="w-full h-full object-cover rounded-2xl max-h-[500px]"
              />
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-3">
                    <CheckCircle2 className="w-6 h-6 text-brand-green flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{benefit}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
