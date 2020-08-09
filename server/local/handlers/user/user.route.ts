import express, { Router, Request, Response } from 'express';
import IUser from './user.interface';
import rsa from 'node-rsa';
import { addUserToRoom } from '../../services/room.service';

const userRouter: Router = express.Router();

userRouter.post("/create", async (req: Request, res: Response) => {
  const { name, roomId } = req.body;
  const keypairs = new rsa().generateKeyPair();
  const private_key: string = keypairs.exportKey('private');
  const public_key: string = keypairs.exportKey('public');
  const user: IUser = {
    name,
    roomId,
    private_key,
    public_key
  };

  const isAdded = await addUserToRoom(roomId, user);
  
  if(isAdded) {
    res.status(201).json({
      name: user.name,
      roomId: user.roomId,
      private_key: user.private_key
    })
  } else {
    res.status(403).json({
      "error" : "Forbidden",
      "message" : "Room is already full"
    })
  }
})


export default userRouter;