
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LatestArrivals = () => {
  const products = [
    {
      id: 1,
      name: "Premium Cotton Tee",
      price: "$49",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Designer Jacket",
      price: "$199",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Minimalist Watch",
      price: "$299",
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 4,
      name: "Classic Sneakers",
      price: "$129",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

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
          {products.map((product) => (
            <Card key={product.id} className="group cursor-pointer border-0 shadow-md hover:shadow-lg transition-all duration-300 bg-white">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-black mb-2">{product.name}</h3>
                  <p className="text-lg font-bold text-black mb-3">{product.price}</p>
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-800 transition-colors duration-200"
                    size="sm"
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
