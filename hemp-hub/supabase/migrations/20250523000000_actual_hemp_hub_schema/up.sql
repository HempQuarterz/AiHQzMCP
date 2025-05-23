-- Updated Hemp Hub Database Schema - Matches Live Database
-- This migration reflects the actual current structure in production

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories table (hemp parts/types)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Products table (main hemp products)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Hemp parts table (for detailed hemp part information)
CREATE TABLE IF NOT EXISTS hemp_parts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  info_url TEXT
);

-- Hemp products table (detailed product catalog)
CREATE TABLE IF NOT EXISTS hemp_products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hemp_part_id UUID REFERENCES hemp_parts(id),
  name TEXT NOT NULL,
  description TEXT,
  processing_methods TEXT,
  image_url TEXT,
  product_website_url TEXT
);

-- Hemp uses/applications table
CREATE TABLE IF NOT EXISTS hemp_uses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  application_info_url TEXT
);

-- Junction table for product applications
CREATE TABLE IF NOT EXISTS product_applications (
  product_id UUID REFERENCES hemp_products(id) NOT NULL,
  application_id UUID REFERENCES hemp_uses(id) NOT NULL,
  PRIMARY KEY (product_id, application_id)
);

-- Images table for managing media assets
CREATE TABLE IF NOT EXISTS images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type TEXT NOT NULL,
  entity_id UUID NOT NULL,
  image_url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  email TEXT NOT NULL,
  password_hash TEXT,
  role TEXT,
  profile_image_url TEXT,
  website_url TEXT
);

-- Enable Row Level Security
ALTER TABLE hemp_parts ENABLE ROW LEVEL SECURITY;
ALTER TABLE hemp_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE hemp_uses ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category_id ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_hemp_products_hemp_part_id ON hemp_products(hemp_part_id);
CREATE INDEX IF NOT EXISTS idx_product_applications_product_id ON product_applications(product_id);
CREATE INDEX IF NOT EXISTS idx_product_applications_application_id ON product_applications(application_id);
CREATE INDEX IF NOT EXISTS idx_images_entity ON images(entity_type, entity_id);

-- Create full-text search capabilities
ALTER TABLE products ADD COLUMN IF NOT EXISTS search_vector tsvector 
  GENERATED ALWAYS AS (to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, ''))) STORED;

ALTER TABLE hemp_products ADD COLUMN IF NOT EXISTS search_vector tsvector 
  GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))) STORED;

CREATE INDEX IF NOT EXISTS idx_products_search ON products USING GIN (search_vector);
CREATE INDEX IF NOT EXISTS idx_hemp_products_search ON hemp_products USING GIN (search_vector);

-- Insert sample categories (if they don't exist)
INSERT INTO categories (name, description, image_url) VALUES
  ('Seeds', 'Hemp seeds are a rich source of nutrients including protein, omega-3 fatty acids, and various minerals.', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b'),
  ('Leaves', 'Hemp leaves contain various cannabinoids and can be used for multiple purposes.', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'),
  ('Bast Fibers', 'Natural fibers extracted from hemp stalks with exceptional strength and durability.', 'https://images.unsplash.com/photo-1518481852452-9415b262eba4'),
  ('Hurds', 'Woody core of hemp stalks used in various industrial applications.', 'https://images.unsplash.com/photo-1490644658840-3f2e3f8c5625'),
  ('Roots', 'Hemp roots have various applications in agriculture and medicine.', 'https://images.unsplash.com/photo-1501854140801-50d01698950b'),
  ('Textiles', 'Sustainable textile solutions made from hemp fibers.', 'https://images.unsplash.com/photo-1445205170230-053b83016050'),
  ('Construction', 'Innovative building materials made from hemp.', 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5'),
  ('Automotive', 'Sustainable car components', 'https://images.unsplash.com/photo-1549317336-206569e8475c'),
  ('Paper', 'Tree-free paper products', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c'),
  ('Plastics', 'Biodegradable plastic alternatives', 'https://images.unsplash.com/photo-1583947215259-38e31be8751f'),
  ('Biofuel', 'Renewable energy solutions derived from hemp biomass.', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e'),
  ('Whole Plant', 'Complete hemp plant utilization for maximum sustainability.', 'https://images.unsplash.com/photo-1464207687429-7505649dae38')
ON CONFLICT (name) DO NOTHING;