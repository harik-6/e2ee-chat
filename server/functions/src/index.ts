import * as functions from 'firebase-functions';
import * as express from 'express'
import * as bodyParser from 'body-parser';
// import * as http from 'http';
// import * as socket from 'socket.io';
// import cors from 'cors';
import userapi from './handlers/user/user.route';
import roomapi from './handlers/room/room.route';
// const { chat } = require('./handlers/chatserver/chatserver');
const app: express.Application = express();
// const server = http.createServer(app);
// const io = socket.listen(server)
app.use(bodyParser.json({}));
// app.use(cors());
app.use(express.static('public'));
app.use('/user', userapi);
app.use('/room', roomapi);
// chat(io);
export const firebaseserver = functions.https.onRequest(app)