import express from 'express';
import bodyParser from 'body-parser';
import socket from 'socket.io';
import http from 'http';
import cors from 'cors';
// import mongoose from 'mongoose';


//apis
import userapi from './handlers/user/user.route';
import roomapi from './handlers/room/room.route';
const { chat } = require('./handlers/chatserver/chatserver');

// const mongo_url: string =
//   "mongodb+srv://hari_k6:DjkstgVkfUHafqXC@cluster0.mdlse.mongodb.net/e2ee?retryWrites=true&w=majority";


const app: express.Application = express();

app.use(bodyParser.json({}));
app.use(cors());

const startServer = async () => {
  try {
    // await mongoose.connect(mongo_url, {
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true
    // });
    // console.log("Mongodb connected");
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
