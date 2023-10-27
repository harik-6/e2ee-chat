const express = require("express");
const { addUserToRoom } = require("../services/room.service");
const NodeRSA = require("node-rsa");

const userRouter = express.Router();

userRouter.post("/create", async (req, res) => {
  const { name, roomId } = req.body;
  const keypairs = new NodeRSA().generateKeyPair();
  const private_key = keypairs.exportKey("private");
  const public_key = keypairs.exportKey("public");
  const user = {
    name,
    roomId,
    private_key,
    public_key,
  };

  const isAdded = await addUserToRoom(roomId, user);

  if (isAdded) {
    res.status(201).json({
      name: user.name,
      roomId: user.roomId,
      private_key: user.private_key,
    });
  } else {
    res.status(403).json({
      error: "Forbidden",
      message: "Room is already full",
    });
  }
});

module.exports = userRouter
