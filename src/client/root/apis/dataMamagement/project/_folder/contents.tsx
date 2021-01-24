import React, { useEffect, useState, useCallback } from "react";
import { ContentData, HubData, ProjectData, TopFolderData } from "../../../../../../apis/data-management/types";
import { urls } from "../../../../../../lib";
import * as fetch from "../../../../../fetch";
import { AttributesNameSelector } from "../../../../selectors/attributes-name-selector";
import { FolderSelector } from "../../../../selectors/folder-selector";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";

export const apiURL = urls.api.dataManagement.project.folder.contents.get({ projectID: ":projectID", folderID: ":folderID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/";

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<HubData[]>([]);
  const [hubID, setHubID] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectID, setProjectID] = useState<string | undefined>(undefined);
  const [topFolders, setTopFolders] = useState<TopFolderData[]>([]);
  const [folderID, setFolderID] = useState<string | undefined>(undefined);
  const [contents, setContents] = useState<ContentData[]>([]);

  const updateFolderID = useCallback(({ projectID, folderID }: { projectID: string; folderID: string }) => {
    (async () => {
      setFolderID(folderID);
      const contents = await fetch.dataManagement.project.folder.contents.get({ projectID, folderID });
      await setContents(contents);
    })();
  }, []);

  const updateProjectID = useCallback(
    (hubID: string, projectID: string) => {
      (async () => {
        setProjectID(projectID);
        const topFolders = await fetch.dataManagement.hub.project.topFolders.get({ hubID, projectID });
        setTopFolders(topFolders);
        if (topFolders.length === 0) return;
        await updateFolderID({ projectID, folderID: topFolders[0].id });
      })();
    },
    [updateFolderID],
  );

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
      if (typeof hubID !== "string" || typeof projectID !== "string") return;
      updateProjectID(hubID, projectID);
    },
    [updateProjectID, hubID],
  );

  const onChangeFolderID = useCallback(
    (ev: React.ChangeEvent<{ value: unknown }>) => {
      const folderID = ev.currentTarget.value;
      if (typeof projectID !== "string" || typeof folderID !== "string") return;
      updateFolderID({ projectID, folderID });
    },
    [updateFolderID, projectID],
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
    <Viewer data={contents} apiURL={apiURL} docURL={docURL}>
      <AttributesNameSelector objectID={hubID} onChangeObjectID={onChangeHubID} objects={hubs} />
      <AttributesNameSelector objectID={projectID} onChangeObjectID={onChangeProjectID} objects={projects} />
      <FolderSelector folderID={folderID} onChangeFolderID={onChangeFolderID} folders={topFolders} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  Viewer: ViwerComponent,
};
