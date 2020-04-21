import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


import { useStyles } from "./styles.js";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomAlert = ({ msg = null, open, handleClose }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info">
          {msg ? msg : "Press anywhere in the map to add a new car"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export { CustomAlert };
