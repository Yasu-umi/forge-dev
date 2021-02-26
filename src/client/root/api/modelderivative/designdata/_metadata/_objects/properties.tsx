import queryString from "query-string";
import React, { useMemo, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { NodeElement } from "../../../../types";
import { Viewer } from "../../../../viewer";
import * as api from "api";
import * as fetch from "client/fetch";
import * as helpers from "client/root/helpers";
import { HubSelector, findItems, ObjectSelector, ProjectSelector, FolderSelector, ItemSelector } from "client/root/selectors";
import { urls, PathParam } from "lib";

export const apiURL = urls.api.modelderivative.designdata.metadata.objects.properties.get({ urn: ":urn", guid: ":guid" });
export const docURL = "https://forge.autodesk.com/en/docs/model-derivative/v2/reference/http/urn-metadata-guid-properties-GET/";
export const path = urls.views.api.modelderivative.designdata.metadata.objects.properties.get({ urn: ":urn", guid: ":guid" });

const buildURL = ({
  urn,
  guid,
  hubID,
  projectID,
  folderID,
}: {
  urn: PathParam;
  guid: PathParam;
  hubID: PathParam;
  projectID: PathParam;
  folderID: PathParam;
}) =>
  `${urls.views.api.modelderivative.designdata.metadata.objects.properties.get({
    urn: typeof urn === "string" ? api.utils.base64Encode(urn) : ":urn",
    guid: typeof guid === "string" ? guid : ":guid",
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
  const guid = helpers.params.useGUID();

  const history = useHistory();

  const [hubs] = helpers.useHubs();
  const [projects] = helpers.useProjects({ hubID });
  const [contentTree, setContentTree] = helpers.useContentTree({ hubID, projectID });
  const [metadata] = helpers.useMetadata({ urn });
  const [properties, setProperties] = helpers.useProperties({ urn, guid });

  const items = useMemo(() => findItems(contentTree), [contentTree]);

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(buildURL({ hubID, projectID, folderID, urn, guid }));
    },
    [history, projectID, folderID, urn, guid],
  );
  const onChangeProjectID = useCallback(
    (projectID: string) => {
      history.push(buildURL({ hubID, projectID, folderID, urn, guid }));
    },
    [history, hubID, folderID, urn, guid],
  );
  const onChangeFolderID = useCallback(
    (folderID: string) => {
      history.push(buildURL({ hubID, projectID, folderID, urn, guid }));
    },
    [history, hubID, projectID, urn, guid],
  );
  const onChangeItemID = useCallback(
    (id: string) => {
      const item = items.find((item) => item.id === id);
      const urn = item ? api.utils.getURN(item) : undefined;
      if (!urn) return;
      history.push(buildURL({ hubID, projectID, folderID, urn, guid }));
    },
    [history, hubID, projectID, folderID, guid, items],
  );
  const onChangeGUID = useCallback(
    (guid: string) => {
      history.push(buildURL({ hubID, projectID, folderID, urn, guid }));
    },
    [history, hubID, projectID, folderID, urn],
  );

  const onClickReloadProperties = useCallback(() => {
    (async () => {
      if (!urn || !guid) return;
      const projects = await fetch.modelderivative.designdata.metadata.objects.properties.get({ urn, guid });
      setProperties(projects);
    })();
  }, [guid, urn, setProperties]);

  const itemID = useMemo(() => items.find((item) => api.utils.getURN(item) === urn)?.id, [items, urn]);

  return (
    <Viewer data={properties} apiURL={apiURL} docURL={docURL}>
      <HubSelector hubs={hubs?.data} hubID={hubID} onChangeHubID={onChangeHubID} />
      <ProjectSelector projects={projects?.data} projectID={projectID} onChangeProjectID={onChangeProjectID} />
      <FolderSelector projectID={projectID} contentTree={contentTree} onChangeFolderID={onChangeFolderID} setContentTree={setContentTree} />
      <ItemSelector items={items} itemID={itemID} onChangeItemID={onChangeItemID} />
      <ObjectSelector metadatum={metadata?.data.metadata} guid={guid} onChangeGUID={onChangeGUID} onClickReload={onClickReloadProperties} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
