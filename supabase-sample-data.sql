-- Insert sample courses
INSERT INTO courses (id, name, level, description, duration, price, image, features, is_active, syllabus, requirements, outcomes) VALUES
(
  gen_random_uuid(),
  'Tiếng Nhật N5 Cơ Bản',
  'N5',
  'Khóa học tiếng Nhật cơ bản cho người mới bắt đầu, học alphabet Hiragana, Katakana và 600 từ vựng cơ bản.',
  '3 tháng',
  1500000,
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ARRAY['Học Hiragana & Katakana', '600 từ vựng N5', 'Ngữ pháp cơ bản', 'Luyện nghe nói'],
  true,
  '[
    {"week": 1, "topic": "Hiragana & Chào hỏi", "content": ["Học bảng chữ cái Hiragana", "Cách chào hỏi cơ bản", "Tự giới thiệu"]},
    {"week": 2, "topic": "Katakana & Số đếm", "content": ["Học bảng chữ cái Katakana", "Số đếm từ 1-100", "Ngày tháng năm"]},
    {"week": 3, "topic": "Từ vựng sinh hoạt", "content": ["Từ vựng gia đình", "Đồ vật trong nhà", "Hoạt động hàng ngày"]},
    {"week": 4, "topic": "Ngữ pháp cơ bản", "content": ["Trợ từ は, が, を", "Động từ nhóm 1,2,3", "Thời hiện tại, quá khứ"]}
  ]'::jsonb,
  ARRAY['Có đam mê học tiếng Nhật', 'Cam kết học tập nghiêm túc', 'Tham gia đầy đủ các buổi học'],
  ARRAY['Nắm vững kiến thức N5', 'Có thể giao tiếp cơ bản', 'Sẵn sàng cho cấp độ N4']
),
(
  gen_random_uuid(),
  'Tiếng Nhật N4 Trung Cấp',
  'N4',
  'Khóa học tiếng Nhật trung cấp với 1500 từ vựng và ngữ pháp phức tạp hơn.',
  '4 tháng',
  2000000,
  'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
  ARRAY['1500 từ vựng N4', 'Ngữ pháp trung cấp', 'Kanji cơ bản', 'Luyện thi N4'],
  true,
  '[
    {"week": 1, "topic": "Ôn tập N5", "content": ["Ôn tập Hiragana, Katakana", "Từ vựng N5", "Ngữ pháp cơ bản"]},
    {"week": 2, "topic": "Kanji cơ bản", "content": ["50 chữ Kanji đầu tiên", "Cách đọc On, Kun", "Từ ghép Kanji"]},
    {"week": 3, "topic": "Ngữ pháp N4", "content": ["Thể て của động từ", "Thể potential", "Thể passive"]},
    {"week": 4, "topic": "Hội thoại nâng cao", "content": ["Giao tiếp công việc", "Mua sắm", "Đi du lịch"]}
  ]'::jsonb,
  ARRAY['Đã hoàn thành N5 hoặc có kiến thức tương đương', 'Cam kết học tập nghiêm túc'],
  ARRAY['Đạt chứng chỉ N4', 'Giao tiếp tự tin', 'Đọc hiểu văn bản cơ bản']
);

-- Insert sample FAQs
INSERT INTO faqs (question, answer, category, "order", is_active) VALUES
('Khóa học tiếng Nhật N5 kéo dài bao lâu?', 'Khóa học N5 kéo dài 3 tháng với 3 buổi/tuần, mỗi buổi 2 tiếng. Tổng cộng khoảng 72 tiếng học.', 'courses', 1, true),
('Tôi có thể học online hay chỉ offline?', 'Chúng tôi cung cấp cả hai hình thức học online và offline. Bạn có thể chọn hình thức phù hợp với lịch trình của mình.', 'general', 2, true),
('Học phí có bao gồm tài liệu học tập không?', 'Có, học phí đã bao gồm tất cả tài liệu học tập, bài tập, và quyền truy cập vào hệ thống học online.', 'payment', 3, true),
('Có hỗ trợ tư vấn việc làm sau khi học xong không?', 'Có, chúng tôi có dịch vụ tư vấn nghề nghiệp và giới thiệu việc làm tại các công ty Nhật Bản cho học viên xuất sắc.', 'services', 4, true);

-- Insert sample teachers
INSERT INTO teachers (name, title, avatar, bio, specializations, experience, education, certifications, teaching_style, courses_count, students_count, rating, is_active, social_links, achievements, courses_teaching, testimonials) VALUES
(
  'Thầy Quang Dũng',
  'Giám đốc Học thuật & Giảng viên chính',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
  'Với hơn 10 năm kinh nghiệm giảng dạy tiếng Nhật, thầy Quang Dũng đã đào tạo hàng nghìn học viên đạt chứng chỉ JLPT. Chuyên gia về phương pháp giảng dạy hiện đại và tương tác.',
  ARRAY['JLPT N5-N1', 'Tiếng Nhật Thương mại', 'Phương pháp giảng dạy'],
  '10+ năm',
  ARRAY['Thạc sĩ Ngôn ngữ Nhật - Đại học Ngoại ngữ Hà Nội', 'Chứng chỉ Giảng dạy Tiếng Nhật - Tokyo University'],
  ARRAY['JLPT N1', 'JTEST A Level', 'Teaching Japanese as Foreign Language'],
  'Tương tác, thực hành nhiều, học qua trò chơi và tình huống thực tế',
  15,
  2500,
  4.9,
  true,
  '{"facebook": "https://facebook.com/quangdung", "linkedin": "https://linkedin.com/in/quangdung"}'::jsonb,
  ARRAY['Giảng viên xuất sắc năm 2022', 'Top 10 giáo viên tiếng Nhật tại Việt Nam'],
  ARRAY['Tiếng Nhật N5 Cơ Bản', 'Tiếng Nhật N4 Trung Cấp'],
  '[]'::jsonb
);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, image, category, tags, author_name, author_avatar, is_published) VALUES
(
  '5 Bí Quyết Học Tiếng Nhật Hiệu Quả',
  '5-bi-quyet-hoc-tieng-nhat-hieu-qua',
  'Khám phá 5 phương pháp đã được chứng minh giúp bạn học tiếng Nhật nhanh chóng và hiệu quả hơn.',
  '<h2>1. Học mỗi ngày</h2><p>Tính kiên trì là chìa khóa quan trọng nhất trong việc học tiếng Nhật. Hãy dành ít nhất 30 phút mỗi ngày để học từ vựng mới và ôn tập.</p><h2>2. Thực hành với người bản xứ</h2><p>Không có gì tốt hơn việc thực hành với người Nhật bản ngữ. Tham gia các nhóm giao lưu ngôn ngữ hoặc tìm language partner.</p><h2>3. Xem phim và anime</h2><p>Học tiếng Nhật qua phim ảnh và anime giúp bạn làm quen với giọng điệu tự nhiên và văn hóa Nhật Bản.</p>',
  'https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=800&q=80',
  'Học tiếng Nhật',
  ARRAY['Học tiếng Nhật', 'Mẹo học tập', 'JLPT'],
  'TNQDO',
  null,
  true
),
(
  'Chuẩn Bị Cho Kỳ Thi JLPT N5',
  'chuan-bi-cho-ky-thi-jlpt-n5',
  'Hướng dẫn chi tiết cách chuẩn bị cho kỳ thi JLPT N5 từ A đến Z.',
  '<h2>Giới thiệu về JLPT N5</h2><p>JLPT N5 là cấp độ cơ bản nhất trong hệ thống kỳ thi năng lực tiếng Nhật. Kỳ thi này đánh giá khả năng hiểu biết tiếng Nhật cơ bản.</p><h2>Cấu trúc đề thi</h2><p>Đề thi JLPT N5 bao gồm 3 phần: Từ vựng & Ngữ pháp (25 phút), Đọc hiểu (50 phút), và Nghe (30 phút).</p>',
  'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
  'JLPT',
  ARRAY['JLPT', 'N5', 'Thi cử'],
  'TNQDO',
  null,
  true
);
