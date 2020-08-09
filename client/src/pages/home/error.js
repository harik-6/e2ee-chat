import React from "react";
import Error from "@material-ui/icons/ErrorOutlineOutlined";
import { List, ListItem } from "@material-ui/core";

const JoinError =({goback}) => {
  return (
    <React.Fragment>
      <div>
        <List>
          <ListItem>
            <Error style={{ color: "orange", fontSize: "4.1rem" }} />
            <h4>Not able to join the room</h4>
          </ListItem>
          <ListItem>Room could be full</ListItem>
          <ListItem>Shared link could be invalid</ListItem>
          <ListItem style={{ justifyContent: "center" }} onClick={() => goback()} >
            <h5 style={{textDecoration: "underline",cursor:"pointer"}} >Go back</h5>
          </ListItem>
        </List>
      </div>
    </React.Fragment>
  );
}

export { JoinError };
