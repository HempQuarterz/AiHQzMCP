// Database types matching the live Supabase schema

export interface Category {
  id: string;
  created_at: string;
  name: string;
  description: string;
  image_url: string;
  updated_at: string;
}

export interface Product {
  id: string;
  created_at: string;
  title: string;
  description: string;
  image_url: string;
  category_id: string | null;
  updated_at: string;
  category?: Category; // For joined queries
}

export interface HempPart {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  info_url: string | null;
}

export interface HempProduct {
  id: string;
  hemp_part_id: string | null;
  name: string;
  description: string | null;
  processing_methods: string | null;
  image_url: string | null;
  product_website_url: string | null;
  hemp_part?: HempPart; // For joined queries
}

export interface HempUse {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  application_info_url: string | null;
}

export interface ProductApplication {
  product_id: string;
  application_id: string;
  product?: HempProduct; // For joined queries
  application?: HempUse; // For joined queries
}

export interface Image {
  id: string;
  entity_type: string;
  entity_id: string;
  image_url: string;
  caption: string | null;
  alt_text: string | null;
  created_at: string | null;
}

export interface User {
  id: string;
  username: string;
  email: string;
  password_hash: string | null;
  role: string | null;
  profile_image_url: string | null;
  website_url: string | null;
}

// Response types for API calls
export interface CategoriesResponse {
  data: Category[] | null;
  error: any;
}

export interface ProductsResponse {
  data: Product[] | null;
  error: any;
}

export interface CategoryWithProducts extends Category {
  products?: Product[];
}

export interface ProductWithCategory extends Product {
  category?: Category;
}

// Search and filter types
export interface SearchParams {
  query?: string;
  category_id?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResult {
  categories: Category[];
  products: Product[];
  total_count: number;
}

// API utility types
export interface DatabaseError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  has_more: boolean;
}

// Component prop types
export interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export interface ProductCardProps {
  product: Product;
  showCategory?: boolean;
}

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: DatabaseError | null;
}

export interface CategoryGridProps {
  categories: Category[];
  loading?: boolean;
  error?: DatabaseError | null;
}
