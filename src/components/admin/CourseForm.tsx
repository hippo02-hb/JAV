import { useState, useEffect } from "react";
import { Course, CourseDetail } from "../../utils/courses-api";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { ImageUpload } from "./ImageUpload";
import { 
  Plus, 
  Trash2, 
  Save, 
  X,
  BookOpen,
  Clock,
  DollarSign,
  Tag,
  FileText,
  Target,
  CheckSquare
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface CourseFormProps {
  course: Course | null;
  onSubmit: (data: Partial<CourseDetail>) => void;
  onCancel: () => void;
}

interface SyllabusItem {
  week: number;
  topic: string;
  content: string[];
}

export function CourseForm({ course, onSubmit, onCancel }: CourseFormProps) {
  const [formData, setFormData] = useState<Partial<CourseDetail>>({
    name: '',
    level: 'N5',
    description: '',
    duration: '',
    price: 0,
    image: '',
    features: [],
    isActive: true,
    syllabus: [],
    requirements: [],
    outcomes: []
  });

  const [newFeature, setNewFeature] = useState('');
  const [newRequirement, setNewRequirement] = useState('');
  const [newOutcome, setNewOutcome] = useState('');
  const [newSyllabusItem, setNewSyllabusItem] = useState<SyllabusItem>({
    week: 1,
    topic: '',
    content: ['']
  });

  useEffect(() => {
    if (course) {
      setFormData({
        ...course,
        syllabus: [],
        requirements: [],
        outcomes: []
      });
    }
  }, [course]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData(prev => ({
        ...prev,
        requirements: [...(prev.requirements || []), newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddOutcome = () => {
    if (newOutcome.trim()) {
      setFormData(prev => ({
        ...prev,
        outcomes: [...(prev.outcomes || []), newOutcome.trim()]
      }));
      setNewOutcome('');
    }
  };

  const handleRemoveOutcome = (index: number) => {
    setFormData(prev => ({
      ...prev,
      outcomes: prev.outcomes?.filter((_, i) => i !== index) || []
    }));
  };

  const handleAddSyllabusItem = () => {
    if (newSyllabusItem.topic.trim() && newSyllabusItem.content[0].trim()) {
      setFormData(prev => ({
        ...prev,
        syllabus: [...(prev.syllabus || []), { ...newSyllabusItem }]
      }));
      setNewSyllabusItem({
        week: (formData.syllabus?.length || 0) + 2,
        topic: '',
        content: ['']
      });
    }
  };

  const handleRemoveSyllabusItem = (index: number) => {
    setFormData(prev => ({
      ...prev,
      syllabus: prev.syllabus?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSyllabusContentChange = (contentIndex: number, value: string) => {
    setNewSyllabusItem(prev => ({
      ...prev,
      content: prev.content.map((item, i) => i === contentIndex ? value : item)
    }));
  };

  const handleAddSyllabusContent = () => {
    setNewSyllabusItem(prev => ({
      ...prev,
      content: [...prev.content, '']
    }));
  };

  const handleRemoveSyllabusContent = (index: number) => {
    setNewSyllabusItem(prev => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name?.trim()) {
      toast.error('Vui lòng nhập tên khóa học');
      return;
    }
    
    if (!formData.description?.trim()) {
      toast.error('Vui lòng nhập mô tả khóa học');
      return;
    }
    
    if (!formData.price || formData.price <= 0) {
      toast.error('Vui lòng nhập giá khóa học hợp lệ');
      return;
    }

    onSubmit(formData);
  };

  const levels = [
    { value: 'N5', label: 'N5 - Cơ bản' },
    { value: 'N4', label: 'N4 - Trung cấp thấp' },
    { value: 'N3', label: 'N3 - Trung cấp' },
    { value: 'N2', label: 'N2 - Trung cấp cao' },
    { value: 'N1', label: 'N1 - Nâng cao' },
    { value: 'Business', label: 'Tiếng Nhật Thương mại' },
    { value: 'Professional', label: 'Chuyên nghiệp' }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="content">Nội dung</TabsTrigger>
          <TabsTrigger value="syllabus">Chương trình học</TabsTrigger>
          <TabsTrigger value="requirements">Yêu cầu & Mục tiêu</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-5 w-5 text-brand-navy" />
              <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Tên khóa học *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Ví dụ: Tiếng Nhật N5 Cơ Bản"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Cấp độ</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => handleInputChange('level', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map(level => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Thời gian học</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="Ví dụ: 3 tháng"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Học phí (VNĐ) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
                  placeholder="Ví dụ: 1500000"
                />
              </div>

              <div className="md:col-span-2">
                <ImageUpload
                  value={formData.image}
                  onChange={(value) => handleInputChange('image', value)}
                  label="Hình ảnh khóa học"
                  placeholder="Tải lên hình ảnh khóa học hoặc để trống sử dụng ảnh mặc định"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Mô tả khóa học *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  placeholder="Mô tả chi tiết về khóa học..."
                />
              </div>

              <div className="flex items-center space-x-2 md:col-span-2">
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                />
                <Label htmlFor="isActive">Khóa học đang hoạt động</Label>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="h-5 w-5 text-brand-navy" />
              <h3 className="text-lg font-semibold">Tính năng khóa học</h3>
            </div>

            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Nhập tính năng mới..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                />
                <Button type="button" onClick={handleAddFeature}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {formData.features?.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-2">
                    {feature}
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(index)}
                      className="text-brand-rose hover:text-brand-rose/80"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="syllabus" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="h-5 w-5 text-brand-navy" />
              <h3 className="text-lg font-semibold">Chương trình học</h3>
            </div>

            {/* Add new syllabus item */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Tuần</Label>
                  <Input
                    type="number"
                    value={newSyllabusItem.week}
                    onChange={(e) => setNewSyllabusItem(prev => ({ ...prev, week: parseInt(e.target.value) || 1 }))}
                    min="1"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Chủ đề</Label>
                  <Input
                    value={newSyllabusItem.topic}
                    onChange={(e) => setNewSyllabusItem(prev => ({ ...prev, topic: e.target.value }))}
                    placeholder="Ví dụ: Hiragana & Chào hỏi"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Nội dung</Label>
                {newSyllabusItem.content.map((content, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      value={content}
                      onChange={(e) => handleSyllabusContentChange(index, e.target.value)}
                      placeholder="Nội dung học..."
                    />
                    {newSyllabusItem.content.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveSyllabusContent(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddSyllabusContent}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm nội dung
                </Button>
              </div>

              <Button type="button" onClick={handleAddSyllabusItem}>
                <Plus className="h-4 w-4 mr-2" />
                Thêm tuần học
              </Button>
            </div>

            {/* Existing syllabus items */}
            <div className="space-y-4">
              {formData.syllabus?.map((item, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Tuần {item.week}: {item.topic}</h4>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveSyllabusItem(index)}
                      className="text-brand-rose hover:text-brand-rose/80"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {item.content.map((content, contentIndex) => (
                      <li key={contentIndex}>• {content}</li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Requirements */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckSquare className="h-5 w-5 text-brand-navy" />
                <h3 className="text-lg font-semibold">Yêu cầu tham gia</h3>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Nhập yêu cầu..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddRequirement()}
                  />
                  <Button type="button" onClick={handleAddRequirement}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.requirements?.map((requirement, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{requirement}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveRequirement(index)}
                        className="text-brand-rose hover:text-brand-rose/80"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* Outcomes */}
            <Card className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-brand-navy" />
                <h3 className="text-lg font-semibold">Mục tiêu đạt được</h3>
              </div>

              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newOutcome}
                    onChange={(e) => setNewOutcome(e.target.value)}
                    placeholder="Nhập mục tiêu..."
                    onKeyPress={(e) => e.key === 'Enter' && handleAddOutcome()}
                  />
                  <Button type="button" onClick={handleAddOutcome}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  {formData.outcomes?.map((outcome, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{outcome}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveOutcome(index)}
                        className="text-brand-rose hover:text-brand-rose/80"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Form Actions */}
      <Separator />
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          <X className="h-4 w-4 mr-2" />
          Hủy
        </Button>
        <Button type="submit" className="bg-brand-navy hover:bg-brand-navy/90">
          <Save className="h-4 w-4 mr-2" />
          {course ? 'Cập nhật' : 'Tạo mới'}
        </Button>
      </div>
    </form>
  );
}