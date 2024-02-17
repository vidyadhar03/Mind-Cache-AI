const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.json());

//input validators
const { vsubscription } = require("./validators");

//auth middleware
const { auth } = require("./middleware");

//webhook secret
const webhookSecret = process.env.webhook_secret;

router.post("/subscription", async (req, res) => {
  // console.log(req.body);
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
      plan === "Monthly" ? "plan_NaRZy52S0ovofg" : "plan_NaRctqXWIuyaD4";
    const total_count = (plan === "Monthly") ? 60 : 5 ;

    const response = await fetch("https://api.razorpay.com/v1/subscriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${btoa(`${YOUR_KEY_ID}:${YOUR_KEY_SECRET}`)}`,
      },
      body: JSON.stringify({
        plan_id: plan_id,
        total_count: total_count,
        customer_notify: 1
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    // console.log(data);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/webhook", (req, res) => {
  const sig = req.headers["x-razorpay-signature"];
  const body = req.body;
  console.log(req.body);

  switch (body.event) {
    case "subscription.activated":
      const expectedSig = crypto
        .createHmac("sha256", webhookSecret)
        .update(JSON.stringify(body))
        .digest("hex");

      if (sig === expectedSig) {
        console.log("Valid signature. Processing event...");
        // Process the event here (e.g., update subscription status)
        console.log("subscription object", body.payload.subscription.entity);
        console.log("payment object:", body.payload.payment.entity);
        return res.status(200).send("Webhook processed successfully");
      } else {
        console.log("Invalid signature. Ignoring.");
        return res.status(403).send("Invalid signature");
      }
      break;
    // Handle other events
    case "subscription.cancelled":
      // Handle subscription activation
      break;
  }

  res.status(200).send("okay");
});

router.post('/path-for-callback', (req, res) => {

  console.log("callback is fired",req.body);
  // Process payment parameters like razorpay_payment_id, razorpay_order_id, and razorpay_signature
  // You might save these details in your database and/or initiate further actions based on payment success

  // Redirect the user or send a response that your frontend can use to inform the user or update the UI
  res.redirect('https://your-frontend-domain.com/payment-success'); // Redirect to a success page
  // OR
  // res.json({ success: true, message: 'Payment successful' }); // Send a success response
});


module.exports = router;
