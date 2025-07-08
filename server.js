// server.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const MAX_LOCATIONS = 3;
let recentLocations = []; // 서버에서 관리하는 최근 위치 배열

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // 클라이언트로부터 초기 위치 요청을 받으면 현재 위치 정보 전송
  socket.on('requestInitialLocations', () => {
    console.log(`User ${socket.id} requested initial locations.`);
    socket.emit('initialLocations', recentLocations);
  });

  // 클라이언트로부터 새 위치 정보 수신
  socket.on('newLocation', (location) => {
    console.log(`Received new location from ${socket.id}:`, location);

    // 새 위치를 배열 맨 앞에 추가
    recentLocations.unshift(location); // location은 {x, y} 객체

    // 배열 크기를 MAX_LOCATIONS로 제한
    if (recentLocations.length > MAX_LOCATIONS) {
      recentLocations.pop(); // 가장 오래된 위치 제거
    }

    // 모든 연결된 클라이언트에게 업데이트된 위치 정보 브로드캐스트
    io.emit('locationUpdate', recentLocations);
    console.log('Broadcasted location update to all clients:', recentLocations);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser.`);
});
