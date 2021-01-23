import { makeStyles } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { IssueData } from "../../apis/bim360/types";
import { HubData, ProjectData } from "../../apis/data-management/types";
import { urls } from "../../lib";
import * as fetch from "../fetch";
import { HubSelector } from "./hub-selector";
import { ProjectSelector } from "./project-selector";

const useStyles = makeStyles((theme) => ({
  space: {
    flexGrow: 1,
  },
  title: {
    marginRight: theme.spacing(3),
  },
  selectorWrapper: {
    marginRight: theme.spacing(3),
  },
  appbar: {
    height: theme.spacing(8),
  },
  body: {
    marginTop: theme.spacing(8),
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

  const [hubID, setHubID] = useState<string | undefined>(undefined);
  const [projectID, setProjectID] = useState<string | undefined>(undefined);
  const [hubs, setHubs] = useState<HubData[]>([]);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [issues, setIssues] = useState<IssueData[]>([]);

  const project = useMemo(() => projects.find((project) => project.id === projectID), [projects, projectID]);
  const issueContainerID = useMemo(() => project?.relationships.issues.data.id, [project]);

  const updateHubID = useCallback((hubID: string) => {
    (async () => {
      setHubID(hubID);
      const projects = await fetch.dataManagement.hub.projects.get({ hubID });
      setProjects(projects);
      if (projects.length === 0) return;
      setProjectID(projects[0].id);
    })();
  }, []);

  const onChangeHubID = useCallback(
    (ev: React.ChangeEvent<{ value: unknown }>) => {
      (async () => {
        const hubID = ev.currentTarget.value;
        if (typeof hubID !== "string") return;
        updateHubID(hubID);
      })();
    },
    [updateHubID],
  );

  const onChangeProjectID = useCallback((ev: React.ChangeEvent<{ value: unknown }>) => {
    const projectID = ev.currentTarget.value;
    if (projectID !== "string") return;
    setProjectID(projectID);
  }, []);

  useEffect(() => {
    (async () => {
      const hubs = await fetch.dataManagement.hubs.get();
      setHubs(hubs);
      if (hubs.length > 0) updateHubID(hubs[0].id);
    })();
  }, [updateHubID]);

  useEffect(() => {
    (async () => {
      if (!issueContainerID) return;
      const issues = await fetch.bim360.issues.get({ issueContainerID });
      setIssues(issues);
    })();
  }, [issueContainerID]);

  useEffect(() => {
    fetch.oss.buckets.get().then((buckets) => console.log(buckets));
  }, []);

  return (
    <>
      <AppBar position="fixed" className={styles.appbar}>
        <Toolbar>
          <Typography component="h5" variant="h5" className={styles.title}>
            forge-dev
          </Typography>
          <div className={styles.selectorWrapper}>
            <HubSelector hubID={hubID} onChangeHubID={onChangeHubID} hubs={hubs} />
          </div>
          <div className={styles.selectorWrapper}>
            <ProjectSelector projectID={projectID} onChangeprojectID={onChangeProjectID} projects={projects} />
          </div>
          <div className={styles.space} />
          <Button component="button" color="inherit" href={urls.logout.get}>
            LOGOUT
          </Button>
        </Toolbar>
      </AppBar>
      <div className={styles.body}>
        <Paper className={styles.paper}>
          <textarea
            style={{ width: "100%" }}
            rows={JSON.stringify(issues, null, 2).split("\n").length}
            value={JSON.stringify(issues, null, 2)}
          ></textarea>
        </Paper>
      </div>
    </>
  );
};
