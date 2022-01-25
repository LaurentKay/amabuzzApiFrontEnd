const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();



app.use(express.json({ extended: false, limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false, parameterLimit:50000}));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
const server = require('http').createServer(app);
app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }));

server.listen(process.env.PORT || 8989 , process.env.HOST || 'localhost', () => {
  const port = server.address().port;
  console.log(process.env.HOST, 'App now running on ports', port);
});

// SOCKETS
const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })
const activeUsers = new Set();
io.on('connection', (socket) => {
    console.log('io io its off to work i go')
    socket.on("new user", function (data) {
        socket.userId = data;
        activeUsers.add(data);
        io.emit("new user", [...activeUsers]);
      });
 
})
app.post('/amabuzz/:id', function(req, res) {
    const b = req
    console.log(b.body,'container2cxxxx')
    io.emit('whatever', req.body);
    res.send("Hello");
})
app.get('/amabuzz/:id', function(req, res) {
    const b = req
    console.log('container2cx', b)
    //res.send(b)
})