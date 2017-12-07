const express   = require('express');
const path      = require('path');
const http      = require('http');
const socketIo  = require('socket.io');
const app       = express();
const port      = process.env.PORT || 4000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server    = http.createServer(app);
const io        = socketIo(server);

io.on('connection', (socket) => {
  console.log('New User connected');

  socket.on('disconnect', () => {
    console.log('User Disconnect');
  })
});

server.listen(port, () => {
  console.log(`Node Server running on port ${port}`);
});
