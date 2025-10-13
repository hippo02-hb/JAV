import { Hero } from "../components/Hero";
import { USP } from "../components/USP";
import { FeaturedCourses } from "../components/FeaturedCourses";
import { Testimonials } from "../components/Testimonials";
import { BackToTop } from "../components/BackToTop";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { BookOpen, Users, Award, GraduationCap, ArrowRight, Sparkles, Target, Heart, Lightbulb } from "lucide-react";
import { motion } from "motion/react";

export function Home() {
  return (
    <div>
      <Hero />
      
      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4 bg-brand-lavender/50 text-brand-navy border-brand-lavender">
                Lý do chọn chúng tôi
              </Badge>
              <h2 className="text-3xl md:text-4xl mb-4">
                Tại Sao Chọn <span className="text-brand-navy">TNQDO</span>?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Chúng tôi mang đến trải nghiệm học tiếng Nhật khác biệt với phương pháp hiện đại và đội ngũ chuyên nghiệp
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Sparkles,
                  title: "9+ Khóa học",
                  description: "Từ N5 đến N3 và nghiệp vụ chuyên sâu",
                  color: "from-brand-lavender to-brand-lavender/60"
                },
                {
                  icon: Users,
                  title: "100% Online",
                  description: "Học mọi lúc, mọi nơi với công nghệ hiện đại",
                  color: "from-brand-navy to-brand-lavender"
                },
                {
                  icon: Target,
                  title: "Giáo viên N2+",
                  description: "Đội ngũ giảng viên giàu kinh nghiệm",
                  color: "from-brand-green to-brand-green/80"
                },
                {
                  icon: Heart,
                  title: "Tỷ lệ đỗ 95%+",
                  description: "Phương pháp độc quyền, AI hỗ trợ",
                  color: "from-brand-navy to-brand-navy/80"
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="p-8 text-center hover:shadow-xl transition-all duration-300 group border-0 shadow-lg h-full">
                      <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="mb-3 group-hover:text-brand-navy transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <FeaturedCourses />

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-brand-gray to-brand-lavender/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4 bg-brand-lavender/50 text-brand-navy border-brand-lavender">
                  Tầm nhìn & Sứ mệnh
                </Badge>
                <h2 className="text-3xl md:text-4xl mb-6">
                  "Học Là Phải <span className="text-brand-navy">Vui</span>!"
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Tại TNQDO, chúng tôi tin rằng việc học tiếng Nhật không chỉ là ghi nhớ từ vựng và ngữ pháp, 
                  mà còn là hành trình khám phá văn hóa, kết nối con người và mở ra những cơ hội mới.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-lavender/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="w-4 h-4 text-brand-navy" />
                    </div>
                    <div>
                      <h4 className="mb-2">Đổi mới</h4>
                      <p className="text-sm text-muted-foreground">Phương pháp giảng dạy hiện đại</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-brand-lavender/50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Heart className="w-4 h-4 text-brand-navy" />
                    </div>
                    <div>
                      <h4 className="mb-2">Đam mê</h4>
                      <p className="text-sm text-muted-foreground">Yêu thương và nhiệt huyết</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <h3 className="text-xl mb-6 text-center">Giá trị cốt lõi</h3>
                  <div className="space-y-4">
                    {[
                      { label: "Đồng hành", value: "100%" },
                      { label: "Chất lượng", value: "95%" },
                      { label: "Cộng đồng", value: "98%" },
                      { label: "Đổi mới", value: "92%" }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">{item.label}</span>
                          <span className="text-sm text-brand-navy">{item.value}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: item.value }}
                            transition={{ duration: 1, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-brand-navy to-brand-navy/80 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <USP />

      {/* Enhanced CTA Section */}
      <section className="py-20 bg-gradient-to-br from-brand-navy via-brand-navy/90 to-brand-navy/80 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl" />
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-brand-lavender/20 rounded-full blur-2xl" />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-brand-lavender/30 rounded-full blur-lg" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-5xl mb-6 leading-tight">
              Sẵn Sàng Bắt Đầu 
              <span className="block text-brand-lavender">Hành Trình Nhật Bản?</span>
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Đăng ký ngay hôm nay để nhận tư vấn miễn phí và ưu đãi đặc biệt dành cho học viên mới
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 justify-center mb-8"
            >
              <Button 
                size="lg" 
                className="bg-white text-brand-navy hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-3"
                onClick={() => window.location.hash = '#/contact'}
              >
                Đăng ký ngay
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                className="bg-transparent border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-3"
                onClick={() => window.location.hash = '#/courses'}
              >
                Xem khóa học
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>2000+ học viên</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>95% tỷ lệ đậu</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5" />
                <span>4.8/5 đánh giá</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}