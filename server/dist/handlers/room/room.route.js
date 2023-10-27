"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const uuid_1 = require("uuid");
const room_service_1 = require("../../services/room.service");
const roomRouter = express_1.default.Router();
roomRouter.post("/create", (req, res) => {
    const uid = uuid_1.v4();
    const room = {
        "roomID": uid,
        "shared_key": uid,
        "length": 1,
        "users": []
    };
    const isAdded = room_service_1.addRoom(room);
    if (isAdded) {
        res.status(201).json({
            "roomId": uid,
            "shared_key": uid
        });
    }
    else {
        res.status(500).json({
            "error": "Internal server error",
        });
    }
});
roomRouter.post('/remove', (req, res) => {
    const { id } = req.body;
    const isRemoved = room_service_1.removeRoom(id);
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
exports.default = roomRouter;
//# sourceMappingURL=room.route.js.map