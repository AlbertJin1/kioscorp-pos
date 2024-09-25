// src/components/TopBar.js
import React, { useEffect, useState } from 'react';

const TopBar = ({ orders }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format date and time to exclude seconds and include the day
  const formattedDate = currentTime.toLocaleString('en-US', {
    weekday: 'long', // Day of the week
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });

  return (
    <div className="flex justify-between items-center bg-gray-700 text-white p-4">
      <div>Cashier: John Doe</div>
      <div className="flex-grow flex justify-center">
        <span className="text-yellow-400 text-xl font-bold">Current Orders: {orders.length}</span> {/* Centered */}
      </div>
      <div>
        {formattedDate} {/* Keep the date/time as is */}
      </div>
    </div>
  );
};

export default TopBar;
