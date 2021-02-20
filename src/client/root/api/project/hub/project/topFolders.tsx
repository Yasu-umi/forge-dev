import React, { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";
import { useHubs, useProjects, useTopFolders } from "client/root/helpers";
import { HubSelector, ProjectSelector } from "client/root/selectors";
import { urls } from "lib";

export const apiURL = urls.api.project.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-project_id-topFolders-GET/";
export const path = urls.views.api.project.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" });

export const ViwerComponent: React.FC = () => {
  const params = useParams<{ hubID?: string; projectID?: string }>();
  const history = useHistory();
  const hubID = !params.hubID || params.hubID !== ":hubID" ? params.hubID : undefined;
  const projectID = !params.projectID || params.projectID !== ":projectID" ? params.projectID : undefined;

  const [hubs] = useHubs();
  const [projects] = useProjects({ hubID });
  const [topFolders] = useTopFolders({ hubID, projectID });

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

  return (
    <Viewer data={topFolders} apiURL={apiURL} docURL={docURL}>
      <HubSelector hubs={hubs?.data} hubID={hubID} onChangeHubID={onChangeHubID} />
      <ProjectSelector projects={projects?.data} projectID={projectID} onChangeProjectID={onChangeProjectID} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
