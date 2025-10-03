import { useState, useEffect } from "react";
import { CoursesAPI, CourseDetail } from "../utils/courses-api";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Separator } from "../components/ui/separator";
import { 
  Clock, 
  Users, 
  Star, 
  CheckCircle2, 
  Target,
  BookOpen,
  Phone,
  Mail,
  ArrowLeft
} from "lucide-react";
import { motion } from "motion/react";

interface CourseDetailPageProps {
  courseId: string;
}

export function CourseDetailPage({ courseId }: CourseDetailPageProps) {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  const loadCourse = async () => {
    setLoading(true);
    const { data } = await CoursesAPI.getCourseById(courseId);
    setCourse(data);
    setLoading(false);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const handleContactForCourse = () => {
    const message = `Xin chào! Tôi muốn đăng ký khóa học "${course?.name}". Vui lòng tư vấn cho tôi.`;
    const phoneNumber = '84901189399';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải thông tin khóa học...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Không tìm thấy khóa học</h2>
          <Button onClick={() => window.location.hash = '#/courses'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách khóa học
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-navy to-brand-navy/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Button
              variant="ghost"
              className="mb-6 text-white hover:bg-white/10"
              onClick={() => window.location.hash = '#/courses'}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge className="mb-4 bg-brand-lavender text-brand-navy">
                  {course.level}
                </Badge>
                <h1 className="text-4xl md:text-5xl mb-4 text-white">
                  {course.name}
                </h1>
                <p className="text-xl text-white/90 mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{Math.floor(Math.random() * 500) + 100}+ học viên</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-current text-yellow-400" />
                    <span>4.8/5</span>
                  </div>
                </div>

                <div className="flex items-baseline gap-4 mb-6">
                  <div className="text-4xl text-brand-lavender">
                    {course.price > 0 ? formatPrice(course.price) : 'Liên hệ'}
                  </div>
                  {course.price > 0 && (
                    <div className="text-xl text-white/60 line-through">
                      {formatPrice(course.price * 1.2)}
                    </div>
                  )}
                </div>

                <Button 
                  size="lg"
                  className="bg-brand-lavender text-brand-navy hover:bg-brand-lavender/90"
                  onClick={handleContactForCourse}
                >
                  Đăng ký ngay
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="md:col-span-2 space-y-8">
                {/* Features */}
                <Card className="p-8">
                  <h2 className="text-2xl mb-6 flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-brand-green" />
                    Tính năng khóa học
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Syllabus */}
                {course.syllabus && course.syllabus.length > 0 && (
                  <Card className="p-8">
                    <h2 className="text-2xl mb-6 flex items-center gap-3">
                      <BookOpen className="w-6 h-6 text-brand-navy" />
                      Chương trình học
                    </h2>
                    <div className="space-y-4">
                      {course.syllabus.map((item, index) => (
                        <div key={index} className="border-l-4 border-brand-lavender pl-4 py-2">
                          <h3 className="mb-2">
                            Tuần {item.week}: {item.topic}
                          </h3>
                          <ul className="space-y-1 text-sm text-muted-foreground">
                            {item.content.map((content, contentIndex) => (
                              <li key={contentIndex}>• {content}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {/* Requirements */}
                {course.requirements && course.requirements.length > 0 && (
                  <Card className="p-8">
                    <h2 className="text-2xl mb-6 flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-brand-navy" />
                      Yêu cầu tham gia
                    </h2>
                    <ul className="space-y-3">
                      {course.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-brand-lavender/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs text-brand-navy">{index + 1}</span>
                          </div>
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Outcomes */}
                {course.outcomes && course.outcomes.length > 0 && (
                  <Card className="p-8">
                    <h2 className="text-2xl mb-6 flex items-center gap-3">
                      <Target className="w-6 h-6 text-brand-navy" />
                      Mục tiêu đạt được
                    </h2>
                    <ul className="space-y-3">
                      {course.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Enrollment Card */}
                <Card className="p-6 sticky top-24">
                  <h3 className="mb-4">Đăng ký khóa học</h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Học phí:</span>
                      <span className="text-xl text-brand-navy">
                        {course.price > 0 ? formatPrice(course.price) : 'Liên hệ'}
                      </span>
                    </div>
                    {course.price > 0 && (
                      <>
                        <Separator />
                        <div className="bg-brand-green/10 p-3 rounded-lg">
                          <p className="text-sm text-brand-green text-center">
                            ⚡ Giảm 10% khi đóng trọn khóa
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  <Button 
                    className="w-full bg-brand-navy hover:bg-brand-navy/90 mb-4"
                    size="lg"
                    onClick={handleContactForCourse}
                  >
                    Đăng ký ngay
                  </Button>

                  <Separator className="my-4" />

                  <div className="space-y-3 text-sm">
                    <p className="text-muted-foreground text-center">
                      Hoặc liên hệ trực tiếp:
                    </p>
                    <a 
                      href="tel:+84901189399"
                      className="flex items-center gap-2 p-3 hover:bg-brand-lavender/20 rounded-lg transition-colors"
                    >
                      <Phone className="w-4 h-4 text-brand-navy" />
                      <span>(+84) 901 189 399</span>
                    </a>
                    <a 
                      href="mailto:otori.agimi@gmail.com"
                      className="flex items-center gap-2 p-3 hover:bg-brand-lavender/20 rounded-lg transition-colors"
                    >
                      <Mail className="w-4 h-4 text-brand-navy" />
                      <span>otori.agimi@gmail.com</span>
                    </a>
                  </div>
                </Card>

                {/* Info Card */}
                <Card className="p-6 bg-brand-gray">
                  <h4 className="mb-4">Thông tin thêm</h4>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-green" />
                      <span>Học thử miễn phí 1 buổi</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-green" />
                      <span>Hỗ trợ 24/7</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-green" />
                      <span>Tài liệu độc quyền</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-green" />
                      <span>Chứng chỉ hoàn thành</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}