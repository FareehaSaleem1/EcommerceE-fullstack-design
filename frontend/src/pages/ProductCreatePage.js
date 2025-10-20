
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import { AuthContext } from '../context/AuthContext';

const ProductCreatePage = () => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    image: '',
    category: '',
    stock: 0,
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post('http://localhost:5000/api/products', product, config);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to create product.');
      setLoading(false);
    }
  };

  return (
    <>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <ProductForm
        product={product}
        setProduct={setProduct}
        handleSubmit={handleSubmit}
        loading={loading}
        formTitle="Create New Product"
      />
    </>
  );
};

export default ProductCreatePage;