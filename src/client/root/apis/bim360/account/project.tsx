import React, { useEffect, useState, useCallback } from "react";
import * as apis from "../../../../../apis";
import { ProjectData } from "../../../../../apis/bim360/types";
import { HubData } from "../../../../../apis/data-management/types";
import { urls } from "../../../../../lib";
import * as fetch from "../../../../fetch";
import { AttributesNameSelector } from "../../../selectors/attributes-name-selector";
import { NameSelector } from "../../../selectors/name-selector";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";

export const apiURL = urls.api.bim360.account.project.get({ accountID: ":accountID", projectID: ":projectID " });
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/projects-:project_id-GET/";

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<HubData[]>([]);
  const [hubID, setHubID] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [project, setProject] = useState<ProjectData | undefined>(undefined);
  const [projectID, setProjectID] = useState<string | undefined>(undefined);

  const updateProjectID = useCallback(
    (projectID: string) => {
      (async () => {
        setProjectID(projectID);
        if (!hubID) return;
        const accountID = apis.bim360.utils.getAccountID(hubID);
        const project = await fetch.bim360.account.project.get({ accountID, projectID });
        setProject(project);
      })();
    },
    [hubID],
  );

  const updateHubID = useCallback(
    (hubID: string) => {
      (async () => {
        setHubID(hubID);
        const accountID = apis.bim360.utils.getAccountID(hubID);
        const projects = await fetch.bim360.account.projects.get({ accountID });
        setProjects(projects);
        if (projects.length === 0) return;
        updateProjectID(projects[0].id);
      })();
    },
    [updateProjectID],
  );

  const onChangeHubID = useCallback(
    (ev: React.ChangeEvent<{ value: unknown }>) => {
      const hubID = ev.currentTarget.value;
      if (typeof hubID !== "string") return;
      updateHubID(hubID);
    },
    [updateHubID],
  );

  const onChangeProjectID = useCallback(
    (ev: React.ChangeEvent<{ value: unknown }>) => {
      const projectID = ev.currentTarget.value;
      if (typeof projectID !== "string") return;
      updateProjectID(projectID);
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
    <Viewer data={project} apiURL={apiURL} docURL={docURL}>
      <AttributesNameSelector objectID={hubID} onChangeObjectID={onChangeHubID} objects={hubs} />
      <NameSelector objectID={projectID} onChangeObjectID={onChangeProjectID} objects={projects} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  Viewer: ViwerComponent,
};
