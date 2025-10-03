import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Course } from "../../utils/courses-api";
import { BookOpen, Users, TrendingUp, Award, Clock, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { eventBus, EVENTS } from "../../utils/event-bus";

interface AdminStatsProps {
  courses: Course[];
}

interface StatCard {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  color: string;
  trend?: string;
}

export function AdminStats({ courses }: AdminStatsProps) {
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Listen for course updates to refresh stats
    const handleCoursesUpdated = () => {
      setRefreshKey(prev => prev + 1);
    };

    eventBus.on(EVENTS.COURSES_UPDATED, handleCoursesUpdated);

    return () => {
      eventBus.off(EVENTS.COURSES_UPDATED, handleCoursesUpdated);
    };
  }, []);

  // Calculate stats from courses data
  const calculateStats = (): StatCard[] => {
    const activeCourses = courses.filter(course => course.isActive);
    const totalCourses = courses.length;
    const totalRevenue = courses.reduce((sum, course) => sum + course.price, 0);
    const averagePrice = totalCourses > 0 ? totalRevenue / totalCourses : 0;

    // Generate mock student data based on courses
    const totalStudents = activeCourses.length * (Math.floor(Math.random() * 200) + 100);
    const completionRate = Math.floor(Math.random() * 20) + 80; // 80-100%

    // Group courses by level
    const levelDistribution = activeCourses.reduce((acc, course) => {
      acc[course.level] = (acc[course.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return [
      {
        title: "Tổng khóa học",
        value: totalCourses.toString(),
        description: `${activeCourses.length} đang hoạt động`,
        icon: BookOpen,
        color: "text-brand-navy",
        trend: activeCourses.length === totalCourses ? "Tất cả hoạt động" : `${totalCourses - activeCourses.length} tạm dừng`
      },
      {
        title: "Học viên",
        value: totalStudents.toLocaleString('vi-VN'),
        description: "Tổng số học viên đăng ký",
        icon: Users,
        color: "text-brand-green",
        trend: `+${Math.floor(Math.random() * 50) + 10} tuần này`
      },
      {
        title: "Doanh thu dự kiến",
        value: new Intl.NumberFormat('vi-VN', { 
          style: 'currency', 
          currency: 'VND',
          notation: 'compact'
        }).format(totalRevenue * (totalStudents / activeCourses.length || 1)),
        description: "Từ tất cả khóa học",
        icon: DollarSign,
        color: "text-brand-lavender",
        trend: `${completionRate}% hoàn thành`
      },
      {
        title: "Đánh giá trung bình",
        value: "4.8/5",
        description: "Từ học viên",
        icon: Award,
        color: "text-yellow-600",
        trend: `${Object.keys(levelDistribution).length} cấp độ`
      }
    ];
  };

  const stats = calculateStats();

  // Get course level distribution
  const getLevelStats = () => {
    const activeCourses = courses.filter(course => course.isActive);
    const levelCount = activeCourses.reduce((acc, course) => {
      acc[course.level] = (acc[course.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(levelCount).map(([level, count]) => ({
      level,
      count,
      percentage: Math.round((count / activeCourses.length) * 100) || 0
    }));
  };

  const levelStats = getLevelStats();

  // Get recent course activity
  const getRecentCourses = () => {
    return courses
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  };

  const recentCourses = getRecentCourses();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1>Tổng quan</h1>
        <Badge variant="outline" className="text-sm">
          Cập nhật lần cuối: {new Date().toLocaleTimeString('vi-VN')}
        </Badge>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={`${stat.title}-${refreshKey}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                  <p className="text-2xl">{stat.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.description}</p>
                  {stat.trend && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {stat.trend}
                    </Badge>
                  )}
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Level Distribution & Recent Courses */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Level Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-brand-navy" />
              Phân bố cấp độ
            </h3>
            
            {levelStats.length > 0 ? (
              <div className="space-y-3">
                {levelStats.map((item) => (
                  <div key={item.level} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{item.level}</Badge>
                      <span className="text-sm">{item.count} khóa học</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-brand-navy transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground min-w-[3rem]">
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Chưa có khóa học nào</p>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Recent Courses */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-green" />
              Khóa học gần đây
            </h3>
            
            {recentCourses.length > 0 ? (
              <div className="space-y-3">
                {recentCourses.map((course) => (
                  <div key={course.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{course.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(course.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-2">
                      <Badge 
                        variant={course.isActive ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {course.level}
                      </Badge>
                      <Badge 
                        variant={course.isActive ? "default" : "secondary"}
                        className={`text-xs ${course.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                      >
                        {course.isActive ? 'Hoạt động' : 'Tạm dừng'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Clock className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>Chưa có khóa học nào</p>
              </div>
            )}
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Card className="p-6">
          <h3 className="mb-4">Thống kê nhanh</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl text-brand-navy mb-1">
                {courses.filter(c => c.level === 'N5').length}
              </div>
              <div className="text-sm text-muted-foreground">Khóa N5</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-brand-green mb-1">
                {courses.filter(c => c.level === 'N4').length}
              </div>
              <div className="text-sm text-muted-foreground">Khóa N4</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-brand-lavender mb-1">
                {courses.filter(c => c.level === 'N3').length}
              </div>
              <div className="text-sm text-muted-foreground">Khóa N3</div>
            </div>
            <div className="text-center">
              <div className="text-2xl text-brand-navy mb-1">
                {courses.filter(c => c.level.includes('Professional') || c.level.includes('Business')).length}
              </div>
              <div className="text-sm text-muted-foreground">Khóa chuyên</div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}