// src/components/TopBar.js
import React, { useEffect, useState } from 'react';

const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-between items-center bg-gray-700 text-white p-4">
      <div>Cashier: John Doe</div>
      <div>{currentTime.toLocaleString()}</div>
    </div>
  );
};

export default TopBar;