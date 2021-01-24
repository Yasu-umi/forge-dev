import React, { useEffect, useState, useCallback } from "react";
import { IssueData } from "../../../../apis/bim360/types";
import { HubData, ProjectData } from "../../../../apis/data-management/types";
import { urls } from "../../../../lib";
import * as fetch from "../../../fetch";
import { AttributesNameSelector } from "../../selectors/attributes-name-selector";
import { NodeElement } from "../types";
import { Viewer } from "../viewer";

export const apiURL = urls.api.bim360.issues.get({ issueContainerID: ":issueContainerID" });
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/field-issues-GET/";

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<HubData[]>([]);
  const [hubID, setHubID] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectID, setProjectID] = useState<string | undefined>(undefined);
  const [issues, setIssues] = useState<IssueData[]>([]);

  const updateProjectID = useCallback(
    (projectID: string) => {
      (async () => {
        setProjectID(projectID);
        const project = projects.find((project) => project.id === projectID);
        const issueContainerID = project?.relationships.issues.data.id;
        if (!issueContainerID) return;
        setIssues(await fetch.bim360.issues.get({ issueContainerID }));
      })();
    },
    [projects],
  );

  const updateHubID = useCallback(
    (hubID: string) => {
      (async () => {
        setHubID(hubID);
        const projects = await fetch.dataManagement.hub.projects.get({ hubID });
        setProjects(projects);
        if (projects.length === 0) return;
        updateProjectID(projects[0].id);
      })();
    },
    [updateProjectID],
  );

  useEffect(() => {
    (async () => {
      const hubs = await fetch.dataManagement.hubs.get();
      setHubs(hubs);
      if (hubs.length === 0) return;
      updateHubID(hubs[0].id);
    })();
  }, [updateHubID]);

  return (
    <Viewer data={issues} apiURL={apiURL} docURL={docURL}>
      <AttributesNameSelector objectID={hubID} onChangeObjectID={updateHubID} objects={hubs} />
      <AttributesNameSelector objectID={projectID} onChangeObjectID={updateProjectID} objects={projects} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  Viewer: ViwerComponent,
};
