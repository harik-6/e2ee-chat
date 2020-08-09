"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = __importDefault(require("http"));
var cors_1 = __importDefault(require("cors"));
var user_route_1 = __importDefault(require("./handlers/user/user.route"));
var room_route_1 = __importDefault(require("./handlers/room/room.route"));
var chat = require('./handlers/chatserver/chatserver').chat;
var port = 8080;
var app = express_1.default();
var server = http_1.default.createServer(app);
var io = socket_io_1.default.listen(server);
app.use(body_parser_1.default.json({}));
app.use(cors_1.default());
app.use("/", express_1.default.static('public'));
app.use('/user', user_route_1.default);
app.use('/room', room_route_1.default);
chat(io);
server.listen(port, function () {
    console.log("Application running on port " + port);
});
//# sourceMappingURL=server.js.map