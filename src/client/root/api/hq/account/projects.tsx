import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";
import * as api from "api";
import * as fetch from "client/fetch";
import { HubSelector } from "client/root/selectors";
import { urls } from "lib";

export const apiURL = urls.api.hq.account.projects.get({ accountID: ":accountID" });
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/projects-GET/";
export const path = urls.views.api.hq.account.projects.get({ accountID: ":accountID" });

export const ViwerComponent: React.FC = () => {
  const params = useParams<{ accountID?: string }>();
  const history = useHistory();
  const accountID = !params.accountID || params.accountID !== ":accountID" ? params.accountID : undefined;

  const [hubs, setHubs] = useState<api.project.hubs.get.Response | undefined>(undefined);
  const [projects, setProjects] = useState<api.hq.account.projects.get.Response | undefined>(undefined);

  const onChangeHubID = useCallback(
    (hubID: string) => {
      const accountID = api.hq.utils.getAccountID(hubID);
      history.push(urls.views.api.hq.account.projects.get({ accountID }));
    },
    [history],
  );

  useEffect(() => {
    (async () => {
      if (!accountID) return;
      const projects = await fetch.hq.account.projects.get({ accountID });
      setProjects(projects);
    })();
  }, [accountID]);

  useEffect(() => {
    (async () => {
      const hubs = await fetch.project.hubs.get();
      setHubs(hubs);
    })();
  }, []);

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
