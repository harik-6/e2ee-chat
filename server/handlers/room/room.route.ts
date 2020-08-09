import express from 'express';
import { v4 as uuid } from 'uuid';
import IRoom from './room.interface';
import { addRoom, removeRoom, getRoom } from '../../services/room.service'

const roomRouter = express.Router();

roomRouter.post("/create", (req, res) => {
  const uid = uuid();
  const room: IRoom = {
    "roomID": uid,
    "shared_key": uid,
    "length": 1,
    "users" : []
  }
  const isAdded = addRoom(room)
  if (isAdded) {
    res.status(201).json({
      "roomId": uid,
      "shared_key": uid
    })
  } else {
    res.status(500).json({
      "error" : "Internal server error",
    });
  }
})

roomRouter.post('/remove',(req,res) => {
  const {id} = req.body;
  const isRemoved = removeRoom(id)
  if(isRemoved){
    res.status(204).end();
  } else {
    res.status(400).json({
      "error" : "Bad request",
      "message" : "Room can not be found"
    })
  }
})

export default roomRouter;