import IRoom from '../handlers/room/room.interface';
import IUser from '../handlers/user/user.interface';
const allRooms: IRoom[] = [];

const addRoom = (room: IRoom): boolean => {
  allRooms.push(room);
  return true;
}

const getRoom = (roomId: string): IRoom => {
  const filteredroom = allRooms.filter(room => room.roomID === roomId)
  return filteredroom[0];
}

const removeRoom = (roomId: string): boolean => {
  let roomIndex = -1;
  allRooms.forEach((room, index) => {
    if (room.roomID === roomId) {
      roomIndex = index;
    }
  })
  console.log(roomIndex);
  if (roomIndex === -1) {
    return false
  }
  else {
    allRooms.splice(roomIndex, 1);
    return true;
  }
}

const addUserToRoom = (roomId:string,user:IUser):boolean => {
  let filteredroom = allRooms.filter(room => room.roomID===roomId)[0];
  filteredroom.users.forEach(user => {
    console.log(user.name);
    console.log(user.roomId);
  })
  if(filteredroom.users.length>1) {
    return false;
  }
  filteredroom.users.push(user)
  console.log("\nRoom stats after adding the user \n=======================================")
  allRooms.forEach(room => {
    console.log("RoomId",room.roomID)
    room.users.forEach(user => {
      console.log("user :",user.name);
    })
  })
  console.log("=======================================\n")
  return true;
}

export {
  addRoom,
  removeRoom,
  getRoom,
  addUserToRoom
}