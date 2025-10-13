// frontend/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        // Get the first 6 products from the response
        setFeaturedProducts(data.slice(0, 6));
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Latest Trending Electronic Items
          </h1>
          <p className="mt-4 text-lg md:text-xl text-blue-100">
            Find the best deals on the latest tech.
          </p>
          <div className="mt-8">
            <Link 
              to="/products"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-100 transition duration-300"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Featured Products
          </h2>
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;