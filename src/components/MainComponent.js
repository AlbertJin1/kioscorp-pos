// src/components/MainComponent.js
import React, { useState } from 'react';

const MainComponent = () => {
  const [cart, setCart] = useState([]);

  const products = [
    { id: 1, name: 'Product 1', price: 10.0 },
    { id: 2, name: 'Product 2', price: 15.0 },
    { id: 3, name: 'Product 3', price: 20.0 },
    // Add more products here
  ];

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-semibold mb-6">POS Navigation</h2>
        <ul>
          <li className="mb-4 cursor-pointer hover:text-gray-400">Products</li>
          <li className="mb-4 cursor-pointer hover:text-gray-400">Orders</li>
          <li className="mb-4 cursor-pointer hover:text-gray-400">Reports</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">Point of Sale</h1>

        {/* POS Item List */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Items</h2>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded-lg cursor-pointer hover:shadow-lg"
                onClick={() => addToCart(product)}
              >
                <p>{product.name}</p>
                <p>${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Section */}
        <div className="mt-8 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Cart</h2>
          <div>
            {cart.map((item, index) => (
              <p key={index}>
                {item.name} - ${item.price.toFixed(2)}
              </p>
            ))}
            <p className="font-semibold">Total: ${total.toFixed(2)}</p>
          </div>
        </div>
        <button 
  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
  onClick={() => setCart([])}
>
  Checkout
</button>
      </main>
    </div>
  );
};

export default MainComponent;
