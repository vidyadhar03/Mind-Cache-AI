const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;

let USERS = [];

let TOPICS = [];

app.get("/", (req, res) => {
  res.send("hello world");
});

//USERS CRUD
app.get("/getusers", (req, res) => {
  res.send(USERS);
});

app.post("/signup", (req, res) => {
  //fetching details from request
  const { name, password } = req.body;

  //checking if user already present
  const found = USERS.find((user) => user.name === name);

  console.log(found);

  if (found) {
    res.status(400).send("user already exists");
  } else {
    USERS.push({ name, password });
    res.status(200).send("user signed up succesfully");
  }
});

app.post("/login", (req, res) => {
  //fetch details
  const { name, password } = req.body;

  //check if user exists
  const found = USERS.find((user) => user.name === name);

  if (found) {
    //check password
    if (found.password === password) {
      //create JWT token and send
      res.status(200).send({ msg: "user logged in succesfully" });
    } else {
      res.status(400).send({ msg: "user credentials wrong" });
    }
  } else {
    res.status(400).send({ msg: "user doesnt exist" });
  }
});

//DATA CRUD
app.get("/gettopics", (req, res) => {
  //send only topic titles
  const topicTitles = TOPICS.map((x) => ({ title: x.title, time: x.time }));
  res.send(topicTitles);
});

app.get("/getthoughts/:topicindex", (req, res) => {
  const topic_index = req.params.topicindex;
  res.status(200).send(TOPICS[topic_index].thoughts);
});

app.post("/addtopic", (req, res) => {
  const { title, thoughts, time, index } = req.body;

  const topic = TOPICS.find((topic) => topic.title === title);

  if (topic) {
    res.status(400).send({ msg: "topic already exists" });
  } else {
    TOPICS.push({ title, thoughts, time, index });
    res.status(200).send({ msg: "topic added" });
  }
});

app.post("/updatetopic", (req, res) => {
  const { title, topic_index, del } = req.body;

  if (del==="yes") {
    let topics_local = TOPICS;
    topics_local.splice(topic_index, 1);
    TOPICS = topics_local;
    res.status(200).send({ msg: "topic deleted" });
  } else {
    TOPICS[topic_index].title = title;
    res.status(200).send({ msg: "topic updated" });
  }
});

app.post("/updatethought/:topicindex", (req, res) => {
  const { thought, thought_index, time, del } = req.body;
  const topic_index = req.params.topicindex;
  let thoughts_local = TOPICS[topic_index].thoughts;
  if (del==="yes") {
    thoughts_local.splice(thought_index, 1);
    TOPICS[topic_index].thoughts = thoughts_local;
    res.status(200).send({ msg: "thought deleted" });
  } else {
    if (thought_index === "-1") {
      TOPICS[topic_index].thoughts.push({ thought, time });
      res.status(200).send({ msg: "thought added" });
    } else {
      TOPICS[topic_index].thoughts[thought_index] = {thought,time};
      res.status(200).send({ msg: "thought edited" });
    }
  }
});

app.listen(port, () => {
  console.log("port is taken");
});
