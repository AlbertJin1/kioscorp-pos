import React, { useState } from 'react';
import MainPOS from './MainPOS';
import SideBar from './SideBar';
import TopBar from './TopBar'; // Import your TopBar component

const MainComponent = () => {
  // Initialize orders as an empty array
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null); // Start with null for clarity

  const addOrder = (cart) => {
    const newOrder = { orderNumber, cart };
    setOrders([...orders, newOrder]); // Add the new order to the orders array
    setOrderNumber(orderNumber + 1);
    console.log('New Order Added:', newOrder); // Add this line to check if new order is added
  };

  // Function to handle selecting an order
  const onSelectOrder = (order) => {
    if (order) { // Check if the order exists
      setSelectedOrder(order); // Set the whole order object
    } else {
      setSelectedOrder(null); // Set to null if the order is invalid
    }
  };

  const updateOrder = (orderNumber, updatedCart) => {
    setOrders(orders.map(order =>
      order.orderNumber === orderNumber ? { ...order, cart: updatedCart } : order
    ));
  };

  const voidOrder = (orderNumber) => {
    setOrders(orders.filter(order => order.orderNumber !== orderNumber));
  };


  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar orders={orders} setOrders={setOrders} onSelectOrder={onSelectOrder} />
      <div className="flex flex-col flex-grow">
        <TopBar orders={orders} selectedOrder={selectedOrder} />
        <div className="flex-grow overflow-auto">
          <MainPOS addOrder={addOrder} selectedOrder={selectedOrder} updateOrder={updateOrder} voidOrder={voidOrder} />
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
