import express from 'express';
import bodyParser from 'body-parser';
import socket from 'socket.io';
import http from 'http';
import cors from 'cors';


//apis
import userapi from './handlers/user/user.route';
import roomapi from './handlers/room/room.route';
const { chat } = require('./handlers/chatserver/chatserver');

const app: express.Application = express();

app.use(bodyParser.json({}));
app.use(cors());
app.use(express.static('public'));

const startServer = async () => {
  try {
    app.use('/user', userapi);
    app.use('/room', roomapi);
    const port = 9000;
    const server = http.createServer(app);
    const io = socket.listen(server);
    chat(io);
    server.listen(port, () => {
      console.log(`Application running on port ${port}`)
    })
  } catch (error) {
    console.log("Error in connecting to mongodb ", error.message);
    return;
  }
}

startServer();
