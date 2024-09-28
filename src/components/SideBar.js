import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Sidebar = ({ orders, setOrders, onSelectOrder, voidOrder }) => {
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(null);

  const handleSelectOrder = (order) => {
    if (selectedOrderNumber === order.orderNumber) {
      setSelectedOrderNumber(null);
      onSelectOrder(null);
    } else {
      setSelectedOrderNumber(order.orderNumber);
      onSelectOrder(order);
    }
  };

  const handlePaid = (orderNumber) => {
    Swal.fire({
      title: 'Mark Order as Paid?',
      text: `Are you sure you want to mark Order #${orderNumber} as paid?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, mark as paid!',
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders(orders.filter(order => order.orderNumber !== orderNumber));
        if (selectedOrderNumber === orderNumber) {
          onSelectOrder(null); // Unselect the order
        }
        onSelectOrder(null); // Reset selected order to null in MainPOS
        Swal.fire({
          title: 'Marked as Paid!',
          text: `Order #${orderNumber} has been marked as paid.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleVoidOrder = (orderNumber) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `This will void Order #${orderNumber}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, void it!',
    }).then((result) => {
      if (result.isConfirmed) {
        voidOrder(orderNumber);
        if (selectedOrderNumber === orderNumber) {
          onSelectOrder(null); // Unselect the voided order
        }
        onSelectOrder(null); // Reset selected order in MainPOS
        Swal.fire({
          title: 'Voided!',
          text: `Order #${orderNumber} has been voided.`,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };



  return (
    <aside className="bg-gray-800 text-white w-64 h-screen flex flex-col p-4 sidebar">
      <div className="flex items-center mb-6">
        <span className="mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </span>
        <h2 className="text-2xl font-semibold">Order List</h2>
      </div>


      <div className="flex-grow overflow-y-auto custom-scrollbar" style={{ maxHeight: '100vh' }}>
        <ul className="space-y-4">
          {orders.length === 0 ? (
            <li className="text-center">No Orders Yet.</li>
          ) : (
            orders.map((order) => (
              <li
                key={order.orderNumber}
                className={`bg-gray-700 p-3 rounded-lg cursor-pointer ${selectedOrderNumber === order.orderNumber ? 'bg-green-700' : ''}`}
                onClick={() => handleSelectOrder(order)}
              >
                <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                {order.cart.map((item, i) => (
                  <div key={i} className="text-sm text-gray-300">
                    {item.name} x{item.quantity}
                  </div>
                ))}
                <p className="text-gray-400 mt-2">Total Items: {order.cart.reduce((sum, item) => sum + item.quantity, 0)}</p>
                <p className="text-gray-400 mt-2">
                  Total Price: ₱{order.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
                </p>
                <p className="text-gray-400 mt-2">Payment Method: {order.paymentMethod}</p>
                {/* Paid and Void buttons */}
                <div className="flex space-x-2 mt-2 justify-between">
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering select when clicking on button
                      handlePaid(order.orderNumber);
                    }}
                  >
                    Paid
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents triggering select when clicking on button
                      handleVoidOrder(order.orderNumber);
                    }}
                  >
                    Void
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
