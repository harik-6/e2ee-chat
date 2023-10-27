"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./handlers/user/user.route"));
const room_route_1 = __importDefault(require("./handlers/room/room.route"));
const { chat } = require("./handlers/chatserver/chatserver");
const port = 8080;
const app = express_1.default();
const server = http_1.default.createServer(app);
const io = socket_io_1.default.listen(server);
app.use(body_parser_1.default.json({}));
app.use(cors_1.default());
app.use(express_1.default.static("public"));
app.use("/user", user_route_1.default);
app.use("/room", room_route_1.default);
chat(io);
server.listen(port, () => {
    console.log(`Application running on port ${port}`);
});
//# sourceMappingURL=server.js.map