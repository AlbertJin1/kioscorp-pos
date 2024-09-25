// src/components/Sidebar.js
import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Sidebar = ({ orders }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside className={`bg-gray-800 text-white p-4 transition-transform duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      {/* Hamburger Button */}
      <button 
        onClick={toggleSidebar} 
        className="text-white text-lg mb-4 focus:outline-none"
      >
        <FaBars />
      </button>

      {isOpen && (
        <>
          <h2 className="text-xl font-semibold mb-6">Order List</h2>
          <ul className="space-y-4">
            {orders.length === 0 ? (
              <li>No Orders Yet.</li>
            ) : (
              orders.map((order, index) => (
                <li key={index} className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                  {order.cart.map((item, i) => (
                    <div key={i} className="text-sm text-gray-300">
                      {item.name} x{item.quantity}
                    </div>
                  ))}
                  <p className="text-gray-400 mt-2">Total Items: {order.cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                </li>
              ))
            )}
          </ul>
        </>
      )}
    </aside>
  );
};

export default Sidebar;
