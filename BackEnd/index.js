// const express = require("express");
// // const mongoose = require('mongoose');
// const bodyParser = require("body-parser");
// const cors = require("cors");
// // const { chatWithOpenAI } = require('./openAIHelper'); // We will create this next
// // const ChatSession = require('./models/chatSession'); // MongoDB model

// const app = express();
// app.use(bodyParser.json());
// app.use(cors());

// // Connect to MongoDB
// // mongoose.connect('mongodb://localhost:27017/chatDB', { useNewUrlParser: true, useUnifiedTopology: true });

// app.post("/api/chat", async (req, res) => {
//   const { sessionId, userInput } = req.body;
//   // let chatSession;

//   // if (sessionId) {
//   //     // Retrieve existing session
//   //     chatSession = await ChatSession.findById(sessionId);
//   // } else {
//   //     // Create new session
//   //     chatSession = new ChatSession({ messages: [] });
//   //     await chatSession.save();
//   // }

//   // // Update conversation history and call OpenAI
//   // const updatedMessages = [...chatSession.messages, { role: 'user', content: userInput }];
//   // const aiResponse = await chatWithOpenAI(updatedMessages);
//   // updatedMessages.push({ role: 'assistant', content: aiResponse });

//   // // Save updated conversation history
//   // chatSession.messages = updatedMessages;
//   // await chatSession.save();

//   // res.send({ sessionId: chatSession._id, messages: updatedMessages });

//   // const updatedMessages = [...chatSession.messages, { role: 'user', content: userInput }];

//   const updatedMessages = [
//     { role: "AI", content: "here is your answer for the question" },
//     { role: "user", content: userInput },
//   ];

//   res.send({ sessionId: sessionId, messages: updatedMessages });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://vidyadhariitkgp:m5GqJPngbahXTZpB@cluster0.24ovbgg.mongodb.net/tracker");

const User = mongoose.model('users',{name:String,email:String,password:String});

const firstUser = new User({name:'first user',email:'firstuser@gmail.com',password:'password123'});

firstUser.save().then(()=>console.log('updated'));