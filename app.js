const express = require('express');
const connectDB = require('./config/db');
const qitems = require('./routes/api/qitems');
const cors = require('cors');
const path = require('path');
const app = express();

// Connect to MongoDB backend
connectDB();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

// Include routes & front-end
app.use(express.static(__dirname + '/client/public'));
app.use('/api/qitems', qitems);

// Serve front-end code
app.get('/', (req, res) => {
  res.sendFile('client/public/index.html', { root: __dirname });
});

// Attach socket to server (port share)
var server = require('http').Server(app);
var io = require('socket.io')(server);

// Start server
const port = process.env.PORT || 8082;
server.listen(port, () => console.log(`Server running on port ${port}`));

// Configure socket
io.on('connection', function (socket) {
  socket.emit('connect', { hello: 'world' });

  socket.on("incoming data", (data) => {
     socket.broadcast.emit("outgoing data", {info: data});
  });
});