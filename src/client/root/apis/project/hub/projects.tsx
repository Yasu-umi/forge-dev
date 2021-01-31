import Typography from "@material-ui/core/Typography";
import React, { useEffect, useState, useCallback } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Hub, Project } from "../../../../../apis/types";
import { urls } from "../../../../../lib";
import * as fetch from "../../../../fetch";
import { AttributesNameSelector } from "../../../selectors/attributes-name-selector";
import { NodeElement } from "../../types";
import { Viewer } from "../../viewer";

export const apiURL = urls.api.project.hub.projects.get({ hubID: ":hubID" });
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-hub_id-projects-GET/";
export const path = urls.views.apis.project.hub.projects.get({ hubID: ":hubID" });

export const ViwerComponent: React.FC = () => {
  const params = useParams<{ hubID?: string }>();
  const history = useHistory();
  const hubID = !params.hubID || params.hubID !== ":hubID" ? params.hubID : undefined;

  const [hubs, setHubs] = useState<Hub[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const onChangeHubID = useCallback(
    (hubID: string) => {
      history.push(urls.views.apis.project.hub.projects.get({ hubID }));
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
      <div>
        <Typography>Hub</Typography>
        <AttributesNameSelector objectID={hubID} onChangeObjectID={onChangeHubID} objects={hubs} />
      </div>
    </Viewer>
  );
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
