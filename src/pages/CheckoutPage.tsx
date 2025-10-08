
import { useState, useEffect } from "react";
import { CoursesAPI, CourseDetail } from "../utils/courses-api";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { ArrowLeft, User, Mail, Phone, CreditCard, Landmark, QrCode } from "lucide-react";
import { Badge } from "../components/ui/badge";

interface CheckoutPageProps {
  courseId: string;
}

export function CheckoutPage({ courseId }: CheckoutPageProps) {
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error: apiError } = await CoursesAPI.getCourseById(courseId);
        if (apiError || !data) {
          setError("Không thể tải thông tin khóa học. Vui lòng thử lại.");
        } else {
          setCourse(data);
        }
      } catch (e) {
        setError("Đã xảy ra lỗi không mong muốn.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      loadCourse();
    } else {
      setError("ID khóa học không hợp lệ.");
      setLoading(false);
    }
  }, [courseId]);

  const formatPrice = (price: number | undefined | null) => {
    if (price == null) return 'Liên hệ';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-navy mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải trang thanh toán...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl mb-4 text-red-600">{error}</h2>
          <Button onClick={() => window.location.hash = '#/courses'}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại danh sách khóa học
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <Button onClick={() => window.history.back()} variant="ghost" className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Trở lại
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-brand-navy"/>
                Thông tin học viên
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Họ và tên *</Label>
                  <Input id="fullName" placeholder="Nguyễn Văn A" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại *</Label>
                  <Input id="phone" placeholder="09xxxxxxxx" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" placeholder="nguyenvana@email.com" />
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-brand-navy"/>
                Phương thức thanh toán
              </h2>
              <div className="border rounded-lg p-4 bg-white">
                  <div className="flex items-center gap-4 mb-4">
                    <Landmark className="w-8 h-8 text-brand-navy"/>
                    <div>
                      <h3 className="font-semibold">Chuyển khoản ngân hàng</h3>
                      <p className="text-sm text-muted-foreground">Thực hiện thanh toán vào tài khoản ngân hàng của chúng tôi.</p>
                    </div>
                  </div>
                  
                  <Separator className="my-4"/>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="space-y-3 text-sm">
                      <p>Vui lòng sử dụng cú pháp sau trong nội dung chuyển khoản:</p>
                      <p className="font-mono p-2 bg-gray-100 rounded-md text-brand-navy">
                        {`[Tên] [SĐT] DK ${course?.level || 'KHOAHOC'}`}
                      </p>
                      <p className="text-xs text-muted-foreground">Ví dụ: Nguyen Van A 0987654321 DK N5</p>
                      <Separator className="my-2"/>
                      <p><strong>Ngân hàng:</strong> MB Bank</p>
                      <p><strong>Chủ tài khoản:</strong> BUI THI THU HANG</p>
                      <p><strong>Số tài khoản:</strong> 0981135813</p>
                    </div>
                    <div className="flex flex-col items-center">
                       <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg">
                          <QrCode className="w-20 h-20 text-gray-400"/>
                       </div>
                       <p className="text-sm mt-2 text-muted-foreground">Quét mã để thanh toán</p>
                    </div>
                  </div>
              </div>
            </Card>
          </div>

          {/* Right Column (Order Summary) */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 bg-white">
              <h2 className="text-xl font-semibold mb-4">Tóm tắt đơn hàng</h2>
              {course && (
                <div className="flex items-center space-x-4 mb-4">
                  <img src={course.image} alt={course.name} className="w-24 h-24 rounded-lg object-cover bg-gray-200"/>
                  <div>
                    <p className="font-semibold">{course.name}</p>
                    {course.level && <Badge variant="secondary" className="mt-1">{course.level}</Badge>}
                  </div>
                </div>
              )}

              <Separator className="my-4"/>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{formatPrice(course?.price)}</span>
                </div>
                <div className="flex justify-between text-brand-green">
                  <span className="text-muted-foreground">Giảm giá</span>
                  <span>- {formatPrice(0)}</span>
                </div>
                
                <Separator className="my-2"/>

                <div className="flex justify-between font-bold text-lg">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(course?.price)}</span>
                </div>
              </div>

              <Button className="w-full mt-6 bg-brand-navy hover:bg-brand-navy/90" size="lg">
                Xác nhận thanh toán
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-4">Nhân viên CSKH sẽ liên hệ với bạn ngay khi nhận được thanh toán.</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
