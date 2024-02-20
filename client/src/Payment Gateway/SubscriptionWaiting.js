import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../Commons/NavBar";
import Footer from "../Commons/Footer";
import { Toast } from "../Commons/Toast";
import Loader from "../Commons/Loader";
import { setSubDetails } from "../utils/SubscriptionDetails";
import { CircularProgress } from "@mui/material";
const base_url = process.env.REACT_APP_API_URL;

const SubscriptionConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;

  const [status, setStatus] = useState("Processing");
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

  useEffect(() => {
    window.scrollTo(0, 0);
    async function confirmPayment() {
      enableLoader();
      try {
        const response = await fetch(base_url + "confirmpayment", {
          method: "POST",
          body: JSON.stringify({
            usermail: localStorage.getItem("email"),
            subid: data.subscriptionId,
            payid: data.paymentid,
            signature: data.signature,
            plan: data.plan,
          }),
          headers: {
            authorization: localStorage.getItem("usertoken"),
            "Content-Type": "application/json",
          },
        });
        if (response.status === 403) {
          localStorage.removeItem("userid");
          localStorage.removeItem("usertoken");
          localStorage.removeItem("sessionLoaded");
          localStorage.removeItem("email");
          localStorage.removeItem("subscriptionDetails");
          setDialogMessage("Authentication failed, Kindly Login again!.");
          setShowDialog(true);
          navigate(`/`);
        }
        if (!response.ok) {
          const json = await response.json();
          console.log(json);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        disableLoader();
        const json = await response.json();
        setSubDetails(json.subscriptionDetails);
        setStatus("done");
        // const status = subscription.status;
        // navigate(`/subscription-status`, { state: { status } });
      } catch (e) {
        console.log(e);
        setDialogMessage("Something went wrong, Try again!.");
        setShowDialog(true);
      }
    }
    confirmPayment();
  }, []);

  // async function updateSubDetails(payment, subscription) {
  //   enableLoader();
  //   try {
  //     const response = await fetch(base_url + "updatedetails", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         usermail: localStorage.getItem("email"),
  //         subid: subscription.id,
  //         planid: subscription.plan_id,
  //         payid: payment.id,
  //         currency: payment.currency,
  //         status: payment.status,
  //         orderid: payment.order_id,
  //         invoiceid: payment.invoice_id,
  //         email: payment.email,
  //         contact: payment.contact,
  //         amount:payment.amount.toString(),
  //       }),
  //       headers: {
  //         authorization: localStorage.getItem("usertoken"),
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     if (response.status === 403) {
  //       localStorage.removeItem("userid");
  //       localStorage.removeItem("usertoken");
  //       navigate("/");
  //     }
  //     if (!response.ok) {
  //       const json = await response.json();
  //       console.log(json);
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     disableLoader();
  //     const json = await response.json();
  //     setSubDetails(json.subscriptionDetails);
  //     const status = subscription.status;
  //     navigate(`/subscription-status`, { state: { status } });
  //   } catch (e) {
  //     console.log(e);
  //     setDialogMessage("Something went wrong, Try again!.");
  //     setShowDialog(true);
  //   }
  // }

  // useEffect(() => {
  //   const socket = new WebSocket(process.env.REACT_APP_WS_URL);

  //   socket.onopen = () => {
  //     console.log("WebSocket connection established");
  //   };

  //   socket.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.subscription && data.payment) {
  //       setStatus("confirmed");
  //       if (data.subscription.status === "active") {
  //         updateSubDetails(data.payment, data.subscription);
  //       } else {
  //         const status = data.subscription.status;
  //         navigate(`/subscription-status`, { state: { status } });
  //       }
  //     }
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   // Cleaning up on component unmount
  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  return (
    <div className="bg-bgc font-sans">
      {isLoading && <Loader />}
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
      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
};

export default SubscriptionConfirmation;
