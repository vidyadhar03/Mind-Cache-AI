const express = require("express");
const z = require("zod");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3001;

//importing DB models
const { User, Topic, Thought, ChatSession, ChatMessage } = require("./models/schemas");

//input validators
const {
  vsignup,
  vlogin,
  vtopics,
  vaddtopic,
  vupdatetopic,
  vthoughts,
  vaddthought,
  vupdatethought,
  vchat,
  vsessions,
  vmessages,
  vstartsession,
  veditsession,
} = require("./validators");

//auth middleware
const { auth } = require("./middleware");

//hashing logic using bcrypt
const bcrypt = require('bcryptjs');
const saltRounds = 10;

//importing jwt secret
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

//OPEN AI
const { StreamWithOpenAI } = require("./openAIHelper");

//websocket related
const WebSocket = require('ws');
const http = require('http');
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

//USERS CRUD
app.post("/signup", async (req, res) => {
  const response = vsignup(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { name, password, email } = req.body;
  try {
    let found = await User.findOne({ email: email });
    if (found) {
      return res.status(400).json({ message: "user already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, password: hashedpassword, email });
    await newUser.save();
    res.status(200).json({ message: "user signed up succesfully!" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server" });
  }
});

app.post("/login", async (req, res) => {
  const response = vlogin(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { email, password } = req.body;
  try {
    const found = await User.findOne({ email: email });
    if (found) {
      if (await bcrypt.compare(password, found.password)) {
        const token = jwt.sign({ userId: found._id }, secret, {
          expiresIn: "1h",
        });
        res.status(200).json({
          message: "Logged in!",
          token: token,
          userid: found._id.toString(),
        });
      } else {
        res.status(401).json({ message: "wrong credentials!" });
      }
    } else {
      res.status(400).json({ message: "User doesnt exist!" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error!" });
  }
});

//TOPICS CRUD
app.get("/topics/:userid", auth, async (req, res) => {
  const response = vtopics(req.params.userid);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const userid = req.params.userid;
  try {
    const found = await Topic.findOne({ userID: userid });
    if (found) {
      res.status(200).json({ message: "Success", data: found.topics });
    } else {
      res.status(200).json({ message: "No topics found", data: [] });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addtopic", auth, async (req, res) => {
  const response = vaddtopic(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { userid, title, time } = req.body;
  const timeAsDate = new Date(time);
  try {
    const found = await Topic.findOne({ userID: userid });
    if (found) {
      let local_topics = found.topics;
      const topic_found = local_topics.find((topic) => topic.title === title);
      if (topic_found) {
        res.status(400).json({ message: "Topic already exists" });
      } else {
        local_topics.push({ title, time:timeAsDate });
        found.topics = local_topics;
        await found.save();
        res.status(200).json({ message: "Topic added", data: found.topics });
      }
    } else {
      const newTopic = new Topic({ userID: userid, topics: [{ title, time:timeAsDate }] });
      await newTopic.save();
      res.status(200).json({ message: "Topic added", data: newTopic.topics });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/updatetopic", auth, async (req, res) => {
  const response = vupdatetopic(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { userid, title, edit, del } = req.body;
  try {
    const found = await Topic.findOne({ userID: userid });
    let local_topics = found.topics;
    const index = local_topics.findIndex((topic) => topic.title === title);
    console.log("before del: ",local_topics)

    if (del === "yes") {
        local_topics.splice(index, 1);
    } else {
      local_topics[index].title = edit;
    }

    found.topics = local_topics;
    await found.save();
    res.status(200).json({ message: "Topic Updated", data: found.topics });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.get("/thoughts/:topicid", auth, async (req, res) => {
  const response = vthoughts(req.params.topicid);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const topicid = req.params.topicid;
  try {
    const found = await Thought.findOne({ topicID: topicid });
    if (found) {
      res.status(200).json({ message: "success", data: found.thoughts });
    } else {
      res.status(200).json({ message: "No thoughts found", data: [] });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addthought", auth, async (req, res) => {
  const response = vaddthought(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { topicid, thought, time } = req.body;
  const timeAsDate = new Date(time);
  try {
    const found = await Thought.findOne({ topicID: topicid });
    if (found) {
      const local_thoughts = found.thoughts;
      local_thoughts.push({ thought, time:timeAsDate });
      found.thoughts = local_thoughts;
      await found.save();
      res.status(200).json({ message: "Thought added", data: found.thoughts });
    } else {
      const newThought = new Thought({
        topicID: topicid,
        thoughts: [{ thought, time:timeAsDate }],
      });
      await newThought.save();
      res
        .status(200)
        .json({ message: "Thought added", data: newThought.thoughts });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/updatethought", auth, async (req, res) => {
  const response = vupdatethought(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { topicid, thought, edit, del } = req.body;
  try {
    const found = await Thought.findOne({ topicID: topicid });
    console.log(found)
    local_thoughts = found.thoughts;
    const index = local_thoughts.findIndex(
      (thoughtl) => thoughtl.thought === thought
    );
    if (del === "yes") {
      local_thoughts.splice(index, 1);
    } else {
      local_thoughts[index].thought = edit;
    }
    found.thoughts = local_thoughts;
    await found.save();
    res.status(200).json({ message: "Thought Updated", data: found.thoughts });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});


//CHAT Routes
// Initialize WebSocket Server

function initializeWebSocketServer(){
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received from client: %s', message);
    });
  
    console.log("Connected to WebSocket server");
    ws.send(JSON.stringify({ message: 'Connected to WebSocket server' }));
  
  });
}

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
    initializeWebSocketServer()
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
      // console.log("received chunk: ", chunk)
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

server.listen(port, "0.0.0.0", function () {
  console.log(`Server is running on port ${port}`);
});
