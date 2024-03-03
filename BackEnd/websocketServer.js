const WebSocket = require("ws");
let wss = null;

// Initializes the WebSocket server
exports.initWebSocketServer = (server) => {
  wss = new WebSocket.Server({ server });
  wss.on("connection", (ws) => {
    // console.log('WebSocket client connected');

    ws.on("message", (message) => {
      // console.log('Received message from client:', message);
      const data = JSON.parse(message);
      if (data.type === 'register') {
        // Store the association of ws to the sessionId
        // console.log("set session id ",data.sessionId);
        ws.sessionId = data.sessionId;
      }
    });
  });
};

// Broadcasts a message to all connected clients
exports.broadcast = (sessionId,data) => {
  if (!wss) {
    // console.error("WebSocket server not initialized");
    return;
  }
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && client.sessionId === sessionId) {
      client.send(JSON.stringify(data));
    }
  });
};
