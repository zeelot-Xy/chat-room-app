const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve your frontend files
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("User", socket.id, "connected:");

  // Listen for chat messages
  socket.on("chatMessage", (data) => {
    // data = { name, message }
    io.emit("chatMessage", data); // send message to everyone
  });

  socket.on("disconnect", () => {
    console.log("User", socket.id, "disconnected:");
  });
});
//Listen for running server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is now running at http://localhost:${PORT}`);
});
