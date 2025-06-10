
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay in Style</h2>
          <p className="text-lg text-gray-300 mb-8">
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive offers, and style inspiration.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white text-black border-0 flex-1"
              required
            />
            <Button 
              type="submit"
              className="bg-white text-black hover:bg-gray-100 transition-colors duration-200 px-8"
            >
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm text-gray-400 mt-4">
            No spam, just style. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
