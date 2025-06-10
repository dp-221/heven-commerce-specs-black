
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const LatestArrivals = () => {
  const { data: products, isLoading } = useProducts();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }
    addToCart({ productId, quantity: 1 });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Latest Arrivals</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fresh styles just dropped. Be the first to discover our newest pieces
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-0 shadow-md bg-white">
                <CardContent className="p-0">
                  <Skeleton className="w-full h-64" />
                  <div className="p-4">
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-3" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const latestProducts = products?.slice(0, 4) || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Latest Arrivals</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Fresh styles just dropped. Be the first to discover our newest pieces
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestProducts.map((product) => (
            <Card 
              key={product.id} 
              className="group cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white"
              onClick={() => handleProductClick(product.id)}
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.images[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-black mb-2">{product.name}</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    {product.discount_price ? (
                      <>
                        <p className="text-lg font-bold text-black">${product.discount_price}</p>
                        <p className="text-sm text-gray-500 line-through">${product.price}</p>
                      </>
                    ) : (
                      <p className="text-lg font-bold text-black">${product.price}</p>
                    )}
                  </div>
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                    size="sm"
                    onClick={(e) => handleAddToCart(e, product.id)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            className="border-black text-black hover:bg-black hover:text-white transition-colors duration-200 px-8"
          >
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LatestArrivals;
