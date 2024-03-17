const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const app = express();
app.use(express.json());
app.use(cors());
const userRoutes = require("./userRoutes");
const subscriptionRoutes = require("./paymentRoutes");
const chatRoutes = require("./chatRoutes");
const port = process.env.PORT || 3001;

// Defining a rate limit rule
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limiting each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Applying the rate limit to all requests
app.use(apiLimiter);

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
