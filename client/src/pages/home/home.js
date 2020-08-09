import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { JoinError } from "./error";

import { connect } from "react-redux";

import CreateRoom from "./createroom";
import homeService from "./home.service";

// social icons
import LinkedIn from "@material-ui/icons/LinkedIn";
import Github from "@material-ui/icons/GitHub";

import "./home.styles.scss";
import Options from "./option";

const Login = ({ history, setSharedKey, setNameAndKey }) => {
  const [id, setId] = useState(null);
  const [isusercreating, setUserCreatingBool] = useState(false);
  const [isNewRoom, setNewRoomBool] = useState(true);
  const [isErro, setErrorBool] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const roomId = url.searchParams.get("join");
    if (roomId !== null) {
      init(roomId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = async (roomId) => {
    setNewRoomBool(false);
    await setAllIds(roomId, roomId);
    onJoin();
  };

  const showAnimation = () => {
    const options = document.getElementsByClassName("option-container")[0];
    options.style.transition = "margin 0.5s ease-in";
    options.style.marginLeft = "-110%";
  };

  const goBack = async () => {
    const options = document.getElementsByClassName("option-container")[0];
    options.style.transition = "margin 0.5s ease-in";
    options.style.marginLeft = "0%";
    await new homeService().removeRoomId(id);
  };

  const errGoBack = () => {
    setErrorBool(false);
    setUserCreatingBool(false);
    setNewRoomBool(true);
    goBack()
  };

  const onJoin = () => {
    showAnimation();
  };

  const setAllIds = async (roomId, shared_key) => {
    await setSharedKey(shared_key);
    setId(roomId);
    return Promise.resolve();
  };

  const onInvite = async () => {
    showAnimation();
    const { roomId, shared_key } = await new homeService().getRoomId();
    await setAllIds(roomId, shared_key);
  };

  const onDemo = React.useCallback(() => history.push("/demo"), [history]);

  const goToChatRoom = async () => {
    setUserCreatingBool(true);
    const username = document.getElementById("username").value;
    try {
      const { name, private_key } = await new homeService().createUser(
        username,
        id
      );
      await setNameAndKey({
        name,
        private_key,
      });
      history.push("/chat");
    } catch (error) {
      console.log("Error in joining room", error.message);
      setErrorBool(true);
    }
  };

  return (
    <div className="login">
      <h4 className="app-header">E2EE chat application</h4>
      <div className="container">
        <div className="option-container">
          <Options onInvite={onInvite} onDemo={onDemo} />
        </div>
        <div className="join-container">
          <Card className="material-card">
            <CardContent style={cardContentStyle}>
              {isusercreating ? (
                <React.Fragment>
                  {isErro ? (
                    <JoinError goback={errGoBack} />
                  ) : (
                    <div className="loading-div">
                      <CircularProgress />
                      <h5>Joining conversation</h5>
                    </div>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className="material-card-icon three"></div>
                  <div>
                    <TextField label="username" id="username" />
                  </div>
                  {isNewRoom && <CreateRoom id={id} />}
                  <div className="btn-grp btn-join">
                    <Button onClick={goToChatRoom} style={btnStyle}>
                      Join
                    </Button>
                    {isNewRoom && <p onClick={goBack}>Go back</p>}
                  </div>
                </React.Fragment>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="footer">
        <p>Connect with me</p>
        <span>
          <p>
            <LinkedIn />
          </p>
          <p>
            <Github />
          </p>
        </span>
      </div>
    </div>
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

const mapDispatchtToProps = (dispatch) => ({
  setSharedKey: (shared_key) => {
    dispatch({
      type: "setsharedkey",
      payload: shared_key,
    });
    return Promise.resolve();
  },
  setNameAndKey: (obj) => {
    dispatch({
      type: "setnameandkey",
      payload: obj,
    });
    return Promise.resolve();
  },
});

export default connect(null, mapDispatchtToProps)(Login);
