import React, { useEffect, useState, useCallback } from "react";
import { HubData, ProjectData } from "../../../../../apis/data-management/types";
import { urls } from "../../../../../lib";
import * as fetch from "../../../../fetch";
import { AttributesNameSelector } from "../../../selectors/attributes-name-selector";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";

export const apiURL = urls.api.dataManagement.hub.projects.get({ hubID: ":hubID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-GET/";

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<HubData[]>([]);
  const [hubID, setHubID] = useState<string | undefined>(undefined);
  const [projects, setProjects] = useState<ProjectData[]>([]);

  const updateHubID = useCallback((hubID: string) => {
    (async () => {
      setHubID(hubID);
      const projects = await fetch.dataManagement.hub.projects.get({ hubID });
      setProjects(projects);
    })();
  }, []);

  const onChangeHubID = useCallback(
    (ev: React.ChangeEvent<{ value: unknown }>) => {
      (async () => {
        const hubID = ev.currentTarget.value;
        if (typeof hubID !== "string") return;
        updateHubID(hubID);
      })();
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
