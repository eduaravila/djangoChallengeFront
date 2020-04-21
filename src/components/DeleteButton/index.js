import React from "react";
import Fab from "@material-ui/core/Fab";
import DeleteIcon from "@material-ui/icons/Delete";
import { useStyles } from "./styles.js";
import Tooltip from "@material-ui/core/Tooltip";

let DeleteButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Tooltip title="Delete" aria-label="Delete">
      <Fab
        aria-label="delete"
        className={classes.addButton}
        color="secondary"
        size="small"
        onClick={onClick}
      >
        <DeleteIcon />
      </Fab>
    </Tooltip>
  );
};

export { DeleteButton };
