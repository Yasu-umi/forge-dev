import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState, useCallback } from "react";
import { Hub, Project, Folder } from "../../../../../../apis/types";
import { urls } from "../../../../../../lib";
import * as fetch from "../../../../../fetch";
import { AttributesNameSelector } from "../../../../selectors/attributes-name-selector";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";

export const apiURL = urls.api.project.hub.project.topFolders.get({ hubID: ":hubID", projectID: ":projectID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-project_id-topFolders-GET/";

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<Hub[]>([]);
  const [hubID, setHubID] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectID, setProjectID] = useState<string | undefined>(undefined);
  const [topFolders, setTopFolders] = useState<Folder[]>([]);

  const updateProjectID = useCallback((hubID: string, projectID: string) => {
    (async (hubID: string, projectID: string) => {
      setProjectID(projectID);
      const topFolders = await fetch.project.hub.project.topFolders.get({ hubID, projectID });
      setTopFolders(topFolders);
    })(hubID, projectID);
  }, []);

  const updateHubID = useCallback(
    (hubID: string) => {
      (async () => {
        setHubID(hubID);
        const projects = await fetch.project.hub.projects.get({ hubID });
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
      const hubs = await fetch.project.hubs.get();
      setHubs(hubs);
      if (hubs.length === 0) return;
      updateHubID(hubs[0].id);
    })();
  }, [updateHubID]);

  return (
    <Viewer data={topFolders} apiURL={apiURL} docURL={docURL}>
      <div>
        <Typography>Hub</Typography>
        <AttributesNameSelector objectID={hubID} onChangeObjectID={updateHubID} objects={hubs} />
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
  Viewer: ViwerComponent,
};
