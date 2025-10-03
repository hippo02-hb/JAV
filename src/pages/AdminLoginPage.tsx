import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription } from "../components/ui/alert";
import { ArrowLeft, Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { AdminAuth } from "../utils/admin-auth";

export function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (AdminAuth.isAuthenticated()) {
      window.location.hash = '#/admin';
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (AdminAuth.login(email, password)) {
      AdminAuth.initSession(); // Initialize session tracking
      toast.success("Đăng nhập admin thành công!");
      
      // Redirect to admin panel
      window.location.hash = '#/admin';
    } else {
      setError("Email hoặc mật khẩu không đúng");
      toast.error("Thông tin đăng nhập không chính xác");
    }

    setIsLoading(false);
  };

  const handleBackToSite = () => {
    window.location.hash = '#/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-gray to-brand-lavender/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back button */}
        <Button
          variant="ghost"
          onClick={handleBackToSite}
          className="mb-6 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Về trang chủ
        </Button>

        <Card className="p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-brand-lavender/50 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-brand-navy" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <p className="text-gray-600 mt-2">Đăng nhập để quản lý hệ thống</p>
          </div>

          {/* Demo credentials info */}
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertDescription className="text-blue-800">
              <strong>Tài khoản Demo:</strong><br />
              Email: admin@tnqdo.com<br />
              Mật khẩu: admin123
            </AlertDescription>
          </Alert>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert className="bg-brand-rose/10 border-brand-rose/20">
                <AlertDescription className="text-brand-rose">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email Admin</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tnqdo.com"
                required
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu admin"
                  required
                  className="w-full pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-brand-navy hover:bg-brand-navy/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Đang đăng nhập...
                </div>
              ) : (
                "Đăng nhập Admin"
              )}
            </Button>
          </form>

          {/* Security notice */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Trang này dành riêng cho quản trị viên hệ thống.
              <br />
              Mọi hoạt động sẽ được ghi lại và theo dõi.
            </p>
          </div>
        </Card>

        {/* System info */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>TNQDO Admin Panel v1.0</p>
          <p>© 2024 Otaku Online Group</p>
        </div>
      </motion.div>
    </div>
  );
}