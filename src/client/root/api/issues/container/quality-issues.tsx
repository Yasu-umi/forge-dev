import queryString from "query-string";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";
import * as api from "api";
import * as fetch from "client/fetch";
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
  const location = useLocation();
  const hubID = useMemo(() => {
    const query = queryString.parse(location.search);
    return typeof query["hubID"] === "string" ? query["hubID"] : undefined;
  }, [location.search]);

  const params = useParams<{ issueContainerID?: string }>();
  const history = useHistory();
  const issueContainerID = !params.issueContainerID || params.issueContainerID !== ":issueContainerID" ? params.issueContainerID : undefined;

  const [hubs, setHubs] = useState<api.project.hubs.get.Response | undefined>(undefined);
  const [projects, setProjects] = useState<api.project.hub.projects.get.Response | undefined>(undefined);
  const [issues, setIssues] = useState<api.issues.container.qualityIssues.get.Response | undefined>(undefined);

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

  useEffect(() => {
    (async () => {
      if (!issueContainerID) return;
      const issues = await fetch.issues.container.qualityIssues.get({ issueContainerID });
      setIssues(issues);
    })();
  }, [issueContainerID]);

  useEffect(() => {
    (async () => {
      if (!hubID) return;
      const projects = await fetch.project.hub.projects.get({ hubID });
      setProjects(projects);
    })();
  }, [hubID]);

  useEffect(() => {
    (async () => {
      const hubs = await fetch.project.hubs.get();
      setHubs(hubs);
    })();
  }, []);

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
