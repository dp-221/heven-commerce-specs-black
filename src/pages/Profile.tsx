
import React, { useState } from 'react';
import { User, Package, Heart, MapPin, Lock, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useOrders } from '@/hooks/useOrders';
import { useWishlistItems } from '@/hooks/useWishlistItems';
import { useProfile, useUpdateProfile } from '@/hooks/useProfile';
import { useWishlist } from '@/hooks/useWishlist';
import { Skeleton } from '@/components/ui/skeleton';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: wishlistItems, isLoading: wishlistLoading } = useWishlistItems();
  const { data: profile, isLoading: profileLoading } = useProfile();
  const { removeFromWishlist } = useWishlist();
  const updateProfile = useUpdateProfile();
  
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
  });

  React.useEffect(() => {
    if (profile) {
      setProfileForm({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone_number: profile.phone_number || '',
      });
    }
  }, [profile]);

  if (!user) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Please sign in to view your profile</h1>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate(profileForm);
  };

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <Button
              onClick={signOut}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign Out</span>
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center space-x-2">
                <Package className="h-4 w-4" />
                <span>Orders</span>
              </TabsTrigger>
              <TabsTrigger value="wishlist" className="flex items-center space-x-2">
                <Heart className="h-4 w-4" />
                <span>Wishlist</span>
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Addresses</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {profileLoading ? (
                      <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : (
                      <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input 
                              id="firstName" 
                              value={profileForm.first_name}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, first_name: e.target.value }))}
                            />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input 
                              id="lastName" 
                              value={profileForm.last_name}
                              onChange={(e) => setProfileForm(prev => ({ ...prev, last_name: e.target.value }))}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" value={user.email || ''} disabled />
                        </div>
                        
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={profileForm.phone_number}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, phone_number: e.target.value }))}
                          />
                        </div>
                        
                        <Button type="submit" className="w-full" disabled={updateProfile.isPending}>
                          {updateProfile.isPending ? 'Updating...' : 'Update Profile'}
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Lock className="h-5 w-5 mr-2" />
                      Change Password
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" />
                    </div>
                    
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" />
                    </div>
                    
                    <Button className="w-full">Change Password</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                  {ordersLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <Skeleton className="h-6 w-48 mb-2" />
                          <Skeleton className="h-4 w-32 mb-4" />
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </div>
                      ))}
                    </div>
                  ) : orders && orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold">Order #{order.order_number}</h3>
                              <p className="text-sm text-gray-600">
                                Placed on {new Date(order.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">${order.total_amount.toFixed(2)}</div>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'delivered' 
                                  ? 'bg-green-100 text-green-800' 
                                  : order.status === 'shipped'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            {order.order_items.map((item, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span>
                                  {item.product_name} × {item.quantity}
                                  {item.size && ` (Size: ${item.size})`}
                                  {item.color && ` (Color: ${item.color})`}
                                </span>
                                <span>${item.total_price.toFixed(2)}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex space-x-2 mt-4">
                            <Button variant="outline" size="sm">View Details</Button>
                            <Button variant="outline" size="sm">Track Order</Button>
                            <Button variant="outline" size="sm">Download Invoice</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-4">You haven't placed any orders</p>
                      <Button onClick={() => navigate('/')}>Continue Shopping</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="wishlist">
              <Card>
                <CardHeader>
                  <CardTitle>My Wishlist</CardTitle>
                </CardHeader>
                <CardContent>
                  {wishlistLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border rounded-lg p-4">
                          <Skeleton className="w-full h-48 mb-4" />
                          <Skeleton className="h-4 w-3/4 mb-2" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      ))}
                    </div>
                  ) : wishlistItems && wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4">
                          <img
                            src={item.products.images[0] || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'}
                            alt={item.products.name}
                            className="w-full h-48 object-cover rounded-lg mb-4 cursor-pointer"
                            onClick={() => navigate(`/product/${item.products.id}`)}
                          />
                          <h3 className="font-semibold mb-2">{item.products.name}</h3>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              {item.products.discount_price ? (
                                <>
                                  <p className="text-lg font-bold">${item.products.discount_price}</p>
                                  <p className="text-sm text-gray-500 line-through">${item.products.price}</p>
                                </>
                              ) : (
                                <p className="text-lg font-bold">${item.products.price}</p>
                              )}
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              className="flex-1"
                              onClick={() => navigate(`/product/${item.products.id}`)}
                            >
                              View Product
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRemoveFromWishlist(item.products.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-600 mb-4">Save items you love to your wishlist</p>
                      <Button onClick={() => navigate('/')}>Continue Shopping</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card>
                <CardHeader>
                  <CardTitle>Saved Addresses</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">Home</h3>
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Default</span>
                      </div>
                      <p className="text-gray-600">
                        123 Main Street<br />
                        New York, NY 10001<br />
                        United States
                      </p>
                      <div className="flex space-x-2 mt-3">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full">
                      <MapPin className="h-4 w-4 mr-2" />
                      Add New Address
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
