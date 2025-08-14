import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

const onlineUsers = {}; //{userId : socketId}

export function getUserSocketId(userId) {
  return onlineUsers[userId];
}

io.on("connection", (socket) => {
  console.log("connected ", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) onlineUsers[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(onlineUsers)); // ['userId1', 'userId2', 'userId3',...]

  socket.on("disconnect", () => {
    console.log("user disconnected ", socket.id);
    delete onlineUsers[userId];
    io.emit("getOnlineUsers", Object.keys(onlineUsers));
  });
});

export { app, server, io };
