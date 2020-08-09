"use strict";
exports.__esModule = true;
exports.addUserToRoom = exports.getRoom = exports.removeRoom = exports.addRoom = void 0;
var allRooms = [];
var addRoom = function (room) {
    allRooms.push(room);
    return true;
};
exports.addRoom = addRoom;
var getRoom = function (roomId) {
    var filteredroom = allRooms.filter(function (room) { return room.roomID === roomId; });
    return filteredroom[0];
};
exports.getRoom = getRoom;
var removeRoom = function (roomId) {
    var roomIndex = -1;
    allRooms.forEach(function (room, index) {
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
var addUserToRoom = function (roomId, user) {
    var filteredroom = allRooms.filter(function (room) { return room.roomID === roomId; })[0];
    filteredroom.users.forEach(function (user) {
        console.log(user.name);
        console.log(user.roomId);
    });
    if (filteredroom.users.length > 1) {
        return false;
    }
    filteredroom.users.push(user);
    console.log("\nRoom stats after adding the user \n=======================================");
    allRooms.forEach(function (room) {
        console.log("RoomId", room.roomID);
        room.users.forEach(function (user) {
            console.log("user :", user.name);
        });
    });
    console.log("=======================================\n");
    return true;
};
exports.addUserToRoom = addUserToRoom;
