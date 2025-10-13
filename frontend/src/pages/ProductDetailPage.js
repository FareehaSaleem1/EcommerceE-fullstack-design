// frontend/src/pages/ProductDetailPage.js
import React, { useState, useEffect, useContext } from 'react'; // Import useContext
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext'; // Import CartContext

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useContext(CartContext); // Get the addToCart function

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError('Product not found!');
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} has been added to the cart!`); // Optional: show a confirmation
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;

  if (error) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold text-gray-700">{error}</h1>
        <Link to="/products" className="text-blue-600 hover:underline mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {product && (
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="rounded-lg bg-white shadow-lg overflow-hidden">
              <img className="w-full h-auto object-cover" src={product.image} alt={product.name} />
            </div>
          </div>
          <div className="md:flex-1 px-4 mt-8 md:mt-0">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-4">Category: {product.category}</p>
            <div className="flex mb-4">
              <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Product Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
            <div>
              <button
                onClick={handleAddToCart} // Add onClick handler
                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;