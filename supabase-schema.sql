-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  level TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT NOT NULL,
  features TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  syllabus JSONB DEFAULT '[]',
  requirements TEXT[] DEFAULT '{}',
  outcomes TEXT[] DEFAULT '{}'
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  author_name TEXT NOT NULL,
  author_avatar TEXT,
  published_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0
);

-- Create teachers table
CREATE TABLE IF NOT EXISTS teachers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  avatar TEXT NOT NULL,
  bio TEXT NOT NULL,
  specializations TEXT[] NOT NULL DEFAULT '{}',
  experience TEXT NOT NULL,
  education TEXT[] NOT NULL DEFAULT '{}',
  certifications TEXT[] NOT NULL DEFAULT '{}',
  teaching_style TEXT NOT NULL,
  courses_count INTEGER DEFAULT 0,
  students_count INTEGER DEFAULT 0,
  rating NUMERIC DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  social_links JSONB DEFAULT '{}',
  achievements TEXT[] DEFAULT '{}',
  courses_teaching TEXT[] DEFAULT '{}',
  testimonials JSONB DEFAULT '[]'
);

-- Create faqs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create company_info table
CREATE TABLE IF NOT EXISTS company_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  website TEXT NOT NULL,
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_courses_level ON courses(level);
CREATE INDEX IF NOT EXISTS idx_courses_active ON courses(is_active);
CREATE INDEX IF NOT EXISTS idx_blog_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_published ON blog_posts(is_published);
CREATE INDEX IF NOT EXISTS idx_teachers_active ON teachers(is_active);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs("order");

-- Enable Row Level Security (RLS)
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_info ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to courses" ON courses
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to blog_posts" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to teachers" ON teachers
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to faqs" ON faqs
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to company_info" ON company_info
  FOR SELECT USING (true);

-- Insert sample company info
INSERT INTO company_info (name, description, address, phone, email, website, social_links)
VALUES (
  'Tiếng Nhật Quang Dũng Online',
  'Trung tâm dạy tiếng Nhật trực tuyến hàng đầu Việt Nam',
  '123 Đường ABC, Quận 1, TP.HCM',
  '+84 123 456 789',
  'contact@tnqdo.com',
  'https://tnqdo.com',
  '{"facebook": "https://facebook.com/tnqdo", "instagram": "https://instagram.com/tnqdo"}'::jsonb
)
ON CONFLICT DO NOTHING;
