import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";
import { urls } from "../../lib";
import { NodeElement } from "./apis";
import { Sidebar } from "./sidebar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  space: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  titleWrapper: {
    width: theme.spacing(30),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  toolbar: {
    paddingLeft: 0,
  },
  appbar: {
    height: theme.spacing(8),
    zIndex: theme.zIndex.drawer + 1,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    minWidth: "50vw",
    minHeigh: theme.spacing(100),
  },
}));

export const App = () => {
  const styles = useStyles();

  const [nodeElement, setNodeElement] = useState<NodeElement | undefined>(undefined);

  return (
    <div className={styles.root}>
      <Sidebar setNodeElement={setNodeElement} />
      <AppBar position="fixed" className={styles.appbar}>
        <Toolbar className={styles.toolbar}>
          <div className={styles.titleWrapper}>
            <Typography component="h5" variant="h5">
              forge-dev
            </Typography>
          </div>
          <div className={styles.space} />
          <Button component="button" color="inherit" href={urls.logout.get}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <main className={styles.content}>
        <Toolbar />
        {nodeElement && "Viewer" in nodeElement && nodeElement.Viewer ? <nodeElement.Viewer /> : null}
      </main>
    </div>
  );
};
