import React from "react";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import { useStyles } from "./styles.js";
import Tooltip from "@material-ui/core/Tooltip";

let EditButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <Tooltip title="Edit" aria-label="Edit">
      <Fab
        aria-label="Edit"
        className={classes.addButton}
        color="primary"
        size="small"
        onClick={onClick}
      >
        <EditIcon />
      </Fab>
    </Tooltip>
  );
};

export { EditButton };
