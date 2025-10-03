# Tiếng Nhật Quang Dũng Online (TNQDO)

Landing page cho trung tâm tiếng Nhật trực tuyến với hệ thống admin quản lý khóa học.

## Tính năng

### User-facing
- ✅ Trang chủ giới thiệu về TNQDO
- ✅ Danh sách 9 khóa học (N5-N3 + nghiệp vụ)
- ✅ Thông tin 3 giáo viên
- ✅ FAQ và liên hệ
- ✅ Responsive design

### Admin
- ✅ Đăng nhập admin (username: `admin`, password: `admin123`)
- ✅ Quản lý khóa học: Thêm, sửa, xóa
- ✅ Upload hình ảnh khóa học
- ✅ Dữ liệu lưu trên localStorage

## Công nghệ

- React + TypeScript
- Tailwind CSS v4
- Shadcn/ui components
- Motion (Framer Motion)
- LocalStorage cho data persistence

## Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build production
npm run build
```

## Cấu trúc dự án

```
├── components/          # React components
│   ├── admin/          # Admin components
│   └── ui/             # Shadcn UI components
├── pages/              # Page components
├── utils/              # Utilities & APIs
└── styles/             # Global CSS
```

## Brand Colors

- **Navy**: #1b2460 (Primary)
- **Lavender**: #d1d7fe (Secondary/Accent)
- **Gray**: #f5f5f5 (Background)
- **Green**: #00ba00 (Success/Discount)
- **Rose**: #d98f8f (Error/Delete)

## Đăng nhập Admin

URL: `http://localhost:5173/#/admin/login`

- Username: `admin`
- Password: `admin123`

---

© 2025 Tiếng Nhật Quang Dũng Online - Thành viên Otaku Online Group
