const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");

let ROOM = {};

const defaultRoomConfig = {
  maxTimerSeconds: 10,
  pointingSystem: "Fibonacci series",
  allowedPointingSystem: ["Fibonacci series", "T-shirt sizing"],
};

app.use(express.static(path.join(__dirname, "/../app/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../app/build/index.html"));
});

io.on("connection", (socket) => {
  const userName = socket.handshake.query.user;
  const roomName = socket.handshake.query.room;

  socket.join(roomName);

  console.log(`User ${userName} connected in room ${roomName}`);

  roomName in ROOM || (ROOM[roomName] = {});
  "roomConfig" in ROOM[roomName] ||
    (ROOM[roomName]["roomConfig"] = defaultRoomConfig);
  "timer" in ROOM[roomName] || (ROOM[roomName]["timer"] = 0);
  "leaderboard" in ROOM[roomName] || (ROOM[roomName]["leaderboard"] = []);
  "users" in ROOM[roomName] || (ROOM[roomName]["users"] = []);

  ROOM[roomName]["users"].push(userName);

  io.to(roomName).emit("users", ROOM[roomName]["users"]);
  io.to(roomName).emit("roomConfig", ROOM[roomName]["roomConfig"]);
  io.to(roomName).emit("leaderboard", ROOM[roomName]["leaderboard"]);

  socket.on("roomConfigChange", (data) => {
    ROOM[roomName]["roomConfig"] = data;
    io.to(roomName).emit("roomConfig", ROOM[roomName]["roomConfig"]);
  });

  socket.on("timer", (data) => {
    ROOM[roomName]["timer"] = data;
    io.to(roomName).emit("timer", ROOM[roomName]["timer"]);
  });

  socket.on("startSession", (data) => {
    let timer = ROOM[roomName]["roomConfig"]["maxTimerSeconds"];

    io.to(roomName).emit("timer", timer);
    const interval = setInterval(() => {
      timer--;
      io.to(roomName).emit("timer", timer);
      if (timer == 0) {
        clearInterval(interval);
      }
    }, 1000);
    setTimeout(() => {
      io.to(roomName).emit("endSession");
      ROOM[roomName]["leaderboard"] = [];
    }, ROOM[roomName]["roomConfig"]["maxTimerSeconds"] * 1000);
  });

  socket.on("vote", (data) => {
    ROOM[roomName]["leaderboard"].push(data);
    io.to(roomName).emit("leaderboard", ROOM[roomName]["leaderboard"]);
  });

  socket.on("disconnect", () => {
    let i = ROOM[roomName]["users"].indexOf(userName);
    ROOM[roomName]["users"].splice(i, 1);
    io.to(roomName).emit("users", ROOM[roomName]["users"]);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
