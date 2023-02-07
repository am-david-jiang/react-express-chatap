const { Server } = require("socket.io");
const User = require("../models/User");

let onlineUsers = [];

const addUser = (username, socketId) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username) => {
  return onlineUsers.find((user) => user.username === username);
};

function createSocket(httpServer) {
  const io = new Server(httpServer, {
    withCredentials: true,
    cors: {
      origin: "http://localhost:3000",
    },
  });

  io.on("connection", (socket) => {
    socket.on("addUser", (username) => {
      addUser(username, socket.id);
    });

    socket.on("sendMessage", ({ senderName, receiverName, text }) => {
      const user = getUser(receiverName);
      io.to(user.socketId).emit("getMessage", {
        senderName,
        text,
      });
    });

    socket.on("disconnect", () => {
      removeUser(socket.id);
    });
  });

  return io;
}

module.exports = { createSocket, onlineUsers };
