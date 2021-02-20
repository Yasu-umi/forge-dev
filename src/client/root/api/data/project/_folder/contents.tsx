import queryString from "query-string";
import React, { useMemo, useCallback } from "react";
import { useLocation, useParams, useHistory } from "react-router-dom";
import { NodeElement } from "../../../types";
import { Viewer } from "../../../viewer";
import { useHubs, useProjects, useContentTree } from "client/root/helpers";
import { HubSelector, ProjectSelector, FolderSelector, findSelected } from "client/root/selectors";
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

  const [hubs] = useHubs();
  const [projects] = useProjects({ hubID });
  const [contentTree, setContentTree] = useContentTree({ hubID, projectID });

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

  const selected = findSelected(contentTree);
  const data = selected ? selected.children.map(({ content }) => content) : [];

  return (
    <Viewer data={data} apiURL={apiURL} docURL={docURL}>
      <HubSelector hubs={hubs?.data} hubID={hubID} onChangeHubID={onChangeHubID} />
      <ProjectSelector projects={projects?.data} projectID={projectID} onChangeProjectID={onChangeProjectID} />
      <FolderSelector projectID={projectID} contentTree={contentTree} onChangeFolderID={onChangeFolderID} setContentTree={setContentTree} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
