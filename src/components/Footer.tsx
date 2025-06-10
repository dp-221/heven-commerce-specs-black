
import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-black mb-4">HEVEN</h3>
            <p className="text-gray-600 mb-4">
              Elevating your style with premium fashion pieces designed for the modern individual.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-black transition-colors duration-200">
                <span className="sr-only">Facebook</span>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </a>
              <a href="#" className="text-gray-400 hover:text-black transition-colors duration-200">
                <span className="sr-only">Instagram</span>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-black mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-200">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-200">Collections</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-200">Latest Arrivals</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-200">About Us</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-black mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-200">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-200">Size Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-200">Shipping Info</a></li>
              <li><a href="#" className="text-gray-600 hover:text-black transition-colors duration-200">Returns</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-black mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">hello@heven.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span className="text-gray-600">New York, NY</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-gray-600">
            © 2024 Heven. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
