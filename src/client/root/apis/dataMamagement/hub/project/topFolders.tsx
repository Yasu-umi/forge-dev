import React, { useEffect, useState, useCallback } from "react";
import { HubData, ProjectData, TopFolderData } from "../../../../../../apis/data-management/types";
import { urls } from "../../../../../../lib";
import * as fetch from "../../../../../fetch";
import { AttributesNameSelector } from "../../../../selectors/attributes-name-selector";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";

export const apiURL = urls.api.dataManagement.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-project_id-topFolders-GET/";

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<HubData[]>([]);
  const [hubID, setHubID] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectID, setProjectID] = useState<string | undefined>(undefined);
  const [topFolders, setTopFolders] = useState<TopFolderData[]>([]);

  const updateProjectID = useCallback((hubID: string, projectID: string) => {
    (async (hubID: string, projectID: string) => {
      setProjectID(projectID);
      const topFolders = await fetch.dataManagement.hub.project.topFolders.get({ hubID, projectID });
      setTopFolders(topFolders);
    })(hubID, projectID);
  }, []);

  const updateHubID = useCallback(
    (hubID: string) => {
      (async () => {
        setHubID(hubID);
        const projects = await fetch.dataManagement.hub.projects.get({ hubID });
        setProjects(projects);
        if (projects.length === 0) return;
        updateProjectID(hubID, projects[0].id);
      })();
    },
    [updateProjectID],
  );

  const onChangeProjectID = useCallback(
    (projectID: string) => {
      if (!hubID) return;
      updateProjectID(hubID, projectID);
    },
    [updateProjectID, hubID],
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
    <Viewer data={topFolders} apiURL={apiURL} docURL={docURL}>
      <AttributesNameSelector objectID={hubID} onChangeObjectID={updateHubID} objects={hubs} />
      <AttributesNameSelector objectID={projectID} onChangeObjectID={onChangeProjectID} objects={projects} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  Viewer: ViwerComponent,
};
