import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@material-ui/core";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import CopyIcon from "@material-ui/icons/FileCopy";

const color = ["orange","indigo"];

const SideBar = ({ users,logout }) => {
  return (
    <React.Fragment>
      <span>
        <p>All participants</p>
        <List>
          {users.map((user, index) => (
            <div key={index} className="user">
              <ListItem>
                <ListItemIcon>
                  <Avatar style={{ backgroundColor: color[index] }}>{user[0]}</Avatar>
                </ListItemIcon>
                <ListItemText>{user}</ListItemText>
              </ListItem>
            </div>
          ))}
        </List>
      </span>
      <div className="action">
        <span>
          <CopyIcon fontSize="small" />
          <p>Link</p>
        </span>
        <span onClick={() => logout()} >
          <LogoutIcon fontSize="small" />
          <p>Logout</p>
        </span>
      </div>
    </React.Fragment>
  );
};

export default SideBar;
