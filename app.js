const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const qitems = require('./routes/api/qitems');
const app = express();

connectDB();
app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));
app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/qitems', qitems);

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + “../client/build/index.html”));
});

const port = process.env.PORT || 8082;
// app.listen(port, () => console.log(`Server running on port ${port}`));

// Socket
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(port, () => console.log(`Server running on port ${port}`));

io.on('connection', function (socket) {
  socket.emit('connect', { hello: 'world' });

  socket.on("incoming data", (data) => {
     socket.broadcast.emit("outgoing data", {info: data});
  });
});