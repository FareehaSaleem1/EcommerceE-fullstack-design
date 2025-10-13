// frontend/src/context/CartContext.js
import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart items from localStorage on initial load
    const localData = localStorage.getItem('cartItems');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    // Save cart items to localStorage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Check if the product is already in the cart
      const exist = prevItems.find((item) => item._id === product._id);
      if (exist) {
        // If it exists, update the quantity
        return prevItems.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        // If it's a new product, add it to the cart with quantity 1
        return [...prevItems, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item._id !== productId)
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};