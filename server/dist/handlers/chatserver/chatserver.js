"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var room_service_1 = require("../../services/room.service");
var chatServer = function (io) {
    io.on('connection', function (socket) {
        var broadcast = function (eventname, payload, roomId, sid) {
            var allSockets = io.to(roomId).sockets;
            var ids = Object.keys(allSockets);
            ids.forEach(function (id) {
                if (id !== sid) {
                    allSockets[id].emit(eventname, payload);
                }
            });
        };
        var getAllPublicKeys = function (roomId, username) {
            var room = room_service_1.getRoom(roomId);
            if (room) {
                var filterredusers = room.users.filter(function (user) { return user.name !== username; });
                if (filterredusers.length > 0) {
                    return filterredusers.map(function (user) { return ({
                        name: user.name,
                        public_key: user.public_key
                    }); });
                }
            }
        };
        var sendPublicKeyToAll = function (roomId, username, sid) {
            var room = room_service_1.getRoom(roomId);
            if (room) {
                var filterreduser = room.users.filter(function (user) { return user.name === username; });
                if (filterreduser.length > 0) {
                    var public_key = filterreduser[0].public_key;
                    broadcast("newchatter", { username: username, public_key: public_key }, roomId, sid);
                }
            }
        };
        socket.on("join", function (_a) {
            var roomId = _a.roomId, username = _a.username;
            socket.join(roomId);
            socket.emit("ack", {
                sid: socket.id,
                otherusers: getAllPublicKeys(roomId, username)
            });
            sendPublicKeyToAll(roomId, username, socket.id);
        });
        socket.on("message", function (msgObj) {
            var roomId = msgObj.roomId, sid = msgObj.sid, sender = msgObj.sender, message = msgObj.message;
            broadcast("message", { sender: sender, message: message }, roomId, sid);
        });
        socket.on("disconnect", function () {
            console.log("Disconnected");
        });
    });
};
module.exports = {
    chat: chatServer
};
//# sourceMappingURL=chatserver.js.map