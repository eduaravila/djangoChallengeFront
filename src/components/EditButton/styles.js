import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  addButton: {
    position: "fixed",
    bottom: theme.spacing(10),
    right: theme.spacing(10),
  },
}));
