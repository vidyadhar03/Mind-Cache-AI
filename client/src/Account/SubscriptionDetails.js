import { useNavigate } from "react-router-dom";
import { getSubDetails, setSubDetails } from "../utils/SubscriptionDetails";
import { useState } from "react";
import Loader from "../Commons/Loader";
import { Toast } from "../Commons/Toast";
const base_url = process.env.REACT_APP_API_URL;

export const SubscriptionDetails = () => {
  const navigate = useNavigate();
  const subDetails = getSubDetails();
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

  async function cancelSub() {
    enableLoader();
    try {
      const response = await fetch(base_url + "cancelsubscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("usertoken"),
        },
        body: JSON.stringify({
          usermail: localStorage.getItem("email"),
        }),
      });
      if (response.status === 403) {
        localStorage.removeItem("userid");
        localStorage.removeItem("usertoken");
        localStorage.removeItem("sessionLoaded");
        localStorage.removeItem("email");
        localStorage.removeItem("subscriptionDetails");
        setDialogMessage("Authentication failed, Kindly Login again!");
        setShowDialog(true);
        navigate(`/`);
      }
      if (!response.ok) {
        const data = await response.json();

        console.log(data);

        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      disableLoader();
      setSubDetails(data.subscriptionDetails);
      window.open(data.short_url, "_blank");
    } catch (e) {
      console.log(e);
      disableLoader();
      setDialogMessage("cancellation request failed, please try again!");
      setShowDialog(true);
    }
  }

  const Subscribed = () => {
    return (
      <div>
        <div>
          <div className="text-lg mt-8 text-center md:text-left">
            {" "}
            You are Subscribed to the {subDetails.plan} Plan with below
            Features:
          </div>
          <div className="mt-4 text-center md:text-left">
            {subDetails.plan === "Monthly" ? (
              <ul className=" pl-6 mt-4  text-center md:text-left">
                <li className="mt-2 flex items-center">
                  <img src="/check.png" className="h-3 w-auto mr-2" alt="" />
                  150 AI Interactions per month.
                </li>
                <li className="mt-2 flex items-center">
                  <img src="/check.png" className="h-3 w-auto mr-2" alt="" />
                  Unlimited Focus area creation.
                </li>
                <li className="mt-2 flex items-center">
                  <img src="/check.png" className="h-3 w-auto mr-2" alt="" />
                  Unlimited Reflections creation.
                </li>
              </ul>
            ) : (
              <ul className=" pl-6 mt-4  text-center md:text-left">
                <li className="mt-2 flex items-center">
                  <img src="/check.png" className="h-3 w-auto mr-2" alt="" />
                  200 AI Interactions per month.
                </li>
                <li className="mt-2 flex items-center">
                  <img src="/check.png" className="h-3 w-auto mr-2" alt="" />
                  Unlimited Focus area creation.
                </li>
                <li className="mt-2 flex items-center">
                  <img src="/check.png" className="h-3 w-auto mr-2" alt="" />
                  Unlimited Reflections creation.
                </li>
              </ul>
            )}
          </div>
          <div className="mt-4">
            <span className="font-medium">Last Billing Date:</span>{" "}
            {subDetails.billingCycleStartDate.substring(0, 10)}
          </div>
          <div className="mt-1">
            <span className="font-medium">AI Interactions Used:</span>{" "}
            {subDetails.aiInteractionCount}
          </div>

          <button
            className="w-full md:w-96 py-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium"
            onClick={() => {
              cancelSub();
            }}
          >
            Cancel Subscription
          </button>
        </div>
      </div>
    );
  };

  const UnSubscribed = () => {
    return (
      <div>
        <div className="w-full mt-4 flex justify-center md:justify-start">
          <img src="/dosubscribe.png" className="h-40 w-40 rounded-full" />
        </div>
        <div className="text-lg mt-4 text-center md:text-left">
          You are on Free Plan
        </div>
        <div className="w-full mt-4 text-sm text-center md:text-left">
          Elevate your journaling with our GPT-powered AI, offering up to 200
          insightful interactions monthly. This AI enhancement enriches your
          self-reflection journey, providing deeper insights for a more profound
          introspective experience. Subscribe now to unlock the full potential
          of your personal growth journey.
        </div>
        <div
          className="text-center w-full md:w-3/4 px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium  shadow-lg text-base mt-8 cursor-pointer"
          onClick={() => {
            navigate(`/pricing`);
          }}
        >
          Subscribe
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-8">
      {isLoading && <Loader />}
      <div className="text-xl">Your Subscription Details</div>
      {subDetails.isSubscribed ? <Subscribed /> : <UnSubscribed />}
      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );

};
