import React, { useState } from 'react';
import MainPOS from './MainPOS';
import SideBar from './SideBar';
import TopBar from './TopBar'; // Import your TopBar component

const MainComponent = () => {
  // Initialize orders as an empty array
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);

  // Function to handle adding a new order
  const addOrder = (cart) => {
    setOrders([...orders, { orderNumber, cart }]);
    setOrderNumber(orderNumber + 1);
  };

  return (
    <div className="flex h-screen">
      <SideBar orders={orders} setOrders={setOrders} />
      <div className="flex flex-col flex-grow">
        <TopBar orders={orders} /> {/* Pass orders to TopBar here */}
        <MainPOS addOrder={addOrder} />
      </div>
    </div>
  );
};

export default MainComponent;
