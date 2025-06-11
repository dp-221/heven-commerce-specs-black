
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Product } from './useProducts';

export interface WishlistItem {
  id: string;
  created_at: string;
  products: Product;
}

export function useWishlistItems() {
  return useQuery({
    queryKey: ['wishlist-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          *,
          products(*)
        `)
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as WishlistItem[];
    },
  });
}
