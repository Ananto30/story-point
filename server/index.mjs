import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
export const server = http.createServer(app);
const io = new Server(server);

const ROOM = {};

const defaultRoomConfig = {
  maxTimerSeconds: 10,
  pointingSystem: 'Fibonacci series',
  allowedPointingSystem: ['Fibonacci series', 'T-shirt sizing'],
};

app.use(express.static(path.join(__dirname, '/../app/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../app/build/index.html'));
});

io.on('connection', (socket) => {
  const userName = socket.handshake.query.user;
  const roomName = socket.handshake.query.room;

  if (!userName || !roomName) {
    socket.disconnect();
    return;
  }

  socket.join(roomName);
  console.log(`User ${userName} connected in room ${roomName}`);

  if (!ROOM[roomName]) {
    ROOM[roomName] = {
      roomConfig: { ...defaultRoomConfig },
      timer: 0,
      leaderboard: [],
      users: [],
    };
  }

  ROOM[roomName].users.push(userName);

  io.to(roomName).emit('users', ROOM[roomName].users);
  io.to(roomName).emit('roomConfig', ROOM[roomName].roomConfig);
  io.to(roomName).emit('leaderboard', ROOM[roomName].leaderboard);

  socket.on('roomConfigChange', (data, callback) => {
    ROOM[roomName].roomConfig = data;
    io.to(roomName).emit('roomConfig', ROOM[roomName].roomConfig);
    if (callback) callback(ROOM[roomName].roomConfig); // Call the callback with the new config
  });

  socket.on('timer', (data) => {
    ROOM[roomName].timer = data;
    io.to(roomName).emit('timer', ROOM[roomName].timer);
  });

  socket.on('startSession', () => {
    let timer = ROOM[roomName].roomConfig.maxTimerSeconds;
    ROOM[roomName].leaderboard = [];

    io.to(roomName).emit('timer', timer);
    const interval = setInterval(() => {
      timer--;
      io.to(roomName).emit('timer', timer);
      if (timer === 0) {
        clearInterval(interval);
        io.to(roomName).emit('endSession');
      }
    }, 1000);
  });

  socket.on('vote', (data, callback) => {
    ROOM[roomName].leaderboard.push(data);
    io.to(roomName).emit('leaderboard', ROOM[roomName].leaderboard);
    if (callback) callback(ROOM[roomName].leaderboard); // Call the callback with the new leaderboard
  });

  socket.on('disconnect', () => {
    const userIndex = ROOM[roomName].users.indexOf(userName);
    if (userIndex !== -1) {
      ROOM[roomName].users.splice(userIndex, 1);
      io.to(roomName).emit('users', ROOM[roomName].users);
    }
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
