import { supabase } from './supabase';
import type { 
  Category, 
  Product, 
  HempPart, 
  HempProduct, 
  HempUse, 
  SearchParams, 
  SearchResult 
} from '../types/database';

// Categories API
export const categoriesApi = {
  // Get all categories
  async getAll() {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    return { data, error };
  },

  // Get category by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  // Get category with products
  async getWithProducts(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .select(`
        *,
        products (*)
      `)
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  // Create new category
  async create(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single();
    
    return { data, error };
  },

  // Update category
  async update(id: string, updates: Partial<Omit<Category, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
      .from('categories')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    return { data, error };
  },

  // Delete category
  async delete(id: string) {
    const { data, error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);
    
    return { data, error };
  }
};

// Products API
export const productsApi = {
  // Get all products
  async getAll(params?: { category_id?: string; limit?: number; offset?: number }) {
    let query = supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .order('title');
    
    if (params?.category_id) {
      query = query.eq('category_id', params.category_id);
    }
    
    if (params?.limit) {
      query = query.limit(params.limit);
    }
    
    if (params?.offset) {
      query = query.range(params.offset, params.offset + (params.limit || 10) - 1);
    }
    
    const { data, error } = await query;
    return { data, error };
  },

  // Get product by ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  // Get products by category
  async getByCategory(categoryId: string) {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .eq('category_id', categoryId)
      .order('title');
    
    return { data, error };
  },

  // Search products
  async search(query: string, params?: SearchParams) {
    let searchQuery = supabase
      .from('products')
      .select(`
        *,
        category:categories(*)
      `)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('title');
    
    if (params?.category_id) {
      searchQuery = searchQuery.eq('category_id', params.category_id);
    }
    
    if (params?.limit) {
      searchQuery = searchQuery.limit(params.limit);
    }
    
    const { data, error } = await searchQuery;
    return { data, error };
  },

  // Create new product
  async create(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select(`
        *,
        category:categories(*)
      `)
      .single();
    
    return { data, error };
  },

  // Update product
  async update(id: string, updates: Partial<Omit<Product, 'id' | 'created_at'>>) {
    const { data, error } = await supabase
      .from('products')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select(`
        *,
        category:categories(*)
      `)
      .single();
    
    return { data, error };
  },

  // Delete product
  async delete(id: string) {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    
    return { data, error };
  }
};

// Hemp Parts API
export const hempPartsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('hemp_parts')
      .select('*')
      .order('name');
    
    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('hemp_parts')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  async create(hempPart: Omit<HempPart, 'id'>) {
    const { data, error } = await supabase
      .from('hemp_parts')
      .insert(hempPart)
      .select()
      .single();
    
    return { data, error };
  }
};

// Hemp Products API
export const hempProductsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('hemp_products')
      .select(`
        *,
        hemp_part:hemp_parts(*)
      `)
      .order('name');
    
    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('hemp_products')
      .select(`
        *,
        hemp_part:hemp_parts(*)
      `)
      .eq('id', id)
      .single();
    
    return { data, error };
  },

  async getByHempPart(hempPartId: string) {
    const { data, error } = await supabase
      .from('hemp_products')
      .select(`
        *,
        hemp_part:hemp_parts(*)
      `)
      .eq('hemp_part_id', hempPartId)
      .order('name');
    
    return { data, error };
  }
};

// Hemp Uses API
export const hempUsesApi = {
  async getAll() {
    const { data, error } = await supabase
      .from('hemp_uses')
      .select('*')
      .order('name');
    
    return { data, error };
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('hemp_uses')
      .select('*')
      .eq('id', id)
      .single();
    
    return { data, error };
  }
};

// Global search function
export const searchApi = {
  async search(query: string, params?: SearchParams): Promise<{ data: SearchResult | null; error: any }> {
    try {
      // Search categories
      const { data: categories, error: categoriesError } = await supabase
        .from('categories')
        .select('*')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(params?.limit || 10);

      if (categoriesError) throw categoriesError;

      // Search products
      const { data: products, error: productsError } = await supabase
        .from('products')
        .select(`
          *,
          category:categories(*)
        `)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .limit(params?.limit || 20);

      if (productsError) throw productsError;

      const result: SearchResult = {
        categories: categories || [],
        products: products || [],
        total_count: (categories?.length || 0) + (products?.length || 0)
      };

      return { data: result, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};

// Statistics API
export const statsApi = {
  async getDashboardStats() {
    try {
      const [categoriesResult, productsResult] = await Promise.all([
        supabase.from('categories').select('id', { count: 'exact', head: true }),
        supabase.from('products').select('id', { count: 'exact', head: true })
      ]);

      return {
        data: {
          categories_count: categoriesResult.count || 0,
          products_count: productsResult.count || 0
        },
        error: null
      };
    } catch (error) {
      return { data: null, error };
    }
  }
};