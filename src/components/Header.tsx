
import React, { useState } from 'react';
import { Search, User, ShoppingCart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-black tracking-tight">HEVEN</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-black hover:text-gray-600 transition-colors duration-200">Home</a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors duration-200">Collections</a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors duration-200">Latest</a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors duration-200">About</a>
            <a href="#" className="text-black hover:text-gray-600 transition-colors duration-200">Contact</a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-black hover:text-gray-600">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-black hover:text-gray-600">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-black hover:text-gray-600 relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-black"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-black hover:text-gray-600 transition-colors duration-200">Home</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors duration-200">Collections</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors duration-200">Latest</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors duration-200">About</a>
              <a href="#" className="text-black hover:text-gray-600 transition-colors duration-200">Contact</a>
              <div className="flex items-center space-x-4 pt-4 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="text-black">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-black">
                  <User className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-black relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
