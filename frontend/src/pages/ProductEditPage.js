
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import { AuthContext } from '../context/AuthContext';

const ProductEditPage = () => {
  const { id } = useParams();
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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        setError('Could not fetch product details.');
      }
    };
    fetchProduct();
  }, [id]);

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
      await axios.put(`http://localhost:5000/api/products/${id}`, product, config);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to update product.');
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
        formTitle="Edit Product"
      />
    </>
  );
};

export default ProductEditPage;