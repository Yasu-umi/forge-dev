import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";
import * as api from "api";
import * as helpers from "client/root/helpers";
import { HubSelector } from "client/root/selectors";
import { urls } from "lib";

export const apiURL = urls.api.hq.account.projects.get({ accountID: ":accountID" });
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/projects-GET/";
export const path = urls.views.api.hq.account.projects.get({ accountID: ":accountID" });

export const ViwerComponent: React.FC = () => {
  const accountID = helpers.params.useAccountID();

  const history = useHistory();

  const [hubs] = helpers.useHubs();
  const [projects] = helpers.useHQProjects({ accountID });

  const onChangeHubID = useCallback(
    (hubID: string) => {
      const accountID = api.hq.utils.getAccountID(hubID);
      history.push(urls.views.api.hq.account.projects.get({ accountID }));
    },
    [history],
  );

  return (
    <Viewer data={projects} apiURL={apiURL} docURL={docURL}>
      <HubSelector hubs={hubs?.data} hubID={accountID ? api.hq.utils.getHubID(accountID) : undefined} onChangeHubID={onChangeHubID} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
