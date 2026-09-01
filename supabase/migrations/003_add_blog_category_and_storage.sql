-- =============================================
-- Migration: Add kategori column & blog image storage
-- Date: 2026-09-01
-- =============================================

-- 1. Add kategori column to blog_posts
ALTER TABLE blog_posts
  ADD COLUMN IF NOT EXISTS kategori TEXT DEFAULT 'Umum';

CREATE INDEX IF NOT EXISTS idx_blog_posts_kategori ON blog_posts(kategori);

-- 2. Storage bucket for blog cover images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog', 'blog', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for the blog bucket
CREATE POLICY "Allow public to read blog images"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'blog');

CREATE POLICY "Allow authenticated users to insert blog images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog');

CREATE POLICY "Allow authenticated users to update blog images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog')
  WITH CHECK (bucket_id = 'blog');

CREATE POLICY "Allow authenticated users to delete blog images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog');
