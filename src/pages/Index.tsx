
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturedCollections from '../components/FeaturedCollections';
import LatestArrivals from '../components/LatestArrivals';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedCollections />
      <LatestArrivals />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
