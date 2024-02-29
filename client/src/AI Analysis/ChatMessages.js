import React, { useState, useEffect } from "react";

// MessageSection.js
export const MessageSection = ({ messages, messagesEndRef }) => {
  return (
    <div
      id="messages"
      className="overflow-y-auto px-4 md:px-16 hide-scrollbar max-h-[calc(100vh-102px)] pb-8"
    >
      {messages.map((msg, index) => (
        <div key={index} className="">
          <div className="text-black font-bold mt-2 md:text-lg">
            {msg.role === "user" ? (
              <div className="flex items-center mt-4 mb-2">
                <img src="/userprofile.png" className="h-6 w-6 mr-2 " alt="" />
                You
              </div>
            ) : (
              <div className="flex items-center mt-4 mb-2">
                <img
                  src="/mindcachelogo.png"
                  className="h-7 w-7 mr-2 rounded-full"
                  alt=""
                />
                Mind Cache AI
              </div>
            )}
          </div>
          <div className="whitespace-pre-wrap text-sm md:text-base ml-2">
            {msg.content}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

// MessageInput.js
export const MessageInput = ({
  onSendMessage,
  selectedSession,
  userInput,
  setUserInput,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault(); // This prevents the default form submission behavior
    onSendMessage(false, selectedSession);
  };

  // Define an array of placeholder texts
  const placeholders = [
    "Message Mind Cache AI...",
    "Ask for hidden patterns...",
    "Seek out for more insights...",
    "Inquire about methods to advance...",
  ];

  // State to track the current placeholder index
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState(0);

  // Set up an interval to cycle through placeholders
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentPlaceholderIndex(
        (currentPlaceholderIndex) =>
          (currentPlaceholderIndex + 1) % placeholders.length // Cycle through the placeholders
      );
    }, 2000); // Change placeholder every 2 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      id="form"
      className="fixed bottom-0 h-10 min-h-16 flex items-cente w-full md:w-3/4 "
    >
      <form
        onSubmit={handleSubmit}
        className="w-full h-full py-1 flex justify-center"
      >
        <div className="mx-4 md:ml-16 md:mr-24 flex w-full border border-black rounded-lg overflow-hidden">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder={placeholders[currentPlaceholderIndex]}
            className="p-2 flex-grow w-5/6 outline-none"
          />
          <button
            type="submit"
            className=" w-1/6  px-4 rounded-r-lg flex justify-center items-center bg-white cursor-pointer"
          >
            <img src="/sendicon.png" className="h-4 md:h-6 w-auto" alt="" />
          </button>
        </div>
      </form>
    </div>
  );
};
