import { useState,useEffect } from "react";
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
  console.log(plan);
  // const [url, setUrl] = useState();
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

  async function getSubscriptionlink() {
    enableLoader();
    setDialogMessage("Ensure you revisit this tab for your subscription info.");
    setShowDialog(true);
    try {
      const response = await fetch(base_url + "subscription", {
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
      disableLoader();
      navigate(`/subscription-confirmation`)
      window.open(data.short_url, "_blank");
    } catch (e) {
      console.log(e);
      disableLoader();
      setDialogMessage("Payment request failed, please try again!");
      setShowDialog(true);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-bgc font-sans">
      {isLoading && <Loader />}
      <NavBar />
      <div className="p-6 flex flex-col justify-center items-center ">
        <div>
          <img src="/payment.png" className="h-40 w-40 rounded-full" alt=""/>
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
                  <img src="/check.png" className="h-4 w-auto mr-4" alt=""/>
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
          onClick={getSubscriptionlink}
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
