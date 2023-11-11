const express = require("express");
const cors = require("cors"); // Require the CORS package
const app = express();
const port = 3001;

app.get("/", (req, res) => {
  //return the users submission for this problem
  res.send("Tracker Backend");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
