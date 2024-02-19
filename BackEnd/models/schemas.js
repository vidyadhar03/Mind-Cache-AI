const mongoose = require("mongoose");
require("dotenv").config();
const mongouri = process.env.MONGO_URI;
mongoose.connect(mongouri);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  joinDate:Date,
  subscriptionDetails:{
    isSubscribed:{ type: Boolean, default: false },
    plan:{ type: String, default: "" },
    billingCycleStartDate:{ type: Date, default: Date.now },
    aiInteractionCount:{ type: Number, default: 0 },
  },
  privateSubDetails:{
    subscription_id:{ type: String, default: "" },
    plan_id:{ type: String, default: "" },
    SubscribedDate:{ type: Date, default: Date.now },
    amount:{ type: Number, default: 0 },
  },
  paymentDetails:{
    payment_id:{ type: String, default: "" },
    currency:{ type: String, default: "" },
    status:{ type: String, default: "" },
    order_id:{ type: String, default: "" },
    invoice_id:{ type: String, default: "" },
    email:{ type: String, default: "" },
    contact:{ type: String, default: "" },
  }
});
const User = mongoose.model("User", userSchema);

// Topic Schema
const topicSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  topics: [
    {
      title: String,
      time: Date,
    },
  ],
});
const Topic = mongoose.model("Topic", topicSchema);

// Thought Schema
const thoughtSchema = new mongoose.Schema({
  topicID: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", index: true },
  thoughts: [
    {
      thought: String,
      time: Date,
    },
  ],
});
const Thought = mongoose.model("Thought", thoughtSchema);

//chat session schema
const ChatSessionSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  sessions: [
    {
      sessionTitle: String,
      time: Date,
    },
  ],
});
const ChatSession = mongoose.model("Chat Session", ChatSessionSchema);

//chat message schema
const chatMessageSchema = new mongoose.Schema({
  sessionID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatSession",
    index: true,
  },
  messages: [
    {
      role: String,
      content: String,
    },
  ],
});
const ChatMessage = mongoose.model("Chat Message", chatMessageSchema);

module.exports = { User, Topic, Thought, ChatSession, ChatMessage };
