
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface OrderItem {
  id: string;
  product_name: string;
  product_sku: string;
  quantity: number;
  size?: string;
  color?: string;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  order_number: string;
  created_at: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  order_items: OrderItem[];
}

export function useOrders() {
  return useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items(*)
        `)
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
  });
}
