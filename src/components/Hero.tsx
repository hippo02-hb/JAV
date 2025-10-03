import { Button } from "./ui/button";
import { BookOpen, Users, Award, ArrowRight, Star, Play } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1594256347468-5cd43df8fbaf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBqYXBhbmVzZSUyMGNsYXNzcm9vbSUyMHN0dWRlbnRzfGVufDF8fHx8MTc1OTI4NzYxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Modern Japanese classroom"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-brand-navy/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/30 to-transparent" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 z-5">
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-brand-lavender rounded-full opacity-60"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/3 right-1/3 w-3 h-3 bg-brand-green rounded-full opacity-40"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-brand-navy to-brand-navy/80 text-white rounded-full mb-6 shadow-lg">
                <Star className="w-4 h-4 mr-2" />
                <span>Otaku Online Group</span>
                <Star className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
            >
              Nơi Kiến Thức
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-lavender to-brand-rose">
                Giao Thoa
              </span>
              <span className="block text-3xl md:text-4xl lg:text-5xl text-gray-200 mt-2">
                Nơi Cơ Hội Thăng Tiến
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed"
            >
              Chinh phục JLPT từ <span className="text-red-400">N5 đến N3</span> cùng đội ngũ giáo viên chuyên nghiệp. 
              Học online linh hoạt, phương pháp độc quyền, tỷ lệ đậu cao.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <Button 
                size="lg" 
                onClick={scrollToContact} 
                className="bg-gradient-to-r from-brand-navy to-brand-navy/80 hover:from-brand-navy/90 hover:to-brand-navy shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Đăng ký ngay
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm"
                onClick={() => window.location.hash = '#/courses'}
              >
                <Play className="w-5 h-5 mr-2" />
                Khám phá khóa học
              </Button>
            </motion.div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-navy to-brand-navy/80 rounded-lg flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl text-white">9+</div>
                  <div className="text-sm text-gray-300">Khóa học chuyên sâu</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-lavender to-brand-lavender/80 rounded-lg flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-brand-navy" />
                </div>
                <div>
                  <div className="text-2xl text-white">100%</div>
                  <div className="text-sm text-gray-300">Học online</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-green to-brand-green/80 rounded-lg flex items-center justify-center shadow-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl text-white">4+</div>
                  <div className="text-sm text-gray-300">Năm kinh nghiệm</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right side content */}
          <div className="lg:col-span-5 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl text-white mb-4">Tại sao chọn TNQDO?</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-brand-lavender rounded-full"></div>
                    <span className="text-gray-200">Giáo viên bản ngữ N2+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-gray-200">Phương pháp AI hỗ trợ</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-gray-200">Tỷ lệ đậu JLPT 95%+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span className="text-gray-200">Hỗ trợ 24/7</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
