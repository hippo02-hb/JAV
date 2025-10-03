import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Clock, Users, Star, ArrowRight, BookOpen, Trophy, Zap } from "lucide-react";
import { motion } from "motion/react";
import { CoursesAPI, Course } from "../utils/courses-api";
import { eventBus, EVENTS } from "../utils/event-bus";

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(price);
};

// Helper function to get color and icon based on level
const getLevelStyle = (level: string) => {
  switch (level.toUpperCase()) {
    case 'N5':
      return { color: 'from-brand-green to-brand-green/80', icon: BookOpen };
    case 'N4':
      return { color: 'from-brand-lavender to-brand-lavender/80', icon: Trophy };
    case 'N3':
      return { color: 'from-brand-navy to-brand-navy/80', icon: Zap };
    case 'BUSINESS':
      return { color: 'from-brand-rose to-brand-rose/80', icon: Trophy };
    case 'PROFESSIONAL':
      return { color: 'from-brand-lavender to-brand-navy', icon: Zap };
    default:
      return { color: 'from-brand-navy to-brand-navy/60', icon: BookOpen };
  }
};

export function FeaturedCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await CoursesAPI.getFeaturedCourses();
        if (data && !error) {
          setCourses(data);
        }
      } catch (error) {
        console.error('Error fetching featured courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    // Listen for course updates
    const handleCoursesUpdated = () => {
      fetchCourses();
    };

    eventBus.on(EVENTS.COURSES_UPDATED, handleCoursesUpdated);

    return () => {
      eventBus.off(EVENTS.COURSES_UPDATED, handleCoursesUpdated);
    };
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-brand-gray to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-brand-lavender/50 text-brand-navy border-brand-lavender">
                Khóa học nổi bật
              </Badge>
              <h2 className="text-3xl md:text-4xl mb-4">
                Lộ Trình Học <span className="text-brand-navy">Hoàn Hảo</span>
              </h2>
            </div>
            <div className="grid lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-brand-gray to-white">
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
              Khóa học nổi bật
            </Badge>
            <h2 className="text-3xl md:text-4xl mb-4">
              Lộ Trình Học <span className="text-brand-navy">Hoàn Hảo</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Từ người mới bắt đầu đến trình độ trung cấp, chúng tôi có lộ trình phù hợp cho mọi học viên
            </p>
          </motion.div>

          {/* Courses Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {courses.map((course, index) => {
              const { color, icon: IconComponent } = getLevelStyle(course.level);
              const mockStudents = Math.floor(Math.random() * 1000) + 500; // Mock student count
              const mockRating = (Math.random() * 0.5 + 4.5).toFixed(1); // Mock rating 4.5-5.0
              
              return (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                    {/* Course Header */}
                    <div className={`h-2 bg-gradient-to-r ${color}`} />
                    
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <Badge variant="secondary" className="bg-gray-100">
                          {course.level}
                        </Badge>
                      </div>
                      
                      <CardTitle className="text-xl group-hover:text-brand-navy transition-colors">
                        {course.name}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed line-clamp-2">
                        {course.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Course Stats */}
                      <div className="grid grid-cols-3 gap-4 py-4 bg-gray-50 rounded-lg">
                        <div className="text-center">
                          <Clock className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                          <div className="text-sm text-gray-600">{course.duration}</div>
                        </div>
                        <div className="text-center">
                          <Users className="w-4 h-4 mx-auto mb-1 text-gray-500" />
                          <div className="text-sm text-gray-600">{mockStudents}+</div>
                        </div>
                        <div className="text-center">
                          <Star className="w-4 h-4 mx-auto mb-1 text-yellow-500 fill-current" />
                          <div className="text-sm text-gray-600">{mockRating}</div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="space-y-2">
                        {course.features.slice(0, 4).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-brand-navy rounded-full" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pricing */}
                      <div className="pt-4 border-t">
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-2xl text-brand-navy">{formatPrice(course.price)}</span>
                          {course.price > 0 && (
                            <>
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(course.price * 1.2)}
                              </span>
                              <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20">
                                Tiết kiệm {formatPrice(course.price * 0.2)}
                              </Badge>
                            </>
                          )}
                        </div>

                        <Button 
                          className="w-full bg-gradient-to-r from-brand-navy to-brand-navy/80 hover:from-brand-navy/90 hover:to-brand-navy group"
                          onClick={() => window.location.hash = `#/courses/${course.id}`}
                        >
                          Xem chi tiết
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Empty state */}
          {courses.length === 0 && !loading && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg mb-2">Chưa có khóa học nào</h3>
              <p className="text-gray-600">Vui lòng quay lại sau hoặc liên hệ admin để thêm khóa học.</p>
            </div>
          )}

          {/* CTA */}
          {courses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => window.location.hash = '#/courses'}
                className="border-brand-navy/20 text-brand-navy hover:bg-brand-lavender/10"
              >
                Xem tất cả khóa học
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}