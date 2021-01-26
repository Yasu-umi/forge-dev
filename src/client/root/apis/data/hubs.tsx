import React, { useEffect, useState } from "react";
import { Hub } from "../../../../apis/types";
import { urls } from "../../../../lib";
import * as fetch from "../../../fetch";
import { NodeElement } from "../types";
import { Viewer } from "../viewer";

export const apiURL = urls.api.project.hubs.get;
export const docURL = "https://forge.autodesk.com/en/docs/data/v2/reference/http/hubs-GET/";

export const ViwerComponent: React.FC = () => {
  const [hubs, setHubs] = useState<Hub[]>([]);
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
  Viewer: ViwerComponent,
};
