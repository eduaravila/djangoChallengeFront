import React, { useState } from "react";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useStyles } from "./styles";

const AddCarModal = ({ open, handleOpen, handleClose }) => {
  const classes = useStyles();
  const [plates, setPlates] = useState("");
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
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
            <h2 id="transition-modal-title">Add card</h2>
            <TextField
              id="filled-basic"
              label="Plates"
              variant="filled"
              value={plates ? plates : ""}
              InputProps={{
                value: plates ? plates : "",
              }}
              onChange={(e) => {
                setPlates(e.target.value);
              }}
              className={classes.plates}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleClose(plates)}
            >
              Add
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export { AddCarModal };
