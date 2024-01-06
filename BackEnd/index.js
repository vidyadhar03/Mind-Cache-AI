const express = require("express");
const app = express();
app.use(express.json());
const port = 3001;

//importing DB models
const { User, Topic } = require("./models/schemas");

//hashing logic using bcrypt
const bcrypt = require("bcrypt");
const saltRounds = 10;

//importing jwt secret
require("dotenv").config();
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

//USERS CRUD
app.post("/signup", async (req, res) => {
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
  const { email, password } = req.body;
  try {
    const found = await User.findOne({ email: email });
    if (found) {
      if (await bcrypt.compare(password, found.password)) {
        const token = jwt.sign({ userId: found._id }, secret, {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "Logged in!", token: token });
      } else {
        res.status(200).json({ message: "wrong credentials!" });
      }
    } else {
      res.status(400).json({ message: "User doesnt exist!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Internal server error!" });
  }
});

//TOPICS CRUD

app.listen(port, () => {
  console.log("port is running!");
});
