const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5400;
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

const apiAuthRoute = require('./apis/routes/auth.route');
const apiRoomRoute = require('./apis/routes/room.route');
const apiMessageRoute = require('./apis/routes/message.route');
const apiUserRoute = require('./apis/routes/user.route');

const authMiddleware = require('./apis/middleware/auth.middleware');

const listenerSocket = require('./socket/listener.socket');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection
  .once('open', () => {
    console.log('Mongodb connected');
  })
  .on('error', (error) => {
    console.log('Error: ', error);
  });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', apiAuthRoute);
app.use('/api/room', authMiddleware.checkAuth, apiRoomRoute);
app.use('/api/message', authMiddleware.checkAuth, apiMessageRoute);
app.use('/api/user', authMiddleware.checkAuth, apiUserRoute);

app.get('/', (req, res) => {
  res.send('Chat-app-server.');
});

io.on('connection', (socket) => {
  console.log(socket.id, 'connected');

  listenerSocket.connectRooms(socket);
  listenerSocket.createRoom(socket);
  listenerSocket.joinRoom(socket);

  socket.on('disconnect', () => {
    console.log(socket.id, 'disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});

app.io = io;
