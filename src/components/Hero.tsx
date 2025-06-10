
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Elevate Your
              <span className="block">Style</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Discover our curated collection of premium fashion pieces designed for the modern individual.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100 transition-colors duration-200 px-8 py-3"
              >
                Shop Collections
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black transition-colors duration-200 px-8 py-3"
              >
                Latest Arrivals
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
        <div className="w-full h-full bg-gradient-to-l from-white to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
