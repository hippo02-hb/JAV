import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { BookOpen, Clock, User, Plus, CheckCircle2, Star, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";
import { CoursesAPI, Course } from "../utils/courses-api";
import { motion } from "motion/react";
import { eventBus, EVENTS } from "../utils/event-bus";

// Helper function to format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { 
    style: 'currency', 
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(price);
};

// Helper function to get level color
const getLevelColor = (level: string) => {
  switch (level.toUpperCase()) {
    case 'N5':
      return 'bg-green-100 text-green-700 border-green-200';
    case 'N4':
      return 'bg-brand-lavender/40 text-brand-navy border-brand-lavender';
    case 'N3':
      return 'bg-brand-green/10 text-brand-green border-brand-green/20';
    case 'BUSINESS':
      return 'bg-brand-lavender/50 text-brand-navy border-brand-lavender';
    case 'PROFESSIONAL':
      return 'bg-brand-lavender/30 text-brand-navy border-brand-lavender';
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

export function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    loadCourses();

    // Listen for course updates
    const handleCoursesUpdated = () => {
      loadCourses();
    };

    eventBus.on(EVENTS.COURSES_UPDATED, handleCoursesUpdated);

    return () => {
      eventBus.off(EVENTS.COURSES_UPDATED, handleCoursesUpdated);
    };
  }, []);

  const loadCourses = async () => {
    try {
      const { data, error } = await CoursesAPI.getAllCourses();
      if (data && !error) {
        setCourses(data.filter(course => course.isActive));
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactForCourse = (courseName: string) => {
    const message = `Xin chào! Tôi muốn tìm hiểu thêm về khóa học "${courseName}". Vui lòng tư vấn cho tôi.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/84123456789?text=${encodedMessage}`, '_blank');
  };

  // Get unique levels for tabs
  const levels = ['all', ...Array.from(new Set(courses.map(course => course.level)))];

  // Filter courses by selected level
  const filteredCourses = selectedLevel === 'all' 
    ? courses 
    : courses.filter(course => course.level === selectedLevel);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl mb-4">Tất Cả Khóa Học</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-gray-200 animate-pulse rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

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
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-brand-lavender/50 text-brand-navy border-brand-lavender">
              Danh sách khóa học
            </Badge>
            <h2 className="text-3xl md:text-4xl mb-4">
              Tất Cả <span className="text-brand-navy">Khóa Học</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Khám phá toàn bộ chương trình học tiếng Nhật của chúng tôi
            </p>
          </motion.div>

          {/* Level Filter Tabs */}
          <Tabs value={selectedLevel} onValueChange={setSelectedLevel} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 mb-8">
              <TabsTrigger value="all">Tất cả</TabsTrigger>
              {levels.filter(level => level !== 'all').map((level) => (
                <TabsTrigger key={level} value={level}>{level}</TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedLevel} className="space-y-8">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg mb-2">Chưa có khóa học nào</h3>
                  <p className="text-gray-600">
                    {selectedLevel === 'all' 
                      ? 'Hiện tại chưa có khóa học nào được thêm vào hệ thống.'
                      : `Chưa có khóa học nào cho cấp độ ${selectedLevel}.`
                    }
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course, index) => (
                    <motion.div
                      key={course.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="h-full group hover:shadow-xl transition-all duration-300">
                        <CardHeader className="pb-4">
                          <div className="flex items-start justify-between mb-3">
                            <Badge className={getLevelColor(course.level)}>
                              {course.level}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm text-gray-600">
                                {(Math.random() * 0.5 + 4.5).toFixed(1)}
                              </span>
                            </div>
                          </div>
                          
                          <CardTitle className="text-xl group-hover:text-brand-navy transition-colors line-clamp-2">
                            {course.name}
                          </CardTitle>
                          <CardDescription className="line-clamp-3">
                            {course.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          {/* Course Info */}
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{Math.floor(Math.random() * 500) + 100}+</span>
                            </div>
                          </div>

                          {/* Features */}
                          <div className="space-y-2">
                            {course.features.slice(0, 3).map((feature, featureIndex) => (
                              <div key={featureIndex} className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-brand-green flex-shrink-0" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>

                          {/* Price */}
                          <div className="pt-4 border-t">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <div className="text-2xl text-brand-navy">
                                  {course.price > 0 ? formatPrice(course.price) : 'Liên hệ'}
                                </div>
                                {course.price > 0 && (
                                  <div className="text-sm text-gray-500 line-through">
                                    {formatPrice(course.price * 1.2)}
                                  </div>
                                )}
                              </div>
                              {course.price > 0 && (
                                <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20">
                                  -20%
                                </Badge>
                              )}
                            </div>

                            <Button 
                              className="w-full bg-brand-navy hover:bg-brand-navy/90 group"
                              onClick={() => window.location.hash = `#/courses/${course.id}`}
                            >
                              <BookOpen className="w-4 h-4 mr-2" />
                              Xem chi tiết
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          {courses.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mt-12 p-8 bg-gradient-to-r from-brand-gray to-brand-lavender/30 rounded-2xl"
            >
              <h3 className="text-2xl mb-4">Chưa tìm được khóa học phù hợp?</h3>
              <p className="text-gray-600 mb-6">
                Liên hệ với chúng tôi để được tư vấn lộ trình học tập cá nhân hóa
              </p>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => window.location.hash = '#/contact'}
                className="border-brand-navy/20 text-brand-navy hover:bg-brand-lavender/10"
              >
                Tư vấn miễn phí
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}