const express = require("express");
const router = express.Router();

//importing DB models
const { User, Topic, Thought } = require("./models/schemas");

//input validators
const {
  vsignup,
  vlogin,
  vupdateuser,
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
    return res.status(400).json({
      message:
        "Please use a valid email and ensure your password is at least 6 characters long",
      errors: response.error.issues,
    });
  }
  const { name, password, email } = req.body;
  try {
    let found = await User.findOne({ email: email });
    if (found) {
      return res
        .status(400)
        .json({ message: "This email is already registered. Please sign in" });
    }
    const date = Date.now();
    const hashedpassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      name,
      password: hashedpassword,
      email,
      joinDate: date,
    });
    await newUser.save();
    const foundUser = await User.findOne({ email: email });
    const token = jwt.sign({ userId: foundUser._id }, secret, {
      expiresIn: "1h",
    });
    res.status(200).json({
      message: "User signed up succesfully!",
      token: token,
      userid: foundUser._id.toString(),
      name: foundUser.name,
      subscriptionDetails: foundUser.subscriptionDetails,
    });
  } catch (e) {
    // console.log(e);
    res
      .status(500)
      .json({ message: "Error on our side. Please retry shortly." });
  }
});

router.post("/login", async (req, res) => {
  const response = vlogin(req.body);
  if (!response.success) {
    return res.status(400).json({
      message:
        "Please use a valid email and ensure your password is at least 6 characters long",
      errors: response.error.issues,
    });
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
          name: found.name,
          subscriptionDetails: found.subscriptionDetails,
        });
      } else {
        res
          .status(401)
          .json({ message: "Incorrect password. Please try again." });
      }
    } else {
      res.status(400).json({
        message:
          "We couldn't find an account with that email. Please try again or create a new account.",
      });
    }
  } catch (e) {
    // console.log(e);
    res
      .status(500)
      .json({ message: "Error on our side. Please retry shortly." });
  }
});

router.post("/updateuser", auth, async (req, res) => {
  const response = vupdateuser(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { usermail, name } = req.body;
  try {
    const found = await User.findOne({ email: usermail });
    if (!found) {
      return res.status(400).json({ message: "User does not exist!" });
    }
    found.name = name;
    await found.save();
    res.status(200).json({ message: "Username updated!" });
  } catch (e) {
    // console.log(e);
    res
      .status(500)
      .json({ message: "Error on our side. Please retry shortly." });
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
    // console.log(e);
    res
      .status(500)
      .json({ message: "Error on our side. Please retry shortly." });
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
        res.status(400).json({
          message:
            "The Focus Area specified already exists. Try adding a new one.",
        });
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
    // console.log(e);
    res
      .status(500)
      .json({ message: "Error on our side. Please retry shortly." });
  }
});

router.post("/updatetopic", auth, async (req, res) => {
  const response = vupdatetopic(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { userid, topicid, title, edit, del, pin } = req.body;
  try {
    const found = await Topic.findOne({ userID: userid });
    // console.log(found)
    let local_topics = found.topics;
    // console.log(local_topics)
    // console.log(topicid)
    const index = local_topics.findIndex((topic) => topic._id.toString() === topicid);
    // console.log("topic found at index", index)
    // console.log("before del: ", local_topics);

    if (del === "yes") {
      local_topics.splice(index, 1);
      //deleting thoughts corresponded to the topic
      await Thought.deleteOne({ topicID: topicid });
    } else {
      if (pin === "yes" || pin === "no") {
        const b = pin === "yes" ? true : false;
        local_topics[index].pinned = b;
      } else {
        local_topics[index].title = edit;
      }
    }

    found.topics = local_topics;
    await found.save();
    res.status(200).json({ message: "Topic Updated", data: found.topics });
  } catch (e) {
    // console.log(e);
    res
      .status(500)
      .json({ message: "Error on our side. Please retry shortly." });
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
    // console.log(e);
    res
      .status(500)
      .json({ message: "Error on our side. Please retry shortly." });
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
    // console.log(e);
    res
      .status(500)
      .json({ message: "Error on our side. Please retry shortly." });
  }
});

router.post("/updatethought", auth, async (req, res) => {
  const response = vupdatethought(req.body);
  if (!response.success) {
    return res
      .status(400)
      .json({ message: "Inputs are invalid", errors: response.error.issues });
  }
  const { topicid,thoughtid,thought, edit, del, collapse } = req.body;
  try {
    const found = await Thought.findOne({ topicID: topicid });
    // console.log(found);
    local_thoughts = found.thoughts;
    const index = local_thoughts.findIndex(
      (thoughtl) => thoughtl._id.toString() === thoughtid
    );
    // console.log("thought exists at",index)
    if (del === "yes") {
      local_thoughts.splice(index, 1);
    } else {
      if (collapse === "yes" || collapse === "no") {
        const b = collapse === "yes" ? true : false;
        local_thoughts[index].collapse = b;
      } else {
        local_thoughts[index].thought = edit;
      }
    }
    found.thoughts = local_thoughts;
    await found.save();
    res.status(200).json({ message: "Thought Updated", data: found.thoughts });
  } catch (e) {
    // console.log(e);
    res
      .status(500)
      .json({ message: "Error on our side. Please retry shortly." });
  }
});

module.exports = router;
