import React, { useEffect, useState } from "react";
import { HubData } from "../../../../apis/data-management/types";
import { urls } from "../../../../lib";
import * as fetch from "../../../fetch";
import { NodeElement } from "../types";
import { Viewer } from "../viewer";

export const apiURL = urls.api.dataManagement.hubs.get;
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-GET/";

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<HubData[]>([]);
  useEffect(() => {
    (async () => {
      setHubs(await fetch.dataManagement.hubs.get());
    })();
  }, []);
  return <Viewer data={hubs} apiURL={apiURL} docURL={docURL} />;
};

export const nodeElement: NodeElement = {
  apiURL,
  docURL,
  Viewer: ViwerComponent,
};
