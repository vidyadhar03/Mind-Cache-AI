const express = require("express");
const router = express.Router();

//input validators
const { vsubscription } = require("./validators");

//auth middleware
const { auth } = require("./middleware");

router.post("/subscription", async (req, res) => {
  const response = vsubscription(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }

  const { plan } = req.body;
  try {
    const YOUR_KEY_SECRET = process.env.Payment_test_key_secret;
    const YOUR_KEY_ID = process.env.Payment_test_key_id;
    const plan_id =
      plan === "monthly" ? "plan_NaRZy52S0ovofg" : "plan_NaRctqXWIuyaD4";
    const total_count = 60;

    const response = await fetch("https://api.razorpay.com/v1/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${YOUR_KEY_ID}:${YOUR_KEY_SECRET}`)}`,
      },
      body: JSON.stringify({
        plan_id: plan_id,
        total_count: total_count,
        customer_notify: 1,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
