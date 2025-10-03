import { useState, useRef } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { validateImageFile, fileToBase64 } from "../../utils/image-utils";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export function ImageUpload({ 
  value = "", 
  onChange, 
  label = "Hình ảnh khóa học",
  placeholder = "Tải lên hình ảnh hoặc để trống sử dụng ảnh mặc định"
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (file: File) => {
    // Validate file
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      toast.error(validation.error || "File không hợp lệ");
      return;
    }

    setIsLoading(true);

    try {
      const base64 = await fileToBase64(file);
      onChange(base64);
      setIsLoading(false);
      toast.success("Tải lên hình ảnh thành công");
    } catch (error) {
      setIsLoading(false);
      toast.error("Lỗi khi tải lên hình ảnh");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleRemove = () => {
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.success("Đã xóa hình ảnh");
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {value ? (
        // Image preview
        <Card className="relative overflow-hidden">
          <div className="aspect-video w-full relative">
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleClick}
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white/30"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Thay đổi
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleRemove}
                  className="bg-brand-rose/80 backdrop-blur-sm hover:bg-brand-rose"
                >
                  <X className="w-4 h-4 mr-2" />
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        // Upload area
        <Card
          className={`
            relative border-2 border-dashed transition-colors cursor-pointer
            ${isDragging 
              ? 'border-brand-navy bg-brand-lavender/10' 
              : 'border-gray-300 hover:border-brand-navy/50 hover:bg-gray-50'
            }
            ${isLoading ? 'pointer-events-none opacity-50' : ''}
          `}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onClick={handleClick}
        >
          <div className="aspect-video w-full flex flex-col items-center justify-center p-8 text-center">
            {isLoading ? (
              <>
                <div className="w-8 h-8 border-2 border-brand-navy border-t-transparent rounded-full animate-spin mb-4" />
                <p className="text-sm text-muted-foreground">Đang tải lên...</p>
              </>
            ) : (
              <>
                <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg mb-2">Tải lên hình ảnh</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {placeholder}
                </p>
                <div className="space-y-2">
                  <Button type="button" variant="outline" className="pointer-events-none">
                    <Upload className="w-4 h-4 mr-2" />
                    Chọn file
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Hoặc kéo thả file vào đây
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Hỗ trợ: JPG, PNG, GIF (tối đa 5MB)
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInputChange}
        className="hidden"
      />
    </div>
  );
}