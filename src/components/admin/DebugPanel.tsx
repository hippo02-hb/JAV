import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { LocalStorageService } from "../../utils/local-storage";
import { Download, Upload, Trash2, RefreshCw, Database } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function DebugPanel() {
  const [exportData, setExportData] = useState("");
  const [importData, setImportData] = useState("");

  const handleExport = () => {
    const data = LocalStorageService.exportData();
    setExportData(data);
    toast.success("Đã xuất dữ liệu");
  };

  const handleImport = () => {
    if (!importData.trim()) {
      toast.error("Vui lòng nhập dữ liệu để import");
      return;
    }

    try {
      const success = LocalStorageService.importData(importData);
      if (success) {
        toast.success("Import dữ liệu thành công");
        setImportData("");
        // Trigger refresh
        window.location.reload();
      } else {
        toast.error("Dữ liệu không hợp lệ");
      }
    } catch (error) {
      toast.error("Lỗi khi import dữ liệu");
    }
  };

  const handleClearAll = () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu? Thao tác này không thể hoàn tác.")) {
      LocalStorageService.clearAll();
      toast.success("Đã xóa toàn bộ dữ liệu");
      // Trigger refresh
      window.location.reload();
    }
  };

  const handleReset = () => {
    if (confirm("Bạn có chắc chắn muốn reset về dữ liệu mặc định?")) {
      LocalStorageService.clearAll();
      LocalStorageService.initializeDefaultCourses();
      toast.success("Đã reset về dữ liệu mặc định");
      // Trigger refresh
      window.location.reload();
    }
  };

  const courses = LocalStorageService.getAllCourses();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Database className="w-5 h-5" />
        <h2>Debug Panel</h2>
        <Badge variant="outline" className="text-xs">
          {courses.length} khóa học
        </Badge>
      </div>

      {/* Current Data Overview */}
      <Card className="p-6">
        <h3 className="mb-4">Tổng quan dữ liệu</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl text-brand-navy">{courses.length}</div>
            <div className="text-sm text-muted-foreground">Tổng khóa học</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-brand-green">
              {courses.filter(c => c.isActive).length}
            </div>
            <div className="text-sm text-muted-foreground">Đang hoạt động</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-brand-navy">
              {new Set(courses.map(c => c.level)).size}
            </div>
            <div className="text-sm text-muted-foreground">Cấp độ</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-brand-lavender">
              {Math.round(courses.reduce((sum, c) => sum + c.price, 0) / 1000000)}M
            </div>
            <div className="text-sm text-muted-foreground">Tổng giá trị</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleExport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu
          </Button>
          <Button onClick={handleReset} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reset mặc định
          </Button>
          <Button onClick={handleClearAll} variant="destructive" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Xóa tất cả
          </Button>
        </div>
      </Card>

      {/* Export */}
      <Card className="p-6">
        <h3 className="mb-4">Xuất dữ liệu</h3>
        <div className="space-y-4">
          <Textarea
            value={exportData}
            readOnly
            placeholder="Dữ liệu sẽ xuất hiện ở đây..."
            rows={8}
            className="font-mono text-xs"
          />
          <Button onClick={handleExport} className="w-full">
            <Download className="w-4 h-4 mr-2" />
            Xuất dữ liệu JSON
          </Button>
        </div>
      </Card>

      {/* Import */}
      <Card className="p-6">
        <h3 className="mb-4">Nhập dữ liệu</h3>
        <div className="space-y-4">
          <Textarea
            value={importData}
            onChange={(e) => setImportData(e.target.value)}
            placeholder="Dán dữ liệu JSON vào đây..."
            rows={8}
            className="font-mono text-xs"
          />
          <Button onClick={handleImport} className="w-full" disabled={!importData.trim()}>
            <Upload className="w-4 h-4 mr-2" />
            Nhập dữ liệu
          </Button>
        </div>
      </Card>

      {/* Course List */}
      <Card className="p-6">
        <h3 className="mb-4">Danh sách khóa học hiện tại</h3>
        {courses.length > 0 ? (
          <div className="space-y-2">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{course.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {course.level} • {course.duration} • {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(course.price)}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={course.isActive ? "default" : "secondary"}>
                    {course.isActive ? "Hoạt động" : "Tạm dừng"}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {course.features.length} tính năng
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Database className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Chưa có khóa học nào</p>
          </div>
        )}
      </Card>
    </div>
  );
}