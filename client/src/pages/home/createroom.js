import React,{useState} from "react";
import { TextField,Snackbar } from "@material-ui/core";
import CopyIcon from "@material-ui/icons/FileCopy";

import "./home.styles.scss";

const CreateRoom = ({ id }) => {
  const [showcopy,setShowCopy] = useState(false)
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:3000?join=${id}`);
      setShowCopy(true)
      setTimeout(() => setShowCopy(false),1000)
    } catch (error) {
      console.log("Error", error.message);
    }
  };
  return (
    <span>
      <Snackbar
        open={showcopy}
        anchorOrigin={{
          vertical:"top",
          horizontal:"center"
        }}
      >
        <div className="copy-success" >
          <p>Link copied to clipboard</p>
        </div>
      </Snackbar>
      <p>Share the below link with your friend to join the room.</p>
      <div className="share-link">
        <TextField
          fullWidth={true}
          value={`http://localhost:3000?join=${id}`}
          disabled={true}
        />
        <CopyIcon fontSize="small" onClick={copyToClipboard} />
      </div>
      <p className="user-info">
        (Please note currently one-one chat is only supported)
      </p>
    </span>
  );
};

export default CreateRoom;
