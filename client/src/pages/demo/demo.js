import React, { useState } from "react";
import anime from "animejs";
import { Button } from "@material-ui/core";
import { ChatComponent } from "../../components/chat";

import Next from "@material-ui/icons/SkipNext";
import Previous from "@material-ui/icons/SkipPrevious";
import Key from "@material-ui/icons/VpnKey";
import TimeLine from "./timeline";

import mockChat from "./messages";
import indexMap from "./map";

import "./demo.styles.scss";

const iconStyles = {
  fontSize: "2rem",
  color: "black",
};

const btnStyles = {
  backgroundColor: "#d3d3d3",
  marginLeft: "5px",
  marginRight: "5px",
};

const Demo = () => {
  const [messages, setMessage] = useState([mockChat[0]]);
  const [activeMsg, setActiveMessage] = useState(mockChat[0]);
  const [encodedMsg, setEncodedMessage] = useState(btoa(activeMsg.sender + activeMsg.receiver + activeMsg.message + activeMsg.type))

  const showPs = (index) => {
    let show = [];
    for (let i = 1; i <= indexMap[index]; i++) {
      show.push(".p" + i);
    }
    anime({
      targets: show,
      duration: 3000,
      opacity: 1,
      begin: function () {
        document.querySelector(show[0]).style.display = "block";
      },
    });
  };

  const hidePs = (index) => {
    let hide = [];
    for (let i = indexMap[index] + 1; i <= 8; i++) {
      hide.push(".p" + i);
    }
    anime({
      targets: hide,
      duration: 3000,
      opacity: 0,
      begin: function () {
        if (hide[0]) {
          document.querySelector(hide[0]).style.display = "hidden";
        }
      },
    });
  };

  const setActiveIndex = (index) => {
    showPs(index);
    hidePs(index);
  };

  const setActiveAndEncodedMessage = (messageObj) => {
    setActiveMessage(messageObj);
    const { sender, receiver, message, type } = messageObj;
    setEncodedMessage(btoa(sender + receiver + message + type));
  }

  const addMessage = () => {
    if (messages.length < mockChat.length) {
      const newmessage = [...messages, mockChat[messages.length]];
      setMessage(newmessage);
      setActiveAndEncodedMessage(mockChat[messages.length]);
      hidePs("-1");
    }
  };

  const removeMessage = () => {
    if (messages.length > 1) {
      const newmessage = messages.filter((m, i) => i !== messages.length - 1);
      setMessage(newmessage);
      setActiveAndEncodedMessage(mockChat[messages.length]);
      hidePs("-1");
    }
  };

  const { sender, receiver, message } = activeMsg;
  return (
    <React.Fragment>
      <div className="demo-body">
        <div className="demo-page">
          <div className="ui-demo">
            <ChatComponent messages={messages} />
            {messages.length === mockChat.length && (
              <p className="eoc-message">
                (You have reached the end of conversation)
              </p>
            )}
            <div className="action-tab">
              <div>
                <Button style={btnStyles} onClick={() => removeMessage()}>
                  <Previous style={iconStyles} />
                </Button>
                <Button style={btnStyles} onClick={() => addMessage()}>
                  <Next style={iconStyles} />
                </Button>
              </div>
            </div>
          </div>
          <div className="backend-demo">
            <div className="visualization">
              <div className="alice-side">
                <p className="pp p1">{`${sender} sent "${message}"`}</p>
                <p className="pp p2">
                  <span>Encrypted using the shared key</span>
                  <Key style={{ color: "orange" }} />
                </p>
                <p className="pp p3">
                  <span>{`Encrypted using ${receiver}'s public key `}</span>
                  <Key style={{ color: "green" }} />
                </p>
                <p className="pp p4">{`Encrypted message '${encodedMsg}' sent to ${receiver}`}</p>
              </div>
              <div className="tmline">
                <TimeLine msg={message} setActiveIndex={setActiveIndex} />
              </div>
              <div className="bob-side">
                <div className="sixedbox"> </div>
                <p className="pp p5">{`Encrypted message '${encodedMsg}' received by ${receiver}`}</p>
                <p className="pp p6">
                  <span>{`Decrypted using ${receiver}'s private key `}</span>
                  <Key style={{ color: "green" }} />
                </p>
                <p className="pp p7">
                  <span>Decrypted using the shared key</span>
                  <Key style={{ color: "orange" }} />
                </p>
                <p className="pp p8">{`${receiver} received "${message}"`}</p>
              </div>
            </div>
          </div>
        </div>
        {/* <Modal
          className="info-modal"
          open={isModalOpen}
          disableBackdropClick={false}
        >
          <div className="info">
            <List>
              <ListItem>
                <ListItemIcon>
                  <Next style={iconStyles} />
                </ListItemIcon>
                To go to the next message
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Previous style={iconStyles} />
                </ListItemIcon>
                To go to the previous message
              </ListItem>
              <ListItem >
                <ListItemIcon>
                  <Circle style={{ ...iconStyles, color: "#d3d3d3" }} />
                </ListItemIcon>
                To navigate to the various steps in encryption/decryption timeline
              </ListItem>
              <ListItem style={{ display: "flex", flexDirection: "row-reverse" }} >
                <Button onClick={() => setModalOpen(false)} style={{ backgroundColor: "#d3d3d3" }} >
                  Close
                </Button>
              </ListItem>
            </List>
          </div>
        </Modal> */}
      </div>
    </React.Fragment>
  );
};

export default Demo;
