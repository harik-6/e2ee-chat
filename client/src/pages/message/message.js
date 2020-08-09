import React from "react";
import { connect } from "react-redux";
import { TextField, Button, Avatar } from "@material-ui/core";
import SideBar from "./sidebar";
import { ChatComponentNoAvatar } from "../../components/chat";

import chatService from "./chat.service";

import "./message.styles.scss";

class Message extends React.Component {
  constructor(props) {
    super(props);
    this.chatservice = null;
    this.state = {
      messages: [],
      friends : [],
    };
  }

  componentDidMount() {
    const { roomId, username,privateKey } = this.props;
    this.chatservice = new chatService(roomId, username,privateKey,this.onReceive,this.onNewUser);
  }

  onLogout = () => {
    this.props.history.push("/")
  }

  onNewUser = (friend) => {
    const frnds = this.state.friends;
    frnds.push(friend);
    this.setState({
      friends : frnds
    })
  }

  addMessage = (obj) => {
    const cur = this.state.messages;
    cur.push(obj);
    this.setState({
      message: cur,
    });
  };

  onSend = () => {
    const inputfield = document.getElementById("user-message");
    const message = inputfield.value;
    this.addMessage({
      sender: this.props.username,
      message,
      type: "sent",
    });
    this.chatservice.sendMessage(message);
    inputfield.value = "";
  };

  onReceive = (chatObject) => {
    this.addMessage(chatObject);
  };

  componentWillUnmount(){
    this.chatservice.close()
  }

  render() {
    return (
      <div className="chat-room">
        <div className="all-participants">
          <SideBar users={this.state.friends} logout={this.onLogout} />
        </div>
        <div className="messages">
          <div className="header" key="header">
            <Avatar style={{ backgroundColor: "green" }}>a</Avatar>
            <div>
              <p className="captilize" >{this.props.username}</p>
            </div>
          </div>
          <div className="all-msgs">
            <div>
              <ChatComponentNoAvatar messages={this.state.messages} />
            </div>
          </div>
          <div className="bottom">
            <TextField
              placeholder="Type your messages here"
              variant="outlined"
              fullWidth={true}
              id="user-message"
            />
            <Button
              onClick={this.onSend}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  roomId: state.roomId,
  username: state.username,
  privateKey: state.privateKey,
  sharedKey: state.sharedKey,
});

export default connect(mapStateToProps, null)(Message);
