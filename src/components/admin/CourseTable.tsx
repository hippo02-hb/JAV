import { useState } from "react";
import { Course } from "../../utils/courses-api";
import { getCourseImage } from "../../utils/image-utils";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Eye,
  Users,
  Clock,
  DollarSign,
  BookOpen
} from "lucide-react";
import { motion } from "motion/react";
import { APIClient } from "../../utils/api-client";

interface CourseTableProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (courseId: string) => void;
  viewMode: 'table' | 'cards';
}

export function CourseTable({ courses, onEdit, onDelete, viewMode }: CourseTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || course.level === levelFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' ? course.isActive : !course.isActive);
    
    return matchesSearch && matchesLevel && matchesStatus;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'N5': return 'bg-green-100 text-green-800';
      case 'N4': return 'bg-brand-lavender/40 text-brand-navy';
      case 'N3': return 'bg-brand-lavender/50 text-brand-navy';
      case 'Business': return 'bg-brand-lavender/30 text-brand-navy';
      case 'Professional': return 'bg-brand-lavender/50 text-brand-navy';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'cards') {
    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Cấp độ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả cấp độ</SelectItem>
              <SelectItem value="N5">N5</SelectItem>
              <SelectItem value="N4">N4</SelectItem>
              <SelectItem value="N3">N3</SelectItem>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="Professional">Professional</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả</SelectItem>
              <SelectItem value="active">Hoạt động</SelectItem>
              <SelectItem value="inactive">Không hoạt động</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-brand-navy to-brand-navy/80 relative">
                  <img
                    src={getCourseImage(course.image, course.level)}
                    alt={course.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant={course.isActive ? "default" : "secondary"}>
                      {course.isActive ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-lg mb-2">{course.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {course.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      {APIClient.formatCurrency(course.price)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(course)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onDelete(course.id)}
                        className="text-brand-rose hover:text-brand-rose/80 hover:bg-brand-rose/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-4 w-4 mr-2" />
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Table view
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Tìm kiếm khóa học..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Cấp độ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả cấp độ</SelectItem>
            <SelectItem value="N5">N5</SelectItem>
            <SelectItem value="N4">N4</SelectItem>
            <SelectItem value="N3">N3</SelectItem>
            <SelectItem value="Business">Business</SelectItem>
            <SelectItem value="Professional">Professional</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="active">Hoạt động</SelectItem>
            <SelectItem value="inactive">Không hoạt động</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khóa học</TableHead>
              <TableHead>Cấp độ</TableHead>
              <TableHead>Thời gian</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={getCourseImage(course.image, course.level)}
                      alt={course.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">
                        {course.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={getLevelColor(course.level)}>
                    {course.level}
                  </Badge>
                </TableCell>
                <TableCell>{course.duration}</TableCell>
                <TableCell>{APIClient.formatCurrency(course.price)}</TableCell>
                <TableCell>
                  <Badge variant={course.isActive ? "default" : "secondary"}>
                    {course.isActive ? "Hoạt động" : "Tạm dừng"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(course)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(course.id)}
                      className="text-brand-rose hover:text-brand-rose/80 hover:bg-brand-rose/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Không tìm thấy khóa học nào</p>
        </div>
      )}
    </div>
  );
}