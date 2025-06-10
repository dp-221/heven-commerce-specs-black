
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount_price?: number;
  sku: string;
  brand: string;
  stock_quantity: number;
  images: string[];
  sizes?: string[];
  colors?: string[];
  category_id: string;
  featured: boolean;
  is_active: boolean;
  categories?: {
    name: string;
  };
}

export function useProducts(featured?: boolean) {
  return useQuery({
    queryKey: ['products', featured],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(`
          *,
          categories(name)
        `)
        .eq('is_active', true);

      if (featured) {
        query = query.eq('featured', true);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
  });
}

export function useProduct(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories(name)
        `)
        .eq('id', id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data as Product;
    },
    enabled: !!id,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('name');

      if (error) throw error;
      return data;
    },
  });
}
