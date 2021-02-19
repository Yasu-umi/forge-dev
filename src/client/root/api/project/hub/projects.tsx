import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";
import * as api from "api";
import * as fetch from "client/fetch";
import { HubSelector } from "client/root/selectors";
import { urls } from "lib";

export const apiURL = urls.api.project.hub.projects.get({ hubID: ":hubID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-GET/";
export const path = urls.views.api.project.hub.projects.get({ hubID: ":hubID" });

export const ViwerComponent: React.FC = () => {
  const params = useParams<{ hubID?: string }>();
  const history = useHistory();
  const hubID = !params.hubID || params.hubID !== ":hubID" ? params.hubID : undefined;

  const [hubs, setHubs] = useState<api.project.hubs.get.Response | undefined>(undefined);
  const [projects, setProjects] = useState<api.project.hub.projects.get.Response | undefined>(undefined);

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(urls.views.api.project.hub.projects.get({ hubID }));
    },
    [history],
  );

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