import { Server, Socket } from 'socket.io';
import { getRoom } from '../../services/room.service';

const chatServer = (io: Server) => {
  io.on('connection', (socket: Socket) => {

    const broadcast = (eventname: string, payload: any, roomId: string, sid: string) => {
      const allSockets = io.to(roomId).sockets;
      const ids = Object.keys(allSockets);
      ids.forEach(id => {
        if (id !== sid) {
          allSockets[id].emit(eventname, payload)
        }
      })
    }

    const getAllPublicKeys = (roomId: string, username: string) => {
      const room = getRoom(roomId);
      if (room) {
        const filterredusers = room.users.filter(user => user.name !== username);
        if (filterredusers.length > 0) {
          return filterredusers.map(user => ({
            name : user.name,
            public_key : user.public_key
          }))
        }
      }
    }

    const sendPublicKeyToAll = (roomId: string, username: string, sid: string) => {
      const room = getRoom(roomId);
      if (room) {
        const filterreduser = room.users.filter(user => user.name === username);
        if (filterreduser.length > 0) {
          const { public_key } = filterreduser[0];
          broadcast("newchatter", { username, public_key }, roomId, sid);
        }
      }
    }

    socket.on("join", ({ roomId, username }) => {
      socket.join(roomId);
      socket.emit("ack", {
        sid : socket.id,
        otherusers : getAllPublicKeys(roomId,username)
      })
      sendPublicKeyToAll(roomId, username, socket.id)
    })

    socket.on("message", msgObj => {
      const { roomId, sid, sender, message } = msgObj;
      broadcast("message", { sender, message }, roomId, sid)
    })

    socket.on("disconnect", () => {
      console.log(`Disconnected`);
    })
  })
}


module.exports = {
  chat: chatServer
}