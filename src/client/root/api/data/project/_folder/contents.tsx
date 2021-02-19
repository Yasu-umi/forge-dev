import Typography from "@material-ui/core/Typography";
import queryString from "query-string";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";
import * as api from "api";
import * as fetch from "client/fetch";
import { HubSelector, AttributesNameSelector, ContentTreeSelector, ContentTree, findSelected, findParent } from "client/root/selectors";
import { urls, PathParam } from "lib";

export const apiURL = urls.api.data.project.folder.contents.get({ projectID: ":projectID", folderID: ":folderID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/";
export const path = urls.views.api.data.project.folder.contents.get({ projectID: ":projectID", folderID: ":folderID" });

const buildURL = ({ hubID, projectID, folderID }: { hubID: PathParam; projectID: PathParam; folderID: PathParam }) =>
  `${urls.views.api.data.project.folder.contents.get({
    projectID: projectID || ":projectID",
    folderID: folderID || ":folderID",
  })}?${queryString.stringify({ hubID: hubID || ":hubID" })}`;

export const ViwerComponent: React.FC = () => {
  const location = useLocation();
  const hubID = useMemo(() => {
    const query = queryString.parse(location.search);
    return typeof query["hubID"] === "string" ? query["hubID"] : undefined;
  }, [location.search]);

  const params = useParams<{ projectID?: string; folderID?: string }>();
  const history = useHistory();
  const projectID = !params.projectID || params.projectID !== ":projectID" ? params.projectID : undefined;
  const folderID = !params.folderID || params.folderID !== ":folderID" ? params.folderID : undefined;

  const [hubs, setHubs] = useState<api.project.hubs.get.Response | undefined>(undefined);
  const [projects, setProjects] = useState<api.project.hub.projects.get.Response | undefined>(undefined);
  const [contentTree, setContentTree] = useState<ContentTree>({ children: [] });

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(buildURL({ hubID, projectID, folderID }));
    },
    [history, projectID, folderID],
  );
  const onChangeProjectID = useCallback(
    (projectID: string) => {
      history.push(buildURL({ hubID, projectID, folderID }));
    },
    [history, hubID, folderID],
  );
  const onChangeFolderID = useCallback(
    (folderID: string) => {
      history.push(buildURL({ hubID, projectID, folderID }));
    },
    [history, hubID, projectID],
  );

  const onSelect = useCallback(
    (projectID: string, contentTree: ContentTree, id: string) => {
      (async () => {
        const parent = findParent(contentTree, id);
        if (parent?.selectedID === id) return;
        const idx = parent ? parent.children.findIndex((child) => child?.content?.id === id) : undefined;
        if (!parent || typeof idx !== "number") return;
        const selected = parent.children[idx];
        if (!projectID || !selected) return;
        parent.selectedID = id;
        const contents = await fetch.data.project.folder.contents.get({ projectID, folderID: id });
        selected.children = contents.data.map((content) => ({ content, children: [] }));
        parent.children[idx] = { ...selected };
        parent.children = [...parent.children];
        setContentTree({ ...contentTree });
        onChangeFolderID(id);
      })();
    },
    [setContentTree, onChangeFolderID],
  );

  const onSelectID = useCallback(
    (id: string) => {
      projectID ? onSelect(projectID, contentTree, id) : null;
    },
    [projectID, contentTree, onSelect],
  );
  const onDeleteID = React.useCallback(
    (id: string) => {
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
      onChangeFolderID(id);
    },
    [contentTree, onChangeFolderID],
  );

  useEffect(() => {
    (async () => {
      if (!hubID || !projectID) return;
      const topFolders = await fetch.project.hub.project.topFolders.get({ hubID, projectID });
      const contentTree: ContentTree = { children: topFolders.data.map((content) => ({ content, children: [] })) };
      setContentTree(contentTree);
    })();
  }, [hubID, projectID]);

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

  const selected = findSelected(contentTree);
  const data = selected ? selected.children.map(({ content }) => content) : [];

  return (
    <Viewer data={data} apiURL={apiURL} docURL={docURL}>
      <HubSelector hubs={hubs?.data} hubID={hubID} onChangeHubID={onChangeHubID} />
      <div>
        <Typography>Project</Typography>
        <AttributesNameSelector objectID={projectID} onChangeObjectID={onChangeProjectID} objects={projects?.data} />
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
  path,
  Viewer: ViwerComponent,
};
