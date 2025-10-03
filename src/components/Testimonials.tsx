import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Star, Quote } from "lucide-react";
import { motion } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const testimonials = [
  {
    name: "Nguyễn Minh Anh",
    role: "Học viên N3",
    company: "Công ty TNHH ABC",
    content: "Sau 8 tháng học tại TNQDO, tôi đã vượt qua kỳ thi N3 với điểm số cao. Phương pháp giảng dạy rất thực tế và giáo viên nhiệt tình hỗ trợ.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1725473823311-122c1c86966b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGFzaWFuJTIwc3R1ZGVudCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1OTI4NzcwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    course: "N3 Business"
  },
  {
    name: "Trần Hoàng Long",
    role: "Sinh viên Đại học",
    company: "ĐH Ngoại Thương",
    content: "Tôi thích cách TNQDO kết hợp học thuật với thực hành. Đặc biệt khóa Anime-Manga Translation rất thú vị và bổ ích cho sở thích của tôi.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1722263147569-fa8873772867?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB2aWV0bmFtZXNlJTIwc3R1ZGVudHxlbnwxfHx8fDE3NTkyODc3MTF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    course: "N4 + Translation"
  },
  {
    name: "Lê Thị Hương",
    role: "Nhân viên IT",
    company: "Tech Solutions",
    content: "Học online rất linh hoạt, phù hợp với lịch làm việc của tôi. Sau N4, tôi có thể đọc hiểu tài liệu kỹ thuật tiếng Nhật và có cơ hội thăng tiến.",
    rating: 5,
    avatar: "/api/placeholder/64/64",
    course: "N4 Technical"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-brand-lavender/50 text-brand-navy border-brand-lavender">
              Phản hồi học viên
            </Badge>
            <h2 className="text-3xl md:text-4xl mb-4">
              Câu Chuyện <span className="text-brand-navy">Thành Công</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hơn 2000+ học viên đã tin tưởng và thành công cùng TNQDO
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                  <CardContent className="p-6 relative">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4">
                      <Quote className="w-8 h-8 text-brand-lavender/30 fill-current" />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-700 mb-6 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                        <div className="text-sm text-gray-600">{testimonial.role}</div>
                        <div className="text-xs text-gray-500">{testimonial.company}</div>
                      </div>
                      <Badge variant="secondary" className="bg-brand-lavender/20 text-brand-navy border-brand-lavender">
                        {testimonial.course}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl text-brand-navy mb-2">2000+</div>
              <div className="text-sm text-gray-600">Học viên tin tưởng</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-brand-navy mb-2">95%</div>
              <div className="text-sm text-gray-600">Tỷ lệ đậu JLPT</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-brand-navy mb-2">4.8/5</div>
              <div className="text-sm text-gray-600">Đánh giá trung bình</div>
            </div>
            <div className="text-center">
              <div className="text-3xl text-brand-navy mb-2">24/7</div>
              <div className="text-sm text-gray-600">Hỗ trợ học viên</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}