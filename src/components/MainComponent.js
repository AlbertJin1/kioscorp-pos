// src/components/MainComponent.js
import React, { useState } from 'react';
import Sidebar from './SideBar';
import Topbar from './TopBar';

const MainComponent = () => {
  const dummyProducts = [
    { id: 1, name: 'Bolts', type: 'Type A', size: 'Medium', price: 500, image: 'https://via.placeholder.com/100' },
    { id: 2, name: 'Screw', type: 'Type B', size: 'Large', price: 750, image: 'https://via.placeholder.com/100' },
    { id: 3, name: 'Nuts', type: 'Type C', size: 'Small', price: 1000, image: 'https://via.placeholder.com/100' },
  ];

  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const handleVoid = () => {
    setCart([]); // Clear current cart
  };

  const handleNewOrder = () => {
    if (cart.length === 0) {
      alert("Cart is empty! Add products before creating a new order.");
      return;
    }

    setOrders([...orders, { orderNumber, cart }]);
    setOrderNumber(orderNumber + 1);
    setCart([]); // Clear the cart for the new order
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Topbar */}
      <Topbar />

      <div className="flex flex-grow">
        {/* Sidebar */}
        <Sidebar orders={orders} />

        {/* Main Content */}
        <main className="flex-grow flex flex-col p-4 bg-gray-100">
          {/* Order Number */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-xl font-semibold">Order Number: #{orderNumber}</h2>
          </div>

          {/* Product List and Payment Summary */}
          <div className="flex flex-col lg:flex-row lg:space-x-4 flex-grow">
            {/* Product List */}
            <div className="flex-grow bg-white p-4 rounded-lg shadow-lg mb-4 lg:mb-0">
              <h2 className="text-xl font-semibold mb-4">Products</h2>
              <div className="flex flex-col space-y-4">
                {dummyProducts.map((product) => (
                  <div key={product.id} className="border p-4 rounded-lg flex items-center">
                    <img src={product.image} alt={product.name} className="w-16 h-16 mr-4" />
                    <div className="flex-grow">
                      <p className="font-semibold">{product.name}</p>
                      <p>{product.type} - {product.size}</p>
                      <p>₱{product.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="number" 
                        defaultValue={1} 
                        min={1} 
                        className="w-16 border rounded mr-2 p-1 text-center" 
                        id={`quantity-${product.id}`}
                      />
                      <button 
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => addToCart(product, parseInt(document.getElementById(`quantity-${product.id}`).value))}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Summary */}
            <div className="bg-white p-4 rounded-lg shadow-lg lg:w-1/4 flex flex-col">
              <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
              <div className="flex-grow">
                {cart.length === 0 ? (
                  <p className="text-gray-500">No items in cart.</p>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="mb-2">
                      <p>{item.name} - ₱{item.price.toFixed(2)}</p>
                      <p>Unit Price: ₱{item.price.toFixed(2)} x {item.quantity}</p>
                      <p className="font-semibold">Total: ₱{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))
                )}
                <div className="mt-4">
                  <label className="block mb-2">Payment Method:</label>
                  <select
                    value={paymentMethod}
                    onChange={handlePaymentMethodChange}
                    className="w-full border rounded p-2"
                  >
                    <option value="">Select Payment Method</option>
                    <option value="cash">Cash</option>
                    <option value="credit">Credit Card</option>
                    <option value="gcash">Gcash</option>
                  </select>
                </div>
              </div>
              <div className="flex mt-4">
                <button 
                  className="flex-grow bg-red-500 text-white py-2 rounded-l"
                  onClick={handleVoid}
                >
                  Void
                </button>
                <button 
                  className="flex-grow bg-green-500 text-white py-2 rounded-r"
                  onClick={handleNewOrder}
                >
                  Add Order
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainComponent;
