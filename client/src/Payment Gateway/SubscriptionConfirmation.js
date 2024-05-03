import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from "../Commons/NavBar";
import Footer from "../Commons/Footer";
import { Toast } from "../Commons/Toast";
import { setSubDetails,getUserDetails } from "../utils/SubscriptionDetails";
import { CircularProgress } from "@mui/material";
const base_url = process.env.REACT_APP_API_URL;

const SubscriptionConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state?.data;
  const userDetails = getUserDetails();

  //dialog
  const [showDialog, setShowDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    async function confirmPayment() {
      // enableLoader();
      try {
        const response = await fetch(base_url + "confirmpayment", {
          method: "POST",
          body: JSON.stringify({
            usermail: userDetails.email,
            subid: data.subscriptionId,
            payid: data.paymentid,
            signature: data.signature,
            plan: data.plan,
          }),
          headers: {
            authorization: userDetails.usertoken,
            "Content-Type": "application/json",
          },
        });
        if (response.status === 403) {
          localStorage.removeItem("sessionLoaded");
          localStorage.removeItem("UserDetails");
          localStorage.removeItem("subscriptionDetails");
          setDialogMessage("Authentication failed, Kindly Login again!.");
          setShowDialog(true);
          navigate(`/`);
        }
        if (!response.ok) {
          const json = await response.json();
          setDialogMessage(json.message);
          setShowDialog(true);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // disableLoader();
        const json = await response.json();
        setSubDetails(json.subscriptionDetails);
        const status = "active";
        navigate(`/subscription-status`, { state: { status } });
      } catch (e) {
        // console.log(e);
        setDialogMessage("Something went wrong, Try again!.");
        setShowDialog(true);
      }
    }
    confirmPayment();
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
        <div className="flex flex-col justify-center items-center text-center">
          <CircularProgress className="my-4" />
          <div className="mb-60 mt-8 ">
            Your payment is being processed. Give us a short moment.
          </div>
        </div>
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
