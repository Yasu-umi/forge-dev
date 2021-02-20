import queryString from "query-string";
import React, { useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";
import * as api from "api";
import * as helpers from "client/root/helpers";
import { HubSelector, findItems, ProjectSelector, FolderSelector, ItemSelector } from "client/root/selectors";
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
  const hubID = helpers.search.useHubID();
  const projectID = helpers.search.useProjectID();
  const folderID = helpers.search.useFolderID();
  const urn = helpers.params.useURN();

  const history = useHistory();

  const [hubs] = helpers.useHubs();
  const [projects] = helpers.useProjects({ hubID });
  const [contentTree, setContentTree] = helpers.useContentTree({ hubID, projectID });
  const [metadata] = helpers.useMetadata({ urn });

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

  const itemID = useMemo(() => items.find((item) => api.utils.getURN(item) === urn)?.id, [items, urn]);

  return (
    <Viewer data={metadata} apiURL={apiURL} docURL={docURL}>
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
