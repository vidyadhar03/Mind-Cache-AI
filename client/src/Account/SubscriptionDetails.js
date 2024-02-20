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
          usermail: localStorage.getItem("email")
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

  console.log(subDetails);

  return (
    <div className="p-8 flex flex-col items-center justify-center bg-bgc font-sans">
      {isLoading && <Loader />}
      <div>Subscription Details</div>

      {subDetails.isSubscribed ? (
        <button
          className="w-full md:w-96 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium"
          onClick={() => {
            cancelSub();
          }}
        >
          Cancel Subscription
        </button>
      ) : (
        <button
          className="w-full md:w-96 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium"
          onClick={() => {
            const plan = "Monthly";
            navigate(`/subscription`, { state: { plan } });
          }}
        >
          Subscribe
        </button>
      )}
      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
};
