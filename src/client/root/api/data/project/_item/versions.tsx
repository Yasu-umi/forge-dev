import queryString from "query-string";
import React, { useMemo, useCallback } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";
import { useVersions, useHubs, useProjects, useContentTree } from "client/root/helpers";
import { HubSelector, ItemSelector, FolderSelector, findItems, ProjectSelector } from "client/root/selectors";
import { urls, PathParam } from "lib";

export const apiURL = urls.api.data.project.item.versions.get({ projectID: ":projectID", itemID: ":itemID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/projects-project_id-items-item_id-versions-GET/";
export const path = urls.views.api.data.project.item.versions.get({ projectID: ":projectID", itemID: ":itemID" });

const buildURL = ({ itemID, hubID, projectID, folderID }: { itemID: PathParam; hubID: PathParam; projectID: PathParam; folderID: PathParam }) =>
  `${urls.views.api.data.project.item.versions.get({
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

  const [hubs] = useHubs();
  const [projects] = useProjects({ hubID });
  const [contentTree, setContentTree] = useContentTree({ hubID, projectID });
  const [versions] = useVersions({ projectID, itemID });

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

  return (
    <Viewer data={versions} apiURL={apiURL} docURL={docURL}>
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
