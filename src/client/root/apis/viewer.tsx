import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    width: "100%",
  },
  content: {
    margin: theme.spacing(2),
  },
}));

export const Viewer = ({ data, apiURL, docURL, children }: { data: unknown; apiURL: string; docURL: string; children?: React.ReactNode }) => {
  const styles = useStyles();
  return (
    <Paper className={styles.paper}>
      <div className={styles.content}>
        <Typography>Autodesk Document Link</Typography>
        <Link href={docURL}>
          <Typography>{docURL}</Typography>
        </Link>
      </div>
      <div className={styles.content}>
        <Typography>API Path</Typography>
        <Link href="#">
          <Typography>{apiURL}</Typography>
        </Link>
      </div>
      <div className={styles.content}>
        <Typography>API Required</Typography>
        {children}
      </div>
      <div className={styles.content}>
        <Typography>API Response</Typography>
        <TextareaAutosize rowsMin={3} style={{ width: "100%" }} value={JSON.stringify(data, null, 2)} />
      </div>
    </Paper>
  );
};
