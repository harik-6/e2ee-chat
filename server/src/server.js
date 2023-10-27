const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const socket = require("socket.io");
const http = require("http");
const userapi = require("./handlers/user.route");
const roomapi = require("./handlers/room.route");
const chatserver = require("./handlers/chatserver");
const port = 8080;
const app = express();
const server = http.createServer(app);
const io = socket.listen(server);
app.use(bodyParser.json({}));
app.use(cors());
app.use("/user", userapi);
app.use("/room", roomapi);
chatserver(io);
server.listen(port, () => {
  console.log(`Application running on port ${port}`);
});
