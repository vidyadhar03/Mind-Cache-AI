const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const userRoutes = require("./userRoutes");
const subscriptionRoutes = require("./paymentRoutes");
const chatRoutes = require("./chatRoutes");
const port = process.env.PORT || 3001;

//websocket related
const http = require("http");
const server = http.createServer(app);
const { initWebSocketServer } = require("./websocketServer");

// Initialize WebSocket server
initWebSocketServer(server);

//test
app.get("/", (req, res) => {
  res.send("Welcome to Mind Cachce AI");
});

//USER Routes
app.use("/", userRoutes);

//Subscription Routes
app.use("/", subscriptionRoutes);

//chat Routes
app.use("/", chatRoutes);

server.listen(port, "0.0.0.0", function () {
  // console.log(`Server is running on port ${port}`);
});
