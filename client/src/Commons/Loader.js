import React from 'react';

const Loader = () => {
  // Inline style for the spinner animation
  const spinnerStyle = {
    animation: 'spin 1s linear infinite',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderTopColor: '#3498db',
  };

  // Define the keyframes and animation within a style tag in the component
  // This approach encapsulates the animation within the component
  const AnimationStyles = () => (
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  );

  return (
    <>
      <AnimationStyles />
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[9998]">
        <div className="border-4 border-t-[#3498db] border-solid rounded-full w-12 h-12" style={spinnerStyle}></div>
      </div>
    </>
  );
};

export default Loader;
