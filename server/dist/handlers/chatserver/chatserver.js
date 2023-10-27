"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const room_service_1 = require("../../services/room.service");
const chatServer = (io) => {
    io.on('connection', (socket) => {
        const broadcast = (eventname, payload, roomId, sid) => {
            const allSockets = io.to(roomId).sockets;
            const ids = Object.keys(allSockets);
            ids.forEach(id => {
                if (id !== sid) {
                    allSockets[id].emit(eventname, payload);
                }
            });
        };
        const getAllPublicKeys = (roomId, username) => {
            const room = room_service_1.getRoom(roomId);
            if (room) {
                const filterredusers = room.users.filter(user => user.name !== username);
                if (filterredusers.length > 0) {
                    return filterredusers.map(user => ({
                        name: user.name,
                        public_key: user.public_key
                    }));
                }
            }
        };
        const sendPublicKeyToAll = (roomId, username, sid) => {
            const room = room_service_1.getRoom(roomId);
            if (room) {
                const filterreduser = room.users.filter(user => user.name === username);
                if (filterreduser.length > 0) {
                    const { public_key } = filterreduser[0];
                    broadcast("newchatter", { username, public_key }, roomId, sid);
                }
            }
        };
        socket.on("join", ({ roomId, username }) => {
            socket.join(roomId);
            socket.emit("ack", {
                sid: socket.id,
                otherusers: getAllPublicKeys(roomId, username)
            });
            sendPublicKeyToAll(roomId, username, socket.id);
        });
        socket.on("message", msgObj => {
            const { roomId, sid, sender, message } = msgObj;
            broadcast("message", { sender, message }, roomId, sid);
        });
        socket.on("disconnect", () => {
            console.log(`Disconnected`);
        });
    });
};
module.exports = {
    chat: chatServer
};
//# sourceMappingURL=chatserver.js.map