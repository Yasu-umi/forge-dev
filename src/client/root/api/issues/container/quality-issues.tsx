import queryString from "query-string";
import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";
import * as api from "api";
import * as helpers from "client/root/helpers";
import { HubSelector, ProjectSelector } from "client/root/selectors";
import { PathParam, urls } from "lib";

export const apiURL = urls.api.issues.container.qualityIssues.get({ issueContainerID: ":issueContainerID" });
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-GET/";
export const path = urls.views.api.issues.container.qualityIssues.get({ issueContainerID: ":issueContainerID" });
export const buildURL = ({ hubID, issueContainerID }: { hubID: PathParam; issueContainerID: PathParam }) =>
  `${urls.views.api.issues.container.qualityIssues.get({ issueContainerID: issueContainerID || ":issueContainerID" })}?${queryString.stringify({
    hubID,
  })}`;

export const ViwerComponent: React.FC = () => {
  const hubID = helpers.search.useHubID();
  const issueContainerID = helpers.params.useIssueContainerID();

  const history = useHistory();

  const [hubs] = helpers.useHubs();
  const [projects] = helpers.useProjects({ hubID });
  const [issues] = helpers.useIssues({ issueContainerID });

  const projectID = projects?.data.find((p) => api.utils.getIssueContainerID(p) === issueContainerID)?.id;

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(buildURL({ hubID, issueContainerID }));
    },
    [history, issueContainerID],
  );
  const onChangeProjectID = useCallback(
    (projectID: string) => {
      if (!hubID) return;
      const project = projects?.data.find((p) => p.id === projectID);
      if (!project) return;
      const issueContainerID = api.utils.getIssueContainerID(project);
      history.push(buildURL({ hubID, issueContainerID }));
    },
    [history, hubID, projects],
  );

  return (
    <Viewer data={issues} apiURL={apiURL} docURL={docURL}>
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
