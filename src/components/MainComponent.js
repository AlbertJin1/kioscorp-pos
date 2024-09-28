import React, { useState } from 'react';
import MainPOS from './MainPOS';
import SideBar from './SideBar';
import TopBar from './TopBar'; // Import your TopBar component

const MainComponent = () => {
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const addOrder = (cart, paymentMethod) => {
    const newOrder = { orderNumber, cart, paymentMethod };
    setOrders([...orders, newOrder]);
    setOrderNumber(orderNumber + 1);
    console.log('New Order Added:', newOrder);
  };


  const onSelectOrder = (order) => {
    setSelectedOrder(order ? order : null);
  };

  const updateOrder = (orderNumber, updatedCart, updatedPaymentMethod) => {
    setOrders(orders.map(order =>
      order.orderNumber === orderNumber
        ? { ...order, cart: updatedCart, paymentMethod: updatedPaymentMethod } // Update payment method
        : order
    ));
  };


  const voidOrder = (orderNumber) => {
    setOrders(orders.filter(order => order.orderNumber !== orderNumber));
    if (selectedOrder && selectedOrder.orderNumber === orderNumber) {
      setSelectedOrder(null); // Clear selectedOrder if it's the one being voided
    }
  };


  return (
    <div className="flex h-screen overflow-hidden">
      {/* Pass voidOrder to SideBar */}
      <SideBar orders={orders} setOrders={setOrders} onSelectOrder={onSelectOrder} voidOrder={voidOrder} />
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
