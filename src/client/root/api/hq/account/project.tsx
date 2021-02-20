import React, { useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";
import * as api from "api";
import { useHubs, useHQProjects, useHQProject } from "client/root/helpers";
import { HubSelector, HQProjectSelector } from "client/root/selectors";
import { urls } from "lib";

export const apiURL = urls.api.hq.account.project.get({ accountID: ":accountID", projectID: ":projectID " });
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/projects-:project_id-GET/";
export const path = urls.views.api.hq.account.project.get({ accountID: ":accountID", projectID: ":projectID" });

export const ViwerComponent: React.FC = () => {
  const params = useParams<{ accountID?: string; projectID?: string }>();
  const history = useHistory();
  const accountID = !params.accountID || params.accountID !== ":accountID" ? params.accountID : undefined;
  const projectID = !params.projectID || params.projectID !== ":projectID" ? params.projectID : undefined;

  const [hubs] = useHubs();
  const [projects] = useHQProjects({ accountID });
  const [project] = useHQProject({ accountID, projectID });

  const onChangeHubID = useCallback(
    (hubID: string) => {
      const accountID = api.hq.utils.getAccountID(hubID);
      history.push(urls.views.api.hq.account.project.get({ accountID, projectID }));
    },
    [history, projectID],
  );
  const onChangeProjectID = useCallback(
    (projectID: string) => {
      history.push(urls.views.api.hq.account.project.get({ accountID, projectID }));
    },
    [history, accountID],
  );

  return (
    <Viewer data={project} apiURL={apiURL} docURL={docURL}>
      <HubSelector hubs={hubs?.data} hubID={accountID ? api.hq.utils.getHubID(accountID) : undefined} onChangeHubID={onChangeHubID} />
      <HQProjectSelector projects={projects} projectID={projectID} onChangeProjectID={onChangeProjectID} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
