-- Create tables for the Hemp Resource Hub frontend
CREATE TABLE IF NOT EXISTS plant_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS plant_parts (
  id SERIAL PRIMARY KEY,
  plant_type_id INTEGER REFERENCES plant_types(id),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT
);

CREATE TABLE IF NOT EXISTS industries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT
);

CREATE TABLE IF NOT EXISTS hemp_products (
  id SERIAL PRIMARY KEY,
  plant_part_id INTEGER REFERENCES plant_parts(id),
  industry_id INTEGER REFERENCES industries(id),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  benefits TEXT[],
  uses TEXT[]
);

-- Add full text search capability
ALTER TABLE hemp_products ADD COLUMN IF NOT EXISTS search_vector tsvector 
  GENERATED ALWAYS AS (to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))) STORED;

CREATE INDEX IF NOT EXISTS hemp_products_search_idx ON hemp_products USING GIN (search_vector);

-- Research papers table
CREATE TABLE IF NOT EXISTS research_papers (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  abstract TEXT,
  authors TEXT[],
  publication_date DATE,
  url TEXT,
  plant_type_id INTEGER REFERENCES plant_types(id),
  plant_part_id INTEGER REFERENCES plant_parts(id),
  industry_id INTEGER REFERENCES industries(id),
  keywords TEXT[]
);

-- Add search capabilities to research papers
ALTER TABLE research_papers ADD COLUMN IF NOT EXISTS search_vector tsvector
  GENERATED ALWAYS AS (to_tsvector('english', 
    coalesce(title, '') || ' ' || 
    coalesce(abstract, '') || ' ' || 
    coalesce(array_to_string(authors, ' '), '') || ' ' ||
    coalesce(array_to_string(keywords, ' '), '')
  )) STORED;

CREATE INDEX IF NOT EXISTS research_papers_search_idx ON research_papers USING GIN (search_vector);

-- Insert some sample data for testing
INSERT INTO plant_types (name, description, image_url)
VALUES 
  ('Cannabis Sativa', 'A species of the Cannabis genus known for its tall, thin structure and narrow leaves.', '/images/cannabis-sativa.jpg'),
  ('Cannabis Indica', 'A species of the Cannabis genus known for its shorter, bushier structure and broader leaves.', '/images/cannabis-indica.jpg')
ON CONFLICT (id) DO NOTHING;

INSERT INTO plant_parts (plant_type_id, name, description, image_url)
VALUES 
  (1, 'Flowers', 'The reproductive structures of the plant, often called buds.', '/images/flowers.jpg'),
  (1, 'Seeds', 'The reproductive part that contains the embryo.', '/images/seeds.jpg'),
  (1, 'Stalks', 'The main stem of the plant that supports the foliage.', '/images/stalks.jpg')
ON CONFLICT (id) DO NOTHING;

INSERT INTO industries (name, description, icon)
VALUES 
  ('Textiles', 'Products made from hemp fibers for clothing and fabrics.', 'shirt'),
  ('Food', 'Edible products derived from hemp.', 'utensils'),
  ('Construction', 'Building materials made from hemp.', 'building')
ON CONFLICT (id) DO NOTHING;

INSERT INTO hemp_products (plant_part_id, industry_id, name, description, image_url, benefits, uses)
VALUES 
  (3, 1, 'Hemp Fabric', 'Sustainable fabric made from hemp stalks.', '/images/hemp-fabric.jpg', 
   ARRAY['Durable', 'Sustainable', 'Breathable'], 
   ARRAY['Clothing', 'Upholstery', 'Industrial textiles']),
  (2, 2, 'Hemp Seeds', 'Nutritious seeds that can be consumed raw.', '/images/hemp-seeds.jpg', 
   ARRAY['High in protein', 'Rich in omega fatty acids', 'Contains minerals'], 
   ARRAY['Direct consumption', 'Oil production', 'Hemp milk'])
ON CONFLICT (id) DO NOTHING;

INSERT INTO research_papers (title, abstract, authors, publication_date, url, plant_type_id, plant_part_id, keywords)
VALUES 
  ('Sustainable Hemp Farming Practices', 'A study on environmental impacts of hemp cultivation methods.', 
   ARRAY['Smith, J.', 'Johnson, M.'], '2024-01-15', 'https://example.com/research1', 1, NULL, 
   ARRAY['sustainability', 'cultivation', 'farming']),
  ('Nutritional Analysis of Hemp Seeds', 'Comprehensive analysis of nutritional components in hemp seeds.', 
   ARRAY['Lopez, R.', 'Chen, H.'], '2024-02-20', 'https://example.com/research2', 1, 2, 
   ARRAY['nutrition', 'seeds', 'health'])
ON CONFLICT (id) DO NOTHING;