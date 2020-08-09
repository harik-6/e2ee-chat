import axios from "axios";

class HomeService {
  constructor() {
    this.roomUrl = "/room";
    this.userUrl = "/user";
  }
  

  getRoomId = async () => {
    const response = await axios.post(`${this.roomUrl}/create`);
    const data = response.data;
    return data;
  };

  removeRoomId = async (roomid) => {
    await axios.post(`${this.roomUrl}/remove`, {
      id: roomid,
    });
    return true;
  };

  createUser = async (name,id) => {
    const response = await axios.post(`${this.userUrl}/create`, {
      name,
      roomId : id
    });
    const data = response.data;
    return data;
  };
}

export default HomeService;
