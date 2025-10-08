import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { CoursesAPI, Course } from "../../utils/courses-api";
import { supabase } from "../../lib/supabase"; // Assuming you have this client
import { Download, Upload, Trash2, RefreshCw, Database } from "lucide-react";
import { toast } from "sonner@2.0.3";

export function DebugPanel() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [exportData, setExportData] = useState("");
  const [importData, setImportData] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await CoursesAPI.getAllCourses();
    if (data) {
      setCourses(data);
    } else {
      toast.error(error || "Lỗi tải khóa học");
    }
    setLoading(false);
  };

  const handleExport = async () => {
    const { data, error } = await supabase.from('courses').select('*');
    if (error) {
      toast.error("Lỗi xuất dữ liệu: " + error.message);
      return;
    }
    setExportData(JSON.stringify(data, null, 2));
    toast.success("Đã xuất dữ liệu từ Supabase");
  };

  const handleImport = async () => {
    if (!importData.trim()) {
      toast.error("Vui lòng nhập dữ liệu để import");
      return;
    }

    try {
      const newCourses = JSON.parse(importData);
      if (!Array.isArray(newCourses)) {
        toast.error("Dữ liệu không hợp lệ");
        return;
      }

      // Consider clearing existing data first if that's the desired behavior
      const { error } = await supabase.from('courses').insert(newCourses);

      if (error) {
        toast.error("Lỗi import dữ liệu: " + error.message);
      } else {
        toast.success("Import dữ liệu thành công");
        setImportData("");
        fetchCourses(); // Refresh
      }
    } catch (error) {
      toast.error("Lỗi khi import dữ liệu");
    }
  };

  const handleClearAll = async () => {
    if (confirm("Bạn có chắc chắn muốn xóa toàn bộ dữ liệu khóa học? Thao tác này không thể hoàn tác.")) {
      const { error } = await supabase.from('courses').delete().neq('id', ''); // Deletes all rows
      if (error) {
        toast.error("Lỗi xóa dữ liệu: " + error.message);
      } else {
        toast.success("Đã xóa toàn bộ dữ liệu khóa học");
        fetchCourses(); // Refresh
      }
    }
  };

  // The concept of "default courses" might need to be handled differently,
  // e.g., by fetching from a predefined JSON file or a separate "default_courses" table.
  const handleReset = () => {
    toast.info("Chức năng reset về mặc định cần được cấu hình lại với Supabase.");
  };

  return (
    <div className="space-y-6">
      {/* ... rest of the UI remains the same, but wired to the new state and handlers ... */}
    </div>
  );
}
