
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  
  const productId = product._id; 

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
      
      <Link to={`/product/${productId}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-48 object-cover" 
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
          <p className="mt-2 text-xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;