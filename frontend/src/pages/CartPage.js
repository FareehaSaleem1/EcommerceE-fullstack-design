
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext); // <-- Get new functions

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-12">
        Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600">Your cart is empty.</p>
          <Link to="/products" className="mt-4 inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="flex justify-end mb-4">
            <button 
              onClick={() => clearCart()} 
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            >
              Clear Cart
            </button>
          </div>
          <div className="flex flex-col lg:flex-row gap-12">
            
            <div className="lg:w-2/3">
              <div className="bg-white shadow-lg rounded-lg">
                <ul>
                  {cartItems.map((item, index) => (
                    <li key={item._id} className={`flex items-center p-6 ${index < cartItems.length - 1 ? 'border-b' : ''}`}>
                      <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                      <div className="ml-6 flex-grow">
                        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                        <p className="text-gray-600">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        
                        <input
                          type="number"
                          min="1"
                          value={item.qty}
                          onChange={(e) => updateQuantity(item._id, e.target.value)}
                          className="w-16 p-1 text-center border rounded"
                        />
                        <span className="font-bold text-lg">${(item.price * item.qty).toFixed(2)}</span>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            
            <div className="lg:w-1/3">
              <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Order Summary</h2>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-xl border-t pt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full mt-6 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition duration-300">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;