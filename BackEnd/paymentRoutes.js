const express = require("express");
const crypto = require("crypto");
const bodyParser = require("body-parser");
const router = express.Router();
// const { broadcast } = require("./websocketServer");
router.use(bodyParser.json());

//input validators
const {
  vsubscription,
  vupdateDetails,
  vcancelsub,
  vconfirmpay,
} = require("./validators");

//auth middleware
const { auth } = require("./middleware");

// //importing DB models
const { User, Subscription } = require("./models/schemas");

//webhook secret
const webhookSecret = process.env.webhook_secret;

router.post("/webhook", async (req, res) => {
  const sig = req.headers["x-razorpay-signature"];
  const body = req.body;
  console.log(req.body);

  switch (body.event) {
    case "subscription.charged":
      const expectedSig = crypto
        .createHmac("sha256", webhookSecret)
        .update(JSON.stringify(body))
        .digest("hex");

      if (sig === expectedSig) {
        console.log("Valid signature. Processing event...");
        console.log("subscription object", body.payload.subscription.entity);
        console.log("payment object:", body.payload.payment.entity);

        const subscription = body.payload.subscription.entity;
        const payment = body.payload.payment.entity;
        try {
          const sub = await Subscription.findOne({
            subscription_id: subscription.id,
          });

          if (sub) {
            sub.privateSubDetails.plan_id = subscription.plan_id;
            sub.privateSubDetails.SubscribedDate = Date.now();
            sub.privateSubDetails.amount = payment.amount.toString();

            sub.paymentDetails.currency = payment.currency;
            sub.paymentDetails.status = payment.status;
            sub.paymentDetails.order_id = payment.order_id;
            sub.paymentDetails.invoice_id = payment.invoice_id;
            sub.paymentDetails.email = payment.email;
            sub.paymentDetails.contact = payment.contact;
            await sub.save();
          }

          const user = await User.findOne({ subscription_id: subscription.id });
          if (user) {
            user.subscriptionDetails.isSubscribed = true;
            user.subscriptionDetails.plan =
              subscription.plan_id === process.env.monthly_planid
                ? "Monthly"
                : "Annual";
            user.subscriptionDetails.billingCycleStartDate = Date.now();
            user.aiInteractionCount = 0;
            await user.save();
          }
        } catch (e) {
          console.log(e);
        }

        return res.status(200).send("Webhook processed successfully");
      } else {
        console.log("Invalid signature. Ignoring.");
        return res.status(403).send("Invalid signature");
      }
      break;
    // Handle other events
    case "subscription.cancelled":
      const expectedSigc = crypto
        .createHmac("sha256", webhookSecret)
        .update(JSON.stringify(body))
        .digest("hex");
      if (sig === expectedSigc) {
        console.log("Valid signature. Processing event...");
        // Process the event here (e.g., update subscription status)
        console.log("subscription object", body.payload.subscription.entity);

        const subscription = body.payload.subscription.entity;

        try {
          const user = await User.findOne({ subscription_id: subscription.id });
          if (user) {
            user.subscriptionDetails.isSubscribed = false;
            user.subscriptionDetails.plan = "";
            user.subscriptionDetails.billingCycleStartDate = Date.now();
            user.aiInteractionCount = 0;
            await user.save();
          }
        } catch (e) {
          console.log(e);
        }

        return res.status(200).send("Webhook processed successfully");
      } else {
        console.log("Invalid signature. Ignoring.");
        return res.status(403).send("Invalid signature");
      }
      break;
  }

  res.status(200).send("okay");
});

router.post("/subscription", auth, async (req, res) => {
  const response = vsubscription(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }

  const { plan, usermail } = req.body;
  try {
    const YOUR_KEY_SECRET = process.env.Payment_test_key_secret;
    const YOUR_KEY_ID = process.env.Payment_test_key_id;
    const plan_id =
      plan === "Monthly"
        ? process.env.monthly_planid
        : process.env.annual_planid;
    const total_count = plan === "Monthly" ? 60 : 5;

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
      const data = await response.json();
      console.log(data);
      res.status(500).json({ message: "Network response was not ok." });
      // throw new Error("Network response was not ok.");
    }

    const data = await response.json();

    const user = await User.findOne({ email: usermail });
    user.subscription_id = data.id;
    await user.save();
    // console.log(data);
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/cancelsubscription", auth, async (req, res) => {
  const response = vcancelsub(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }

  const { usermail } = req.body;
  try {
    const YOUR_KEY_SECRET = process.env.Payment_test_key_secret;
    const YOUR_KEY_ID = process.env.Payment_test_key_id;
    const user = await User.findOne({ email: usermail });
    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    const subid = user.subscription_id;
    const response = await fetch(
      `https://api.razorpay.com/v1/subscriptions/${subid}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`${YOUR_KEY_ID}:${YOUR_KEY_SECRET}`)}`,
        },
        body: JSON.stringify({
          cancel_at_cycle_end: 0,
        }),
      }
    );

    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      throw new Error("Network response was not ok.");
    }

    const data = await response.json();
    const short_url = data.short_url;

    user.subscriptionDetails.isSubscribed = false;
    user.subscriptionDetails.plan = "";
    user.subscriptionDetails.aiInteractionCount = 0;
    user.subscriptionDetails.billingCycleStartDate = Date.now();

    await user.save();

    res.status(200).json({
      subscriptionDetails: user.subscriptionDetails,
      short_url: short_url,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/confirmpayment", auth, async (req, res) => {
  const response = vconfirmpay(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }

  const { usermail, subid, payid, signature, plan } = req.body;
  try {
    const YOUR_KEY_SECRET = process.env.Payment_test_key_secret;
    const user = await User.findOne({ email: usermail });
    if (!user) {
      return res.status(400).json({ message: "User does not exist!" });
    }

    // Constructing the expected signature using subscription_id and payment_id
    const payload = `${payid}|${subid}`;
    const generated_signature = crypto
      .createHmac("sha256", YOUR_KEY_SECRET)
      .update(payload)
      .digest("hex");

    if (generated_signature === signature) {
      try {
        user.subscription_id = subid;
        user.subscriptionDetails.isSubscribed = true;
        user.subscriptionDetails.plan = plan;
        user.subscriptionDetails.aiInteractionCount = 0;
        user.subscriptionDetails.billingCycleStartDate = Date.now();

        await user.save();

        const subscription = new Subscription({
          subscription_id: subid,
          payment_id: payid,
        });

        await subscription.save();

        res.status(200).json({
          subscriptionDetails: user.subscriptionDetails,
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      res
        .status(400)
        .json({ success: false, message: "Invalid payment signature" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.post("/updatedetails", auth, async (req, res) => {
//   const response = vupdateDetails(req.body);
//   if (!response.success) {
//     return res
//       .status(400)
//       .json({ message: "Inputs are invalid", errors: response.error.issues });
//   }
//   const {
//     usermail,
//     subid,
//     planid,
//     payid,
//     currency,
//     status,
//     orderid,
//     invoiceid,
//     email,
//     contact,
//     amount,
//   } = req.body;

//   try {
//     const user = await User.findOne({ email: usermail });
//     if (user) {
//       user.subscriptionDetails.isSubscribed = true;
//       user.subscriptionDetails.plan = amount === 12900 ? "Monthly" : "Annual";
//       user.subscriptionDetails.aiInteractionCount = 0;
//       user.privateSubDetails.subscription_id = subid;
//       user.privateSubDetails.plan_id = planid;
//       user.privateSubDetails.SubscribedDate = Date.now();
//       user.privateSubDetails.amount = amount;
//       user.subscriptionDetails.billingCycleStartDate = Date.now();
//       user.paymentDetails.payment_id = payid;
//       user.paymentDetails.currency = currency;
//       user.paymentDetails.status = status;
//       user.paymentDetails.order_id = orderid;
//       user.paymentDetails.invoice_id = invoiceid;
//       user.paymentDetails.email = email;
//       user.paymentDetails.contact = contact;

//       await user.save();

//       res.status(200).json({ subscriptionDetails: user.subscriptionDetails });
//     } else {
//       res.status(400).json({ message: "User does not exist!" });
//     }
//   } catch (e) {
//     res.status(500).json({ message: "Internal server error!" });
//   }
// });

module.exports = router;
