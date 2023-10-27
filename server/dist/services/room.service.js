"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUserToRoom = exports.getRoom = exports.removeRoom = exports.addRoom = void 0;
const allRooms = [];
const addRoom = (room) => {
    allRooms.push(room);
    return true;
};
exports.addRoom = addRoom;
const getRoom = (roomId) => {
    const filteredroom = allRooms.filter(room => room.roomID === roomId);
    return filteredroom[0];
};
exports.getRoom = getRoom;
const removeRoom = (roomId) => {
    let roomIndex = -1;
    allRooms.forEach((room, index) => {
        if (room.roomID === roomId) {
            roomIndex = index;
        }
    });
    console.log(roomIndex);
    if (roomIndex === -1) {
        return false;
    }
    else {
        allRooms.splice(roomIndex, 1);
        return true;
    }
};
exports.removeRoom = removeRoom;
const addUserToRoom = (roomId, user) => {
    let filteredroom = allRooms.filter(room => room.roomID === roomId)[0];
    filteredroom.users.forEach(user => {
        console.log(user.name);
        console.log(user.roomId);
    });
    if (filteredroom.users.length > 1) {
        return false;
    }
    filteredroom.users.push(user);
    console.log("\nRoom stats after adding the user \n=======================================");
    allRooms.forEach(room => {
        console.log("RoomId", room.roomID);
        room.users.forEach(user => {
            console.log("user :", user.name);
        });
    });
    console.log("=======================================\n");
    return true;
};
exports.addUserToRoom = addUserToRoom;
//# sourceMappingURL=room.service.js.map