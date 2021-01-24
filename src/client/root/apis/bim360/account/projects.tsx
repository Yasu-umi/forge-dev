import React, { useEffect, useState, useCallback } from "react";
import * as apis from "../../../../../apis";
import { ProjectData } from "../../../../../apis/bim360/types";
import { HubData } from "../../../../../apis/data-management/types";
import { urls } from "../../../../../lib";
import * as fetch from "../../../../fetch";
import { AttributesNameSelector } from "../../../selectors/attributes-name-selector";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";

export const apiURL = urls.api.bim360.account.projects.get({ accountID: ":accountID" });
export const docURL = "https://forge.autodesk.com/en/docs/bim360/v1/reference/http/projects-GET/";

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<HubData[]>([]);
  const [hubID, setHubID] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const updateHubID = useCallback((hubID: string) => {
    (async () => {
      setHubID(hubID);
      const accountID = apis.bim360.utils.getAccountID(hubID);
      const projects = await fetch.bim360.account.projects.get({ accountID });
      setProjects(projects);
    })();
  }, []);

  const onChangeHubID = useCallback(
    (ev: React.ChangeEvent<{ value: unknown }>) => {
      const hubID = ev.currentTarget.value;
      if (typeof hubID !== "string") return;
      updateHubID(hubID);
    },
    [updateHubID],
  );

  useEffect(() => {
    (async () => {
      const hubs = await fetch.dataManagement.hubs.get();
      setHubs(hubs);
      if (hubs.length === 0) return;
      updateHubID(hubs[0].id);
    })();
  }, [updateHubID]);

  return (
    <Viewer data={projects} apiURL={apiURL} docURL={docURL}>
      <AttributesNameSelector objectID={hubID} onChangeObjectID={onChangeHubID} objects={hubs} />
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  Viewer: ViwerComponent,
};
