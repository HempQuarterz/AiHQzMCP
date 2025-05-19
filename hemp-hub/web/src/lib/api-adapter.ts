import { supabase } from './supabase';

// This adapter class replaces the MockFirebase from HempResourceHub
// It implements the same interface but uses Supabase instead
export class SupabaseApiAdapter {
  async getPlantTypes() {
    const { data, error } = await supabase
      .from('plant_types')
      .select('*');
      
    if (error) throw error;
    return data;
  }
  
  async getPlantType(id: number) {
    const { data, error } = await supabase
      .from('plant_types')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async getPlantPartsByType(plantTypeId: number) {
    const { data, error } = await supabase
      .from('plant_parts')
      .select('*')
      .eq('plant_type_id', plantTypeId);
      
    if (error) throw error;
    return data;
  }
  
  async getPlantPart(id: number) {
    const { data, error } = await supabase
      .from('plant_parts')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async getHempProductsByPart(plantPartId: number, industryId?: number, page: number = 1, limit: number = 5) {
    let query = supabase
      .from('hemp_products')
      .select('*')
      .eq('plant_part_id', plantPartId);
      
    if (industryId) {
      query = query.eq('industry_id', industryId);
    }
    
    // Handle pagination
    const startIndex = (page - 1) * limit;
    query = query.range(startIndex, startIndex + limit - 1);
    
    const { data, error } = await query;
    if (error) throw error;
    
    // Also get total count for pagination
    const { count, error: countError } = await supabase
      .from('hemp_products')
      .select('*', { count: 'exact' })
      .eq('plant_part_id', plantPartId);
      
    if (countError) throw countError;
    
    return {
      items: data,
      pagination: {
        page,
        limit,
        total: count || 0,
        pages: Math.ceil((count || 0) / limit)
      }
    };
  }
  
  async getHempProduct(id: number) {
    const { data, error } = await supabase
      .from('hemp_products')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return data;
  }
  
  async getAllIndustries() {
    const { data, error } = await supabase
      .from('industries')
      .select('*');
      
    if (error) throw error;
    return data;
  }
  
  async searchHempProducts(query: string) {
    // This assumes you've set up full-text search in Supabase
    const { data, error } = await supabase
      .from('hemp_products')
      .select('*')
      .textSearch('name', query);
      
    if (error) throw error;
    return data;
  }
  
  async getStats() {
    // You might need to implement this differently based on your Supabase schema
    // This is just a placeholder example
    const [
      plantTypesResult,
      plantPartsResult,
      productsResult,
      industriesResult
    ] = await Promise.all([
      supabase.from('plant_types').select('*', { count: 'exact' }),
      supabase.from('plant_parts').select('*', { count: 'exact' }),
      supabase.from('hemp_products').select('*', { count: 'exact' }),
      supabase.from('industries').select('*', { count: 'exact' })
    ]);
    
    return {
      plantTypesCount: plantTypesResult.count || 0,
      plantPartsCount: plantPartsResult.count || 0,
      productsCount: productsResult.count || 0,
      industriesCount: industriesResult.count || 0
    };
  }
}

export const api = new SupabaseApiAdapter();