import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useStyles } from "./styles";

const LoginForm = ({ open, handleOpen, handleClose }) => {
  const classes = useStyles();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        onBackdropClick={() => handleClose(null)}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Login</h2>
            <TextField
              id="filled-basic"
              label="Username"
              variant="filled"
              value={username ? username : ""}
              InputProps={{
                value: username ? username : "",
              }}
              onChange={(e) => {
                setusername(e.target.value);
              }}
              className={classes.plates}
            />
            <TextField
              id="filled-basic"
              label="Password"
              variant="filled"
              value={password ? password : ""}
              InputProps={{
                value: password ? password : "",
              }}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              className={classes.plates}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleClose(username, password);
              }}
            >
              Log in
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export { LoginForm };
