
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const [keyword, setKeyword] = useState('');
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/products?q=${keyword}`);
      setKeyword('');
    } else {
      navigate('/products');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
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
            <div className="ml-10 flex items-center space-x-4">
              
              <Link to="/products" className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                All Products
              </Link>
              <Link to="/cart" className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                Cart
              </Link>
              {userInfo && userInfo.isAdmin && (
                <Link to="/admin/dashboard" className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </Link>
              )}
              {userInfo ? (
                <div className="flex items-center">
                  <span className="text-gray-700 font-medium">{userInfo.name}</span>
                  <button onClick={handleLogout} className="ml-4 text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                    Logout
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-gray-700 hover:bg-gray-200 hover:text-black px-3 py-2 rounded-md text-sm font-medium">
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;