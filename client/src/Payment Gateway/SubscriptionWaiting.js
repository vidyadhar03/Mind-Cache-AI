import React, { useEffect, useState } from "react";
import NavBar from "../Commons/NavBar";
import Footer from "../Commons/Footer";
import { CircularProgress} from "@mui/material";

const SubscriptionConfirmation = () => {

  const [status, setStatus] = useState("Processing");

  function updateSubDetails(payment,subscription){
    console.log(payment);
    console.log(subscription);
  }

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
        setStatus("confirmed");
        updateSubDetails(data.payment,data.subscription);
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
    <div className="bg-bgc font-sans">
      <NavBar />
      <div className="p-6 flex flex-col justify-center items-center ">
        <div>
          <img src="/waiting.png" className="h-40 w-40 rounded-full" alt="" />
        </div>
        <div className="text-center text-2xl font-semibold mt-8">
          Subscription Confirmation
        </div>
        {status === "Processing" ? (
          <div className="flex flex-col justify-center items-center text-center">
            <CircularProgress className="my-4" />
            <div className="mb-60 mt-8">
              Kindly finalize your subscription in the newly opened tab. After
              you complete this step, please allow us up to a minute to process
              and confirm your subscription on this page. We appreciate your
              patience and will notify you the moment everything is set. Thank
              you!
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-2xl text-green-500 font-semibold mt-8">
              Your Subscription is confirmed!
            </div>
            <div className="mt-4 mb-60 text-lg">Finalising the status.</div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SubscriptionConfirmation;
