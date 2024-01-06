const mongoose = require("mongoose");
require('dotenv').config();
const mongouri = process.env.MONGO_URI;
mongoose.connect(mongouri);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  password: String, // Remember to hash passwords before saving
  email: String // You can add validation rules as needed
});
const User = mongoose.model('User', userSchema);

// Topic Schema
const topicSchema = new mongoose.Schema({
  title: String,
  thoughts: [{ thought: String, time: String }],
  time: String
});
const Topic = mongoose.model('Topic', topicSchema);

module.exports = { User, Topic };
