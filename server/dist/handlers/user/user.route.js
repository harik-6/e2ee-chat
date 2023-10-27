"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_rsa_1 = __importDefault(require("node-rsa"));
const room_service_1 = require("../../services/room.service");
const userRouter = express_1.default.Router();
userRouter.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, roomId } = req.body;
    const keypairs = new node_rsa_1.default().generateKeyPair();
    const private_key = keypairs.exportKey('private');
    const public_key = keypairs.exportKey('public');
    const user = {
        name,
        roomId,
        private_key,
        public_key
    };
    const isAdded = yield room_service_1.addUserToRoom(roomId, user);
    if (isAdded) {
        res.status(201).json({
            name: user.name,
            roomId: user.roomId,
            private_key: user.private_key
        });
    }
    else {
        res.status(403).json({
            "error": "Forbidden",
            "message": "Room is already full"
        });
    }
}));
exports.default = userRouter;
//# sourceMappingURL=user.route.js.map