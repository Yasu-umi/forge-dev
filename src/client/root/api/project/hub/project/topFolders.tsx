import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";
import * as api from "api";
import * as fetch from "client/fetch";
import { HubSelector, AttributesNameSelector } from "client/root/selectors";
import { urls } from "lib";

export const apiURL = urls.api.project.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-project_id-topFolders-GET/";
export const path = urls.views.api.project.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" });

export const ViwerComponent: React.FC = () => {
  const params = useParams<{ hubID?: string; projectID?: string }>();
  const history = useHistory();
  const hubID = !params.hubID || params.hubID !== ":hubID" ? params.hubID : undefined;
  const projectID = !params.projectID || params.projectID !== ":projectID" ? params.projectID : undefined;

  const [hubs, setHubs] = useState<api.project.hubs.get.Response | undefined>(undefined);
  const [projects, setProjects] = useState<api.project.hub.projects.get.Response | undefined>(undefined);
  const [topFolders, setTopFolders] = useState<api.project.hub.project.topFolders.get.Response | undefined>(undefined);

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(urls.views.api.project.hub.project.topFolders.get({ hubID, projectID }));
    },
    [history, projectID],
  );

  const onChangeProjectID = useCallback(
    (projectID: string) => {
      history.push(urls.views.api.project.hub.project.topFolders.get({ hubID, projectID }));
    },
    [history, hubID],
  );

  useEffect(() => {
    (async () => {
      const hubs = await fetch.project.hubs.get();
      setHubs(hubs);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!hubID) return;
      const projects = await fetch.project.hub.projects.get({ hubID });
      setProjects(projects);
    })();
  }, [hubID]);

  useEffect(() => {
    (async () => {
      if (!hubID || !projectID) return;
      const topFolders = await fetch.project.hub.project.topFolders.get({ hubID, projectID });
      setTopFolders(topFolders);
    })();
  }, [hubID, projectID]);

  return (
    <Viewer data={topFolders} apiURL={apiURL} docURL={docURL}>
      <HubSelector hubs={hubs?.data} hubID={hubID} onChangeHubID={onChangeHubID} />
      <div>
        <Typography>Project</Typography>
        <AttributesNameSelector objectID={projectID} onChangeObjectID={onChangeProjectID} objects={projects?.data} />
      </div>
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
