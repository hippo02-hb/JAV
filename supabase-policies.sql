-- Add policies for INSERT, UPDATE, DELETE operations
-- These policies allow all authenticated and anonymous users to modify data
-- This is suitable for development. For production, you should add proper authentication checks.

-- Policies for courses table
CREATE POLICY "Allow all insert access to courses" ON courses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all update access to courses" ON courses
  FOR UPDATE USING (true);

CREATE POLICY "Allow all delete access to courses" ON courses
  FOR DELETE USING (true);

-- Policies for blog_posts table
CREATE POLICY "Allow all insert access to blog_posts" ON blog_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all update access to blog_posts" ON blog_posts
  FOR UPDATE USING (true);

CREATE POLICY "Allow all delete access to blog_posts" ON blog_posts
  FOR DELETE USING (true);

-- Policies for teachers table
CREATE POLICY "Allow all insert access to teachers" ON teachers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all update access to teachers" ON teachers
  FOR UPDATE USING (true);

CREATE POLICY "Allow all delete access to teachers" ON teachers
  FOR DELETE USING (true);

-- Policies for faqs table
CREATE POLICY "Allow all insert access to faqs" ON faqs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all update access to faqs" ON faqs
  FOR UPDATE USING (true);

CREATE POLICY "Allow all delete access to faqs" ON faqs
  FOR DELETE USING (true);

-- Policies for company_info table
CREATE POLICY "Allow all insert access to company_info" ON company_info
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow all update access to company_info" ON company_info
  FOR UPDATE USING (true);

CREATE POLICY "Allow all delete access to company_info" ON company_info
  FOR DELETE USING (true);
