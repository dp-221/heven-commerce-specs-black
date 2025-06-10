
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, cartCount } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your cart</h1>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const subtotal = cart.reduce((sum, item) => {
    const price = item.products.discount_price || item.products.price;
    return sum + (price * item.quantity);
  }, 0);

  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cartCount === 0) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Button onClick={() => navigate('/')} size="lg">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => {
                const price = item.products.discount_price || item.products.price;
                return (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.products.images[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                          alt={item.products.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{item.products.name}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            {item.size && <span>Size: {item.size}</span>}
                            {item.color && <span>Color: {item.color}</span>}
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            {item.products.discount_price && (
                              <span className="text-gray-400 line-through">${item.products.price}</span>
                            )}
                            <span className="font-semibold">${price}</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity({ itemId: item.id, quantity: Math.max(1, item.quantity - 1) })}
                            className="p-1 border rounded hover:bg-gray-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="font-semibold px-3">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity({ itemId: item.id, quantity: item.quantity + 1 })}
                            className="p-1 border rounded hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold">${(price * item.quantity).toFixed(2)}</div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 mt-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal ({cartCount} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <hr />
                    
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {shipping > 0 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-700">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                    </div>
                  )}

                  <Button
                    onClick={() => navigate('/checkout')}
                    className="w-full mt-6 bg-black text-white hover:bg-gray-800"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>
                  
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline"
                    className="w-full mt-3"
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
