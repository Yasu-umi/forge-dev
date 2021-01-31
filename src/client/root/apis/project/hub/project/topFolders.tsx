import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Hub, Project, Folder } from "../../../../../../apis/types";
import { urls } from "../../../../../../lib";
import * as fetch from "../../../../../fetch";
import { AttributesNameSelector } from "../../../../selectors/attributes-name-selector";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";

export const apiURL = urls.api.project.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-project_id-topFolders-GET/";
export const path = urls.views.apis.project.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" });

export const ViwerComponent: React.FC = () => {
  const params = useParams<{ hubID?: string; projectID?: string }>();
  const history = useHistory();
  const hubID = !params.hubID || params.hubID !== ":hubID" ? params.hubID : undefined;
  const projectID = !params.projectID || params.projectID !== ":projectID" ? params.projectID : undefined;

  const [hubs, setHubs] = useState<Hub[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [topFolders, setTopFolders] = useState<Folder[]>([]);

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(urls.views.apis.project.hub.project.topFolders.get({ hubID, projectID }));
    },
    [history, projectID],
  );

  const onChangeProjectID = useCallback(
    (projectID: string) => {
      history.push(urls.views.apis.project.hub.project.topFolders.get({ hubID, projectID }));
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
      <div>
        <Typography>Hub</Typography>
        <AttributesNameSelector objectID={hubID} onChangeObjectID={onChangeHubID} objects={hubs} />
      </div>
      <div>
        <Typography>Project</Typography>
        <AttributesNameSelector objectID={projectID} onChangeObjectID={onChangeProjectID} objects={projects} />
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
