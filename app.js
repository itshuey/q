const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');
const qitems = require('./routes/api/qitems');
const app = express();

connectDB();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));
// app.use(express.static('/client/build'));
app.use('/api/qitems', qitems);

// Serve front-end
// app.get('/', (req, res) => res.send('Hello world!'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

const port = process.env.PORT || 8082;
// app.listen(port, () => console.log(`Server running on port ${port}`));

// Attach socket to server
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(port, () => console.log(`Server running on port ${port}`));

io.on('connection', function (socket) {
  socket.emit('connect', { hello: 'world' });

  socket.on("incoming data", (data) => {
     socket.broadcast.emit("outgoing data", {info: data});
  });
});