// socket
const express = require('express')
const app = express() 
const port = process.env.PORT || 3001
const http = require('http')
const { Server } = require('socket.io')
const server = http.createServer(app)
const axios = require('axios')

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-type, Authorization')
  next()
})

// cors
var cors = require('cors')
app.use(cors())

app.get('/', (req,res) => {
  res.write("<h1>berhasil</h1>")
  res.end()
})

const io = new Server(server, { 
  cors: {
    origin: '*',
    methods: ["GET", "POST"],
  },
})

io.on("connection", (socket) => {
  socket.on("send-message", (message, room, sender) => {
    const time = new Date().toString();
    axios
      .post("https://studymate-data.herokuapp.com/api/create-pesan", {
        pesan: message,
        sender: sender,
        roomId: room,
        date: time.substring(4, 24),
      })
      .then((res) => {
        io.to(room).emit("receive-message", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
});

server.listen(port, () => {
  console.log("server is running");
});
