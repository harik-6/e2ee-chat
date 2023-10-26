import React from "react";
import { Card, CardContent, Button } from "@material-ui/core";

import SendIcon from "@material-ui/icons/Telegram";
import ArrowIcon from "@material-ui/icons/ArrowForward";

import "./home.styles.scss";

const Options = ({ onInvite, onDemo }) => {
  return (
    <React.Fragment>
      <Card className="material-card">
        <CardContent style={{ ...cardContentStyle, opacity: 0.3 }}>
          <div className="material-card-icon one"></div>
          <p>
            Invite your friend and have some fun!!!.Don't worry the conversation
            is completely encrypted.
          </p>
          <div className="btn-grp btn-invite">
            <Button
              disabled
              onClick={() => onInvite()}
              style={{ ...btnStyle, backgroundColor: "#FF8C00" }}
            >
              Invite
            </Button>
            <SendIcon style={iconStyle} />
          </div>
        </CardContent>
      </Card>
      <Card className="material-card">
        <CardContent style={cardContentStyle}>
          <div className="material-card-icon two"></div>
          <p>
            Explore how the end to end encryption works by visualizing a sample
            conversation
          </p>
          <div className="btn-grp btn-demo">
            <Button onClick={() => onDemo()} style={btnStyle}>Explore</Button>
            <ArrowIcon style={iconStyle} />
          </div>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

const cardContentStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
};

const btnStyle = {
  backgroundColor: "green",
  color: "white",
};

const iconStyle = {
  color: "white",
};
export default Options
