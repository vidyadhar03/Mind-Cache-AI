import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Toast } from "../Commons/Toast";
import Loader from "../Commons/Loader";
const base_url = process.env.REACT_APP_API_URL;

export function SubscriptionInitiation() {
  const navigate = useNavigate();

  const plan = "Monthly";
  const [subId, setSubId] = useState("");
  //loader
  const [isLoading, setIsLoading] = useState(false);
  const enableLoader = () => {
    setIsLoading(true);
  };
  const disableLoader = () => {
    setIsLoading(false);
  };
  //dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  console.log(subId);
  useEffect(() => {
    window.scrollTo(0, 0);
    async function getSubscriptionlink() {
      enableLoader();
      try {
        const response = await fetch(`${base_url}subscription`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("usertoken"),
          },
          body: JSON.stringify({
            plan: plan,
          }),
        });
        if (response.status === 403) {
          localStorage.removeItem("userid");
          localStorage.removeItem("usertoken");
          navigate("/");
        }
        if (!response.ok) {
          const data = await response.json();

          console.log(data);

          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setSubId(data.id);
        disableLoader();
        console.log(data);
        // Load Razorpay script and setup checkout
        loadRazorpayScript(() => {
          setupRazorpayCheckout(data.id);
        });
      } catch (e) {
        console.log(e);
        disableLoader();
        setDialogMessage("Payment request failed, please try again!");
        setShowDialog(true);
      }
    }
    getSubscriptionlink();

  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (
        document.querySelector(
          'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
        )
      ) {
        resolve(); // Script already loaded
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });
  };

  const setupRazorpayCheckout = async (subscriptionId) => {
    try {
      await loadRazorpayScript(); // Wait for the Razorpay script to load

      if (!window.Razorpay) {
        console.error("Razorpay SDK is not available");
        return;
      }

      const options = {
        key: process.env.REACT_APP_Payment_test_key_id, // Replace with your actual key ID
        subscription_id: subId,
        name: "Mind Cache AI",
        description: "Monthly Test Plan",
        image: "/mindcachelogo.jpg",
        handler: function (response) {
          // Handle success: you can use response.razorpay_payment_id, response.razorpay_subscription_id
          console.log("response after the payment:", response);
          // Optionally, call your backend to verify the payment signature
        },
        //   prefill: {
        //     name: "Gaurav Kumar",
        //     email: "gaurav.kumar@example.com",
        //     contact: "+919876543210"
        //   },
        //   notes: {
        //     note_key_1: "Tea. Earl Grey. Hot",
        //     note_key_2: "Make it so."
        //   },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error loading Razorpay script:", error);
    }
  };

  return (
    <div className="flex flex-col p-6">
      {isLoading && <Loader />}
      This is the subscription initiation screen.
      <button
        onClick={() => setupRazorpayCheckout(subId)}
        className="w-full md:w-96 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium"
        disabled={!subId}
      >
        Pay with Razorpay
      </button>
      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}
