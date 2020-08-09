import express from 'express';
import bodyParser from 'body-parser';
import socket from 'socket.io';
import http from 'http';
import cors from 'cors';
import userapi from './handlers/user/user.route';
import roomapi from './handlers/room/room.route';
const { chat } = require('./handlers/chatserver/chatserver');
const port = 9000;
const app: express.Application = express();
const server = http.createServer(app);
const io = socket.listen(server)
app.use(bodyParser.json({}));
app.use(cors());
app.use(express.static('public'));
app.use('/user', userapi);
app.use('/room', roomapi);
chat(io);
server.listen(port, () => {
  console.log(`Application running on port ${port}`)
})
