import { useState, useEffect } from "react";
import { BlogPost } from "../../utils/blog-api";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Save, 
  X, 
  Plus,
  Trash2,
  Eye,
  FileText,
  Settings,
  Tag as TagIcon
} from "lucide-react";
import { ImageUpload } from "./ImageUpload";
import { toast } from "sonner@2.0.3";

interface BlogFormProps {
  blog?: BlogPost | null;
  onSubmit: (blogData: Partial<BlogPost>) => void;
  onCancel: () => void;
}

export function BlogForm({ blog, onSubmit, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    category: 'Học tiếng Nhật',
    tags: [],
    author: { name: 'TNQDO' },
    isPublished: true
  });

  const [newTag, setNewTag] = useState('');
  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

  // Load blog data when editing
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        slug: blog.slug,
        excerpt: blog.excerpt,
        content: blog.content,
        image: blog.image,
        category: blog.category,
        tags: [...blog.tags],
        author: { ...blog.author },
        isPublished: blog.isPublished
      });
    }
  }, [blog]);

  const handleInputChange = (field: keyof BlogPost, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug when title changes (only for new posts)
    if (field === 'title' && !blog && value) {
      setIsGeneratingSlug(true);
      setTimeout(() => {
        const slug = generateSlug(value);
        setFormData(prev => ({
          ...prev,
          slug
        }));
        setIsGeneratingSlug(false);
      }, 500);
    }
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove Vietnamese diacritics
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title?.trim()) {
      toast.error('Vui lòng nhập tiêu đề bài viết');
      return;
    }
    if (!formData.slug?.trim()) {
      toast.error('Vui lòng nhập slug bài viết');
      return;
    }
    if (!formData.excerpt?.trim()) {
      toast.error('Vui lòng nhập mô tả ngắn');
      return;
    }
    if (!formData.content?.trim()) {
      toast.error('Vui lòng nhập nội dung bài viết');
      return;
    }

    // Prepare form data for submission
    const dataToSubmit = {
      ...formData,
      // Replace newlines with <br> tags for multiline display
      content: formData.content.replace(/\n/g, '<br />'),
    };

    onSubmit(dataToSubmit);
  };

  const commonCategories = [
    'Học tiếng Nhật',
    'JLPT',
    'Văn hóa',
    'Ngữ pháp',
    'Từ vựng',
    'Kanji',
    'Kinh nghiệm',
    'Tin tức'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">
          {blog ? 'Chỉnh sửa bài viết' : 'Thêm bài viết mới'}
        </h2>
        <div className="flex items-center gap-2">
          {formData.isPublished ? (
            <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20">
              <Eye className="w-3 h-3 mr-1" />
              Đã xuất bản
            </Badge>
          ) : (
            <Badge variant="secondary">
              <FileText className="w-3 h-3 mr-1" />
              Bản nháp
            </Badge>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="content" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="content">Nội dung</TabsTrigger>
            <TabsTrigger value="media">Media & SEO</TabsTrigger>
            <TabsTrigger value="settings">Cài đặt</TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="h-5 w-5 text-brand-navy" />
                <h3 className="text-lg font-semibold">Nội dung bài viết</h3>
              </div>

              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Tiêu đề *</Label>
                  <Input
                    id="title"
                    value={formData.title || ''}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Nhập tiêu đề bài viết..."
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug || ''}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    placeholder="duong-dan-bai-viet"
                    disabled={isGeneratingSlug}
                  />
                  {isGeneratingSlug && (
                    <p className="text-xs text-muted-foreground">Đang tự động tạo slug...</p>
                  )}
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                  <Label htmlFor="excerpt">Mô tả ngắn *</Label>
                  <Textarea
                    id="excerpt"
                    rows={3}
                    value={formData.excerpt || ''}
                    onChange={(e) => handleInputChange('excerpt', e.target.value)}
                    placeholder="Mô tả ngắn gọn về nội dung bài viết..."
                  />
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <Label htmlFor="content">Nội dung *</Label>
                  <Textarea
                    id="content"
                    rows={12}
                    value={formData.content || ''}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    placeholder="Nhập nội dung bài viết (hỗ trợ HTML)..."
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground">
                    Bạn có thể sử dụng HTML tags như &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;ul&gt;, &lt;li&gt;
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <TagIcon className="h-5 w-5 text-brand-navy" />
                <h3 className="text-lg font-semibold">Hình ảnh & Phân loại</h3>
              </div>

              <div className="space-y-6">
                {/* Featured Image */}
                <div className="space-y-2">
                  <Label>Ảnh đại diện</Label>
                  <ImageUpload
                    value={formData.image}
                    onChange={(url) => handleInputChange('image', url)}
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {commonCategories.map((cat) => (
                      <Badge
                        key={cat}
                        variant={formData.category === cat ? "default" : "outline"}
                        className={`cursor-pointer ${
                          formData.category === cat ? "bg-brand-navy" : ""
                        }`}
                        onClick={() => handleInputChange('category', cat)}
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                  <Input
                    id="category"
                    value={formData.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="Hoặc nhập danh mục mới..."
                  />
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags?.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-brand-rose hover:text-brand-rose/80"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Nhập tag mới..."
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTag} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Settings className="h-5 w-5 text-brand-navy" />
                <h3 className="text-lg font-semibold">Cài đặt bài viết</h3>
              </div>

              <div className="space-y-4">
                {/* Author */}
                <div className="space-y-2">
                  <Label htmlFor="author">Tác giả</Label>
                  <Input
                    id="author"
                    value={formData.author?.name || ''}
                    onChange={(e) => handleInputChange('author', { 
                      ...formData.author, 
                      name: e.target.value 
                    })}
                    placeholder="Tên tác giả"
                  />
                </div>

                {/* Published Status */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Trạng thái xuất bản</Label>
                    <div className="text-sm text-muted-foreground">
                      Bài viết sẽ {formData.isPublished ? 'hiển thị công khai' : 'lưu dưới dạng bản nháp'}
                    </div>
                  </div>
                  <Switch
                    checked={formData.isPublished || false}
                    onCheckedChange={(checked) => handleInputChange('isPublished', checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Hủy
          </Button>
          <Button type="submit" className="bg-brand-navy hover:bg-brand-navy/90">
            <Save className="h-4 w-4 mr-2" />
            {blog ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </div>
      </form>
    </div>
  );
}
