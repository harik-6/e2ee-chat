import IUser from '../user/user.interface';

export default interface IRoom {
  roomID:string
  shared_key:string
  length:number
  users : IUser[]
}