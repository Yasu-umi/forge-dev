import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";
import * as helpers from "client/root/helpers";
import { HubSelector } from "client/root/selectors";
import { urls } from "lib";

export const apiURL = urls.api.project.hub.projects.get({ hubID: ":hubID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-GET/";
export const path = urls.views.api.project.hub.projects.get({ hubID: ":hubID" });

export const ViwerComponent: React.FC = () => {
  const hubID = helpers.params.useHubID();

  const history = useHistory();

  const [hubs] = helpers.useHubs();
  const [projects] = helpers.useProjects({ hubID });

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(urls.views.api.project.hub.projects.get({ hubID }));
    },
    [history],
  );

  return (
    <Viewer data={projects} apiURL={apiURL} docURL={docURL}>
      <HubSelector hubs={hubs?.data} hubID={hubID} onChangeHubID={onChangeHubID} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
