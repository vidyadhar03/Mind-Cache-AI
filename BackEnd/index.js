const express = require("express");
const z = require("zod");
const app = express();
app.use(express.json());
const port = 3001;

//importing DB models
const { User, Topic, Thought } = require("./models/schemas");

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
} = require("./validators");

//auth middleware
const { auth } = require("./middleware");

//hashing logic using bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

//importing jwt secret
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

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
    res.status(500).json({ message: "Internal server error!" });
  }
});

//TOPICS CRUD
app.get("/topics/:userid",auth,async (req, res) => {
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
      res.status(400).json({ message: "No topics found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addtopic",auth,async (req, res) => {
  const response = vaddtopic(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { userid, title, time } = req.body;
  try {
    const found = await Topic.findOne({ userID: userid });
    if (found) {
      let local_topics = found.topics;
      const topic_found = local_topics.find((topic) => topic.title === title);
      if (topic_found) {
        res.status(400).json({ message: "Topic already exists" });
      } else {
        local_topics.push({ title, time });
        found.topics = local_topics;
        await found.save();
        res.status(200).json({ message: "Topic added" });
      }
    } else {
      const newTopic = new Topic({ userID: userid, topics: [{ title, time }] });
      await newTopic.save();
      res.status(200).json({ message: "Topic added" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/updatetopic",auth, async (req, res) => {
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
    if (del === "yes") {
      local_topics.splice(index, 1);
    } else {
      local_topics[index].title = edit;
    }
    found.topics = local_topics;
    await found.save();
    res.status(200).json({ message: "Topic Updated" });
  } catch (e) {
    res.status(500).json({ message: "Internal Server error" });
  }
});

app.get("/thoughts/:topicid",auth, async (req, res) => {
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
      res.status(400).json({ message: "No thoughts found" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addthought",auth, async (req, res) => {
  const response = vaddthought(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { topicid, thought, time } = req.body;
  try {
    const found = await Thought.findOne({ topicID: topicid });
    if (found) {
      const local_thoughts = found.thoughts;
      local_thoughts.push({ thought, time });
      found.thoughts = local_thoughts;
      await found.save();
      res.status(200).json({ message: "Thought added" });
    } else {
      const newThought = new Thought({
        topicID: topicid,
        thoughts: [{ thought, time }],
      });
      await newThought.save();
      res.status(200).json({ message: "Thought added" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/updatethought",auth, async (req, res) => {
  const response = vupdatethought(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { topicid, thought, edit, del } = req.body;
  try {
    const found = await Thought.findOne({ topicID: topicid });
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
    res.status(200).json({ message: "Thought Updated" });
  } catch (e) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("port is running!");
});
