import { useState } from "react";
import { motion } from "motion/react";
import { Course, CourseDetail } from "../../utils/courses-api";
import { AdminAPI } from "../../utils/admin-api";
import { CourseForm } from "./CourseForm";
import { CourseTable } from "./CourseTable";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Plus, BookOpen } from "lucide-react";
import { toast } from "sonner@2.0.3";

interface CourseManagementProps {
  courses: Course[];
  onCoursesChange: () => void;
}

export function CourseManagement({ courses, onCoursesChange }: CourseManagementProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  const handleAddCourse = () => {
    setEditingCourse(null);
    setShowForm(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
      return;
    }

    try {
      const result = await AdminAPI.deleteCourse(courseId);
      if (result.success) {
        toast.success('Đã xóa khóa học thành công');
        onCoursesChange();
      } else {
        toast.error(result.error || 'Lỗi khi xóa khóa học');
      }
    } catch (error) {
      toast.error('Lỗi khi xóa khóa học');
    }
  };

  const handleFormSubmit = async (courseData: Partial<CourseDetail>) => {
    try {
      let result;
      
      if (editingCourse) {
        // Update existing course
        result = await AdminAPI.updateCourse(editingCourse.id, courseData);
        if (result.data) {
          toast.success('Cập nhật khóa học thành công');
        } else {
          toast.error(result.error || 'Lỗi khi cập nhật khóa học');
          return;
        }
      } else {
        // Create new course
        result = await AdminAPI.createCourse(courseData);
        if (result.data) {
          toast.success('Tạo khóa học mới thành công');
        } else {
          toast.error(result.error || 'Lỗi khi tạo khóa học');
          return;
        }
      }
      
      setShowForm(false);
      setEditingCourse(null);
      onCoursesChange();
    } catch (error) {
      toast.error('Lỗi khi lưu khóa học');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCourse(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-6 w-6 text-brand-navy" />
          <h1>Quản lý Khóa học</h1>
          <span className="text-sm text-gray-500">({courses.length} khóa học)</span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="rounded-r-none"
            >
              Bảng
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className="rounded-l-none"
            >
              Thẻ
            </Button>
          </div>
          <Button onClick={handleAddCourse} className="bg-brand-navy hover:bg-brand-navy/90">
            <Plus className="h-4 w-4 mr-2" />
            Thêm khóa học
          </Button>
        </div>
      </div>

      {/* Course List */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <CourseTable
          courses={courses}
          onEdit={handleEditCourse}
          onDelete={handleDeleteCourse}
          viewMode={viewMode}
        />
      </motion.div>

      {/* Course Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCourse ? 'Chỉnh sửa khóa học' : 'Thêm khóa học mới'}
            </DialogTitle>
            <DialogDescription>
              {editingCourse 
                ? 'Cập nhật thông tin khóa học và nội dung chương trình' 
                : 'Tạo khóa học mới với đầy đủ thông tin và chương trình học'
              }
            </DialogDescription>
          </DialogHeader>
          <CourseForm
            course={editingCourse}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}