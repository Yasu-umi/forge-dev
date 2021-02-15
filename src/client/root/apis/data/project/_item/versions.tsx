import Typography from "@material-ui/core/Typography";
import queryString from "query-string";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { Hub, Item, Project, Version } from "../../../../../../apis/types";
import { urls, PathParam } from "../../../../../../lib";
import * as fetch from "../../../../../fetch";
import { AttributesNameSelector } from "../../../../selectors/attributes-name-selector";
import { ContentTreeSelector, ContentTree, findSelected, findParent, findItems } from "../../../../selectors/content-tree-selector";
import { ItemSelector } from "../../../../selectors/item-selector";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";

export const apiURL = urls.api.data.project.item.versions.get({ projectID: ":projectID", itemID: ":itemID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-items-item_id-versions-GET/";
export const path = urls.views.apis.data.project.item.versions.get({ projectID: ":projectID", itemID: ":itemID" });

const buildURL = ({ itemID, hubID, projectID, folderID }: { itemID: PathParam; hubID: PathParam; projectID: PathParam; folderID: PathParam }) =>
  `${urls.views.apis.data.project.item.versions.get({
    projectID: projectID || ":projectID",
    itemID: itemID || ":itemID",
  })}?${queryString.stringify({
    hubID,
    folderID,
  })}`;

export const ViwerComponent: React.FC = () => {
  const location = useLocation();
  const hubID = useMemo(() => {
    const query = queryString.parse(location.search);
    return typeof query["hubID"] === "string" ? query["hubID"] : undefined;
  }, [location.search]);
  const folderID = useMemo(() => {
    const query = queryString.parse(location.search);
    return typeof query["folderID"] === "string" ? query["folderID"] : "hoge";
  }, [location.search]);

  const params = useParams<{ itemID?: string; projectID?: string }>();
  const history = useHistory();
  const projectID = typeof params.projectID === "string" && params.projectID !== ":projectID" ? params.projectID : undefined;
  const itemID = typeof params.itemID === "string" && params.itemID !== ":itemID" ? params.itemID : undefined;

  const [hubs, setHubs] = useState<Hub[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contentTree, setContentTree] = useState<ContentTree>({ children: [] });
  const [versions, setVersions] = useState<Version[]>([]);

  const items = useMemo(() => findItems(contentTree), [contentTree]);

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(buildURL({ hubID, projectID, folderID, itemID }));
    },
    [history, projectID, folderID, itemID],
  );
  const onChangeProjectID = useCallback(
    (projectID: string) => {
      history.push(buildURL({ hubID, projectID, folderID, itemID }));
    },
    [history, hubID, folderID, itemID],
  );
  const onChangeFolderID = useCallback(
    (folderID: string) => {
      history.push(buildURL({ hubID, projectID, folderID, itemID }));
    },
    [history, hubID, projectID, itemID],
  );
  const onChangeItemID = useCallback(
    (itemID: string) => {
      history.push(buildURL({ hubID, projectID, folderID, itemID }));
    },
    [history, hubID, projectID, folderID],
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
        selected.children = contents.map((content) => ({ content, children: [] }));
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
      if (!projectID || !itemID) return;
      const versions = await fetch.data.project.item.versions.get({ projectID, itemID });
      setVersions(versions);
    })();
  }, [projectID, itemID]);

  useEffect(() => {
    (async () => {
      if (!hubID || !projectID) return;
      const topFolders = await fetch.project.hub.project.topFolders.get({ hubID, projectID });
      const contentTree: ContentTree = { children: topFolders.map((content) => ({ content, children: [] })) };
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

  return (
    <Viewer data={versions} apiURL={apiURL} docURL={docURL}>
      <div>
        <Typography>Hub</Typography>
        <AttributesNameSelector objectID={hubID} onChangeObjectID={onChangeHubID} objects={hubs} />
      </div>
      <div>
        <Typography>Project</Typography>
        <AttributesNameSelector objectID={projectID} onChangeObjectID={onChangeProjectID} objects={projects} />
      </div>
      <div>
        <Typography>Flolder</Typography>
        <ContentTreeSelector contentTree={contentTree} onSelectID={onSelectID} onDeleteID={onDeleteID} />
      </div>
      <div>
        <Typography>Item</Typography>
        <ItemSelector items={items} itemID={itemID} onChangeItemID={onChangeItemID} />
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
