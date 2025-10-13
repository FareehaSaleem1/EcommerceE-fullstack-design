// frontend/src/components/Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    if (keyword.trim()) {
      navigate(`/products?q=${keyword}`);
      setKeyword(''); // Clear input after search
    } else {
      navigate('/products');
    }
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              BKR Store
            </Link>
          </div>

          <form onSubmit={handleSearchSubmit} className="hidden md:block">
            <div className="relative">
              <input
                type="text"
                name="search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="Search for products..."
                className="bg-gray-100 rounded-full py-2 px-4 w-80 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                All Products
              </Link>
              <Link
                to="/cart"
                className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium"
              >
                Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;