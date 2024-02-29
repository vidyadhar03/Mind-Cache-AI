
import React, { useEffect } from 'react';

export const Toast = ({ message, show, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 p-2.5 bg-[#314E8A] text-white rounded-lg shadow-lg sm:px-5 z-[9999] text-center">
      {message}
    </div>
  );
};

