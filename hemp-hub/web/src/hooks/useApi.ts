import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { categoriesApi, productsApi, searchApi, statsApi } from '../lib/api';
import type { Category, Product, SearchParams } from '../types/database';

// Categories hooks
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.getAll(),
    select: (data) => data.data,
  });
};

export const useCategory = (id: string) => {
  return useQuery({
    queryKey: ['categories', id],
    queryFn: () => categoriesApi.getById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCategoryWithProducts = (id: string) => {
  return useQuery({
    queryKey: ['categories', id, 'products'],
    queryFn: () => categoriesApi.getWithProducts(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) => 
      categoriesApi.create(category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { 
      id: string; 
      updates: Partial<Omit<Category, 'id' | 'created_at'>> 
    }) => categoriesApi.update(id, updates),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      queryClient.invalidateQueries({ queryKey: ['categories', variables.id] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => categoriesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });
};

// Products hooks
export const useProducts = (params?: { 
  category_id?: string; 
  limit?: number; 
  offset?: number 
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => productsApi.getAll(params),
    select: (data) => data.data,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsApi.getById(id),
    select: (data) => data.data,
    enabled: !!id,
  });
};

export const useProductsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ['products', 'category', categoryId],
    queryFn: () => productsApi.getByCategory(categoryId),
    select: (data) => data.data,
    enabled: !!categoryId,
  });
};

export const useSearchProducts = (query: string, params?: SearchParams) => {
  return useQuery({
    queryKey: ['products', 'search', query, params],
    queryFn: () => productsApi.search(query, params),
    select: (data) => data.data,
    enabled: !!query && query.length > 2,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (product: Omit<Product, 'id' | 'created_at' | 'updated_at'>) => 
      productsApi.create(product),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (variables.category_id) {
        queryClient.invalidateQueries({ 
          queryKey: ['products', 'category', variables.category_id] 
        });
      }
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { 
      id: string; 
      updates: Partial<Omit<Product, 'id' | 'created_at'>> 
    }) => productsApi.update(id, updates),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['products', variables.id] });
      // Also invalidate category-specific queries
      if (data.data?.category_id) {
        queryClient.invalidateQueries({ 
          queryKey: ['products', 'category', data.data.category_id] 
        });
      }
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => productsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

// Search hooks
export const useGlobalSearch = (query: string, params?: SearchParams) => {
  return useQuery({
    queryKey: ['search', query, params],
    queryFn: () => searchApi.search(query, params),
    select: (data) => data.data,
    enabled: !!query && query.length > 2,
    staleTime: 30000, // 30 seconds
  });
};

// Statistics hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['stats', 'dashboard'],
    queryFn: () => statsApi.getDashboardStats(),
    select: (data) => data.data,
    staleTime: 60000, // 1 minute
  });
};

// Utility hooks
export const useCategoriesWithProductCount = () => {
  return useQuery({
    queryKey: ['categories', 'with-product-count'],
    queryFn: async () => {
      const [categoriesResult, productsResult] = await Promise.all([
        categoriesApi.getAll(),
        productsApi.getAll()
      ]);

      if (categoriesResult.error || productsResult.error) {
        throw new Error('Failed to fetch data');
      }

      const categories = categoriesResult.data || [];
      const products = productsResult.data || [];

      // Count products per category
      const productCounts = products.reduce((acc, product) => {
        if (product.category_id) {
          acc[product.category_id] = (acc[product.category_id] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      // Add product count to each category
      return categories.map(category => ({
        ...category,
        product_count: productCounts[category.id] || 0
      }));
    },
    staleTime: 60000, // 1 minute
  });
};

// Featured/Popular content hooks
export const useFeaturedProducts = (limit = 6) => {
  return useQuery({
    queryKey: ['products', 'featured', limit],
    queryFn: () => productsApi.getAll({ limit }),
    select: (data) => data.data,
    staleTime: 300000, // 5 minutes
  });
};

export const useFeaturedCategories = (limit = 8) => {
  return useQuery({
    queryKey: ['categories', 'featured', limit],
    queryFn: async () => {
      const result = await categoriesApi.getAll();
      if (result.error) throw new Error('Failed to fetch categories');
      
      // Return first N categories (could be enhanced with actual "featured" logic)
      return result.data?.slice(0, limit) || [];
    },
    staleTime: 300000, // 5 minutes
  });
};