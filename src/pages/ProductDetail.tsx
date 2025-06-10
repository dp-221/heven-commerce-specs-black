
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Minus, Plus, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: product, isLoading } = useProduct(id!);
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showZoom, setShowZoom] = useState(false);

  const handleAddToCart = () => {
    if (!user) {
      toast.error('Please sign in to add items to cart');
      return;
    }
    
    if (product?.sizes && product.sizes.length > 0 && !selectedSize) {
      toast.error('Please select a size');
      return;
    }
    
    if (product?.colors && product.colors.length > 0 && !selectedColor) {
      toast.error('Please select a color');
      return;
    }

    addToCart({
      productId: product!.id,
      quantity,
      size: selectedSize,
      color: selectedColor
    });
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Skeleton className="w-full h-96" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const currentPrice = product.discount_price || product.price;
  const hasDiscount = !!product.discount_price;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex mb-8">
            <ol className="flex items-center space-x-2">
              <li><button onClick={() => navigate('/')} className="text-gray-500 hover:text-gray-700">Home</button></li>
              <li><span className="text-gray-400 mx-2">/</span></li>
              <li><span className="text-gray-500">{product.categories?.name}</span></li>
              <li><span className="text-gray-400 mx-2">/</span></li>
              <li><span className="text-gray-900">{product.name}</span></li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative group">
                <img
                  src={product.images[selectedImage] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-lg cursor-zoom-in"
                  onClick={() => setShowZoom(true)}
                />
                <button
                  onClick={() => setShowZoom(true)}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ZoomIn className="h-5 w-5" />
                </button>
              </div>
              
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        selectedImage === index ? 'border-black' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                {product.brand && <p className="text-lg text-gray-600">{product.brand}</p>}
                
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center space-x-2">
                    {hasDiscount && (
                      <span className="text-2xl font-bold text-gray-400 line-through">${product.price}</span>
                    )}
                    <span className="text-3xl font-bold text-black">${currentPrice}</span>
                  </div>
                  {hasDiscount && (
                    <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                      Save ${(product.price - product.discount_price!).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>

              {product.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-lg ${
                          selectedSize === size
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border rounded-lg ${
                          selectedColor === color
                            ? 'border-black bg-black text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="font-semibold mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-semibold px-4">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border rounded-lg hover:bg-gray-50"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  onClick={handleAddToCart}
                  className="w-full bg-black text-white hover:bg-gray-800 py-3"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart - ${(currentPrice * quantity).toFixed(2)}
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full border-black text-black hover:bg-gray-50 py-3"
                  size="lg"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>

              {/* Stock Info */}
              {product.stock_quantity !== undefined && (
                <div className="text-sm text-gray-600">
                  {product.stock_quantity > 0 ? (
                    <span className="text-green-600">✓ In Stock ({product.stock_quantity} available)</span>
                  ) : (
                    <span className="text-red-600">✗ Out of Stock</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">4.5</div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${star <= 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600">Based on 127 reviews</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 space-y-4">
                {/* Sample Reviews */}
                {[
                  { name: 'Sarah Johnson', rating: 5, review: 'Amazing quality! The fabric feels premium and the fit is perfect.' },
                  { name: 'Mike Chen', rating: 4, review: 'Great product, exactly as described. Fast shipping too!' },
                  { name: 'Emma Davis', rating: 5, review: 'Love this! Will definitely buy more from this brand.' }
                ].map((review, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="font-semibold">{review.name}</div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">2 days ago</span>
                      </div>
                      <p className="text-gray-600">{review.review}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Zoom Modal */}
        {showZoom && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowZoom(false)}>
            <div className="max-w-4xl max-h-full p-4">
              <img
                src={product.images[selectedImage] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductDetail;
