import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";
import * as api from "api";
import * as fetch from "client/fetch";
import { HubSelector, NameSelector } from "client/root/selectors";
import { urls } from "lib";

export const apiURL = urls.api.hq.account.project.get({ accountID: ":accountID", projectID: ":projectID " });
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/projects-:project_id-GET/";
export const path = urls.views.api.hq.account.project.get({ accountID: ":accountID", projectID: ":projectID" });

export const ViwerComponent: React.FC = () => {
  const params = useParams<{ accountID?: string; projectID?: string }>();
  const history = useHistory();
  const accountID = !params.accountID || params.accountID !== ":accountID" ? params.accountID : undefined;
  const projectID = !params.projectID || params.projectID !== ":projectID" ? params.projectID : undefined;

  const [hubs, setHubs] = useState<api.project.hubs.get.Response | undefined>(undefined);
  const [projects, setProjects] = useState<api.hq.account.projects.get.Response | undefined>(undefined);
  const [project, setProject] = useState<api.hq.account.project.get.Response | undefined>(undefined);

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

  useEffect(() => {
    (async () => {
      if (!accountID || !projectID) return;
      const project = await fetch.hq.account.project.get({ accountID, projectID });
      setProject(project);
      onChangeProjectID(projectID);
    })();
  }, [accountID, projectID, onChangeProjectID]);

  useEffect(() => {
    (async () => {
      if (!accountID) return;
      const projects = await fetch.hq.account.projects.get({ accountID });
      setProjects(projects);
      onChangeHubID(api.hq.utils.getHubID(accountID));
    })();
  }, [accountID, onChangeHubID]);

  useEffect(() => {
    (async () => {
      const hubs = await fetch.project.hubs.get();
      setHubs(hubs);
    })();
  }, []);

  return (
    <Viewer data={project} apiURL={apiURL} docURL={docURL}>
      <HubSelector hubs={hubs?.data} hubID={accountID ? api.hq.utils.getHubID(accountID) : undefined} onChangeHubID={onChangeHubID} />
      <div>
        <Typography>Project</Typography>
        <NameSelector objectID={projectID} onChangeObjectID={onChangeProjectID} objects={projects} />
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
