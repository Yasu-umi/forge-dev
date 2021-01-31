import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { urls } from "../../lib";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    marginTop: "calc(50vh - 10vh)",
    height: "20vh",
    width: "30vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonWrapper: {
    marginTop: "3vh",
  },
}));

export const App = () => {
  const styles = useStyles();
  return (
    <Container maxWidth="sm" className={styles.root}>
      <Paper className={styles.paper}>
        <Typography variant="h2" component="h2">
          forge-dev login
        </Typography>
        <div className={styles.buttonWrapper}>
          <Button variant="contained" color="primary" size="large" href={urls.login.get}>
            LOGIN
          </Button>
        </div>
      </Paper>
    </Container>
  );
};
