import Typography from "@material-ui/core/Typography";
import queryString from "query-string";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { Issue } from "../../../../../apis/types";
import { Hub, Project } from "../../../../../apis/types";
import * as utils from "../../../../../apis/utils";
import { PathParam, urls } from "../../../../../lib";
import * as fetch from "../../../../fetch";
import { AttributesNameSelector } from "../../../selectors/attributes-name-selector";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";

export const apiURL = urls.api.issues.container.qualityIssues.get({ issueContainerID: ":issueContainerID" });
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-GET/";
export const path = urls.views.apis.issues.container.qualityIssues.get({ issueContainerID: ":issueContainerID" });
export const buildURL = ({ hubID, issueContainerID }: { hubID: PathParam; issueContainerID: PathParam }) =>
  `${urls.views.apis.issues.container.qualityIssues.get({ issueContainerID: issueContainerID || ":issueContainerID" })}?${queryString.stringify({
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

  const [hubs, setHubs] = useState<Hub[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [issues, setIssues] = useState<Issue[]>([]);

  const projectID = projects.find((p) => utils.getIssueContainerID(p) === issueContainerID)?.id;

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(buildURL({ hubID, issueContainerID }));
    },
    [history, issueContainerID],
  );
  const onChangeProjectID = useCallback(
    (projectID: string) => {
      if (!hubID) return;
      const project = projects.find((p) => p.id === projectID);
      if (!project) return;
      const issueContainerID = utils.getIssueContainerID(project);
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
