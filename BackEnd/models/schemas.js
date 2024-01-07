const mongoose = require("mongoose");
require('dotenv').config();
const mongouri = process.env.MONGO_URI;
mongoose.connect(mongouri);

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String
});
const User = mongoose.model('User', userSchema);

// Topic Schema
const topicSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  topics:[{ 
    title:String,
    time:String
  }]
});
const Topic = mongoose.model('Topic', topicSchema);

// Thought Schema
const thoughtSchema = new mongoose.Schema({
  topicID: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic' },
  thoughts:[{
    thought:String,
    time:String
  }]
});
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = { User, Topic };
