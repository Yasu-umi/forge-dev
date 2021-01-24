import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState, useCallback } from "react";
import { HubData, ProjectData } from "../../../../../../apis/data-management/types";
import { urls } from "../../../../../../lib";
import * as fetch from "../../../../../fetch";
import { AttributesNameSelector } from "../../../../selectors/attributes-name-selector";
import { ContentTreeSelector, ContentTree, findSelected, findParent } from "../../../../selectors/content-tree-selector";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";

export const apiURL = urls.api.dataManagement.project.folder.contents.get({ projectID: ":projectID", folderID: ":folderID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/";

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<HubData[]>([]);
  const [hubID, setHubID] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [projectID, setProjectID] = useState<string | undefined>(undefined);
  const [contentTree, setContentTree] = useState<ContentTree>({ children: [] });

  const onSelect = useCallback(
    (projectID: string, contentTree: ContentTree, id: string) => {
      (async () => {
        const parent = findParent(contentTree, id);
        if (parent?.selectedID === id) return;
        const idx = parent ? parent.children.findIndex((child) => child?.content?.id === id) : undefined;
        if (!parent || typeof idx !== "number" || !projectID) return;
        parent.selectedID = id;
        parent.children[idx] = { ...parent.children[idx] };
        parent.children = [...parent.children];
        const selected = findSelected(contentTree, id);
        const folderID = selected?.content?.id;
        if (!selected || !folderID) return;
        const contents = await fetch.dataManagement.project.folder.contents.get({ projectID, folderID });
        selected.children = contents.map((content) => ({ content, children: [] }));
        setContentTree({ ...contentTree });
      })();
    },
    [setContentTree],
  );

  const onSelectID = useCallback(
    (id: string) => {
      projectID ? onSelect(projectID, contentTree, id) : null;
    },
    [projectID, contentTree, onSelect],
  );
  const onDeleteID = (id: string) => {
    const selected = findSelected(contentTree, id);
    if (!selected) return;
    delete selected?.selectedID;
    const parent = findParent(selected, id);
    const idx = parent ? parent.children.findIndex((child) => child?.content?.id === id) : undefined;
    if (parent && idx) {
      parent.children[idx] = { ...parent.children[idx] };
      parent.children = [...parent.children];
    }
    setContentTree({ ...contentTree });
  };

  const updateProjectID = useCallback(
    (hubID: string, projectID: string) => {
      (async () => {
        setProjectID(projectID);
        const topFolders = await fetch.dataManagement.hub.project.topFolders.get({ hubID, projectID });
        const contentTree: ContentTree = { children: topFolders.map((content) => ({ content, children: [] })) };
        if (contentTree.children.length > 0) {
          const id = contentTree.children[0].content?.id;
          if (id) onSelect(projectID, contentTree, id);
        }
        setContentTree(contentTree);
      })();
    },
    [onSelect],
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

  const onChangeProjectID = useCallback(
    (projectID: string) => {
      if (typeof hubID !== "string") return;
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

  const selected = findSelected(contentTree);
  const data = selected ? selected.children.map(({ content }) => content) : [];

  return (
    <Viewer data={data} apiURL={apiURL} docURL={docURL}>
      <div>
        <Typography>Hub</Typography>
        <AttributesNameSelector objectID={hubID} onChangeObjectID={updateHubID} objects={hubs} />
      </div>
      <div>
        <Typography>Project</Typography>
        <AttributesNameSelector objectID={projectID} onChangeObjectID={onChangeProjectID} objects={projects} />
      </div>
      <div>
        <Typography>Flolder</Typography>
        <ContentTreeSelector contentTree={contentTree} onSelectID={onSelectID} onDeleteID={onDeleteID} />
      </div>
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  Viewer: ViwerComponent,
};
