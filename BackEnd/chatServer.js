const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const { auth } = require("./middleware");
const { chatWithOpenAI,StreamWithOpenAI } = require("./openAIHelper");
const {
  vchat,
  vsessions,
  vmessages,
  vstartsession,
  veditsession,
} = require("./validators");
const { ChatSession, ChatMessage } = require("./models/schemas");
//web socket
const WebSocket = require('ws');
const http = require('http');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });


// Initialize WebSocket Server
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received from client: %s', message);
  });

  console.log("Connected to WebSocket server");
  ws.send(JSON.stringify({ message: 'Connected to WebSocket server' }));

});

// Function to broadcast messages to all connected clients
const broadcast = (data) => {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

app.post("/socketchat", auth, async (req, res) => {
  const response = vchat(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { sessionid, userinput } = req.body;
  try {
    //check if messages exists already
    const found = await ChatMessage.findOne({ sessionID: sessionid });
    let user_messages;
    if (found) {
      user_messages = found;
    } else {
      user_messages = new ChatMessage({ sessionID: sessionid, messages: [] });
      await user_messages.save();
    }
    const updatedMessages = user_messages.messages.map((item) => {
      return { role: item.role, content: item.content };
    });
    updatedMessages.push({ role: "user", content: userinput });

    console.log("waiting for response");
    let stream_message="";
    let stream_messages = JSON.parse(JSON.stringify(updatedMessages));
    stream_messages.push({ role: "assistant", content: stream_message });
    const aiResponse = await StreamWithOpenAI(updatedMessages, (chunk) => {
      // Broadcast each chunk to the client in real-time
      console.log("received chunk: ", chunk)
      stream_message+=chunk;
      stream_messages[stream_messages.length-1].content=stream_message
      broadcast({ sessionId: user_messages.sessionID, messages: stream_messages });
    });
    console.log("got full response from chat gpt");

    // After streaming is complete, update the database
    updatedMessages.push({ role: "assistant", content: aiResponse });
    user_messages.messages = updatedMessages;
    await user_messages.save();

    res
      .status(200)
      .json({ sessionId: user_messages.sessionID, messages: updatedMessages });

  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/sessions/:userid", async (req, res) => {
  const response = vsessions(req.params.userid);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const userid = req.params.userid;
  try {
    const found = await ChatSession.findOne({ userID: userid });
    if (found) {
      res.status(200).json({ message: "success", data: found.sessions });
    } else {
      res.status(200).json({ message: "success", data: [] });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/chatmessages/:sessionid", auth, async (req, res) => {
  const response = vmessages(req.params.sessionid);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const sessionid = req.params.sessionid;
  try {
    const found = await ChatMessage.findOne({ sessionID: sessionid });
    if (found) {
      res.status(200).json({ message: "success", data: found.messages });
    } else {
      res.status(200).json({ message: "success", data: [] });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/startsession", auth, async (req, res) => {
  const response = vstartsession(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { userid, sessionTitle, time } = req.body;
  const timeAsDate = new Date(time);

  try {
    const found = await ChatSession.findOne({ userID: userid });
    if (found) {
      let local_sesh = found.sessions;
      local_sesh.push({ sessionTitle, time: timeAsDate });
      found.sessions = local_sesh;
      await found.save();
      res.status(200).json({
        message: "success",
        sessionID: found.sessions[found.sessions.length - 1]._id,
        sessions: found.sessions,
      });
    } else {
      const newSesh = new ChatSession({
        userID: userid,
        sessions: [{ sessionTitle, time: timeAsDate }],
      });
      await newSesh.save();
      res.status(200).json({
        message: "success",
        sessionID: newSesh.sessions[newSesh.sessions.length - 1]._id,
        sessions: newSesh.sessions,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/editchatsession", auth, async (req, res) => {
  const response = veditsession(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { userid, sessionid, edit, del } = req.body;
  try {
    const found = await ChatSession.findOne({ userID: userid });
    let local_sesh = found.sessions;
    const index = local_sesh.findIndex(
      (sesh) => sesh._id.toString() === sessionid
    );
    if (del === "yes") {
      local_sesh.splice(index, 1);
    } else {
      local_sesh[index].sessionTitle = edit;
    }
    found.sessions = local_sesh;
    await found.save();
    res.status(200).json({ message: "Session Updated", data: local_sesh });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

server.listen(5000, () => {
  console.log("HTTP and WebSocket server running on port 5000");
});


// app.post("/chat", auth, async (req, res) => {
//   const response = vchat(req.body);
//   if (!response.success) {
//     return res
//       .status(400)
//       .json({ message: "Inputs are invalid", errors: response.error.issues });
//   }
//   const { sessionid, userinput } = req.body;
//   try {
//     //check if messages exists already
//     const found = await ChatMessage.findOne({ sessionID: sessionid });
//     let user_messages;
//     if (found) {
//       user_messages = found;
//     } else {
//       user_messages = new ChatMessage({ sessionID: sessionid, messages: [] });
//       await user_messages.save();
//     }
//     const updatedMessages = user_messages.messages.map((item) => {
//       return { role: item.role, content: item.content };
//     });
//     updatedMessages.push({ role: "user", content: userinput });

//     //todo get response from OPEN AI
//     // console.log("waiting for response");
//     // const aiResponse = await chatWithOpenAI(updatedMessages);
//     // console.log("got response from chat gpt");

//     const aiResponse = "I will reply once im integrated dear user!";
//     updatedMessages.push({ role: "assistant", content: aiResponse });

//     // Save updated conversation history
//     user_messages.messages = updatedMessages;
//     await user_messages.save();

//     res
//       .status(200)
//       .json({ sessionId: user_messages.sessionID, messages: updatedMessages });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// app.listen("5000", () => {
//   console.log("working");
// });


