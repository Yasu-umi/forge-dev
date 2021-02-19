import React, { useEffect, useState } from "react";
import { urls } from "../../../../lib";
import * as fetch from "../../../fetch";
import { NodeElement } from "../types";
import { Viewer } from "../viewer";
import * as api from "api";

export const apiURL = urls.api.project.hubs.get;
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-GET/";
export const path = urls.views.api.project.hubs.get;

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<api.project.hubs.get.Response | undefined>(undefined);
  useEffect(() => {
    (async () => {
      setHubs(await fetch.project.hubs.get());
    })();
  }, []);
  return <Viewer data={hubs} apiURL={apiURL} docURL={docURL} />;
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  path,
  Viewer: ViwerComponent,
};
