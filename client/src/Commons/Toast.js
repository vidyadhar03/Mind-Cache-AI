
import React, { useEffect } from 'react';

export const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 p-2.5 bg-[#2c1558] text-white rounded-lg shadow-lg sm:px-5 z-50 text-center">
      {message}
    </div>
  );
};

