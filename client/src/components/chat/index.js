import React from "react";
import { Avatar } from "@material-ui/core";

import "./styles.scss";

const ChatComponent = ({ messages }) => {
  return (
    <React.Fragment>
      <div className="chat">
        {messages.map((chat,index) => {
          const { type, message, sender } = chat;
          return (
            <div className={`message ${type}`} key={index} >
              <Avatar>{sender[0]}</Avatar>
              <p>{message}</p>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

const ChatComponentNoAvatar = ({ messages }) => {
  return (
    <React.Fragment>
      <div className="chat">
        {messages.map((chat,index) => {
          const { type, message } = chat;
          return (
            <div className={`message ${type} no-avatar-p`} key={index}>
              <p>{message}</p>
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};

export { ChatComponent, ChatComponentNoAvatar };
