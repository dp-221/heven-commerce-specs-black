
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from 'sonner';

export interface WishlistItem {
  id: string;
  product_id: string;
  created_at: string;
  products: {
    name: string;
    price: number;
    discount_price?: number;
    images: string[];
    stock_quantity: number;
  };
}

export function useWishlist() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const wishlistQuery = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          *,
          products(name, price, discount_price, images, stock_quantity)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data as WishlistItem[];
    },
    enabled: !!user,
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error('Must be logged in to add to wishlist');

      const { data, error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: productId,
        })
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id] });
      toast.success('Added to wishlist!');
    },
    onError: (error) => {
      toast.error('Failed to add to wishlist');
      console.error('Add to wishlist error:', error);
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error('Must be logged in');

      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist', user?.id] });
      toast.success('Removed from wishlist');
    },
    onError: () => {
      toast.error('Failed to remove from wishlist');
    },
  });

  const isInWishlist = (productId: string) => {
    return wishlistQuery.data?.some(item => item.product_id === productId) || false;
  };

  return {
    wishlist: wishlistQuery.data || [],
    isLoading: wishlistQuery.isLoading,
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    isInWishlist,
    wishlistCount: wishlistQuery.data?.length || 0,
  };
}
