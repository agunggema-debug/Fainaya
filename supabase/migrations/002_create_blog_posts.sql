-- =============================================
-- Migration: Create blog_posts table
-- Date: 2026-09-01
-- =============================================

-- 1. TABLE: blog_posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author TEXT DEFAULT 'Fainaya',
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'draft')),
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_blog_posts_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_blog_posts_updated_at_column();

-- Enable RLS (Row Level Security)
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Public: allow anyone (anon) to read published posts (for the public blog page)
CREATE POLICY "Allow public to read published blog_posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (status = 'published');

-- Authenticated: allow read of all posts (including drafts, for admin)
CREATE POLICY "Allow authenticated users to read blog_posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated: allow insert / update / delete (admin CRUD)
CREATE POLICY "Allow authenticated users to insert blog_posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update blog_posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to delete blog_posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);