import io from "socket.io-client";
import rsa from "node-rsa";
import crypt from "./crypto";

class chatService {
  constructor(roomId, username, privateKey, rcallback, newusercallback) {
    this.socket = io("http://localhost:9000");
    this.roomId = roomId;
    this.name = username;
    this.sharedKey = new crypt(roomId);
    this.sid = null;
    this.newusercallback = newusercallback;
    this.callbackFuc = rcallback;
    this.init();
    this.privateKey = new rsa(privateKey);
    this.publicKey = null;
  }

  init = () => {
    this.socket.on("message", this.receiveMessage);
    this.socket.on("connect", () => {
      this.socket.emit("join", { roomId: this.roomId, username: this.name });
    });
    this.socket.on("ack", ({ sid, otherusers }) => {
      this.sid = sid;
      if (otherusers) {
        this.publicKey = new rsa(otherusers[0].public_key);
        this.newusercallback(otherusers[0].name);
      }
    });
    this.socket.on("newchatter", (obj) => this.onNewUserJoins(obj));
  };

  onNewUserJoins = (obj) => {
    const { username, public_key } = obj;
    this.publicKey = new rsa(public_key);
    this.newusercallback(username);
  };

  sendMessage = (msg) => {
    let message = this.sharedKey.encrypt(msg);
    message = this.publicKey.encrypt(message, "base64");
    this.socket.emit("message", {
      sender: this.name,
      message,
      roomId: this.roomId,
      sid: this.sid,
    });
  };

  receiveMessage = (chatObject) => {
    let message = this.privateKey.decrypt(chatObject.message, "ascii");
    message = this.sharedKey.decrypt(message);
    this.callbackFuc({
      ...chatObject,
      message,
      type: "received",
    });
  };

  close = () => {
    this.socket.disconnect();
  };
}

export default chatService;
