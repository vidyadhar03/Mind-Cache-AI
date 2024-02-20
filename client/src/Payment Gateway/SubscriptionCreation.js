import { useState, useEffect } from "react";
import NavBar from "../Commons/NavBar";
import { useNavigate, useLocation } from "react-router-dom";
import { Toast } from "../Commons/Toast";
import Loader from "../Commons/Loader";
import Footer from "../Commons/Footer";
const base_url = process.env.REACT_APP_API_URL;

export function CreateSubscription() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;
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

  const monthly_plan_points = [
    "150 AI Interactions per month.",
    "Unlimited Focus area creation.",
    "Unlimited Reflections creation.",
  ];

  const annual_plan_points = [
    "200 AI Interactions per month.",
    "Unlimited Focus area creation.",
    "Unlimited Reflections creation.",
  ];

  const plan_points =
    plan === "Monthly" ? monthly_plan_points : annual_plan_points;

  function PricingLayout() {
    return (
      <div>
        {plan === "Monthly" ? (
          <div className="flex justify-center my-6">
            <div className="text-4xl font-medium">Rs.129</div>
            <div className="flex flex-col justify-end text-md ml-1">
              per month
            </div>
          </div>
        ) : (
          <div className="flex justify-center my-6">
            <div className="text-4xl font-medium">Rs.999</div>
            <div className="flex flex-col justify-end text-md ml-1">
              per year
            </div>
          </div>
        )}
      </div>
    );
  }

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
        // Loading Razorpay script and setup checkout
        loadRazorpayScript(() => {
          setupRazorpayCheckout(data.id);
        });
        disableLoader();
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
          const data = {
            paymentid: response.razorpay_payment_id,
            subscriptionId: response.razorpay_subscription_id,
            signature: response.razorpay_signature,
            plan:plan
          };
          navigate(`/subscription-confirmation`, { state: { data } });
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal was closed");
          },
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response);
        alert("Payment Failed: " + response.error.description);
      });
      rzp.open();
    } catch (error) {
      console.error("Error loading Razorpay script:", error);
    }
  };

  return (
    <div className="bg-bgc font-sans">
      {isLoading && <Loader />}
      <NavBar />
      <div className="p-6 flex flex-col justify-center items-center ">
        <div>
          <img src="/payment.png" className="h-40 w-40 rounded-full" alt="" />
        </div>
        <div className="text-center text-2xl md:text-4xl font-semibold mt-8">
          {plan === "Monthly" ? "Monthly" : "Annual"} Plan Subscription
        </div>
        <PricingLayout />
        <div className=" text-center text-xl">
          Key benefits of the selected plan:
        </div>
        <div className=" mb-4 px-4 py-2 ">
          {plan_points.map((point, index) => (
            <ul key={index}>
              <li>
                <div className="flex items-center mt-2">
                  <img src="/check.png" className="h-4 w-auto mr-4" alt="" />
                  <div>{point}</div>
                </div>
              </li>
            </ul>
          ))}
        </div>
        <div className="text-base my-4">
          <span className="text-red-600 font-semibold text-lg">Note: </span>By
          pressing 'Proceed for Payment', you'll be directed to another tab to
          complete your payment. Ensure you revisit this tab for your
          subscription info.
        </div>
        <button
          className="w-full md:w-96 py-2 bg-blue-600 hover:bg-blue-700 text-white text-lg rounded-lg font-medium"
          onClick={() => setupRazorpayCheckout(subId)}
          disabled={!subId}
        >
          Proceed to payment.
        </button>
      </div>
      <div className="mt-40">
        <Footer />
      </div>
      <Toast
        message={dialogMessage}
        show={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </div>
  );
}
