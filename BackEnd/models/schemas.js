const mongoose = require("mongoose");
require("dotenv").config();
const mongouri = process.env.MONGO_URI;
mongoose.connect(mongouri);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
});
const User = mongoose.model("User", userSchema);

// Topic Schema
const topicSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
  topics: [
    {
      title: String,
      time: String,
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
      time: String,
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
      time: String,
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
