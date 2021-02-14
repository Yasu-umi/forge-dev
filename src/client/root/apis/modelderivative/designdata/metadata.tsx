import Typography from "@material-ui/core/Typography";
import queryString from "query-string";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { Metadata } from "../../../../../apis/modelderivative/types";
import { Hub, Project } from "../../../../../apis/types";
import { urls, PathParam } from "../../../../../lib";
import * as fetch from "../../../../fetch";
import { AttributesNameSelector } from "../../../selectors/attributes-name-selector";
import { ContentTreeSelector, ContentTree, findSelected, findParent } from "../../../selectors/content-tree-selector";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";

export const apiURL = urls.api.modelderivative.designdata.metadata.get({ urn: ":urn" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/";
export const path = urls.views.apis.modelderivative.designdata.metadata.get({ urn: ":urn" });

const buildURL = ({ urn, hubID, projectID, folderID }: { urn: PathParam; hubID: PathParam; projectID: PathParam; folderID: PathParam }) =>
  `${urls.views.apis.modelderivative.designdata.metadata.get({ urn: urn || ":urn" })}?${queryString.stringify({
    hubID,
    projectID,
    folderID,
  })}`;

export const ViwerComponent: React.FC = () => {
  const location = useLocation();
  const hubID = useMemo(() => {
    const query = queryString.parse(location.search);
    return typeof query["hubID"] === "string" ? query["hubID"] : undefined;
  }, [location.search]);
  const projectID = useMemo(() => {
    const query = queryString.parse(location.search);
    return typeof query["projectID"] === "string" ? query["projectID"] : undefined;
  }, [location.search]);
  const folderID = useMemo(() => {
    const query = queryString.parse(location.search);
    return typeof query["folderID"] === "string" ? query["folderID"] : "hoge";
  }, [location.search]);

  const params = useParams<{ urn?: string }>();
  const history = useHistory();
  const urn = !params.urn || params.urn !== ":urn" ? params.urn : undefined;

  const [hubs, setHubs] = useState<Hub[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contentTree, setContentTree] = useState<ContentTree>({ children: [] });
  const [metadata, setMetadata] = useState<Metadata | undefined>(undefined);

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(buildURL({ hubID, projectID, folderID, urn }));
    },
    [history, projectID, folderID, urn],
  );
  const onChangeProjectID = useCallback(
    (projectID: string) => {
      history.push(buildURL({ hubID, projectID, folderID, urn }));
    },
    [history, hubID, folderID, urn],
  );
  const onChangeFolderID = useCallback(
    (folderID: string) => {
      history.push(buildURL({ hubID, projectID, folderID, urn }));
    },
    [history, hubID, projectID, urn],
  );
  const onChangeURN = useCallback(
    (urn: string) => {
      history.push(buildURL({ hubID, projectID, folderID, urn }));
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
      if (!urn) return;
      const metadata = await fetch.modelderivative.designdata.metadata.get({ urn });
      setMetadata(metadata);
    })();
  }, [urn]);

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
    <Viewer data={metadata} apiURL={apiURL} docURL={docURL}>
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
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
