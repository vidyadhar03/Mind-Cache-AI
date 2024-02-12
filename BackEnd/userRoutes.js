const express = require("express");
const router = express.Router();

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
const bcrypt = require("bcryptjs");
const saltRounds = 10;

//importing jwt secret
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

//USERS CRUD
router.post("/signup", async (req, res) => {
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
    const date = Date.now()
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({ name, password: hashedpassword, email, joinDate:date });
    await newUser.save();
    const foundUser = await User.findOne({ email: email });
    const token = jwt.sign({ userId: foundUser._id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "user signed up succesfully!",
      token: token,
      userid: foundUser._id.toString(),
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "internal server" });
  }
});

router.post("/login", async (req, res) => {
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
router.get("/topics/:userid", auth, async (req, res) => {
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

router.post("/addtopic", auth, async (req, res) => {
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
        local_topics.push({ title, time: timeAsDate });
        found.topics = local_topics;
        await found.save();
        res.status(200).json({ message: "Topic added", data: found.topics });
      }
    } else {
      const newTopic = new Topic({
        userID: userid,
        topics: [{ title, time: timeAsDate }],
      });
      await newTopic.save();
      res.status(200).json({ message: "Topic added", data: newTopic.topics });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/updatetopic", auth, async (req, res) => {
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
    console.log("before del: ", local_topics);

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

//THOUGHTS CRUD
router.get("/thoughts/:topicid", auth, async (req, res) => {
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

router.post("/addthought", auth, async (req, res) => {
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
      local_thoughts.push({ thought, time: timeAsDate });
      found.thoughts = local_thoughts;
      await found.save();
      res.status(200).json({ message: "Thought added", data: found.thoughts });
    } else {
      const newThought = new Thought({
        topicID: topicid,
        thoughts: [{ thought, time: timeAsDate }],
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

router.post("/updatethought", auth, async (req, res) => {
  const response = vupdatethought(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { topicid, thought, edit, del } = req.body;
  try {
    const found = await Thought.findOne({ topicID: topicid });
    console.log(found);
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

module.exports = router;
