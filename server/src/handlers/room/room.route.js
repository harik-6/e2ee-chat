"use strict";
exports.__esModule = true;
var express_1 = require("express");
var uuid_1 = require("uuid");
var room_service_1 = require("../../services/room.service");
var roomRouter = express_1["default"].Router();
roomRouter.post("/create", function (req, res) {
    var uid = uuid_1.v4();
    var room = {
        "roomID": uid,
        "shared_key": uid,
        "length": 1,
        "users": []
    };
    var isAdded = room_service_1.addRoom(room);
    if (isAdded) {
        res.status(201).json({
            "roomId": uid,
            "shared_key": uid
        });
    }
    else {
        res.status(500).json({
            "error": "Internal server error"
        });
    }
});
roomRouter.post('/remove', function (req, res) {
    var id = req.body.id;
    var isRemoved = room_service_1.removeRoom(id);
    if (isRemoved) {
        res.status(204).end();
    }
    else {
        res.status(400).json({
            "error": "Bad request",
            "message": "Room can not be found"
        });
    }
});
exports["default"] = roomRouter;
