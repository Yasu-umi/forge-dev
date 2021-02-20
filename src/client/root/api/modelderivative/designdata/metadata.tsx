import queryString from "query-string";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";
import * as api from "api";
import * as fetch from "client/fetch";
import { HubSelector, ContentTree, findItems, ProjectSelector, FolderSelector, ItemSelector } from "client/root/selectors";
import { urls, PathParam } from "lib";

export const apiURL = urls.api.modelderivative.designdata.metadata.get({ urn: ":urn" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-folders-folder_id-contents-GET/";
export const path = urls.views.api.modelderivative.designdata.metadata.get({ urn: ":urn" });

const buildURL = ({ urn, hubID, projectID, folderID }: { urn: PathParam; hubID: PathParam; projectID: PathParam; folderID: PathParam }) =>
  `${urls.views.api.modelderivative.designdata.metadata.get({
    urn: typeof urn === "string" ? api.utils.base64Encode(urn) : ":urn",
  })}?${queryString.stringify({
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
  const urn = typeof params.urn === "string" && params.urn !== ":urn" ? api.utils.base64Decode(params.urn) : undefined;

  const [hubs, setHubs] = useState<api.project.hubs.get.Response | undefined>(undefined);
  const [projects, setProjects] = useState<api.project.hub.projects.get.Response | undefined>(undefined);
  const [contentTree, setContentTree] = useState<ContentTree>({ children: [] });
  const [metadatum, setMetadatum] = useState<api.modelderivative.designdata.metadata.get.Response | undefined>(undefined);

  const items = useMemo(() => findItems(contentTree), [contentTree]);

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
  const onChangeItemID = useCallback(
    (id: string) => {
      const item = items.find((item) => item.id === id);
      const urn = item ? api.utils.getURN(item) : undefined;
      if (!urn) return;
      history.push(buildURL({ hubID, projectID, folderID, urn }));
    },
    [history, hubID, projectID, folderID, items],
  );

  useEffect(() => {
    (async () => {
      if (!urn) return;
      const metadatum = await fetch.modelderivative.designdata.metadata.get({ urn });
      setMetadatum(metadatum);
    })();
  }, [urn]);

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

  const itemID = useMemo(() => items.find((item) => api.utils.getURN(item) === urn)?.id, [items, urn]);

  return (
    <Viewer data={metadatum} apiURL={apiURL} docURL={docURL}>
      <HubSelector hubs={hubs?.data} hubID={hubID} onChangeHubID={onChangeHubID} />
      <ProjectSelector projects={projects?.data} projectID={projectID} onChangeProjectID={onChangeProjectID} />
      <FolderSelector projectID={projectID} contentTree={contentTree} onChangeFolderID={onChangeFolderID} setContentTree={setContentTree} />
      <ItemSelector items={items} itemID={itemID} onChangeItemID={onChangeItemID} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
