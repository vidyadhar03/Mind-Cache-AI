import React, { useEffect, useState } from "react";
import NavBar from "../Commons/NavBar";
import Footer from "../Commons/Footer";

const SubscriptionConfirmation = () => {
  const [subscriptionDetails, setSubscriptionDetails] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState(null);

  useEffect(() => {
    // Replace 'ws://yourserver.com/updates' with your WebSocket server URL
    const socket = new WebSocket(process.env.REACT_APP_WS_URL);

    socket.onopen = () => {
      console.log("WebSocket connection established");
      // No need to send a message to the server if you're only listening for updates
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Assuming the server sends an object with 'subscription' and 'payment' properties
      if (data.subscription && data.payment) {
        setSubscriptionDetails(data.subscription);
        setPaymentDetails(data.payment);
        // Perform any additional logic upon receiving the data
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Clean up on component unmount
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <NavBar />
      <h2>Subscription Confirmation</h2>
      {subscriptionDetails && (
        <div>
          <h3>Subscription Details</h3>
          <pre>{JSON.stringify(subscriptionDetails, null, 2)}</pre>
        </div>
      )}
      {paymentDetails && (
        <div>
          <h3>Payment Details</h3>
          <pre>{JSON.stringify(paymentDetails, null, 2)}</pre>
        </div>
      )}
      {!subscriptionDetails && <p>Waiting for subscription confirmation...</p>}
      <Footer />
    </div>
  );
};

export default SubscriptionConfirmation;
