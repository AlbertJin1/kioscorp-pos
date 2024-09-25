import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';

const Sidebar = ({ orders, setOrders }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handlePaid = (orderNumber) => {
    setOrders(orders.filter(order => order.orderNumber !== orderNumber));
  };

  return (
    <aside className={`bg-gray-800 text-white transition-all duration-300 ${isOpen ? 'w-64' : 'w-14'} h-full flex flex-col p-2`}>
      <div className="flex items-center mb-6">
        <button onClick={toggleSidebar} className="text-white text-2xl focus:outline-none p-2">
          <FaBars />
        </button>
        {isOpen && <h2 className="text-2xl font-semibold">Order List</h2>}
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar">
        {isOpen ? (
          <ul className="space-y-4">
            {orders.length === 0 ? (
              <li className="text-center">No Orders Yet.</li>
            ) : (
              orders.map((order) => (
                <li key={order.orderNumber} className="bg-gray-700 p-3 rounded-lg">
                  <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                  {order.cart.map((item, i) => (
                    <div key={i} className="text-sm text-gray-300">
                      {item.name} x{item.quantity}
                    </div>
                  ))}
                  <p className="text-gray-400 mt-2">Total Items: {order.cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                  <button
                    className="bg-green-500 text-white px-2 py-1 mt-2 rounded"
                    onClick={() => handlePaid(order.orderNumber)}
                  >
                    Paid
                  </button>
                </li>
              ))
            )}
          </ul>
        ) : (
          <ul className="flex flex-col items-center mt-4 space-y-2">
            <li className="text-center text-2xl font-semibold">OL</li> {/* Display "OL" here */}
            {orders.map((order) => (
              <li key={order.orderNumber} className="text-center text-2xl">
                {order.orderNumber}
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
