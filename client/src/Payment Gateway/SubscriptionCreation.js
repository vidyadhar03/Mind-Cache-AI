import { useEffect } from "react";
import NavBar from "../Commons/NavBar";
import { useNavigate } from "react-router-dom";
const base_url = process.env.REACT_APP_API_URL;

export function CreateSubscription({ plan }) {
  const navigate = useNavigate();

  useEffect(() => {
    async function getSubscriptionlink() {
      try {
        const response = await fetch(base_url + "subscription", {
          method: "POST",
          headers: {
            authorization: localStorage.getItem("usertoken"),
          },
          body: JSON.stringify({
            plan: "monthly",
          }),
        });
        if (response.status === 403) {
          localStorage.removeItem("userid");
          localStorage.removeItem("usertoken");
          navigate("/");
        }
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
  
        console.log(data);
  
        window.location.href = data.shortUrl;
      } catch (e) {
        console.log(e);
      }
    }
    getSubscriptionlink();
  }, []);


  async function create() {
    const YOUR_KEY_SECRET = process.env.REACT_APP_Payment_test_key_secret;
    const YOUR_KEY_ID = process.env.REACT_APP_Payment_test_key_id;
    const plan_id =
      plan === "monthly" ? "plan_NaRZy52S0ovofg" : "plan_NaRctqXWIuyaD4";
    const total_count = 60;

    try {
      const response = await fetch(
        "https://api.razorpay.com/v1/subscriptions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa(
              `${YOUR_KEY_ID}:${YOUR_KEY_SECRET}`
            )}`,
          },
          body: JSON.stringify({
            plan_id: plan_id,
            total_count: total_count,
            customer_notify: 1,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      console.log(data);

      window.location.href = data.shortUrl;
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <NavBar />
      Payment gateway
    </div>
  );
}
